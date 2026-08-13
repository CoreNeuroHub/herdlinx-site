import { useEffect, useRef, useState } from 'react'
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import './Footer.css'
import logoImage from '../images/logo_gold_nobg.png'

const SOCIAL_LINKS = [
  {
    href: 'https://www.linkedin.com/company/herdlinx',
    label: 'HerdLinx on LinkedIn',
    Icon: FaLinkedinIn,
  },
  {
    href: 'https://x.com/HerdLinx',
    label: 'HerdLinx on X',
    Icon: FaXTwitter,
  },
  {
    href: 'https://www.instagram.com/herdlinx',
    label: 'HerdLinx on Instagram',
    Icon: FaInstagram,
  },
  {
    href: 'https://www.facebook.com/profile.php?id=61590823462971',
    label: 'HerdLinx on Facebook',
    Icon: FaFacebookF,
  },
]

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
            <div className="footer-brand-header">
              <div className="footer-logo" onClick={() => scrollToSection('hero')}>
                <img src={logoImage} alt="HerdLinx RFID Solutions" className="footer-logo-image" />
              </div>
              <div className="footer-social">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    className="footer-social-link"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <p className="footer-description">
              RFID tracking for cattle movement, identification, manifest building,
              and online management. Built for feedlot operators.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-column-title">Navigation</h3>
              <ul className="footer-link-list">
                <li><button onClick={() => scrollToSection('about')} className="footer-link">About</button></li>
                <li><button onClick={() => scrollToSection('product')} className="footer-link">Product</button></li>
                <li><button onClick={() => scrollToSection('partners')} className="footer-link">Partners</button></li>
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
