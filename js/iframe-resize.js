/**
 * iframe-resize.js — auto-resize MicroSim iframes via postMessage height reports.
 *
 * Works with MkDocs Material instant-loading: registers a document-level
 * message listener once, and re-requests heights on page navigation and
 * on window focus (so returning from a fullscreen tab restores the correct height).
 */
(function () {
  'use strict';

  function requestHeights() {
    document.querySelectorAll('iframe').forEach(function (iframe) {
      try {
        iframe.contentWindow.postMessage({ type: 'microsim-height-request' }, '*');
      } catch (e) {}
    });
  }

  /* Match a postMessage to the iframe that sent it and resize it. */
  window.addEventListener('message', function (e) {
    if (!e.data || e.data.type !== 'microsim-height') return;
    document.querySelectorAll('iframe').forEach(function (iframe) {
      try {
        if (iframe.contentWindow === e.source) {
          iframe.style.height = (e.data.height + 20) + 'px';
        }
      } catch (err) {}
    });
  });

  /* Request heights after the page (or navigated page) is ready. */
  function onPageReady() {
    setTimeout(requestHeights, 300);
  }

  /* MkDocs Material instant-loading fires this custom event on navigation. */
  document.addEventListener('DOMContentSwapped', onPageReady);

  /* Initial page load */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onPageReady);
  } else {
    onPageReady();
  }

  /* Re-request when the user returns to this tab after closing a fullscreen tab. */
  window.addEventListener('focus', requestHeights);
})();
