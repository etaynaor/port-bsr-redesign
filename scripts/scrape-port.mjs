import { chromium } from 'playwright'
import fs from 'fs'

const url = 'https://port.etaynaor.com/'

function clean(s) {
  return s?.replace(/\s+/g, ' ').trim() || ''
}

async function extractCase(page, keyword) {
  const loc = page.locator(`text=${keyword}`).first()
  const el = await loc.elementHandle().catch(() => null)
  if (!el) return null
  // Walk up to a section-like container
  const handle = await el.evaluateHandle((node) => {
    let n = node
    for (let i = 0; i < 6 && n; i++) {
      if (n.tagName === 'SECTION' || n.tagName === 'ARTICLE' || n.className?.toString().match(/card|case|work|project/i)) return n
      n = n.parentElement
    }
    return node
  })
  const text = await handle.evaluate((node) => node.innerText)
  // Grab up to ~600 chars around keyword to get concise summary
  const idx = text.toLowerCase().indexOf(keyword.toLowerCase())
  let snippet = text
  if (idx >= 0) {
    const start = Math.max(0, idx - 300)
    const end = Math.min(text.length, idx + 600)
    snippet = text.slice(start, end)
  }
  // Try to collect nearby images
  const imgs = await handle.evaluate((node) => Array.from(node.querySelectorAll('img')).map(img => ({ src: img.src, alt: img.alt || '' })).slice(0,3))
  return { keyword, text: clean(text), snippet: clean(snippet), images: imgs }
}

const browser = await chromium.launch()
const page = await browser.newContext().then(ctx => ctx.newPage())
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })

const targets = ['SodaStream', 'Spotify', 'Tourism', 'Maccabee']
const out = {}
for (const k of targets) {
  out[k] = await extractCase(page, k)
}

await browser.close()
await fs.promises.mkdir('data/scraped', { recursive: true })
await fs.promises.writeFile('data/scraped/port-etay.json', JSON.stringify(out, null, 2))
console.log('Scraped:', Object.keys(out))

