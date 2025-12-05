"use client"
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const workRef = useRef<HTMLAnchorElement>(null)
  const aboutRef = useRef<HTMLAnchorElement>(null)
  const contactRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) closeButtonRef.current?.focus()
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className={`nav-glass w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between ${scrolled ? 'scrolled' : ''}`}>
        <a href="#intro" className="flex items-center gap-2 font-semibold text-slate-100 nav-link">
          <span className="relative inline-block h-8 w-8 rounded-full overflow-hidden ring-2 ring-white/20 shadow-sm md:hidden">
            <Image src="/etay-profile.jpg" alt="" fill sizes="32px" className="object-cover object-center" />
          </span>
          Etay Naor
        </a>
        <div className="hidden md:flex items-center gap-8 text-slate-200">
          <a className="nav-link text-sm font-medium focus:outline-2 focus:outline-orange-500" href="#work">Work</a>
          <a className="nav-link text-sm font-medium focus:outline-2 focus:outline-orange-500" href="#about">About</a>
          <a className="nav-link text-sm font-medium focus:outline-2 focus:outline-orange-500" href="#contact">Contact</a>
        </div>
        <button
          ref={menuButtonRef}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-lg px-3 py-2 text-slate-200 hover:text-white focus:outline-2 focus:outline-orange-500 transition-colors"
        >
          <span className="sr-only">Open menu</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50" 
          onClick={() => setOpen(false)}
        >
          <div
            className="ml-auto h-full w-80 bg-slate-950/95 backdrop-blur-xl text-slate-100 shadow-2xl outline-none border-l border-slate-800/50"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key !== 'Tab') return
              const focusables = [
                closeButtonRef.current,
                workRef.current,
                aboutRef.current,
                contactRef.current,
              ].filter(Boolean) as HTMLElement[]
              if (focusables.length === 0) return
              const first = focusables[0]
              const last = focusables[focusables.length - 1]
              const active = document.activeElement as HTMLElement | null
              if (!e.shiftKey && active === last) {
                e.preventDefault()
                first.focus()
              } else if (e.shiftKey && active === first) {
                e.preventDefault()
                last.focus()
              }
            }}
          >
            <div className="p-4 flex justify-between items-center border-b border-slate-800/50">
              <span className="text-sm font-medium text-slate-400">Menu</span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                ref={closeButtonRef}
                className="rounded-lg p-2 hover:bg-slate-800/50 focus:outline-2 focus:outline-orange-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-8 flex flex-col gap-6">
              <a 
                href="#work" 
                className="py-3 text-2xl font-light hover:text-orange-500 transition-colors flex items-center gap-4" 
                onClick={() => setOpen(false)} 
                ref={workRef}
              >
                <span className="text-xs text-slate-500">01</span>
                Work
              </a>
              <a 
                href="#about" 
                className="py-3 text-2xl font-light hover:text-orange-500 transition-colors flex items-center gap-4" 
                onClick={() => setOpen(false)} 
                ref={aboutRef}
              >
                <span className="text-xs text-slate-500">02</span>
                About
              </a>
              <a 
                href="#contact" 
                className="py-3 text-2xl font-light hover:text-orange-500 transition-colors flex items-center gap-4" 
                onClick={() => setOpen(false)} 
                ref={contactRef}
              >
                <span className="text-xs text-slate-500">03</span>
                Contact
              </a>
            </div>
            <div className="absolute bottom-8 left-6 right-6 text-xs text-slate-600">
              © {new Date().getFullYear()} Etay Naor
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
