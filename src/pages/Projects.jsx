import {
  FolderKanban,
  Languages,
  Code2,
  Rocket,
  Globe,
  ExternalLink,
  ChevronRight,
  Database,
  Smartphone
} from 'lucide-react'
import profile from '../data/profile'
import Section from '../components/Section'

function Projects() {
  return (
    <div className="pt-24 md:pt-28">
      <Section eyebrow="Portfolio" title="Selected Engineering" icon={<FolderKanban size={18} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profile.projects.map((p, i) => (
            <article key={i} className="flex flex-col bg-zinc-900/50 border border-white/10 rounded-[32px] overflow-hidden hover:border-primary-green/30 hover:-translate-y-2 transition-all shadow-2xl group">
              <div className="h-56 bg-zinc-950 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opactiy-60" />
                <div className="text-primary-green/20 group-hover:text-primary-green transition-colors duration-700 animate-float">
                  {i % 3 === 0 && <Smartphone size={72} strokeWidth={1} />}
                  {i % 3 === 1 && <Code2 size={72} strokeWidth={1} />}
                  {i % 3 === 2 && <Database size={72} strokeWidth={1} />}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <span className="font-mono text-[10px] font-black text-primary-cyan tracking-[3px] uppercase mb-4">{p.period}</span>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-primary-green transition-colors">{p.name}</h3>
                <p className="text-zinc-400 font-medium mb-8 flex-1 leading-relaxed">{p.summary}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {p.stack.map(s => (
                    <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-zinc-500 uppercase tracking-widest">{s}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 transition-all">
                      <ExternalLink size={18} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-500 hover:text-white hover:bg-white/10 transition-all">
                      <Code2 size={18} />
                    </button>
                  </div>
                  <button className="flex items-center gap-2 text-zinc-400 font-bold text-sm hover:text-white transition-colors">
                    Details
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Global" title="Communication Skills" icon={<Languages size={18} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {profile.languages.map((lang, idx) => (
            <div key={idx} className="flex gap-8 p-10 bg-zinc-900/50 border border-white/10 rounded-3xl items-center shadow-xl group hover:bg-primary-cyan/5 transition-all">
              <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-primary-cyan group-hover:scale-110 transition-transform shadow-inner">
                <Globe size={36} strokeWidth={1.5} />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-black text-white tracking-tight">{lang.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[2px]">{lang.level}</span>
                    <span className="text-xs font-mono font-bold text-primary-cyan">
                      {lang.level === 'Native' ? '100%' : '85%'}
                    </span>
                  </div>
                  <div className="h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-primary-cyan to-primary-green rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                      style={{ width: lang.level === 'Native' ? '100%' : '85%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

export default Projects
