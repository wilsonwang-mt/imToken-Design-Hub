// Agentic Wallet — meeting record (SG Office discussion after Alpha beta phase 1).
// Tags: 'decided' = agreed in the meeting; 'input' = leadership input; 'proposal' = team proposal, still to confirm.

export type Tag = 'decided' | 'input' | 'proposal' | 'open'

export const tagLabel: Record<Tag, string> = {
  decided: '会上决定',
  input: '管理层输入',
  proposal: '团队建议',
  open: '待确认',
}

export const meetingMeta = {
  eyebrow: '04 · PROJECTS · AGENTIC WALLET · 会议结论',
  title: 'Agentic Wallet 讨论结论',
  sub: '下一阶段的产品策略、体验策略与路线',
  where: 'SG Office · 面对面',
  who: 'CEO · PM · UXD',
  when: '2026 年 10 月',
  lead:
    '带着阶段一内测的反馈、Retro 和 Agentic Wallet 的战略目标，我们讨论了下一阶段要做什么、先做什么、怎么判断做对了。这份材料记录会上的决定、管理层的输入，以及团队据此提出的方案。',
}

export const tldr = [
  { tag: 'decided' as Tag, k: '做什么', v: 'Agentic Wallet 是给人用的钱包。Send、Trade、Swap、Bridge 等钱包场景都要 Agentic 化，Trading 只是其中一个场景。' },
  { tag: 'decided' as Tag, k: '怎么走', v: '分三个阶段渐进构建：Assistant → Advisor → Portfolio Manager，先从 Assistant 做起。' },
  { tag: 'input' as Tag, k: '价值门', v: '先回答：用户有没有继续使用？有没有击中真实痛点？' },
  { tag: 'input' as Tag, k: '安全门', v: '当前开发像黑盒，代码还没审查。接下来要审查，确保实现的能力安全有效。' },
]

/* ── 1. CEO inputs ── */
export const inputs = [
  {
    no: '01',
    title: '用户有没有继续使用？',
    quote: '内测结果来看，目前测试过程用户有没有继续使用？这也代表了产品是否有价值：有没有击中用户的痛点，是否真实存在这样的需求。',
    facts: [
      { k: '留存', v: '没有数据。第二周“不派任务”的观察没有落地，全员自主体验 0 份记录。' },
      { k: '真金意愿', v: '只有 2/10 明确会用真钱，而且都带条件。' },
      { k: '价值感知', v: '唯一成立的价值是“更快”，主要来自快捷按钮。' },
      { k: '样本', v: '10 位资深内部同事，测试资金由公司提供，不能代表真实需求。' },
    ],
    verdict: '阶段一证明了流程能跑通，但还没有证明用户需要它。',
    next: [
      '用后端和链上数据回答“有没有人回来”：创建钱包 → 首笔 → 不派任务期间仍有交易 → 内测结束后仍有交易',
      '访谈 8–10 位外部目标用户，不展示产品，只验证痛点是否存在、有多强',
      '真金小额测试：用户自己的钱、不派任务、两周，看自然回访和第二笔',
      '把价值假设写成一句可以被证伪的话，并在测试前定好成功标准',
    ],
  },
  {
    no: '02',
    title: '代码还是黑盒，需要审查',
    quote: '当前产品的开发目前像一个黑盒子，代码还没审核。接下来需要审查，确保产品实现的能力是安全有效的。',
    facts: [
      { k: '签名一致性', v: '已有评审只覆盖部分路径，“预览 = 实际签名内容”尚未全面核对。' },
      { k: '合并方式', v: '内测修复约 80 个提交一次性合并，对应验收清单没有勾选。' },
      { k: '可读授权', v: 'Sigil 可读化被搁置，用户看到的和实际签的无法对照。' },
      { k: '线上版本', v: '线上跑的是哪个版本，还没有确认。' },
    ],
    verdict: '审查一个场景，放开一个场景。',
    next: [
      '签名路径：逐个核对 7 个业务场景的“预览 = 实际签名内容”',
      'Agent 授权与服务端执行：授权范围、额度、可撤销，服务端只在授权内下单',
      '密钥：私钥和 Session Key 存在哪里、谁能接触、能否证明隔离',
      'AI 工具调用边界：可调用的工具、提示注入防护、参数的确定性校验',
      '发布流程：线上与 main 一致、合并必须 review、验收清单必须勾完',
    ],
  },
]

