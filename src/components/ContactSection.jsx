const adminEmail = 'mailto:kagamadigi@gmail.com'

const phoneIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
const pinIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
const instagramIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
const mailIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
const arrowIcon = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>

export function ContactSection({ onAdminOpen }) {
  return <section id="contact" className="contact section-pad">
    <div className="contact-grid">
      <div><div className="section-kicker">/08 — Kontak</div><h2>Bangun<br /><span>dampak.</span></h2></div>
      <div className="contact-side">
        <p>Untuk kolaborasi, informasi program, dan jejaring komunitas, hubungi Kagama Digi melalui kanal resmi berikut.</p>
        <a href={adminEmail} className="email-link">kagamadigi@gmail.com</a>
      </div>
    </div>
    <div className="contact-rows">
      <a className="contact-row" href="https://wa.me/6285600604388" target="_blank" rel="noreferrer">
        <span className="row-icon">{phoneIcon}</span>
        <span className="row-label">Telepon / WhatsApp</span>
        <strong className="row-value">0856-0060-4388</strong>
        <span className="row-meta">Hubungi kami</span>
        <span className="row-arrow">{arrowIcon}</span>
      </a>
      <a className="contact-row" href="https://www.google.com/maps/search/?api=1&query=Perumahan+Griya+Mlati+Yogyakarta" target="_blank" rel="noreferrer">
        <span className="row-icon">{pinIcon}</span>
        <span className="row-label">Sekretariat</span>
        <strong className="row-value">Griya Mlati Indah</strong>
        <span className="row-meta">Mlati, Sleman, DIY</span>
        <span className="row-arrow">{arrowIcon}</span>
      </a>
      <a className="contact-row" href="https://www.instagram.com/kagamadigi/" target="_blank" rel="noreferrer">
        <span className="row-icon">{instagramIcon}</span>
        <span className="row-label">Instagram</span>
        <strong className="row-value">@kagamadigi</strong>
        <span className="row-meta">Ikuti kegiatan kami</span>
        <span className="row-arrow">{arrowIcon}</span>
      </a>
    </div>
    <div className="footer">
      <span className="footer-eyebrow">Hubungi kami</span>
      <div className="footer-icons">
        <a className="icon-btn" href={adminEmail} aria-label="Email Kagama Digi">{mailIcon}</a>
        <a className="icon-btn" href="https://www.instagram.com/kagamadigi/" target="_blank" rel="noreferrer" aria-label="Instagram Kagama Digi">{instagramIcon}</a>
        <a className="icon-btn" href="https://wa.me/6285600604388" target="_blank" rel="noreferrer" aria-label="WhatsApp Kagama Digi">{phoneIcon}</a>
      </div>
      <div className="footer-meta">
        <span>kagama digi · keluarga alumni universitas gadjah mada · komunitas digital dan inovasi</span>
        <img className="footer-logo" src="/img/logo.png" alt="Logo Kagama Digi" onDoubleClick={onAdminOpen} title="Buka dashboard internal" />
      </div>
    </div>
  </section>
}
