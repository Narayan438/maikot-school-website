"use strict";

/* =====================================================
   Header Module
===================================================== */

/**
 * Initializes the main school header.
 *
 * @param {Object} school
 */
function initializeHeader(school) {
  if (!school || typeof school !== "object") {
    return;
  }

  setHeaderLogo(school);
  setHeaderSchoolInformation(school.info);
  setHeaderPhone(school.contact?.phone);
  setHeaderDownload(school.downloads?.prospectus);
}


/**
 * Sets the school logo.
 *
 * @param {Object} school
 */
function setHeaderLogo(school) {
  const logo =
    document.getElementById("headerLogo");

  if (!logo || !school.assets?.logo) {
    return;
  }

  logo.src = school.assets.logo;
  logo.alt = `${school.info?.nameNp || "विद्यालय"} लोगो`;
}


/**
 * Sets school name and establishment information.
 *
 * @param {Object} info
 */
function setHeaderSchoolInformation(info = {}) {
  const nameNp =
    document.getElementById("headerSchoolNameNp");

  const nameEn =
    document.getElementById("headerSchoolNameEn");

  const established =
    document.getElementById("headerEstablished");

  if (nameNp) {
    nameNp.textContent = info.nameNp || "";
  }

  if (nameEn) {
    nameEn.textContent = info.nameEn || "";
  }

  if (established) {
    established.textContent = info.established
      ? `स्थापितः ${info.established}`
      : "";
  }
}


/**
 * Sets the header phone button.
 *
 * @param {string} phone
 */
function setHeaderPhone(phone) {
  const callButton =
    document.getElementById("headerCallButton");

  const phoneText =
    document.getElementById("headerPhoneText");

  if (!callButton || !phoneText || !phone) {
    return;
  }

  phoneText.textContent = phone;
  callButton.href = `tel:${phone.replace(/\s+/g, "")}`;
  callButton.hidden = false;
}


/**
 * Sets the prospectus download button.
 *
 * @param {string} fileUrl
 */
function setHeaderDownload(fileUrl) {
  const downloadButton =
    document.getElementById("headerDownloadButton");

  if (!downloadButton || !fileUrl) {
    return;
  }

  downloadButton.href = fileUrl;
  downloadButton.hidden = false;
}