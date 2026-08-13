import { useState, useEffect, useRef } from 'react'
import './TeamSection.css'
import bradImage from '../images/team/brad.png'
import kerriImage from '../images/team/kerri.jpg'
import hardeepImage from '../images/team/hardeep-ryait.png'
import brendonImage from '../images/team/brendon-penner.png'
import karloImage from '../images/team/karlo-pecha.png'

const founders = [
  {
    name: 'Brad Vanderberg',
    role: 'President & Founder',
    bio: 'Born and raised in Lethbridge, Alberta. Eighteen years as an electrician running his own shop, plus prior UHF RFID work in livestock settings. That combination is what HerdLinx is built on: alley-based cattle identification that has to work in a real yard.',
    image: bradImage,
  },
  {
    name: 'Kerri Lynn Haney-Vanderberg',
    role: 'Secretary & Co-Founder',
    bio: 'Business organization and administration. Runs the company\'s structure and day-to-day direction with Brad.',
    image: kerriImage,
  },
]

const uLethbridgeTeam = [
  {
    name: 'Dr. Hardeep Ryait, P.Eng.',
    role: 'Assistant Professor, Engineering',
    bio: 'Brings hardware, software, and AI expertise from a practical, applied perspective.',
    image: hardeepImage,
  },
  {
    name: 'Brendon Penner',
    role: 'Operations Management',
    bio: 'Day-to-day operations across the team, partners, and field deployments.',
    image: brendonImage,
  },
  {
    name: 'Arnold Joseph Aguila',
    role: 'Software/Systems Developer',
    bio: 'Works across the stack, from device firmware to the dashboards operators actually use.',
    initials: 'AJA',
  },
  {
    name: 'Karlo Pecha',
    role: 'Software Developer',
    bio: 'Ships the application layer: APIs, services, and the operator-facing tools on top of them.',
    image: karloImage,
  },
]

const TeamMember = ({ member }) => (
  <div className="team-member">
    <div className={`member-avatar${member.initials ? ' member-avatar--placeholder' : ''}`}>
      {member.image ? (
        <img src={member.image} alt={member.name} className="avatar-image" />
      ) : (
        <span className="avatar-initials" aria-hidden="true">
          {member.initials}
        </span>
      )}
    </div>
    <h3 className="member-name">{member.name}</h3>
    <p className="member-role">{member.role}</p>
    <p className="member-bio">{member.bio}</p>
  </div>
)

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
          Founded in Lethbridge. Built with livestock RFID experience, a local trades
          background, and engineers at the University of Lethbridge.
        </p>

        <div className="team-grid">
          {founders.map((member) => (
            <TeamMember key={member.name} member={member} />
          ))}
        </div>

        <div className="team-group">
          <p className="team-group-label">University of Lethbridge</p>
          <p className="team-group-note">Core Hub for Engineering</p>
          <div className="team-grid">
            {uLethbridgeTeam.map((member) => (
              <TeamMember key={member.name} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection
