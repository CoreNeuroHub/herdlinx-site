import { useState, useEffect, useRef } from 'react'
import { FaGlobe, FaRoute, FaNetworkWired, FaClipboardCheck } from 'react-icons/fa'
import './ProductSection.css'

const ProductDetails = () => {
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
      ref={sectionRef}
      className={`product-section product-section--page section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <h1 className="section-title">How it works</h1>

        <div className="product-content">
          <div className="product-description">
            <h2 className="product-title">Cattle walk. The alley reads. The records follow.</h2>
            <p className="product-text">
              Alley scanning and movement tracking are in daily use with our founding partner.
              HerdLinx captures animal ID as cattle move, then builds the transfer, manifest,
              and export records feedlots already have to produce.
            </p>
          </div>

          <h3 className="features-section-title">What the system does</h3>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <FaGlobe />
              </div>
              <h4 className="feature-title">Alley scanning</h4>
              <p className="feature-description">
                UHF antennas read tags as cattle walk designated alleys, without a chute stop
                or a hand-held reader.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaRoute />
              </div>
              <h4 className="feature-title">Pen-to-pen movement</h4>
              <p className="feature-description">
                See which animals moved, when, and where, without a manual head count.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaNetworkWired />
              </div>
              <h4 className="feature-title">Yard-wide coverage</h4>
              <p className="feature-description">
                Readers stay connected across a large facility, from the alley to one
                management view.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <FaClipboardCheck />
              </div>
              <h4 className="feature-title">Export and import records</h4>
              <p className="feature-description">
                Build manifests and export documentation from scan data. Cut the extra chute
                trip on finished cattle headed across the border.
              </p>
            </div>
          </div>

          <div className="product-benefits">
            <h3 className="benefits-title">What that means in the yard</h3>
            <ul className="benefits-list">
              <li>Less handling of finished cattle.</li>
              <li>Less labour tied to pulling IDs at shipping.</li>
              <li>
                Movement and export records taken from the scan, not from a second trip through
                the chute.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
