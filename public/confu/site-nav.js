/* imToken Design · hover navigation for hosted Confu decks.
   Loaded only by the copies under /public/confu/ (the original deck files stay untouched).
   Move the pointer to the top edge of any slide and a glass bar slides down with links back to the site.
   Touch devices: a small "back" tab stays in the top-left corner.
   Rendered in a Shadow DOM so deck styles and site styles never touch each other. */
(function () {
  if (window.__imtDesignNav) return
  window.__imtDesignNav = true

  var ep = (location.pathname.match(/\/confu\/(ep\d+)\//) || [])[1] || ''
  var titles = { ep01: 'EP01 · 会前十分钟，用 Skill 准备一次亮眼的演讲', ep02: 'EP02 · Design with AI' }
  var title = titles[ep] || document.title
  if (/claude-design\.html$/.test(location.pathname)) title = 'EP02 · Claude Design 专题'

  var host = document.createElement('div')
  host.id = 'imt-design-nav'
  host.style.cssText = 'position:fixed;inset:0 0 auto 0;z-index:2147483000;pointer-events:none;'
  var root = host.attachShadow({ mode: 'open' })
  root.innerHTML =
    '<style>' +
    ':host{all:initial}' +
    '*{box-sizing:border-box;font-family:"Noto Sans SC","PingFang SC","Hiragino Sans GB","Microsoft YaHei",system-ui,sans-serif}' +
    '.bar{position:fixed;top:12px;left:50%;transform:translate(-50%,-140%);opacity:0;pointer-events:auto;' +
    'display:flex;align-items:center;gap:6px;padding:6px;border-radius:999px;max-width:calc(100vw - 24px);' +
    'background:rgba(255,255,255,.72);backdrop-filter:blur(20px) saturate(1.4);-webkit-backdrop-filter:blur(20px) saturate(1.4);' +
    'border:1px solid rgba(255,255,255,.9);box-shadow:0 0 0 1px rgba(17,29,74,.06),0 16px 40px -16px rgba(17,29,74,.28);' +
    'transition:transform .35s cubic-bezier(.2,.7,.2,1),opacity .25s ease}' +
    '.bar.show{transform:translate(-50%,0);opacity:1}' +
    'a{display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 14px;border-radius:999px;' +
    'font-size:14px;font-weight:500;line-height:1;color:#111D4A;text-decoration:none;white-space:nowrap;transition:background .2s,color .2s}' +
    'a:hover{background:rgba(0,127,255,.08);color:#007FFF}' +
    'a.brand{font-weight:700;background:#007FFF;color:#fff}' +
    'a.brand:hover{background:#066BD2;color:#fff}' +
    '.sep{width:1px;height:18px;background:rgba(17,29,74,.12);flex-shrink:0}' +
    '.title{font-size:13px;color:rgba(17,29,74,.55);padding:0 10px 0 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:360px}' +
    'svg{width:16px;height:16px;flex-shrink:0}' +
    '.tab{position:fixed;top:10px;left:10px;display:none;pointer-events:auto;height:36px;padding:0 12px 0 10px;' +
    'background:rgba(255,255,255,.78);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);' +
    'box-shadow:0 0 0 1px rgba(17,29,74,.08),0 8px 20px -10px rgba(17,29,74,.3)}' +
    '@media (hover:none){.tab{display:inline-flex}}' +
    '@media (max-width:640px){.title{display:none}}' +
    '@media (prefers-reduced-motion:reduce){.bar{transition:opacity .01ms}}' +
    '</style>' +
    '<nav class="bar" aria-label="返回 imToken Design">' +
    '<a class="brand" href="/toolbox/"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></svg>设计师工具箱</a>' +
    '<a href="/">imToken Design 首页</a>' +
    '<span class="sep"></span><span class="title"></span>' +
    '</nav>' +
    '<a class="tab" href="/toolbox/"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></svg>工具箱</a>'
  root.querySelector('.title').textContent = title

  var bar = root.querySelector('.bar')
  var hideTimer = null
  function show() { clearTimeout(hideTimer); bar.classList.add('show') }
  function hideSoon(ms) { clearTimeout(hideTimer); hideTimer = setTimeout(function () { bar.classList.remove('show') }, ms || 600) }

  bar.addEventListener('mouseenter', show)
  bar.addEventListener('mouseleave', function () { hideSoon(500) })
  bar.addEventListener('focusin', show)
  bar.addEventListener('focusout', function () { hideSoon(300) })
  // Reveal when the pointer reaches the top edge of the window, on any slide
  var HOT = 16
  document.addEventListener('mousemove', function (e) {
    if (e.clientY <= HOT) show()
    else if (bar.classList.contains('show') && e.clientY > 90 && !bar.matches(':hover')) hideSoon(600)
  }, { passive: true })
  document.documentElement.addEventListener('mouseleave', function (e) { if (e.clientY <= 0) show() })

  // Keep clicks/keys on the bar from reaching the deck (decks page on click and on keys)
  ;['click', 'mousedown', 'mouseup', 'pointerdown', 'pointerup', 'touchstart', 'touchend', 'wheel', 'keydown'].forEach(function (t) {
    host.addEventListener(t, function (e) { e.stopPropagation() }, false)
  })

  function mount() {
    document.body.appendChild(host)
    // Show once on load so people know it is there, then tuck it away
    setTimeout(function () { show(); hideSoon(2200) }, 400)
  }
  if (document.body) mount()
  else document.addEventListener('DOMContentLoaded', mount)
})()
