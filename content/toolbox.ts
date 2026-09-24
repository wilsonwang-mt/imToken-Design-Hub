// Designer Toolbox content. To open a new Confu episode: flip its status to 'open' and fill in the links.

export interface EpisodeLink {
  label: string
  href: string
  kind: 'primary' | 'secondary'
  download?: boolean
}

export interface Episode {
  no: string
  date?: string
  title?: string
  subtitle?: string
  summary?: string
  tags?: string[]
  links?: EpisodeLink[]
  status: 'open' | 'soon'
}

export const series = {
  eyebrow: 'CONFU · 设计师 AI 工具箱',
  title: 'Confu 分享系列',
  desc: '面向全公司的阶段性分享，每一期讲一个用得上的 AI 工作方法，附演示文稿和资料包。新的一期讲完后会在这里开放。',
}

export const episodes: Episode[] = [
  {
    no: '02',
    date: '2026.09.24',
    title: 'Design with AI',
    subtitle: '不懂设计，也能做出世界顶级的界面。',
    summary:
      '「我是主理人」赛前培训。用六个步骤把一个想法做成好用的界面，再用三个真实项目演示怎么用 Claude Design 做设计探索。',
    tags: ['Claude Design', 'Refero', 'Prompt', '原型'],
    links: [
      { label: '打开演示文稿', href: '/confu/ep02/', kind: 'primary' },
      { label: 'Claude Design 专题', href: '/confu/ep02/claude-design.html', kind: 'secondary' },
      { label: '下载资料包', href: '/confu/ep02/EP02-design-kit.zip', kind: 'secondary', download: true },
    ],
    status: 'open',
  },
  {
    no: '01',
    date: '2026.08.07',
    title: '会前十分钟，用 Skill 准备一次亮眼的演讲',
    subtitle: '让 AI 从项目第一天就在场，最后十分钟只是收获。',
    summary:
      '项目大脑、节点记录、把品味封装成 Skill：三个习惯，加上一个能直接用的演示文稿 Skill。',
    tags: ['Skill', 'CLAUDE.md', 'HTML Slides'],
    links: [
      { label: '打开演示文稿', href: '/confu/ep01/', kind: 'primary' },
      { label: '下载资料包', href: '/confu/ep01/Confu-EP01-resources.zip', kind: 'secondary', download: true },
    ],
    status: 'open',
  },
  { no: '03', status: 'soon' },
  { no: '04', status: 'soon' },
]

export interface Tool {
  title: string
  desc: string
  href: string
  meta: string
}

export const workflows: Tool[] = [
  {
    title: '文案管理工作流',
    desc: '从设计稿里的英文文案，到开发定义 i18n key、Figma Variables、多方审查，最后提交 PR 合并。',
    href: '/toolbox/copy-workflow/copy-workflow-final.html',
    meta: '6 个步骤',
  },
]
