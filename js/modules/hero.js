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
  const title =
    document.getElementById("heroTitle");

  const subtitle =
    document.getElementById("heroSubtitle");

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
 * Renders hero background slides.
 *
 * @param {HTMLElement} container
 * @param {Array} slides
 */
function renderHeroSlides(container, slides) {
  container.innerHTML = slides
    .map(
      (slide, index) => `
        <div
          class="hero-slide${index === 0 ? " is-active" : ""}"
          style="background-image: url('${slide.image}')"
          role="img"
          aria-label="${slide.alt || ""}"
        ></div>
      `
    )
    .join("");
}


/**
 * Renders hero navigation dots.
 *
 * @param {HTMLElement} container
 * @param {number} slideCount
 */
function renderHeroDots(container, slideCount) {
  container.innerHTML = Array.from(
    { length: slideCount },
    (_, index) => `
      <button
        class="hero-dot${index === 0 ? " is-active" : ""}"
        type="button"
        aria-label="स्लाइड ${index + 1}"
        data-slide-index="${index}"
      ></button>
    `
  ).join("");
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

    currentIndex = index;

    slides[currentIndex]?.classList.add("is-active");
    dots[currentIndex]?.classList.add("is-active");
  };

  const startAutoPlay = () => {
    sliderTimer = window.setInterval(() => {
      const nextIndex =
        (currentIndex + 1) % slides.length;

      showSlide(nextIndex);
    }, HERO_SLIDE_INTERVAL);
  };

  const restartAutoPlay = () => {
    window.clearInterval(sliderTimer);
    startAutoPlay();
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      restartAutoPlay();
    });
  });

  startAutoPlay();
}