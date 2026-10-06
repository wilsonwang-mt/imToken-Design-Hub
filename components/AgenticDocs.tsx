import Link from 'next/link'
import Icon from './Icon'

// Switch between the two Agentic Wallet documents: the pre-read and the meeting record.
const docs = [
  { key: 'preread', href: '/projects/agentic-wallet/', step: '01', label: '会前阅读', desc: '内测十个问题 · 要做的十件事' },
  { key: 'meeting', href: '/projects/agentic-wallet/meeting/', step: '02', label: '会议结论', desc: '决定 · 输入 · 路线 · 行动项' },
] as const

export default function AgenticDocs({ active }: { active: 'preread' | 'meeting' }) {
  return (
    <nav className="aw-docs" aria-label="Agentic Wallet 文档">
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
