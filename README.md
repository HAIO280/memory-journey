# 时光旅程：纪念网站初级模板

这是一个纯静态网站模板，不需要数据库，也不需要安装复杂环境。

主要效果：

- 电脑端：向下滚动，场景横向移动；
- 手机端：自动切换为纵向时间线；
- 章节导航和整体进度条；
- 固定旅行人物和行走动画；
- 照片卡片与故事弹窗；
- 背景音乐开关；
- 可直接部署到 GitHub Pages。

---

## 1. 项目结构

```text
memory-journey-template/
├─ index.html                  网站入口
├─ README.md                   使用说明
├─ 项目结构.txt                文件夹说明
│
├─ css/
│  └─ style.css                全部页面样式与响应式规则
│
├─ js/
│  ├─ data.js                  章节、文字、照片等内容
│  ├─ modal.js                 照片故事弹窗
│  ├─ audio.js                 背景音乐控制
│  └─ app.js                   页面生成、横向滚动和章节导航
│
└─ assets/
   ├─ favicon.svg              浏览器标签图标
   ├─ backgrounds/             每一章的场景背景
   ├─ character/               页面人物素材
   ├─ photos/                  纪念照片
   └─ audio/                   背景音乐
```

---

## 2. 如何在 VSCode 中运行

### 最简单的方法：Live Server

1. 解压 ZIP；
2. 用 VSCode 打开 `memory-journey-template` 文件夹；
3. 在扩展商店安装 `Live Server`；
4. 右键 `index.html`；
5. 点击 `Open with Live Server`。

也可以直接双击 `index.html`，但使用 Live Server 时修改后刷新更方便。

---

## 3. 修改网站文字

打开：

```text
js/data.js
```

每一个 `{ ... }` 代表一章，例如：

```javascript
{
  id: "beginning",
  navLabel: "开始",
  date: "第一章 · 2021",
  title: "故事开始的地方",
  subtitle: "那时候，一切看起来都很普通。",
  text: "这里是正文。",
  quote: "这里是一句重点文字。",
  background: "./assets/backgrounds/scene-01.svg",
  photo: "./assets/photos/memory-01.svg",
  photoTitle: "第一张照片",
  photoCaption: "点击打开完整故事",
  modalText: "弹窗中的完整故事。"
}
```

建议先只改文字，不要立刻修改程序。

---

## 4. 替换照片

把自己的照片复制到：

```text
assets/photos/
```

例如：

```text
assets/photos/2022-summer.jpg
```

然后在 `js/data.js` 中改成：

```javascript
photo: "./assets/photos/2022-summer.jpg"
```

建议：

- 横向照片比例约为 4:3 或 3:2；
- 单张照片尽量小于 1 MB；
- 优先使用 `.jpg` 或 `.webp`；
- 文件名只使用英文、数字和短横线。

---

## 5. 替换背景

把新的背景图放到：

```text
assets/backgrounds/
```

并修改：

```javascript
background: "./assets/backgrounds/your-background.jpg"
```

推荐背景尺寸：

```text
1920 × 1080 px
```

背景中不要放重要的小字，因为手机端会自动裁切。

---

## 6. 添加背景音乐

准备一首你有权使用的音乐，并命名为：

```text
background.mp3
```

放入：

```text
assets/audio/background.mp3
```

浏览器不允许网页未经操作就自动播放音乐，所以访客需要点击右上角“音乐”按钮。

---

## 7. 增加新章节

在 `js/data.js` 中复制完整的一组对象，然后修改内容。

章节数量会被程序自动识别，不需要修改 HTML。

---

## 8. 修改颜色

打开：

```text
css/style.css
```

文件最上方的 `:root` 中集中定义了主要颜色：

```css
:root {
  --ink: #263044;
  --paper: #fffaf2;
  --accent: #d66f5a;
  --accent-dark: #a84f42;
}
```

修改这里即可统一调整网站风格。

---

## 9. 部署到 GitHub Pages

将整个项目上传到 GitHub 仓库，然后在仓库中打开：

```text
Settings → Pages
```

设置：

```text
Source: Deploy from a branch
Branch: main
Folder: / (root)
```

发布后即可通过公开网址访问。

注意：如果网站中包含私人照片、姓名、聊天截图或联系方式，不建议放入公开仓库。

---

## 10. 隐私建议

公开发布前请检查：

- 身份证号、电话号码和详细住址；
- 学号、工号和车牌；
- 聊天截图中的头像与姓名；
- 照片中其他人的授权；
- 音乐和图片的使用许可。

如果只想发给少数人，后续可以部署到支持密码保护的平台，或者增加一个前端口令页。纯前端口令只能防止普通浏览，不属于真正的数据加密。

---

## 11. 后续可增加的功能

- 多图相册；
- 纪念视频；
- 时间轴快速跳转；
- 彩蛋和隐藏章节；
- 胶片、手绘或像素风主题；
- 章节独立背景音乐；
- 留言表单；
- 访问密码；
- 自定义域名。
