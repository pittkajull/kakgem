import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'
import { emptyForm, starterMembers } from './data/siteData'
import { AdminDashboard, AboutSection, ContactSection, Hero, MembershipSection, Navbar, ServicesSection, WorksSection } from './components/SiteSections'
import { GallerySection } from './components/GallerySection'
import { TeamRosterSection } from './components/TeamRosterSection'
import { ImpactStrip } from './components/ImpactStrip'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('Home')
  const [showRegister, setShowRegister] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)
  const [members, setMembers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kagama-members')) || starterMembers
    } catch {
      return starterMembers
    }
  })
  const [form, setForm] = useState(emptyForm)
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
          scrollTrigger: { trigger: element, start: 'top 84%', once: true },
        })
      })

      gsap.to('.hero-photo', {
        yPercent: 8,
        scale: 1.06,
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

      gsap.from('.circle-cta', { scale: 0, rotation: -35, duration: 1, delay: .7, ease: 'back.out(1.7)' })
      gsap.to('.circle-cta', { y: -5, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .25 } })

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduceMotion) {
      gsap.utils.toArray('.service-card, .program-card, .gallery-item, .team-card, .team-node').forEach((card) => {
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

  const submitMember = (event) => {
    event.preventDefault()
    const next = [{ ...form, id: Date.now() }, ...members]
    setMembers(next)
    localStorage.setItem('kagama-members', JSON.stringify(next))
    setForm(emptyForm())
    setShowRegister(false)
    setShowAdmin(true)
  }

  return <main ref={appRef}>
    <div className="scroll-progress" aria-hidden="true" />
    <Navbar menuOpen={menuOpen} active={active} onMenuToggle={() => setMenuOpen(current => !current)} onNavigate={go} />
    <Hero onNavigate={go} />
    <GallerySection />
    <ImpactStrip />
    <AboutSection onNavigate={go} />
    <ServicesSection />
    <WorksSection onNavigate={go} />
    <TeamRosterSection />
    <MembershipSection showRegister={showRegister} setShowRegister={setShowRegister} form={form} updateForm={updateForm} submitMember={submitMember} />
    <ContactSection onAdminOpen={() => setShowAdmin(true)} />
    {showAdmin && <AdminDashboard members={members} onClose={() => setShowAdmin(false)} onAddMember={() => { setShowAdmin(false); setShowRegister(true) }} />}
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
