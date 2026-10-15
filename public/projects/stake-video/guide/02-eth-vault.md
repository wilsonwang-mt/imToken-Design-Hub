# ETH 晶体与质押容器规范

> **适用**：画面里出现 ETH 晶体、质押容器（验证器圆柱）、光带、奖励小 ETH 或增量计数器的一切场合。
> **版本**：2026-10-15，依据 Style Block v1.6、空间与机位设定、Three.js 几何模型和 2026-10-07 的成片做法整理。早期写法里和本文冲突的，以本文为准。
> **给 Claude 的说明**：第 1 节的视觉语法是全片的硬规则，每一帧都按它检查。prompt 原文在第 8 节，复制时一字不改。

## 1. 视觉语法（硬规则）

这支片子用画面讲质押：观众不读字，也能看懂「ETH 原来在睡觉，质押后开始工作、慢慢变多，而且一直在你身边」。每个元素都有固定的含义，不能挪作他用。

| 元素 | 代表 | 规则 |
|---|---|---|
| ETH 晶体的**数量** | 持有的 ETH 数量（按币本位算） | 质押前**永远只有 1 颗**；质押后**只增不减**。每个镜头的 prompt 都写明晶体数量。 |
| 主 ETH 的**大小和表情** | 法币价值、市场情绪 | 只在牛熊段落随价格变大变小、换表情，**不代表收益**。段落结束时价格回到起点附近，ETH 回到原大小并重新睡着，不能停在高位或低位，避免暗示「质押能对冲熊市」或「牛市才值得质押」。 |
| ETH 的**亮度** | 休眠或工作 | 质押前暗、缓慢呼吸（约 4 秒一次）；质押后亮、有节奏地脉动（约 1 秒一次）。 |
| **奖励小 ETH** | 数量在慢慢累积 | 形状、颜色和主 ETH 相同，明显更小，**不带表情**。出现得要慢。只能待在**容器上方，或容器和 Bulu 之间**。 |
| **质押容器** | 自己的验证器，安全地在工作 | 始终放在 **Bulu 身边**的小边几上；质押时才出现。 |
| **光带** | 所有权：非托管，掌控权始终在你手上 | 一条细的冰蓝光带连着容器和 Bulu 的手机，**任何时候都不能断开**。 |
| **增量计数器** | 核心信息：多出来的 ETH | **只显示增量**（+x.xx ETH），计数器和文案都不出现持仓总数。（成片开场手机界面里显示的 ETH 余额是特意保留的界面内容，不算计数器。） |
| 画面里的文字 | — | AI 生成的画面里**不出现任何文字或数字**。计数器、价格卡、界面、zzz 都在后期叠加。唯一例外是容器底座上浮雕的盾牌锁孔形状。 |

和光带含义相关的文案口径：说「非托管，质押后掌控权始终在你手上」。**不要说「ETH 不离开你的钱包」**：质押时 ETH 确实会离开钱包（2026-10-08 起停用这句）。也不要用任何会让人以为 ETH 被「锁住」的说法。

## 2. 主 ETH 晶体

### 2.1 形状

- 和以太坊标志**完全一致**：上面是较高的正四棱锥体，下面是较矮的倒 V 形，**同一条竖直轴、完全居中对齐**，中间隔一道均匀的细缝。
- 比例按 ethereum.org 的标志 SVG：宽高比约 0.61，腰线在离顶部约 51% 处，缝宽约为总高的 5.8%。
- 上半部是方形腰的四棱体（不是圆锥，也不是六棱尖晶）。
- 是一个完整的物体：不开裂、不碎、上下两半不错位。

### 2.2 材质

半透明的冰蓝玻璃，抛光晶面，锐利边缘，明亮的边缘高光，柔和的内部折射，从内部微微发光。主色冰蓝 `#648FFA`，晶面 `#5D95E7`。ETH 的光是冷光，不被落地灯的暖光染色。

### 2.3 大小和位置

