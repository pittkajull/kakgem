import { useEffect, useState } from 'react'
import { setOpenHandler } from '../data/lightbox'

export function GlobalLightbox() {
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    setOpenHandler((src, alt) => setPhoto({ src, alt }))
  }, [])

  useEffect(() => {
    if (!photo) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => { if (event.key === 'Escape') setPhoto(null) }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prevOverflow; window.removeEventListener('keydown', onKey) }
  }, [photo])

  if (!photo) return null
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label="Pratinjau foto" onClick={() => setPhoto(null)}>
    <button type="button" className="lightbox-close" onClick={() => setPhoto(null)} aria-label="Tutup">×</button>
    <img src={photo.src} alt={photo.alt || 'Foto kegiatan Kagama Digi'} />
  </div>
}
