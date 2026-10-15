import type { ReactNode } from 'react'
import Link from 'next/link'
import { Ambient, Footer, Nav } from '../Chrome'
import DocSwitcher from './DocSwitcher'
import { projectMetadata } from './ProjectOverview'
import { docTypeLabel, type Project } from '@/content/projects/_schema'

// 项目子页面（调研、方案、会议记录……）的统一外壳：面包屑、标题区、材料切换和页脚都在这里，
// 正文作为 children 传进来，用 <section className="wrap block"> 分块。用法见 docs/project-template.md。

const docStatus = { draft: '讨论稿', final: '定稿', archived: '已归档' } as const

export const docMetadata = projectMetadata

export default function ProjectDoc({ project, docKey, children }: { project: Project; docKey: string; children: ReactNode }) {
  const doc = project.docs?.find((d) => d.key === docKey)
  if (!doc) throw new Error(`${project.slug}: docs 里没有 key 为「${docKey}」的材料（先在 project.ts 登记）`)
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
            <Link href={project.href}>{project.title}</Link>
            <span>/</span>
            <span aria-current="page">{doc.title}</span>
          </nav>
          <p className="eyebrow">{docTypeLabel[doc.type]} · {docStatus[doc.status]}</p>
          <h1 className="h1-page">{doc.title}</h1>
          <p className="lead pj-lead">{doc.summary}</p>
          <div className="pj-meta">
            <span>{doc.author}</span>
            <span>{doc.date}</span>
          </div>
          <DocSwitcher docs={project.docs ?? []} active={doc.key} label={project.title} />
        </section>
        {children}
      </main>
      <Footer />
    </>
  )
}