- 高约 0.20 m，约为 Bulu 坐高的 1/3。早期帧里接近 Bulu 大小的 ETH 不再使用。
- 质押前睡在沙发另一端座位上、毛毯堆成的窝里（从房间看在 Bulu 右边）。质押后在容器里，悬浮在内部底座上方。
- 因为透视，画面上「ETH 高 ÷ Bulu 坐高」的目标值：A 机位毯窝里约 0.27，A 机位容器里约 0.40。

### 2.4 表情

表情是**晶体内部的光点**，不是画在表面的卡通五官。ETH **没有嘴**。

| 状态 | 用在 | 表情 |
|---|---|---|
| 沉睡 | 质押前 | 两道下弯的弧线，闭着眼，很安详。 |
| 开心 | 牛市波峰 | 两道上弯的弯月笑眼，晶面上闪出小星芒，整体变亮。 |
| 失落 | 熊市波谷 | 两只下垂的眼，光变暗，偶尔无力地闪一下。 |
| 醒来、工作 | 质押后，在容器里 | 两个小圆点眼，专注。 |

### 2.5 牛熊段落

- ETH 的大小跟着价格曲线变。规范是以底部为锚点缩放 0.8–1.2 倍，结尾回到 1.0 倍；成片实际用的是牛熊合成帧的实测值：波峰约 1.54 倍、绕腰部附近缩放，波谷约 0.80 倍、绕底部缩放（像往毯子里沉），比价格曲线滞后约 3 帧。波峰倍数还没有最终确认。
- 表情顺序：沉睡 → 醒来变开心 → 开心 → 转失落 → 失落 → 睡回去。整段只有 1 颗 ETH。
- 季节调色、补光时，ETH 所在区域一律不提亮：亮度只代表休眠和工作，不能被别的东西带亮。
- 大小和表情的变化**用代码做**，不让 AI 视频去演（见 [Remotion 动画与合成规范](03-remotion.md)）。

### 2.6 zzz 和呼噜

保留 zzz，由后期叠加（描边的 Z 字形，冷白色，慢慢上升、右移），不让 AI 画。ETH 醒来时 zzz 散掉；牛熊段落结尾 ETH 重新睡着时 zzz 再出现。沉睡的 ETH 配「玻璃共鸣般的呼噜声」音效。

## 3. 质押容器（验证器圆柱）

### 3.1 外观

沿用主视觉「Stake, under your control」里的容器：

- 透明玻璃圆柱，顶部是圆角圆盘盖，盖上有一个凸起的小圆台。
- 内部有一个柔和发光的圆形底座，主 ETH 悬浮在它上方，**始终留在容器里**。
- 立在宽的两层圆角方形玻璃底座上。
- 底座正面浮雕一个**带锁孔的盾牌形状**（只有形状，没有文字），这是画面里唯一允许出现的图形符号。
- 一圈细细的光环环绕圆柱运行，光环比圆柱宽，略微倾斜。
- 冰蓝玻璃，从内部发光。

### 3.2 几何（Three.js 模型，单位 m）

| 部件 | 尺寸 |
|---|---|
| 总高 | 约 0.35（凸台顶 0.352） |
| 底座 | 两层圆角方形：下层 0.38 见方、圆角 0.06、厚 0.03；上层 0.33 见方、圆角 0.05、厚 0.018 |
| 玻璃圆柱 | 直径 0.29，高 0.274（从 0.048 到 0.322） |
| 盖和凸台 | 盖直径 0.29、厚 0.008；凸台直径 0.124、高 0.026 |
| 内部底座 | 直径 0.164，高 0.032 |
| 光环 | 直径 0.40，管径约 0.002，在 0.20 高度；离水平约倾斜 12.6°，再侧倾约 6.9° |
| 盾牌锁孔 | 宽 0.032、高 0.044、浮雕厚 0.004，在底座正面中央，朝向主机位 |
| 主 ETH | 底尖在 0.082 高度，略转一个角度（不正对，便于看出立体感） |

