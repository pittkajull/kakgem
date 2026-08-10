import { useState } from 'react'
import { MemberForm } from './MemberForm'
import { divisions, navItems, programs, services } from '../data/siteData'

const adminEmail = 'mailto:kagamadigi@gmail.com'

export function Navbar({ menuOpen, active, onMenuToggle, onNavigate }) {
  return <nav className="nav-shell">
    <button className="brand" onClick={() => onNavigate('Home')} aria-label="Kagama Digi home"><img className="brand-logo" src="/img/logo.png" alt="Logo Kagama Digi" /><span>kagama digi<span className="brand-dot">.</span></span></button>
    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
      {navItems.map(item => <button key={item.label} className={active === item.target ? 'active' : ''} onClick={() => onNavigate(item.target)}>{item.label}</button>)}
    </div>
    <div className="nav-actions"><button className="contact-pill" onClick={() => { window.location.href = 'https://wa.me/6285600604388' }}>Kontak Admin Kagama Digi</button></div>
    <button className="menu-btn" onClick={onMenuToggle}>{menuOpen ? '×' : '☰'}</button>
  </nav>
}

export function Hero({ onNavigate }) {
  return <section id="home" className="hero section-pad">
    <div className="hero-copy reveal">
      <p className="eyebrow"><span className="eyebrow-line" /> Keluarga Alumni Universitas Gadjah Mada · Komunitas Digital dan Inovasi</p>
      <h1>Komunitas kreatif<br /><em>bangun ekosistem</em><br />digital yang positif<span className="lime-dot">.</span></h1>
      <p className="hero-desc">Komunitas profesional Universitas Gadjah Mada yang memanfaatkan ruang digital positif secara kolaboratif, mempertemukan berbagai elemen masyarakat, pemerintah, industri, komunitas, dan individu untuk menciptakan ekosistem internet yang aman, produktif, dan beretika.</p>
      <div className="hero-meta"><span>01 / 08</span><span>Komunitas digital<br />&amp; inovasi</span><span>Yogyakarta<br />Indonesia</span></div>
    </div>
    <div className="hero-art reveal delay-1" aria-label="Foto Kagama Digi">
      <div className="hero-photo-scroll"><img className="hero-photo" src="/img/kamadigi.JPEG" alt="Kegiatan Kagama Digi" /></div>
      <div className="art-grid" /><div className="orb orb-lime" /><div className="orb orb-blue" /><div className="orb orb-orange" />
      <div className="art-label">KAGAMA DIGI<br /><span>DIGITAL / INOVASI</span></div><div className="art-number">KAGAMADIGI</div><div className="photo-caption"><span className="caption-dot" /> Membuat ruang untuk tumbuh bersama</div>
    </div>
  </section>
}

export function ImpactStrip() {
  return <div className="impact-strip" aria-label="Kagama Digi principles"><div className="impact-track"><span>COLLABORATION</span><b>✳</b><span>CREATIVITY</span><b>✳</b><span>DIGITAL LITERACY</span><b>✳</b><span>POSITIVE IMPACT</span><b>✳</b><span>COLLABORATION</span><b>✳</b><span>CREATIVITY</span><b>✳</b></div></div>
}

export function AboutSection({ onNavigate }) {
  return <section id="about" className="about section-pad">
    <div className="section-kicker">/01 — Profil singkat</div>
    <div className="about-content"><h2>Ruang kolaborasi<br /><span>untuk tumbuh bersama</span><br />insan Kagama.</h2><div className="about-side"><p>Kagama Digi adalah komunitas Keluarga Alumni Universitas Gadjah Mada yang menjadi ruang kolaborasi untuk pengembangan inovasi, kreativitas, dan teknologi digital.</p><p className="muted">Kami memperluas jaringan antara akademisi, influencer, stakeholder, masyarakat, dan pegiat digital serta menumbuhkan literasi digital melalui konten yang berkualitas, beretika, dan berdampak positif.</p><div className="vision-copy"><p><strong>Visi</strong> Menjadi ruang kolaborasi strategis insan Kagama dalam mengembangkan inovasi, kreativitas, dan teknologi digital untuk menciptakan dampak nyata.</p><p><strong>Misi</strong> Membangun ruang tumbuh bersama, menguatkan kecakapan digital melalui pelatihan, dan mendorong kolaborasi lintas profesi untuk melahirkan karya yang berdampak.</p></div><button className="text-link" onClick={() => onNavigate('Membership')}>Gabung Kagamadigi (khusus alumni UGM)</button></div></div>
    <div className="stats"><div><strong>01</strong><span>Fokus<br />digital &amp; inovasi</span></div><div><strong>UGM</strong><span>Jejaring<br />alumni</span></div><div><strong>ID</strong><span>Yogyakarta<br />&amp; Indonesia</span></div></div>
  </section>
}

