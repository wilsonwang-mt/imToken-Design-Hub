import Link from 'next/link'
import Icon from './Icon'

// Switch between the Stake 视频制作 project pages (same look as AgenticDocs).
const docs = [
  { key: 'overview', href: '/projects/stake-video/', step: '01', label: '项目概览', desc: '故事 · 视觉语法 · 进度 · 链接' },
  { key: 'taglines', href: '/projects/stake-video/taglines/', step: '02', label: '宣传语提案', desc: '头脑风暴 · 中英双语 · 按类别分组' },
] as const

export default function StakeDocs({ active }: { active: 'overview' | 'taglines' }) {
  return (
    <nav className="aw-docs" aria-label="Stake 视频制作文档">
      {docs.map((d) =>
        d.key === active ? (
          <span key={d.key} className="aw-doc on" aria-current="page">
            <em>{d.step}</em>
            <span>
              <b>{d.label}</b>
              <small>{d.desc}</small>
            </span>
          </span>
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
