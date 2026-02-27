# imToken Design Hub

imToken 设计团队的中心化资源库 — 汇集设计系统、规范指南、设计令牌、工作流、工具箱及当前项目资料。

## 目录结构

```
imToken-Design-Hub/
├── design-system/        # 设计系统 — 组件规范、样式定义
├── guidelines/           # 设计规范 — 品牌、无障碍、多语言等
├── design-tokens/        # 设计令牌 — 颜色、字体、间距的标准化定义
├── workflow/             # 工作流 — 设计到开发的协作流程文档
├── toolbox/              # 工具箱 — 脚本、插件配置、实用工具
└── projects/             # 当前项目 — 进行中的设计项目资料
```

## 各模块说明

### Design System

组件库规范与 UI 模式文档，确保产品视觉与交互的一致性。

- 基础组件（Button、Input、Modal 等）
- 复合组件与页面模式
- 组件状态与交互行为定义
- Figma 组件库同步说明

### Guidelines

团队遵循的设计规范与最佳实践。

- 品牌视觉规范（Logo、配色、字体使用）
- 多语言设计规范（中英文排版、文案长度适配）
- 无障碍设计指南（WCAG 合规）
- 图标与插画使用规范

### Design Tokens

跨平台的设计变量标准化定义，连接设计工具与代码实现。

- 颜色系统（语义色、品牌色、状态色）
- 字体系统（字号、字重、行高）
- 间距与圆角
- Token 导出与同步流程

### Workflow

设计与开发协作的标准化流程，减少沟通摩擦。

- [Copy Workflow](workflow/copy-workflow-final.html) — Figma Variables → GitHub i18n 文案协作流程
- Design Handoff 流程
- 设计评审与反馈流程
- 版本管理与文件命名规范

### Toolbox

提升效率的脚本、插件配置与实用工具。

- figma2i18n 转换脚本 — Figma DTCG 导出 → dev-ready i18n JSON
- Figma 插件推荐配置（Variable Importer/Exporter、Auto-Replace 等）
- 常用命令与快捷操作速查

### Projects

当前进行中的设计项目资料与文档。

- XAUt Campaign — imToken × Tether 联合活动
- *(更多项目持续更新)*

## 快速开始

1. 浏览对应模块文件夹，找到你需要的资源
2. HTML 文档可直接在浏览器中打开查看
3. 如需修改文档，请通过 Pull Request 提交，经 Review 后合并

## 适用对象

| 角色 | 常用模块 |
|------|----------|
| Designer | Design System, Guidelines, Workflow, Projects |
| Developer | Design Tokens, Workflow, Toolbox |
| PM / Marketing | Guidelines, Workflow, Projects |

## 贡献指南

- 新增或修改内容请创建分支并提交 PR
- HTML 页面请保持自包含（CSS 内联），方便 GitHub Pages 直接预览
- 文件命名使用小写英文 + 连字符（如 `copy-workflow-final.html`）
- 图片资源放在对应模块的 `assets/` 子目录下

## 站点访问

本仓库已开启 GitHub Pages，在线访问地址：

```
https://[your-org].github.io/imToken-Design-Hub/
```

---

**imToken Design Team** · 持续更新中
