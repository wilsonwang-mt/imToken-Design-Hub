# Bulu 形象规范

> **适用**：用「Bulu 与沉睡的 ETH」的风格制作新视频、关键帧或修帧时，画面里出现 Bulu 的一切场合。
> **版本**：2026-10-15，依据 Style Block v1.6 和 2026-10-07/08 的实际做法整理。早期写法里和本文冲突的，以本文为准。
> **给 Claude 的说明**：「硬规则」不能违反，拿不准时停下来问负责人，不要自行放宽。prompt 原文放在第 9 节的代码块里，复制时一字不改。

## 1. 一句话标准

Bulu 是一只圆滚滚的蓝色小鲸鱼，**像高级搪胶玩具一样光滑、干净、轮廓锐利**：颜色饱和鲜亮，奶白肚子，**没有腿、没有脚、没有手臂、没有眉毛**，只有两只短圆的侧鳍，头顶一只蓝底绿尖的短角。

判断一帧合不合格，先看三件事：**表面是不是光滑锐利**（不毛绒、不糊）、**下半身有没有长出脚**、**有没有多出不存在的部位**（眉毛、手臂、第二只角、耳鳍）。

## 2. 造型（硬规则）

| 部位 | 规则 | 常见错误 |
|---|---|---|
| 身体 | 圆滚滚、胖乎乎，头要圆润饱满、朝向镜头。 | 侧身握手机时头被画扁；纯侧面。 |
| 腿和脚 | **没有腿、没有脚**，坐着也一样。身体底部是圆的奶白肚子，直接落在坐垫或毯子上。 | 最常出错的两处：① 左鳍下方、身体左下角的短脚或膝盖状圆块（鳍伸向手机时露出，收回时像膝盖）；② 拿手机那只鳍的右下方、鳍和沙发之间的圆块。 |
| 手臂和鳍 | 没有手臂、手、手指，只有两只**短而圆的侧鳍**，贴近身体。鳍可以像手一样托住手机。 | 鳍被拉长、变尖，像手臂一样横过身体或脸，遮住嘴。 |
| 鳍长 | Style Block 写的是每只鳍不超过身高的 1/4；实际接受过约 1/3。**底线**：不能长到像手臂。 | 写「鳍在屏幕上滑」时，空着的那只鳍会伸长去够手机。 |
| 尾巴 | 身后一条卷曲的尾巴。A 机位里是画面左侧的钩状卷尾。部分镜头看不到尾巴，可以接受。 | 画成两瓣的鲸尾；尾巴从左边跳到右边。 |
| 角 | 头顶**只有一只**短圆锥形的角：底部蓝色（有一圈蓝色角座），尖端绿色。 | 两只角、全蓝的角、长出耳鳍。 |
| 眼睛 | 两只大而圆、有光泽的眼睛，**大小完全相同、左右对称**：奶白眼白圈、大黑瞳孔、白色高光。开心时瞳孔里可以有星芒。 | 左右眼大小不一；眨眼时闭成一道褶线、眼白消失。 |
| 眉毛 | **没有眉毛**，也不能有像眉弓的眼睑鼓棱。表情只靠眼睛和嘴。 | prompt 里写了 brows 就会长出眉毛。 |
| 腮红 | 两颊各一个小圆的粉色腮红。 | 腮红缺失或变形。 |
| 嘴 | 默认是简单的小微笑；其他表情按镜头写（第 7 节）。 | — |

## 3. 表面与清晰度（硬规则）

- **光滑、干净、锐利**：搪胶玩具质感，柔和的缎面光泽，清晰的高光，轮廓锐利。
- **不要**：毛绒感、颗粒、毛毡、丝绒或任何织物纹理；也不要发糊。
- **不要再用旧写法**。下面这些已经在 2026-10-06 作废，旧 prompt 里如果出现，复用前要全部换成第 9 节的写法：
  - 「细密微颗粒软触感，像桃皮、细麂皮」（fine micro-grain, peach skin, suede）
  - 「soft-touch matte with subtle fine grain」
  - 「绒面质感可以接受」
- 光滑不等于磨平：要的是缎面光泽加锐利轮廓，不是没有细节的哑光橡胶。早期磨得过平的版本被评为「偏糊」。

**清晰度从源头保证**：

