window.MemoryAudio = (() => {
  const audio = document.getElementById("backgroundMusic");
  const button = document.getElementById("audioButton");
  const icon = document.getElementById("audioIcon");
  const label = document.getElementById("audioLabel");

  let sourceLoaded = false;
  let missingMessageShown = false;

  async function toggle() {
    if (!sourceLoaded) {
      audio.src = "./assets/audio/background.mp3";
      sourceLoaded = true;
    }

    if (audio.paused) {
      try {
        await audio.play();
        icon.textContent = "❚❚";
        label.textContent = "暂停";
        button.title = "暂停背景音乐";
      } catch (error) {
        icon.textContent = "!";
        label.textContent = "未放音乐";

        if (!missingMessageShown) {
          missingMessageShown = true;
          window.alert(
            "尚未找到 background.mp3。\n\n请把你有权使用的音乐文件放入：\nassets/audio/background.mp3"
          );
        }
      }
    } else {
      audio.pause();
      icon.textContent = "♫";
      label.textContent = "音乐";
      button.title = "播放背景音乐";
    }
  }

  button.addEventListener("click", toggle);

  return { toggle };
})();
