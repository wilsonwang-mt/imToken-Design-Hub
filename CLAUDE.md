# imToken Design Hub · Claude Code 说明

这是 imToken 设计团队共用的站点（Next.js App Router，Vercel 从 `main` 自动部署）。多位设计师会用 Claude Code 在这里新建和更新项目，请按下面的约定工作，保证每个 PR 的结构和视觉一致。

开始前先读：
- `CONTRIBUTING.md`：流程、文件归属、自动审核规则（规则 ID 如 CARD-01、CSS-01）
- `docs/project-template.md`：一个项目和每类材料至少包含什么
- `docs/style-guide.md`：页面骨架、设计 token、共享样式、托管整页约定、写作规范

## 常用命令

```bash
npm run dev                                   # 本地预览 http://localhost:3000
npm run new:project -- <slug> --title "中文名"   # 新建项目（生成数据、概览页、样式文件并登记）
npm run new:doc -- <slug> <key> --title "标题" --type research   # 新建材料页；托管整页加 --hosted
npm run fix:hosted                            # 给托管 HTML 补站点导航
npm run audit                                 # 自动审核
npm run check                                 # 审核 + 生产构建，提 PR 前必须通过
```

## 硬性约定

1. **用脚本生成，不手写骨架**。新项目、新材料一律用 `new:project` / `new:doc`；概览页用 `<ProjectOverview>`，材料页用 `<ProjectDoc>`。
2. **只改当前项目的三个目录**：`content/projects/<slug>/`、`app/projects/<slug>/`、`public/projects/<slug>/`。`CONTRIBUTING.md`「文件放在哪」列出的共享文件，除非用户明确要求，不要改；要改时单独开 PR。例外：`new:project` 在 `content/projects.ts` 里插入的两行随项目 PR 一起提交，不要撤销、不要拆开。
3. **数据和页面分开**：卡片、概览、材料清单、链接、更新记录都写在 `project.ts`，页面只负责渲染。`project.ts` 只 `import type`。
4. **样式**：只写在 `app/projects/<slug>/<slug>.css`，每个选择器以项目的 `cssPrefix` 开头；颜色只用 `var(--…)`。先用 `docs/style-guide.md` 第 3 节的共享样式。
5. **托管整页**：放在 `public/projects/<slug>/<key>/index.html`（多页原型可以有子目录），`<title>` 以「 · imToken Design」结尾，保留 site-nav 脚本，并在 `docs` 里登记。不需要改 `next.config.mjs`。
6. **每次更新项目**：改 `updated`，在 `changelog` 最前面加一条同一天的记录。
7. **不留占位**：所有【待填写】必须换成真实内容。不知道的信息问用户，不要编造（日期、数据、人名、结论都不能编）。
8. **仓库是公开的**：不写未发布的产品细节、合作方信息、用户数据、token 或密钥、职级薪酬等人事信息。<!-- audit-ok SEC-01 --> 拿不准时先问用户。
9. **写作**：简体中文，中英文之间留空格，引号用「」，日期 YYYY-MM-DD，一句话结论写结论而不是介绍。

## 提交流程

- 不直接推 `main`。从最新的 `main` 开分支：`<名字>/<slug>-<主题>`。
- 提交前跑 `npm run check`，有 block 级问题按输出里的规则 ID 修，不要用 `audit-ok` 绕过（除非确实是误判，并在注释里写原因）。
- 用 `npm run dev` 在桌面和手机宽度（375px）各看一遍。
- 用户同意后再提交和推送；PR 按 `.github/pull_request_template.md` 填写，标题 `<slug>: 摘要`。合并由审稿人决定。

## 旧项目

`agentic-wallet`、`stake-video`、`ens-address-resolution` 是规范建立前的项目（`legacy: true`，名单在 `scripts/audit.config.json`，新项目不能用），样式还在 `globals.css` 里（`aw-`、`sv-`）。改它们时保持原有写法，迁移计划见 `CONTRIBUTING.md`「下一步」。
