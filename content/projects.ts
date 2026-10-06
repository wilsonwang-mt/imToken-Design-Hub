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
  {
    slug: 'stake-video',
    title: 'Stake 视频制作',
    en: 'Bulu and the Sleeping ETH',
    status: '制作中 · v12',
    phase: '10/8 集中宣发 · imToken Stake 上线',
    desc: 'ETH 质押上线的社媒推广短片：Bulu 多年持有一颗沉睡的 ETH，在 imToken 里质押后，ETH 醒来开始工作，始终没有离开 Bulu 身边。项目页有故事、视觉语法、制作进度和链接，另附宣传语提案。',
    tags: ['imToken Stake', 'Bulu', '宣传语', 'AI 视频', 'Remotion'],
    href: '/projects/stake-video/',
    stats: [
      { value: '53s', label: '主片 · 12 个镜头加片尾卡' },
      { value: '2', label: '份材料：项目概览 · 宣传语提案' },
      { value: '10/8', label: '集中宣发：PR · 视频 · Push' },
    ],
  },
]
