# 协作规范

imToken Design 是整个设计团队共用的站点：每个设计项目在「项目追踪」下有一张卡片，点进去能看到这个项目的背景、进度、决定和全部材料。多人同时提交时，靠三样东西保持一致：

1. **模板**：新项目、新材料都用脚本生成，页面骨架由共享组件渲染，各人只填内容。
2. **自动审核**：`npm run audit` 按下面的规则检查每个 PR。
3. **人工审稿**：审稿人在 Vercel 预览上看视觉和文案，自动审核管不到的部分靠这一步。

每个项目「至少包含什么」见 [docs/project-template.md](docs/project-template.md)，视觉和写作规范见 [docs/style-guide.md](docs/style-guide.md)。

> 「CI 不通过不能合并」「必须有人批准」「共享文件必须 Wilson 批准」这三条，要在 GitHub 上给 `main` 开启分支保护后才强制生效（必需检查 `check`、至少 1 个批准、Require review from Code Owners、禁止强推）。开启之前请自觉按流程走。

## 流程

| 步骤 | 做什么 |
|---|---|
| 1. 开分支 | 从最新的 `main` 开分支，命名 `<你的名字>/<slug>-<主题>`，如 `alice/swap-redesign-research`。一个分支只做一个项目的一件事。不要直接推 `main`。 |
| 2. 生成文件 | 新项目：`npm run new:project -- <slug> --title "中文名"`。新材料：`npm run new:doc -- <slug> <key> --title "标题" --type research`（托管整页加 `--hosted`）。带空格的值要加引号。 |
| 3. 填内容 | 打开 `content/projects/<slug>/project.ts`，把所有【待填写】换成真实内容；正文写在生成的页面里。只改自己项目的三个目录（见下文「文件放在哪」）。 |
| 4. 本地自检 | `npm run dev` 在桌面宽度和手机宽度（375px）各看一遍；`npm run check`（审核 + 生产构建）全部通过。 |
| 5. 提 PR | 按 PR 模板填写：改了什么、预览地址、桌面和手机截图、自检清单。标题写成 `<slug>: 摘要`，如 `swap-redesign: 新增竞品调研`。 |
| 6. 自动检查 | GitHub Actions 跑 `npm run audit` 和 `npm run build`；Vercel 在 PR 里贴预览地址。 |
| 7. 审稿 | 在 PR 右侧的 Reviewers 里请项目负责人或另一位设计师审项目内容（项目目录不会自动请求审稿人）。改到共享文件时，GitHub 会按 CODEOWNERS 自动请求 Wilson，包括新建项目时脚本改的 `content/projects.ts`。审稿人在预览上走查，按下文「人工审稿清单」提意见。 |
| 8. 合并 | 至少 1 人批准、CI 通过后 Squash merge。Vercel 自动部署，作者打开线上地址确认一次。 |
| 9. 维护 | 项目每推进一步：改 `updated`，在 `changelog` 最前面加一条同一天的记录；阶段变了同步改 `stage` 和 `status`。 |

## 文件放在哪

一个项目的所有文件只放在三处，目录名就是项目的 slug（小写英文字母开头，只用小写字母、数字和连字符）：

```
content/projects/<slug>/project.ts   项目数据：卡片、概览页、材料清单、链接、更新记录
app/projects/<slug>/                 页面：page.tsx（概览）、<key>/page.tsx（材料）、layout.tsx、<slug>.css
public/projects/<slug>/              托管整页 HTML（原型、长文）和图片
```

托管整页不需要改 `next.config.mjs`：`/projects/<slug>/<key>/` 会自动指向 `public/projects/<slug>/<key>/index.html`。

以下是共享文件，项目 PR 不要改；确实需要改时单独开 PR 并写明原因，由 Wilson 审：

```
app/globals.css  app/layout.tsx  app/page.tsx  app/projects/page.tsx  app/toolbox/
components/  content/site.ts  content/toolbox.ts  content/projects/_schema.ts
next.config.mjs  package.json  package-lock.json  tsconfig.json  .gitignore
public/projects/site-nav.js  public/brand/  public/confu/  public/toolbox/  sources/
scripts/  .github/  docs/  CLAUDE.md  CONTRIBUTING.md  README.md
```

唯一的例外是 `content/projects.ts`（项目注册表）：`new:project` 会在里面插入两行，随项目 PR 一起提交，不要撤销、不要拆开。它也是共享文件，所以新建项目的 PR 需要 Wilson 批准。

**两个新项目同时提 PR 时**，后合并的那个会在 `content/projects.ts` 出现冲突：两个 PR 都在同一个 `// @…` 标记上方加了一行。解决方法是两行都保留，标记留在最后，再跑一次 `npm run audit`。如果 audit 报 cssPrefix 重复（两个分支自动选了同一个前缀），由后合并的项目换一个前缀：`project.ts` 的 `cssPrefix`、`<slug>.css` 里的选择器、页面里自己写的 class 一起改。

## 自动审核规则

`npm run audit` 检查下表的规则。**block** 级问题会让 CI 失败，必须修掉；**warn** 级问题会列出来，修掉或在 PR 里说明原因。输出里的规则 ID 对应这张表。

