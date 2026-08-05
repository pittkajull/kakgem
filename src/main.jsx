import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const Arrow = ({ className = '' }) => <span className={`arrow ${className}`}>↗</span>

const services = [
  { no: '01', title: 'Literasi Digital', text: 'Menguatkan kecakapan digital melalui pelatihan, diskusi, dan program kolaboratif.', accent: 'lime' },
  { no: '02', title: 'Kolaborasi Profesional', text: 'Memperluas jejaring antara akademisi, influencer, stakeholder, masyarakat, dan pegiat digital.', accent: 'blue' },
  { no: '03', title: 'Inovasi Berdampak', text: 'Mendorong karya dan solusi digital yang berkualitas, beretika, dan bermanfaat.', accent: 'orange' },
]

const team = [
  ['FN', 'Ketua', 'Franko Nero, S.P.'],
  ['AP', 'Sekretaris', 'Ari Akbar Devananta, S.Pi.'],
  ['DB', 'Wakil Sekretaris I', 'Desta Ratu Berliana, S.S.'],
  ['FS', 'Wakil Sekretaris II', 'Faisa Abhinaya Sarastri, S.Si.'],
  ['YS', 'Bendahara Umum', 'Yulita Windi Nuraini, S.P., M.Sc.'],
  ['UL', 'Wakil Bendahara', 'Ulfida Aisya Laishela, S.P.'],
  ['HH', 'Organisasi & Keanggotaan', 'Hendra Agus Herlambang, S.P.'],
  ['AU', 'Fasilitasi Alumni', 'Ajeng Respati Wiji Utami, S.S.'],
  ['YD', 'Advokasi & Pengkajian Kebijakan', 'Yudha Purbawa, S.P., M.Sc., M.Ec.Dev.'],
  ['BP', 'Kerjasama & Kemitraan', 'Bagus Shidqi Hakim, S.Tr.Par.'],
  ['RP', 'Pengabdian Masyarakat', 'Rino Damar Jati, S.Par.'],
  ['OA', 'Penggalangan Dana', 'Oktavina Dzinuha Ananda, S.AB.'],
  ['YP', 'Komunitas', 'Yudha Kristiawan, S.Fil., M.Phil.'],
  ['FE', 'Aktivasi Sosial Media', 'Faris Adlin, S.T., M.Eng.'],
  ['DM', 'Riset & Pengembangan', 'Dian Pramitasari, A.Md.'],
]

const divisions = ['Tidak bersedia / belum memilih', 'Bidang Organisasi & Keanggotaan', 'Bidang Fasilitasi Alumni', 'Bidang Pengkajian dan Advokasi Kebijakan', 'Bidang Kerjasama dan Kemitraan', 'Bidang Pengabdian Masyarakat', 'Bidang Komunitas', 'Bidang Aktivasi Sosial Media', 'Bidang Riset & Pengembangan']
const starterMembers = []
const gallery = [
  ['/img/2026_04_11_18_00_IMG_1833.JPG', 'Workshop digital', 'Belajar bersama · 2026'],
  ['/img/COP01930.JPG', 'Kolaborasi lintas profesi', 'Kagama Digi · Community'],
  ['/img/IMG_0637.JPG', 'Ruang bertukar ide', 'Digital literacy · 2026'],
  ['/img/IMG_2985.JPG', 'Aktivasi berdampak', 'Innovation · Community'],
  ['/img/IMG_3338.JPG', 'Dari ruang kelas', 'Knowledge sharing · 2026'],
  ['/img/2026_04_11_18_00_IMG_1835.JPG', 'Tumbuh bersama', 'Kagama Digi · People'],
  ['/img/WhatsApp%20Image%202026-04-25%20at%2023.07.07.jpg', 'Jejaring yang hidup', 'Collaboration · 2026'],
  ['/img/IMG_4900.JPG', 'Komunitas yang beragam', 'Kagama Digi · Together'],
]

function GallerySection() {
  return <section className="gallery-section section-pad"><div className="section-kicker">/04 — Aktivasi &amp; workshop</div><div className="gallery-heading"><h2>Yang terjadi<br /><span>ketika bertemu.</span></h2><p>Ruang belajar, berbagi, dan berkolaborasi yang mempertemukan insan Kagama dari berbagai latar.</p></div><div className="gallery-grid">{gallery.map(([src, title, meta], index) => <figure className={`gallery-item gallery-${index + 1}`} key={src}><img src={src} alt={title} loading="lazy" /><figcaption><strong>{title}</strong><small>{meta}</small></figcaption></figure>)}</div></section>
}

