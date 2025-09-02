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
    <div className="bg-brand-bg text-brand-fg min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-brand-fg focus:text-brand-bg focus:px-3 focus:py-2">Skip to content</a>
      <Nav />

      {/* Intro / Hero */}
      <header id="intro" className="pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 py-8">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Creative Strategist</p>
            <h1 className="mt-4 text-h1 md:text-[3.75rem] font-semibold tracking-[-0.01em]">Clarity, momentum, and creative outcomes</h1>
            <p className="mt-6 text-body md:text-body-lg max-w-[65ch] text-brand-fg/80">
              I help founders and teams cut through: craft the story, design
              the plan, and ship the work that moves the needle.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a href="#work" className="inline-flex items-center justify-center rounded-lg bg-brand-primary text-white px-5 py-3 shadow-md hover:bg-blue-800 focus:outline-2 focus:outline-blue-700 focus:outline-offset-2">View Work</a>
              <a href="mailto:etaynaor@gmail.com" className="inline-flex items-center justify-center rounded-lg border border-slate-200 text-brand-fg px-5 py-3 hover:bg-slate-100 focus:outline-2 focus:outline-blue-700">Email Me</a>
            </div>
          </div>
          <div className="md:col-span-5 py-8 hidden md:flex md:justify-end">
            <div className="relative w-full max-w-[12rem] md:max-w-[14rem] aspect-[4/5] rounded-lg overflow-hidden border border-slate-200 bg-brand-surface mx-auto md:ml-0">
              <Image src="/etay-profile.jpg" alt="Etay Naor" fill sizes="(min-width: 768px) 24rem, 16rem" className="object-cover md:object-center md:scale-100 object-[center_35%] scale-150" priority />
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
        <section id="about" className="py-20 md:py-28 bg-white/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-semibold tracking-[-0.005em]">About</h2>
            <p className="mt-6 text-body md:text-body-lg max-w-[65ch]">
              I partner with teams to untangle positioning, shape strategy, and lead creative execution.
              Former campaigns and product work span consumer brands, startups, and public initiatives.
            </p>
            <p className="mt-4 text-body md:text-body-lg max-w-[65ch] text-brand-fg/80">
              I work hands-on with leadership to align message, medium, and execution — then ship at a high bar.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2 font-semibold tracking-[-0.005em]">Let’s talk</h2>
            <p className="mt-6 text-body md:text-body-lg text-brand-fg/80">Working on something interesting? I’m happy to take a look.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:etaynaor@gmail.com" className="inline-flex items-center justify-center rounded-lg bg-brand-primary text-white px-6 py-3 shadow-md hover:bg-blue-800 focus:outline-2 focus:outline-blue-700 focus:outline-offset-2">Email Me</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-slate-600 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Etay Naor</span>
          <span className="hidden sm:block">Creative Strategist</span>
        </div>
      </footer>
    </div>
  )
}
