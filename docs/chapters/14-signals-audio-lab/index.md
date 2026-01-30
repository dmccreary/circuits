# Signal Analysis and Fourier Series

## Summary

This chapter introduces Fourier series analysis, a powerful mathematical tool for understanding the frequency content of periodic signals. Students will learn how any periodic waveform can be decomposed into a sum of sinusoids at harmonic frequencies, and how waveform symmetry affects which harmonics are present. The chapter covers the spectrum representation of signals, connecting time-domain waveforms to their frequency-domain content. Understanding Fourier analysis is essential for analyzing audio signals and designing filters to process them.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

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

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Passive Components: Resistors, Capacitors, and Inductors](../05-passive-components/index.md)
- [Chapter 8: AC Signals and Sinusoidal Waveforms](../08-ac-signals-sinusoidal/index.md)
- [Chapter 11: Frequency Response and Bode Plots](../11-frequency-response-bode/index.md)

---
title: Signal Analysis and Fourier Series
description: Decompose complex waveforms into their frequency components using Fourier analysis
generated_by: chapter-content-generator v0.03
date: 2026-01-30
---

## Introduction: Listening to the Ingredients

When you taste a complex dish, you might identify individual ingredients: onion, garlic, thyme, a hint of lemon. The flavors blend together, but with training, you can pick them apart. Sound works the same way—a musical chord is multiple pure tones blended together, and your ear (and brain) can separate them.

**Fourier analysis** is the mathematical technique for identifying the "ingredients" of any periodic signal. Named after Jean-Baptiste Joseph Fourier, who developed the theory in the early 1800s while studying heat flow, this technique reveals that *any* repeating waveform—no matter how jagged or complex—can be built from a recipe of simple sinusoids.

This insight is profound: it means we can analyze any signal in two equivalent ways:

- **Time domain:** How the signal varies with time (the waveform)
- **Frequency domain:** What sinusoids combine to create it (the spectrum)

Understanding both views, and how to convert between them, is essential for signal processing, audio engineering, and filter design.

## Fourier Series: The Recipe for Any Waveform

The **Fourier series** expresses any periodic signal as a sum of sinusoids:

\[f(t) = a_0 + \sum_{n=1}^{\infty} \left[ a_n \cos(n\omega_0 t) + b_n \sin(n\omega_0 t) \right]\]

Or equivalently:

\[f(t) = c_0 + \sum_{n=1}^{\infty} c_n \cos(n\omega_0 t + \phi_n)\]

Where:

- \(a_0\) (or \(c_0\)) = DC component (average value)
- \(\omega_0 = 2\pi/T\) = fundamental angular frequency
- \(n\omega_0\) = frequency of the nth harmonic
- \(a_n, b_n\) (or \(c_n, \phi_n\)) = amplitude coefficients

**The key insight:** Every periodic signal can be completely described by:

1. Its fundamental frequency
2. The amplitudes and phases of its harmonics

### Calculating Fourier Coefficients

**DC component:**
\[a_0 = \frac{1}{T}\int_0^T f(t) \, dt\]

**Cosine coefficients:**
\[a_n = \frac{2}{T}\int_0^T f(t)\cos(n\omega_0 t) \, dt\]

**Sine coefficients:**
\[b_n = \frac{2}{T}\int_0^T f(t)\sin(n\omega_0 t) \, dt\]

**Combined amplitude and phase:**
\[c_n = \sqrt{a_n^2 + b_n^2}\]
\[\phi_n = -\tan^{-1}(b_n/a_n)\]

## Fundamental Frequency and Harmonics

### Fundamental Frequency

The **fundamental frequency** (\(f_0\) or \(f_1\)) is the lowest frequency component—the repetition rate of the entire waveform:

\[f_0 = \frac{1}{T}\]

Where T is the period. The fundamental determines the perceived "pitch" of a musical note.

### Harmonics

**Harmonics** are integer multiples of the fundamental:

- 1st harmonic = \(f_0\) (fundamental)
- 2nd harmonic = \(2f_0\)
- 3rd harmonic = \(3f_0\)
- nth harmonic = \(nf_0\)

| Harmonic | Frequency | Musical Interval from Fundamental |
|----------|-----------|----------------------------------|
| 1st | f₀ | Unison |
| 2nd | 2f₀ | Octave |
| 3rd | 3f₀ | Octave + fifth |
| 4th | 4f₀ | Two octaves |
| 5th | 5f₀ | Two octaves + major third |

**Harmonic content** determines timbre—why a violin and piano playing the same note sound different. Both have the same fundamental, but different harmonic amplitudes.

#### Diagram: Harmonic Content Explorer

<iframe src="../../sims/harmonic-explorer/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Harmonic Content Explorer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how combining harmonics creates different waveforms by observing the synthesis process step by step.

Visual elements:
- Top plot: Resulting waveform (sum of harmonics)
- Middle: Individual harmonics shown as separate traces
- Bottom: Frequency spectrum (bar chart of harmonic amplitudes)
- Toggle between "building up" and "complete" views

