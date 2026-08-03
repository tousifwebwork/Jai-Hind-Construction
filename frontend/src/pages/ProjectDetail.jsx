import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import API from '../api/api'

const ProjectDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const routeProject = location.state || {}

  const projectImage =
    routeProject.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'

  const CornerMarks = ({ className = '' }) => (
  <>
    <span className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#24406B]/40 ${className}`} />
  </>
)


  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true)
        const response = await API.get(`/project/${id}`)
        setProject({ ...routeProject, ...(response.data.project || {}) })
        setError('')
      } catch (err) {
        setProject(routeProject || null)
        setError('Project details could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [id, routeProject])

  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-20">
      <div  className="pointer-events-none absolute inset-0 opacity-70"   style={{  backgroundImage:  'linear-gradient(to right, rgba(36,64,107,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,64,107,0.07) 1px, transparent 1px)',   backgroundSize: '44px 44px',  }}  />
      <div className="relative z-10 mx-auto max-w-3xl rounded-none border border-[#17181A]/10 bg-[#FBFAF6] p-8 shadow-[0_1px_0_0_rgba(23,24,26,0.05)] md:p-10">
    
      <CornerMarks />

        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#24406B]">
            Project Detail
          </p>
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 border border-[#17181A]/15 bg-white px-4 py-2 text-sm font-semibold text-[#17181A] transition hover:border-[#24406B]/40 hover:text-[#24406B]">
            Go Back
          </button >
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#17181A] md:text-5xl">
          {loading ? 'Loading project...' : project?.title || 'Project not found'}
        </h1>

        {error ? (
          <p className="mt-5 text-sm leading-6 text-[#B84B32]">{error}</p>
        ) : (
         <div className='grid grid-cols-[40%_60%] gap-5 px-5 py-11'>   
          
          <div className="mt-8 grid gap-6 border-t border-[#17181A]/10 pt-8 md:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#48524F]">
                Description
              </p>
              <p className="mt-2 leading-7 text-[#48524F]">
                {project?.description || 'No description available.'}
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#48524F]">
                  Date
                </p>
                <p className="mt-2 font-semibold text-[#17181A]">
                  {project?.date || 'Not provided'}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#48524F]">
                  Location
                </p>
                <p className="mt-2 font-semibold text-[#17181A]">
                  {project?.location || 'Not provided'}
                </p>
              </div>
            </div>
          </div>
          

        <div className="group border rounded-l overflow-hidden cursor-pointer transition-all duration-500 bg-white hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:border-[#24406B]">            
          <img src={projectImage} alt={project?.title || 'Project image'} />
          </div>

         </div>
         
        )}
      </div>
    </section>
  )
}

export default ProjectDetail