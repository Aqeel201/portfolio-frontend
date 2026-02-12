function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black">
            {/* Aurora effect defined in index.css */}
            <div className="aurora opacity-40" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

            {/* Particles */}
            <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * -20}s`,
                            animationDuration: `${15 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60" />
        </div>
    )
}

export default AnimatedBackground