材质：玻璃 `#9CC4FF`，透明度约 0.22，带一点冰蓝自发光；底座、盖、内部底座是磨砂玻璃 `#8FB6FF`，点亮后自发光更强；光环和盾牌是亮冷白 `#CFE0FF`。

### 3.3 大小

- 规范值：约为 Bulu 身高的一半（0.36 m）。prompt 里的尺寸短句也这么写。
- 成片实际：A 机位质押后的母图把容器放大到了约 1.5 倍（原尺寸的容器装不下原尺寸的主 ETH，尖顶会穿出盖子），主 ETH 保持原尺寸；容器特写镜头里容器约为 Bulu 身高的 0.65。**新视频以已审批的 A 机位质押后母图为准**。

### 3.4 位置和出现时机

- 容器**只放在 Bulu 身边那张深色木小圆几上**（Bulu 外侧、紧贴扶手）。另一端放马克杯和书的黑色小圆几永远不放容器。两张小几外观不同，就是为了防止模型把容器放错。
- 从房间看，从左到右永远是：落地灯 → 小边几（容器）→ Bulu → 毯窝 → 另一张小几。机位只能裁掉两端，不能调换顺序。
- 质押前，小边几空着，没有容器也没有光带。ETH 醒来的同时，容器在小边几上由光点组装、点亮。首尾押韵：开场是空边几，结尾是装满的容器。

### 3.5 质押发生时（ETH 醒来、跳进容器）

毯窝里的 ETH 睁眼、由暗变亮，像伸懒腰一样轻轻一弹，然后蹦跳两三下，越过扶手、从 Bulu 的角上方经过，落进 Bulu 身边的容器。容器亮起，光环开始转动，光带从容器长到手机；ETH 进入后开始有节奏地脉动。Bulu 转头从右往左跟着看。**任何一帧都只有 1 颗 ETH。**

成片用 Seedance 2.5 的首尾帧模式直接生成这一段：首帧是毯窝里的 ETH，尾帧是装着 ETH 的容器。首尾帧模式会严格对齐尾帧，尾帧里的错误会带进整段（尾帧容器里的 ETH 画小了，整段 ETH 都会跟着缩小），所以**先把尾帧修对再跑**。

## 4. 光带

- 一条细的、连续的冰蓝光带，连着容器和 Bulu 手里的手机，光带上有微小的光粒流动。
- 从质押发生的那一刻起，到片尾，每个镜头都要看得到光带的一段；画面里**不能断开、变细到消失或被遮住**。
- 出画只允许两种情况：容器出画时，光带从画左入画连到手机；Bulu 出画时，光带从容器向画右出画。
- 光带不穿过 Bulu 的身体，经过鳍后面时要被鳍挡住。
- 光带比容器暗，不负责照明。
- 幻想气泡里的画面不画光带。
- 规范写法是从容器顶盖连到手机；已审批关键帧里 AI 画的光带多从容器右壁出发，合成时以画面实测位置为准。光带末端落在手机底边，看起来容易像充电线；新视频建议让它落在手机背面中部。

## 5. 奖励小 ETH

### 5.1 规则

- **形状、颜色**和主 ETH 完全相同，**明显小于主 ETH**，大小以已审批关键帧为准（不设比例上限；早期「主 ETH 的 1/10」「1/4」这两条上限已在 2026-10-04 取消）。
- **不带表情**：没有眼睛，没有嘴。
- **只增不减**，跨镜头也一样。成片里惊喜那一镜从 6 颗逐渐升到 11 颗，幻想气泡结尾 11 颗，结尾一镜 13 颗（后两镜各有 3 颗小的汇聚成 1 颗稍大的）。
- **位置**：只在容器上方，或容器和 Bulu 之间。不飞走，任何一帧都不出画，不飞进别的物体（另一张小几、窗、毯窝、Bulu 的身体）。
- **要慢**：从一粒光点慢慢长成晶体；几颗小的慢慢聚拢、合成一颗稍大的（仍明显小于主 ETH）。
- **不能多到像夸大收益**：成片曾因为一堆静止的大晶体被认为「像夸大宣传」，改成了环绕容器的少量小 ETH，加上从容器顶不断升起、轻轻上下浮动的几颗（表示还在持续产生）。奖励云要有大有小、分布均匀，中间不留大块空白。

