"use strict";

/* =====================================================
   Principal Message Module
===================================================== */

/**
 * Initializes the principal message section.
 *
 * @param {Object} principal
 */
function initializePrincipal(principal) {
  if (!principal || typeof principal !== "object") {
    return;
  }

  setPrincipalPhoto(principal);
  setPrincipalIdentity(principal);
  setPrincipalMessage(principal);
  setPrincipalPageLink(principal.pageUrl);
}


/**
 * Sets the principal photo.
 *
 * @param {Object} principal
 */
function setPrincipalPhoto(principal) {
  const photo =
    document.getElementById("principalPhoto");

  if (!photo || !principal.photo) {
    return;
  }

  photo.src = principal.photo;
  photo.alt =
    `${principal.name || "प्रधानाध्यापक"}को फोटो`;
}


/**
 * Sets principal name and designation.
 *
 * @param {Object} principal
 */
function setPrincipalIdentity(principal) {
  const name =
    document.getElementById("principalName");

  const designation =
    document.getElementById(
      "principalDesignation"
    );

  const signatureName =
    document.getElementById(
      "principalSignatureName"
    );

  if (name) {
    name.textContent = principal.name || "";
  }

  if (designation) {
    designation.textContent =
      principal.designation || "";
  }

  if (signatureName) {
    signatureName.textContent =
      principal.name || "";
  }
}


/**
 * Sets the principal message.
 *
 * @param {Object} principal
 */
function setPrincipalMessage(principal) {
  const message =
    document.getElementById(
      "principalMessageText"
    );

  if (message) {
    message.textContent =
      principal.message || "";
  }
}


/**
 * Sets the full message page link.
 *
 * @param {string} pageUrl
 */
function setPrincipalPageLink(pageUrl) {
  const readMoreButton =
    document.getElementById(
      "principalReadMore"
    );

  if (!readMoreButton) {
    return;
  }

  if (!pageUrl) {
    readMoreButton.hidden = true;
    return;
  }

  readMoreButton.href = pageUrl;
}