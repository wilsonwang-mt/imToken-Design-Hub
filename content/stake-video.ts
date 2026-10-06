// Stake 视频制作 — project overview page (app/projects/stake-video/page.tsx).
// Source of truth for the film itself lives in the video project (CLAUDE.md, docs/, shots.yaml); this file is the team-facing summary.

export const meta = {
  title: 'Stake 视频制作',
  sub: 'Bulu 与沉睡的 ETH',
  en: 'Bulu and the Sleeping ETH',
  eyebrow: 'PROJECT · imToken Stake 上线',
  status: '制作中 · v12',
  lead:
    '为 imToken Stake（ETH 质押）上线制作的社媒推广短片，以及配套的宣传语和物料。主角 Bulu 多年持有一颗沉睡的 ETH；在 imToken 里质押之后，ETH 醒来开始工作，而且始终没有离开 Bulu 身边。',
  message: 'ETH 不离开你的钱包，也能工作。',
  messageNote: '全片最想让人记住的一句话（旁白 V09）。它说的是 imToken 最不可替代的差异点：非托管。',
}

export const headline = [
  { value: '10/8', label: '集中宣发：垂直媒体 PR、主视频、App Push' },
  { value: '53 s', label: '主片时长，12 个镜头加片尾卡' },
  { value: '4K', label: '当前版本 v12，24 fps，中文旁白' },
  { value: '6', label: '条视觉语法，每一帧都按它检查' },
]

export const audience = {
  who: '长期持有者',
  quote: '有些 ETH，从买入那天起就没打算卖。',
  // 对外文案口径（Wilson 2026-10-05 / 10-06）：片子、物料、宣传语都按这三条写
  rules: [
    { name: '怎么称呼', note: '只说「imToken 质押」「质押你的 ETH」（en: imToken Stake / stake your ETH），不提原生质押和 32 ETH。' },
    { name: '不暗示锁住', note: '不写锁定、锁仓、冻结、退出后才回来；画面里也不出现锁头。' },
    { name: '不承诺回报', note: '不说赚、收益，不给收益率；计数器只显示增量，旁注「示意数值」。' },
  ],
}

// Six acts, each with the narration that carries it (zh-CN master).
export const story = [
  { no: '01', shots: 'S01–S02', title: '持有', text: '深夜，Bulu 看着手机里的 ETH 行情。', vo: '几轮周期，你始终持有；看过太多起落，从未动摇。' },
  { no: '02', shots: 'S03–S04', title: '沉睡', text: '沙发另一侧，一颗透明的 ETH 晶体在毛毯上沉睡。日历从 2022 翻到 2026，牛熊起伏，它的大小和表情跟着价格变，数量始终是一颗。', vo: '而你的 ETH，一直在沉睡。四季更替，持有期又多了一年；按币本位算，持仓分毫未增。' },
  { no: '03', shots: 'S06–S08', title: '发现', text: 'Bulu 托腮发愁。手机亮起，它在 imToken 里找到了 ETH 质押。', vo: '持有，只能是等待吗？你的 ETH，不必一直沉睡。在 imToken，质押你的 ETH。' },
  { no: '04', shots: 'S09', title: '醒来', text: 'ETH 醒来，跳进 Bulu 身边的容器开始工作，一条光带始终连着 Bulu。', vo: 'ETH 不离开你的钱包，也能工作。' },
  { no: '05', shots: 'S10–S11b', title: '累积', text: '又是一年，小 ETH 慢慢出现。Bulu 头顶浮出幻想气泡：头等舱，然后是海滩。', vo: '又是一年。这一次，协议奖励以 ETH 计，一点点累积。持有，也可以是参与。让质押奖励带你去看世界。' },
  { no: '06', shots: 'S12 · 片尾', title: '叫醒', text: 'Bulu 开心地举起手机，身边容器里的 ETH 已经多了不少。', vo: 'imToken 质押——叫醒你的 ETH。' },
]

