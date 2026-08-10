import { useEffect, useRef, useState } from 'react'

export function AdminPasswordModal({ onCancel, onSuccess }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (event) => { if (event.key === 'Escape') onCancel() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  const submit = async (event) => {
    event.preventDefault()
    if (loading) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: value }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        onSuccess()
        return
      }
      setError(data.error || 'Password salah, coba lagi.')
      setValue('')
      inputRef.current?.focus()
    } catch {
      setError('Gagal terhubung ke server. Coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return <div className="password-overlay" role="dialog" aria-modal="true" aria-label="Verifikasi admin" onClick={(event) => { if (event.target === event.currentTarget) onCancel() }}>
    <div className="password-shell">
      <div className="admin-top">
        <div><span className="admin-eyebrow">Kagama Digi / Internal</span><h2>Verifikasi <span>admin.</span></h2></div>
        <button className="modal-close" onClick={onCancel} aria-label="Tutup">×</button>
      </div>
      <p className="modal-intro">Masukkan password untuk membuka dashboard admin.</p>
      <form onSubmit={submit}>
        <label className="password-field">Password<input ref={inputRef} type="password" value={value} onChange={(event) => { setValue(event.target.value); setError('') }} placeholder="Masukkan password" autoComplete="current-password" /></label>
        {error && <p className="password-error" role="alert">{error}</p>}
        <button className="submit-member" type="submit" disabled={loading}>{loading ? 'Memeriksa...' : 'Buka dashboard'}</button>
      </form>
    </div>
  </div>
}

export function SuccessPopup({ onClose }) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prevOverflow; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return <div className="success-overlay" role="dialog" aria-modal="true" aria-label="Pendaftaran berhasil" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <div className="success-shell">
      <span className="success-icon">✓</span>
      <h3>Pendaftaran <span>berhasil.</span></h3>
      <p>Terima kasih sudah mendaftar sebagai anggota Kagama Digi. Kami akan menghubungimu melalui email.</p>
      <button className="submit-member" onClick={onClose}>Tutup</button>
    </div>
  </div>
}
