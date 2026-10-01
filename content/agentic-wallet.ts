// Agentic Wallet — discussion starter cards (项目追踪 · Agentic Wallet)
// Part 1: ten problems found in Alpha beta phase 1. Part 2: ten things to build.
// Evidence comes from the phase-1 Shadowing sessions (P01–P10, all internal colleagues),
// the phase-1 fix list, the Taipei Alpha × Labs workshop and the Agentic Wallet exploration brief.

export const meta = {
  eyebrow: '04 · PROJECTS · AGENTIC WALLET',
  title: 'Agentic Wallet',
  lead:
    '从 Trading Agent 走向 Agentic Wallet 之前，先把内测看到的问题和接下来要做的事摆在一起。上半部分是阶段一内测发现的十个问题，下半部分是打造 Agentic Wallet 要做的十件事。这些卡片是讨论的起点，不是结论。',
  status: '策略讨论中',
  premise:
    '读数前提：阶段一深度体验共 10 位内部同事，其中 9 人钱包经验 5 年以上，没有真正的 Web3 新手；“完成”大多是自评，全员自主体验没有留下有效记录。所以这些结论可以指出问题在哪，但不能外推到所有用户，也回答不了留存和真金意愿。',
}

export const headline = [
  { value: '0/10', label: '零弯路走完“激活 → 平仓”', tone: 'red' },
  { value: '0', label: '人明确表示看懂了签名内容', tone: 'red' },
  { value: '10/10', label: '分不清钱在钱包还是交易账户', tone: 'amber' },
  { value: '3→6', label: '用过之后想要“分析”的人数', tone: 'purple' },
] as const

// Cumulative pass count through the Trading Agent scenarios (derived from the completion matrix)
export const funnel = [
  { step: '起点', all: 10, clean: 10 },
  { step: '⓪ 激活', all: 10, clean: 8 },
  { step: '① 入金', all: 10, clean: 4 },
  { step: '② 开仓', all: 9, clean: 1 },
  { step: '③ 下单', all: 8, clean: 0 },
  { step: '④ 看账户', all: 8, clean: 0 },
  { step: '⑤ 平仓', all: 4, clean: 0 },
]

/* ───────────────────────── Part 1 · Problems ───────────────────────── */

export type ProblemKind = 'flow' | 'trust' | 'account' | 'status' | 'agent' | 'feedback' | 'control' | 'value' | 'discover'
export type FixState = 'open' | 'partial' | 'verify'

export const problemKinds: Record<ProblemKind, string> = {
  flow: '流程断点',
  trust: '信任与授权',
  account: '账户与资金',
  status: '状态反馈',
  agent: 'Agent 行为',
  feedback: '错误反馈',
  control: '控制感',
  value: '价值感知',
  discover: '入口与引导',
}

export const fixLabel: Record<FixState, string> = {
  open: '未修复',
  partial: '部分修复',
  verify: '已修，待回归',
}

export interface Problem {
  no: string
  kind: ProblemKind
  title: string
  stat: string
  statLabel: string
  summary: string
  evidence: string[]
  quote: { text: string; who: string }
  stages: string[]
  fix: FixState
  fixNote: string
  actions: string[]
}

