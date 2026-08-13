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
        
        <div className="product-content">
          <div className="product-description">
            <h3 className="product-title">UHF RFID for feedlot operations</h3>
            <p className="product-text">
              Core scanning and tracking is live. Herdlinx captures animal ID as cattle move,
              then builds the records feedlots need for transfers, manifests, and export paperwork.
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
                UHF antennas read tags as cattle walk designated alleys. Every animal is recorded
                without a chute stop or a hand-held reader.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FaRoute />
              </div>
              <h4 className="feature-title">Pen-to-pen movement</h4>
              <p className="feature-description">
                Track transfers within your feedlot. Know which animals moved, when, and where,
                without manual head counts.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FaNetworkWired />
              </div>
              <h4 className="feature-title">Yard-wide network</h4>
              <p className="feature-description">
                A self-healing network keeps data flowing across large facilities, from alley
                readers to your management dashboard.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">
                <FaClipboardCheck />
              </div>
              <h4 className="feature-title">Export and import records</h4>
              <p className="feature-description">
                Build manifests and export documentation from live scan data. Cut the extra
                chute trip on finished cattle headed across the border.
              </p>
            </div>
          </div>
          
          <div className="product-benefits">
            <h3 className="benefits-title">Benefits</h3>
            <ul className="benefits-list">
              <li>Capture export IDs as cattle move down the shipping alley, not in the squeeze chute.</li>
              <li>Reduce handling stress and labour on finished cattle headed to market.</li>
              <li>Keep accurate movement records for biosecurity and traceability.</li>
              <li>Scale from single-alley installs to full-yard coverage.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductSection
