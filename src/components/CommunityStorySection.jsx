import { activationHighlights, journeyPhases, workshopTopics } from '../data/siteData'
import { openPhoto } from '../data/lightbox'

export function CommunityStorySection() {
  return <section id="journey" className="journey section-pad">
    <div className="section-kicker">/04 — Perjalanan dan aktivasi</div>

    <div className="story-intro">
      <div className="story-title">
        <span className="story-label">Sambutan Ketua</span>
        <h2>Selamat datang<br /><span>di Kagama Digi.</span></h2>
      </div>
      <blockquote className="chair-message">
        <p>Kagama Digi lahir dari semangat kolaborasi, kreativitas, dan komitmen untuk membawa nilai-nilai keilmuan Universitas Gadjah Mada ke dalam dunia digital yang terus berkembang.</p>
        <p>Kami ingin menjadi ekosistem yang inklusif, adaptif, dan progresif—tempat setiap anggota dapat bertumbuh, berkontribusi, dan terinspirasi untuk menghadirkan karya digital yang bermanfaat bagi bangsa.</p>
        <footer><strong>Franko Nero, S.P.</strong><span>Ketua Kagama Digi</span></footer>
      </blockquote>
    </div>

    <div className="journey-heading">
      <div><span className="story-label">Storyline</span><h3>Dari ruang belajar<br />menjadi gerakan.</h3></div>
      <p>Perjalanan Kagama Digi dirangkum sebagai proses yang terus bergerak: membangun fondasi, berbagi pengetahuan, memperluas jejaring, dan menguatkan organisasi.</p>
    </div>
    <div className="journey-rail-wrap">
      <div className="journey-progress" aria-hidden="true" />
      <ol className="journey-rail">
        {journeyPhases.map(phase => <li className="journey-step" key={phase.no}>
          <span>{phase.no}</span>
          <h4>{phase.title}</h4>
          <p>{phase.text}</p>
        </li>)}
      </ol>
    </div>

    <div className="portfolio-block">
      <div className="portfolio-copy">
        <span className="story-label">Portofolio workshop</span>
        <h3>Topik yang sudah<br />kami gerakkan.</h3>
        <p>Rangkaian kelas Kagama Digi menghubungkan pengetahuan praktis, teknologi, kreativitas, dan kebutuhan industri digital.</p>
      </div>
      <div className="workshop-index">
        {workshopTopics.map((topic, index) => <article className="workshop-item" key={topic}>
          <span>{String(index + 1).padStart(2, '0')}</span><strong>{topic}</strong>
        </article>)}
      </div>
    </div>

    <div className="activation-notes">
      {activationHighlights.map((item, index) => <article className="activation-note" key={item.title}>
        <div className="note-photos">{(item.photos || []).map(src => <button type="button" className="note-photo-btn" key={src} onClick={() => openPhoto(src, item.title)} aria-label={`Perbesar foto ${item.title}`}><img src={src} alt={item.title} loading="lazy" /><span className="zoom-badge">⤢</span></button>)}</div>
        <span>{String(index + 1).padStart(2, '0')} / {item.type}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </article>)}
    </div>
  </section>
}
