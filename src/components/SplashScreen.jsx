import React, { useState, useEffect } from 'react';
import { Shield, Zap, Lock, ShieldCheck, Cpu } from 'lucide-react';

const SplashScreen = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('INITIALIZING BOOT SEQUENCE...');
    const [isVisible, setIsVisible] = useState(true);

    const stages = [
        { threshold: 10, text: 'LOADING KERNEL MODULES...' },
        { threshold: 30, text: 'ESTABLISHING SECURE UPLINK...' },
        { threshold: 50, text: 'SCANNING FOR BREACHES...' },
        { threshold: 70, text: 'DECRYPTING PERSONAL ASSETS...' },
        { threshold: 90, text: 'SYSTEM ONLINE. WELCOME, AQEEL.' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsVisible(false);
                        setTimeout(onFinish, 800);
                    }, 1000);
                    return 100;
                }
                const next = prev + Math.floor(Math.random() * 5) + 2;

                const currentStage = stages.find(s => next >= s.threshold && prev < s.threshold);
                if (currentStage) setStatus(currentStage.text);

                return next > 100 ? 100 : next;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onFinish]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[10000] bg-[#050505] flex items-center justify-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
            <div className="max-w-md w-full px-10 flex flex-col items-center">
                {/* Logo Animation */}
                <div className="relative mb-12 group">
                    <div className="absolute inset-0 bg-primary-cyan/20 blur-[50px] animate-pulse rounded-full" />
                    <div className="relative w-32 h-32 bg-zinc-900 border border-white/10 rounded-[40px] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/20 to-primary-green/20" />
                        <Shield size={60} className="text-primary-cyan animate-bounce" />

                        {/* Scanning Effect */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-cyan/50 shadow-[0_0_15px_#00f5a0] animate-[scan_2s_ease-in-out_infinite]" />
                    </div>
                </div>

                {/* Progress Content */}
                <div className="w-full space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-[10px] font-mono font-black text-primary-cyan/50 tracking-[0.3em] uppercase">Security Status</p>
                            <p className="text-sm font-black text-white tracking-widest">{status}</p>
                        </div>
                        <p className="text-2xl font-black text-primary-green font-mono">{progress}%</p>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div
                            className="h-full bg-gradient-to-r from-primary-cyan to-primary-green transition-all duration-300 ease-out relative shadow-[0_0_15px_rgba(0,245,160,0.5)]"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute top-0 right-0 w-4 h-full bg-white animate-pulse" />
                        </div>
                    </div>

                    <div className="flex justify-between pt-2">
                        <div className="flex gap-2 text-zinc-700">
                            <Cpu size={12} />
                            <Lock size={12} />
                            <ShieldCheck size={12} />
                        </div>
                        <p className="text-[10px] font-mono text-zinc-600 font-bold uppercase tracking-widest">Protocol: V3.1.2</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