export function ServicesSection() {
  return <section id="services" className="services section-pad"><div className="section-kicker">/02 — Fokus kerja</div><div className="services-head"><h2>Nilai yang<br /><span>kami bangun.</span></h2><p>Wawasan yang terbuka. Jejaring yang<br />terhubung. Dampak yang positif.</p></div><div className="service-list">{services.map(service => <article className={`service-card ${service.accent}`} key={service.no}><span className="service-no">{service.no}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}</div></section>
}

export function WorksSection({ onNavigate }) {
  return <section id="works" className="works section-pad"><div className="section-kicker">/03 — Aktivasi</div><div className="works-heading"><h2>Program jangka panjang<br /><span>Kagama Digi.</span></h2><p>Kenali program yang sedang kami siapkan dan temukan ruang kolaborasi yang paling dekat denganmu.</p></div><div className="program-grid">{programs.map((program, index) => <article className={`program-card ${program.tone}`} key={program.title}>        <div className="program-banner"><small>0{index + 1}</small><strong>{program.title}</strong><span className="program-mark">KD</span></div><div className="program-details"><p>{program.description}</p><button onClick={() => onNavigate('Contact')}>Ikuti program</button></div></article>)}</div></section>
}

export function MembershipSection({ showRegister, setShowRegister, form, updateForm, submitMember }) {
  return <section id="membership" className="membership section-pad"><div className="membership-inner"><div><div className="section-kicker">/07 — Jadi bagian dari kami</div><h2>Temukan ruang<br /><span>untuk tumbuh.</span></h2></div><div className="membership-copy"><p>Gabung menjadi anggota Kagama Digi dan ikut membangun jejaring, wawasan, serta inovasi digital bersama alumni dan pegiat digital dari berbagai bidang.</p><span className="alumni-only">Khusus alumni Universitas Gadjah Mada</span><button className="membership-cta" onClick={() => setShowRegister(current => !current)}>{showRegister ? 'Tutup form' : 'Daftar jadi member'}</button></div></div><div className="membership-footer"><span>Terbuka untuk alumni Universitas Gadjah Mada</span><span>Digital · Inovasi · Kolaborasi</span></div>{showRegister && <MemberForm form={form} updateForm={updateForm} submitMember={submitMember} onClose={() => setShowRegister(false)} />}</section>
}

export function AdminDashboard({ members, onClose, onAddMember, onUpdateMember, onDeleteMember }) {
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const memberKey = (member) => member.id || member.email

  const startEdit = (member) => {
    setEditing(member)
    setForm({ ...member })
    setConfirmId(null)
  }
  const cancelEdit = () => { setEditing(null); setForm(null) }
  const saveEdit = (event) => {
    event.preventDefault()
    onUpdateMember(editing, form)
    cancelEdit()
  }
  const updateForm = (event) => setForm(current => ({ ...current, [event.target.name]: event.target.value }))

  return <div className="admin-overlay"><div className="admin-shell"><div className="admin-top"><div><span className="admin-eyebrow">Kagama Digi / Internal</span><h2>Data <span>anggota.</span></h2></div><button className="modal-close" onClick={onClose}>×</button></div>
    <div className="admin-stats"><div><strong>{members.length}</strong><span>Total anggota terdaftar</span></div></div>
    {editing && <div className="admin-edit-card"><MemberForm form={form} updateForm={updateForm} submitMember={saveEdit} onClose={cancelEdit} submitLabel="Simpan perubahan" eyebrow="Kagama Digi / Edit data" heading={<>Perbarui data <span>anggota.</span></>} showNotice={false} /></div>}
    <div className="member-table-wrap"><div className="table-heading"><div><span className="admin-eyebrow">Form responses</span><h3>Daftar anggota Kagama Digi</h3></div><button className="export-btn" onClick={() => alert('Export CSV siap dihubungkan ke Google Sheet atau backend.')}>Export CSV</button></div>
    <div className="member-table">{members.length ? members.map(member => <div className="member-row" key={memberKey(member)}><div className="member-identity"><span className="member-initial">{member.name.split(' ').map(word => word[0]).slice(0, 2).join('')}</span><div><strong>{member.name}</strong><small>{member.email}</small></div></div><span>{member.study}<br /><small>{member.faculty} · Angkatan {member.year}</small></span><span>{member.phone}<br /><small>{member.domicile}</small></span><span className={member.division === divisions[0] ? 'muted-status' : 'gold-status'}>{member.division.replace('Bidang ', '')}</span><div className="member-actions"><button className="row-action row-edit" onClick={() => startEdit(member)}>Edit</button>{confirmId === memberKey(member) ? <span className="confirm-actions"><button className="row-action row-danger" onClick={() => onDeleteMember(member)}>Hapus</button><button className="row-action row-cancel" onClick={() => setConfirmId(null)}>Batal</button></span> : <button className="row-action row-delete" onClick={() => setConfirmId(memberKey(member))}>Hapus</button>}</div></div>) : <div className="empty-members"><span className="empty-icon">＋</span><strong>Belum ada pendaftar</strong><p>Data anggota yang mengisi form akan tampil di sini.</p><button onClick={onAddMember}>Tambah pendaftar pertama</button></div>}</div>
  </div></div></div>
}
