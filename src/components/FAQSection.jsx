import { useState, useEffect, useRef } from 'react'
import './FAQSection.css'

const FAQ_ITEMS = [
  {
    question: 'Where is HerdLinx running today?',
    answer:
      'In commercial validation at Kolk Farms, a southern Alberta feedlot, with research deployments involving Alberta Innovates and the University of Lethbridge.',
  },
  {
    question: 'What is live?',
    answer:
      'Alley scanning and tracking are in use with our founding partner. The system is built to capture ID as cattle move and to produce transfer, manifest, and export records from that data.',
  },
  {
    question: 'Who is it for?',
    answer:
      'Feedlot operators who need accurate ID and movement records, especially yards shipping finished cattle for export, plus groups exploring partnership or investment.',
  },
  {
    question: 'Does this replace the chute?',
    answer:
      'No. Cattle still go through the chute when the job requires it. HerdLinx is aimed at the extra identification run on finished cattle, and at capturing movement without a person on the rail with a hand-held reader.',
  },
  {
    question: 'How does HerdLinx relate to CCIA tags?',
    answer:
      'Cattle keep their CCIA low-frequency tags for compliance. HerdLinx adds UHF tags so the alley can read at range: dual tags, one animal, two read methods for two jobs.',
  },
  {
    question: 'I am a partner or investor.',
    answer:
      'Use the contact form and choose partnership or investment. We will follow up with the right conversation. HerdLinx is based in Lethbridge and is in commercial validation with a signed founding partner.',
  },
  {
    question: 'What happens when I request a demo?',
    answer:
      'Tell us about your operation. We respond personally and set up a walkthrough of the system.',
  },
]

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
    <button
      type="button"
      className="faq-question"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span>{item.question}</span>
      <span className="faq-icon" aria-hidden="true">
        {isOpen ? '−' : '+'}
      </span>
    </button>
    {isOpen && <p className="faq-answer">{item.answer}</p>}
  </div>
)

const FAQSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)
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
      ref={sectionRef}
      className={`faq-section faq-section--page section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <h1 className="section-title">FAQ</h1>
        <p className="section-subtitle">
          Common questions from feedlot operators, partners, and investors.
        </p>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
