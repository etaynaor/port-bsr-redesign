---
title: Reference Synthesis
description: Read JSONs from data/reference_analysis and propose a unified style direction + Tailwind theme draft for the portfolio.
allowed-tools: Grep, LS, Read, Glob, Edit, Write
---

Task
  1) Read all files data/reference_analysis/*.json
  2) Identify recurring patterns:
       - Palette colors (background, foreground, accents)
       - Font families and size/leading ranges
       - Container widths and spacing scales
       - Component patterns (header/nav, hero, buttons/CTAs, cards)
  3) Produce:
       - Style Direction: 3–5 adjectives (vibe)
       - Palette: bg, fg, 1–2 accents (hex) + likely usage
       - Typography: primary/secondary families, base size/leading, h1–h3 scale (rem), letter-spacing recs
       - Layout: suggested container max-width(s), spacing scale (e.g., 4/8/12…)
       - Components: Button, CaseStudyCard, Nav (desktop+mobile), Section heading style
       - Tailwind theme draft: a code block for tailwind.config.(ts|js) theme overrides (colors, fontFamily, fontSize scale)
  4) Output a single Markdown report with:
       - “Style Direction” paragraph
       - Palette (list with hex)
       - Type scale table (h1–body)
       - Tailwind theme code block
       - “Next actions” (3–5 concrete repo changes)


Notes
  • Do not add dependencies automatically; propose fonts as OPTIONAL.
  • Use conservative, accessible contrast in palette suggestions.