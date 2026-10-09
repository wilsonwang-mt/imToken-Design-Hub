import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import StakeDocs from '@/components/StakeDocs'
import { Ambient, Footer, Nav } from '@/components/Chrome'
import { audience, grammar, headline, links, meta, milestones, open, pipeline, story } from '@/content/stake-video'

export const metadata: Metadata = {
  title: 'Stake 视频制作',
  description: 'imToken Stake 上线推广短片「Bulu 与沉睡的 ETH」：故事、视觉语法、制作流程、进度和相关链接。',
  robots: { index: false, follow: false },
}

const stateLabel = { done: '已完成', now: '进行中', next: '接下来' } as const

export default function StakeVideo() {
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
            <span aria-current="page">{meta.title}</span>
          </nav>
          <p className="eyebrow">{meta.eyebrow}</p>
          <h1 className="h1-page">
            {meta.title}
            <span className="aw-h1-sub">{meta.sub} · {meta.en}</span>
          </h1>
          <p className="lead aw-lead">{meta.lead}</p>
          <StakeDocs active="overview" />
          <div className="aw-jump">
            <span className="status open"><i />{meta.status}</span>
            <a href="#story">故事</a>
            <a href="#grammar">视觉语法</a>
            <a href="#making">制作流程与进度</a>
            <a href="#links">链接</a>
          </div>
        </section>

        <section className="wrap aw-headline" aria-label="关键数字">
          {headline.map((h) => (
            <div key={h.label} className="glass aw-stat">
              <b>{h.value}</b>
              <span>{h.label}</span>
            </div>
          ))}
        </section>

        <section className="wrap sv-message" aria-label="核心信息">
          <div className="glass sv-message-in">
            <span className="v-cap">核心信息</span>
            <p className="sv-message-q">{meta.message}</p>
            <p className="sv-message-n">{meta.messageNote}</p>
          </div>
          <div className="glass sv-aud">
            <span className="v-cap">写给谁</span>
            <p className="sv-aud-who">{audience.who}</p>
            <p className="sv-aud-q">“{audience.quote}”</p>
            <span className="v-cap sv-rules-cap">文案口径</span>
            <ul className="sv-paths">
              {audience.rules.map((r) => (
                <li key={r.name}>
                  <b>{r.name}</b>
                  <span>{r.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ───────── Story ───────── */}
        <section id="story" className="wrap block tight" aria-labelledby="story-title">
          <div className="block-head">
            <p className="eyebrow">STORY · 59 秒</p>
            <h2 id="story-title">故事：从沉睡到醒来</h2>
            <p className="sub">六幕，每一幕下面是对应的中文旁白。</p>
          </div>
          <ol className="sv-story">
            {story.map((s) => (
              <li key={s.no} className="glass sv-act">
                <header>
                  <span className="sv-act-no">{s.no}</span>
                  <span className="sv-act-shots">{s.shots}</span>
                </header>
                <h3>{s.title}</h3>
                <p className="sv-act-text">{s.text}</p>
                <p className="sv-act-vo"><Icon name="quote" size={16} />{s.vo}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ───────── Grammar ───────── */}
        <section id="grammar" className="wrap block" aria-labelledby="grammar-title">
          <div className="block-head">
            <p className="eyebrow">VISUAL GRAMMAR</p>
            <h2 id="grammar-title">画面里的每样东西代表什么</h2>
            <p className="sub">全片的硬规则。生成、修图和合成都按这张表检查，让观众不用读字也能看懂「数量不变 → 开始累积」和「始终是你的」。</p>
          </div>
          <div className="glass sv-grammar">
            {grammar.map((g) => (
              <div key={g.el} className="sv-gram">
                <b>{g.el}</b>
                <span className="sv-gram-m">{g.means}</span>
                <p>{g.rule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── Making ───────── */}
        <section id="making" className="wrap block" aria-labelledby="making-title">
          <div className="block-head">
            <p className="eyebrow">MAKING</p>
            <h2 id="making-title">制作流程与进度</h2>
            <p className="sub">AI 视频一律固定机位，推拉、ETH 的跳跃、容器和光带都在代码图层里做，所以镜头之间的空间关系和信息层始终准确。</p>
          </div>
          <ol className="sv-pipe">
            {pipeline.map((p, i) => (
              <li key={p.step} className="glass">
                <span className="sv-pipe-no">{String(i + 1).padStart(2, '0')}</span>
                <b>{p.step}</b>
                <span className="sv-pipe-tools">{p.tools}</span>
                <p>{p.note}</p>
              </li>
            ))}
          </ol>

          <div className="sv-progress">
            <ol className="glass sv-timeline" aria-label="时间线">
              {milestones.map((m) => (
                <li key={m.date} className={`s-${m.state}`}>
                  <span className="sv-tl-date">{m.date}</span>
                  <span className="sv-tl-dot" aria-hidden="true" />
                  <div>
                    <b>{m.title}<em>{stateLabel[m.state]}</em></b>
                    <p>{m.note}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="glass sv-open">
              <h3><Icon name="question" size={18} />接下来要定的事</h3>
              <ul>
                {open.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── Links ───────── */}
        <section id="links" className="wrap block" aria-labelledby="links-title">
          <div className="block-head">
            <p className="eyebrow">LINKS</p>
            <h2 id="links-title">材料与链接</h2>
            <p className="sub">外部工具需要用公司账号登录。</p>
          </div>
          <div className="sv-links">
            {links.map((l) => {
              const body = (
                <>
                  <span className="sv-link-note">{l.note}</span>
                  <b>{l.title}</b>
                  <p>{l.desc}</p>
                  <span className="sv-link-go">
                    {l.href ? <Icon name={l.internal ? 'arrow' : 'arrowUpRight'} size={18} /> : <Icon name="lock" size={16} />}
                  </span>
                </>
              )
              if (!l.href) {
                return (
                  <div key={l.title} className="glass sv-link off" aria-disabled="true">
                    {body}
                  </div>
                )
              }
              if (l.hosted) {
                return (
                  <a key={l.title} href={l.href} className="glass sv-link primary">
                    {body}
                  </a>
                )
              }
              return l.internal ? (
                <Link key={l.title} href={l.href} className="glass sv-link primary">
                  {body}
                </Link>
              ) : (
                <a key={l.title} href={l.href} target="_blank" rel="noopener" className="glass sv-link">
                  {body}
                </a>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
