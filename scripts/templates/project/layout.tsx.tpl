import type { ReactNode } from 'react'
import './__SLUG__.css'

// 只负责加载本项目的样式。所有选择器以 .__PREFIX__ 开头，页面的 <main> 已经带上这个 class。
export default function Layout({ children }: { children: ReactNode }) {
  return children
}
