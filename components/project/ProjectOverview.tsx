import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import Icon from '../Icon'
import { Ambient, Footer, Nav } from '../Chrome'
import DocSwitcher from './DocSwitcher'
import SmartLink from './SmartLink'
import { docTypeLabel, stageLabel, type Project } from '@/content/projects/_schema'

// 项目概览页的统一骨架：区块的顺序和 id 固定（审核脚本和审稿都按这些 id 找内容），
// 项目特有的内容作为 children 放在「当前状态」之后。用法见 docs/project-template.md。

const docStatus = { draft: '讨论稿', final: '定稿', archived: '已归档' } as const

export function projectMetadata(project: Project, docKey = 'overview'): Metadata {
  const doc = project.docs?.find((d) => d.key === docKey)
  const title = doc && docKey !== 'overview' ? `${doc.title} · ${project.title}` : project.title
  return { title, description: doc?.summary ?? project.desc }
}

export default function ProjectOverview({ project, children }: { project: Project; children?: ReactNode }) {
  const o = project.overview
  if (!o) throw new Error(`${project.slug}: project.overview 缺失（新项目必填，见 docs/project-template.md）`)
  const stage = project.stage ?? 'designing'
  const docs = project.docs ?? []
  const links = project.links ?? []
  const people = [project.owner, ...(project.members ?? [])].filter(Boolean)

  return (
    <>
      <Ambient />
      <Nav active="projects" />
      <main className={['pj', project.cssPrefix].filter(Boolean).join(' ')}>
        <section className="page-hero wrap">
          <nav className="crumb" aria-label="面包屑">
            <Link href="/">首页</Link>
            <span>/</span>
            <Link href="/projects/">项目追踪</Link>
            <span>/</span>
            <span aria-current="page">{project.title}</span>
          </nav>
          <p className="eyebrow">PROJECT · {stageLabel[stage]}</p>
          <h1 className="h1-page">
            {project.title}
            <span className="pj-h1-sub">{project.en}</span>
          </h1>
          <p className="lead pj-lead">{project.desc}</p>
          <div className="pj-meta">
            <span className={`pj-stage s-${stage}`}><i />{project.status}</span>
            {project.owner && <span>负责人 · {project.owner.name}</span>}
            {project.updated && <span>更新于 {project.updated}</span>}
          </div>
          <DocSwitcher docs={docs} active="overview" label={project.title} />
        </section>

        <section id="background" className="wrap block tight" aria-labelledby="pj-bg">
          <div className="block-head">
            <p className="eyebrow">BACKGROUND</p>
            <h2 id="pj-bg">背景与目标</h2>
          </div>
          <div className="pj-two">
            <div className="glass pj-box">
              <h3>为什么做</h3>
              <p>{o.background}</p>
            </div>
            <div className="glass pj-box">
              <h3>目标</h3>
              <ul className="pj-list">
                {o.goals.map((g) => <li key={g}>{g}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="status" className="wrap block" aria-labelledby="pj-status">
          <div className="block-head">
            <p className="eyebrow">STATUS</p>
            <h2 id="pj-status">当前状态</h2>
            <p className="sub">{o.current}</p>
          </div>
          {o.timeline.length > 0 && (
            <ol className="glass pj-timeline" aria-label="时间线">
              {o.timeline.map((t) => (
                <li key={`${t.date}-${t.title}`} className={`t-${t.state}`}>
                  <span className="pj-tl-date">{t.date}</span>
                  <span className="pj-tl-dot" aria-hidden="true" />
                  <div>
                    <b>{t.title}</b>
                    {t.note && <p>{t.note}</p>}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>

        {children}

        <section id="materials" className="wrap block" aria-labelledby="pj-mat">
          <div className="block-head">
            <p className="eyebrow">MATERIALS · {docs.length}</p>
            <h2 id="pj-mat">材料</h2>
          </div>
          <div className="pj-docs-grid">
            {docs.map((d) => (
              <SmartLink key={d.key} href={d.href} hosted={d.kind === 'hosted'} className="glass pj-doc">
                <span className="pj-doc-meta">{docTypeLabel[d.type]} · {docStatus[d.status]} · {d.date}</span>
                <b>{d.title}</b>
                <p>{d.summary}</p>
                <span className="pj-doc-by">{d.author}</span>
              </SmartLink>
            ))}
          </div>
        </section>

        <section className="wrap block" aria-labelledby="pj-dq">
          <div className="block-head">
            <p className="eyebrow">DECISIONS · QUESTIONS</p>
            <h2 id="pj-dq">决定与问题</h2>
          </div>
          <div className="pj-two">
            <div id="decisions" className="glass pj-box">
              <h3>关键决定</h3>
              {o.decisions.length > 0 ? (
                <ol className="pj-rows">
                  {o.decisions.map((d) => (
                    <li key={`${d.date}-${d.text}`}>
                      <span className="pj-date">{d.date}</span>
                      <p>{d.text}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="pj-empty">还没有定下来的事。</p>
              )}
            </div>
            <div id="questions" className="glass pj-box">
              <h3>待决问题</h3>
              {o.openQuestions.length > 0 ? (
                <ul className="pj-rows pj-q">
                  {o.openQuestions.map((q) => (
                    <li key={q.text}>
                      <Icon name="question" size={16} />
                      <p>{q.text}{q.owner && <span className="pj-owner">由 {q.owner} 回答</span>}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="pj-empty">目前没有待决问题。</p>
              )}
            </div>
          </div>
        </section>

        <section className="wrap block" aria-labelledby="pj-info">
          <div className="block-head">
            <p className="eyebrow">INFO</p>
            <h2 id="pj-info">项目信息</h2>
          </div>
          <div className="pj-three">
            <div id="people" className="glass pj-box">
              <h3>负责人与参与者</h3>
              <ul className="pj-people">
                {people.map((p, i) => p && (
                  <li key={`${p.name}-${i}`}>
                    <b>{p.name}</b>
                    <span>{i === 0 ? `负责人 · ${p.role}` : p.role}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="links" className="glass pj-box">
              <h3>相关链接</h3>
              {links.length > 0 ? (
                <ul className="pj-links">
                  {links.map((l) => (
                    <li key={l.href}>
                      <SmartLink href={l.href}>
                        {l.label}
                        <Icon name="link" size={14} />
                      </SmartLink>
                      <span>{l.needsLogin ? '需公司账号' : '公开'}{l.note && ` · ${l.note}`}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="pj-empty">还没有外部链接。</p>
              )}
            </div>
            <div id="changelog" className="glass pj-box">
              <h3>更新记录</h3>
              <ol className="pj-rows">
                {(project.changelog ?? []).map((c) => (
                  <li key={`${c.date}-${c.note}`}>
                    <span className="pj-date">{c.date}</span>
                    <p>{c.note}<span className="pj-owner">{c.by}</span></p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
