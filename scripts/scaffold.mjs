#!/usr/bin/env node
// 新建项目 / 新建材料。不要手写这些文件，用脚本生成，再把【待填写】换成真实内容。
//
//   npm run new:project -- <slug> [--title "中文名"] [--prefix xx] [--owner "名字"]
//   npm run new:doc -- <slug> <key> [--title "材料标题"] [--type research] [--hosted]
//
// 带空格的值要加引号。生成后运行 npm run dev 预览，npm run check 自检，详见 CONTRIBUTING.md。

import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { parseArgs } from 'node:util'
import { PREFIX_RE, ROOT, SLUG_RE, reservedPrefixes } from './lib.mjs'

const TPL = join(ROOT, 'scripts/templates')
const DOC_TYPES = {
  proposal: '方案提案', meeting: '会议记录', research: '调研', spec: '设计规范',
  prototype: '原型', review: '评审记录', comms: '传播物料',
}
const USAGE = `用法：
  npm run new:project -- <slug> [--title "中文名"] [--prefix xx] [--owner "名字"]
  npm run new:doc -- <slug> <key> [--title "材料标题"] [--type research] [--hosted]`
const today = new Date().toLocaleDateString('sv-SE') // 本地日期 YYYY-MM-DD

function fail(msg) {
  console.error(`✗ ${msg}`)
  process.exit(1)
}

let args
try {
  args = parseArgs({
    allowPositionals: true,
    options: { title: { type: 'string' }, prefix: { type: 'string' }, owner: { type: 'string' }, type: { type: 'string' }, hosted: { type: 'boolean' } },
  })
} catch (e) {
  fail(`${e.message}\n${USAGE}`)
}
const [cmd, ...pos] = args.positionals
const opt = args.values
const expected = { project: 1, doc: 2 }[cmd]
if (expected && pos.length > expected) fail(`多了参数「${pos.slice(expected).join(' ')}」。带空格的标题要加引号，如 --title "Swap 改版"\n${USAGE}`)

/** 放进单引号 TS 字符串之前转义 */
const lit = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ')
/** 注册表里的变量名：p_ + slug（连字符换成下划线），总是合法的标识符 */
const alias = (slug) => `p_${slug.replaceAll('-', '_')}`
const gitName = () => {
  try { return execSync('git config user.name', { cwd: ROOT, encoding: 'utf8' }).trim() } catch { return '' }
}
function fill(tpl, vars) {
  let s = readFileSync(join(TPL, tpl), 'utf8')
  for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`__${k}__`, v)
  return s
}
function needNew(path) {
  if (existsSync(join(ROOT, path))) fail(`${path} 已经存在，什么都没写`)
}
function needMarker(path, marker) {
  if (!readFileSync(join(ROOT, path), 'utf8').includes(marker)) fail(`${path} 里找不到标记「${marker}」，什么都没写。请把这一行加回列表最后一项后面，再运行一次`)
}
function create(path, content) {
  mkdirSync(dirname(join(ROOT, path)), { recursive: true })
  writeFileSync(join(ROOT, path), content)
  console.log(`  + ${path}`)
}
function insertAt(path, marker, text) {
  const abs = join(ROOT, path)
  const src = readFileSync(abs, 'utf8')
  const i = src.indexOf(marker)
  const lineStart = src.lastIndexOf('\n', i) + 1
  const indent = src.slice(lineStart, i)
  writeFileSync(abs, src.slice(0, lineStart) + text.split('\n').map((l) => indent + l).join('\n') + '\n' + src.slice(lineStart))
  console.log(`  ~ ${path}`)
}
function usedPrefixes() {
  const out = reservedPrefixes()
  const registry = readFileSync(join(ROOT, 'content/projects.ts'), 'utf8')
  for (const m of registry.matchAll(/cssPrefix:\s*'([a-z]+)'/g)) out.add(m[1])
  for (const m of registry.matchAll(/from '\.\/projects\/([a-z0-9-]+)\/project'/g)) {
    const file = join(ROOT, `content/projects/${m[1]}/project.ts`)
    const p = existsSync(file) && readFileSync(file, 'utf8').match(/cssPrefix:\s*'([a-z]+)'/)
    if (p) out.add(p[1])
  }
  return out
}

