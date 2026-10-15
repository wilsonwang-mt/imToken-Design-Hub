# 视频制作技巧及规范 · 合集

> 「Bulu 与沉睡的 ETH」制作规范的合集：总览加五份规范，按建议的阅读顺序排列（总览 → Bulu → ETH 与容器 → LibTV 画布 → Remotion → 配音）。每份也可以单独下载；文中指向其他规范的链接，在合集里对应下面的同名章节。

---

# 视频制作技巧及规范 · 总览

> **适用**：要用「Bulu 与沉睡的 ETH」的画布、素材和风格做下一支视频的同事，以及同事的 Claude。
> **版本**：2026-10-15。这套规范从成片（中文版 10-08、英文版 10-12）的实际做法整理而来，旧文档和画布上旧节点的 prompt 里和它冲突的写法，以这套规范为准。

## 1. 怎么用这套规范

一共五份规范，每份都能单独阅读：

| 文档 | 管什么 |
|---|---|
| [01 · Bulu 形象规范](01-bulu.md) | Bulu 的造型、表面质感、颜色、表情、生图 prompt 和检查清单。 |
| [02 · ETH 晶体与质押容器规范](02-eth-vault.md) | 视觉语法：ETH 的数量、大小、亮度各代表什么；质押容器、光带、奖励小 ETH、增量计数器。 |
| [03 · Remotion 动画与合成规范](03-remotion.md) | AI 只做固定机位的底片，运镜、界面、数字、字幕、声音都在 Remotion 里做；渲染和交付。 |
| [04 · LibTV 画布分析与使用](04-libtv-canvas.md) | 画布里有什么、每个镜头的终版是哪条，模型参数、协作规则，以及从这张画布开始新视频的步骤。 |
| [05 · imToken 配音与发音规范](05-voiceover.md) | imToken 读作 /ɛm/ + token，TTS 写 MToken、字幕写 imToken；人声、生成、检查和后期。 |

**建议的阅读顺序**：本文 → 01 → 02 → 04 → 03 → 05。

**交给 Claude 时**：

- 最省事的是把合集文件（总览加五份规范，按阅读顺序合成一个文件）整份交给 Claude，让它先读完再动手。
- 规则的优先级：这套规范 > 画布上旧节点里的 prompt > 更早的文档。画布上的旧 prompt 里有已经作废的写法（例如 Bulu 的「微颗粒软触感」），复用前要按规范改。
- 每份规范开头都有一段「给 Claude 的说明」；「尚未定论」里列的事项，遇到时先问负责人。

## 2. 这支视频是怎么做出来的

59 秒，12 个镜头，从剧本到成片大致是这样一条流水线：

| 步骤 | 做什么 | 工具 |
|---|---|---|
| 1. 故事和视觉语法 | 11 个情节拆成 12 个镜头。先定下画面怎么讲质押：ETH 的数量代表持有量（质押前永远 1 颗、质押后只增不减），大小和表情代表市场情绪，亮度代表休眠或工作，光带代表掌控权。 | — |
| 2. 空间和机位 | 客厅按真实尺寸用代码搭白模，定下 7 个固定机位（A、A-CU、B、E、W、V、F）和物件从左到右的顺序，所有镜头共用。 | Three.js |
| 3. Style Block | 把风格写成模块化的英文 prompt（基础段、客厅、机位、Bulu、ETH、容器、光带、动作、负面约束），每次原样粘贴。 | — |
| 4. 关键帧 | 每个机位先出一张 4K 母图，其他镜头从母图派生、只修一次。含 Bulu 的图都带 Bulu 标准参考图。 | ChatGPT Images（GPT Image 2）；局部修图用 Nano Banana Pro |
| 5. 视频底片 | 用关键帧做首帧生成视频，固定机位、只让角色动。修改阶段 720p、一次 1 条，确认后出 1080p。 | LibTV · Seedance 2.5 |
| 6. 本地修补 | 能修就不重跑：重定时、局部贴回、去腿、擦眉毛、贴掉爆亮、旧底片去毛绒。 | Python + OpenCV + ffmpeg |
| 7. 合成 | 剪辑表驱动总装：片头标题、推送卡、App 界面、计数器、四季和牛熊、幻想气泡、奖励小 ETH、字幕、片尾。 | Remotion |
| 8. 声音 | 中英文配音、配乐、音效；旁白时音乐闪避，母带 −14 LUFS。 | 配音：LibTV · Minimax（中文）、Eleven V3（英文）；配乐：Eleven Music（前半段）、Google Lyria 3 Pro（后半段）；Remotion 混音 |
| 9. 交付 | 1920×1080、24 fps、H.264，中文版和英文版。 | — |

## 3. 最有用的十条经验

1. **AI 视频一律固定机位**。推拉、转场都在后期做，叠加的图层才对得准；ETH 跳进容器这类需要精确落位的动作，用首尾帧模式直接生成。
2. **AI 画面里不出现任何文字或数字**。所有文案、数字、界面都在后期叠加；prompt 里不写「象征」「表达」这类意图词，会被画成字。
3. **首帧决定一切**。视频模型会照着首帧演，prompt 和首帧冲突时往往 prompt 赢、画面走样。所以先把静帧修对（造型、道具、ETH 数量），prompt 只写首帧里有的东西。
4. **先复用，再生成**。重定时、定格、裁切、局部修补、后期图层能解决的，不重新生成。迭代时 720p、一次 1 条。
5. **晶体在 AI 视频里写成完全静止**。写「呼吸」「脉动」会被演成整颗爆亮；呼吸、脉动、漂浮都放到后期做。
6. **问题在关键帧上根治**。Bulu 长出脚、多出眉毛，最有效的办法是先修关键帧再重新生成，逐帧修补在动作帧上会发糊。
7. **Bulu 是光滑锐利的搪胶玩具，没有腿、没有手臂、没有眉毛**。生图时一律带 Bulu 标准参考图。
8. **动作对界面时，对的是接触帧**（鳍碰到手机的那一帧），不是抬手悬停的那一帧。
9. **每条新视频都和前后镜头并排核对道具**：手机（单摄深色背壳）、容器（盾牌锁孔和光环）、杯子、书、毯子。没有首帧锁定时，模型会自己发明道具。
10. **品牌名只有一种读法**：/ɛm/ + token 连读，字幕写 imToken；英文 TTS 写 MToken，中文配音先各出 MToken 和 Am-Token 两种写法对比后再定。

## 4. 硬规则速查

| 类别 | 规则 |
|---|---|
| ETH 数量 | 质押前画面里永远只有 1 颗；质押后只增不减。 |
| ETH 大小和表情 | 只在牛熊段落随价格变化，结尾回到原样，不代表收益。 |
| 奖励小 ETH | 形状颜色和主 ETH 相同、明显更小、不带表情；只在容器上方或容器和 Bulu 之间；出现得要慢。 |
| 容器和光带 | 容器始终在 Bulu 身边的小边几上；光带连着容器和手机，任何时候都不断开。 |
| 计数器 | 只显示增量，带「示意数值」；计数器和文案都不出现持仓总数（成片开场手机界面里的 ETH 余额是特意保留的界面内容）。 |
| 画面文字 | AI 画面里没有任何文字、数字、logo、zZ；唯一例外是容器底座的盾牌锁孔形状。 |
| Bulu | 光滑锐利的搪胶质感；没有腿、脚、手臂、眉毛；一只蓝底绿尖的角；颜色饱和鲜亮。 |
| 道具 | 手机是无品牌通用机型、单摄、深色背壳，永远不悬空。 |
| 机位 | AI 视频固定机位，不写运镜。 |
| 文案口径 | 说「imToken 质押」「掌控权始终在你手上」；不说原生质押、32 ETH、锁定，不说「ETH 不离开你的钱包」。 |
| 品牌名 | /ɛm/ + token；字幕写 imToken；英文 TTS 写 MToken（中文先对比 MToken 和 Am-Token）；英文产品名 imToken Stake。 |

## 5. 开始之前要和 Wilson 确认的事

1. **画布访问**：用哪个账号打开 LibTV「画布 1」，在原画布上新建分组还是复制一张新画布，用哪份积分。
2. **Bulu 标准参考图**：两张同事用 ChatGPT 生成的 Bulu 图是当前的造型、质感和颜色标准，确认它们在画布上，或者向 Wilson 要原图。
3. **合成工程**：Remotion 合成工程和本地修补脚本在 Wilson 的视频项目里，需要复用时向他要。
4. 各份规范「尚未定论」里列出的事项。

## 6. 相关链接

- 项目页：Stake 视频制作（本站「项目追踪」），里面有故事、视觉语法、制作进度和成片链接。
- LibTV「画布 1」：<https://www.liblib.tv/canvas?projectId=e607d3cb38ce4d11af65a4ea22175eab&spaceId=10324282>（需要登录）。

