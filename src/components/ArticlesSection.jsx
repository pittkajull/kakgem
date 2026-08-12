export function ArticlesSection({ articles = [] }) {
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
          <details className="article-read-more"><summary>Baca artikel</summary><div className="article-content">{article.content}</div></details>
        </div>
      </article>)}
    </div>
  </section>
}

function formatDate(value) {
  if (!value) return 'Tanpa tanggal'
  try {
    return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
  } catch { return 'Tanpa tanggal' }
}
