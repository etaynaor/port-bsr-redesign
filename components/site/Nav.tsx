"use client"
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // Simplified theme state - let DOM be the source of truth
  const [mounted, setMounted] = useState(false)
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

  // Simple mount detection
  useEffect(() => {
    setMounted(true)
  }, [])

  // Simple toggle function that works regardless of React state
  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    console.log('🎨 Theme toggle clicked!') // Debug log

    // Get current state from DOM
    const isDark = document.documentElement.classList.contains('dark')
    const newTheme = isDark ? 'light' : 'dark'

    console.log('🎨 Current theme:', isDark ? 'dark' : 'light', '-> New theme:', newTheme)

    // Direct DOM manipulation - most reliable approach
    const apply = (mode: string) => {
      const on = mode === 'dark'
      console.log('🎨 Applying theme:', mode, 'dark class:', on ? 'adding' : 'removing')

      document.documentElement.classList.toggle('dark', on)
      document.body.classList.toggle('dark', on)

      // Apply to all possible theme containers
      const containers = [
        document.getElementById('__next'),
        document.querySelector('[data-theme-root]'),
        document.querySelector('main'),
        document.querySelector('body > div')
      ]

      containers.forEach((el, i) => {
        if (el) {
          el.classList.toggle('dark', on)
          console.log('🎨 Applied to container', i, ':', el.tagName, 'dark class:', on ? 'added' : 'removed')
        }
      })
    }

    // Apply theme immediately
    apply(newTheme)

    // Persist theme
    try {
      localStorage.setItem('theme', newTheme)
      document.cookie = 'theme=' + newTheme + '; Path=/; Max-Age=' + (60*60*24*365) + '; SameSite=Lax'
      console.log('🎨 Theme persisted to localStorage and cookie')
    } catch(error) {
      console.error('🎨 Failed to persist theme:', error)
    }

    // Also call global setter if available
    try {
      if ((window as any).__setTheme) {
        console.log('🎨 Calling global __setTheme')
        (window as any).__setTheme(newTheme)
      } else {
        console.log('🎨 Global __setTheme not available')
      }
    } catch(error) {
      console.error('🎨 Error with global setter:', error)
    }

    // Update button display immediately
    const buttons = document.querySelectorAll('[aria-label*="Switch to"]')
    buttons.forEach(button => {
      const isNowDark = document.documentElement.classList.contains('dark')
      button.setAttribute('aria-label', isNowDark ? 'Switch to light mode' : 'Switch to dark mode')
      button.setAttribute('title', isNowDark ? 'Light mode' : 'Dark mode')
      button.textContent = isNowDark ? '☀︎' : '☾'
    })

    console.log('🎨 Theme toggle complete, new theme:', newTheme)
    console.log('🎨 Final DOM state - html.dark:', document.documentElement.classList.contains('dark'))
    console.log('🎨 Final DOM state - body.dark:', document.body.classList.contains('dark'))
  }

  // Get current theme from DOM for display
  const getCurrentTheme = () => {
    if (!mounted) return 'light' // Default for SSR
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }

  // Pre-compute theme for rendering to avoid function calls in JSX
  const currentTheme = getCurrentTheme()
  const isDark = currentTheme === 'dark'

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200 dark:bg-slate-900/70 dark:supports-[backdrop-filter]:bg-slate-900/60 dark:border-slate-800 ${scrolled ? 'shadow-sm' : ''}`}>
        <a href="#intro" className="flex items-center gap-2 font-semibold text-brand-fg dark:text-slate-100">
          <span className="relative inline-block h-8 w-8 rounded-full overflow-hidden ring-2 ring-white shadow-sm md:hidden">
            <Image src="/etay-profile.jpg" alt="" fill sizes="32px" className="object-cover object-center" />
          </span>
          Etay Naor
        </a>
        <div className="hidden md:flex items-center gap-6 text-brand-fg/80 dark:text-slate-200">
          <a className="hover:underline underline-offset-2 focus:outline-2 focus:outline-blue-700" href="#work">Work</a>
          <a className="hover:underline underline-offset-2 focus:outline-2 focus:outline-blue-700" href="#about">About</a>
          <a className="hover:underline underline-offset-2 focus:outline-2 focus:outline-blue-700" href="#contact">Contact</a>
          <button
            type="button"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
            className="hidden md:inline-flex items-center justify-center rounded-lg px-3 py-2 text-brand-fg dark:text-slate-200 focus:outline-2 focus:outline-blue-700"
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {mounted ? (isDark ? '☀︎' : '☾') : '☾'}
          </button>
          {/* Debug button - remove after testing */}
          <button
            type="button"
            onClick={() => console.log('🎨 Debug button clicked - React is working')}
            className="hidden md:inline-flex items-center justify-center rounded-lg px-3 py-2 bg-green-500 text-white focus:outline-2 focus:outline-blue-700 ml-2"
            title="Debug button"
          >
            🔧
          </button>
        </div>
        <button
          ref={menuButtonRef}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex items-center justify-center rounded-lg px-3 py-2 text-brand-fg dark:text-slate-200 focus:outline-2 focus:outline-blue-700"
        >
          <span className="sr-only">Open menu</span>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="ml-auto h-full w-80 bg-brand-surface text-brand-fg dark:bg-slate-900 dark:text-slate-100 shadow-lg outline-none"
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
            <div className="p-4 flex justify-between items-center">
              <button
                type="button"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={toggleTheme}
                className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-brand-fg dark:text-slate-200 focus:outline-2 focus:outline-blue-700"
                title={isDark ? 'Light mode' : 'Dark mode'}
              >
                {isDark ? '☀︎' : '☾'}
              </button>
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
