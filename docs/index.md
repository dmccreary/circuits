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

<!-- ── Full-cover background circuit art (absolute overlay behind all content) -->
<div class="cover-bg-circuit" aria-hidden="true">
<svg viewBox="0 0 1200 620" xmlns="http://www.w3.org/2000/svg"
     preserveAspectRatio="xMidYMid slice"
     style="width:100%;height:100%;opacity:0.22;">

  <!-- ══ TOP ROW (y=95): Series RLC filter chain ════════════════════════ -->
  <line x1="0" y1="95" x2="1200" y2="95" stroke="rgba(196,181,253,0.6)" stroke-width="1.0"/>

  <!-- R₁ zigzag -->
  <polyline points="58,95 70,95 80,70 93,120 106,70 119,120 132,70 145,120 158,95 170,95"
            stroke="#D4A017" stroke-width="1.5" fill="none"/>
  <text x="114" y="57" fill="#D4A017" font-size="12" text-anchor="middle">R₁</text>

  <!-- C₁ shunt (down from node at x=242) -->
  <circle cx="242" cy="95" r="3" fill="#D4A017"/>
  <line x1="242" y1="95"  x2="242" y2="122" stroke="rgba(125,211,252,0.9)" stroke-width="1.1"/>
  <line x1="224" y1="122" x2="260" y2="122" stroke="rgba(125,211,252,0.9)" stroke-width="2.2"/>
  <line x1="224" y1="131" x2="260" y2="131" stroke="rgba(125,211,252,0.9)" stroke-width="2.2"/>
  <line x1="242" y1="131" x2="242" y2="158" stroke="rgba(125,211,252,0.7)" stroke-width="1.1"/>
  <text x="270" y="130" fill="rgba(125,211,252,0.9)" font-size="11">C₁</text>

  <!-- L₁ inductor coil -->
  <line x1="300" y1="95" x2="328" y2="95" stroke="#D4A017" stroke-width="1.1"/>
  <path d="M328,95 C335,75 349,75 356,95 C363,115 377,115 384,95 C391,75 405,75 412,95 C419,115 433,115 440,95 C447,75 461,75 468,95"
        stroke="#D4A017" stroke-width="1.5" fill="none"/>
  <line x1="468" y1="95" x2="496" y2="95" stroke="#D4A017" stroke-width="1.1"/>
  <text x="398" y="58" fill="#D4A017" font-size="12" text-anchor="middle">L₁</text>

  <!-- C₂ series (inline, plates perpendicular to wire) -->
  <line x1="534" y1="95" x2="560" y2="95" stroke="rgba(125,211,252,0.8)" stroke-width="1.1"/>
  <line x1="560" y1="72"  x2="560" y2="118" stroke="rgba(125,211,252,0.9)" stroke-width="2.2"/>
  <line x1="570" y1="72"  x2="570" y2="118" stroke="rgba(125,211,252,0.9)" stroke-width="2.2"/>
  <line x1="570" y1="95" x2="596" y2="95" stroke="rgba(125,211,252,0.8)" stroke-width="1.1"/>
  <text x="565" y="58" fill="rgba(125,211,252,0.9)" font-size="11" text-anchor="middle">C₂</text>

  <!-- R₂ zigzag -->
  <polyline points="636,95 648,95 658,70 671,120 684,70 697,120 710,70 723,120 736,95 748,95"
            stroke="#D4A017" stroke-width="1.5" fill="none"/>
  <text x="692" y="57" fill="#D4A017" font-size="12" text-anchor="middle">R₂</text>

  <!-- Op-amp A₁ -->
  <circle cx="800" cy="95" r="3" fill="rgba(196,181,253,0.9)"/>
  <polygon points="820,63 820,127 884,95" stroke="rgba(196,181,253,0.9)" stroke-width="1.7" fill="none"/>
  <line x1="800" y1="76"  x2="820" y2="76"  stroke="rgba(196,181,253,0.8)" stroke-width="1.1"/>
  <line x1="800" y1="114" x2="820" y2="114" stroke="rgba(196,181,253,0.8)" stroke-width="1.1"/>
  <line x1="884" y1="95"  x2="912" y2="95"  stroke="rgba(196,181,253,0.8)" stroke-width="1.1"/>
  <text x="843" y="100" fill="rgba(196,181,253,0.8)" font-size="11">A₁</text>

  <!-- R₃ zigzag -->
  <polyline points="950,95 962,95 972,70 985,120 998,70 1011,120 1024,70 1037,120 1050,95 1062,95"
            stroke="#D4A017" stroke-width="1.5" fill="none"/>
  <text x="1006" y="57" fill="#D4A017" font-size="12" text-anchor="middle">R₃</text>

  <!-- Ground rail row 1 -->
  <line x1="242" y1="158" x2="496" y2="158" stroke="rgba(125,211,252,0.35)" stroke-width="0.9"/>
  <line x1="369" y1="158" x2="369" y2="168" stroke="rgba(125,211,252,0.6)" stroke-width="1.1"/>
  <line x1="355" y1="168" x2="383" y2="168" stroke="rgba(125,211,252,0.6)" stroke-width="1.5"/>
  <line x1="360" y1="175" x2="378" y2="175" stroke="rgba(125,211,252,0.5)" stroke-width="1.1"/>
  <line x1="365" y1="182" x2="373" y2="182" stroke="rgba(125,211,252,0.4)" stroke-width="0.9"/>

  <!-- ══ MIDDLE ROW (y=310): Overlapping AC signal traces ═══════════════ -->
  <!-- Fundamental sine — purple -->
  <path d="M0,310 C22,262 66,262 88,310 C110,358 154,358 176,310 C198,262 242,262 264,310 C286,358 330,358 352,310 C374,262 418,262 440,310 C462,358 506,358 528,310 C550,262 594,262 616,310 C638,358 682,358 704,310 C726,262 770,262 792,310 C814,358 858,358 880,310 C902,262 946,262 968,310 C990,358 1034,358 1056,310 C1078,262 1122,262 1144,310 C1166,358 1200,358 1200,310"
        stroke="rgba(124,92,239,0.9)" stroke-width="2.0" fill="none"/>
  <!-- 2nd harmonic — gold -->
  <path d="M0,310 C11,291 33,291 44,310 C55,329 77,329 88,310 C99,291 121,291 132,310 C143,329 165,329 176,310 C187,291 209,291 220,310 C231,329 253,329 264,310 C275,291 297,291 308,310 C319,329 341,329 352,310 C363,291 385,291 396,310 C407,329 429,329 440,310 C451,291 473,291 484,310 C495,329 517,329 528,310 C539,291 561,291 572,310 C583,329 605,329 616,310 C627,291 649,291 660,310 C671,329 693,329 704,310 C715,291 737,291 748,310 C759,329 781,329 792,310 C803,291 825,291 836,310 C847,329 869,329 880,310 C891,291 913,291 924,310 C935,329 957,329 968,310 C979,291 1001,291 1012,310 C1023,329 1045,329 1056,310 C1067,291 1089,291 1100,310 C1111,329 1133,329 1144,310 C1155,291 1177,291 1188,310"
        stroke="rgba(212,160,23,0.75)" stroke-width="1.2" fill="none"/>
  <!-- Step response transient (decaying, left side) -->
  <line x1="0"  y1="310" x2="0"   y2="228" stroke="rgba(125,211,252,0.7)" stroke-width="1.3"/>
  <path d="M0,228 C30,228 55,240 80,256 C105,272 130,284 160,294 C190,304 220,308 260,310"
        stroke="rgba(125,211,252,0.7)" stroke-width="1.3" fill="none"/>

  <!-- ══ BOTTOM-LEFT: Wheatstone Bridge (x=70–290, y=400–560) ══════════ -->
  <circle cx="180" cy="400" r="3" fill="rgba(212,160,23,0.9)"/>
  <circle cx="72"  cy="480" r="3" fill="rgba(196,181,253,0.8)"/>
  <circle cx="288" cy="480" r="3" fill="rgba(196,181,253,0.8)"/>
  <circle cx="180" cy="558" r="3" fill="rgba(125,211,252,0.8)"/>
  <!-- Arms (diagonal lines representing R) -->
  <line x1="180" y1="400" x2="72"  y2="480" stroke="#D4A017" stroke-width="1.3"/>
  <line x1="180" y1="400" x2="288" y2="480" stroke="#D4A017" stroke-width="1.3"/>
  <line x1="72"  y1="480" x2="180" y2="558" stroke="#D4A017" stroke-width="1.3"/>
  <line x1="288" y1="480" x2="180" y2="558" stroke="#D4A017" stroke-width="1.3"/>
  <!-- Galvanometer (dashed horizontal) -->
  <line x1="72" y1="480" x2="288" y2="480" stroke="rgba(125,211,252,0.6)" stroke-width="1.0" stroke-dasharray="5,4"/>
  <!-- Supply/GND -->
  <line x1="180" y1="378" x2="180" y2="400" stroke="#D4A017" stroke-width="1.1"/>
  <text x="180" y="373" fill="rgba(212,160,23,0.8)" font-size="11" text-anchor="middle">Vᵢₙ</text>
  <line x1="180" y1="558" x2="180" y2="578" stroke="rgba(125,211,252,0.6)" stroke-width="1.1"/>
  <line x1="164" y1="578" x2="196" y2="578" stroke="rgba(125,211,252,0.6)" stroke-width="1.5"/>
  <line x1="169" y1="585" x2="191" y2="585" stroke="rgba(125,211,252,0.5)" stroke-width="1.1"/>
  <line x1="175" y1="592" x2="185" y2="592" stroke="rgba(125,211,252,0.4)" stroke-width="0.9"/>
  <!-- R labels on arms -->
  <text x="104" y="435" fill="rgba(212,160,23,0.8)" font-size="10">R</text>
  <text x="244" y="435" fill="rgba(212,160,23,0.8)" font-size="10">R</text>
  <text x="104" y="535" fill="rgba(212,160,23,0.8)" font-size="10">R</text>
  <text x="244" y="535" fill="rgba(212,160,23,0.8)" font-size="10">R</text>

  <!-- ══ BOTTOM-CENTER: LC Resonant Tank (x=370–640, y=415–545) ════════ -->
  <!-- Outer loop -->
  <line x1="370" y1="435" x2="640" y2="435" stroke="#D4A017" stroke-width="1.1"/>
  <line x1="640" y1="435" x2="640" y2="525" stroke="rgba(125,211,252,0.8)" stroke-width="1.1"/>
  <line x1="370" y1="525" x2="640" y2="525" stroke="rgba(125,211,252,0.5)" stroke-width="0.9"/>
  <line x1="370" y1="435" x2="370" y2="525" stroke="#D4A017" stroke-width="1.1"/>
  <!-- Inductor (coil on top wire) -->
  <line x1="370" y1="435" x2="398" y2="435" stroke="#D4A017" stroke-width="1.1"/>
  <path d="M398,435 C404,416 418,416 424,435 C430,454 444,454 450,435 C456,416 470,416 476,435 C482,454 496,454 502,435 C508,416 522,416 528,435 C534,454 548,454 554,435 C560,416 566,435 566,435"
        stroke="#D4A017" stroke-width="1.5" fill="none"/>
  <line x1="566" y1="435" x2="594" y2="435" stroke="#D4A017" stroke-width="1.1"/>
  <text x="482" y="408" fill="rgba(212,160,23,0.8)" font-size="11" text-anchor="middle">L</text>
  <!-- Capacitor (on right vertical) -->
  <line x1="640" y1="435" x2="640" y2="465" stroke="rgba(125,211,252,0.8)" stroke-width="1.1"/>
  <line x1="618" y1="465" x2="662" y2="465" stroke="rgba(125,211,252,0.9)" stroke-width="2.2"/>
  <line x1="618" y1="474" x2="662" y2="474" stroke="rgba(125,211,252,0.9)" stroke-width="2.2"/>
  <line x1="640" y1="474" x2="640" y2="525" stroke="rgba(125,211,252,0.8)" stroke-width="1.1"/>
  <text x="670" y="472" fill="rgba(125,211,252,0.9)" font-size="11">C</text>
  <!-- Node dots -->
  <circle cx="370" cy="435" r="2.5" fill="#D4A017"/>
  <circle cx="640" cy="435" r="2.5" fill="rgba(125,211,252,0.9)"/>
  <circle cx="370" cy="525" r="2.5" fill="rgba(125,211,252,0.6)"/>

  <!-- ══ BOTTOM-RIGHT: Op-amp Integrator + step plot (x=720–1180, y=390–570) -->
  <!-- Op-amp A₂ -->
  <polygon points="750,420 750,530 818,475" stroke="rgba(196,181,253,0.9)" stroke-width="1.6" fill="none"/>
  <line x1="720" y1="438" x2="750" y2="438" stroke="rgba(196,181,253,0.8)" stroke-width="1.1"/>
  <line x1="720" y1="512" x2="750" y2="512" stroke="rgba(196,181,253,0.8)" stroke-width="1.1"/>
  <line x1="818" y1="475" x2="858" y2="475" stroke="rgba(196,181,253,0.8)" stroke-width="1.1"/>
  <text x="775" y="480" fill="rgba(196,181,253,0.7)" font-size="11">A₂</text>
  <!-- Feedback capacitor (arced over top) -->
  <path d="M858,475 C890,425 722,390 720,438" stroke="rgba(125,211,252,0.7)" stroke-width="1.1" fill="none" stroke-dasharray="4,3"/>
  <text x="788" y="393" fill="rgba(125,211,252,0.7)" font-size="10" text-anchor="middle">Cf</text>
  <!-- Input resistor -->
  <line x1="660" y1="438" x2="680" y2="438" stroke="#D4A017" stroke-width="1.1"/>
  <polyline points="680,438 690,438 697,420 705,456 713,420 720,438" stroke="#D4A017" stroke-width="1.4" fill="none"/>
  <text x="700" y="412" fill="rgba(212,160,23,0.8)" font-size="10" text-anchor="middle">Rᵢₙ</text>

  <!-- Step response curve (right side) -->
  <line x1="960" y1="565" x2="1170" y2="565" stroke="rgba(125,211,252,0.35)" stroke-width="0.9"/>
  <line x1="960" y1="405" x2="960"  y2="565" stroke="rgba(125,211,252,0.35)" stroke-width="0.9"/>
  <!-- Axes labels -->
  <text x="1063" y="400" fill="rgba(125,211,252,0.7)" font-size="10" text-anchor="middle">v(t)</text>
  <!-- Step (square input) -->
  <polyline points="960,565 960,448 980,448" stroke="rgba(212,160,23,0.7)" stroke-width="1.3" fill="none"/>
  <line x1="980" y1="448" x2="1170" y2="448" stroke="rgba(212,160,23,0.5)" stroke-width="0.9" stroke-dasharray="4,3"/>
  <!-- Exponential rise to steady state -->
  <path d="M960,565 C985,565 1005,535 1025,510 C1045,485 1065,462 1090,453 C1115,444 1145,449 1170,448"
        stroke="rgba(125,211,252,0.8)" stroke-width="1.5" fill="none"/>

