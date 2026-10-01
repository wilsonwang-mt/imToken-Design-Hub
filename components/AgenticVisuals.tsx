import type { Visual } from '@/content/agentic-wallet'
import { radar } from '@/content/agentic-wallet'
import Icon from './Icon'

// Small schematic illustrations for the ten "things to build" cards.
// Plain HTML/CSS (plus one inline SVG) so they stay crisp and Figma-import friendly.

function Shift() {
  return (
    <div className="v-shift">
      <div className="v-shift-a">
        <span className="v-cap">阶段一</span>
        <b>说一句就下单的执行器</b>
        <small>价值只剩“更快”</small>
      </div>
      <span className="v-arrow"><Icon name="arrow" size={20} /></span>
      <div className="v-shift-b">
        <span className="v-cap">下一阶段</span>
        <b>人和 Agent 一起行动的信任层</b>
        <small>可验证、可叫停的执行过程</small>
      </div>
    </div>
  )
}

function Options() {
  return (
    <div className="v-options">
      <div className="v-opt">
        <span className="v-tag">B</span>
        <b>钱包高频场景</b>
        <small>转账 · 跨链 · 资产问答</small>
        <em>结果确定、易验证</em>
      </div>
      <div className="v-opt">
        <span className="v-tag">C</span>
        <b>交易智能</b>
        <small>分析 · 策略 · 可行性</small>
        <em className="later">等 A 就绪再放大</em>
      </div>
      <div className="v-base">
        <span className="v-tag solid">A</span>
        <b>信任基建</b>
        <small>可读授权 · 意图确认 · 可验证状态 · 必做</small>
      </div>
    </div>
  )
}

const intentSteps = [
  { t: '说出意图', s: '一句话' },
  { t: '解析补全', s: '缺参数就问' },
  { t: '就绪检查', s: '钱、模式、最低额' },
  { t: '计划确认', s: '新增的人工确认点', key: true },
  { t: '可读授权', s: '四个问题' },
  { t: '执行', s: '进度可见' },
  { t: '回执', s: '附可验证证据' },
]

function Intent() {
  return (
    <ol className="v-intent">
      {intentSteps.map((s, i) => (
        <li key={s.t} className={s.key ? 'key' : undefined}>
          <span className="n">{i + 1}</span>
          <b>{s.t}</b>
          <small>{s.s}</small>
        </li>
      ))}
    </ol>
  )
}