1. 关键帧在生成时就按正确曝光、原生 4K（3840×2160）出图，亮度统一放到后期调色。反复渲染、反复提亮都会让 Bulu 发糊。
2. 不要把 1080p 的视频底片裁切放大来得到更近的景别（裁到 1.4 倍以上明显变糊）。需要更近的景别，就重新生成首帧。
3. 每个机位先出一张「母图」，其他镜头从母图派生、只修一次，不要在派生图上一代代往下修（暗部会积累碎纹）。

## 4. 颜色

蓝色要**饱和、鲜亮**，以两张标准参考图为准（见第 13 节）。下面的色值是取样的近似值，受光照影响，用于后期调色和检查，**不写进 prompt**。

| 部位 | 参考色值 | 说明 |
|---|---|---|
| 身体蓝（受光面） | `#0383E7`，标准图头顶受光处约 `#007FE4`，亮部约 `#04A4FA` | 亮部几乎满饱和（HSV 饱和度约 250/255）。偏灰、偏紫都不合格。 |
| 角 · 蓝色底座 | `#0055C4`（标准图约 `#038AE8`） | — |
| 角 · 绿色尖 | `#1D845E`（标准图约 `#2BB560`） | — |
| 肚子 | 奶白，标准图约 `#E0D5E5`（亮部） | 不是纯白。 |
| 腮红 | 粉色，约 `#E571B0` | — |
| 瞳孔 | 近黑，约 `#03050E` | — |

整片的场景色板（暗部 navy `#090F1D`、夜空 `#0F2342`–`#162E5D`、ETH 冰蓝 `#648FFA`、暖灯 `#FCDFBC`）见 [ETH 晶体与质押容器规范](02-eth-vault.md) 和 [Remotion 动画与合成规范](03-remotion.md)。

## 5. 尺寸、位置与机位

**尺寸**（客厅按真实尺寸建模）：

- Bulu 坐高约 0.60 m（到头顶，不含角），眼高离地 0.85 m，沙发座高 0.42 m。
- ETH 晶体约为 Bulu 坐高的 1/3（0.20 m）；质押容器约为 Bulu 身高的一半（0.36 m）。
- A 机位的镜头 prompt 必须加「尺寸短句」（第 9 节）。

**位置**：Bulu 坐在沙发靠落地灯的一端，贴着扶手，身体朝向镜头，手机托在肚子前。从房间看，从左到右永远是：落地灯 → 小边几（质押后放容器）→ Bulu → 毯窝里的 ETH → 放马克杯和书的小圆几。所有机位都在这条线的同一侧，镜头之间不会左右翻转。

**机位**（AI 视频一律固定机位，推拉在后期做）：

| 机位 | 用在 | Bulu 在画面里 |
|---|---|---|
| A 主机位 | 开场、焦虑、ETH 醒来、惊喜、结尾 | 沙发左前方的低角度 3/4 正面，40 mm，略低于 Bulu 眼高。Bulu 居中，约占画高 42%（含角约 56%），头顶留约 30% 空间；尾巴和容器在画左，ETH 毯窝在画右。 |
| A-CU 面部特写 | 发现 App | 与 A 同一位置，100 mm，脸约占画高 2/3，手机在画面右下缘，画面里没有暖光。 |
| B 过肩 | 看行情 | 在 Bulu 肩旁、角根高度，沿沙发往远端俯看：画左是 Bulu 的脸颊和角，手机在画面中央对焦。 |
| F 正面 | 幻想气泡 | 正面、水平，36 mm，机位略高于 Bulu 眼高（最初关键帧 prompt 写的 50 mm 已被取代）。Bulu 在下半画面、略偏左，头顶留出气泡空间（气泡占画面上方约 45%，角尖离气泡下沿至少 20 px）。 |
| W 窗景 | 四季、牛熊 | 正对落地窗；Bulu 在画面一侧。 |

**视线**：每条视频 prompt 都要写明视线落点（容器、毯窝里的 ETH，或者手机）。除了片尾，Bulu 一般不看镜头，看镜头会打断「看着身边的 ETH」这层关系。

## 6. 道具

