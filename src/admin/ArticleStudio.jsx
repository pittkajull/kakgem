import { useEffect, useMemo, useRef, useState } from 'react'
import './article-studio.css'

const blank = () => ({ title: '', author: 'Tim Kagama Digi', source: '', category: 'Kabar Kagama Digi', image: '', excerpt: '', content: '', status: 'draft', scheduledAt: '' })
const localDate = value => value ? new Date(value).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' }) + ' WIB' : 'Belum ditentukan'
const toInputDate = value => value ? new Date(value).toISOString().slice(0, 16) : ''
const monthName = date => new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' }).format(date)

export function ArticleStudio({ articles, onCreate, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [preview, setPreview] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [calendarMonth, setCalendarMonth] = useState(() => new Date())
  const editorRef = useRef(null)
  useEffect(() => {
    if (!notice && !error) return undefined
    const timer = window.setTimeout(() => { setNotice(''); setError('') }, 4500)
    return () => window.clearTimeout(timer)
  }, [notice, error])
  useEffect(() => {
    if (!editing) return
    window.setTimeout(() => editorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }, [editing])
  const start = article => { setEditing(article ? { ...article, scheduledAt: toInputDate(article.scheduledAt) } : blank()); setNotice(''); setError('') }
  const cancelEdit = () => { setEditing(null); setNotice('Pengeditan dibatalkan.'); setError('') }
  const save = async status => {
    if (!editing) return
    setError(''); setNotice('')
    const payload = { ...editing, status, scheduledAt: status === 'scheduled' ? editing.scheduledAt : null }
    try { payload.id ? await onUpdate(payload) : await onCreate(payload); setEditing(null); setNotice(status === 'published' ? 'Artikel sudah diterbitkan.' : status === 'scheduled' ? 'Artikel berhasil dijadwalkan.' : 'Draft berhasil disimpan.') }
    catch (err) { setError(err.message || 'Artikel gagal disimpan.') }
  }
  const upload = async file => {
    if (!file) return; setUploading(true); setError('')
    const body = new FormData(); body.append('image', file)
    try { const response = await fetch('/api/article-upload.php', { method: 'POST', body }); const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.error || 'Upload gambar gagal.'); setEditing(current => ({ ...current, image: data.url })); setNotice('Gambar berhasil diunggah.') }
    catch (err) { setError(err.message) } finally { setUploading(false) }
  }
  const cancelSchedule = async article => { try { await onUpdate({ ...article, status: 'draft', scheduledAt: null }); setNotice('Jadwal dibatalkan; artikel kembali menjadi draft.') } catch (err) { setError(err.message || 'Jadwal gagal dibatalkan.') } }
  const publish = async article => { try { await onUpdate({ ...article, status: 'published', scheduledAt: null }); setNotice('Artikel sudah diterbitkan.') } catch (err) { setError(err.message || 'Artikel gagal diterbitkan.') } }
  const remove = async () => { if (!deleteTarget) return; try { await onDelete(deleteTarget); setNotice('Artikel dihapus.'); setDeleteTarget(null) } catch (err) { setError(err.message || 'Artikel gagal dihapus.') } }
  const shown = useMemo(() => articles.filter(a => (filter === 'all' || a.status === filter) && a.title.toLowerCase().includes(query.toLowerCase())), [articles, filter, query])
  return <section className="article-studio">
    <div className="studio-head"><div><span>Content studio / Kagama Digi</span><h2>Kelola artikel</h2><p>Total Artikel: <strong>({articles.length} Terdaftar)</strong> · Semua waktu menggunakan WIB.</p></div><button className="studio-primary" onClick={() => start()}>+ Artikel baru</button></div>
    {notice && <p className="studio-notice ok">{notice}</p>}{error && <p className="studio-notice fail">{error}</p>}
    {editing && <article className="studio-editor" ref={editorRef}><div className="studio-editor-head"><div><span>{editing.status === 'scheduled' ? 'Mode terjadwal' : editing.status === 'published' ? 'Mode publish' : 'Mode draft'}</span><h3>{editing.id ? 'Perbarui artikel.' : 'Tulis artikel baru.'}</h3></div><div><button className="studio-ghost" onClick={() => setPreview(editing)}>Preview tampilan</button><button className="studio-ghost" onClick={cancelEdit}>Batal edit</button></div></div>
      <div className="studio-fields"><label>Judul artikel *<input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} required /></label><label>Gambar utama artikel<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={e => upload(e.target.files?.[0])} /><small>{uploading ? 'Mengunggah…' : 'JPG, PNG, WEBP, GIF · maks. 5 MB'}</small><input type="url" placeholder="atau URL gambar luar" value={editing.image || ''} onChange={e => setEditing({ ...editing, image: e.target.value })} />{editing.image && <img src={editing.image} alt="Preview cover" />}</label><label>Penulis / tim *<input value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })} /></label><label>Nama sumber<input value={editing.source || ''} onChange={e => setEditing({ ...editing, source: e.target.value })} /></label><label>Kategori *<input value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} /></label><label className="wide">Ringkasan singkat<textarea rows="3" value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} /></label><label className="wide">Isi artikel lengkap *<textarea rows="12" value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })} required /></label></div>
      <section className="studio-publication"><label>Status publikasi<select value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })}><option value="draft">Draft (Disimpan Internal, Belum Tayang)</option><option value="scheduled">Terjadwal (Otomatis Tayang Pada Waktu Ditentukan)</option><option value="published">Publish Sekarang (Langsung Tayang di Website)</option></select></label>{editing.status === 'scheduled' && <label>Tanggal & waktu publish (WIB)<input type="datetime-local" value={editing.scheduledAt || ''} onChange={e => setEditing({ ...editing, scheduledAt: e.target.value })} required /><small>Sistem akan mempublikasikan artikel secara otomatis saat jam tersebut tercapai (WIB).</small></label>}</section>
      <div className="studio-actions"><button className="studio-ghost" onClick={() => save('draft')}>Simpan draft</button><button className="studio-schedule" onClick={() => save('scheduled')}>Jadwalkan</button><button className="studio-primary" onClick={() => save('published')}>Publish sekarang</button></div>
    </article>}
    <ScheduleCalendar articles={articles} month={calendarMonth} setMonth={setCalendarMonth} onPreview={setPreview} />
    <article className="studio-list"><div className="studio-list-head"><div><h3>Daftar kelola artikel</h3><div className="studio-tabs">{[['all','Semua'],['draft','Draft'],['scheduled','Terjadwal'],['published','Published']].map(([key,label]) => <button key={key} className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>{label}</button>)}</div></div><input aria-label="Cari judul artikel" placeholder="Cari judul…" value={query} onChange={e => setQuery(e.target.value)} /></div>{shown.length ? <div className="studio-table">{shown.map(article => <div className="studio-row" key={article.id}><div className="studio-cover">{article.image ? <img src={article.image} alt="" /> : 'KD'}</div><div><strong>{article.title}</strong><small>{article.author} · {article.category}</small></div><span className={`studio-status ${article.status}`}>{article.status === 'scheduled' ? `Terjadwal: ${localDate(article.scheduledAt)}` : article.status === 'published' ? 'Published' : 'Draft'}</span><div className="studio-row-actions"><button onClick={() => start(article)}>Edit</button><button onClick={() => setPreview(article)}>Preview</button>{article.status === 'scheduled' && <button onClick={() => cancelSchedule(article)}>Batalkan</button>}{article.status !== 'published' && <button onClick={() => publish(article)}>Publish</button>}<button className="danger" onClick={() => setDeleteTarget(article)}>Hapus</button></div></div>)}</div> : <p className="studio-empty">Belum ada artikel pada filter ini.</p>}</article>
    {deleteTarget && <div className="studio-preview-backdrop"><section className="studio-preview" role="dialog" aria-modal="true"><h2>Hapus artikel?</h2><p>Artikel “{deleteTarget.title}” akan dihapus permanen.</p><div><button className="studio-ghost" onClick={() => setDeleteTarget(null)}>Batal</button><button className="studio-primary" onClick={remove}>Ya, hapus artikel</button></div></section></div>}
    {preview && <div className="studio-preview-backdrop" onClick={e => e.target === e.currentTarget && setPreview(null)}><article className="studio-preview"><button onClick={() => setPreview(null)}>×</button>{preview.image && <img src={preview.image} alt="" />}<small>{preview.category} · {preview.author}</small><h2>{preview.title || 'Judul artikel'}</h2><p>{preview.excerpt}</p><div>{preview.content || 'Isi artikel akan tampil di sini.'}</div></article></div>}
  </section>
}