function Balance() {
  return (
    <div className="v-balance">
      <div className="v-layers" aria-label="今天用户要面对的账户层级">
        <span>钱包</span>
        <span>交易账户</span>
        <span>现货</span>
        <span>永续</span>
        <small>今天：四层都摆在用户面前</small>
      </div>
      <span className="v-arrow"><Icon name="arrow" size={20} /></span>
      <div className="v-ready">
        <span className="v-cap">可用余额</span>
        <b>128.40 <em>USDC</em></b>
        <ul>
          {['已激活', '有资金', '账户模式正确', '够最低额', '手续费已计入'].map((x) => (
            <li key={x}><Icon name="check" size={14} />{x}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Sign() {
  const rows = [
    ['给谁', 'Trading Agent'],
    ['做什么', '代你在 Hyperliquid 下单'],
    ['范围多大', '单笔不超过 50 USDC'],
    ['多久有效', '24 小时后自动失效'],
  ]
  return (
    <div className="v-sign">
      <div className="v-sign-h">
        <b>授权确认</b>
        <span>可验证 · Sigil</span>
      </div>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="v-sign-f">这个流程一共需要签名 1 次 · 随时可在授权管理中撤销</p>
    </div>
  )
}

function Curve() {
  const steps = ['试一笔 100U', '限额授权', '会话授权', '长期授权']
  return (
    <div className="v-curve">
      <svg viewBox="0 0 320 120" role="img" aria-label="信任曲线：随着信任建立，授权范围逐级放开">
        <path d="M10 108 H86 V80 H162 V52 H238 V24 H310" fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M10 108 H86 V80 H162 V52 H238 V24 H310 V112 H10 Z" fill="url(#vg)" opacity="0.5" />
        <defs>
          <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#A78BFA" stopOpacity="0.45" />
            <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[10, 86, 162, 238].map((x, i) => (
          <circle key={x} cx={x + 38} cy={108 - i * 28} r="4" fill="#fff" stroke="#7C3AED" strokeWidth="2" />
        ))}
      </svg>
      <div className="v-curve-l">
        {steps.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="v-curve-f">
        <span>信任逐步建立 →</span>
        <span className="v-kill">一键熔断 · 随时暂停所有 Agent</span>
      </div>
    </div>
  )
}

function States() {
  const before = ['执行中', '处理中', 'Resting', 'filled', '已结束，成交未知', '部分成交']
  const after = [
    ['处理中', 'blue'],
    ['已完成', 'green'],
    ['部分完成', 'amber'],
    ['失败 · 原因 + 下一步', 'red'],
    ['超时', 'gray'],
  ]
  return (
    <div className="v-states">
      <div>
        <span className="v-cap">今天 · 6 种说法</span>
        <div className="v-chips old">
          {before.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>
      <div>
        <span className="v-cap">统一 · 5 种状态 + 主动回执</span>
        <div className="v-chips">
          {after.map(([t, c]) => (
            <span key={t} className={`c-${c}`}><i />{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Components() {
  const parts = ['意图卡', '就绪检查', '授权卡', '执行状态', '回执与证据', '错误与恢复']
  return (
    <div className="v-comp">
      <div className="v-bubble">帮我用 30U 开 3 倍 BTC 多单</div>
      <div className="v-reply">好的，下单前确认三件事 ↓</div>
      <div className="v-stack">
        {parts.map((p, i) => (
          <span key={p}><em>{i + 1}</em>{p}</span>
        ))}
      </div>
      <small>对话负责规划、解释、恢复 · 卡片和按钮负责执行</small>
    </div>
  )
}

function Ladder() {
  const rungs = [
    { t: '执行者', s: '照指令下单', tag: '阶段一' },
    { t: '解释者', s: '价格参照 · 费用 · 风险 · 可行性', tag: '下一阶段', on: true },
    { t: '顾问', s: '策略建议（先定合规边界）', tag: '之后' },
  ]
  return (
    <div className="v-ladder">
      {rungs.map((r, i) => (
        <div key={r.t} className={r.on ? 'on' : undefined} style={{ marginLeft: `${i * 14}%` }}>
          <span className="v-cap">{r.tag}</span>
          <b>{r.t}</b>
          <small>{r.s}</small>
        </div>
      ))}
      <p className="v-ladder-f">贯穿三层：持久化的个人上下文（偏好、常用资产、风险承受度）</p>
    </div>
  )
}

function Radar() {
  const rings = ['基础', '信任', '场景']
  return (
    <div className="v-radar">
      {rings.map((ring) => (
        <div key={ring} className="v-ring">
          <span className="v-ring-h">{ring}</span>
          <div className="v-ring-grid">
            {radar
              .filter((r) => r.ring === ring)
              .map((r) => (
                <div key={r.name} className="v-tech">
                  <b>{r.name}</b>
                  <code>{r.std}</code>
                  <p>{r.solves}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function CardVisual({ kind }: { kind: Visual }) {
  const map: Record<Visual, () => React.ReactElement> = {
    shift: Shift,
    options: Options,
    intent: Intent,
    balance: Balance,
    sign: Sign,
    curve: Curve,
    states: States,
    components: Components,
    ladder: Ladder,
    radar: Radar,
  }
  const C = map[kind]
  return (
    <div className={`v-wrap v-${kind}-wrap`}>
      <C />
    </div>
  )
}
