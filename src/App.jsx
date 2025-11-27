import { useEffect } from 'react'
import Header from './components/Header'
import InformativeSection from './components/InformativeSection'
import ProductSection from './components/ProductSection'
import BackgroundSection from './components/BackgroundSection'
import TeamSection from './components/TeamSection'
import ContactForm from './components/ContactForm'
import './App.css'

function App() {
  useEffect(() => {
    // Smooth scroll behavior is handled by CSS, but we can add additional JS if needed
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div className="App">
      <Header />
      <main>
        <InformativeSection />
        <ProductSection />
        <BackgroundSection />
        <TeamSection />
        <ContactForm />
      </main>
    </div>
  )
}

export default App

