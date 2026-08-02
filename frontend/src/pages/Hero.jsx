import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Compass, ArrowUpRight, Play } from 'lucide-react'

const stats = [
  { value: '18+', label: 'Years Active' },
  { value: '240+', label: 'Projects Delivered' },
  { value: '50M+', label: 'Sq Ft Built' },
  { value: '0', label: 'Lost-Time Incidents' },
]

const Hero = () => {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)

  // Single hook: the intro (eyebrow → headline → sub → cta → stats) is one
  // chained gsap.timeline() using relative offsets ('-=0.35' etc.), so
  // these tweens can't be split across hooks without changing their
  // relative timing — they stay together intentionally.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.6 })
          .from(headlineRef.current, { opacity: 0, y: 26, duration: 0.8 }, '-=0.35')
          .from(subRef.current, { opacity: 0, y: 18, duration: 0.7 }, '-=0.45')
          .from(ctaRef.current,{
            opacity: 0,
            y: 14,
            duration: 0.6,
            stagger: 0.1,
          }, '-=0.4')
          .from(statsRef.current ? statsRef.current.children : [], {
            opacity: 0,
            y: 16,
            duration: 0.6,
            stagger: 0.08,
          }, '-=0.3')
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#F4F2EC] px-6 pb-10 pt-28 text-[#17181A] md:px-12 lg:px-20"
    >
      {/* Blueprint grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(36,64,107,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,64,107,0.07) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#24406B]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#E2A33B]/10 blur-3xl" />

      {/* Drafting margin notes */}
      <p className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.4em] text-[#48524F]/50 md:block">
        Project North
      </p>
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-16 md:block">
        <Compass size={16} className="text-[#24406B]/40" strokeWidth={1.5} />
      </div>
      <p className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.4em] text-[#48524F]/50 md:block">
        Sheet A-000 · Rev 03
      </p>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-start justify-center pt-10">
        <p
          ref={eyebrowRef}
          className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-[#24406B]"
        >
          General Contractor — Est. 2005
        </p>

        <h1
          ref={headlineRef}
          className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-[#17181A] sm:text-5xl md:text-6xl"
        >
          We build the structures your business stands on.
        </h1>

        <p ref={subRef} className="mt-6 max-w-xl leading-relaxed text-[#48524F]">
          Commercial and civic construction, planned to spec and delivered on schedule —
          from groundbreaking to final walkthrough.
        </p>

        <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#contact"  className="inline-flex items-center gap-2 bg-[#17181A] px-6 py-3.5 text-sm font-semibold text-[#F4F2EC] transition hover:bg-[#24406B]"  >
            Request an estimate
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
          <a href="#experience"  className="inline-flex items-center gap-2 border border-[#17181A]/20 px-6 py-3.5 text-sm font-semibold text-[#17181A] transition hover:border-[#17181A]"   >
            <Play size={14} strokeWidth={2.5} className="fill-[#17181A]" />
            View our work
          </a>
        </div>
        
      </div>

      {/* Stat strip — title-block style data cells */}
      <div
        ref={statsRef}
        className="relative z-10 mx-auto mt-16 grid w-full max-w-5xl grid-cols-2 divide-x divide-y divide-[#17181A]/10 border border-[#17181A]/10 bg-[#FBFAF6] sm:grid-cols-4 sm:divide-y-0"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-5">
            <p className="text-2xl font-extrabold text-[#17181A] md:text-3xl">{stat.value}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#48524F]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero