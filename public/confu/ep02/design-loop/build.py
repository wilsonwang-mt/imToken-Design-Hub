from pathlib import Path
import json,re,base64
root=Path(__file__).resolve().parent
skill=Path('/Users/wilson_macstudio/.codex/plugins/cache/personal/imtoken-html-slides/0.1.0/skills/imtoken-html-slides')
template=(skill/'assets/template-scroll.html').read_text()
base_css=re.search(r'<style>(.*?)</style>',template,re.S)[1]
data={k:json.loads((root/f).read_text()) for k,f in {'method':'content-method.json','quality':'content-quality.json','prompts':'content-prompts.json','skills':'content-skills.json','platforms':'sources-platform.json'}.items()}
logo=(skill/'assets/imtoken-logo.svg').read_text()
page=(root/'page.html').read_text()
page=page.replace('{{LOGO}}',logo,1)
footer_logo=re.sub(r'(clip0_2033_385|paint0_linear_2033_385)',r'\1_footer',logo)
page=page.replace('{{LOGO}}',footer_logo,1)
for placeholder,file in [('{{BEFORE}}','travel-editorial-conflict@2x.png'),('{{AFTER}}','travel-editorial-refined@2x.png')]:
    img=(root.parent/'assets'/file).read_bytes()
    page=page.replace(placeholder,'data:image/png;base64,'+base64.b64encode(img).decode())
payload=json.dumps(data,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c')
css=base_css+'\n'+(root/'loop.css').read_text();js=(root/'loop.js').read_text()
head='''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>设计质量Loop · 多Agent方法工作台</title><meta name="description" content="学习如何用多Agent把信息架构、探索、审查、修订与上线前检查连成设计质量循环。包含可复制Prompt、GitHub Skills与教学案例。"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' rx='10' fill='%23155dcc'/%3E%3Cpath d='M28 15a10 10 0 1 0 1 9M28 9v8h-8' fill='none' stroke='white' stroke-width='3'/%3E%3C/svg%3E">'''
html=head+'<style>'+css+'</style></head><body>'+page+'<script id="loop-data" type="application/json">'+payload+'</script><script>'+js+'</script></body></html>'
(root/'index.html').write_text(html)

lines=['# 多Agent设计质量Loop：方法与模板','', '2026-09-24。配套交互教材：[index.html](index.html)。本方法以可验证的用户任务与质量门槛为目标，不承诺自动达到某个审美等级。','', '## 一、怎样组织一轮','']
for s in data['method']['stages']:
    lines+=['### '+s['title'],'',s['question'],'','输入：'+'；'.join(s['inputs']),'']+[str(i+1)+'. '+x for i,x in enumerate(s['actions'])]+['','产物：'+s['deliverable'],'','通过条件：'+s['gate'],'','常见坑：'+s['pitfall'],'']
lines+=['## 二、共享任务包与交接','']
for f in data['prompts']['package']:lines+=['- `'+f['file']+'`：'+f['purpose']]
lines+=['',data['prompts']['handoff'],'','## 三、Prompt的最低结构','']
for x in data['prompts']['structure']:lines+=['- '+x['name']+'：'+x['detail']]
lines+=['','## 四、角色Prompt模板','', '每份模板前补齐产品、用户任务、项目阶段、当前版本、输入路径、保留项、实际工具与权限、可写路径和轮数／预算。纯聊天入口由人传递材料与执行结果，不能把文字计划当实际操作。','']
for p in data['prompts']['templates']:lines+=['### '+p['name'],'',p['purpose'],'','```text',p['body'],'','统一交接：'+data['prompts']['handoff'],'```','']
lines+=['## 五、Skills与工具原文','']
for s in data['skills']:
    lines+=['### '+s['name']+'（'+s['kind']+'）','',s['does'],'','Git：'+s['repo'],'','具体说明：'+s['skillUrl'],'','适用时机：'+s['useWhen'],'','输入：'+s['input'],'','产物：'+s['output'],'','边界：'+s['caveat'],'','平台：'+s['platform'],'']
lines+=['## 六、上线前检查','']
for c in data['quality']['releaseChecks']:lines+=['### '+c['label'],'','方法：'+c['method'],'','证据：'+c['proof'],'','阻断条件：'+c['blocker'],'','范围：'+c['scope'],'']
lines+=['## 七、停止与交付','',data['quality']['stopRules']['meaning'],'',data['quality']['stopRules']['success'],'',data['quality']['stopRules']['atRoundLimit'],'','## 八、常见坑','']
for p in data['method']['commonPitfalls']:lines+=['### '+p['symptom'],'',p['consequence'],'',p['practice'],'']
lines+=['## 九、多Agent新增风险','']
for p in data['quality']['multiAgentRisks']:lines+=['### '+p['label'],'',p['risk'],'','策略：'+p['strategy'],'','证据：'+p['proof'],'']
(root/'LOOP-PLAYBOOK.md').write_text('\n'.join(lines))
print(json.dumps({'bytes':len(html.encode()),'stages':len(data['method']['stages']),'templates':len(data['prompts']['templates']),'skillsAndTools':len(data['skills']),'releaseChecks':len(data['quality']['releaseChecks'])}))
