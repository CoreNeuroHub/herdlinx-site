import { useState } from 'react'
import './ContactForm.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement form submission logic
    // EDITABLE CONTENT: Replace this with actual form submission endpoint
    console.log('Form submitted:', formData)
    alert('Thank you for your interest! We will be in touch soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <h2 className="section-title">Find Out More</h2>
        <p className="section-subtitle">Get in touch with us to learn more about HerdLinx</p>
        
        {/* EDITABLE CONTENT START */}
        {/* TODO: Update form action and endpoint when backend is ready */}
        <div className="contact-content">
          <div className="contact-info">
            <h3 className="info-title">Contact Information</h3>
            <p className="info-text">
              Interested in learning more about our wireless RF mesh system for cattle tracking? 
              We'd love to hear from you. Whether you're a feedlot operator, farmer, investor, 
              or potential partner, we're here to answer your questions and discuss how HerdLinx 
              can benefit your operation.
            </p>
            <div className="info-details">
              <p className="info-item">
                <strong>Email:</strong> info@herdlinx.com
              </p>
              <p className="info-item">
                <strong>Location:</strong> Lethbridge, Alberta, Canada
              </p>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Your full name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="your.email@example.com"
              />
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
                rows="6"
                placeholder="Tell us about your interest in HerdLinx..."
              />
            </div>
            
            <button type="submit" className="form-submit">
              Send Message
            </button>
          </form>
        </div>
        {/* EDITABLE CONTENT END */}
      </div>
    </section>
  )
}

export default ContactForm