- **手机**：无品牌的通用机型。深蓝灰色素背壳，圆角，顶角一个小圆形摄像头；不要多摄模组，不要银色，不要 logo、刘海或灵动岛。一般是屏幕朝 Bulu，镜头只看到手机背面。AI 画面里的屏幕只是一块均匀的冷蓝光，上面什么都没有，界面在后期叠加。手机**永远不能悬空**，要用两只鳍托在身前、贴近身体。
- **毯子**：细针织的海军蓝薄毯，柔和的褶皱。不要卷毛、摇粒绒或泰迪绒（这些会产生大量噪点）。
- **沙发**：深炭蓝色，光滑、细密的织物，带一点光泽。不要粗糙的颗粒感面料。
- 每生成一条新视频，都要和前后镜头并排核对道具：手机、容器、杯子（单把手）、书、毯子。没有首帧锁定时，模型会自己发明道具（出现过三摄银色旗舰机）。

## 7. 表情与表演

表情只用眼睛、嘴和身体姿态表达。下面是成片里各个情绪节拍的写法，可以直接借用。

| 节拍 | 表情和动作 |
|---|---|
| 平静等待 | 低头看手机，温和的小微笑，手机冷光照在脸上。前 1.5 秒几乎不动，只有很轻的呼吸；之后慢慢点一次头。 |
| 看行情 | 耐心地看屏幕，拿手机的鳍尖轻点一两下。 |
| 焦虑 | 手机屏幕朝上放在面前的坐垫上，一边脸颊托在鳍上，视线平视毯窝里沉睡的 ETH；眼皮稍微垂下，下弯的担心小嘴。慢慢叹一口气：身体微微下沉，眼皮再垂一点。 |
| 发现 | 面部特写。手机屏幕亮起，冷光从下方照亮脸颊和眼睛；视线从 ETH 转向手机，眼睛睁大，瞳孔往右下瞥，担心的嘴软化成好奇的小「o」，头微微倾向手机。 |
| 操作 | 两只鳍把手机竖着托在肚子前，低头看屏幕，专注、好奇、略带兴奋，带一个柔和的小微笑。右鳍轻点屏幕几下，然后眼睛睁大、满怀期待，开心地慢慢点一下头。 |
| ETH 醒来 | 头慢慢从手机转向左边，跟着 ETH 跳向容器；眼睛睁大，嘴张开成欣喜的笑；一只鳍一直拿着手机。最后视线落在容器上，不看镜头。 |
| 收益增长 | 看着容器，脸逐渐亮起来，变成开心的笑。质押之后不再出现担心的下弯嘴。 |
| 惊喜 | 抬头看漂浮在容器上方的小 ETH，眼睛睁得很大、闪着光，张嘴大笑；身体因为兴奋微微上抬。 |
| 幻想 | 头微微抬起，望向前上方，笑容梦幻、眼神柔和；随后两只眼里各出现一点亮光（星星眼），脸上一下子充满兴奋。星星眼是黑瞳加白色星芒，变成琥珀暖色就是瑕疵。 |
| 开心跳起 | 先往坐垫里微微一压，再整个圆身体弹起来（约半个身高），两只鳍举着手机；落回同一个坐垫时轻轻一压，再跳一下（低一点），然后坐稳，眼睛闪光、张嘴大笑、轻轻摇晃。**没有腿，所以要写成整个身体弹起、落下。** |

**表演的写法要点**（Seedance 2.5 实测）：

- 点头写成「头稍微往前低下，再慢慢抬回」（lowers its head slightly forward, then slowly raises it back），加 small、slow。只写 nod 会被演成快速后仰。
- 轻点写「每次一样大」（each tap the same size），或者只写一两次，否则会越点越小。
- 不要写「鳍在屏幕上滑」。写「拿手机的鳍尖在屏幕下三分之一轻推一两下」，并写明两只鳍短圆、贴近身体。
- 不要描述「以首帧为终点」的变化。首帧已经睁着眼，就不要再写「眼睛慢慢睁大」，否则模型会倒推着从半闭眼开始演，眼睑变厚、像眉弓。要么用首尾帧，要么写「眼睛已睁开，再略睁大一点」。
- 动作写成带秒数的连续渐变（gradually, throughout），重要动作放在第 1–3 秒，最后 1 秒只写「保持」。
- 动作要对上界面节拍时，以「鳍碰到手机的那一帧」为准，不是抬手悬停的那一帧（两者差约 0.33 秒）。

## 8. 梦境造型（幻想气泡）

