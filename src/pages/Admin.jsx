import { useEffect, useState } from 'react'
import {
    ShieldCheck,
    MessageSquare,
    Trash2,
    Mail,
    User,
    Clock,
    RefreshCcw,
    Zap,
    LayoutDashboard,
    Server,
    Lock,
    Unlock,
    CheckCircle,
    XCircle,
    Eye,
    Send
} from 'lucide-react'
import Section from '../components/Section'
import { useToast } from '../components/Toast'

function Admin() {
    const { showToast } = useToast()
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [status, setStatus] = useState('idle')
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [resetStep, setResetStep] = useState(1) // 1: Email, 2: OTP & New Password
    const [selectedMessage, setSelectedMessage] = useState(null)
    const [activeTab, setActiveTab] = useState('intelligence') // 'intelligence' or 'settings'
    const [currentPassword, setCurrentPassword] = useState('')

    const fetchMessages = async () => {
        setIsRefreshing(true)
        try {
            const response = await fetch('http://localhost:5000/api/messages', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                setMessages(data)
            } else {
                showToast(data.message, 'error')
            }
        } catch (err) {
            showToast('Failed to sync intelligence database', 'error')
        } finally {
            setIsLoading(false)
            setIsRefreshing(false)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchMessages()
        }
    }, [isAuthenticated])

    const deleteMessage = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.ok) {
                setMessages(messages.filter(m => m._id !== id))
                if (selectedMessage?._id === id) setSelectedMessage(null)
                showToast('Intelligence Report Purged', 'success')
            } else {
                const data = await response.json()
                showToast(data.message, 'error')
            }
        } catch (err) {
            showToast('Purge Protocol Failure', 'error')
        }
    }

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status: newStatus })
            })
            if (response.ok) {
                setMessages(messages.map(m => m._id === id ? { ...m, status: newStatus } : m))
                showToast('Report Status Classification Updated', 'success')
            }
        } catch (err) {
            showToast('Classification Protocol Failure', 'error')
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('token', data.token)
                setIsAuthenticated(true)
                showToast('Intelligence Session Initialized', 'success')
            } else {
                showToast(`Access Denied: ${data.message}`, 'error')
            }
        } catch (err) {
            showToast('Server Protocol Failure: Connection Failed', 'error')
        }
    }

    const handleRequestReset = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/api/auth/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            if (response.ok) {
                setResetStep(2)
                showToast('Recovery OTP sent to your email', 'info')
            } else {
                const data = await response.json()
                showToast(data.message, 'error')
            }
        } catch (err) {
            showToast('Recovery Protocol Failed', 'error')
        }
    }


    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            })
            if (response.ok) {
                showToast('Access Key Updated Successfully', 'success')
                setIsForgotPassword(false)
                setResetStep(1)
            } else {
                const data = await response.json()
                showToast(data.message, 'error')
            }
        } catch (err) {
            showToast('Security Key Override Failed', 'error')
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            })
            const data = await response.json()
            if (response.ok) {
                showToast('Personnel Security Key Updated', 'success')
                setCurrentPassword('')
                setNewPassword('')
            } else {
                showToast(data.message, 'error')
            }
        } catch (err) {
            showToast('Key Update Protocol Failed', 'error')
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
    }

    if (!isAuthenticated) {
        return (
            <div className="pt-40 flex items-center justify-center px-6">
                <div className="w-full max-w-md bg-zinc-900/50 border border-white/10 p-10 rounded-[40px] shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col items-center gap-6 mb-10 text-center">
                        <div className="w-20 h-20 bg-primary-green/10 rounded-3xl flex items-center justify-center text-primary-green">
                            <Lock size={40} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight uppercase">
                                {isForgotPassword ? 'Password Recovery' : 'Intelligence Access'}
                            </h2>
                            <p className="text-zinc-500 font-bold text-sm tracking-widest mt-2 uppercase">Personnel Only</p>
                        </div>
                    </div>

                    {!isForgotPassword ? (
                        <div className="space-y-6">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">
                                        Admin Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@example.com"
                                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-green transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">
                                        Entry Key
                                    </label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-green focus:shadow-[0_0_20px_rgba(0,245,160,0.1)] transition-all font-mono"
                                        required
                                    />
                                </div>
                                <button className="w-full flex items-center justify-center gap-3 font-black py-4 rounded-2xl shadow-xl transition-all bg-primary-green text-black shadow-primary-green/20 hover:scale-105 active:scale-95">
                                    INITIALIZE SESSION
                                    <Zap size={18} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsForgotPassword(true)}
                                    className="w-full text-zinc-500 text-xs font-bold hover:text-white transition-colors"
                                >
                                    FORGOT ACCESS KEY?
                                </button>
                            </form>
                        </div>
                    ) : (
                        <form onSubmit={resetStep === 1 ? handleRequestReset : handleResetPassword} className="space-y-6">
                            {resetStep === 1 ? (
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">Recovery Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@example.com"
                                        className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-cyan transition-all"
                                        required
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">Authorization Code</label>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="XXXXXX"
                                            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-cyan transition-all font-mono tracking-widest"
                                            maxLength={6}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">New Entry Key</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-cyan transition-all font-mono"
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            <button className="w-full flex items-center justify-center gap-3 bg-primary-cyan text-black font-black py-4 rounded-2xl shadow-xl shadow-primary-cyan/20 hover:scale-105 active:scale-95 transition-all">
                                {resetStep === 1 ? 'REQUEST OTP' : 'RESET KEY'}
                                <Mail size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => { setIsForgotPassword(false); setResetStep(1); }}
                                className="w-full text-zinc-500 text-xs font-bold hover:text-white transition-colors"
                            >
                                BACK TO LOGIN
                            </button>
                        </form>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="pt-24 md:pt-32 min-h-screen">
            <Section eyebrow="Management" title="Intelligence Hub" icon={<LayoutDashboard size={18} />}>
                <div className="flex flex-col gap-8">
                    {/* Tabs */}
                    <div className="flex items-center gap-4 border-b border-white/10 [data-theme='light']:border-zinc-200 pb-4">
                        <button
                            onClick={() => setActiveTab('intelligence')}
                            className={`px-6 py-2 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${activeTab === 'intelligence' ? 'bg-primary-green text-black' : 'text-zinc-500 hover:text-white'}`}
                        >
                            INTELLIGENCE
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`px-6 py-2 rounded-xl text-xs font-black tracking-widest uppercase transition-all ${activeTab === 'settings' ? 'bg-primary-purple text-white' : 'text-zinc-500 hover:text-white'}`}
                        >
                            SETTINGS & SECURITY
                        </button>
                        <button
                            onClick={logout}
                            className="ml-auto px-6 py-2 rounded-xl text-xs font-black tracking-widest uppercase text-rose-500 hover:bg-rose-500/10 transition-all"
                        >
                            LOGOUT
                        </button>
                    </div>

                    {activeTab === 'intelligence' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Quick Stats */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="p-8 bg-zinc-900/50 [data-theme='light']:bg-white border border-white/10 [data-theme='light']:border-zinc-200 rounded-3xl shadow-xl">
                                    <div className="flex items-center gap-4 text-zinc-500 mb-6">
                                        <Server size={20} className="text-primary-cyan" />
                                        <span className="text-xs font-black uppercase tracking-widest">System Status</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-emerald-500 font-bold">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
                                        DATABASE ONLINE
                                    </div>
                                    <p className="text-[10px] text-zinc-600 font-mono mt-4 uppercase tracking-widest">Connected to Cloud Cluster</p>
                                </div>

                                <div className="p-8 bg-zinc-900/50 [data-theme='light']:bg-white border border-white/10 [data-theme='light']:border-zinc-200 rounded-3xl shadow-xl">
                                    <div className="flex items-center gap-4 text-zinc-500 mb-4">
                                        <MessageSquare size={20} className="text-primary-green" />
                                        <span className="text-xs font-black uppercase tracking-widest">Incoming Data</span>
                                    </div>
                                    <div className="text-4xl font-black text-white dark:text-white [data-theme='light']:text-zinc-900">{messages.length}</div>
                                    <p className="text-sm text-zinc-500 font-bold mt-1">Total Reports Received</p>
                                </div>

                                <button
                                    onClick={fetchMessages}
                                    disabled={isRefreshing}
                                    className="w-full flex items-center justify-center gap-4 p-6 bg-white/5 dark:bg-zinc-900/50 [data-theme='light']:bg-black/5 border border-white/10 [data-theme='light']:border-zinc-200 rounded-3xl text-white dark:text-white [data-theme='light']:text-zinc-900 font-black hover:bg-white/10 transition-all group"
                                >
                                    <RefreshCcw size={20} className={`text-primary-purple group-hover:rotate-180 transition-transform ${isRefreshing ? 'animate-spin' : ''}`} />
                                    SYNC DATABASE
                                </button>
                            </div>

                            {/* Inbox Area */}
                            <div className="lg:col-span-3 space-y-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck size={20} className="text-primary-green" />
                                        <span className="text-sm font-black text-white dark:text-white [data-theme='light']:text-zinc-900 uppercase tracking-[4px]">Verified Reports</span>
                                    </div>
                                    <div className="text-[10px] font-mono font-bold text-zinc-600 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                                        SECURE CHANNEL • {new Date().toLocaleDateString()}
                                    </div>
                                </div>

                                {/* ... existing messages list logic ... */}
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-40">
                                        <RefreshCcw size={40} className="text-primary-green animate-spin" />
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="bg-zinc-900/30 border border-dashed border-white/10 rounded-[40px] py-32 flex flex-col items-center justify-center text-center px-6">
                                        {/* ... no data ... */}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {messages.map((m) => (
                                            /* ... message card ... */
                                            <div key={m._id} className="bg-zinc-900/50 [data-theme='light']:bg-white border border-white/10 [data-theme='light']:border-zinc-200 rounded-[32px]">
                                                {/* Re-using existing structure but with theme-aware classes */}
                                                <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                                                    <div className="md:col-span-2 space-y-2">
                                                        <h4 className="text-lg font-black text-white dark:text-white [data-theme='light']:text-zinc-900 truncate">{m.subject}</h4>
                                                        <div className="text-xs text-zinc-500 font-bold">{m.name} • {m.email}</div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-zinc-600 font-mono text-[10px]">{new Date(m.createdAt).toLocaleString()}</div>
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button onClick={() => setSelectedMessage(selectedMessage?._id === m._id ? null : m)} className="w-12 h-12 bg-white/5 dark:bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-zinc-500"><Eye size={20} /></button>
                                                        <button onClick={() => deleteMessage(m._id)} className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500"><Trash2 size={20} /></button>
                                                    </div>
                                                </div>
                                                {selectedMessage?._id === m._id && (
                                                    <div className="p-8 border-t border-white/10 dark:border-white/10 [data-theme='light']:border-zinc-200 bg-black/40 dark:bg-black/40 [data-theme='light']:bg-zinc-50">
                                                        <p className="text-zinc-300 dark:text-zinc-300 [data-theme='light']:text-zinc-700 whitespace-pre-wrap">{m.message}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto w-full">
                            <div className="p-10 bg-zinc-900/50 [data-theme='light']:bg-white border border-white/10 [data-theme='light']:border-zinc-200 rounded-[40px] shadow-2xl">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-14 h-14 bg-primary-purple/10 rounded-2xl flex items-center justify-center text-primary-purple">
                                        <ShieldCheck size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white dark:text-white [data-theme='light']:text-zinc-900 tracking-tight uppercase">Security Configuration</h3>
                                        <p className="text-xs text-zinc-500 font-bold tracking-[0.2em] uppercase">Update Access Credentials</p>
                                    </div>
                                </div>

                                <form onSubmit={handleChangePassword} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">Current Entry Key</label>
                                        <input
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-black dark:bg-black [data-theme='light']:bg-zinc-100 border border-white/10 [data-theme='light']:border-zinc-200 rounded-2xl px-6 py-4 text-white dark:text-white [data-theme='light']:text-zinc-900 focus:outline-none focus:border-primary-purple transition-all font-mono"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">New Entry Key</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-black dark:bg-black [data-theme='light']:bg-zinc-100 border border-white/10 [data-theme='light']:border-zinc-200 rounded-2xl px-6 py-4 text-white dark:text-white [data-theme='light']:text-zinc-900 focus:outline-none focus:border-primary-purple transition-all font-mono"
                                            required
                                        />
                                    </div>
                                    <button className="w-full flex items-center justify-center gap-3 bg-primary-purple text-white font-black py-4 rounded-2xl shadow-xl shadow-primary-purple/20 hover:scale-105 active:scale-95 transition-all">
                                        UPDATE SECURITY KEY
                                        <Zap size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </Section>
        </div>
    )
}

export default Admin
