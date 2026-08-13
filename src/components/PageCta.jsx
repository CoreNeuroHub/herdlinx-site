import { useNavigate } from 'react-router-dom'
import './CTASection.css'

const PageCta = ({ headline, support }) => {
  const navigate = useNavigate()

  return (
    <section className="cta-section section">
      <div className="container">
        <div className="cta-inner">
          <h2 className="cta-headline">{headline}</h2>
          <p className="cta-support">{support}</p>
          <button
            type="button"
            className="btn btn-primary cta-button"
            onClick={() => navigate('/#contact')}
          >
            Request a demo
          </button>
        </div>
      </div>
    </section>
  )
}

export default PageCta
