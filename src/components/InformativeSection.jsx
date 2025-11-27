import { useState, useEffect, useRef } from 'react'
import './InformativeSection.css'
import backgroundImage from '../images/background.jpg'
import slide1 from '../images/slides/image1.jpg'
import slide2 from '../images/slides/image2.jpg'
import slide3 from '../images/slides/image3.jpg'

const InformativeSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef(null)

  const slides = [
    slide1,
    slide2,
    slide3,
  ]

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

  // Auto-advance slideshow
  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`informative-section section fade-in-section ${isVisible ? 'visible' : ''}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">
        <h2 className="section-title">Building RFID Solutions for Feedlot Automation</h2>
        
        {/* EDITABLE CONTENT START */}
        {/* TODO: Replace this content with actual company information */}
        <div className="content-wrapper">
          <div className="content-block">
            <h3 className="content-title">Cattle trade demands accurate ID and tracking to meet regulations and ensure efficiency.</h3>
            <p className="content-text">
            Our RFID UHF wireless mesh system provides a robust solution for managing cattle across borders and within feedlots. From pen-to-pen transfers to large-scale export operations, we deliver real-time visibility and compliance-ready data..
            </p>
          </div>

          <div className="content-image-wrapper">
            <div className="slideshow-container">
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className={`content-image ${index === currentSlide ? 'active' : ''}`}
                />
              ))}
            </div>
            {slides.length > 1 && (
              <div className="slideshow-indicators">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
        {/* EDITABLE CONTENT END */}
      </div>
    </section>
  )
}

export default InformativeSection