---

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

---

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

---

# LibTV 画布分析与使用

> **适用**：要在 LibTV「画布 1」上，用这支片子的素材、片段和风格做一支新视频的同事，以及同事的 Claude。
> **版本**：2026-10-15。画布结构依据 10-01 的完整快照，10-02 之后的变化依据各镜头的生成记录和终版底片清单整理；Wilson 10-05 在网页里手动重排过节点位置，**最新布局以画布本身为准**。
> **给 Claude 的说明**：先读第 1 节和第 6 节（协作规则），再动画布。生成会消耗积分；删除画布上的原有节点不可恢复。拿不准的操作先问 Wilson。

## 1. 开始之前要确认的事

这几件事不在本文的决定范围内，开工前先和 Wilson 确认：

1. **用哪个账号访问画布**。画布在 Wilson 使用的 LibTV 账号下，同事的账号能不能打开、能不能编辑，要先确认。
2. **在哪里做新视频**：直接在「画布 1」上新建分组，还是复制一张新画布。本文默认是前者，并按第 6 节的规则协作。
3. **用哪份积分**，以及生图走 LibTV 还是另外的工具。
4. **Bulu 标准参考图**（两张同事用 ChatGPT 生成的图）在不在画布上；不在的话，向 Wilson 要原图并上传。

画布地址：<https://www.liblib.tv/canvas?projectId=e607d3cb38ce4d11af65a4ea22175eab&spaceId=10324282>（需要登录）。注意分享链接（`/canvas/share?...`）是只读视图，拖不动节点，编辑要用上面这个地址。

## 2. 画布是怎么来的

- 「画布 1」是这支片子**唯一的共享视频生成画布**，12 个镜头（S01–S12）的 AI 视频底片都在这里生成。
- 它是从同事更早的一张画布复制来的，复制得不完整：有些上游节点只存在于那张源画布里。所以**画布上同事的原有节点一个都不要删**。
- 配音、配乐、音效在另一张单独的音频画布「Bulu 音频 · 配音配乐 2026-10-06」上生成，**不要在视频画布上跑音频**。

## 3. 画布结构

整体排版：左边是参考区和归档区，中间是早期源帧，右边是各镜头的生成链，连线都朝右。

### 3.1 分组

| 分组 | 内容 | 怎么用 |
|---|---|---|
| `00_REF` | Bulu 三视图（主身份参考）、Bulu 双视图（被 2 个 prompt 引用，不能删）、`REF_kv-container_src`（主视觉「Stake, under your control」里的容器）。 | 三视图、双视图早于当前的光滑搪胶标准，**只用来锁定 Bulu 的外形**，质感和颜色以 Bulu 标准图为准。容器图用来锁定造型，图里漂在容器外的小 ETH 不要照搬。 |
| `01_V1_SOURCE` | 同事最早用 ChatGPT 出的 14 张关键帧（3 行 × 5 列，按镜头顺序），第 4 行是四季窗景（`S04_KF_window-spring/summer/autumn/winter_src`）。 | 只作风格源头参考，**不要拿来做首帧**：大部分手机是三摄或带灵动岛、屏幕上有字，有几张 ETH 上下错位、手机悬浮，房间布局也是旧的。 |
| `02_LAYOUT_REF` | Three.js 白模的各机位构图参考（`REF_layout_A_pre`、`A_post`、`A-CU_pre`、`E_pre`、`W-E_pre`、`W-W_post`、`V_post`、`F_post`），以及 ETH 和容器的标准几何（`REF_geom_eth_yaw30_elev8`、`REF_geom_eth_yaw30_elev35`、`REF_geom_vault_yaw35_elev20`）。 | 新镜头的构图、物件左右顺序，以及 ETH、容器的形状，都以这一组为准。 |
| `S01`–`S12` | 各镜头的关键帧和视频节点。 | 每个镜头的终版见第 3.3 节。 |
| `99_ARCHIVE` | 弃用的节点。 | 不用。 |

### 3.2 命名规则

节点名格式是 `<范围>_<类别>_<描述>_<版本>`，只用 ASCII，**全画布唯一**：

- 范围：`REF`（通用参考）、`S01`–`S12`；两个镜头共用一条时写成 `S03S04` 这样的形式。
- 类别：`KF`（关键帧）、`VID`（视频）。
- 版本：`src`（上传的原图）、`v01`、`v02`……（派生版本）；视频用 `t01`、`t02`……
- 常见的扩展写法：`_final_v07`（定稿首帧）、`_gpt-1` / `_gpt-2`（外部 GPT Image 生成后上传的图）、`_regen_vNN`、`_redraw_vNN`、`_cover_vNN`、`_jump_vNN`、`_vedit_nolegs_vNN`（视频编辑）、`_fix-…`（修图）。
- 一个节点出了多张时，用的是第几张不写进节点名，只写在下载的文件名里：图片用 `-1` 到 `-4`，视频用 `_1`、`_2`。
- 弃用的节点加 `ARC_` 前缀，节点和连线都保留。
- 上传的图片节点改不了名（CLI 报错，网页也没有入口），有些还保留着原始文件名，只能靠分组识别。所以**上传时一开始就起好规范的名字**。

### 3.3 每个镜头的终版

成片里每个镜头最终用的是下面这些节点（括号里是这个节点出的第几条）。注意：S06、S07、S09、S10、S11a、S11b 的节点是 10-05 前后按旧质感出的原始结果，Bulu 偏软、偏绒；成片用的是本地后期处理（去毛绒、修补）过的底片，需要时向 Wilson 要。

| 镜头 | 内容 | 终版节点 | 说明 |
|---|---|---|---|
| S01 | 开场，Bulu 看手机 | `S01_VID_cover_v09` | 首帧 `S01_KF_cover_v01_gpt-2`（4K，左侧留出标题位置）；Seedance 2.5，1080p，5 秒 |
| S02 | 过肩看行情 | `S02_VID_regen_v05` | 首帧 `S02_KF_regen_v05_gpt-2`（手机屏幕是深色，界面后期合成）；6 秒，重定时到 5 秒 |
| S03 + S04 | ETH 沉睡、四季和牛熊 | `S03S04_VID_regen_v04` | 首帧 `S04_KF_nolegs_v03_gpt-1`（已去腿的底图）；一条 15 秒底片拆成两个镜头，牛熊段落在后期合成 |
| S05 | （已并入 S04） | — | 不单独生成 |
| S06 | 焦虑 | `S06_VID_t03`（第 2 条） | 首帧 `S06_KF_final_v07`；4 秒 |
| S07 | 发现 App | `S07_VID_t02`（第 2 条） | 本地修补过（擦掉了眼睛上方的鼓棱）；剪辑段从 0.83 秒开始 |
| S08 | 在 App 里操作 | `S08_VID_redraw_v04` | 首帧 `S08_KF_redraw_v04_gpt-1`（A 机位正面中景）；6 秒，三次点击重定时到 1、2、3 秒 |
| S09 | ETH 醒来跳进容器 | `S09_VID_t03`（第 1 条） | **首尾帧模式**：首帧 `S09_KF_A_master_pre_v01`，尾帧 `S09_KF_A_master_post_v02`；5 秒 |
| S10 | 收益增长（容器特写） | `S10a_VID_t02`（第 2 条）+ `S10b_VID_t03`（第 2 条） | 两条硬切接在一起，都本地修补过；状态仍是临时版 |
| S11a | 惊喜 | `S11a_VID_t04`（第 2 条） | 先用修图把画面里的晶体去掉，奖励小 ETH 由脚本叠加 |
| S11b | 幻想气泡 | 底片 `S11b_VID_t02`（第 2 条）+ 后期合成 | 底片是 F 机位无气泡的版本；两段梦境是 `S11-firstclass_VID_t01`、`S11-beach_VID_t01` |
| S12 | 开心跳起 | `S12_VID_jump_v02` | 首帧 `S12_KF_jump_v03_gpt-2`（4K）；5 秒，奖励小 ETH 由脚本叠加 |

**可以复用的母图**：

- A 机位的质押前、质押后母图（`S09_KF_A_master_pre_v01`、`S09_KF_A_master_post_v02`）：构图和环境可以直接用，容器放大后的 A 机位构图以后者为准。但它们是 10-05 按旧写法出的，Bulu 还是软触感质感，**不能直接当首帧**；拿来做 edit 底图时，带上 Bulu 标准图把 Bulu 重绘成光滑搪胶（见 Bulu 规范第 9.10 节）。`S06_KF_final_v07` 同理。
- `S04_KF_nolegs_v03_gpt-1`：已经去腿、按当前标准出的沙发全景，可以直接用。
- 按当前标准出的其他关键帧见 Bulu 规范第 13 节。

## 4. 模型和参数

### 4.1 视频

