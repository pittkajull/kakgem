import { useState } from 'react'
import { MemberForm } from './MemberForm'
import { divisions, mobileNavItems, navItems, programs, services } from '../data/siteData'
import { openPhoto } from '../data/lightbox'

const adminEmail = 'mailto:kagamadigi@gmail.com'

export function Navbar({ menuOpen, active, onMenuToggle, onNavigate }) {
  return <nav className="nav-shell">
    <button className="brand" onClick={() => onNavigate('Home')} aria-label="Kagama Digi home"><img className="brand-logo" src="/img/logo.png" alt="Logo Kagama Digi" /><span>kagama digi<span className="brand-dot">.</span></span></button>
    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
      {navItems.map(item => <button key={item.label} className={active === item.target ? 'active' : ''} onClick={() => onNavigate(item.target)}>{item.label}</button>)}
    </div>
    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
      {mobileNavItems.map(item => <button key={item.label} className={active === item.target ? 'active' : ''} onClick={() => onNavigate(item.target)}>{item.label}</button>)}
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
      <div className="hero-photo-scroll"><img className="hero-photo" src="/img/kamadigi.webp" alt="Kegiatan Kagama Digi" onClick={() => openPhoto('/img/kamadigi.webp', 'Kegiatan Kagama Digi')} /></div>
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

function exportCsv(members) {
  const headers = ['Nama', 'Email', 'Jurusan', 'Fakultas', 'Angkatan', 'No. HP', 'Domisili', 'Bidang']
  const escape = (v) => { const s = String(v ?? ''); return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s }
  const rows = members.map(m => [m.name, m.email, m.study, m.faculty, m.year, m.phone, m.domicile, m.division].map(escape).join(','))
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `kagama-digi-anggota-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function AdminDashboard({ members, articles = [], onClose, onAddMember, onUpdateMember, onDeleteMember, onCreateArticle, onUpdateArticle, onDeleteArticle }) {
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
    <div className="member-table-wrap"><div className="table-heading"><div><span className="admin-eyebrow">Form responses</span><h3>Daftar anggota Kagama Digi</h3></div><button className="export-btn" onClick={() => exportCsv(members)}>Export CSV</button></div>
    <div className="member-table">{members.length ? members.map(member => <div className="member-row" key={memberKey(member)}><div className="member-identity"><span className="member-initial">{member.name.split(' ').map(word => word[0]).slice(0, 2).join('')}</span><div><strong>{member.name}</strong><small>{member.email}</small></div></div><span>{member.study}<br /><small>{member.faculty} · Angkatan {member.year}</small></span><span>{member.phone}<br /><small>{member.domicile}</small></span><span className={member.division === divisions[0] ? 'muted-status' : 'gold-status'}>{member.division.replace('Bidang ', '')}</span><div className="member-actions"><button className="row-action row-edit" onClick={() => startEdit(member)}>Edit</button>{confirmId === memberKey(member) ? <span className="confirm-actions"><button className="row-action row-danger" onClick={() => onDeleteMember(member)}>Hapus</button><button className="row-action row-cancel" onClick={() => setConfirmId(null)}>Batal</button></span> : <button className="row-action row-delete" onClick={() => setConfirmId(memberKey(member))}>Hapus</button>}</div></div>) : <div className="empty-members"><span className="empty-icon">＋</span><strong>Belum ada pendaftar</strong><p>Data anggota yang mengisi form akan tampil di sini.</p><button onClick={onAddMember}>Tambah pendaftar pertama</button></div>}</div>
  </div>
    <ArticleAdminPanel articles={articles} onCreate={onCreateArticle} onUpdate={onUpdateArticle} onDelete={onDeleteArticle} />
  </div></div>
}

function ArticleAdminPanel({ articles, onCreate, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const begin = (article = null) => { setEditing(article ? { ...article } : { title: '', excerpt: '', content: '', category: 'Kabar Kagama Digi', image: '', author: 'Kagama Digi', status: 'draft' }); setError('') }
  const update = event => setEditing(current => ({ ...current, [event.target.name]: event.target.value }))
  const uploadImage = async event => {
    const file = event.target.files?.[0]
    if (!file) return
    setError('')
    const body = new FormData()
    body.append('image', file)
    try {
      const response = await fetch('/api/article-upload.php', { method: 'POST', body })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Upload gambar gagal.')
      setEditing(current => ({ ...current, image: data.url }))
    } catch (error) { setError(error.message) }
    event.target.value = ''
  }
  const save = async event => {
    event.preventDefault(); setError('')
    try { editing.id ? await onUpdate(editing) : await onCreate(editing); setEditing(null) }
    catch (e) { setError(e.message || 'Artikel gagal disimpan.') }
  }
  const remove = async article => {
    if (!window.confirm(`Hapus artikel “${article.title}”?`)) return
    try { await onDelete(article) } catch (e) { setError(e.message || 'Artikel gagal dihapus.') }
  }
  return <section className="article-admin"><div className="table-heading"><div><span className="admin-eyebrow">Content studio</span><h3>Kelola artikel <small>{articles.length} tersimpan</small></h3></div><button className="submit-member" onClick={() => begin()}>+ Artikel baru</button></div>
    {error && <p className="admin-form-error" role="alert">{error}</p>}
    {editing && <div className="admin-edit-card article-editor"><div className="inline-register"><div className="inline-register-head"><div><span className="admin-eyebrow">Kagama Digi / Editor</span><h3>{editing.id ? <>Edit <span>artikel.</span></> : <>Tulis artikel <span>baru.</span></>}</h3></div><button type="button" className="inline-close" onClick={() => setEditing(null)}>Tutup</button></div><form onSubmit={save}><div className="form-grid"><label>Judul artikel<input name="title" value={editing.title} onChange={update} required placeholder="Judul yang jelas dan menarik" /></label><label>Kategori<input name="category" value={editing.category} onChange={update} /></label><label>Penulis<input name="author" value={editing.author} onChange={update} /></label><label className="upload-field">Gambar artikel<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadImage} /><small>JPG, PNG, WEBP, GIF · maksimal 5 MB</small>{editing.image && <img className="article-upload-preview" src={editing.image} alt="Preview gambar artikel" />}<input name="image" value={editing.image} onChange={update} type="url" placeholder="Atau gunakan URL gambar" /></label><label className="full-field">Ringkasan singkat<textarea name="excerpt" value={editing.excerpt} onChange={update} rows="3" /></label><label className="full-field">Isi artikel<textarea name="content" value={editing.content} onChange={update} rows="9" required /></label><label>Status<select name="status" value={editing.status} onChange={update}><option value="draft">Draft</option><option value="published">Terbitkan</option></select></label></div><button className="submit-member" type="submit">{editing.id ? 'Simpan perubahan' : 'Simpan artikel'}</button></form></div></div>}
    <div className="article-admin-list">{articles.length ? articles.map(article => <div className="article-admin-row" key={article.id}><div className="article-admin-thumb">{article.image ? <img src={article.image} alt="" /> : <span>KD</span>}</div><div className="article-admin-copy"><strong>{article.title}</strong><small>{article.category} · {article.author}</small></div><span className={article.status === 'published' ? 'gold-status' : 'muted-status'}>{article.status === 'published' ? 'Terbit' : 'Draft'}</span><div className="member-actions"><button className="row-action row-edit" onClick={() => begin(article)}>Edit</button><button className="row-action row-delete" onClick={() => remove(article)}>Hapus</button></div></div>) : <div className="empty-members"><span className="empty-icon">+</span><strong>Belum ada artikel</strong><p>Buat artikel pertama untuk mengisi ruang editorial Kagama Digi.</p><button onClick={() => begin()}>Tulis artikel pertama</button></div>}</div>
  </section>
}
