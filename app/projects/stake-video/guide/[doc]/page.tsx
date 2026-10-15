import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Icon from '@/components/Icon'
import { Ambient, Footer, Nav } from '@/components/Chrome'
import { guideBase, guideDocs, guideIntro, guideRaw } from '@/content/stake-guide'
import { renderGuide } from '../guide'

export const dynamicParams = false

export function generateStaticParams() {
  return guideDocs.map((d) => ({ doc: d.key }))
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const { doc } = await params
  const d = guideDocs.find((x) => x.key === doc)
  return {
    title: d ? `${d.title} · 视频制作技巧及规范` : '视频制作技巧及规范',
    description: d?.summary,
    robots: { index: false, follow: false },
  }
}

export default async function GuideDoc({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params
  const i = guideDocs.findIndex((x) => x.key === doc)
  if (i < 0) notFound()
  const d = guideDocs[i]
  const { html, toc } = renderGuide(d.file)
  const prev = guideDocs[i - 1]
  const next = guideDocs[i + 1]
  return (
    <>
      <Ambient />
      <Nav active="projects" />
      <main className="aw sv">
        <section className="page-hero wrap">
          <nav className="crumb" aria-label="面包屑">
            <Link href="/">首页</Link>
            <span>/</span>
            <Link href="/projects/">项目追踪</Link>
            <span>/</span>
            <Link href="/projects/stake-video/">Stake 视频制作</Link>
            <span>/</span>
            <Link href={guideBase}>{guideIntro.title}</Link>
            <span>/</span>
            <span aria-current="page">{d.title}</span>
          </nav>
          <p className="eyebrow">{d.step} · {d.en}</p>
          <h1 className="h1-page">{d.title}</h1>
          <p className="lead aw-lead">{d.summary}</p>
          <div className="sv-doc-actions">
            <a className="btn" href={guideRaw(d.file)} download>
              下载 {d.file}<Icon name="download" size={16} />
            </a>
            <a className="sv-doc-raw" href={guideRaw(d.file)} target="_blank" rel="noopener">
              查看原始 Markdown<Icon name="link" size={14} />
            </a>
          </div>
          <nav className="sv-doc-switch" aria-label="其他规范">
            {guideDocs.map((x) =>
              x.key === d.key ? (
                <span key={x.key} className="on" aria-current="page"><em>{x.step}</em>{x.title}</span>
              ) : (
                <Link key={x.key} href={`${guideBase}${x.key}/`}><em>{x.step}</em>{x.title}</Link>
              ),
            )}
          </nav>
        </section>

        <section className="wrap block tight sv-doc-body">
          {toc.length > 2 && (
            <nav className="sv-doc-toc" aria-label="本页目录">
              <b>目录</b>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}><a href={`#${t.id}`}>{t.text}</a></li>
                ))}
              </ol>
            </nav>
          )}
          <article className="glass sv-md" dangerouslySetInnerHTML={{ __html: html }} />
        </section>

        <nav className="wrap sv-doc-pager" aria-label="上一篇和下一篇">
          {prev ? (
            <Link href={`${guideBase}${prev.key}/`} className="glass"><small>上一篇</small><b>{prev.title}</b></Link>
          ) : (
            <Link href={guideBase} className="glass"><small>返回</small><b>{guideIntro.title}</b></Link>
          )}
          {next ? (
            <Link href={`${guideBase}${next.key}/`} className="glass sv-next"><small>下一篇</small><b>{next.title}</b></Link>
          ) : (
            <Link href={guideBase} className="glass sv-next"><small>返回</small><b>{guideIntro.title}</b></Link>
          )}
        </nav>
      </main>
      <Footer />
    </>
  )
}
