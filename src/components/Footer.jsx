import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Heart,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Code2
} from 'lucide-react'
import profile from '../data/profile'

function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary-green rounded-xl flex items-center justify-center text-black">
                <Code2 size={20} />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white uppercase">{profile.name}</span>
            </div>
            <p className="text-zinc-500 font-medium max-w-sm leading-relaxed">
              Crafting high-fidelity digital experiences with precision engineering and architectural vision. Let's build the future together.
            </p>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-fit">
              <ShieldCheck size={16} className="text-primary-green" />
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[2px]">Verified Architect</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-[4px]">Navigation</h4>
            <nav className="flex flex-col gap-4 text-zinc-500 font-bold text-sm">
              <a href="/" className="hover:text-primary-green transition-colors">Home Studio</a>
              <a href="/about" className="hover:text-primary-green transition-colors">Background</a>
              <a href="/projects" className="hover:text-primary-green transition-colors">Engineering</a>
              <a href="/contact" className="hover:text-primary-green transition-colors">Collaboration</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-[4px]">Connect</h4>
            <div className="flex flex-col gap-4 text-zinc-500 font-bold text-sm">
              <a href={`mailto:${profile.contacts.emails[0]}`} className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={16} className="text-primary-cyan" />
                {profile.contacts.emails[0]}
              </a>
              <a href={profile.contacts.whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={16} className="text-primary-green" />
                WhatsApp Me
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-zinc-600 font-mono text-[10px] uppercase font-black tracking-[4px]">
            Made with <Heart size={12} className="text-rose-500 animate-pulse" /> by {profile.name}
          </div>
          <div className="text-zinc-700 font-mono text-[10px] uppercase font-black tracking-[2px]">
            © {new Date().getFullYear()} ARCHITECTURAL PORTFOLIO
          </div>
        </div>
      </div>

      {/* Visual Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary-green/20 to-transparent" />
    </footer>
  )
}

export default Footer
