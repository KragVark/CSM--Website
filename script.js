/* =========================================
   MOBILE MENU
========================================== */
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

/* =========================================
   HERO WORD ROTATION
========================================== */

const rotateWords = document.querySelectorAll(".rotate-word");
let rotateIndex = 0;

if (rotateWords.length > 0) {

  setInterval(() => {

    rotateWords[rotateIndex].classList.remove("active");

    rotateIndex = (rotateIndex + 1) % rotateWords.length;

    rotateWords[rotateIndex].classList.add("active");

  }, 3200);

}

/* =========================================
   REVEAL ON SCROLL
========================================== */
const revealElements = document.querySelectorAll(
  ".reveal-up, .reveal-left, .reveal-right"
);

function handleReveal() {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", handleReveal);
window.addEventListener("load", handleReveal);

/* =========================================
   HERO IMAGE PARALLAX
========================================== */
const heroBg = document.querySelector(".hero-bg");

window.addEventListener("scroll", () => {
  if (heroBg) {
    heroBg.style.transform = `scale(1.04) translateY(${window.scrollY * 0.12}px)`;
  }
});

/* =========================================
   SCROLL INDICATOR HIDE
========================================== */
const scrollIndicator = document.querySelector(".scroll-indicator");

window.addEventListener("scroll", () => {
  if (!scrollIndicator) return;

  if (window.scrollY > 300) {
    scrollIndicator.classList.add("hide");
  } else {
    scrollIndicator.classList.remove("hide");
  }
});

/* =========================================
   MASONRY GALLERY LIGHTBOX
========================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const masonryItems = document.querySelectorAll(".masonry-item img");

masonryItems.forEach((img) => {
  img.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || "Expanded project image";
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
    closeLightbox();
  }
});

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("active");
  document.body.style.overflow = "";

  setTimeout(() => {
    lightboxImage.src = "";
  }, 250);
}

/* =========================================
   BACK TO TOP BUTTON
========================================== */
const backToTopBtn = document.getElementById("backToTop");

function handleBackToTopVisibility() {
  if (!backToTopBtn) return;

  if (window.scrollY > 450) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
}

window.addEventListener("scroll", handleBackToTopVisibility);

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* =========================================
   SCROLL PROGRESS BAR
========================================== */
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  if (!scrollProgress) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

/* =========================================
   FOOTER YEAR
========================================== */
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =========================================
   PREMIUM TILT EFFECT
   Only applies to cards with class .tilt-card
========================================== */
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* =========================================
   FORMSPREE AJAX CONTACT FORM
========================================== */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const action = contactForm.getAttribute("action");

    if (!action) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formStatus.textContent = "";

    try {
      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        contactForm.reset();
        formStatus.textContent = "Thank you. Your enquiry has been sent successfully.";
        submitBtn.textContent = "Send Enquiry";
        submitBtn.disabled = false;
      } else {
        const data = await response.json().catch(() => null);

        if (data && data.errors && data.errors.length > 0) {
          formStatus.textContent = data.errors.map((err) => err.message).join(", ");
        } else {
          formStatus.textContent = "Something went wrong. Please try again.";
        }

        submitBtn.textContent = "Send Enquiry";
        submitBtn.disabled = false;
      }
    } catch (error) {
      formStatus.textContent = "Network error. Please try again.";
      submitBtn.textContent = "Send Enquiry";
      submitBtn.disabled = false;
    }
  });
}