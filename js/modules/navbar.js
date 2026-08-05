"use strict";

/**
 * Initializes the responsive navigation menu.
 */
function initializeNavbar() {
  const menuButton =
    document.getElementById("mobileMenuButton");

  const navigation =
    document.getElementById("primaryNavigation");

  if (!menuButton || !navigation) {
    return;
  }

  const setMenuState = (isOpen) => {
    navigation.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "मेनु बन्द गर्नुहोस्" : "मेनु खोल्नुहोस्"
    );

    const icon = menuButton.querySelector("[aria-hidden='true']");

    if (icon) {
      icon.textContent = isOpen ? "✕" : "☰";
    }
  };

  menuButton.addEventListener("click", () => {
    setMenuState(!navigation.classList.contains("is-open"));
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
      menuButton.focus();
    }
  });

  document.addEventListener("click", (event) => {
    const navbar = document.getElementById("siteNavbar");

    if (
      navigation.classList.contains("is-open") &&
      navbar &&
      !navbar.contains(event.target)
    ) {
      setMenuState(false);
    }
  });

  const desktopMedia =
    window.matchMedia("(min-width: 901px)");

  const closeOnDesktop = (event) => {
    if (event.matches) {
      setMenuState(false);
    }
  };

  desktopMedia.addEventListener?.("change", closeOnDesktop);
}
