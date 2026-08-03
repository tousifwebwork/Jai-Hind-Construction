import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Ruler, ShieldCheck, Wrench, ArrowUpRight } from 'lucide-react'
import Project from '../components/Project'

gsap.registerPlugin(ScrollTrigger)

/**
 * Small drafting-style corner ticks, used to frame panels like a
 * cropped construction drawing sheet.
 */
const CornerMarks = ({ className = '' }) => (
  <>
    <span className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#24406B]/40 ${className}`} />
  </>
)

const Services = () => {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const cardsRef = useRef(null)
  const projectsIntroRef = useRef(null)
  const tagsRef = useRef(null)

  const skills = [
    {
      code: 'A-01',
      title: 'Commercial Builds',
      icon: Building2,
      desc: 'From office towers to retail spaces, we deliver durable structures on schedule.',
    },
    {
      code: 'A-02',
      title: 'Project Planning',
      icon: Ruler,
      desc: 'Detailed estimating, sequencing, and site coordination keep every phase efficient.',
    },
    {
      code: 'A-03',
      title: 'Safety Management',
      icon: ShieldCheck,
      desc: 'Strict compliance, site inspections, and risk prevention protect crews and clients.',
    },
    {
      code: 'A-04',
      title: 'Renovation & Fit-Out',
      icon: Wrench,
      desc: 'We modernize interiors and infrastructure with minimal disruption to operations.',
    },
  ]
  const technologies = [
    'Commercial Construction',
    'Civil Works',
    'Site Supervision',
    'Permits & Compliance',
    'Safety Systems',
    'Turnkey Delivery',
  ]

  useEffect(() => {
    const ctx = gsap.context(() => { 
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(introRef.current, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        })

        gsap.from(cardsRef.current, {
          y: 36,
          opacity: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          },
        })

        gsap.from(projectsIntroRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectsIntroRef.current,
            start: 'top 85%',
          },
        })

        gsap.from(tagsRef.current , {
          y: 18,
          opacity: 0,
          scale: 0.96,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tagsRef.current,
            start: 'top 85%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section  ref={sectionRef}  id="services"  className="relative overflow-hidden bg-[#F4F2EC] px-6 py-24 text-[#17181A] md:px-12 lg:px-20"  >
      {/* Blueprint grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(36,64,107,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,64,107,0.07) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#E2A33B]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#24406B]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">
        {/* Intro panel */}
        <div
          ref={introRef}
          className="relative rounded-none border border-[#17181A]/10 bg-[#FBFAF6] p-8 shadow-[0_1px_0_0_rgba(23,24,26,0.05)] md:p-10"
        >
          <CornerMarks />

          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#24406B]">
                Division 00 — Capabilities
              </p>
              <h2 className="text-4xl font-extrabold tracking-tight text-[#17181A] md:text-5xl">
                What We Build
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-[#48524F]">
                Creating safe, efficient, and lasting construction solutions for commercial
                and civic projects — planned to spec and built to last.
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-1.5 border-b border-[#17181A]/30 pb-0.5 text-sm font-semibold text-[#17181A] transition hover:border-[#E2A33B] hover:text-[#B84B32]"
              >
                Request a project estimate
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </a>
            </div>

            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#48524F] md:text-right">
              <p>Sheet A-100</p>
              <p>Scale 1 : 100</p>
            </div>
          </div>

          {/* Capability cards */}
          <div ref={cardsRef} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {skills.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.code}
                  className="group relative border border-[#17181A]/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#24406B]/40 hover:shadow-md"
                >
                  <CornerMarks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="mb-6 flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold tracking-widest text-[#E2A33B]">
                      {item.code}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center border border-[#48524F]/30 text-[#24406B] transition group-hover:border-[#24406B] group-hover:bg-[#24406B] group-hover:text-white">
                      <Icon size={18} strokeWidth={2} />
                    </span>
                  </div>

                  <h3 className="mb-2.5 text-lg font-bold text-[#17181A]">{item.title}</h3>

                  <p className="text-sm leading-6 text-[#48524F]">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Featured projects panel */}
        <div className="relative border border-[#17181A]/10 bg-[#FBFAF6] p-8 md:p-10">
          <CornerMarks />

          <div ref={projectsIntroRef} className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#24406B]">
                Division 03 — Selected Work
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#17181A] md:text-4xl">
                Featured Projects
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-[#48524F]">
                A sample of recent builds — from groundbreaking to final walkthrough.
              </p>
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#48524F] md:text-right">
              <p>Sheet P-300</p>
              <p>Scale N.T.S.</p>
            </div>
          </div>

         
          <Project />

        </div>

        {/* Specializations panel */}
        <div className="relative border border-[#17181A]/10 bg-[#FBFAF6] px-8 py-8 md:px-10">
          <CornerMarks />
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-[#24406B]">
            Specializations
          </p>
          <div ref={tagsRef} className="flex flex-wrap items-center gap-3">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="border border-[#17181A]/15 bg-white px-4 py-2.5 text-sm font-medium text-[#17181A] transition duration-200 hover:border-[#E2A33B] hover:bg-[#E2A33B] hover:text-[#17181A]"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