export const problems: Problem[] = [
  {
    no: 'Q01',
    kind: 'flow',
    title: '前置条件要等到下单失败才冒出来',
    stat: '10/10',
    statLabel: '先下单，后知道缺钱或缺条件',
    summary:
      '“说一句就下单”背后其实有一串门槛：激活签名、入金、账户模式、最低金额、手续费。它们在“入金”这一步都没有被检查，全部推迟到用户发出第一条交易指令时才暴露。',
    evidence: [
      '6/10 到开始交易时才发现要先入金',
      '3/10 按最低金额充值后仍然不够（手续费被扣、到账少于预期）',
      '“开仓”是摩擦最大的一步：只有 2/10 顺畅',
    ],
    quote: { text: '我到我的 Agent 这里的时候，我肯定是已经万事俱备……结果你告诉我，我竟然还没有准备好。', who: 'P06' },
    stages: ['① 入金', '② 开仓'],
    fix: 'partial',
    fixNote: '快捷下单路径加了余额预检查；自然语言路径仍取决于模型是否遵循提示词。',
    actions: ['03', '04'],
  },
  {
    no: 'Q02',
    kind: 'trust',
    title: '签名看不懂，接近盲签',
    stat: '0',
    statLabel: '人明确表示看懂了签名内容',
    summary:
      '激活、交易授权、下单都要签名，但签名页展示的是 Nostr、Sigil 和原始数据。用户不知道授权给了谁、做什么、范围多大，有人干脆没看懂就点了确认。',
    evidence: [
      '9/10 看不懂授权或签名；3 人明确没看懂就点了确认',
      '7 人不认识 “Nostr”；有人把 Sigil 当成第三方',
      '“最不放心的一步”里，3/5 回答是签名',
    ],
    quote: { text: '签名的东西这么重要的事情，竟然让我看不懂，让我签一个不懂的合同。', who: 'P06' },
    stages: ['⓪ 激活', '③ 下单'],
    fix: 'open',
    fixNote: 'Sigil 可读化相关的 3 条修复（其中 2 条 P0）在阶段一全部搁置，是唯一没有启动的 P0。',
    actions: ['05', '06'],
  },
  {
    no: 'Q03',
    kind: 'account',
    title: '说不清钱在哪、能用多少',
    stat: '10/10',
    statLabel: '分不清钱包和交易账户的关系',
    summary:
      'Hyperliquid 的账户结构直接摆在了用户面前：钱包、交易账户、现货、永续、统一账户模式。用户搞不清钱在哪一层、哪部分能用来下单。',
    evidence: [
      '统一 / 现货 / 永续模式混乱 5 人；现货为 0 但权益充足时挂不了现货单',
      '无法一眼确认自己有没有仓位（P01 P06）',
      '入金到账要手动刷新才看得到（P06 P07）',
    ],
    quote: { text: '阿尔法钱包跟 Hyperliquid 的关系到底是什么？这样他会更好些。', who: 'P10' },
    stages: ['① 入金', '④ 看账户'],
    fix: 'verify',
    fixNote: '加了常驻账户速览侧栏并调整术语；修复合并后测试的 P10 仍遇到统一账户余额问题。',
    actions: ['04'],
  },
  {
    no: 'Q04',
    kind: 'status',
    title: '不知道到底成没成交',
    stat: '9/10',
    statLabel: '对订单结果不确定',
    summary:
      '产品里同时存在至少 6 种状态用词，状态和提示还会互相矛盾。用户确认下单之后，Agent 不再说话，结果要靠自己猜，甚至离开产品去核实。',
    evidence: [
      '状态用词：执行中 / 处理中 / Resting / filled / 已结束成交未知 / 部分成交',
      '“状态未知”和右上角成功提示同时出现；一直显示“执行中”，其实已经成交',
      '2 人离开产品核实：一人去交易所原站，一人去链上',
    ],
    quote: { text: '订单已经结束，成交未知……那我到底是成功了还是没成功？', who: 'P03' },
    stages: ['③ 下单', '⑤ 平仓'],
    fix: 'verify',
    fixNote: '订单状态 bug 和文案已修；修复后的样本仍出现“处理中直到超时”。',
    actions: ['07'],
  },
  {
    no: 'Q05',
    kind: 'agent',
    title: 'Agent 在用户确认之前就替用户做了决定',
    stat: '5 人',
    statLabel: '遇到 Agent 自作主张',
    summary:
      'Human-in-the-loop 守住了签名这一步，但没有守住意图这一层：Agent 会自己补参数、换交易类型，或者在充值后接着执行旧指令。',
    evidence: [
      '擅自补全参数：杠杆和本金歧义没问清，还自行加了参数（P06 P09）',
      '说“买入 BTC 现货”，执行成了 BTC 永续多单（P08，新手察觉不到）',
      '充值完成后接着执行旧指令，价格可能已经变了（P04 P07）',
    ],
    quote: { text: '你不能帮我加词……这两个还没经过我同意，你就给我添加上了。', who: 'P06' },
    stages: ['② 开仓', '③ 下单'],
    fix: 'partial',
    fixNote: '已改为充值后不自动恢复旧指令；参数追问和交易类型保护还没有规则。',
    actions: ['03'],
  },
  {
    no: 'Q06',
    kind: 'feedback',
    title: '失败不说原因，或者直接甩原始报错',
    stat: '8/10',
    statLabel: '遇到原因不明的失败',
    summary:
      '下单失败时，用户看到的是“无法生成预览”或英文原始报错，不知道是钱不够、金额太小还是系统问题，只能反复重试。',
    evidence: [
      '有人连续约 5 次开仓失败，始终不知道原因（P04）',
      '“无法生成预览”，其实是余额不足（P05）',
      '修复合并后仍出现原始报错 “asset symbol is required”（P10）',
    ],
    quote: { text: '他应该提前告诉我的……而不是我充了 16 他说不够，我充 20 他说保证金不够。', who: 'P05' },
    stages: ['② 开仓', '③ 下单', '⑤ 平仓'],
    fix: 'partial',
    fixNote: '交易所报错已做翻译；快捷查询的友好错误卡片还在未合并的分支上。',
    actions: ['08'],
  },
  {
    no: 'Q07',
    kind: 'trust',
    title: '签名次数多，规则前后不一致',
    stat: '3–4 次',
    statLabel: '第一笔交易前要签的次数',
    summary:
      '从激活到下单要经过：激活签名 → 入金签名 → 交易授权签名 → 下单签名。每道门都在用户说完那句话之后才出现，而且签名规则前后不一致，用户无法预期还要签几次。',
    evidence: [
      '最想改的点里，“授权 / 激活流程简化”排第一（P01 P09 P10）',
      '有人看到 “Unknown transaction”，以为是报错（P04）',
      '有人觉得在 Agent 还没介绍自己之前，就先被弹窗要求理解授权（P10）',
    ],
    quote: { text: '我在对这个交易 agent 没有一个基本的定位认知的情况下，就先弹出了需要我有理解成本的弹窗。', who: 'P10' },
    stages: ['⓪ 激活', '① 入金', '③ 下单'],
    fix: 'open',
    fixNote: '多次签名原因不清的修复项已搁置；授权频次模型需要产品决策。',
    actions: ['06', '05'],
  },
  {
    no: 'Q08',
    kind: 'control',
    title: '控制权不在用户手里：撤不了、只能全平、部分成交没下一步',
    stat: '6 人',
    statLabel: '遇到控制感缺口',
    summary:
      '用户想停、想撤、想只平一部分时，产品给不出明确的操作和结果。对一个替人动钱的 Agent 来说，这是用户敢不敢放手的前提。',
    evidence: [
      '撤单提示成功但看起来没撤，“处理中”直到超时（3 人）',
      '只能全部平仓，不能部分平仓（3 人，已修待回归）',
      '多笔只成交一半，没说是哪笔、为什么、下一步怎么办（P07 P08 P09）',
    ],
    quote: { text: '这取消不了，好像撤不了。对，比如说这种的时候我就慌了。', who: 'P04' },
    stages: ['③ 下单', '⑤ 平仓'],
    fix: 'partial',
    fixNote: '部分平仓已上线；执行中的取消 / 停止仍不完整。',
    actions: ['06', '07'],
  },
  {
    no: 'Q09',
    kind: 'value',
    title: 'Agent 只会执行，价值只剩“更快”',
    stat: '4/10',
    statLabel: '认为“更快”，主要来自快捷按钮',
    summary:
      '唯一形成共识的价值是“更快”，而且主要来自快捷按钮，不是 AI 对话本身。用过之后，想要分析和策略的人翻了一倍，但 Agent 目前只能执行，老用户也缺少把日常交易搬过来的理由。',
    evidence: [
      '用过之后想要“分析 / 策略”的人从 3 人变成 6 人',
      '只有 2/10 明确表示会用真钱下单，而且都带条件',
      '用真钱的门槛 5/8 是安全、授权透明和背书，没有人提“AI 够不够聪明”',
    ],
    quote: { text: 'Agent 的交流方式给了你很广阔的想象，但是我产品的边界就这么大……给了一个很大的门，但是房间就 5 平米。', who: 'P06' },
    stages: ['⑦ 自由探索', '整体'],
    fix: 'open',
    fixNote: 'Agent 的价值定位（执行器还是决策辅助）需要产品决策。',
    actions: ['09', '01', '02'],
  },
  {
    no: 'Q10',
    kind: 'discover',
    title: '入口、引导和上下文断裂',
    stat: '6 人',
    statLabel: '找不到功能入口',
    summary:
      '首屏看不出这是一个 AI Trading Agent，快捷入口、策略、当前委托单、预测市场都要靠猜或靠测试官提示；会话不延续，交易术语和中英混杂进一步抬高了理解成本。',
    evidence: [
      '首次引导缺失 5 人；会话历史找不回 / 上下文不延续 5 人',
      '交易术语看不懂（filled / Resting / TWAP / margin）6 人；中英混杂 4 人',
      '预测市场 8/10 未完成：入口难找、内容全英文、最低 10 USDC',
    ],
    quote: { text: '你已经是个 Agent 了……你现在还要让我自己去点，那我还问你干啥。', who: 'P02' },
    stages: ['⑥ 预测市场', '⑦ 自由探索'],
    fix: 'open',
    fixNote: '首次引导、会话延续、本地化都还在待排期列表里。',
    actions: ['08', '09'],
  },
]

