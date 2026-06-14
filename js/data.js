/**
 * 网站内容集中放在这里。
 *
 * 修改方法：
 * 1. 每一组对象代表一个章节。
 * 2. background 对应 assets/backgrounds 中的背景图。
 * 3. photo 对应 assets/photos 中的照片。
 * 4. 可以继续复制一组对象来增加章节。
 */

window.MEMORY_DATA = [
  {
    id: "beginning",
    navLabel: "开始",
    date: "第一章 · 2021",
    title: "故事开始的地方",
    subtitle: "那时候，一切看起来都很普通。",
    text: "这里可以写下事情发生的背景。文字不必太长，建议控制在三到五行，让访客能够一边浏览场景，一边慢慢读完。",
    quote: "后来才明白，许多重要的开始，在当时都没有特别的声音。",
    background: "./assets/backgrounds/scene-01.svg",
    photo: "./assets/photos/memory-01.svg",
    photoTitle: "第一张照片",
    photoCaption: "点击打开完整故事",
    modalText: "这里适合放更完整的故事、照片说明，或者当时没有说出口的一段话。替换图片时，建议使用横向照片，并尽量压缩到 1 MB 以下。"
  },
  {
    id: "summer",
    navLabel: "夏日",
    date: "第二章 · 2022",
    title: "那个漫长的夏天",
    subtitle: "阳光、晚风，以及反复提起的计划。",
    text: "第二个章节可以记录一段快乐、热烈或令人怀念的时期。场景、文字和照片共同构成记忆，而不只是简单的图文排列。",
    quote: "有些日子在经过时平平无奇，回头看时却亮得惊人。",
    background: "./assets/backgrounds/scene-02.svg",
    photo: "./assets/photos/memory-02.svg",
    photoTitle: "夏日片段",
    photoCaption: "日期与地点可以写在这里",
    modalText: "你可以写下人物、地点、天气，以及这张照片背后的细节。真正让纪念网站动人的，通常并不是宏大的描述，而是只有你记得的小事情。"
  },
  {
    id: "turning-point",
    navLabel: "转折",
    date: "第三章 · 2023",
    title: "世界忽然安静下来",
    subtitle: "故事并不总是沿着预想的方向前进。",
    text: "这个章节可以承载变化、告别或低谷。背景颜色会变暗，但不需要使用过多特效，留白本身也能够表达情绪。",
    quote: "我们没有忘记，只是学会了带着记忆继续生活。",
    background: "./assets/backgrounds/scene-03.svg",
    photo: "./assets/photos/memory-03.svg",
    photoTitle: "夜晚的记忆",
    photoCaption: "也可以替换为信件或截图",
    modalText: "这里可以放一封信、一段聊天记录、一张夜景，或者一个重要节点的说明。请注意隐藏身份证号、地址等隐私信息。"
  },
  {
    id: "forward",
    navLabel: "继续",
    date: "第四章 · 2024",
    title: "我们还是向前走了",
    subtitle: "不是因为遗忘，而是因为记忆已经成为了一部分。",
    text: "在这里记录重新出发的阶段。可以写下后来发生的变化，也可以放入一段对过去的回应，让前后章节形成完整的情绪曲线。",
    quote: "路没有把过去留在身后，而是把它带到了更远的地方。",
    background: "./assets/backgrounds/scene-04.svg",
    photo: "./assets/photos/memory-04.svg",
    photoTitle: "重新出发",
    photoCaption: "可以放现在的照片",
    modalText: "这个弹窗可以承载更长的内容。模板默认只有一张图片，后续也可以继续扩展为多图相册、视频入口或音频留言。"
  },
  {
    id: "ending",
    navLabel: "此刻",
    date: "终章 · 此刻",
    title: "故事到这里，暂时没有结束",
    subtitle: "感谢那些真实发生过的事情。",
    text: "最后一章可以是一封写给过去、现在或未来的信。也可以在这里放置纪念视频、完整照片墙，或者一个只有特定的人才明白的彩蛋。",
    quote: "愿我们仍然保留认真生活、认真记得的能力。",
    background: "./assets/backgrounds/scene-05.svg",
    photo: "./assets/photos/memory-05.svg",
    photoTitle: "留给未来",
    photoCaption: "最后一页",
    modalText: "这是一段示例结尾。你可以将它替换为真正想说的话，也可以把最后的照片改成一张空椅子、天空、道路或任何具有象征意义的画面。"
  }
];
