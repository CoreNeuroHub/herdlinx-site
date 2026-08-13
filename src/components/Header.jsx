import { useState, useEffect } from 'react'
import logoImage from '../images/logo_gold_nobg.png'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  const scrollToSection = (sectionId) => {
    closeMenu()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`header ${isScrolled || isMenuOpen ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        <div className="logo" onClick={() => scrollToSection('hero')}>
          <img src={logoImage} alt="HerdLinx RFID Solutions" className="logo-image" />
        </div>
        <nav id="site-nav" className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollToSection('about')} className="nav-link">
            About
          </button>
          <button onClick={() => scrollToSection('product')} className="nav-link">
            Product
          </button>
          <button onClick={() => scrollToSection('partners')} className="nav-link">
            Partners
          </button>
          <button onClick={() => scrollToSection('background')} className="nav-link">
            Background
          </button>
          <button onClick={() => scrollToSection('team')} className="nav-link">
            The Team
          </button>
          <button onClick={() => scrollToSection('contact')} className="nav-cta">
            Contact
          </button>
        </nav>
        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="site-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>
      </div>
    </header>
  )
}

export default Header
