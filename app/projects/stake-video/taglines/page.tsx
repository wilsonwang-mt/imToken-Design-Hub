import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import StakeDocs from '@/components/StakeDocs'
import StakeTaglines from '@/components/StakeTaglines'
import { Ambient, Footer, Nav } from '@/components/Chrome'
import {
  benchmarkGroups, benchmarks, bossLens, decisions, dropped, leaning, method, principles, redLines, stats, taglines, v1Issues, whitespace,
} from '@/content/stake-taglines'

export const metadata: Metadata = {
  title: '宣传语提案 · Stake 视频制作',
  description: 'imToken Stake 宣传语中文修订版：一张卡一个提案，按类别分组，中英双语，附竞品对照和写作原则。',
  robots: { index: false, follow: false },
}

const groups = Object.keys(benchmarkGroups) as (keyof typeof benchmarkGroups)[]

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
            <span className="aw-h1-sub">中文修订版 · 一张卡一个提案，中英双语</span>
          </h1>
          <p className="lead aw-lead">
            宣传语是 Mkt 对外的活动主题，先要是地道的简体中文，再要像专业 Mkt 写的。这一版先看了竞品怎么说，再对照上一版逐条找问题，中文先写、重新起稿，最后由中文和合规两路终审。还在讨论阶段，卡片上的「当前倾向」只是讨论的起点。
          </p>
          <StakeDocs active="taglines" />
          <div className="aw-jump">
            <span className="status open"><i />中文修订版 · 10/07</span>
            <a href="#revise">这一版怎么改的</a>
            <a href="#cards">全部提案</a>
            <a href="#bench">竞品怎么说</a>
            <a href="#leaning">当前倾向</a>
            <a href="#method">方法与红线</a>
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

        {/* ───────── Revise ───────── */}
        <section id="revise" className="wrap block tight" aria-labelledby="revise-title">
          <div className="block-head">
            <p className="eyebrow">REVISION</p>
            <h2 id="revise-title">这一版怎么改的</h2>
            <p className="sub">上一版是中英文一起写的，很多中文读起来像从英文翻过来。下面先列上一版的问题，再列这一版写作时守的规矩。</p>
          </div>
          <div className="sv-revise">
            <div className="glass sv-issues">
              <h3><Icon name="alert" size={18} />上一版的问题</h3>
              <ol>
                {v1Issues.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            </div>
            <div className="glass sv-principles">
              <h3><Icon name="check" size={18} />这一版的写作原则</h3>
              <ol>
                {principles.map((p) => (
                  <li key={p.title}>
                    <b>{p.title}</b>
                    <p>{p.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
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
              点类别可以筛选。主标统一不加句末标点；改自上一版的卡片写明了原句和改动理由；合规风险按中文主标和副标一起评估。
            </p>
          </div>
          <StakeTaglines />
        </section>

        {/* ───────── Benchmarks ───────── */}
        <section id="bench" className="wrap block" aria-labelledby="bench-title">
          <div className="block-head">
            <p className="eyebrow">BENCHMARK · {benchmarks.length}</p>
            <h2 id="bench-title">竞品怎么说</h2>
            <p className="sub">每条原文都打开链接核对过；不是页面主标的（页面描述、帮助文档、文章转引等），卡片上用小字注明。点卡片可以打开原页面。</p>
          </div>
          <div className="glass sv-white">
            <span className="v-cap">还没人占住的位置</span>
            <p>{whitespace}</p>
          </div>
          {groups.map((g) => (
            <div key={g} className="sv-bgroup">
              <h3>{benchmarkGroups[g]}</h3>
              <div className="sv-bench">
                {benchmarks.filter((b) => b.group === g).map((b) => (
                  <a key={b.brand} href={b.url} target="_blank" rel="noopener" className="glass sv-bm">
                    <span className="sv-bm-brand">{b.brand}<Icon name="arrowUpRight" size={14} /></span>
                    <q className="sv-bm-line">{b.line}</q>
                    {b.note && <small className="sv-bm-note">{b.note}</small>}
                    <p>{b.takeaway}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
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
              <div className="sv-decided">
                <h4>已经定了（10/07）</h4>
                <ul>
                  {decisions.map((d) => (
                    <li key={d}><Icon name="check" size={14} />{d}</li>
                  ))}
                </ul>
              </div>
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
            <h2 id="method-title">方法与红线</h2>
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
              <summary>上一版不再保留的 {dropped.length} 条，以及原因</summary>
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
        </section>
      </main>
      <Footer />
    </>
  )
}
