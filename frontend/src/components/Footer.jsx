import React from 'react'
import { Compass, MapPin, Phone, Mail } from 'lucide-react'

const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
]

const services = [
  'Commercial Builds',
  'Project Planning',
  'Safety Management',
  'Renovation & Fit-Out',
]

const titleBlock = [
  { label: 'Drawn By', value: 'Studio' },
  { label: 'Checked By', value: 'PM' },
  { label: 'Date', value: new Date().getFullYear().toString() },
  { label: 'Scale', value: 'N.T.S.' },
  { label: 'Sheet No', value: 'F-001' },
  { label: 'Rev', value: 'A' },
]

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#17181A] px-6 pt-20 text-[#F4F2EC] md:px-12 lg:px-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: 'linear-gradient(to right, #F4F2EC 1px, transparent 1px), linear-gradient(to bottom, #F4F2EC 1px, transparent 1px)', backgroundSize: '44px 44px',  }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">

   <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-white/10 pb-14 sm:gap-12 md:grid-cols-4">

     {/* Brand / compass */}
     <div className="col-span-2 md:col-span-1 ">
      <div className="mb-4 flex justify-center gap-2">
        <Compass size={22} strokeWidth={1.5} className="text-[#E2A33B] shrink-0" />
        <span className=" text-lg font-extrabold tracking-tight">Meridian&nbsp;Build Co.</span>
      </div>
      <p className="text-center max-w-xs text-sm leading-relaxed text-white/60">
        General contractor delivering commercial and civic projects, planned to
        spec since 2005.
      </p>
    </div>

    {/* Navigation */}
    <div className=' p-3'>
      <p className=" mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[#E2A33B]">
        Navigate
      </p>
      <ul className="space-y-2.5">
        {nav.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Services */}
    <div className=' p-3'>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[#E2A33B]">
        Services
      </p>
      <ul className="space-y-2.5">
        {services.map((item) => (
          <li key={item} className="text-sm text-white/70">
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Contact */}
    <div className="col-span-2 md:col-span-1 p-3 ">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[#E2A33B]">
        Contact
      </p>
      <ul className="space-y-3 text-sm text-white/70">
        <li className="flex items-start gap-2">
          <MapPin size={15} className="mt-0.5 shrink-0 text-white/40" />
          <span className="break-words">412 Foundry St, Portland, OR 97201</span>
        </li>
        <li className="flex items-center gap-2 min-w-0">
          <Phone size={15} className="shrink-0 text-white/40" />
          <a href="tel:+15035550142" className="hover:text-white truncate">
            (503) 555-0142
          </a>
        </li>
        <li className="flex items-center gap-2 min-w-0">
          <Mail size={15} className="shrink-0 text-white/40" />
         <a href="mailto:projects@meridianbuild.co" className="hover:text-white break-all sm:break-normal sm:truncate"  >
            projects@meridianbuild.co
          </a>
        </li>
      </ul>
    </div>

  </div>

  {/* Title block — bottom bar styled like a drawing title block */}
  <div className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between ">
    <p className="text-xs text-white/40">
      &copy; {new Date().getFullYear()} Meridian Build Co. All rights reserved.
    </p>

    <div className="grid grid-cols-3 divide-x divide-y divide-white/10 border border-white/10 sm:grid-cols-6 sm:divide-y-0">
      {titleBlock.map((cell) => (
        <div key={cell.label} className="px-3 py-2 text-center">
          <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/40">
            {cell.label}
          </p>
          <p className="mt-0.5 truncate text-[11px] font-semibold text-white/80">
            {cell.value}
          </p>
        </div>
      ))}
    </div>
  </div>

      </div>
    </footer>
  )
}

export default Footer
