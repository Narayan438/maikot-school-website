"use strict";

/* =====================================================
   Hero Slider Module
===================================================== */

const HERO_SLIDE_INTERVAL = 5000;

/**
 * Initializes the hero slider.
 *
 * @param {Object} hero
 */
function initializeHero(hero) {
  if (!hero || typeof hero !== "object") {
    return;
  }

  const slidesContainer =
    document.getElementById("heroSlides");

  const dotsContainer =
    document.getElementById("heroDots");

  if (!slidesContainer || !dotsContainer) {
    return;
  }

  const slides = Array.isArray(hero.slides)
    ? hero.slides
    : [];

  if (!slides.length) {
    return;
  }

  setHeroContent(hero);
  renderHeroSlides(slidesContainer, slides);
  renderHeroDots(dotsContainer, slides.length);
  startHeroSlider();
}

/**
 * Sets hero heading and buttons.
 *
 * @param {Object} hero
 */
function setHeroContent(hero) {
  const title = document.getElementById("heroTitle");
  const subtitle = document.getElementById("heroSubtitle");
  const primaryButton =
    document.getElementById("heroPrimaryButton");
  const secondaryButton =
    document.getElementById("heroSecondaryButton");

  if (title) {
    title.textContent = hero.title || "";
  }

  if (subtitle) {
    subtitle.textContent = hero.subtitle || "";
  }

  if (primaryButton) {
    primaryButton.textContent =
      hero.primaryButton?.text || "";
    primaryButton.href =
      hero.primaryButton?.url || "#";
  }

  if (secondaryButton) {
    secondaryButton.textContent =
      hero.secondaryButton?.text || "";
    secondaryButton.href =
      hero.secondaryButton?.url || "#";
  }
}

/**
 * Renders hero background slides using DOM APIs.
 *
 * @param {HTMLElement} container
 * @param {Array} slides
 */
function renderHeroSlides(container, slides) {
  const fragment = document.createDocumentFragment();

  slides.forEach((slide, index) => {
    const slideElement = document.createElement("div");

    slideElement.className =
      `hero-slide${index === 0 ? " is-active" : ""}`;
    slideElement.style.backgroundImage =
      `url("${String(slide.image || "").replace(/"/g, "%22")}")`;
    slideElement.setAttribute("role", "img");
    slideElement.setAttribute(
      "aria-label",
      slide.alt || ""
    );

    fragment.appendChild(slideElement);
  });

  container.replaceChildren(fragment);
}

/**
 * Renders hero navigation dots.
 *
 * @param {HTMLElement} container
 * @param {number} slideCount
 */
function renderHeroDots(container, slideCount) {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < slideCount; index += 1) {
    const dot = document.createElement("button");

    dot.className =
      `hero-dot${index === 0 ? " is-active" : ""}`;
    dot.type = "button";
    dot.dataset.slideIndex = String(index);
    dot.setAttribute("aria-label", `स्लाइड ${index + 1}`);

    if (index === 0) {
      dot.setAttribute("aria-current", "true");
    }

    fragment.appendChild(dot);
  }

  container.replaceChildren(fragment);
}

/**
 * Starts automatic and manual slide navigation.
 */
function startHeroSlider() {
  const slides = Array.from(
    document.querySelectorAll(".hero-slide")
  );

  const dots = Array.from(
    document.querySelectorAll(".hero-dot")
  );

  if (!slides.length) {
    return;
  }

  let currentIndex = 0;
  let sliderTimer = null;

  const showSlide = (index) => {
    slides[currentIndex]?.classList.remove("is-active");
    dots[currentIndex]?.classList.remove("is-active");
    dots[currentIndex]?.removeAttribute("aria-current");

    currentIndex = index;

    slides[currentIndex]?.classList.add("is-active");
    dots[currentIndex]?.classList.add("is-active");
    dots[currentIndex]?.setAttribute("aria-current", "true");
  };

  const stopAutoPlay = () => {
    if (sliderTimer !== null) {
      window.clearInterval(sliderTimer);
      sliderTimer = null;
    }
  };

  const startAutoPlay = () => {
    stopAutoPlay();

    if (slides.length < 2 || document.hidden) {
      return;
    }

    sliderTimer = window.setInterval(() => {
      showSlide((currentIndex + 1) % slides.length);
    }, HERO_SLIDE_INTERVAL);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startAutoPlay();
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  startAutoPlay();
}
