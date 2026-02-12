import { useState, useEffect } from 'react'
import { Menu, X, Send, Sun, Moon, ChevronRight } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'

function Header({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ]

  const getPageName = () => {
    if (location.pathname === '/') return 'HOME'
    return location.pathname.substring(1).toUpperCase()
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass-header' : 'py-8 bg-transparent'
          }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Current Section */}
          <div className="flex items-center gap-6">
            <NavLink to="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-cyan to-primary-green rounded-xl flex items-center justify-center text-black font-black text-xl shadow-lg shadow-primary-cyan/20 group-hover:scale-110 transition-transform">
                A
              </div>
              <span className="hidden sm:block text-white font-black text-xl tracking-tight [data-theme='light']:text-zinc-900">AQEEL <span className="text-primary-cyan">PORTFOLIO</span></span>
            </NavLink>

            {/* Current Section Indicator */}
            <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-white/10 h-8">
              <ChevronRight size={14} className="text-primary-green animate-pulse" />
              <span className="text-[10px] font-black text-primary-green tracking-[4px] uppercase">{getPageName()}</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `px-6 py-2.5 rounded-xl text-sm font-bold transition-all uppercase tracking-widest ${isActive
                    ? 'text-primary-green bg-white/5 shadow-inner'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white [data-theme='light']:text-zinc-900 hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <NavLink
              to="/contact"
              className="hidden md:flex items-center gap-2 bg-primary-green text-black font-black px-6 py-3 rounded-xl shadow-lg shadow-primary-green/20 hover:scale-105 active:scale-95 transition-all text-sm"
            >
              HIRE
              <Send size={18} />
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white [data-theme='light']:text-zinc-900"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Content */}
        <div
          className={`absolute right-0 top-0 h-full w-[300px] bg-zinc-950 border-l border-white/10 p-10 flex flex-col transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="self-end w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-zinc-500 hover:text-white mb-10"
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-4xl font-black transition-colors uppercase tracking-tighter ${isActive ? 'text-primary-green' : 'text-white/40 hover:text-white'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto space-y-6">
            <p className="text-xs font-black text-zinc-600 uppercase tracking-widest">Available for projects</p>
            <NavLink
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full flex items-center justify-center gap-3 bg-primary-green text-black font-black py-5 rounded-2xl"
            >
              GET IN TOUCH
              <Send size={18} />
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
