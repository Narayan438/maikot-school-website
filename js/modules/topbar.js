"use strict";

/* =====================================================
   Topbar Module
===================================================== */

/**
 * Initializes the top information bar.
 *
 * @param {Object} school
 */
function initializeTopbar(school) {
  if (!school || typeof school !== "object") {
    return;
  }

  setTopbarAddress(school.info?.address);
  setTopbarPhone(school.contact?.phone);
  setTopbarEmail(school.contact?.email);
  setTopbarSocialLinks(school.social);
}

/**
 * Sets the school address.
 *
 * @param {string} address
 */
function setTopbarAddress(address) {
  const addressElement =
    document.getElementById("topbarAddress");

  if (addressElement) {
    addressElement.textContent = address || "";
  }
}

/**
 * Sets the school phone number.
 *
 * @param {string} phone
 */
function setTopbarPhone(phone) {
  const phoneLink =
    document.getElementById("topbarPhone");

  const phoneText =
    document.getElementById("topbarPhoneText");

  if (!phoneLink || !phoneText || !phone) {
    return;
  }

  phoneText.textContent = phone;
  phoneLink.href = `tel:${phone.replace(/\s+/g, "")}`;
  phoneLink.hidden = false;
}

/**
 * Sets the school email address.
 *
 * @param {string} email
 */
function setTopbarEmail(email) {
  const emailLink =
    document.getElementById("topbarEmail");

  const emailText =
    document.getElementById("topbarEmailText");

  if (!emailLink || !emailText || !email) {
    return;
  }

  emailText.textContent = email;
  emailLink.href = `mailto:${email}`;
  emailLink.hidden = false;
}

/**
 * Sets social media links.
 *
 * @param {Object} social
 */
function setTopbarSocialLinks(social = {}) {
  const socialLinks = {
    facebook: "topbarFacebook",
    youtube: "topbarYouTube",
    tiktok: "topbarTikTok"
  };

  Object.entries(socialLinks).forEach(
    ([platform, elementId]) => {
      const element =
        document.getElementById(elementId);

      const url = social?.[platform];

      if (element && url) {
        element.href = url;
        element.hidden = false;
      }
    }
  );
}