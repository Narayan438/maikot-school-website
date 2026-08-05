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

  const response = await fetch(componentPath);

  if (!response.ok) {
    throw new Error(
      `Failed to load ${componentPath}: ${response.status}`
    );
  }

  container.innerHTML = await response.text();
}

/**
 * Loads all shared website components before initialization.
 */
async function loadAllComponents() {
  try {
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
      ),
      loadComponent(
        "#navbarComponent",
        "components/navbar.html"
      )
    ]);
  } catch (error) {
    console.error("Website components could not be loaded.", error);
  } finally {
    document.dispatchEvent(
      new CustomEvent("componentsLoaded")
    );
  }
}

document.addEventListener(
  "DOMContentLoaded",
  loadAllComponents,
  { once: true }
);
