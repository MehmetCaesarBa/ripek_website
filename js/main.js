/* =========================================================
   Ripek — general site behaviour
   Mobile nav toggle + active nav-link highlighting
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  var path = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("active");
    }
  });
});
