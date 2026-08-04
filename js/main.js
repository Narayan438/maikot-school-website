document.title=SCHOOL.nameNp;
document.addEventListener("DOMContentLoaded", () => {
  document.title = SCHOOL.info.nameNp;
});
"use strict";

document.addEventListener(
  "componentsLoaded",
  initializeWebsite
);

function initializeWebsite() {
  applySchoolConfiguration();
  setupPreloader();
}

function applySchoolConfiguration() {
  document.title = SCHOOL.info.nameNp;

  document.documentElement.style.setProperty(
    "--primary",
    SCHOOL.theme.primary
  );

  document.documentElement.style.setProperty(
    "--primary-dark",
    SCHOOL.theme.secondary
  );

  document.documentElement.style.setProperty(
    "--accent",
    SCHOOL.theme.accent
  );

  const logo = document.getElementById("preloaderLogo");
  const schoolName =
    document.getElementById("preloaderSchoolName");
  const address =
    document.getElementById("preloaderAddress");

  if (logo) {
    logo.src = SCHOOL.assets.logo;
    logo.alt = `${SCHOOL.info.nameNp} लोगो`;
  }

  if (schoolName) {
    schoolName.textContent = SCHOOL.info.nameNp;
  }

  if (address) {
    address.textContent = SCHOOL.info.address;
  }
}

function setupPreloader() {
  const preloader =
    document.getElementById("sitePreloader");

  if (!preloader) {
    return;
  }

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("is-hidden");

      setTimeout(() => {
        preloader.remove();
      }, 700);
    }, 800);
  });
}