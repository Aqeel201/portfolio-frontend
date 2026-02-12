import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4 max-w-md w-full pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-4 p-5 rounded-3xl border backdrop-blur-xl shadow-2xl animate-in slide-in-from-right-10 duration-500
                            ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                toast.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' :
                                    toast.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                                        'bg-primary-cyan/10 border-primary-cyan/20 text-primary-cyan'}`}
                    >
                        <div className="shrink-0">
                            {toast.type === 'success' && <CheckCircle size={24} />}
                            {toast.type === 'error' && <XCircle size={24} />}
                            {toast.type === 'warning' && <AlertCircle size={24} />}
                            {toast.type === 'info' && <Info size={24} />}
                        </div>
                        <p className="flex-1 text-sm font-black uppercase tracking-widest leading-relaxed">
                            {toast.message}
                        </p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};
