from pathlib import Path
import json,base64,mimetypes,shutil

root=Path(__file__).resolve().parent
# Source lives in sources/tool-atlas/; the published page goes to public/toolbox/atlas/ (URL /toolbox/atlas/)
out=root.parent.parent/'public'/'toolbox'/'atlas'
out.mkdir(parents=True,exist_ok=True)
tools=[]
for file in ['data-design.json','data-ai.json','data-resources.json']:
    tools+=json.loads((root/file).read_text())
logos={x['id']:x for x in json.loads((root/'logo-manifest.json').read_text())}
assert len({x['id'] for x in tools})==len(tools)
for t in tools:
    asset=logos.get(t['id'],{})
    file=asset.get('file')
    t['logoData']=''
    if file:
        p=root/file
        mime=mimetypes.guess_type(p)[0] or 'application/octet-stream'
        t['logoData']='data:'+mime+';base64,'+base64.b64encode(p.read_bytes()).decode()
    t['logoNote']=asset.get('note') or asset.get('identity','未提供独立标识')
    t['logoSource']=asset.get('sourceUrl','')
    # Links into the original course folder (../*.md, ../runs/…) do not exist on the site; keep official sources only
    t['sources']=[x for x in t.get('sources',[]) if not str(x.get('url','')).startswith('../')]

resources=root/'resources'
resources.mkdir(exist_ok=True)
skill_src=Path('/Users/wilson_macstudio/.codex/plugins/cache/personal/imtoken-html-slides/0.1.0/skills/imtoken-html-slides/SKILL.md')
if skill_src.exists():
    shutil.copyfile(skill_src,resources/'imtoken-html-slides-SKILL.md')
shutil.copytree(resources,out/'resources',dirs_exist_ok=True)
# Logo files are also published so the Toolbox entry card can show them
(out/'logos').mkdir(exist_ok=True)
for a in logos.values():
    if a.get('file'):
        shutil.copyfile(root/a['file'],out/a['file'])

SITE_NAV_HTML=(
 '<header class="site-nav"><div class="site-nav-in">'
 '<a class="site-brand" href="/" aria-label="imToken Design 首页"><img src="/brand/imtoken-logo.png" alt="imToken" height="22"><span class="site-sep" aria-hidden="true"></span><span class="site-word">Design</span></a>'
 '<nav class="site-links" aria-label="主导航">'
 '<span class="off" title="即将开放">团队</span><span class="off" title="即将开放">设计系统</span><span class="off" title="即将开放">设计素材库</span><span class="off" title="即将开放">项目追踪</span>'
 '<a class="on" href="/toolbox/">设计师工具箱</a>'
 '</nav></div></header>'
 '<div class="site-crumb"><a href="/">首页</a><span>/</span><a href="/toolbox/">设计师工具箱</a><span>/</span><b>设计工具图鉴</b></div>')
SITE_NAV_CSS=(
 '.site-nav{position:relative;z-index:20;background:rgba(246,249,254,.86);backdrop-filter:blur(20px) saturate(1.4);-webkit-backdrop-filter:blur(20px) saturate(1.4);border-bottom:1px solid rgba(17,29,74,.06)}'
 '.site-nav-in{max-width:1248px;margin:0 auto;padding:0 24px;height:68px;display:flex;align-items:center;justify-content:space-between;gap:24px;font-family:"Noto Sans SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei",system-ui,sans-serif}'
 '.site-brand{display:flex;align-items:center;gap:12px;flex-shrink:0;text-decoration:none}.site-brand:hover{text-decoration:none}.site-brand img{height:22px;width:auto;display:block}'
 '.site-sep{width:1px;height:18px;background:rgba(17,29,74,.18)}.site-word{font-weight:700;font-size:17px;color:#111D4A;letter-spacing:.01em}'
 '.site-links{display:flex;gap:4px;align-items:center}.site-links a,.site-links .off{font-size:14px;font-weight:500;padding:8px 12px;border-radius:8px;white-space:nowrap;text-decoration:none}'
 '.site-links a{color:#111D4A}.site-links a:hover{background:rgba(0,127,255,.08);text-decoration:none}.site-links a.on{color:#007FFF;box-shadow:inset 0 -2px 0 #007FFF;border-radius:8px 8px 0 0}.site-links .off{color:#A0A5B7;cursor:default}'
 '.site-crumb{max-width:1800px;margin:0 auto;padding:14px 36px 0;font-size:13px;color:#A0A5B7;display:flex;gap:8px;align-items:center}.site-crumb a{color:#A0A5B7}.site-crumb a:hover{color:#007FFF;text-decoration:none}.site-crumb b{font-weight:500;color:#526174}'
 '@media(max-width:1023px){.site-links .off{display:none}}'
 '@media(max-width:900px){.site-crumb{padding:12px 24px 0}}'
 '@media(max-width:640px){.site-nav-in{height:60px;padding:0 16px}.site-brand img{height:18px}.site-word{font-size:15px}.site-links a{padding:8px 10px}.site-crumb{padding:10px 16px 0}}'
 '@media print{.site-nav,.site-crumb{display:none}}')
