# 拾光：互动纪念网站 V2

这是一个不需要数据库、不需要安装框架的纯静态纪念网站。

直接使用：

```text
HTML + CSS + JavaScript + SVG + WAV
```

适合部署到 GitHub Pages。

---

## 一、V2 新增内容

相较初级版，当前版本增加了：

- 6 个完整示例章节；
- 顶部功能按钮；
- 时间地图；
- 照片墙；
- 上一章和下一章按钮；
- 深色 / 浅色主题；
- 全屏浏览；
- 分享或复制链接；
- 继续上次浏览；
- 章节彩蛋；
- 写给未来的一封信；
- 键盘快捷键；
- 网站状态提示；
- 原创合成环境音乐；
- `.nojekyll` 文件；
- 手机端纵向浏览；
- 更完整的修改说明。

---

## 二、运行方式

### 使用 VSCode + Live Server

1. 解压项目；
2. 用 VSCode 打开整个 `memory-journey-v2` 文件夹；
3. 安装 `Live Server` 扩展；
4. 右键 `index.html`；
5. 选择 `Open with Live Server`。

---

## 三、最重要的修改文件

```text
js/data.js
```

网站名称、封面文字、章节标题、地点、正文、照片路径、标签、彩蛋和信件内容，都在这个文件中修改。

---

## 四、文件结构

```text
memory-journey-v2/
├─ index.html
├─ .nojekyll
├─ .gitignore
├─ README.md
├─ 内容填写模板.md
├─ 项目结构.txt
│
├─ css/
│  └─ style.css
│
├─ js/
│  ├─ data.js
│  └─ app.js
│
└─ assets/
   ├─ favicon.svg
   ├─ share-cover.svg
   ├─ backgrounds/
   │  ├─ scene-01.svg
   │  ├─ scene-02.svg
   │  ├─ scene-03.svg
   │  ├─ scene-04.svg
   │  ├─ scene-05.svg
   │  └─ scene-06.svg
   ├─ character/
   │  └─ traveler.svg
   ├─ photos/
   │  ├─ memory-01.svg
   │  ├─ memory-02.svg
   │  ├─ memory-03.svg
   │  ├─ memory-04.svg
   │  ├─ memory-05.svg
   │  └─ memory-06.svg
   └─ audio/
      └─ memory-ambient.wav
```

---

## 五、替换为真实照片

将照片复制到：

```text
assets/photos/
```

例如：

```text
assets/photos/2022-summer.jpg
```

然后在 `js/data.js` 中修改：

```javascript
photo: "./assets/photos/2022-summer.jpg"
```

推荐：

- 使用 JPG 或 WebP；
- 横向比例约 4:3 或 3:2；
- 单张文件尽量小于 1 MB；
- 文件名只用英文、数字和短横线。

---

## 六、替换背景

将背景放到：

```text
assets/backgrounds/
```

然后修改：

```javascript
background: "./assets/backgrounds/campus-day.webp"
```

推荐尺寸：

```text
1920 × 1080 px
```

---

## 七、修改网站名称

在 `js/data.js` 顶部修改：

```javascript
name: "拾光",
browserTitle: "拾光｜我们的时光档案",
```

同时可以修改：

```javascript
introTitle
introText
```

---

## 八、修改分享信息

打开：

```text
index.html
```

找到：

```html
<meta property="og:title" ...>
<meta property="og:description" ...>
<meta property="og:image" ...>
```

部署完成后，`og:image` 最好改成完整公网地址。

---

## 九、上传到现有 GitHub 仓库

你已有仓库：

```text
HAIO280 / memory-journey
```

建议的更新方式：

1. 先在电脑保留旧版备份；
2. 将 V2 解压；
3. 上传 V2 根目录里的全部文件；
4. 同名文件选择覆盖；
5. 提交说明填写：

```text
Upgrade website to version 2
```

6. 等待 GitHub Pages 自动更新。

请确保：

```text
index.html
```

仍位于仓库根目录。

---

## 十、快捷键

```text
← / →      上一章 / 下一章
M          音乐
G          照片墙
T          切换主题
Esc        关闭弹窗或菜单
Home       回到第一章
End        前往最后一章
```

---

## 十一、隐私提醒

公开仓库中的文件任何人都可能查看和下载。

公开发布前请检查：

- 身份证号；
- 电话号码；
- 详细住址；
- 学号和工号；
- 聊天截图中的姓名与头像；
- 照片中其他人的授权；
- 音乐和图片的使用许可。

当前附带的背景、占位图和环境音乐均为此模板生成的原创素材。
