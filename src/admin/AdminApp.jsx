import { useEffect, useMemo, useState } from 'react'
import { AdminDashboard } from '../components/SiteSections'
import { defaultSiteContent, mergeSiteContent } from '../data/siteContent'
import './admin.css'

const menu = [
  ['dashboard', 'Ringkasan', '▦'],
  ['brand', 'Brand & navigasi', '◉'],
  ['hero', 'Hero beranda', '▧'],
  ['about', 'Profil singkat', '◌'],
  ['services', 'Fokus kerja', '⌁'],
  ['works', 'Program', '□'],
  ['journey', 'Perjalanan', '↗'],
  ['gallery', 'Galeri', '▤'],
  ['team', 'Tim kami', '♙'],
  ['membership', 'Keanggotaan', '＋'],
  ['contact', 'Kontak', '⌖'],
  ['articles', 'Artikel', '▤'],
  ['data', 'Member & artikel', '≡'],
]

const pageTitles = Object.fromEntries(menu.map(([key, label]) => [key, label]))

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function setAt(setValue, path, value) {
  setValue(current => {
    const next = clone(current)
    let target = next
    path.slice(0, -1).forEach(key => { target[key] = target[key] ?? {}; target = target[key] })
    target[path[path.length - 1]] = value
    return next
  })
}

function textValue(event) {
  return event.target.value
}

export function AdminApp() {
  const pathname = window.location.pathname
  const [route, setRoute] = useState(() => pathname === '/admin' ? 'redirect' : pathname.endsWith('/login.php') ? 'login' : 'dashboard')

  useEffect(() => {
    if (route === 'redirect') window.location.replace('/admin/login.php')
  }, [route])

  if (route === 'redirect') return <div className="admin-route-loading">Membuka pusat kontrol…</div>
  if (route === 'login') return <AdminLogin onSuccess={() => { window.history.replaceState({}, '', '/admin/'); setRoute('dashboard') }} />
  return <AdminSessionGate onUnauthorized={() => { window.history.replaceState({}, '', '/admin/login.php'); setRoute('login') }} />
}

function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async event => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      const response = await fetch('/api/login.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Login gagal.')
      onSuccess()
    } catch (err) {
      setError(err.message || 'Login gagal.')
    } finally {
      setBusy(false)
    }
  }

  return <main className="admin-login-page">
    <div className="admin-login-kicker">KAGAMA DIGI / ADMIN CONTROL CENTER</div>
    <section className="admin-login-card">
      <a className="admin-back-link" href="/">← Kembali ke website</a>
      <div className="admin-logo-frame"><img src="/img/logo.png" alt="Logo Kagama Digi" /></div>
      <span className="admin-login-label">Kagama Digi</span>
      <h1>Login admin</h1>
      <p className="admin-login-intro">Masukkan password untuk mengakses pusat kontrol konten website.</p>
      <form className="admin-login-form" onSubmit={submit}>
        <label>Password<input autoFocus type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Masukkan password" required /></label>
        {error && <p className="admin-error" role="alert">{error}</p>}
        <button type="submit" disabled={busy}>{busy ? 'Memeriksa…' : 'Masuk admin'}</button>
      </form>
    </section>
  </main>
}

function AdminSessionGate({ onUnauthorized }) {
  const [state, setState] = useState({ loading: true, content: null })

  useEffect(() => {
    fetch('/api/site-content.php?admin=1')
      .then(async response => {
        const data = await response.json().catch(() => ({}))
        if (response.status === 403) throw new Error('unauthorized')
        if (!response.ok) throw new Error(data.error || 'Konten gagal dimuat.')
        return data
      })
      .then(data => setState({ loading: false, content: data.content }))
      .catch(error => {
        if (error.message === 'unauthorized') onUnauthorized()
        else setState({ loading: false, content: null, error: error.message })
      })
  }, [onUnauthorized])

  if (state.loading) return <div className="admin-route-loading">Memuat pusat kontrol…</div>
  if (state.error) return <div className="admin-route-loading">{state.error}</div>
  return <AdminWorkspace initialContent={state.content} onLogout={onUnauthorized} />
}

