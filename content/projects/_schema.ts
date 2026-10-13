// 项目追踪的数据规范：项目卡片、概览页和材料「至少包含什么」都写在这里（详见 docs/project-template.md）。
// 只放类型和常量，不 import 任何模块；scripts/audit.mjs 会读取同一份规则做检查。

export type ISODate = `${number}-${number}-${number}`

/** 项目阶段：决定概览页状态标签的颜色（已发布为绿色，已暂停、已归档为灰色，其余为蓝色） */
export type Stage = 'exploring' | 'designing' | 'reviewing' | 'building' | 'shipped' | 'paused' | 'archived'

export const stageLabel: Record<Stage, string> = {
  exploring: '探索中',
  designing: '设计中',
  reviewing: '评审中',
  building: '开发中',
  shipped: '已发布',
  paused: '已暂停',
  archived: '已归档',
}

/** 只写职能，不写级别、头衔或汇报关系 */
export interface Person {
  name: string
  role: string
  github?: string
}

/** 材料类型：每种类型的最低内容见 docs/project-template.md */
export type DocType = 'overview' | 'proposal' | 'meeting' | 'research' | 'spec' | 'prototype' | 'review' | 'comms'

export const docTypeLabel: Record<DocType, string> = {
  overview: '项目概览',
  proposal: '方案提案',
  meeting: '会议记录',
  research: '调研',
  spec: '设计规范',
  prototype: '原型',
  review: '评审记录',
  comms: '传播物料',
}

export interface Doc {
  /** 唯一标识，也是子路径名：/projects/<slug>/<key>/；概览固定为 'overview' */
  key: string
  title: string
  type: DocType
  /** page = app/ 里的 React 页面；hosted = public/projects/<slug>/<key>/index.html 的托管整页 */
  kind: 'page' | 'hosted'
  href: string
  status: 'draft' | 'final' | 'archived'
  date: ISODate
  author: string
  /** 一句话结论，不是介绍 */
  summary: string
}

export interface ProjectLink {
  label: string
  href: string
  note?: string
  /** 需要公司账号登录才能看（Figma、Drive、内部文档） */
  needsLogin?: boolean
}

export interface Change {
  date: ISODate
  by: string
  note: string
}

/** 概览页的必需区块（由 components/project/ProjectOverview.tsx 按固定顺序渲染） */
export interface Overview {
  /** 为什么做：问题和背景，2–4 句 */
  background: string
  /** 目标或成功标准，1–5 条 */
  goals: string[]
  /** 现在到哪了，一句话 */
  current: string
  /** 已经定下的事，最新在前；还没有就写空数组 */
  decisions: { date: ISODate; text: string }[]
  timeline: { date: string; title: string; note?: string; state: 'done' | 'now' | 'next' }[]
  /** 待决问题，写清楚谁来回答 */
  openQuestions: { text: string; owner?: string }[]
}

export interface Project {
  // ── 卡片（所有项目必填） ──
  slug: string
  title: string
  en: string
  /** 卡片上的状态文字，如「评审中 · v2.9」 */
  status: string
  phase: string
  desc: string
  tags: string[]
  href: string
  stats: { value: string; label: string }[]
  /** true = 入口是 public/projects/<slug>/ 下的托管整页（整页跳转，不是 Next 路由） */
  static?: boolean

  // ── 新项目必填（legacy 项目暂时豁免，见 CONTRIBUTING.md 的 CARD-01） ──
  stage?: Stage
  owner?: Person
  members?: Person[]
  updated?: ISODate
  /** 站内材料；第一条是卡片入口，新项目必须是 key: 'overview' */
  docs?: Doc[]
  links?: ProjectLink[]
  /** 更新记录，最新在前；第一条的日期必须等于 updated */
  changelog?: Change[]
  overview?: Overview
  /** 项目样式前缀（2–6 个小写字母，全站唯一）；有 app/projects/<slug>/<slug>.css 时必填 */
  cssPrefix?: string
  /** 只给规范建立前的三个旧项目；迁移完成后删除 */
  legacy?: boolean
}