### 5.2 两种做法

| 做法 | 用在成片的 | 说明 |
|---|---|---|
| AI 画进底片 | 收益增长（容器特写） | 小 ETH 沿光环生长、合成，都在 AI 视频里。优点是光影自然；缺点是容易整组漂移、数量忽多忽少、转成侧面的窄片。 |
| 干净底片 + 脚本叠加 | 惊喜、幻想、结尾 | 底片里只留容器里的 1 颗主 ETH，奖励 ETH 用程序画的 2D 晶体精灵叠上去：冰蓝多面菱形，白色亮边，外发光，用「滤色」（screen）叠加。光环上环绕 4 颗（转到容器后面时变暗、变小），容器上方是奖励云，其中 3 颗小的螺旋收拢、合成一颗稍大的，合成时一下柔光。数量和位置完全可控。 |

新视频里，凡是要求「数量精确、只增不减」的镜头，优先用第二种。

## 6. 增量计数器

- 只显示增量，例如 `+0.00 → +0.72 ETH`，旁注「示意数值」（英文版 Illustrative）。数值需要产品校准后才能当真。
- 成片里**只在收益增长那一镜出现**：镜头开始后停在 +0.00 约 1 秒，再用缓入缓出数上去，结束前 0.6 秒数完。之后的镜头都不再显示（结尾曾经保留一个静止的计数器，被评为重复，已去掉）。
- 样式：画面右上角的磨砂玻璃卡片，cream white 文字，等宽数字，强调色冰蓝 `#648FFA`；正在数的时候卡片带一点外发光。具体参数见 [Remotion 动画与合成规范](03-remotion.md)。
- 文案里不提持仓总数，也不解释原生质押的原理。

## 7. 光线

- 质押前：主 ETH 低亮度，缓慢呼吸。开场时 ETH 只有正常沉睡亮度的约 30%，只见光、不见形，作为伏笔。
- 质押后：主 ETH 高亮度、约 1 秒一次的脉动；容器跟着同步脉动，成为第二个冷光源，照亮小边几台面和 Bulu 靠容器的半边。所以质押后的 Bulu 整体比开场更亮。
- 暖光只有一盏调暗的落地灯（约 2700K），亮度不超过画面最亮处的 10%，不照 ETH、容器、手机屏和小 ETH。已审批关键帧里灯罩普遍偏亮，合成时要压暗 1.3–2.2 档。
- **AI 视频里不演亮度变化**（第 9 节），呼吸、脉动都在后期做。

## 8. Prompt 原文

组装顺序、通用的 CORE / CORE-S / NEGATIVE 见 [Bulu 形象规范](01-bulu.md) 第 9 节。下面是 ETH、容器、光带相关的模块。prompt 一律用英文，原样粘贴。

### 8.1 ETH（ETH 出现时必加）

```text
The ETH crystal: shaped exactly like the Ethereum logo, a tall upper pyramid above a shorter inverted lower pyramid, both on one shared vertical axis, perfectly centered and aligned, separated by a thin even gap. Translucent ice-blue glass with polished facets, crisp edges, bright rim highlights and soft internal refraction, glowing gently from within. It is one solid object, never cracked or broken into pieces.
```

状态短语（关键帧用，接在 ETH 模块后面；视频里不要写，见第 9 节）：

```text
Dormant: dim, low brightness, a faint slow breathing glow inside, about one breath every four seconds.
```

```text
Active: bright, a steady rhythmic pulsing glow, about one pulse per second.
```

表情（只在需要表情的镜头加：先加前缀，再接一种情绪）：

