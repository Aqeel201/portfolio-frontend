import { useEffect, useState, useMemo } from 'react'
import {
  MapPin,
  Phone,
  Smartphone,
  FileCode,
  Layers,
  Cpu,
  TerminalSquare,
  Activity,
  Play,
  Package,
  Cloud,
  Rocket,
  Star,
  ArrowRight,
  Code2,
  Server,
  Monitor,
  Database
} from 'lucide-react'
import profile from '../data/profile'
import heroImage from '../assets/profile.png'

const CodingRain = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Background Digital Stream */}
      <div className="absolute inset-0 flex justify-around opacity-[0.15]">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="w-[1.5px] h-full bg-gradient-to-b from-transparent via-primary-green to-transparent animate-[matrix_var(--duration)_linear_infinite]"
            style={{
              '--duration': `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 5}s`,
              left: `${i * 4}%`,
            }}
          />
        ))}
      </div>

      {/* Active Code Decrypting Effect */}
      <div className="absolute inset-0 grid grid-cols-12 gap-0.5 p-1 font-mono text-[9px] text-primary-green/10 overflow-hidden">
        {[...Array(180)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse flex flex-col items-center opacity-40"
            style={{ animationDelay: `${Math.random() * 3}s` }}
          >
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </div>
        ))}
      </div>

      {/* Top-down Scan Laser */}
      <div className="absolute inset-x-0 h-[2px] bg-primary-green/30 blur-[2px] animate-[scanner_4s_ease-in-out_infinite] z-30" />

      <div className="absolute inset-0 bg-radial-gradient from-primary-green/5 to-transparent blur-3xl" />
    </div>
  )
}

