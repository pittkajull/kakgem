import { useState } from 'react'
import { MemberForm } from './MemberForm'
import { divisions, mobileNavItems, navItems } from '../data/siteData'
import { openPhoto } from '../data/lightbox'
import { defaultSiteContent } from '../data/siteContent'

const adminEmail = 'mailto:kagamadigi@gmail.com'

export function Navbar({ menuOpen, active, onMenuToggle, onNavigate, content = defaultSiteContent }) {
  const brand = content.brand || defaultSiteContent.brand
  const contact = content.contact || defaultSiteContent.contact
  return <nav className="nav-shell">
    <button className="brand" onClick={() => onNavigate('Home')} aria-label={`${brand.name} home`}><img className="brand-logo" src={brand.logo} alt={`Logo ${brand.name}`} /><span>{brand.name}<span className="brand-dot">.</span></span></button>
    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
      {navItems.map(item => <button key={item.label} className={active === item.target ? 'active' : ''} onClick={() => onNavigate(item.target)}>{item.label}</button>)}
    </div>
    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
      {mobileNavItems.map(item => <button key={item.label} className={active === item.target ? 'active' : ''} onClick={() => onNavigate(item.target)}>{item.label}</button>)}
    </div>
    <div className="nav-actions"><button className="contact-pill" onClick={() => { window.location.href = `https://wa.me/${contact.whatsapp}` }}>{brand.navCta}</button></div>
    <button className="menu-btn" onClick={onMenuToggle}>{menuOpen ? '×' : '☰'}</button>
  </nav>
}

export function Hero({ onNavigate, content = defaultSiteContent }) {
  const hero = content.hero || defaultSiteContent.hero
  return <section id="home" className="hero section-pad">
    <div className="hero-copy reveal">
      <p className="eyebrow"><span className="eyebrow-line" /> {hero.eyebrow}</p>
      <h1>{hero.title}<br /><em>{hero.highlight}</em><br />{hero.titleEnd}<span className="lime-dot">.</span></h1>
      <p className="hero-desc">{hero.description}</p>
      <div className="hero-meta">{hero.meta.map((item, index) => <span key={`${item.value}-${index}`}>{item.value}{item.label && <><br />{item.label}</>}</span>)}</div>
    </div>
    <div className="hero-art reveal delay-1" aria-label="Foto Kagama Digi">
      <div className="hero-photo-scroll"><img className="hero-photo" src={hero.image} alt={hero.imageAlt} onClick={() => openPhoto(hero.image, hero.imageAlt)} /></div>
      <div className="art-grid" /><div className="orb orb-lime" /><div className="orb orb-blue" /><div className="orb orb-orange" />
      <div className="art-label">{hero.artLabel}<br /><span>{hero.artSubLabel}</span></div><div className="art-number">{hero.artNumber}</div><div className="photo-caption"><span className="caption-dot" /> {hero.caption}</div>
    </div>
  </section>
}

export function ImpactStrip({ content = defaultSiteContent }) {
  const items = content.impact?.items || defaultSiteContent.impact.items
  const repeated = [...items, ...items]
  return <div className="impact-strip" aria-label="Kagama Digi principles"><div className="impact-track">{repeated.map((item, index) => <span key={`${item}-${index}`}>{index > 0 && <b>✳</b>}{item}</span>)}</div></div>
}

export function AboutSection({ onNavigate, content = defaultSiteContent }) {
  const about = content.about || defaultSiteContent.about
  return <section id="about" className="about section-pad">
    <div className="section-kicker">{about.kicker}</div>
    <div className="about-content"><h2>{about.title}<br /><span>{about.highlight}</span><br />{about.titleEnd}</h2><div className="about-side"><p>{about.body}</p><p className="muted">{about.mutedBody}</p><div className="vision-copy"><p><strong>Visi</strong> {about.vision}</p><p><strong>Misi</strong> {about.mission}</p></div><button className="text-link" onClick={() => onNavigate('Membership')}>{about.cta}</button></div></div>
    <div className="stats">{about.stats.map(stat => <div key={`${stat.value}-${stat.label}`}><strong>{stat.value}</strong><span>{stat.label}<br />{stat.detail}</span></div>)}</div>
  </section>
}

export function ServicesSection({ content = defaultSiteContent }) {
  const servicesContent = content.services || defaultSiteContent.services
  return <section id="services" className="services section-pad"><div className="section-kicker">{servicesContent.kicker}</div><div className="services-head"><h2>{servicesContent.title}<br /><span>{servicesContent.highlight}</span></h2><p>{servicesContent.description}</p></div><div className="service-list">{servicesContent.items.map((service, index) => <article className={`service-card ${service.accent || 'lime'}`} key={`${service.title}-${index}`}><span className="service-no">{service.no || String(index + 1).padStart(2, '0')}</span><h3>{service.title}</h3><p>{service.text}</p></article>)}</div></section>
}

export function WorksSection({ onNavigate, content = defaultSiteContent }) {
  const works = content.works || defaultSiteContent.works
  return <section id="works" className="works section-pad"><div className="section-kicker">{works.kicker}</div><div className="works-heading"><h2>{works.title}<br /><span>{works.highlight}</span></h2><p>{works.description}</p></div><div className="program-grid">{works.items.map((program, index) => <article className={`program-card ${program.tone || 'amber'}`} key={`${program.title}-${index}`}>        <div className="program-banner"><small>{String(index + 1).padStart(2, '0')}</small><strong>{program.title}</strong><span className="program-mark">KD</span></div><div className="program-details"><p>{program.description}</p><button onClick={() => onNavigate('Contact')}>Ikuti program</button></div></article>)}</div></section>
}

