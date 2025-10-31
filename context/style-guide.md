Etay Portfolio — Style Guide
Version: 2025-09-02 21:40

1) Brand Essence & Tone
- Adjectives: bold, editorial, sophisticated, confident, impactful
From the redesign direction: editorial magazine style with dramatic typography, generous whitespace, and strong visual hierarchy. We embrace large-scale type, immersive imagery, and sophisticated layout patterns. Each section commands attention while maintaining professional polish. Visual impact, confident craft.

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
  - Hero Display: 6.0–8.0rem / 0.95, tracking -0.02em (main hero names, ultra-large)
  - H1: 3.25–4.5rem / 1.05, tracking -0.015em (section headings, large emphasis)
  - H2: 2.5–3.0rem / 1.15, tracking -0.01em (subsections)
  - H3: 1.75–2.0rem / 1.25, tracking -0.005em
  - H4: 1.5rem / 1.35
  - H5: 1.25rem / 1.45
  - H6: 1.125rem / 1.5
  - Body: 1.0rem / 1.65 (desktop: 1.125–1.25rem / 1.75)
- Paragraph width: 60–70 CPL; use `max-w-prose` or `max-w-[65ch]`.

4) Layout & Rhythm
- Containers: 640 / 768 / 1024 / 1280 / 1440; default content max 1280. Hero and work sections may use full 1440 or beyond for editorial impact.
- Spacing (8px rhythm): 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 256 (editorial uses larger gaps).
- Between major sections: 96–160px (mobile), 128–256px (desktop) for breathing room.
- Radii: xs 2px, sm 4px, md 8px, lg 12px (default), xl 16px, full for pills.
- Shadows: sm (0 1px 2px / 5%), md (0 4px 12px / 8%), lg (0 8px 24px / 10%). Keep shadows subtle for sophistication.

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

- CaseStudyCard (full editorial layout)
  - Each case study is a distinct "chapter" section, always fully visible
  - Header: Title 2.5–3.5rem (bold, editorial), meta (role) 1.0rem slate-600.
  - Hero image: Large, immersive (800–1200px wide), high quality
  - Content layout: Two-column or stacked, generous spacing (48–96px vertical between blocks)
  - Typography: Body 1.125–1.25rem for comfortable long-form reading
  - Visual separators: 128–256px gap between case studies, optional subtle divider line
  - No accordion/disclosure: all content always visible for editorial presentation

- Navigation (desktop + mobile drawer)
  - Desktop: height 64; name/mark left; anchors right with 24–32 gap.
  - Mobile drawer: icon button at right; slides in, traps focus; ESC/overlay closes. Provide first/last focus sentinels.
  - Link states: underline offset 2px on hover; active state by weight or small rule.
  - Reduced motion: fade in place without slide.

- Section headings
  - Spacing: 64–96 above / 32–48 below (mobile); 96–160 / 48–64 (desktop) for editorial breathing room.
  - Main headings: 3.0–4.5rem, bold, strong presence
  - Subheading: 0.875–1.0rem, slate-500/600, tracking wide; optional subtle divider below.

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
        'hero-display': ['6rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        h1: ['3.25rem', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        h2: ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        h3: ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.005em' }],
        h4: ['1.5rem', { lineHeight: '1.35' }],
        h5: ['1.25rem', { lineHeight: '1.45' }],
        h6: ['1.125rem', { lineHeight: '1.5' }],
        body: ['1rem', { lineHeight: '1.65' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        'body-xl': ['1.25rem', { lineHeight: '1.75' }]
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
- Hero Display Name: `text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold tracking-[-0.02em] leading-[0.9] text-brand-fg`
- Section H1: `text-[2.5rem] md:text-[4rem] font-bold tracking-[-0.015em] text-brand-fg`
- Case Study Title: `text-[2rem] md:text-[3rem] font-bold tracking-[-0.01em] text-brand-fg`
- Body Editorial: `text-[1.125rem] md:text-[1.25rem] leading-[1.75] text-brand-fg/90`
- Body Standard: `text-body md:text-body-lg text-brand-fg/90`
- Primary Button: `inline-flex items-center justify-center rounded-lg bg-brand-primary text-white px-5 py-3 shadow-md hover:bg-blue-800 focus:outline-2 focus:outline-blue-700 focus:outline-offset-2 transition-colors`
- Section wrapper: `mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl`
- Prose content: `max-w-[65ch] text-balance leading-relaxed`
- Section spacing: `py-24 md:py-32 lg:py-40` (generous vertical rhythm)

10) Changelog
- 2025-10-29: Bold editorial redesign. Shifted from "calm minimal" to "bold editorial" aesthetic. Dramatically increased typography scale (hero 6-8rem), expanded spacing rhythm (up to 256px), removed accordion pattern for always-visible case studies. Editorial magazine layout with immersive imagery and generous whitespace.
- 2025-09-02: Revised based on visual refshots. Majority light-base with ink typography; restrained single accent (blue). Optional violet secondary for tags. Aligns with PRD §11 and design principles (contrast, motion restraint, a11y).
