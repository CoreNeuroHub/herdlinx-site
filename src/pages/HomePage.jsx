import HeroSection from '../components/HeroSection'
import InformativeSection from '../components/InformativeSection'
import ProductSection from '../components/ProductSection'
import PartnersSection from '../components/PartnersSection'
import BackgroundSection from '../components/BackgroundSection'
import TeamSection from '../components/TeamSection'
import CTASection from '../components/CTASection'
import ContactForm from '../components/ContactForm'
import { usePageMeta } from '../hooks/usePageMeta'

const HomePage = () => {
  usePageMeta({
    title: 'HerdLinx | UHF RFID that IDs cattle in the alley, not the chute',
  })

  return (
    <>
      <HeroSection />
      <InformativeSection />
      <ProductSection />
      <PartnersSection />
      <BackgroundSection />
      <TeamSection />
      <CTASection />
      <ContactForm />
    </>
  )
}

export default HomePage
