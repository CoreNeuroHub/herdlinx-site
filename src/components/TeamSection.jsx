import { useState, useEffect, useRef } from 'react'
import './TeamSection.css'
import bradImage from '../images/team/brad.png'
import kerriImage from '../images/team/kerri.jpg'

const TeamSection = () => {
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
      id="team" 
      ref={sectionRef}
      className={`team-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <h2 className="section-title">The Team</h2>
        <p className="section-subtitle">
          Founded in Lethbridge, Alberta — built by operators who understand feedlot operations firsthand.
        </p>

        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">
              <img src={bradImage} alt="Brad Vanderberg" className="avatar-image" />
            </div>
            <h3 className="member-name">Brad Vanderberg</h3>
            <p className="member-role">President & Founder</p>
            <p className="member-bio">
              Born and raised in Lethbridge, Alberta, Brad brings over 18 years of experience as an electrician, running his own successful business. He leveraged his technical expertise and deep understanding of feedlot operations to start a new venture focused on solving real-world challenges in cattle management.
            </p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">
              <img src={kerriImage} alt="Kerri Lynn Haney-Vanderberg" className="avatar-image" />
            </div>
            <h3 className="member-name">Kerri Lynn Haney-Vanderberg</h3>
            <p className="member-role">Secretary & Co-Founder</p>
            <p className="member-bio">
              With a strong background in business organization and administration, Kerri brings invaluable support to the team, helping guide the company's direction and growth alongside Brad.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection
