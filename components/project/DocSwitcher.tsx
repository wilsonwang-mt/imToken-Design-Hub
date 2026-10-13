import Icon from '../Icon'
import SmartLink from './SmartLink'
import type { Doc } from '@/content/projects/_schema'

// 项目内各份材料之间的切换（取代各项目自己写的 XxxDocs 组件）。材料清单只登记在 project.docs 里。
export default function DocSwitcher({ docs, active, label }: { docs: Doc[]; active: string; label: string }) {
  if (docs.length < 2) return null
  return (
    <nav className="pj-switcher" aria-label={`${label}的材料`}>
      {docs.map((d, i) => {
        const inner = (
          <>
            <em>{String(i + 1).padStart(2, '0')}</em>
            <span>
              <b>{d.title}</b>
              <small>{d.summary}</small>
            </span>
          </>
        )
        return d.key === active ? (
          <span key={d.key} className="pj-switch on" aria-current="page">
            {inner}
          </span>
        ) : (
          <SmartLink key={d.key} href={d.href} hosted={d.kind === 'hosted'} className="pj-switch">
            {inner}
            <Icon name="arrow" size={16} />
          </SmartLink>
        )
      })}
    </nav>
  )
}
