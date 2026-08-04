"use strict";

/* =====================================================
   Theme Module
===================================================== */

/**
 * Applies school theme colors to CSS variables.
 *
 * @param {Object} theme
 */
function applyTheme(theme = {}) {
  const root = document.documentElement;

  const themeVariables = {
    primary: "--primary",
    secondary: "--primary-dark",
    accent: "--accent"
  };

  Object.entries(themeVariables).forEach(
    ([themeKey, cssVariable]) => {
      const colorValue = theme[themeKey];

      if (colorValue) {
        root.style.setProperty(
          cssVariable,
          colorValue
        );
      }
    }
  );
}