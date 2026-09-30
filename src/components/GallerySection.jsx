import { openPhoto } from '../data/lightbox'
import { defaultSiteContent } from '../data/siteContent'

export function GallerySection({ content = defaultSiteContent }) {
  const gallery = content.gallery || defaultSiteContent.gallery
  return <section id="gallery" className="gallery-section section-pad">
    <div className="section-kicker">{gallery.kicker}</div>
    <div className="gallery-heading">
      <h2>{gallery.title}<br /><span>{gallery.highlight}</span></h2>
      <p>{gallery.description}</p>
    </div>
    <div className="gallery-grid">
      {gallery.items.map((item, index) => <figure className={`gallery-item gallery-${index + 1}`} key={`${item.src}-${index}`}>
        <div className="gallery-img"><img src={item.src} alt={item.title} loading="lazy" onClick={() => openPhoto(item.src, item.title)} /></div>
        <figcaption><strong>{item.title}</strong><small>{item.meta}</small></figcaption>
      </figure>)}
    </div>
  </section>
}
