# AGENTS.md — Etay Portfolio (Codex + Playwright MCP)

## Sources of Truth (always load and honor)
- PRD → `./context/prd.md`
- Design Principles → `./context/design-principles.md`
- Style Guide → `./context/style-guide.md`

When reviewing or proposing fixes, compare against **PRD §11** + the two design docs above. Do not ship changes that violate them.

## Playwright Defaults
- Desktop: viewport `{ width: 1440, height: 900 }`, `fullPage: true`
- Mobile: emulate “iPhone 14” (390×844), `fullPage: false`
- Save screenshots under `public/refshots/<slug>/`

---

## Task: Reference Scout (visual capture with logs)
Goal: For each URL in `./context/reference-urls.txt`, capture **desktop full-page** and **mobile** screenshots, collect DOM and logs, and save a summary JSON.

Steps per URL:
1) `playwright.browser_navigate` (wait for network idle). Dismiss cookie wall if possible.
2) `playwright.browser_take_screenshot` → `public/refshots/<slug>/desktop.jpg` (jpeg, quality≈80, fullPage).
3) Mobile shot (iPhone 14) → `public/refshots/<slug>/mobile.jpg`.
4) `playwright.browser_snapshot` → capture `header`, first `h1`, first `p`, first `button`, and one nav/hero link.
5) `playwright.browser_console_messages` + `..._network_requests` → error/warn/failed counts.
6) Write `data/reference_analysis/<slug>.json` with: url, title (if available), paths, console/network counts, any easy type/palette notes.
7) Maintain `data/reference_analysis/index.json` with `{slug,url,title}` (dedupe by slug).

---

## Task: Reference Synthesis (WRITE ./context/style-guide.md)

Goal
- Read the captured reference data in `data/reference_analysis/*.json`, derive a unified visual system, and **write a new `./context/style-guide.md`** that the project will follow. Then print a short diff summary and (optionally) trigger a visual review.

Inputs
- Reference JSONs: `data/reference_analysis/*.json`
- PRD: `./context/prd.md` (acceptance criteria)
- Principles: `./context/design-principles.md`
- (If an old style guide exists) `./context/style-guide.md`

Rules
- Prefer patterns confirmed by multiple references; keep the portfolio’s “executive / premium / minimal” vibe.
- Stay consistent with PRD §11 and design-principles (contrast, motion restraint, a11y).
- No new dependencies or secret keys without explicit approval.

Write Steps
1) Load all `data/reference_analysis/*.json` and the three context docs above.
2) Propose a **Style Direction** and tokens (palette, typography, spacing, radii, shadows, motion), plus key component specs (Buttons, CaseStudyCard, Nav, Section headings).
3) **Back up any existing style guide** (if present) to `./context/.archive/style-guide-YYYYMMDD-HHMM.md` (create the `.archive/` folder if missing).
4) **Write** the new guide to `./context/style-guide.md` using the *exact structure* in **Format** below.
5) Echo the full file content in the reply, then print a minimal git diff snippet and a 1-line conventional commit message (do not auto-commit unless asked).
6) Optional: run the **Design Reviewer (Visual)** task with the new tokens to validate screenshots + logs; report any regressions and propose one smallest fix.

Format (the file you must write to ./context/style-guide.md)
- Title: “Etay Portfolio — Style Guide”
- Version line with date/time
- 1) Brand Essence & Tone (3–5 adjectives + short paragraph)
- 2) Color Palette
  - Base (bg, surface, foreground)
  - Accent (primary, secondary if used)
  - States (success, warning, danger if needed)
  - Hex values and Tailwind color keys to use
  - Contrast notes (aim ≥ 4.5:1 for body text)
- 3) Typography
  - Font stacks (primary, mono if needed)
  - Base size/leading (mobile/desktop)
  - Scale (H1–H6 in rem with recommended tracking)
  - Paragraph width target (~60–70 CPL)