Interactive controls:
- Sliders: Amplitude of harmonics 1-7 (0 to 100%)
- Preset buttons: Square wave, Triangle wave, Sawtooth, Pure sine
- Slider: Number of harmonics to include
- Button: Add next harmonic (step-through)
- Display: Formula showing sum

Step-through mode:
- Start with fundamental only
- "Add 3rd harmonic" button adds next component
- Watch waveform become more complex
- Observe spectrum grow

Waveform presets (with correct harmonic ratios):
- Square: 1, 0, 1/3, 0, 1/5, 0, 1/7... (odd harmonics)
- Triangle: 1, 0, 1/9, 0, 1/25... (odd harmonics, 1/n²)
- Sawtooth: 1, 1/2, 1/3, 1/4... (all harmonics, 1/n)

Default parameters:
- Square wave preset
- First 7 harmonics

Canvas layout:
- Waveform/components: 600 × 350 pixels
- Spectrum: 600 × 100 pixels (below)
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Spectrum: The Frequency Domain View

The **spectrum** (or **frequency spectrum**) shows the amplitude (and optionally phase) of each frequency component in a signal.

**Spectrum plot axes:**

- X-axis: Frequency (Hz)
- Y-axis: Amplitude (or power, often in dB)

**For periodic signals:** The spectrum is discrete—energy exists only at the fundamental and harmonic frequencies (line spectrum).

**For non-periodic signals:** The spectrum is continuous—energy is spread across a range of frequencies.

### Reading a Spectrum

| Spectrum Feature | Time Domain Meaning |
|-----------------|---------------------|
| Single line at f₀ | Pure sine wave |
| Many lines at f₀, 2f₀, 3f₀... | Complex periodic wave |
| Odd harmonics only | Symmetric waveform |
| Even and odd harmonics | Asymmetric waveform |
| Higher harmonics stronger | Sharper transitions |

#### Diagram: Time Domain to Frequency Domain

<iframe src="../../sims/time-to-frequency/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Time Domain to Frequency Domain</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: examine

Learning Objective: Students will examine the relationship between waveform shape and spectral content by observing how modifications in one domain affect the other.

Visual elements:
- Left panel: Time domain waveform
- Right panel: Frequency spectrum (bar chart)
- Arrows connecting harmonics to their spectral lines
- Animation option showing Fourier decomposition

Interactive controls:
- Dropdown: Waveform type (sine, square, triangle, sawtooth, pulse)
- Slider: Fundamental frequency (affects spectral line spacing)
- Slider: Duty cycle (for pulse waveform)
- Toggle: Show/hide individual harmonics on time plot
- Toggle: Linear/dB scale for spectrum

Observations highlighted:
- Pure sine → single spectral line
- Square wave → odd harmonics, 1/n amplitude
- Sawtooth → all harmonics, 1/n amplitude
- Narrower pulse → wider spectrum

Default parameters:
- Square wave
- f₀ = 100 Hz
- Display up to 10th harmonic

Canvas layout:
- Time plot: 300 × 350 pixels
- Spectrum: 300 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Waveform Symmetry and Its Effects

The symmetry of a waveform dramatically simplifies its Fourier series by eliminating certain terms.

### Even Symmetry

A function has **even symmetry** if:
\[f(-t) = f(t)\]

**Effect:** Only cosine terms exist (no sine terms, \(b_n = 0\))

**Examples:** Cosine wave, triangle wave centered at peak

### Odd Symmetry

A function has **odd symmetry** if:
\[f(-t) = -f(t)\]

**Effect:** Only sine terms exist (no cosine terms, \(a_n = 0\)), and no DC component

**Examples:** Sine wave, square wave centered at zero crossing

### Half-Wave Symmetry

A function has **half-wave symmetry** if:
\[f(t + T/2) = -f(t)\]

The waveform inverted and shifted by half a period equals the original.

**Effect:** Only odd harmonics exist (no even harmonics)

**Examples:** Square wave, triangle wave, any AC waveform with zero average

| Symmetry Type | Condition | Fourier Series Result |
|---------------|-----------|----------------------|
| Even | f(-t) = f(t) | Cosine terms only (bn = 0) |
| Odd | f(-t) = -f(t) | Sine terms only (an = 0), no DC |
| Half-wave | f(t+T/2) = -f(t) | Odd harmonics only |

!!! tip "Using Symmetry to Simplify"
    Before calculating Fourier coefficients, check for symmetry. If a waveform has half-wave symmetry, you immediately know that even harmonics are zero—no need to calculate them. This saves significant effort in hand calculations.

## Common Waveforms and Their Spectra

### Square Wave

**Time domain:** Alternates between +A and -A

**Fourier series:**
\[f(t) = \frac{4A}{\pi}\left[\sin(\omega_0 t) + \frac{1}{3}\sin(3\omega_0 t) + \frac{1}{5}\sin(5\omega_0 t) + ...\right]\]

**Spectrum characteristics:**

- Only odd harmonics
- Amplitudes decrease as 1/n
- Many harmonics needed for sharp corners

