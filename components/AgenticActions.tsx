'use client'

import { useState } from 'react'
import { actionKinds, actions, type ActionKind } from '@/content/agentic-wallet'
import CardVisual from './AgenticVisuals'
import Icon from './Icon'

const order = Object.keys(actionKinds) as ActionKind[]

export default function AgenticActions() {
  const [filter, setFilter] = useState<ActionKind | 'all'>('all')
  const count = (k: ActionKind) => actions.filter((a) => a.kind === k || a.also === k).length
  const shown = actions.filter((a) => filter === 'all' || a.kind === filter || a.also === filter)

  return (
    <>
      <div className="aw-layers" role="group" aria-label="按类型筛选">
        <button type="button" className={`aw-layer all${filter === 'all' ? ' on' : ''}`} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
          <b>全部</b>
          <span>10 件事</span>
        </button>
        {order.map((k) => (
          <button
            key={k}
            type="button"
            className={`aw-layer k-${k}${filter === k ? ' on' : ''}`}
            aria-pressed={filter === k}
            onClick={() => setFilter(filter === k ? 'all' : k)}
          >
            <i aria-hidden="true" />
            <b>{actionKinds[k].label}</b>
            <span>{actionKinds[k].desc} · {count(k)}</span>
          </button>
        ))}
      </div>

      <div className="aw-actions">
        {shown.map((a) => (
          <article key={a.no} id={`a-${a.no}`} className={`glass aw-act k-${a.kind}`}>
            <header className="aw-act-h">
              <span className="aw-num">{a.no}</span>
              <div className="aw-chips">
                <span className={`aw-kind k-${a.kind}`}>{actionKinds[a.kind].label}</span>
                {a.also && <span className={`aw-kind ghost k-${a.also}`}>{actionKinds[a.also].label}</span>}
                {a.decide && <span className="aw-decide"><Icon name="question" size={13} />需拍板</span>}
              </div>
            </header>
            <h3>{a.title}</h3>
            <p className="aw-en">{a.en}</p>
            <p className="aw-thesis">{a.thesis}</p>

            <CardVisual kind={a.visual} />

            <div className={`aw-cols${a.moves.length ? '' : ' single'}`}>
              <div>
                <h4>为什么</h4>
                <ul className="aw-why">
                  {a.why.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
              {a.moves.length > 0 && (
                <div>
                  <h4>要做什么</h4>
                  <ol className="aw-moves">
                    {a.moves.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="aw-ask">
              <span><Icon name="question" size={16} />一起讨论</span>
              <p>{a.question}</p>
            </div>

            <footer className="aw-act-f">
              <span className="aw-solves">
                回应问题
                {a.solves.map((q) => (
                  <a key={q} href={`#${q.toLowerCase()}`}>{q}</a>
                ))}
              </span>
              <span className="aw-src">{a.sources.join(' · ')}</span>
            </footer>
          </article>
        ))}
      </div>
    </>
  )
}
