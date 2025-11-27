import './BackgroundSection.css'

const BackgroundSection = () => {
  return (
    <section id="background" className="background-section section">
      <div className="container">
        <h2 className="section-title">Our Background</h2>
        
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
          
          <div className="background-timeline">
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h4 className="timeline-title">Company Founded</h4>
                <p className="timeline-description">
                  HerdLinx was established with a mission to revolutionize cattle management 
                  through innovative technology solutions.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h4 className="timeline-title">Product Development</h4>
                <p className="timeline-description">
                  Intensive research and development phase, including partnerships with 
                  agricultural institutions and field testing with early adopters.
                </p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h4 className="timeline-title">Market Launch</h4>
                <p className="timeline-description">
                  Preparing for commercial launch and expanding our reach to feedlots and 
                  farms across the region.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* EDITABLE CONTENT END */}
      </div>
    </section>
  )
}

export default BackgroundSection