```text
Its face is formed by tiny points of light inside the crystal, not painted on the surface:
```

| 情绪 | 短语 |
|---|---|
| 沉睡 | `two short downward-curved arcs as closed eyes, peaceful.` |
| 开心 | `two upward-curved crescent eyes, small star-like sparkles flashing on the facets.` |
| 失落 | `two drooping eyes, the glow dimmer, flickering weakly.` |
| 醒来、工作 | `two small round dot eyes, alert and focused.` |

数量句（每个镜头描述都要写，质押前 N = 1）：

```text
Exactly N ETH crystal(s) in the frame.
```

### 8.2 小 ETH 和合成 ETH

```text
Small ETH crystals of exactly the same shape, clearly smaller than the main crystal (about the sizes in the approved S10, S11a and S12 keyframes), born as specks of light and pulsing in sync with it.
```

```text
Several tiny ETH crystals slowly drift together and merge into one slightly larger ETH crystal of exactly the same shape, still clearly smaller than the main crystal.
```

去掉小 ETH 脸上的眼睛（修帧用）：

```text
Keep every small floating crystal exactly where it is, with the same size and the same count; each one is a plain, glowing ice-blue ETH crystal of exactly the same shape as the main crystal, with no face, no eyes and no mouth, lit consistently with the room. The main crystal stays inside the vault; the light ribbon from the vault to the phone stays unbroken.
```

### 8.3 VAULT（容器出现时必加）

尺寸那句写的是规范值（Bulu 身高的一半）；新视频如果沿用成片里放大后的容器，以首帧为准，视频 prompt 里可以删掉这句。

```text
The staking vault: a transparent glass cylinder with a rounded disc lid, a softly glowing round pedestal inside, standing on a wide rounded-square glass base. A small shield shape with a keyhole is embossed on the front of the base (shape only, no text). A thin ring of light orbits the cylinder. Ice-blue glass, glowing from within. About half of Bulu's height, standing on a small side table right next to Bulu's seat on the sofa. The main crystal stays inside the vault. New tiny crystals may float around the outside of the vault, but only above the vault or in the space between the vault and Bulu: they never fly away, never leave the frame, never enter any other object.
```

修帧或高清重出时，让容器清晰、保留盾牌和光环：

```text
The glass vault is crisp and clear: a transparent glass cylinder with sharp edges and a rounded disc lid, a softly glowing round pedestal inside, a wide rounded-square glass base with a small embossed shield-and-keyhole shape, a thin ring of light orbiting the cylinder, and one ETH crystal with two small glowing dot eyes inside the vault.
```

### 8.4 LINK（质押后，容器和手机同框时必加）

```text
A thin, continuous ice-blue ribbon of light connects the top of the vault to the phone held in Bulu's fins, with tiny light particles drifting along it in both directions. The ribbon is never broken.
```

### 8.5 尺寸和布局短句

A 机位必加：

```text
The ETH crystal is about one third of Bulu's seated height; the vault is about half of Bulu's height.
```

布局描述，质押前：

```text
On the other seat, the ETH crystal sleeps in a soft hollow of the blanket. Right beside Bulu's armrest stands a small round dark-wood side table.
```

质押后（毯窝已空，ETH 在容器里，不能再写毯窝里有 ETH，否则画面会多出一颗）：

```text
Right beside Bulu's armrest stands a small round dark-wood side table. The glass vault stands on it. The blanket nest on the far seat at the right is now empty.
```

### 8.6 相关机位

ETH 近景（质押前，Bulu 是背后的虚影）：

```text
Camera E, locked-off low close view from just outside the armrest at the crystal's end of the sofa, slightly above the crystal's tip and tilted gently down, looking back along the seats: the single sleeping ETH crystal rests in a hollow of the navy blanket in the lower center; behind it and above, heavily out of focus, Bulu seen from behind at three-quarters, its far edge rim-lit by the cool glow of its phone; one tiny warm lamp bokeh just behind Bulu's head; cool skyline bokeh through the window at the right. Exactly 1 ETH crystal in the frame.
```