function AdminWorkspace({ initialContent, onLogout }) {
  const [section, setSection] = useState('dashboard')
  const [content, setContent] = useState(() => mergeSiteContent(initialContent))
  const [members, setMembers] = useState([])
  const [articles, setArticles] = useState([])
  const [notice, setNotice] = useState({ type: '', text: '' })
  const [saving, setSaving] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  const refreshData = async () => {
    const [memberResponse, articleResponse] = await Promise.all([fetch('/api/members.php'), fetch('/api/articles.php?admin=1')])
    if (memberResponse.status === 403 || articleResponse.status === 403) throw new Error('unauthorized')
    const [memberData, articleData] = await Promise.all([memberResponse.json(), articleResponse.json()])
    setMembers(memberData.members || [])
    setArticles(articleData.articles || [])
  }

  useEffect(() => {
    refreshData().catch(error => { if (error.message === 'unauthorized') onLogout() }).finally(() => setLoadingData(false))
  }, [])

  const saveContent = async () => {
    setNotice({ type: '', text: '' })
    setSaving(true)
    try {
      const response = await fetch('/api/site-content.php', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) })
      const data = await response.json().catch(() => ({}))
      if (response.status === 403) throw new Error('unauthorized')
      if (!response.ok) throw new Error(data.error || 'Konten gagal disimpan.')
      setContent(mergeSiteContent(data.content))
      setNotice({ type: 'success', text: 'Perubahan sudah tersimpan di website.' })
    } catch (error) {
      if (error.message === 'unauthorized') onLogout()
      else setNotice({ type: 'error', text: error.message })
    } finally {
      setSaving(false)
    }
  }

  const uploadImage = async (path, file) => {
    if (!file) return
    const body = new FormData()
    body.append('image', file)
    try {
      const response = await fetch('/api/article-upload.php', { method: 'POST', body })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Upload gambar gagal.')
      setAt(setContent, path, data.url)
      setNotice({ type: 'success', text: 'Gambar siap disimpan. Klik Simpan perubahan.' })
    } catch (error) {
      setNotice({ type: 'error', text: error.message })
    }
  }

  const updateMember = async (target, updates) => {
    const response = await fetch('/api/members.php', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ target: target.id || target.email, updates }) })
    if (!response.ok) throw new Error('Data member gagal diperbarui.')
    await refreshData()
  }
  const deleteMember = async target => {
    const response = await fetch('/api/members.php', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ target: target.id || target.email }) })
    if (!response.ok) throw new Error('Data member gagal dihapus.')
    await refreshData()
  }
  const createArticle = async article => {
    const response = await fetch('/api/articles.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...article, id: Date.now() }) })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.error || 'Artikel gagal dibuat.')
    await refreshData()
  }
  const updateArticle = async article => {
    const response = await fetch('/api/articles.php', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(article) })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.error || 'Artikel gagal diperbarui.')
    await refreshData()
  }
  const deleteArticle = async article => {
    const response = await fetch('/api/articles.php', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: article.id }) })
    if (!response.ok) throw new Error('Artikel gagal dihapus.')
    await refreshData()
  }

  const logout = async () => {
    await fetch('/api/logout.php', { method: 'POST' }).catch(() => {})
    window.location.replace('/admin/login.php')
  }

  if (loadingData) return <div className="admin-route-loading">Menyiapkan data pusat kontrol…</div>

  return <main className="admin-app">
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand"><span>PUSAT KONTROL</span><small>KAGAMA DIGI<br />CONTENT CENTER</small></div>
      <nav className="admin-nav" aria-label="Navigasi admin">{menu.map(([key, label, icon]) => <button key={key} className={section === key ? 'active' : ''} onClick={() => { setSection(key); setNotice({ type: '', text: '' }) }}><span>{icon}</span>{label}</button>)}</nav>
      <div className="admin-sidebar-user"><span className="admin-user-mark">KD</span><div><strong>admin</strong><small>administrator</small></div></div>
    </aside>
    <section className="admin-main">
      <header className="admin-header"><div><span className="admin-header-kicker">Kagama Digi / Admin control center</span><h1>{pageTitles[section]}</h1><p>Kelola konten yang tampil di halaman utama.</p></div><div className="admin-header-actions"><a href="/" target="_blank" rel="noreferrer">Lihat website ↗</a><button onClick={logout}>Logout</button></div></header>
      {notice.text && <div className={`cms-notice ${notice.type}`} role="status">{notice.text}</div>}
      {section === 'dashboard' && <DashboardPanel content={content} members={members} articles={articles} onNavigate={setSection} />}
      {section === 'brand' && <BrandEditor content={content} setContent={setContent} onUpload={uploadImage} />}
      {section === 'hero' && <HeroEditor content={content} setContent={setContent} onUpload={uploadImage} />}
      {section === 'about' && <AboutEditor content={content} setContent={setContent} />}
      {section === 'services' && <ServicesEditor content={content} setContent={setContent} />}
      {section === 'works' && <WorksEditor content={content} setContent={setContent} />}
      {section === 'journey' && <JourneyEditor content={content} setContent={setContent} />}
      {section === 'gallery' && <GalleryEditor content={content} setContent={setContent} onUpload={uploadImage} />}
      {section === 'team' && <TeamEditor content={content} setContent={setContent} />}
      {section === 'membership' && <MembershipEditor content={content} setContent={setContent} />}
      {section === 'contact' && <ContactEditor content={content} setContent={setContent} />}
      {section === 'articles' && <ArticlesEditor content={content} setContent={setContent} />}
      {section === 'data' && <div className="cms-data-panel"><AdminDashboard members={members} articles={articles} onClose={() => setSection('dashboard')} onAddMember={() => setSection('dashboard')} onUpdateMember={updateMember} onDeleteMember={deleteMember} onCreateArticle={createArticle} onUpdateArticle={updateArticle} onDeleteArticle={deleteArticle} /></div>}
      {section !== 'dashboard' && section !== 'data' && <div className="cms-save-bar"><span>Perubahan belum diterapkan sampai disimpan.</span><button onClick={saveContent} disabled={saving}>{saving ? 'Menyimpan…' : 'Simpan perubahan'}</button></div>}
    </section>
  </main>
}

