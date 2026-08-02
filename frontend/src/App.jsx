import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Nav from './components/Nav'
import FAQ from './components/FAQ'

import Hero from './pages/Hero'
import About from './pages/About'
import Services from './pages/Services'
import Experience from './pages/Experience'
import Footer from './components/Footer'
import Contact from './pages/Contact'

gsap.registerPlugin(ScrollTrigger)

// npm install lenis gsap lucide-react

const App = () => {
  const lenisRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Respect reduced-motion: collapse the lerp so scroll tracks the
      // input almost 1:1 instead of easing.
      autoRaf: false,
      lerp: prefersReducedMotion ? 1 : 0.1,
    })

    lenisRef.current = lenis
    // Exposed so Nav (and any other component) can trigger smooth
    // anchor-link scrolling through the same instance.
    window.lenis = lenis

    // Keep ScrollTrigger in sync with Lenis' virtual scroll position.
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker so both stay on one rAF loop.
    const update = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // ScrollTrigger needs to recalc positions once layout has settled
    // (fonts, images, animated-in content, etc.).
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const refreshTimeout = setTimeout(refresh, 300)

    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(refreshTimeout)
      gsap.ticker.remove(update)
      lenis.destroy()
      window.lenis = null
      lenisRef.current = null
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F4F2EC] font-sans text-[#17181A] antialiased">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
