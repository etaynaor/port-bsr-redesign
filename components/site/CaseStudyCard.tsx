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

  return (
    <article
      className="rounded-lg border border-slate-200 bg-brand-surface text-brand-fg p-6 md:p-8 hover:bg-slate-50/60 transition-colors cursor-pointer"
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
          <h3 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight">{data.title}</h3>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-600">{data.role}</p>
          <p className="hidden md:block text-body mt-2 max-w-[65ch] text-brand-fg/85">{data.summary}</p>
        </div>
        <button
          className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 focus:outline-2 focus:outline-blue-700"
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
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Problem</div>
              <p className="mt-2 text-body leading-relaxed max-w-[65ch]">{data.problem}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Approach</div>
              <ul className="mt-2 space-y-2 text-body leading-relaxed border-l border-slate-200 pl-4">
                {data.approach.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Outcome</div>
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
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Problem</div>
              <p className="mt-2 text-[0.95rem] leading-7">{data.problem}</p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Approach</div>
              <ul className="mt-2 space-y-1.5 text-[0.95rem] leading-7 border-l border-slate-200 pl-3">
                {(mobileExpanded ? data.approach : data.approach.slice(0,3)).map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Outcome</div>
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
                className="inline-flex rounded-lg border border-slate-200 px-3 py-2 text-sm text-brand-fg hover:bg-slate-50 focus:outline-2 focus:outline-blue-700"
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
                    className="w-full h-auto rounded-md border border-slate-200"
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
