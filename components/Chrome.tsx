import Link from 'next/link'
import Icon from './Icon'
import { sections, site } from '@/content/site'

export function Nav({ active }: { active?: string }) {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link href="/" className="brand" aria-label="imToken Design 首页">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/imtoken-logo.png" alt="imToken" height={22} />
          <span className="brand-sep" aria-hidden="true" />
          <span className="brand-word">Design</span>
        </Link>
        <nav className="nav-links" aria-label="主导航">
          {sections.map((s) =>
            s.status === 'open' && s.href ? (
              <Link key={s.key} href={s.href} className={active === s.key ? 'on' : undefined}>
                {s.title}
              </Link>
            ) : (
              <span key={s.key} className="off" title="即将开放">
                {s.title}
              </span>
            ),
          )}
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div>
          <b>imToken Design</b>
          <span>UXD Team · 内容持续更新中</span>
        </div>
        <a href={site.repo} target="_blank" rel="noopener" className="foot-link">
          <Icon name="github" size={18} /> GitHub
        </a>
      </div>
    </footer>
  )
}

export function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <i className="b1" />
      <i className="b2" />
      <i className="b3" />
    </div>
  )
}
