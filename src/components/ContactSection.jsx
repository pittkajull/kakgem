const adminEmail = 'mailto:kagamadigi@gmail.com'

export function ContactSection({ onAdminOpen }) {
  return <section id="contact" className="contact section-pad">
    <div className="contact-grid">
      <div><div className="section-kicker">/08 — Kontak</div><h2>Bangun<br /><span>dampak.</span></h2></div>
      <div className="contact-side">
        <p>Untuk kolaborasi, informasi program, dan jejaring komunitas, hubungi Kagama Digi melalui kanal resmi berikut.</p>
        <a href={adminEmail} className="email-link">kagamadigi@gmail.com</a>
        <div className="contact-details"><a className="contact-social" href="tel:+6289600604388">0896-0060-4388</a><span>Perum Griya Mlati Indah, Mlati, Sleman, DIY</span><a className="contact-social" href="https://www.instagram.com/kagamadigi/" target="_blank" rel="noreferrer">Instagram</a></div>
      </div>
    </div>
    <div className="footer"><span>© Kagama Digi</span><span>Keluarga Alumni Universitas Gadjah Mada · Komunitas Inovasi</span><img className="footer-logo" src="/img/logo.png" alt="Logo Kagama Digi" onDoubleClick={onAdminOpen} title="Buka dashboard internal" /></div>
  </section>
}
