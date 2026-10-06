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
    status: '定位已确定',
    phase: '下一阶段 · 从 Assistant 起步',
    desc: '两份材料：会前阅读整理了阶段一内测的十个问题和要做的十件事；会议结论记录了产品定位、四个支柱的信息架构、决策引擎，以及 Assistant → Advisor → Portfolio Manager 的路线。',
    tags: ['UI 3.0', 'Agentic Wallet', 'Assistant', '内测阶段一'],
    href: '/projects/agentic-wallet/',
    stats: [
      { value: '2', label: '份材料：会前阅读 · 会议结论' },
      { value: '4', label: '个支柱：Store · Send · Trade · Bridge' },
      { value: '3', label: '阶段：Assistant → Advisor → PM' },
    ],
  },
]