function MemberForm({ form, updateForm, submitMember, onClose }) {
  return <div className="inline-register"><div className="inline-register-head"><div><span className="admin-eyebrow">Join Kagama Digi</span><h3>Data diri <span>member.</span></h3></div><button type="button" className="inline-close" onClick={onClose}>Tutup ×</button></div><p className="member-notice">Pendaftaran ini khusus untuk alumni Universitas Gadjah Mada (UGM).</p><p className="modal-intro">Lengkapi data berikut sesuai identitas dan informasi yang aktif.</p><form onSubmit={submitMember}><div className="form-grid"><label>Nama Lengkap (sesuai eKTP)<input name="name" value={form.name} onChange={updateForm} required placeholder="Nama lengkap" /></label><label>Jurusan / Program Studi<input name="study" value={form.study} onChange={updateForm} required placeholder="Contoh: S1 Ilmu Tanah" /></label><label>Fakultas<input name="faculty" value={form.faculty} onChange={updateForm} required placeholder="Contoh: Pertanian" /></label><label>Angkatan (masuk UGM)<input name="year" value={form.year} onChange={updateForm} required inputMode="numeric" placeholder="Contoh: 2018" /></label><label>Nomor HP / WhatsApp<input name="phone" value={form.phone} onChange={updateForm} required inputMode="tel" placeholder="085600604388" /></label><label>Gmail Aktif<input name="email" value={form.email} onChange={updateForm} required type="email" placeholder="nama@gmail.com" /></label><label className="full-field">Kota/Kabupaten - Provinsi domisili saat ini<input name="domicile" value={form.domicile} onChange={updateForm} required placeholder="Sleman - DI Yogyakarta" /></label><label className="full-field">Bersedia menjadi pengurus bila ditunjuk?<select name="division" value={form.division} onChange={updateForm}>{divisions.map(division => <option key={division}>{division}</option>)}</select></label></div><button className="submit-member" type="submit">Simpan pendaftaran <Arrow /></button></form></div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const [showRegister, setShowRegister] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [members, setMembers] = useState(() => { try { return JSON.parse(localStorage.getItem('kagama-members')) || starterMembers } catch { return starterMembers } })
  const [form, setForm] = useState({ name: '', study: '', faculty: '', year: '', phone: '', domicile: '', email: '', division: divisions[0] })
  const appRef = useRef(null)
  const registerWasOpen = useRef(false)

  useEffect(() => {
    const interactionCleanups = []
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro.from('.nav-shell', { y: -24, opacity: 0, duration: .75 })
        .from('.hero-copy > *', { y: 28, opacity: 0, duration: .75, stagger: .1 }, '-=.35')
        .from('.hero-art', { x: 42, opacity: 0, duration: 1 }, '-=.8')
        .from('.photo-caption', { y: 12, opacity: 0, duration: .45 }, '-=.25')

      gsap.utils.toArray('.about-content, .stats, .services-head, .service-card, .works-heading, .work-card, .gallery-heading, .gallery-item, .team-heading, .team-card, .contact-grid').forEach((element) => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          duration: .8,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 84%', once: true }
        })
      })

      gsap.to('.impact-track', {
        xPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: '.impact-strip', start: 'top bottom', end: 'bottom top', scrub: 1 }
      })

      gsap.to('.hero-photo', {
        yPercent: 8,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-art', start: 'top top', end: 'bottom top', scrub: 1 }
      })

      gsap.utils.toArray('.section-kicker').forEach((element) => {
        gsap.from(element, {
          x: -18,
          opacity: 0,
          duration: .65,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true }
        })
      })

      gsap.from('.circle-cta', { scale: 0, rotation: -35, duration: 1, delay: .7, ease: 'back.out(1.7)' })
      gsap.to('.circle-cta', { y: -5, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' })

      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: .25 }
      })

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduceMotion) {
        gsap.utils.toArray('.service-card, .work-card, .gallery-item, .team-card').forEach((card) => {
          const rotateX = gsap.quickTo(card, 'rotationX', { duration: .35, ease: 'power2.out' })
          const rotateY = gsap.quickTo(card, 'rotationY', { duration: .35, ease: 'power2.out' })
          const move = (event) => {
            const bounds = card.getBoundingClientRect()
            const x = (event.clientX - bounds.left) / bounds.width - .5
            const y = (event.clientY - bounds.top) / bounds.height - .5
            rotateX(y * -5)
            rotateY(x * 5)
          }
          const enter = () => gsap.to(card, { y: -5, duration: .35, ease: 'power2.out' })
          const leave = () => {
            rotateX(0)
            rotateY(0)
            gsap.to(card, { y: 0, duration: .45, ease: 'power3.out' })
          }
          card.addEventListener('pointermove', move)
          card.addEventListener('pointerenter', enter)
          card.addEventListener('pointerleave', leave)
          interactionCleanups.push(() => {
            card.removeEventListener('pointermove', move)
            card.removeEventListener('pointerenter', enter)
            card.removeEventListener('pointerleave', leave)
          })
        })

        gsap.utils.toArray('.circle-cta, .membership-cta, .contact-pill, .text-link, .email-link').forEach((button) => {
          const moveX = gsap.quickTo(button, 'x', { duration: .35, ease: 'power3.out' })
          const moveY = gsap.quickTo(button, 'y', { duration: .35, ease: 'power3.out' })
          const move = (event) => {
            const bounds = button.getBoundingClientRect()
            moveX(((event.clientX - (bounds.left + bounds.width / 2)) / bounds.width) * 7)
            moveY(((event.clientY - (bounds.top + bounds.height / 2)) / bounds.height) * 5)
          }
          const reset = () => { moveX(0); moveY(0) }
          button.addEventListener('pointermove', move)
          button.addEventListener('pointerleave', reset)
          interactionCleanups.push(() => {
            button.removeEventListener('pointermove', move)
            button.removeEventListener('pointerleave', reset)
          })
        })
      }
    }, appRef)
    return () => {
      interactionCleanups.forEach(cleanup => cleanup())
      ctx.revert()
    }
  }, [])
  const nav = [{ label: 'Home', target: 'Home' }, { label: 'Tentang', target: 'About' }, { label: 'Program', target: 'Works' }, { label: 'Pengurus', target: 'Team' }, { label: 'Kontak', target: 'Contact' }]

  const go = (item) => {
    setActive(item)
    setMenuOpen(false)
    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  const updateForm = (event) => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  const toggleRegister = () => setShowRegister(current => !current)
  useEffect(() => {
    if (!showRegister) return
    const timer = setTimeout(() => document.querySelector('.inline-register')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    gsap.fromTo('.inline-register', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: .65, ease: 'power3.out' })
    return () => clearTimeout(timer)
  }, [showRegister])

  useEffect(() => {
    if (showRegister) {
      registerWasOpen.current = true
      return
    }
    if (registerWasOpen.current) {
      registerWasOpen.current = false
      setTimeout(() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40)
    }
  }, [showRegister])

  useEffect(() => {
    if (!showAdmin) return
    gsap.fromTo('.admin-shell', { opacity: 0, scale: .97, y: 18 }, { opacity: 1, scale: 1, y: 0, duration: .55, ease: 'power3.out' })
    const timer = setTimeout(() => document.querySelector('.admin-overlay')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    return () => clearTimeout(timer)
  }, [showAdmin])
  const submitMember = (event) => {
    event.preventDefault()
    const next = [{ ...form, id: Date.now() }, ...members]
    setMembers(next)
    localStorage.setItem('kagama-members', JSON.stringify(next))
    setForm({ name: '', study: '', faculty: '', year: '', phone: '', domicile: '', email: '', division: divisions[0] })
    setShowRegister(false)
    setShowAdmin(true)
  }

  return <main ref={appRef}>
    <div className="scroll-progress" aria-hidden="true" />
    <nav className="nav-shell">
      <button className="brand" onClick={() => go('Home')} aria-label="Kagama Digi home"><img className="brand-logo" src="/img/logo.png" alt="Logo Kagama Digi" /><span>kagama digi<span className="brand-dot">.</span></span></button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {nav.map(item => <button key={item.label} className={active === item.target ? 'active' : ''} onClick={() => go(item.target)}>{item.label}</button>)}
      </div>
      <div className="nav-actions"><button className="contact-pill" onClick={() => window.open('https://bit.ly/grupwhatsappkagamadigi', '_blank')}>Gabung WA <Arrow /></button></div>
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '×' : '☰'}</button>
    </nav>

    <section id="home" className="hero section-pad">
      <div className="hero-copy reveal">
        <p className="eyebrow"><span className="eyebrow-line" /> Company Profile · Alumni UGM</p>
        <h1>Komunitas kreatif<br /><em>bangun masa depan</em><br />digital<span className="lime-dot">.</span></h1>
        <p className="hero-desc">Komunitas profesional Keluarga Alumni Universitas Gadjah Mada yang mempertemukan jejaring alumni, pegiat digital, akademisi, dan stakeholder untuk membangun kolaborasi digital yang berdampak.</p>
        <button className="circle-cta" onClick={() => go('About')}><span>Lihat<br />profil</span><Arrow /></button>
        <div className="hero-meta"><span>01 / 07</span><span>Komunitas digital<br />&amp; inovasi</span><span>Yogyakarta<br />Indonesia</span></div>
      </div>
      <div className="hero-art reveal delay-1" aria-label="Foto Kagama Digi">
        <img className="hero-photo" src="/img/kamadigi.JPEG" alt="Kegiatan Kagama Digi" />
        <div className="art-grid" /><div className="orb orb-lime" /><div className="orb orb-blue" /><div className="orb orb-orange" />
        <div className="art-label">KAGAMA DIGI<br /><span>DIGITAL / INOVASI</span></div><div className="art-number">UGM<br /><small>2026</small></div><div className="photo-caption"><span className="caption-dot" /> Membuat ruang untuk tumbuh bersama</div>
      </div>
      <div className="scroll-hint"><span>Scroll to discover</span><i /></div>
    </section>

    <GallerySection />

    <div className="impact-strip" aria-label="Kagama Digi principles"><div className="impact-track"><span>COLLABORATION</span><b>✳</b><span>CREATIVITY</span><b>✳</b><span>DIGITAL LITERACY</span><b>✳</b><span>POSITIVE IMPACT</span><b>✳</b><span>COLLABORATION</span><b>✳</b><span>CREATIVITY</span><b>✳</b></div></div>

    <section id="about" className="about section-pad">
      <div className="section-kicker">/01 — Profil singkat</div>
      <div className="about-content"><h2>Ruang<br /><span>kolaborasi</span><br />insan Kagama.</h2><div className="about-side"><p>Kagama Digi adalah komunitas Keluarga Alumni Universitas Gadjah Mada yang menjadi ruang kolaborasi untuk pengembangan inovasi, kreativitas, dan teknologi digital.</p><p className="muted">Kami memperluas jaringan antara akademisi, influencer, stakeholder, masyarakat, dan pegiat digital serta menumbuhkan literasi digital melalui konten yang berkualitas, beretika, dan berdampak positif.</p><div className="vision-copy"><p><strong>Visi</strong> Menjadi ruang kolaborasi strategis insan Kagama dalam mengembangkan inovasi, kreativitas, dan teknologi digital untuk menciptakan dampak nyata hari ini dan masa depan.</p><p><strong>Misi</strong> Membangun ruang tumbuh bersama, menguatkan kecakapan digital melalui pelatihan, dan mendorong kolaborasi lintas profesi untuk melahirkan karya yang berdampak.</p></div><button className="text-link" onClick={() => go('Contact')}>Gabung komunitas <Arrow /></button></div></div>
      <div className="stats"><div><strong>01</strong><span>Fokus<br />digital &amp; inovasi</span></div><div><strong>UGM</strong><span>Jejaring<br />alumni</span></div><div><strong>ID</strong><span>Yogyakarta<br />&amp; Indonesia</span></div></div>
    </section>

    <section id="services" className="services section-pad"><div className="section-kicker">/02 — Fokus kerja</div><div className="services-head"><h2>Nilai yang<br /><span>kami bangun.</span></h2><p>Wawasan yang terbuka. Jejaring yang<br />terhubung. Dampak yang positif.</p></div><div className="service-list">{services.map(s => <article className={`service-card ${s.accent}`} key={s.no}><span className="service-no">{s.no}</span><h3>{s.title}</h3><p>{s.text}</p><Arrow className="service-arrow" /></article>)}</div></section>

    <section id="works" className="works section-pad"><div className="section-kicker">/03 — Program unggulan</div><div className="works-heading"><h2>Program<br /><span>Kagama Digi.</span></h2><button className="text-link" onClick={() => go('Contact')}>Ikuti program <Arrow /></button></div><div className="work-grid"><div className="work-card work-one"><div className="work-art"><span className="sun">✳</span><span className="work-type">Roadmap<br />2026</span></div><div className="work-meta"><span>Java Influencer / Innovation Summit</span><small>LSP Kagama Digi</small></div></div><div className="work-card work-two"><div className="work-art"><span className="mono">DIGITAL<br /><i>IMPACT</i></span><span className="bean" /></div><div className="work-meta"><span>Indonesia Mengajar Digital</span><small>Digi-Run · Digital Goes to Campus / School</small></div></div></div><p className="program-note">Program jangka panjang lainnya: Event Booth dan Digi-Mingle — Opportunity Networking. Aktivasi dan workshop berjalan sepanjang Februari–April 2026, mulai dari Digital Marketing, YouTube, Drone, AI, Meta Ads, Videography, hingga Fotografi.</p></section>

    <section id="team" className="team section-pad"><div className="section-kicker">/05 — Tim kami</div><div className="team-heading"><h2>Struktur<br /><span>pengurus.</span></h2><p>Kagama Digi digerakkan oleh dewan penasehat, pengurus harian, dan bidang-bidang yang mendukung organisasi, kemitraan, komunitas, aktivasi digital, dan riset.</p></div><div className="team-list">{team.map(([initials, role, name]) => <article className="team-card" key={name}><span className="team-avatar">{initials}</span><div><span className="team-role">{role}</span><h3>{name}</h3></div></article>)}</div></section>

    <section id="membership" className="membership section-pad"><div className="membership-inner"><div><div className="section-kicker">/06 — Jadi bagian dari kami</div><h2>Temukan ruang<br /><span>untuk tumbuh.</span></h2></div><div className="membership-copy"><p>Gabung menjadi anggota Kagama Digi dan ikut membangun jejaring, wawasan, serta inovasi digital bersama alumni UGM dan pegiat digital dari berbagai bidang.</p><span className="alumni-only">Khusus alumni Universitas Gadjah Mada (UGM)</span><button className="membership-cta" onClick={() => setShowRegister(current => !current)}>{showRegister ? 'Tutup form' : 'Daftar jadi member'} <Arrow /></button></div></div><div className="membership-footer"><span>Terbuka untuk alumni UGM</span><span>Digital · Inovasi · Kolaborasi</span></div>{showRegister && <MemberForm form={form} updateForm={updateForm} submitMember={submitMember} onClose={() => setShowRegister(false)} />}</section>

    <section id="contact" className="contact section-pad"><div className="contact-grid"><div><div className="section-kicker">/07 — Kontak</div><h2>Bangun<br /><span>dampak.</span></h2></div><div className="contact-side"><p>Untuk kolaborasi, informasi program, dan jejaring komunitas, hubungi Kagama Digi melalui kanal resmi berikut.</p><a href="https://bit.ly/grupwhatsappkagamadigi" target="_blank" rel="noreferrer" className="email-link">Gabung Grup WhatsApp <Arrow /></a><div className="contact-details"><span>Yogyakarta, Indonesia</span><span>kagamadigi@ugm.ac.id</span><span>Instagram&nbsp; ↗</span></div></div></div><div className="footer"><span>© 2026 Kagama Digi</span><span>Keluarga Alumni Universitas Gadjah Mada<span className="lime-dot">.</span></span><img className="footer-logo" src="/img/logo.png" alt="Logo Kagama Digi" onDoubleClick={() => setShowAdmin(true)} title="" /></div></section>

    {showAdmin && <div className="admin-overlay"><div className="admin-shell"><div className="admin-top"><div><span className="admin-eyebrow">Kagama Digi / Internal</span><h2>Data <span>anggota.</span></h2></div><button className="modal-close" onClick={() => setShowAdmin(false)}>×</button></div><div className="admin-stats"><div><strong>{members.length}</strong><span>Total anggota terdaftar</span></div></div><div className="member-table-wrap"><div className="table-heading"><div><span className="admin-eyebrow">Form responses</span><h3>Daftar anggota Kagama Digi</h3></div><button className="export-btn" onClick={() => alert('Export CSV siap dihubungkan ke Google Sheet atau backend.')}>Export CSV ↗</button></div><div className="member-table">{members.length ? members.map(member => <div className="member-row" key={member.id || member.email}><div className="member-identity"><span className="member-initial">{member.name.split(' ').map(word => word[0]).slice(0, 2).join('')}</span><div><strong>{member.name}</strong><small>{member.email}</small></div></div><span>{member.study}<br /><small>{member.faculty} · Angkatan {member.year}</small></span><span>{member.phone}<br /><small>{member.domicile}</small></span><span className={member.division === divisions[0] ? 'muted-status' : 'gold-status'}>{member.division.replace('Bidang ', '')}</span></div>) : <div className="empty-members"><span className="empty-icon">＋</span><strong>Belum ada pendaftar</strong><p>Data anggota yang mengisi form akan tampil di sini.</p><button onClick={() => { setShowAdmin(false); setShowRegister(true) }}>Tambah pendaftar pertama <Arrow /></button></div>}</div></div></div></div>}
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
