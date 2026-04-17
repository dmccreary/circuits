---
title: Cover
hide:
  - navigation
  - toc
  - footer
---

<style>
/* ── Cover page ─────────────────────────────────────────────────────────── */
.md-typeset .cover-page   { min-height: 92vh; }
.md-typeset .cover-content {
  padding: 5.5rem 3rem 4.5rem;
  text-align: center;
}
.md-typeset .cover-stats   { margin: 2rem 0 1.2rem 0; }
.md-typeset .cover-buttons { margin-top: 2rem; }

/* Subtitle */
.md-typeset .cover-page h2 {
  font-weight: 500;
  color: #c4b5fd !important;
}

/* Background circuit breathing glow */
@keyframes circuit-breathe {
  0%, 100% { opacity: 0.28; }
  50%       { opacity: 0.38; }
}
.md-typeset .cover-bg-circuit svg {
  animation: circuit-breathe 7s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .md-typeset .cover-bg-circuit svg { animation: none; opacity: 0.30; }
}

/* Button hover */
.md-typeset .cover-buttons .md-button {
  transition: transform .25s ease, box-shadow .25s ease,
              background .25s ease, color .25s ease, border-color .25s ease;
}
.md-typeset .cover-buttons .md-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 18px rgba(90,62,237,.18);
}
.md-typeset .cover-buttons .md-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(90,62,237,.45);
}

@media (max-width: 768px) {
  .md-typeset .cover-content { padding: 3rem 1rem 2.5rem; }
}
</style>

<div class="cover-page" markdown>

<!-- ════════════════════════════════════════════════════════════════════════
     FULL-COVER BACKGROUND CIRCUIT ART
     Single absolute SVG filling the entire cover behind all text content.
     Uses rgba() colors so individual elements have independent transparency.
     ════════════════════════════════════════════════════════════════════════ -->
