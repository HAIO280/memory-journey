/**
 * 这是整个网站最重要的内容配置文件。
 * 修改网站名称、封面文字、章节、照片、地点和信件，都优先在这里完成。
 */

window.MEMORY_SITE = {
  name: "拾光",
  browserTitle: "拾光｜我们的时光档案",
  introEyebrow: "MEMORY ARCHIVE",
  introTitle: "有些故事，值得被好好收藏。",
  introText: "向下滚动，沿着时间的方向，重新经过那些重要的时刻。",

  letter: {
    title: "写给未来的一封信",
    paragraphs: [
      "当你重新打开这个网站时，也许很多事情已经改变。",
      "希望你仍然记得，当时的自己曾认真地生活、期待、失落，也曾被一些很小的瞬间打动。",
      "时间不会停下来，但被认真记录过的事情，会以另一种方式留在这里。",
      "愿未来的你看到这些内容时，不只是怀念，也能够温柔地理解过去的自己。"
    ],
    sign: "写于某个值得纪念的夜晚"
  },

  chapters: [
    {
      id: "beginning",
      navLabel: "开始",
      date: "第一章 · 2021",
      shortDate: "2021",
      title: "故事开始的地方",
      subtitle: "那时候，一切看起来都很普通。",
      location: "某个熟悉的地方",
      text: "这里可以写下事情发生的背景。文字不必太长，建议控制在三到五行，让访客能够一边浏览场景，一边慢慢读完。",
      quote: "后来才明白，许多重要的开始，在当时都没有特别的声音。",
      background: "./assets/backgrounds/scene-01.svg",
      photo: "./assets/photos/memory-01.svg",
      photoTitle: "第一张照片",
      photoCaption: "点击打开完整故事",
      modalText: "这里适合放更完整的故事、照片说明，或者当时没有说出口的一段话。替换图片时，建议使用横向照片，并尽量压缩到 1 MB 以下。",
      tags: ["开始", "第一次", "相遇"],
      hotspot: {
        icon: "✦",
        top: "30%",
        left: "72%",
        message: "彩蛋：有些起点，只有回头时才会被看见。"
      }
    },
    {
      id: "summer",
      navLabel: "夏日",
      date: "第二章 · 2022",
      shortDate: "2022",
      title: "那个漫长的夏天",
      subtitle: "阳光、晚风，以及反复提起的计划。",
      location: "夏日街道",
      text: "第二个章节可以记录一段快乐、热烈或令人怀念的时期。场景、文字和照片共同构成记忆，而不只是简单的图文排列。",
      quote: "有些日子在经过时平平无奇，回头看时却亮得惊人。",
      background: "./assets/backgrounds/scene-02.svg",
      photo: "./assets/photos/memory-02.svg",
      photoTitle: "夏日片段",
      photoCaption: "日期与地点可以写在这里",
      modalText: "你可以写下人物、地点、天气，以及这张照片背后的细节。真正让纪念网站动人的，通常不是宏大的描述，而是只有你记得的小事情。",
      tags: ["夏天", "日常", "快乐"],
      hotspot: {
        icon: "☀",
        top: "24%",
        left: "36%",
        message: "彩蛋：那天的风，比照片里看起来更温柔。"
      }
    },
    {
      id: "ordinary",
      navLabel: "日常",
      date: "第三章 · 2022—2023",
      shortDate: "2022—23",
      title: "那些没有被命名的日常",
      subtitle: "很多珍贵的事情，并不发生在纪念日。",
      location: "日常生活",
      text: "可以把看起来普通的小事放在这里：一顿饭、一段路、一次等待、某句反复出现的话。它们往往最能保留真实的时间感。",
      quote: "平凡不是故事的空白，而是故事真正发生的地方。",
      background: "./assets/backgrounds/scene-03.svg",
      photo: "./assets/photos/memory-03.svg",
      photoTitle: "普通的一天",
      photoCaption: "最真实的回忆通常很安静",
      modalText: "这里适合整理生活中的小片段。你可以加入照片、截图、票根、手写字或一张看似没有意义却舍不得删掉的图片。",
      tags: ["日常", "陪伴", "细节"],
      hotspot: {
        icon: "☁",
        top: "35%",
        left: "65%",
        message: "彩蛋：真正怀念的，常常不是大事，而是当时的生活本身。"
      }
    },
    {
      id: "turning-point",
      navLabel: "转折",
      date: "第四章 · 2023",
      shortDate: "2023",
      title: "世界忽然安静下来",
      subtitle: "故事并不总是沿着预想的方向前进。",
      location: "雨夜",
      text: "这个章节可以承载变化、告别或低谷。背景颜色会变暗，但不需要使用过多特效，留白本身也能够表达情绪。",
      quote: "我们没有忘记，只是学会了带着记忆继续生活。",
      background: "./assets/backgrounds/scene-04.svg",
      photo: "./assets/photos/memory-04.svg",
      photoTitle: "夜晚的记忆",
      photoCaption: "也可以替换为信件或截图",
      modalText: "这里可以放一封信、一段聊天记录、一张夜景，或者一个重要节点的说明。公开发布前，请注意隐藏身份证号、地址等隐私信息。",
      tags: ["变化", "夜晚", "告别"],
      hotspot: {
        icon: "☾",
        top: "22%",
        left: "78%",
        message: "彩蛋：黑暗并不会删除过去，它只是让一些光变得更明显。"
      }
    },
    {
      id: "forward",
      navLabel: "继续",
      date: "第五章 · 2024",
      shortDate: "2024",
      title: "我们还是向前走了",
      subtitle: "不是因为遗忘，而是因为记忆已经成为了一部分。",
      location: "新的路口",
      text: "在这里记录重新出发的阶段。可以写下后来发生的变化，也可以放入一段对过去的回应，让前后章节形成完整的情绪曲线。",
      quote: "路没有把过去留在身后，而是把它带到了更远的地方。",
      background: "./assets/backgrounds/scene-05.svg",
      photo: "./assets/photos/memory-05.svg",
      photoTitle: "重新出发",
      photoCaption: "可以放现在的照片",
      modalText: "这个弹窗可以承载更长的内容。模板默认展示一张主图，后续也可以继续扩展为多图相册、视频入口或音频留言。",
      tags: ["成长", "继续", "重新开始"],
      hotspot: {
        icon: "➜",
        top: "30%",
        left: "42%",
        message: "彩蛋：向前走，并不等于把过去丢在身后。"
      }
    },
    {
      id: "ending",
      navLabel: "此刻",
      date: "终章 · 此刻",
      shortDate: "NOW",
      title: "故事到这里，暂时没有结束",
      subtitle: "感谢那些真实发生过的事情。",
      location: "此刻",
      text: "最后一章可以是一封写给过去、现在或未来的信。也可以在这里放置纪念视频、完整照片墙，或者一个只有特定的人才明白的彩蛋。",
      quote: "愿我们仍然保留认真生活、认真记得的能力。",
      background: "./assets/backgrounds/scene-06.svg",
      photo: "./assets/photos/memory-06.svg",
      photoTitle: "留给未来",
      photoCaption: "最后一页",
      modalText: "这是一段示例结尾。你可以将它替换为真正想说的话，也可以把最后的照片改成一张空椅子、天空、道路或任何具有象征意义的画面。",
      tags: ["此刻", "未来", "纪念"],
      isEnding: true,
      hotspot: {
        icon: "∞",
        top: "26%",
        left: "70%",
        message: "彩蛋：故事暂时结束，但记忆仍会继续生长。"
      }
    }
  ]
};
