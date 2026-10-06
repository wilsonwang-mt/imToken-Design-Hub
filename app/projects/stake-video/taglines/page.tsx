import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import StakeDocs from '@/components/StakeDocs'
import StakeTaglines from '@/components/StakeTaglines'
import { Ambient, Footer, Nav } from '@/components/Chrome'
import { bossLens, categories, dropped, leaning, method, redLines, stats, taglines } from '@/content/stake-taglines'

export const metadata: Metadata = {
  title: '宣传语提案 · Stake 视频制作',
  description: 'imToken Stake 宣传语头脑风暴：一张卡一个提案，按类别分组，中英双语。',
  robots: { index: false, follow: false },
}

export default function StakeTaglinesPage() {
  const byId = new Map(taglines.map((t) => [t.id, t]))
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
            <span aria-current="page">宣传语提案</span>
          </nav>
          <p className="eyebrow">BRAINSTORM · imToken Stake</p>
          <h1 className="h1-page">
            宣传语提案
            <span className="aw-h1-sub">一张卡一个提案，按类别分组，中英双语</span>
          </h1>
          <p className="lead aw-lead">
            还在头脑风暴，这里不是定稿，是一张想法地图：两轮发散的全部提案，连同同事提出的主题，按讲故事的角度分成几类。每张卡写清思路、和片子的契合点、风险，以及适合用在哪里。
          </p>
          <StakeDocs active="taglines" />
          <div className="aw-jump">
            <span className="status open"><i />头脑风暴 · 第二轮</span>
            <a href="#boss">双重价值视角</a>
            <a href="#cards">全部提案</a>
            <a href="#leaning">当前倾向</a>
            <a href="#method">怎么产出的</a>
          </div>
        </section>

        <section className="wrap aw-headline" aria-label="关键数字">
          {stats.map((s) => (
            <div key={s.label} className="glass aw-stat">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        {/* ───────── Boss lens ───────── */}
        <section id="boss" className="wrap block tight" aria-labelledby="boss-title">
          <div className="glass sv-lens">
            <div className="sv-lens-q">
              <span className="v-cap">一个视角</span>
              <p id="boss-title">为网络工作，<br />也为你工作。</p>
              <small>老板对质押的理解。不直接用作宣传语，而是作为发想的出发点。</small>
            </div>
            <div className="sv-lens-r">
              <div>
                <h3>我们的理解</h3>
                <p>{bossLens.reading}</p>
              </div>
              <div>
                <h3>边界</h3>
                <p>{bossLens.guardrail}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Cards ───────── */}
        <section id="cards" className="wrap block tight" aria-labelledby="cards-title">
          <div className="block-head">
            <p className="eyebrow">PROPOSALS · {taglines.length}</p>
            <h2 id="cards-title">全部提案</h2>
            <p className="sub">
              点类别可以筛选。卡片上的标签：「当前倾向」只是讨论起点；「双重价值」表示体现了上面那个视角；合规风险按中文主标和副标一起评估。
            </p>
          </div>
          <StakeTaglines />
        </section>

        {/* ───────── Leaning ───────── */}
        <section id="leaning" className="wrap block" aria-labelledby="leaning-title">
          <div className="block-head">
            <p className="eyebrow">LEANING · 仅供讨论</p>
            <h2 id="leaning-title">当前倾向</h2>
            <p className="sub">不是结论。写下来是为了讨论时有一个起点。</p>
          </div>
          <div className="sv-lean">
            <div className="glass sv-lean-a">
              <p>{leaning.summary}</p>
              <ul className="sv-lean-cards">
                {leaning.cardIds.map((id) => {
                  const t = byId.get(id)
                  return t ? (
                    <li key={id}>
                      <a href={`#${id}`}>
                        <span>{id.toUpperCase()}</span>
                        <b>{t.cn}</b>
                        <small lang="en">{t.en}</small>
                      </a>
                    </li>
                  ) : null
                })}
              </ul>
            </div>
            <div className="glass sv-open">
              <h3><Icon name="question" size={18} />需要回答的问题</h3>
              <ul>
                {leaning.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── Method ───────── */}
        <section id="method" className="wrap block" aria-labelledby="method-title">
          <div className="block-head">
            <p className="eyebrow">METHOD</p>
            <h2 id="method-title">怎么产出的</h2>
          </div>
          <div className="sv-method">
            <div className="glass sv-rounds">
              {method.rounds.map((r) => (
                <div key={r.no} className="sv-round">
                  <span>{r.no}</span>
                  <div>
                    <b>{r.title}</b>
                    <p>{r.note}</p>
                  </div>
                </div>
              ))}
              <div className="sv-criteria">
                <h4>评审标准</h4>
                <ul className="tags">
                  {method.criteria.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="glass sv-redlines">
              <h3><Icon name="alert" size={18} />合规红线</h3>
              <p className="sv-redlines-n">命中任何一条，提案直接淘汰。</p>
              <ul>
                {redLines.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
          {dropped.length > 0 && (
            <details className="glass sv-dropped">
              <summary>没有做成卡片的 {dropped.length} 条候选，以及原因</summary>
              <ul>
                {dropped.map((d) => (
                  <li key={`${d.cn}-${d.en}`}>
                    <b>{d.cn}</b>
                    <span lang="en">{d.en}</span>
                    <p>{d.reason}</p>
                  </li>
                ))}
              </ul>
            </details>
          )}
          <p className="sv-cats-note">分类：{categories.map((c) => c.title).join(' · ')}</p>
        </section>
      </main>
      <Footer />
    </>
  )
}
