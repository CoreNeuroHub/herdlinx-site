import { useState, useEffect, useRef } from 'react'
import { FaGlobe, FaRoute, FaNetworkWired, FaClipboardCheck } from 'react-icons/fa'
import './ProductSection.css'
import logoImage from '../images/Logo_inverted.png'

const ProductSection = () => {
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
      id="product" 
      ref={sectionRef}
      className={`product-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div 
        ref={backgroundRef}
        className="product-background-parallax"
      >
        {logoPositions.map((logo) => (
          <img
            key={logo.id}
            ref={(el) => {
              if (el) logoRefs.current[logo.id] = el
            }}
            src={logoImage}
            alt=""
            className="product-background-logo"
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
        <h2 className="section-title">Our Product</h2>
        
        {/* EDITABLE CONTENT START */}
        <div className="product-content">
          <div className="product-description">
            <h3 className="product-title">Advanced Wireless Mesh Technology</h3>
            <p className="product-text">
            Our RFID UHF Mesh Solutions simplify cattle export, import, and pen management with real-time tracking and compliance-ready reporting. From feedlot transfers to large-scale operations, we deliver accurate identification, streamlined processes, and enhanced biosecurity across every stage of cattle movement.
            </p>
          </div>
          
          <h3 className="features-section-title">Key Features – In Development</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FaGlobe />
              </div>
              <h4 className="feature-title">Global-Ready Identification</h4>
              <p className="feature-description">
                UHF RFID tags ensure accurate animal ID for export/import documentation and traceability.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaRoute />
              </div>
              <h4 className="feature-title">Pen-to-Pen Movement Tracking</h4>
              <p className="feature-description">
                Monitor cattle transfers within your feedlot to optimize space and reduce handling errors.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaNetworkWired />
              </div>
              <h4 className="feature-title">Wireless Mesh Connectivity</h4>
              <p className="feature-description">
                Reliable, self-healing network for continuous data flow across large facilities.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <FaClipboardCheck />
              </div>
              <h4 className="feature-title">Compliance & Reporting</h4>
              <p className="feature-description">
                Generate export/import reports that meet international standards with ease.
              </p>
            </div>
          </div>
          
          <div className="product-benefits">
            <h3 className="benefits-title">Benefits</h3>
            <ul className="benefits-list">
              <li>Streamline Export Processes: Automate ID verification and reduce paperwork delays.</li>
              <li>Improve Operational Efficiency: Track cattle movements without manual intervention.</li>
              <li>Enhance Biosecurity: Maintain accurate records for disease control and traceability.</li>
              <li>Scalable & Flexible: Adaptable for small feedlots or large export hubs.</li>
            </ul>
          </div>

        </div>
        {/* EDITABLE CONTENT END */}
      </div>
    </section>
  )
}

export default ProductSection