export function MembershipSection({ showRegister, setShowRegister, form, updateForm, submitMember, content = defaultSiteContent }) {
  const membership = content.membership || defaultSiteContent.membership
  return <section id="membership" className="membership section-pad"><div className="membership-inner"><div><div className="section-kicker">{membership.kicker}</div><h2>{membership.title}<br /><span>{membership.highlight}</span></h2></div><div className="membership-copy"><p>{membership.description}</p><span className="alumni-only">{membership.alumniOnly}</span><button className="membership-cta" onClick={() => setShowRegister(current => !current)}>{showRegister ? 'Tutup form' : membership.cta}</button></div></div><div className="membership-footer"><span>{membership.footerLeft}</span><span>{membership.footerRight}</span></div>{showRegister && <MemberForm form={form} updateForm={updateForm} submitMember={submitMember} onClose={() => setShowRegister(false)} />}</section>
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
  const [success, setSuccess] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const previewImage = uploadedImage || editing?.image || ''
  const begin = (article = null) => { setEditing(article ? { ...article } : { title: '', excerpt: '', content: '', category: 'Kabar Kagama Digi', image: '', author: 'Kagama Digi', status: 'draft' }); setError(''); setSuccess(''); setUploadedImage(null) }
  const update = event => setEditing(current => ({ ...current, [event.target.name]: event.target.value }))
  const uploadImage = async event => {
    const file = event.target.files?.[0]
    if (!file) return
    setError(''); setSuccess('')
    const body = new FormData()
    body.append('image', file)
    try {
      const response = await fetch('/api/article-upload.php', { method: 'POST', body })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Upload gambar gagal.')
      setUploadedImage(data.url)
    } catch (error) { setError(error.message) }
    event.target.value = ''
  }
  const save = async event => {
    event.preventDefault(); setError(''); setSuccess('')
    try {
      const status = editing.status
      const payload = { ...editing, image: uploadedImage || editing.image || '' }
      payload.id ? await onUpdate(payload) : await onCreate(payload)
      setEditing(null)
      setUploadedImage(null)
      setSuccess(status === 'published' ? 'Artikel berhasil diterbitkan dan tampil di website.' : 'Artikel berhasil disimpan sebagai draft. Untuk menampilkan di website, ubah status menjadi \u201cTerbitkan\u201d lalu simpan.')
    }
    catch (e) { setError(e.message || 'Artikel gagal disimpan.') }
  }
  const remove = async article => {
    if (!window.confirm(`Hapus artikel “${article.title}”?`)) return
    try { await onDelete(article) } catch (e) { setError(e.message || 'Artikel gagal dihapus.') }
  }
  return <section className="article-admin"><div className="table-heading"><div><span className="admin-eyebrow">Content studio</span><h3>Kelola artikel <small>{articles.length} tersimpan</small></h3></div><button className="submit-member" onClick={() => begin()}>+ Artikel baru</button></div>
    {success && <p className="admin-form-success" role="status">{success}</p>}
    {error && <p className="admin-form-error" role="alert">{error}</p>}
    {editing && <div className="admin-edit-card article-editor"><div className="inline-register"><div className="inline-register-head"><div><span className="admin-eyebrow">Kagama Digi / Editor</span><h3>{editing.id ? <>Edit <span>artikel.</span></> : <>Tulis artikel <span>baru.</span></>}</h3></div><button type="button" className="inline-close" onClick={() => setEditing(null)}>Tutup</button></div><form onSubmit={save}><div className="form-grid"><label>Judul artikel<input name="title" value={editing.title} onChange={update} required placeholder="Judul yang jelas dan menarik" /></label><label>Kategori<input name="category" value={editing.category} onChange={update} /></label><label>Penulis<input name="author" value={editing.author} onChange={update} /></label><label className="upload-field">Gambar artikel<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadImage} /><small>JPG, PNG, WEBP, GIF · maksimal 5 MB</small>{previewImage && <img className="article-upload-preview" src={previewImage} alt="Preview gambar artikel" />}<input name="image" value={editing.image} onChange={update} type="url" placeholder="Atau gunakan URL gambar" /></label><label className="full-field">Ringkasan singkat<textarea name="excerpt" value={editing.excerpt} onChange={update} rows="3" /></label><label className="full-field">Isi artikel<textarea name="content" value={editing.content} onChange={update} rows="9" required /></label><label>Status<select name="status" value={editing.status} onChange={update}><option value="draft">Draft</option><option value="published">Terbitkan</option></select></label></div><button className="submit-member" type="submit">{editing.id ? 'Simpan perubahan' : 'Simpan artikel'}</button></form></div></div>}
    <div className="article-admin-list">{articles.length ? articles.map(article => <div className="article-admin-row" key={article.id}><div className="article-admin-thumb">{article.image ? <img src={article.image} alt="" /> : <span>KD</span>}</div><div className="article-admin-copy"><strong>{article.title}</strong><small>{article.category} · {article.author}</small></div><span className={article.status === 'published' ? 'gold-status' : 'muted-status'}>{article.status === 'published' ? 'Terbit' : 'Draft'}</span><div className="member-actions"><button className="row-action row-edit" onClick={() => begin(article)}>Edit</button><button className="row-action row-delete" onClick={() => remove(article)}>Hapus</button></div></div>) : <div className="empty-members"><span className="empty-icon">+</span><strong>Belum ada artikel</strong><p>Buat artikel pertama untuk mengisi ruang editorial Kagama Digi.</p><button onClick={() => begin()}>Tulis artikel pertama</button></div>}</div>
  </section>
}
