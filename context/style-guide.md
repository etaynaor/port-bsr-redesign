Etay Portfolio — Style Guide
Version: 2025-09-02 21:40

1) Brand Essence & Tone
- Adjectives: executive, calm, precise, minimal, confident
From the screenshots: most references read as “ink on paper” with disciplined whitespace, plus a single assertive accent. We keep a clear typographic hierarchy, avoid decorative clutter, and use subtle motion only to clarify interaction. Visual quiet, confident craft.

2) Color Palette
- Base:
  - bg: #FAFAF8 (paper)
  - surface: #FFFFFF (cards)
  - foreground: #0F172A (ink; slate-900)
- Accent:
  - primary: #1D4ED8 (blue-700) for CTAs, focus, active states
  - secondary: #6D28D9 (violet-700, optional for highlights/case tag)
- States:
  - success: #16A34A (green-600)
  - warning: #CA8A04 (amber-600)
  - danger: #DC2626 (red-600)
- Tailwind keys: slate-50/100/900, blue-700 primary, violet-700 optional, green-600, amber-600, red-600.
- Contrast: Maintain ≥ 4.5:1 for body on bg/surface; prefer pure or near‑pure ink (#0F172A) for long text. Accents must pass contrast when used on surface.

3) Typography
- Font stacks:
  - Primary: Inter var, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif
  - Mono (optional): ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
- Base sizes / leading (reflecting generous reading rhythm):
  - Mobile base: 16px / 1.65
  - Desktop base: 18px / 1.65
- Scale (rem; tracking in em):
  - H1: 3.25rem / 1.1, tracking -0.01em (hero may reach 3.75–4.0rem)
  - H2: 2.25rem / 1.2, tracking -0.005em
  - H3: 1.75rem / 1.3
  - H4: 1.5rem / 1.35
  - H5: 1.25rem / 1.45
  - H6: 1.125rem / 1.5
  - Body: 1.0rem / 1.65 (desktop: 1.125rem)
- Paragraph width: 60–70 CPL; use `max-w-prose` or `max-w-[65ch]`.

4) Layout & Rhythm
- Containers: 640 / 768 / 1024 / 1280 / 1440; default content max 1024–1280. Hero and gallery sections may use 1440.
- Spacing (8px rhythm): 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128.
- Radii: xs 2px, sm 4px, md 8px, lg 12px (default), full for pills.
- Shadows: sm (0 1px 2px / 5%), md (0 4px 12px / 8%), lg (0 8px 24px / 10%). Keep shadows subtle.

5) Motion
- Durations: 150–220ms (hover/focus), 220–320ms (drawer/disclosure).
- Easing: ease-out in, ease-in out; no springy overshoot by default.
- Respect `prefers-reduced-motion`: turn off non-essential transitions; rely on color/weight.
- No scroll-jacking; avoid heavy parallax. Keep interactions snappy.

6) Components
- Button (primary / secondary / ghost)
  - Sizes: sm 28/12px; md 36/14px; lg 44/16px; min target 44×44.
  - Padding: sm 8x12, md 10x16, lg 12x20; Radius lg (12px).
  - Primary: bg #1D4ED8, text-white; hover #1E40AF; focus 2px outline with `outline-blue-700` and offset 2px.
  - Secondary: bg surface; border slate-200; text slate-900; hover slate-100; focus as primary.
  - Ghost: transparent; text slate-900; hover slate-100; used for tertiary actions.
  - Disabled: 60% opacity; remove interactive shadows.

- CaseStudyCard (disclosure)
  - Header: Title 1.25–1.5rem; meta (role • year) 0.875rem slate-500.
  - Body: compact summary, `max-w-[65ch]`.
  - Hover: md shadow, surface from #FFF to slate-50.
  - Focus: 2px outline primary; Enter/Space toggles.
  - Expanded: border slate-200, radius lg, inner spacing 24–32.
  - Behavior: one-open-at-a-time (close others on open) for scanning. Use `aria-expanded`, `aria-controls`, `id` on content.

- Navigation (desktop + mobile drawer)
  - Desktop: height 64; name/mark left; anchors right with 24–32 gap.
  - Mobile drawer: icon button at right; slides in, traps focus; ESC/overlay closes. Provide first/last focus sentinels.
  - Link states: underline offset 2px on hover; active state by weight or small rule.
  - Reduced motion: fade in place without slide.

- Section headings
  - Spacing: 48 above / 24 below (mobile); 64 / 32 (desktop).
  - Subheading: 0.875rem, slate-500, tracking wide; optional divider below.

7) Accessibility & Performance
- Focus: visible outlines on all interactive elements (never remove without replacement).
- Touch targets: ≥ 44×44; spacing between tap targets ≥ 8px.
- Alt text: descriptive; decorative images `alt=""`.
- Images: use `next/image` with width/height set; avoid layout shift. Provide blur placeholders for large media.
- Contrast: body ≥ 4.5:1; heading ≥ 3:1 where size/weight allow.
- Runtime hygiene: zero console errors; no failed network requests.

8) Tailwind Mapping (ready to paste)
```js
// tailwind.config.js (excerpt)
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FAFAF8',
          surface: '#FFFFFF',
          fg: '#0F172A',
          primary: '#1D4ED8',
          secondary: '#6D28D9'
        },
        state: {
          success: '#16A34A',
          warning: '#CA8A04',
          danger:  '#DC2626'
        }
      },
      fontFamily: {
        sans: [
          'Inter var','ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Helvetica Neue','Arial','Noto Sans','sans-serif'
        ],
        mono: [
          'ui-monospace','SFMono-Regular','Menlo','Monaco','Consolas','Liberation Mono','Courier New','monospace'
        ]
      },
      fontSize: {
        h1: ['3.25rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        h2: ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.005em' }],
        h3: ['1.75rem', { lineHeight: '1.3' }],
        h4: ['1.5rem', { lineHeight: '1.35' }],
        h5: ['1.25rem', { lineHeight: '1.45' }],
        h6: ['1.125rem', { lineHeight: '1.5' }],
        body: ['1rem', { lineHeight: '1.65' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }]
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px'
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 12px rgba(0,0,0,0.08)',
        lg: '0 8px 24px rgba(0,0,0,0.10)'
      }
    }
  }
}
```

9) Usage Examples
- Hero H1: `text-h1 md:text-[3.75rem] font-semibold tracking-[-0.01em] text-brand-fg`
- Body: `text-body md:text-body-lg text-brand-fg/90`
- Primary Button: `inline-flex items-center justify-center rounded-lg bg-brand-primary text-white px-5 py-3 shadow-md hover:bg-blue-800 focus:outline-2 focus:outline-blue-700 focus:outline-offset-2 transition-colors`
- Secondary Button: `inline-flex items-center justify-center rounded-lg bg-brand-surface text-brand-fg px-5 py-3 border border-slate-200 hover:bg-slate-100 focus:outline-2 focus:outline-blue-700`
- Ghost Button: `inline-flex items-center justify-center rounded-lg text-brand-fg px-4 py-2 hover:bg-slate-100 focus:outline-2 focus:outline-blue-700`
- Section wrapper: `mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl`
- Prose content: `max-w-[65ch] text-balance leading-relaxed`

10) Changelog
- 2025-09-02: Revised based on visual refshots. Majority light-base with ink typography; restrained single accent (blue). Optional violet secondary for tags. Aligns with PRD §11 and design principles (contrast, motion restraint, a11y).