</svg>
</div>

<!-- ── Top oscilloscope / waveform strip ──────────────────────────────── -->
<div class="cover-circuit">
<svg viewBox="0 0 1200 140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="width:100%;height:140px;display:block;">
  <!-- oscilloscope grid lines -->
  <line x1="0"    y1="28"  x2="1200" y2="28"  stroke="rgba(90,62,237,.13)" stroke-width="0.7"/>
  <line x1="0"    y1="70"  x2="1200" y2="70"  stroke="rgba(90,62,237,.20)" stroke-width="0.7"/>
  <line x1="0"    y1="112" x2="1200" y2="112" stroke="rgba(90,62,237,.13)" stroke-width="0.7"/>
  <line x1="200"  y1="0"   x2="200"  y2="140" stroke="rgba(90,62,237,.10)" stroke-width="0.5"/>
  <line x1="400"  y1="0"   x2="400"  y2="140" stroke="rgba(90,62,237,.10)" stroke-width="0.5"/>
  <line x1="600"  y1="0"   x2="600"  y2="140" stroke="rgba(90,62,237,.10)" stroke-width="0.5"/>
  <line x1="800"  y1="0"   x2="800"  y2="140" stroke="rgba(90,62,237,.10)" stroke-width="0.5"/>
  <line x1="1000" y1="0"   x2="1000" y2="140" stroke="rgba(90,62,237,.10)" stroke-width="0.5"/>
  <!-- Fundamental sine wave — purple, large amplitude -->
  <path d="M0,70 C27,8 93,8 120,70 C147,132 213,132 240,70 C267,8 333,8 360,70 C387,132 453,132 480,70 C507,8 573,8 600,70 C627,132 693,132 720,70 C747,8 813,8 840,70 C867,132 933,132 960,70 C987,8 1053,8 1080,70 C1107,132 1173,132 1200,70"
        stroke="#7C5CEF" stroke-width="3.0" fill="none" opacity="0.90"/>
  <!-- 2nd harmonic — gold, medium amplitude -->
  <path d="M0,70 C13,42 47,42 60,70 C73,98 107,98 120,70 C133,42 167,42 180,70 C193,98 227,98 240,70 C253,42 287,42 300,70 C313,98 347,98 360,70 C373,42 407,42 420,70 C433,98 467,98 480,70 C493,42 527,42 540,70 C553,98 587,98 600,70 C613,42 647,42 660,70 C673,98 707,98 720,70 C733,42 767,42 780,70 C793,98 827,98 840,70 C853,42 887,42 900,70 C913,98 947,98 960,70 C973,42 1007,42 1020,70 C1033,98 1067,98 1080,70 C1093,42 1127,42 1140,70 C1153,98 1187,98 1200,70"
        stroke="#D4A017" stroke-width="1.8" fill="none" opacity="0.65"/>
  <!-- 3rd harmonic — cyan, small amplitude -->
  <path d="M0,70 C9,54 31,54 40,70 C49,86 71,86 80,70 C89,54 111,54 120,70 C129,86 151,86 160,70 C169,54 191,54 200,70 C209,86 231,86 240,70 C249,54 271,54 280,70 C289,86 311,86 320,70 C329,54 351,54 360,70 C369,86 391,86 400,70 C409,54 431,54 440,70 C449,86 471,86 480,70 C489,54 511,54 520,70 C529,86 551,86 560,70 C569,54 591,54 600,70 C609,86 631,86 640,70 C649,54 671,54 680,70 C689,86 711,86 720,70 C729,54 751,54 760,70 C769,86 791,86 800,70 C809,54 831,54 840,70 C849,86 871,86 880,70 C889,54 911,54 920,70 C929,86 951,86 960,70 C969,54 991,54 1000,70 C1009,86 1031,86 1040,70 C1049,54 1071,54 1080,70 C1089,86 1111,86 1120,70 C1129,54 1151,54 1160,70 C1169,86 1191,86 1200,70"
        stroke="#7dd3fc" stroke-width="1.2" fill="none" opacity="0.45"/>
  <!-- Decaying transient — cyan, left portion only -->
  <path d="M0,12 C50,12 90,32 130,50 C170,68 210,68 260,70 C310,72 360,71 440,70"
        stroke="#7dd3fc" stroke-width="1.6" fill="none" opacity="0.55"/>
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
<svg viewBox="0 0 1200 150" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="width:100%;height:150px;display:block;opacity:0.92;">

  <!-- ── Main signal wire ─────────────────────────────────────────────── -->
  <line x1="0" y1="60" x2="1200" y2="60" stroke="rgba(196,181,253,0.3)" stroke-width="0.8"/>

  <!-- ── Voltage source (left) ───────────────────────────────────────── -->
  <circle cx="32" cy="60" r="22" stroke="#D4A017" stroke-width="1.8" fill="none" opacity="0.80"/>
  <text x="32" y="56" fill="#D4A017" font-size="10" text-anchor="middle" opacity="0.85" font-weight="bold">+</text>
  <text x="32" y="69" fill="#D4A017" font-size="10" text-anchor="middle" opacity="0.85">−</text>
  <!-- V_s label -->
  <text x="32" y="18" fill="#D4A017" font-size="9" text-anchor="middle" opacity="0.70">Vₛ</text>
  <!-- wire right from source -->
  <line x1="54" y1="60" x2="72" y2="60" stroke="#D4A017" stroke-width="1.8" opacity="0.80"/>

  <!-- ── R₁ (series resistor) ────────────────────────────────────────── -->
  <polyline points="72,60 85,60 96,34 109,86 122,34 135,86 148,34 161,86 174,60 188,60"
            stroke="#D4A017" stroke-width="2.0" fill="none" opacity="0.90"/>
  <text x="130" y="22" fill="#D4A017" font-size="10" text-anchor="middle" opacity="0.80">R₁</text>
  <!-- wire to node -->
  <line x1="188" y1="60" x2="232" y2="60" stroke="#D4A017" stroke-width="1.8" opacity="0.75"/>
  <!-- junction node -->
  <circle cx="232" cy="60" r="4" fill="#D4A017" opacity="0.85"/>

  <!-- ── C₁ shunt (to ground rail) ───────────────────────────────────── -->
  <line x1="232" y1="60" x2="232" y2="80" stroke="#7dd3fc" stroke-width="1.5" opacity="0.70"/>
  <line x1="212" y1="80" x2="252" y2="80" stroke="#7dd3fc" stroke-width="2.5" opacity="0.88"/>
  <line x1="212" y1="90" x2="252" y2="90" stroke="#7dd3fc" stroke-width="2.5" opacity="0.88"/>
  <line x1="232" y1="90" x2="232" y2="112" stroke="#7dd3fc" stroke-width="1.5" opacity="0.60"/>
  <text x="262" y="89" fill="#7dd3fc" font-size="10" opacity="0.80">C₁</text>

  <!-- ── L₁ (inductor coil) ──────────────────────────────────────────── -->
  <line x1="232" y1="60" x2="270" y2="60" stroke="#D4A017" stroke-width="1.8" opacity="0.75"/>
  <path d="M270,60 C278,40 294,40 302,60 C310,80 326,80 334,60 C342,40 358,40 366,60 C374,80 390,80 398,60 C406,40 422,40 430,60 C438,80 454,80 462,60"
        stroke="#D4A017" stroke-width="2.0" fill="none" opacity="0.88"/>
  <line x1="462" y1="60" x2="500" y2="60" stroke="#D4A017" stroke-width="1.8" opacity="0.75"/>
  <text x="366" y="22" fill="#D4A017" font-size="10" text-anchor="middle" opacity="0.80">L₁</text>
  <!-- junction node -->
  <circle cx="500" cy="60" r="4" fill="#7C5CEF" opacity="0.85"/>

  <!-- ── C₂ shunt (to ground rail) ───────────────────────────────────── -->
  <line x1="500" y1="60" x2="500" y2="80" stroke="#7dd3fc" stroke-width="1.5" opacity="0.70"/>
  <line x1="480" y1="80" x2="520" y2="80" stroke="#7dd3fc" stroke-width="2.5" opacity="0.88"/>
  <line x1="480" y1="90" x2="520" y2="90" stroke="#7dd3fc" stroke-width="2.5" opacity="0.88"/>
  <line x1="500" y1="90" x2="500" y2="112" stroke="#7dd3fc" stroke-width="1.5" opacity="0.60"/>
  <text x="530" y="89" fill="#7dd3fc" font-size="10" opacity="0.80">C₂</text>

  <!-- ── R₂ (series) ─────────────────────────────────────────────────── -->
  <line x1="500" y1="60" x2="548" y2="60" stroke="#D4A017" stroke-width="1.8" opacity="0.75"/>
  <polyline points="548,60 560,60 570,34 583,86 596,34 609,86 622,34 635,86 648,60 660,60"
            stroke="#D4A017" stroke-width="2.0" fill="none" opacity="0.85"/>
  <text x="604" y="22" fill="#D4A017" font-size="10" text-anchor="middle" opacity="0.80">R₂</text>

  <!-- ── Op-amp buffer A₁ ──────────────────────────────────────────────  -->
  <line x1="660" y1="60" x2="695" y2="60" stroke="#7C5CEF" stroke-width="1.8" opacity="0.75"/>
  <!-- route signal to + input at y=44 -->
  <line x1="695" y1="60" x2="695" y2="44" stroke="#7C5CEF" stroke-width="1.5" opacity="0.65"/>
  <line x1="695" y1="44" x2="726" y2="44" stroke="#7C5CEF" stroke-width="1.5" opacity="0.70"/>
  <!-- − input (tied to output for unity gain buffer) -->
  <line x1="695" y1="76" x2="726" y2="76" stroke="#7C5CEF" stroke-width="1.5" opacity="0.55"/>
  <!-- Op-amp triangle (input x=726, tip x=800) -->
  <polygon points="726,24 726,96 800,60" stroke="#7C5CEF" stroke-width="2.0" fill="none" opacity="0.85"/>
  <text x="748" y="65" fill="#7C5CEF" font-size="9" opacity="0.70">+</text>
  <text x="748" y="81" fill="#7C5CEF" font-size="9" opacity="0.55">−</text>
  <!-- Output wire + feedback wire back to − -->
  <line x1="800" y1="60" x2="848" y2="60" stroke="#7C5CEF" stroke-width="1.8" opacity="0.75"/>
  <!-- Feedback: output → −input -->
  <path d="M840,60 C840,108 695,108 695,76" stroke="#7C5CEF" stroke-width="1.2" fill="none" opacity="0.50" stroke-dasharray="5,3"/>
  <!-- junction node at output -->
  <circle cx="848" cy="60" r="4" fill="#7C5CEF" opacity="0.82"/>

  <!-- ── R₃ (output series) ──────────────────────────────────────────── -->
  <line x1="848" y1="60" x2="878" y2="60" stroke="#D4A017" stroke-width="1.8" opacity="0.75"/>
  <polyline points="878,60 890,60 900,34 913,86 926,34 939,86 952,34 965,86 978,60 990,60"
            stroke="#D4A017" stroke-width="2.0" fill="none" opacity="0.85"/>
  <text x="934" y="22" fill="#D4A017" font-size="10" text-anchor="middle" opacity="0.80">R₃</text>
  <line x1="990" y1="60" x2="1028" y2="60" stroke="#D4A017" stroke-width="1.8" opacity="0.75"/>
  <!-- junction node -->
  <circle cx="1028" cy="60" r="4" fill="#D4A017" opacity="0.82"/>

  <!-- ── C₃ shunt (output filter) ────────────────────────────────────── -->
  <line x1="1028" y1="60" x2="1028" y2="80" stroke="#7dd3fc" stroke-width="1.5" opacity="0.70"/>
  <line x1="1008" y1="80" x2="1048" y2="80" stroke="#7dd3fc" stroke-width="2.5" opacity="0.88"/>
  <line x1="1008" y1="90" x2="1048" y2="90" stroke="#7dd3fc" stroke-width="2.5" opacity="0.88"/>
  <line x1="1028" y1="90" x2="1028" y2="112" stroke="#7dd3fc" stroke-width="1.5" opacity="0.60"/>
  <text x="1058" y="89" fill="#7dd3fc" font-size="10" opacity="0.80">C₃</text>

  <!-- ── V_out terminal ──────────────────────────────────────────────── -->
  <line x1="1028" y1="60" x2="1100" y2="60" stroke="#7dd3fc" stroke-width="1.8" opacity="0.75"/>
  <circle cx="1108" cy="60" r="6" stroke="#7dd3fc" stroke-width="2.0" fill="none" opacity="0.85"/>
  <text x="1122" y="56" fill="#7dd3fc" font-size="10" opacity="0.80" font-weight="bold">V_out</text>

  <!-- ── Ground rail ─────────────────────────────────────────────────── -->
  <line x1="10" y1="112" x2="1190" y2="112" stroke="rgba(125,211,252,0.40)" stroke-width="1.2"/>
  <!-- Left return wire (source − to ground rail) -->
  <line x1="10"  y1="60"  x2="10"  y2="112" stroke="#D4A017" stroke-width="1.5" opacity="0.55"/>
  <!-- Right return wire (V_out to ground rail for reference) -->
  <line x1="1150" y1="60" x2="1150" y2="112" stroke="#7dd3fc" stroke-width="1.2" opacity="0.40"/>
  <!-- Ground symbol at center bottom -->
  <line x1="600" y1="112" x2="600" y2="122" stroke="#7dd3fc" stroke-width="1.6" opacity="0.60"/>
  <line x1="582" y1="122" x2="618" y2="122" stroke="#7dd3fc" stroke-width="2.0" opacity="0.60"/>
  <line x1="588" y1="130" x2="612" y2="130" stroke="#7dd3fc" stroke-width="1.5" opacity="0.50"/>
  <line x1="595" y1="138" x2="605" y2="138" stroke="#7dd3fc" stroke-width="1.1" opacity="0.40"/>
  <!-- Second GND symbol (left side) -->
  <line x1="232" y1="112" x2="232" y2="122" stroke="#7dd3fc" stroke-width="1.4" opacity="0.50"/>
  <line x1="218" y1="122" x2="246" y2="122" stroke="#7dd3fc" stroke-width="1.7" opacity="0.50"/>
  <line x1="222" y1="129" x2="242" y2="129" stroke="#7dd3fc" stroke-width="1.2" opacity="0.40"/>
  <line x1="226" y1="136" x2="238" y2="136" stroke="#7dd3fc" stroke-width="0.9" opacity="0.30"/>

</svg>
</div>

</div>
