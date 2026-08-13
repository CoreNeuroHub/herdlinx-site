import { useState, useEffect, useRef } from 'react'
import './PartnersSection.css'
import kolkLogo from '../images/partners/kolk-farms.png'
import albertaInnovatesLogo from '../images/partners/alberta-innovates.png'
import uLethbridgeLogo from '../images/partners/university-of-lethbridge.png'
import hubLogo from '../images/partners/hub-for-neuroengineering-solutions.png'

const foundingPartner = {
  name: 'Kolk Farms',
  role: 'Signed Founding Partner',
  description:
    'Commercial validation on a working southern Alberta feedlot. Kolk Farms is where HerdLinx scanning and tracking runs in daily yard operations.',
  logos: [{ src: kolkLogo, alt: 'Kolk Farms Ltd.' }],
}

const researchPartners = [
  {
    name: 'Alberta Innovates',
    description:
      'Funding and support for validating UHF RFID in commercial feedlot settings. Alberta Innovates is part of the research deployment backing the HerdLinx build.',
    logos: [{ src: albertaInnovatesLogo, alt: 'Alberta Innovates' }],
  },
  {
    name: 'University of Lethbridge',
    description:
      'A university research deployment supporting the build and the proof. Working with researchers at the University of Lethbridge to validate the system in the field.',
    logos: [
      { src: uLethbridgeLogo, alt: 'University of Lethbridge' },
      { src: hubLogo, alt: 'Hub for Neuroengineering Solutions' },
    ],
  },
]

const PartnerCard = ({ partner }) => (
  <div className="partner-card">
    {partner.role ? <p className="partner-role">{partner.role}</p> : null}
    <div className={`partner-logo-wrap${partner.logos.length > 1 ? ' partner-logo-wrap--pair' : ''}`}>
      {partner.logos.map((logo) => (
        <img key={logo.alt} src={logo.src} alt={logo.alt} className="partner-logo" />
      ))}
    </div>
    <p className="partner-description">{partner.description}</p>
  </div>
)

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
          HerdLinx is in commercial validation with a signed founding partner and research
          deployments with Alberta Innovates and the University of Lethbridge.
        </p>

        <div className="partners-grid">
          <PartnerCard partner={foundingPartner} />

          <div className="partners-research">
            <p className="partner-role">Research deployment</p>
            <div className="partners-research-grid">
              {researchPartners.map((partner) => (
                <PartnerCard key={partner.name} partner={partner} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersSection
