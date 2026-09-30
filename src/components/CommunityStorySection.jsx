import { openPhoto } from '../data/lightbox'
import { defaultSiteContent } from '../data/siteContent'

export function CommunityStorySection({ content = defaultSiteContent }) {
  const journey = content.journey || defaultSiteContent.journey
  return <section id="journey" className="journey section-pad">
    <div className="section-kicker">{journey.kicker}</div>

    <div className="story-intro">
      <div className="story-title">
        <span className="story-label">{journey.welcomeLabel}</span>
        <h2>{journey.welcomeTitle}<br /><span>{journey.welcomeHighlight}</span></h2>
      </div>
      <blockquote className="chair-message">
        {journey.chairMessage.map((message, index) => <p key={`${message.slice(0, 20)}-${index}`}>{message}</p>)}
        <footer><strong>{journey.chairName}</strong><span>{journey.chairRole}</span></footer>
      </blockquote>
    </div>

    <div className="journey-heading">
      <div><span className="story-label">{journey.storylineLabel}</span><h3>{journey.storylineTitle}<br />{journey.storylineHighlight}</h3></div>
      <p>{journey.storylineText}</p>
    </div>
    <div className="journey-rail-wrap">
      <div className="journey-progress" aria-hidden="true" />
      <ol className="journey-rail">
        {journey.phases.map(phase => <li className="journey-step" key={phase.no}>
          <span>{phase.no}</span>
          <h4>{phase.title}</h4>
          <p>{phase.text}</p>
        </li>)}
      </ol>
    </div>

    <div className="portfolio-block">
      <div className="portfolio-copy">
        <span className="story-label">{journey.portfolioLabel}</span>
        <h3>{journey.portfolioTitle}<br />{journey.portfolioHighlight}</h3>
        <p>{journey.portfolioText}</p>
      </div>
      <div className="workshop-index">
        {journey.workshopTopics.map((topic, index) => <article className="workshop-item" key={`${topic}-${index}`}>
          <span>{String(index + 1).padStart(2, '0')}</span><strong>{topic}</strong>
        </article>)}
      </div>
    </div>

    <div className="activation-notes">
      {journey.activations.map((item, index) => <article className="activation-note" key={`${item.title}-${index}`}>
        <div className="note-photos">{(item.photos || []).map(src => <button type="button" className="note-photo-btn" key={src} onClick={() => openPhoto(src, item.title)} aria-label={`Perbesar foto ${item.title}`}><img src={src} alt={item.title} loading="lazy" /><span className="zoom-badge">⤢</span></button>)}</div>
        <span>{String(index + 1).padStart(2, '0')} / {item.type}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </article>)}
    </div>
  </section>
}
