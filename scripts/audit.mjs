#!/usr/bin/env node
// imToken Design Hub 自动审核：npm run audit（CI、本地 npm run check 都会跑）。
// 规则 ID 和说明见 CONTRIBUTING.md；block 级问题让命令失败（CI 变红），warn 级只提示。
// 行内豁免：在同一行写 audit-ok <规则ID> <原因>（只对 SEC-01、CSS-01、CSS-02 这类逐行规则有效）。
// 零新依赖：用仓库已安装的 typescript 把 content/projects.ts 转成 JS 读取。

import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'
import { CONFIG, PREFIX_RE, ROOT, SLUG_RE, reservedPrefixes } from './lib.mjs'

const STAGES = ['exploring', 'designing', 'reviewing', 'building', 'shipped', 'paused', 'archived']
const DOC_TYPES = ['overview', 'proposal', 'meeting', 'research', 'spec', 'prototype', 'review', 'comms']
const PLACEHOLDER = '【待填写】'

const findings = []
const add = (severity, rule, file, msg) => findings.push({ severity, rule, file, msg })
const block = (rule, file, msg) => add('block', rule, file, msg)
const warn = (rule, file, msg) => add('warn', rule, file, msg)

const rel = (p) => relative(ROOT, p).split(sep).join('/') || '.'
const read = (p) => readFileSync(p, 'utf8')
// 允许比 UTC 今天晚一天：北京时间上午写的日期，在 CI（UTC）里还是「明天」
const latestDate = new Date(Date.now() + 864e5).toISOString().slice(0, 10)
const isISO = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s))
const nonEmpty = (s) => typeof s === 'string' && s.trim().length > 0
const exempt = (line, rule) => new RegExp(`audit-ok\\s+${rule}\\b`).test(line)
const len = (s) => [...(s || '')].length

function walk(dir, pred, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(name)) walk(p, pred, out)
    } else if (pred(p)) out.push(p)
  }
  return out
}

