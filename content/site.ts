// Site-wide content. Edit text here, not inside components.

export type SectionStatus = 'open' | 'soon'

export interface Section {
  no: string
  key: string
  title: string
  en: string
  desc: string
  href?: string
  status: SectionStatus
  icon: 'team' | 'system' | 'assets' | 'projects' | 'toolbox'
}

export const site = {
  name: 'imToken Design',
  tagline: 'imToken 设计团队的主页',
  intro:
    '团队、设计系统、素材、项目进展，以及我们日常在用的 AI 工具和方法，都会陆续整理到这里。',
  repo: 'https://github.com/wilsonwang-mt/imToken-Design-Hub',
}

export const sections: Section[] = [
  {
    no: '01',
    key: 'team',
    title: '团队',
    en: 'Team',
    desc: '认识 imToken 设计团队：每个人负责什么，我们怎么一起工作。',
    status: 'soon',
    icon: 'team',
  },
  {
    no: '02',
    key: 'design-system',
    title: '设计系统',
    en: 'Design System',
    desc: 'Wallet App、官网、Home of Token 和 UI 3.0 四条产品线的规范、组件与 token。',
    status: 'soon',
    icon: 'system',
  },
  {
    no: '03',
    key: 'assets',
    title: '设计素材库',
    en: 'Assets',
    desc: 'Logo、插画、吉祥物、图标和常用模板，拿来就能用。',
    status: 'soon',
    icon: 'assets',
  },
  {
    no: '04',
    key: 'projects',
    title: '项目追踪',
    en: 'Projects',
    desc: '正在进行的设计项目：当前阶段、最新产出和相关链接。',
    status: 'soon',
    icon: 'projects',
  },
  {
    no: '05',
    key: 'toolbox',
    title: '设计师工具箱',
    en: 'Toolbox',
    desc: '我们在用的 AI 工具和方法：Confu 分享、Prompt、Skill 和工作流。',
    href: '/toolbox/',
    status: 'open',
    icon: 'toolbox',
  },
]
