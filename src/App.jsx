import { useEffect } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import InformativeSection from './components/InformativeSection'
import ProductSection from './components/ProductSection'
import BackgroundSection from './components/BackgroundSection'
import TeamSection from './components/TeamSection'
import CTASection from './components/CTASection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import './App.css'

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <InformativeSection />
        <ProductSection />
        <BackgroundSection />
        <TeamSection />
        <CTASection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
