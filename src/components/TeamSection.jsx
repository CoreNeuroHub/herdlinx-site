import './TeamSection.css'

const TeamSection = () => {
  return (
    <section id="team" className="team-section section">
      <div className="container">
        <h2 className="section-title">Our Team</h2>
        
        {/* EDITABLE CONTENT START */}
        {/* TODO: Replace team member information with actual details */}
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">
              <span className="avatar-initials">BC</span>
            </div>
            <h3 className="member-name">Brad</h3>
            <p className="member-role">Chief Executive Officer</p>
            <p className="member-bio">
              Leading HerdLinx with strategic vision and deep understanding of 
              agricultural technology markets.
            </p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">
              <span className="avatar-initials">TBD</span>
            </div>
            <h3 className="member-name">[Name TBD]</h3>
            <p className="member-role">Co-Founder</p>
            <p className="member-bio">
              Partnering with Brad to build and grow HerdLinx into a leading 
              agricultural technology company.
            </p>
          </div>
        </div>
        
        <div className="partnership-section">
          <h3 className="partnership-title">In Partnership With</h3>
          <div className="partnership-content">
            <div className="partnership-logo">
              <span className="logo-text">Neurohub</span>
            </div>
            <p className="partnership-description">
              HerdLinx is proud to partner with the Neurohub at the University of Lethbridge. 
              This collaboration brings together cutting-edge research capabilities and 
              innovative technology development to advance the future of agricultural 
              monitoring systems.
            </p>
            <p className="partnership-description">
              Through this partnership, we leverage academic expertise in neuroscience, 
              data analytics, and sensor technology to enhance our product development 
              and ensure our solutions are grounded in rigorous scientific research.
            </p>
          </div>
        </div>
        {/* EDITABLE CONTENT END */}
      </div>
    </section>
  )
}

export default TeamSection

