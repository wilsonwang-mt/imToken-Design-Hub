# imToken Design

imToken 设计团队的主页：团队、设计系统、素材库、项目追踪和设计师工具箱。

目前开放的是 **设计师工具箱**（Confu 分享 EP01、EP02，以及文案管理工作流），其余板块会陆续上线。

## 本地运行

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 生产构建（Vercel 同样执行这一步）
```

需要 Node 20 以上。

## 目录

```
app/                  页面（Next.js App Router）
  page.tsx            首页
  toolbox/page.tsx    设计师工具箱
  globals.css         视觉体系（沿用「我是主理人」DESIGN.md 的浅色玻璃风格，做了简化）
components/           导航、页脚、图标
content/              所有文字内容，改内容只改这里
  site.ts             网站信息与五个板块
  toolbox.ts          Confu 各期与工作流
public/
  confu/ep01/         EP01 演示文稿（index.html）与资料包
  confu/ep02/         EP02 演示文稿、Claude Design 专题页、资料包
  toolbox/copy-workflow/  文案管理工作流（原仓库内容，已迁移到这里）
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

**开放一个新板块**

在 `content/site.ts` 里把对应板块的 `status` 改成 `'open'`，填上 `href`，再在 `app/` 下新建对应页面。

## 部署

GitHub 推送到 `main` 后由 Vercel 自动构建部署，每个 PR 会生成预览地址。

## 规划

- 五个板块：团队 / 设计系统 / 设计素材库 / 项目追踪 / 设计师工具箱
- 之后接入 Supabase（数据与登录），届时再加访问控制
