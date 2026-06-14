(() => {
  const site = window.MEMORY_SITE;
  const chapters = site.chapters;

  const intro = document.getElementById("intro");
  const startButton = document.getElementById("startButton");
  const continueButton = document.getElementById("continueButton");
  const introMapButton = document.getElementById("introMapButton");

  const brandLink = document.getElementById("brandLink");
  const brandName = document.getElementById("brandName");
  const track = document.getElementById("sceneTrack");
  const nav = document.getElementById("chapterNav");
  const progressBar = document.getElementById("progressBar");
  const scrollSpace = document.getElementById("scrollSpace");
  const traveler = document.getElementById("traveler");
  const previousButton = document.getElementById("previousButton");
  const nextButton = document.getElementById("nextButton");
  const chapterNumber = document.getElementById("chapterNumber");
  const chapterStatus = document.getElementById("chapterStatus");
  const scrollHint = document.querySelector(".scroll-hint");

  const mapButton = document.getElementById("mapButton");
  const galleryButton = document.getElementById("galleryButton");
  const audioButton = document.getElementById("audioButton");
  const audioIcon = document.getElementById("audioIcon");
  const audioLabel = document.getElementById("audioLabel");
  const themeButton = document.getElementById("themeButton");
  const themeIcon = document.getElementById("themeIcon");
  const moreButton = document.getElementById("moreButton");
  const moreMenu = document.getElementById("moreMenu");
  const shareButton = document.getElementById("shareButton");
  const fullscreenButton = document.getElementById("fullscreenButton");
  const helpButton = document.getElementById("helpButton");
  const restartButton = document.getElementById("restartButton");

  const mapDialog = document.getElementById("mapDialog");
  const memoryDialog = document.getElementById("memoryDialog");
  const galleryDialog = document.getElementById("galleryDialog");
  const letterDialog = document.getElementById("letterDialog");
  const helpDialog = document.getElementById("helpDialog");

  const mapList = document.getElementById("mapList");
  const galleryGrid = document.getElementById("galleryGrid");

  const memoryImage = document.getElementById("memoryImage");
  const memoryDate = document.getElementById("memoryDate");
  const memoryTitle = document.getElementById("memoryTitle");
  const memoryLocation = document.getElementById("memoryLocation");
  const memoryText = document.getElementById("memoryText");
  const memoryQuote = document.getElementById("memoryQuote");
  const memoryTags = document.getElementById("memoryTags");

  const letterTitle = document.getElementById("letterTitle");
  const letterText = document.getElementById("letterText");
  const letterSign = document.getElementById("letterSign");

  const backgroundMusic = document.getElementById("backgroundMusic");
  const toast = document.getElementById("toast");

  const STORAGE_KEY = "memoryJourneyStateV2";
  const THEME_KEY = "memoryJourneyThemeV2";

  let currentIndex = 0;
  let started = false;
  let walkTimer = null;
  let animationFrame = null;
  let toastTimer = null;

  document.documentElement.style.setProperty("--chapter-count", chapters.length);
  document.title = site.browserTitle;
  brandName.textContent = site.name;
  document.getElementById("introEyebrow").textContent = site.introEyebrow;
  document.getElementById("introTitle").textContent = site.introTitle;
  document.getElementById("introText").textContent = site.introText;

  function padNumber(value) {
    return String(value).padStart(2, "0");
  }

  function isMobileLayout() {
    return window.matchMedia("(max-width: 760px)").matches;
  }

  function getScrollableDistance() {
    return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  function getProgress() {
    return Math.min(1, Math.max(0, window.scrollY / getScrollableDistance()));
  }

  function saveState() {
    const state = {
      index: currentIndex,
      progress: getProgress(),
      started: true
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      return null;
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2400);
  }

  function openDialog(dialog) {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  function createChapter(chapter, index) {
    const section = document.createElement("section");
    section.className = "chapter";
    section.dataset.index = String(index);
    section.dataset.id = chapter.id;
    section.style.backgroundImage = `url("${chapter.background}")`;

    const endingActions = chapter.isEnding
      ? `
        <button class="chapter__action" type="button" data-open-letter="true">写给未来</button>
        <button class="chapter__action" type="button" data-open-gallery="true">查看全部照片</button>
        <button class="chapter__action" type="button" data-restart="true">重新走一遍</button>
      `
      : `
        <button class="chapter__action" type="button" data-open-memory="${index}">阅读完整故事</button>
        <button class="chapter__action" type="button" data-go-next="${index + 1}">前往下一章</button>
      `;

    section.innerHTML = `
      <article class="chapter__content">
        <div class="chapter__meta">
          <p class="chapter__date">${chapter.date}</p>
          <span class="chapter__location">${chapter.location}</span>
        </div>
        <h2 class="chapter__title">${chapter.title}</h2>
        <p class="chapter__subtitle">${chapter.subtitle}</p>
        <p class="chapter__text">${chapter.text}</p>
        <blockquote class="chapter__quote">${chapter.quote}</blockquote>
        <div class="chapter__actions">${endingActions}</div>
      </article>

      <aside class="memory-card">
        <img
          class="memory-card__image"
          src="${chapter.photo}"
          alt="${chapter.photoTitle}"
          loading="${index === 0 ? "eager" : "lazy"}"
        >
        <div class="memory-card__caption">
          <div>
            <strong>${chapter.photoTitle}</strong>
            <span>${chapter.photoCaption}</span>
          </div>
          <button
            class="memory-card__button"
            type="button"
            data-open-memory="${index}"
          >
            查看
          </button>
        </div>
      </aside>

      <button
        class="hotspot"
        type="button"
        style="top:${chapter.hotspot.top};left:${chapter.hotspot.left};"
        data-hotspot-message="${chapter.hotspot.message}"
        aria-label="发现隐藏彩蛋"
      >
        ${chapter.hotspot.icon}
      </button>

      <div class="chapter__marker">第 ${index + 1} 站</div>
    `;

    track.appendChild(section);

    const navButton = document.createElement("button");
    navButton.className = "chapter-nav__button";
    navButton.type = "button";
    navButton.dataset.index = String(index);
    navButton.innerHTML = `
      <span class="chapter-nav__dot"></span>
      <span>${chapter.navLabel}</span>
    `;
    navButton.addEventListener("click", () => goToChapter(index));
    nav.appendChild(navButton);
  }

  function buildMap() {
    mapList.innerHTML = "";
    chapters.forEach((chapter, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "map-item";
      button.innerHTML = `
        <span class="map-item__index">${padNumber(index + 1)}</span>
        <span class="map-item__content">
          <strong>${chapter.title}</strong>
          <span>${chapter.date} · ${chapter.location}</span>
        </span>
        <span class="map-item__arrow">→</span>
      `;
      button.addEventListener("click", () => {
        closeDialog(mapDialog);
        startJourney();
        goToChapter(index);
      });
      mapList.appendChild(button);
    });
  }

  function buildGallery() {
    galleryGrid.innerHTML = "";
    chapters.forEach((chapter, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-item";
      button.innerHTML = `
        <img src="${chapter.photo}" alt="${chapter.photoTitle}" loading="lazy">
        <span class="gallery-item__overlay">
          <strong>${chapter.photoTitle}</strong>
          <span>${chapter.shortDate} · ${chapter.location}</span>
        </span>
      `;
      button.addEventListener("click", () => {
        closeDialog(galleryDialog);
        openMemory(index);
      });
      galleryGrid.appendChild(button);
    });
  }

  function buildLetter() {
    letterTitle.textContent = site.letter.title;
    letterText.innerHTML = site.letter.paragraphs
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("");
    letterSign.textContent = site.letter.sign;
  }

  function buildJourney() {
    chapters.forEach(createChapter);
    buildMap();
    buildGallery();
    buildLetter();

    document.querySelectorAll("[data-open-memory]").forEach((button) => {
      button.addEventListener("click", () => {
        openMemory(Number(button.dataset.openMemory));
      });
    });

    document.querySelectorAll("[data-go-next]").forEach((button) => {
      button.addEventListener("click", () => {
        goToChapter(Math.min(chapters.length - 1, Number(button.dataset.goNext)));
      });
    });

    document.querySelectorAll("[data-open-letter]").forEach((button) => {
      button.addEventListener("click", () => openDialog(letterDialog));
    });

    document.querySelectorAll("[data-open-gallery]").forEach((button) => {
      button.addEventListener("click", () => openDialog(galleryDialog));
    });

    document.querySelectorAll("[data-restart]").forEach((button) => {
      button.addEventListener("click", restartJourney);
    });

    document.querySelectorAll("[data-hotspot-message]").forEach((button) => {
      button.addEventListener("click", () => {
        showToast(button.dataset.hotspotMessage);
      });
    });

    updateActiveChapter(0);
    updateLayout();
  }

  function openMemory(index) {
    const chapter = chapters[index];
    memoryImage.src = chapter.photo;
    memoryImage.alt = chapter.photoTitle;
    memoryDate.textContent = chapter.date;
    memoryTitle.textContent = chapter.photoTitle;
    memoryLocation.textContent = chapter.location;
    memoryText.textContent = chapter.modalText;
    memoryQuote.textContent = chapter.quote;
    memoryTags.innerHTML = chapter.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
    openDialog(memoryDialog);
  }

  function updateDesktopJourney() {
    const progress = getProgress();
    const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
    track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;

    const index = Math.min(
      chapters.length - 1,
      Math.max(0, Math.round(progress * (chapters.length - 1)))
    );

    updateActiveChapter(index);
    progressBar.style.width = `${progress * 100}%`;
    traveler.style.left = `${18 + Math.sin(progress * Math.PI) * 3}vw`;

    if (scrollHint) {
      scrollHint.style.opacity = progress > 0.92 ? "0" : "1";
    }
  }

  function updateMobileJourney() {
    const sectionNodes = [...document.querySelectorAll(".chapter")];
    const viewportCenter = window.innerHeight * 0.5;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    sectionNodes.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - viewportCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    updateActiveChapter(nearestIndex);
    progressBar.style.width = `${getProgress() * 100}%`;
  }

  function requestJourneyUpdate() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(() => {
      if (isMobileLayout()) {
        updateMobileJourney();
      } else {
        updateDesktopJourney();
      }
    });
  }

  function updateActiveChapter(index) {
    if (
      currentIndex === index &&
      document.querySelector(".chapter.is-active")
    ) {
      return;
    }

    currentIndex = index;

    document.querySelectorAll(".chapter").forEach((section, sectionIndex) => {
      section.classList.toggle("is-active", sectionIndex === index);
    });

    document.querySelectorAll(".chapter-nav__button").forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
      button.setAttribute("aria-current", buttonIndex === index ? "true" : "false");
    });

    chapterNumber.textContent = padNumber(index + 1);
    chapterStatus.textContent = chapters[index].title;
    previousButton.disabled = index === 0;
    nextButton.disabled = index === chapters.length - 1;

    saveState();
  }

  function goToChapter(index) {
    const safeIndex = Math.max(0, Math.min(chapters.length - 1, index));

    if (isMobileLayout()) {
      const section = document.querySelector(`.chapter[data-index="${safeIndex}"]`);
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const targetProgress = safeIndex / Math.max(1, chapters.length - 1);
    const targetY = targetProgress * getScrollableDistance();

    window.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  }

  function updateLayout() {
    if (isMobileLayout()) {
      track.style.transform = "none";
      scrollSpace.style.height = "0";
    } else {
      scrollSpace.style.height = `calc(${chapters.length} * 130vh)`;
    }
    requestJourneyUpdate();
  }

  function startJourney() {
    started = true;
    intro.classList.add("is-hidden");
    document.body.classList.add("has-started");
    requestJourneyUpdate();
  }

  function continueJourney() {
    const saved = loadState();
    startJourney();
    if (saved && Number.isInteger(saved.index)) {
      window.setTimeout(() => goToChapter(saved.index), 120);
    }
  }

  function restartJourney(event) {
    event?.preventDefault();
    startJourney();
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("已经回到旅程起点");
  }

  function showWalkingMotion() {
    traveler.classList.add("is-walking");
    window.clearTimeout(walkTimer);
    walkTimer = window.setTimeout(() => {
      traveler.classList.remove("is-walking");
    }, 180);
  }

  async function toggleAudio() {
    if (backgroundMusic.paused) {
      try {
        await backgroundMusic.play();
        audioIcon.textContent = "❚❚";
        audioLabel.textContent = "暂停";
        showToast("背景音乐已播放");
      } catch {
        showToast("浏览器阻止了自动播放，请再次点击音乐按钮");
      }
    } else {
      backgroundMusic.pause();
      audioIcon.textContent = "♫";
      audioLabel.textContent = "音乐";
      showToast("背景音乐已暂停");
    }
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeIcon.textContent = theme === "dark" ? "☀" : "☾";
    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    showToast(nextTheme === "dark" ? "已切换为夜间主题" : "已切换为明亮主题");
  }

  async function shareSite() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: site.browserTitle,
          text: site.introText,
          url
        });
      } else {
        await navigator.clipboard.writeText(url);
        showToast("网站链接已经复制");
      }
    } catch {
      // 用户主动取消分享时不显示错误
    }
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        fullscreenButton.textContent = "退出全屏";
      } else {
        await document.exitFullscreen();
        fullscreenButton.textContent = "进入全屏";
      }
    } catch {
      showToast("当前浏览器不支持全屏模式");
    }
  }

  function closeAllDialogs() {
    [mapDialog, memoryDialog, galleryDialog, letterDialog, helpDialog]
      .filter((dialog) => dialog.open)
      .forEach(closeDialog);
  }

  function handleKeydown(event) {
    const key = event.key.toLowerCase();

    if (key === "escape") {
      moreMenu.hidden = true;
      closeAllDialogs();
      return;
    }

    if (event.target.matches("input, textarea, select")) return;

    if (key === "m") toggleAudio();
    if (key === "g") openDialog(galleryDialog);
    if (key === "t") toggleTheme();

    if (!started || isMobileLayout()) return;

    if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown") {
      event.preventDefault();
      goToChapter(currentIndex + 1);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") {
      event.preventDefault();
      goToChapter(currentIndex - 1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      goToChapter(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      goToChapter(chapters.length - 1);
    }
  }

  function initializeSavedState() {
    const saved = loadState();
    if (saved && saved.started && saved.index > 0) {
      continueButton.classList.remove("is-hidden");
    }

    const savedTheme = localStorage.getItem(THEME_KEY);
    const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(savedTheme || (preferredDark ? "dark" : "light"));
  }

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      closeDialog(document.getElementById(button.dataset.closeDialog));
    });
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        closeDialog(dialog);
      }
    });
  });

  startButton.addEventListener("click", startJourney);
  continueButton.addEventListener("click", continueJourney);
  introMapButton.addEventListener("click", () => openDialog(mapDialog));
  brandLink.addEventListener("click", restartJourney);

  previousButton.addEventListener("click", () => goToChapter(currentIndex - 1));
  nextButton.addEventListener("click", () => goToChapter(currentIndex + 1));

  mapButton.addEventListener("click", () => openDialog(mapDialog));
  galleryButton.addEventListener("click", () => openDialog(galleryDialog));
  audioButton.addEventListener("click", toggleAudio);
  themeButton.addEventListener("click", toggleTheme);

  moreButton.addEventListener("click", () => {
    moreMenu.hidden = !moreMenu.hidden;
  });

  shareButton.addEventListener("click", () => {
    moreMenu.hidden = true;
    shareSite();
  });

  fullscreenButton.addEventListener("click", () => {
    moreMenu.hidden = true;
    toggleFullscreen();
  });

  helpButton.addEventListener("click", () => {
    moreMenu.hidden = true;
    openDialog(helpDialog);
  });

  restartButton.addEventListener("click", () => {
    moreMenu.hidden = true;
    restartJourney();
  });

  window.addEventListener("scroll", () => {
    requestJourneyUpdate();
    showWalkingMotion();
  }, { passive: true });

  window.addEventListener("resize", updateLayout);
  window.addEventListener("keydown", handleKeydown);

  document.addEventListener("click", (event) => {
    if (
      !moreMenu.hidden &&
      !moreMenu.contains(event.target) &&
      !moreButton.contains(event.target)
    ) {
      moreMenu.hidden = true;
    }
  });

  initializeSavedState();
  buildJourney();
})();
