import Link from 'next/link'
import type { ReactNode } from 'react'

// 站内 React 页面用 next/link；托管整页（public/ 下的 HTML）和外链用普通 <a>。
// 不要给托管页用 next/link：它会按 Next 路由去预取，结果是 404 或整页闪一下。
export default function SmartLink({
  href,
  hosted,
  className,
  children,
  label,
}: {
  href: string
  hosted?: boolean
  className?: string
  children: ReactNode
  label?: string
}) {
  const external = /^https?:\/\//.test(href)
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener" aria-label={label}>
        {children}
      </a>
    )
  }
  if (hosted) {
    return (
      <a href={href} className={className} aria-label={label}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} aria-label={label}>
      {children}
    </Link>
  )
}
