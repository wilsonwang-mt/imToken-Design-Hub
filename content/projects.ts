// 项目追踪 — one entry per design project. To add a project, append an item here
// and (if it has its own page) create app/projects/<slug>/page.tsx.

export interface Project {
  slug: string
  title: string
  en: string
  status: string
  phase: string
  desc: string
  tags: string[]
  href: string
  stats: { value: string; label: string }[]
}

export const projectsIntro = {
  eyebrow: '04 · PROJECTS',
  title: '项目追踪',
  lead: '正在进行的设计项目：当前阶段、最新产出和接下来要讨论的问题。',
}

export const projects: Project[] = [
  {
    slug: 'agentic-wallet',
    title: 'Agentic Wallet',
    en: 'From Trading Agent to Agentic Wallet',
    status: '策略讨论中',
    phase: 'Alpha 内测阶段一收尾 → 下一阶段策略',
    desc: '阶段一内测发现的十个问题，以及打造 Agentic Wallet 要做的十件事，覆盖产品定位、产品策略、操作流程、用户体验、底层能力和技术应用。',
    tags: ['UI 3.0', 'Trading Agent', 'Sigil', '内测阶段一'],
    href: '/projects/agentic-wallet/',
    stats: [
      { value: '10', label: '内测发现的问题' },
      { value: '10', label: '要做的事' },
      { value: '6', label: '待拍板的决定' },
    ],
  },
]