/* ───────────────────────── Part 2 · Ten things to build ───────────────────────── */

export type ActionKind = 'position' | 'strategy' | 'flow' | 'ux' | 'foundation' | 'tech'

export const actionKinds: Record<ActionKind, { label: string; en: string; desc: string }> = {
  position: { label: '产品定位', en: 'Positioning', desc: '我们是谁、凭什么赢' },
  strategy: { label: '产品策略', en: 'Strategy', desc: '先做什么、暂缓什么' },
  flow: { label: '操作流程', en: 'Flow', desc: '一句话到一笔交易的路径' },
  ux: { label: '用户体验', en: 'Experience', desc: '用户看到和感受到的' },
  foundation: { label: '底层能力', en: 'Foundation', desc: '必须先建好的基建' },
  tech: { label: '技术应用', en: 'Technology', desc: '可以用起来的标准与技术' },
}

export type Visual =
  | 'shift' | 'options' | 'intent' | 'balance' | 'sign'
  | 'curve' | 'states' | 'components' | 'ladder' | 'radar'

export interface Action {
  no: string
  kind: ActionKind
  also?: ActionKind
  title: string
  en: string
  thesis: string
  why: string[]
  moves: string[]
  visual: Visual
  question: string
  decide?: boolean
  solves: string[]
  sources: string[]
}

