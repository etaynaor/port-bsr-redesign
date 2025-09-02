import { chromium, devices } from 'playwright'
import fs from 'fs'

const baseUrl = process.env.REVIEW_URL || 'http://localhost:3000/new'
const outDir = 'public/refshots/latest'
await fs.promises.mkdir(outDir, { recursive: true })

const result = { url: baseUrl, paths: {}, console: { errors: 0, warnings: 0, messages: [] }, network: { failed: 0 }, dom: {} }

const browser = await chromium.launch()
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const dpage = await desktop.newPage()

const consoleMsgs = []
dpage.on('console', (msg) => {
  const type = msg.type()
  const text = msg.text()
  consoleMsgs.push({ type, text })
})
dpage.on('requestfailed', () => { result.network.failed++ })

await dpage.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 })
result.title = await dpage.title().catch(() => null)
await dpage.screenshot({ path: `${outDir}/desktop.jpg`, type: 'jpeg', quality: 80, fullPage: true })
result.paths.desktop = `${outDir}/desktop.jpg`

// DOM snapshot (best-effort)
result.dom.header = await dpage.locator('nav, header').first().innerText().catch(() => null)
result.dom.h1 = await dpage.locator('h1').first().innerText().catch(() => null)
result.dom.p = await dpage.locator('p').first().innerText().catch(() => null)
result.dom.button = await dpage.locator('button, a[role="button"], .btn').first().innerText().catch(() => null)
const heroLink = await dpage.locator('a').first().elementHandle().catch(() => null)
if (heroLink) {
  const text = await dpage.locator('a').first().innerText().catch(() => '')
  const href = await dpage.locator('a').first().getAttribute('href').catch(() => '')
  result.dom.link = { text, href }
}

// console summary
for (const m of consoleMsgs) {
  if (m.type === 'error') result.console.errors++
  if (m.type === 'warning') result.console.warnings++
}
result.console.messages = consoleMsgs

await desktop.close()

// Mobile iPhone 14
const iphone = devices['iPhone 14']
const mobile = await browser.newContext({ ...iphone })
const mpage = await mobile.newPage()
mpage.on('console', (msg) => {
  const type = msg.type()
  if (type === 'error') result.console.errors++
  if (type === 'warning') result.console.warnings++
})
mpage.on('requestfailed', () => { result.network.failed++ })

await mpage.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 })
// attempt to trigger lazy content and capture full page
try { await mpage.evaluate(() => window.scrollTo(0, document.body.scrollHeight)) } catch {}
await mpage.waitForTimeout(400)
await mpage.screenshot({ path: `${outDir}/mobile.jpg`, type: 'jpeg', quality: 80, fullPage: true })
result.paths.mobile = `${outDir}/mobile.jpg`
await mobile.close()

await browser.close()

await fs.promises.mkdir('data/reference_analysis', { recursive: true })
await fs.promises.writeFile('data/reference_analysis/latest.json', JSON.stringify(result, null, 2))
console.log('Saved screenshots and summary:\n', result)