| 项目 | 设置 |
|---|---|
| 模型 | **Seedance 2.5**（`-s 'model=Seedance 2.5'`）。积分充在它的模型卡里，Seedance 2.0 VIP 跑会报「算力不足」（错误码 1200000136，不扣费、不提交）。 |
| 模式 | 默认 `singleImage2video`（单张首帧）。只有需要精确落位时用 `frames2video`（首尾帧），例如 ETH 跳进容器。 |
| 比例 | **显式写 16:9**，不用 adaptive（会跟随参考图的比例）。 |
| 分辨率 | 修改阶段 **720p**；全部确认后再出 1080p（Seedance 2.5 最高 1080p）。 |
| 条数 | 修改阶段 **1 条**（`count=1`）。 |
| 时长 | 镜头时长 + 1 秒余量，最少 4 秒；单条一般不超过 8 秒，一个节点只写一个镜头、一个主要动作。 |
| 声音 | `enableSound` 关闭，声音统一在后期做。 |
| 联网扩写 | `search_enabled` 设为 0，否则后端会联网改写 prompt。 |

参数写法：

```text
-s 'model=Seedance 2.5'
-s modeType=singleImage2video
-s 'settings={"ratio":"16:9","resolution":"720p","duration":5,"enableSound":"off"}'
-s 'advancedSettings={"search_enabled":0,"autoCompliance":1}'
-s count=1
```

### 4.2 生图

- **关键帧基本不在 LibTV 里生成**：成片的关键帧是用外部的 ChatGPT Images（GPT Image 2，quality high，3840×2160）生成，再作为图片节点上传到画布当首帧。
- LibTV 的生图只用来修图：**General image Pro**（推断就是 Nano Banana Pro），image2image，4K，16:9，关闭联网。它会整张重画（画面变软、黑位抬高、略偏色、构图放大 0.5–0.8%），所以只取修好的那块，对齐后羽化贴回原图。
- 所有生图模型都**没有蒙版或局部重绘**。
- Lib Image 系列（推断是 GPT Image 系）1K 16:9 只有 1280×720，太小，不用来出关键帧。
- 参考图张数上限：General image Pro 7 张，Lib Image 系 14 张。

### 4.3 查模型参数

查 schema 时用 modelKey：`libtv model nebula-ultra`（用画布上的显示名查会返回 404）。但写参数时 `-s model=` 只接受显示名，例如 `General image Pro`、`Seedance 2.5`。CLI 不显示价格，也没有余额查询。

## 5. Prompt 和首帧

Prompt 的模块原文（CORE-S、MOTION、NEGATIVE-S、BULU、ETH、VAULT、LINK 等）见 [Bulu 形象规范](01-bulu.md) 第 9 节和 [ETH 晶体与质押容器规范](02-eth-vault.md) 第 8 节。这里只列和画布操作直接相关的规则：

1. **视频 prompt 的顺序**：CORE-S → 镜头描述（按秒写节拍）→ MOTION → NEGATIVE-S。英文，模块原样粘贴，全文控制在约 2500 字符以内。
2. **固定机位**：每条都加 MOTION 模块，不写任何运镜。推拉、转场都在后期做。
3. **画面里不出现文字**：不写「象征」「表达」这类意图词，意图会被画成屏幕上的字。
4. **首帧决定一切**：单张首帧模式会重绘首帧，prompt 和图冲突时往往是 prompt 赢。所以 prompt **只写首帧里真实存在的东西**；首帧里没有的环境（窗、灯、Bulu 的角），就从模块里删掉对应的句子。要改画面，先改关键帧，不要指望 prompt 去改。负面词基本不起作用。
5. **先把首帧修对**：道具（手机是单摄深色背壳）、Bulu（光滑锐利、没有腿）、ETH 的数量和形状，都在静帧上修好再生成。关键帧按正确曝光、原生 4K 生成；生成的视频整体会比首帧暗 3–5%（暗部压得最重），所以首帧的暗部要留出余量。
6. **首尾帧模式会严格对齐尾帧**，尾帧里的错误会带进整段，先把尾帧修对。
7. **尽量不用「只给参考图、不给首帧」的模式**：模型会自己发明道具（出现过银色三摄旗舰机）。不得不用时，交付前专门核对道具。
8. 晶体（主 ETH、小 ETH、容器）一律写「完全静止、光晕恒定」；Bulu 的动作写法见 Bulu 规范第 7 节。
9. Seedance 2.5 的输出相对首帧有固定的缩小：横向约 0.987，纵向约 0.97，右边和下边各有约 30 px 是模型补出来的。后期叠图层时，锚点在视频上重新测量，不要直接用关键帧上的坐标。

**完整范例**（S08 终版，单张首帧，6 秒）：

```text
Premium 3D animated commercial, cinematic. Toy-like 3D characters with smooth, clean vinyl-toy surfaces (crisp edges, soft satin sheen, no fuzz, no plush texture, no grain) in a photorealistic high-rise apartment at night, well exposed: deep navy shadows with visible detail, subject clearly lit, cool blue key light from a phone screen or glass crystal, one dimmed warm amber floor lamp at the edge of the room, defocused night skyline through floor-to-ceiling windows. Gentle bloom. Clean, noise-free, crisp render. Quiet, calm, premium.

Bulu, the blue whale mascot from the first frame, sits on the sofa holding the phone in front of its belly with both fins, looking down at the screen with focused curiosity. The phone screen faces Bulu; the camera sees only the plain dark back of the phone. At about 1 second, about 2 seconds and about 3 seconds, Bulu's right fin lifts a little and taps the screen once, lightly, at an even, unhurried pace, then returns to the phone. From 3 to 4.5 seconds Bulu holds still and watches the screen, eyes wide with anticipation. At about 4.5 seconds Bulu gives one small, slow, happy nod and a soft smile, and stays still. Its round body rises and falls very slightly with breathing throughout; the soft blue screen glow on its face stays steady. On the blanket at the right, the ETH crystal keeps sleeping with closed eyes, its glow breathing slowly and dimly; it does not move. The room does not move.

Locked-off camera: the camera does not move at all, no pan, no tilt, no zoom, no push-in, no handheld shake. Single continuous shot: no cuts, no cross-dissolves, no scene change. Only the characters' performance and the light change. Character identity and proportions stay stable throughout; Bulu's head stays round and full, facing the camera; no morphing, no flicker, no new objects appearing.

No text, letters, numbers, "Z" marks, logos or interface elements. Phone screen faces Bulu; generic phone with a plain dark blue-grey back and one small round camera, no multi-lens camera. Phone never floats. Bulu has fins only, no arms or hands, no legs, no feet. ETH crystal halves stay aligned; exactly one ETH crystal, sleeping in the blanket; no glass vault, no crystals anywhere else.
```

注意：这条终版 prompt 里写了 ETH 的光「慢慢呼吸」（its glow breathing slowly），这次碰巧没有爆亮；新写的时候按第 8 条，写成光晕恒定。

**完整范例**（S12 终版，质押后、容器在场，5 秒）：

```text
Premium 3D animated commercial, cinematic. Toy-like 3D characters with smooth, clean vinyl-toy surfaces (crisp edges, soft satin sheen, no fuzz, no plush texture, no grain) in a photorealistic high-rise apartment at night, well exposed: deep navy shadows with visible detail, subject clearly lit, cool blue key light from a phone screen or glass crystal, one dimmed warm amber floor lamp at the edge of the room, defocused night skyline through floor-to-ceiling windows. Gentle bloom. Clean, noise-free, crisp render. Quiet, calm, premium.

Bulu, the blue whale mascot from the first frame, is overjoyed. It squashes down slightly into the sofa cushion, then bounces straight up off the seat in one happy little hop, rising about half its own body height with the phone held up in its two fins, stretches a little at the top, then lands back on the same seat cushion with a soft squash; it hops once more, a little lower, lands, and settles, beaming with sparkling eyes and a big open smile, swaying gently. Bulu has no legs: the whole round body springs up and lands. The phone stays the same generic phone with a plain dark back and one small round camera the whole time. The thin ice-blue light ribbon from the glass vault stays connected to the phone the whole time. The glass vault, the crystal inside it, the floor lamp and the room do not move.

Locked-off camera: the camera does not move at all, no pan, no tilt, no zoom, no push-in, no handheld shake. Single continuous shot: no cuts, no cross-dissolves, no scene change. Only the characters' performance and the light change. Character identity and proportions stay stable throughout; no morphing, no flicker, no new objects appearing unless stated.

No text, letters, numbers, "Z" marks, logos or interface elements. Phone screen faces Bulu; generic phone with no multi-lens camera. Phone never floats. Bulu has fins only, no arms or hands, no legs, no feet. ETH crystal halves stay aligned; exactly one ETH crystal, inside the vault; no crystals outside the vault.
```

## 6. 协作规则（共享画布）

1. **不挪动、不重排已有节点**。画布是 Wilson 审片的主界面，布局按他的阅读习惯手动排过；CLI 本来也移不动已有节点。新节点放在空白处，新镜头建自己的新分组。
2. **不删除别人的节点**。原有节点都是同事的作品，删除不可恢复，还会连带删掉连线；下游 prompt 里引用到它的 `{{Node}}` 会让写入中止。
3. **名字带镜头前缀、全画布唯一**（`node create` 遇到同名会报错）。上传参考图也用唯一的名字，后续连线用上传时返回的 nodeKey，不用名字（重名时会连到旧节点上）。
4. **不要同时开网页编辑器和用 CLI 写画布**：同一张画布同一时间只能有一个网页编辑会话（另一个标签页打开就会把前一个踢下线），编辑器的自动保存（延迟 10–20 秒）可能覆盖 CLI 的改动。
5. 在网页里选中视频节点会弹出带运行按钮的生成面板，拖完节点后**点一下空白处取消选中**，避免误触发生成。
6. 下载一律**无水印**，先下到一个新建的空文件夹，再改名移走，不覆盖已有文件（下载会直接覆盖同名文件）。

## 7. 省积分

- **先想能不能复用**：重定时、定格、裁切、局部修补、后期图层都能解决的，不重新生成。只有动作确实没有素材时才生成视频。
- 修改阶段 720p、1 条，时长取最短够用的；全部确认后再出 1080p。生图也先只出 1–2 张。
- 要去掉的东西，先在首帧里去掉，比靠负面词反复重跑省得多。
- 对已有节点再执行一次运行，会再生成一次并追加结果，同样扣积分。
- 本机的 Remotion 和 ffmpeg 不扣积分。

## 8. 用 CLI 操作画布

LibTV 有官方命令行工具 `libtv`（以下按 1.1.3 版），子命令和参数以 `libtv <子命令> --help` 的实际输出为准。登录用 `libtv login web`，在浏览器里完成。**不要读取或输出凭据文件**（`~/.libtv/credentials.json`），也不要执行 `env`、`printenv` 这类可能打印 token 的命令。

**从关键帧出一条视频**：

```bash
# 0. 绑定画布（在工作目录执行一次），然后读出当前节点坐标，找空位
libtv project use <画布UUID>
libtv project <画布UUID>

# 1. 上传 4K 关键帧（名字唯一，记下返回的 nodeKey）
libtv upload 'Sxx_KF_final_v01' -f Sxx_KF_v01.png -g 'Sxx' --x <X> --y <Y> </dev/null

# 2. 建视频节点，连上首帧，写参数和 prompt
libtv node --x <X> --y <Y> create 'Sxx_VID_t01' -t video -g 'Sxx' --left <关键帧nodeKey> \
  -s 'model=Seedance 2.5' -s modeType=singleImage2video \
  -s 'settings={"ratio":"16:9","resolution":"720p","duration":5,"enableSound":"off"}' \
  -s 'advancedSettings={"search_enabled":0,"autoCompliance":1}' -s count=1 \
  --prompt "$(cat <<'EOF'
<CORE-S>

<镜头描述>

<MOTION>

<NEGATIVE-S>
EOF
)" </dev/null

# 3. 生成（会一直等到出结果，耗时 2–10 分钟，建议放到后台跑）
libtv node 'Sxx_VID_t01' --run

# 4. 无水印下载：先下到新建的空文件夹，再改名移走
STAGE="takes/Sxx/.incoming-$(date +%Y%m%d-%H%M%S)"; mkdir -p "$STAGE"
libtv download -n 'Sxx_VID_t01' -o "$STAGE" --without-ai-watermark --vip
for f in "$STAGE"/*; do mv -n "$f" "takes/Sxx/Sxx_VID_t01_$(basename "$f")"; done
rmdir "$STAGE" 2>/dev/null || ls "$STAGE"
```

**要点和坑**：

| 坑 | 处理 |
|---|---|
| `node create` 带 `-t` 等写操作时会读标准输入，把它当成连边指令 | 每条写命令末尾都加 `</dev/null` |
| prompt 里有 `$`、反引号会被 shell 展开 | 用带引号定界符的 heredoc（`<<'EOF'`）传 prompt，不用 `-s prompt=` |
| `{{Node <id>}}` 指向的节点不存在或没连到本节点，整条写入会中止 | 先用 `--left` 把参考节点连上，再在 prompt 里引用；每条 prompt 最多 3 个 `{{Node}}`，写明用途 |
| `upload` 的 `--x/--y` 实测是画布绝对坐标（和文档写的「组内相对坐标」相反） | 上传前读当前坐标，按绝对坐标放到空位，放完再读一次核对 |
| `group use` 绑定后，新建和上传的节点都会默认挂进那个组 | 不用 `group use` |
| `group … --run` 会把组内每个节点都重跑一遍（已生成的也是） | 绝不跑；只对单个节点 `--run` |
| `script storyboard`、`image shortcut` 一定会生成 | 没有需要就不用 |
| `--run` 返回非 0 不代表没提交 | 先读节点状态：任务已提交就只等结果，绝不重新提交（避免重复扣费）；只有网络错误、请求根本没到服务器时才重试 |
| 改名、建分组 | 先改一个节点试点，确认下游引用没变再改其余；`group create` 不会移动节点，分组框会扩大到包住所有成员，先在网页里排好版再建组 |

## 9. 从这张画布开始一支新视频

1. **读规范**：[Bulu 形象规范](01-bulu.md)、[ETH 晶体与质押容器规范](02-eth-vault.md) 的视觉语法，确认新片沿用同一个客厅、同一套机位、同一个 Bulu 标准。
2. **盘点能复用什么**：`02_LAYOUT_REF` 的机位构图、`00_REF` 的容器参考、第 3.3 节的终版首帧和 A 机位母图。新镜头能从已有母图派生，就不要从零生成。
3. **出关键帧**：带上 Bulu 标准图做参考，按当前写法写 prompt，原生 4K。先在静帧上把道具、造型、ETH 修对，再用规范的名字上传到画布。
4. **建自己的分组**，放在画布空白处，不碰已有节点。
5. **建视频节点**：Seedance 2.5、单张首帧、720p、1 条、时长最短够用；prompt 只写首帧里有的东西，晶体全部写成静止。
6. **生成、无水印下载、自查**：按每秒 1 帧和 4 帧抽帧，查硬规则（ETH 数量、没有腿和眉毛、ETH 没有爆亮、画面没有字）、道具（和前后镜头并排比）、技术问题（有的片段每 4 帧重复 1 帧，实际只有约 18 fps）。
7. **把文件路径交给 Wilson 审**，写清楚可用的秒数区间。
8. **能修就不重跑**：重定时、贴补、后期图层（见 [Remotion 动画与合成规范](03-remotion.md)）。
9. **全部确认后**，用同样的参数出 1080p 终版。
10. 画面里的文字、数字、界面、字幕、配音都在后期加；配音按 [imToken 配音与发音规范](05-voiceover.md)，在单独的音频画布上生成。

---

来源：Wilson 的视频项目里的画布审查（`docs/07`，含 10-01 清理记录）、画布快照和改名映射（`refs/libtv/`）、分镜表（`shots.yaml`）、生成批次记录（`tools/queue_status/`）、终版底片清单（`video/public/plates/manifest.json`）、夜间制作报告（`docs/11`、`docs/13`）和 libtv CLI 的本地使用说明。2026-10-15 整理。

---

# Remotion 动画与合成规范

> **适用**：把 AI 生成的视频片段（底片）合成为成片的全过程，包括运镜、界面、计数器、字幕、配音、配乐、音效、渲染和交付。
> **版本**：2026-10-15，依据「Bulu 与沉睡的 ETH」中文版、英文版成片的实际工程整理。早期方案里和本文冲突的，以本文为准。
> **给 Claude 的说明**：第 1 节的分工原则决定了每个镜头怎么做，先读它再动手。工程代码在 Wilson 的视频项目 `video/` 目录（Remotion 4），需要时向他要；本文写的是做法和参数，不依赖那份代码也能照做。

## 1. 原则

1. **AI 视频一律固定机位**。生成视频时 prompt 里不写任何运镜；推拉、移焦、match cut、转场都在合成时做。原因有两个：叠加的图层不会滑动，对得准；早期 4 条带运镜的 AI 片段全都把 ETH 跟丢了。
2. **底片优先**。AI 生成的片段是「底片」，合成去贴合底片，不反过来。合成的尺寸、帧率、时长都从底片继承，不做帧率转换，逐帧对齐。
3. **AI 负责氛围，代码负责信息**。
   - AI 画：画面质感、角色表演，以及和环境有接触的物体（毯子里的 ETH、鳍和手机、边几上的容器），接触阴影和反射交给 AI 才不穿帮。
   - 代码叠加：所有文字、数字、界面、计数器、字幕、卡片、zzz。AI 画面里不出现任何文字、数字或 logo。
   - 需要代码叠加的视觉元素，优先选**自发光、边缘柔和**的东西（辉光、光点、磨砂卡片、气泡），它们最容易和底片融在一起。
4. **先复用，再生成**。改一个镜头之前，先想现有底片能不能解决：重定时、定格加缓推、裁切调整、局部修补、程序化图层。只有动作确实没有素材时才生成新视频。

**成片里实际走代码的部分**：片头标题、推送卡片、App 界面（手机窗口）、增量计数器、四季加牛熊的整段合成（价格卡、ETH 大小和表情、台历、zzz）、幻想气泡、奖励小 ETH 云、字幕、片尾、风险提示，以及全部声音。容器、光环、光带、ETH 跳进容器都画在 AI 底片里；成片的合成里没有用 Three.js 图层，Three.js 只用来渲构图白模和 ETH / 容器的几何参考图。

## 2. 技术规格

| 项目 | 规格 |
|---|---|
| 帧率 | **24 fps**，全片统一 |
| 主交付 | 1920×1080，H.264，yuv420p，约 14 Mbps，AAC 320 kbps / 48 kHz |
| 4K 版 | 只在投 YouTube 或官网大屏时出：底片先用 Lanczos 放大到 4K 再渲，`--scale=2`，码率 45 Mbps |
| AI 底片 | Seedance 2.5 最高 1080p。纯 AI 底片交付时 24 fps、1920×1080、无水印，前后各留约 0.5 秒余量；在本地叠了界面、台历等高清图层的底片（成片里的 S02、S03、S04）按 3840×2160 交付，并在底片清单里注明分辨率，不要再用 1080p 的交付流程重交 |
| 底片编码 | libx264 crf 12、yuv420p、tv range，标注 BT.709 |
| 中间文件 | ProRes 422 HQ（10-bit），往返误差约 0.2 级 |
| 色彩 | **全链路 BT.709**（见第 8 节的坑） |
| 排版单位 | 所有尺寸按 1080p 设计，`u = min(宽, 高) / 1080` |

## 3. 工程结构

参考实现（Remotion 4 + React，TypeScript）：

```
video/
  src/
    Root.tsx              注册所有合成
    master/
      edl.ts              剪辑表：全片时间的唯一来源
      Master.tsx          总装：底片序列 + 叠加层 + 字幕 + 声音
      overlays.tsx        叠加层组件：推送卡、手机窗口、计数器、字幕、片尾、风险提示
      layout.ts           排版、颜色、磨砂玻璃常量
      audio.tsx / plan.ts 音乐、音效 cue 表、闪避、配音和字幕事件
      CoverTitle.tsx      片头标题（藏在角色身后）
    i18n/
      index.ts            多语言加载、校验和警告
      locales/zh-CN.json  每种语言一个文件，同一套 id
      locales/en.json
    s04/                  四季 + 牛熊段落的整段合成
    s11b/                 幻想气泡的整段合成
    screens/              手机界面组件（393×852 pt 的手机画布）
    scene/                Three.js 客厅白模、ETH、容器（只用于参考图）
  public/
    plates/               S01.mp4 … S12.mp4 + manifest.json
    audio/                music/、sfx/（+ meta.json）、vo/<语言>/
    fonts/                打包的字体：英文 Inter、封面用的思源黑体 Heavy 和 Inter Black
  scripts/
    render-master.sh      成片渲染
    master_static.py      响度母带
```

**图层顺序**（从下到上）：底片序列（叠化时前一镜垫在下面）→ 各镜头的叠加层（封面标题、推送卡、手机窗口、计数器、压暗、片尾、风险提示）→ 字幕 → 安全区参考框（只在调试时显示）。声音单独一组。

## 4. 剪辑表驱动总装

**剪辑表是全片时间的唯一来源**。每个镜头一行：

| 字段 | 含义 |
|---|---|
| `id` | 镜头编号 |
| `plate` | `public/plates/` 下的文件名；没有底片时为空，渲深夜蓝占位画面（「<镜头> · 底片待交付」），不报错 |
| `durationSec` | 在成片里的时长 |
| `trimInSec` | 底片入点；默认读 `manifest.json` 里的可用段，也可以直接写秒数 |
| `transitionIn` | 默认硬切；叠化写帧数（默认 12 帧 = 0.5 秒） |
| `overlays` | 这个镜头挂哪些叠加层：封面、推送卡、手机窗口、计数器、压暗、片尾、风险提示 |
| `holdAfterSec` | 底片可用段不够长时，在最后一帧定格，同时做 1.0→1.05 的缓推，静帧不显得「死」 |
| `kenBurns` | 给整个镜头指定缓推的起止倍数和中心点 |

要点：

- 改时长、换底片、加转场**只改剪辑表**。字幕、配音、音效、叠加层都按「镜头起点 + 相对秒数」挂在镜头上，改完自动跟着走。不要在 Remotion Studio 里手动拖镜头，拖了也写不回剪辑表。
- 叠化从切点开始，不改变镜头起点和全片总长：后一镜在叠化帧数内淡入，前一镜的底片在下面多播同样帧数。
- **两个镜头里角色位置不同时不要叠化**，会出现两个 Bulu 重影（三只眼、两个角）。容器对容器这类能对上的才叠，或者先推到位置重合再硬切。
- 推镜要克制：1080p 的 AI 底片放大后会发糊。成片里最大的缓推是 1.3→1.0（从近景拉回全景，接下一镜的首帧）。不要靠大倍数裁切来得到近景，需要近景就重新生成首帧。
- 底片开头或结尾有定格帧时，入点和时长要避开，否则接在上一镜的定格后面会卡顿。

**底片清单**（`manifest.json`）：每个底片记录文件名、时长、可用入点和出点、所用的版本、状态（定稿或临时）、备注。剪辑表的入点默认读这里，换版本时自动跟着变。

## 5. 叠加层

### 5.1 磨砂玻璃（所有卡片的底）

```css
background: linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0.09));
backdrop-filter: blur(28px) saturate(150%);
border: 1.5px solid rgba(255,255,255,0.26);   /* 按 1080p，乘以 u */
box-shadow: 0 18px 48px rgba(4,10,25,0.35), inset 0 1px 0 rgba(255,255,255,0.22);
```

**不要把 opacity 写在卡片或它的父级上**：父级 opacity < 1 时 backdrop-filter 会失效，淡入淡出时卡片里露出清晰的背景，会跳一帧。淡入淡出时改为让模糊半径、底色和描边的透明度跟着变化（「结霜」「化开」）。

### 5.2 颜色

| 用途 | 色值 |
|---|---|
| 深夜蓝（占位、片尾背景、压暗） | `#0B1A33` |
| 冰蓝（ETH 光、强调色） | `#648FFA` |
| 品牌蓝点 | `#1E8BFF` |
| 正文白 / 片尾文字 | `#FFFFFF` / `#EEF3FF` |
| 应用图标渐变 | `#14BCFF` → `#0A78F5` |

### 5.3 各叠加层

