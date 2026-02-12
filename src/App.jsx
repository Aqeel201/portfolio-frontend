import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState, useLayoutEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Header from './components/Header'
import { ToastProvider } from './components/Toast'
import SplashScreen from './components/SplashScreen'

const PageWrapper = ({ children }) => {
  const { pathname } = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useLayoutEffect(() => {
    setIsTransitioning(true)
    window.scrollTo(0, 0)
    const timer = setTimeout(() => setIsTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className={`transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 translate-y-4 blur-sm' : 'opacity-100 translate-y-0 blur-0 animate-slide-in'}`}>
      {children}
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  const [showSplash, setShowSplash] = useState(!sessionStorage.getItem('splash_shown'))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const handleSplashFinish = () => {
    setShowSplash(false)
    sessionStorage.setItem('splash_shown', 'true')
  }

  return (
    <ToastProvider>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <div className={`min-h-screen bg-[#050505] transition-colors duration-500 ${theme === 'light' ? 'bg-zinc-50' : ''}`}>
          <div className="aurora" />
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main>
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
            </Routes>
          </main>
        </div>
      )}
    </ToastProvider>
  )
}

export default App
