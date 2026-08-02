import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, HardHat, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const CornerMarks = ({ className = '' }) => (
  <>
    <span className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#24406B]/40 ${className}`} />
  </>
)

const facts = [
  { label: 'Founded', value: '2005' },
  { label: 'Headquarters', value: 'Portland, OR' },
  { label: 'Licensed', value: 'GC · 48 States' },
]

const values = [
  {
    code: 'V-01',
    title: 'Precision',
    icon: Compass,
    desc: 'Every phase is measured against the drawing set, not approximated on site.',
  },
  {
    code: 'V-02',
    title: 'Craft',
    icon: HardHat,
    desc: 'Crews are trained and retained — the same hands see a project through.',
  },
  {
    code: 'V-03',
    title: 'Safety',
    icon: ShieldCheck,
    desc: 'Zero-incident targets are written into every schedule, not added after.',
  },
]

const About = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const panelRef = useRef(null)
  const valuesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(textRef.current, {
          x: -24,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })

        gsap.from(panelRef.current, {
          x: 24,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })

        gsap.from(valuesRef.current , {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 85%' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section  ref={sectionRef}  id="about"  className="relative overflow-hidden bg-[#F4F2EC] px-6 py-24 text-[#17181A] md:px-12 lg:px-20" >
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{  backgroundImage:  'linear-gradient(to right, rgba(36,64,107,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,64,107,0.07) 1px, transparent 1px)', backgroundSize: '44px 44px',  }}  />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          {/* Narrative column */}
          <div ref={textRef}>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#24406B]">
              Division 01 — About
            </p>
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Two decades of building to spec.
            </h2>
            <p className="mt-5 leading-relaxed text-[#48524F]">
              We started as a three-person crew taking on tenant fit-outs. Today we run
              full commercial and civic projects end to end — but the standard hasn't
              changed: build exactly what the drawing says, on the day the schedule says.
            </p>
            <p className="mt-4 leading-relaxed text-[#48524F]">
              Every project is led by the same estimator, super, and safety officer from
              groundbreaking to punch list, so nothing gets lost in a handoff.
            </p>

            <dl className="mt-8 grid grid-cols-3 divide-x divide-[#17181A]/10 border border-[#17181A]/10 bg-[#FBFAF6]">
              {facts.map((fact) => (
                <div key={fact.label} className="px-4 py-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#48524F]">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#17181A]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Framed panel — site plan */}
          <div ref={panelRef} className="relative">
            <div className="relative aspect-[4/5] border border-[#17181A]/10 bg-[#FBFAF6] p-2">
              <CornerMarks />
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 border border-dashed border-[#24406B]/20 text-[#48524F]">
                <Compass size={40} strokeWidth={1.2} className="text-[#24406B]/50" />
                <p className="font-mono text-xs uppercase tracking-[0.25em]">Site Plan</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#48524F]/70">
                  Est. 2005 — Portland, OR
                </p>
              </div>

              {/* Dimension callouts */}
              <div className="absolute -left-4 top-8 border border-[#17181A]/10 bg-white px-3 py-1.5 shadow-sm">
                <p className="text-sm font-extrabold text-[#17181A]">18 yrs</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#48524F]">
                  In business
                </p>
              </div>
              
              <div className="absolute -right-4 bottom-8 border border-[#17181A]/10 bg-white px-3 py-1.5 shadow-sm">
                <p className="text-sm font-extrabold text-[#17181A]">240+</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#48524F]">
                  Projects
                </p>
              </div>
              
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div ref={valuesRef} className="mt-20 grid gap-5 md:grid-cols-3">
          {values.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.code}
                className="group relative border border-[#17181A]/10 bg-[#FBFAF6] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#24406B]/40 hover:shadow-md"
              > 
                <CornerMarks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold tracking-widest text-[#E2A33B]">
                    {item.code}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center border border-[#48524F]/30 text-[#24406B] transition group-hover:border-[#24406B] group-hover:bg-[#24406B] group-hover:text-white">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#17181A]">{item.title}</h3>
                <p className="text-sm leading-6 text-[#48524F]">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About