- 气泡里是**同一个 Bulu、同样的 3D 质感**，只换光：明亮温暖的日光，色板是碧蓝的海、白沙、天蓝和暖金。
- 服装：浅色短袖热带印花衬衫，深色墨镜。（Bulu 没有耳朵，墨镜腿悬在脸外，这是已知的小问题，已接受。）
- 场景一：头等舱。宽大的奶白皮座椅，鳍搭在扶手上，椭圆舷窗外是阳光下的云海，小桌上一杯橙汁。
- 场景二：海滩。白色躺椅、白色遮阳伞，鳍捧着插吸管的青椰子，棕榈树和海浪。
- **不能出现**：品牌、logo、航空公司标识或涂装；酒精饮料；手机、ETH、容器、光带；Bulu 以外的人。
- 梦境的 prompt 要删掉 BULU 模块里关于手机的句子，负面段也换成精简的梦境版本（不写手机和 ETH）。

## 9. Prompt 原文

### 9.1 规则

1. **prompt 一律用英文**，原样粘贴、一字不改。模块的中文解释只供阅读，不放进 prompt。
2. **按模块组装**，画面里有什么才加什么模块：

| 用途 | 组装顺序 |
|---|---|
| 新关键帧 | CORE → ROOM 或 DREAM → 机位模块 → BULU（及 ETH / VAULT / LINK）→ 镜头描述 → NEGATIVE |
| 修帧 | EDIT → CORE-S → 改动涉及的角色模块 → NEGATIVE |
| 视频 | CORE-S → 镜头描述（动作）→ MOTION → NEGATIVE-S |

3. 镜头描述只写看得见的东西（位置、动作、光），不写「象征」「表达」这类意图词，意图词会被画成画面上的字。
4. 画面里**不出现任何文字或数字**，所有文案、数字、界面都在后期叠加。
5. 视频 prompt 只写首帧里真实存在的东西。首帧里没拍到头顶，就不要写角；首帧里没有窗，就删掉模块里关于窗的句子。

### 9.2 BULU（当前写法）

画面里有 Bulu 时必加。2026-10-07 起在用的版本：加了「没有脚、肚子落在坐垫上」，删掉了鳍长 1/4 和拿手机那句（拿不拿手机写进镜头描述）。表情词（`a small happy smile`）按镜头替换。

```text
Bulu: a round, chubby blue whale mascot. No legs, no feet, no arms, no hands, no fingers: only two short rounded side fins; the round cream-white belly rests directly on the sofa cushion. Vivid saturated azure-cobalt blue skin, perfectly smooth and clean like a premium vinyl toy, with a soft satin sheen, gentle specular highlights and crisp edges; no fuzz, no plush, felt or velvet texture, no grain; a cream-white belly; a small round pink blush on each cheek; two large, round, glossy black eyes of exactly equal size, each with a white highlight; a small happy smile; a curled tail at the back. One short cone-shaped horn on top of the head: blue at the base, green at the tip.
```

### 9.3 CORE（新关键帧开头）

```text
Premium 3D animated commercial, cinematic still. Stylized toy-like 3D characters with smooth, clean vinyl-toy surfaces: crisp silhouettes, a soft satin sheen with gentle specular highlights, no fuzz, no plush or fabric texture, no grain, rendered into a photorealistic modern high-rise apartment. Night, but well exposed like a premium commercial: medium-low key, shadows deep navy yet full of visible detail, never crushed to black; the subject is clearly and brightly lit. The key light is the cool blue glow of a phone screen or a glass crystal, softly lighting faces and surfaces nearby; one dimmed warm amber floor lamp (about 2700K) at the edge of the room adds a cool-warm contrast. Floor-to-ceiling windows show a softly defocused night city skyline: blue-lit towers, warm bokeh lights, reflections on a river. 35-50mm lens, shallow depth of field, gentle bloom around light sources, shadows lifted to deep navy rather than pure black; overall brightness similar to a well-lit evening interior photo: mid-tones clearly visible, the darkest areas deep navy with detail. A clean, noise-free, naturally soft render with no oversharpening. Palette: navy, cobalt blue, ice blue, cream white, with small warm amber accents. Mood: quiet, calm, restrained, premium. The main subject sits within the central third of the frame, with clean space around it.
```

### 9.4 CORE-S（修帧和视频开头，当前写法）

修帧、重绘关键帧时用这一版（比 Style Block 原文去掉了浅景深，并把 naturally soft 改为 naturally sharp，让 Bulu 更清晰）：

