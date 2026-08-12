import { useEffect, useState } from 'react'
import './HeroSection.css'
import backgroundImage from '../images/background.jpg'

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className={`hero-section ${isLoaded ? 'loaded' : ''}`}>
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-brand">HerdLinx</p>
        <h1 className="hero-headline">
          RFID tracking for cattle movement, identification, and compliance
        </h1>
        <p className="hero-support">
          Real-time visibility across pen transfers, manifest building, and online
          management — built for feedlot operators who demand accuracy.
        </p>
        <div className="hero-cta-group">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => scrollToSection('contact')}
          >
            Request a demo
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => scrollToSection('product')}
          >
            See the product
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
