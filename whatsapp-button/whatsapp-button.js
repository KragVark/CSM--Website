/*
=========================================
Reusable WhatsApp Floating Widget
- Shows after custom delay
- Opens popup preview
- Builds WhatsApp link dynamically
- Closes on outside click or close button
=========================================
*/

document.addEventListener("DOMContentLoaded", function () {
  const widget = document.querySelector(".wa-widget");

  if (!widget) return;

  const floatBtn = widget.querySelector(".wa-float-btn");
  const popup = widget.querySelector(".wa-popup");
  const closeBtn = widget.querySelector(".wa-close-btn");
  const chatLink = widget.querySelector(".wa-chat-link");
  const titleEl = widget.querySelector(".wa-popup-title");
  const subtitleEl = widget.querySelector(".wa-popup-subtitle");

  const phone = (widget.dataset.phone || "").trim();
  const message = (widget.dataset.message || "Hi").trim();
  const title = (widget.dataset.title || "Chat with us").trim();
  const subtitle = (widget.dataset.subtitle || "We usually reply as soon as possible.").trim();
  const buttonLabel = (widget.dataset.buttonLabel || "Start chat").trim();
  const delay = parseInt(widget.dataset.delay || "3000", 10);

  if (!phone) {
    console.warn("WhatsApp widget: data-phone is missing.");
    return;
  }

  // Build WhatsApp link
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  chatLink.setAttribute("href", whatsappUrl);
  chatLink.querySelector(".wa-chat-link-text").textContent = buttonLabel;
  titleEl.textContent = title;
  subtitleEl.textContent = subtitle;

  // Show widget after delay
  window.setTimeout(() => {
    widget.classList.add("wa-visible");
  }, isNaN(delay) ? 3000 : delay);

  // Toggle popup
  function openPopup() {
    widget.classList.add("wa-open");
    popup.setAttribute("aria-hidden", "false");
  }

  function closePopup() {
    widget.classList.remove("wa-open");
    popup.setAttribute("aria-hidden", "true");
  }

  function togglePopup() {
    widget.classList.toggle("wa-open");
    const isOpen = widget.classList.contains("wa-open");
    popup.setAttribute("aria-hidden", isOpen ? "false" : "true");
  }

  floatBtn.addEventListener("click", function () {
    togglePopup();
  });

  closeBtn.addEventListener("click", function () {
    closePopup();
  });

  // Close when clicking outside
  document.addEventListener("click", function (event) {
    const clickedInside = widget.contains(event.target);
    if (!clickedInside) {
      closePopup();
    }
  });

  // ESC key closes popup
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePopup();
    }
  });
});