if (cmd === 'project') {
  const slug = pos[0]
  if (!slug || !SLUG_RE.test(slug)) fail(`slug 用小写英文字母开头，只用小写字母、数字和连字符，如 swap-redesign\n${USAGE}`)
  for (const dir of [`content/projects/${slug}`, `app/projects/${slug}`, `public/projects/${slug}`]) needNew(dir)
  needMarker('content/projects.ts', '// @new-project-imports')
  needMarker('content/projects.ts', '// @new-project-entries')
  const used = usedPrefixes()
  let prefix = opt.prefix
  if (!prefix) {
    const words = slug.split('-').map((w) => w.replace(/[^a-z]/g, '')).filter(Boolean)
    const candidates = [words.map((w) => w[0]).join(''), words[0].slice(0, 3), words[0].slice(0, 2) + (words[1]?.[0] ?? ''), words.join('').slice(0, 4), words.join('').slice(0, 5)]
    prefix = candidates.find((c) => PREFIX_RE.test(c) && !used.has(c))
    if (!prefix) fail('自动生成的样式前缀都被占用了，请用 --prefix 指定 2–6 个小写字母')
  }
  if (!PREFIX_RE.test(prefix)) fail('--prefix 必须是 2–6 个小写字母')
  if (used.has(prefix)) fail(`样式前缀「${prefix}」已被占用（共享样式或其他项目），请换一个`)
  const vars = { SLUG: slug, PREFIX: prefix, TITLE: lit(opt.title ?? '【待填写】项目名'), OWNER: lit(opt.owner ?? (gitName() || '【待填写】')), DATE: today }

  console.log(`新建项目 ${slug}（样式前缀 .${prefix}）`)
  create(`content/projects/${slug}/project.ts`, fill('project/project.ts.tpl', vars))
  create(`app/projects/${slug}/page.tsx`, fill('project/page.tsx.tpl', vars))
  create(`app/projects/${slug}/layout.tsx`, fill('project/layout.tsx.tpl', vars))
  create(`app/projects/${slug}/${slug}.css`, fill('project/style.css.tpl', vars))
  insertAt('content/projects.ts', '// @new-project-imports', `import { project as ${alias(slug)} } from './projects/${slug}/project'`)
  insertAt('content/projects.ts', '// @new-project-entries', `${alias(slug)},`)
  console.log(`\n下一步：
  1. 打开 content/projects/${slug}/project.ts，把所有【待填写】换成真实内容（每项至少写什么见 docs/project-template.md）
  2. npm run dev，打开 http://localhost:3000/projects/${slug}/ 预览
  3. npm run check 自检通过后，开分支提 PR`)
} else if (cmd === 'doc') {
  const [slug, key] = pos
  if (!slug || !key) fail(USAGE)
  if (!SLUG_RE.test(key) || key === 'overview') fail('key 用小写英文字母开头，只用小写字母、数字和连字符（它也是网址的一段），不能是 overview')
  const projectFile = `content/projects/${slug}/project.ts`
  if (!existsSync(join(ROOT, projectFile))) fail(`${projectFile} 不存在：旧项目（legacy）请手动登记材料，新项目先运行 npm run new:project`)
  const hosted = !!opt.hosted
  const type = opt.type ?? (hosted ? 'prototype' : 'proposal')
  if (!DOC_TYPES[type]) fail(`--type 必须是 ${Object.keys(DOC_TYPES).join(' / ')} 之一`)
  const href = `/projects/${slug}/${key}/`
  if (readFileSync(join(ROOT, projectFile), 'utf8').includes(`href: '${href}'`)) fail(`${href} 已经登记过了，什么都没写`)
  const file = hosted ? `public/projects/${slug}/${key}/index.html` : `app/projects/${slug}/${key}/page.tsx`
  needNew(file)
  needNew(hosted ? `app/projects/${slug}/${key}` : `public/projects/${slug}/${key}`)
  needMarker(projectFile, '// @new-doc-entries')
  const title = opt.title ?? '【待填写】材料标题'
  const html = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  console.log(`新建材料 ${href}（${DOC_TYPES[type]} · ${hosted ? '托管整页' : '站内页面'}）`)
  if (hosted) create(file, fill('doc/hosted.html.tpl', { DOC_TITLE: html(title) }))
  else create(file, fill('doc/page.tsx.tpl', { SLUG: slug, KEY: key, TYPE_LABEL: DOC_TYPES[type] }))
  insertAt(projectFile, '// @new-doc-entries', `{
  key: '${key}',
  title: '${lit(title)}',
  type: '${type}',
  kind: '${hosted ? 'hosted' : 'page'}',
  href: '${href}',
  status: 'draft',
  date: '${today}',
  author: '${lit(gitName() || '【待填写】')}',
  summary: '【待填写】一句话结论，不是介绍',
},`)
  console.log(`\n下一步：
  1. ${hosted ? `把整页 HTML 放进 ${file}（保留 head 和 site-nav 脚本；npm run fix:hosted 可以补导航）` : `在 ${file} 写正文`}
  2. 在 ${projectFile} 补全这条材料的 summary，更新 updated 并在 changelog 最前面加一条
  3. npm run check 自检通过后，开分支提 PR`)
} else {
  console.log(USAGE)
  process.exit(cmd ? 1 : 0)
}
