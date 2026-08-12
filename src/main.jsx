import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'
import { emptyForm, starterArticles, starterMembers } from './data/siteData'
import { AdminDashboard, AboutSection, Hero, MembershipSection, Navbar, ServicesSection, WorksSection } from './components/SiteSections'
import { GallerySection } from './components/GallerySection'
import { TeamRosterSection } from './components/TeamRosterSection'
import { ImpactStrip } from './components/ImpactStrip'
import { ContactSection } from './components/ContactSection'
import { CommunityStorySection } from './components/CommunityStorySection'
import { ArticlesSection } from './components/ArticlesSection'
import { GlobalLightbox } from './components/GlobalLightbox'
import { AdminPasswordModal, SuccessPopup } from './components/AdminGate'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const [showRegister, setShowRegister] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [members, setMembers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kagama-members')) || starterMembers
    } catch {
      return starterMembers
    }
  })
  const [articles, setArticles] = useState(starterArticles)
  const [form, setForm] = useState(emptyForm)
  const appRef = useRef(null)
  const registerWasOpen = useRef(false)

  useEffect(() => {
    fetch('/api/articles.php')
      .then(res => res.ok ? res.json() : Promise.reject(new Error('Gagal memuat artikel')))
      .then(data => setArticles(Array.isArray(data.articles) ? data.articles : []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const interactionCleanups = []
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power2.out' } })
      intro.from('.nav-shell', { y: -16, opacity: 0, duration: .55 })
        .from('.hero-copy > *', { y: 22, opacity: 0, duration: .6, stagger: .09 }, '-=.25')
        .from('.hero-art', { opacity: 0, duration: .8 }, '-=.4')

      gsap.utils.toArray('.about-content, .stats, .services-head, .service-card, .works-heading, .work-card, .story-intro, .journey-heading, .journey-step, .portfolio-block, .workshop-item, .activation-note, .gallery-heading, .gallery-item, .team-heading, .team-node, .contact-grid, .contact-row').forEach((element) => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          duration: .8,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 84%', once: true },
        })
      })

      gsap.to('.hero-photo-scroll', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: '.hero-art', start: 'top top', end: 'bottom top', scrub: 1 },
      })

      gsap.utils.toArray('.section-kicker').forEach((element) => {
        gsap.from(element, {
          x: -18,
          opacity: 0,
          duration: .65,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })

      gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .25 } })

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduceMotion) {
        gsap.utils.toArray('.gallery-img').forEach((img) => {
          gsap.fromTo(img, { yPercent: 7 }, { yPercent: -7, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 1 } })
        })
        gsap.to('.journey-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.journey-rail-wrap', start: 'top 78%', end: 'bottom 45%', scrub: .6 } })
        gsap.utils.toArray('.service-card, .program-card, .gallery-item, .team-card, .team-node, .contact-row').forEach((card) => {
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

  const go = (item) => {
    setActive(item)
    setMenuOpen(false)
    if (item === 'Membership') setShowRegister(true)
    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  const updateForm = (event) => setForm(current => ({ ...current, [event.target.name]: event.target.value }))

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

  const submitMember = async (event) => {
    event.preventDefault()
    const member = { ...form, id: Date.now() }
    try {
      const res = await fetch('/api/members.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setMembers(prev => [member, ...prev])
        setForm(emptyForm())
        setShowRegister(false)
        setShowSuccess(true)
        return
      }
      throw new Error(data.error || 'Pendaftaran gagal')
    } catch (error) {
      window.alert(error.message || 'Pendaftaran gagal. Silakan coba lagi.')
    }
  }

  const requestAdmin = () => setShowPassword(true)

  const unlockAdmin = async () => {
    setShowPassword(false)
    try {
      const [memberRes, articleRes] = await Promise.all([fetch('/api/members.php'), fetch('/api/articles.php?admin=1')])
      const [memberData, articleData] = await Promise.all([memberRes.json().catch(() => ({})), articleRes.json().catch(() => ({}))])
      if (memberRes.ok && memberData.members) setMembers(memberData.members)
      if (articleRes.ok && articleData.articles) setArticles(articleData.articles)
    } catch {}
    setShowAdmin(true)
  }

  const updateMember = async (target, data) => {
    const targetKey = target.id || target.email
    setMembers(prev => prev.map(member => (member.id && member.id === target.id) || (member.email && member.email === target.email) ? { ...member, ...data, id: member.id || target.id } : member))
    try { await fetch('/api/members.php', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ target: targetKey, updates: data }) }) } catch {}
  }

  const deleteMember = async (target) => {
    const targetKey = target.id || target.email
    setMembers(prev => prev.filter(member => !((member.id && member.id === target.id) || (member.email && member.email === target.email))))
    try { await fetch('/api/members.php', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ target: targetKey }) }) } catch {}
  }

  const createArticle = async (article) => {
    const res = await fetch('/api/articles.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...article, id: Date.now() }) })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Artikel gagal ditambahkan.')
    setArticles(prev => [data.article, ...prev])
  }

  const updateArticle = async (article) => {
    const res = await fetch('/api/articles.php', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(article) })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Artikel gagal diperbarui.')
    setArticles(prev => prev.map(item => item.id === article.id ? data.article : item))
  }

  const deleteArticle = async (article) => {
    const res = await fetch('/api/articles.php', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: article.id }) })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Artikel gagal dihapus.')
    setArticles(prev => prev.filter(item => item.id !== article.id))
  }

  return <main ref={appRef}>
    <div className="scroll-progress" aria-hidden="true" />
    <Navbar menuOpen={menuOpen} active={active} onMenuToggle={() => setMenuOpen(current => !current)} onNavigate={go} />
    <Hero onNavigate={go} />
    <ImpactStrip />
    <AboutSection onNavigate={go} />
    <ServicesSection />
    <WorksSection onNavigate={go} />
    <CommunityStorySection />
    <GallerySection />
    <TeamRosterSection />
    <MembershipSection showRegister={showRegister} setShowRegister={setShowRegister} form={form} updateForm={updateForm} submitMember={submitMember} />
    <ArticlesSection articles={articles.filter(article => article.status === 'published')} />
    <ContactSection onAdminOpen={requestAdmin} />
    {showAdmin && <AdminDashboard members={members} articles={articles} onClose={() => setShowAdmin(false)} onAddMember={() => { setShowAdmin(false); setShowRegister(true) }} onUpdateMember={updateMember} onDeleteMember={deleteMember} onCreateArticle={createArticle} onUpdateArticle={updateArticle} onDeleteArticle={deleteArticle} />}
    {showPassword && <AdminPasswordModal onCancel={() => setShowPassword(false)} onSuccess={unlockAdmin} />}
    {showSuccess && <SuccessPopup onClose={() => setShowSuccess(false)} />}
    <GlobalLightbox />
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
