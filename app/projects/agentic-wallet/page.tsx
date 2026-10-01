import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import AgenticActions from '@/components/AgenticActions'
import { Ambient, Footer, Nav } from '@/components/Chrome'
import {
  decisions, fixLabel, funnel, headline, meta, metrics, ownerless, problemKinds, problems, sources,
} from '@/content/agentic-wallet'

export const metadata: Metadata = {
  title: 'Agentic Wallet',
  description: 'Alpha 内测阶段一发现的十个问题，以及打造 Agentic Wallet 要做的十件事。',
  robots: { index: false, follow: false },
}

export default function AgenticWallet() {
  return (
    <>
      <Ambient />
      <Nav active="projects" />
      <main className="aw">
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
            <span className="aw-h1-sub">从 Trading Agent 到 Agentic Wallet</span>
          </h1>
          <p className="lead aw-lead">{meta.lead}</p>
          <div className="aw-jump">
            <span className="status open"><i />{meta.status}</span>
            <a href="#problems">内测发现的十个问题</a>
            <a href="#actions">要做的十件事</a>
            <a href="#decide">待拍板</a>
            <a href="#measure">怎么判断做对了</a>
          </div>
        </section>

        <section className="wrap aw-headline" aria-label="关键数字">
          {headline.map((h) => (
            <div key={h.label} className={`glass aw-stat t-${h.tone}`}>
              <b>{h.value}</b>
              <span>{h.label}</span>
            </div>
          ))}
        </section>

        {/* ───────── Part 1 ───────── */}
        <section id="problems" className="wrap block tight" aria-labelledby="p1-title">
          <div className="block-head">
            <p className="eyebrow">PART 1 · 内测发现</p>
            <h2 id="p1-title">Trading Agent 暴露的十个问题</h2>
            <p className="sub">
              第一印象是准的：10/10 都认为这是一个“说一句就下单”的执行器。但真正用下来，门槛都在用户说完那句话之后才一道道冒出来。
            </p>
          </div>

          <div className="glass aw-funnel" aria-label="累计通过人数">
            <div className="aw-funnel-h">
              <div>
                <h3>一步一步掉下去</h3>
                <p>Trading Agent 各场景的累计通过人数（前一步没完成的人不再计入后面）</p>
              </div>
              <div className="aw-legend">
                <span><i className="all" />完成（含弯路）</span>
                <span><i className="clean" />一路零弯路</span>
              </div>
            </div>
            <div className="aw-bars">
              {funnel.map((f) => (
                <div key={f.step} className="aw-bar">
                  <div className="aw-bar-pair">
                    <span className="all" style={{ height: `${f.all * 10}%` }}><em>{f.all}</em></span>
                    <span className="clean" style={{ height: `${Math.max(f.clean * 10, 2)}%` }}><em>{f.clean}</em></span>
                  </div>
                  <small>{f.step}</small>
                </div>
              ))}
            </div>
          </div>

          <p className="aw-premise"><Icon name="alert" size={16} />{meta.premise}</p>

          <div className="aw-problems">
            {problems.map((p) => (
              <article key={p.no} id={p.no.toLowerCase()} className="glass aw-prob">
                <header className="aw-prob-h">
                  <span className="aw-qno">{p.no}</span>
                  <span className="aw-pkind">{problemKinds[p.kind]}</span>
                  <span className={`aw-fix f-${p.fix}`}>{fixLabel[p.fix]}</span>
                </header>
                <h3>{p.title}</h3>
                <div className="aw-pstat">
                  <b>{p.stat}</b>
                  <span>{p.statLabel}</span>
                </div>
                <p className="aw-psum">{p.summary}</p>
                <ul className="aw-pev">
                  {p.evidence.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
                <blockquote className="aw-quote">
                  <Icon name="quote" size={18} />
                  <p>{p.quote.text}</p>
                  <cite>{p.quote.who}</cite>
                </blockquote>
                <p className="aw-fixnote"><b>修复状态</b>{p.fixNote}</p>
                <footer className="aw-prob-f">
                  <span className="aw-stages">
                    {p.stages.map((s) => (
                      <i key={s}>{s}</i>
                    ))}
                  </span>
                  <span className="aw-to">
                    对应要做的事
                    {p.actions.map((a) => (
                      <a key={a} href={`#a-${a}`}>{a}</a>
                    ))}
                  </span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* ───────── Part 2 ───────── */}
        <section id="actions" className="wrap block" aria-labelledby="p2-title">
          <div className="block-head">
            <p className="eyebrow">PART 2 · 下一步</p>
            <h2 id="p2-title">打造 Agentic Wallet 的十件事</h2>
            <p className="sub">
              从产品定位、产品策略、操作流程、用户体验、底层能力到技术应用。每张卡说明为什么要做、要做什么，以及需要一起讨论的问题。点击类型可以筛选。
            </p>
          </div>

          <div className="aw-thesis-band glass">
            <span className="v-cap">一句话</span>
            <p>
              把“说一句就下单”，变成“<b>人和 Agent 一起行动，人始终握有控制权</b>”。资产是结果，授权与 Agent 的行为才是主体。
            </p>
          </div>

          <AgenticActions />
        </section>

        {/* ───────── Decisions ───────── */}
        <section id="decide" className="wrap block" aria-labelledby="d-title">
          <div className="block-head">
            <p className="eyebrow">DECISIONS</p>
            <h2 id="d-title">需要当场拍板的事</h2>
            <p className="sub">当场定不下来的，指定负责人和答复时间。</p>
          </div>
          <div className="aw-decide-grid">
            <ol className="glass aw-decisions">
              {decisions.map((d, i) => (
                <li key={d.no}>
                  <span className="aw-dno">D{i + 1}</span>
                  <p>{d.text}</p>
                  <a href={`#a-${d.no}`}>卡片 {d.no}</a>
                </li>
              ))}
            </ol>
            <div className="glass aw-ownerless">
              <h3>还没有负责人的三个问题</h3>
              <p className="sub">台北 Workshop 提出，超出现有团队分工</p>
              {ownerless.map((o) => (
                <div key={o.title} className="aw-own">
                  <b>{o.title}</b>
                  <p>{o.note}</p>
                  <span>{o.owner}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Metrics ───────── */}
        <section id="measure" className="wrap block" aria-labelledby="m-title">
          <div className="block-head">
            <p className="eyebrow">MEASURE</p>
            <h2 id="m-title">怎么判断做对了</h2>
            <p className="sub">建议下一阶段至少盯这四个数，并在研究里加入外部新手样本和一个真金小额任务。</p>
          </div>
          <div className="aw-metrics">
            {metrics.map((m) => (
              <div key={m.name} className="glass aw-metric">
                <b>{m.name}</b>
                <p>{m.desc}</p>
                <span>对应 {m.hit}</span>
              </div>
            ))}
          </div>
          <div className="aw-sources">
            <h4>资料来源</h4>
            <ul>
              {sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p>参与者以 P01–P10 编号代替姓名；原话均来自参与者记录或录屏。</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