```text
Premium 3D animated commercial, cinematic. Toy-like 3D characters with smooth, clean vinyl-toy surfaces (crisp edges, soft satin sheen, no fuzz, no plush texture, no grain) in a photorealistic high-rise apartment at night, well exposed: deep navy shadows with visible detail, subject clearly lit, cool blue key light from a phone screen or glass crystal, one dimmed warm amber floor lamp at the edge of the room, defocused night skyline through floor-to-ceiling windows. Gentle bloom. Clean, noise-free, naturally sharp render. Quiet, calm, premium.
```

视频 prompt 用这一版：

```text
Premium 3D animated commercial, cinematic. Toy-like 3D characters with smooth, clean vinyl-toy surfaces (crisp edges, soft satin sheen, no fuzz, no plush texture, no grain) in a photorealistic high-rise apartment at night, well exposed: deep navy shadows with visible detail, subject clearly lit, cool blue key light from a phone screen or glass crystal, one dimmed warm amber floor lamp at the edge of the room, defocused night skyline through floor-to-ceiling windows. Gentle bloom. Clean, noise-free, crisp render. Quiet, calm, premium.
```

### 9.5 ROOM（客厅，梦境以外的镜头都加）

Style Block 原文写的是泰迪绒毛毯。2026-10-07 起重绘的帧都改成了细针织毯，复用时把毯子那句换成第 9.10 节第 3 条的写法。

```text
Set: the same high-rise living room at night in every shot. A compact two-seat deep charcoal-navy fabric sofa stands with its back to a wall of floor-to-ceiling windows with thin black vertical mullions; the glass wraps around the corner beyond the other end of the sofa and shows the night skyline over a river. Bulu sits at one end of the sofa, against the armrest. Right beside Bulu's armrest stands a small round dark-wood side table; behind it, in the corner, a slim floor lamp with a warm amber shade, dimmed, the only warm light in the room, next to a potted plant and a gathered sheer curtain. A chunky navy teddy-fleece blanket is draped across both seats and bunched into a soft nest on the other seat. Beyond the other armrest, by the corner glass, a round black side table with a dark mug and two books. In front of the sofa, a round black marble coffee table with nothing on it. No TV, no console, no table lamps, no other furniture.
```

### 9.6 机位模块（常用两条）

A 主机位：

```text
Camera A, locked-off: low three-quarter front view from the front-left of the sofa, camera slightly below Bulu's eye level, 40mm, level. Left to right: a warm floor-lamp glow at the top-left corner; a small round dark-wood side table right beside the near armrest; Bulu on the near seat, centered, body turned toward the camera; the blanket nest on the far seat; a round black side table with a dark mug at the right. Behind the sofa, floor-to-ceiling windows fill the whole background and wrap around the corner at the right, with the softly defocused night skyline. Open space above Bulu's head.
```

A 机位必加的尺寸短句：

```text
The ETH crystal is about one third of Bulu's seated height; the vault is about half of Bulu's height.
```

面部特写：

```text
Camera A, same position, 100mm: close-up of Bulu's face seen slightly from the front-left, the phone low at the right edge of the frame; behind, defocused cool city bokeh through the window; no warm light in the frame.
```

过肩近景：

```text
Camera B, locked-off close-up from just beside Bulu's shoulder, at the height of its horn base, looking down along the sofa toward its far end: Bulu's soft blue cheek and horn at the left, the phone cradled between its fins sharp at the center, its screen an even cool-blue glow; behind, out of focus, the far armrest, a round black side table with a dark mug and two books, and the corner window with the night skyline at the right; one small warm bokeh at the upper left.
```

### 9.7 DREAM（只用于幻想气泡里的画面）

```text
Inside the dream only: bright, warm, sunny daylight; airy, soft golden-white light; palette of turquoise sea, white sand, sky blue and warm gold. Same 3D render quality and the same Bulu design as the rest of the film. In the dream, Bulu wears a light short-sleeve tropical print shirt and dark sunglasses. No brands, no logos, no airline markings or liveries, no alcohol.
```

气泡外框（合成时用）：

```text
A large translucent thought bubble with soft iridescent edges, with two or three small bubbles trailing down to the top of Bulu's head.
```

### 9.8 NEGATIVE（关键帧、修帧结尾）

通用版：

```text
No text, letters, numbers, symbols, "Z" or "zzz" marks, logos, watermarks, captions or user-interface elements anywhere in the image; the only exception is the small shield-and-keyhole shape embossed on the vault base. Any phone screen shows only a soft, even, cool-blue glow with nothing on it. The phone is a generic unbranded smartphone: plain back with one small round camera, no multi-lens camera module, no notch, no dynamic island. The phone never floats in the air. No extra characters. No more ETH crystals than the stated count; no cracked, split or misaligned crystal halves. Keep the night-time apartment setting unless the shot states otherwise; no warm windowless interior. No film grain, no noise, no oversharpening, no crinkled or crumpled-looking fabric texture.
```

