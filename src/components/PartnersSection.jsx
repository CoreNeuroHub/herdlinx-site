import { useState, useEffect, useRef } from 'react'
import './PartnersSection.css'
import kolkLogo from '../images/partners/kolk-farms.png'
import albertaInnovatesLogo from '../images/partners/alberta-innovates.png'
import uLethbridgeLogo from '../images/partners/university-of-lethbridge.png'

const partners = [
  {
    name: 'Kolk Farms',
    role: 'Signed Founding Partner',
    description:
      'Commercial validation on a working southern Alberta feedlot. Kolk Farms is where Herdlinx scanning and tracking runs in daily yard operations.',
    logo: kolkLogo,
    logoAlt: 'Kolk Farms Ltd.',
  },
  {
    name: 'Alberta Innovates',
    role: 'Research deployment',
    description:
      'Funding and support for validating UHF RFID in commercial feedlot settings. Alberta Innovates is part of the research deployment backing the Herdlinx build.',
    logo: albertaInnovatesLogo,
    logoAlt: 'Alberta Innovates',
  },
  {
    name: 'University of Lethbridge',
    role: 'Research deployment',
    description:
      'A university research deployment supporting the build and the proof. Working with researchers at the University of Lethbridge to validate the system in the field.',
    logo: uLethbridgeLogo,
    logoAlt: 'University of Lethbridge',
  },
]

const PartnersSection = () => {
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
      id="partners"
      ref={sectionRef}
      className={`partners-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <h2 className="section-title">Founding Partners</h2>
        <p className="section-subtitle">
          Herdlinx is in commercial validation with a signed founding partner and research
          deployments with Alberta Innovates and the University of Lethbridge.
        </p>

        <div className="partners-grid">
          {partners.map((partner) => (
            <div key={partner.name} className="partner-card">
              <div className="partner-logo-wrap">
                <img src={partner.logo} alt={partner.logoAlt} className="partner-logo" />
              </div>
              <p className="partner-role">{partner.role}</p>
              <h3 className="partner-name">{partner.name}</h3>
              <p className="partner-description">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
