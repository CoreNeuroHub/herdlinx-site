import { useState, useEffect, useRef } from 'react'
import './BackgroundSection.css'
import backgroundImage from '../images/background2.jpg'

const BackgroundSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const backgroundRef = useRef(null)

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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !backgroundRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height)
        const parallaxOffset = scrollProgress * 200
        backgroundRef.current.style.transform = `translateY(${parallaxOffset}px)`
      }
    }

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
    handleScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section
      id="background"
      ref={sectionRef}
      className={`background-section section fade-in-section ${isVisible ? 'visible' : ''}`}
    >
      <div
        ref={backgroundRef}
        className="background-image-parallax"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="container">
        <h2 className="section-title">Our story</h2>
        <p className="section-subtitle section-subtitle--light">
          Built in Lethbridge, Alberta, in feedlot country, by someone who has spent years
          inside yards, not just walking through trade shows.
        </p>

        <div className="background-content">
          <div className="background-story">
            <p className="story-text story-lead">
              HerdLinx did not start in a boardroom. It started in southern Alberta, where
              Brad Vanderberg was born and raised and where he spent 18 years running his own
              electrical shop in Lethbridge, wiring yards, building what operators actually
              needed, and learning how a feedlot runs when the paperwork has to match the
              cattle on the ground.
            </p>

            <p className="story-text">
              Before HerdLinx, Brad had already worked with UHF RFID in livestock settings.
              That experience stuck with him: tags that read at range, cattle moving at their
              own pace, data captured without someone standing in the way. When he looked at
              how finished cattle were handled at shipping: the extra squeeze-chute trip just
              to pull IDs for export paperwork, someone on the rail with a hand-held reader.
              The gap between what was possible and what yards were still doing every day was
              hard to ignore.
            </p>

            <p className="story-text">
              The chute is not going anywhere. Cattle go through it when the job requires it.
              But there is a run that does not have to happen: finished cattle, already done,
              sent back through for a document scan that could happen in the alley instead.
              That is the problem Brad set out to solve: not replacing how yards work, but
              cutting the handling, the labour, and the stress on cattle that nobody wants
              anyway.
            </p>

            <p className="story-text">
              HerdLinx puts identification where cattle already move. A modular antenna in
              the shipping alley. Tags read as the group walks. Records that feedlots already
              have to produce (transfers, manifests, export documentation), built from what
              the system captures, not from a second trip through the squeeze.
            </p>

            <p className="story-text">
              Today the system runs in daily yard operations at Kolk Farms, our signed founding
              partner in southern Alberta, with research support from Alberta Innovates and
              the University of Lethbridge. The company is still based in Lethbridge. The
              work is still the same: build something that holds up in a real yard, on real
              cattle, on real shipping days.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BackgroundSection
