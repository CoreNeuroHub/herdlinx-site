import { useState, useEffect, useRef } from 'react'
import './ContactForm.css'
import backgroundImage from '../images/background3.jpg'

const ContactForm = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const backgroundRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

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

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !backgroundRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate parallax offset when section is in viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height)
        const parallaxOffset = scrollProgress * 200 // Adjust speed (200px max movement)
        backgroundRef.current.style.transform = `translateY(${parallaxOffset}px)`
      }
    }

    // Use requestAnimationFrame for smooth performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

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
    <section 
      id="contact" 
      ref={sectionRef}
      className={`contact-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div 
        ref={backgroundRef}
        className="background-image-parallax"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="container">
        <h2 className="section-title">Find Out More</h2>
        
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
                <strong>Location:</strong> Lethbridge, AB
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