export const actions: Action[] = [
  {
    no: '01',
    kind: 'position',
    title: '写清楚“凭什么赢”',
    en: 'Positioning',
    thesis:
      '定位要从“说一句就下单的执行器”，升级为“人和 Agent 一起管理资产的信任层”。我们卖的不是收益，而是可验证、可叫停的执行过程。',
    why: [
      '10/10 的第一印象都是“说一句就下单”，但唯一成立的价值只有“更快”',
      '台北 Workshop 请同事向朋友介绍产品，6 个人给了 6 种说法',
      '“不承诺收益”没人反对，但 9 张换用理由卡都指向“钱变多或变省”：我们说清了不做什么，还没说做什么',
    ],
    moves: [
      '写一句有取舍的定位主张：“依靠 ___，而非 ___”',
      '补上定位陈述里一直空着的“核心竞争力”一段',
      '排定两类用户的先后：Agent Trader（主动投资）与 Agent Payer（小额自动支付）',
      '每个候选主张都要回答：竞品做出同样的功能，我们差在哪',
    ],
    visual: 'shift',
    question: '下一阶段，我们希望用户用哪一句话向朋友介绍 imToken 的 Agentic Wallet？',
    decide: true,
    solves: ['Q09'],
    sources: ['阶段一 Retro', '台北 Workshop', 'Agentic 探索'],
  },
  {
    no: '02',
    kind: 'strategy',
    title: '信任基建打底，再选一个主场景',
    en: 'Where to play',
    thesis:
      '可读授权、意图确认、可验证状态是所有方向的前提，不是可选项。真正要选的是：基建之上，下一阶段先在哪个场景证明 Agent 的价值。',
    why: [
      '用真钱的门槛 5/8 是安全、授权透明或背书，没人把“AI 够不够聪明”列为条件',
      '交易场景迁移动力弱：老用户在交易所原站早就开完单了，现有需求也已被满足',
      '10/10 分不清钱在哪：这是钱包层的问题，不只是交易的问题',
    ],
    moves: [
      'A · 信任基建：必做，作为所有场景的底座',
      'B · 钱包高频场景：意图式转账与跨链、资产问答、Today Brief，结果确定、容易验证',
      'C · 交易智能：分析、策略、下单前可行性评估，需求真实，但要等 A 就绪再放大',
      '用“信任依赖 × 使用频次 × 可验证性 × 证据强度”给候选能力排序',
    ],
    visual: 'options',
    question: '下一阶段要证明的是“用户敢把钱交给 Agent”，还是“Agent 比现有方式更好用”？主场景押 B 还是 C？',
    decide: true,
    solves: ['Q09', 'Q03'],
    sources: ['阶段一 Retro', '台北 Workshop'],
  },
  {
    no: '03',
    kind: 'flow',
    title: '意图合约：先规划，后执行',
    en: 'Intent contract',
    thesis:
      'Agent 收到一句话后，先把完整路径说清楚、请用户确认，再动钱。Human-in-the-loop 要从签名这一层前移到意图这一层。',
    why: [
      '10/10 都是先下单、后发现缺钱或缺条件',
      'Agent 越权发生在意图层：擅自补参数、把现货换成永续、充值后续跑旧指令',
      '新手察觉不到被改写的意图，老手则直接失去信任',
    ],
    moves: [
      '计划卡一次说清：“还需要：入金 15 USDC → 签 1 次 → 下单”',
      '方向、标的、现货或永续、金额、杠杆，缺了必须追问；用了默认值必须标出',
      '任何情况下都不悄悄改写交易类型；意图设有效期，过期按最新价格重新确认',
      '同一套流程复用到转账、跨链、授权等所有场景',
    ],
    visual: 'intent',
    question: '哪些参数允许 Agent 用默认值，哪些必须问？这条线由谁来定？',
    solves: ['Q01', 'Q05'],
    sources: ['阶段一 Retro'],
  },
  {
    no: '04',
    kind: 'ux',
    also: 'foundation',
    title: '默认就绪，只讲一个可用余额',
    en: 'Ready by default',
    thesis:
      '用户说出意图之前，钱包就应该处于“可以执行”的状态。对用户只讲一个可用余额，协议层的账户结构放到后台处理。',
    why: [
      '6/10 到开始交易时才发现要入金；3/10 按最低额充值后仍不够',
      '10/10 分不清钱包和交易账户；统一账户问题 5 人',
      '违背 UI 3.0 的“账户透明”和“链在后台”两条原则',
    ],
    moves: [
      '就绪状态常驻：已激活、有资金、账户模式正确、够最低额、手续费已计入',
      '一个“可用余额”：钱包到交易账户、现货到永续的划转由系统完成，账户模式由系统选对',
      '入金时就校验“最低额 + 手续费”，误充的网络和代币提前拦住',
      '补齐 Cash Out 闭环：钱怎么回到钱包，一步说清',
    ],
    visual: 'balance',
    question: '在 Hyperliquid 的账户结构下，“一个可用余额”能做到什么程度？哪些限制藏不到后台？',
    decide: true,
    solves: ['Q01', 'Q03'],
    sources: ['阶段一 Retro', 'UI 3.0 设计原则'],
  },
  {
    no: '05',
    kind: 'foundation',
    title: '可读授权：每次签名回答四个问题',
    en: 'Readable signing',
    thesis:
      '让用户看懂自己在签什么，是 Agentic Wallet 最核心的壁垒。Sigil 可读化要从“搁置”升级为下一阶段的主线。',
    why: [
      '没有人明确看懂签名；3 人没看懂就点了确认；7 人不认识 Nostr',
      'Sigil 相关的 3 条修复（2 条 P0）在阶段一全部搁置；Hyperliquid 授权类签名还没有专属模板',
      '台北问卷里没有人提到 Sigil 或可验证执行：团队内部的认知度都还不够',
    ],
    moves: [
      '每次授权都回答四个问题：给谁、做什么、范围多大、多久有效',
      '同类操作的签名规则保持一致，开始前告诉用户整个流程要签几次',
      '先补齐真实场景的模板：Hyperliquid 授权三件套、跨链下单与退款、TRON 交易',
      '所有生效中的授权集中在一个地方查看和撤销',
    ],
    visual: 'sign',
    question: 'Sigil 可读化由谁负责、投入多少资源、什么时候启动？',
    decide: true,
    solves: ['Q02', 'Q07'],
    sources: ['阶段一 Retro', 'Sigil 签名场景普查', '台北 Workshop'],
  },
  {
    no: '06',
    kind: 'foundation',
    also: 'flow',
    title: '授权模型与信任曲线',
    en: 'Delegation model',
    thesis:
      '不能每一笔都签，也不能一次放开全部。用分级授权让信任逐步建立：先动一点点，验证可靠之后再放开更多。',
    why: [
      '第一笔交易前要签 3–4 次，“授权流程简化”是最想改的点',
      '台北现场：100U 起步、翻倍之后才谈加码；六位同事都不愿意迁移主要资产',
      'Workshop 第二天自发产出了 RBAC 层级、Easy / Safe 双模式、信任曲线、权限面板草图',
    ],
    moves: [
      '会话级授权：限额 + 有效期 + 白名单 + 随时撤销，替代逐笔签名',
      'Easy / Safe 双模式：同一个 Agent 按用户的选择决定确认粒度',
      '一键熔断：暂停所有 Agent，一步可达',
      '资金与授权边界写进合约层（智能账户 + Session Key），而不只是服务端承诺',
    ],
    visual: 'curve',
    question: '授权频次算体验问题还是安全策略问题？下一阶段默认逐笔签名，还是会话授权？',
    decide: true,
    solves: ['Q07', 'Q08'],
    sources: ['阶段一 Retro', '台北 Workshop'],
  },
  {
    no: '07',
    kind: 'ux',
    also: 'flow',
    title: '成交真相：结果不用离开产品去核实',
    en: 'Verifiable outcome',
    thesis:
      '对 Agent 来说，“到底成没成”本身就是产品。全产品统一状态，Agent 主动回报结果，并附上可以验证的证据。',
    why: [
      '9/10 对订单结果不确定；产品里至少有 6 种状态用词',
      '有人去交易所原站、有人去链上核实：“链上比页面显示更可信”',
      '用户确认下单之后，Agent 就不再说话',
    ],
    moves: [
      '统一五种状态：处理中、已完成、部分完成、失败（附原因和下一步）、超时',
      '执行完成后由 Agent 主动汇报，附上链上或交易所的可验证链接',
      '部分完成时让用户选：继续、停止或重新确认',
      '每个进行中的操作都标明“现在还能不能撤回”',
    ],
    visual: 'states',
    question: '统一状态词表要不要作为交易、转账、跨链所有场景的强制规范？',
    solves: ['Q04', 'Q08'],
    sources: ['阶段一 Retro'],
  },
  {
    no: '08',
    kind: 'ux',
    title: '对话负责理解，卡片负责执行',
    en: 'Conversation × cards',
    thesis:
      '用户最喜欢的是按钮，对话的高光在解释和救援。按这条分工，建一套所有场景共用的 Agent 交互组件。',
    why: [
      '最喜欢的功能有 3 人选快捷按钮；对话的高光是解释账户、白话讲 TWAP、问失败原因',
      '对话之后要能马上给出可以点的按钮，而不是让用户自己去找',
      '原始报错 8 人、上下文不延续 5 人、中英混杂 4 人',
    ],
    moves: [
      '六个组件进 Design System：意图卡、就绪检查、授权卡、执行状态、回执与证据、错误与恢复',
      '错误一律写成“原因 + 下一步”，不展示原始报错',
      '同一会话延续最近用过的资产、交易类型和账户',
      'Trading、Send、Portfolio 共用同一套组件和用语',
    ],
    visual: 'components',
    question: '什么时候该对话、什么时候该直接点按钮？要不要为此定一条产品规则？',
    solves: ['Q06', 'Q10'],
    sources: ['阶段一 Retro', 'Design System'],
  },
  {
    no: '09',
    kind: 'strategy',
    title: '从“更快”走向“更懂我”',
    en: 'Beyond execution',
    thesis:
      '只会执行的 Agent 比不过交易所原站。下一步是有边界的决策辅助，加上会积累的个人上下文：这可能是用户留下来的理由。',
    why: [
      '用过之后想要“分析 / 策略”的人从 3 人变成 6 人',
      '台北 Workshop 的三个场合，讨论都从获客转向了留存；9 张理由卡没有一张提到易用性',
      '“个人化上下文积累”两天内被两次独立提出，同时回答了“为什么不会被抄”和“为什么会留下”',
    ],
    moves: [
      '能力分三层，下一阶段做到第二层：执行者 → 解释者 → 顾问',
      '解释者只讲事实：价格参照、费用、风险、可行性，不做预测，也不承诺收益',
      '持久化个人上下文：偏好、常用资产、风险承受度、历史意图',
      '用 Dashboard 上的 Today Brief 主动提醒，让 Agent 不只在被叫到时才出现',
    ],
    visual: 'ladder',
    question: 'Agent 的价值定位下一阶段押在哪一层？“分析”的合规判断由谁负责？',
    decide: true,
    solves: ['Q09', 'Q10'],
    sources: ['阶段一 Retro', '台北 Workshop'],
  },
  {
    no: '10',
    kind: 'tech',
    title: '可以用起来的技术',
    en: 'Tech radar',
    thesis:
      '不少体验问题已经有现成的标准和基础设施可以解决。把它们和阶段一的问题一一对上，挑两项先做 PoC。',
    why: [
      '签名次数多、手续费没算进总额、跨链要用户选：都有对应的协议层解法',
      '台北提出的“怎么证明 Agent 碰不到私钥”，至今没有负责人',
      'Agent Payer（小额自动支付）场景需要新的支付协议支持',
    ],
    moves: [],
    visual: 'radar',
    question: '这些技术里，哪两项值得下一阶段先做 PoC？',
    solves: ['Q01', 'Q02', 'Q07'],
    sources: ['Agentic 探索', '台北 Workshop'],
  },
]

