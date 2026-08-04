"use strict";

/**
 * Loads an HTML component into a selected element.
 *
 * @param {string} selector
 * @param {string} componentPath
 * @returns {Promise<void>}
 */
async function loadComponent(selector, componentPath) {
  const container = document.querySelector(selector);

  if (!container) {
    console.warn(`Component container not found: ${selector}`);
    return;
  }

  try {
    const response = await fetch(componentPath);

    if (!response.ok) {
      throw new Error(
        `Failed to load ${componentPath}: ${response.status}`
      );
    }

    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

/**
 * Loads all shared website components.
 */
async function loadAllComponents() {
  await Promise.all([
    loadComponent(
      "#preloaderComponent",
      "components/preloader.html"
    ),

    loadComponent(
      "#topbarComponent",
      "components/topbar.html"
    ),

    loadComponent(
      "#headerComponent",
      "components/header.html"
    )
  ]);
  loadComponent(
  "#navbarComponent",
  "components/navbar.html"
),

  document.dispatchEvent(
    new CustomEvent("componentsLoaded")
  );
}

document.addEventListener(
  "DOMContentLoaded",
  loadAllComponents
);