容器特写（收益增长）：

```text
Camera V, locked-off close view of the glowing glass vault from the front-left of the sofa, camera a little above the vault and tilted gently down, 50mm. Left to right: a dimmed warm floor lamp at the upper left, next to a potted plant and a gathered sheer curtain; the glass vault on a small round dark-wood side table, left of center, the main ETH crystal pulsing inside it and a thin ring of light orbiting around it; behind the vault, the near armrest and the back of the sofa; Bulu on the near seat, right of center, seen in three-quarter view, looking down at the phone between its fins; the blanket on the far seat; a round black side table with a dark mug at the right edge. Behind the sofa, floor-to-ceiling windows with thin black vertical mullions show the night skyline over a river. A thin light ribbon runs unbroken from the vault to the bottom of the phone.
```

Bulu 正面（容器在画左缘，幻想气泡用）：

```text
Camera F, locked-off straight-on front view from the room side of the coffee table, square to the window wall, camera slightly above Bulu's eye level, 36mm, level. Bulu on the near seat, left of center, facing the camera, holding the phone at its belly with the plain back of the phone toward the camera, looking up toward the upper right. Left to right: a dimmed warm floor lamp at the top-left corner, partly cut off by the frame, with a gathered sheer curtain behind it; the glowing glass vault on a small round dark-wood side table at the left edge, right beside the near armrest, on its outer side; Bulu; the blanket bunched on the far seat; the far armrest; a round black side table with a dark mug and two books at the right edge. The top edge of the sofa back runs straight and horizontal just below the middle of the frame; above it, floor-to-ceiling windows with thin black vertical mullions show the night skyline over a river. Bottom edge: the far rim of a round black marble coffee table. A thin light ribbon runs unbroken from the vault to the bottom of the phone. Empty space above Bulu's head.
```

### 8.7 视频专用句

晶体全静止（有容器、主 ETH 或小 ETH 的视频镜头必加，只让 Bulu 动）：

```text
The vault, the main crystal and every small crystal stay completely still, exactly where they are, each with the same steady glow for the whole shot: no pulsing, no flashing, no brightening, no blinking, no drifting, no rotating; every crystal keeps its exact size, shape and position. Only tiny light particles flow slowly along the thin ribbon from the vault to the phone.
```

干净底片（奖励 ETH 打算用脚本叠加时，接在负面段里）：

```text
ETH crystal halves stay aligned; exactly one ETH crystal, inside the vault; no crystals outside the vault.
```

## 9. 生成要点（Seedance 2.5 实测）

1. **视频里晶体一律写「完全静止、光晕恒定」**。写「呼吸」「变亮变暗」「脉动」「浮动」，会被演成整颗爆亮、过曝，棱面和眼睛被洗掉，甚至眨眼；小 ETH 会一起涡旋、每颗漂移 50–150 px。呼吸、脉动、环绕、浮动都放到后期，用抠出来的图层做。光带上的光粒可以流动。
2. **ETH 几何先给标准答案**：生图时带上 Three.js 渲染的标准几何参考图（第 11 节），防止画成六棱尖晶或上下错位。
3. **首尾帧模式会严格对齐尾帧**：先把尾帧修对再跑。
4. **派生帧容易把容器里主 ETH 的点眼画丢**：从母图把主 ETH 那一块用椭圆遮罩贴回。
5. **大理石茶几上 ETH 的倒影**容易被看成第二颗 ETH：首帧里把茶几改成哑光。
6. 主 ETH 偶尔会绕竖轴转成侧面窄片：用稳定帧替换容器内腔那一块，或者在 prompt 里写明主 ETH 正对镜头、不转身。
7. 主视觉参考图里，容器四周漂着火焰状的小 ETH，模型会照抄。用参考图时写明 `ignore the small crystals floating outside it`。

## 10. 检查清单

