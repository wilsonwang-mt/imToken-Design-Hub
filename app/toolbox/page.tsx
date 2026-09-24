import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import { Ambient, Footer, Nav } from '@/components/Chrome'
import { atlas, episodes, series, workflows } from '@/content/toolbox'

export const metadata: Metadata = {
  title: '设计师工具箱',
  description: 'Confu「设计师 AI 工具箱」分享系列与团队在用的工作流。',
}

export default function Toolbox() {
  return (
    <>
      <Ambient />
      <Nav active="toolbox" />
      <main>
        <section className="page-hero wrap">
          <nav className="crumb" aria-label="面包屑">
            <Link href="/">首页</Link>
            <span>/</span>
            <span aria-current="page">设计师工具箱</span>
          </nav>
          <p className="eyebrow">05 · TOOLBOX</p>
          <h1 className="h1-page">设计师工具箱</h1>
          <p className="lead">
            我们日常在用的 AI 工具和方法。每一期 Confu 分享讲完后，演示文稿和资料包都会放在这里。
          </p>
        </section>

        <section className="wrap block tight atlas-block" aria-label={atlas.title}>
          <a href={atlas.href} className="glass atlas">
            <div className="atlas-main">
              <p className="eyebrow">{atlas.eyebrow}</p>
              <h2 className="atlas-title">
                {atlas.title}
                <span className="atlas-go"><Icon name="arrow" size={20} /></span>
              </h2>
              <p className="atlas-desc">{atlas.desc}</p>
              <ul className="atlas-cats" aria-label="分类">
                {atlas.categories.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div className="atlas-side">
              <div className="atlas-stats">
                {atlas.stats.map((s) => (
                  <div key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="atlas-logos" aria-hidden="true">
                {atlas.logos.map((l) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <span key={l.name} title={l.name}><img src={l.src} alt="" loading="lazy" /></span>
                ))}
              </div>
              <span className="atlas-cta">打开图鉴 <Icon name="arrowUpRight" size={16} /></span>
            </div>
          </a>
        </section>

        <section className="wrap block tight" aria-labelledby="series-title">
          <div className="block-head">
            <p className="eyebrow">{series.eyebrow}</p>
            <h2 id="series-title">{series.title}</h2>
            <p className="sub">{series.desc}</p>
          </div>

          <div className="episodes">
            {episodes.map((e) =>
              e.status === 'open' ? (
                <article key={e.no} className="glass ep">
                  <div className="ep-head">
                    <span className="num">{e.no}</span>
                    <div className="ep-meta">
                      <span className="tag">EP{e.no}</span>
                      <span className="meta">{e.date}</span>
                    </div>
                  </div>
                  <h3>{e.title}</h3>
                  <p className="ep-sub">{e.subtitle}</p>
                  <p className="ep-sum">{e.summary}</p>
                  {e.tags && (
                    <ul className="tags">
                      {e.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                  <div className="ep-actions">
                    {e.links?.map((l) =>
                      l.kind === 'primary' ? (
                        <a key={l.href} href={l.href} className="btn btn-primary">
                          <Icon name="slides" size={18} /> {l.label}
                        </a>
                      ) : (
                        <a key={l.href} href={l.href} className="btn btn-secondary" {...(l.download ? { download: '' } : {})}>
                          {l.download ? <Icon name="download" size={17} /> : <Icon name="arrowUpRight" size={17} />} {l.label}
                        </a>
                      ),
                    )}
                  </div>
                </article>
              ) : (
                <article key={e.no} className="glass ep ep-soon" aria-disabled="true">
                  <div className="ep-head">
                    <span className="num num-muted">{e.no}</span>
                    <div className="ep-meta">
                      <span className="tag tag-muted">EP{e.no}</span>
                      <span className="meta">筹备中</span>
                    </div>
                  </div>
                  <h3>下一期主题筹备中</h3>
                  <p className="ep-sum">讲完之后会在这里开放演示文稿和资料包。</p>
                  <div className="ep-actions">
                    <span className="btn btn-disabled">
                      <Icon name="lock" size={16} /> 即将开放
                    </span>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="wrap block tight" aria-labelledby="wf-title">
          <div className="block-head">
            <p className="eyebrow">WORKFLOWS</p>
            <h2 id="wf-title">工作流</h2>
            <p className="sub">团队已经在用的协作流程，每一步都有说明页。</p>
          </div>
          <div className="tools">
            {workflows.map((w) => (
              <a key={w.href} href={w.href} className="glass tool">
                <span className="sec-icon"><Icon name="flow" size={22} /></span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                  <span className="meta">{w.meta}</span>
                </div>
                <span className="ep-mini-go"><Icon name="arrowUpRight" size={20} /></span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
