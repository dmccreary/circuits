---
title: Chapter 14 — Signal Analysis and Fourier Series
description: Fourier series decomposition, harmonics, spectra, and waveform symmetry
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 14 — Signal Analysis and Fourier Series

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

When you hear a musical chord, your ear effortlessly separates the individual notes even though the air carries a single, blended pressure wave. Fourier analysis is the mathematics behind that feat. Named for the French mathematician Jean-Baptiste Joseph Fourier, who discovered in 1807 that any periodic function can be expressed as a sum of sinusoids, the technique reveals the hidden frequency ingredients — the "recipe" — of any repeating waveform. In electronics, every signal has both a time-domain description (its waveform) and an equivalent frequency-domain description (its spectrum). Being able to move fluently between the two views is one of the most powerful skills in circuit analysis and design.

This chapter develops the Fourier series from first principles and builds the tools needed to compute the harmonic content of any periodic signal. The three Fourier coefficient integrals — for DC, cosine, and sine terms — become routine through worked examples. Amplitude and phase spectra are introduced as the natural frequency-domain representation of periodic signals. Waveform symmetry is then shown to impose powerful constraints: even symmetry eliminates all sine terms, odd symmetry eliminates all cosine terms and the DC offset, and half-wave symmetry removes every even harmonic. These rules dramatically reduce calculation effort for the most common waveforms. The chapter closes by applying the theory to the three canonical waveforms — square, triangle, and sawtooth — and connecting spectrum analysis to practical problems in audio engineering and filter design.

**Key Takeaways**

1. Any periodic signal can be exactly represented by a Fourier series: a DC term plus an infinite sum of cosine and sine pairs at integer multiples of the fundamental frequency \(f_0 = 1/T\). The Fourier coefficients \(a_n\) and \(b_n\) are computed by integration over one period.
2. Waveform symmetry (even, odd, half-wave) eliminates entire classes of Fourier coefficients before any integration is performed, making hand analysis practical for the square, triangle, and sawtooth waveforms that appear throughout electronics.
3. The frequency spectrum of a periodic signal consists of discrete lines at \(f_0,\ 2f_0,\ 3f_0,\ldots\); the relative amplitudes of those lines determine timbre in audio, distortion character in amplifiers, and bandwidth requirements in communications systems.

</details>

## Summary

### Key Concepts

- Any periodic signal can be represented as a sum of sinusoids (**Fourier series**)
- The series consists of a **DC component** \(a_0\) plus harmonics at \(f_0, 2f_0, 3f_0, \ldots\)
- **Square wave**: odd harmonics only; amplitude decays as \(1/n\)
- **Triangle wave**: odd harmonics only; amplitude decays as \(1/n^2\) (faster decay → softer sound)
- **Sawtooth wave**: all harmonics; amplitude decays as \(1/n\)
- **Symmetry shortcuts**: even symmetry → cosine terms only; odd symmetry → sine terms only; half-wave symmetry → odd harmonics only
- **Total Harmonic Distortion** (THD): quantifies nonlinear distortion added by an amplifier

### Important Equations

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[ f(t) = a_0 + \sum_{n=1}^{\infty}\bigl[a_n\cos(n\omega_0 t) + b_n\sin(n\omega_0 t)\bigr] \]

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[ a_0 = \frac{1}{T}\int_0^T f(t)\,dt \qquad a_n = \frac{2}{T}\int_0^T f(t)\cos(n\omega_0 t)\,dt \qquad b_n = \frac{2}{T}\int_0^T f(t)\sin(n\omega_0 t)\,dt \]

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[ f_0 = 1/T \quad \text{(fundamental frequency)} \]

</div>

### What You Should Understand

- Why a square wave sounds harsher than a sine wave — it contains more high-frequency harmonics
- How filters can reshape a signal by selectively attenuating harmonics
- Why half-wave and odd symmetry eliminate certain Fourier coefficients (saves calculation)
- How THD measures the ratio of harmonic distortion energy to fundamental signal energy

### Applications

- Audio synthesizer waveform generation (additive synthesis)
- Amplifier distortion measurement and specification
- Anti-aliasing filter design before analog-to-digital conversion
- Spectrum analysis of periodic signals in power electronics

### Quick Review Checklist

- [ ] I can state the Fourier series formula and identify the role of each coefficient
- [ ] I can determine which harmonics are present in a square, triangle, or sawtooth wave
- [ ] I can use symmetry properties to simplify Fourier coefficient calculation
- [ ] I understand the connection between harmonic content and perceived audio timbre

## Concepts Covered

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

1. Fourier Series
2. Fundamental Frequency
3. Harmonics
4. Harmonic Content
5. Spectrum
6. Frequency Spectrum
7. Waveform Symmetry
8. Even Symmetry
9. Odd Symmetry
10. Half-Wave Symmetry

</div>

---

## Interactive MicroSims

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

This chapter includes two interactive simulations. Use them alongside the reading to explore concepts hands-on.

| Section | Simulation | What it shows |
|---------|-----------|---------------|
| 14.3 | [Harmonic Explorer](../../../sims/harmonic-explorer/index.md) | Harmonics and Fourier composition of waveforms |
| 14.4 | [Signal Parameters](../../../sims/signal-parameters/index.md) | Amplitude, frequency, and phase spectrum visualization |

</div>

### Harmonic Explorer — Interactive Walkthrough

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/harmonic-explorer/main.html" width="100%"
    style="height:550px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>
</div>

---

## Prerequisites

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Before beginning this chapter, students should have:

- Familiarity with passive components and signal fundamentals ([Chapter 5](../05-passive-components/index.md))
- Understanding of AC signals and sinusoidal waveforms ([Chapter 8](../08-ac-signals-sinusoidal/index.md))
- Mastery of frequency response and Bode plots ([Chapter 11](../11-frequency-response-bode/index.md))

</div>

<div style="background: #E8F5E9; border: 2px solid #A5D6A7; border-radius: 12px; padding: 18px 24px; margin: 2rem 0; box-shadow: 0 2px 8px rgba(76,175,80,0.08);">
<p style="margin:0;color:#2E7D32;font-weight:600;font-size:1.02rem;">
&#128214; Ready to start?
<a href="content/" style="color:#1565C0;font-weight:700;margin-left:0.5rem;">Continue to Chapter Content &rarr;</a>
</p>
</div>

</div>
