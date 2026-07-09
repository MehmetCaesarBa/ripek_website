/* =========================================================
   Ripek — i18n engine
   Default language on first visit: Turkish (tr).
   Choice is remembered in localStorage for later visits.
   ========================================================= */

(function () {
  var STORAGE_KEY = "ripek_lang";
  var DEFAULT_LANG = "tr";

  function getNested(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  function applyTranslations(lang) {
    var dict = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) ||
      (window.TRANSLATIONS && window.TRANSLATIONS[DEFAULT_LANG]);
    if (!dict) return;

    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = getNested(dict, key);
      if (val !== undefined) el.textContent = val;
    });

    var titleKey = document.documentElement.getAttribute("data-title-key");
    if (titleKey) {
      var title = getNested(dict, titleKey);
      if (title) document.title = title;
    }

    var btnLabel = document.getElementById("langBtnLabel");
    if (btnLabel) btnLabel.textContent = lang.toUpperCase();

    document.querySelectorAll(".lang-dropdown li").forEach(function (li) {
      li.classList.toggle("selected", li.getAttribute("data-lang") === lang);
    });

    var phone = getNested(dict, "contacts.phone");
    if (phone) {
      document.querySelectorAll("[data-i18n-tel]").forEach(function (el) {
        el.setAttribute("href", "tel:" + phone.replace(/\s+/g, ""));
      });
    }
  }

  function setLanguage(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    applyTranslations(lang);
  }

  function currentLanguage() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
    // No stored preference yet -> automatically default to Turkish.
    return saved || DEFAULT_LANG;
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyTranslations(currentLanguage());

    var langBtn = document.getElementById("langBtn");
    var dropdown = document.getElementById("langDropdown");

    if (langBtn && dropdown) {
      langBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = dropdown.classList.toggle("open");
        langBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      dropdown.querySelectorAll("li").forEach(function (li) {
        li.addEventListener("click", function () {
          setLanguage(li.getAttribute("data-lang"));
          dropdown.classList.remove("open");
          langBtn.setAttribute("aria-expanded", "false");
        });
      });

      document.addEventListener("click", function () {
        dropdown.classList.remove("open");
        langBtn.setAttribute("aria-expanded", "false");
      });

      dropdown.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          dropdown.classList.remove("open");
          langBtn.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
})();
