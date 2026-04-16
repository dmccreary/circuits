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
 */
(function () {
  'use strict';

  /* ── Styles ─────────────────────────────────────────────────────────────── */
  var CSS = [
    '.msim-controls-bar {',
    '  position: fixed;',
    '  top: 8px;',
    '  right: 8px;',
    '  z-index: 99999;',
    '  display: flex;',
    '  gap: 5px;',
    '  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;',
    '}',

    '.msim-ctrl-btn {',
    '  background: rgba(8, 4, 32, 0.80);',
    '  color: #c4b5fd;',
    '  border: 1px solid rgba(90, 62, 237, 0.55);',
    '  border-radius: 6px;',
    '  padding: 5px 11px;',
    '  font-size: 11px;',
    '  font-weight: 600;',
    '  line-height: 1;',
    '  cursor: pointer;',
    '  letter-spacing: 0.02em;',
    '  backdrop-filter: blur(6px);',
    '  -webkit-backdrop-filter: blur(6px);',
    '  transition: background 0.18s, color 0.18s, border-color 0.18s;',
    '  user-select: none;',
    '  white-space: nowrap;',
    '}',

    '.msim-ctrl-btn:hover {',
    '  background: rgba(90, 62, 237, 0.88);',
    '  color: #fff;',
    '  border-color: rgba(160, 130, 255, 0.80);',
    '}',

    '.msim-ctrl-btn:active {',
    '  background: rgba(65, 40, 190, 0.96);',
    '}',

    /* Wider tap targets on touch screens */
    '@media (max-width: 540px) {',
    '  .msim-controls-bar { top: 4px; right: 4px; gap: 4px; }',
    '  .msim-ctrl-btn { padding: 6px 9px; font-size: 10px; }',
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
    btn.textContent = isFullscreen() ? '\u22BF Exit Full' : '\u22BF Fullscreen';
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
    backBtn.textContent = '\u2190 Back';
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
