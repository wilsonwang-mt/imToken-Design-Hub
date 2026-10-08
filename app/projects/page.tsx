import type { Metadata } from 'next'
import Link from 'next/link'
import Icon from '@/components/Icon'
import { Ambient, Footer, Nav } from '@/components/Chrome'
import { projects, projectsIntro } from '@/content/projects'

export const metadata: Metadata = {
  title: '项目追踪',
  description: '正在进行的设计项目：当前阶段、最新产出和接下来要讨论的问题。',
  robots: { index: false, follow: false },
}

export default function Projects() {
  return (
    <>
      <Ambient />
      <Nav active="projects" />
      <main>
        <section className="page-hero wrap">
          <nav className="crumb" aria-label="面包屑">
            <Link href="/">首页</Link>
            <span>/</span>
            <span aria-current="page">{projectsIntro.title}</span>
          </nav>
          <p className="eyebrow">{projectsIntro.eyebrow}</p>
          <h1 className="h1-page">{projectsIntro.title}</h1>
          <p className="lead">{projectsIntro.lead}</p>
        </section>

        <section className="wrap block tight" aria-label="项目列表">
          <div className="proj-grid">
            {projects.map((p) => {
              const Card = p.static ? 'a' : Link
              return (
              <Card key={p.slug} href={p.href} className="glass proj">
                <div className="proj-top">
                  <span className="proj-mark" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="status open"><i />{p.status}</span>
                </div>
                <p className="proj-phase">{p.phase}</p>
                <h2 className="proj-title">
                  {p.title}
                  <span className="atlas-go"><Icon name="arrow" size={20} /></span>
                </h2>
                <p className="proj-en">{p.en}</p>
                <p className="proj-desc">{p.desc}</p>
                <ul className="tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="proj-stats">
                  {p.stats.map((s) => (
                    <div key={s.label}>
                      <b>{s.value}</b>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
              )
            })}
            <div className="glass proj proj-soon" aria-disabled="true">
              <span className="sec-icon"><Icon name="projects" size={22} /></span>
              <h2 className="proj-title muted">更多项目陆续加入</h2>
              <p className="proj-desc">Design System、Wallet App 和官网相关的设计项目会逐个整理到这里。</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
