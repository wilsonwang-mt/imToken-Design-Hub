---
name: imtoken-html-slides
description: Build imToken-branded HTML presentation decks and one-pagers (slides / walkthrough / kickoff / proposal / summary presentations). Use this skill whenever Wilson asks for slides, a deck, a presentation, a walkthrough, a kickoff, an all-hands, a proposal presentation, a workshop presentation, a one-pager, or any "汇报/演示/幻灯片/讲稿/单页报告" output — even if he doesn't say "slides" explicitly but the deliverable will be presented on a screen to an audience. Produces a single self-contained HTML file with an outline sidebar (auto-numbered thumbnails), speaker-notes panel, keyboard paging, stepped reveals, image lightbox, prototype overlays, imToken logo bottom-center, light AND dark brand themes, and rem-based scaling that stays sharp from a 1366 laptop to a 4K stage screen.
---


## Packaged integration notes (2026-09-23)

Explicit user instructions take precedence over this skill's guidelines. Resolve
all `assets/` and `references/` paths relative to this SKILL.md, not the task's
working directory. Copy templates into the user's output directory; never edit
installed template resources as the presentation output.

The bundled HTML is authoritative where older documentation disagrees:
- Paged templates have speaker notes, stepped reveals, selection-safe click
  paging and generated footers. Preserve their existing shell.
- Scroll already includes extended component CSS, image lightbox and copy
  handling. Check actual selectors before adding CSS. It does not include
  the paged notes panel, playSteps, or desktop iframe three-state probe.
- Scroll uses explicit footer markup and page numbers; update these when
  rearranging sections. Do not apply the paged no-inline-footer rule to scroll.
- Preserve the templates' inline SVG logo, including on the dark template.
- Single-file output allows network fonts; images and prototypes require their
  sibling files unless explicitly embedded. Do not claim fully offline,
  single-file delivery when such dependencies remain.
- Historical UI 3.0/Sigil decks and password-gate scripts mentioned below are
  not included. Request those sources only when the user's task needs them.
- Browser checks and screenshots require host tools. Report unperformed checks
  explicitly; do not equate static inspection with visual or pointer testing.


# imToken Slides — standardized HTML presentation decks

This skill encodes the presentation pattern developed across the UI 3.0 project
(design-proposal-walkthrough, kickoff-slides, priority-workshop-slides,
HumanXAI-AllHands-Deck, Sigil all-hands deck). Every deck produced with it
should feel like a sibling of those files: 精美、可读性强、克制而精致的动效、大屏友好.

**What changed in v2.3 (vs v2.2):**

- **Click paging no longer eats text selections.** Half-stage click-to-page and
  "select the text to copy it" used to be in direct conflict — dragging across a
  paragraph turned the page instead of selecting. Fixed with three guards in the
  paged templates (drag tolerance, existing-selection check, double-click grace);
  see §8. Paired with `user-select` rules on the shell vs the stage.

**What changed in v2.2 (vs v2.1):**

- The sidebar became a real **outline**: thumbnail + auto-derived number + title.
  The hand-maintained `thumbLayouts` map is **gone** — numbering now falls out of
  each slide's `data-thumb` / `data-group`.
- **Speaker notes** (`data-speaker-notes`, toggled with `N`) and an **image
  lightbox** (`openLightbox()`) are built into the paged templates.
- **Large-screen scaling**: one `html { font-size: clamp(...) }` line scales the
  whole composition; 1920×1080 still renders exactly as before.
- Robustness: prototype embeds resolve to **three** states instead of two, and
  every `history` / `location.hash` call is wrapped in `try/catch` so the deck
  survives being previewed inside a sandboxed iframe.

## Step 0 — context inventory, THEN questions (mandatory)

Never start building immediately, and never interrogate the user with a long
form. Follow this protocol:

**0a. Silent inventory.** Collect what is already known from: the conversation
so far (content may have been discussed at length before the skill was
invoked), files/links attached alongside the invocation, project memory, and
any repo/folder the user pointed at. For each item below, mark it
KNOWN / INFERABLE / MISSING:

- Occasion & audience (all-hands? exec review? workshop? external?)
- Output form (paged slides / scroll deck / one-pager)
- Theme (light / dark)
- The actual content: does every intended section have real substance, or
  only a title?
