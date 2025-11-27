import './TeamSection.css'
import bradImage from '../images/team/brad.png'
import kerriImage from '../images/team/kerri.png'

const TeamSection = () => {
  return (
    <section id="team" className="team-section section">
      <div className="container">
        <h2 className="section-title">The Team</h2>
        
        {/* EDITABLE CONTENT START */}
        {/* TODO: Replace team member information with actual details */}
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">
              <img src={bradImage} alt="Brad Vanderberg" className="avatar-image" />
            </div>
            <h3 className="member-name">Brad Vanderberg</h3>
            <p className="member-role">President & Founder</p>
            <p className="member-bio">
            Born and raised in Lethbridge, Alberta, Brad brings over 18 years of experience as an electrician, running his own successful business. Brad decided to leverage his technical expertise and deep understanding of feedlot operations to start a new venture focused on solving real-world challenges in cattle management.
            </p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">
              <img src={kerriImage} alt="Kerri Lynn Haney-Vanderberg" className="avatar-image" />
            </div>
            <h3 className="member-name">Kerri Lynn Haney-Vanderberg</h3>
            <p className="member-role">Secretary & Co-Founder</p>
            <p className="member-bio">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        
        {/* <div className="partnership-section">
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
        </div> */}
        {/* EDITABLE CONTENT END */}
      </div>
    </section>
  )
}

export default TeamSection

