import { useEffect, useRef, useState } from 'react'
import './CTASection.css'

const CTASection = () => {
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

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="cta"
      ref={sectionRef}
      className={`cta-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <div className="cta-inner">
          <h2 className="cta-headline">Ready to modernize your cattle tracking?</h2>
          <p className="cta-support">
            Built in Lethbridge for feedlot operators who need RFID tracking, manifest
            building, and online management without the extra chute trips.
          </p>
          <button type="button" className="btn btn-primary cta-button" onClick={scrollToContact}>
            Get in touch
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection
