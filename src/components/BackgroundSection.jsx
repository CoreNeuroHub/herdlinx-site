import { useState, useEffect, useRef } from 'react'
import './BackgroundSection.css'
import backgroundImage from '../images/background2.jpg'

const BackgroundSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const backgroundRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !backgroundRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate parallax offset when section is in viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height)
        const parallaxOffset = scrollProgress * 200 // Adjust speed (200px max movement)
        backgroundRef.current.style.transform = `translateY(${parallaxOffset}px)`
      }
    }

    // Use requestAnimationFrame for smooth performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section 
      id="background" 
      ref={sectionRef}
      className={`background-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div 
        ref={backgroundRef}
        className="background-image-parallax"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="container">
        <h2 className="section-title">Background</h2>
        
        <div className="background-content">
          <div className="background-story">
            <p className="story-text">
              HerdLinx is built in Lethbridge, Alberta. CCIA compliance still runs on
              low-frequency tags that read at inches. For finished cattle headed to export,
              that often means an extra squeeze-chute trip just to pull tag data for
              paperwork. The chute is not going anywhere. Cattle go through it plenty across
              their time in the yard. This is about the one run you can cut: the
              export-document scan on finished cattle.
            </p>

            <p className="story-text">
              Ultra-high-frequency RFID reads at range. Cattle walk the shipping alley at
              their own pace, a modular antenna captures every tag, and the export records
              build themselves. Founder Brad Vanderberg came to this after prior UHF RFID
              work in livestock settings, plus 18 years as an electrician running his own
              shop in Lethbridge.
            </p>

            <p className="story-text">
              HerdLinx puts identification in the alley, not the chute. Less labour. Less
              handling stress. Every animal recorded, with live data you can act on. See our
              founding partners for where the system is running today.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BackgroundSection

