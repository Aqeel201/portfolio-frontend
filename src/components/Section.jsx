import { useRef, useEffect, useState } from 'react'

function Section({ eyebrow, title, icon, children }) {
    const sectionRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section 
            ref={sectionRef} 
            className={`max-w-6xl mx-auto px-6 mb-24 group reveal ${isVisible ? 'reveal-visible' : ''}`}
        >
            <header className="mb-12">
                <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full w-fit mb-6 shadow-inner group-hover:border-primary-cyan/40 transition-colors">
                    <span className="text-primary-cyan group-hover:scale-110 transition-transform">{icon}</span>
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[4px]">{eyebrow}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    {title}
                </h2>
            </header>
            <div className="relative">
                <div className="absolute -left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary-cyan/20 via-transparent to-transparent hidden xl:block" />
                {children}
            </div>
        </section>
    )
}

export default Section
