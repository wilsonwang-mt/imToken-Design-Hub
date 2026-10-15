// 项目追踪的注册表：每个项目一条。字段规范见 content/projects/_schema.ts 和 docs/project-template.md。
// 新项目不要手写，运行 npm run new:project -- <slug>：它会生成 content/projects/<slug>/project.ts 并在下面两个标记处自动登记。
// 这里的三个旧项目标了 legacy: true，暂时豁免新项目的必填项，迁移计划见 CONTRIBUTING.md「下一步」。

import type { Project } from './projects/_schema'
// @new-project-imports

export type { Project }

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
    stage: 'designing',
    legacy: true,
    docs: [
      { key: 'preread', title: '会前阅读', type: 'proposal', kind: 'page', href: '/projects/agentic-wallet/', status: 'final', date: '2026-10-01', author: 'Wilson', summary: '内测阶段一的十个问题，以及打造 Agentic Wallet 要做的十件事。' },
      { key: 'meeting', title: '会议结论', type: 'meeting', kind: 'page', href: '/projects/agentic-wallet/meeting/', status: 'final', date: '2026-10-06', author: 'Wilson', summary: '定位、四个支柱的信息架构、决策引擎，以及 Assistant → Advisor → Portfolio Manager 的路线。' },
    ],
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
    status: '已发布 · 中文正式版',
    phase: '10/8 集中宣发 · imToken Stake 上线',
    desc: 'ETH 质押上线的社媒推广短片：Bulu 多年持有一颗沉睡的 ETH，在 imToken 里质押后，ETH 醒来开始工作，始终没有离开 Bulu 身边。项目页有故事、视觉语法、制作进度和链接，另附宣传语提案、媒体 PR 稿方案和视频制作规范。',
    tags: ['imToken Stake', 'Bulu', '宣传语', 'AI 视频', 'Remotion'],
    href: '/projects/stake-video/',
    stage: 'shipped',
    owner: { name: 'Wilson', role: '产品设计', github: 'wilsonwang-mt' },
    updated: '2026-10-09',
    legacy: true,
    docs: [
      { key: 'overview', title: '项目概览', type: 'overview', kind: 'page', href: '/projects/stake-video/', status: 'final', date: '2026-10-09', author: 'Wilson', summary: '故事、视觉语法、制作流程与进度，以及成片和各类材料的入口。' },
      { key: 'taglines', title: '宣传语提案', type: 'proposal', kind: 'page', href: '/projects/stake-video/taglines/', status: 'draft', date: '2026-10-07', author: 'Wilson', summary: '中文修订版：17 条提案按类别分组，附竞品对照和写作原则，还在讨论。' },
      { key: 'pr', title: '媒体 PR 稿方案', type: 'comms', kind: 'hosted', href: '/projects/stake-video/pr/', status: 'draft', date: '2026-10-09', author: 'Wilson', summary: 'PR 标题推荐、写作原则、标题要不要带 imToken、数据核查和文章结构。' },
    ],
    stats: [
      { value: '59s', label: '主片 · 含片头封面和片尾卡' },
      { value: '4', label: '份材料：概览 · 宣传语 · PR 稿 · 制作规范' },
      { value: '10/8', label: '集中宣发：PR · 视频 · Push' },
    ],
  },
  {
    slug: 'ens-address-resolution',
    title: 'ENS V2 · 地址解析组件',
    en: 'Address Context Label & Tooltip',
    status: '设计评审中 · v3.4',
    phase: '两个方向待定：S1 极简版 · S2 身份头 + 条件列',
    desc: '转账地址输入后的 context 标识与 Tooltip 规范：单一 Tag（Info / Warning / High risk）加无彩色 popover，按 PRD 的 15 条 context 排序与折叠。可操作原型：左侧是转账页，两个原型区：常见场景（粘贴哈希地址 / 输入 ENS 域名两个 Tab）与专项信息·边界·异常，共 19 个场景。手机原型支持 EN / 简中切换，并可在设计文案与线上（token-v2）文案之间对照（设计不变，只换文案）。',
    tags: ['ENS v2', 'Wallet App', 'Tooltip', 'Design Spec', 'Prototype'],
    href: '/projects/ens-address-resolution/',
    static: true,
    stage: 'reviewing',
    legacy: true,
    docs: [
      { key: 'prototype', title: '可操作原型', type: 'prototype', kind: 'hosted', href: '/projects/ens-address-resolution/', status: 'draft', date: '2026-10-13', author: 'Wilson', summary: '转账页地址解析 Tooltip 的两个方向，18 个场景可直接操作。' },
    ],
    stats: [
      { value: '15', label: '条 context：PRD 全覆盖' },
      { value: '2', label: '个方向：S1 极简版 · S2 新探索' },
      { value: '1835', label: '项原型自动化测试通过' },
    ],
  },
  // @new-project-entries
]