- Whether live prototypes / demos need embedding
- Whether real photos/screenshots will be embedded (→ asset folder workflow)
- Expected length / presentation duration
- Language (follow the user's content language; bilingual mixing is normal)

**0b. One round of questions.** Ask about the genuine gaps only — batch them
into a single round (use AskUserQuestion when available), maximum 3–4
questions. Never ask what is already KNOWN or safely INFERABLE. Priority
order when you must choose:

1. Output form: **Paged slides** (live projection, presenter-driven) /
   **Scroll deck** (self-read walkthrough, scrollable) / **One Pager**
   (single continuous page, no paging chrome).
2. Language: **中文版** (Chinese body copy — professional/technical terms
   stay in English: Passkey, Cross-chain, Design Token…) / **English
   version** (fully English). Always ask unless the user already stated it;
   the language of the source content alone is NOT proof of the intended
   output language.
3. Theme: **Light** (default for docs/reviews) / **Dark** (default offer for
   big-stage all-hands & product-launch vibes; see dark theme below).
4. If One Pager → lean **text-heavy** (dense reference doc) or
   **visual-heavy** (illustrated summary, poster-like)? If slides → expected
   duration/slide count, and does it need embedded live demos?

**0c. Content sufficiency report.** If any planned section has a title but no
substance, say so explicitly before building: list the gaps and ask whether
the user will supply material, or whether you are authorized to extract it
from a named source (repo, file, link). **Never silently invent filler
content for a gap** — a deck that looks complete but contains fabricated
facts is a failed deck.

Only proceed to Step 1 when the inventory has no blocking MISSING items.

## Output contract

One **self-contained HTML file** (all CSS/JS inline, no build step, no
external assets except Google Fonts). It must work by double-clicking the
file locally and when hosted on Vercel/GitHub Pages. Name it in kebab-case
after the occasion, e.g. `sprint2-kickoff-slides.html`. Always edit an
existing deck **in-place** — never create a copy with a version suffix.
(Exception: an `assets/` folder next to the deck is allowed when the user
opts into embedded images — see "Embedded images & the assets/ folder".)

## Step 1 — pick the deck mode

Three templates live in `assets/`. Copy the right one as the starting skeleton,
then replace the sample slides with real content. All three carry
the machinery described in the next section.

| Mode | Template | When to use |
|------|----------|-------------|
| **Paged deck — light** (fixed slides, horizontal feel) | `assets/template-paged.html` | **The default.** Live stage presentations: kickoffs, all-hands, workshop openings, exec updates, 汇报 (≤ 20–25 slides, one idea per slide, presenter drives pacing). |
| **Paged deck — dark** | `assets/template-paged-dark.html` | Same occasions as paged-light but big-stage / launch energy (all-hands, product reveals, 发布会气质). Sigil-style dark theme, identical machinery. |
| **Scroll deck** (vertical, 100vh sections) | `assets/template-scroll.html` | Long-form walkthroughs, design proposals, documents-that-present (15+ slides, slides whose content may exceed one screen, reading afterwards matters). Same outline sidebar, but permanently visible as a reading-progress map. |
| **One Pager** | start from `template-scroll.html`, strip paging/progress chrome | Single-page summaries, progress reports meant to be read not presented. Honor the text-heavy vs visual-heavy answer from Step 0. |

Default for "汇报/kickoff/all-hands" is paged-light; default for
"walkthrough/proposal/总结文档" is scroll — but Step 0 already settled this.

Component coverage differs per template. `references/components.md` has the
authoritative coverage table — **check it before writing a class name**, and
paste the missing CSS in rather than assuming a class exists.

## Built-in machinery (v2.3) — do not re-invent, do not remove

Everything below already runs in the templates. Your job when authoring a deck
is to feed it the right attributes, not to rebuild it.

### 1. Outline sidebar (auto-numbered)

Width `18rem`. Each row is **thumbnail + number + title**. The number is
**derived from `data-group` / `data-thumb`** at load time — there is no
registration map any more (v2.1's `thumbLayouts` is deleted; do not resurrect it).

Derivation rules, exactly as implemented in `buildOutline()`:

| Slide | Produces |
|---|---|
| `data-thumb="divider"` | `PART N` (N parsed from `data-label`, e.g. `Part 2 · 方法`), and **resets the sub-counter** |
| `data-group="Part N · …"` | `N.M` — M counts up within that part |
| no `data-group` (Opening / 过场) | `0.M` |
| `data-group="Closing · …"` (or 结尾 / 收尾) | `END.M` |
| `data-thumb="cover"` | `—` (cover and back-cover carry no number) |

How to use it: give **every** slide `data-section` (unique kebab id),
`data-label` (the title shown in the outline), `data-thumb` (wireframe type),
and `data-group` on every content slide — cover, dividers and closing covers
are the only slides that omit `data-group`. Optional `data-thumb-color` tints
the thumbnail: `blue | purple | green | amber | red | gray`.

```html
<section class="slide" data-section="context-cost" data-label="上下文的真实成本"
         data-group="Part 1 · 现状" data-thumb="grid3" data-thumb-color="purple"
         data-speaker-notes="…">
```

Allowed `data-thumb` values (anything else silently falls back to `grid2`):
`cover | statement | divider | grid2 | grid3 | grid4 | split | stack | table |
timeline | steps | term | stat | placeholder`. Pick the one that roughly mirrors
the slide's real layout — the outline is a map, not decoration.

The first row of each Part gets a hairline separator (`.part-start`)
automatically. On **paged** decks the rail is off-canvas and slides out when
the pointer enters the 24px left-edge hotzone (`.rail-hotzone`), so the deck
runs full-bleed; on **scroll** decks it stays docked. Below 1100px it hides
entirely.

### 2. Speaker-notes panel

Every slide carries `data-speaker-notes="…"`; `N` toggles the bottom panel,
`Esc` closes it. **Write notes on every slide** — the panel is the presenter's
script, and a slide with no notes prints「（这一页没有讲者备注）」in the room.

Notes are **pacing cues, not a re-reading of the slide**: who speaks, the beat
to land, where to pause, how long to stay, what to skip if running late.

```html
data-speaker-notes="40 秒。先问一句「你上次重复解释同一件事是什么时候？」，等两秒再翻。不要念卡片。"
```

Escape any `"` inside the attribute value as `&quot;` — an unescaped quote
terminates the attribute and silently swallows the rest of the tag.

### 3. Stepped reveal

`[data-step="1|2|3"]` on the elements, plus one
`<button class="replay">↻ replay</button>` placed as a **sibling of `.stage`**
(inside `<section>`, after `</div>` of the stage). First beat lands at 420ms,
subsequent beats every 950ms. The sequence auto-plays on every slide entry,
`R` replays by hand, and the replay button only appears after the last beat.
`prefers-reduced-motion` collapses both delays to 0 — instant, never absent.

**Hard rule: `data-step` must NOT sit on a direct child of `.stage`.** Those
children already run the entrance stagger and the two animations fight. Wrap
them in a plain `<div>` under `.stage` and hang `data-step` on elements inside.
3–5 steps per slide; details in `references/motion-interactions.md`.

### 4. Image lightbox

```html
<img class="zoomable" src="assets/foo.png" alt="…" title="点击放大"
     onclick="openLightbox(this.src, this.alt)" onerror="this.remove()">
```

Put `.has-zoom` on the wrapper to reveal the `.zoom-hint` capsule on hover.
Clicking anywhere or pressing `Esc` closes it, and **closing keeps the current
slide** — no page change, no replayed reveal, no lost state. The lightbox image
is `width/height:100% + object-fit:contain` so it also *upscales* on a 4K
screen. Markup and the portrait-screenshot caveat: `references/prototype-embeds.md`.

### 5. Prototype overlays — three-state fallback

`toggleDemoPanel(url)` (mobile, right slide-in) and
`toggleDesktopModal(url, title)` (desktop, center modal). The frame verdict is
three-state, because "did this frame paint?" is not always knowable:

- **relative path** → assumed embeddable, no fallback UI (this is also why
  local prototypes are the recommended path);
- **cross-origin, unverifiable** → a non-blocking bottom escape strip with an
  "open in new tab" button, never a full cover;
- **same-origin but empty body** → full-cover card (that one really is the
  deck's own broken path).

Full rationale and copy in `references/prototype-embeds.md`.

### 6. Large-screen scaling

```css
html { font-size: clamp(16px, min(0.834vw, 1.482vh), 30px); }
```

The whole composition is expressed in `rem`, so moving the root size scales
everything proportionally. **1920×1080 lands exactly on 16px**, which is why
existing compositions are pixel-identical; 2560×1440 → 21px; 3840×2160 → 30px
(capped). The `min(vw, vh)` is the load-bearing part — scaling on width alone
pushes content off the bottom of an ultrawide (3440×1440). Keep this line.

There is also a `@media (max-height: 900px)` breakpoint: short viewports (a
laptop mirroring to a projector) switch from centred to top-aligned and tighten
padding/gaps so dense slides fit without scrolling.

### 7. Sandbox safety

Every `history.replaceState` / `history.pushState` / `location.hash` read or
write is wrapped in `try/catch`. When the deck is opened inside a preview
panel's `about:srcdoc` iframe these throw `SecurityError` — **once per page
turn** — filling the console and aborting the rest of `go()`. Failing silently
is correct: the deck works fine without URL sync.

```js
try { if (history.replaceState) history.replaceState(null, '', '#/' + (cur + 1)); } catch (_) {}
```

### 8. Keyboard & pointer

| Key | Action |
|---|---|
| `→ ↓ Space PageDown` | next slide |
| `← ↑ PageUp` | previous slide |
| `Home` / `End` | first / last |
| `1`–`9` | jump to that slide |
| `R` | replay this slide's stepped reveal |
| `N` | toggle speaker notes |
| `Esc` | close lightbox / prototype overlay / notes |

No on-screen prev/next buttons. Clicking the left half of the stage goes back,
the right half forward — but clicks on interactive elements (links, buttons,
`.demo-btn`, `.replay`, `.copy-btn`, iframes, inputs, the rail, any open
overlay) never page. `Space` is `preventDefault`ed so it can't also scroll, and
all keys are ignored while typing in an input. A quiet keyboard-hint pill shows
on load and fades after ~4s.

**Click paging must never eat a text selection.** Half-stage click zones and
"select the text to copy it" are in direct conflict, and the naive
`addEventListener('click', …)` loses that conflict every time: a drag-select
ends in a `click`, and the first click of a double-click fires before the word
is selected. The template resolves it with three guards, all of them required —
**do not simplify this down to a bare click handler:**

1. **Drag guard** — record the `pointerdown` point; if the pointer moved more
   than `DRAG_TOLERANCE` (8px) before the `click`, it was a selection, not a tap.
2. **Existing-selection guard** — if `window.getSelection()` is non-collapsed at
   click time, don't page. This is what catches the *second* click of a
   double-click and the third of a triple-click, because the browser applies the
   word/paragraph selection on the preceding `pointerdown`.
3. **Double-click grace** — a click landing on a text-bearing element
   (`TEXTISH_SEL`) schedules the page turn `DBLCLICK_GRACE` (180ms) later
   instead of running it immediately; `pointerdown` and `dblclick` both cancel
   the pending turn. This is what catches the *first* click of a double-click.
   Clicks on empty stage area still page instantly, so presenting feels
   unchanged.

Paired CSS: `user-select: none` on the shell (`.sidebar-nav`, `.kbd-hint`,
`.progress`, `.rail-hotzone`, `.slide-footer`, `.replay`, `.copy-btn`,
`.demo-btn`) and explicit `user-select: text` on `.slide .stage`, plus a
brand-tinted `::selection`. Without this, dragging across the content also drags
selection through the sidebar and footer chrome and produces a ragged selection.

Verify with a real pointer, not a synthetic `click()` — synthetic events skip
`pointerdown` and will make a broken implementation look correct. The checks
that matter: drag across a paragraph → text is selected AND `cur` is unchanged;
double-click a word → word is selected AND `cur` is unchanged; single click on
blank area → pages within one frame; single click on a paragraph → pages after
~180ms.

### 9. Also already there

Top progress bar (`--brand → --purple`); fixed footer on every slide (left =
`data-group`, **center = imToken logo**, right = two-digit counter, all rendered
by the shell — never write a footer inside a slide); entrance stagger on
`.slide.active .stage > *`; `postMessage({type:'deck-play'})` into any
`iframe[data-autoplay]` on slide entry; delegated copy handler for `.prompt`
blocks; responsive collapse at 1100px / 768px.

## Step 2 — typography (Inter, with an honest fallback plan)

Primary typeface is **Inter** (display + body) with **JetBrains Mono** for
labels/numbers/addresses/kickers. Two facts drive the implementation:

1. **Do not depend on Inter being installed locally** — most laptops don't
   have it. Load it via the Google Fonts `<link>` that is already in all
   templates. When the network is unavailable the stack must degrade
   gracefully, so always use the full fallback stacks (already set as CSS
   variables in the templates — keep them intact):

```css
--font-display: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont,
                'PingFang SC', 'Microsoft YaHei', sans-serif;
--font-body:    /* same stack */;
--font-mono:    'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
```

2. **Inter contains no CJK glyphs.** Chinese text always renders from the
   CJK members of the stack (PingFang SC on macOS, Microsoft YaHei on
   Windows, Noto Sans SC when the webfont loads). This pairing is
   intentional and looks right — never try to force Inter onto Chinese text,
   and never remove the CJK fonts from the stack.

Coverage notes: Inter handles every deck scenario for Latin content —
weights 300–900 for hero-to-caption hierarchy, tabular figures for
KPI/data slides (`font-variant-numeric: tabular-nums` on number-heavy
tables). Code snippets always go to the mono stack.

If a deck **must** be airgap-proof (presented with no network and pixel-
identical type), subset-embed Inter as base64 woff2 `@font-face` (Latin
subset, weights 400/600/800 ≈ 150 KB total) instead of the Google Fonts
link. Do this only when the user asks for offline-critical delivery.

## Step 3 — design tokens (brand, light + dark)

### Light theme (default)

```css
--brand: #007FFF;  --brand-rgb: 0,127,255;     /* imToken Azure Blue */
--brand-dark: #0066D6;  --brand-light: #E5F2FF;
--purple: #7C3AED; --purple-rgb: 124,58,237;  --purple-light: #EDE9FE;
--ai: #A78BFA;                                 /* AI/Agent content ONLY */
--green: #059669;  --green-rgb: 5,150,105;    --green-light: #D1FAE5;
--amber: #D97706;  --amber-rgb: 217,119,6;    --amber-light: #FEF3C7;
--red:   #DC2626;  --red-rgb: 220,38,38;      --red-light:   #FEE2E2;
--teal:  #0D9488;  --cyan: #0891B2;           --cyan-light: #CFFAFE;
--bg: #FAFCFF;  --bg-alt: #F0F6FF;  --surface: #FFFFFF;
--text: #0F172A; --text-secondary: #475569; --text-muted: #94A3B8;
--border: #E2E8F0; --border-light: #F1F5F9;
```

The `--*-rgb` companions exist so tints are written
`rgba(var(--brand-rgb),0.06)` instead of inventing a new pale hex. Keep them.

### Dark theme (big-stage / launch decks)

Derived from the Sigil all-hands deck (the house dark style). Full token
sheet, gradient recipes, card/pill/glow components and worked examples live
in `references/dark-mode.md` — **read it before building any dark deck**.
Core palette:

```css
--bg: #0a0e1a;             /* page base */
--bg-deep: #0a1024;        /* hero panels */
--hero: radial-gradient(120% 90% at 24% 50%, #14203f 0%, #0a0e1a 72%);
--brand: #5aa6ff;          /* dark-mode azure (NOT #007FFF — too dark on navy) */
--brand-soft: #7fb6ff;
--green: #7ff0c4;  --amber: #ffd27d;  --orange: #ff8f6b;  --pink: #ff9aa9;
--text: #ffffff;  --text-secondary: rgba(255,255,255,.62);
--text-muted: rgba(255,255,255,.4);  --mono-gray: #cdd6e4;
--card: rgba(255,255,255,.04);  --card-border: rgba(255,255,255,.1);
```

Radius 16px cards / 8px small (light), 22–28px cards (dark). Soft shadows
only. Reserve `--ai` purple strictly for AI-agent-related elements — this
mirrors the product rule.

### Logo (bottom center of every slide)

The footer center slot renders the **official imToken logo** (source:
`token.im/img/imTokenLogo.svg` — blue gradient icon + wordmark), bundled in
this skill and already inlined in every template's `#imtokenLogoTpl`:

- **Light decks** → `assets/imtoken-logo.svg` (navy `#111D4A` wordmark).
- **Dark decks** → `assets/imtoken-logo-dark.svg` (same official shapes,
  wordmark recolored `#FFFFFF`; the gradient icon is unchanged — it reads
  well on both backgrounds).

Always **inline the SVG markup** into the deck HTML (self-contained — never
`<img src>` a relative path for the logo). Footer sizing: ~18–22px tall,
opacity .82–.9; on dark decks add
`filter: drop-shadow(0 2px 6px rgba(0,0,0,.4))`.

## Step 4 — embedded prototypes

When a slide links to a separate prototype HTML, never navigate away from the
deck. Use the built-in overlay system (`references/prototype-embeds.md` has the
full markup, sizes and edge cases):

- **Mobile prototype** → right **slide-in panel** with a 393×852 phone frame
  iframe (`toggleDemoPanel(url)`); deck content shifts left while open.
- **Desktop prototype** → **center fade-in modal** with a large browser-chrome
  iframe (`toggleDesktopModal(url, title)`), dimmed blurred backdrop, `Esc`
  closes, three-state fallback as described above.
- **Animated diagram sub-pages** (the Sigil pattern) → full-bleed iframe
  directly in the slide with `data-autoplay`, replayed on slide entry via
  `postMessage({type:'deck-play'})` — see `references/motion-interactions.md`.
  Prefer this over overlays when the diagram IS the slide content.

Trigger buttons on slides use the `.demo-btn` component. Keep prototype files
as separate HTMLs next to the deck; the overlay iframes them by relative path
(this is the one allowed relative reference — mention it when delivering).
**Do not iframe a Feishu / Confluence / Figma / ChatGPT-share URL** — they
refuse framing and the room sees a white rectangle. Save the page locally and
reference it by relative path instead.

## Step 5 — embedded images & the `assets/` folder

If the user wants real photos/screenshots embedded (Step 0 answer), default
to this workflow — it ships v1 immediately and lets the user fill images in
later without breaking anything:

1. Create an `assets/` folder next to the deck HTML (deck-specific subfolder
   if the location is shared, e.g. `assets/allhands/`).
2. In the deck, every image slot is a **labeled `.placeholder` + auto-upgrade
   image**, and — on paged decks — zoomable:

```html
<div class="placeholder has-zoom" style="height:min(41rem, 64vh); padding:0;">
    <div class="ph-title">Cowork 任务列表</div>
    <div class="ph-file">assets/demo-cowork-tasklist.png</div>
    <div class="ph-desc">来自 2026-08 实机截图，建议 ~1600px 宽</div>
    <img class="zoomable" src="assets/demo-cowork-tasklist.png" alt="Cowork 任务列表"
         title="点击放大" style="object-fit:contain;background:var(--surface);border-radius:var(--radius);"
         onclick="openLightbox(this.src, this.alt)" onerror="this.remove()">
    <span class="zoom-hint">点击放大</span>
</div>
```

   Missing file → labeled dashed placeholder showing the exact expected
   filename; user drops the file in → it auto-replaces on reload. Nothing
   ever breaks. Portrait captures **must** override `object-fit: contain` —
   the default `cover` crops the part being discussed.
3. Write `assets/README.md` listing every expected filename, which slide it
   belongs to, and recommended dimensions (~1200–1600px wide for photos).
4. When delivering v1, tell the user exactly which files to drop where.

This placeholder discipline also applies to missing screenshots even when no
assets folder was requested — never an empty gap, never a fake screenshot.

## Step 6 — writing the slides

- **Slide anatomy** (all modes):
  `<section class="slide" data-section="unique-id" data-label="侧栏标题"
  data-group="Part 1 · …" data-thumb="grid3" data-speaker-notes="…">` wrapping a
  single `<div class="stage">`. The label feeds the outline row, the group feeds
  both the outline numbering and the footer-left text.
- **Cover / part-divider / closing** slides: centered, oversized `h1`, floating
  blurred orbs background, no `data-group`. Dark decks: oversized mono part
  number (`01`) with shimmer + radial hero gradient — see `references/dark-mode.md`.
- **Visual-first**: 多用插画和图形表达，少用大段文字。 Prefer inline-SVG
  mini-illustrations, flow diagrams, icon tiles, progress/status pills over
  text bullets. `references/components.md` catalogs the component set (and which
  template ships which class); `references/dark-mode.md` +
  `references/motion-interactions.md` cover the dark/animated equivalents and the
  illustration quality bar. Read before inventing a new component.
- **Content density**: one idea per slide (paged) or one topic per section
  (scroll). Prefer `grid-2` / `grid-3` cards, comparison tables, flow steps.
- **Speaker notes on every slide** — see the machinery section. Pacing cues,
  not a transcript of the slide.
- **Bilingual**: match Wilson's language. Chinese decks keep English technical
  terms inline (Passkey, Intent Card, AA…). Mono-font kickers stay English
  uppercase.

### Chinese typography red lines (full rationale in `references/components.md`)

Each of these cost a real deck a real defect. They are not preferences.

1. **Any `.label` containing Chinese must also carry `.cn`.** Without it the
   `letter-spacing:.1em` + uppercase rule tracks *between Chinese glyphs* —
  「设计师」renders as「设 计 师」and reads as a typo from the back of the room.
2. **`.mono` has no Chinese glyphs.** Mixed-language meta lines
   (`01 / 24 · 上下文管理`) use the body font; keep `.mono` for pure-Latin
   fragments — `.time-tag`, `.fn`, `.p-tag`, version strings, page numbers.
3. **`--text-muted` is decoration, never information.** It measures 2.49:1 on
   `--bg` — below AA. Anything that carries meaning uses `--text-secondary`
   (7.4:1). `--text-muted` is legal on `.ghost-num`, hairlines and disabled
   affordances.
4. **Projection floor is 0.62rem.** Short all-caps mono micro-labels may sit at
   .62–.66rem; body copy, captions and table cells may not. Below-floor text
   isn't a dense slide, it's a slide that needs splitting.
5. **Never dim a block with inline `opacity`.** It outranks `[data-step].on`, so
   the stepped reveal silently freezes mid-fade — and 0.5 opacity on the light
   background drops under 2:1. Show a weakened "before" state by tinting the
   container instead:
   `style="background:var(--border-light);border-color:var(--border);"`.

### Other authoring rules

- **Numbering discipline**: footer page numbers and outline numbers are computed
  — but the **agenda slide is not**. After adding/removing/reordering slides,
  re-read the agenda and any "Part N" labels and fix them by hand.
- **Unique SVG pattern ids**: every `<pattern id="…">` / `<linearGradient id="…">`
  in the deck must have a distinct id (`gridCover`, `gridP1`, `gridClose`…).
  Duplicated ids make later slides pick up the first definition.
- **HTML-to-Figma compatibility**: semantic flat structure, avoid CSS that
  breaks Figma import (no `position: sticky` inside slides, no CSS masks,
  no pseudo-element-only content for meaningful visuals).

## Step 7 — self-check before delivering (v2.3)

Open the file (or reason through it) and verify:

- [ ] Every slide has `data-speaker-notes`, and the notes are pacing cues —
      not the slide's own text re-typed. No stray unescaped `"` in the value.
- [ ] Every `data-section` is unique.
- [ ] Every `data-thumb` is in the allowed set (`cover | statement | divider |
      grid2 | grid3 | grid4 | split | stack | table | timeline | steps | term |
      stat | placeholder`) and roughly mirrors the slide's real layout.
- [ ] Outline numbering reads sensibly end to end: `—` covers, `PART N`
      dividers, continuous `N.M` inside each part, `END.M` at the close, no
      accidental `0.M` on a content slide that just forgot its `data-group`.
- [ ] Every SVG `pattern` / gradient id in the file is unique.
- [ ] **Text selection survives.** Drag across a paragraph: the text is selected
      and the page did NOT turn. Double-click a word: the word is selected and
      the page did NOT turn. Click blank stage area: pages instantly. Click a
      paragraph once: pages after ~180ms. Test with a real pointer (a synthetic
      `element.click()` skips `pointerdown` and passes even when broken).
- [ ] Stepped reveals replay on re-entry and via `R`; no `data-step` on a direct
      child of `.stage`; under `prefers-reduced-motion` every step shows
      instantly (instant, not absent).
- [ ] No overflow at **1366×768**, **1920×1080** and **3840×2160**. The short-
      viewport breakpoint handles the first; the root `clamp()` handles the last.
- [ ] No Chinese `.label` missing `.cn`; no informational text on `--text-muted`;
      nothing below 0.62rem.
- [ ] No placeholder whose explanatory text would get projected as if it were
      content — placeholders are for gaps you have declared, not for slides you
      intend to ship.
- [ ] Footer logo (correct theme variant) + counter render on every slide;
      overlays open and close (incl. `Esc`); the lightbox returns to the same
      slide; sidebar hides below 1100px without leaving a blank gutter.
- [ ] Agenda matches the actual slides; no leftover sample content from the
      template; no section shipped with invented filler content (Step 0c).

Deliver the file, then state slide count, any pending placeholders/asset
files, and any content gaps in one line. If the deck belongs to the UI 3.0
repo, drop it in the phase folder Wilson names and remind him it inherits
`assets/pw-gate.js` password gating only if he asks for protection.

<!-- imtoken-html-slides · v2.3 · 2026-08 -->