/* ── 2. Positioning ── */
export const positioning = {
  question: '我们到底要做一个给 Agent 用的钱包 / API，还是做一个钱包，Agent Trading 是其中的主要特色能力？',
  options: [
    {
      key: 'A',
      title: '给 Agent 用的钱包 / API',
      who: '客户是开发者和 AI 产品团队，Agent 是使用者',
      cons: '需要开发者生态和 B2B 能力，目前没有任何需求信号，正面对上资金和生态更强的基础设施厂商',
      chosen: false,
    },
    {
      key: 'B',
      title: '钱包为主，Agent Trading 是主要特色',
      who: '客户是终端用户',
      cons: '阶段一显示交易场景迁移动力弱，以 Trading 作为产品身份太窄',
      chosen: false,
    },
    {
      key: '✓',
      title: 'Agentic Wallet：人用的钱包，所有场景 Agentic 化',
      who: '用户、品牌和信任关系都属于 imToken；Agent 是贯穿 Send、Trade、Swap、Bridge 的交互方式',
      cons: 'Trading 是第一个场景，不是产品的身份',
      chosen: true,
    },
  ],
  note: '可读授权、权限模型、可验证执行、密钥隔离证明是任何方向都绕不开的底座，也正好对应安全门。这一层按 API 的标准建设，将来是否对外部 Agent 开放，保留为一个选项。',
}

/* ── 3. Whiteboard ── */
export const pillars = [
  {
    key: 'store',
    title: 'Store',
    zh: '存',
    groups: [
      { h: 'Guardian · 安全性', items: ['资金保管', '产品验真', '私钥安全', '隐私保护'] },
      { h: '签名', items: ['Sign'] },
      { h: '哨兵', items: ['Market 动态监控'], highlight: true },
    ],
    agent: '安全底座 + 主动盯盘：Agent 的第一价值可能是“替你看着”',
  },
  {
    key: 'send',
    title: 'Send',
    zh: '转',
    groups: [
      { h: '① 流程繁琐', items: ['地址', '金额', '网络', 'Token', '跨链'] },
      { h: '② 安全确认', items: ['准确性', '风险性', '合规性（收款方）'] },
      { h: '③ 批量', items: ['定时发送'] },
      { h: '④ 成本', items: ['Gas Fee'] },
    ],
    agent: '一句话填好表单、自动选网络和路径；收款方校验与合规筛查；批量和定时；手续费抽象',
  },
  {
    key: 'trade',
    title: 'Trade',
    zh: '交易',
    groups: [
      { h: '用户难点', items: ['信息 / 信号分析成本', '判断准确性', '时效性（人难盯盘）'] },
    ],
    agent: '三个难点都在“信息和判断”，不在“下单”：重心从执行转向研判与哨兵',
  },
  {
    key: 'bridge',
    title: 'Bridge',
    zh: '跨链',
    groups: [{ h: '白板未展开', items: [] }],
    agent: '建议作为 Send / Trade 计划中的一个步骤，链在后台，用户不需要说“帮我跨链”',
    empty: true,
  },
]

/* ── 4. Agentic levels & scenarios ── */
export const levels = [
  { lv: 'L1', name: '意图输入', desc: '一句话填好表单', eg: '“转 50 USDT 给 Alice” → 自动填好收款人、金额、网络' },
  { lv: 'L2', name: '多步规划', desc: '多个步骤合成一个计划，一次确认', eg: '钱在 TRON、收款方在 HyperEVM → 自动跨链再转账' },
  { lv: 'L3', name: '规则内委托', desc: '在用户设好的规则内自动执行', eg: '定投、价格触发换币、策略交易' },
]