| 叠加层 | 做法 |
|---|---|
| **片头标题** | 社交平台的第一帧就是封面，所以第 0 帧完整显示标题，停 1.2 秒后用 0.6 秒淡出（略上浮、虚化），视频本身从第 0 帧就在播。标题放在 Bulu 左侧，和 Bulu 至少保持约 26 px 间距，**不靠抠像遮挡**（第一版曾让文字一角藏在 Bulu 身后，抠像边缘不干净，定稿改为完全不碰）；代码里仍保留逐帧的 Bulu 遮罩作保险。左侧加一层轻压暗保证可读。另导出封面图：1920×1080 JPG 和 3840×2160 PNG。 |
| **推送卡片** | 放在左上角（居中会挡住 Bulu 的角）：方形 imToken 应用图标 + 标题 + 副标题。0.1 秒起弹簧滑入，结束前 0.3 秒收起。 |
| **手机窗口（App 界面）** | 画面右侧的磨砂玻璃悬浮手机窗口，高约 0.68 倍画高。Bulu 手里的手机屏幕和右侧窗口**渲染同一个界面组件、用同一个时间**，两边状态始终同步。界面组件按 393×852 pt 的手机画布写。窗口出现时从右侧划入，可以带一点回弹，对上角色动作（例如最后一跳落地）。 |
| **增量计数器** | 只在收益增长那一镜出现：先停在 +0.00 约 1 秒，再用缓入缓出（cubic）数到 +0.72，结束前 0.6 秒数完；0.3 秒淡入。数字 Inter 52 / 600、等宽数字，单位 28 / 500，旁注「示意数值」18 号、60% 不透明度；正在数时卡片带一点冰蓝外发光。位置在右上角（距右 120、距上 96）。旁注缺失时程序要报警。 |
| **四季 + 牛熊段落** | 一整段 10 秒合成（240 帧）：窗外按季节换景、补光，台历翻页，磨砂玻璃卡片里画一条发光的价格曲线（**不标任何数字**，只用虚线标出起点价位，最后回到起点附近），ETH 的大小和表情跟价格变化，结尾重新睡着、zzz 回来。调色时 ETH 区域挖掉，不变亮。ETH 的三种身体（沉睡、开心、失落）是三张对齐到同一菱形的精灵图，按价格叠化；眼睛用 SVG 画，参数连续插值。 |
| **幻想气泡** | 气泡本体和梦境遮罩从已审批关键帧里抠出来；两段梦境是两条单独的 AI 视频，贴进云形遮罩，各完整可见约 1 秒。外辉光用加色混合（plus-lighter），而且要和本体做成兄弟节点、共用同一个 transform。收回时气泡收缩成一团亮光，化成闪光沿小泡泡落进两只眼睛，眼睛一亮。 |
| **奖励小 ETH 云** | 见 [ETH 晶体与质押容器规范](02-eth-vault.md) 第 5 节：程序画的冰蓝菱形精灵，用滤色叠到底片上，数量只增不减。 |
| **字幕** | 和旁白同文，下方居中，无底框；白字加细描边式投影和柔光；46 号，最多两行，放不下时缩到最小 36 号，不截断。全片统一一条基线（距底 112），只在画面下方特别亮的镜头上移。句末的逗号、句号、顿号、分号、冒号去掉，问号、感叹号、破折号保留。字幕显示到配音结束前 6 帧，**不跨镜头切点**，下一句开始时上一句立刻让位。手机窗口在画面上时字幕收窄，不碰窗口。 |
| **片尾** | 4 秒，纯色深夜蓝背景（不加中央柔光，会显得发糊）。中央一行口号「Stake, Under Your Control」，中英文版都用这一行英文、无句号：中文逐字、英文逐词由虚变实并上浮，停稳后一道冷白光从左到右扫过一次。1.1–1.6 秒在底部正中淡入横版白字 imToken Logo。上一镜最后 0.4 秒压暗到深夜蓝，接片尾。 |
| **风险提示** | 只放在片尾，小字：17 号、白色 42% 不透明度、距底 30，和 Logo 一起淡入。成片写法：「质押前请了解相关风险，本视频不构成投资建议」/「Understand the risks before staking. This video is not investment advice.」 |

### 5.4 角色动作和界面同步

角色「点」屏幕时，对的是**接触帧**（鳍伸直碰到手机、急停急回的那一端），不是抬手悬停的那一端（会停 2–5 帧）：

1. 逐帧看大图，找出每次轻点真正接触屏幕的那一帧。
2. 重定时底片，把接触帧对到界面节拍上（成片：1.0、2.0、3.0 秒）。多余的点击用相位对齐的叠化跳过。
3. 界面在同一帧出按下态和点击光圈；点击音效也写同一个时间。
4. 交付前从合成后的预览里抽出节拍那几帧，把角色和界面放在同一张图里核对。曾经因为对的是悬停帧，真正戳下去晚了约 0.33 秒。

### 5.5 手机屏幕替换

想把界面直接贴进 Bulu 手里的手机时：逐帧沿屏幕四条边找「屏幕亮 → 边框暗」最陡的位置，拟合直线、求相似变换，被鳍挡住的边用预测值；界面四角外扩约 1.5 px 压到边框上；鳍伸进屏幕的部分做遮罩挡在界面前面。**鳍的亮面和屏幕同色时，颜色阈值遮罩做不干净**（试过约 12 种方案都有瑕疵），这时改用右侧悬浮的手机窗口。

## 6. 声音

### 6.1 配乐

- 情绪分段：等待、牛熊段落用安静的夜曲（钢琴加大提琴，大提琴的起伏落在牛熊段）；焦虑段用夜曲里最安静的一段钢琴轻轻衔接，**不要整段留白**（听起来像音乐断了）；推送提示音之后进入一开始就有律动的欢快配乐，一直到片尾，让音乐的自然收尾落在片尾结束前。
- 前后两段音乐按实测响度对齐音量（成片：夜曲约 −28 LUFS、欢快段约 −27.5 LUFS，在文件里各自的音量系数不同）。
- 后半段的配乐如果开头太轻，加上闪避后几乎听不见，要换一首一开始就有律动的。

### 6.2 闪避（旁白时压低音乐）

- 旁白播放时音乐降 **−5 dB**，前后各用 12 帧按 dB 线性过渡。
- 两句之间空隙短于 1.5 秒时保持闪避不松开，避免「抽吸感」。
- 所有句子用同一深度。−8 dB 的闪避一松开抽吸感明显；单独给口号加深闪避，会把整段音乐压没。

### 6.3 音效

- 每个音效文件裁成单次事件，记录声音真正开始的位置（起音点）和归一化增益：一次性音效归一到峰值 −12 dBFS，环境声归一到 −24 dBFS。
- 播放时从起音点前 0.04 秒开始，让声音真正响起的那一下落在设定时间上。
- 动作类音效对接触帧或起跳帧（点击、三跳、落进容器的「叮」）；连续音效踩音乐拍点（例如每拍一个晶体生长音）。
- 环境声（城市夜晚）跨镜头延续，避免出现完全静音。

### 6.4 配音和母带

- 配音的读法、音色、生成和后期处理见 [imToken 配音与发音规范](05-voiceover.md)。每个配音文件先归一到约 −23.2 LUFS，结尾补 0.30 秒静音。
- 配音时长由程序读出真实文件时长，自动决定字幕结束时间和闪避区间。
- **成片母带**：用一个静态增益把响度推到 **−14 LUFS**（EBU R128），再用前视 5 ms、释放 60 ms 的峰值限制器只处理少数超过 −2 dBFS 的峰值；画面流直接复制。不要用 ffmpeg 的两遍 loudnorm：峰均比偏高时它会退回动态模式，像自动增益一样把音乐推高、把口号压低。成片实测约 −14.1 LUFS、真峰约 −1.5 dBTP。

## 7. 多语言

- 每种语言一个 JSON 文件，所有语言用**同一套配音 id 和卡片键**。旁白的开始时间写成相对所在镜头起点的秒数。
- 结构：`vo[]`（id、镜头、开始秒数、文字、配音文件）、`cards`（推送标题和副标题、计数器单位和旁注、封面标题、片尾口号）、`disclaimer`。
- 文字为空时不显示字幕（有配音照常播放）；配音文件不存在就跳过，不报错。非基准语言缺封面标题、推送文案时程序要报警（英文版曾因此丢了封面和推送卡也没人发现）。
- **新增语言的步骤**：
  1. 用目标语言重新写旁白，不从中文直译，每句不超过中文版的时间段。英文通常比中文长 20–30%，平静语速约每秒 2.5 个词。
  2. 加 locale 文件，在语言列表里登记。
  3. 逐句生成配音（品牌名的写法见配音规范），归一化并补头尾静音，检查开头结尾有没有被截。
  4. 按实际配音时长微调开始时间，不压下一句、不压切点。
  5. 界面图、封面按语言各出一版，检查文字长度不溢出、不碰角色。
  6. 字体：英文 Inter（英文模式下注册）和封面用的思源黑体 Heavy、Inter Black 已打包进工程，都可免费商用，不依赖本机。中文正文（字幕、卡片、片尾）用的是 macOS 系统字体 PingFang SC / SF Pro，没有打包，所以中文版要在 Mac 上渲染；想在任何机器上渲染结果都一致，就打包一款可商用的开源中文字体（如思源黑体 Regular / Medium），写进中文字体栈。

## 8. 色彩和编码的坑

| 坑 | 处理 |
|---|---|
| Remotion 默认按 BT.601 编码、不写色彩标注，播放器按 BT.709 解码，饱和的蓝会偏色 | 每次 `npx remotion render` 都加 `--color-space=bt709` |
| ffmpeg 做 YUV↔RGB 转换默认截断取整，每转一次整体偏暗约 2 级 | 抽帧和编码都加 `accurate_rnd+full_chroma_int+full_chroma_inp`，并显式写 bt709 |
| H.264 经过 scale 滤镜后丢掉 primaries / trc 标注；prores_ks 不写标注 | 用复制流重新封装补标注（`h264_metadata` / `prores_metadata` bsf） |
| 用 8-bit 图逐帧累加求平均，权重小到一定程度后增量被舍成 0 | 在浮点图上累加 |
| 加色混合的辉光层放进带 transform 的父节点，会把黑底盖到底片上 | 辉光层和本体做兄弟节点，各自套同一个 transform |
| SVG 辉光滤镜范围按路径外框百分比算，曲线刚开始画时发光被裁掉 | `filterUnits="userSpaceOnUse"`，范围按整张卡片外扩 |

