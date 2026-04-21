---
title: Chapter 12 Content — Filters and Resonance
description: Teaching content covering RC, RL, and RLC filter design, passive vs. active filters, audio tone control, decibels, headroom, dynamic range, and the microphone-to-speaker signal chain
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 12 — Filters and Resonance

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

Filters are circuits designed to selectively pass or block signals based on their frequency, and they are found in virtually every electronic system from audio equalizers to radio receivers. This chapter covers the design of low-pass, high-pass, band-pass, and band-stop filters using RC, RL, and RLC components, and introduces resonance as the phenomenon that enables highly selective filtering.

**Key Takeaways**

1. First-order RC and RL filters provide a gentle 20 dB/decade roll-off, and their cutoff frequency is set by the time constant: f_c = 1/(2πτ).
2. At resonance, a series or parallel RLC circuit exhibits a peak (or notch) in its frequency response at ω₀ = 1/√(LC), enabling narrow-band filtering.
3. The quality factor Q quantifies the sharpness of a resonant response — higher Q means a narrower, more selective filter with lower losses.

</details>

## 12.1 Introduction

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Every time you turn up the bass on a speaker system, tune a radio to your favourite station, or record a voice while suppressing background hiss, a <strong style="color: #333;">filter circuit</strong> is doing the work. Filters are selective frequency processors — they pass some frequencies largely unchanged while attenuating others. Chapter 11 showed you how to describe and measure this behaviour using transfer functions and Bode plots. Now it is time to design circuits that actually produce those responses.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
This chapter proceeds from simple to complex. First-order RC and RL circuits provide gentle first-order roll-off. Adding a second reactive element introduces resonance and the possibility of very selective band-pass or band-reject responses. Replacing passive elements with op-amp–based active circuits removes the need for inductors at audio frequencies and allows gain greater than unity. Throughout, audio engineering applications anchor the theory in real signal chains: microphone preamplifiers, bass and treble controls, power amplifiers, and speaker crossover networks.
</p>

---

## 12.2 First-Order Filters

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A <strong style="color: #333;">first-order filter</strong> contains exactly one reactive element — one capacitor or one inductor — paired with one or more resistors. The single pole produces a -20 dB/decade roll-off in the stopband and a 90° maximum phase shift. First-order filters are the fundamental building blocks from which all higher-order designs are composed.
</p>

### 12.2.1 RC Low-Pass Filter

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
The <strong style="color: #333;">RC low-pass filter</strong> consists of a series resistor R with the output taken across the capacitor C connected to ground. At low frequencies the capacitor's impedance \(X_C = 1/(\omega C)\) is large, so most of the source voltage appears across it. At high frequencies \(X_C\) is small and the voltage divides mostly across R, attenuating the output.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.6rem;"><strong>Transfer function (voltage divider with \(Z_C = 1/(j\omega C)\)):</strong></p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[H(j\omega) = \frac{Z_C}{R + Z_C} = \frac{1}{1 + j\omega RC}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.6rem;">The <strong>cutoff frequency</strong> is the frequency at which \(|H| = 1/\sqrt{2} \approx 0.707\) (-3 dB):</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[f_c = \frac{1}{2\pi RC}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;"><strong>Design equation:</strong> Given a target \(f_c\), choose C and solve for R:</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[R = \frac{1}{2\pi f_c C}\]
</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;">
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 10px;">Worked Example — RC Low-Pass Filter for \(f_c = 1\,\text{kHz}\)</p>
<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;"><strong>Given:</strong> \(f_c = 1{,}000\) Hz, \(C = 10\) nF</p>
<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;"><strong>Calculate R:</strong></p>

\[R = \frac{1}{2\pi \times 1{,}000 \times 10 \times 10^{-9}} = \frac{1}{62.83 \times 10^{-6}} = 15{,}915\ \Omega\]

<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;"><strong>Select standard value:</strong> E24 series gives \(R = 15\) kΩ or \(R = 16\) kΩ. Choosing \(R = 15\) kΩ:</p>

