/**
 * microsim-controls.js  —  EE2301-style MicroSim navigation controls
 *
 * MODE DETECTION
 * ─────────────
 *   embedded  : running inside an <iframe> on a chapter page
 *               → shows [⛶ Fullscreen] only
 *               → clicking opens the sim in a new tab with ?fs=1
 *
 *   fullscreen : standalone tab opened via the Fullscreen button (?fs=1)
 *               → shows [Back to Doc] and [⛶ Exit Full]
 *               → "Back to Doc" / "Exit Full" close the tab (returns user
 *                  to the chapter page that opened it)
 *
 *   standalone : sim loaded directly (no iframe, no ?fs=1)
 *               → shows [Back to Doc] only (navigates to sim index page)
 *
 * WHY NO NATIVE FULLSCREEN API
 * ────────────────────────────
 *   The chapter-page iframes don't carry allowfullscreen / allow="fullscreen".
 *   Calling requestFullscreen() on window.frameElement triggers a 3-second
 *   browser permission overlay then a rejection.  Opening a new tab is
 *   instant, clean, and matches the EE2301 fullscreen-toggle.js pattern.
 *
 * STYLE — EE2301 convention
 * ─────────────────────────
 *   rgba(255,255,255,0.92) background · #5C6BC0 text · 1px solid #ccc border
 *   border-radius 4px · padding 3px 10px · Arial 11px bold · opacity 0.75→1
 *   position fixed · top 4px · right 4px · z-index 10000
 */
(function () {
  'use strict';

  /* ── Style block ─────────────────────────────────────────────────────────── */
  var CSS = [
    '.msim-controls-bar{',
    '  position:fixed;top:4px;right:4px;z-index:10000;',
    '  display:flex;gap:6px;align-items:center;',
    '}',
    '.msim-ctrl-btn{',
    '  background:rgba(255,255,255,0.92);',
    '  color:#5C6BC0;',
    '  border:1px solid #ccc;',
    '  border-radius:4px;',
    '  padding:3px 10px;',
    '  font-size:11px;font-weight:bold;line-height:1.4;',
    '  font-family:Arial,Helvetica,sans-serif;',
    '  cursor:pointer;',
    '  opacity:0.75;',
    '  transition:background 0.2s,opacity 0.3s;',
    '  white-space:nowrap;',
    '  text-decoration:none;',
    '  user-select:none;',
    '}',
    '.msim-ctrl-btn:hover{background:rgba(255,255,255,1);opacity:1;}',
    '.msim-ctrl-btn:active{background:#e8eaf6;}',
  ].join('');

  /* ── Helpers ─────────────────────────────────────────────────────────────── */
  function makeBtn(label, title, onClick) {
    var b = document.createElement('button');
    b.className   = 'msim-ctrl-btn';
    b.textContent = label;
    b.title       = title;
    b.addEventListener('click', onClick);
    return b;
  }

  function closeOrBack() {
    /* Close the fullscreen tab — returns user to the chapter page.
       Falls back to history.back() if the tab was not script-opened. */
    try {
      window.close();
      /* window.close() is async; if it worked the page is gone.
         Give it 400ms then fall back. */
      setTimeout(function () {
        if (!window.closed) { window.history.back(); }
      }, 400);
    } catch (e) {
      window.history.back();
    }
  }

  /* ── Mode detection ──────────────────────────────────────────────────────── */
  var inIframe = (window !== window.top);
  var fsParam  = false;
  try {
    fsParam = (new URLSearchParams(window.location.search)).get('fs') === '1';
  } catch (e) {
    fsParam = /[?&]fs=1/.test(window.location.search);
  }

  /* embedded  → iframe, no ?fs
     fullscreen → new tab with ?fs=1
     standalone → direct URL, no iframe, no ?fs           */
  var mode = inIframe ? 'embedded' : (fsParam ? 'fullscreen' : 'standalone');

  /* ── Build bar ───────────────────────────────────────────────────────────── */
  function buildBar() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'msim-controls-bar';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'MicroSim controls');

    if (mode === 'embedded') {
      /* ── Embedded: Fullscreen only ──────────────────────────────────────── */
      var fsBtn = makeBtn('\u26F6 Fullscreen', 'Open in fullscreen view', function () {
        var url = new URL(window.location.href);
        url.searchParams.set('fs', '1');
        window.open(url.toString(), '_blank');
      });
      bar.appendChild(fsBtn);

    } else if (mode === 'fullscreen') {
      /* ── Fullscreen tab: Back to Doc + Exit Full ────────────────────────── */
      var backBtn = makeBtn('Back to Doc', 'Close this view and return to the course page', closeOrBack);
      var exitBtn = makeBtn('\u26F6 Exit Full', 'Close this fullscreen view', closeOrBack);
      bar.appendChild(backBtn);
      bar.appendChild(exitBtn);

    } else {
      /* ── Standalone: Back to Doc only ───────────────────────────────────── */
      var standaloneBack = makeBtn('Back to Doc', 'Go to the sim description page', function () {
        window.location.href = './';
      });
      bar.appendChild(standaloneBack);
    }

    document.body.appendChild(bar);
  }

  /* ── Init ────────────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildBar);
  } else {
    buildBar();
  }
})();
