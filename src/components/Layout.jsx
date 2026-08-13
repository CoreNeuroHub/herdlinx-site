import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { scrollToSection } from '../utils/navigation'

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/') return

    const hash = location.hash.replace('#', '')
    if (!hash) return

    const timer = window.setTimeout(() => scrollToSection(hash), 100)
    return () => window.clearTimeout(timer)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (location.pathname !== '/' || location.hash) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname, location.hash])

  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
