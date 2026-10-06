import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import AgenticDocs from '@/components/AgenticDocs'
import { Ambient, Footer, Nav } from '@/components/Chrome'
import {
  actionItems, assistantMvp, combo, engine, inputs, levels, meetingMeta, openQuestions, pillars,
  pipeline, positioning, risks, scenarios, stages, tagLabel, tldr, type Tag,
} from '@/content/agentic-wallet-meeting'

export const metadata: Metadata = {
  title: 'Agentic Wallet 讨论结论',
  description: 'Agentic Wallet 下一阶段的产品定位、信息架构、决策引擎与 Assistant → Advisor → Portfolio Manager 路线。',
  robots: { index: false, follow: false },
}

function T({ tag }: { tag: Tag }) {
  return <span className={`mt-tag g-${tag}`}>{tagLabel[tag]}</span>
}

function Head({ no, eyebrow, title, sub, tag }: { no: string; eyebrow: string; title: string; sub?: string; tag?: Tag }) {
  return (
    <div className="block-head mt-head">
      <p className="eyebrow">{no} · {eyebrow}</p>
      <h2>
        {title}
        {tag && <T tag={tag} />}
      </h2>
      {sub && <p className="sub">{sub}</p>}
    </div>
  )
}

export default function Meeting() {
  const gates = Array.from(new Set(actionItems.map((a) => a.gate)))
  return (
    <>
      <Ambient />
      <Nav active="projects" />
      <main className="aw mt">
        {/* ── Hero ── */}
        <section className="page-hero wrap">
          <nav className="crumb" aria-label="面包屑">
            <Link href="/">首页</Link>
            <span>/</span>
            <Link href="/projects/">项目追踪</Link>
            <span>/</span>
            <Link href="/projects/agentic-wallet/">Agentic Wallet</Link>
            <span>/</span>
            <span aria-current="page">会议结论</span>
          </nav>
          <p className="eyebrow">{meetingMeta.eyebrow}</p>
          <h1 className="h1-page">
            {meetingMeta.title}
            <span className="aw-h1-sub">{meetingMeta.sub}</span>
          </h1>
          <div className="mt-meta">
            <span><b>地点</b>{meetingMeta.where}</span>
            <span><b>参与</b>{meetingMeta.who}</span>
            <span><b>时间</b>{meetingMeta.when}</span>
          </div>
          <p className="lead aw-lead">{meetingMeta.lead}</p>
          <AgenticDocs active="meeting" />
          <div className="mt-legend" aria-label="标签说明">
            {(Object.keys(tagLabel) as Tag[]).map((t) => (
              <span key={t}><T tag={t} />{t === 'decided' ? '会上已经定下' : t === 'input' ? '管理层提出的问题与要求' : t === 'proposal' ? '团队据此提出的方案' : '还需要确认'}</span>
            ))}
          </div>
        </section>

        {/* ── TL;DR ── */}
        <section className="wrap mt-tldr" aria-label="结论摘要">
          {tldr.map((x) => (
            <div key={x.k} className={`glass mt-tl g-${x.tag}`}>
              <div className="mt-tl-h">
                <b>{x.k}</b>
                <T tag={x.tag} />
              </div>
              <p>{x.v}</p>
            </div>
          ))}
        </section>

        <nav className="wrap aw-jump mt-jump" aria-label="页内导航">
          <a href="#inputs">01 管理层输入</a>
          <a href="#position">02 产品定位</a>
          <a href="#ia">03 信息架构</a>
          <a href="#agentic">04 场景 Agentic 化</a>
          <a href="#engine">05 决策引擎</a>
          <a href="#roadmap">06 三阶段路线</a>
          <a href="#next">07 下一步</a>
        </nav>

        {/* ── 01 Inputs ── */}
        <section id="inputs" className="wrap block tight">
          <Head no="01" eyebrow="INPUTS" title="两道门：价值与安全" tag="input"
            sub="管理层的两点输入，决定了下一阶段先做什么、后做什么。两道门都没过之前，偏扩展的工作往后排。" />
          <div className="mt-inputs">
            {inputs.map((i) => (
              <article key={i.no} className="glass mt-input">
                <header>
                  <span className="mt-gate">{i.no === '01' ? '价值门' : '安全门'}</span>
                  <h3>{i.title}</h3>
                </header>
                <blockquote className="mt-q"><Icon name="quote" size={18} /><p>{i.quote}</p></blockquote>
                <h4>现有证据</h4>
                <dl className="mt-facts">
                  {i.facts.map((f) => (
                    <div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
                  ))}
                </dl>
                <p className="mt-verdict">{i.verdict}</p>
                <h4>下一步 <T tag="proposal" /></h4>
                <ol className="aw-moves">
                  {i.next.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        {/* ── 02 Positioning ── */}
        <section id="position" className="wrap block">
          <Head no="02" eyebrow="POSITIONING" title="我们做的是 Agentic Wallet" tag="decided" />
          <div className="glass mt-question">
            <span className="v-cap">会上的问题</span>
            <p>{positioning.question}</p>
          </div>
          <div className="mt-options">
            {positioning.options.map((o) => (
              <div key={o.key} className={`glass mt-opt${o.chosen ? ' chosen' : ''}`}>
                <span className="mt-opt-k">{o.chosen ? <Icon name="check" size={18} /> : o.key}</span>
                <h3>{o.title}</h3>
                <p className="mt-opt-who">{o.who}</p>
                <p className="mt-opt-c">{o.cons}</p>
                {o.chosen && <T tag="decided" />}
              </div>
            ))}
          </div>
          <p className="mt-note"><Icon name="link" size={16} />{positioning.note}</p>
        </section>

        {/* ── 03 IA / whiteboard ── */}
        <section id="ia" className="wrap block">
          <Head no="03" eyebrow="INFORMATION ARCHITECTURE" title="四个支柱：Store · Send · Trade · Bridge" tag="decided"
            sub="来自会上的白板。每个支柱先列用户真实的痛点，Agent 去解决痛点，而不是为了 Agent 而 Agent。" />
          <div className="mt-wb">
            <div className="mt-wb-top">
              <span>Wallet</span>
              <i aria-hidden="true" />
              <span className="ag">Agentic</span>
            </div>
            <div className="mt-pillars">
              {pillars.map((p) => (
                <div key={p.key} className={`glass mt-pillar p-${p.key}${p.empty ? ' empty' : ''}`}>
                  <div className="mt-pillar-h">
                    <b>{p.title}</b>
                    <span>{p.zh}</span>
                  </div>
                  {p.groups.map((g) => (
                    <div key={g.h} className={`mt-grp${'highlight' in g && g.highlight ? ' hl' : ''}`}>
                      <h4>{g.h}</h4>
                      {g.items.length > 0 && (
                        <div className="mt-chips">
                          {g.items.map((it) => (
                            <span key={it}>{it}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="mt-agent">
                    <span>Agent 能做什么</span>
                    <p>{p.agent}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-wb-f">Store 是安全底座，支撑其余三个场景；“哨兵”在白板上被框出，是新增的重点：Agent 主动盯盘、先提醒，而不只是被叫到才行动。</p>
          </div>
        </section>

        {/* ── 04 Agentic levels ── */}
        <section id="agentic" className="wrap block">
          <Head no="04" eyebrow="AGENTIC SCENARIOS" title="所有场景共用一条执行链路" tag="proposal"
            sub="产品的基本单位不再是“一个 Trading Agent”，而是一条共用链路。Send、Swap、Bridge、Trade 都是挂在这条链路上的工具。" />
          <ol className="glass mt-pipe">
            {pipeline.map((p, i) => (
              <li key={p} className={i === 2 ? 'key' : undefined}>
                <em>{i + 1}</em>
                <b>{p}</b>
              </li>
            ))}
          </ol>
          <p className="mt-pipe-n">每个 Agent 流程都落到一张可编辑的计划卡上：计划卡本身就是表单，AI 是主交互，传统 UI 是精确兜底。</p>

          <div className="mt-levels">
            {levels.map((l, i) => (
              <div key={l.lv} className="glass mt-lv" style={{ marginTop: `${(2 - i) * 28}px` }}>
                <span className="mt-lv-k">{l.lv}</span>
                <b>{l.name}</b>
                <p>{l.desc}</p>
                <small>{l.eg}</small>
              </div>
            ))}
          </div>

          <div className="glass mt-table-wrap">
            <table className="mt-table">
              <thead>
                <tr><th>场景</th><th>Agentic 化带来什么</th><th>主要风险</th><th>可验证性</th><th>下一阶段目标</th></tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.s}>
                    <td data-l="场景"><b>{s.s}</b></td>
                    <td data-l="带来什么">{s.gain}</td>
                    <td data-l="主要风险">{s.risk}</td>
                    <td data-l="可验证性"><span className={`mt-v v-${s.verify === '高' ? 'hi' : 'mid'}`}>{s.verify}</span></td>
                    <td data-l="目标"><span className="mt-target">{s.target}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="glass mt-combo">
            <div className="mt-combo-say">
              <span className="v-cap">跨场景组合</span>
              <p>“{combo.say}”</p>
            </div>
            <div className="mt-combo-flow">
              {combo.steps.map((s, i) => (
                <span key={s}>{i > 0 && <Icon name="arrow" size={16} />}<b>{s}</b></span>
              ))}
              <span className="one"><Icon name="arrow" size={16} /><b>1 张计划卡 · 1 次确认</b></span>
            </div>
            <p>{combo.point}</p>
          </div>
        </section>

        {/* ── 05 Engine ── */}
        <section id="engine" className="wrap block">
          <Head no="05" eyebrow="DECISION ENGINE" title="决策引擎：先帮用户少犯错" tag="proposal" sub={engine.thesis} />
          <div className="glass mt-formula">
            <code>{engine.formula}</code>
            <span>优化目标是期望值，不是胜率</span>
          </div>
          <div className="mt-engine">
            {engine.layers.map((l, i) => (
              <div key={l.n} className={`glass mt-layer${l.n === '风控' ? ' veto' : ''}`}>
                <span className="mt-layer-no">{i + 1}</span>
                <b>{l.n}</b>
                <p>{l.d}</p>
                <small>{l.key}</small>
              </div>
            ))}
          </div>
          <p className="mt-loop"><Icon name="flow" size={16} />复盘结果回到数据与信号层，持续校准和淘汰无效信号</p>
          <div className="mt-engine-b">
            <div className="glass mt-object">
              <h4>决策对象（也是用户看到的计划卡）</h4>
              <div className="mt-chips big">
                {engine.object.map((o) => (
                  <span key={o} className={o === '失效条件' || o === '证据' || o === '成本' ? 'em' : undefined}>{o}</span>
                ))}
              </div>
            </div>
            <div className="glass mt-split">
              <div>
                <h4>LLM 负责</h4>
                <ul>{engine.split.llm.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <h4>确定性工具负责</h4>
                <ul>{engine.split.tool.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 06 Roadmap ── */}
        <section id="roadmap" className="wrap block">
          <Head no="06" eyebrow="ROADMAP" title="Assistant → Advisor → Portfolio Manager" tag="decided"
            sub="每往前走一阶，Agent 拿到的决定权多一层，用户要给的信任也多一层。能不能进入下一阶段，由证据决定，而不是时间表。" />
          <div className="mt-stages">
            {stages.map((s, i) => (
              <article key={s.key} className={`glass mt-stage${s.now ? ' now' : ''}`}>
                <header>
                  <span className="mt-st-no">0{i + 1}</span>
                  {s.now && <span className="mt-now">先从这里开始</span>}
                </header>
                <h3>{s.name}<span>{s.zh}</span></h3>
                <p className="mt-st-line">{s.line}</p>
                <dl className="mt-st-dl">
                  <div><dt>谁做决定</dt><dd>{s.decide}</dd></div>
                  <div><dt>Agent 输出</dt><dd>{s.output}</dd></div>
                  <div><dt>授权方式</dt><dd>{s.auth}</dd></div>
                  <div><dt>要建立</dt><dd className="b">{s.builds}</dd></div>
                </dl>
                <h4>核心能力</h4>
                <div className="mt-chips">
                  {s.caps.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
                {s.gate.length > 0 && (
                  <div className="mt-gate-box">
                    <h4>进入下一阶段前必须证明 <T tag="proposal" /></h4>
                    <ul>{s.gate.map((g) => <li key={g}>{g}</li>)}</ul>
                  </div>
                )}
              </article>
            ))}
          </div>
          <div className="mt-trust" aria-hidden="true">
            <span>用户决定</span>
            <i />
            <span>Agent 在授权内决定</span>
          </div>

          <div className="mt-mvp">
            <div className="glass mt-mvp-a">
              <h3>Assistant 第一版 <T tag="proposal" /></h3>
              <div className="mt-first">
                {assistantMvp.first.map((f, i) => (
                  <span key={f}><em>{i + 1}</em>{f}</span>
                ))}
              </div>
              <p className="mt-later">{assistantMvp.later}</p>
              <h4>不能只是又一个聊天机器人</h4>
              <dl className="mt-facts">
                {assistantMvp.moat.map((m) => (
                  <div key={m.k}><dt>{m.k}</dt><dd>{m.v}</dd></div>
                ))}
              </dl>
            </div>
            <div className="glass mt-mvp-b">
              <h3>衡量：从“赚没赚钱”换成“帮没帮上”</h3>
              <ul className="mt-metrics">
                {assistantMvp.metrics.map((m) => (
                  <li key={m.k}><b>{m.k}</b><span>{m.v}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-risks">
            {risks.map((r) => (
              <div key={r.t} className="glass mt-risk">
                <Icon name="alert" size={18} />
                <b>{r.t}</b>
                <p>{r.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 07 Next ── */}
        <section id="next" className="wrap block">
          <Head no="07" eyebrow="NEXT STEPS" title="下一步" tag="proposal" sub="负责方以角色标注，时间在排期会上确定。" />
          <div className="mt-actions">
            {gates.map((g) => (
              <div key={g} className="glass mt-act-col">
                <h3>{g}</h3>
                <ul>
                  {actionItems.filter((a) => a.gate === g).map((a) => (
                    <li key={a.t}>
                      <span className="mt-box" aria-hidden="true" />
                      <div>
                        <p>{a.t}</p>
                        <small>{a.owner}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="glass mt-open">
            <h3>待确认 <T tag="open" /></h3>
            <ul>
              {openQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          </div>
          <div className="aw-sources">
            <p>
              相关材料：<Link href="/projects/agentic-wallet/">会前阅读 · 内测十个问题与要做的十件事</Link> · GitHub Epic #424 · Task #527（产品定位及信息架构讨论）。
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
