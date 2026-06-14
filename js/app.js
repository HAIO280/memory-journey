(() => {
  const data = window.MEMORY_DATA || [];

  const intro = document.getElementById("intro");
  const startButton = document.getElementById("startButton");
  const restartButton = document.getElementById("restartButton");
  const brand = document.querySelector(".brand");
  const track = document.getElementById("sceneTrack");
  const nav = document.getElementById("chapterNav");
  const progressBar = document.getElementById("progressBar");
  const scrollSpace = document.getElementById("scrollSpace");
  const traveler = document.getElementById("traveler");
  const scrollHint = document.querySelector(".scroll-hint");

  let currentIndex = 0;
  let walkTimer = null;
  let animationFrame = null;
  let started = false;

  document.documentElement.style.setProperty("--chapter-count", data.length);

  function createChapter(memory, index) {
    const chapter = document.createElement("section");
    chapter.className = "chapter";
    chapter.dataset.index = String(index);
    chapter.dataset.id = memory.id;
    chapter.style.backgroundImage = `url("${memory.background}")`;

    chapter.innerHTML = `
      <article class="chapter__content">
        <p class="chapter__date">${memory.date}</p>
        <h2 class="chapter__title">${memory.title}</h2>
        <p class="chapter__subtitle">${memory.subtitle}</p>
        <p class="chapter__text">${memory.text}</p>
        <blockquote class="chapter__quote">${memory.quote}</blockquote>
      </article>

      <aside class="memory-card">
        <img
          class="memory-card__image"
          src="${memory.photo}"
          alt="${memory.photoTitle}"
          loading="${index === 0 ? "eager" : "lazy"}"
        >
        <div class="memory-card__caption">
          <div>
            <strong>${memory.photoTitle}</strong>
            <span>${memory.photoCaption}</span>
          </div>
          <button
            class="memory-card__button"
            type="button"
            data-memory-index="${index}"
          >
            查看
          </button>
        </div>
      </aside>

      <div class="chapter__marker">第 ${index + 1} 站</div>
    `;

    track.appendChild(chapter);

    const navButton = document.createElement("button");
    navButton.className = "chapter-nav__button";
    navButton.type = "button";
    navButton.dataset.index = String(index);
    navButton.innerHTML = `
      <span class="chapter-nav__dot"></span>
      <span>${memory.navLabel}</span>
    `;
    navButton.addEventListener("click", () => goToChapter(index));
    nav.appendChild(navButton);
  }

  function buildJourney() {
    data.forEach(createChapter);

    track.querySelectorAll(".memory-card__button").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.memoryIndex);
        window.MemoryModal.open(data[index]);
      });
    });

    updateActiveChapter(0);
    updateLayout();
  }

  function isMobileLayout() {
    return window.matchMedia("(max-width: 760px)").matches;
  }

  function getScrollableDistance() {
    return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  function getProgress() {
    if (isMobileLayout()) {
      return Math.min(1, Math.max(0, window.scrollY / getScrollableDistance()));
    }

    return Math.min(1, Math.max(0, window.scrollY / getScrollableDistance()));
  }

  function updateDesktopJourney() {
    const progress = getProgress();
    const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
    track.style.transform = `translate3d(${-progress * maxTranslate}px, 0, 0)`;

    const index = Math.min(
      data.length - 1,
      Math.max(0, Math.round(progress * (data.length - 1)))
    );

    updateActiveChapter(index);
    progressBar.style.width = `${progress * 100}%`;

    traveler.style.left = `${18 + Math.sin(progress * Math.PI) * 3}vw`;

    if (scrollHint) {
      scrollHint.style.opacity = progress > 0.92 ? "0" : "1";
    }
  }

  function updateMobileJourney() {
    const chapters = [...document.querySelectorAll(".chapter")];
    const viewportCenter = window.innerHeight * 0.52;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    chapters.forEach((chapter, index) => {
      const rect = chapter.getBoundingClientRect();
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
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    animationFrame = requestAnimationFrame(() => {
      if (isMobileLayout()) {
        updateMobileJourney();
      } else {
        updateDesktopJourney();
      }
    });
  }

  function updateActiveChapter(index) {
    if (currentIndex === index && document.querySelector(".chapter.is-active")) {
      return;
    }

    currentIndex = index;

    document.querySelectorAll(".chapter").forEach((chapter, chapterIndex) => {
      chapter.classList.toggle("is-active", chapterIndex === index);
    });

    document.querySelectorAll(".chapter-nav__button").forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
      button.setAttribute("aria-current", buttonIndex === index ? "true" : "false");
    });
  }

  function goToChapter(index) {
    const safeIndex = Math.max(0, Math.min(data.length - 1, index));

    if (isMobileLayout()) {
      const chapter = document.querySelector(`.chapter[data-index="${safeIndex}"]`);
      chapter?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const targetProgress = safeIndex / Math.max(1, data.length - 1);
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
      scrollSpace.style.height = `calc(${data.length} * 130vh)`;
    }

    requestJourneyUpdate();
  }

  function startJourney() {
    started = true;
    intro.classList.add("is-hidden");
    document.body.classList.add("has-started");
    requestJourneyUpdate();
  }

  function restartJourney(event) {
    event?.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!started) {
      startJourney();
    }
  }

  function showWalkingMotion() {
    traveler.classList.add("is-walking");
    window.clearTimeout(walkTimer);
    walkTimer = window.setTimeout(() => {
      traveler.classList.remove("is-walking");
    }, 180);
  }

  function handleKeydown(event) {
    if (!started || isMobileLayout()) {
      return;
    }

    const step = window.innerHeight * 0.72;

    if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown") {
      event.preventDefault();
      window.scrollBy({ top: step, behavior: "smooth" });
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") {
      event.preventDefault();
      window.scrollBy({ top: -step, behavior: "smooth" });
    }

    if (event.key === "Home") {
      event.preventDefault();
      goToChapter(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      goToChapter(data.length - 1);
    }
  }

  startButton.addEventListener("click", startJourney);
  restartButton.addEventListener("click", restartJourney);
  brand.addEventListener("click", restartJourney);

  window.addEventListener("scroll", () => {
    requestJourneyUpdate();
    showWalkingMotion();
  }, { passive: true });

  window.addEventListener("resize", updateLayout);
  window.addEventListener("keydown", handleKeydown);

  buildJourney();
})();
