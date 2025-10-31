"use client"
import Image from 'next/image'
import type { CaseStudy } from '@/data/case-studies'

type Props = {
  data: CaseStudy
}

export default function CaseStudyCard({ data }: Props) {
  return (
    <article className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Image - Large and Immersive */}
        {data.artifacts && data.artifacts.length > 0 && (
          <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden mb-12 md:mb-16 shadow-lg">
            <Image
              src={data.artifacts[0].src}
              alt={data.artifacts[0].alt}
              fill
              sizes="(min-width: 1024px) 1280px, 100vw"
              className="object-cover"
              priority={data.id === 'sodastream'}
            />
          </div>
        )}

        {/* Title - Bold Editorial */}
        <div className="mb-8 md:mb-12">
          <h3 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-bold leading-[1.05] tracking-[-0.015em] text-brand-fg dark:text-slate-50">
            {data.title}
          </h3>
          <p className="mt-4 text-[1rem] md:text-[1.125rem] uppercase tracking-[0.15em] text-slate-600 dark:text-slate-400">
            {data.role}
          </p>
        </div>

        {/* Summary - Large Lede */}
        <div className="mb-12 md:mb-16">
          <p className="text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] leading-[1.5] text-brand-fg/85 dark:text-slate-300 max-w-4xl">
            {data.summary}
          </p>
        </div>

        {/* Content Grid - Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {/* Left Column: Brief + Approach */}
          <div className="space-y-12 md:space-y-16">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-medium mb-4">
                Brief
              </h4>
              <p className="text-[1.125rem] md:text-[1.25rem] leading-[1.75] text-brand-fg/90 dark:text-slate-200">
                {data.problem}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-medium mb-4">
                Approach
              </h4>
              <ul className="space-y-4 text-[1.125rem] md:text-[1.25rem] leading-[1.75] text-brand-fg/90 dark:text-slate-200 border-l-2 border-slate-300 dark:border-slate-700 pl-6">
                {data.approach.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Outcome */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-medium mb-4">
              Outcome
            </h4>
            <ul className="space-y-4 text-[1.125rem] md:text-[1.25rem] leading-[1.75] text-brand-fg/90 dark:text-slate-200">
              {data.outcome.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-[10px] h-[8px] w-[8px] rounded-full bg-brand-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}