- [ ] 质押前画面里只有 1 颗 ETH；质押后小 ETH 只增不减，跨镜头数量连续。
- [ ] ETH 是标志形：上下两段同轴、中间一道均匀细缝，不是六棱尖晶，没有错位、裂开。
- [ ] 主 ETH 大小跨镜头一致（只在牛熊段落由代码改变）；表情是内部光点，没有嘴。
- [ ] 小 ETH 不带表情，只在容器上方或容器和 Bulu 之间，不出画、不飞进别的物体。
- [ ] 容器在 Bulu 身边的小边几上；盾牌锁孔和光环都在；造型和前后镜头一致。
- [ ] 光带全程连着容器和手机，不断开、不穿过 Bulu。
- [ ] 质押前 ETH 暗、质押后亮；ETH 和容器的光没有被暖光染色。
- [ ] 计数器只显示增量，带「示意数值」；画面里没有其他文字和数字。
- [ ] 竖版、方版裁切时，容器旁的小 ETH 没有被切出画。

## 11. 参考素材

| 素材 | 看什么 | 在哪 |
|---|---|---|
| 标准 ETH 几何 | Three.js 按标志比例渲染的主 ETH，看得出方形腰的四棱体和中间的细缝。画布上有转 30° 平视、转 30° 俯 35° 两张；正面、醒来态等其他角度只在 Wilson 的项目本地，需要时向他要。 | 画布「02_LAYOUT_REF」分组（`REF_geom_eth_yaw30_elev8`、`REF_geom_eth_yaw30_elev35`） |
| 标准容器几何 | 容器 3/4 俯视：两层底座、玻璃圆柱、盖和凸台、内部底座、倾斜光环、底座正面的盾牌。正面图只在项目本地。 | 画布「02_LAYOUT_REF」（`REF_geom_vault_yaw35_elev20`） |
| 主视觉「Stake, under your control」 | 容器造型的来源。四周漂浮的小 ETH 不要照抄。 | 画布「00_REF」（`REF_kv-container_src`） |
| 客厅白模摆位图 | 各机位质押前后的摆位：小边几、Bulu、毯窝、另一张小几的位置；质押后的容器、光带。画面上标了各物件的横向位置和 16:9、9:16 的取景框。 | 画布「02_LAYOUT_REF」（`REF_layout_A_pre`、`REF_layout_A_post`、`REF_layout_V_post`、`REF_layout_F_post` 等） |
| 已审批关键帧 | 容器特写（早期、后期两张，小 ETH 大小以它为准）、A 机位质押后母图（放大后的容器）、惊喜、幻想、结尾。 | LibTV「画布 1」 |

## 12. 尚未定论

以下几点还没有正式结论，遇到时先问负责人：

- 容器大小：prompt 仍写「Bulu 身高的一半」，成片放大到了约 1.5 倍。新视频统一按哪一个写。
- 底座的盾牌锁孔是否继续保留（锁孔可能让人联想到「锁住」）。
- 奖励小 ETH 默认用 AI 画还是脚本叠加；脚本精灵目前是单个菱形，要不要改成和主 ETH 一样的两段式标志形。
- 光带的起点（顶盖还是右壁）和光粒的流向（双向，还是从容器流向手机）。
- 沉睡呼吸的周期：规范写约 4 秒一次，牛熊段落的实现是 2.5 秒一次。
- 牛熊段落 ETH 的波峰倍数：用规范的 1.2 倍，还是成片的约 1.54 倍。
- 竖版：容器特写、惊喜两个镜头的小 ETH 在 9:16 里放不下，需要从生图阶段就按竖版构图。

---

来源：Wilson 的视频项目里的项目规则（`CLAUDE.md` 第 4 节）、Style Block v1.6（`refs/style-block.md`）、空间与机位（`docs/08`）、剧本（`docs/06`）、合成规范（`docs/09`）、Three.js 场景（`video/src/scene/`）和奖励 ETH 脚本（`tools/reward_cloud.py` 等）。2026-10-15 整理。