function DashboardPanel({ content, members, articles, onNavigate }) {
  const sections = Object.keys(content).length
  return <div className="cms-dashboard"><section className="cms-welcome"><span>Versi administrasi website</span><h2>Kagama Digi Content Control</h2><p>Kelola teks, gambar, program, galeri, susunan pengurus, kontak, dan konten editorial dari satu pusat kontrol.</p></section><div className="cms-stat-grid"><Stat label="Bagian konten" value={sections} /><Stat label="Member terdaftar" value={members.length} /><Stat label="Artikel tersimpan" value={articles.length} /><Stat label="Artikel terbit" value={articles.filter(article => article.status === 'published').length} /></div><section className="cms-quick-grid"><Quick title="Hero beranda" text="Judul, deskripsi, foto, dan metadata pembuka." onClick={() => onNavigate('hero')} /><Quick title="Galeri & aktivasi" text="Foto dokumentasi dan cerita kegiatan." onClick={() => onNavigate('gallery')} /><Quick title="Tim kami" text="Pengurus harian dan bidang organisasi." onClick={() => onNavigate('team')} /><Quick title="Member & artikel" text="Kelola data pendaftar dan publikasi." onClick={() => onNavigate('data')} /></section></div>
}

function BrandEditor({ content, setContent, onUpload }) {
  const brand = content.brand
  return <div className="cms-editor-grid"><EditorCard eyebrow="Identitas situs" title="Brand dan navigasi"><SaveHint /><div className="cms-form-grid"><Field label="Nama brand" value={brand.name} onChange={event => setAt(setContent, ['brand', 'name'], textValue(event))} /><Field label="Teks tombol header" value={brand.navCta} onChange={event => setAt(setContent, ['brand', 'navCta'], textValue(event))} /><ImageField label="Logo brand" value={brand.logo} onChange={event => setAt(setContent, ['brand', 'logo'], textValue(event))} onUpload={file => onUpload(['brand', 'logo'], file)} /></div></EditorCard></div>
}

