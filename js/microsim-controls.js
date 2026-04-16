/**
 * microsim-controls.js
 * Injects "Fullscreen" and "Back to Doc" controls into every MicroSim.
 * Include once before </body> in each sim HTML file.
 *
 * Behavior:
 *   Fullscreen  — expands the iframe (or the document when standalone)
 *                 to fill the screen; button label toggles to "Exit Full".
 *   Back to Doc — if inside an iframe, navigates the top frame back in
 *                 browser history (returns to the embedding chapter page);
 *                 if standalone, navigates to the sim's index page (./).
 *
 * Style: matches EE2301 intelligent-textbook MicroSim control convention —
 *   small semi-transparent white pill, #5C6BC0 purple text, 0.75 opacity,
 *   fixed top-right corner at 4px offset, 1px #ccc border, Arial 11px bold.
 */
(function () {
  'use strict';

  /* ── Styles — EE2301 convention ─────────────────────────────────────────── */
  var CSS = [
    '.msim-controls-bar {',
    '  position: fixed;',
    '  top: 4px;',
    '  right: 4px;',
    '  z-index: 10000;',
    '  display: flex;',
    '  gap: 6px;',
    '  align-items: center;',
    '}',

    '.msim-ctrl-btn {',
    '  background: rgba(255, 255, 255, 0.92);',
    '  color: #5C6BC0;',
    '  border: 1px solid #ccc;',
    '  border-radius: 4px;',
    '  padding: 3px 10px;',
    '  font-size: 11px;',
    '  font-weight: bold;',
    '  line-height: 1.4;',
    '  cursor: pointer;',
    '  font-family: Arial, Helvetica, sans-serif;',
    '  opacity: 0.75;',
    '  transition: background 0.2s, opacity 0.3s;',
    '  white-space: nowrap;',
    '  text-decoration: none;',
    '}',

    '.msim-ctrl-btn:hover {',
    '  background: rgba(255, 255, 255, 1);',
    '  opacity: 1;',
    '}',

    '.msim-ctrl-btn:active {',
    '  background: #e8eaf6;',
    '}',
  ].join('\n');

  function injectStyles() {
    var s = document.createElement('style');
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ── Fullscreen ──────────────────────────────────────────────────────────── */
  function isFullscreen() {
    try {
      return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        (window !== window.top &&
          (window.top.document.fullscreenElement ||
           window.top.document.webkitFullscreenElement))
      );
    } catch (e) {
      return !!document.fullscreenElement;
    }
  }

  function requestFs(el) {
    if (el.requestFullscreen)       return el.requestFullscreen();
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
  }

  function exitFs() {
    try {
      if (window !== window.top) {
        var td = window.top.document;
        if (td.exitFullscreen)       return td.exitFullscreen();
        if (td.webkitExitFullscreen) return td.webkitExitFullscreen();
      }
    } catch (e) {}
    if (document.exitFullscreen)       return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  }

  function toggleFullscreen(btn) {
    if (isFullscreen()) {
      exitFs();
    } else {
      var target = document.documentElement;
      /* Prefer to fullscreen the iframe element so the sim fills the screen */
      if (window !== window.top) {
        try { target = window.frameElement || target; } catch (e) {}
      }
      requestFs(target).catch(function () {
        /* Fallback: open sim in a new tab at full size */
        window.open(window.location.href, '_blank');
      });
    }
    /* Button label update is handled by the fullscreenchange listener */
  }

  function updateFsLabel(btn) {
    btn.textContent = isFullscreen() ? '\u26F6 Exit Full' : '\u26F6 Fullscreen';
    btn.title       = isFullscreen() ? 'Exit fullscreen' : 'Open in fullscreen';
  }

  /* ── Back to Doc ─────────────────────────────────────────────────────────── */
  function goBackToDoc() {
    if (window !== window.top) {
      /* Inside an iframe — send the embedding chapter page backwards */
      try {
        window.top.history.back();
        return;
      } catch (e) { /* cross-origin; fall through */ }
    }
    /* Standalone sim page — go to the sim's index (MkDocs page) */
    window.location.href = './';
  }

  /* ── Build the bar ───────────────────────────────────────────────────────── */
  function buildBar() {
    var bar = document.createElement('div');
    bar.className = 'msim-controls-bar';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'MicroSim navigation controls');

    /* Back to Doc */
    var backBtn = document.createElement('button');
    backBtn.className = 'msim-ctrl-btn';
    backBtn.textContent = 'Back to Doc';
    backBtn.title = 'Return to the course document';
    backBtn.addEventListener('click', goBackToDoc);

    /* Fullscreen */
    var fsBtn = document.createElement('button');
    fsBtn.className = 'msim-ctrl-btn';
    updateFsLabel(fsBtn);
    fsBtn.addEventListener('click', function () { toggleFullscreen(fsBtn); });

    /* Update label whenever fullscreen state changes */
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(function (ev) {
      document.addEventListener(ev, function () { updateFsLabel(fsBtn); });
      try {
        window.top.document.addEventListener(ev, function () { updateFsLabel(fsBtn); });
      } catch (e) {}
    });

    bar.appendChild(backBtn);
    bar.appendChild(fsBtn);
    document.body.appendChild(bar);
  }

  /* ── Init ────────────────────────────────────────────────────────────────── */
  function init() {
    injectStyles();
    buildBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
