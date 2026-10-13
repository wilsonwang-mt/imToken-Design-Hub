import type { Project } from '../_schema'

// __TITLE__ 的项目数据：项目卡片、概览页和材料清单都从这里读取。
// 每个字段「至少写什么」见 docs/project-template.md。把所有【待填写】换成真实内容，npm run check 才会通过。
// 每次更新项目：改 updated，并在 changelog 最前面加一条同一天的记录。

export const project: Project = {
  // ── 卡片 ──
  slug: '__SLUG__',
  title: '__TITLE__',
  en: '【待填写】英文名或一句英文副标题（≤40 字符）',
  status: '【待填写】卡片上的状态，如「设计中 · v0.1」',
  phase: '【待填写】当前阶段，如「需求梳理 · 竞品调研」',
  desc: '【待填写】40–120 字：要解决什么问题、给谁用、现在到哪一步。',
  tags: ['【待填写】'],
  href: '/projects/__SLUG__/',
  stats: [],

  // ── 项目信息 ──
  stage: 'exploring',
  owner: { name: '__OWNER__', role: '【待填写】职能，如「产品设计」' },
  members: [],
  updated: '__DATE__',
  cssPrefix: '__PREFIX__',

  // ── 材料：第一条固定是概览页；新增材料用 npm run new:doc -- __SLUG__ <key> ──
  docs: [
    {
      key: 'overview',
      title: '项目概览',
      type: 'overview',
      kind: 'page',
      href: '/projects/__SLUG__/',
      status: 'draft',
      date: '__DATE__',
      author: '__OWNER__',
      summary: '【待填写】一句话结论，不是介绍',
    },
    // @new-doc-entries
  ],

  // ── 外部链接：Figma、Drive、PRD 等；需要公司账号的标 needsLogin: true ──
  links: [],

  // ── 更新记录：最新在前，第一条的日期等于 updated ──
  changelog: [{ date: '__DATE__', by: '__OWNER__', note: '建立项目页' }],

  // ── 概览页 ──
  overview: {
    background: '【待填写】为什么做：问题和背景，2–4 句。',
    goals: ['【待填写】目标或成功标准，1–5 条'],
    current: '【待填写】现在到哪了，一句话。',
    decisions: [],
    timeline: [{ date: '__DATE__', title: '建立项目页', state: 'done' }],
    openQuestions: [],
  },
}