function ScheduleCalendar({ articles, month, setMonth, onPreview }) {
  const scheduled = articles.filter(article => ['scheduled', 'published'].includes(article.status) && (article.scheduledAt || article.publishedAt))
  const monthAgenda = scheduled.filter(article => { const date = new Date(article.scheduledAt || article.publishedAt); return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth() })
  const first = new Date(month.getFullYear(), month.getMonth(), 1); const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const events = day => scheduled.filter(article => { const date = new Date(article.scheduledAt || article.publishedAt); return date.getFullYear() === month.getFullYear() && date.getMonth() === month.getMonth() && date.getDate() === day })
  return <section className="studio-calendar"><div className="calendar-title"><div><h2>Kalender jadwal posting</h2><p>Atur dan pantau artikel terjadwal berdasarkan waktu WIB.</p></div><div><button onClick={() => setMonth(new Date())}>Hari ini</button><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>‹</button><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>›</button></div></div><div className="calendar-layout"><div><h3>{monthName(month).toUpperCase()}</h3><div className="calendar-week">{['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(day => <b key={day}>{day}</b>)}</div><div className="calendar-days">{Array.from({ length: (first.getDay() + 6) % 7 }, (_, i) => <i key={`blank-${i}`} />)}{Array.from({ length: days }, (_, i) => <button key={i} className={events(i + 1).length ? 'has-events' : ''} onClick={() => events(i + 1)[0] && onPreview(events(i + 1)[0])}>{i + 1}{events(i + 1).length > 0 && <span>{events(i + 1).length}</span>}</button>)}</div></div><aside><h3>Agenda bulan ini</h3>{monthAgenda.length ? monthAgenda.map(article => <button key={article.id} onClick={() => onPreview(article)}><small>{localDate(article.scheduledAt || article.publishedAt)}</small><strong>{article.title}</strong><em>{article.status === 'published' ? 'Published' : 'Terjadwal'}</em></button>) : <p>Belum ada jadwal.</p>}</aside></div></section>
}
