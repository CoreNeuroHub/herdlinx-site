import './ProductSection.css'

const ProductSection = () => {
  return (
    <section id="product" className="product-section section">
      <div className="container">
        <h2 className="section-title">Our Product</h2>
        <p className="section-subtitle">Wireless RF Mesh System for Cattle Tracking and Monitoring</p>
        
        {/* EDITABLE CONTENT START */}
        {/* TODO: Replace this content with actual product details */}
        <div className="product-content">
          <div className="product-description">
            <h3 className="product-title">Advanced Wireless Mesh Technology</h3>
            <p className="product-text">
              Our wireless RF mesh system represents a breakthrough in livestock monitoring 
              technology. Designed specifically for feedlots and large-scale farming operations, 
              this robust network infrastructure enables comprehensive tracking and real-time 
              monitoring of cattle across extensive areas.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">RF</div>
              <h4 className="feature-title">Mesh Network Architecture</h4>
              <p className="feature-description">
                Self-organizing mesh network ensures reliable connectivity even in challenging 
                agricultural environments with extensive coverage areas.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">GPS</div>
              <h4 className="feature-title">Real-Time Tracking</h4>
              <p className="feature-description">
                Continuous location monitoring provides instant visibility into herd movements 
                and individual animal positioning throughout your operation.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">HEALTH</div>
              <h4 className="feature-title">Health Monitoring</h4>
              <p className="feature-description">
                Advanced sensors collect vital health metrics, enabling early detection of 
                potential issues and proactive herd management.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">POWER</div>
              <h4 className="feature-title">Long Battery Life</h4>
              <p className="feature-description">
                Optimized power management ensures extended operational periods with minimal 
                maintenance requirements.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">APP</div>
              <h4 className="feature-title">Mobile Dashboard</h4>
              <p className="feature-description">
                Access comprehensive herd data and analytics through intuitive mobile and 
                web interfaces, available anytime, anywhere.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">SEC</div>
              <h4 className="feature-title">Secure Data</h4>
              <p className="feature-description">
                Enterprise-grade security protocols protect sensitive operational data and 
                ensure compliance with agricultural data standards.
              </p>
            </div>
          </div>
          
          <div className="product-benefits">
            <h3 className="benefits-title">Key Benefits</h3>
            <ul className="benefits-list">
              <li>Improved operational efficiency through automated monitoring</li>
              <li>Enhanced animal welfare with proactive health management</li>
              <li>Reduced labor costs through automated tracking systems</li>
              <li>Data-driven decision making with comprehensive analytics</li>
              <li>Scalable solution that grows with your operation</li>
            </ul>
          </div>
        </div>
        {/* EDITABLE CONTENT END */}
      </div>
    </section>
  )
}

export default ProductSection

