import { Arrow } from './Arrow'
import { MemberForm } from './MemberForm'
import { divisions, navItems, services, team } from '../data/siteData'

const whatsAppUrl = 'https://bit.ly/grupwhatsappkagamadigi'

export function Navbar({ menuOpen, active, onMenuToggle, onNavigate }) {
  return <nav className="nav-shell">
    <button className="brand" onClick={() => onNavigate('Home')} aria-label="Kagama Digi home"><img className="brand-logo" src="/img/logo.png" alt="Logo Kagama Digi" /><span>kagama digi<span className="brand-dot">.</span></span></button>
    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
      {navItems.map(item => <button key={item.label} className={active === item.target ? 'active' : ''} onClick={() => onNavigate(item.target)}>{item.label}</button>)}
    </div>
    <div className="nav-actions"><button className="contact-pill" onClick={() => window.open(whatsAppUrl, '_blank')}>Gabung WA <Arrow /></button></div>
    <button className="menu-btn" onClick={onMenuToggle}>{menuOpen ? '×' : '☰'}</button>
  </nav>
}

export function Hero({ onNavigate }) {
  return <section id="home" className="hero section-pad">
    <div className="hero-copy reveal">
      <p className="eyebrow"><span className="eyebrow-line" /> Company Profile · Alumni UGM</p>
      <h1>Komunitas kreatif<br /><em>bangun masa depan</em><br />digital<span className="lime-dot">.</span></h1>
      <p className="hero-desc">Komunitas profesional Keluarga Alumni Universitas Gadjah Mada yang mempertemukan jejaring alumni, pegiat digital, akademisi, dan stakeholder untuk membangun kolaborasi digital yang berdampak.</p>
      <button className="circle-cta" onClick={() => onNavigate('About')}><span>Lihat<br />profil</span><Arrow /></button>
      <div className="hero-meta"><span>01 / 07</span><span>Komunitas digital<br />&amp; inovasi</span><span>Yogyakarta<br />Indonesia</span></div>
    </div>
    <div className="hero-art reveal delay-1" aria-label="Foto Kagama Digi">
      <img className="hero-photo" src="/img/kamadigi.JPEG" alt="Kegiatan Kagama Digi" />
      <div className="art-grid" /><div className="orb orb-lime" /><div className="orb orb-blue" /><div className="orb orb-orange" />
      <div className="art-label">KAGAMA DIGI<br /><span>DIGITAL / INOVASI</span></div><div className="art-number">UGM<br /><small>2026</small></div><div className="photo-caption"><span className="caption-dot" /> Membuat ruang untuk tumbuh bersama</div>
    </div>
    <div className="scroll-hint"><span>Scroll to discover</span><i /></div>
  </section>
}

export function ImpactStrip() {
  return <div className="impact-strip" aria-label="Kagama Digi principles"><div className="impact-track"><span>COLLABORATION</span><b>✳</b><span>CREATIVITY</span><b>✳</b><span>DIGITAL LITERACY</span><b>✳</b><span>POSITIVE IMPACT</span><b>✳</b><span>COLLABORATION</span><b>✳</b><span>CREATIVITY</span><b>✳</b></div></div>
}

export function AboutSection({ onNavigate }) {
  return <section id="about" className="about section-pad">
    <div className="section-kicker">/01 — Profil singkat</div>
    <div className="about-content"><h2>Ruang<br /><span>kolaborasi</span><br />insan Kagama.</h2><div className="about-side"><p>Kagama Digi adalah komunitas Keluarga Alumni Universitas Gadjah Mada yang menjadi ruang kolaborasi untuk pengembangan inovasi, kreativitas, dan teknologi digital.</p><p className="muted">Kami memperluas jaringan antara akademisi, influencer, stakeholder, masyarakat, dan pegiat digital serta menumbuhkan literasi digital melalui konten yang berkualitas, beretika, dan berdampak positif.</p><div className="vision-copy"><p><strong>Visi</strong> Menjadi ruang kolaborasi strategis insan Kagama dalam mengembangkan inovasi, kreativitas, dan teknologi digital untuk menciptakan dampak nyata hari ini dan masa depan.</p><p><strong>Misi</strong> Membangun ruang tumbuh bersama, menguatkan kecakapan digital melalui pelatihan, dan mendorong kolaborasi lintas profesi untuk melahirkan karya yang berdampak.</p></div><button className="text-link" onClick={() => onNavigate('Contact')}>Gabung komunitas <Arrow /></button></div></div>
    <div className="stats"><div><strong>01</strong><span>Fokus<br />digital &amp; inovasi</span></div><div><strong>UGM</strong><span>Jejaring<br />alumni</span></div><div><strong>ID</strong><span>Yogyakarta<br />&amp; Indonesia</span></div></div>
  </section>
}

export function ServicesSection() {
  return <section id="services" className="services section-pad"><div className="section-kicker">/02 — Fokus kerja</div><div className="services-head"><h2>Nilai yang<br /><span>kami bangun.</span></h2><p>Wawasan yang terbuka. Jejaring yang<br />terhubung. Dampak yang positif.</p></div><div className="service-list">{services.map(service => <article className={`service-card ${service.accent}`} key={service.no}><span className="service-no">{service.no}</span><h3>{service.title}</h3><p>{service.text}</p><Arrow className="service-arrow" /></article>)}</div></section>
}

