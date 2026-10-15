import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import StakeDocs from '@/components/StakeDocs'
import { Ambient, Footer, Nav } from '@/components/Chrome'
import { guideBase, guideDocs, guideIntro, guideRaw } from '@/content/stake-guide'
import { renderGuide } from './guide'

export const metadata: Metadata = {
  title: '视频制作技巧及规范 · Stake 视频制作',
  description: '「Bulu 与沉睡的 ETH」的制作方法和硬规则：Bulu 形象、ETH 与质押容器、Remotion 合成、LibTV 画布、配音发音五份规范。',
  robots: { index: false, follow: false },
}

export default function StakeGuide() {
  const overview = renderGuide(guideIntro.overviewFile)
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
            <span aria-current="page">{guideIntro.title}</span>
          </nav>
          <p className="eyebrow">{guideIntro.eyebrow}</p>
          <h1 className="h1-page">
            {guideIntro.title}
            <span className="aw-h1-sub">{guideIntro.sub}</span>
          </h1>
          <p className="lead aw-lead">{guideIntro.lead}</p>
          <StakeDocs active="guide" />
        </section>

        <section className="wrap block tight" aria-labelledby="guide-docs">
          <div className="block-head">
            <p className="eyebrow">DOCUMENTS · {guideDocs.length}</p>
            <h2 id="guide-docs">五份规范</h2>
            <p className="sub">每份都能单独阅读。点卡片读网页版；「下载 .md」拿到原文件，可以直接交给 Claude。</p>
          </div>
          <div className="sv-guide-grid">
            {guideDocs.map((d) => (
              <article key={d.key} className="glass sv-guide-card">
                <Link href={`${guideBase}${d.key}/`} className="sv-guide-main">
                  <em>{d.step}</em>
                  <span className="sv-guide-en">{d.en}</span>
                  <h3>{d.title}</h3>
                  <p>{d.summary}</p>
                  <ul className="tags">
                    {d.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </Link>
                <div className="sv-guide-foot">
                  <Link href={`${guideBase}${d.key}/`}>阅读<Icon name="arrow" size={14} /></Link>
                  <a href={guideRaw(d.file)} download>下载 .md<Icon name="download" size={14} /></a>
                </div>
              </article>
            ))}
          </div>
          <div className="glass sv-guide-bundle">
            <div>
              <b>全部规范合并成一个文件</b>
              <p>交给 Claude 时最省事：一个文件包含总览和五份规范，按阅读顺序排好。</p>
            </div>
            <a className="btn" href={guideRaw(guideIntro.bundleFile)} download>
              下载合集 .md<Icon name="download" size={16} />
            </a>
          </div>
        </section>

        <section className="wrap block" aria-labelledby="guide-overview">
          <div className="block-head">
            <p className="eyebrow">OVERVIEW</p>
            <h2 id="guide-overview">总览：这支视频是怎么做出来的</h2>
            <p className="sub">
              下面是总览文档的全文，
              <a href={guideRaw(guideIntro.overviewFile)} download>下载 00-overview.md</a>。
            </p>
          </div>
          <article className="glass sv-md" dangerouslySetInnerHTML={{ __html: overview.html }} />
        </section>
      </main>
      <Footer />
    </>
  )
}
