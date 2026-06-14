window.MemoryModal = (() => {
  const modal = document.getElementById("memoryModal");
  const closeButton = document.getElementById("modalClose");
  const image = document.getElementById("modalImage");
  const date = document.getElementById("modalDate");
  const title = document.getElementById("modalTitle");
  const text = document.getElementById("modalText");

  function open(memory) {
    image.src = memory.photo;
    image.alt = memory.photoTitle;
    date.textContent = memory.date;
    title.textContent = memory.photoTitle;
    text.textContent = memory.modalText;

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }
  }

  function close() {
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
  }

  closeButton.addEventListener("click", close);

  modal.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) {
      close();
    }
  });

  return { open, close };
})();
