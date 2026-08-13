import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './ProductSection.css'

const OUTCOMES = [
  'Less handling of finished cattle.',
  'Less labour tied to pulling IDs at shipping.',
  'Records from the scan, not a second trip through the chute.',
]

const ProductSection = () => {
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
      id="product" 
      ref={sectionRef}
      className={`product-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <h2 className="section-title">How it works</h2>
        
        <div className="product-content product-content--teaser">
          <div className="product-description">
            <p className="product-text">
              Cattle walk the alley. Tags read at range. Records for transfers, manifests,
              and export follow, without the extra chute trip on finished cattle.
            </p>
          </div>

          <ul className="product-teaser-outcomes">
            {OUTCOMES.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>

          <div className="product-teaser-cta">
            <Link to="/product" className="btn btn-primary">
              See the product
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductSection
