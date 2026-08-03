import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import API from '../api/api'
gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    year: '2005',
    title: 'Firm founded',
    desc: 'Started as a three-person crew taking on tenant fit-outs and small commercial jobs.',
  },
  {
    year: '2010',
    title: 'Civil works division opens',
    desc: 'Expanded beyond buildings into site work, grading, and civic infrastructure contracts.',
  },
  {
    year: '2016',
    title: 'Zero-incident safety program',
    desc: 'Rolled out a site-wide safety system that has held a zero lost-time record since.',
  },
  {
    year: '2021',
    title: '150th project delivered',
    desc: 'Crossed 150 completed commercial builds, all delivered on or ahead of schedule.',
  },
  {
    year: '2025',
    title: 'Sustainable build standard',
    desc: 'Adopted low-carbon materials and energy-modeling as default on every new project.',
  },
]

const Experience = () => {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const itemsRef = useRef(null)
  const [projectData, setProjectData] = useState([])
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        )

        gsap.from(itemsRef.current , {
          opacity: 0,
          y: 28,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 80%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

    useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await API.get('/project/')
        setProjectData(response.data.projects || []) 
      } catch (error) {
        setProjectData([])
      }
    }

    loadProjects()
  }, [])

  return (
    <section  ref={sectionRef}   id="experience"  className="relative overflow-hidden bg-[#F4F2EC] px-6 py-24 text-[#17181A] md:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0 opacity-70"style={{backgroundImage: 'linear-gradient(to right, rgba(36,64,107,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,64,107,0.07) 1px, transparent 1px)',  backgroundSize: '44px 44px',}}  />

      <div className="relative z-10 mx-auto max-w-4xl">
        
        <div className="mb-16 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#24406B]">
            Division 04 — Experience
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Twenty years, one survey line.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#48524F]">
            Every milestone below is a point we surveyed, hit, and built past.
          </p>
        </div>

        {/* Elevation / survey line */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#17181A]/10" />
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#24406B]"
            style={{ transform: 'scaleY(0)' }}
          />

          <div ref={itemsRef} className="relative flex flex-col gap-14">
            {projectData.map((item, i) => {
              const alignLeft = i % 2 === 0
              return (
                <div
                  key={item._id}
                  className={`relative flex flex-col md:flex-row md:items-center ${
                    alignLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Tick + node on the line */}
                  <span className="absolute left-1/2 top-1.5 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-[#24406B] bg-[#F4F2EC] md:block" />
                  <span className="absolute left-1/2 top-2 hidden h-px w-6 -translate-x-1/2 bg-[#24406B]/40 md:block" />

                  <div  className={`w-full md:w-1/2 ${ alignLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}  >
                    <div className="relative inline-block border border-[#17181A]/10 bg-[#FBFAF6] px-6 py-5 text-left">
                     
                     <div className='relative'>
                      <p className="font-mono text-sm font-bold tracking-widest text-[#E2A33B]">
                        {new Date(item.date).getFullYear()}
                      </p>
                      <p className="absolute right-0 top-0 font-mono text-sm font-bold tracking-widest text-[#E2A33B]">
                        {item.location}
                      </p>
                     </div>

                      
                      <h3 className="mt-3 text-lg font-bold text-[#17181A]">{item.title}</h3>
                      <p className="mt-2.5 text-sm leading-6 text-[#48524F]">{item.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
