import { useEffect, useRef, useState } from 'react'
import { scrollToSection } from '../utils/navigation'
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

  return (
    <section
      id="cta"
      ref={sectionRef}
      className={`cta-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <div className="cta-inner">
          <h2 className="cta-headline">See it on cattle, not on a slide.</h2>
          <p className="cta-support">
            Built in Lethbridge for feedlot operators who need alley reads, movement records,
            and export IDs without the extra chute trip.
          </p>
          <button
            type="button"
            className="btn btn-primary cta-button"
            onClick={() => scrollToSection('contact')}
          >
            Request a demo
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTASection
