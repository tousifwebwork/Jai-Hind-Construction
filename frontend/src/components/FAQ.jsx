import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, MapPin, Navigation } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const CornerMarks = ({ className = '' }) => (
  <>
    <span className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#24406B]/40 ${className}`} />
  </>
)

const faqs = [
  {
    code: 'Q-01',
    q: 'What areas do you serve?',
    a: 'We take on commercial and civic projects throughout Oregon and southern Washington, with our crews based out of Portland. Anything outside a 90-mile radius is scoped on a case-by-case basis.',
  },
  {
    code: 'Q-02',
    q: 'How is our project timeline set?',
    a: 'Your estimator builds the schedule from the drawing set before a shovel goes in the ground, then locks it against permitting and material lead times. You get the full sequence, phase by phase, at the pre-construction meeting.',
  },
  {
    code: 'Q-03',
    q: 'Are you licensed, bonded, and insured?',
    a: 'Yes — we hold general contractor licensing in 48 states, carry full liability and workers\' comp coverage, and can provide certificates of insurance directly to your risk or legal team on request.',
  },
  {
    code: 'Q-04',
    q: 'Do you provide estimates before contract?',
    a: 'Every project starts with a walkthrough and a line-item estimate at no cost, so you know material, labor, and schedule assumptions before you sign anything.',
  },
  {
    code: 'Q-05',
    q: 'Can you build from our architect\'s plans?',
    a: 'That\'s the standard path. We red-line the set with our super and estimator during pre-con, flag constructability issues early, and build to the approved drawings with no scope drift.',
  },
  {
    code: 'Q-06',
    q: 'What does your warranty cover?',
    a: 'Workmanship is covered for two years past substantial completion, and we pass through full manufacturer warranties on materials and systems, filed and organized in your closeout binder.',
  },
]

const FAQ = () => {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const panelRef = useRef(null)
  const ringRef = useRef(null)
  const pinRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(0)
  const answerRefs = useRef([])

useEffect(() => {
   
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
     
     
        gsap.from(listRef.current.children, {
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

      gsap.fromTo(
        ringRef.current,
        {
          strokeDasharray: 500,
          strokeDashoffset: 500,
        },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'restart none none reset',
          },
        }
      )

      gsap.from(pinRef.current, {
        y: -16,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'bounce.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'restart none none reset',
        },
      })
    })
  }, sectionRef)

  return () => ctx.revert()
}, [])

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-[#F4F2EC] px-6 py-24 text-[#17181A] md:px-12 lg:px-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(36,64,107,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,64,107,0.07) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#24406B]">
          Division 05 — FAQ
        </p>
        <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl">
          Answers, before you ask.
        </h2>
        <p className="mt-5 max-w-xl leading-relaxed text-[#48524F]">
          The questions every owner and GC brings to the first meeting — laid out here so your
          team can move straight to scope.
        </p>

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-16">
          {/* FAQ column */}
          <div ref={listRef} className="flex flex-col gap-4">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={item.code}
                  className={`group relative border bg-[#FBFAF6] transition duration-300 ${
                    isOpen ? 'border-[#24406B]/50 shadow-md' : 'border-[#17181A]/10'
                  }`}
                >
                  <CornerMarks
                    className={`transition-opacity duration-300 ${
                      isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24406B]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 font-mono text-xs font-semibold tracking-widest text-[#E2A33B]">
                        {item.code}
                      </span>
                      <span className="text-base font-bold text-[#17181A] md:text-lg">
                        {item.q}
                      </span>
                    </div>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center border border-[#48524F]/30 text-[#24406B] transition-transform duration-300 group-hover:border-[#24406B] ${
                        isOpen ? 'rotate-45 border-[#24406B] bg-[#24406B] text-white' : ''
                      }`}
                    >
                      <Plus size={16} strokeWidth={2} />
                    </span>
                  </button>

                  <div
                    ref={(el) => (answerRefs.current[i] = el)}
                    style={{ height: i === openIndex ? 'auto' : 0, opacity: i === openIndex ? 1 : 0 }}
                    className="overflow-hidden px-6"
                  >
                    <p className="max-w-md border-t border-[#17181A]/10 pb-6 pt-4 text-sm leading-6 text-[#48524F] md:pl-[3.25rem]">
                      {item.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Map / service-area column */}
          <div ref={panelRef} className="relative">
            <div className="relative aspect-4/5 border border-[#17181A]/10 bg-[#FBFAF6] p-2">
              <CornerMarks />
              <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden border border-dashed border-[#24406B]/20 text-[#48524F]">
                {/* <svg viewBox="0 0 200 200" className="absolute h-full w-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="78"
                    fill="none"
                    stroke="#24406B"
                    strokeOpacity="0.15"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="52"
                    fill="none"
                    stroke="#24406B"
                    strokeOpacity="0.2"
                  />
                  <circle
                    ref={ringRef}
                    cx="100"
                    cy="100"
                    r="78"
                    fill="none"
                    stroke="#E2A33B"
                    strokeWidth="1.5"
                    strokeDasharray="6 5"
                  />
                </svg> */}

                <div className='w-full h-full border-1 p-1'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1898.6905267017723!2d74.00560492063688!3d15.40685208761127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfbac0292b0013%3A0x94aac5c32915f6cc!2sMasjid%20E%20Noorani!5e0!3m2!1sen!2sin!4v1785738237911!5m2!1sen!2sin" className="w-full h-full border-0"  loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
                </div>


               <div ref={pinRef} className="relative mt-5 mb-7 z-10 flex items-center gap-3 rounded-full border  px-4 py-2 shadow-sm">
                  <MapPin size={20} strokeWidth={2} className="text-[#24406B]" />
                   <div className="flex flex-col">
                      <p className="font-mono text-xs uppercase ">Visit our Office</p>
                       <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-[#48524F]/70">Noorani Masjd ponda goa</p>
                    </div>
               </div>


              </div>

              {/* Dimension callouts */}
              <div className="absolute -left-4 top-8 flex items-center gap-1.5 border border-[#17181A]/10 bg-white px-3 py-1.5 shadow-sm">
                <Navigation size={12} className="text-[#24406B]" />
                <div>
                  <p className="text-sm font-extrabold text-[#17181A]">45.51° N</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#48524F]">
                    Latitude
                  </p>
                </div>
              </div>

              <div className="absolute -right-4 bottom-8 border border-[#17181A]/10 bg-white px-3 py-1.5 shadow-sm">
                <p className="text-sm font-extrabold text-[#17181A]">122.67° W</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#48524F]">
                  Longitude
                </p>
              </div>
            </div>

            <p className="mt-6 text-center text-sm leading-6 text-[#48524F]">
              Outside the shaded radius? We still quote select civic and commercial work beyond
              our standard service area — ask your estimator.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