import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { navigateToHomeSection, scrollToSection } from '../utils/navigation'
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
  const navigate = useNavigate()
  const location = useLocation()

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

  const handleHomeSection = (sectionId) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId)
    } else {
      navigateToHomeSection(navigate, sectionId)
    }
  }

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
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
              <div className="footer-logo" onClick={handleLogoClick} role="link" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}>
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
              UHF RFID for cattle movement, identification, and the records that follow.
              Built in Lethbridge for feedlot operators.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h3 className="footer-column-title">Navigation</h3>
              <ul className="footer-link-list">
                <li><button onClick={() => handleHomeSection('about')} className="footer-link" type="button">About</button></li>
                <li><Link to="/product" className="footer-link">Product</Link></li>
                <li><button onClick={() => handleHomeSection('partners')} className="footer-link" type="button">Partners</button></li>
                <li><button onClick={() => handleHomeSection('team')} className="footer-link" type="button">Team</button></li>
                <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                <li><button onClick={() => handleHomeSection('contact')} className="footer-link" type="button">Request a demo</button></li>
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
