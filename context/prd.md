# Portfolio PRD — Etay Naor (Single-Page)
Version: v1.0 • Owner: Etay Naor • Hosting: Vercel (private-by-convention)

## 1) Purpose & Outcome
Build a single, elegant one-pager that signals “creative strategist / executive,” showcases a handful of high-impact case studies, and makes it effortless to contact Etay.

Primary outcome: viewers quickly understand Etay’s value and email him.  
Secondary outcome: a shareable, private link (not indexed by search).

## 2) Audience & Top Journeys
- Hiring managers, founders, senior partners.
- Referred viewers who received the link directly.

Journeys:
1) Land → scan hero → skim 3–4 works → open 1–2 details → Contact.  
2) Land → skim About signals (clients/roles) → Contact.

## 3) Non-Goals
- No SEO growth or blog/CMS.  
- No analytics/trackers by default.  
- No multi-page routing for case studies.

## 4) Information Architecture (one page)
Anchored sections:
- **#intro** — short bio, optional:headshot.
- **#work** — 4–8 CaseStudyCard items. Each expands inline to reveal details.
- **#about** — Short background;
- **#contact** — Single clear CTA (mailto).

Global:
- **Header** (logo/name + anchor nav; mobile drawer).  
- **Footer** (email, small legal note).

## 5) Content Requirements
### 5.1 Hero (#intro)
- Headline ≤ 10 words (role/value).
- Subline ≤ 20 words (strategy/creative leadership/outcomes).
- Primary CTA: `mailto:etaynaor@gmail.com` (button).

### 5.2 Work (#work)
Each CaseStudyCard includes:
- Title (project/company) • Role • Year  
- One-line outcome (concise impact)  
- **Inline details** (accessible disclosure):
  - Problem (1–2 sentences)
  - Approach (2–4 bullets)
  - Outcome (2–3 bullets with metrics or crisp qualitative results)
  - Artifacts (optional links/images with alt text)


### 5.3 About (#about)
- 1–2 paragraph bio emphasizing strategic/exec lens.

### 5.4 Contact (#contact)
- Single CTA (mailto). 

## 6) Tone & Visual Direction
- **Vibe:** premium, calm, confident, minimal.  
- **Type:** legible sans; generous line-height; restrained letter-spacing.  
- **Spacing:** disciplined 8px rhythm; generous whitespace.  
- **Color:** ink/paper base + one subtle accent (avoid low-contrast greys for body text).  
- **Motion:** subtle micro-interactions; respect `prefers-reduced-motion`.

(See `/context/design-principles.md` and `/context/style-guide.md`.)

## 7) Functional Requirements
- Single-page anchor nav (smooth, accessible scroll).
- CaseStudyCard disclosure:
  - Keyboard reachable; Enter/Space toggles; proper ARIA.
  - Decision: either one-open-at-a-time or allow multiple (document which).
- Mobile nav drawer with focus trap; ESC/overlay closes.
- All images via `next/image` with explicit `alt`.
- Contact CTA uses `mailto:` (subject prefill optional).

## 8) Privacy / “Not for SEO”
- Add `<meta name="robots" content="noindex, nofollow">` in the page head.
- `/public/robots.txt` content:
    User-agent: *
    Disallow: /
- No analytics/third-party scripts by default.
- Vercel preview links are acceptable to share privately.

## 9) Accessibility & Performance
- Landmarks: `header`, `main`, `nav`, `section`, `footer`.
- Visible focus styles on all interactive elements.
- Contrast target ≥ 4.5:1 where practical.
- Keyboard navigation covers header, nav, disclosures, drawer, CTA.
- Performance guidelines (desktop fast network):
  - LCP ≤ 2.5s
  - CLS ≤ 0.1
  - Keep bundle minimal; avoid large unused libs.

## 10) Technical Constraints
- Next.js (app router if present).
- Tailwind utilities; follow tokens from `/context/style-guide.md`.
- No new dependencies without approval.
- No secrets in repo; env vars not required for MVP.

## 11) Acceptance Criteria (authoritative)
- One page includes **#intro, #work, #about, #contact** with working anchor nav.
- **Hero:** H1 readable (≥ 28px desktop, ≥ 20px mobile); primary CTA visible in first viewport.
- **Work:** at least 4 case cards; disclosure pattern works with keyboard + ARIA.
- **About:** short bio present; logos (if used) responsive with descriptive alt.
- **Contact:** working `mailto:` CTA.
- **Responsiveness:** no horizontal scroll; layout holds at ~390px and ≥1280px.
- **Accessibility:** keyboard traversal works; visible focus; alt text present.
- **Privacy:** meta `noindex, nofollow` + blocking `robots.txt` deployed.
- **Console/Network:** zero runtime errors; no failed requests.
- **Performance:** no obvious CLS; images responsive/optimized.

## 12) Validation & Review
- Operational workflow, Playwright checks, and slash commands are defined in **CLAUDE.md**.  