export const pipeline = ['意图', '规划与就绪检查', '计划卡确认', '可读授权', '执行', '回执与证据']

export const scenarios = [
  { s: 'Send', gain: '联系人与 ENS 识别、自动选网络、需要时自动跨链', risk: '转错人不可逆，收款人确认是关键', verify: '高', target: 'L2' },
  { s: 'Swap', gain: '一句话换币、自动选路由、讲清滑点和费用', risk: '滑点与价格变化', verify: '高', target: 'L2' },
  { s: 'Bridge', gain: '作为计划中的一步自动完成', risk: '跨链失败与退款', verify: '中', target: '计划内步骤' },
  { s: 'Trade', gain: '先把阶段一的问题修透', risk: '杠杆与授权范围', verify: '中', target: '稳住 L2' },
  { s: '资产问答', gain: '“我的钱在哪、能用多少”', risk: '只读，风险最低', verify: '高', target: 'L1–L2' },
]

export const combo = {
  say: '把 TRON 上的 USDT 换成 ETH，转到我的 HyperEVM 账户',
  steps: ['跨链', '换币', '转账'],
  point: '传统钱包要分三次、甚至开三个应用；Agentic Wallet 是一句话、一张计划卡、一次确认。跨场景组合是表单做不到的价值。',
}

/* ── 5. Decision engine ── */
export const engine = {
  formula: '期望值 = 胜率 × 平均盈利 − 败率 × 平均亏损 − 成本',
  thesis: '“赢率”不是该优化的指标。对钱包里的 Agent，最确定的“赢”是帮用户少犯错：杠杆过高、频繁交易、不设止损、追涨杀跌、忽视成本。',
  layers: [
    { n: '数据', d: '价格、盘口、资金费率、清算、链上资金流、情绪，以及用户自己的持仓和风险偏好', key: '时间戳正确，回测只用当时可见的数据' },
    { n: '信号', d: '趋势、波动率状态、资金费率极值、流动性', key: '每个信号单独回测；LLM 不直接预测价格' },
    { n: '研判', d: '组合信号、识别市场状态，输出结构化的决策对象', key: '“不交易”是合法输出' },
    { n: '风控', d: '单笔风险、杠杆、日内熔断、强平距离、成本吃掉收益', key: '确定性规则，独立于 LLM，可一票否决' },
    { n: '执行', d: '订单类型、滑点、拆单、确认成交', key: '执行结果可验证' },
    { n: '复盘', d: '记录输入、输出、结果，归因到信号、执行或风控', key: '置信度校准：说 70% 时实际接近 70%' },
  ],
  object: ['方向', '标的', '入场价', '仓位', '止损', '止盈', '失效条件', '盈亏比', '置信度', '证据', '成本'],
  split: {
    llm: ['理解用户意图', '把新闻和公告整理成结构化特征', '解释判断依据'],
    tool: ['所有数字由确定性工具计算', '风控规则永远不交给 LLM', '数据带来源和时间戳'],
  },
}