data=json.dumps(tools,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
css=(root/'atlas.css').read_text();js=(root/'atlas.js').read_text()
html='''<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="description" content="imToken 设计团队推荐的 AI 设计工具图鉴：每个工具适合做什么、能产出什么，以及如何开始练习。"><title>设计工具图鉴 · imToken Design</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500;700&display=swap"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%23155dcc'/%3E%3Cpath d='M10 10h8v8h-8zm12 0h8v8h-8zM10 22h8v8h-8zm12 0h8v8h-8z' fill='white'/%3E%3C/svg%3E"><style>'''+css+SITE_NAV_CSS+'''</style></head>
<body><a class="skip" href="#main">跳到工具列表</a>'''+SITE_NAV_HTML+'''
<div class="shell"><aside class="rail"><h2>工具分类</h2><nav class="categories" id="categories" aria-label="按工具类别筛选"></nav><div class="rail-note"><p>从参考研究，到产品与演示。按任务选择你的工具组合。</p><a href="/toolbox/">← 返回设计师工具箱</a><a href="/confu/ep02/">EP02 · Design with AI 演示文稿 →</a><a href="/confu/ep02/EP02-design-kit.zip" download>下载 EP02 资料包 →</a></div></aside>
<main id="main"><div class="intro"><div><p class="eyebrow">THE CREATOR’S TOOL ATLAS</p><h1>设计工具图鉴</h1><p>找到适合这一步的工具，了解它能交付什么，再开始一次小练习。</p></div><div class="edition"><b id="tool-total">21 TOOLS</b>资料更新 · 2026.09.24</div></div>
<section class="toolbar" aria-label="搜索与任务筛选"><div class="searchrow"><label class="searchwrap"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span class="sr-only">搜索工具、用途或产物</span><input type="search" id="search" placeholder="搜索工具、用途或产物，如 Figma、视频、MCP" autocomplete="off"><kbd aria-hidden="true">/</kbd></label><button class="button ghost" data-reset>重置</button></div><div class="filters" id="stages" aria-label="按当前任务筛选"></div></section>
<section aria-labelledby="result-title"><div class="resultbar"><div><h2 id="result-title">全部工具</h2><p id="result-count" role="status" aria-live="polite"></p></div><div class="sort"><label for="sort">排序</label><select id="sort"><option value="curated">学习顺序</option><option value="az">名称 A–Z</option><option value="category">按类别</option></select></div></div><div class="grid" id="grid"></div></section>
<footer class="pagefoot"><p>点击卡片右上角的 +，可选择两到三项并排比较。使用指南中包含首练Prompt、工具搭配和资料来源。</p><p>18个工具与产品入口 · 3项Skills／审阅资源。平台、模型与插件分别标记；同一品牌的多个入口不代表完全独立的产品。品牌标识仅用于识别。</p><p>内容与标识已内嵌，打开官网和外部参考需要网络。</p></footer></main></div>
<div class="comparison-tray" id="compare-tray" hidden><div class="tray-left"><strong id="tray-count">已选 0 / 3</strong><div class="tray-items" id="tray-items"></div></div><div class="tray-controls"><button class="button ghost" id="compare-clear">清空</button><button class="button primary" id="compare-open" disabled>并排比较 →</button></div></div>
<dialog id="detail" aria-labelledby="detail-title"><div class="dialog-header"><h2 id="detail-title">使用指南</h2><button class="close" id="detail-close" aria-label="关闭使用指南">×</button></div><div class="dialog-body" id="detail-body"></div></dialog>
<dialog class="compare-dialog" id="compare-dialog" aria-labelledby="compare-title"><div class="dialog-header"><h2 id="compare-title">工具对照</h2><button class="close" id="compare-close" aria-label="关闭工具对照">×</button></div><div class="dialog-body" id="compare-body"></div></dialog>
<div id="toast" class="toast" role="status" aria-live="polite"></div><noscript><p class="noscript">此图鉴需要JavaScript才能筛选和查看卡片。也可以回到<a href="/toolbox/">设计师工具箱</a>。</p></noscript>
<script id="tool-data" type="application/json">'''+data+'''</script><script>'''+js+'''</script></body></html>'''
(out/'index.html').write_text(html)
print(json.dumps({'tools':len(tools),'logos':sum(bool(t['logoData']) for t in tools),'htmlBytes':len(html.encode())}))