function Stat({ label, value }) { return <div className="cms-stat"><span>{label}</span><strong>{value}</strong></div> }
function Quick({ title, text, onClick }) { return <button className="cms-quick" onClick={onClick}><span>{title}</span><strong>↗</strong><p>{text}</p></button> }

function EditorCard({ eyebrow, title, children, className = '' }) { return <section className={`cms-card ${className}`}><div className="cms-card-heading"><span>{eyebrow}</span><h2>{title}</h2></div>{children}</section> }
function Field({ label, value, onChange, type = 'text', placeholder = '', help = '' }) { return <label className="cms-field">{label}<input type={type} value={value ?? ''} onChange={onChange} placeholder={placeholder} />{help && <small>{help}</small>}</label> }
function Area({ label, value, onChange, rows = 4, placeholder = '', help = '' }) { return <label className="cms-field cms-area">{label}<textarea rows={rows} value={value ?? ''} onChange={onChange} placeholder={placeholder} />{help && <small>{help}</small>}</label> }
function ImageField({ label, value, onChange, onUpload }) { return <div className="cms-image-field"><Field label={label} value={value} onChange={onChange} placeholder="/img/nama-file.webp atau URL gambar" /><label className="cms-upload">Upload gambar<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={event => onUpload(event.target.files?.[0])} /><small>JPG, PNG, WEBP, GIF · maksimal 5 MB</small></label>{value && <img src={value} alt="Preview" />}</div> }
function SaveHint() { return <p className="cms-hint">Gunakan teks yang singkat dan jelas. Perubahan akan tampil setelah tombol Simpan perubahan ditekan.</p> }

function HeroEditor({ content, setContent, onUpload }) {
  const hero = content.hero
  return <div className="cms-editor-grid"><EditorCard eyebrow="Beranda / Hero" title="Kelola pembuka website"><SaveHint /><div className="cms-form-grid"><Field label="Eyebrow" value={hero.eyebrow} onChange={event => setAt(setContent, ['hero', 'eyebrow'], textValue(event))} /><Field label="Judul utama" value={hero.title} onChange={event => setAt(setContent, ['hero', 'title'], textValue(event))} /><Field label="Baris aksen" value={hero.highlight} onChange={event => setAt(setContent, ['hero', 'highlight'], textValue(event))} /><Field label="Baris penutup" value={hero.titleEnd} onChange={event => setAt(setContent, ['hero', 'titleEnd'], textValue(event))} /><Area label="Deskripsi" value={hero.description} onChange={event => setAt(setContent, ['hero', 'description'], textValue(event))} rows={5} /><ImageField label="Gambar hero" value={hero.image} onChange={event => setAt(setContent, ['hero', 'image'], textValue(event))} onUpload={file => onUpload(['hero', 'image'], file)} /></div></EditorCard><EditorCard eyebrow="Detail visual" title="Label pada foto"><div className="cms-form-grid"><Field label="Alt gambar" value={hero.imageAlt} onChange={event => setAt(setContent, ['hero', 'imageAlt'], textValue(event))} /><Field label="Label visual" value={hero.artLabel} onChange={event => setAt(setContent, ['hero', 'artLabel'], textValue(event))} /><Field label="Sub-label" value={hero.artSubLabel} onChange={event => setAt(setContent, ['hero', 'artSubLabel'], textValue(event))} /><Field label="Nomor visual" value={hero.artNumber} onChange={event => setAt(setContent, ['hero', 'artNumber'], textValue(event))} /><Field label="Caption foto" value={hero.caption} onChange={event => setAt(setContent, ['hero', 'caption'], textValue(event))} /></div><ListFields title="Metadata bawah hero" items={hero.meta} path={['hero', 'meta']} setContent={setContent} fields={[['value', 'Nilai'], ['label', 'Baris kedua']]} /></EditorCard></div>
}

