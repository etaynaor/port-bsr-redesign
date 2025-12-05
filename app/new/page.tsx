"use client"
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Nav from '@/components/site/Nav'
import { CASE_STUDIES } from '@/data/case-studies'

export default function NewPortfolio() {
  const heroRef = useRef<HTMLElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  // Parallax effect - portrait and text scroll at different speeds
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !portraitRef.current || !textRef.current) return
      
      const scrollY = window.scrollY
      const heroHeight = heroRef.current.offsetHeight
      
      // Only apply parallax while in hero section
      if (scrollY < heroHeight) {
        // Portrait moves slower (0.3x scroll speed) - reveals more as you scroll
        portraitRef.current.style.transform = `translateY(${scrollY * 0.3}px)`
        // Text moves faster (0.7x scroll speed) - scrolls away quicker
        textRef.current.style.transform = `translateY(${scrollY * 0.7}px)`
      }
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Intersection Observer for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    revealElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div data-theme-root className="bg-slate-950 text-slate-50 overflow-x-hidden md:overflow-visible">
      {/* Film Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />
      
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-slate-50 focus:text-slate-950 focus:px-3 focus:py-2">Skip to content</a>
      <Nav />

      {/* HERO - Dark with Portrait and CRT Effect */}
      <header ref={heroRef} id="intro" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient Glow */}
        <div className="hero-ambient-glow" aria-hidden="true" />

        {/* Background Portrait - THE IMAGE with CRT flicker effect and parallax */}
        <div ref={portraitRef} className="absolute inset-0 w-full h-full parallax-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950 z-10" />
          <Image
            src="/etay-profile.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center crt-tv-on"
            priority
          />
        </div>

        {/* Content Overlay - CENTERED with parallax */}
        <div ref={textRef} className="relative z-20 w-full h-full max-w-[2000px] mx-auto px-8 md:px-12 lg:px-16 flex flex-col justify-between py-24 parallax-content">
          {/* Top Meta */}
          <div className="flex justify-between items-start">
            <div className="hero-meta hero-meta-1 text-xs md:text-sm uppercase tracking-[0.3em] text-slate-400">
              2025
            </div>
            <div className="hero-meta hero-meta-2 text-xs md:text-sm uppercase tracking-[0.3em] text-slate-400">
              BERLIN
            </div>
          </div>

          {/* Center - Massive Name with Letter-by-Letter Reveal */}
          <div className="flex-1 flex items-center justify-center">
            <h1 className="text-center hero-text-container">
              <div className="hero-word-1 text-[20vw] md:text-[22vw] lg:text-[24vw] font-bold leading-[0.8] tracking-tighter">
                <span className="hero-letter">E</span>
                <span className="hero-letter">T</span>
                <span className="hero-letter">A</span>
                <span className="hero-letter">Y</span>
              </div>
              <div className="hero-word-2 text-[20vw] md:text-[22vw] lg:text-[24vw] font-bold leading-[0.8] tracking-tighter">
                <span className="hero-letter">N</span>
                <span className="hero-letter">A</span>
                <span className="hero-letter">O</span>
                <span className="hero-letter">R</span>
              </div>
            </h1>
          </div>

          {/* Bottom Info */}
          <div className="flex justify-between items-end gap-8">
            <div className="max-w-md">
              <p className="hero-meta hero-meta-3 text-sm md:text-base text-slate-300 mb-6">
                Marketing Strategy Leader / Creative Director.<br />
                Based in Berlin.
              </p>
              <a
                href="#work"
                className="hero-meta hero-meta-4 inline-flex items-center gap-3 text-sm font-medium text-orange-500 hover:text-orange-400 transition-colors group btn-hover-lift"
              >
                SCROLL TO EXPLORE
                <span className="scroll-arrow">↓</span>
              </a>
            </div>
            <div className="hero-meta hero-meta-5 hidden md:block text-xs uppercase tracking-[0.3em] text-slate-400">
              STRATEGY & CREATIVE
            </div>
          </div>
        </div>
      </header>

      {/* CLIENTS LOGO SECTION */}
      <section className="bg-slate-950 border-t border-slate-800 py-8 md:py-10">
        <div className="max-w-[2000px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="reveal text-[10px] md:text-xs uppercase tracking-[0.35em] text-slate-400 mb-6 text-center">
            SELECT CLIENTS
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 stagger-children">
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-70 logo-hover">
              <Image
                src="/spotify-logo-new.png"
                alt="Spotify"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain grayscale"
              />
            </div>
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-70 logo-hover">
              <Image
                src="/sodastream-logo.svg"
                alt="SodaStream"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain grayscale"
              />
            </div>
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-70 logo-hover">
              <Image
                src="/pepsi-logo.svg"
                alt="Pepsi"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain grayscale"
              />
            </div>
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-70 logo-hover">
              <Image
                src="/budweiser-logo.svg"
                alt="Budweiser"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain grayscale"
              />
            </div>
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-70 logo-hover">
              <Image
                src="/perrier-logo.svg"
                alt="Perrier"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain grayscale"
              />
            </div>
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-70 logo-hover">
              <Image
                src="/checkpoint-logo.svg"
                alt="Check Point"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain grayscale invert brightness-125"
              />
            </div>
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-100 logo-hover">
              <Image
                src="/reebok-logo.png"
                alt="Reebok"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain invert brightness-110"
              />
            </div>
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-70 logo-hover">
              <Image
                src="/heineken-logo.svg"
                alt="Heineken"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain grayscale"
              />
            </div>
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-70 logo-hover">
              <Image
                src="/caesarstone-logo.png"
                alt="Caesarstone"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain grayscale"
              />
            </div>
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-70 logo-hover">
              <Image
                src="/mutti-logo.png"
                alt="Mutti"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain grayscale"
              />
            </div>
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-70 logo-hover">
              <Image
                src="/lumenis-logo.svg"
                alt="Lumenis"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain grayscale"
              />
            </div>
            <div className="reveal relative h-12 md:h-14 w-[120px] sm:w-[140px] md:w-[160px] opacity-100 logo-hover">
              <Image
                src="/playtika-logo.svg"
                alt="Playtika"
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 250px, 200px"
                className="object-contain grayscale invert brightness-125"
              />
            </div>
          </div>
        </div>
      </section>

      <main id="main" className="bg-slate-950">
        {/* WORK Section Header */}
        <div className="border-t border-slate-800 py-24 md:py-32">
          <div className="max-w-[2000px] mx-auto px-8 md:px-12 lg:px-16">
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="reveal text-xs uppercase tracking-[0.4em] text-slate-500 mb-6">
                  Etay Naor
                </div>
                <h2 id="work" className="reveal text-[12vw] md:text-[14vw] lg:text-[16vw] font-bold leading-[0.85] tracking-tighter">
                  Selected Work
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* CASE STUDIES - Dark Editorial Style */}
        {CASE_STUDIES.map((project, index) => (
          <section
            key={project.id}
            className="relative border-t border-slate-800 py-20 md:py-28 lg:py-36"
          >
            {/* Section Glow */}
            <div 
              className="section-glow" 
              style={{ 
                top: '20%', 
                left: index % 2 === 0 ? '-10%' : 'auto',
                right: index % 2 === 1 ? '-10%' : 'auto'
              }} 
              aria-hidden="true" 
            />
            
            <div className="max-w-[2000px] mx-auto px-8 md:px-12 lg:px-16">
              {/* Project Header */}
              <div className="reveal flex items-center justify-between mb-12 md:mb-16">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="text-5xl md:text-6xl font-bold text-slate-800">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="h-12 w-px bg-slate-800" />
                  <div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-2">
                      {project.title}
                    </h3>
                    <div className="text-sm uppercase tracking-[0.3em] text-slate-500">
                      {project.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              {project.artifacts && project.artifacts.length > 0 && (
                <div className="reveal-scale case-image-container relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] mb-16 md:mb-20 rounded-xl overflow-hidden">
                  <Image
                    src={project.artifacts[0].src}
                    alt={project.artifacts[0].alt}
                    fill
                    sizes="(min-width: 1024px) 1800px, 100vw"
                    className="object-cover case-image"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                </div>
              )}

              {/* Summary */}
              <div className="reveal mb-16 md:mb-20">
                <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-slate-300 max-w-4xl">
                  {project.summary}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-3 gap-12 md:gap-16 lg:gap-20 stagger-children">
                {/* Brief */}
                <div className="reveal card-glow bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-orange-500 rounded-full" />
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-medium">
                      BRIEF
                    </div>
                  </div>
                  <p className="text-base md:text-lg leading-relaxed text-slate-300">
                    {project.problem}
                  </p>
                </div>

                {/* Approach */}
                <div className="reveal card-glow bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-orange-500 rounded-full" />
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-medium">
                      APPROACH
                    </div>
                  </div>
                  <ul className="space-y-4 text-base md:text-lg leading-relaxed text-slate-300">
                    {project.approach.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-orange-500 mt-1">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div className="reveal card-glow bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-orange-500 rounded-full" />
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-400 font-medium">
                      OUTCOME
                    </div>
                  </div>
                  <ul className="space-y-4 text-base md:text-lg leading-relaxed text-slate-300">
                    {project.outcome.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-orange-500">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ABOUT */}
        <section id="about" className="border-t border-slate-800 py-24 md:py-32 lg:py-40">
          <div className="max-w-[2000px] mx-auto px-8 md:px-12 lg:px-16">
            <h2 className="reveal text-[12vw] md:text-[14vw] lg:text-[16vw] font-bold leading-[0.85] tracking-tighter mb-20 md:mb-28">
              ABOUT
            </h2>

            <div className="space-y-12 max-w-3xl stagger-children">
              <div className="reveal card-glow bg-slate-900/50 border border-slate-800 rounded-xl p-8 md:p-10">
                <div className="text-xs uppercase tracking-[0.3em] text-orange-500 font-medium mb-4">
                  NOW
                </div>
                <p className="text-xl md:text-2xl leading-relaxed text-slate-200">
                  Head of Marketing and Strategy, Allenby Concept House
                </p>
              </div>

              <div className="reveal card-glow bg-slate-900/50 border border-slate-800 rounded-xl p-8 md:p-10">
                <div className="text-xs uppercase tracking-[0.3em] text-orange-500 font-medium mb-4">
                  EARLIER
                </div>
                <p className="text-xl md:text-2xl leading-relaxed text-slate-200">
                  Co-founder, VC-backed viral media analytics startup · political campaigns and human-rights advocacy · journalism
                </p>
              </div>

              <div className="reveal card-glow bg-slate-900/50 border border-slate-800 rounded-xl p-8 md:p-10">
                <div className="text-xs uppercase tracking-[0.3em] text-orange-500 font-medium mb-4">
                  APPROACH
                </div>
                <p className="text-xl md:text-2xl leading-relaxed text-slate-200">
                  Find the "aha" · design the system · move fast · lead from the work
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative border-t border-slate-800 py-24 md:py-32 lg:py-40 overflow-hidden">
          {/* Contact Glow */}
          <div className="contact-glow" aria-hidden="true" />
          
          <div className="relative z-10 max-w-[2000px] mx-auto px-8 md:px-12 lg:px-16">
            <div className="reveal text-xs uppercase tracking-[0.4em] text-slate-500 mb-8">
              GET IN TOUCH
            </div>
            <h2 className="reveal text-[12vw] md:text-[14vw] lg:text-[16vw] font-bold leading-[0.85] tracking-tighter mb-16">
              LET'S<br />TALK
            </h2>
            <div className="reveal flex flex-col md:flex-row md:items-center gap-8">
              <a
                href="mailto:etay@etaynaor.com"
                className="email-link text-3xl md:text-5xl lg:text-6xl font-light text-orange-500 hover:text-orange-400 transition-colors"
              >
                etay@etaynaor.com
              </a>
              <span className="text-4xl text-slate-700">→</span>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-10">
        <div className="max-w-[2000px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="reveal flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs uppercase tracking-[0.3em] text-slate-600">
            <div>© {new Date().getFullYear()} ETAY NAOR — ALL RIGHTS RESERVED</div>
            <div className="flex gap-6">
              <span>BERLIN</span>
              <span>·</span>
              <span>STRATEGY & CREATIVE</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
