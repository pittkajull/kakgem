import { useMemo, useState } from 'react'
import './article-studio.css'

const blank = () => ({ title: '', author: 'Tim Kagama Digi', source: '', category: 'Kabar Kagama Digi', image: '', excerpt: '', content: '', status: 'draft', scheduledAt: '' })
const localDate = value => value ? new Date(value).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB' : 'Belum ditentukan'
const toInputDate = value => value ? new Date(value).toISOString().slice(0, 16) : ''

export function ArticleStudio({ articles, onCreate, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [preview, setPreview] = useState(null)
  const start = article => { setEditing(article ? { ...article, scheduledAt: toInputDate(article.scheduledAt) } : blank()); setNotice(''); setError('') }
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
    try { const response = await fetch('/api/article-upload.php', { method: 'POST', body }); const data = await response.json().catch(() => ({})); if (!response.ok) throw new Error(data.error || 'Upload gambar gagal.'); setEditing(current => ({ ...current, image: data.url })) }
    catch (err) { setError(err.message) } finally { setUploading(false) }
  }
  const cancelSchedule = async article => { try { await onUpdate({ ...article, status: 'draft', scheduledAt: null }); setNotice('Jadwal dibatalkan; artikel kembali menjadi draft.') } catch (err) { setError(err.message || 'Jadwal gagal dibatalkan.') } }
  const publish = async article => { try { await onUpdate({ ...article, status: 'published', scheduledAt: null }); setNotice('Artikel sudah diterbitkan.') } catch (err) { setError(err.message || 'Artikel gagal diterbitkan.') } }
  const remove = async article => { if (!window.confirm(`Hapus artikel “${article.title}”?`)) return; try { await onDelete(article); setNotice('Artikel dihapus.') } catch (err) { setError(err.message || 'Artikel gagal dihapus.') } }
  const shown = useMemo(() => articles.filter(a => (filter === 'all' || a.status === filter) && a.title.toLowerCase().includes(query.toLowerCase())), [articles, filter, query])
  return <section className="article-studio">
    <div className="studio-head"><div><span>Content studio / Kagama Digi</span><h2>Kelola artikel</h2><p>{articles.length} artikel tersimpan. Semua waktu menggunakan WIB.</p></div><button className="studio-primary" onClick={() => start()}>+ Artikel baru</button></div>
    {notice && <p className="studio-notice ok">{notice}</p>}{error && <p className="studio-notice fail">{error}</p>}
    {editing && <article className="studio-editor"><div className="studio-editor-head"><div><span>{editing.id ? 'Mode edit' : 'Mode draft'}</span><h3>{editing.id ? 'Perbarui artikel.' : 'Tulis artikel baru.'}</h3></div><div><button className="studio-ghost" onClick={() => setPreview(editing)}>Preview tampilan</button><button className="studio-ghost" onClick={() => setEditing(null)}>Tutup studio</button></div></div>
      <div className="studio-fields"><label>Judul artikel *<input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} required /></label><label>Gambar utama artikel<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={e => upload(e.target.files?.[0])} /><small>{uploading ? 'Mengunggah…' : 'JPG, PNG, WEBP, GIF · maks. 5 MB'}</small><input type="url" placeholder="atau URL gambar luar" value={editing.image || ''} onChange={e => setEditing({ ...editing, image: e.target.value })} />{editing.image && <img src={editing.image} alt="Preview cover" />}</label><label>Penulis / tim *<input value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })} /></label><label>Nama sumber<input value={editing.source || ''} onChange={e => setEditing({ ...editing, source: e.target.value })} /></label><label>Kategori *<input value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} /></label><label>Terbitkan pada (WIB)<input type="datetime-local" value={editing.scheduledAt || ''} onChange={e => setEditing({ ...editing, scheduledAt: e.target.value })} /><small>Wajib diisi saat menjadwalkan.</small></label><label className="wide">Ringkasan singkat<textarea rows="3" value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} /></label><label className="wide">Isi artikel lengkap *<textarea rows="12" value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })} required /></label></div>
      <div className="studio-actions"><button className="studio-ghost" onClick={() => save('draft')}>Simpan draft</button><button className="studio-schedule" onClick={() => save('scheduled')}>Jadwalkan</button><button className="studio-primary" onClick={() => save('published')}>Publish sekarang</button></div>
    </article>}
    <article className="studio-list"><div className="studio-list-head"><div><h3>Daftar kelola artikel</h3><div className="studio-tabs">{[['all','Semua'],['draft','Draft'],['scheduled','Terjadwal'],['published','Published']].map(([key,label]) => <button key={key} className={filter === key ? 'active' : ''} onClick={() => setFilter(key)}>{label}</button>)}</div></div><input aria-label="Cari judul artikel" placeholder="Cari judul…" value={query} onChange={e => setQuery(e.target.value)} /></div>
      {shown.length ? <div className="studio-table">{shown.map(article => <div className="studio-row" key={article.id}><div className="studio-cover">{article.image ? <img src={article.image} alt="" /> : 'KD'}</div><div><strong>{article.title}</strong><small>{article.author} · {article.category}</small></div><span className={`studio-status ${article.status}`}>{article.status === 'scheduled' ? `Terjadwal: ${localDate(article.scheduledAt)}` : article.status === 'published' ? 'Published' : 'Draft'}</span><div className="studio-row-actions"><button onClick={() => start(article)}>Edit</button><button onClick={() => setPreview(article)}>Preview</button>{article.status === 'scheduled' && <button onClick={() => cancelSchedule(article)}>Batalkan</button>}{article.status !== 'published' && <button onClick={() => publish(article)}>Publish</button>}<button className="danger" onClick={() => remove(article)}>Hapus</button></div></div>)}</div> : <p className="studio-empty">Belum ada artikel pada filter ini.</p>}</article>
    {preview && <div className="studio-preview-backdrop" onClick={e => e.target === e.currentTarget && setPreview(null)}><article className="studio-preview"><button onClick={() => setPreview(null)}>×</button>{preview.image && <img src={preview.image} alt="" />}<small>{preview.category} · {preview.author}</small><h2>{preview.title || 'Judul artikel'}</h2><p>{preview.excerpt}</p><div>{preview.content || 'Isi artikel akan tampil di sini.'}</div></article></div>}
  </section>
}
