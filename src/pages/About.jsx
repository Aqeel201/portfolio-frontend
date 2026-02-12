import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Building2,
  BookOpen,
  Star,
  ShieldCheck,
  Zap
} from 'lucide-react'
import profile from '../data/profile'
import Section from '../components/Section'

function About() {
  return (
    <div className="pt-24 md:pt-28">
      <Section eyebrow="Excellence" title="My Background" icon={<User size={18} />}>
        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-radial-gradient from-primary-green/5 to-transparent -z-10" />

          <div className="flex items-center gap-4 mb-8">
            <ShieldCheck size={32} className="text-primary-green drop-shadow-[0_0_10px_#00f5a0]" />
            <h3 className="text-2xl font-bold text-white">Philosophy & Focus</h3>
          </div>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium mb-10">
            {profile.about}
          </p>

          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill) => (
              <span key={skill} className="flex items-center gap-2 px-5 py-2.5 bg-zinc-950 border border-white/10 rounded-full text-sm font-bold text-primary-green shadow-xl">
                <Star size={14} />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Career" title="Professional Experience" icon={<Briefcase size={18} />}>
        <div className="space-y-6">
          {profile.experience.map((item, idx) => (
            <article key={idx} className="grid grid-cols-1 lg:grid-cols-4 bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all shadow-xl">
              <div className="p-8 lg:p-10 bg-black/40 flex flex-col justify-center gap-4">
                <span className="font-mono text-sm font-black text-primary-cyan tracking-widest">{item.period}</span>
                <div className="flex items-center gap-3 font-bold text-white">
                  <Building2 size={18} className="text-zinc-500" />
                  <span>{item.org}</span>
                </div>
              </div>
              <div className="lg:col-span-3 p-8 lg:p-10">
                <h3 className="text-2xl font-bold flex items-center gap-4 mb-6 text-white">
                  <Award size={24} className="text-primary-green" />
                  {item.role}
                </h3>
                <ul className="space-y-4">
                  {item.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-400 font-medium">
                      <Zap size={14} className="text-primary-cyan mt-1.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Learning" title="Academic Foundation" icon={<GraduationCap size={18} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.education.map((edu, idx) => (
            <div key={idx} className="flex gap-6 p-8 bg-zinc-900/50 border border-white/10 rounded-3xl hover:bg-primary-purple/5 hover:border-primary-purple/20 transition-all shadow-lg group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary-purple group-hover:scale-110 transition-transform">
                <BookOpen size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                <p className="text-zinc-500 font-semibold">{edu.school}</p>
                <div className="flex items-center gap-2 text-zinc-600 font-mono text-xs font-bold uppercase tracking-tight">
                  <Calendar size={14} />
                  <span>{edu.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

export default About