function AboutEditor({ content, setContent }) {
  const about = content.about
  return <div className="cms-editor-grid"><EditorCard eyebrow="Profil singkat" title="Isi bagian tentang Kagama"><div className="cms-form-grid"><Field label="Kicker" value={about.kicker} onChange={event => setAt(setContent, ['about', 'kicker'], textValue(event))} /><Field label="Judul utama" value={about.title} onChange={event => setAt(setContent, ['about', 'title'], textValue(event))} /><Field label="Judul aksen" value={about.highlight} onChange={event => setAt(setContent, ['about', 'highlight'], textValue(event))} /><Field label="Judul penutup" value={about.titleEnd} onChange={event => setAt(setContent, ['about', 'titleEnd'], textValue(event))} /><Area label="Paragraf utama" value={about.body} onChange={event => setAt(setContent, ['about', 'body'], textValue(event))} /><Area label="Paragraf pendukung" value={about.mutedBody} onChange={event => setAt(setContent, ['about', 'mutedBody'], textValue(event))} /><Area label="Visi" value={about.vision} onChange={event => setAt(setContent, ['about', 'vision'], textValue(event))} /><Area label="Misi" value={about.mission} onChange={event => setAt(setContent, ['about', 'mission'], textValue(event))} /><Field label="Teks tombol" value={about.cta} onChange={event => setAt(setContent, ['about', 'cta'], textValue(event))} /></div></EditorCard><EditorCard eyebrow="Profil singkat" title="Angka pendukung"><ListFields title="Statistik" items={about.stats} path={['about', 'stats']} setContent={setContent} fields={[['value', 'Nilai'], ['label', 'Label'], ['detail', 'Detail']]} /></EditorCard></div>
}

function ServicesEditor({ content, setContent }) {
  const data = content.services
  return <div className="cms-editor-grid"><EditorCard eyebrow="Fokus kerja" title="Nilai yang dibangun"><div className="cms-form-grid"><Field label="Kicker" value={data.kicker} onChange={event => setAt(setContent, ['services', 'kicker'], textValue(event))} /><Field label="Judul utama" value={data.title} onChange={event => setAt(setContent, ['services', 'title'], textValue(event))} /><Field label="Judul aksen" value={data.highlight} onChange={event => setAt(setContent, ['services', 'highlight'], textValue(event))} /><Area label="Deskripsi" value={data.description} onChange={event => setAt(setContent, ['services', 'description'], textValue(event))} /></div></EditorCard><EditorCard eyebrow="Fokus kerja" title="Daftar nilai"><ListFields title="Item fokus kerja" items={data.items} path={['services', 'items']} setContent={setContent} fields={[['no', 'Nomor'], ['title', 'Judul'], ['text', 'Deskripsi'], ['accent', 'Aksen CSS']]} /></EditorCard></div>
}

function WorksEditor({ content, setContent }) {
  const data = content.works
  return <div className="cms-editor-grid"><EditorCard eyebrow="Aktivasi" title="Program jangka panjang"><div className="cms-form-grid"><Field label="Kicker" value={data.kicker} onChange={event => setAt(setContent, ['works', 'kicker'], textValue(event))} /><Field label="Judul utama" value={data.title} onChange={event => setAt(setContent, ['works', 'title'], textValue(event))} /><Field label="Judul aksen" value={data.highlight} onChange={event => setAt(setContent, ['works', 'highlight'], textValue(event))} /><Area label="Deskripsi" value={data.description} onChange={event => setAt(setContent, ['works', 'description'], textValue(event))} /></div></EditorCard><EditorCard eyebrow="Aktivasi" title="Daftar program"><ListFields title="Program" items={data.items} path={['works', 'items']} setContent={setContent} fields={[['title', 'Nama program'], ['tone', 'Tone: amber / charcoal / sand / gold'], ['description', 'Deskripsi']]} /></EditorCard></div>
}

