import { Arrow } from './Arrow'
import { divisions } from '../data/siteData'

export function MemberForm({ form, updateForm, submitMember, onClose }) {
  return <div className="inline-register">
    <div className="inline-register-head">
      <div><span className="admin-eyebrow">Join Kagama Digi</span><h3>Data diri <span>member.</span></h3></div>
      <button type="button" className="inline-close" onClick={onClose}>Tutup ×</button>
    </div>
    <p className="member-notice">Pendaftaran ini khusus untuk alumni Universitas Gadjah Mada (UGM).</p>
    <p className="modal-intro">Lengkapi data berikut sesuai identitas dan informasi yang aktif.</p>
    <form onSubmit={submitMember}>
      <div className="form-grid">
        <label>Nama Lengkap (sesuai eKTP)<input name="name" value={form.name} onChange={updateForm} required placeholder="Nama lengkap" /></label>
        <label>Jurusan / Program Studi<input name="study" value={form.study} onChange={updateForm} required placeholder="Contoh: S1 Ilmu Tanah" /></label>
        <label>Fakultas<input name="faculty" value={form.faculty} onChange={updateForm} required placeholder="Contoh: Pertanian" /></label>
        <label>Angkatan (masuk UGM)<input name="year" value={form.year} onChange={updateForm} required inputMode="numeric" placeholder="Contoh: 2018" /></label>
        <label>Nomor HP / WhatsApp<input name="phone" value={form.phone} onChange={updateForm} required inputMode="tel" placeholder="085600604388" /></label>
        <label>Gmail Aktif<input name="email" value={form.email} onChange={updateForm} required type="email" placeholder="nama@gmail.com" /></label>
        <label className="full-field">Kota/Kabupaten - Provinsi domisili saat ini<input name="domicile" value={form.domicile} onChange={updateForm} required placeholder="Sleman - DI Yogyakarta" /></label>
        <label className="full-field">Bersedia menjadi pengurus bila ditunjuk?<select name="division" value={form.division} onChange={updateForm}>{divisions.map(division => <option key={division}>{division}</option>)}</select></label>
      </div>
      <button className="submit-member" type="submit">Simpan pendaftaran <Arrow /></button>
    </form>
  </div>
}
