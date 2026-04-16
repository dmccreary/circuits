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

.md-typeset .cover-page h2 {
  font-weight: 500;
  color: #c4b5fd !important;
}

@keyframes circuit-breathe {
  0%, 100% { opacity: 0.80; }
  50%       { opacity: 0.95; }
}
.md-typeset .cover-bg-circuit svg {
  animation: circuit-breathe 8s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .md-typeset .cover-bg-circuit svg { animation: none; opacity: 0.85; }
}

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
     FULL-PAGE BACKGROUND CIRCUIT ART
     preserveAspectRatio="none" guarantees 100% fill at every viewport size.
     12 circuit zones cover all regions: top, sides, center, bottom.
     Center zone (behind title text) uses low opacity (~0.22).
     ════════════════════════════════════════════════════════════════════════ -->
<div class="cover-bg-circuit" aria-hidden="true">
<svg viewBox="0 0 1200 900" xmlns="http://www.w3.org/2000/svg"
     preserveAspectRatio="none"
     style="width:100%;height:100%;">

  <!-- ══ GLOW FILTERS ────────────────────────────────────────────────────── -->
  <defs>
    <!-- Purple glow — oscilloscope primary waveform -->
    <filter id="glow-purple" x="-18%" y="-60%" width="136%" height="220%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- Gold glow — op-amp triangle & feedback path -->
    <filter id="glow-opamp" x="-14%" y="-14%" width="128%" height="128%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- Soft scope-screen ambient backlight -->
    <filter id="glow-scope" x="-8%" y="-8%" width="116%" height="116%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- Center safe-zone clip: anything inside is masked to near-zero -->
    <clipPath id="edge-only">
      <rect x="0"    y="0"   width="200"  height="900"/>
      <rect x="1000" y="0"   width="200"  height="900"/>
      <rect x="0"    y="0"   width="1200" height="218"/>
      <rect x="0"    y="705" width="1200" height="195"/>
    </clipPath>
  </defs>

  <!-- ══ PCB GRID ──────────────────────────────────────────────────────── -->
  <g stroke="rgba(90,62,237,0.20)" stroke-width="0.6">
    <line x1="0" y1="75"  x2="1200" y2="75"/>
    <line x1="0" y1="150" x2="1200" y2="150"/>
    <line x1="0" y1="225" x2="1200" y2="225"/>
    <line x1="0" y1="300" x2="1200" y2="300"/>
    <line x1="0" y1="375" x2="1200" y2="375"/>
    <line x1="0" y1="450" x2="1200" y2="450"/>
    <line x1="0" y1="525" x2="1200" y2="525"/>
    <line x1="0" y1="600" x2="1200" y2="600"/>
    <line x1="0" y1="675" x2="1200" y2="675"/>
    <line x1="0" y1="750" x2="1200" y2="750"/>
    <line x1="0" y1="825" x2="1200" y2="825"/>
  </g>
  <g stroke="rgba(90,62,237,0.17)" stroke-width="0.5">
    <line x1="100"  y1="0" x2="100"  y2="900"/>
    <line x1="200"  y1="0" x2="200"  y2="900"/>
    <line x1="300"  y1="0" x2="300"  y2="900"/>
    <line x1="400"  y1="0" x2="400"  y2="900"/>
    <line x1="500"  y1="0" x2="500"  y2="900"/>
    <line x1="600"  y1="0" x2="600"  y2="900"/>
    <line x1="700"  y1="0" x2="700"  y2="900"/>
    <line x1="800"  y1="0" x2="800"  y2="900"/>
    <line x1="900"  y1="0" x2="900"  y2="900"/>
    <line x1="1000" y1="0" x2="1000" y2="900"/>
    <line x1="1100" y1="0" x2="1100" y2="900"/>
  </g>

  <!-- ══ STRUCTURAL BUS TRACES (connecting all zones) ─────────────────── -->
  <!-- Horizontal separator between top and middle -->
  <line x1="0"   y1="218" x2="1200" y2="218" stroke="rgba(90,62,237,0.24)" stroke-width="1.0"/>
  <!-- Horizontal separator between middle and bottom -->
  <line x1="0"   y1="705" x2="1200" y2="705" stroke="rgba(90,62,237,0.24)" stroke-width="1.0"/>
  <!-- Vertical bus left (between Zone 4 and center) -->
  <line x1="198" y1="218" x2="198" y2="705" stroke="rgba(90,62,237,0.28)" stroke-width="1.0"/>
  <!-- Vertical bus right (between center and Zone 8) -->
  <line x1="1002" y1="218" x2="1002" y2="705" stroke="rgba(90,62,237,0.28)" stroke-width="1.0"/>
  <!-- Mid-left bus — faint; center safe zone boundary -->
  <line x1="400" y1="218" x2="400" y2="705" stroke="rgba(90,62,237,0.10)" stroke-width="0.6"/>
  <!-- Mid-right bus — faint; center safe zone boundary -->
  <line x1="800" y1="218" x2="800" y2="705" stroke="rgba(90,62,237,0.10)" stroke-width="0.6"/>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 1 — TOP-LEFT (x=8–390, y=8–210): Oscilloscope display
       ══════════════════════════════════════════════════════════════════════ -->
  <!-- Oscilloscope ambient screen backlight (glow behind frame) -->
  <rect x="8" y="8" width="378" height="200" rx="4"
        fill="rgba(90,62,237,0.10)" filter="url(#glow-scope)"/>
  <!-- Scope frame — boosted contrast -->
  <rect x="8" y="8" width="378" height="200" rx="4"
        stroke="rgba(120,90,255,0.80)" stroke-width="2.0" fill="rgba(90,62,237,0.10)"/>
  <!-- Internal scope grid -->
  <line x1="8"   y1="57"  x2="386" y2="57"  stroke="rgba(90,62,237,0.25)" stroke-width="0.6"/>
  <line x1="8"   y1="108" x2="386" y2="108" stroke="rgba(90,62,237,0.30)" stroke-width="0.7"/>
  <line x1="8"   y1="159" x2="386" y2="159" stroke="rgba(90,62,237,0.25)" stroke-width="0.6"/>
  <line x1="104" y1="8"   x2="104" y2="208" stroke="rgba(90,62,237,0.20)" stroke-width="0.5"/>
  <line x1="200" y1="8"   x2="200" y2="208" stroke="rgba(90,62,237,0.20)" stroke-width="0.5"/>
  <line x1="296" y1="8"   x2="296" y2="208" stroke="rgba(90,62,237,0.20)" stroke-width="0.5"/>
  <!-- Sine wave (primary, purple) — with glow filter for emphasis -->
  <path d="M8,108 C29,46 58,46 79,108 C100,170 129,170 150,108 C171,46 200,46 221,108 C242,170 271,170 292,108 C313,46 342,46 363,108 C384,170 386,170 386,108"
        stroke="rgba(200,160,255,0.98)" stroke-width="3.8" fill="none"
        filter="url(#glow-purple)"/>
  <!-- Second harmonic (gold) — boosted -->
  <path d="M8,108 C19,78 33,78 44,108 C55,138 69,138 80,108 C91,78 105,78 116,108 C127,138 141,138 152,108 C163,78 177,78 188,108 C199,138 213,138 224,108 C235,78 249,78 260,108 C271,138 285,138 296,108 C307,78 321,78 332,108 C343,138 357,138 368,108 C379,78 386,78 386,108"
        stroke="rgba(220,170,30,0.95)" stroke-width="2.5" fill="none"/>
  <!-- Step response (cyan) — boosted -->
  <line x1="8" y1="108" x2="8" y2="36" stroke="rgba(100,220,255,0.96)" stroke-width="2.5"/>
  <path d="M8,36 C52,36 80,58 115,78 C148,96 178,104 228,107 C270,109 330,108 386,108"
        stroke="rgba(100,220,255,0.96)" stroke-width="2.5" fill="none"/>
  <!-- Labels -->
  <text x="22"  y="30"  fill="rgba(200,185,255,0.88)" font-size="12" font-weight="bold">V(t)</text>
  <text x="352" y="205" fill="rgba(200,185,255,0.78)" font-size="11">t →</text>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 2 — TOP-CENTER (x=415–785, y=15–210): RC filter ladder + source
       ══════════════════════════════════════════════════════════════════════ -->
  <!-- Voltage source circle at (448, 110) -->
  <circle cx="448" cy="110" r="22" stroke="rgba(220,170,30,0.90)" stroke-width="2.2" fill="rgba(90,62,237,0.12)"/>
  <text x="448" y="106" fill="rgba(220,170,30,0.98)" font-size="13" text-anchor="middle" font-weight="bold">+</text>
  <text x="448" y="119" fill="rgba(220,170,30,0.98)" font-size="13" text-anchor="middle">−</text>
  <text x="448" y="80"  fill="rgba(220,170,30,0.88)" font-size="12" text-anchor="middle" font-weight="bold">Vₛ</text>
  <!-- Top wire from source -->
  <line x1="448" y1="88" x2="448" y2="68" stroke="rgba(220,170,30,0.82)" stroke-width="1.8"/>
  <line x1="448" y1="68" x2="492" y2="68" stroke="rgba(220,170,30,0.82)" stroke-width="1.8"/>
  <!-- R1 zigzag -->
  <polyline points="492,68 502,68 509,50 517,86 525,50 533,86 541,50 549,68 563,68"
            stroke="rgba(220,170,30,0.98)" stroke-width="2.5" fill="none"/>
  <text x="526" y="38" fill="rgba(220,170,30,0.90)" font-size="12" text-anchor="middle" font-weight="bold">R₁</text>
  <!-- Node 1 at x=592 -->
  <line x1="563" y1="68" x2="592" y2="68" stroke="rgba(220,170,30,0.85)" stroke-width="1.8"/>
  <circle cx="592" cy="68" r="5" fill="rgba(220,170,30,0.98)"/>
  <!-- C1 shunt from node 1 -->
  <line x1="592" y1="68" x2="592" y2="92" stroke="rgba(100,220,255,0.90)" stroke-width="1.8"/>
  <line x1="574" y1="92"  x2="610" y2="92"  stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="574" y1="102" x2="610" y2="102" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="592" y1="102" x2="592" y2="130" stroke="rgba(100,220,255,0.75)" stroke-width="1.8"/>
  <text x="616" y="100" fill="rgba(100,220,255,0.90)" font-size="12" font-weight="bold">C₁</text>
  <!-- R2 from node 1 -->
  <line x1="592" y1="68" x2="623" y2="68" stroke="rgba(220,170,30,0.85)" stroke-width="1.8"/>
  <polyline points="623,68 633,68 640,50 648,86 656,50 664,86 672,50 680,68 694,68"
            stroke="rgba(220,170,30,0.95)" stroke-width="2.5" fill="none"/>
  <text x="657" y="38" fill="rgba(220,170,30,0.88)" font-size="12" text-anchor="middle" font-weight="bold">R₂</text>
  <!-- Node 2 at x=722 -->
  <line x1="694" y1="68" x2="722" y2="68" stroke="rgba(220,170,30,0.82)" stroke-width="1.8"/>
  <circle cx="722" cy="68" r="5" fill="rgba(200,185,255,0.98)"/>
  <!-- C2 shunt from node 2 -->
  <line x1="722" y1="68" x2="722" y2="92" stroke="rgba(100,220,255,0.85)" stroke-width="1.8"/>
  <line x1="704" y1="92"  x2="740" y2="92"  stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="704" y1="102" x2="740" y2="102" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="722" y1="102" x2="722" y2="130" stroke="rgba(100,220,255,0.72)" stroke-width="1.8"/>
  <text x="746" y="100" fill="rgba(100,220,255,0.88)" font-size="12" font-weight="bold">C₂</text>
  <!-- Output terminal -->
  <line x1="722" y1="68" x2="758" y2="68" stroke="rgba(200,185,255,0.88)" stroke-width="1.8"/>
  <circle cx="762" cy="68" r="7" stroke="rgba(200,185,255,0.92)" stroke-width="2.2" fill="none"/>
  <text x="775" y="65" fill="rgba(200,185,255,0.85)" font-size="12" font-weight="bold">Vₒᵤₜ</text>
  <!-- Ground return rail -->
  <line x1="448" y1="132" x2="448" y2="152" stroke="rgba(100,220,255,0.80)" stroke-width="1.8"/>
  <line x1="448" y1="152" x2="722" y2="152" stroke="rgba(100,220,255,0.55)" stroke-width="1.3"/>
  <line x1="592" y1="130" x2="592" y2="152" stroke="rgba(100,220,255,0.65)" stroke-width="1.5"/>
  <line x1="722" y1="130" x2="722" y2="152" stroke="rgba(100,220,255,0.62)" stroke-width="1.5"/>
  <!-- GND symbol at center of return -->
  <line x1="592" y1="152" x2="592" y2="168" stroke="rgba(100,220,255,0.85)" stroke-width="1.8"/>
  <line x1="578" y1="168" x2="606" y2="168" stroke="rgba(100,220,255,0.88)" stroke-width="2.5"/>
  <line x1="582" y1="177" x2="602" y2="177" stroke="rgba(100,220,255,0.75)" stroke-width="1.8"/>
  <line x1="586" y1="186" x2="598" y2="186" stroke="rgba(100,220,255,0.60)" stroke-width="1.3"/>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 3 — TOP-RIGHT (x=812–1188, y=8–215): Inverting op-amp
       ══════════════════════════════════════════════════════════════════════ -->
  <!-- Rin -->
  <line x1="812" y1="108" x2="842" y2="108" stroke="rgba(220,170,30,0.88)" stroke-width="2.0"/>
  <polyline points="842,108 852,108 859,90 867,126 875,90 883,126 891,90 899,108 915,108"
            stroke="rgba(220,170,30,0.98)" stroke-width="2.5" fill="none"/>
  <text x="876" y="78" fill="rgba(220,170,30,0.90)" font-size="12" text-anchor="middle" font-weight="bold">Rᵢₙ</text>
  <!-- Route to -input via y-drop -->
  <line x1="915" y1="108" x2="942" y2="108" stroke="rgba(200,185,255,0.88)" stroke-width="1.8"/>
  <line x1="942" y1="108" x2="942" y2="123" stroke="rgba(200,185,255,0.82)" stroke-width="1.8"/>
  <line x1="942" y1="123" x2="962" y2="123" stroke="rgba(200,185,255,0.85)" stroke-width="1.8"/>
  <!-- +input tied to GND ref -->
  <line x1="942" y1="93" x2="962" y2="93" stroke="rgba(200,185,255,0.78)" stroke-width="1.8"/>
  <line x1="942" y1="93" x2="942" y2="108" stroke="rgba(200,185,255,0.72)" stroke-width="1.6"/>
  <!-- GND at +input -->
  <line x1="942" y1="93" x2="942" y2="72" stroke="rgba(100,220,255,0.80)" stroke-width="1.6"/>
  <line x1="928" y1="72" x2="956" y2="72" stroke="rgba(100,220,255,0.82)" stroke-width="2.2"/>
  <line x1="932" y1="63" x2="952" y2="63" stroke="rgba(100,220,255,0.68)" stroke-width="1.6"/>
  <line x1="936" y1="54" x2="948" y2="54" stroke="rgba(100,220,255,0.52)" stroke-width="1.2"/>
  <!-- Op-amp body — with glow for emphasis -->
  <polygon points="962,68 962,158 1058,108"
           stroke="rgba(210,190,255,1.0)" stroke-width="3.2" fill="rgba(90,62,237,0.22)"
           filter="url(#glow-opamp)"/>
  <text x="998" y="96" fill="rgba(200,185,255,0.82)" font-size="10">+</text>
  <text x="998" y="120" fill="rgba(200,185,255,0.82)" font-size="10">−</text>
  <text x="1004" y="114" fill="rgba(200,185,255,0.88)" font-size="12" font-weight="bold">A</text>
  <!-- Output wire + terminal -->
  <line x1="1058" y1="108" x2="1108" y2="108" stroke="rgba(200,185,255,0.90)" stroke-width="2.0"/>
  <circle cx="1112" cy="108" r="7" stroke="rgba(200,185,255,0.90)" stroke-width="2.2" fill="none"/>
  <!-- Feedback R_f over op-amp top -->
  <line x1="1108" y1="108" x2="1108" y2="42"  stroke="rgba(220,170,30,0.82)" stroke-width="1.8"/>
  <line x1="1108" y1="42"  x2="962"  y2="42"  stroke="rgba(220,170,30,0.82)" stroke-width="1.8"/>
  <line x1="962"  y1="42"  x2="962"  y2="123" stroke="rgba(220,170,30,0.82)" stroke-width="1.8"/>
  <!-- Rf zigzag on top feedback wire — boosted -->
  <polyline points="1018,42 1027,42 1033,24 1041,60 1049,24 1057,60 1065,24 1073,42 1088,42"
            stroke="rgba(220,170,30,1.0)" stroke-width="3.0" fill="none"/>
  <text x="1052" y="15" fill="rgba(220,170,30,0.96)" font-size="12" text-anchor="middle" font-weight="bold">Rf</text>
  <!-- Vin label -->
  <text x="812" y="97" fill="rgba(220,170,30,0.82)" font-size="12" font-weight="bold">Vᵢₙ</text>
  <!-- Extra output load R -->
  <line x1="1120" y1="108" x2="1142" y2="108" stroke="rgba(220,170,30,0.78)" stroke-width="1.8"/>
  <polyline points="1142,108 1149,108 1154,92 1160,124 1166,92 1172,124 1178,92 1184,108 1188,108"
            stroke="rgba(220,170,30,0.85)" stroke-width="2.0" fill="none"/>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 4 — LEFT COLUMN (x=12–188, y=230–685): Resistor voltage divider
       ══════════════════════════════════════════════════════════════════════ -->
  <!-- Vcc source at top -->
  <circle cx="90" cy="252" r="20" stroke="rgba(220,170,30,0.90)" stroke-width="2.2" fill="rgba(90,62,237,0.12)"/>
  <text x="90" y="248" fill="rgba(220,170,30,0.98)" font-size="12" text-anchor="middle" font-weight="bold">+</text>
  <text x="90" y="260" fill="rgba(220,170,30,0.98)" font-size="12" text-anchor="middle">−</text>
  <text x="90" y="225" fill="rgba(220,170,30,0.88)" font-size="12" text-anchor="middle" font-weight="bold">Vcc</text>
  <!-- Wire down from source -->
  <line x1="90" y1="272" x2="90" y2="293" stroke="rgba(220,170,30,0.88)" stroke-width="2.0"/>
  <!-- R1 vertical zigzag y=293–375 — boosted stroke -->
  <polyline points="90,293 90,305 72,315 108,327 72,339 108,351 72,363 90,373 90,385"
            stroke="rgba(220,170,30,1.0)" stroke-width="3.0" fill="none"/>
  <text x="118" y="342" fill="rgba(220,170,30,0.96)" font-size="12" font-weight="bold">R₁</text>
  <!-- Node A -->
  <circle cx="90" cy="385" r="5" fill="rgba(220,170,30,1.0)"/>
  <line x1="90" y1="385" x2="158" y2="385" stroke="rgba(200,185,255,0.85)" stroke-width="1.8"/>
  <circle cx="163" cy="385" r="6" stroke="rgba(200,185,255,0.90)" stroke-width="2.0" fill="none"/>
  <text x="175" y="382" fill="rgba(200,185,255,0.88)" font-size="11" font-weight="bold">V₁</text>
  <!-- R2 vertical y=385–467 — boosted stroke -->
  <polyline points="90,385 90,397 72,407 108,419 72,431 108,443 72,455 90,465 90,477"
            stroke="rgba(220,170,30,1.0)" stroke-width="3.0" fill="none"/>
  <text x="118" y="434" fill="rgba(220,170,30,0.95)" font-size="12" font-weight="bold">R₂</text>
  <!-- Node B -->
  <circle cx="90" cy="477" r="5" fill="rgba(220,170,30,0.98)"/>
  <line x1="90" y1="477" x2="158" y2="477" stroke="rgba(200,185,255,0.82)" stroke-width="1.8"/>
  <circle cx="163" cy="477" r="6" stroke="rgba(200,185,255,0.85)" stroke-width="2.0" fill="none"/>
  <text x="175" y="474" fill="rgba(200,185,255,0.85)" font-size="11" font-weight="bold">V₂</text>
  <!-- R3 vertical y=477–559 — boosted stroke -->
  <polyline points="90,477 90,489 72,499 108,511 72,523 108,535 72,547 90,557 90,569"
            stroke="rgba(220,170,30,1.0)" stroke-width="3.0" fill="none"/>
  <text x="118" y="526" fill="rgba(220,170,30,0.93)" font-size="12" font-weight="bold">R₃</text>
  <!-- Node C -->
  <circle cx="90" cy="569" r="5" fill="rgba(200,185,255,0.95)"/>
  <line x1="90" y1="569" x2="158" y2="569" stroke="rgba(200,185,255,0.78)" stroke-width="1.8"/>
  <circle cx="163" cy="569" r="6" stroke="rgba(200,185,255,0.82)" stroke-width="2.0" fill="none"/>
  <text x="175" y="566" fill="rgba(200,185,255,0.82)" font-size="11" font-weight="bold">V₃</text>
  <!-- GND symbol -->
  <line x1="90" y1="569" x2="90" y2="586" stroke="rgba(100,220,255,0.90)" stroke-width="2.0"/>
  <line x1="74" y1="586" x2="106" y2="586" stroke="rgba(100,220,255,0.92)" stroke-width="2.8"/>
  <line x1="79" y1="595" x2="101" y2="595" stroke="rgba(100,220,255,0.78)" stroke-width="2.0"/>
  <line x1="84" y1="604" x2="96"  y2="604" stroke="rgba(100,220,255,0.62)" stroke-width="1.5"/>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 5 — LEFT-MID UPPER (x=210–395, y=238–462): LC Resonant Tank
       Faded: sits in transition zone approaching center safe area.
       ══════════════════════════════════════════════════════════════════════ -->
  <g opacity="0.35">
  <!-- Tank top wire -->
  <line x1="218" y1="268" x2="388" y2="268" stroke="rgba(220,170,30,0.85)" stroke-width="2.0"/>
  <!-- Inductor L humps on top wire x=243–363 -->
  <line x1="218" y1="268" x2="243" y2="268" stroke="rgba(220,170,30,0.85)" stroke-width="2.0"/>
  <path d="M243,268 C248,252 260,252 265,268 C270,284 282,284 287,268 C292,252 304,252 309,268 C314,284 326,284 331,268 C336,252 343,268 343,268"
        stroke="rgba(220,170,30,1.0)" stroke-width="2.5" fill="none"/>
  <line x1="343" y1="268" x2="388" y2="268" stroke="rgba(220,170,30,0.85)" stroke-width="2.0"/>
  <text x="293" y="245" fill="rgba(220,170,30,0.92)" font-size="12" text-anchor="middle" font-weight="bold">L</text>
  <!-- Right vertical of tank -->
  <line x1="388" y1="268" x2="388" y2="375" stroke="rgba(100,220,255,0.88)" stroke-width="1.8"/>
  <!-- Capacitor C on right side (plates at y=355–375) -->
  <line x1="368" y1="355" x2="408" y2="355" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="368" y1="366" x2="408" y2="366" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="388" y1="366" x2="388" y2="452" stroke="rgba(100,220,255,0.80)" stroke-width="1.8"/>
  <text x="416" y="364" fill="rgba(100,220,255,0.92)" font-size="12" font-weight="bold">C</text>
  <!-- Bottom wire -->
  <line x1="218" y1="452" x2="388" y2="452" stroke="rgba(100,220,255,0.65)" stroke-width="1.5"/>
  <!-- Left vertical of tank -->
  <line x1="218" y1="268" x2="218" y2="452" stroke="rgba(220,170,30,0.80)" stroke-width="2.0"/>
  <!-- Node dots at corners -->
  <circle cx="218" cy="268" r="4" fill="rgba(220,170,30,0.95)"/>
  <circle cx="388" cy="268" r="4" fill="rgba(100,220,255,1.0)"/>
  <circle cx="218" cy="452" r="4" fill="rgba(100,220,255,0.80)"/>
  <circle cx="388" cy="452" r="4" fill="rgba(100,220,255,0.80)"/>
  </g>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 5B — LEFT-MID LOWER (x=210–395, y=478–685): Diode rectifier + RC
       Faded: transition zone toward center.
       ══════════════════════════════════════════════════════════════════════ -->
  <g opacity="0.32">
  <!-- Horizontal wire y=545 -->
  <line x1="218" y1="545" x2="390" y2="545" stroke="rgba(200,185,255,0.72)" stroke-width="1.8"/>
  <!-- Diode symbol (triangle + bar) -->
  <line x1="218" y1="545" x2="248" y2="545" stroke="rgba(200,185,255,0.88)" stroke-width="2.0"/>
  <polygon points="248,526 248,564 276,545" stroke="rgba(200,185,255,1.0)" stroke-width="2.5" fill="rgba(90,62,237,0.20)"/>
  <line x1="276" y1="526" x2="276" y2="564" stroke="rgba(200,185,255,1.0)" stroke-width="3.0"/>
  <line x1="276" y1="545" x2="302" y2="545" stroke="rgba(200,185,255,0.88)" stroke-width="2.0"/>
  <text x="262" y="512" fill="rgba(200,185,255,0.88)" font-size="12" text-anchor="middle" font-weight="bold">D₁</text>
  <!-- Node after diode -->
  <circle cx="302" cy="545" r="4" fill="rgba(220,170,30,0.95)"/>
  <!-- C shunt at node -->
  <line x1="302" y1="545" x2="302" y2="566" stroke="rgba(100,220,255,0.88)" stroke-width="1.8"/>
  <line x1="284" y1="566" x2="320" y2="566" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="284" y1="576" x2="320" y2="576" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="302" y1="576" x2="302" y2="600" stroke="rgba(100,220,255,0.75)" stroke-width="1.8"/>
  <text x="326" y="574" fill="rgba(100,220,255,0.88)" font-size="11" font-weight="bold">C</text>
  <!-- R after node -->
  <polyline points="302,545 311,545 317,528 325,562 333,528 341,562 349,528 357,545 370,545"
            stroke="rgba(220,170,30,0.92)" stroke-width="2.2" fill="none"/>
  <text x="334" y="512" fill="rgba(220,170,30,0.85)" font-size="12" text-anchor="middle" font-weight="bold">R</text>
  <!-- GND below C -->
  <line x1="286" y1="600" x2="318" y2="600" stroke="rgba(100,220,255,0.85)" stroke-width="2.5"/>
  <line x1="290" y1="609" x2="314" y2="609" stroke="rgba(100,220,255,0.72)" stroke-width="1.8"/>
  <line x1="294" y1="618" x2="310" y2="618" stroke="rgba(100,220,255,0.58)" stroke-width="1.3"/>
  </g>

  <!-- ══════════════════════════════════════════════════════════════════════
       CENTER VIGNETTE — radial dim behind text/button region
       Suppresses any residual grid/trace lines behind the content.
       ══════════════════════════════════════════════════════════════════════ -->
  <defs>
    <radialGradient id="center-dim" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"
                    gradientUnits="userSpaceOnUse" x1="600" y1="460">
      <stop offset="0%"   stop-color="rgba(6,0,24,0.28)"/>
      <stop offset="100%" stop-color="rgba(6,0,24,0.00)"/>
    </radialGradient>
  </defs>
  <ellipse cx="600" cy="460" rx="380" ry="260" fill="url(#center-dim)"/>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 6 — CENTER SAFE ZONE (x=320–880, y=238–685): Barely-visible texture
       Ultra-low opacity — keeps center clear for title/text/buttons.
       ══════════════════════════════════════════════════════════════════════ -->
  <g opacity="0.04">
    <!-- Three-node mesh: N1=(445,355), N2=(755,355), N3=(600,565) -->
    <circle cx="445" cy="355" r="7" fill="rgba(220,170,30,1)"/>
    <circle cx="755" cy="355" r="7" fill="rgba(220,170,30,1)"/>
    <circle cx="600" cy="565" r="7" fill="rgba(100,220,255,1)"/>
    <!-- N1–N2 top with R in middle -->
    <line x1="445" y1="355" x2="535" y2="355" stroke="rgba(220,170,30,1)" stroke-width="2.0"/>
    <polyline points="535,355 544,355 550,338 558,372 566,338 574,372 582,338 590,355 610,355"
              stroke="rgba(220,170,30,1)" stroke-width="2.5" fill="none"/>
    <line x1="610" y1="355" x2="755" y2="355" stroke="rgba(220,170,30,1)" stroke-width="2.0"/>
    <text x="562" y="326" fill="rgba(220,170,30,1)" font-size="14" text-anchor="middle" font-weight="bold">R₁₂</text>
    <!-- N1–N3 left diagonal -->
    <line x1="445" y1="355" x2="600" y2="565" stroke="rgba(200,185,255,1)" stroke-width="2.0"/>
    <text x="500" y="488" fill="rgba(200,185,255,1)" font-size="12" text-anchor="middle" font-weight="bold">R₁₃</text>
    <!-- N2–N3 right diagonal -->
    <line x1="755" y1="355" x2="600" y2="565" stroke="rgba(200,185,255,1)" stroke-width="2.0"/>
    <text x="706" y="488" fill="rgba(200,185,255,1)" font-size="12" text-anchor="middle" font-weight="bold">R₂₃</text>
    <!-- Voltage source at N1 -->
    <line x1="370" y1="355" x2="445" y2="355" stroke="rgba(220,170,30,1)" stroke-width="1.8"/>
    <circle cx="345" cy="355" r="22" stroke="rgba(220,170,30,1)" stroke-width="2.0" fill="rgba(90,62,237,0.3)"/>
    <text x="345" y="351" fill="rgba(220,170,30,1)" font-size="13" text-anchor="middle">+</text>
    <text x="345" y="363" fill="rgba(220,170,30,1)" font-size="13" text-anchor="middle">−</text>
    <!-- KVL loop circles (dashed) -->
    <circle cx="522" cy="455" r="62" stroke="rgba(200,185,255,1)" stroke-width="1.5" fill="none" stroke-dasharray="9,5"/>
    <circle cx="678" cy="455" r="62" stroke="rgba(200,185,255,1)" stroke-width="1.5" fill="none" stroke-dasharray="9,5"/>
    <text x="522" y="460" fill="rgba(200,185,255,1)" font-size="15" text-anchor="middle" font-weight="bold">i₁</text>
    <text x="678" y="460" fill="rgba(200,185,255,1)" font-size="15" text-anchor="middle" font-weight="bold">i₂</text>
    <!-- GND below N3 -->
    <line x1="600" y1="565" x2="600" y2="585" stroke="rgba(100,220,255,1)" stroke-width="1.8"/>
    <line x1="586" y1="585" x2="614" y2="585" stroke="rgba(100,220,255,1)" stroke-width="2.5"/>
    <line x1="591" y1="594" x2="609" y2="594" stroke="rgba(100,220,255,1)" stroke-width="1.8"/>
    <line x1="596" y1="603" x2="604" y2="603" stroke="rgba(100,220,255,1)" stroke-width="1.3"/>
  </g>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 7 — RIGHT-MID UPPER (x=815–995, y=238–462): RC Ladder chain
       Faded: sits in transition zone approaching center safe area.
       ══════════════════════════════════════════════════════════════════════ -->
  <g opacity="0.35">
  <!-- Horizontal bus y=315 -->
  <line x1="815" y1="315" x2="992" y2="315" stroke="rgba(220,170,30,0.80)" stroke-width="1.8"/>
  <!-- R1 -->
  <line x1="815" y1="315" x2="840" y2="315" stroke="rgba(220,170,30,0.85)" stroke-width="1.8"/>
  <polyline points="840,315 849,315 855,298 863,332 871,298 879,332 887,298 895,315 908,315"
            stroke="rgba(220,170,30,0.98)" stroke-width="2.5" fill="none"/>
  <text x="867" y="284" fill="rgba(220,170,30,0.88)" font-size="12" text-anchor="middle" font-weight="bold">R₁</text>
  <!-- Node1 + C1 shunt at x=925 -->
  <line x1="908" y1="315" x2="925" y2="315" stroke="rgba(220,170,30,0.85)" stroke-width="1.8"/>
  <circle cx="925" cy="315" r="5" fill="rgba(220,170,30,0.98)"/>
  <line x1="925" y1="315" x2="925" y2="338" stroke="rgba(100,220,255,0.90)" stroke-width="1.8"/>
  <line x1="907" y1="338" x2="943" y2="338" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="907" y1="348" x2="943" y2="348" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="925" y1="348" x2="925" y2="372" stroke="rgba(100,220,255,0.72)" stroke-width="1.8"/>
  <text x="950" y="346" fill="rgba(100,220,255,0.88)" font-size="12" font-weight="bold">C₁</text>
  <!-- R2 -->
  <line x1="925" y1="315" x2="948" y2="315" stroke="rgba(220,170,30,0.82)" stroke-width="1.8"/>
  <polyline points="948,315 957,315 963,298 971,332 979,298 987,332 992,298 992,315 992,315"
            stroke="rgba(220,170,30,0.90)" stroke-width="2.2" fill="none"/>
  <text x="970" y="284" fill="rgba(220,170,30,0.85)" font-size="12" text-anchor="middle" font-weight="bold">R₂</text>
  <!-- GND at bottom of C1 shunt -->
  <line x1="907" y1="372" x2="943" y2="372" stroke="rgba(100,220,255,0.85)" stroke-width="2.5"/>
  <line x1="911" y1="381" x2="939" y2="381" stroke="rgba(100,220,255,0.72)" stroke-width="1.8"/>
  <line x1="915" y1="390" x2="935" y2="390" stroke="rgba(100,220,255,0.58)" stroke-width="1.3"/>
  </g>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 7B — RIGHT-MID LOWER (x=815–995, y=480–685): Op-amp differentiator
       Faded: transition zone toward center.
       ══════════════════════════════════════════════════════════════════════ -->
  <g opacity="0.32">
  <!-- C series input -->
  <line x1="818" y1="565" x2="843" y2="565" stroke="rgba(100,220,255,0.80)" stroke-width="1.8"/>
  <line x1="843" y1="547" x2="843" y2="583" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="854" y1="547" x2="854" y2="583" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="854" y1="565" x2="876" y2="565" stroke="rgba(100,220,255,0.80)" stroke-width="1.8"/>
  <text x="848" y="533" fill="rgba(100,220,255,0.85)" font-size="12" text-anchor="middle" font-weight="bold">C</text>
  <!-- R -->
  <polyline points="876,565 885,565 891,548 899,582 907,548 915,582 923,548 931,565 944,565"
            stroke="rgba(220,170,30,0.92)" stroke-width="2.2" fill="none"/>
  <text x="908" y="533" fill="rgba(220,170,30,0.85)" font-size="12" text-anchor="middle" font-weight="bold">R</text>
  <!-- Input to op-amp -->
  <line x1="944" y1="565" x2="962" y2="565" stroke="rgba(200,185,255,0.85)" stroke-width="1.8"/>
  <line x1="962" y1="565" x2="962" y2="553" stroke="rgba(200,185,255,0.82)" stroke-width="1.8"/>
  <line x1="962" y1="553" x2="976" y2="553" stroke="rgba(200,185,255,0.85)" stroke-width="1.8"/>
  <line x1="962" y1="577" x2="976" y2="577" stroke="rgba(200,185,255,0.75)" stroke-width="1.8"/>
  <!-- Small op-amp triangle -->
  <polygon points="976,535 976,595 1024,565" stroke="rgba(200,185,255,1.0)" stroke-width="2.5" fill="rgba(90,62,237,0.12)"/>
  <line x1="1024" y1="565" x2="992" y2="565" stroke="rgba(200,185,255,0.85)" stroke-width="1.8"/>
  <!-- Feedback dashed arc -->
  <path d="M990,565 C1005,518 862,508 858,546"
        stroke="rgba(220,170,30,0.80)" stroke-width="1.8" fill="none" stroke-dasharray="5,3"/>
  </g>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 8 — RIGHT COLUMN (x=1008–1188, y=238–685): LC Filter chain
       ══════════════════════════════════════════════════════════════════════ -->
  <!-- Input terminal at top -->
  <circle cx="1098" cy="248" r="7" stroke="rgba(200,185,255,0.90)" stroke-width="2.2" fill="none"/>
  <line x1="1098" y1="255" x2="1098" y2="275" stroke="rgba(220,170,30,0.88)" stroke-width="2.0"/>
  <!-- L1 coil vertical (4 humps) y=275–380 — boosted -->
  <path d="M1098,275 C1079,285 1079,301 1098,311 C1117,321 1117,337 1098,347 C1079,357 1079,373 1098,383"
        stroke="rgba(220,170,30,1.0)" stroke-width="3.2" fill="none"/>
  <line x1="1098" y1="383" x2="1098" y2="402" stroke="rgba(220,170,30,0.88)" stroke-width="2.0"/>
  <text x="1130" y="332" fill="rgba(220,170,30,0.90)" font-size="12" font-weight="bold">L₁</text>
  <!-- Node + C1 shunt at y=402 -->
  <circle cx="1098" cy="402" r="5" fill="rgba(200,185,255,1.0)"/>
  <line x1="1098" y1="402" x2="1098" y2="422" stroke="rgba(100,220,255,0.92)" stroke-width="1.8"/>
  <line x1="1118" y1="422" x2="1078" y2="422" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="1118" y1="432" x2="1078" y2="432" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="1098" y1="432" x2="1098" y2="452" stroke="rgba(100,220,255,0.78)" stroke-width="1.8"/>
  <text x="1130" y="430" fill="rgba(100,220,255,0.92)" font-size="12" font-weight="bold">C₁</text>
  <!-- Output tap at node -->
  <line x1="1098" y1="402" x2="1048" y2="402" stroke="rgba(200,185,255,0.82)" stroke-width="1.8"/>
  <circle cx="1043" cy="402" r="6" stroke="rgba(200,185,255,0.88)" stroke-width="2.0" fill="none"/>
  <!-- L2 coil y=452–548 -->
  <line x1="1098" y1="452" x2="1098" y2="468" stroke="rgba(220,170,30,0.82)" stroke-width="1.8"/>
  <path d="M1098,468 C1079,478 1079,494 1098,504 C1117,514 1117,530 1098,540"
        stroke="rgba(220,170,30,0.98)" stroke-width="3.0" fill="none"/>
  <line x1="1098" y1="540" x2="1098" y2="558" stroke="rgba(220,170,30,0.82)" stroke-width="1.8"/>
  <text x="1130" y="510" fill="rgba(220,170,30,0.85)" font-size="12" font-weight="bold">L₂</text>
  <!-- Node + C2 shunt at y=558 -->
  <circle cx="1098" cy="558" r="5" fill="rgba(200,185,255,0.95)"/>
  <line x1="1098" y1="558" x2="1098" y2="578" stroke="rgba(100,220,255,0.88)" stroke-width="1.8"/>
  <line x1="1118" y1="578" x2="1078" y2="578" stroke="rgba(100,220,255,0.98)" stroke-width="3.0"/>
  <line x1="1118" y1="588" x2="1078" y2="588" stroke="rgba(100,220,255,0.98)" stroke-width="3.0"/>
  <line x1="1098" y1="588" x2="1098" y2="608" stroke="rgba(100,220,255,0.72)" stroke-width="1.8"/>
  <text x="1130" y="586" fill="rgba(100,220,255,0.85)" font-size="12" font-weight="bold">C₂</text>
  <!-- GND at bottom -->
  <line x1="1098" y1="608" x2="1098" y2="628" stroke="rgba(100,220,255,0.90)" stroke-width="2.0"/>
  <line x1="1082" y1="628" x2="1114" y2="628" stroke="rgba(100,220,255,0.92)" stroke-width="2.8"/>
  <line x1="1087" y1="637" x2="1109" y2="637" stroke="rgba(100,220,255,0.78)" stroke-width="2.0"/>
  <line x1="1092" y1="646" x2="1104" y2="646" stroke="rgba(100,220,255,0.62)" stroke-width="1.5"/>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 9 — BOTTOM-LEFT (x=12–362, y=718–888): Wheatstone Bridge
       ══════════════════════════════════════════════════════════════════════ -->
  <!-- Diamond nodes -->
  <circle cx="188" cy="722" r="5" fill="rgba(220,170,30,1.0)"/>
  <circle cx="72"  cy="800" r="5" fill="rgba(200,185,255,0.98)"/>
  <circle cx="304" cy="800" r="5" fill="rgba(200,185,255,0.98)"/>
  <circle cx="188" cy="878" r="5" fill="rgba(100,220,255,0.95)"/>
  <!-- Vin label top -->
  <line x1="188" y1="710" x2="188" y2="722" stroke="rgba(220,170,30,0.90)" stroke-width="2.2"/>
  <text x="188" y="703" fill="rgba(220,170,30,0.92)" font-size="12" text-anchor="middle" font-weight="bold">Vᵢₙ</text>
  <!-- Arms — boosted contrast -->
  <line x1="188" y1="722" x2="72"  y2="800" stroke="rgba(220,170,30,1.0)" stroke-width="2.8"/>
  <line x1="188" y1="722" x2="304" y2="800" stroke="rgba(220,170,30,1.0)" stroke-width="2.8"/>
  <line x1="72"  y1="800" x2="188" y2="878" stroke="rgba(220,170,30,0.95)" stroke-width="2.8"/>
  <line x1="304" y1="800" x2="188" y2="878" stroke="rgba(220,170,30,0.95)" stroke-width="2.8"/>
  <!-- Galvanometer (dashed) with G circle -->
  <line x1="72" y1="800" x2="154" y2="800" stroke="rgba(100,220,255,0.85)" stroke-width="2.0" stroke-dasharray="7,4"/>
  <line x1="222" y1="800" x2="304" y2="800" stroke="rgba(100,220,255,0.85)" stroke-width="2.0" stroke-dasharray="7,4"/>
  <circle cx="188" cy="800" r="13" stroke="rgba(100,220,255,0.92)" stroke-width="2.0" fill="rgba(90,62,237,0.15)"/>
  <text x="188" y="805" fill="rgba(100,220,255,0.92)" font-size="11" text-anchor="middle" font-weight="bold">G</text>
  <!-- R labels -->
  <text x="115" y="754" fill="rgba(220,170,30,0.88)" font-size="13" font-weight="bold">R</text>
  <text x="248" y="754" fill="rgba(220,170,30,0.88)" font-size="13" font-weight="bold">R</text>
  <text x="115" y="858" fill="rgba(220,170,30,0.82)" font-size="13" font-weight="bold">R</text>
  <text x="248" y="858" fill="rgba(220,170,30,0.82)" font-size="13" font-weight="bold">Rₓ</text>
  <!-- GND at bottom -->
  <line x1="188" y1="878" x2="188" y2="893" stroke="rgba(100,220,255,0.90)" stroke-width="2.0"/>
  <line x1="173" y1="893" x2="203" y2="893" stroke="rgba(100,220,255,0.92)" stroke-width="2.8"/>
  <line x1="178" y1="902" x2="198" y2="902" stroke="rgba(100,220,255,0.78)" stroke-width="2.0"/>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 10 — BOTTOM-CENTER (x=382–818, y=718–892): RLC series circuit
       ══════════════════════════════════════════════════════════════════════ -->
  <!-- Horizontal signal rail y=762, GND rail y=862 -->
  <line x1="382" y1="762" x2="818" y2="762" stroke="rgba(220,170,30,0.68)" stroke-width="1.5"/>
  <line x1="382" y1="862" x2="818" y2="862" stroke="rgba(100,220,255,0.52)" stroke-width="1.3"/>
  <!-- Left vertical return -->
  <line x1="382" y1="762" x2="382" y2="862" stroke="rgba(220,170,30,0.78)" stroke-width="1.8"/>
  <!-- Vs circle -->
  <circle cx="382" cy="812" r="22" stroke="rgba(220,170,30,0.95)" stroke-width="2.5" fill="rgba(90,62,237,0.15)"/>
  <text x="382" y="808" fill="rgba(220,170,30,1.0)" font-size="14" text-anchor="middle" font-weight="bold">+</text>
  <text x="382" y="821" fill="rgba(220,170,30,1.0)" font-size="14" text-anchor="middle">−</text>
  <text x="382" y="733" fill="rgba(220,170,30,0.90)" font-size="12" text-anchor="middle" font-weight="bold">Vₛ</text>
  <!-- R zigzag -->
  <line x1="404" y1="762" x2="424" y2="762" stroke="rgba(220,170,30,0.88)" stroke-width="2.0"/>
  <polyline points="424,762 433,762 439,745 447,779 455,745 463,779 471,745 479,762 492,762"
            stroke="rgba(220,170,30,1.0)" stroke-width="2.5" fill="none"/>
  <text x="456" y="733" fill="rgba(220,170,30,0.90)" font-size="12" text-anchor="middle" font-weight="bold">R</text>
  <line x1="492" y1="762" x2="512" y2="762" stroke="rgba(220,170,30,0.88)" stroke-width="2.0"/>
  <!-- Node + C shunt -->
  <circle cx="512" cy="762" r="5" fill="rgba(220,170,30,1.0)"/>
  <line x1="512" y1="762" x2="512" y2="743" stroke="rgba(100,220,255,0.90)" stroke-width="1.8"/>
  <line x1="493" y1="743" x2="531" y2="743" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="493" y1="733" x2="531" y2="733" stroke="rgba(100,220,255,1.0)" stroke-width="3.0"/>
  <line x1="512" y1="733" x2="512" y2="718" stroke="rgba(100,220,255,0.80)" stroke-width="1.8"/>
  <text x="538" y="740" fill="rgba(100,220,255,0.90)" font-size="12" font-weight="bold">C</text>
  <!-- L coil horizontal — boosted -->
  <line x1="512" y1="762" x2="536" y2="762" stroke="rgba(220,170,30,0.95)" stroke-width="2.2"/>
  <path d="M536,762 C542,745 554,745 560,762 C566,779 578,779 584,762 C590,745 602,745 608,762 C614,779 626,779 632,762 C638,745 646,762 646,762"
        stroke="rgba(220,170,30,1.0)" stroke-width="3.2" fill="none"/>
  <line x1="646" y1="762" x2="668" y2="762" stroke="rgba(220,170,30,0.90)" stroke-width="2.0"/>
  <text x="591" y="733" fill="rgba(220,170,30,0.90)" font-size="12" text-anchor="middle" font-weight="bold">L</text>
  <!-- Vout terminal -->
  <circle cx="668" cy="762" r="5" fill="rgba(200,185,255,1.0)"/>
  <line x1="668" y1="762" x2="700" y2="762" stroke="rgba(200,185,255,0.88)" stroke-width="1.8"/>
  <circle cx="706" cy="762" r="7" stroke="rgba(200,185,255,0.92)" stroke-width="2.2" fill="none"/>
  <text x="720" y="759" fill="rgba(200,185,255,0.85)" font-size="12" font-weight="bold">Vₒᵤₜ</text>
  <line x1="668" y1="762" x2="668" y2="862" stroke="rgba(100,220,255,0.68)" stroke-width="1.5"/>
  <!-- Center GND symbol -->
  <line x1="528" y1="862" x2="528" y2="877" stroke="rgba(100,220,255,0.88)" stroke-width="1.8"/>
  <line x1="515" y1="877" x2="541" y2="877" stroke="rgba(100,220,255,0.90)" stroke-width="2.5"/>
  <line x1="519" y1="886" x2="537" y2="886" stroke="rgba(100,220,255,0.75)" stroke-width="1.8"/>
  <line x1="523" y1="895" x2="533" y2="895" stroke="rgba(100,220,255,0.60)" stroke-width="1.3"/>

  <!-- ══════════════════════════════════════════════════════════════════════
       ZONE 11 — BOTTOM-RIGHT (x=836–1185, y=718–892): Op-amp integrator
       ══════════════════════════════════════════════════════════════════════ -->
  <!-- Rin -->
  <line x1="836" y1="782" x2="864" y2="782" stroke="rgba(220,170,30,0.88)" stroke-width="2.0"/>
  <polyline points="864,782 873,782 879,765 887,799 895,765 903,799 911,765 919,782 933,782"
            stroke="rgba(220,170,30,1.0)" stroke-width="2.5" fill="none"/>
  <text x="897" y="754" fill="rgba(220,170,30,0.90)" font-size="12" text-anchor="middle" font-weight="bold">Rᵢ</text>
  <!-- Route to -input -->
  <line x1="933" y1="782" x2="958" y2="782" stroke="rgba(200,185,255,0.88)" stroke-width="1.8"/>
  <line x1="958" y1="782" x2="958" y2="797" stroke="rgba(200,185,255,0.82)" stroke-width="1.8"/>
  <line x1="958" y1="797" x2="976" y2="797" stroke="rgba(200,185,255,0.85)" stroke-width="1.8"/>
  <!-- +input to GND -->
  <line x1="958" y1="767" x2="976" y2="767" stroke="rgba(200,185,255,0.78)" stroke-width="1.8"/>
  <line x1="958" y1="767" x2="958" y2="782" stroke="rgba(200,185,255,0.72)" stroke-width="1.6"/>
  <!-- GND at +input -->
  <line x1="958" y1="767" x2="958" y2="748" stroke="rgba(100,220,255,0.78)" stroke-width="1.6"/>
  <line x1="945" y1="748" x2="971" y2="748" stroke="rgba(100,220,255,0.82)" stroke-width="2.2"/>
  <line x1="949" y1="739" x2="967" y2="739" stroke="rgba(100,220,255,0.65)" stroke-width="1.6"/>
  <line x1="953" y1="730" x2="963" y2="730" stroke="rgba(100,220,255,0.50)" stroke-width="1.2"/>
  <!-- Op-amp body: (976,748)→(976,822)→(1056,782) -->
  <polygon points="976,748 976,822 1060,782"
           stroke="rgba(200,185,255,1.0)" stroke-width="2.8" fill="rgba(90,62,237,0.15)"/>
  <text x="1010" y="787" fill="rgba(200,185,255,0.88)" font-size="12" font-weight="bold">A</text>
  <!-- Output -->
  <line x1="1060" y1="782" x2="1108" y2="782" stroke="rgba(200,185,255,0.90)" stroke-width="2.0"/>
  <circle cx="1113" cy="782" r="7" stroke="rgba(200,185,255,0.90)" stroke-width="2.2" fill="none"/>
  <!-- Feedback Cf (dashed arc) -->
  <path d="M1105,782 C1132,726 964,714 962,760"
        stroke="rgba(100,220,255,0.90)" stroke-width="2.0" fill="none" stroke-dasharray="6,3"/>
  <text x="1030" y="718" fill="rgba(100,220,255,0.88)" font-size="12" text-anchor="middle" font-weight="bold">Cf</text>
  <!-- Mini step-response mini-plot -->
  <line x1="1130" y1="848" x2="1185" y2="848" stroke="rgba(100,220,255,0.58)" stroke-width="1.3"/>
  <line x1="1130" y1="800" x2="1130" y2="848" stroke="rgba(100,220,255,0.58)" stroke-width="1.3"/>
  <path d="M1130,848 C1142,848 1150,828 1160,816 C1170,804 1177,796 1185,793"
        stroke="rgba(100,220,255,0.90)" stroke-width="2.0" fill="none"/>

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