export const radar = [
  { name: '智能账户 + Paymaster', std: 'ERC-4337 · EIP-7702', solves: '手续费抽象，用任意代币付 Gas；已有地址平滑升级为智能账户', ring: '基础' },
  { name: '权限授予 + Session Key', std: 'ERC-7715', solves: '会话级授权：限额、有效期、可撤销，减少逐笔签名', ring: '基础' },
  { name: '批量调用', std: 'EIP-5792', solves: '授权和下单合成一次确认，减少签名次数', ring: '基础' },
  { name: '跨链意图', std: 'ERC-7683 · OIF', solves: '链在后台：用户只说要什么，系统自动选路和结算', ring: '基础' },
  { name: '可验证 UI + 交易模拟', std: 'Sigil', solves: '签名前预演结果和余额变化，界面本身也可验证', ring: '信任' },
  { name: 'TEE + 远程证明', std: 'Attestation', solves: '向用户证明 Agent 的密钥隔离在安全环境里、碰不到私钥', ring: '信任' },
  { name: 'Agent 支付协议', std: 'x402 · AP2', solves: 'Agent Payer 场景：订阅、API 调用、Agent 之间的小额自动结算', ring: '场景' },
  { name: '开放给外部 Agent', std: 'MCP · Agent SDK', solves: '让用户自己的 AI 工具通过 imToken 安全调用钱包能力', ring: '场景' },
]

