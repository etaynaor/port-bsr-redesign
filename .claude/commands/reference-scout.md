---
title: Reference Scout
description: Visit reference URLs, capture desktop+mobile screenshots and DOM, extract basic style signals, and save JSON summaries.
allowed-tools: Grep, LS, Read, Edit, Write, MultiEdit, Bash, Glob, mcp__playwright__browser_navigate, mcp__playwright__browser_wait_for, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_console_messages, mcp__playwright__browser_network_requests, mcp__playwright__browser_snapshot, mcp__playwright__browser_evaluate, mcp__playwright__browser_click
---

Inputs
  • Read URLs from ./context/reference-urls.txt
  • Create output dirs if missing:
      ./public/refshots/<slug>/
      ./data/reference_analysis/

Screenshot configs
Desktop (headed, full page 1440):
    { "browser":"chromium","headless":false,"viewport":{"width":1440,"height":900},"recordConsole":true,"recordNetwork":true,"screenshotOptions":{"fullPage":true} }

Mobile (headed, iPhone emulation):
    { "browser":"webkit","headless":false,"device":"iPhone 14","viewport":{"width":390,"height":844},"recordConsole":true,"recordNetwork":true,"screenshotOptions":{"fullPage":false} }

For each URL:
  1) Navigate with mcp__playwright__browser_navigate and wait for idle.
     If cookie banner appears, best-effort click common “Accept” buttons and proceed.
  2) Screenshots:
       - desktop full-page → public/refshots/<slug>/desktop.png
       - mobile viewport  → public/refshots/<slug>/mobile.png
  3) DOM snapshot:
       - mcp__playwright__browser_snapshot; gather header, first h1, first p, first button, a from hero/nav if present.
  4) Computed style probe (mcp__playwright__browser_evaluate):
       - Return JSON with font families/sizes/leading/colors for body/h1/p/a/button/nav
       - Return container width/left if available
  5) Save JSON summary → data/reference_analysis/<slug>.json with:
       - url, title, paletteCandidates (distinct hexes), typography (families/sizes/leading), container, console error/warn counts, relative screenshot paths
  6) Console check:
       - mcp__playwright__browser_console_messages; store counts
  7) Append to index:
       - Maintain data/reference_analysis/index.json [{slug, url, title}...]

Output
  • Return a short Markdown list of each URL with the paths to desktop.png, mobile.png, and its JSON summary.
  • Do not include raw tool logs.