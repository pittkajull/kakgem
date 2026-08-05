import { displayGallery } from '../data/siteData'

export function GallerySection() {
  return <section className="gallery-section section-pad">
    <div className="section-kicker">/04 — Aktivasi</div>
    <div className="gallery-heading">
      <h2>Yang terjadi<br /><span>ketika bertemu.</span></h2>
      <p>Ruang belajar, berbagi, dan berkolaborasi yang mempertemukan insan Kagama dari berbagai latar.</p>
    </div>
    <div className="gallery-grid">
      {displayGallery.map(([src, title, meta], index) => <figure className={`gallery-item gallery-${index + 1}`} key={src}>
        <img src={src} alt={title} loading="lazy" />
        <figcaption><strong>{title}</strong><small>{meta}</small></figcaption>
      </figure>)}
    </div>
  </section>
}