export const decisions = [
  { no: '01', text: '定位主张：用一句有取舍的话说清“凭什么赢”' },
  { no: '02', text: '主方向：信任基建打底之后，主场景押钱包高频场景还是交易智能' },
  { no: '05', text: 'Sigil 可读化：负责人、资源和启动时间' },
  { no: '06', text: '授权频次模型：逐笔签名，还是会话授权（限额 + 有效期 + 可撤销）' },
  { no: '09', text: 'Agent 能力边界：执行者、解释者还是顾问，下一阶段做到哪一层' },
  { no: '04', text: '账户抽象：钱包账户和交易账户是否对用户合并成一个可用余额，Cash Out 是否补齐' },
]

export const ownerless = [
  { title: '法币直接入金', note: '不从交易所出发就能换到 U，新手这条路才走得通', owner: '建议 BD' },
  { title: 'Agent 与私钥可证明隔离', note: '用户会问 Agent 能不能碰到私钥，我们要拿得出证明', owner: '建议 安全 + Labs' },
  { title: '风险归责', note: 'Agent 自主执行亏了钱怎么算，决定了 Easy 模式能放多松', owner: '建议 产品 + 法务' },
]

export const metrics = [
  { name: '意图一次就绪率', desc: '说完一句话之后，不用返工就能执行的比例', hit: 'Q01 · Q05' },
  { name: '看懂签名率', desc: '能复述“给谁、做什么、范围多大、多久有效”的比例', hit: 'Q02 · Q07' },
  { name: '无需外部核实率', desc: '不离开产品就能确认结果的比例', hit: 'Q04' },
  { name: '真金尝试与回访', desc: '用自己的钱试一笔的比例，以及一周内是否再回来', hit: 'Q09' },
]

export const sources = [
  'Alpha 内测阶段一 · 深度体验反馈总结（Shadowing 10 人，P01–P10）',
  '阶段一修复清单与 Retro 会前材料',
  '从 Trading Agent 到 Agentic Wallet · 讨论材料',
  'Alpha × Labs 台北 Workshop 总结',
  'Agentic Wallet 首页与 Portfolio 探索 brief',
  'Sigil 签名场景普查',
]
