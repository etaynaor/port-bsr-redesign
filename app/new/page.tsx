"use client"
import Image from 'next/image'
import Nav from '@/components/site/Nav'
import CaseStudyCard from '@/components/site/CaseStudyCard'
import { CASE_STUDIES } from '@/data/case-studies'
import { useState } from 'react'

export default function NewPortfolio() {
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id))

  return (
    <div data-theme-root className="bg-brand-bg text-brand-fg dark:bg-slate-950 dark:text-slate-100 min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-brand-fg focus:text-brand-bg focus:px-3 focus:py-2">Skip to content</a>
      <Nav />

      {/* Intro / Hero */}
      <header id="intro" className="pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 py-8">
            <h1 className="text-h1 md:text-[3.75rem] font-semibold tracking-[-0.01em]">Etay Naor</h1>
            <p className="mt-4 text-body md:text-body-lg max-w-[65ch] text-brand-fg/80 dark:text-slate-300">
              <span>Partner &amp; Lead Strategist, Allenby Concept House.</span>
              <br className="hidden md:block" />
              <span>Based in Berlin.</span>
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a href="#work" className="inline-flex items-center justify-center rounded-lg bg-brand-primary text-white px-5 py-3 shadow-md hover:bg-blue-800 focus:outline-2 focus:outline-blue-700 focus:outline-offset-2">Selected Work</a>
              <a href="mailto:etay@etaynaor.com" className="inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-brand-fg dark:text-slate-100 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-2 focus:outline-blue-700">Contact</a>
            </div>
          </div>
          <div className="md:col-span-5 py-8 hidden md:flex md:justify-end">
            <div className="relative w-full max-w-[12rem] md:max-w-[16rem] aspect-[4/5] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-brand-surface dark:bg-slate-900 mx-auto md:ml-0 md:-mt-8 md:-mr-6 md:shadow-lg md:ring-1 md:ring-black/5 dark:md:ring-white/10">
              <Image
                src="/etay-profile.jpg"
                alt="Etay Naor"
                fill
                sizes="(min-width: 768px) 24rem, 16rem"
                className="object-cover object-[center_35%] scale-150 md:scale-110 md:object-[center_30%]"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Work */}
        <section id="work" className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-semibold tracking-[-0.005em] text-center">Selected Work</h2>
            <div className="mt-12 md:mt-16 grid grid-cols-1 gap-6 md:gap-8">
              {CASE_STUDIES.map(cs => (
                <CaseStudyCard key={cs.id} data={cs} open={openId === cs.id} onToggle={() => toggle(cs.id)} />
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 md:py-28 bg-white/60 dark:bg-slate-900/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-semibold tracking-[-0.005em]">About Me</h2>
            {/* Mobile-only portrait */}
            <div className="md:hidden mt-6 flex justify-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                <Image
                  src="/etay-profile.jpg"
                  alt="Etay Naor"
                  fill
                  sizes="96px"
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="mt-6 space-y-6 text-body md:text-body-lg max-w-[65ch]">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">Now</div>
                <p className="mt-2">Partner &amp; Lead Strategist, Allenby Concept House</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">Earlier</div>
                <p className="mt-2">Co-founder, VC-backed viral media analytics startup · political campaigns and human-rights advocacy · journalism</p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400">Approach</div>
                <p className="mt-2">Find the “aha” · design the system · move fast · lead from the work</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold tracking-[-0.005em]">Contact me</h2>
            <p className="mt-6 text-body md:text-body-lg text-brand-fg/80 dark:text-slate-300">Always happy to hear from you</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:etay@etaynaor.com" className="inline-flex items-center justify-center rounded-lg bg-brand-primary text-white px-6 py-3 shadow-md hover:bg-blue-800 focus:outline-2 focus:outline-blue-700 focus:outline-offset-2">Send a message</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-slate-600 dark:text-slate-400 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Etay Naor</span>
          <a href="mailto:etay@etaynaor.com" className="hidden sm:block hover:underline underline-offset-2">Email</a>
        </div>
      </footer>
    </div>
  )
}
