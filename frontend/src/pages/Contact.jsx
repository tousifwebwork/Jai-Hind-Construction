import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, User, MessageSquare, ArrowUpRight, Check } from 'lucide-react'
import API from '../api/api'
import toast from "react-hot-toast";


gsap.registerPlugin(ScrollTrigger)

const CornerMarks = ({ className = '' }) => (
  <>
    <span className={`pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#24406B]/40 ${className}`} />
    <span className={`pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#24406B]/40 ${className}`} />
  </>
)

const initialForm = { name: '', email: '', message: '' }

const Contact = () => {
  const sectionRef = useRef(null)
  const panelRef = useRef(null)

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(panelRef.current, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

 

const handleSubmit = async (e) => {
  e.preventDefault();

  setStatus("submitting");
  setErrors({});

  const toastId = toast.loading("Sending message...");

  try {
    const res = await API.post("/contact/form", {
      name: form.name,
      email: form.email,
      message: form.message,
    });

    if (res.data.success) {
      toast.success(res.data.message || "Message sent successfully!", {
        id: toastId,
      }); 
      setStatus("success");
      setForm(initialForm);
    }
  } catch (error) {
    if (error.response?.data?.errors) {
      setErrors(error.response.data.errors);
    }

    toast.error(
      error.response?.data?.message || "Failed to send message.",
      {
        id: toastId,
      }
    );

    setStatus("idle");
  }
};

  const fieldClasses = (hasError) =>
    `w-full border bg-white py-3 pl-11 pr-4 text-sm text-[#17181A] outline-none transition placeholder:text-[#48524F]/50 focus:border-[#24406B] ${
      hasError ? 'border-[#B84B32]' : 'border-[#17181A]/15'
    }`

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden bg-[#F4F2EC] px-6 py-24 text-[#17181A] md:px-12 lg:px-20"  >
      <div className="pointer-events-none absolute inset-0 opacity-70"   style={{   backgroundImage: 'linear-gradient(to right, rgba(36,64,107,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,64,107,0.07) 1px, transparent 1px)',  backgroundSize: '44px 44px',  }} />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#24406B]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#E2A33B]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div ref={panelRef} className="relative border border-[#17181A]/10 bg-[#FBFAF6] p-8 md:p-12"  >
          <CornerMarks />

          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[#24406B]">
                Division 04 — Contact
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                Start a conversation
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-[#48524F]">
                Tell us about the project and we'll get back to you within one business day.
              </p>
            </div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#48524F] sm:text-right">
              <p>Sheet C-001</p>
              <p>Scale N.T.S.</p>
            </div>
          </div>

          {status === 'success' ? (
            <div className="flex flex-col items-start gap-3 border border-[#17181A]/10 bg-white p-8">
              <span className="flex h-10 w-10 items-center justify-center border border-[#24406B] text-[#24406B]">
                <Check size={18} strokeWidth={2.5} />
              </span>
              <h3 className="text-lg font-bold text-[#17181A]">Message sent</h3>
              <p className="text-sm leading-6 text-[#48524F]">
                Thanks for reaching out — a member of our team will follow up shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#17181A] underline decoration-[#E2A33B] underline-offset-4 hover:text-[#24406B]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label 
                  htmlFor="contact-name"
                  className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-[#48524F]"
                >
                  Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#48524F]/50"
                  />
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jordan Reyes"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={fieldClasses(errors.name)}
                  />
                </div>
                {errors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-xs text-[#B84B32]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-[#48524F]"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#48524F]/50"
                  />
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jordan@company.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={fieldClasses(errors.email)}
                  />
                </div>
                {errors.email && (
                  <p id="contact-email-error" className="mt-1.5 text-xs text-[#B84B32]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-[#48524F]"
                >
                  Message
                </label>
                <div className="relative">
                  <MessageSquare
                    size={16}
                    className="pointer-events-none absolute left-4 top-4 text-[#48524F]/50"
                  />
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell us about your project — scope, timeline, location…"
                    value={form.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    className={`${fieldClasses(errors.message)} resize-none`}
                  />
                </div>
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-xs text-[#B84B32]">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex w-full items-center justify-center gap-2 bg-[#17181A] px-6 py-3.5 text-sm font-semibold text-[#F4F2EC] transition hover:bg-[#24406B] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'submitting' ? 'Sending…' : 'Send message'}
                {status !== 'submitting' && <ArrowUpRight size={16} strokeWidth={2.5} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