function JourneyEditor({ content, setContent }) {
  const data = content.journey
  return <div className="cms-editor-grid"><EditorCard eyebrow="Perjalanan" title="Sambutan dan storyline"><div className="cms-form-grid"><Field label="Kicker" value={data.kicker} onChange={event => setAt(setContent, ['journey', 'kicker'], textValue(event))} /><Field label="Label sambutan" value={data.welcomeLabel} onChange={event => setAt(setContent, ['journey', 'welcomeLabel'], textValue(event))} /><Field label="Judul sambutan" value={data.welcomeTitle} onChange={event => setAt(setContent, ['journey', 'welcomeTitle'], textValue(event))} /><Field label="Aksen sambutan" value={data.welcomeHighlight} onChange={event => setAt(setContent, ['journey', 'welcomeHighlight'], textValue(event))} /><Area label="Pesan ketua 1" value={data.chairMessage[0]} onChange={event => setAt(setContent, ['journey', 'chairMessage', 0], textValue(event))} /><Area label="Pesan ketua 2" value={data.chairMessage[1]} onChange={event => setAt(setContent, ['journey', 'chairMessage', 1], textValue(event))} /><Field label="Nama ketua" value={data.chairName} onChange={event => setAt(setContent, ['journey', 'chairName'], textValue(event))} /><Field label="Jabatan ketua" value={data.chairRole} onChange={event => setAt(setContent, ['journey', 'chairRole'], textValue(event))} /><Field label="Label storyline" value={data.storylineLabel} onChange={event => setAt(setContent, ['journey', 'storylineLabel'], textValue(event))} /><Field label="Judul storyline" value={data.storylineTitle} onChange={event => setAt(setContent, ['journey', 'storylineTitle'], textValue(event))} /><Field label="Aksen storyline" value={data.storylineHighlight} onChange={event => setAt(setContent, ['journey', 'storylineHighlight'], textValue(event))} /><Area label="Deskripsi storyline" value={data.storylineText} onChange={event => setAt(setContent, ['journey', 'storylineText'], textValue(event))} /></div></EditorCard><EditorCard eyebrow="Perjalanan" title="Tahapan dan workshop"><ListFields title="Tahapan perjalanan" items={data.phases} path={['journey', 'phases']} setContent={setContent} fields={[['no', 'Nomor'], ['title', 'Judul'], ['text', 'Deskripsi']]} /><Area label="Topik workshop (satu topik per baris)" value={data.workshopTopics.join('\n')} onChange={event => setAt(setContent, ['journey', 'workshopTopics'], textValue(event).split('\n').filter(Boolean))} rows={8} /></EditorCard><EditorCard eyebrow="Aktivasi" title="Cerita kegiatan"><ListFields title="Highlight aktivasi" items={data.activations} path={['journey', 'activations']} setContent={setContent} fields={[['type', 'Jenis'], ['title', 'Judul'], ['text', 'Deskripsi'], ['photos', 'Foto (pisahkan dengan koma)']]} /></EditorCard></div>
}

function GalleryEditor({ content, setContent, onUpload }) {
  const data = content.gallery
  return <div className="cms-editor-grid"><EditorCard eyebrow="Dokumentasi" title="Pengaturan galeri"><div className="cms-form-grid"><Field label="Kicker" value={data.kicker} onChange={event => setAt(setContent, ['gallery', 'kicker'], textValue(event))} /><Field label="Judul utama" value={data.title} onChange={event => setAt(setContent, ['gallery', 'title'], textValue(event))} /><Field label="Judul aksen" value={data.highlight} onChange={event => setAt(setContent, ['gallery', 'highlight'], textValue(event))} /><Area label="Deskripsi" value={data.description} onChange={event => setAt(setContent, ['gallery', 'description'], textValue(event))} /></div></EditorCard><EditorCard eyebrow="Dokumentasi" title="Foto dan caption"><GalleryList items={data.items} path={['gallery', 'items']} setContent={setContent} onUpload={onUpload} /></EditorCard></div>
}

