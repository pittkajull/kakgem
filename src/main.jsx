import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const Arrow = ({ className = '' }) => <span className={`arrow ${className}`}>↗</span>

const services = [
  { no: '01', title: 'Literasi Digital', text: 'Menguatkan kecakapan digital melalui pelatihan, diskusi, dan program kolaboratif.', accent: 'lime' },
  { no: '02', title: 'Kolaborasi Profesional', text: 'Memperluas jejaring antara akademisi, influencer, stakeholder, masyarakat, dan pegiat digital.', accent: 'blue' },
  { no: '03', title: 'Inovasi Berdampak', text: 'Mendorong karya dan solusi digital yang berkualitas, beretika, dan bermanfaat.', accent: 'orange' },
]

const team = [
  ['FN', 'Ketua', 'Franko Nero, S.P.'],
  ['AP', 'Sekretaris', 'Ari Akbar Devananta, S.Pi.'],
  ['DB', 'Wakil Sekretaris I', 'Desta Ratu Berliana, S.S.'],
  ['FS', 'Wakil Sekretaris II', 'Faisa Abhinaya Sarastri, S.Si.'],
  ['YS', 'Bendahara Umum', 'Yulita Windi Nuraini, S.P., M.Sc.'],
  ['UL', 'Wakil Bendahara', 'Ulfida Aisya Laishela, S.P.'],
  ['HH', 'Organisasi & Keanggotaan', 'Hendra Agus Herlambang, S.P.'],
  ['AU', 'Fasilitasi Alumni', 'Ajeng Respati Wiji Utami, S.S.'],
  ['YD', 'Advokasi & Pengkajian Kebijakan', 'Yudha Purbawa, S.P., M.Sc., M.Ec.Dev.'],
  ['BP', 'Kerjasama & Kemitraan', 'Bagus Shidqi Hakim, S.Tr.Par.'],
  ['RP', 'Pengabdian Masyarakat', 'Rino Damar Jati, S.Par.'],
  ['OA', 'Penggalangan Dana', 'Oktavina Dzinuha Ananda, S.AB.'],
  ['YP', 'Komunitas', 'Yudha Kristiawan, S.Fil., M.Phil.'],
  ['FE', 'Aktivasi Sosial Media', 'Faris Adlin, S.T., M.Eng.'],
  ['DM', 'Riset & Pengembangan', 'Dian Pramitasari, A.Md.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const nav = [{ label: 'Home', target: 'Home' }, { label: 'Tentang', target: 'About' }, { label: 'Program', target: 'Works' }, { label: 'Pengurus', target: 'Team' }, { label: 'Kontak', target: 'Contact' }]

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
        <div className="hero-meta"><span>01 / 05</span><span>Komunitas digital<br />&amp; inovasi</span><span>Yogyakarta<br />Indonesia</span></div>
      </div>
      <div className="hero-art reveal delay-1" aria-label="Foto Kagama Digi">
        <img className="hero-photo" src="/img/kamadigi.JPEG" alt="Kegiatan Kagama Digi" />
        <div className="art-grid" /><div className="orb orb-lime" /><div className="orb orb-blue" /><div className="orb orb-orange" />
        <div className="art-label">KAGAMA DIGI<br /><span>DIGITAL / INOVASI</span></div><div className="art-number">UGM<br /><small>2026</small></div><div className="photo-caption"><span className="caption-dot" /> Membuat ruang untuk tumbuh bersama</div>
      </div>
      <div className="scroll-hint"><span>Scroll to discover</span><i /></div>
    </section>

    <div className="impact-strip" aria-label="Kagama Digi principles"><div className="impact-track"><span>COLLABORATION</span><b>✳</b><span>CREATIVITY</span><b>✳</b><span>DIGITAL LITERACY</span><b>✳</b><span>POSITIVE IMPACT</span><b>✳</b><span>COLLABORATION</span><b>✳</b><span>CREATIVITY</span><b>✳</b></div></div>

    <section id="about" className="about section-pad">
      <div className="section-kicker">/01 — Profil singkat</div>
      <div className="about-content"><h2>Ruang<br /><span>kolaborasi</span><br />insan Kagama.</h2><div className="about-side"><p>Kagama Digi adalah komunitas Keluarga Alumni Universitas Gadjah Mada yang menjadi ruang kolaborasi untuk pengembangan inovasi, kreativitas, dan teknologi digital.</p><p className="muted">Kami memperluas jaringan antara akademisi, influencer, stakeholder, masyarakat, dan pegiat digital serta menumbuhkan literasi digital melalui konten yang berkualitas, beretika, dan berdampak positif.</p><div className="vision-copy"><p><strong>Visi</strong> Menjadi ruang kolaborasi strategis insan Kagama dalam mengembangkan inovasi, kreativitas, dan teknologi digital untuk menciptakan dampak nyata hari ini dan masa depan.</p><p><strong>Misi</strong> Membangun ruang tumbuh bersama, menguatkan kecakapan digital melalui pelatihan, dan mendorong kolaborasi lintas profesi untuk melahirkan karya yang berdampak.</p></div><button className="text-link" onClick={() => go('Contact')}>Gabung komunitas <Arrow /></button></div></div>
      <div className="stats"><div><strong>01</strong><span>Fokus<br />digital &amp; inovasi</span></div><div><strong>UGM</strong><span>Jejaring<br />alumni</span></div><div><strong>ID</strong><span>Yogyakarta<br />&amp; Indonesia</span></div></div>
    </section>

    <section id="services" className="services section-pad"><div className="section-kicker">/02 — Fokus kerja</div><div className="services-head"><h2>Nilai yang<br /><span>kami bangun.</span></h2><p>Wawasan yang terbuka. Jejaring yang<br />terhubung. Dampak yang positif.</p></div><div className="service-list">{services.map(s => <article className={`service-card ${s.accent}`} key={s.no}><span className="service-no">{s.no}</span><h3>{s.title}</h3><p>{s.text}</p><Arrow className="service-arrow" /></article>)}</div></section>

    <section id="works" className="works section-pad"><div className="section-kicker">/03 — Program unggulan</div><div className="works-heading"><h2>Program<br /><span>Kagama Digi.</span></h2><button className="text-link" onClick={() => go('Contact')}>Ikuti program <Arrow /></button></div><div className="work-grid"><div className="work-card work-one"><div className="work-art"><span className="sun">✳</span><span className="work-type">Roadmap<br />2026</span></div><div className="work-meta"><span>Java Influencer / Innovation Summit</span><small>LSP Kagama Digi</small></div></div><div className="work-card work-two"><div className="work-art"><span className="mono">DIGITAL<br /><i>IMPACT</i></span><span className="bean" /></div><div className="work-meta"><span>Indonesia Mengajar Digital</span><small>Digi-Run · Digital Goes to Campus / School</small></div></div></div><p className="program-note">Program jangka panjang lainnya: Event Booth dan Digi-Mingle — Opportunity Networking. Aktivasi dan workshop berjalan sepanjang Februari–April 2026, mulai dari Digital Marketing, YouTube, Drone, AI, Meta Ads, Videography, hingga Fotografi.</p></section>

    <section id="team" className="team section-pad"><div className="section-kicker">/04 — Tim kami</div><div className="team-heading"><h2>Struktur<br /><span>pengurus.</span></h2><p>Kagama Digi digerakkan oleh dewan penasehat, pengurus harian, dan bidang-bidang yang mendukung organisasi, kemitraan, komunitas, aktivasi digital, dan riset.</p></div><div className="team-list">{team.map(([initials, role, name]) => <article className="team-card" key={name}><span className="team-avatar">{initials}</span><div><span className="team-role">{role}</span><h3>{name}</h3></div></article>)}</div></section>

    <section id="contact" className="contact section-pad"><div className="contact-grid"><div><div className="section-kicker">/05 — Bergabung</div><h2>Bangun<br /><span>dampak.</span></h2></div><div className="contact-side"><p>Untuk kolaborasi, informasi program, dan jejaring komunitas, hubungi Kagama Digi melalui kanal resmi berikut.</p><a href="https://bit.ly/grupwhatsappkagamadigi" target="_blank" rel="noreferrer" className="email-link">Gabung Grup WhatsApp <Arrow /></a><div className="contact-details"><span>Yogyakarta, Indonesia</span><span>kagamadigi@ugm.ac.id</span><span>Instagram&nbsp; ↗</span></div></div></div><div className="footer"><span>© 2026 Kagama Digi</span><span>Keluarga Alumni Universitas Gadjah Mada<span className="lime-dot">.</span></span><img className="footer-logo" src="/img/logo.png" alt="Logo Kagama Digi" /></div></section>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
