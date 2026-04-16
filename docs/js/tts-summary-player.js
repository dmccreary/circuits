/**
 * TTS Summary Player — Circuits 1
 *
 * Generates an EE2301-style "Audio Summary" card above every
 * <details class="video-overview"> element on a chapter page.
 *
 * Uses the Web Speech API for browser-native narration.
 * Features: Play/Pause, Stop, Speed selector (0.75×–1.5×),
 *            Voice selector (en voices), progress bar, chunk highlighting.
 *
 * No audio files required — fully self-contained TTS.
 */
(function () {
  'use strict';

  var synth = window.speechSynthesis;
  if (!synth) return;

  /* ── SVG icons ──────────────────────────────────────────────────── */
  var ICON_PLAY =
    '<svg class="tsp-icon-play" viewBox="0 0 24 24" fill="currentColor">' +
    '<polygon points="7,4 21,12 7,20"/></svg>';
  var ICON_PAUSE =
    '<svg class="tsp-icon-pause" viewBox="0 0 24 24" fill="currentColor">' +
    '<rect x="5" y="4" width="4" height="16"/><rect x="15" y="4" width="4" height="16"/></svg>';
  var ICON_STOP =
    '<svg viewBox="0 0 24 24" fill="currentColor">' +
    '<rect x="5" y="5" width="14" height="14" rx="1"/></svg>';
  var ICON_HEADPHONES =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">' +
    '<path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-3' +
    'c0-1.1-.9-2-2-2H5v-2a7 7 0 1 1 14 0v2h-2c-1.1 0-2 .9-2 2v3c0 1.1' +
    '.9 2 2 2h2c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg>';

  var SPEEDS = [0.75, 1, 1.25, 1.5];
  var DEFAULT_SPEED = 1;

  /* ── Global playback state (one player active at a time) ────────── */
  var S = {
    playing: false,
    paused: false,
    chunks: [],
    chunkIndex: 0,
    utterance: null,
    container: null,
    details: null,
    speed: DEFAULT_SPEED,
    voice: null,
    keepAliveTimer: null
  };

  /* ── Voices ─────────────────────────────────────────────────────── */
  function enVoices() {
    var all = synth.getVoices();
    var en = all.filter(function (v) { return v.lang && v.lang.startsWith('en'); });
    return en.length ? en : all.slice(0, 12);
  }

  function populateVoiceSelect(sel) {
    var prev = parseInt(sel.value, 10) || 0;
    sel.innerHTML = '';
    enVoices().forEach(function (v, i) {
      var opt = document.createElement('option');
      opt.value = i;
      opt.textContent = v.name.replace(/Microsoft |Google /, '') +
        (v.lang !== 'en-US' ? ' (' + v.lang + ')' : '');
      if (i === prev) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  function updateAllSelects() {
    var sels = document.querySelectorAll('.tsp-voice-select');
    for (var i = 0; i < sels.length; i++) populateVoiceSelect(sels[i]);
  }

  if (typeof synth.onvoiceschanged !== 'undefined') {
    synth.onvoiceschanged = updateAllSelects;
  }

  /* ── Keep-alive — Chrome silently dies after ~15s without this ──── */
  function startKA() {
    stopKA();
    S.keepAliveTimer = setInterval(function () {
      if (synth.speaking && !synth.paused) {
        synth.pause();
        setTimeout(function () { synth.resume(); }, 50);
      }
    }, 10000);
  }
  function stopKA() {
    if (S.keepAliveTimer) { clearInterval(S.keepAliveTimer); S.keepAliveTimer = null; }
  }

  /* ── Utility ────────────────────────────────────────────────────── */
  function el(tag, cls) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }

  /* ── Text extraction ─────────────────────────────────────────────── */
  function extractText(details) {
    var clone = details.cloneNode(true);
    var sum = clone.querySelector('summary');
    if (sum) sum.remove();
    /* Remove any control elements we injected */
    var ctrls = clone.querySelectorAll('.tts-controls, .tsp-player');
    for (var i = 0; i < ctrls.length; i++) ctrls[i].remove();
    return clone.textContent.replace(/\s+/g, ' ').trim();
  }

  function chunkText(text) {
    var sents = text.match(/[^.!?]+[.!?]+/g) || [text];
    var result = [], cur = '';
    for (var i = 0; i < sents.length; i++) {
      if ((cur + sents[i]).length > 220 && cur) {
        result.push(cur.trim());
        cur = sents[i];
      } else {
        cur += sents[i];
      }
    }
    if (cur.trim()) result.push(cur.trim());
    return result;
  }

  /* ── Playback ───────────────────────────────────────────────────── */
  function speakNext() {
    if (S.chunkIndex >= S.chunks.length) { stopAll(); return; }

    var utt = new SpeechSynthesisUtterance(S.chunks[S.chunkIndex]);
    utt.lang = 'en-US';
    utt.rate = S.speed;
    if (S.voice) utt.voice = S.voice;
    S.utterance = utt;

    utt.onend = function () {
      if (S.utterance !== utt) return;
      S.chunkIndex++;
      if (S.playing && !S.paused) speakNext();
    };
    utt.onerror = function (e) {
      if (S.utterance !== utt) return;
      var err = e && e.error;
      if (err === 'interrupted' || err === 'canceled') return;
      stopAll();
    };

    synth.speak(utt);
    refreshProgress();
  }

  function playFrom(container, details, startIdx) {
    stopAll();
    details.open = true;

    var text = extractText(details);
    if (!text) return;

    S.chunks = chunkText(text);
    if (!S.chunks.length) return;

    S.chunkIndex = startIdx || 0;
    S.playing = true;
    S.paused = false;
    S.container = container;
    S.details = details;

    setUI(container, 'playing');
    startKA();
    speakNext();
  }

  function pauseAll() {
    synth.pause();
    S.paused = true;
    setUI(S.container, 'paused');
  }

  function resumeAll() {
    synth.resume();
    S.paused = false;
    setUI(S.container, 'playing');
  }

  function stopAll() {
    stopKA();
    S.utterance = null;
    synth.cancel();
    var c = S.container;
    S.playing = false;
    S.paused = false;
    S.chunks = [];
    S.chunkIndex = 0;
    S.container = null;
    S.details = null;
    if (c) { setUI(c, 'idle'); setProgress(c, 0, 0, 0); }
  }

  /* ── UI helpers ──────────────────────────────────────────────────── */
  function setUI(c, state) {
    if (!c) return;
    var pb = c.querySelector('.tsp-btn-play');
    var sb = c.querySelector('.tsp-btn-stop');
    if (!pb || !sb) return;
    if (state === 'playing') {
      pb.innerHTML = ICON_PAUSE;
      pb.setAttribute('aria-label', 'Pause');
      sb.classList.add('tsp-stop-vis');
    } else if (state === 'paused') {
      pb.innerHTML = ICON_PLAY;
      pb.setAttribute('aria-label', 'Resume');
      sb.classList.add('tsp-stop-vis');
    } else {
      pb.innerHTML = ICON_PLAY;
      pb.setAttribute('aria-label', 'Play');
      sb.classList.remove('tsp-stop-vis');
    }
  }

  function refreshProgress() {
    if (!S.container || !S.chunks.length) return;
    var pct = S.chunks.length > 1
      ? (S.chunkIndex / (S.chunks.length - 1)) * 100
      : 100;
    setProgress(S.container, pct, S.chunkIndex + 1, S.chunks.length);
  }

  function setProgress(c, pct, cur, total) {
    var fill = c.querySelector('.tsp-fill');
    if (fill) fill.style.width = pct + '%';
    var tc = c.querySelector('.tsp-time-cur');
    var td = c.querySelector('.tsp-time-dur');
    if (tc) tc.textContent = cur || 0;
    if (td) td.textContent = total || 0;
  }

  /* ── Build the player card ───────────────────────────────────────── */
  function buildCard(details) {
    if (details.dataset.tspReady) return null;
    details.dataset.tspReady = 'true';

    var card = el('div', 'audio-summary tsp-player');

    /* Header */
    var hdr = el('div', 'audio-summary__header');
    hdr.innerHTML = ICON_HEADPHONES + ' Audio Summary';

    /* Play/pause button */
    var playBtn = el('button', 'audio-summary__btn tsp-btn-play');
    playBtn.type = 'button';
    playBtn.setAttribute('aria-label', 'Play');
    playBtn.innerHTML = ICON_PLAY;

    /* Stop button */
    var stopBtn = el('button', 'audio-summary__btn tsp-btn-stop');
    stopBtn.type = 'button';
    stopBtn.setAttribute('aria-label', 'Stop');
    stopBtn.innerHTML = ICON_STOP;

    /* Progress area */
    var progWrap = el('div', 'audio-summary__progress-wrap');
    var progBar  = el('div', 'audio-summary__progress');
    var progFill = el('div', 'audio-summary__progress-fill tsp-fill');
    progBar.appendChild(progFill);

    var timeRow = el('div', 'audio-summary__time');
    var tCur = el('span', 'tsp-time-cur'); tCur.textContent = '0';
    var tSep = document.createTextNode(' / ');
    var tDur = el('span', 'tsp-time-dur'); tDur.textContent = '0';
    timeRow.appendChild(tCur);
    timeRow.appendChild(tSep);
    timeRow.appendChild(tDur);

    progWrap.appendChild(progBar);
    progWrap.appendChild(timeRow);

    /* Controls row */
    var ctrlRow = el('div', 'audio-summary__controls');
    ctrlRow.appendChild(playBtn);
    ctrlRow.appendChild(progWrap);
    ctrlRow.appendChild(stopBtn);

    /* Speed row */
    var speedRow = el('div', 'audio-summary__speed');
    var speedLbl = el('span', 'audio-summary__speed-label');
    speedLbl.textContent = 'Speed';
    speedRow.appendChild(speedLbl);

    var speedBtns = [];
    SPEEDS.forEach(function (rate) {
      var btn = el('button', 'audio-summary__speed-btn');
      btn.type = 'button';
      btn.textContent = rate + '\u00d7';
      if (rate === DEFAULT_SPEED) btn.classList.add('active');
      btn.addEventListener('click', function () {
        S.speed = rate;
        speedBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        /* Restart at same chunk with new speed */
        if (S.playing && S.container === card) {
          var ci = S.chunkIndex;
          stopAll();
          playFrom(card, details, ci);
        }
      });
      speedRow.appendChild(btn);
      speedBtns.push(btn);
    });

    /* Voice row */
    var voiceRow = el('div', 'tsp-voice-row');
    var voiceLbl = el('span', 'audio-summary__speed-label');
    voiceLbl.textContent = 'Voice';
    voiceRow.appendChild(voiceLbl);

    var voiceSel = el('select', 'tsp-voice-select');
    populateVoiceSelect(voiceSel);
    voiceSel.addEventListener('change', function () {
      var vs = enVoices();
      S.voice = vs[parseInt(voiceSel.value, 10)] || null;
      if (S.playing && S.container === card) {
        var ci = S.chunkIndex;
        stopAll();
        playFrom(card, details, ci);
      }
    });
    voiceRow.appendChild(voiceSel);

    /* Assemble card */
    card.appendChild(hdr);
    card.appendChild(ctrlRow);
    card.appendChild(speedRow);
    card.appendChild(voiceRow);

    /* ── Event wiring ── */
    playBtn.addEventListener('click', function () {
      if (S.playing && S.container === card) {
        if (S.paused) resumeAll(); else pauseAll();
      } else {
        playFrom(card, details);
      }
    });

    stopBtn.addEventListener('click', function () {
      if (S.container === card) stopAll();
    });

    /* Seek by clicking on progress bar */
    progBar.addEventListener('click', function (e) {
      if (!S.chunks.length) return;
      var rect = progBar.getBoundingClientRect();
      var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      var target = Math.round(pct * (S.chunks.length - 1));
      stopAll();
      playFrom(card, details, target);
    });

    return card;
  }

  /* ── Initialise on each page ─────────────────────────────────────── */
  function init() {
    var overviews = document.querySelectorAll('details.video-overview');
    for (var i = 0; i < overviews.length; i++) {
      var details = overviews[i];
      var card = buildCard(details);
      if (card) {
        details.parentNode.insertBefore(card, details);
      }
    }
    /* Repopulate voice selects after init in case voices loaded late */
    updateAllSelects();
  }

  /* ── Bootstrap ───────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Re-init on MkDocs Material instant-loading navigation */
  var lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      stopAll();
      setTimeout(init, 300);
    }
  }).observe(document.body, { childList: true, subtree: true });

  window.addEventListener('beforeunload', function () { synth.cancel(); });
  window.addEventListener('pagehide',     function () { synth.cancel(); });

})();