function TeamEditor({ content, setContent }) {
  const data = content.team
  return <div className="cms-editor-grid"><EditorCard eyebrow="Tim kami" title="Pengurus Kagama Digi"><div className="cms-form-grid"><Field label="Kicker" value={data.kicker} onChange={event => setAt(setContent, ['team', 'kicker'], textValue(event))} /><Field label="Judul utama" value={data.title} onChange={event => setAt(setContent, ['team', 'title'], textValue(event))} /><Field label="Judul aksen" value={data.highlight} onChange={event => setAt(setContent, ['team', 'highlight'], textValue(event))} /><Area label="Deskripsi" value={data.description} onChange={event => setAt(setContent, ['team', 'description'], textValue(event))} /></div><ListFields title="Pengurus harian" items={data.leadership} path={['team', 'leadership']} setContent={setContent} fields={[[0, 'Jabatan'], [1, 'Nama']]} /></EditorCard><EditorCard eyebrow="Tim kami" title="Bidang dan divisi"><ListFields title="Daftar bidang" items={data.divisions} path={['team', 'divisions']} setContent={setContent} fields={[[0, 'Bidang'], [1, 'Nama penanggung jawab']]} /></EditorCard></div>
}

function MembershipEditor({ content, setContent }) {
  const data = content.membership
  return <div className="cms-editor-grid"><EditorCard eyebrow="Keanggotaan" title="Ajakan bergabung"><div className="cms-form-grid"><Field label="Kicker" value={data.kicker} onChange={event => setAt(setContent, ['membership', 'kicker'], textValue(event))} /><Field label="Judul utama" value={data.title} onChange={event => setAt(setContent, ['membership', 'title'], textValue(event))} /><Field label="Judul aksen" value={data.highlight} onChange={event => setAt(setContent, ['membership', 'highlight'], textValue(event))} /><Area label="Deskripsi" value={data.description} onChange={event => setAt(setContent, ['membership', 'description'], textValue(event))} /><Field label="Catatan alumni" value={data.alumniOnly} onChange={event => setAt(setContent, ['membership', 'alumniOnly'], textValue(event))} /><Field label="Teks tombol" value={data.cta} onChange={event => setAt(setContent, ['membership', 'cta'], textValue(event))} /><Field label="Footer kiri" value={data.footerLeft} onChange={event => setAt(setContent, ['membership', 'footerLeft'], textValue(event))} /><Field label="Footer kanan" value={data.footerRight} onChange={event => setAt(setContent, ['membership', 'footerRight'], textValue(event))} /></div></EditorCard></div>
}

function ContactEditor({ content, setContent }) {
  const data = content.contact
  return <div className="cms-editor-grid"><EditorCard eyebrow="Kontak" title="Kanal resmi Kagama Digi"><div className="cms-form-grid"><Field label="Kicker" value={data.kicker} onChange={event => setAt(setContent, ['contact', 'kicker'], textValue(event))} /><Field label="Judul utama" value={data.title} onChange={event => setAt(setContent, ['contact', 'title'], textValue(event))} /><Field label="Judul aksen" value={data.highlight} onChange={event => setAt(setContent, ['contact', 'highlight'], textValue(event))} /><Area label="Deskripsi" value={data.description} onChange={event => setAt(setContent, ['contact', 'description'], textValue(event))} /><Field label="Email" value={data.email} onChange={event => setAt(setContent, ['contact', 'email'], textValue(event))} type="email" /><Field label="WhatsApp (format internasional)" value={data.whatsapp} onChange={event => setAt(setContent, ['contact', 'whatsapp'], textValue(event))} /><Field label="Nomor tampil" value={data.phoneLabel} onChange={event => setAt(setContent, ['contact', 'phoneLabel'], textValue(event))} /><Field label="Instagram" value={data.instagram} onChange={event => setAt(setContent, ['contact', 'instagram'], textValue(event))} /><Field label="URL Instagram" value={data.instagramUrl} onChange={event => setAt(setContent, ['contact', 'instagramUrl'], textValue(event))} type="url" /><Field label="Nama lokasi" value={data.locationName} onChange={event => setAt(setContent, ['contact', 'locationName'], textValue(event))} /><Field label="Detail lokasi" value={data.locationMeta} onChange={event => setAt(setContent, ['contact', 'locationMeta'], textValue(event))} /><Field label="URL peta" value={data.locationUrl} onChange={event => setAt(setContent, ['contact', 'locationUrl'], textValue(event))} type="url" /><Field label="Label footer" value={data.footerEyebrow} onChange={event => setAt(setContent, ['contact', 'footerEyebrow'], textValue(event))} /><Area label="Teks footer" value={data.footerText} onChange={event => setAt(setContent, ['contact', 'footerText'], textValue(event))} /></div></EditorCard></div>
}