/* ── 6. Three stages ── */
export const stages = [
  {
    key: 'assistant',
    name: 'Assistant',
    zh: '助理',
    line: '帮你看清楚',
    decide: '用户',
    output: '事实、解释、风险提醒',
    auth: '每笔都由用户确认',
    builds: '可信',
    caps: ['下单前检查', '哨兵提醒', '资产与交易问答', '交易复盘', '决策日志'],
    gate: ['自然回访率稳定', '数字准确率接近 100%', '风险提醒确实改变了用户行为', '合规确认建议的表述边界'],
    now: true,
  },
  {
    key: 'advisor',
    name: 'Advisor',
    zh: '顾问',
    line: '帮你想清楚',
    decide: '用户（Agent 给建议）',
    output: '带证据和失效条件的建议 + 计划卡',
    auth: '每笔确认，可一键执行',
    builds: '有判断力',
    caps: ['研判简报（多空都讲）', '置信度与持续校准', '按用户风险偏好个人化', '建议直接生成计划卡'],
    gate: ['置信度经过校准', '影子模式跑赢简单基准且回撤可控', '授权模型和熔断通过审查与审计', '风险归责与法律结构明确'],
  },
  {
    key: 'pm',
    name: 'Portfolio Manager',
    zh: '资产管家',
    line: '按你的规则替你打理',
    decide: 'Agent，在用户授权范围内',
    output: '自动执行结果、调仓报告、回执',
    auth: '委托授权：目标、风险上限、额度、有效期，随时撤销',
    builds: '可托付',
    caps: ['用户定义授权范围（Mandate）', '再平衡与条件触发执行', '授权边界写在合约层', '定期报告与基准对比', '一键熔断'],
    gate: [],
  },
]

export const assistantMvp = {
  first: ['下单前检查', '哨兵提醒', '资产问答'],
  later: '研判简报先内部试用，校准语气和合规边界后再开放',
  moat: [
    { k: '钱包原生上下文', v: '知道你的持仓、授权、历史和风险偏好' },
    { k: '可验证的数据', v: '数字来自工具调用，带来源和时间戳' },
    { k: '离行动只差一步', v: '每个回答后面都跟一个可以点的下一步' },
  ],
  metrics: [
    { k: '交易前打开 Assistant 的比例', v: '是否成为决策的一部分' },
    { k: '风险提醒后修改操作的比例', v: '是否真的帮用户避开错误' },
    { k: '哨兵提醒有效率', v: '是信号还是噪音' },
    { k: '数字准确率', v: '目标：零编造' },
    { k: '一周、两周自然回访率', v: '回应价值门' },
  ],
}

export const risks = [
  { t: '合规强度逐级上升', d: 'Assistant 提供信息，Advisor 接近投资建议，Portfolio Manager 接近全权委托管理。法务现在就要参与。' },
  { t: '自托管不能丢', d: '资产始终在用户自己的账户里，Agent 只拿到有限、可撤销的操作权限。这是和中心化理财产品最根本的区别。' },
  { t: '价值验证不能跳级', d: '如果 Assistant 阶段用户都不回来，Advisor 和 Portfolio Manager 只会更难。' },
]

/* ── 7. Action items ── */
export const actionItems = [
  { t: '用后端与链上数据回答“有没有人回来”', owner: 'PM · DEV', gate: '价值门' },
  { t: '外部目标用户需求访谈（8–10 人）', owner: 'UXD', gate: '价值门' },
  { t: '设计真金小额测试与成功标准', owner: 'PM · UXD', gate: '价值门' },
  { t: '启动代码与签名路径安全审查', owner: '安全 · DEV', gate: '安全门' },
  { t: '更新签名场景普查与产品能力清单（审查起点）', owner: 'UXD', gate: '安全门' },
  { t: '确认线上版本与 main 一致，补齐合并 review 与验收', owner: 'DEV', gate: '安全门' },
  { t: '定义决策对象的数据结构（前后端共用）', owner: 'PM · DEV · UXD', gate: 'Assistant' },
  { t: 'Assistant 第一版：下单前检查、哨兵提醒、资产问答', owner: 'PM · UXD', gate: 'Assistant' },
  { t: '从现在开始记录决策日志', owner: 'DEV', gate: 'Assistant' },
  { t: '法务确认 Assistant / Advisor 的表述边界', owner: '产品 · 法务', gate: '合规' },
]

export const openQuestions = [
  'Swap 是并入 Trade，还是作为独立场景？从频次看它比合约交易高得多',
  'Bridge 是否作为独立入口出现，还是只作为计划中的步骤',
  '风险归责：Agent 自主执行亏损时的责任划分（决定 Portfolio Manager 能放多松）',
  '可读授权（Sigil）的负责人、资源和启动时间',
]
