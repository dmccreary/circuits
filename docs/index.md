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
<svg viewBox="0 0 1200 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="width:100%;height:90px;display:block;opacity:0.85;">

  <!-- ── voltage source (left) ─────────────────────────────────────────── -->
  <!-- circle symbol, center x=28 y=45 -->
  <circle cx="28" cy="45" r="18" stroke="#D4A017" stroke-width="1.4" fill="none" opacity="0.65"/>
  <text x="28" y="42" fill="#D4A017" font-size="9" text-anchor="middle" opacity="0.7">+</text>
  <text x="28" y="54" fill="#D4A017" font-size="9" text-anchor="middle" opacity="0.7">−</text>
  <!-- wire from source to R1 -->
  <line x1="46" y1="45" x2="62" y2="45" stroke="#D4A017" stroke-width="1.5" opacity="0.6"/>

  <!-- ── R1 (resistor zigzag) ────────────────────────────────────────── -->
  <polyline points="62,45 74,45 86,22 99,68 112,22 125,68 138,22 151,68 164,45 178,45"
            stroke="#D4A017" stroke-width="1.7" fill="none" opacity="0.80"/>
  <text x="120" y="13" fill="#D4A017" font-size="8" text-anchor="middle" opacity="0.65">R₁</text>
  <!-- wire R1 → junction -->
  <line x1="178" y1="45" x2="218" y2="45" stroke="#D4A017" stroke-width="1.5" opacity="0.60"/>
  <!-- junction node -->
  <circle cx="218" cy="45" r="3" fill="#D4A017" opacity="0.75"/>

  <!-- ── C1 (shunt capacitor to ground rail) ─────────────────────────── -->
  <!-- wire down from junction -->
  <line x1="218" y1="45" x2="218" y2="55" stroke="#7C5CEF" stroke-width="1.4" opacity="0.55"/>
  <!-- plate 1 -->
  <line x1="200" y1="55" x2="236" y2="55" stroke="#7C5CEF" stroke-width="2.0" opacity="0.80"/>
  <!-- plate 2 -->
  <line x1="200" y1="63" x2="236" y2="63" stroke="#7C5CEF" stroke-width="2.0" opacity="0.80"/>
  <text x="246" y="62" fill="#7C5CEF" font-size="8" opacity="0.65">C₁</text>
  <!-- wire down to ground rail -->
  <line x1="218" y1="63" x2="218" y2="76" stroke="#7C5CEF" stroke-width="1.4" opacity="0.50"/>

  <!-- ── wire R1-junction → L1 ────────────────────────────────────────── -->
  <line x1="218" y1="45" x2="280" y2="45" stroke="#D4A017" stroke-width="1.5" opacity="0.60"/>

  <!-- ── L1 (inductor coil) ──────────────────────────────────────────── -->
  <path d="M280,45 C288,26 304,26 312,45 C320,64 336,64 344,45 C352,26 368,26 376,45 C384,64 400,64 408,45 C416,26 432,26 440,45"
        stroke="#D4A017" stroke-width="1.8" fill="none" opacity="0.75"/>
  <text x="360" y="15" fill="#D4A017" font-size="8" text-anchor="middle" opacity="0.65">L₁</text>
  <!-- wire L1 → junction -->
  <line x1="440" y1="45" x2="490" y2="45" stroke="#D4A017" stroke-width="1.5" opacity="0.60"/>
  <!-- junction node -->
  <circle cx="490" cy="45" r="3" fill="#7C5CEF" opacity="0.75"/>

  <!-- ── R2 (shunt resistor to ground) ──────────────────────────────── -->
  <!-- wire down and zigzag vertical (represent as a box with hatching) -->
  <line x1="490" y1="45" x2="490" y2="53" stroke="#7C5CEF" stroke-width="1.4" opacity="0.55"/>
  <rect x="479" y="53" width="22" height="14" stroke="#7C5CEF" stroke-width="1.5" fill="none" opacity="0.70"/>
  <text x="516" y="64" fill="#7C5CEF" font-size="8" opacity="0.65">R₂</text>
  <line x1="490" y1="67" x2="490" y2="76" stroke="#7C5CEF" stroke-width="1.4" opacity="0.50"/>

  <!-- ── wire junction → op-amp ──────────────────────────────────────── -->
  <line x1="490" y1="45" x2="560" y2="45" stroke="#7C5CEF" stroke-width="1.5" opacity="0.60"/>
  <!-- route to + input (y=32) -->
  <line x1="560" y1="45" x2="560" y2="32" stroke="#7C5CEF" stroke-width="1.4" opacity="0.55"/>
  <line x1="560" y1="32" x2="610" y2="32" stroke="#7C5CEF" stroke-width="1.4" opacity="0.55"/>
  <!-- − input tied to mid-voltage via line going down -->
  <line x1="560" y1="58" x2="610" y2="58" stroke="#7C5CEF" stroke-width="1.4" opacity="0.40"/>
  <text x="570" y="70" fill="#7C5CEF" font-size="7" opacity="0.45">½V</text>

  <!-- ── op-amp triangle ─────────────────────────────────────────────── -->
  <polygon points="610,18 610,72 670,45" stroke="#7C5CEF" stroke-width="1.8" fill="none" opacity="0.70"/>
  <text x="628" y="49" fill="#7C5CEF" font-size="7" opacity="0.55">+</text>
  <text x="628" y="62" fill="#7C5CEF" font-size="7" opacity="0.40">−</text>
  <!-- output wire -->
  <line x1="670" y1="45" x2="720" y2="45" stroke="#7C5CEF" stroke-width="1.5" opacity="0.60"/>
  <!-- junction node at output -->
  <circle cx="720" cy="45" r="3" fill="#7C5CEF" opacity="0.65"/>

  <!-- ── R3 (series output resistor) ────────────────────────────────── -->
  <polyline points="720,45 734,45 748,22 762,68 776,22 790,68 804,22 818,68 832,45 848,45"
            stroke="#D4A017" stroke-width="1.7" fill="none" opacity="0.70"/>
  <text x="784" y="13" fill="#D4A017" font-size="8" text-anchor="middle" opacity="0.60">R₃</text>

  <!-- ── C2 (output filter cap to ground) ───────────────────────────── -->
  <line x1="848" y1="45" x2="900" y2="45" stroke="#D4A017" stroke-width="1.5" opacity="0.60"/>
  <!-- junction node -->
  <circle cx="900" cy="45" r="3" fill="#D4A017" opacity="0.65"/>
  <!-- shunt cap wire down -->
  <line x1="900" y1="45" x2="900" y2="54" stroke="#7dd3fc" stroke-width="1.4" opacity="0.55"/>
  <line x1="882" y1="54" x2="918" y2="54" stroke="#7dd3fc" stroke-width="2.0" opacity="0.75"/>
  <line x1="882" y1="62" x2="918" y2="62" stroke="#7dd3fc" stroke-width="2.0" opacity="0.75"/>
  <text x="928" y="62" fill="#7dd3fc" font-size="8" opacity="0.60">C₂</text>
  <line x1="900" y1="62" x2="900" y2="76" stroke="#7dd3fc" stroke-width="1.4" opacity="0.50"/>

  <!-- ── V_out terminal ──────────────────────────────────────────────── -->
  <line x1="900" y1="45" x2="980" y2="45" stroke="#7dd3fc" stroke-width="1.5" opacity="0.60"/>
  <circle cx="985" cy="45" r="4" stroke="#7dd3fc" stroke-width="1.5" fill="none" opacity="0.65"/>
  <text x="995" y="40" fill="#7dd3fc" font-size="8" opacity="0.60">V_out</text>

  <!-- ── ground rail ─────────────────────────────────────────────────── -->
  <line x1="10" y1="76" x2="1190" y2="76" stroke="rgba(125,211,252,0.25)" stroke-width="1.0"/>
  <!-- ground return on left (from voltage source bottom) -->
  <line x1="10" y1="45" x2="10" y2="76" stroke="#D4A017" stroke-width="1.2" opacity="0.40"/>
  <!-- ground symbol center -->
  <line x1="560" y1="76" x2="560" y2="82" stroke="#7dd3fc" stroke-width="1.4" opacity="0.45"/>
  <line x1="545" y1="82" x2="575" y2="82" stroke="#7dd3fc" stroke-width="1.6" opacity="0.45"/>
  <line x1="551" y1="87" x2="569" y2="87" stroke="#7dd3fc" stroke-width="1.2" opacity="0.35"/>

  <!-- ── faint right-side extension (decorative) ─────────────────────── -->
  <line x1="1020" y1="45" x2="1060" y2="45" stroke="#D4A017" stroke-width="1.3" opacity="0.35"/>
  <polyline points="1060,45 1070,45 1078,28 1087,62 1096,28 1105,62 1114,28 1123,62 1132,45 1145,45"
            stroke="#D4A017" stroke-width="1.4" fill="none" opacity="0.30"/>
  <line x1="1145" y1="45" x2="1185" y2="45" stroke="#D4A017" stroke-width="1.3" opacity="0.25"/>

</svg>
</div>

</div>
