import ProductDetails from '../components/ProductDetails'
import PageCta from '../components/PageCta'
import { usePageMeta } from '../hooks/usePageMeta'

const ProductPage = () => {
  usePageMeta({
    title: 'HerdLinx | How it works',
  })

  return (
    <>
      <ProductDetails />
      <PageCta
        headline="See it on cattle, not on a slide."
        support="Built in Lethbridge for feedlot operators who need alley reads, movement records, and export IDs without the extra chute trip."
      />
    </>
  )
}

export default ProductPage