export function WorksSection({ onNavigate }) {
  return <section id="works" className="works section-pad"><div className="section-kicker">/03 — Program unggulan</div><div className="works-heading"><h2>Program<br /><span>Kagama Digi.</span></h2><button className="text-link" onClick={() => onNavigate('Contact')}>Ikuti program <Arrow /></button></div><div className="work-grid"><div className="work-card work-one"><div className="work-art"><span className="sun">✳</span><span className="work-type">Roadmap<br />2026</span></div><div className="work-meta"><span>Java Influencer / Innovation Summit</span><small>LSP Kagama Digi</small></div></div><div className="work-card work-two"><div className="work-art"><span className="mono">DIGITAL<br /><i>IMPACT</i></span><span className="bean" /></div><div className="work-meta"><span>Indonesia Mengajar Digital</span><small>Digi-Run · Digital Goes to Campus / School</small></div></div></div><p className="program-note">Program jangka panjang lainnya: Event Booth dan Digi-Mingle — Opportunity Networking. Aktivasi dan workshop berjalan sepanjang Februari–April 2026, mulai dari Digital Marketing, YouTube, Drone, AI, Meta Ads, Videography, hingga Fotografi.</p></section>
}

export function TeamSection() {
  return <section id="team" className="team section-pad"><div className="section-kicker">/05 — Tim kami</div><div className="team-heading"><h2>Struktur<br /><span>pengurus.</span></h2><p>Kagama Digi digerakkan oleh dewan penasehat, pengurus harian, dan bidang-bidang yang mendukung organisasi, kemitraan, komunitas, aktivasi digital, dan riset.</p></div><div className="team-list">{team.map(([initials, role, name]) => <article className="team-card" key={name}><span className="team-avatar">{initials}</span><div><span className="team-role">{role}</span><h3>{name}</h3></div></article>)}</div></section>
}

export function MembershipSection({ showRegister, setShowRegister, form, updateForm, submitMember }) {
  return <section id="membership" className="membership section-pad"><div className="membership-inner"><div><div className="section-kicker">/06 — Jadi bagian dari kami</div><h2>Temukan ruang<br /><span>untuk tumbuh.</span></h2></div><div className="membership-copy"><p>Gabung menjadi anggota Kagama Digi dan ikut membangun jejaring, wawasan, serta inovasi digital bersama alumni UGM dan pegiat digital dari berbagai bidang.</p><span className="alumni-only">Khusus alumni Universitas Gadjah Mada (UGM)</span><button className="membership-cta" onClick={() => setShowRegister(current => !current)}>{showRegister ? 'Tutup form' : 'Daftar jadi member'} <Arrow /></button></div></div><div className="membership-footer"><span>Terbuka untuk alumni UGM</span><span>Digital · Inovasi · Kolaborasi</span></div>{showRegister && <MemberForm form={form} updateForm={updateForm} submitMember={submitMember} onClose={() => setShowRegister(false)} />}</section>
}

export function ContactSection({ onAdminOpen }) {
  return <section id="contact" className="contact section-pad"><div className="contact-grid"><div><div className="section-kicker">/07 — Kontak</div><h2>Bangun<br /><span>dampak.</span></h2></div><div className="contact-side"><p>Untuk kolaborasi, informasi program, dan jejaring komunitas, hubungi Kagama Digi melalui kanal resmi berikut.</p><a href={whatsAppUrl} target="_blank" rel="noreferrer" className="email-link">Gabung Grup WhatsApp <Arrow /></a><div className="contact-details"><span>Yogyakarta, Indonesia</span><span>kagamadigi@ugm.ac.id</span><span>Instagram&nbsp; ↗</span></div></div></div><div className="footer"><span>© 2026 Kagama Digi</span><span>Keluarga Alumni Universitas Gadjah Mada<span className="lime-dot">.</span></span><img className="footer-logo" src="/img/logo.png" alt="Logo Kagama Digi" onDoubleClick={onAdminOpen} title="Buka dashboard internal" /></div></section>
}

export function AdminDashboard({ members, onClose, onAddMember }) {
  return <div className="admin-overlay"><div className="admin-shell"><div className="admin-top"><div><span className="admin-eyebrow">Kagama Digi / Internal</span><h2>Data <span>anggota.</span></h2></div><button className="modal-close" onClick={onClose}>×</button></div><div className="admin-stats"><div><strong>{members.length}</strong><span>Total anggota terdaftar</span></div></div><div className="member-table-wrap"><div className="table-heading"><div><span className="admin-eyebrow">Form responses</span><h3>Daftar anggota Kagama Digi</h3></div><button className="export-btn" onClick={() => alert('Export CSV siap dihubungkan ke Google Sheet atau backend.')}>Export CSV ↗</button></div><div className="member-table">{members.length ? members.map(member => <div className="member-row" key={member.id || member.email}><div className="member-identity"><span className="member-initial">{member.name.split(' ').map(word => word[0]).slice(0, 2).join('')}</span><div><strong>{member.name}</strong><small>{member.email}</small></div></div><span>{member.study}<br /><small>{member.faculty} · Angkatan {member.year}</small></span><span>{member.phone}<br /><small>{member.domicile}</small></span><span className={member.division === divisions[0] ? 'muted-status' : 'gold-status'}>{member.division.replace('Bidang ', '')}</span></div>) : <div className="empty-members"><span className="empty-icon">＋</span><strong>Belum ada pendaftar</strong><p>Data anggota yang mengisi form akan tampil di sini.</p><button onClick={onAddMember}>Tambah pendaftar pertama <Arrow /></button></div>}</div></div></div></div>
}
