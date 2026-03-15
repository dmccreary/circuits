/**
 * Audio Reader for Circuits Textbook
 * Uses the Web Speech API (SpeechSynthesis) to read page content aloud.
 * Creates a fixed player bar at the bottom of the page.
 */
(function () {
  'use strict';

  if (!('speechSynthesis' in window)) return;

  const synth = window.speechSynthesis;
  let isPlaying = false;
  let isPaused = false;
  let chunks = [];
  let currentChunk = 0;

  // ── UI creation ──────────────────────────────────────────────────────────────

  function createPlayer() {
    const bar = document.createElement('div');
    bar.id = 'audio-reader';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Audio reader controls');

    bar.innerHTML = `
      <div id="audio-reader-inner">
        <span id="audio-reader-title">&#x1F50A; Audio Reader</span>
        <button id="audio-reader-play"  aria-label="Play">&#x25B6; Play</button>
        <button id="audio-reader-stop"  aria-label="Stop">&#x23F9; Stop</button>
        <label id="audio-reader-speed-label">
          Speed
          <select id="audio-reader-speed" aria-label="Playback speed">
            <option value="0.7">0.7×</option>
            <option value="0.85">0.85×</option>
            <option value="1" selected>1×</option>
            <option value="1.25">1.25×</option>
            <option value="1.5">1.5×</option>
            <option value="2">2×</option>
          </select>
        </label>
        <label id="audio-reader-voice-label">
          Voice
          <select id="audio-reader-voice" aria-label="Voice selection"></select>
        </label>
        <span id="audio-reader-status" aria-live="polite">Ready</span>
        <button id="audio-reader-minimize" aria-label="Minimize player" title="Minimize">&#x2212;</button>
      </div>
    `;

    // Minimized pill shown when bar is hidden
    const pill = document.createElement('button');
    pill.id = 'audio-reader-pill';
    pill.setAttribute('aria-label', 'Open audio reader');
    pill.title = 'Open audio reader';
    pill.textContent = '🔊';

    document.body.appendChild(bar);
    document.body.appendChild(pill);

    // Minimize / restore
    document.getElementById('audio-reader-minimize').addEventListener('click', () => {
      bar.classList.add('audio-reader--hidden');
      pill.classList.add('audio-reader-pill--visible');
    });

    pill.addEventListener('click', () => {
      bar.classList.remove('audio-reader--hidden');
      pill.classList.remove('audio-reader-pill--visible');
    });

    // Controls
    document.getElementById('audio-reader-play').addEventListener('click', onPlayPause);
    document.getElementById('audio-reader-stop').addEventListener('click', onStop);
  }

  // ── Voice population ─────────────────────────────────────────────────────────

  function populateVoices() {
    const select = document.getElementById('audio-reader-voice');
    if (!select) return;

    const all = synth.getVoices();
    const eng = all.filter(v => v.lang.startsWith('en'));
    const list = eng.length > 0 ? eng : all;

    select.innerHTML = '';
    list.forEach(voice => {
      const opt = document.createElement('option');
      opt.value = voice.name;
      opt.textContent = `${voice.name} (${voice.lang})`;
      if (voice.default) opt.selected = true;
      select.appendChild(opt);
    });
  }

  // ── Text extraction ───────────────────────────────────────────────────────────

  function extractChunks() {
    const content =
      document.querySelector('article') ||
      document.querySelector('.md-content__inner') ||
      document.querySelector('main');

    if (!content) return [];

    const clone = content.cloneNode(true);

    // Remove elements that should not be read
    const strip = [
      '.headerlink', 'script', 'style', 'iframe',
      '.md-clipboard', '.md-source', '.tabbed-labels',
      '.audio-reader-skip', '.md-search',
    ];
    clone.querySelectorAll(strip.join(',')).forEach(el => el.remove());

    // Replace LaTeX with spoken placeholder
    clone.querySelectorAll('.arithmatex, .MathJax, .katex').forEach(el => {
      el.replaceWith(document.createTextNode(' equation '));
    });

    // Replace code blocks with spoken placeholder
    clone.querySelectorAll('pre').forEach(el => {
      el.replaceWith(document.createTextNode(' Code example. '));
    });

    // Replace inline code with its text (already text, just unwrap)
    clone.querySelectorAll('code').forEach(el => {
      el.replaceWith(document.createTextNode(el.textContent));
    });

    // Collect readable blocks in document order
    const blocks = clone.querySelectorAll('h1, h2, h3, h4, h5, p, li, dt, dd, td, th');
    const result = [];
    blocks.forEach(el => {
      const text = el.textContent.replace(/\s+/g, ' ').trim();
      if (text.length > 4) result.push(text);
    });

    return result;
  }

  // ── Playback ─────────────────────────────────────────────────────────────────

  function speakChunk(index) {
    if (index >= chunks.length) {
      resetState();
      setStatus('Finished ✓');
      return;
    }

    currentChunk = index;
    setStatus(`${index + 1} / ${chunks.length}`);

    const speed = parseFloat(document.getElementById('audio-reader-speed').value) || 1;
    const voiceName = document.getElementById('audio-reader-voice').value;
    const voices = synth.getVoices();

    const utt = new SpeechSynthesisUtterance(chunks[index]);
    utt.rate = speed;
    if (voiceName) {
      const match = voices.find(v => v.name === voiceName);
      if (match) utt.voice = match;
    }

    utt.onend = () => { if (isPlaying && !isPaused) speakChunk(index + 1); };
    utt.onerror = (e) => {
      if (e.error === 'interrupted') return;   // caused by cancel(), ignore
      if (isPlaying && !isPaused) speakChunk(index + 1);
    };

    synth.speak(utt);
  }

  function onPlayPause() {
    const btn = document.getElementById('audio-reader-play');

    if (!isPlaying && !isPaused) {
      // Fresh start
      synth.cancel();
      chunks = extractChunks();
      currentChunk = 0;
      if (chunks.length === 0) { setStatus('No readable content'); return; }
      isPlaying = true;
      btn.innerHTML = '&#x23F8; Pause';
      speakChunk(0);

    } else if (isPlaying && !isPaused) {
      // Pause
      synth.pause();
      isPaused = true;
      isPlaying = false;
      btn.innerHTML = '&#x25B6; Resume';
      setStatus('Paused');

    } else {
      // Resume
      if (synth.paused) {
        synth.resume();
      } else {
        speakChunk(currentChunk);
      }
      isPlaying = true;
      isPaused = false;
      btn.innerHTML = '&#x23F8; Pause';
      setStatus(`${currentChunk + 1} / ${chunks.length}`);
    }
  }

  function onStop() {
    synth.cancel();
    resetState();
    setStatus('Ready');
  }

  function resetState() {
    isPlaying = false;
    isPaused = false;
    currentChunk = 0;
    const btn = document.getElementById('audio-reader-play');
    if (btn) btn.innerHTML = '&#x25B6; Play';
  }

  function setStatus(msg) {
    const el = document.getElementById('audio-reader-status');
    if (el) el.textContent = msg;
  }

  // ── Init ─────────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', () => {
    createPlayer();
    populateVoices();
    if (typeof synth.onvoiceschanged !== 'undefined') {
      synth.onvoiceschanged = populateVoices;
    }
  });

  // Stop speech when navigating away
  window.addEventListener('beforeunload', () => synth.cancel());
  window.addEventListener('pagehide',     () => synth.cancel());

})();