### Triangle Wave

**Time domain:** Linear ramps up and down

**Fourier series:**
\[f(t) = \frac{8A}{\pi^2}\left[\sin(\omega_0 t) - \frac{1}{9}\sin(3\omega_0 t) + \frac{1}{25}\sin(5\omega_0 t) - ...\right]\]

**Spectrum characteristics:**

- Only odd harmonics
- Amplitudes decrease as 1/n² (faster than square)
- Smoother waveform = fewer high-frequency components

### Sawtooth Wave

**Time domain:** Linear ramp then sudden reset

**Fourier series:**
\[f(t) = \frac{2A}{\pi}\left[\sin(\omega_0 t) - \frac{1}{2}\sin(2\omega_0 t) + \frac{1}{3}\sin(3\omega_0 t) - ...\right]\]

**Spectrum characteristics:**

- All harmonics (both odd and even)
- Amplitudes decrease as 1/n
- Asymmetric = even harmonics present

| Waveform | Harmonics Present | Amplitude Decay | Smoothness |
|----------|------------------|-----------------|------------|
| Square | Odd only | 1/n | Sharp corners |
| Triangle | Odd only | 1/n² | Smooth |
| Sawtooth | All | 1/n | Sharp reset |
| Sine | Fundamental only | — | Perfectly smooth |

## Practical Applications

### Audio Analysis

- Analyzing instrument timbre
- Identifying harmonic distortion in amplifiers
- Understanding musical intervals and chords

### Signal Processing

- Designing filters to remove unwanted harmonics
- Understanding aliasing in digital sampling
- Analyzing power quality (harmonic pollution in power lines)

### Telecommunications

- Bandwidth requirements for signals
- Understanding signal degradation through filters
- Pulse shaping for data transmission

## Self-Check Questions

??? question "1. A periodic signal has fundamental frequency 500 Hz. What is the frequency of its 7th harmonic?"
    The nth harmonic has frequency n × f₀:

    \[f_7 = 7 \times 500 \text{ Hz} = 3500 \text{ Hz}\]

    The 7th harmonic is at 3.5 kHz.

??? question "2. A square wave has only odd harmonics. Why don't even harmonics appear?"
    Square waves have **half-wave symmetry**: f(t + T/2) = -f(t)

    This means the second half of each period is the exact negative of the first half. Mathematically, when you compute the Fourier coefficients for even harmonics (n = 2, 4, 6...), the integral over one period cancels to zero because of this symmetry.

    Physically, even harmonics would add constructively in the first half and destructively in the second half, violating the required symmetry.

??? question "3. Why does a triangle wave have fewer high-frequency components than a square wave?"
    Triangle waves are smoother—they have continuous first derivatives (no sudden jumps or corners). High-frequency harmonics are needed to create sharp transitions in the time domain.

    Quantitatively:
    - Square wave harmonics decay as 1/n
    - Triangle wave harmonics decay as 1/n²

    So the 9th harmonic is:
    - Square: 1/9 ≈ 11% of fundamental
    - Triangle: 1/81 ≈ 1.2% of fundamental

    The faster decay means high harmonics contribute much less to the triangle wave.

??? question "4. If you low-pass filter a square wave, what happens to its shape?"
    A low-pass filter attenuates high-frequency components. For a square wave:

    1. **Mild filtering** (cutoff above 5th harmonic): Corners become slightly rounded
    2. **Moderate filtering** (cutoff around 3rd harmonic): Significant rounding, overshoot may appear
    3. **Heavy filtering** (cutoff below fundamental): Approaches a sine wave

    The sharp corners of a square wave require high harmonics. Remove them, and the wave "softens." This is why square waves look rounded on bandwidth-limited oscilloscopes.

## Summary

Fourier analysis reveals the hidden frequency structure of any periodic signal:

1. **Any periodic signal is a sum of sinusoids** - The Fourier series decomposes complexity into simple components

2. **Fundamental frequency sets the pitch** - It's the lowest component, 1/T

3. **Harmonics are integer multiples** - 2f₀, 3f₀, 4f₀... create timbre and texture

4. **Harmonic content determines sound quality** - Same note, different harmonics = different instruments

5. **The spectrum shows frequency components** - Time domain shows shape, frequency domain shows ingredients

6. **Even symmetry gives cosine terms only** - Odd symmetry gives sine terms only

7. **Half-wave symmetry eliminates even harmonics** - Only odd harmonics survive

8. **Sharp transitions need high frequencies** - Square waves need many harmonics; triangles need fewer

9. **Filters modify spectral content** - Low-pass removes high harmonics, smoothing waveforms

10. **This is the foundation for all signal processing** - Understanding spectra enables filter design, audio engineering, and communications

Fourier analysis bridges the gap between what we see (waveforms) and what circuits do (frequency-dependent processing). Every filter, equalizer, and signal processor operates in the frequency domain, even if we interact with signals in the time domain. Mastering this duality—seeing signals as both waveforms and spectra—is essential for working with real-world electronics.
