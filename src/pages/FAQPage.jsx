import FAQSection from '../components/FAQSection'
import PageCta from '../components/PageCta'
import { usePageMeta } from '../hooks/usePageMeta'

const FAQPage = () => {
  usePageMeta({
    title: 'HerdLinx | FAQ',
  })

  return (
    <>
      <FAQSection />
      <PageCta
        headline="Still have questions?"
        support="Tell us about your yard, partnership, or investment interest. Someone on the team reads every note."
      />
    </>
  )
}

export default FAQPage