<div class="cover-bg-circuit" aria-hidden="true">
<svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg"
     preserveAspectRatio="xMidYMid slice"
     style="width:100%;height:100%;opacity:0.32;">

  <!-- ── Subtle PCB grid ──────────────────────────────────────────────── -->
  <line x1="0" y1="140" x2="1200" y2="140" stroke="rgba(90,62,237,0.18)" stroke-width="0.55"/>
  <line x1="0" y1="280" x2="1200" y2="280" stroke="rgba(90,62,237,0.12)" stroke-width="0.45"/>
  <line x1="0" y1="420" x2="1200" y2="420" stroke="rgba(90,62,237,0.12)" stroke-width="0.45"/>
  <line x1="0" y1="560" x2="1200" y2="560" stroke="rgba(90,62,237,0.18)" stroke-width="0.55"/>
  <line x1="200"  y1="0" x2="200"  y2="700" stroke="rgba(90,62,237,0.10)" stroke-width="0.40"/>
  <line x1="400"  y1="0" x2="400"  y2="700" stroke="rgba(90,62,237,0.10)" stroke-width="0.40"/>
  <line x1="600"  y1="0" x2="600"  y2="700" stroke="rgba(90,62,237,0.10)" stroke-width="0.40"/>
  <line x1="800"  y1="0" x2="800"  y2="700" stroke="rgba(90,62,237,0.10)" stroke-width="0.40"/>
  <line x1="1000" y1="0" x2="1000" y2="700" stroke="rgba(90,62,237,0.10)" stroke-width="0.40"/>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 1 — TOP BAND (y=0–145): Oscilloscope with 3 overlapping waves
       ══════════════════════════════════════════════════════════════════ -->
  <!-- Oscilloscope grid -->
  <line x1="0"    y1="38"  x2="1200" y2="38"  stroke="rgba(90,62,237,0.22)" stroke-width="0.6"/>
  <line x1="0"    y1="80"  x2="1200" y2="80"  stroke="rgba(90,62,237,0.30)" stroke-width="0.7"/>
  <line x1="0"    y1="122" x2="1200" y2="122" stroke="rgba(90,62,237,0.22)" stroke-width="0.6"/>
  <!-- Fundamental sine (purple, y-center=80, amplitude=56) -->
  <path d="M0,80 C21,24 63,24 84,80 C105,136 147,136 168,80 C189,24 231,24 252,80 C273,136 315,136 336,80 C357,24 399,24 420,80 C441,136 483,136 504,80 C525,24 567,24 588,80 C609,136 651,136 672,80 C693,24 735,24 756,80 C777,136 819,136 840,80 C861,24 903,24 924,80 C945,136 987,136 1008,80 C1029,24 1071,24 1092,80 C1113,136 1155,136 1176,80 C1197,24 1200,24 1200,80"
        stroke="rgba(124,92,239,0.95)" stroke-width="2.8" fill="none"/>
  <!-- 2nd harmonic (gold, amplitude=28) -->
  <path d="M0,80 C10,52 32,52 42,80 C52,108 74,108 84,80 C94,52 116,52 126,80 C136,108 158,108 168,80 C178,52 200,52 210,80 C220,108 242,108 252,80 C262,52 284,52 294,80 C304,108 326,108 336,80 C346,52 368,52 378,80 C388,108 410,108 420,80 C430,52 452,52 462,80 C472,108 494,108 504,80 C514,52 536,52 546,80 C556,108 578,108 588,80 C598,52 620,52 630,80 C640,108 662,108 672,80 C682,52 704,52 714,80 C724,108 746,108 756,80 C766,52 788,52 798,80 C808,108 830,108 840,80 C850,52 872,52 882,80 C892,108 914,108 924,80 C934,52 956,52 966,80 C976,108 998,108 1008,80 C1018,52 1040,52 1050,80 C1060,108 1082,108 1092,80 C1102,52 1124,52 1134,80 C1144,108 1166,108 1176,80 C1186,52 1200,52 1200,80"
        stroke="rgba(212,160,23,0.82)" stroke-width="1.8" fill="none"/>
  <!-- 3rd harmonic (cyan, amplitude=15) -->
  <path d="M0,80 C7,65 21,65 28,80 C35,95 49,95 56,80 C63,65 77,65 84,80 C91,95 105,95 112,80 C119,65 133,65 140,80 C147,95 161,95 168,80 C175,65 189,65 196,80 C203,95 217,95 224,80 C231,65 245,65 252,80 C259,95 273,95 280,80 C287,65 301,65 308,80 C315,95 329,95 336,80 C343,65 357,65 364,80 C371,95 385,95 392,80 C399,65 413,65 420,80 C427,95 441,95 448,80 C455,65 469,65 476,80 C483,95 497,95 504,80 C511,65 525,65 532,80 C539,95 553,95 560,80 C567,65 581,65 588,80 C595,95 609,95 616,80 C623,65 637,65 644,80 C651,95 665,95 672,80 C679,65 693,65 700,80 C707,95 721,95 728,80 C735,65 749,65 756,80 C763,95 777,95 784,80 C791,65 805,65 812,80 C819,95 833,95 840,80 C847,65 861,65 868,80 C875,95 889,95 896,80 C903,65 917,65 924,80 C931,95 945,95 952,80 C959,65 973,65 980,80 C987,95 1001,95 1008,80 C1015,65 1029,65 1036,80 C1043,95 1057,95 1064,80 C1071,65 1085,65 1092,80 C1099,95 1113,95 1120,80 C1127,65 1141,65 1148,80 C1155,95 1169,95 1176,80 C1183,65 1197,65 1200,80"
        stroke="rgba(125,211,252,0.58)" stroke-width="1.1" fill="none"/>
  <!-- Decaying step-response transient (cyan, left edge) -->
  <line x1="0" y1="80" x2="0" y2="16" stroke="rgba(125,211,252,0.72)" stroke-width="1.5"/>
  <path d="M0,16 C35,16 65,32 95,50 C125,66 155,74 190,78 C225,82 265,80 320,80"
        stroke="rgba(125,211,252,0.72)" stroke-width="1.5" fill="none"/>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 2 — TOP-LEFT (x=0–310, y=135–250): RC Ladder Network
       ══════════════════════════════════════════════════════════════════ -->
  <!-- Bus wire -->
  <line x1="0" y1="185" x2="310" y2="185" stroke="rgba(212,160,23,0.62)" stroke-width="1.2"/>
  <!-- R1 zigzag -->
  <polyline points="18,185 30,185 38,167 47,203 56,167 65,203 74,167 83,185 95,185"
            stroke="rgba(212,160,23,0.82)" stroke-width="1.5" fill="none"/>
  <text x="56" y="156" fill="rgba(212,160,23,0.75)" font-size="11" text-anchor="middle">R₁</text>
  <!-- Node + C1 shunt -->
  <circle cx="138" cy="185" r="2.8" fill="rgba(212,160,23,0.88)"/>
  <line x1="138" y1="185" x2="138" y2="206" stroke="rgba(125,211,252,0.80)" stroke-width="1.2"/>
  <line x1="122" y1="206" x2="154" y2="206" stroke="rgba(125,211,252,0.92)" stroke-width="2.1"/>
  <line x1="122" y1="215" x2="154" y2="215" stroke="rgba(125,211,252,0.92)" stroke-width="2.1"/>
  <line x1="138" y1="215" x2="138" y2="240" stroke="rgba(125,211,252,0.60)" stroke-width="1.2"/>
  <text x="162" y="214" fill="rgba(125,211,252,0.82)" font-size="11">C₁</text>
  <!-- R2 zigzag -->
  <polyline points="165,185 177,185 185,167 194,203 203,167 212,203 221,167 230,185 242,185"
            stroke="rgba(212,160,23,0.78)" stroke-width="1.5" fill="none"/>
  <!-- Node + C2 shunt -->
  <circle cx="285" cy="185" r="2.8" fill="rgba(212,160,23,0.82)"/>
  <line x1="285" y1="185" x2="285" y2="206" stroke="rgba(125,211,252,0.75)" stroke-width="1.2"/>
  <line x1="269" y1="206" x2="301" y2="206" stroke="rgba(125,211,252,0.88)" stroke-width="2.1"/>
  <line x1="269" y1="215" x2="301" y2="215" stroke="rgba(125,211,252,0.88)" stroke-width="2.1"/>
  <line x1="285" y1="215" x2="285" y2="240" stroke="rgba(125,211,252,0.55)" stroke-width="1.2"/>
  <!-- Ground rail + symbol -->
  <line x1="138" y1="240" x2="285" y2="240" stroke="rgba(125,211,252,0.32)" stroke-width="0.9"/>
  <line x1="211" y1="240" x2="211" y2="250" stroke="rgba(125,211,252,0.62)" stroke-width="1.1"/>
  <line x1="199" y1="250" x2="223" y2="250" stroke="rgba(125,211,252,0.62)" stroke-width="1.5"/>
  <line x1="203" y1="257" x2="219" y2="257" stroke="rgba(125,211,252,0.52)" stroke-width="1.1"/>
  <line x1="207" y1="264" x2="215" y2="264" stroke="rgba(125,211,252,0.42)" stroke-width="0.9"/>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 3 — TOP-RIGHT (x=870–1200, y=135–260): Inverting op-amp
       ══════════════════════════════════════════════════════════════════ -->
  <!-- R_in -->
  <line x1="870" y1="192" x2="900" y2="192" stroke="rgba(212,160,23,0.62)" stroke-width="1.2"/>
  <polyline points="900,192 910,192 917,174 925,210 933,174 941,210 949,174 957,192 968,192"
            stroke="rgba(212,160,23,0.80)" stroke-width="1.5" fill="none"/>
  <text x="934" y="163" fill="rgba(212,160,23,0.72)" font-size="11" text-anchor="middle">Rᵢₙ</text>
  <!-- route to -input (y=205) -->
  <line x1="968" y1="192" x2="990" y2="192" stroke="rgba(196,181,253,0.68)" stroke-width="1.2"/>
  <line x1="990" y1="192" x2="990" y2="205" stroke="rgba(196,181,253,0.62)" stroke-width="1.1"/>
  <line x1="990" y1="205" x2="1010" y2="205" stroke="rgba(196,181,253,0.65)" stroke-width="1.1"/>
  <!-- +input at y=179 tied to mid-ref -->
  <line x1="990" y1="179" x2="1010" y2="179" stroke="rgba(196,181,253,0.52)" stroke-width="1.1"/>
  <line x1="990" y1="192" x2="990" y2="179" stroke="rgba(196,181,253,0.45)" stroke-width="1.0"/>
  <!-- Op-amp body -->
  <polygon points="1010,158 1010,226 1082,192" stroke="rgba(196,181,253,0.88)" stroke-width="1.8" fill="none"/>
  <text x="1036" y="197" fill="rgba(196,181,253,0.72)" font-size="10">A₁</text>
  <!-- Output wire -->
  <line x1="1082" y1="192" x2="1130" y2="192" stroke="rgba(196,181,253,0.70)" stroke-width="1.2"/>
  <!-- Feedback: output → -input through Rf -->
  <line x1="1130" y1="192" x2="1130" y2="145" stroke="rgba(212,160,23,0.58)" stroke-width="1.1"/>
  <line x1="1130" y1="145" x2="1010" y2="145" stroke="rgba(212,160,23,0.58)" stroke-width="1.1"/>
  <line x1="1010" y1="145" x2="1010" y2="205" stroke="rgba(212,160,23,0.58)" stroke-width="1.1"/>
  <!-- Rf on feedback path -->
  <polyline points="1046,145 1058,145 1065,128 1073,162 1081,128 1089,162 1097,128 1105,145 1118,145"
            stroke="rgba(212,160,23,0.68)" stroke-width="1.3" fill="none"/>
  <text x="1082" y="118" fill="rgba(212,160,23,0.65)" font-size="10" text-anchor="middle">Rf</text>
  <!-- Output load R -->
  <line x1="1130" y1="192" x2="1155" y2="192" stroke="rgba(212,160,23,0.52)" stroke-width="1.0"/>
  <polyline points="1155,192 1163,192 1168,178 1174,206 1180,178 1186,206 1192,178 1197,192 1200,192"
            stroke="rgba(212,160,23,0.58)" stroke-width="1.2" fill="none"/>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 4 — LEFT SIDE (x=0–185, y=255–545): Voltage divider
       ══════════════════════════════════════════════════════════════════ -->
  <!-- Current source (circle) at y=300 -->
  <circle cx="65" cy="300" r="26" stroke="rgba(212,160,23,0.72)" stroke-width="1.6" fill="none"/>
  <!-- Arrow inside -->
  <line x1="65" y1="285" x2="65" y2="315" stroke="rgba(212,160,23,0.72)" stroke-width="1.4"/>
  <polyline points="57,294 65,284 73,294" stroke="rgba(212,160,23,0.72)" stroke-width="1.4" fill="none"/>
  <text x="65" y="277" fill="rgba(212,160,23,0.65)" font-size="10" text-anchor="middle">Iₛ</text>
  <!-- Top wire from source -->
  <line x1="65" y1="274" x2="65" y2="258" stroke="rgba(212,160,23,0.65)" stroke-width="1.2"/>
  <line x1="65" y1="258" x2="140" y2="258" stroke="rgba(212,160,23,0.55)" stroke-width="1.0"/>
  <!-- Bottom wire to R1 -->
  <line x1="65" y1="326" x2="65" y2="358" stroke="rgba(212,160,23,0.65)" stroke-width="1.2"/>
  <!-- R1 vertical (zigzag going down) -->
  <polyline points="65,358 65,370 47,378 83,388 47,398 83,408 47,418 83,428 65,436 65,448"
            stroke="rgba(212,160,23,0.78)" stroke-width="1.5" fill="none"/>
  <text x="96" y="400" fill="rgba(212,160,23,0.68)" font-size="11">R₁</text>
  <!-- Junction node + Vout tap -->
  <circle cx="65" cy="448" r="3" fill="rgba(212,160,23,0.85)"/>
  <line x1="65" y1="448" x2="145" y2="448" stroke="rgba(196,181,253,0.62)" stroke-width="1.1"/>
  <text x="152" y="452" fill="rgba(196,181,253,0.68)" font-size="10">Vₒᵤₜ</text>
  <!-- R2 vertical -->
  <polyline points="65,448 65,460 47,468 83,478 47,488 83,498 47,508 83,518 65,526 65,538"
            stroke="rgba(212,160,23,0.72)" stroke-width="1.5" fill="none"/>
  <text x="96" y="490" fill="rgba(212,160,23,0.62)" font-size="11">R₂</text>
  <!-- GND -->
  <line x1="65" y1="538" x2="65" y2="556" stroke="rgba(125,211,252,0.68)" stroke-width="1.3"/>
  <line x1="49" y1="556" x2="81" y2="556" stroke="rgba(125,211,252,0.68)" stroke-width="1.8"/>
  <line x1="54" y1="564" x2="76" y2="564" stroke="rgba(125,211,252,0.58)" stroke-width="1.3"/>
  <line x1="59" y1="572" x2="71" y2="572" stroke="rgba(125,211,252,0.48)" stroke-width="1.0"/>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 5 — RIGHT SIDE (x=1035–1200, y=260–545): LC Filter chain
       ══════════════════════════════════════════════════════════════════ -->
  <!-- Input wire from top -->
  <line x1="1100" y1="258" x2="1100" y2="278" stroke="rgba(212,160,23,0.65)" stroke-width="1.2"/>
  <!-- L1 coil (vertical, humps going left) -->
  <line x1="1100" y1="278" x2="1100" y2="295" stroke="rgba(212,160,23,0.65)" stroke-width="1.2"/>
  <path d="M1100,295 C1081,302 1081,317 1100,324 C1119,331 1119,346 1100,353 C1081,360 1081,375 1100,382 C1119,389 1119,404 1100,411"
        stroke="rgba(212,160,23,0.82)" stroke-width="1.6" fill="none"/>
  <line x1="1100" y1="411" x2="1100" y2="428" stroke="rgba(212,160,23,0.65)" stroke-width="1.2"/>
  <text x="1130" y="358" fill="rgba(212,160,23,0.70)" font-size="11">L₁</text>
  <!-- Junction node + C shunt (horizontal) -->
  <circle cx="1100" cy="428" r="3" fill="rgba(196,181,253,0.85)"/>
  <line x1="1100" y1="428" x2="1100" y2="446" stroke="rgba(125,211,252,0.78)" stroke-width="1.2"/>
  <line x1="1120" y1="446" x2="1080" y2="446" stroke="rgba(125,211,252,0.92)" stroke-width="2.1"/>
  <line x1="1120" y1="455" x2="1080" y2="455" stroke="rgba(125,211,252,0.92)" stroke-width="2.1"/>
  <line x1="1100" y1="455" x2="1100" y2="474" stroke="rgba(125,211,252,0.65)" stroke-width="1.2"/>
  <text x="1128" y="453" fill="rgba(125,211,252,0.82)" font-size="11">C₁</text>
  <!-- Continue down + second L -->
  <line x1="1100" y1="474" x2="1100" y2="492" stroke="rgba(212,160,23,0.55)" stroke-width="1.1"/>
  <path d="M1100,492 C1081,499 1081,514 1100,521 C1119,528 1119,537 1100,537"
        stroke="rgba(212,160,23,0.65)" stroke-width="1.4" fill="none"/>
  <text x="1130" y="516" fill="rgba(212,160,23,0.58)" font-size="11">L₂</text>
  <!-- GND at bottom -->
  <line x1="1100" y1="537" x2="1100" y2="556" stroke="rgba(125,211,252,0.68)" stroke-width="1.3"/>
  <line x1="1084" y1="556" x2="1116" y2="556" stroke="rgba(125,211,252,0.68)" stroke-width="1.8"/>
  <line x1="1089" y1="564" x2="1111" y2="564" stroke="rgba(125,211,252,0.58)" stroke-width="1.3"/>
  <line x1="1094" y1="572" x2="1106" y2="572" stroke="rgba(125,211,252,0.48)" stroke-width="1.0"/>
  <!-- Horizontal output at junction -->
  <line x1="1100" y1="428" x2="1165" y2="428" stroke="rgba(196,181,253,0.52)" stroke-width="1.0"/>
  <circle cx="1165" cy="428" r="4.5" stroke="rgba(196,181,253,0.62)" stroke-width="1.5" fill="none"/>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 6 — MID-LEFT (x=135–370, y=295–490): Inductor + op-amp stage
       ══════════════════════════════════════════════════════════════════ -->
  <!-- Horizontal bus -->
  <line x1="145" y1="370" x2="370" y2="370" stroke="rgba(212,160,23,0.52)" stroke-width="1.0"/>
  <!-- L (coil, horizontal) -->
  <line x1="145" y1="370" x2="170" y2="370" stroke="rgba(212,160,23,0.55)" stroke-width="1.1"/>
  <path d="M170,370 C175,353 187,353 192,370 C197,387 209,387 214,370 C219,353 231,353 236,370 C241,387 253,387 258,370 C263,353 270,370 270,370"
        stroke="rgba(212,160,23,0.68)" stroke-width="1.4" fill="none"/>
  <line x1="270" y1="370" x2="295" y2="370" stroke="rgba(212,160,23,0.55)" stroke-width="1.1"/>
  <text x="215" y="343" fill="rgba(212,160,23,0.60)" font-size="10" text-anchor="middle">L₂</text>
  <!-- C shunt at right of L -->
  <circle cx="295" cy="370" r="2.5" fill="rgba(212,160,23,0.68)"/>
  <line x1="295" y1="370" x2="295" y2="388" stroke="rgba(125,211,252,0.72)" stroke-width="1.1"/>
  <line x1="279" y1="388" x2="311" y2="388" stroke="rgba(125,211,252,0.85)" stroke-width="1.9"/>
  <line x1="279" y1="396" x2="311" y2="396" stroke="rgba(125,211,252,0.85)" stroke-width="1.9"/>
  <line x1="295" y1="396" x2="295" y2="418" stroke="rgba(125,211,252,0.52)" stroke-width="1.1"/>
  <!-- Small op-amp at end of bus -->
  <line x1="340" y1="370" x2="355" y2="370" stroke="rgba(196,181,253,0.60)" stroke-width="1.1"/>
  <line x1="355" y1="370" x2="355" y2="358" stroke="rgba(196,181,253,0.55)" stroke-width="1.0"/>
  <line x1="355" y1="358" x2="368" y2="358" stroke="rgba(196,181,253,0.58)" stroke-width="1.0"/>
  <line x1="355" y1="382" x2="368" y2="382" stroke="rgba(196,181,253,0.48)" stroke-width="1.0"/>
  <polygon points="368,342 368,398 420,370" stroke="rgba(196,181,253,0.75)" stroke-width="1.5" fill="none"/>
  <line x1="420" y1="370" x2="440" y2="370" stroke="rgba(196,181,253,0.58)" stroke-width="1.0"/>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 7 — MID-RIGHT (x=770–1030, y=295–490): RC + op-amp stage
       ══════════════════════════════════════════════════════════════════ -->
  <!-- Bus -->
  <line x1="770" y1="370" x2="1030" y2="370" stroke="rgba(212,160,23,0.50)" stroke-width="1.0"/>
  <!-- R zigzag -->
  <line x1="770" y1="370" x2="793" y2="370" stroke="rgba(212,160,23,0.52)" stroke-width="1.1"/>
  <polyline points="793,370 803,370 810,352 818,388 826,352 834,388 842,352 850,370 861,370"
            stroke="rgba(212,160,23,0.65)" stroke-width="1.4" fill="none"/>
  <line x1="861" y1="370" x2="886" y2="370" stroke="rgba(212,160,23,0.52)" stroke-width="1.1"/>
  <!-- C inline (plates) -->
  <line x1="886" y1="348" x2="886" y2="392" stroke="rgba(125,211,252,0.85)" stroke-width="2.0"/>
  <line x1="896" y1="348" x2="896" y2="392" stroke="rgba(125,211,252,0.85)" stroke-width="2.0"/>
  <line x1="896" y1="370" x2="924" y2="370" stroke="rgba(125,211,252,0.55)" stroke-width="1.1"/>
  <!-- Junction + second op-amp -->
  <circle cx="924" cy="370" r="2.5" fill="rgba(196,181,253,0.78)"/>
  <line x1="924" y1="370" x2="944" y2="370" stroke="rgba(196,181,253,0.62)" stroke-width="1.1"/>
  <line x1="944" y1="370" x2="944" y2="358" stroke="rgba(196,181,253,0.58)" stroke-width="1.0"/>
  <line x1="944" y1="358" x2="958" y2="358" stroke="rgba(196,181,253,0.60)" stroke-width="1.0"/>
  <line x1="944" y1="382" x2="958" y2="382" stroke="rgba(196,181,253,0.50)" stroke-width="1.0"/>
  <polygon points="958,340 958,400 1012,370" stroke="rgba(196,181,253,0.80)" stroke-width="1.5" fill="none"/>
  <line x1="1012" y1="370" x2="1030" y2="370" stroke="rgba(196,181,253,0.62)" stroke-width="1.1"/>
  <!-- Feedback arc over this op-amp -->
  <path d="M1030,370 C1048,320 930,310 930,358" stroke="rgba(125,211,252,0.58)" stroke-width="1.1" fill="none" stroke-dasharray="4,3"/>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 8 — BOTTOM-LEFT (x=20–320, y=555–700): Wheatstone Bridge
       ══════════════════════════════════════════════════════════════════ -->
  <!-- Diamond nodes -->
  <circle cx="170" cy="572" r="3.2" fill="rgba(212,160,23,0.88)"/>
  <circle cx="65"  cy="640" r="3.2" fill="rgba(196,181,253,0.82)"/>
  <circle cx="275" cy="640" r="3.2" fill="rgba(196,181,253,0.82)"/>
  <circle cx="170" cy="708" r="3.2" fill="rgba(125,211,252,0.78)"/>
  <!-- Supply wire -->
  <line x1="170" y1="556" x2="170" y2="572" stroke="rgba(212,160,23,0.72)" stroke-width="1.3"/>
  <text x="170" y="549" fill="rgba(212,160,23,0.72)" font-size="11" text-anchor="middle">Vᵢₙ</text>
  <!-- Arms (R symbols on diagonals — just lines for compactness) -->
  <line x1="170" y1="572" x2="65"  y2="640" stroke="rgba(212,160,23,0.78)" stroke-width="1.4"/>
  <line x1="170" y1="572" x2="275" y2="640" stroke="rgba(212,160,23,0.78)" stroke-width="1.4"/>
  <line x1="65"  y1="640" x2="170" y2="708" stroke="rgba(212,160,23,0.72)" stroke-width="1.4"/>
  <line x1="275" y1="640" x2="170" y2="708" stroke="rgba(212,160,23,0.72)" stroke-width="1.4"/>
  <!-- Galvanometer (dashed) -->
  <line x1="65" y1="640" x2="275" y2="640" stroke="rgba(125,211,252,0.62)" stroke-width="1.0" stroke-dasharray="5,4"/>
  <!-- R labels -->
  <text x="100" y="602" fill="rgba(212,160,23,0.72)" font-size="10">R</text>
  <text x="230" y="602" fill="rgba(212,160,23,0.72)" font-size="10">R</text>
  <text x="100" y="688" fill="rgba(212,160,23,0.65)" font-size="10">R</text>
  <text x="230" y="688" fill="rgba(212,160,23,0.65)" font-size="10">R</text>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 9 — BOTTOM-CENTER (x=330–820, y=565–700): RLC Series Circuit
       ══════════════════════════════════════════════════════════════════ -->
  <!-- Signal bus -->
  <line x1="330" y1="615" x2="820" y2="615" stroke="rgba(196,181,253,0.30)" stroke-width="0.8"/>
  <!-- Voltage source (circle) -->
  <circle cx="362" cy="615" r="22" stroke="rgba(212,160,23,0.78)" stroke-width="1.6" fill="none"/>
  <text x="362" y="611" fill="rgba(212,160,23,0.80)" font-size="10" text-anchor="middle" font-weight="bold">+</text>
  <text x="362" y="623" fill="rgba(212,160,23,0.80)" font-size="10" text-anchor="middle">−</text>
  <text x="362" y="587" fill="rgba(212,160,23,0.68)" font-size="9" text-anchor="middle">Vₛ</text>
  <!-- Wire right -->
  <line x1="384" y1="615" x2="402" y2="615" stroke="rgba(212,160,23,0.78)" stroke-width="1.6"/>
  <!-- R1 -->
  <polyline points="402,615 413,615 420,597 429,633 438,597 447,633 456,597 465,615 477,615"
            stroke="rgba(212,160,23,0.88)" stroke-width="1.7" fill="none"/>
  <text x="439" y="586" fill="rgba(212,160,23,0.78)" font-size="10" text-anchor="middle">R₁</text>
  <line x1="477" y1="615" x2="506" y2="615" stroke="rgba(212,160,23,0.78)" stroke-width="1.6"/>
  <!-- Node 1 -->
  <circle cx="506" cy="615" r="3.5" fill="rgba(212,160,23,0.88)"/>
  <!-- C1 shunt -->
  <line x1="506" y1="615" x2="506" y2="632" stroke="rgba(125,211,252,0.72)" stroke-width="1.3"/>
  <line x1="490" y1="632" x2="522" y2="632" stroke="rgba(125,211,252,0.90)" stroke-width="2.1"/>
  <line x1="490" y1="641" x2="522" y2="641" stroke="rgba(125,211,252,0.90)" stroke-width="2.1"/>
  <line x1="506" y1="641" x2="506" y2="660" stroke="rgba(125,211,252,0.58)" stroke-width="1.2"/>
  <text x="530" y="640" fill="rgba(125,211,252,0.82)" font-size="10">C₁</text>
  <!-- L1 coil -->
  <line x1="506" y1="615" x2="534" y2="615" stroke="rgba(212,160,23,0.78)" stroke-width="1.6"/>
  <path d="M534,615 C540,598 552,598 558,615 C564,632 576,632 582,615 C588,598 600,598 606,615 C612,632 624,632 630,615 C636,598 644,615 644,615"
        stroke="rgba(212,160,23,0.88)" stroke-width="1.8" fill="none"/>
  <line x1="644" y1="615" x2="672" y2="615" stroke="rgba(212,160,23,0.78)" stroke-width="1.6"/>
  <text x="589" y="586" fill="rgba(212,160,23,0.78)" font-size="10" text-anchor="middle">L₁</text>
  <!-- Node 2 -->
  <circle cx="672" cy="615" r="3.5" fill="rgba(196,181,253,0.88)"/>
  <!-- C2 shunt -->
  <line x1="672" y1="615" x2="672" y2="632" stroke="rgba(125,211,252,0.72)" stroke-width="1.3"/>
  <line x1="656" y1="632" x2="688" y2="632" stroke="rgba(125,211,252,0.90)" stroke-width="2.1"/>
  <line x1="656" y1="641" x2="688" y2="641" stroke="rgba(125,211,252,0.90)" stroke-width="2.1"/>
  <line x1="672" y1="641" x2="672" y2="660" stroke="rgba(125,211,252,0.58)" stroke-width="1.2"/>
  <text x="697" y="640" fill="rgba(125,211,252,0.82)" font-size="10">C₂</text>
  <!-- R2 -->
  <line x1="672" y1="615" x2="700" y2="615" stroke="rgba(212,160,23,0.78)" stroke-width="1.6"/>
  <polyline points="700,615 711,615 718,597 727,633 736,597 745,633 754,597 763,615 775,615"
            stroke="rgba(212,160,23,0.85)" stroke-width="1.7" fill="none"/>
  <text x="737" y="586" fill="rgba(212,160,23,0.75)" font-size="10" text-anchor="middle">R₂</text>
  <line x1="775" y1="615" x2="800" y2="615" stroke="rgba(125,211,252,0.72)" stroke-width="1.6"/>
  <!-- Vout terminal -->
  <circle cx="806" cy="615" r="5.5" stroke="rgba(125,211,252,0.82)" stroke-width="1.8" fill="none"/>
  <text x="816" y="612" fill="rgba(125,211,252,0.72)" font-size="9">Vₒᵤₜ</text>
  <!-- Ground rail -->
  <line x1="340" y1="660" x2="810" y2="660" stroke="rgba(125,211,252,0.28)" stroke-width="0.9"/>
  <line x1="340" y1="615" x2="340" y2="660" stroke="rgba(212,160,23,0.52)" stroke-width="1.1"/>
  <!-- Center GND symbol -->
  <line x1="588" y1="660" x2="588" y2="670" stroke="rgba(125,211,252,0.60)" stroke-width="1.1"/>
  <line x1="575" y1="670" x2="601" y2="670" stroke="rgba(125,211,252,0.60)" stroke-width="1.5"/>
  <line x1="579" y1="677" x2="597" y2="677" stroke="rgba(125,211,252,0.50)" stroke-width="1.1"/>
  <line x1="583" y1="684" x2="593" y2="684" stroke="rgba(125,211,252,0.40)" stroke-width="0.9"/>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 10 — BOTTOM-RIGHT (x=830–1175, y=555–700): Op-amp Integrator
       ══════════════════════════════════════════════════════════════════ -->
  <!-- Rin -->
  <line x1="830" y1="606" x2="860" y2="606" stroke="rgba(212,160,23,0.68)" stroke-width="1.2"/>
  <polyline points="860,606 870,606 877,588 885,624 893,588 901,624 909,588 917,606 929,606"
            stroke="rgba(212,160,23,0.80)" stroke-width="1.5" fill="none"/>
  <text x="895" y="578" fill="rgba(212,160,23,0.70)" font-size="10" text-anchor="middle">Rᵢ</text>
  <!-- Route to -input -->
  <line x1="929" y1="606" x2="956" y2="606" stroke="rgba(196,181,253,0.68)" stroke-width="1.2"/>
  <line x1="956" y1="606" x2="956" y2="620" stroke="rgba(196,181,253,0.62)" stroke-width="1.1"/>
  <line x1="956" y1="620" x2="974" y2="620" stroke="rgba(196,181,253,0.65)" stroke-width="1.1"/>
  <!-- +input to GND ref -->
  <line x1="956" y1="592" x2="974" y2="592" stroke="rgba(196,181,253,0.52)" stroke-width="1.1"/>
  <!-- Op-amp body -->
  <polygon points="974,573 974,639 1048,606" stroke="rgba(196,181,253,0.88)" stroke-width="1.7" fill="none"/>
  <text x="1003" y="611" fill="rgba(196,181,253,0.70)" font-size="10">A₂</text>
  <!-- Output wire -->
  <line x1="1048" y1="606" x2="1095" y2="606" stroke="rgba(196,181,253,0.72)" stroke-width="1.2"/>
  <circle cx="1098" cy="606" r="5" stroke="rgba(196,181,253,0.72)" stroke-width="1.5" fill="none"/>
  <!-- Feedback Cf (dashed arc) -->
  <path d="M1095,606 C1122,558 958,548 958,592" stroke="rgba(125,211,252,0.65)" stroke-width="1.2" fill="none" stroke-dasharray="4,3"/>
  <text x="1022" y="552" fill="rgba(125,211,252,0.65)" font-size="10" text-anchor="middle">Cf</text>
  <!-- Mini step-response plot -->
  <line x1="1108" y1="666" x2="1175" y2="666" stroke="rgba(125,211,252,0.28)" stroke-width="0.8"/>
  <line x1="1108" y1="578" x2="1108" y2="666" stroke="rgba(125,211,252,0.28)" stroke-width="0.8"/>
  <polyline points="1108,666 1108,606 1118,606" stroke="rgba(212,160,23,0.62)" stroke-width="1.2" fill="none"/>
  <path d="M1108,666 C1122,666 1132,646 1142,632 C1152,618 1162,610 1175,607"
        stroke="rgba(125,211,252,0.68)" stroke-width="1.4" fill="none"/>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 11 — LC RESONANT TANK (x=350–580, y=295–490): Closed loop
       ══════════════════════════════════════════════════════════════════ -->
  <!-- Top wire -->
  <line x1="355" y1="318" x2="572" y2="318" stroke="rgba(212,160,23,0.58)" stroke-width="1.1"/>
  <!-- Left vertical -->
  <line x1="355" y1="318" x2="355" y2="468" stroke="rgba(212,160,23,0.55)" stroke-width="1.1"/>
  <!-- Inductor on top -->
  <line x1="355" y1="318" x2="380" y2="318" stroke="rgba(212,160,23,0.58)" stroke-width="1.1"/>
  <path d="M380,318 C385,302 397,302 402,318 C407,334 419,334 424,318 C429,302 441,302 446,318 C451,334 463,334 468,318 C473,302 485,302 490,318 C495,334 502,318 502,318"
        stroke="rgba(212,160,23,0.72)" stroke-width="1.4" fill="none"/>
  <line x1="502" y1="318" x2="528" y2="318" stroke="rgba(212,160,23,0.58)" stroke-width="1.1"/>
  <text x="441" y="295" fill="rgba(212,160,23,0.62)" font-size="10" text-anchor="middle">L</text>
  <!-- Capacitor on right vertical -->
  <line x1="572" y1="318" x2="572" y2="358" stroke="rgba(125,211,252,0.72)" stroke-width="1.1"/>
  <line x1="552" y1="358" x2="592" y2="358" stroke="rgba(125,211,252,0.90)" stroke-width="2.0"/>
  <line x1="552" y1="367" x2="592" y2="367" stroke="rgba(125,211,252,0.90)" stroke-width="2.0"/>
  <line x1="572" y1="367" x2="572" y2="468" stroke="rgba(125,211,252,0.65)" stroke-width="1.1"/>
  <text x="598" y="365" fill="rgba(125,211,252,0.82)" font-size="10">C</text>
  <!-- Bottom wire -->
  <line x1="355" y1="468" x2="572" y2="468" stroke="rgba(125,211,252,0.38)" stroke-width="0.9"/>
  <!-- Node dots -->
  <circle cx="355" cy="318" r="2.5" fill="rgba(212,160,23,0.75)"/>
  <circle cx="572" cy="318" r="2.5" fill="rgba(125,211,252,0.82)"/>
  <circle cx="355" cy="468" r="2.5" fill="rgba(125,211,252,0.55)"/>
  <circle cx="572" cy="468" r="2.5" fill="rgba(125,211,252,0.55)"/>

  <!-- ══════════════════════════════════════════════════════════════════
       ZONE 12 — CENTER ACCENT (x=580–770, y=300–480): Differentiator
       ══════════════════════════════════════════════════════════════════ -->
  <!-- Horizontal bus -->
  <line x1="590" y1="388" x2="770" y2="388" stroke="rgba(196,181,253,0.38)" stroke-width="0.9"/>
  <!-- C inline series -->
  <line x1="590" y1="388" x2="615" y2="388" stroke="rgba(125,211,252,0.52)" stroke-width="1.0"/>
  <line x1="615" y1="370" x2="615" y2="406" stroke="rgba(125,211,252,0.80)" stroke-width="1.9"/>
  <line x1="624" y1="370" x2="624" y2="406" stroke="rgba(125,211,252,0.80)" stroke-width="1.9"/>
  <line x1="624" y1="388" x2="650" y2="388" stroke="rgba(125,211,252,0.52)" stroke-width="1.0"/>
  <!-- R to op-amp input -->
  <polyline points="650,388 659,388 665,372 672,404 679,372 686,404 693,372 700,388 710,388"
            stroke="rgba(212,160,23,0.62)" stroke-width="1.3" fill="none"/>
  <line x1="710" y1="388" x2="726" y2="388" stroke="rgba(196,181,253,0.55)" stroke-width="1.0"/>
  <!-- Small op-amp -->
  <line x1="726" y1="388" x2="726" y2="376" stroke="rgba(196,181,253,0.55)" stroke-width="1.0"/>
  <line x1="726" y1="376" x2="738" y2="376" stroke="rgba(196,181,253,0.58)" stroke-width="1.0"/>
  <line x1="726" y1="400" x2="738" y2="400" stroke="rgba(196,181,253,0.48)" stroke-width="1.0"/>
  <polygon points="738,360 738,416 792,388" stroke="rgba(196,181,253,0.72)" stroke-width="1.4" fill="none"/>
  <line x1="792" y1="388" x2="820" y2="388" stroke="rgba(196,181,253,0.55)" stroke-width="1.0"/>

</svg>
</div>

<!-- ════════════════════════════════════════════════════════════════════
     COVER CONTENT — title, description, stats, buttons (z-index: 1)
     ════════════════════════════════════════════════════════════════════ -->
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

</div>