精确取整的抽帧和编码命令：

```bash
# 抽帧
ffmpeg -i in.mp4 -vf "scale=in_color_matrix=bt709:in_range=tv:out_range=pc:flags=accurate_rnd+full_chroma_int+full_chroma_inp,format=rgb24" f%03d.png

# 编码成底片
ffmpeg -framerate 24 -i f%03d.png \
  -vf "scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int+full_chroma_inp,format=yuv420p" \
  -c:v libx264 -crf 12 -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv out.mp4

# 补色彩标注（像素不变）：scale 滤镜会让 H.264 丢掉 primaries / trc 标注
ffmpeg -i out.mp4 -c:v copy \
  -bsf:v h264_metadata=colour_primaries=1:transfer_characteristics=1:matrix_coefficients=1:video_full_range_flag=0 \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv out_tagged.mp4
```

## 9. 渲染和交付

**流程**：

1. **修改阶段只渲改动的片段**，1080p，文件小、手机能看：

   ```bash
   npx remotion render src/index.ts Master out/preview/<名字>.mp4 \
     --frames=<起>-<止> --scale=1 --crf=18 --color-space=bt709 --props='{"lang":"zh-CN"}'
   ```

2. 发预览前，把这个镜头历次审片出过的问题逐条复查一遍，和上一版已过审的结果同帧并排放大比。动作帧（滑手机、点击、抬头、跳跃）重点看。
3. 把**文件路径和秒数区间**直接发给负责人看，一项一行；对比图起明确的名字。
4. **完整成片开渲前先问一句**，得到明确的「确认」或「继续」再渲。「其他也不用改」不等于可以开渲。
5. 渲成片：`./scripts/render-master.sh zh-CN`（英文 `en`），输出带时间戳的新文件，不覆盖旧文件。
6. 母带：`python3 scripts/master_static.py <成片>.mp4`，输出 `_MSTATIC14.mp4`，看一眼输出的 LUFS 和真峰。
7. 交付：本地最终版的文件名和网盘上完全一致；改版后用原文件名替换，不加 -v2、不留「旧版」文件夹；网盘上用「上传新版本」替换，保持链接不变。

另外：手机端发文件常有约 30 MB 的上限，需要时另出一个约 15 MB 的手机预览版。本机渲染不花积分，花积分的只有 AI 生成。Remotion 对公司使用有授权要求，正式投放前确认授权已就绪。

## 10. 竖版和方版

成片只交付了 16:9。规划过但没有执行的规范：

- 1:1 从 16:9 成片里裁 1080×1080，主要机位的主体组合都在横向 0.22–0.78 之间。
- 9:16 的竖条宽只有 0.316 画宽，1080p 底片裁出来要放大 1.78 倍，会糊。要做竖版，**应该从生图阶段就按竖版或方形构图**。
- 安全区：9:16 底部 20%、右侧 12% 是平台界面遮挡区；16:9 主体底边不低于画高的 80%，给字幕和计数器留位置。
- 新帧的主体尽量放在画面中间 1/3，方便以后裁。
- 容器旁的小 ETH 横跨较宽，竖版容易被切出画（违反「小 ETH 不出画」），需要单独构图。

## 11. 检查清单

- [ ] 渲染带 `--color-space=bt709`；底片和成片都有 BT.709 标注。
- [ ] 剪辑表是唯一时间来源，没有在 Studio 里手动拖动。
- [ ] 角色位置不同的两个镜头之间没有叠化。
- [ ] 叠加层锚点误差在 1080p 下不超过 3 px；固定机位的漂移超过 3 px 就稳像或重跑。
- [ ] 点击、跳跃等动作和界面、音效对在接触帧上。
- [ ] 字幕不跨切点、不压手机窗口和画面里的重要物件；句末标点按规则去掉。
- [ ] 计数器只在设计的镜头出现，带「示意数值」。
- [ ] 旁白时音乐闪避 −5 dB，句间不抽吸；成片响度约 −14 LUFS。
- [ ] 道具和前后镜头一致；奖励小 ETH 只增不减。
- [ ] 交付文件名和网盘一致。

---

来源：Wilson 的视频项目里的合成规范（`docs/09`）、空间与机位（`docs/08`）、制作报告（`docs/13`）、英文版计划（`docs/17`）和 `video/` 工程代码（`src/master/`、`src/i18n/`、`src/s04/`、`src/s11b/`、`scripts/`）。2026-10-15 整理。

---

# imToken 配音与发音规范

> **适用**：imToken 视频的中文、英文旁白配音，从写 TTS 文字、生成、检查、后期处理到混音。
> **版本**：2026-10-15，依据「Bulu 与沉睡的 ETH」中文版（10-08）和英文版（10-12）的配音实践整理。
> **给 Claude 的说明**：第 1 节的品牌名读法是唯一规格，不要自创别的拼写。含品牌名的句子，生成后交给负责人试听挑选，不要自行定稿。

## 1. 品牌名的读法（唯一规格）

| 项目 | 规格 |
|---|---|
| **imToken 的读法** | 字母 M 的音 **/ɛm/ + token**，当作一个完整的品牌名**连读，中间不停顿**。 |
| **给 TTS 的文字** | 一律写 **`MToken`**。例：`Stake it with MToken.`、`MToken Stake. Wake up your ETH.` |
| **字幕、界面、文案** | 仍写 **`imToken`**（i 小写、T 大写）。 |
| **英文产品名** | **imToken Stake**（imToken 官方英文名：App Store 2.18.0 起改名，服务条款标题也是 IMTOKEN STAKE TERMS OF SERVICE）。TTS 写 `MToken Stake`。Stake 作动词时照常用：`Stake now`、`Stake, Under Your Control`、`Stake it with imToken`。 |
| **中文产品名** | 「imToken 质押」。 |

**试过、已经否决的 TTS 拼写**（不要再用）：

| 拼写 | 问题 |
|---|---|
| 原样写 `imToken` | 读音不符合规格，第一批生成后已替换。 |
| `emToken`、`Em Token` | 被读成 /ɪm/。 |
| `M Token`（空格）、`M-Token`（连字符） | 读音对，但 M 和 Token 之间有停顿。 |
| `Emtoken` | 出过候选，没被选中。 |
| 中文「am Token」（带空格） | 多出一处停顿。 |

**中文配音的情况**：MToken 规格是在英文配音（Eleven V3）上验证定下的。中文成片（10-07）用的是 `Am-Token` 写法（Minimax 中文人声），当时读音合格、已经审定；MToken 在中文人声上还没有试过。新的中文配音，含品牌名的句子先各出 2 条 `MToken` 和 `Am-Token` 给负责人对比，选定后再统一。

**其他词的读法**：

- **ETH**：书写全大写，不写 Ether。读法（逐字母 E-T-H，还是 eeth）没有正式决定；成片里 TTS 文字原样写「ETH」，按模型默认读法通过了审听。
- Bulu、Lido、stETH、APR 等词从未进入旁白，没有读音规格，需要用时先定。

## 2. 旁白文案口径

旁白、字幕、卡片用同一套口径：

- 只说「imToken 质押」「质押你的 ETH」（英文 `imToken Stake`、`stake your ETH`）；不说「原生质押」「native」「32 ETH」，不解释质押原理。
- 不用「锁定」「锁仓」「冻结」「退出后才回来」这类会让人以为 ETH 被锁住的说法。
- 奖励只说「奖励」（英文 `rewards`），不说「赚」「收益率」（英文不用 `earn`、`yield`、`APY`）。
- 所有权说「掌控权始终在你手上」（英文 `You stay in control`）；**不再说「ETH 不离开你的钱包」**，质押时 ETH 确实会离开钱包。
- 先讲故事、跟着画面走，专业感靠用词，不靠解释机制。

## 3. 人声和模型

配音都在 LibTV 上生成，放在**单独的音频画布**上（「Bulu 音频 · 配音配乐 2026-10-06」），不在共享的视频画布上跑。

| 语言 | 模型 | 人声 | 参数 |
|---|---|---|---|
| 中文 | Minimax speech 2.8 HD（`Minimax-speech-2.8-hd`，scene `Text-to-Speech`） | 「沉稳高管」男声（`voiceId: Chinese (Mandarin)_Reliable_Executive`），三种男声试音后选定 | 每句单独设语速 `speed`，范围 0.9–1.12：平常 1.0，舒缓的句子 0.97，接近耳语的问句 0.9，需要放进时间窗的 1.08–1.12 |
| 英文 | Eleven V3（scene `Text-to-Speech`） | Brian，美式男声（`voice: nPczCjzI2devNBz1zQrb`），和 Eric、Matilda 同参数试听后选定 | `stability: 0.5`，不设语速 |