function ArticlesEditor({ content, setContent }) {
  const data = content.articles
  return <div className="cms-editor-grid"><EditorCard eyebrow="Editorial" title="Judul section artikel"><div className="cms-form-grid"><Field label="Kicker" value={data.kicker} onChange={event => setAt(setContent, ['articles', 'kicker'], textValue(event))} /><Field label="Judul utama" value={data.title} onChange={event => setAt(setContent, ['articles', 'title'], textValue(event))} /><Field label="Judul aksen" value={data.highlight} onChange={event => setAt(setContent, ['articles', 'highlight'], textValue(event))} /><Area label="Deskripsi" value={data.description} onChange={event => setAt(setContent, ['articles', 'description'], textValue(event))} /></div></EditorCard><EditorCard eyebrow="Editorial" title="Isi artikel"><p className="cms-hint">Gunakan menu Member &amp; artikel untuk membuat, menerbitkan, mengubah, dan menghapus artikel.</p></EditorCard></div>
}

function ListFields({ title, items, path, setContent, fields }) {
  return <div className="cms-list-editor"><div className="cms-list-heading"><h3>{title}</h3><button type="button" onClick={() => setContent(current => { const next = clone(current); let target = next; path.slice(0, -1).forEach(key => { target = target[key] }); const template = Object.fromEntries(fields.map(([key]) => [key, ''])); target[path[path.length - 1]] = [...(target[path[path.length - 1]] || []), Array.isArray(items[0]) ? fields.map(() => '') : template]; return next })}>+ Tambah</button></div>{items.map((item, index) => <div className="cms-list-row" key={`${path.join('-')}-${index}`}><span className="cms-list-index">{String(index + 1).padStart(2, '0')}</span><div className="cms-list-fields">{fields.map(([key, label]) => { const value = Array.isArray(item) ? item[key] ?? '' : key === 'photos' && Array.isArray(item[key]) ? item[key].join(', ') : item[key] ?? ''; return <Field key={String(key)} label={label} value={value} onChange={event => setAt(setContent, [...path, index, key], key === 'photos' ? textValue(event).split(',').map(value => value.trim()).filter(Boolean) : textValue(event))} /> })}</div><button type="button" className="cms-remove" onClick={() => setContent(current => { const next = clone(current); let target = next; path.slice(0, -1).forEach(key => { target = target[key] }); target[path[path.length - 1]].splice(index, 1); return next })} aria-label={`Hapus item ${index + 1}`}>×</button></div>)}</div>
}

function GalleryList({ items, path, setContent, onUpload }) {
  return <div className="cms-gallery-list">{items.map((item, index) => <article className="cms-gallery-row" key={`${item.src}-${index}`}><div className="cms-gallery-preview">{item.src && <img src={item.src} alt="" />}</div><div className="cms-list-fields"><Field label={`Judul foto ${index + 1}`} value={item.title} onChange={event => setAt(setContent, [...path, index, 'title'], textValue(event))} /><Field label="Keterangan" value={item.meta} onChange={event => setAt(setContent, [...path, index, 'meta'], textValue(event))} /><Field label="URL gambar" value={item.src} onChange={event => setAt(setContent, [...path, index, 'src'], textValue(event))} /><label className="cms-upload">Ganti gambar<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={event => onUpload([...path, index, 'src'], event.target.files?.[0])} /></label></div><button type="button" className="cms-remove" onClick={() => setContent(current => { const next = clone(current); next.gallery.items.splice(index, 1); return next })}>×</button></article>)}<button type="button" className="cms-add-row" onClick={() => setContent(current => ({ ...current, gallery: { ...current.gallery, items: [...current.gallery.items, { src: '', title: '', meta: '' }] } }))}>+ Tambah foto galeri</button></div>
}
