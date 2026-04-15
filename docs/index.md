---
title: Cover
hide:
  - navigation
  - toc
  - footer
---

<style>
/* ── Cover page refinements ─────────────────────────────────────────────── */
.md-typeset .cover-page   { min-height: 80vh; }
.md-typeset .cover-content { padding: 2rem 2rem 1rem 2rem; }
.md-typeset .cover-stats  { margin: 2rem 0 1.2rem 0; }
.md-typeset .cover-buttons { margin-top: 2rem; }

/* Subtitle color */
.md-typeset .cover-page h2 {
  font-weight: 500;
  color: #c4b5fd !important;
}

/* Subtle glow animation on waveform art */
@keyframes wave-glow {
  0%, 100% { filter: drop-shadow(0 0 2px rgba(90,62,237,.12)) brightness(1.05); }
  50%       { filter: drop-shadow(0 0 8px rgba(90,62,237,.30)) brightness(1.14); }
}
@keyframes wave-glow-bottom {
  0%, 100% { filter: drop-shadow(0 0 2px rgba(212,160,23,.08)); }
  50%       { filter: drop-shadow(0 0 6px rgba(212,160,23,.22)); }
}
.md-typeset .cover-circuit svg      { animation: wave-glow        5s ease-in-out infinite; }
.md-typeset .cover-circuit-bottom svg { animation: wave-glow-bottom 5s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .md-typeset .cover-circuit svg,
  .md-typeset .cover-circuit-bottom svg { animation: none; }
}

/* Button hover */
.md-typeset .cover-buttons .md-button {
  transition: transform .25s ease, box-shadow .25s ease,
              background .25s ease, color .25s ease, border-color .25s ease;
}
.md-typeset .cover-buttons .md-button:hover       { transform: translateY(-2px); box-shadow: 0 4px 18px rgba(90,62,237,.18); }
.md-typeset .cover-buttons .md-button--primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(90,62,237,.45); }

@media (max-width: 768px) {
  .md-typeset .cover-content { padding: 1.2rem 1rem .8rem 1rem; }
}
</style>

<div class="cover-page" markdown>

<div class="cover-circuit">
<svg viewBox="0 0 1200 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="width:100%;height:110px;display:block;">
  <!-- oscilloscope grid -->
  <line x1="0"    y1="27"  x2="1200" y2="27"  stroke="rgba(90,62,237,.12)" stroke-width="0.6"/>
  <line x1="0"    y1="55"  x2="1200" y2="55"  stroke="rgba(90,62,237,.18)" stroke-width="0.6"/>
  <line x1="0"    y1="83"  x2="1200" y2="83"  stroke="rgba(90,62,237,.12)" stroke-width="0.6"/>
  <line x1="240"  y1="0"   x2="240"  y2="110" stroke="rgba(90,62,237,.10)" stroke-width="0.5"/>
  <line x1="480"  y1="0"   x2="480"  y2="110" stroke="rgba(90,62,237,.10)" stroke-width="0.5"/>
  <line x1="720"  y1="0"   x2="720"  y2="110" stroke="rgba(90,62,237,.10)" stroke-width="0.5"/>
  <line x1="960"  y1="0"   x2="960"  y2="110" stroke="rgba(90,62,237,.10)" stroke-width="0.5"/>
  <!-- fundamental sine wave — purple -->
  <path d="M0,55 C30,5 90,5 120,55 C150,105 210,105 240,55 C270,5 330,5 360,55 C390,105 450,105 480,55 C510,5 570,5 600,55 C630,105 690,105 720,55 C750,5 810,5 840,55 C870,105 930,105 960,55 C990,5 1050,5 1080,55 C1110,105 1170,105 1200,55"
        stroke="#7C5CEF" stroke-width="2.6" fill="none" opacity="0.85"/>
  <!-- higher harmonic — gold, smaller amplitude -->
  <path d="M0,55 C15,32 45,32 60,55 C75,78 105,78 120,55 C135,32 165,32 180,55 C195,78 225,78 240,55 C255,32 285,32 300,55 C315,78 345,78 360,55 C375,32 405,32 420,55 C435,78 465,78 480,55 C495,32 525,32 540,55 C555,78 585,78 600,55 C615,32 645,32 660,55 C675,78 705,78 720,55 C735,32 765,32 780,55 C795,78 825,78 840,55 C855,32 885,32 900,55 C915,78 945,78 960,55 C975,32 1005,32 1020,55 C1035,78 1065,78 1080,55 C1095,32 1125,32 1140,55 C1155,78 1185,78 1200,55"
        stroke="#D4A017" stroke-width="1.6" fill="none" opacity="0.55"/>
  <!-- decaying exponential — cyan accent, left side only -->
  <path d="M0,10 C60,10 100,40 140,55 C180,68 220,60 260,56 C300,53 340,54 400,55"
        stroke="#7dd3fc" stroke-width="1.4" fill="none" opacity="0.4"/>