// ── 读取 content/projects.ts 和它引用的各项目 project.ts ──
// 支持相对路径、@/ 别名、目录（index.ts）；project.ts 只应该 import type，其他写法给出可读的报错。
function loadProjects() {
  const tmp = join(ROOT, 'node_modules/.cache/hub-audit')
  rmSync(tmp, { recursive: true, force: true })
  const seen = new Map()
  const emit = (file) => {
    if (seen.has(file)) return seen.get(file)
    const dest = join(tmp, relative(ROOT, file)).replace(/\.ts$/, '.mjs')
    seen.set(file, dest)
    let out = ts.transpileModule(read(file), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
    out = out.replace(/^(\s*import\s+|\s*(?:import|export)\b[^'";]*?\bfrom\s+)(['"])([^'"]+)\2/gm, (m, kw, q, spec) => {
      if (!spec.startsWith('.') && !spec.startsWith('@/')) throw new Error(`${rel(file)} 引用了「${spec}」：project.ts 只放数据，只能 import type`)
      const target = spec.startsWith('@/') ? join(ROOT, spec.slice(2)) : resolve(dirname(file), spec)
      const tsFile = [`${target}.ts`, join(target, 'index.ts')].find(existsSync)
      if (!tsFile) throw new Error(`${rel(file)} 引用了「${spec}」：只能引用 .ts 文件（project.ts 只放数据，只能 import type）`)
      let to = relative(dirname(dest), emit(tsFile)).split(sep).join('/')
      if (!to.startsWith('.')) to = `./${to}`
      return `${kw}'${to}'`
    })
    mkdirSync(dirname(dest), { recursive: true })
    writeFileSync(dest, out)
    return dest
  }
  return import(pathToFileURL(emit(join(ROOT, 'content/projects.ts'))).href + `?t=${Date.now()}`)
}

let projects
try {
  ;({ projects } = await loadProjects())
  if (!Array.isArray(projects)) throw new Error('content/projects.ts 没有导出 projects 数组')
} catch (e) {
  console.log(`imToken Design Hub · audit\n\n✗ 必须修改（block）（1）\n  [CARD-01] content/projects.ts\n      读不了项目数据：${e.message}\n规则说明见 CONTRIBUTING.md`)
  process.exit(1)
}
const nextConfig = read(join(ROOT, 'next.config.mjs'))
const bySlug = new Map(projects.map((p) => [p.slug, p]))
const projectFile = (p) => (existsSync(join(ROOT, `content/projects/${p.slug}/project.ts`)) ? `content/projects/${p.slug}/project.ts` : 'content/projects.ts')
const RESERVED = reservedPrefixes()

/** 材料 href 对应的文件：站内页面是 app/…/page.tsx，托管整页是 public/…/index.html */
function hrefFile(href, hosted) {
  const clean = href.replace(/^\//, '').replace(/\/$/, '')
  return join(ROOT, hosted ? 'public' : 'app', clean, hosted ? 'index.html' : 'page.tsx')
}

// ── CARD-01 / CARD-02 / TPL-01 / TPL-02 / TPL-03（数据侧）──
const slugs = new Set()
const prefixes = new Map()
for (const p of projects) {
  const f = projectFile(p)
  const where = `${f} · ${p.slug || '(无 slug)'}`
  if (!SLUG_RE.test(p.slug || '')) block('CARD-01', where, 'slug 必须是 kebab-case：小写字母开头，只用小写字母、数字、连字符')
  if (slugs.has(p.slug)) block('CARD-01', where, 'slug 重复')
  slugs.add(p.slug)
  for (const k of ['title', 'en', 'status', 'phase', 'desc', 'href']) if (!nonEmpty(p[k])) block('CARD-01', where, `卡片缺少 ${k}`)
  const tags = Array.isArray(p.tags) ? p.tags : []
  const stats = Array.isArray(p.stats) ? p.stats : []
  if (tags.length === 0) block('CARD-01', where, 'tags 至少 1 个')
  if (!Array.isArray(p.stats)) block('CARD-01', where, 'stats 必须是数组（没有就写 []）')
  if (p.href !== `/projects/${p.slug}/`) block('CARD-01', where, `href 必须是 /projects/${p.slug}/`)
  if (JSON.stringify(p).includes(PLACEHOLDER)) block('CARD-01', where, `还有「${PLACEHOLDER}」占位没有填`)
  if (p.legacy && !CONFIG.legacySlugs.includes(p.slug)) block('CARD-01', where, 'legacy 只给规范建立前的三个旧项目，新项目不能用')
  if (p.cssPrefix) {
    if (!PREFIX_RE.test(p.cssPrefix)) block('CSS-01', where, 'cssPrefix 必须是 2–6 个小写字母')
    else if (RESERVED.has(p.cssPrefix)) block('CSS-01', where, `cssPrefix「${p.cssPrefix}」和全站共享的 class 重名，请换一个`)
    if (prefixes.has(p.cssPrefix)) block('CSS-01', where, `cssPrefix「${p.cssPrefix}」和 ${prefixes.get(p.cssPrefix)} 重复（后合并的项目换一个）`)
    prefixes.set(p.cssPrefix, p.slug)
  }

  if (!p.legacy) {
    if (!STAGES.includes(p.stage)) block('CARD-01', where, `stage 必须是 ${STAGES.join(' / ')} 之一`)
    if (!p.owner || !nonEmpty(p.owner.name) || !nonEmpty(p.owner.role)) block('CARD-01', where, 'owner 需要 name 和 role（只写职能）')
    if (!isISO(p.updated)) block('CARD-01', where, 'updated 必须是 YYYY-MM-DD')
    else if (p.updated > latestDate) block('CARD-01', where, 'updated 不能晚于今天')
    if (!Array.isArray(p.changelog) || p.changelog.length === 0) block('CARD-01', where, 'changelog 至少 1 条')
    else if (p.changelog[0].date !== p.updated) block('CARD-01', where, `updated（${p.updated}）必须等于最新一条 changelog 的日期（${p.changelog[0].date}）`)
    if (!Array.isArray(p.links)) block('CARD-01', where, 'links 必须是数组（没有就写 []）')
    if (!Array.isArray(p.docs) || p.docs.length === 0) block('CARD-01', where, 'docs 至少 1 条')
    else if (p.docs[0].key !== 'overview' || p.docs[0].href !== p.href) block('TPL-01', where, 'docs 第一条必须是 key: overview，href 等于项目 href')
    const o = p.overview
    if (!o) block('TPL-01', where, '缺少 overview（概览页数据）')
    else {
      if (!nonEmpty(o.background)) block('TPL-01', where, 'overview.background 不能为空')
      if (!nonEmpty(o.current)) block('TPL-01', where, 'overview.current 不能为空')
      if (!Array.isArray(o.goals) || o.goals.length === 0) block('TPL-01', where, 'overview.goals 至少 1 条')
      for (const k of ['decisions', 'timeline', 'openQuestions']) if (!Array.isArray(o[k])) block('TPL-01', where, `overview.${k} 必须是数组（没有就写 []）`)
      if (STAGES.includes(p.stage) && !['exploring', 'paused', 'archived'].includes(p.stage)) {
        if (o.decisions?.length === 0) warn('TPL-02', where, '已经过了探索阶段，「关键决定」还是空的')
        if (o.openQuestions?.length === 0 && p.stage !== 'shipped') warn('TPL-02', where, '「待决问题」是空的，确认真的没有吗')
      }
    }
    if (len(p.title) > 16) warn('CARD-02', where, `title ${len(p.title)} 字，建议 ≤16`)
    if (len(p.en) > 40) warn('CARD-02', where, `en ${len(p.en)} 字符，建议 ≤40`)
    if (len(p.desc) < 40 || len(p.desc) > 120) warn('CARD-02', where, `desc ${len(p.desc)} 字，建议 40–120`)
    if (len(p.phase) > 24) warn('CARD-02', where, `phase ${len(p.phase)} 字，建议 ≤24`)
    if (tags.length > 5 || new Set(tags).size !== tags.length) warn('CARD-02', where, 'tags 建议 1–5 个且不重复')
    if (stats.length && stats.length !== 3) warn('CARD-02', where, 'stats 写空数组，或者恰好 3 项')
  }

  const keys = new Set()
  for (const d of p.docs || []) {
    const w = `${where} · docs.${d.key}`
    for (const k of ['key', 'title', 'href', 'author', 'summary']) if (!nonEmpty(d[k])) block('TPL-03', w, `材料缺少 ${k}`)
    if (keys.has(d.key)) block('TPL-03', w, 'key 重复')
    keys.add(d.key)
    if (!DOC_TYPES.includes(d.type)) block('TPL-03', w, `type 必须是 ${DOC_TYPES.join(' / ')} 之一`)
    if (!['page', 'hosted'].includes(d.kind)) block('TPL-03', w, 'kind 必须是 page 或 hosted')
    if (!['draft', 'final', 'archived'].includes(d.status)) block('TPL-03', w, 'status 必须是 draft / final / archived')
    if (!isISO(d.date)) block('TPL-03', w, 'date 必须是 YYYY-MM-DD')
    if (!d.href?.startsWith(`/projects/${p.slug}/`)) block('TPL-03', w, `href 必须在 /projects/${p.slug}/ 之下`)
    else if (!existsSync(hrefFile(d.href, d.kind === 'hosted'))) block('TPL-03', w, `找不到对应文件 ${rel(hrefFile(d.href, d.kind === 'hosted'))}`)
  }
  if (nonEmpty(p.href) && !existsSync(hrefFile(p.href, !!p.static))) block('TPL-03', where, `项目入口找不到对应文件 ${rel(hrefFile(p.href, !!p.static))}`)
}

// ── STR-01 / TPL-03（文件侧）：每个页面和托管文件都属于一个已登记的项目，并登记在它的 docs 里 ──
const pageFiles = walk(join(ROOT, 'app/projects'), (f) => f.endsWith(`${sep}page.tsx`)).filter((f) => rel(f) !== 'app/projects/page.tsx')
const hostedHtml = walk(join(ROOT, 'public/projects'), (f) => /\.html?$/.test(f))
for (const base of ['app/projects', 'public/projects', 'content/projects']) {
  const dir = join(ROOT, base)
  if (!existsSync(dir)) continue
  for (const name of readdirSync(dir)) {
    if (name.startsWith('_') || !statSync(join(dir, name)).isDirectory()) continue
    if (!bySlug.has(name)) block('STR-01', `${base}/${name}/`, `目录 ${name} 没有对应的已登记项目（content/projects.ts）`)
  }
}
const urlOf = (r) => (r.startsWith('app/') ? r.replace(/^app/, '').replace(/page\.tsx$/, '') : r.replace(/^public/, '').replace(/index\.html?$/, ''))
for (const f of [...pageFiles, ...hostedHtml]) {
  const r = rel(f)
  const p = bySlug.get(r.split('/')[2])
  if (!p) continue
  const url = urlOf(r)
  const hosted = r.startsWith('public/')
  // 托管材料可以有多页（<key>/step-2/index.html、<key>/step-2.html），算在登记过的 <key>/ 下面
  const registered = url === p.href || (p.docs || []).some((d) => (hosted && d.kind === 'hosted' ? url.startsWith(d.href) : url === d.href))
  if (!registered) (p.legacy ? warn : block)('TPL-03', r, `这份材料没有登记在 ${p.slug} 的 docs 里（${url}）`)
}

// ── PAGE-01 / PAGE-02 / TPL-01：项目页面用站点的统一外壳 ──
for (const f of pageFiles) {
  const src = read(f)
  const r = rel(f)
  const slug = r.split('/')[2]
  const p = bySlug.get(slug)
  const usesTemplate = src.includes('<ProjectOverview') || src.includes('<ProjectDoc')
  if (!usesTemplate) {
    if (!/<Nav\s+active="projects"/.test(src)) block('PAGE-01', r, '项目页要用 <Nav active="projects" />（新页面直接用 <ProjectDoc>）')
    if (!src.includes('className="crumb"')) block('PAGE-01', r, '项目页要有面包屑 <nav className="crumb">（新页面直接用 <ProjectDoc>）')
    if (!src.includes('<Footer')) block('PAGE-01', r, '项目页要有 <Footer />（新页面直接用 <ProjectDoc>）')
  }
  if (!/export\s+(const\s+metadata|async\s+function\s+generateMetadata|function\s+generateMetadata)/.test(src)) block('PAGE-01', r, '页面要导出 metadata（用 projectMetadata / docMetadata）')
  if (p && !p.legacy) {
    const isOverview = r === `app/projects/${slug}/page.tsx`
    if (isOverview && !src.includes('<ProjectOverview')) block('TPL-01', r, '新项目的概览页要用 <ProjectOverview project={project}>')
    if (!isOverview && !src.includes('<ProjectDoc')) block('TPL-01', r, '新项目的子页面要用 <ProjectDoc project={project} docKey="…">（完全自定义的页面请做成托管整页）')
  }
  if (/from\s+['"]next\/link['"]/.test(src)) {
    for (const d of (p?.docs || []).filter((d) => d.kind === 'hosted')) {
      if (new RegExp(`<Link[^>]+href=["'{]+${d.href.replace(/[/]/g, '\\/')}`).test(src)) block('PAGE-02', r, `托管页 ${d.href} 要用 SmartLink 或普通 <a>，不能用 next/link`)
    }
  }
}

// ── TPL-04：页面里不能留占位 ──
for (const f of [...walk(join(ROOT, 'app/projects'), (f) => /\.(tsx|css)$/.test(f)), ...hostedHtml]) {
  read(f).split('\n').forEach((line, i) => {
    if (line.includes(PLACEHOLDER)) block('TPL-04', `${rel(f)}:${i + 1}`, `还有「${PLACEHOLDER}」占位没有填`)
  })
}

// ── CSS-01 / CSS-02：项目样式 ──
/** 解析出所有样式规则（跳过注释和字符串；@media 等条件规则里的规则也算；嵌套规则带上父规则） */
function cssRules(css) {
  const out = []
  const stack = [] // { sel, rule }
  let buf = '', line = 1, selLine = 1, quote = ''
  for (let i = 0; i < css.length; i++) {
    const ch = css[i]
    if (ch === '\n') line++
    if (quote) { buf += ch; if (ch === quote && css[i - 1] !== '\\') quote = ''; continue }
    if (ch === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2)
      const skipped = css.slice(i, end < 0 ? css.length : end + 2)
      line += (skipped.match(/\n/g) || []).length
      i = end < 0 ? css.length : end + 1
      continue
    }
    if (ch === '"' || ch === "'") { quote = ch; buf += ch; continue }
    if (ch === '{') {
      const sel = buf.trim()
      const parent = stack.findLast((s) => s.rule)?.rule
      const inKeyframes = stack.some((s) => /^@(-\w+-)?keyframes\b/.test(s.sel))
      const rule = sel.startsWith('@') || inKeyframes ? null : { sel, line: selLine, parent, decls: [] }
      if (rule) out.push(rule)
      stack.push({ sel, rule })
      buf = ''
    } else if (ch === '}') {
      const own = stack.pop()?.rule
      if (own && buf.trim()) own.decls.push({ text: buf, line: selLine })
      buf = ''
    } else if (ch === ';') {
      const own = stack.at(-1)?.rule
      if (own) own.decls.push({ text: buf, line: selLine })
      buf = ''
    } else {
      if (!buf.trim() && ch.trim()) selLine = line
      buf += ch
    }
  }
  return out
}
/** 按逗号拆选择器，括号里的逗号（:is(.a, .b)）不拆 */
function splitSelectors(sel) {
  const out = []
  let depth = 0, cur = ''
  for (const ch of sel) {
    if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth--
    if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = '' } else cur += ch
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}
for (const f of walk(join(ROOT, 'app/projects'), (f) => f.endsWith('.css'))) {
  const r = rel(f)
  const p = bySlug.get(r.split('/')[2])
  if (!p) continue
  if (!p.cssPrefix) { block('CSS-01', r, '项目有样式文件，但 project.ts 里没有 cssPrefix'); continue }
  const src = read(f)
  const lines = src.split('\n')
  const scoped = new RegExp(`^\\.${p.cssPrefix}(-|$|[\\s.:#\\[>+~,)])`)
  for (const rule of cssRules(src)) {
    const lineText = lines[rule.line - 1] || ''
    // 嵌套在本项目规则里的选择器（&:hover、& .x、.x）本来就带着前缀
    if (!rule.parent) {
      for (const s of splitSelectors(rule.sel)) {
        if (!scoped.test(s) && !exempt(lineText, 'CSS-01')) block('CSS-01', `${r}:${rule.line}`, `选择器「${s}」必须以 .${p.cssPrefix} 或 .${p.cssPrefix}- 开头`)
      }
    }
    const isRoot = rule.sel === `.${p.cssPrefix}`
    for (const d of rule.decls) {
      if (!/(#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\()/.test(d.text)) continue
      if (isRoot && /^\s*--[\w-]+\s*:/.test(d.text)) continue
      if (!exempt(lines[d.line - 1] || '', 'CSS-02')) warn('CSS-02', `${r}:${d.line}`, `颜色请用 var(--…) token；项目自有颜色先在 .${p.cssPrefix} 根规则里声明为自定义属性`)
    }
  }
}

// ── HOST-01：托管整页的 head 约定 ──
for (const f of hostedHtml) {
  const r = rel(f)
  const p = bySlug.get(r.split('/')[2])
  if (!p) continue
  const html = read(f)
  const head = html.slice(0, 20000)
  if (!/<html[^>]*\blang=/i.test(head)) block('HOST-01', r, '<html> 要写 lang（中文材料 zh-CN）')
  if (!/<meta\s+charset=/i.test(head)) block('HOST-01', r, '缺少 <meta charset="utf-8">')
  if (!/name=["']viewport["']/i.test(head)) block('HOST-01', r, '缺少 viewport meta')
  const title = head.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim()
  if (!title) block('HOST-01', r, '缺少 <title>')
  else if (!p.legacy && !/ · imToken Design$/.test(title)) block('HOST-01', r, `<title> 要以「 · imToken Design」结尾（现在是「${title}」）`)
  if (!html.includes('/projects/site-nav.js')) block('HOST-01', r, '要引用站点导航 <script src="/projects/site-nav.js" defer></script>（npm run fix:hosted 可以自动补）')
}

// ── FILE-01：要提交的文件（-z 输出原始路径，中文文件名不会被转义） ──
let files = []
try {
  files = execSync('git ls-files -z -c -o --exclude-standard', { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).split('\0').filter(Boolean)
} catch {
  files = walk(ROOT, () => true).map(rel)
}
files = files.filter((f) => existsSync(join(ROOT, f))) // 跳过已在工作区删除、还没暂存的文件
for (const f of files) {
  if (CONFIG.forbiddenFiles.some((re) => new RegExp(re).test(f))) block('FILE-01', f, '这类文件不能提交（系统文件、密钥文件或设计源文件）')
  const mb = statSync(join(ROOT, f)).size / 1024 / 1024
  if (mb > CONFIG.maxFileMB && !CONFIG.largeFileAllowlist.includes(f)) block('FILE-01', f, `文件 ${mb.toFixed(1)} MB，超过 ${CONFIG.maxFileMB} MB；请放到 Drive，页面里只放链接`)
}

// ── SEC-01：密钥和人事信息 ──
// 交易哈希、合约地址是公开数据，不拦；0x + 64 位十六进制只在同一行出现「私钥 / secret / mnemonic」等字样时才拦。
const SECRET = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, '私钥'],
  [/\b(ghp|gho|ghs|ghu|github_pat)_[A-Za-z0-9_]{20,}/, 'GitHub token'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'AWS key'],
  [/\bxox[baprs]-[A-Za-z0-9-]{10,}/, 'Slack token'],
  [/\bsk-(?:proj|ant-[a-z0-9]+|svcacct|admin)-[A-Za-z0-9_-]{20,}|\bsk-[A-Za-z0-9]{40,}/, 'API key'],
  [/[?&](access_token|api_key|apikey|secret|sig|signature|auth)=[A-Za-z0-9._%-]{12,}/i, '带凭证参数的链接'],
  [/[?&](token|key)=(?!0x[0-9a-fA-F]{40}(?![0-9a-fA-F]))[A-Za-z0-9._%-]{24,}/i, '带凭证参数的链接'],
]
const HEX64 = /\b0x[0-9a-fA-F]{64}\b/
const KEY_WORD = /private|priv_?key|secret|mnemonic|seed phrase|私钥|助记词|密钥/i
const scanRoots = ['app', 'components', 'content', 'docs', 'public/projects', 'scripts', 'README.md', 'CONTRIBUTING.md', 'CLAUDE.md', '.github']
const textFile = (f) => /\.(tsx?|mjs|js|css|html?|md|json|txt|ya?ml|csv|svg)$/.test(f) || f === '.github/CODEOWNERS'
const skipScan = ['scripts/audit.mjs', 'scripts/audit.config.json']
const hrRe = new RegExp(CONFIG.hrWords.join('|'))
for (const f of files.filter((f) => scanRoots.some((r) => f === r || f.startsWith(`${r}/`)) && textFile(f) && !skipScan.includes(f))) {
  read(join(ROOT, f)).split('\n').forEach((line, i) => {
    if (exempt(line, 'SEC-01')) return
    for (const [re, what] of SECRET) if (re.test(line)) block('SEC-01', `${f}:${i + 1}`, `疑似${what}，不能提交`)
    if (HEX64.test(line) && KEY_WORD.test(line)) block('SEC-01', `${f}:${i + 1}`, '疑似私钥（0x 开头的 64 位十六进制，同一行提到了私钥 / secret），不能提交')
    const hr = line.match(hrRe)
    if (hr) block('SEC-01', `${f}:${i + 1}`, `出现「${hr[0]}」：团队共享材料不写职级、薪酬类信息`)
  })
}

// ── BASE-01：全站不进搜索引擎 ──
if (!/robots:\s*\{\s*index:\s*false/.test(read(join(ROOT, 'app/layout.tsx')))) block('BASE-01', 'app/layout.tsx', '根 metadata 要设 robots: { index: false, follow: false }')
if (!/X-Robots-Tag/.test(nextConfig)) block('BASE-01', 'next.config.mjs', 'headers() 要对所有路径下发 X-Robots-Tag: noindex, nofollow')

// ── 输出 ──
const blocks = findings.filter((f) => f.severity === 'block')
const warns = findings.filter((f) => f.severity === 'warn')
const show = (list, label) => {
  if (!list.length) return
  console.log(`\n${label}（${list.length}）`)
  for (const f of list) console.log(`  [${f.rule}] ${f.file}\n      ${f.msg}`)
}
console.log(`imToken Design Hub · audit · ${projects.length} 个项目`)
show(blocks, '✗ 必须修改（block）')
show(warns, '! 建议修改（warn）')
if (!blocks.length && !warns.length) console.log('\n✓ 全部通过')
else if (!blocks.length) console.log('\n✓ 没有 block 级问题，可以提 PR；warn 级问题请修掉或在 PR 里说明')
console.log('规则说明见 CONTRIBUTING.md')
process.exit(blocks.length ? 1 : 0)
