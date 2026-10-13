# imToken Design

imToken 设计团队的主页：团队、设计系统、素材库、项目追踪和设计师工具箱。

目前开放的是 **设计师工具箱**（Confu 分享 EP01、EP02，以及文案管理工作流）和 **项目追踪**（Agentic Wallet、Stake 视频制作），其余板块会陆续上线。

## 参与贡献

多位设计师共用这个仓库。新建或更新项目之前，先读 [CONTRIBUTING.md](CONTRIBUTING.md)（流程和自动审核规则）、[docs/project-template.md](docs/project-template.md)（每个项目至少包含什么）和 [docs/style-guide.md](docs/style-guide.md)（视觉与写作规范）。用 Claude Code 的同事，[CLAUDE.md](CLAUDE.md) 会被自动读取。

## 本地运行

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # 自动审核 + 生产构建，提 PR 前必须通过（CI 跑的是同一套）
```

需要 Node 20.9 以上。

## 目录

```
app/                  页面（Next.js App Router）
  page.tsx            首页
  toolbox/page.tsx    设计师工具箱
  projects/page.tsx   项目追踪（项目列表）
  projects/agentic-wallet/page.tsx  Agentic Wallet：内测十个问题 + 要做的十件事
  projects/stake-video/page.tsx     Stake 视频制作：故事、视觉语法、进度、链接
  projects/stake-video/taglines/page.tsx  宣传语提案：一张卡一个提案，按类别分组
  globals.css         视觉体系（沿用「我是主理人」DESIGN.md 的浅色玻璃风格，做了简化）
components/           导航、页脚、图标
  project/            项目模板：ProjectOverview（概览页）、ProjectDoc（材料页）、DocSwitcher、SmartLink
content/              所有文字内容，改内容只改这里
  site.ts             网站信息与五个板块
  toolbox.ts          Confu 各期与工作流
  projects.ts         项目注册表（新项目由 npm run new:project 自动登记）
  projects/_schema.ts 项目数据规范：卡片、概览页、材料的字段
  projects/<slug>/    新项目的数据（project.ts）
  agentic-wallet.ts   Agentic Wallet 页面的全部卡片内容
  stake-video.ts      Stake 视频制作项目页的内容
  stake-taglines.ts   宣传语提案的分类与卡片（中英双语）
public/
  confu/ep01/         EP01 演示文稿（index.html）与资料包
  confu/ep02/         EP02 演示文稿、Claude Design 专题页、资料包
  toolbox/atlas/      设计工具图鉴（由 sources/tool-atlas/build.py 生成，不要手改）
  toolbox/copy-workflow/  文案管理工作流（原仓库内容，已迁移到这里）
  projects/stake-video/pr/  Stake 视频制作 · 媒体 PR 稿方案（托管的静态页）
scripts/
  audit.mjs           自动审核（npm run audit），规则见 CONTRIBUTING.md
  scaffold.mjs        新建项目 / 材料（npm run new:project、new:doc），模板在 templates/
docs/                 项目模板、视觉与写作规范
sources/
  tool-atlas/         设计工具图鉴的源数据：data-*.json、atlas.css / atlas.js、logos/
  brand/              imToken logo
```

## 常见操作

**开放新一期 Confu 分享**

1. 把演示文稿放到 `public/confu/ep03/index.html`，它引用的素材按相对路径放在同一目录下。
2. 在 `content/toolbox.ts` 里把 `no: '03'` 那一项的 `status` 改成 `'open'`，填上日期、标题、简介和链接。
3. 提交并推送，Vercel 会自动部署。

演示文稿地址是 `/confu/ep03/`（结尾的斜杠不能省，文稿里的素材用相对路径加载）。

每份演示文稿顶部都有一条「返回网站」导航：鼠标移到窗口最上沿就会出现（手机上是左上角的小按钮）。放入或替换演示文稿后运行一次：

```bash
node scripts/add-deck-nav.mjs
```

它会给 `public/confu/` 下所有 HTML 补上这一行 `<script src="/confu/site-nav.js" defer></script>`，原始演示文稿文件不需要改。

**更新设计工具图鉴**

改 `sources/tool-atlas/` 里的 `data-*.json`（工具内容）、`logo-manifest.json`（标识）或 `atlas.css` / `atlas.js`，然后运行：

```bash
python3 sources/tool-atlas/build.py
```

它会重新生成 `public/toolbox/atlas/index.html`，并把网站导航、logo 文件一起带上。工具箱页面上的入口卡片文字在 `content/toolbox.ts` 的 `atlas` 里。

**在项目追踪里加一个项目**

```bash
npm run new:project -- <slug> --title "中文名"
```

它会生成 `content/projects/<slug>/project.ts`（卡片和概览页的数据）、概览页、样式文件，并在 `content/projects.ts` 登记。把所有【待填写】换成真实内容，`npm run check` 通过后提 PR。新增材料用 `npm run new:doc`。完整流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。

规范建立前的三个旧项目：Agentic Wallet 的卡片文字在 `content/agentic-wallet.ts`；Stake 视频制作的文字在 `content/stake-video.ts`，宣传语卡片在 `content/stake-taglines.ts`，媒体 PR 稿方案是托管的静态页 `public/projects/stake-video/pr/index.html`（由视频项目的生成脚本产出，改内容时整页替换）；ENS 地址解析是托管原型 `public/projects/ens-address-resolution/index.html`。

**开放一个新板块**

在 `content/site.ts` 里把对应板块的 `status` 改成 `'open'`，填上 `href`，再在 `app/` 下新建对应页面。

## 部署

GitHub 推送到 `main` 后由 Vercel 自动构建部署，每个 PR 会生成预览地址。GitHub Actions 对每个 PR 跑自动审核和构建（`.github/workflows/ci.yml`）。

## 规划

- 五个板块：团队 / 设计系统 / 设计素材库 / 项目追踪 / 设计师工具箱
- 之后接入 Supabase（数据与登录），届时再加访问控制
