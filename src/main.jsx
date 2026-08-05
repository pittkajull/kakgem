import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const Arrow = ({ className = '' }) => <span className={`arrow ${className}`}>↗</span>

const services = [
  { no: '01', title: 'Literasi Digital', text: 'Menguatkan kecakapan digital melalui pelatihan, diskusi, dan program kolaboratif.', accent: 'lime' },
  { no: '02', title: 'Kolaborasi Profesional', text: 'Memperluas jejaring antara akademisi, influencer, stakeholder, masyarakat, dan pegiat digital.', accent: 'blue' },
  { no: '03', title: 'Inovasi Berdampak', text: 'Mendorong karya dan solusi digital yang berkualitas, beretika, dan bermanfaat.', accent: 'orange' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const nav = [{ label: 'Home', target: 'Home' }, { label: 'Tentang', target: 'About' }, { label: 'Program', target: 'Works' }, { label: 'Kontak', target: 'Contact' }]

  const go = (item) => {
    setActive(item)
    setMenuOpen(false)
    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return <main>
    <nav className="nav-shell">
      <button className="brand" onClick={() => go('Home')} aria-label="Kagama Digi home"><img className="brand-logo" src="/img/logo.png" alt="Logo Kagama Digi" /><span>kagama digi<span className="brand-dot">.</span></span></button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {nav.map(item => <button key={item.label} className={active === item.target ? 'active' : ''} onClick={() => go(item.target)}>{item.label}</button>)}
      </div>
      <button className="contact-pill" onClick={() => window.open('https://bit.ly/grupwhatsappkagamadigi', '_blank')}>Gabung WA <Arrow /></button>
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>
    </nav>

    <section id="home" className="hero section-pad">
      <div className="hero-copy reveal">
        <p className="eyebrow"><span className="eyebrow-line" /> Company Profile · Alumni UGM</p>
        <h1>Komunitas kreatif<br /><em>bangun masa depan</em><br />digital<span className="lime-dot">.</span></h1>
        <p className="hero-desc">Komunitas profesional Keluarga Alumni Universitas Gadjah Mada yang mempertemukan jejaring alumni, pegiat digital, akademisi, dan stakeholder untuk membangun kolaborasi digital yang berdampak.</p>
        <button className="circle-cta" onClick={() => go('About')}><span>Lihat<br />profil</span><Arrow /></button>
      </div>
      <div className="hero-art reveal delay-1" aria-label="Foto Kagama Digi">
        <img className="hero-photo" src="/img/kamadigi.JPEG" alt="Kegiatan Kagama Digi" />
        <div className="art-grid" /><div className="orb orb-lime" /><div className="orb orb-blue" /><div className="orb orb-orange" />
        <div className="art-label">KAGAMA DIGI<br /><span>DIGITAL / INOVASI</span></div><div className="art-number">UGM<br /><small>2026</small></div>
      </div>
      <div className="scroll-hint"><span>Scroll to discover</span><i /></div>
    </section>

    <section id="about" className="about section-pad">
      <div className="section-kicker">/01 — Profil singkat</div>
      <div className="about-content"><h2>Ruang<br /><span>kolaborasi</span><br />insan Kagama.</h2><div className="about-side"><p>Kagama Digi berkontribusi dalam memberikan ruang bagi para pegiat digital untuk membuka wawasan dan memperluas pengetahuan di bidang digital.</p><p className="muted">Komunitas ini mempertemukan akademisi, influencer, stakeholder, masyarakat, dan pegiat digital melalui konten, program, dan kolaborasi yang berkualitas, beretika, dan berdampak positif.</p><button className="text-link" onClick={() => go('Contact')}>Gabung komunitas <Arrow /></button></div></div>
      <div className="stats"><div><strong>01</strong><span>Fokus<br />digital &amp; inovasi</span></div><div><strong>UGM</strong><span>Jejaring<br />alumni</span></div><div><strong>ID</strong><span>Yogyakarta<br />&amp; Indonesia</span></div></div>
    </section>

    <section id="services" className="services section-pad"><div className="section-kicker">/02 — Fokus kerja</div><div className="services-head"><h2>Nilai yang<br /><span>kami bangun.</span></h2><p>Wawasan yang terbuka. Jejaring yang<br />terhubung. Dampak yang positif.</p></div><div className="service-list">{services.map(s => <article className={`service-card ${s.accent}`} key={s.no}><span className="service-no">{s.no}</span><h3>{s.title}</h3><p>{s.text}</p><Arrow className="service-arrow" /></article>)}</div></section>

    <section id="works" className="works section-pad"><div className="section-kicker">/03 — Program unggulan</div><div className="works-heading"><h2>Program<br /><span>Kagama Digi.</span></h2><button className="text-link" onClick={() => go('Contact')}>Ikuti program <Arrow /></button></div><div className="work-grid"><div className="work-card work-one"><div className="work-art"><span className="sun">✳</span><span className="work-type">Java<br />Summit</span></div><div className="work-meta"><span>Java Influencer / Innovation Summit</span><small>Program 01</small></div></div><div className="work-card work-two"><div className="work-art"><span className="mono">LSP<br /><i>KAGAMA</i></span><span className="bean" /></div><div className="work-meta"><span>LSP Kagama Digi</span><small>Program 02</small></div></div></div></section>

    <section id="contact" className="contact section-pad"><div className="contact-grid"><div><div className="section-kicker">/04 — Bergabung</div><h2>Bangun<br /><span>dampak.</span></h2></div><div className="contact-side"><p>Mari terhubung dan berkolaborasi untuk memperluas wawasan, jejaring, dan inovasi digital di Indonesia.</p><a href="https://bit.ly/grupwhatsappkagamadigi" target="_blank" rel="noreferrer" className="email-link">Gabung Grup WhatsApp <Arrow /></a><div className="contact-details"><span>Yogyakarta, Indonesia</span><span>kagamadigi@ugm.ac.id</span><span>Instagram&nbsp; ↗</span></div></div></div><div className="footer"><span>© 2026 Kagama Digi</span><span>Keluarga Alumni Universitas Gadjah Mada<span className="lime-dot">.</span></span><img className="footer-logo" src="/img/logo.png" alt="Logo Kagama Digi" /></div></section>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
