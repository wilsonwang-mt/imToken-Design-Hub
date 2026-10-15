// Stake 视频制作 · 视频制作技巧及规范。
// 正文是 public/projects/stake-video/guide/ 下的 md 文件（唯一来源，由视频项目 docs/guides/ 同步过来），
// 页面在构建时把 md 渲染成 HTML；同一个 md 也可以直接下载，给同事的 Claude 读取。

export interface GuideDoc {
  key: string
  file: string
  step: string
  title: string
  en: string
  /** 一句话：这份文档管什么 */
  summary: string
  /** 卡片上的要点 */
  points: string[]
}

export const guideIntro = {
  eyebrow: 'PLAYBOOK · 视频制作技巧及规范',
  title: '视频制作技巧及规范',
  sub: '用同一套画布、素材和风格做下一支视频',
  lead: '「Bulu 与沉睡的 ETH」从剧本到成片的做法和硬规则，整理成五份可以单独阅读的规范：角色、ETH 与质押容器、Remotion 合成、LibTV 画布、配音发音。每份都是独立的 Markdown 文件，人可以在这里读，也可以把文件直接交给 Claude。',
  overviewFile: '00-overview.md',
  bundleFile: 'stake-video-guide-all.md',
  updated: '2026-10-15',
}

export const guideDocs: GuideDoc[] = [
  {
    key: 'bulu',
    file: '01-bulu.md',
    step: '01',
    title: 'Bulu 形象规范',
    en: 'Bulu Character',
    summary: '光滑锐利的搪胶玩具，没有腿、没有手臂、没有眉毛：造型、质感、颜色、表情、prompt 原文和检查清单。',
    points: ['造型与比例', '表面质感与颜色', 'Style Block prompt', '常见问题与后期修复'],
  },
  {
    key: 'eth-vault',
    file: '02-eth-vault.md',
    step: '02',
    title: 'ETH 晶体与质押容器规范',
    en: 'ETH Crystal & Staking Vault',
    summary: 'ETH 的数量、大小、亮度各代表什么；质押容器（验证器圆柱）、光带、奖励小 ETH 和增量计数器怎么画。',
    points: ['视觉语法', '容器几何与材质', '光带与奖励小 ETH', '增量计数器'],
  },
  {
    key: 'remotion',
    file: '03-remotion.md',
    step: '03',
    title: 'Remotion 动画与合成规范',
    en: 'Remotion Compositing',
    summary: 'AI 只做固定机位的底片，运镜、界面、数字、字幕和声音都在 Remotion 里做：剪辑表、叠加层、混音、渲染交付。',
    points: ['分工原则', '剪辑表与叠加层', '声音与多语言', '渲染与交付'],
  },
  {
    key: 'libtv-canvas',
    file: '04-libtv-canvas.md',
    step: '04',
    title: 'LibTV 画布分析与使用',
    en: 'LibTV Canvas',
    summary: '画布里有什么、每个镜头的终版是哪条；模型参数、prompt 与首帧、协作规则，以及从这张画布开始新视频的步骤。',
    points: ['画布结构与终版', '模型与参数', 'prompt 与首帧', '协作与 CLI'],
  },
  {
    key: 'voiceover',
    file: '05-voiceover.md',
    step: '05',
    title: 'imToken 配音与发音规范',
    en: 'Voice-over & Pronunciation',
    summary: 'imToken 读作 /ɛm/ + token：TTS 写 MToken、字幕写 imToken；中英文人声、生成、检查、后期和审听流程。',
    points: ['品牌名读法', '人声与参数', '生成后检查', '后期与混音'],
  },
]

export const guideBase = '/projects/stake-video/guide/'
export const guideRaw = (file: string) => `${guideBase}${file}`
