import { useEffect, useRef, useState } from 'react'
import './HeroSection.css'
import backgroundImage from '../images/background.jpg'
import heroVideo from '../videos/Herdlinx Hero BG.mp4'

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncPlayback = () => {
      if (motionQuery.matches) {
        video.pause()
      } else {
        video.play().catch(() => {})
      }
    }

    syncPlayback()
    motionQuery.addEventListener('change', syncPlayback)

    return () => motionQuery.removeEventListener('change', syncPlayback)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className={`hero-section ${isLoaded ? 'loaded' : ''}`}>
      <video
        ref={videoRef}
        className="hero-background"
        autoPlay
        muted
        loop
        playsInline
        poster={backgroundImage}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-brand">Herdlinx</p>
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
