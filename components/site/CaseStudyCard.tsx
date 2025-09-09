"use client"
import React, { useId } from 'react'
import Image from 'next/image'
import type { CaseStudy } from '@/data/case-studies'

type Props = {
  data: CaseStudy
  open: boolean
  onToggle: () => void
}

export default function CaseStudyCard({ data, open, onToggle }: Props) {
  const contentId = useId()
  const mobileContentId = useId()
  const [mobileExpanded, setMobileExpanded] = React.useState(false)
  const rootRef = React.useRef<HTMLElement | null>(null)

  // When a card opens on small screens, scroll its top into view below the fixed nav
  React.useEffect(() => {
    if (!open) return
    if (typeof window === 'undefined') return
    // Only apply on mobile (< md)
    if (window.innerWidth >= 768) return
    // Delay until layout settles
    requestAnimationFrame(() => {
      const el = rootRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const offset = 80 // approx nav height + margin
      const top = Math.max(0, window.scrollY + rect.top - offset)
      window.scrollTo({ top, behavior: 'smooth' })
    })
  }, [open])

  return (
    <article
      ref={rootRef}
      className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-brand-surface dark:bg-slate-900 text-brand-fg dark:text-slate-100 p-6 md:p-8 hover:bg-slate-50/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
      onClick={(e) => {
        const t = e.target as HTMLElement
        if (t.closest('a,button,[role="button"]')) return
        onToggle()
      }}
      aria-controls={contentId}
      aria-expanded={open}
    >
      <header
        className="flex items-start justify-between gap-6"
        
        
      >
        <div className="space-y-2">
          <h3 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight group-hover:underline underline-offset-2">{data.title}</h3>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-600">{data.role}</p>
          <p className="hidden md:block text-body mt-2 max-w-[65ch] text-brand-fg/85 dark:text-slate-300">{data.summary}</p>
        </div>
        <button
          className="shrink-0 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-sm text-brand-fg dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700 transition-colors focus:outline-2 focus:outline-blue-700"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={(e) => { e.stopPropagation(); onToggle() }}
        >
          {open ? 'Hide' : 'Details'}
        </button>
      </header>

      <section id={contentId} hidden={!open} className="mt-8">
        <div className="grid md:grid-cols-12 gap-8">
          {/* Desktop / tablet full details */}
          <div className="hidden md:block md:col-span-7 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Brief</div>
              <p className="mt-2 text-body leading-relaxed max-w-[65ch]">{data.problem}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Approach</div>
              <ul className="mt-2 space-y-2 text-body leading-relaxed border-l border-slate-200 dark:border-slate-800 pl-4">
                {data.approach.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Outcome</div>
              <ul className="mt-2 space-y-2 text-body leading-relaxed">
                {data.outcome.map((o, i) => (
                  <li key={i} className="flex gap-2"><span className="mt-[7px] h-[6px] w-[6px] rounded-full bg-brand-primary inline-block" />{o}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile compact details (truncated with Show more) */}
          <div className="md:hidden space-y-4" id={mobileContentId}>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Brief</div>
              <p className="mt-2 text-[0.95rem] leading-7">{data.problem}</p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Approach</div>
              <ul className="mt-2 space-y-1.5 text-[0.95rem] leading-7 border-l border-slate-200 pl-3">
                {(mobileExpanded ? data.approach : data.approach.slice(0,3)).map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Outcome</div>
              <ul className="mt-2 space-y-1.5 text-[0.95rem] leading-7">
                {(mobileExpanded ? data.outcome : data.outcome.slice(0,3)).map((o, i) => (
                  <li key={i} className="flex gap-2"><span className="mt-[7px] h-[6px] w-[6px] rounded-full bg-brand-primary inline-block" />{o}</li>
                ))}
              </ul>
            </div>
            {(data.approach.length > 3 || data.outcome.length > 3) && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setMobileExpanded(v => !v) }}
                className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm text-brand-fg dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-2 focus:outline-blue-700"
                aria-expanded={mobileExpanded}
                aria-controls={mobileContentId}
              >
                {mobileExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {data.artifacts && data.artifacts.length > 0 && (
            <div className="md:col-span-5 space-y-4">
              {data.artifacts.map((art, i) => (
                <div key={i} className="relative w-full h-auto">
                  <Image
                    src={art.src}
                    alt={art.alt}
                    width={900}
                    height={600}
                    sizes="(min-width: 768px) 28rem, 100vw"
                    className="w-full h-auto rounded-md border border-slate-200 dark:border-slate-800"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </article>
  )
}
