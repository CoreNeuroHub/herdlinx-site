import './InformativeSection.css'

const InformativeSection = () => {
  return (
    <section id="about" className="informative-section section">
      <div className="container">
        <h2 className="section-title">About HerdLinx</h2>
        
        {/* EDITABLE CONTENT START */}
        {/* TODO: Replace this content with actual company information */}
        <div className="content-wrapper">
          <div className="content-block">
            <h3 className="content-title">Our Mission</h3>
            <p className="content-text">
              HerdLinx is dedicated to revolutionizing cattle management through innovative 
              technology solutions. We combine cutting-edge wireless mesh networking with 
              advanced monitoring systems to provide feedlots and farms with real-time insights 
              into their livestock operations.
            </p>
          </div>
          
          <div className="content-block">
            <h3 className="content-title">What We Do</h3>
            <p className="content-text">
              Our comprehensive tracking and monitoring systems enable agricultural operations 
              to optimize herd health, improve operational efficiency, and make data-driven 
              decisions. We understand the unique challenges faced by modern feedlots and farms, 
              and we're committed to delivering solutions that make a real difference.
            </p>
          </div>
          
          <div className="content-block">
            <h3 className="content-title">Our Commitment</h3>
            <p className="content-text">
              At HerdLinx, we believe in the power of technology to transform traditional 
              agriculture. Our solutions are designed to be reliable, scalable, and easy to 
              integrate into existing operations, helping our clients achieve better outcomes 
              for their livestock and their business.
            </p>
          </div>
        </div>
        {/* EDITABLE CONTENT END */}
      </div>
    </section>
  )
}

export default InformativeSection

