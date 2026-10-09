import Link from 'next/link'
import Icon from './Icon'

// Switch between the Stake 视频制作 project pages (same look as AgenticDocs).
// The PR proposal is a hosted static page (public/projects/stake-video/pr/), so it gets a plain <a>, never next/link.
const docs = [
  { key: 'overview', href: '/projects/stake-video/', step: '01', label: '项目概览', desc: '故事 · 视觉语法 · 进度 · 链接' },
  { key: 'taglines', href: '/projects/stake-video/taglines/', step: '02', label: '宣传语提案', desc: '中文修订版 · 竞品对照 · 中英双语' },
  { key: 'pr', href: '/projects/stake-video/pr/', step: '03', label: '媒体 PR 稿方案', desc: 'PR 标题 · 写作原则 · 数据核查', static: true },
] as const

export default function StakeDocs({ active }: { active: 'overview' | 'taglines' }) {
  return (
    <nav className="aw-docs sv-docs" aria-label="Stake 视频制作文档">
      {docs.map((d) =>
        d.key === active ? (
          <span key={d.key} className="aw-doc on" aria-current="page">
            <em>{d.step}</em>
            <span>
              <b>{d.label}</b>
              <small>{d.desc}</small>
            </span>
          </span>
        ) : 'static' in d ? (
          <a key={d.key} href={d.href} className="aw-doc">
            <em>{d.step}</em>
            <span>
              <b>{d.label}</b>
              <small>{d.desc}</small>
            </span>
            <Icon name="arrow" size={16} />
          </a>
        ) : (
          <Link key={d.key} href={d.href} className="aw-doc">
            <em>{d.step}</em>
            <span>
              <b>{d.label}</b>
              <small>{d.desc}</small>
            </span>
            <Icon name="arrow" size={16} />
          </Link>
        ),
      )}
    </nav>
  )
}