质押前、画面里只有 1 颗 ETH 的镜头用这一版：

```text
No text, letters, numbers, symbols, logos, watermarks, captions or user-interface elements anywhere in the image. No extra characters. Exactly one ETH crystal in the image: the sleeping one in the blanket; no glass vault, no crystals anywhere else, no "Z" marks. No film grain, no noise, no oversharpening, no crinkled or crumpled-looking fabric texture.
```

### 9.9 MOTION 和 NEGATIVE-S（视频）

```text
Locked-off camera: the camera does not move at all, no pan, no tilt, no zoom, no push-in, no handheld shake. Single continuous shot: no cuts, no cross-dissolves, no scene change. Only the characters' performance and the light change. Character identity and proportions stay stable throughout; no morphing, no flicker, no new objects appearing unless stated.
```

NEGATIVE-S 当前写法（ETH 那句按镜头改）：

```text
No text, letters, numbers, "Z" marks, logos or interface elements anywhere. Generic phone, screen facing Bulu; the camera sees its plain dark back. Phone never floats. Bulu has fins only, no arms, no hands, no fingers, no legs, no feet, no eyebrows. ETH crystal halves stay aligned; exactly one ETH crystal, sleeping on the blanket; no glass vault, no crystals anywhere else.
```

### 9.10 修帧常用条目

修帧开头（一次只改一处）：

```text
Edit the input image. Keep everything unchanged except the one change named below, including composition, camera angle, framing, lighting, background, Bulu's design, and the ETH crystal. Change only: <one change>.
```

把旧的毛绒、模糊、偏暗关键帧重绘成当前标准，放在「Change only:」后面：

```text
1. Re-render the whole image at native 4K with crisp, clean detail: Bulu, the blanket, the sofa, the calendar and the table are tack-sharp and in focus. Correctly exposed at render time like a well-lit premium commercial night interior: clear mid-tones, Bulu brightly and evenly lit, shadows deep navy but full of detail; not a dark underexposed image, no murky lifted blacks, no haze, no noise, no grain, no blur, no oversharpening halos. Only the far skyline is softly defocused.
2. Bulu's surface becomes a smooth, clean premium vinyl toy: perfectly smooth skin with a soft satin sheen, gentle specular highlights and crisp edges. Remove all fuzz, plush, felt or velvet texture from Bulu.
3. The blanket becomes a soft, smooth, fine-knit throw with gentle folds and a subtle fine texture; no curly sherpa, fleece, boucle or teddy loops. The sofa upholstery becomes a smooth, fine, tightly woven fabric with a soft sheen; no coarse, nubby or grainy weave.
```

统一手机外观：

```text
Bulu holds the phone upright in front of its belly with both fins, the screen facing Bulu and the plain back of the phone facing the camera. The phone is a generic unbranded smartphone with a plain dark blue-grey back, rounded corners and one small round camera at the top corner. No multi-lens camera module, not silver, no logo. The screen is not visible to the camera; only a soft cool-blue glow from the screen lights Bulu's face and belly from below.
```

去掉长出来的脚（在关键帧上修，修好再生成视频）：

```text
Edit the input image. Change only one thing: Bulu, the blue whale mascot sitting on the left end of the sofa, must have no legs and no feet. Remove the short rounded leg / foot that sticks out under Bulu's fin at the lower left of its body, and any leg or foot on the other side. Bulu's body ends in a smooth, round, cream-white belly bottom that rests directly on the sofa cushion, like a soft round toy sitting on a cushion; where the foot was, show the smooth blue side of Bulu's round body curving down into the cushion and the navy sofa cushion itself. Keep Bulu's two short rounded side fins exactly as they are (one fin holds the phone), keep the curled tail at the back exactly as it is.

Keep everything else exactly unchanged, pixel for pixel where possible: the composition, camera angle and framing, Bulu's size, position, head, horn, face, eyes, blush, colour and smooth vinyl surface, the phone, the sofa, the fine-knit blanket and the sleeping ETH crystal in it, the floor lamp, the plant, the side tables, the mug and books, the blank desk calendar, the marble table, the windows and the night skyline, the lighting and exposure. Native 4K, crisp and clean, no noise, no grain, no blur.
```

