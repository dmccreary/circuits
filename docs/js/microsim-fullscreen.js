document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".md-typeset iframe").forEach(function (iframe) {
    const src = iframe.getAttribute("src");
    if (!src || !src.includes("sims/")) return;

    const wrapper = iframe.parentElement;
    wrapper.style.position = "relative";

    const btn = document.createElement("a");
    btn.href = src;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.innerHTML = "&#x2922; Full page";
    btn.className = "microsim-fullscreen-btn";

    wrapper.insertBefore(btn, iframe);
  });
});
