import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoImage from '../images/logo_gold_nobg.png'
import { navigateToHomeSection, scrollToSection } from '../utils/navigation'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

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

  const handleHomeSection = (sectionId) => {
    closeMenu()
    if (location.pathname === '/') {
      scrollToSection(sectionId)
    } else {
      navigateToHomeSection(navigate, sectionId)
    }
  }

  const handleLogoClick = () => {
    closeMenu()
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  const isProductPage = location.pathname === '/product'
  const isFaqPage = location.pathname === '/faq'
  const isSubPage = isProductPage || isFaqPage

  return (
    <header
      className={`header ${isScrolled || isMenuOpen || isSubPage ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
    >
      <div className="header-container">
        <div className="logo" onClick={handleLogoClick} role="link" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}>
          <img src={logoImage} alt="HerdLinx RFID Solutions" className="logo-image" />
        </div>
        <nav id="site-nav" className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <button onClick={() => handleHomeSection('about')} className="nav-link" type="button">
            About
          </button>
          <Link to="/product" className="nav-link nav-link--route" onClick={closeMenu}>
            Product
          </Link>
          <button onClick={() => handleHomeSection('partners')} className="nav-link" type="button">
            Partners
          </button>
          <button onClick={() => handleHomeSection('team')} className="nav-link" type="button">
            Team
          </button>
          <Link to="/faq" className="nav-link nav-link--route" onClick={closeMenu}>
            FAQ
          </Link>
          <button onClick={() => handleHomeSection('contact')} className="nav-cta" type="button">
            Request a demo
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
