# 视觉与写作规范

站点的视觉一致性来自共享的页面骨架和设计 token，而不是每个人照着别的页面模仿。新页面先用现成的组件和样式，不够用再在项目样式里扩展。

## 1. 页面骨架

| 页面 | 用什么 | 说明 |
|---|---|---|
| 项目概览 | `<ProjectOverview project={project}>` | `npm run new:project` 生成，区块顺序固定，见 [project-template.md](project-template.md) |
| 项目材料（站内页面） | `<ProjectDoc project={project} docKey="…">` | `npm run new:doc` 生成；标题区、面包屑、材料切换和页脚自动渲染，只写正文 |
| 项目材料（托管整页） | `public/projects/<slug>/<key>/index.html` | `npm run new:doc -- <slug> <key> --hosted` 生成，约定见第 5 节 |

正文按区块写，每个区块一个 `<section className="wrap block">`，标题用 `block-head`：

```tsx
<section className="wrap block" aria-labelledby="research-findings">
  <div className="block-head">
    <p className="eyebrow">FINDINGS</p>
    <h2 id="research-findings">主要发现</h2>
    <p className="sub">一句话说明这一块讲什么（可选）</p>
  </div>
  <div className="pj-two">
    <div className="glass pj-box">…</div>
    <div className="glass pj-box">…</div>
  </div>
</section>
```

## 2. 设计 token

颜色、字体、阴影和缓动都在 `app/globals.css` 的 `:root` 里，**只用 `var(--…)`，不写颜色值**。

| Token | 用途 |
|---|---|
| `--blue` `--blue-hover` `--blue-deep` | 主色、悬停、深蓝文字（标签、状态） |
| `--blue-100` `--blue-50` | 浅蓝背景、高亮 |
| `--navy` | 标题和强调文字 |
| `--text` `--text-2` | 正文、次要文字 |
| `--secondary` | 弱化信息（面包屑、日期）。对比度不足，不要用于需要阅读的正文 |
| `--border` | 分隔线、描边 |
| `--success` | 完成、已发布 |
| `--ground` | 页面底色 |
| `--sans` `--serif` | 正文字体；宋体只用于大数字和序号 |
| `--shadow` `--ease` | 卡片阴影、动效缓动 |

项目确实需要自己的颜色（比如品牌合作方的色值），先在项目根规则里声明成自定义属性，再在下面引用：

```css
.sr { --sr-accent: #ff6a00; }
.sr-badge { color: var(--sr-accent); }
```

## 3. 共享样式

| class | 用途 |
|---|---|
| `glass` | 玻璃卡片（白色半透明 + 阴影），所有卡片和面板的底 |
| `eyebrow` | 区块标题上方的英文小标签 |
| `block-head` + `h2` + `sub` | 区块标题、说明 |
| `lead` | 标题下的导语 |
| `tags` | 标签列表（`<ul className="tags"><li>…</li></ul>`） |
| `pj-two` / `pj-three` | 两栏 / 三栏网格，平板和手机自动变成一栏 |
| `pj-box` | 卡片内边距 + 小标题 + 正文 |
| `pj-list` | 带圆点的列表 |
| `pj-rows` | 日期 + 内容的行列表（决定、记录） |
| `pj-timeline` | 时间线（`t-done` / `t-now` / `t-next`） |
| `pj-docs-grid` + `pj-doc` | 卡片网格 |

`aw-`、`sv-` 开头的是旧项目的专用样式，新项目不要引用，它们迁移时会改名。项目样式前缀不能和这里任何一个 class 的第一段重名（审核会自动检查）。

## 4. 项目样式

- 写在 `app/projects/<slug>/<slug>.css`，由同目录的 `layout.tsx` 引入。
- 每个选择器都以项目前缀开头：`.sr .card`、`.sr-badge`。页面的 `<main>` 已经带上前缀 class。不要改共享 class 本身（如单独写 `.glass {…}`）。
- 断点和站点一致：`max-width: 1023px`（平板）、`max-width: 640px`（手机）。
- 动效只用 `transform` 和 `opacity`，并在 `@media (prefers-reduced-motion: reduce)` 里关掉。
- 手机宽度（375px）不能有横向滚动；表格、长代码放进可以横向滚动的容器里。

## 5. 托管整页

原型、交互演示、Claude 生成的长文 HTML 可以整页托管，但要遵守这些约定（`npm run audit` 会检查前四条，`public/projects/` 下的每个 HTML 都查）：

- `<html lang="zh-CN">`，有 `<meta charset="utf-8">` 和 viewport。
- `<title>` 以「 · imToken Design」结尾，如「流程原型 · imToken Design」。
- `</body>` 前引用站点导航：`<script src="/projects/site-nav.js" defer></script>`（`npm run fix:hosted` 自动补），这样页面左上角有返回站点的入口。用 iframe 嵌进原型的子页面不会重复显示导航。
- 在 `content/projects/<slug>/project.ts` 的 `docs` 里登记，`kind: 'hosted'`。网址 `/projects/<slug>/<key>/` 自动指向这个文件，不用改 `next.config.mjs`。
- 颜色尽量沿用站点的值：主色 `#007fff`、深色 `#111d4a`、底色 `#f6f9fe`，字体 Noto Sans SC。
- 图片等资源用相对路径放在同一目录；不加载统计、广告等第三方脚本。

## 6. 写作

- **简体中文**，专业、直接。术语第一次出现时中英并列，如「流动性质押（Liquid Staking）」。
- **中英文、中文和数字之间留一个空格**：「Swap 改版」「5 家竞品」。全角标点：，。：；！？
- **引号用「」**，嵌套用『』。
- **日期写 YYYY-MM-DD**；时间线和表格里可以写 10/12。
- **标题和一句话结论写结论**，不写名词：「费用放在确认前一屏」，不写「费用展示调研」。
- **数字带来源和日期**：「12 位用户访谈（2026-10）」。
- 人员只写名字和职能，不写头衔、级别、汇报关系。

## 7. 图片和文件

- 图片用 WebP 或 PNG，单张尽量不超过 500 KB；截图先压缩。
- 单个文件不超过 10 MB（审核会拦）。视频、资料包、设计源文件放 Drive 或 Figma，页面里只放链接。
- 文件名用小写英文和连字符：`flow-v2-checkout.webp`。