**旁白人设**：一位沉稳、克制的旁白，像深夜里懂行的老朋友，对长期持有者说话。男声，35–45 岁，中低音，贴近话筒；中文语速约每秒 4 个音节。焦虑段接近耳语，结尾带一点笑意。英文是同一人设，美式口音，语气同样温和平静，句间停顿更长。

在 LibTV 上用 CLI 建一个配音节点（中文示例；英文把模型换成 `Eleven V3`，参数换成 `-s voice=nPczCjzI2devNBz1zQrb -s stability=0.5`）：

```bash
libtv node create '<节点名>' -t audio -s model=Minimax-speech-2.8-hd -s scene=Text-to-Speech \
  -s 'voiceCard={"voiceId": "Chinese (Mandarin)_Reliable_Executive"}' -s speed=0.97 \
  --prompt "<TTS 文字>" </dev/null
libtv node '<节点名>' --run
libtv download -n '<节点名>' -o <新建的空文件夹> --without-ai-watermark --vip
```

第一次用某个模型时，先用一句短句试生成一次，确认能正常出结果再批量（出现过模型报「算力不足」、整批都没生成的情况）。

## 4. 写 TTS 文字

- **TTS 文字和字幕基本一致**，只有两处可以不同：品牌名拼写（`MToken`）和控制停顿的标点。

  | 句子 | 字幕 | TTS 文字 |
  |---|---|---|
  | 中文结尾口号 | imToken 质押——叫醒你的 ETH。 | Am-Token 质押。叫醒你的 ETH。 |
  | 英文操作句 | Stake it with imToken. | Stake it with MToken. |
  | 英文结尾口号 | imToken Stake. Wake up your ETH. | MToken Stake. Wake up your ETH. |

- **中文要在句中停一下时，用中文句号「。」断句**。上面的口号用句号后，「质押」后面停了约 0.7 秒。不要用 Minimax 的停顿标记（如 `<#0.45#>`），会多出一处停顿。要缩短已有的停顿，直接剪音频，不变速。
- 英文用排版弯撇号（`You’ve`、`doesn’t`），TTS 文字照抄；不用感叹号；破折号「—」前后各空一格。
- 字幕显示时，句末的逗号、句号自动去掉，问号、破折号保留。

## 5. 生成多少条

- **普通句**：每句先出 1 条，听过、检查过没问题就用；读错或首尾被截的再重出。
- **含品牌名的句子**：每种候选拼写各出 **2 条**左右，交给负责人挑。产品名改动后的结尾口号出过 5 条，选了第 2 条。
- 放不进时间窗时：中文调语速（0.9–1.12 之间）；英文**改写得更短**，不加速。英文写稿按每秒约 2.5 个词估，逗号、句号各加 0.2–0.3 秒；英文配音通常比中文长 20–30%。

## 6. 生成后检查

### 6.1 首尾有没有被截

每条新生成的配音都测开头、结尾各 10 ms 的音量：

| 结果 | 判断 |
|---|---|
| 开头和结尾都低于 −50 dB | 正常 |
| 开头 ≥ −50 dB | 开头被截（第一个辅音缺一半） |
| 结尾 ≥ −40 dB | 结尾被截（词被切掉） |
| 结尾在 −50 到 −40 dB 之间 | 结尾偏紧 |

Eleven V3 返回的文件常常没有开头和结尾的静音，第一批 14 句里有 6 句首尾被截。被截的重出，或者剪掉结尾的杂音后再用。

### 6.2 时长和对时

按旁白稿逐句测：文件长度、人声的起止点（静音判定 −45 dB）、句内停顿、响度、真峰；再算出每句离本镜头切点、离下一句还有多少秒。**离切点不足 0.05 秒要标出来**，调整开始时间（只在镜头内前后挪，不改镜头时长）。英文版 14 句都在各自镜头内说完；中文版有几句略微说过切点（最多约 0.2 秒，口号说进了片尾屏），审听后接受。

### 6.3 品牌名

逐条听 M 和 Token 之间有没有停顿、是不是 /ɛm/ 的音。

## 7. 后期处理

**每条配音**（英文和新生成的 TTS）：

1. 用一个静态增益（不压缩、不限幅）把响度推到 **−23.2 LUFS**。这是中文配音的实测响度，混音按它调好；英文 TTS 原始音量比中文响 4–8 dB，不归一会盖过音乐。
2. 开头 3 ms 淡入，结尾 15 ms 淡出；开头 10 ms 就已经有人声的，前面补 30 ms 静音。
3. **结尾补 0.30 秒静音**。字幕结束和音乐闪避都按「音频时长 − 6 帧」算，没有尾部静音时，字幕会比最后一个音节早 1–6 帧消失。
4. 需要时先从结尾剪掉杂音（例如 20 ms）。
5. 输出 16-bit PCM 单声道 WAV，不覆盖原文件。

中文 Minimax 的 MP3 自带开头（0.1–0.4 秒）和结尾（0.2–0.4 秒）静音，单条响度在 −22 到 −24 LUFS 之间，成片里原样使用，没有再归一。

**混音**（在 Remotion 里，详见 [Remotion 动画与合成规范](03-remotion.md) 第 6 节）：

- 配音按原音量播放，个别偏响的句子单独减一点（成片里有一句 −1.5 dB）。结尾口号不要加增益，+1 dB 就会让母带限制器压住起句。
- 旁白时音乐降 **−5 dB**，前后各 12 帧（0.5 秒）过渡；两句之间空隙短于 1.5 秒时保持不松开。不要给单句加深闪避。
- 字幕从配音起点开始，到「音频时长 − 6 帧」结束，不跨镜头切点；片尾屏开始时字幕全部结束，配音照常播完。

**成片母带**：静态增益推到 **−14 LUFS**，前视峰值限制器只处理少数超过约 −2 dBFS 的峰值。成片实测：中文 −14.06 LUFS、真峰 −1.51 dBTP；英文 −14.17 LUFS、真峰 −1.58 dBTP。不要用 ffmpeg 的两遍 loudnorm，峰均比高时会像自动增益一样把口号开头压低约 5 dB。

## 8. 审听流程

- 请负责人审听时，**直接列出文件路径**，一项一行，不另写长描述。
- 候选音频按字母编号命名：`<句子编号>_<字母>_<拼写或说明>.wav`，例如 `V08_B_MToken.wav`；正在用的那条加后缀 `_当前使用`；被否决的一组整体移到 `旧_<原因>_不用/` 子文件夹。负责人按字母回复，例如「V08 选 B、V12 选 C」。
- 整句和画面对时的效果，用 1080p 的分段预览给负责人看（几秒的片段，不用渲完整成片）。
- 完整成片开渲前，先明确问一句「可以开始渲完整成片了吗？」，得到「确认」或「继续」再渲。

## 9. 文件和命名

- 配音放在 `public/audio/vo/<语言>/`（`zh-CN`、`en`），每种语言的旁白稿里写明每句用哪个文件；文件不在时自动跳过，字幕按字数估算时长（中文每字 0.24 秒，英文每词 0.4 秒）。
- 句子编号中英文共用一套（成片 14 句：V01–V09、V10a、V10b、V11、V11b、V12），开始时间相对镜头起点，以中文版为基准，可以按各语言配音的实际时长在镜头内微调（成片里只有英文 V05 从 6.4 秒挪到 6.8 秒，让翻台历落在逗号停顿里）。
- 生成文件的命名：`<句子编号>[_<拼写标记>][_r<第几次重出>]_<序号>.mp3`；归一化后的文件加 `_n`。下载时同名已存在就加时间后缀，从不覆盖。

## 10. 检查清单

- [ ] TTS 文字里品牌名写 `MToken`（中文按第 1 节先对比），字幕和界面写 `imToken`；英文产品名是 `imToken Stake`。
- [ ] 旁白口径：不提原生质押和 32 ETH，不说锁定，不说「ETH 不离开你的钱包」，奖励不说赚。
- [ ] 每条配音首尾都没有被截；品牌名连读、不停顿。
- [ ] 每句都在本镜头内说完，或者超出部分经过审听接受。
- [ ] 单条配音归一到 −23.2 LUFS，结尾有 0.30 秒静音。
- [ ] 旁白时音乐闪避 −5 dB，句间不抽吸；成片约 −14 LUFS。
- [ ] 含品牌名的句子，候选文件已按字母编号交给负责人挑选。

---

来源：Wilson 的视频项目里的读音和产品名决定（2026-10-12）、英文版计划和字幕稿（`docs/17`、`docs/18`、`docs/19`）、制作报告（`docs/13`）、旁白稿（`video/src/i18n/locales/`）、音频批次记录（`audio_canvas/batches/`）和配音脚本（`tools/vo_edges.py`、`vo_measure.py`、`vo_normalize.py`）。2026-10-15 整理。
