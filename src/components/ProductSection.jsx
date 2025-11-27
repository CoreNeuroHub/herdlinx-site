import { useState, useEffect, useRef } from 'react'
import { FaGlobe, FaRoute, FaNetworkWired, FaClipboardCheck } from 'react-icons/fa'
import './ProductSection.css'

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

