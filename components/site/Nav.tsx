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
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 ${scrolled ? 'shadow-sm' : ''}`}>
        <a href="#intro" className="flex items-center gap-2 font-semibold text-brand-fg">
          <span className="relative inline-block h-8 w-8 rounded-full overflow-hidden ring-2 ring-white shadow-sm md:hidden">
            <Image src="/etay-profile.jpg" alt="Etay Naor" fill sizes="32px" className="object-cover object-center" />
          </span>
          Etay Naor
        </a>
        <div className="hidden md:flex items-center gap-8 text-brand-fg/80">
          <a className="hover:underline underline-offset-2 focus:outline-2 focus:outline-blue-700" href="#work">Work</a>
          <a className="hover:underline underline-offset-2 focus:outline-2 focus:outline-blue-700" href="#about">About</a>
          <a className="hover:underline underline-offset-2 focus:outline-2 focus:outline-blue-700" href="#contact">Contact</a>
        </div>
        <button
          ref={menuButtonRef}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-lg px-3 py-2 text-brand-fg focus:outline-2 focus:outline-blue-700"
        >
          <span className="sr-only">Open menu</span>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="ml-auto h-full w-80 bg-brand-surface text-brand-fg shadow-lg outline-none"
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
            <div className="p-4 flex justify-end">
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                ref={closeButtonRef}
                className="rounded-lg px-3 py-2 focus:outline-2 focus:outline-blue-700"
              >
                ✕
              </button>
            </div>
            <div className="px-6 py-2 flex flex-col gap-4">
              <a href="#work" className="py-2" onClick={() => setOpen(false)} ref={workRef}>Work</a>
              <a href="#about" className="py-2" onClick={() => setOpen(false)} ref={aboutRef}>About</a>
              <a href="#contact" className="py-2" onClick={() => setOpen(false)} ref={contactRef}>Contact</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
