import { useState, useEffect, useRef } from 'react'
import './InformativeSection.css'
import slide1 from '../images/slides/image1.jpg'
import slide2 from '../images/slides/image2.jpg'
import slide3 from '../images/slides/image3.jpg'

const InformativeSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef(null)

  const slides = [slide1, slide2, slide3]

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

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`informative-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <h2 className="section-title">The Challenge</h2>
        <p className="section-subtitle">
          Cattle trade demands accurate identification and tracking to meet regulations and ensure operational efficiency.
        </p>

        <div className="content-wrapper">
          <div className="content-block">
            <h3 className="content-title">Low-frequency tags read at inches. UHF reads in the alley.</h3>
            <p className="content-text">
              CCIA compliance runs on low-frequency tags that need the animal at the reader.
              Finished cattle headed to export often take an extra chute trip just to pull
              that data for paperwork. HerdLinx uses UHF RFID to capture tags as cattle move,
              building the records feedlots need for pen transfers, manifests, and export
              documentation without that extra handling.
            </p>
          </div>

          <div className="content-image-wrapper">
            <div className="slideshow-container">
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide}
                  alt={`Cattle tracking operation ${index + 1}`}
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
      </div>
    </section>
  )
}

export default InformativeSection
