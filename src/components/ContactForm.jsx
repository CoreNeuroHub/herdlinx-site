import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import './ContactForm.css'

const INTEREST_OPTIONS = [
  { value: 'demo', label: 'Request a demo' },
  { value: 'partnership', label: 'Partnership inquiry' },
  { value: 'investment', label: 'Investment inquiry' },
  { value: 'general', label: 'General inquiry' },
]

const ContactForm = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    interest: 'demo',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' })
  const [showModal, setShowModal] = useState(false)

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const buildEmailMessage = () => {
    const interestLabel = INTEREST_OPTIONS.find((o) => o.value === formData.interest)?.label || formData.interest
    const lines = [
      `Interest: ${interestLabel}`,
      formData.organization ? `Organization: ${formData.organization}` : null,
      formData.phone ? `Phone: ${formData.phone}` : null,
      '',
      formData.message,
    ].filter(Boolean)
    return lines.join('\n')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: buildEmailMessage(),
          to_email: 'brad@herdlinx.ca',
          reply_to: formData.email,
        },
        publicKey
      )

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your interest. We will be in touch shortly.',
      })
      setFormData({
        name: '',
        email: '',
        organization: '',
        phone: '',
        interest: 'demo',
        message: '',
      })
      setShowModal(true)
    } catch (error) {
      console.error('Email sending failed:', error)
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again or contact us directly at brad@herdlinx.ca',
      })
      setShowModal(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-subtitle">
          Tell us about your operation. We respond to every inquiry personally.
        </p>

        <div className="contact-content">
          <aside className="contact-info">
            <h3 className="info-title">Get in touch</h3>
            <p className="info-text">
              Whether you are a feedlot operator, farmer, investor, or potential partner,
              we are here to discuss how Herdlinx can support your operation.
            </p>
            <div className="info-details">
              <p className="info-item">
                <span className="info-label">Email</span>
                <a href="mailto:brad@herdlinx.ca" className="info-link">brad@herdlinx.ca</a>
              </p>
              <p className="info-item">
                <span className="info-label">Location</span>
                <span>Lethbridge, Alberta, Canada</span>
              </p>
            </div>
          </aside>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="organization" className="form-label">Organization</label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="form-input"
                  autoComplete="organization"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone <span className="form-optional">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="interest" className="form-label">I am interested in</label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="form-select"
                required
              >
                {INTEREST_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                required
                rows="5"
              />
            </div>

            <button
              type="submit"
              className="form-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </div>

        {showModal && submitStatus.message && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
              >
                ×
              </button>
              <div className={`modal-icon ${submitStatus.type === 'success' ? 'modal-success' : 'modal-error'}`}>
                {submitStatus.type === 'success' ? '✓' : '✕'}
              </div>
              <h3 className="modal-title">
                {submitStatus.type === 'success' ? 'Message sent' : 'Something went wrong'}
              </h3>
              <p className="modal-message">{submitStatus.message}</p>
              <button
                className="modal-button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ContactForm
