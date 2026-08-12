import { useEffect, useState } from 'react'

export function ArticlesSection({ articles = [] }) {
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    if (!selectedArticle) return
    const onKey = event => { if (event.key === 'Escape') setSelectedArticle(null) }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKey) }
  }, [selectedArticle])

  if (!articles.length) return null

  return <section id="articles" className="articles-section section-pad">
    <div className="section-kicker">/08 — Catatan Kagama Digi</div>
    <div className="articles-heading">
      <div><h2>Gagasan yang<br /><span>terus bergerak.</span></h2></div>
      <p>Berita, cerita, dan wawasan dari ruang kolaborasi Kagama Digi.</p>
    </div>
    <div className="articles-grid">
      {articles.map((article, index) => <article className={`article-card article-card-${index + 1}`} key={article.id}>
        <div className="article-image-wrap">
          {article.image ? <img src={article.image} alt="" loading="lazy" /> : <div className="article-image-placeholder"><span>KD</span></div>}
          <span className="article-category">{article.category || 'Kabar Kagama Digi'}</span>
        </div>
        <div className="article-card-body">
          <div className="article-meta">{formatDate(article.publishedAt)} <span>·</span> {article.author || 'Kagama Digi'}</div>
          <h3>{article.title}</h3>
          {article.excerpt && <p>{article.excerpt}</p>}
          <button className="article-read-more" onClick={() => setSelectedArticle(article)}>Baca artikel <span aria-hidden="true">↗</span></button>
        </div>
      </article>)}
    </div>
    {selectedArticle && <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
  </section>
}

function ArticleModal({ article, onClose }) {
  return <div className="article-modal-backdrop" role="presentation" onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <article className="article-modal" role="dialog" aria-modal="true" aria-labelledby="article-modal-title">
      <button className="article-modal-close" onClick={onClose} aria-label="Tutup artikel">×</button>
      <div className="article-modal-visual">
        {article.image ? <img src={article.image} alt="" /> : <div className="article-image-placeholder"><span>KD</span></div>}
        <span className="article-category">{article.category || 'Kabar Kagama Digi'}</span>
      </div>
      <div className="article-modal-body">
        <div className="article-meta">{formatDate(article.publishedAt)} <span>·</span> {article.author || 'Kagama Digi'}</div>
        <h2 id="article-modal-title">{article.title}</h2>
        {article.excerpt && <p className="article-modal-excerpt">{article.excerpt}</p>}
        <div className="article-content">{article.content}</div>
      </div>
    </article>
  </div>
}

function formatDate(value) {
  if (!value) return 'Tanpa tanggal'
  try {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
  } catch { return 'Tanpa tanggal' }
}
