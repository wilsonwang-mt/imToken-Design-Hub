#!/usr/bin/env node
// 给 public/projects/ 下所有托管整页补上站点导航（悬浮返回条）。替换或新增托管 HTML 后运行：npm run fix:hosted
// Confu 课程页用的是 scripts/add-deck-nav.mjs。
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const TAG = '<script src="/projects/site-nav.js" defer></script>'
const root = fileURLToPath(new URL('../public/projects/', import.meta.url))
const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]))
let changed = 0
for (const p of walk(root).filter((f) => /\.html?$/.test(f))) {
  const html = readFileSync(p, 'utf8')
  if (html.includes('/projects/site-nav.js')) continue
  const i = html.lastIndexOf('</body>')
  if (i < 0) { console.log(`跳过（没有 </body>）→ ${relative(root, p)}`); continue }
  writeFileSync(p, html.slice(0, i) + TAG + '\n' + html.slice(i))
  console.log(`已补导航 → ${relative(root, p)}`)
  changed++
}
console.log(changed ? `共 ${changed} 个文件` : '所有托管页都已经有导航')