// The film's visual grammar: what each element on screen stands for. Hard rules for every frame.
export const grammar = [
  { el: 'ETH 晶体的数量', means: '持有的 ETH（币本位）', rule: '质押前永远只有一颗；质押后只增不减。新出现的小 ETH 只在容器上方、容器和 Bulu 之间，不飞走、不出画。' },
  { el: 'ETH 的大小和表情', means: '价格与市场情绪', rule: '只在牛熊段落随价格变化，不代表收益。小 ETH 不带表情。' },
  { el: '计数器', means: '核心信息', rule: '只显示增量（+0.00 → +0.72 ETH，示意数值），不显示持仓总数。' },
  { el: 'ETH 的亮度', means: '休眠 / 工作', rule: '质押前低亮度、呼吸感；质押后高亮度、有节奏地脉动。' },
  { el: '光带', means: '所有权（非托管）', rule: '容器始终在 Bulu 身边，用光带连着 Bulu 或手机，任何时候都不断开。' },
  { el: '画面里的文字', means: '—', rule: 'AI 生成的画面里不出现任何文字或数字；文案、数字、界面都在后期由代码叠加，方便出多语言和多比例。' },
]

export const pipeline = [
  { step: '关键帧', tools: 'ChatGPT Images · Nano Banana Pro', note: '按 Style Block 生成，Figma 管理分镜' },
  { step: '视频', tools: 'LibTV · Seedance 2.5', note: '首尾帧生成，一律固定机位' },
  { step: '3D 与信息层', tools: 'Three.js · Remotion', note: 'ETH 晶体、容器、计数器、价格卡、手机界面' },
  { step: '合成与母版', tools: 'Remotion · ffmpeg', note: '4K 母版、−14 LUFS 响度、中英文与多比例输出' },
]

export type MilestoneState = 'done' | 'now' | 'next'

export const milestones: { date: string; title: string; note: string; state: MilestoneState }[] = [
  { date: '10/01', title: '故事线与剧本确定', note: '剧本 V2：45 秒逐镜头剧本、15 秒短版、旁白位置', state: 'done' },
  { date: '10/02', title: '固定机位与第一批镜头', note: '客厅空间布局和 4 个机位；夜间生成第一批视频', state: 'done' },
  { date: '10/05', title: '视觉语法定稿', note: '计数器只显示增量；小 ETH 的位置和大小规则', state: 'done' },
  { date: '10/06', title: 'v9 – v12', note: '日历年份 2022→2026；Bulu 形象修正（只保留鳍变成的手，表面改回光滑清晰）；4K 母版', state: 'now' },
  { date: '10/08', title: '集中宣发', note: '垂直媒体 PR、主视频、App Push 全量推送', state: 'next' },
  { date: '10/12–16', title: '系列视频与物料', note: '主片之后的系列内容', state: 'next' },
  { date: '10/19', title: '衔接 Lido 活动', note: '和 Lido 活动的叙事衔接', state: 'next' },
]

export const open = [
  '三屏手机界面（行情、质押页、片尾页）合成进片子，出 v13',
  '合规确认：幻想气泡、常驻风险提示、界面里的「安全」字样',
  '语言版本（中文 / 英文 / 繁中）与 9:16、1:1 竖版',
  '宣传语：还在头脑风暴，见「宣传语提案」',
]

export interface StakeLink {
  title: string
  desc: string
  href?: string // undefined = not available yet
  note: string
  internal?: boolean
}

export const links: StakeLink[] = [
  {
    title: '宣传语提案',
    desc: '两轮头脑风暴的全部提案，一张卡一个，按类别分组，中英双语。',
    href: '/projects/stake-video/taglines/',
    note: '本站',
    internal: true,
  },
  {
    title: '成片 v12',
    desc: '4K 母版和手机预览版。10/8 发布前不放在公开页面上。',
    note: '发布后补链接',
  },
  {
    title: 'Figma 关键帧',
    desc: '分镜关键帧：v1 原稿与 V2 分镜。',
    href: 'https://www.figma.com/design/3Xic4z40rna7KnhHGowbQf/?node-id=1650-2',
    note: 'Figma · 需登录',
  },
  {
    title: 'LibTV 画布',
    desc: '视频生成画布：参考图、关键帧和各镜头的视频节点。',
    href: 'https://www.liblib.tv/canvas?projectId=e607d3cb38ce4d11af65a4ea22175eab&spaceId=10324282',
    note: 'LibTV · 需登录',
  },
  {
    title: 'GTM 白板',
    desc: 'Mkt 的上线计划：Key message、排期和物料清单。',
    href: 'https://whimsical.com/consenlabs/imtoken-stake-gtm-9-30-GkNCY7uCneSGYzVsUyMC7q',
    note: 'Whimsical · 需登录',
  },
]
