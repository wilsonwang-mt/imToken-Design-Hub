import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Marked, type Tokens } from 'marked'
import { guideBase, guideDocs } from '@/content/stake-guide'

// 构建时读取 public/projects/stake-video/guide/*.md 并渲染成 HTML（只在服务端运行，页面是静态生成的）。

const DIR = join(process.cwd(), 'public/projects/stake-video/guide')

export interface TocItem {
  id: string
  text: string
}

const plain = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")

export function renderGuide(file: string): { html: string; toc: TocItem[] } {
  let md = readFileSync(join(DIR, file), 'utf8')
  // 标题和导语由页面自己渲染：去掉 md 开头的一级标题
  md = md.replace(/^\s*# .*\n/, '')
  const toc: TocItem[] = []
  const used = new Map<string, number>()
  const slug = (text: string) => {
    const base = text.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}-]/gu, '') || 'section'
    const n = used.get(base) ?? 0
    used.set(base, n + 1)
    return n ? `${base}-${n}` : base
  }
  const fileToKey = new Map(guideDocs.map((d) => [d.file, d.key]))
  const marked = new Marked({ gfm: true })
  marked.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Heading['tokens']) => string } }, t: Tokens.Heading) {
        const inner = this.parser.parseInline(t.tokens)
        const id = slug(plain(inner))
        if (t.depth === 2) toc.push({ id, text: plain(inner) })
        return `<h${t.depth} id="${id}">${inner}</h${t.depth}>\n`
      },
      link(this: { parser: { parseInline: (t: Tokens.Link['tokens']) => string } }, t: Tokens.Link) {
        // 指向其他规范 md 的相对链接，换成站内页面；外链新窗口打开
        const [path, hash] = t.href.split('#')
        const key = fileToKey.get(path.replace(/^\.\//, ''))
        const inner = this.parser.parseInline(t.tokens)
        if (key) return `<a href="${guideBase}${key}/${hash ? `#${hash}` : ''}">${inner}</a>`
        if (path === '00-overview.md') return `<a href="${guideBase}${hash ? `#${hash}` : ''}">${inner}</a>`
        const ext = /^https?:\/\//.test(t.href)
        return `<a href="${t.href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${inner}</a>`
      },
      table(this: unknown, t: Tokens.Table) {
        // 宽表格在手机上横向滚动，不撑破页面
        const proto = Object.getPrototypeOf(this) as { table: (t: Tokens.Table) => string }
        return `<div class="sv-md-table">${proto.table.call(this, t)}</div>\n`
      },
    },
  })
  const html = marked.parse(md, { async: false }) as string
  return { html, toc }
}
