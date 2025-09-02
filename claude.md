# CLAUDE: Project Context — Etay Naor Single-Page Portfolio

Primary dev URL: http://localhost:3000
Hosting: Vercel (private by convention; not for SEO)

Context files:
- /context/design-principles.md
- /context/style-guide.md

## Purpose
A single, elegant, premium-feel page that communicates “creative strategist / executive.” One page only (no separate routes):
- Sections (anchor links): #intro, #work, #about, #contact
- Clean, restrained, responsive; minimal motion; strong typography
- Private by convention: enforce `noindex` + restrictive `robots.txt`

## Non-Goals
No SEO growth work, no blog/CMS, no analytics or third-party scripts unless explicitly approved.

## Privacy / Robots Requirements
- Every route/page must include `<meta name="robots" content="noindex, nofollow">`
- `/public/robots.txt` must disallow indexing (block major crawlers)
- Do **not** add analytics/trackers unless asked

## Technical Standards
- Next.js (app router if present). TypeScript if present.
- Tailwind utilities; follow tokens in `/context/style-guide.md`
- Accessibility: semantic regions (`header`, `main`, `nav`, `section`, `footer`); visible focus states; ARIA on icon-only controls; target ≥ 4.5:1 contrast where practical
- Performance: `next/image`, avoid layout shift (CLS), keep bundle additions minimal

## Page Anatomy (single page)
- **#intro** — concise value prop + 1–2-line bio; primary CTA (“Contact”)
- **#work** — 4–8 case-study cards (title, role, 1-line result); inline details via accessible disclosure (no separate routes)
- **#about** — short background; optional logos/press
- **#contact** — single clear email CTA

## Acceptance Criteria (validate every iteration)
- **Layout**: no horizontal scroll from 320px → 1440px; header/nav stable at all breakpoints
- **Typography**: Hero H1 ≥ 28px desktop / ≥ 20px mobile; ~60–70 CPL; comfortable leading
- **Interactivity**: case-study details expand/collapse accessibly (keyboard + ARIA); focus trap in mobile nav
- **Accessibility**: keyboard nav through header/menu/CTAs; image `alt` meaningful
- **Console/Network**: zero runtime errors; no failed requests
- **Privacy**: `<meta name="robots" ...>` present; `robots.txt` blocks indexing
- **Performance sanity**: images responsive/optimized; no obvious CLS

---

## Visual Development

### Design Principles
- Comprehensive design checklist in `/context/design-principles.md`
- Brand style guide in `/context/style-guide.md`
- When making visual (front-end, UI/UX) changes, always refer to these files for guidance

### Quick Visual Check
IMMEDIATELY after implementing any front-end change:
1. **Identify what changed** — Review the modified components/sections on the single page  
2. **Navigate to affected views** — Use `mcp__playwright__browser_navigate` to load `http://localhost:3000` and scroll to the changed section(s)  
3. **Verify design compliance** — Compare against `/context/design-principles.md` and `/context/style-guide.md`  
4. **Validate feature implementation** — Ensure the change fulfills the specific request  
5. **Check acceptance criteria** — Use the list above  
6. **Capture evidence** — Take **full-page screenshot at desktop viewport (1440px)** of the single page; if relevant, also capture a mobile viewport (~390×844)  
7. **Check for errors** — Run `mcp__playwright__browser_console_messages`

### Comprehensive Design Review
Invoke the `@agent-design-review` subagent for thorough design validation when:
- Completing significant UI/UX features or layout shifts
- **Before** finalizing PRs with visual changes
- Needing comprehensive accessibility and responsiveness testing

---

## Playwright MCP — Defaults to request

**Desktop (headed, 1440px full-page capture):**
    {
      "browser": "chromium",
      "headless": false,
      "viewport": { "width": 1440, "height": 900 },
      "recordConsole": true,
      "recordNetwork": true,
      "screenshotOptions": { "fullPage": true }
    }

**Mobile (headed, iPhone emulation):**
    {
      "browser": "webkit",
      "headless": false,
      "device": "iPhone 14",
      "viewport": { "width": 390, "height": 844 },
      "recordConsole": true,
      "recordNetwork": true,
      "screenshotOptions": { "fullPage": false }
    }

### Standard review loop to ask for
1. Navigate + wait for network idle  
2. Capture desktop full-page (1440px) + mobile screenshots  
3. Return DOM snapshot for: `header`, `#intro`, `#work`, `#about`, `#contact` (include computed classes where helpful)  
4. Return console errors/warnings + failed requests  
5. Compare vs **Acceptance Criteria** → propose **one smallest** change

---

## Workflow Rules (how you should operate, Claude)
- Make **atomic** diffs (one component/concern per commit)
- Always output:
  1. Full file contents for any changed/added file  
  2. A `git diff` snippet of changes  
  3. A 1-line conventional commit message
- If a rule here conflicts with `/context/style-guide.md` or `/context/design-principles.md`, note the conflict and proceed conservatively
- Never add dependencies or secrets without approval

## Components & Structure (guidance)
- `components/`: `Header`, `Section`, `CaseStudyCard` (with accessible disclosure), `Footer`, `NavDrawer`
- Use anchor links for section nav; on mobile provide a simple drawer/overlay with proper focus management

## Slash Commands (expected)
- `/design-review` — Run the Playwright snapshot loop (desktop 1440px full-page + mobile), return screenshots, DOM for key sections, console/network logs; report **Strengths / High-priority issues / Quick wins**
- `/fix-one-issue` — Propose **one** fix toward Acceptance Criteria; output files + git diff; re-snapshot to verify

## Definition of Done (for a PR)
- Screenshots before/after attached; Acceptance Criteria pass at desktop+mobile
- No console errors; no failed requests
- Diff is small and readable; commit message is clear

   ## Screenshot Analysis Protocol

  ### Critical Requirement: Honest Visual Assessment
  When taking screenshots, I MUST:

  1. **Actually analyze what I see** - Never assume or guess what the screenshot shows
  2. **Compare against stated goals** - Explicitly check if the visual result matches what was intended
  3. **Identify specific visual problems** - List exactly what looks wrong or incomplete
  4. **Never claim success without visual proof** - If the screenshot doesn't show the intended design, admit the failure

  ### Required Screenshot Analysis Template
  After every screenshot, I must provide:

  What I Actually See:
  - [Specific visual elements that are working]
  - [Specific visual problems still present]
  - [Layout issues, spacing problems, missing elements]

  Comparison to Goals:
  - ❌ Expected: [What the design should look like]
  - 🔍 Actual: [What the screenshot actually shows]

  Next Steps:
  - [Specific technical fixes needed]

  ### Visual Validation Rules
  - **Rule 1**: Never mark a visual task as "completed" unless the screenshot proves it works
  - **Rule 2**: If claiming "sophisticated design" or "professional layout" -
  the screenshot must actually show sophisticated professional appearance
  - **Rule 3**: Always check: Does this look like the reference designs we analyzed?
  - **Rule 4**: Grid layouts, spacing, typography sizing - these must be visually confirmed, not assumed

  ### Prohibited Phrases Without Screenshot Proof
  - "Professional appearance"
  - "Sophisticated design"
  - "Proper grid layout"
  - "Clean spacing"
  - "Matches reference patterns"