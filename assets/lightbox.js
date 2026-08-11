(function () {
  var triggers = document.querySelectorAll("[data-lightbox-src]");
  if (!triggers.length) return;

  var dialog = document.createElement("dialog");
  dialog.className = "lightbox-dialog";
  dialog.setAttribute("aria-label", "Expanded screenshot");
  dialog.innerHTML =
    '<div class="lightbox-frame">' +
    '<button type="button" class="lightbox-close" aria-label="Close">×</button>' +
    '<img alt="">' +
    "</div>";
  document.body.appendChild(dialog);

  var img = dialog.querySelector("img");
  var closeBtn = dialog.querySelector(".lightbox-close");

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt || "";
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function closeLightbox() {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
    img.removeAttribute("src");
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openLightbox(trigger.getAttribute("data-lightbox-src"), trigger.getAttribute("data-lightbox-alt"));
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeLightbox();
  });
})();
