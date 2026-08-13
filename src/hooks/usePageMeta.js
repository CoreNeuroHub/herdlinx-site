import { useEffect } from 'react'

const DEFAULT_DESCRIPTION =
  'Ultra-high-frequency RFID for feedlots. Cattle walk the alley; tags are read at range. Cut the extra chute trip on finished cattle headed to export.'

export const usePageMeta = ({ title, description = DEFAULT_DESCRIPTION }) => {
  useEffect(() => {
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [title, description])
}
