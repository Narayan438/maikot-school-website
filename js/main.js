"use strict";

/* =====================================================
   Website Initialization
===================================================== */

document.addEventListener(
  "componentsLoaded",
  initializeWebsite
);

function initializeWebsite() {
  setupPreloader();

  if (typeof SCHOOL === "undefined") {
    console.error(
      "School configuration is not available."
    );
    return;
  }

  applySchoolConfiguration();
  initializeTopbar(SCHOOL);
  initializeHeader(SCHOOL);
  initializeHero(SCHOOL.hero);
  initializePrincipal(SCHOOL.principal);
}
/* =====================================================
   School Configuration
===================================================== */

function applySchoolConfiguration() {
  if (typeof SCHOOL === "undefined") {
    console.error("School configuration is not available.");
    return;
  }

  document.title = SCHOOL.info.nameNp;

  applyTheme(SCHOOL.theme);
  applyPreloaderContent();
}

/* =====================================================
   Preloader Content
===================================================== */

function applyPreloaderContent() {
  const logo =
    document.getElementById("preloaderLogo");

  const schoolName =
    document.getElementById("preloaderSchoolName");

  const address =
    document.getElementById("preloaderAddress");

  if (logo && SCHOOL.assets?.logo) {
    logo.src = SCHOOL.assets.logo;
    logo.alt = `${SCHOOL.info.nameNp} लोगो`;
  }

  if (schoolName) {
    schoolName.textContent =
      SCHOOL.info.nameNp;
  }

  if (address) {
    address.textContent =
      SCHOOL.info.address;
  }
}


/* =====================================================
   Preloader
===================================================== */

function setupPreloader() {
  const preloader =
    document.getElementById("sitePreloader");

  if (!preloader) {
    return;
  }

  const hidePreloader = () => {
    window.setTimeout(() => {
      preloader.classList.add("is-hidden");

      window.setTimeout(() => {
        preloader.remove();
      }, 700);
    }, 800);
  };

  /*
   * Components fetch भएर आउँदासम्म window load
   * भइसकेको हुन सक्छ। त्यसैले दुवै अवस्था जाँचिएको हो।
   */
  if (document.readyState === "complete") {
    hidePreloader();
  } else {
    window.addEventListener(
      "load",
      hidePreloader,
      { once: true }
    );
  }
}