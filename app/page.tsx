import Link from 'next/link'
import Icon from '@/components/Icon'
import { Ambient, Footer, Nav } from '@/components/Chrome'
import { sections, site } from '@/content/site'
import { episodes } from '@/content/toolbox'

export default function Home() {
  const latest = episodes.filter((e) => e.status === 'open')
  return (
    <>
      <Ambient />
      <Nav />
      <main>
        <section className="hero wrap">
          <p className="eyebrow rise" style={{ animationDelay: '0s' }}>IMTOKEN DESIGN</p>
          <h1 className="rise" style={{ animationDelay: '.1s' }}>
            imToken <span className="h1-accent">Design</span>
          </h1>
          <p className="lead rise" style={{ animationDelay: '.2s' }}>
            {site.tagline}。{site.intro}
          </p>
          <div className="actions rise" style={{ animationDelay: '.3s' }}>
            <Link href="/toolbox/" className="btn btn-primary">
              进入设计师工具箱 <Icon name="arrow" size={18} />
            </Link>
            <Link href="/confu/ep02/" className="btn btn-secondary">
              最新一期 · EP02
            </Link>
          </div>
        </section>

        <section className="wrap block" aria-labelledby="sec-title">
          <div className="block-head">
            <p className="eyebrow">SECTIONS</p>
            <h2 id="sec-title">五个板块</h2>
            <p className="sub">设计师工具箱已经开放，其余板块会陆续上线。</p>
          </div>
          <div className="sections">
            {sections.map((s) => {
              const inner = (
                <>
                  <div className="sec-top">
                    <span className="sec-icon"><Icon name={s.icon} size={22} /></span>
                    {s.status === 'open' ? (
                      <span className="status open"><i />已开放</span>
                    ) : (
                      <span className="status soon"><Icon name="lock" size={13} />即将开放</span>
                    )}
                  </div>
                  <div className="sec-no">{s.no}</div>
                  <h3>
                    {s.title} <span className="en">{s.en}</span>
                  </h3>
                  <p>{s.desc}</p>
                  {s.status === 'open' && (
                    <span className="sec-go">
                      进入 <Icon name="arrow" size={16} />
                    </span>
                  )}
                </>
              )
              return s.status === 'open' && s.href ? (
                <Link key={s.key} href={s.href} className={`glass sec sec-${s.key} is-open`}>
                  {inner}
                </Link>
              ) : (
                <div key={s.key} className={`glass sec sec-${s.key} is-soon`} aria-disabled="true">
                  {inner}
                </div>
              )
            })}
          </div>
        </section>

        <section className="wrap block" aria-labelledby="latest-title">
          <div className="block-head row-head">
            <div>
              <p className="eyebrow">CONFU · 设计师 AI 工具箱</p>
              <h2 id="latest-title">最近的分享</h2>
            </div>
            <Link href="/toolbox/" className="btn btn-ghost">
              全部分享 <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="latest">
            {latest.map((e) => (
              <Link key={e.no} href={e.links?.[0]?.href ?? '/toolbox/'} className="glass ep-mini">
                <div className="ep-mini-no">EP{e.no}</div>
                <div className="ep-mini-body">
                  <span className="meta">{e.date}</span>
                  <h3>{e.title}</h3>
                  <p>{e.subtitle}</p>
                </div>
                <span className="ep-mini-go"><Icon name="arrowUpRight" size={20} /></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
