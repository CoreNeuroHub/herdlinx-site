import { useState, useEffect, useRef } from 'react'
import './BackgroundSection.css'
import backgroundImage from '../images/background.jpg'

const BackgroundSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

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

  return (
    <section 
      id="background" 
      ref={sectionRef}
      className={`background-section section fade-in-section ${isVisible ? 'visible' : ''}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <h2 className="section-title">Background</h2>
        
        {/* EDITABLE CONTENT START */}
        {/* TODO: Replace this content with actual company background */}
        <div className="background-content">
          <div className="background-story">
            <p className="story-text">
              HerdLinx was founded with a vision to bridge the gap between traditional 
              agricultural practices and modern technological innovation. Recognizing the 
              growing need for efficient livestock management solutions in an increasingly 
              complex agricultural landscape, our team set out to develop a system that 
              would empower feedlot operators and farmers with unprecedented visibility 
              into their operations.
            </p>
            
            <p className="story-text">
              The journey began with extensive research into the challenges faced by 
              modern agricultural operations. Through collaboration with industry experts, 
              feedlot managers, and agricultural researchers, we identified critical pain 
              points in cattle tracking, health monitoring, and operational efficiency. 
              This foundation of real-world understanding has shaped every aspect of our 
              product development.
            </p>
            
            <p className="story-text">
              Our commitment to innovation is matched by our dedication to understanding 
              the agricultural industry. We believe that technology should serve the needs 
              of those who work the land, and our solutions are designed with this principle 
              at their core. As we continue to grow and evolve, we remain focused on 
              delivering value to our clients and advancing the future of smart agriculture.
            </p>
          </div>
        </div>
        {/* EDITABLE CONTENT END */}
      </div>
    </section>
  )
}

export default BackgroundSection

