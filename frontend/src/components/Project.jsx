import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Building2, Ruler, ShieldCheck, Wrench } from 'lucide-react'
import API from '../api/api'


gsap.registerPlugin(ScrollTrigger)
 
const CornerMarks = ({ className = '' }) => (
  <>
    <span className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#24406B]/40 ${className}`} />
  </>
)

 
const technologies = [
  { icon: Building2, label: 'Commercial Construction' },
  { icon: Ruler, label: 'Civil Works' },
  { icon: ShieldCheck, label: 'Safety Systems' },
  { icon: Wrench, label: 'Turnkey Delivery' },
]
 
const Project = ({ mode = 'teaser', viewMoreTo = '/projects', showViewMore = true }) => {

  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const projectsRef = useRef(null)
  const [projectData, setProjectData] = useState([])
  const hasMoreThanThree = projectData.length > 3

  const displayedProjects = projectData.map((project, index) => ({
  key: project._id || `project-${index + 1}`,
  id: project._id || "",
  code: `P-${String(index + 1).padStart(2, "0")}`,
  image: project.img_url,  
  title: project.title || "",
  description: project.description || "",
  date: project.date || "",
  location: project.location || "",
}));

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await API.get('/project')
        setProjectData(response.data.projects || []) 
      } catch (error) {
        setProjectData([])
      }
    }

    loadProjects()
  }, [])
 

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(introRef.current, {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 85%',
          },
        })

        gsap.from(projectsRef.current , {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top 82%',
          },
        })
      })
    }, sectionRef)


    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative overflow-hidden bg-[#F4F2EC] px-6 py-24 text-[#17181A] md:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0 opacity-70"style={{ backgroundImage: 'linear-gradient(to right, rgba(36,64,107,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,64,107,0.07) 1px, transparent 1px)',backgroundSize: '44px 44px',  }}/>

      <div className="relative z-10 mx-auto max-w-7xl">
        {mode !== 'all' ? (
          <div ref={introRef} className="mx-auto max-w-2xl text-center">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="text-left">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#24406B]">
                  Division 03 — Projects
                </p>
                <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
                  Work delivered clean, safe, and on schedule.
                </h2>
              </div>
              {showViewMore && hasMoreThanThree ? (
                <Link to={viewMoreTo} className="inline-flex shrink-0 items-center gap-2 border border-[#17181A]/15 bg-white px-4 py-2 text-sm font-semibold text-[#17181A] transition hover:border-[#24406B]/40 hover:text-[#24406B]">
                  View More
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </Link>
              ) : null}
            </div>
            <p className="mt-5 leading-relaxed text-[#48524F]">
              A snapshot of the commercial and civic builds we have delivered across planning,
              site work, and closeout.
            </p>
          </div>
        ) : null}

        {mode === 'all' ? (
          <div ref={introRef} className="mx-auto max-w-3xl text-center"> 
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Browse every project in the database.
            </h2>
            <p className="mt-5 leading-relaxed text-[#48524F]">
              Click any card to open the backend-powered detail page.
            </p>
          </div>
        ) : null}

        <div className={`mt-12 flex flex-wrap items-center ${mode === 'all' ? 'justify-start' : 'justify-center'} gap-3`}>
          {technologies.map((tech) => {
            const Icon = tech.icon
            return (
              <span
                key={tech.label}
                className="inline-flex items-center gap-2 border border-[#17181A]/10 bg-[#FBFAF6] px-4 py-2 text-sm text-[#17181A]"
              >
                <Icon size={14} className="text-[#24406B]" />
                {tech.label}
              </span>
            )
          })}
        </div>

        {/* Project cards */}
        <div  ref={projectsRef}   className={mode === 'all'?'mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3': 'mt-14 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory'  }  >
          {displayedProjects.map((project) => (
            <article key={project.key} className={   mode === 'all' ? 'group relative flex flex-col border border-[#17181A]/10 bg-[#FBFAF6] transition duration-300 hover:-translate-y-1 hover:border-[#24406B]/40 hover:shadow-md'  : 'group relative w-[320px] shrink-0 snap-start flex-col border border-[#17181A]/10 bg-[#FBFAF6] transition duration-300 hover:-translate-y-1 hover:border-[#24406B]/40 hover:shadow-md md:w-85'  }   >
              <div className="relative aspect-4/3 overflow-hidden border-b border-[#17181A]/10">
<img
  src={project.image}
  alt={project.title}
  loading="lazy"
  className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
/>                <span className="absolute left-0 top-0 border-b border-r border-[#17181A]/10 bg-[#FBFAF6]/95 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest text-[#E2A33B]">
                  {project.code}
                </span>
                <CornerMarks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-bold text-[#17181A]">
                  {project.title || 'Project title coming soon'}
                </h3>
                <p className="flex-1 text-sm leading-6 text-[#48524F]">
                  {project.description || 'Project details will load from the backend.'}
                </p>
                <div className="mt-4 space-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#48524F]">
                  <p>{project.date}</p>
                  <p>{project.location}</p>
                </div>
                {project.id ? (
                  <Link
                    to={`/project/${project.id}`}
                    state={{
  image: project.image,
  title: project.title,
  description: project.description,
  date: project.date,
  location: project.location,
  code: project.code,
}}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#17181A] transition group-hover:text-[#24406B]"
                  >
                    View project
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2.5}
                      className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                ) : (
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#17181A]/40">
                    View project
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {mode !== 'all' && hasMoreThanThree ? (
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#48524F]">
            Scroll to see more projects, or use View More.
          </p>
        ) : null}
      </div>
    </section>
  )
}

export default Project
