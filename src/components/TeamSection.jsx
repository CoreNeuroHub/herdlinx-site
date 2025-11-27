import { useState, useEffect, useRef } from 'react'
import './TeamSection.css'
import bradImage from '../images/team/brad.png'
import kerriImage from '../images/team/kerri.png'
import logoImage from '../images/Logo_inverted.png'

const TeamSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [logoPositions, setLogoPositions] = useState([])
  const sectionRef = useRef(null)
  const backgroundRef = useRef(null)
  const logoRefs = useRef({})

  // Generate random logo positions and sizes without overlapping
  useEffect(() => {
    const logos = []
    const numLogos = 20
    const maxAttempts = 1000 // Maximum attempts to find a non-overlapping position
    
    // Use a reference container size for accurate collision detection
    // This assumes a typical viewport, but the calculation will scale proportionally
    const referenceWidth = 1920
    const referenceHeight = 1080
    
    // Helper function to check if two logos overlap
    const doLogosOverlap = (logo1, logo2) => {
      // Convert percentage positions to pixel positions based on reference size
      const x1 = (logo1.left / 100) * referenceWidth
      const y1 = (logo1.top / 100) * referenceHeight
      const x2 = (logo2.left / 100) * referenceWidth
      const y2 = (logo2.top / 100) * referenceHeight
      
      // Calculate distance between centers (in pixels)
      const dx = x1 - x2
      const dy = y1 - y2
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Calculate radii (half of size in pixels)
      const radius1 = logo1.size / 2
      const radius2 = logo2.size / 2
      
      // Add a small padding (10px) to prevent logos from touching
      const padding = 10
      
      // Check if distance is less than sum of radii + padding
      return distance < (radius1 + radius2 + padding)
    }
    
    // Helper function to check if a logo overlaps with any existing logos
    const overlapsWithAny = (newLogo, existingLogos) => {
      return existingLogos.some(existingLogo => doLogosOverlap(newLogo, existingLogo))
    }
    
    for (let i = 0; i < numLogos; i++) {
      let attempts = 0
      let logo = null
      
      // Try to find a non-overlapping position
      while (attempts < maxAttempts) {
        const candidate = {
          id: i,
          top: Math.random() * 100, // 0-100%
          left: Math.random() * 100, // 0-100%
          size: 60 + Math.random() * 120, // 60-180px
          rotation: Math.random() * 360, // 0-360 degrees
          parallaxSpeed: 50 + Math.random() * 200 // 50-250px max movement (different speeds)
        }
        
        if (!overlapsWithAny(candidate, logos)) {
          logo = candidate
          break
        }
        
        attempts++
      }
      
      // If we found a position, add it; otherwise skip this logo
      if (logo) {
        logos.push(logo)
      }
    }
    
    setLogoPositions(logos)
  }, [])

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

  // Parallax effect with different speeds for each logo
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate parallax offset when section is in viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height)
        
        // Apply different parallax speeds to each logo
        logoPositions.forEach((logo) => {
          const logoElement = logoRefs.current[logo.id]
          if (logoElement) {
            const parallaxOffset = scrollProgress * logo.parallaxSpeed
            const baseTransform = `translate(-50%, -50%) rotate(${logo.rotation}deg)`
            logoElement.style.transform = `${baseTransform} translateY(${parallaxOffset}px)`
          }
        })
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
  }, [logoPositions])

  return (
    <section 
      id="team" 
      ref={sectionRef}
      className={`team-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div 
        ref={backgroundRef}
        className="team-background-parallax"
      >
        {logoPositions.map((logo) => (
          <img
            key={logo.id}
            ref={(el) => {
              if (el) logoRefs.current[logo.id] = el
            }}
            src={logoImage}
            alt=""
            className="team-background-logo"
            style={{
              top: `${logo.top}%`,
              left: `${logo.left}%`,
              width: `${logo.size}px`,
              height: `${logo.size}px`,
              transform: `translate(-50%, -50%) rotate(${logo.rotation}deg)`
            }}
          />
        ))}
      </div>
      <div className="container">
        <h2 className="section-title">The Team</h2>
        
        {/* EDITABLE CONTENT START */}
        {/* TODO: Replace team member information with actual details */}
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">
              <img src={bradImage} alt="Brad Vanderberg" className="avatar-image" />
            </div>
            <h3 className="member-name">Brad Vanderberg</h3>
            <p className="member-role">President & Founder</p>
            <p className="member-bio">
            Born and raised in Lethbridge, Alberta, Brad brings over 18 years of experience as an electrician, running his own successful business. Brad decided to leverage his technical expertise and deep understanding of feedlot operations to start a new venture focused on solving real-world challenges in cattle management.
            </p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">
              <img src={kerriImage} alt="Kerri Lynn Haney-Vanderberg" className="avatar-image" />
            </div>
            <h3 className="member-name">Kerri Lynn Haney-Vanderberg</h3>
            <p className="member-role">Secretary & Co-Founder</p>
            <p className="member-bio">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        
        {/* <div className="partnership-section">
          <h3 className="partnership-title">In Partnership With</h3>
          <div className="partnership-content">
            <div className="partnership-logo">
              <span className="logo-text">Neurohub</span>
            </div>
            <p className="partnership-description">
              HerdLinx is proud to partner with the Neurohub at the University of Lethbridge. 
              This collaboration brings together cutting-edge research capabilities and 
              innovative technology development to advance the future of agricultural 
              monitoring systems.
            </p>
            <p className="partnership-description">
              Through this partnership, we leverage academic expertise in neuroscience, 
              data analytics, and sensor technology to enhance our product development 
              and ensure our solutions are grounded in rigorous scientific research.
            </p>
          </div>
        </div> */}
        {/* EDITABLE CONTENT END */}
      </div>
    </section>
  )
}

export default TeamSection

