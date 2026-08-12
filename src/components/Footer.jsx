import { useEffect, useRef, useState } from 'react'
import './Footer.css'
import logoImage from '../images/Logo.jpg'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      ref={footerRef}
      className={`footer fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo" onClick={() => scrollToSection('hero')}>
              <img src={logoImage} alt="HerdLinx Logo" className="footer-logo-image" />
              <span className="footer-logo-text">HerdLinx</span>
            </div>
            <p className="footer-description">
              RFID tracking for cattle movement, identification, manifest building,
              and online management — built for feedlot operators.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-column-title">Navigation</h3>
              <ul className="footer-link-list">
                <li><button onClick={() => scrollToSection('about')} className="footer-link">About</button></li>
                <li><button onClick={() => scrollToSection('product')} className="footer-link">Product</button></li>
                <li><button onClick={() => scrollToSection('background')} className="footer-link">Background</button></li>
                <li><button onClick={() => scrollToSection('team')} className="footer-link">The Team</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="footer-link">Contact</button></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Contact</h3>
              <ul className="footer-link-list">
                <li>
                  <a href="mailto:brad@herdlinx.ca" className="footer-link">
                    brad@herdlinx.ca
                  </a>
                </li>
                <li>
                  <p className="footer-text">Lethbridge, Alberta, Canada</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} HerdLinx. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