</svg>
</div>

<div class="cover-content" markdown>

# Circuits 1

## An Intelligent Interactive Textbook

**EE Circuits — Analog and Signal Analysis**

---

<p class="cover-institution">An AI-assisted course with interactive simulations,<br>chapter quizzes, and generative AI prompt libraries.</p>

<p class="cover-description">Covers DC/AC analysis, phasors, filters, op-amps, Fourier series,<br>and audio applications — from first principles to real-world design.</p>

<div class="cover-stats" markdown>

<div class="stat-item">
<div class="stat-number">16</div>
<div class="stat-label">Chapters</div>
</div>

<div class="stat-item">
<div class="stat-number">50+</div>
<div class="stat-label">MicroSims</div>
</div>

<div class="stat-item">
<div class="stat-number">160</div>
<div class="stat-label">Quiz Questions</div>
</div>

<div class="stat-item">
<div class="stat-number">64</div>
<div class="stat-label">Practice Problems</div>
</div>

</div>

<div class="cover-buttons" markdown>

[Enter Textbook :material-arrow-right:](chapters/index.md){ .md-button .md-button--primary }
[View MicroSims :material-play-box:](sims/index.md){ .md-button }
[Learning Graph :material-graph:](learning-graph/index.md){ .md-button }

</div>

</div>

<div class="cover-circuit cover-circuit-bottom">
<svg viewBox="0 0 1200 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="width:100%;height:90px;display:block;opacity:0.6;">
  <!-- resistor zigzag symbol, repeated -->
  <polyline points="0,45 60,45 75,20 90,70 105,20 120,70 135,20 150,70 165,45 220,45"
            stroke="#D4A017" stroke-width="1.6" fill="none" opacity="0.7"/>
  <polyline points="240,45 300,45 315,20 330,70 345,20 360,70 375,20 390,70 405,45 460,45"
            stroke="#D4A017" stroke-width="1.6" fill="none" opacity="0.5"/>
  <!-- capacitor symbol -->
  <line x1="500" y1="20" x2="500" y2="70" stroke="#7C5CEF" stroke-width="2" opacity="0.7"/>
  <line x1="520" y1="20" x2="520" y2="70" stroke="#7C5CEF" stroke-width="2" opacity="0.7"/>
  <line x1="460" y1="45" x2="500" y2="45" stroke="#7C5CEF" stroke-width="1.5" opacity="0.5"/>
  <line x1="520" y1="45" x2="560" y2="45" stroke="#7C5CEF" stroke-width="1.5" opacity="0.5"/>
  <!-- inductor coil -->
  <path d="M600,45 C610,25 630,25 640,45 C650,65 670,65 680,45 C690,25 710,25 720,45 C730,65 750,65 760,45 C770,25 790,25 800,45"
        stroke="#D4A017" stroke-width="1.8" fill="none" opacity="0.6"/>
  <line x1="560" y1="45" x2="600" y2="45" stroke="#D4A017" stroke-width="1.5" opacity="0.5"/>
  <line x1="800" y1="45" x2="840" y2="45" stroke="#D4A017" stroke-width="1.5" opacity="0.5"/>
  <!-- op-amp triangle -->
  <polygon points="900,18 900,72 950,45" stroke="#7C5CEF" stroke-width="1.8" fill="none" opacity="0.55"/>
  <line x1="860" y1="32" x2="900" y2="32" stroke="#7C5CEF" stroke-width="1.4" opacity="0.5"/>
  <line x1="860" y1="58" x2="900" y2="58" stroke="#7C5CEF" stroke-width="1.4" opacity="0.5"/>
  <line x1="950" y1="45" x2="990" y2="45" stroke="#7C5CEF" stroke-width="1.4" opacity="0.5"/>
  <!-- ground symbol -->
  <line x1="990" y1="45" x2="990" y2="72" stroke="#7dd3fc" stroke-width="1.5" opacity="0.5"/>
  <line x1="970" y1="72" x2="1010" y2="72" stroke="#7dd3fc" stroke-width="1.8" opacity="0.5"/>
  <line x1="978" y1="79" x2="1002" y2="79" stroke="#7dd3fc" stroke-width="1.4" opacity="0.4"/>
  <line x1="985" y1="86" x2="995"  y2="86" stroke="#7dd3fc" stroke-width="1.0" opacity="0.3"/>
</svg>
</div>

</div>
