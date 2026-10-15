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
- 一个节点出了多张时，用的是第几张（`-1` 到 `-4`）不写进节点名，只写在下载的文件名里。
- 弃用的节点加 `ARC_` 前缀，节点和连线都保留。
- 上传的图片节点改不了名（CLI 报错，网页也没有入口），有些还保留着原始文件名，只能靠分组识别。所以**上传时一开始就起好规范的名字**。

### 3.3 每个镜头的终版

成片里每个镜头最终用的是下面这些节点。可以直接复用的素材，优先从这里找。

| 镜头 | 内容 | 终版节点 | 说明 |
|---|---|---|---|
| S01 | 开场，Bulu 看手机 | `S01_VID_cover_v09` | 首帧 `S01_KF_cover_v01_gpt-2`（4K，左侧留出标题位置）；Seedance 2.5，1080p，5 秒 |
| S02 | 过肩看行情 | `S02_VID_regen_v05` | 首帧 `S02_KF_regen_v05_gpt-2`（手机屏幕是深色，界面后期合成）；6 秒，重定时到 5 秒 |
| S03 + S04 | ETH 沉睡、四季和牛熊 | `S03S04_VID_regen_v04` | 首帧 `S04_KF_nolegs_v03_gpt-1`（已去腿的底图）；一条 15 秒底片拆成两个镜头，牛熊段落在后期合成 |
| S05 | （已并入 S04） | — | 不单独生成 |
| S06 | 焦虑 | `S06_VID_t03_2` | 首帧 `S06_KF_final_v07`；4 秒 |
| S07 | 发现 App | `S07_VID_t02_2` | 本地修补过（擦掉了眼睛上方的鼓棱）；剪辑段从 0.83 秒开始 |
| S08 | 在 App 里操作 | `S08_VID_redraw_v04` | 首帧 `S08_KF_redraw_v04_gpt-1`（A 机位正面中景）；6 秒，三次点击重定时到 1、2、3 秒 |
| S09 | ETH 醒来跳进容器 | `S09_VID_t03_1` | **首尾帧模式**：首帧 `S09_KF_A_master_pre_v01`，尾帧 `S09_KF_A_master_post_v02`；5 秒 |
| S10 | 收益增长（容器特写） | `S10a_VID_t02_2` + `S10b_VID_t03_2` | 两条硬切接在一起，都本地修补过；状态仍是临时版 |
| S11a | 惊喜 | `S11a_VID_t04_2` | 先用修图把画面里的晶体去掉，奖励小 ETH 由脚本叠加 |
| S11b | 幻想气泡 | 后期合成 | 底片是 F 机位无气泡的版本；两段梦境是 `S11-firstclass_VID_t01`、`S11-beach_VID_t01` |
| S12 | 开心跳起 | `S12_VID_jump_v02` | 首帧 `S12_KF_jump_v03_gpt-2`（4K）；5 秒，奖励小 ETH 由脚本叠加 |

**可以直接复用的母图**：A 机位的质押前、质押后母图（`S09_KF_A_master_pre_v01`、`S09_KF_A_master_post_v02`），容器放大后的 A 机位构图就以后者为准；`S04_KF_nolegs_v03_gpt-1` 是已经去腿的沙发全景。

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
