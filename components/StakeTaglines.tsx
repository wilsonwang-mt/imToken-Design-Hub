'use client'

import { useState, type CSSProperties } from 'react'
import { categories, pathLabel, riskLabel, taglines, tierLabel, type Tagline } from '@/content/stake-taglines'

function Card({ t, expanded }: { t: Tagline; expanded: boolean }) {
  return (
    <article id={t.id} className={`glass sv-card tier-${t.tier}`}>
      <header className="sv-card-h">
        <span className="sv-id">{t.id.toUpperCase()}</span>
        <span className="sv-chips">
          {t.boss && <span className="sv-boss" title="从「为网络工作，也为你工作」出发">老板视角</span>}
          <span className={`sv-tier t-${t.tier}`}>{tierLabel[t.tier]}</span>
        </span>
      </header>
      {t.cn ? (
        <>
          <h3 lang="zh-CN">{t.cn}</h3>
          <p className="sv-en" lang="en">{t.en}</p>
        </>
      ) : (
        <>
          <h3 lang="en" className="sv-h-en">{t.en}</h3>
          <p className="sv-nocn">原图只有英文</p>
        </>
      )}
      <div className="sv-subs">
        {t.subCn && <p lang="zh-CN">{t.subCn}</p>}
        <p lang="en">{t.subEn}</p>
      </div>
      <p className="sv-idea">{t.idea}</p>
      <details className="sv-more" open={expanded || undefined} key={String(expanded)}>
        <summary>用在 · 注意{t.revisedFrom ? ' · 改动' : ''}</summary>
        <dl className="sv-notes">
          <div>
            <dt>用在</dt>
            <dd>{t.fit}</dd>
          </div>
          <div>
            <dt>注意</dt>
            <dd>{t.risk}</dd>
          </div>
        </dl>
        {t.revisedFrom && (
          <div className="sv-rev">
            <span>改自上一版「{t.revisedFrom.replace(/[。.]$/, '')}」</span>
            <p>{t.changeNote}</p>
          </div>
        )}
      </details>
      <footer className="sv-card-f">
        <ul className="sv-uses" aria-label="适合用在">
          {t.uses.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
        <div className="sv-meta">
          <span className={`sv-risk r-${t.compliance}`}><i />{riskLabel[t.compliance]}</span>
          {pathLabel[t.paths] && <span>{pathLabel[t.paths]}</span>}
          {!t.revisedFrom && t.tier !== 'ref' && <span>新写</span>}
        </div>
      </footer>
    </article>
  )
}

export default function StakeTaglines() {
  const [filter, setFilter] = useState<string>('all')
  const [leanOnly, setLeanOnly] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const pick = (key: string) => taglines.filter((t) => t.category === key && (!leanOnly || t.tier === 'lean'))
  const shown = categories.filter((c) => (filter === 'all' || filter === c.key) && pick(c.key).length > 0)
  const leanCount = taglines.filter((t) => t.tier === 'lean').length

  return (
    <>
      <div className="aw-layers sv-layers" role="group" aria-label="按类别筛选">
        <button type="button" className={`aw-layer all${filter === 'all' ? ' on' : ''}`} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
          <b>全部</b>
          <span>{taglines.length} 张卡 · {categories.length} 类</span>
        </button>
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`aw-layer${filter === c.key ? ' on' : ''}`}
            style={{ '--kc': c.color } as CSSProperties}
            aria-pressed={filter === c.key}
            onClick={() => setFilter(filter === c.key ? 'all' : c.key)}
          >
            <i aria-hidden="true" />
            <b>{c.title}</b>
            <span>{c.en} · {taglines.filter((t) => t.category === c.key).length}</span>
          </button>
        ))}
      </div>

      <div className="sv-toolbar">
        <button type="button" className={`sv-toggle${leanOnly ? ' on' : ''}`} aria-pressed={leanOnly} onClick={() => setLeanOnly(!leanOnly)}>
          <i aria-hidden="true" />只看当前倾向（{leanCount}）
        </button>
        <button type="button" className={`sv-toggle${expanded ? ' on' : ''}`} aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>
          <i aria-hidden="true" />展开全部说明
        </button>
        <span className="sv-legend">
          <span><i className="r-low" />合规风险低</span>
          <span><i className="r-mid" />中</span>
          <span><i className="r-high" />高</span>
        </span>
      </div>

      {shown.map((c) => (
        <section key={c.key} className="sv-group" style={{ '--kc': c.color } as CSSProperties} aria-labelledby={`g-${c.key}`}>
          <div className="sv-group-h">
            <h3 id={`g-${c.key}`}>{c.title}<small>{c.en}</small></h3>
            <p>{c.desc}</p>
          </div>
          <div className="sv-cards">
            {pick(c.key).map((t) => (
              <Card key={t.id} t={t} expanded={expanded} />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
