// Adds the hover "back to site" bar to every hosted Confu deck.
// Run after replacing a deck file:  node scripts/add-deck-nav.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const TAG = '<script src="/confu/site-nav.js" defer></script>'
const root = new URL('../public/confu/', import.meta.url).pathname
for (const ep of readdirSync(root)) {
  const dir = join(root, ep)
  if (!statSync(dir).isDirectory()) continue
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.html')) continue
    const p = join(dir, f)
    const html = readFileSync(p, 'utf8')
    if (html.includes(TAG) || !html.includes('</body>')) continue
    const i = html.lastIndexOf('</body>')
    writeFileSync(p, html.slice(0, i) + TAG + '\n' + html.slice(i))
    console.log('added nav →', `${ep}/${f}`)
  }
}
