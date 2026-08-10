import { displayGallery } from '../data/siteData'

export function GallerySection() {
  return <section className="gallery-section section-pad">
    <div className="section-kicker">/05 — Dokumentasi aktivasi</div>
    <div className="gallery-heading">
      <h2>Yang terjadi<br /><span>ketika bertemu.</span></h2>
      <p>Dokumentasi ruang belajar, pertemuan, dan kolaborasi yang mempertemukan insan Kagama dari berbagai latar.</p>
    </div>
    <div className="gallery-grid">
      {displayGallery.map(([src, title, meta], index) => <figure className={`gallery-item gallery-${index + 1}`} key={src}>
        <div className="gallery-img"><img src={src} alt={title} loading="lazy" /></div>
        <figcaption><strong>{title}</strong><small>{meta}</small></figcaption>
      </figure>)}
    </div>
  </section>
}
