/**
 * Text-to-Speech Reader for Chapter Overviews — Circuits 1
 * Uses the Web Speech API for browser-native narration.
 * Supports sentence-level highlighting, auto-scroll, click-to-jump,
 * progress UI, and active reading indicator.
 *
 * Targets: <details class="video-overview"> elements on chapter pages.
 * Adapted from the EE2301 intelligent textbook TTS reader.
 */
(function () {
  'use strict';

  var synth = window.speechSynthesis;
  if (!synth) return;

  var playing = false;
  var paused = false;
  var chunks = [];
  var chunkIndex = 0;
  var chunkMap = [];
  var currentBtn = null;
  var currentDetails = null;

  var currentUtterance = null;
  var currentProgressBar = null;
  var currentProgressLabel = null;
  var userInteracting = false;
  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var keepAliveTimer = null;

  /* Chrome bug workaround: synth silently dies after ~15 s unless poked.
     Use a 10 s interval (safely under 15 s) and separate pause/resume
     into different ticks so the browser can process each correctly. */
  function startKeepAlive() {
    stopKeepAlive();
    keepAliveTimer = setInterval(function () {
      if (synth.speaking && !synth.paused) {
        synth.pause();
        setTimeout(function () { synth.resume(); }, 50);
      }
    }, 10000);
  }

  function stopKeepAlive() {
    if (keepAliveTimer) {
      clearInterval(keepAliveTimer);
      keepAliveTimer = null;
    }
  }

  /* Track mousedown/mouseup to suppress auto-scroll during user interaction */
  document.addEventListener('mousedown', function () { userInteracting = true; });
  document.addEventListener('mouseup', function () { userInteracting = false; });

  /* ---- Sentence wrapping ---- */

  function wrapSentences(details) {
    if (details.dataset.ttsSentencesWrapped) return;
    details.dataset.ttsSentencesWrapped = 'true';

    try {
      var html = details.innerHTML;
      var cut = html.indexOf('</summary>');
      if (cut < 0) return;
      cut += '</summary>'.length;

      var before = html.substring(0, cut);
      var content = html.substring(cut);

      var idx = 0;
      var wrapped = content.replace(/([^.!?]*[.!?]+)/g, function (match) {
        return '<span class="tts-sentence" data-idx="' + (idx++) + '">' + match + '</span>';
      });

      if (idx === 0) return;
      details.innerHTML = before + wrapped;
    } catch (e) {
      // Sentence wrapping failed — playback still works via plain-text fallback
    }
  }

  /* ---- Chunk building from sentence spans ---- */

  function buildChunksFromSpans(details) {
    var spans = details.querySelectorAll('.tts-sentence');
    var result = { chunks: [], map: [] };
    var current = '';
    var currentIndices = [];

    for (var i = 0; i < spans.length; i++) {
      var text = spans[i].textContent.trim();
      if (!text) continue;

      if ((current + ' ' + text).length > 200 && current) {
        result.chunks.push(current.trim());
        result.map.push(currentIndices.slice());
        current = text;
        currentIndices = [parseInt(spans[i].dataset.idx, 10)];
      } else {
        current += (current ? ' ' : '') + text;
        currentIndices.push(parseInt(spans[i].dataset.idx, 10));
      }
    }

    if (current.trim()) {
      result.chunks.push(current.trim());
      result.map.push(currentIndices.slice());
    }

    return result;
  }

  /* ---- Fallback text extraction (no highlighting) ---- */

  function getOverviewText(details) {
    var fullText = details.textContent || '';
    var summary = details.querySelector('summary');
    if (summary) {
      fullText = fullText.replace(summary.textContent, '');
    }
    return fullText.replace(/\s+/g, ' ').trim();
  }

  function splitIntoChunks(text) {
    var sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    var result = [];
    var current = '';
    for (var i = 0; i < sentences.length; i++) {
      if ((current + sentences[i]).length > 200) {
        if (current) result.push(current.trim());
        current = sentences[i];
      } else {
        current += sentences[i];
      }
    }
    if (current.trim()) result.push(current.trim());
    return result;
  }

  /* ---- Visibility check for auto-scroll ---- */

  function isElementVisible(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }

  /* ---- Highlighting + auto-scroll ---- */

  function highlightChunk() {
    if (!currentDetails || chunkIndex >= chunkMap.length) return;
    clearHighlights();
    var indices = chunkMap[chunkIndex];
    for (var i = 0; i < indices.length; i++) {
      var span = currentDetails.querySelector('.tts-sentence[data-idx="' + indices[i] + '"]');
      if (span) span.classList.add('tts-reading');
    }

    updateProgress();

    var firstHighlighted = currentDetails.querySelector('.tts-sentence.tts-reading');
    if (firstHighlighted && !isElementVisible(firstHighlighted)) {
      if (!userInteracting && !window.getSelection().toString()) {
        firstHighlighted.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: prefersReducedMotion ? 'nearest' : 'center'
        });
      }
    }
  }

  function clearHighlights() {
    if (!currentDetails) return;
    var reading = currentDetails.querySelectorAll('.tts-sentence.tts-reading');
    for (var i = 0; i < reading.length; i++) {
      reading[i].classList.remove('tts-reading');
    }
  }

  /* ---- Progress UI ---- */

  function updateProgress() {
    if (!currentProgressBar || !currentProgressLabel) return;
    currentProgressBar.value = chunkIndex;
    var pct = chunks.length > 1
      ? (chunkIndex / (chunks.length - 1)) * 100
      : 100;
    currentProgressBar.style.setProperty('--tts-fill', pct + '%');
    currentProgressLabel.textContent = (chunkIndex + 1) + ' / ' + chunks.length;
  }

  function resetProgress() {
    if (currentProgressBar) {
      currentProgressBar.value = 0;
      currentProgressBar.style.setProperty('--tts-fill', '0%');
    }
    if (currentProgressLabel) {
      currentProgressLabel.textContent = '';
    }
  }

  /* ---- Button state ---- */

  function updateButton(btn, state) {
    if (!btn) return;
    var icon = btn.querySelector('.tts-icon');
    var label = btn.querySelector('.tts-label');
    var controls = btn.closest('.tts-controls');
    if (state === 'playing') {
      icon.textContent = '\u23F8';
      label.textContent = 'Pause';
      if (controls) controls.classList.add('tts-active');
    } else if (state === 'paused') {
      icon.textContent = '\u25B6';
      label.textContent = 'Resume';
    } else {
      icon.textContent = '\u25B6';
      label.textContent = 'Listen to Overview';
      if (controls) controls.classList.remove('tts-active');
    }
  }

  /* ---- Speaking ---- */

  function speakNextChunk() {
    if (chunkIndex >= chunks.length) {
      stopSpeaking();
      return;
    }

    highlightChunk();

    var utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    currentUtterance = utterance;

    utterance.onend = function () {
      if (currentUtterance !== utterance) return;
      chunkIndex++;
      if (playing && !paused) {
        speakNextChunk();
      }
    };

    utterance.onerror = function (e) {
      if (currentUtterance !== utterance) return;
      /* Ignore "interrupted" / "canceled" — caused by keep-alive or normal stop. */
      var err = e && e.error;
      if (err === 'interrupted' || err === 'canceled') return;
      stopSpeaking();
    };

    synth.speak(utterance);
  }

  /* ---- Jump to chunk ---- */

  function jumpToChunk(targetChunk) {
    currentUtterance = null;
    synth.cancel();
    chunkIndex = targetChunk;
    playing = true;
    paused = false;
    updateButton(currentBtn, 'playing');
    speakNextChunk();
  }

  function stopSpeaking() {
    stopKeepAlive();
    currentUtterance = null;
    synth.cancel();
    clearHighlights();
    resetProgress();
    playing = false;
    paused = false;
    chunks = [];
    chunkIndex = 0;
    chunkMap = [];
    updateButton(currentBtn, 'idle');
    if (currentDetails) {
      currentDetails.classList.remove('tts-details-active');
    }
    currentBtn = null;
    currentDetails = null;
    currentProgressBar = null;
    currentProgressLabel = null;
  }

  function startSpeaking(btn, details, startChunk) {
    stopSpeaking();
    details.open = true;

    var result = buildChunksFromSpans(details);

    if (result.chunks.length) {
      chunks = result.chunks;
      chunkMap = result.map;
    } else {
      var text = getOverviewText(details);
      if (!text) return;
      chunks = splitIntoChunks(text);
      chunkMap = [];
    }

    chunkIndex = startChunk || 0;
    playing = true;
    paused = false;
    currentBtn = btn;
    currentDetails = details;

    currentProgressBar = details._ttsProgress || null;
    currentProgressLabel = details._ttsLabel || null;
    if (currentProgressBar) {
      currentProgressBar.max = chunks.length - 1;
    }

    details.classList.add('tts-details-active');
    updateButton(btn, 'playing');
    startKeepAlive();
    /* Chrome requires a brief gap after synth.cancel() before synth.speak().
       Calling speak() in the same tick can produce a silent 'synthesis-failed'
       error.  A 50 ms delay is imperceptible but reliably prevents the race. */
    setTimeout(speakNextChunk, 50);
  }

  function togglePlay(btn, details) {
    if (playing && currentBtn === btn && !paused) {
      synth.pause();
      paused = true;
      updateButton(btn, 'paused');
    } else if (playing && currentBtn === btn && paused) {
      synth.resume();
      paused = false;
      updateButton(btn, 'playing');
    } else {
      startSpeaking(btn, details);
    }
  }

  /* ---- Controls setup ---- */

  function addControls(details) {
    if (details.getAttribute('data-tts-ready')) return;
    details.setAttribute('data-tts-ready', 'true');

    /* Note: wrapSentences is intentionally skipped here.
       Running a sentence regex on raw innerHTML wraps block-level HTML tags
       (p, ol, li) inside inline <span> elements, which corrupts the DOM and
       breaks the plain-text fallback.  We rely on getOverviewText + splitIntoChunks
       instead, which extracts clean textContent and is always reliable. */

    var container = document.createElement('div');
    container.className = 'tts-controls';

    var playBtn = document.createElement('button');
    playBtn.className = 'tts-btn tts-play';
    playBtn.type = 'button';
    playBtn.setAttribute('aria-label', 'Listen to chapter overview');
    playBtn.innerHTML = '<span class="tts-icon">\u25B6</span> <span class="tts-label">Listen to Overview</span>';
    playBtn.addEventListener('click', function () {
      togglePlay(playBtn, details);
    });

    var stopBtn = document.createElement('button');
    stopBtn.className = 'tts-btn tts-stop';
    stopBtn.type = 'button';
    stopBtn.setAttribute('aria-label', 'Stop narration');
    stopBtn.innerHTML = '<span class="tts-icon">\u25A0</span> <span class="tts-label">Stop</span>';
    stopBtn.addEventListener('click', function () {
      stopSpeaking();
    });

    /* Progress bar */
    var progressWrap = document.createElement('div');
    progressWrap.className = 'tts-progress-wrap';

    var progressBar = document.createElement('input');
    progressBar.type = 'range';
    progressBar.className = 'tts-progress';
    progressBar.min = 0;
    progressBar.value = 0;
    progressBar.setAttribute('aria-label', 'Reading progress');

    var progressLabel = document.createElement('span');
    progressLabel.className = 'tts-progress-label';

    progressWrap.appendChild(progressBar);
    progressWrap.appendChild(progressLabel);

    details._ttsProgress = progressBar;
    details._ttsLabel = progressLabel;
    details._ttsPlayBtn = playBtn;

    progressBar.addEventListener('input', function () {
      if (!playing || currentDetails !== details) return;
      var target = parseInt(progressBar.value, 10);
      if (target >= 0 && target < chunks.length) {
        jumpToChunk(target);
      }
    });

    container.appendChild(playBtn);
    container.appendChild(stopBtn);
    container.appendChild(progressWrap);
    details.parentNode.insertBefore(container, details);

    /* Click-to-jump: delegated handler on details element */
    details.addEventListener('click', function (e) {
      var sentenceEl = e.target.closest('.tts-sentence');
      if (!sentenceEl) return;
      var idx = parseInt(sentenceEl.dataset.idx, 10);
      if (isNaN(idx)) return;

      var targetChunkMap = chunkMap.length ? chunkMap : null;
      if (!targetChunkMap) {
        var result = buildChunksFromSpans(details);
        if (result.map.length) targetChunkMap = result.map;
      }
      if (!targetChunkMap) return;

      var targetChunkIdx = -1;
      for (var c = 0; c < targetChunkMap.length; c++) {
        for (var s = 0; s < targetChunkMap[c].length; s++) {
          if (targetChunkMap[c][s] === idx) {
            targetChunkIdx = c;
            break;
          }
        }
        if (targetChunkIdx >= 0) break;
      }
      if (targetChunkIdx < 0) return;

      if (playing && currentDetails === details) {
        jumpToChunk(targetChunkIdx);
      } else {
        startSpeaking(playBtn, details, targetChunkIdx);
      }
    });
  }

  function init() {
    var overviews = document.querySelectorAll('details.video-overview');
    for (var i = 0; i < overviews.length; i++) {
      addControls(overviews[i]);
    }
  }

  // Run on initial load
  init();

  // Re-init on MkDocs Material instant-loading navigation
  var lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      stopSpeaking();
      setTimeout(init, 300);
    }
  }).observe(document.body, { childList: true, subtree: true });

  // Stop speech on page exit
  window.addEventListener('beforeunload', function () { synth.cancel(); });
  window.addEventListener('pagehide',     function () { synth.cancel(); });

})();
