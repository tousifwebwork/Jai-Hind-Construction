import React, { useEffect, useState } from 'react'
import { Compass, Menu, X, ArrowUpRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' }, 
]

const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow

    document.documentElement.style.overflow = open ? 'hidden' : previousHtmlOverflow
    document.body.style.overflow = open ? 'hidden' : previousBodyOverflow

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [open])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)

    if (href.startsWith('/')) {
      navigate(href)
      return
    }

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: href } })
      return
    }

    // Prefer the shared Lenis instance (set on window by App.jsx) so the
    // jump matches the page's smooth-scroll easing; fall back gracefully
    // if Lenis hasn't initialized yet.
    if (window.lenis) {
      const result = window.lenis.scrollTo(href, { offset: -84, duration: 1.4 })

      // If Lenis returns a promise, wait for it to finish then refresh
      // ScrollTrigger so animations and layout-dependent assets recalc.
      if (result && typeof result.then === 'function') {
        result.then(() => ScrollTrigger.refresh())
      } else {
        // Fallback: schedule a refresh after a short delay.
        setTimeout(() => ScrollTrigger.refresh(), 800)
      }
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => ScrollTrigger.refresh(), 500)
    }
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled   ? 'border-b border-[#17181A]/10 bg-[#F4F2EC]/90 backdrop-blur-md' : 'border-b border-transparent bg-transparent' }`} >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 text-[#17181A]"
          >
            <Compass size={20} strokeWidth={1.5} className="text-[#E2A33B]" />
            <span className="text-sm font-extrabold uppercase tracking-[0.08em]">
              Meridian <span className="font-normal text-[#48524F]">Build Co.</span>
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-mono text-xs uppercase tracking-[0.2em] text-[#17181A]/70 transition hover:text-[#17181A]"
              >
                {link.label}
              </a>
            ))}
          </nav>

      <div className="hidden md:flex items-center gap-3">
          <a
            href="/projects"
            onClick={(e) => handleNavClick(e, '/projects')}
            className="hidden items-center gap-1.5 border border-[#17181A]/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#17181A] transition hover:border-[#17181A] md:inline-flex"
          >
            View projects
            <ArrowUpRight size={10} strokeWidth={2.5} />
          </a>

          <a
  href="#contact"
  onClick={(e) => handleNavClick(e, "#contact")}
  className="hidden md:inline-flex items-center gap-1.5 border border-[#17181A]/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#17181A] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#24406B] hover:bg-[#24406B] hover:text-white hover:shadow-lg"
>
  Contact Us
  <ArrowUpRight
    size={10}
    strokeWidth={2.5}
    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
  />
</a>
          </div>




          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center border border-[#17181A]/20 text-[#17181A] md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile panel */}
      <div
        className={`fixed inset-0 z-40 bg-[#F4F2EC] transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(36,64,107,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,64,107,0.07) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <nav className="relative z-10 flex h-full flex-col items-start justify-center gap-2 px-8">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="group flex items-baseline gap-3 py-3 text-3xl font-extrabold tracking-tight text-[#17181A]"
            >
              <span className="font-mono text-xs font-normal tracking-[0.2em] text-[#E2A33B]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="transition group-hover:text-[#24406B]">{link.label}</span>
            </a>
          ))} 
          <a href="/projects" onClick={(e) => handleNavClick(e, '/projects')} className="mt-6 inline-flex items-center gap-2 bg-[#17181A] px-6 py-3.5 text-sm font-semibold text-[#F4F2EC]">
            View projects
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
          <a
  href="#contact"
  onClick={(e) => handleNavClick(e, "#contact")}
  className="mt-3 inline-flex items-center gap-2 border border-[#17181A] px-6 py-3.5 text-sm font-semibold text-[#17181A] transition-all duration-300 hover:bg-[#17181A] hover:text-white"
>
  Contact Us
  <ArrowUpRight size={16} strokeWidth={2.5} />
</a>
        </nav>
      </div>
    </>
  )
}

export default Nav