视频里保持无腿（Bulu 坐着、有手部动作时，写进镜头描述）。这句据去腿重生成那条视频的 prompt 改写：原文结尾是 `also while Bulu scrolls`，为了避开「鳍在屏幕上滑」的写法改成了 `moves its fins`，改写版还没有单独测试过：

```text
Bulu has no legs and no feet: the bottom of its round body is a smooth cream-white belly resting directly on the sofa cushion, exactly as in the first frame, and it stays that way the whole time, also while Bulu moves its fins.
```

## 10. 生成流程

### 10.1 关键帧

1. **选输入底图**：用已审批的同机位母图或关键帧做 edit，不从零生成。
2. **带参考图**：把两张 Bulu 标准图（第 13 节）作为参考图一起输入，只用来锁定 Bulu 的造型、质感和颜色。标准图里的手机界面、悬浮的手机和多余的 ETH 不要照抄。
3. **写 prompt**：「Edit the input image. Keep <不变清单> unchanged. Change only:」+ 编号改动清单 + CORE-S + BULU + NEGATIVE（写明 ETH 数量）。
4. **模型**：新关键帧用 ChatGPT Images（GPT Image 2，quality high，3840×2160），一次出 2 张选 1 张。局部修帧用 Nano Banana Pro（LibTV 里叫 General image Pro）。这些模型都没有蒙版，会整张重画；只想改一块时，取重画结果里修好的那块，对齐后羽化贴回原图，再按原图调色（重画的图通常更软、黑位更高、略偏紫）。贴回时不要动 Bulu，除非这次改的就是 Bulu。
5. **选图**：对照标准图看清晰度和颜色，再按第 12 节逐项检查。

### 10.2 视频

1. **首帧用已审批的关键帧**。不要直接拿参考图做图生视频，没有首帧锁定时，模型会改造型、换道具。
2. prompt = CORE-S（视频版）+ 镜头描述 + MOTION + NEGATIVE-S。镜头描述按第 7 节的写法要点来。
3. 晶体、容器在 AI 视频里写成「完全静止、光晕恒定」，只让 Bulu 动；晶体的呼吸、脉动、漂浮都在后期图层里做（见 [Remotion 动画与合成规范](03-remotion.md)）。
4. 模型和参数见 [LibTV 画布分析与使用](04-libtv-canvas.md)：Seedance 2.5，单图首帧，16:9，固定机位。修改阶段用 720p、一次 1 条；确认后再出 1080p。

## 11. 常见问题和处理

| 问题 | 原因 | 处理 |
|---|---|---|
| 长出眉毛 | prompt 写了 brows 之类不存在的部位 | 只写眼睛和嘴，加 no eyebrows。已经生成的，后期擦掉，不用重跑。 |
| 长出脚或膝盖 | 关键帧里就带脚，视频和后续重绘都会保留 | **在关键帧上去掉脚**（第 9.10 节），再用「全程无腿无脚」的 prompt 重跑整条视频。逐帧修补在动作帧里会发糊，用视频重画去脚反而会画出更多脚，都不要用。 |
| 鳍像手臂 | 写了「鳍在屏幕上滑」 | 改成鳍尖在屏幕下三分之一轻推；写明两只鳍短圆、贴近身体。 |
| 两只角、全蓝的角、耳鳍 | 首帧没拍到头顶，prompt 却写了角 | 只写首帧里有的部位；需要角时重出能看到头顶的关键帧。 |
| 毛绒、颗粒、发糊 | 旧写法（微颗粒、桃皮）、反复提亮、裁切放大 | 用当前的 BULU / CORE-S；源头 4K 出图、不提亮、不裁切放大。旧底片可以后期去毛绒（见下）。 |
| 头被画扁 | 侧身握手机的机位 | 改正面或 3/4 正面；prompt 写 head stays perfectly round and full, facing the camera。 |
| 眨眼变形、身体被拉长 | 视频模型的随机问题 | 换一条，或者剪辑时避开那几帧。 |
| 质押后还是担心的嘴 | 首帧表情没改 | 首帧改成好奇或开心；已生成的可以后期把嘴线上下翻转成微笑。 |
| 负面段没用 | 视频模型基本不理负面词 | 要去掉的东西先从关键帧里去掉。 |

