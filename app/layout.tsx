import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'imToken Design', template: '%s · imToken Design' },
  description: 'imToken 设计团队的主页：团队、设计系统、素材库、项目追踪和设计师工具箱。',
  // 团队内部站点：不进搜索引擎（next.config.mjs 也对所有路径下发 X-Robots-Tag，覆盖托管的整页 HTML）
  robots: { index: false, follow: false },
  openGraph: {
    title: 'imToken Design',
    description: 'imToken 设计团队的主页：团队、设计系统、素材库、项目追踪和设计师工具箱。',
    type: 'website',
  },
}

export const viewport: Viewport = { themeColor: '#F6F9FE' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@900&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