\[f_c = \frac{1}{2\pi \times 15{,}000 \times 10 \times 10^{-9}} = \frac{1}{942.5 \times 10^{-6}} \approx 1{,}061\ \text{Hz}\]

<p style="color: #555; line-height: 1.75; margin-bottom: 0;"><strong>Result:</strong> The actual cutoff is 1.06 kHz — within 6% of the 1 kHz target, acceptable for most applications.</p>
</div>

### 12.2.2 RC High-Pass Filter

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
The <strong style="color: #333;">RC high-pass filter</strong> places the capacitor in series and takes the output across the resistor. At low frequencies C blocks the signal; at high frequencies C passes it and the output appears fully across R.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[H(j\omega) = \frac{R}{R + 1/(j\omega C)} = \frac{j\omega RC}{1 + j\omega RC}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.6rem;">The cutoff frequency is identical to the low-pass version with the same R and C:</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[f_c = \frac{1}{2\pi RC}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
The phase of the RC high-pass filter runs from +90° at very low frequencies down to 0° at high frequencies, passing through +45° at \(f_c\). Common applications include DC-blocking coupling capacitors and subsonic (rumble) filters.
</p>

| Quantity | RC Low-Pass | RC High-Pass |
|----------|-------------|--------------|
| Output taken across | C | R |
| Transfer function | \(1/(1+j\omega RC)\) | \(j\omega RC/(1+j\omega RC)\) |
| Cutoff frequency | \(1/(2\pi RC)\) | \(1/(2\pi RC)\) |
| Phase at \(f_c\) | −45° | +45° |
| Roll-off direction | Above \(f_c\): −20 dB/dec | Below \(f_c\): +20 dB/dec |

### 12.2.3 RL Low-Pass Filter

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
The <strong style="color: #333;">RL low-pass filter</strong> places a series inductor L with the output taken across the resistor R (to ground). At low frequencies the inductor's impedance \(X_L = \omega L\) is small and nearly all the voltage appears across R. At high frequencies \(X_L\) is large and the output is attenuated.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[H(j\omega) = \frac{R}{R + j\omega L} = \frac{1}{1 + j\omega L/R}\]
</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[f_c = \frac{R}{2\pi L}\]
</div>

### 12.2.4 RL High-Pass Filter

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
The <strong style="color: #333;">RL high-pass filter</strong> takes the output across the inductor L. At high frequencies the inductor's impedance is large and most of the voltage drops across it; at low frequencies it is small and the output is near zero.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[H(j\omega) = \frac{j\omega L}{R + j\omega L} = \frac{j\omega L/R}{1 + j\omega L/R}\]
\[f_c = \frac{R}{2\pi L}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
At audio frequencies, inductors needed for low cutoff frequencies would need to be very large (many henries), making RC filters strongly preferred. RL filters are common in power-electronics applications where high current-handling inductors are already present.
</p>

| Filter | Cutoff Formula | Typical Use |
|--------|---------------|-------------|
| RC Low-Pass | \(1/(2\pi RC)\) | Anti-aliasing, smoothing |
| RC High-Pass | \(1/(2\pi RC)\) | DC blocking, rumble removal |
| RL Low-Pass | \(R/(2\pi L)\) | Power supply chokes |
| RL High-Pass | \(R/(2\pi L)\) | Switching power circuits |

#### Diagram: Filter Frequency Response Explorer

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/filter-frequency-response/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

#### Diagram: First-Order LP/HP Filter

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/first-order-filters/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 12.3 Second-Order Filters and Resonance

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A <strong style="color: #333;">second-order filter</strong> contains two reactive elements and produces -40 dB/decade roll-off. When those elements are an inductor L and a capacitor C in the same circuit, they can exchange energy back and forth at the <strong>resonant frequency</strong>, producing a pronounced peak or sharp null in the frequency response. This resonance is what makes second-order circuits far more selective than their first-order counterparts.
</p>

### 12.3.1 RLC Band-Pass Filter

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
In a series RLC circuit with the output taken across R, the impedances of L and C cancel at the <strong>resonant frequency</strong> \(f_0\), leaving only R in the circuit. All other frequencies see net reactive impedance and are attenuated. The result is a band-pass response centred on \(f_0\).
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.6rem;"><strong>Transfer function:</strong></p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[H(j\omega) = \frac{R}{R + j\omega L + 1/(j\omega C)} = \frac{j\omega R/L}{(j\omega)^2 + (R/L)(j\omega) + 1/(LC)}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.6rem;"><strong>Resonant frequency</strong> (where inductive and capacitive impedances cancel, \(\omega_0 L = 1/(\omega_0 C)\)):</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[f_0 = \frac{1}{2\pi\sqrt{LC}}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.6rem;"><strong>Quality factor Q</strong> — the ratio of stored energy to dissipated energy per cycle; equivalently, the ratio \(f_0/BW\):</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[Q = \frac{1}{R}\sqrt{\frac{L}{C}} = \frac{f_0}{BW}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.6rem;"><strong>Bandwidth</strong> (the frequency range between the two -3 dB points):</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[BW = \frac{R}{2\pi L} = \frac{f_0}{Q}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
High Q means narrow bandwidth and sharp selectivity. Low Q means wide bandwidth. The three quantities \(f_0\), Q, and BW satisfy the constraint \(BW = f_0/Q\), so specifying any two determines the third.
</p>

| Q | Behaviour | Example application |
|---|-----------|---------------------|
| < 0.5 | Overdamped — no peak | Gentle roll-off LP/HP |
| 0.707 | Butterworth — maximally flat passband | General-purpose audio |
| 1–5 | Moderately underdamped | Graphic equalizer band |
| 10–100 | High selectivity | AM radio IF filter |
| > 100 | Very sharp resonance | Crystal oscillator |

### 12.3.2 RLC Band-Pass Design Procedure

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
Given specifications \(f_0\) and Q (or equivalently \(f_0\) and BW), the design proceeds as follows:
</p>

<ol style="color: #555; line-height: 2; font-size: 1.02rem; padding-left: 1.5rem;">
<li>Calculate the LC product: \(\displaystyle LC = \frac{1}{(2\pi f_0)^2}\)</li>
<li>Choose a practical value for L (or C) based on available components.</li>
<li>Calculate C from the LC product: \(\displaystyle C = \frac{1}{(2\pi f_0)^2 L}\)</li>
<li>Calculate R: \(\displaystyle R = \frac{2\pi f_0 L}{Q} = \frac{\omega_0 L}{Q}\)</li>
<li>Verify: \(\displaystyle BW = \frac{R}{2\pi L}\) should equal \(f_0/Q\).</li>
</ol>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;">
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 10px;">Worked Example — Band-Pass Filter at 10 kHz with Q = 10</p>

<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;"><strong>Specifications:</strong> \(f_0 = 10{,}000\) Hz, \(Q = 10\)</p>

<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;"><strong>Step 1 — LC product:</strong></p>

\[LC = \frac{1}{(2\pi \times 10{,}000)^2} = \frac{1}{3.948 \times 10^9} = 2.532 \times 10^{-10}\ \text{H·F}\]

<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;"><strong>Step 2 — Choose L = 10 mH</strong></p>

<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;"><strong>Step 3 — Calculate C:</strong></p>

\[C = \frac{2.532 \times 10^{-10}}{10 \times 10^{-3}} = 25.32\ \text{nF}\quad(\text{use standard } 27\ \text{nF})\]

<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;"><strong>Step 4 — Calculate R:</strong></p>

\[R = \frac{2\pi \times 10{,}000 \times 10 \times 10^{-3}}{10} = \frac{628.3}{10} = 62.8\ \Omega\quad(\text{use } 62\ \Omega)\]

<p style="color: #555; line-height: 1.75; margin-bottom: 0;"><strong>Result:</strong> \(BW = R/(2\pi L) = 62.8/(2\pi \times 0.01) = 1{,}000\) Hz. The filter passes 9.5 kHz to 10.5 kHz.</p>
</div>

#### Diagram: Resonance Comparison: Series vs Parallel

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/resonance-comparison/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

#### Diagram: Second-Order Filter Responses

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/second-order-filter/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

#### Diagram: Bandwidth and Selectivity Explorer

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/bandwidth-selectivity/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 12.4 Passive vs. Active Filters

### 12.4.1 Passive Filters

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
<strong style="color: #333;">Passive filters</strong> are built exclusively from resistors, capacitors, and inductors. They require no power supply and can handle high signal levels without distortion. Their maximum voltage gain is unity (0 dB) — they can only attenuate. Loading is a practical concern: connecting a passive filter to a low-impedance load shifts the cutoff frequency unless the load is accounted for in the design.
</p>

**Advantages:** No power supply, high reliability, no active-device noise, suitable for RF and high-power signals.

**Disadvantages:** Gain ≤ 1, loading changes response, large inductors needed at audio frequencies, limited Q in some topologies.

### 12.4.2 Active Filters

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
<strong style="color: #333;">Active filters</strong> combine RC networks with an amplifying device — usually an operational amplifier. The op-amp's high input impedance and low output impedance decouple stages from each other, eliminating loading. Inductors are entirely absent; their resonance-shaping role is replicated by the op-amp's feedback network.
</p>

**Advantages:** Gain > 1 possible, no inductors, no inter-stage loading, high Q achievable with simple RC components, easy to adjust.

**Disadvantages:** Power supply required, gain-bandwidth product of op-amp limits high-frequency operation, adds noise and potential distortion.

| Property | Passive | Active |
|----------|---------|--------|
| Gain | ≤ 1 | Any value |
| Inductors required | Often | No |
| Power supply | None | Required |
| Inter-stage loading | Problem | Eliminated |
| High Q | Difficult | Easy |
| Upper frequency limit | Very high (RF) | Limited by op-amp GBW |

### 12.4.3 First-Order Active Low-Pass Filter (Inverting)

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
An inverting op-amp with a capacitor \(C_f\) in parallel with the feedback resistor \(R_f\) and input resistor \(R_i\) forms a first-order active low-pass filter:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[H(j\omega) = -\frac{R_f/R_i}{1 + j\omega R_f C_f}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.4rem;">
DC gain magnitude: \(|A_{DC}| = R_f/R_i\). Cutoff frequency: \(f_c = 1/(2\pi R_f C_f)\).
</p>

### 12.4.4 Sallen-Key Second-Order Active Filter

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
The Sallen-Key topology uses one op-amp (configured as a unity-gain buffer or with gain) plus four passive components to realise a second-order response without any inductor. For the equal-component unity-gain version (\(R_1 = R_2 = R\), \(C_1 = C_2 = C\)):
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[f_c = \frac{1}{2\pi RC}\qquad Q = 0.5\quad(\text{Butterworth when gain} = 1)\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
Adding gain to the op-amp stage raises Q above 0.5, producing sharper roll-off at the cost of passband ripple. The Sallen-Key topology is widely used in audio and instrumentation equipment.
</p>

---

## 12.5 Filter Design Process

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A systematic design process translates engineering specifications into component values:
</p>

<ol style="color: #555; line-height: 2; font-size: 1.02rem; padding-left: 1.5rem;">
<li><strong>Define specifications:</strong> Filter type (LP, HP, BP, BR), cutoff or centre frequency, required roll-off rate (determines order), passband flatness, stopband attenuation.</li>
<li><strong>Choose topology:</strong> First-order RC for simple -20 dB/decade, second-order RLC for -40 dB/decade or band selectivity, active Sallen-Key or multiple feedback for audio.</li>
<li><strong>Calculate ideal component values</strong> from design equations.</li>
<li><strong>Round to standard values:</strong> E12 series (10% tolerance): 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82. E24 (5%): adds intermediate values.</li>
<li><strong>Verify the response</strong> by re-calculating \(f_c\) with the chosen standard values, accepting deviations within ±10% for most applications.</li>
</ol>

---

## 12.6 Audio Tone Control: Bass and Treble

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The bass and treble controls on a stereo amplifier are <strong>shelving filters</strong> — filters whose gain settles to a constant value in both the passband and the stopband rather than continuing to roll off. A bass control is a low-frequency shelf: it boosts or cuts frequencies below its corner frequency while leaving the midrange and treble unaffected. A treble control is a high-frequency shelf: it boosts or cuts frequencies above its corner frequency.
</p>

### 12.6.1 Bass Filter (Low-Frequency Shelving)

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A <strong style="color: #333;">bass filter</strong> acts on frequencies typically below 200–500 Hz. In boost mode it amplifies bass; in cut mode it attenuates bass. The classic Baxandall tone control implements this with a potentiometer-controlled RC network in an op-amp feedback path.
</p>

**Typical range:** ±12 to ±15 dB at 100 Hz

**Corner frequency for bass control:** RC time constant set for 100–300 Hz

### 12.6.2 Treble Filter (High-Frequency Shelving)

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A <strong style="color: #333;">treble filter</strong> acts on frequencies above 2–5 kHz. In boost mode it "brightens" the sound; in cut mode it softens harshness or reduces high-frequency noise.
</p>

**Typical range:** ±12 to ±15 dB at 10 kHz

**Corner frequency for treble control:** RC time constant set for 2–5 kHz

### 12.6.3 Shelving Filter Transfer Functions

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A general first-order shelving filter has a transfer function of the form:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[H_{shelf}(j\omega) = A_{HF} \cdot \frac{1 + j\omega/\omega_z}{1 + j\omega/\omega_p}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
where \(\omega_z\) and \(\omega_p\) are the zero and pole frequencies. For a low-shelf boost, \(\omega_z < \omega_p\); the DC gain is elevated and the high-frequency gain is unity. Potentiometers move \(\omega_z\) and \(\omega_p\) symmetrically to produce boost or cut.
</p>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<strong style="color:#5A3EED;">&#9655; MicroSim — 3-Band Graphic Equalizer</strong>
<p style="color:#555; margin: 0.5rem 0 0.8rem;">Drag the Bass, Mid, and Treble sliders to shape the frequency response. Observe how each band affects the overall EQ curve.</p>
<iframe src="../../../sims/equalizer-demo/main.html" width="100%"
    style="height:540px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>
</div>

---

## 12.7 Decibels in Audio: dBV and dBu

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Audio engineers express signal levels in decibels relative to a specific voltage reference. Two standards dominate: dBV (reference 1 V RMS) and dBu (reference 0.775 V RMS).
</p>

### 12.7.1 dBV

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[\text{dBV} = 20\log_{10}\!\left(\frac{V_{rms}}{1\ \text{V}}\right)\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.4rem;">
0 dBV = 1.000 V RMS. A signal of 316 mV is \(20\log_{10}(0.316) = -10\) dBV. A signal of 3.16 V is +10 dBV.
</p>

| dBV | \(V_{rms}\) | Typical context |
|-----|------------|-----------------|
| +4 dBV | 1.585 V | Professional line level (approx.) |
| 0 dBV | 1.000 V | Reference voltage |
| −10 dBV | 316 mV | Consumer line level |
| −60 dBV | 1 mV | Microphone output (typical) |
| −80 dBV | 100 μV | Moving-coil cartridge |

### 12.7.2 dBu

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[\text{dBu} = 20\log_{10}\!\left(\frac{V_{rms}}{0.775\ \text{V}}\right)\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
The 0.775 V reference is the voltage that delivers 1 mW into a 600 Ω load — originally the telephone industry standard. Today most professional audio equipment uses balanced 600 Ω termination but the dBu reference persists. The professional standard level is +4 dBu = 1.228 V RMS.
</p>

| dBu | dBV | \(V_{rms}\) | Context |
|-----|-----|------------|---------|
| +4 dBu | +1.8 dBV | 1.228 V | Professional balanced line |
| 0 dBu | −2.2 dBV | 0.775 V | Telephone reference |
| −10 dBu | −12.2 dBV | 245 mV | Consumer unbalanced line |
| −60 dBu | −62.2 dBV | 0.775 mV | Microphone level |

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
The relationship between the two scales: \(\text{dBu} = \text{dBV} + 2.21\). Equipment datasheets specify one or both; always check the reference before comparing levels.
</p>

### 12.7.3 Amplifier Gain in Decibels

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
<strong style="color: #333;">Amplifier gain</strong> in audio circuits is expressed in dB:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[A_{dB} = 20\log_{10}\!\left(\frac{V_{out}}{V_{in}}\right)\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
In a cascade of stages, the total gain in dB is the arithmetic sum of individual stage gains — a major convenience over multiplying linear gain factors.
</p>

| Linear gain \(A_V\) | Gain in dB |
|---------------------|------------|
| 0.5 | −6 dB |
| 1 | 0 dB |
| 2 | +6 dB |
| 10 | +20 dB |
| 100 | +40 dB |
| 1,000 | +60 dB |

#### Diagram: Decibel Scale and Audio Level Converter

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/decibel-scale/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 12.8 Headroom and Dynamic Range

### 12.8.1 Headroom

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
<strong style="color: #333;">Headroom</strong> is the margin in decibels between the nominal operating level and the maximum level before clipping (distortion) occurs:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[\text{Headroom (dB)} = \text{Maximum level (dBu)} - \text{Nominal level (dBu)}\]
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
Professional audio equipment is typically designed for a nominal level of +4 dBu with a maximum before clipping of +24 dBu, giving 20 dB of headroom. This headroom accommodates loud transients (drum hits, vocal peaks) without distortion.
</p>

### 12.8.2 Dynamic Range

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
<strong style="color: #333;">Dynamic range</strong> is the span between the loudest undistorted signal and the noise floor:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
\[\text{Dynamic Range (dB)} = \text{Maximum level (dBu)} - \text{Noise floor (dBu)}\]
</div>

| Audio medium | Typical dynamic range |
|-------------|----------------------|
| CD (16-bit PCM) | 96 dB |
| High-resolution audio (24-bit) | 144 dB |
| Vinyl LP | 60–70 dB |
| FM radio (stereo) | 50–60 dB |
| Telephone/VoIP | 30–40 dB |
| Human hearing | ~120 dB |

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
An \(n\)-bit digital system has a theoretical dynamic range of approximately \(6.02n + 1.76\) dB. For 16-bit audio: \(6.02 \times 16 + 1.76 = 98.1\) dB.
</p>

---

## 12.9 Audio Transducers: Microphones and Speakers

### 12.9.1 Microphones

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A <strong style="color: #333;">microphone</strong> converts acoustic pressure waves into an electrical voltage. The key electrical parameters for circuit design are output level and source impedance.
</p>

**Typical output levels:** −60 to −40 dBV (1 mV to 10 mV RMS for normal speaking levels)

**Required preamplifier gain:** 40–60 dB (100× to 1,000× voltage gain) to reach line level

| Microphone type | Operating principle | Typical sensitivity | Notes |
|-----------------|---------------------|---------------------|-------|
| Dynamic (moving coil) | Coil in magnetic field | −55 to −45 dBV/Pa | Rugged, no power needed |
| Condenser | Capacitor with moving plate | −40 to −20 dBV/Pa | Sensitive, needs 48 V phantom power |
| Ribbon | Thin aluminium ribbon in field | −65 to −55 dBV/Pa | Warm sound, fragile |

### 12.9.2 Speakers

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A <strong style="color: #333;">loudspeaker</strong> converts an electrical current through a voice coil into cone motion, which radiates sound. Speaker impedance is nominally 4 Ω, 8 Ω, or 16 Ω but varies substantially with frequency.
</p>

**Crossover networks:** Passive LC filter networks that split the audio signal between drivers — a low-pass filter to the woofer (bass driver) and a high-pass filter to the tweeter (treble driver). A two-way crossover uses two filters with a common crossover frequency, typically 2–5 kHz for home speakers.

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;">
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 10px;">Example — Two-Way Crossover at 3 kHz</p>
<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;">Woofer (8 Ω nominal): First-order low-pass, \(L = R/(2\pi f_c) = 8/(2\pi \times 3{,}000) = 424\) μH</p>
<p style="color: #555; line-height: 1.75; margin-bottom: 0;">Tweeter (8 Ω nominal): First-order high-pass, \(C = 1/(2\pi f_c R) = 1/(2\pi \times 3{,}000 \times 8) = 6.6\) μF</p>
</div>

---

## 12.10 The Complete Audio Signal Chain

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Understanding the full path from microphone to speaker requires applying filters, gain stages, and level management at every step.
</p>

| Stage | Typical level (dBu) | Gain/function |
|-------|---------------------|---------------|
| Microphone output | −60 to −40 dBu | Source (acoustic transducer) |
| Microphone preamp | −10 to 0 dBu | +40 to +60 dB gain |
| Equaliser / tone control | −10 to 0 dBu | ±12 dB shelving filters |
| Mix bus / line level | +4 dBu | Nominal professional level |
| Power amplifier input | +4 dBu | |
| Power amplifier output | Watts into speaker | +20 to +40 dB power gain |
| Speaker (8 Ω, 1 W) | ~90 dB SPL at 1 m | Electroacoustic transducer |

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
Each gain stage must be designed with adequate headroom so that transient peaks do not clip. Filters at every stage — the microphone's own frequency response, the equaliser shelving filters, and the speaker crossover — collectively shape what the listener hears.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;">
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 10px;">Worked Design Example — Microphone Preamp Gain</p>
<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;"><strong>Given:</strong> Microphone output = −50 dBV, target line level = +4 dBu ≈ +1.8 dBV</p>
<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;"><strong>Required gain:</strong> \(A_{dB} = +1.8 - (-50) = 51.8\) dB</p>
<p style="color: #555; line-height: 1.75; margin-bottom: 0.5rem;"><strong>Linear gain:</strong> \(A_V = 10^{51.8/20} = 10^{2.59} \approx 389\)</p>
<p style="color: #555; line-height: 1.75; margin-bottom: 0;"><strong>Implementation:</strong> Two cascaded inverting stages: \(A_{V1} = -20\) (26 dB), \(A_{V2} = -20\) (26 dB). Total = 52 dB ≈ 52 dB. Design each stage with \(R_f = 20\ R_i\).</p>
</div>

#### Diagram: Complete Audio Signal Chain

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/audio-signal-chain/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 12.11 Summary

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
Chapter 12 developed practical filter design from first principles through audio-system application:
</p>

1. **First-order RC and RL filters** are characterised by \(f_c = 1/(2\pi RC)\) or \(f_c = R/(2\pi L)\) and produce -20 dB/decade roll-off. The output element (C or R) determines low-pass or high-pass response.

2. **Second-order RLC band-pass filters** are governed by three interdependent parameters: resonant frequency \(f_0 = 1/(2\pi\sqrt{LC})\), quality factor \(Q = (1/R)\sqrt{L/C}\), and bandwidth \(BW = f_0/Q\).

3. **Passive filters** require no power and handle high levels but cannot amplify and suffer loading effects.

4. **Active filters** (op-amp + RC) eliminate inductors, allow gain, and cascade without loading — preferred for audio frequencies.

5. **Filter design** follows a five-step process: specify, choose topology, calculate ideal values, round to standard values, verify.

6. **Audio tone controls** are shelving filters: the bass control is a low-frequency shelf and the treble control is a high-frequency shelf, each implemented with RC networks in an op-amp feedback path.

7. **dBV** references 1 V RMS; **dBu** references 0.775 V RMS. Professional line level is +4 dBu; microphone level is approximately −60 to −40 dBu.

8. **Headroom** = maximum level − nominal level. **Dynamic range** = maximum level − noise floor. Adequate headroom (≥ 20 dB in professional audio) prevents clipping on transients.

9. **Microphones** output −60 to −40 dBV and require 40–60 dB of preamplifier gain to reach line level.

10. **Speaker crossover networks** are passive LC filter networks that route low frequencies to woofers and high frequencies to tweeters, ensuring each driver operates within its intended frequency range.

</div>