- 4) Layout & Rhythm
  - Container max-widths (e.g., 640 / 768 / 1024 / 1280 / 1440)
  - Spacing scale (e.g., 4/8/12/16/24/32…)
  - Radii (xs/sm/md/lg) and shadows
- 5) Motion
  - Reduce heavy motion; keep durations and easings; respect prefers-reduced-motion
- 6) Components
  - Button (primary/secondary/ghost): sizes, padding, radii, focus styles
  - CaseStudyCard (disclosure): header text sizes, body, hover/focus, expanded styles
  - Navigation (desktop + mobile drawer): sizes, gaps, focus trap rules
  - Section headings: spacing above/below, subheading style
- 7) Accessibility & Performance
  - Focus states, outline rules, min touch targets (44×44), alt-text, image usage (next/image), CLS guardrails
- 8) Tailwind Mapping (ready to paste)
  - A code block with `tailwind.config` `theme` overrides: `colors`, `fontFamily`, `fontSize` scale, `borderRadius`, `boxShadow`, plus example utility aliases if desired
- 9) Usage Examples
  - Example class strings for hero H1, body, buttons, section wrappers
- 10) Changelog
  - Keep a short dated entry of what changed and why

Output (in your chat reply)
- “Style Direction” (1 paragraph)
- **Full contents** of the newly written `./context/style-guide.md`
- A minimal **git diff** (old file → new file, or creation diff if none)
- A **1-line conventional commit** suggestion, e.g., `docs(style): write unified style-guide from reference synthesis`
- If you ran Design Reviewer afterward, include a short verification note with paths to screenshots

Notes
- Keep screenshots ≤ ~1–1.5 MB each (JPEG quality 70–85). If fidelity is needed, add focused crops (hero/CTA).
- If token choices conflict with PRD §11 or design-principles, call it out and choose the conservative option.

---

## Agent: Design Reviewer (visual, interactive, evidence-based)
**Persona**: principal product designer + FE; values clarity, accessibility, small atomic diffs, and evidence.

**Goal**: Review `http://localhost:3000` **visually** (not just code) and propose **one smallest change**, then verify with re-snapshot.

**Process (mirrors your Claude agent):**
- **Phase 0 – Prep**
  - Load **PRD §11**, **design-principles.md**, **style-guide.md**.
  - If PR context exists, skim diff to scope.

- **Phase 1 – Interaction & Flow**
  - `playwright.browser_navigate` to `http://localhost:3000` (wait idle).
  - Exercise primary flows (hover/click/keyboard) and note perceived perf.

- **Phase 2 – Responsive Screens**
  - Desktop full-page (1440×900) → `public/refshots/latest/desktop.jpg`.
  - Mobile iPhone 14 → `public/refshots/latest/mobile.jpg`.

- **Phase 3 – DOM + Logs**
  - `playwright.browser_snapshot` for `header, #intro, #work, #about, #contact` (include computed classes when useful).
  - `playwright.browser_console_messages` + `..._network_requests` summary.

- **Phase 4 – Compare vs Standards**
  - Judge against **PRD §11** + **Design Principles** + **Style Guide**.

- **Phase 5 – Report (Markdown only)**
  - **Summary** (positive opening)
  - **Strengths**
  - **Blockers** (with screenshot/selector/violation)
  - **High-Priority**
  - **Medium / Suggestions**
  - **Nitpicks** (prefix “Nit:”)
  - **A11y & Performance Notes** (focus states, tab order, ARIA, alt, CLS, asset weight)

- **Phase 6 – One Atomic Fix**
  - Propose **ONE** smallest fix that most improves compliance.
  - Output **full file contents** for any changed/added file.
  - Include a **git diff** and a **1-line conventional commit**.
  - Re-run screenshots and mention before/after.

**Triage labels**: [Blocker] / [High-Priority] / [Medium] / [Nit]

---

## Iteration Loop (run after each FE change)
1) Re-run **Design Reviewer** steps 0–6.
2) If criteria fail, propose **one smallest fix** and re-snapshot.
3) Keep diffs atomic; don’t add deps or secrets without explicit approval.