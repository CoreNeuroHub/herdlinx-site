import { useState, useEffect } from 'react'
import logoImage from '../images/Logo.jpg'
import './Header.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo" onClick={() => scrollToSection('about')}>
          <img src={logoImage} alt="HerdLinx Logo" className="logo-image" />
          <h1>HerdLinx</h1>
        </div>
        <nav className="nav">
          <button onClick={() => scrollToSection('about')} className="nav-link">
            About
          </button>
          <button onClick={() => scrollToSection('product')} className="nav-link">
            Product
          </button>
          <button onClick={() => scrollToSection('background')} className="nav-link">
            Background
          </button>
          <button onClick={() => scrollToSection('team')} className="nav-link">
            Our Team
          </button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">
            Contact
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header

