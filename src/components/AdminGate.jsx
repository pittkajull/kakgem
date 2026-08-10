import { useEffect, useRef, useState } from 'react'

const adminPassword = 'onlyadmincangetin'

export function AdminPasswordModal({ onCancel, onSuccess }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (event) => { if (event.key === 'Escape') onCancel() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  const submit = (event) => {
    event.preventDefault()
    if (value === adminPassword) {
      onSuccess()
    } else {
      setError(true)
      setValue('')
      inputRef.current?.focus()
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
        <label className="password-field">Password<input ref={inputRef} type="password" value={value} onChange={(event) => { setValue(event.target.value); setError(false) }} placeholder="Masukkan password" /></label>
        {error && <p className="password-error" role="alert">Password salah, coba lagi.</p>}
        <button className="submit-member" type="submit">Buka dashboard</button>
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