function Home() {
  const words = ['React Native', 'Node.js', 'Mobile Developer', 'UI/UX Design', 'Full Stack', 'Cloud Architecture']
  const [focusIndex, setFocusIndex] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [codeStep, setCodeStep] = useState(0)
  const [buildStep, setBuildStep] = useState(0)
  const primaryEmail = profile.contacts.emails[0]

  // Luxury Syntax Highlighting Data
  const codeFiles = useMemo(() => [
    {
      name: 'portfolio.tsx',
      lines: [
        { type: 'keyword', text: 'import' },
        { type: 'module', text: ' React ' },
        { type: 'keyword', text: 'from' },
        { type: 'string', text: ' "react"' },
        { type: 'keyword', text: 'export const' },
        { type: 'variable', text: ' Developer' },
        { type: 'operator', text: ' = ' },
        { type: 'bracket', text: '() => {' },
        { type: 'keyword', text: '  const' },
        { type: 'variable', text: ' skills' },
        { type: 'operator', text: ' = ' },
        { type: 'bracket', text: '[' },
        { type: 'string', text: '"React Native"' },
        { type: 'punctuation', text: ',' },
        { type: 'string', text: ' "Node.js"' },
        { type: 'bracket', text: ']' },
        { type: 'punctuation', text: ';' },
        { type: 'keyword', text: '  return' },
        { type: 'bracket', text: ' (' },
        { type: 'jsx-tag', text: '    <App ' },
        { type: 'jsx-prop', text: 'available' },
        { type: 'operator', text: '=' },
        { type: 'bracket', text: '{' },
        { type: 'keyword', text: 'true' },
        { type: 'bracket', text: '} ' },
        { type: 'jsx-tag', text: '/>' },
        { type: 'bracket', text: '  )' },
        { type: 'bracket', text: '}' },
      ],
    },
    {
      name: 'api.js',
      lines: [
        { type: 'keyword', text: 'const' },
        { type: 'variable', text: ' express' },
        { type: 'operator', text: ' = ' },
        { type: 'func', text: "require('express')" },
        { type: 'keyword', text: 'const' },
        { type: 'variable', text: ' app' },
        { type: 'operator', text: ' = ' },
        { type: 'func', text: 'express()' },
        { type: 'comment', text: '// High-speed API interface' },
        { type: 'variable', text: 'app' },
        { type: 'punctuation', text: '.' },
        { type: 'func', text: 'get' },
        { type: 'bracket', text: '(' },
        { type: 'string', text: '"/api/status"' },
        { type: 'punctuation', text: ',' },
        { type: 'bracket', text: ' (req, res) => {' },
        { type: 'keyword', text: '  res' },
        { type: 'punctuation', text: '.' },
        { type: 'func', text: 'status' },
        { type: 'bracket', text: '(' },
        { type: 'number', text: '200' },
        { type: 'bracket', text: ')' },
        { type: 'punctuation', text: '.' },
        { type: 'func', text: 'send' },
        { type: 'bracket', text: '(' },
        { type: 'string', text: '"Best Engineering"' },
        { type: 'bracket', text: ')' },
        { type: 'bracket', text: '})' },
        { type: 'punctuation', text: ';' },
      ],
    },
  ], [])

  useEffect(() => {
    const id = setInterval(() => setFocusIndex((prev) => (prev + 1) % words.length), 2500)
    return () => clearInterval(id)
  }, [words.length])

  useEffect(() => {
    setCodeStep(0)
    setBuildStep(0)
    let timer = setInterval(() => {
      setCodeStep(prev => {
        if (prev >= codeFiles[activeTab].lines.length) {
          clearInterval(timer)
          setTimeout(() => setBuildStep(1), 500)
          setTimeout(() => setBuildStep(2), 1000)
          setTimeout(() => setBuildStep(3), 1500)
          setTimeout(() => setBuildStep(4), 3000)
          return prev
        }
        return prev + 1
      })
    }, 40)
    return () => clearInterval(timer)
  }, [activeTab, codeFiles])

  return (
    <div className="pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-primary-green/5 border border-primary-green/20 rounded-full text-primary-green text-sm font-bold tracking-wide">
            <span className="w-2 h-2 bg-primary-green rounded-full shadow-[0_0_10px_#00f5a0] animate-pulse" />
            OPEN FOR INNOVATION
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-green via-primary-cyan to-primary-purple animate-gradient-x">{profile.name}</span>
          </h1>

          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-xl md:text-2xl font-medium text-zinc-400">
            <span className="text-white font-bold">{profile.title}</span>
            <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full hidden sm:block" />
            <span className="flex items-center gap-2 text-primary-cyan">
              <Smartphone size={20} />
              Architect
            </span>
          </div>

          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {profile.about}
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <a href={`mailto:${primaryEmail}`} className="flex items-center justify-center gap-3 px-10 py-4 bg-primary-green text-black font-black rounded-2xl shadow-xl shadow-primary-green/20 hover:scale-105 active:scale-95 transition-all">
              START PROJECT
              <ArrowRight size={20} />
            </a>
            <a href={profile.contacts.whatsappLink} className="flex items-center justify-center gap-3 px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
              WHATSAPP
              <Phone size={18} />
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-3 text-zinc-500 font-semibold">
            <MapPin size={18} className="text-primary-purple" />
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Hero Visual - Enhanced Tech Nodes */}
        <div className="relative flex justify-center items-center">
          <div className="absolute w-[150%] h-[150%] bg-radial-gradient from-primary-green/10 to-transparent blur-3xl -z-10 animate-pulse" />

          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px]">
            {/* Orbitals */}
            <div className="absolute inset-0 border border-white/5 rounded-full scale-110 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-0 border border-white/10 rounded-full scale-125 border-dashed animate-[spin_90s_linear_infinite_reverse]" />
            <div className="absolute inset-0 border border-white/5 rounded-full scale-75" />

            {/* Expanded Tech Nodes */}
            {/* Top Node */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-20 p-4 bg-zinc-900/90 backdrop-blur-md border border-primary-cyan/30 rounded-2xl text-primary-cyan shadow-[0_0_20px_rgba(34,211,238,0.2)] animate-bounce">
              <Code2 size={28} />
            </div>
            {/* Bottom Node */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-20 p-4 bg-zinc-900/90 backdrop-blur-md border border-primary-green/30 rounded-2xl text-primary-green shadow-[0_0_20px_rgba(0,245,160,0.2)] animate-bounce [animation-delay:1s]">
              <Smartphone size={28} />
            </div>
            {/* Right Node */}
            <div className="absolute top-1/2 -right-16 -translate-y-1/2 z-20 p-4 bg-zinc-900/90 backdrop-blur-md border border-primary-purple/30 rounded-2xl text-primary-purple shadow-[0_0_20px_rgba(139,92,246,0.2)] animate-float">
              <Database size={28} />
            </div>
            {/* Left Node */}
            <div className="absolute top-1/2 -left-16 -translate-y-1/2 z-20 p-4 bg-zinc-900/90 backdrop-blur-md border border-amber-400/30 rounded-2xl text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.2)] animate-float [animation-delay:2s]">
              <Server size={28} />
            </div>

            {/* Main Image Container */}
            <div className="absolute inset-0 p-2 bg-gradient-to-br from-primary-green/30 to-primary-cyan/30 rounded-[60px] backdrop-blur-md border border-white/20 overflow-hidden group shadow-[0_0_50px_rgba(0,245,160,0.1)]">
              <div className="relative w-full h-full overflow-hidden rounded-[52px] bg-[#020202]">
                {/* Background Layer (Coding Rain) */}
                <CodingRain />
                
                {/* Profile Image with Professional Crop */}
                <img
                  src={heroImage}
                  alt={profile.name}
                  className="relative z-10 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 brightness-110 contrast-125 grayscale-[0.3] group-hover:grayscale-0"
                  style={{ 
                    objectPosition: '50% 15%', // Waist-up focus
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%), linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    maskComposite: 'intersect',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%), linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskComposite: 'source-in'
                  }}
                />

                {/* Digital Edge Glow */}
                <div className="absolute inset-0 z-20 border-[8px] border-primary-green/5 pointer-events-none rounded-[52px]" />
                
                {/* Foreground Detail Layer (Code bits over image) */}
                <div className="absolute inset-0 z-20 opacity-20 pointer-events-none mix-blend-screen">
                    <CodingRain />
                </div>
                
                {/* Subtle Vignette */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80 z-20" />
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-2.5 bg-zinc-900/90 backdrop-blur-2xl border border-primary-green/30 rounded-full text-[10px] font-black tracking-[4px] text-primary-green whitespace-nowrap z-30 shadow-[0_0_20px_rgba(0,245,160,0.3)] group-hover:scale-110 transition-transform">
                SYSTEM ARCHITECT v1.0.4
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Workspace */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="flex items-end justify-between mb-10 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <TerminalSquare size={32} className="text-primary-green" />
            <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">Studio Workspace</h2>
          </div>
          <div className="flex items-center gap-2 text-primary-cyan font-mono text-xs font-bold uppercase tracking-widest">
            <Activity size={16} className="animate-pulse" />
            Live Build
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-auto lg:h-[500px]">
          {/* Editor Side */}
          <div className="lg:col-span-3 flex flex-col bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex bg-black/20 border-b border-white/5">
              {codeFiles.map((file, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-6 py-4 font-mono text-xs font-bold transition-all border-r border-white/5 ${activeTab === i ? 'bg-zinc-900 text-primary-green border-b-2 border-b-primary-green' : 'text-zinc-500 hover:text-white'}`}
                >
                  <FileCode size={14} />
                  {file.name}
                </button>
              ))}
            </div>
            <div className="flex-1 p-6 font-mono text-sm overflow-y-auto bg-zinc-950/20">
              {codeFiles[activeTab].lines.slice(0, codeStep).map((l, i) => (
                <div key={i} className="flex gap-4 leading-relaxed group">
                  <span className="w-8 text-zinc-700 text-right select-none">{i + 1}</span>
                  <span className={`
                    ${l.type === 'keyword' ? 'text-purple-400' : ''}
                    ${l.type === 'variable' ? 'text-amber-200' : ''}
                    ${l.type === 'string' ? 'text-emerald-400' : ''}
                    ${l.type === 'module' ? 'text-blue-400' : ''}
                    ${l.type === 'operator' ? 'text-cyan-400' : ''}
                    ${l.type === 'jsx-tag' ? 'text-rose-400' : ''}
                    ${l.type === 'func' ? 'text-blue-400' : ''}
                    ${l.type === 'comment' ? 'text-zinc-600 italic' : ''}
                    ${!l.type ? 'text-zinc-300' : ''}
                  `}>
                    {l.text}
                  </span>
                </div>
              ))}
              <span className="inline-block w-2 h-5 bg-primary-green ml-1 animate-pulse align-middle" />
            </div>
            <div className="px-6 py-3 bg-black/20 flex justify-between items-center text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
              <div className="flex items-center gap-4">
                <span>Focus: <span className="text-white">{words[focusIndex]}</span></span>
              </div>
              <span>UTF-8 • React Main</span>
            </div>
          </div>

          {/* Terminal / Output Side */}
          <div className="lg:col-span-2 flex flex-col bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="px-5 py-4 bg-zinc-900/50 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Play size={14} className="text-zinc-500" />
                <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest">Compiler Terminal</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col gap-6">
              {/* Build Stages */}
              <div className={`flex items-center gap-4 transition-opacity duration-500 ${buildStep >= 1 ? 'opacity-100' : 'opacity-20'}`}>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary-cyan">
                  <Package size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold">Compiling Project</div>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 bg-primary-green rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />)}
                  </div>
                </div>
              </div>

              {/* GIF simulation - Motion Graphic */}
              <div className={`h-24 bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center relative transition-all duration-500 ${buildStep >= 2 ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-end gap-1.5 h-10">
                  {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                    <div key={i} className="w-2 bg-primary-green rounded-t-sm animate-pulse" style={{ height: `${h}%`, animationDuration: `${0.5 + i * 0.1}s` }} />
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-green/5 to-transparent -translate-x-full animate-[scanner_2s_linear_infinite]" />
                <span className="absolute bottom-2 font-mono text-[8px] font-black text-primary-green tracking-[4px]">OPTIMIZING CORE</span>
              </div>

              <div className={`flex items-center gap-4 transition-opacity duration-500 ${buildStep >= 3 ? 'opacity-100' : 'opacity-20'}`}>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary-purple">
                  <Cloud size={20} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold">Cloud Deployment</div>
                  <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-primary-purple transition-all duration-1000" style={{ width: buildStep >= 3 ? '100%' : '0%' }} />
                  </div>
                </div>
              </div>

              {/* Success Burst */}
              <div className={`flex-1 flex flex-col items-center justify-center text-center transition-all duration-700 ${buildStep >= 4 ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-primary-green/20 blur-xl animate-pulse rounded-full" />
                  <Rocket size={48} className="text-primary-green relative z-10" />
                </div>
                <h3 className="text-lg font-black text-white tracking-widest uppercase mb-1">Success</h3>
                <p className="text-xs font-bold text-zinc-500">Service deployed at {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Mobile', desc: 'React Native Expert', icon: Smartphone, color: 'text-primary-green', bg: 'bg-primary-green/5' },
            { title: 'Architecture', desc: 'Scalable Systems', icon: Server, color: 'text-primary-cyan', bg: 'bg-primary-cyan/5' },
            { title: 'Backend', desc: 'Node.js & Databases', icon: Database, color: 'text-primary-purple', bg: 'bg-primary-purple/5' },
            { title: 'UI/UX', desc: 'Pixel Perfect Design', icon: Monitor, color: 'text-amber-400', bg: 'bg-amber-400/5' }
          ].map((s, i) => (
            <div key={i} className="p-8 bg-zinc-900/50 border border-white/10 rounded-3xl hover:border-white/20 transition-all group">
              <div className={`w-14 h-14 ${s.bg} ${s.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <s.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-zinc-500 font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight text-white">READY FOR AN <span className="text-primary-green">EPIC</span> BUILD?</h2>
        <a href={`mailto:${primaryEmail}`} className="inline-flex items-center gap-4 px-12 py-5 bg-primary-green text-black font-black text-xl rounded-2xl shadow-2xl shadow-primary-green/30 hover:scale-105 active:scale-95 transition-all">
          HIRE ME NOW
          <Rocket size={24} />
        </a>
      </section>
    </div>
  )
}

export default Home
