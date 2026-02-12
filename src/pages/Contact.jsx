import { useState } from 'react'
import {
  Mail,
  MessageSquare,
  Send,
  User,
  AtSign,
  FileText,
  Sparkles,
  Heart,
  ArrowUpRight,
  MessageCircle,
  Smartphone,
  CheckCircle2
} from 'lucide-react'
import profile from '../data/profile'
import Section from '../components/Section'

function Contact() {
  const primaryEmail = profile.contacts.emails[0]
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setStatus('success')
        e.target.reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="pt-24 md:pt-28">
      <Section eyebrow="Connect" title="Start a Conversation" icon={<MessageSquare size={18} />}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Quick Contact Cards */}
          <div className="lg:col-span-2 space-y-6">
            <a href={`mailto:${primaryEmail}`} className="group flex items-center gap-6 p-8 bg-zinc-900/50 border border-white/10 rounded-3xl hover:border-primary-green hover:bg-primary-green/5 transition-all shadow-xl">
              <div className="w-14 h-14 bg-white/5  flex items-center justify-center rounded-2xl text-primary-green group-hover:scale-110 transition-transform">
                <Mail size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">EMAIL ME</span>
                <h3 className="text-lg font-bold text-white truncate">{primaryEmail}</h3>
              </div>
              <ArrowUpRight size={20} className="text-zinc-700 group-hover:text-primary-green transition-colors" />
            </a>

            <a href={profile.contacts.whatsappLink} target="_blank" rel="noreferrer" className="group flex items-center gap-6 p-8 bg-zinc-900/50 border border-white/10 rounded-3xl hover:border-emerald-500 hover:bg-emerald-500/5 transition-all shadow-xl">
              <div className="w-14 h-14 bg-white/5 flex items-center justify-center rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
                <MessageCircle size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">WHATSAPP</span>
                <h3 className="text-lg font-bold text-white truncate">{profile.contacts.whatsapp}</h3>
              </div>
              <ArrowUpRight size={20} className="text-zinc-700 group-hover:text-emerald-500 transition-colors" />
            </a>

            <div className="p-8 bg-gradient-to-br from-primary-cyan/10 to-primary-green/10 border border-white/5 rounded-3xl shadow-2xl relative overflow-hidden">
              <Sparkles className="absolute -right-4 -top-4 w-32 h-32 text-white/5 -rotate-12" />
              <h4 className="text-xl font-black text-white mb-4 leading-tight uppercase tracking-tight">Open for Global Partnerships & Remote Roles</h4>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed mb-6">
                Looking for a senior developer with strong data discipline and architectural vision? Let's connect.
              </p>
              <div className="flex items-center gap-4 text-xs font-black text-primary-cyan uppercase tracking-widest">
                <Smartphone size={16} />
                AVAILABLE NOW
              </div>
            </div>
          </div>

          {/* Luxury Form */}
          <div className="lg:col-span-3 bg-zinc-900/50 border border-white/10 p-10 md:p-14 rounded-[40px] shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 mb-12">
              <Sparkles size={20} className="text-primary-green" />
              <span className="text-sm font-black text-zinc-500 uppercase tracking-[4px]">Direct Message</span>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-xs font-black text-zinc-500 uppercase tracking-widest">
                    <User size={14} /> Full Name
                  </label>
                  <input name="name" type="text" placeholder="John Doe" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-green focus:shadow-[0_0_20px_rgba(0,245,160,0.1)] transition-all" required />
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-xs font-black text-zinc-500 uppercase tracking-widest">
                    <AtSign size={14} /> Email Address
                  </label>
                  <input name="email" type="email" placeholder="john@example.com" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-green focus:shadow-[0_0_20px_rgba(0,245,160,0.1)] transition-all" required />
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 text-xs font-black text-zinc-500 uppercase tracking-widest">
                  <FileText size={14} /> Subject
                </label>
                <input name="subject" type="text" placeholder="Project Inquiry" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-green focus:shadow-[0_0_20px_rgba(0,245,160,0.1)] transition-all" required />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 text-xs font-black text-zinc-500 uppercase tracking-widest">
                  <MessageSquare size={14} /> Your Message
                </label>
                <textarea name="message" rows="6" placeholder="Tell me about your vision..." className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-green focus:shadow-[0_0_20px_rgba(0,245,160,0.1)] transition-all resize-none" required />
              </div>

              <button
                disabled={status === 'sending'}
                className={`group w-full flex items-center justify-center gap-4 text-black font-black text-lg py-5 rounded-2xl shadow-xl transition-all ${status === 'success' ? 'bg-emerald-500' : 'bg-primary-green hover:scale-[1.02] active:scale-95 shadow-primary-green/20'}`}
                type="submit"
              >
                {status === 'sending' ? (
                  <span className="animate-pulse tracking-widest">DISPATCHING...</span>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={20} />
                    <span>MESSAGE DISPATCHED</span>
                  </>
                ) : (
                  <>
                    <span>DISPATCH MESSAGE</span>
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
              {status === 'error' && <p className="text-center text-rose-500 text-[10px] font-black uppercase tracking-widest">Connection Error. Port 5000 Offline.</p>}
            </form>
          </div>
        </div>
      </Section>

      <Section eyebrow="Synergy" title="Personal Interests" icon={<Heart size={18} />}>
        <div className="flex flex-wrap gap-4 pt-4">
          {profile.interests.map((interest, idx) => (
            <div key={idx} className="flex items-center gap-3 px-6 py-3 bg-zinc-900/50 border border-white/10 rounded-2xl text-zinc-400 font-bold hover:bg-primary-purple/10 hover:border-primary-purple/30 hover:text-white transition-all cursor-default group">
              <Sparkles size={16} className="text-primary-purple group-hover:scale-125 transition-transform" />
              <span>{interest}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

export default Contact