| ID | 级别 | 规则 |
|---|---|---|
| STR-01 | block | `content/projects/`、`app/projects/`、`public/projects/` 下的每个项目目录，都要有对应的已登记项目。 |
| CARD-01 | block | 卡片字段齐全：slug 符合格式且唯一，`href` 是 `/projects/<slug>/`，`tags` 至少 1 个，`stats` 是数组。新项目还要有 `stage`（7 个值之一）、`owner`（名字 + 职能）、`updated`（YYYY-MM-DD，不晚于今天，等于 `changelog` 第一条的日期）、`docs`、`links`、`overview`。不能留【待填写】。`legacy` 只给下面的三个旧项目。 |
| CARD-02 | warn | 卡片写法：`title` ≤16 字，`en` ≤40 字符，`desc` 40–120 字，`phase` ≤24 字，`tags` 1–5 个不重复，`stats` 写空数组或恰好 3 项。 |
| TPL-01 | block | 新项目的概览页用 `<ProjectOverview>`，子页面用 `<ProjectDoc>`（完全自定义的页面请做成托管整页）。`docs` 第一条是概览页；`overview` 的背景、目标、当前状态不能为空。 |
| TPL-02 | warn | 过了探索阶段，「关键决定」不应为空；进行中的项目，「待决问题」不应为空。 |
| TPL-03 | block | 每份材料都在 `docs` 里登记，字段齐全（类型、状态、日期、作者、一句话结论），`key` 不重复，`href` 在本项目路径下且对应的文件存在。多页的托管原型（`<key>/step-2/index.html`、`<key>/step-2.html`）算在登记过的 `<key>/` 下面。 |
| TPL-04 | block | 页面和托管 HTML 里不能留【待填写】。 |
| PAGE-01 | block | 项目页面要有站点导航、面包屑、页脚，并导出 `metadata`（用模板组件时自动满足）。 |
| PAGE-02 | block | 链到托管页时用 `SmartLink` 或普通 `<a>`，不用 `next/link`。 |
| CSS-01 | block | 项目样式写在 `app/projects/<slug>/<slug>.css`，每个顶层选择器都以项目前缀 `.<cssPrefix>` 开头（嵌套规则和 `:is()` 里的逗号没关系）；前缀 2–6 个小写字母，全站唯一，不能和共享 class 重名。 |
| CSS-02 | warn | 颜色用 `var(--…)` token；项目自有颜色先在 `.<cssPrefix>` 根规则里声明成自定义属性再引用。 |
| HOST-01 | block | `public/projects/` 下的每个 HTML 都要有 `lang`、`charset`、`viewport`、以「 · imToken Design」结尾的 `<title>`，并引用站点导航脚本（`npm run fix:hosted` 自动补）。 |
| FILE-01 | block | 不提交系统文件（`.DS_Store`）、密钥文件、设计源文件（`.fig`、`.sketch`、`.psd` 等）；单个文件不超过 10 MB，大文件放 Drive，页面里只放链接。中文文件名同样检查。 |
| SEC-01 | block | 不提交 token、API key、私钥、带凭证的链接；不写职级、薪酬类信息。<!-- audit-ok SEC-01 --> 交易哈希、合约地址、区块浏览器链接是公开数据，可以写。 |
| BASE-01 | block | 全站不进搜索引擎（根 metadata 的 `robots` 和 `X-Robots-Tag` 响应头）。 |

确实需要例外时（例如引用的原文里有一个被误判的词），在同一行加注释 `audit-ok <规则ID> <原因>`，审稿人会看这个原因。只对逐行检查的规则（SEC-01、CSS-01、CSS-02）有效。

规范建立之前的三个旧项目（Agentic Wallet、Stake 视频制作、ENS 地址解析）标了 `legacy: true`，暂时豁免新项目的必填项。这份名单写在 `scripts/audit.config.json` 的 `legacySlugs` 里，新项目不能用。迁移计划见「下一步」。

## 人工审稿清单

自动审核只能查结构和格式，下面几项要审稿人在 Vercel 预览里看：

- **视觉**：和站点其他页面是同一套样子（玻璃卡片、字号层级、间距）；手机宽度没有横向滚动、文字没有被截断。
- **内容**：卡片和概览页能让没参与过的人在 1 分钟内看懂：为什么做、到哪了、定了什么、还有什么没定。材料的一句话结论是结论，不是介绍。
- **文案**：按 [docs/style-guide.md](docs/style-guide.md) 的写作规范：简体中文、中英文之间留空格、引号用「」、日期 YYYY-MM-DD。
- **对外信息**：**仓库是公开的**，提交的所有内容（包括托管页）任何人都能在 GitHub 上看到；noindex 只是不进搜索引擎。不提交未发布的产品细节、合作方信息、用户数据、内部数据截图和个人信息；这类内容放在需要公司账号的地方（Figma、Drive），页面里只放链接并标「需公司账号」。

## 下一步

这一版先把模板、自动审核和流程定下来，以下几项之后再做：

- **旧项目迁移**：Stake 视频制作、Agentic Wallet 的样式从 `globals.css` 搬到各自的项目样式文件，页面换成模板组件，去掉 `legacy`；ENS 原型移到子路径，根路径改为概览页。
- **注册表拆分**：旧项目迁移后，`content/projects.ts` 只保留引用，每个项目的数据都在自己的 `project.ts` 里。
- **Claude Code 辅助**：新建项目、提 PR 前自检、审稿的 skill，以及提交前自动跑审核的钩子。
- **卡片信息**：项目列表显示负责人和更新日期，按更新时间排序，归档项目放最后。