**旧底片的后期去毛绒**（只用于 2026-10-06 之前生成、带毛绒感的底片；新生成的帧应该一出来就是光滑的）：

1. 遮罩：在手工框定的范围里用 GrabCut 求出 Bulu 的完整剪影，羽化 1.5 px，前后 5 帧做时间平滑。只按颜色阈值做遮罩会漏掉背光面，留下接缝。
2. 去颗粒：多帧降噪（OpenCV `fastNlMeansDenoisingColoredMulti`，前后共 5 帧，h = 7）。
3. 提清晰度：只在轮廓和五官上做 USM 锐化（半径 1.4，强度 0.7），平坦的皮肤不锐化；不要加大半径的局部对比，会把降噪留下的斑块放大成大理石纹。
4. 提颜色：只动蓝色像素，饱和度向标准图靠（系数 1.0–1.35），阴影略压深。在浮点 RGB 里计算，并加一点抖动，避免色带。

## 12. 检查清单

每张关键帧、每条视频（重点看动作帧：滑手机、点击、抬头、跳跃）都过一遍：

- [ ] 表面光滑、锐利，像搪胶玩具；不毛绒、不糊；颜色和标准图一致。
- [ ] 没有腿、脚或膝盖状凸起（重点看左鳍下方和拿手机的鳍下方）。
- [ ] 只有两只短圆的鳍，不像手臂，不遮嘴。
- [ ] 只有一只角，蓝底绿尖；没有耳鳍。
- [ ] 眼睛左右对称、大小一样；没有眉毛和眉弓。
- [ ] 奶白肚子、粉色腮红都在；尾巴是卷尾，位置不跳。
- [ ] 头圆、不扁；身体没有被拉伸变形。
- [ ] 视线落点和镜头设计一致。
- [ ] 手机是单摄深色背壳，不悬空；道具和前后镜头一致。
- [ ] 画面里没有任何文字、数字、zZ。

## 13. 参考素材

| 素材 | 看什么 | 在哪 |
|---|---|---|
| Bulu 标准图 · 过肩看手机 | **当前的颜色和质感标准**：饱和亮蓝、光滑的皮肤、一只角（蓝底绿尖）、大眼睛、腮红、一只圆鳍托着手机。图里的手机有刘海和行情界面，不能照抄。 | 向 Wilson 索取（原图是同事用 ChatGPT 生成的两张图） |
| Bulu 标准图 · 沙发全身 | **当前的造型标准**：全身 3/4 正面，奶白大肚子直接落在坐垫上，没有腿；画左是钩状卷尾；张嘴笑。图里悬浮的手机、能量旋涡和漂浮的 ETH 都不能照抄。 | 同上 |
| 画布「00_REF」分组 | Bulu 的三视图、两视图身份参考，以及容器的主视觉参考。 | LibTV「画布 1」 |
| 当前标准下的已审批关键帧 | 光滑搪胶的成片 Bulu，新视频可以优先拿来做首帧或参考：`S01_KF_cover_v01_gpt-2`（封面）、`S02_KF_regen_v05_gpt-2`（过肩）、`S04_KF_nolegs_v03_gpt-1`（沙发、无腿）、`S08_KF_redraw_v04_gpt-1`（A 机位正面）、`S12_KF_jump_v03_gpt-2`（跳起）。 | LibTV「画布 1」同名节点 |
| 较早的关键帧 | 焦虑、发现、ETH 醒来、增长、惊喜、气泡和两张梦境帧。造型、表情、构图可以参考，但质感是旧标准（偏绒），复用前要按第 9.10 节重绘。 | LibTV「画布 1」 |

## 14. 尚未定论

以下几点还没有正式结论，遇到时先问负责人：

- 鳍长的明确上限（目前写 1/4，实际接受过约 1/3）。
- 除片尾外是否一律不看镜头。
- 梦境帧和气泡帧要不要先按当前标准重绘。
- 是否补一张 Bulu 角色设定图（正面、侧面、3/4、多种表情）来锁定身份。

---

来源：Wilson 的视频项目里的 Style Block v1.6（`refs/style-block.md`）、项目规则（`CLAUDE.md` 第 4 节）、空间与机位（`docs/08`）、关键帧审查（`docs/10`）、制作报告（`docs/11`、`docs/13`）、各镜头 prompt（`prompts/`）和后期脚本（`tools/bulu_deplush.py` 等）。2026-10-15 整理。
