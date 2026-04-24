---
title: Chapter 14 Content — Signal Analysis and Fourier Series
description: Teaching content covering Fourier series formula, harmonic analysis, spectrum representation, waveform symmetry, canonical waveforms, and applications to audio and filter design
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 14 — Signal Analysis and Fourier Series

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

Fourier series analysis reveals that any periodic signal can be decomposed into a sum of sinusoids at harmonically related frequencies, transforming complex waveform analysis into a manageable collection of single-frequency problems. This chapter develops the Fourier series formula, introduces the frequency-domain spectrum as a visualization tool, and applies harmonic analysis to understand how filters and amplifiers shape real signals.

**Key Takeaways**

1. Any periodic signal can be expressed as a sum of sinusoids (Fourier series) with frequencies that are integer multiples of the fundamental frequency.
2. The frequency spectrum — a plot of harmonic amplitudes and phases versus frequency — provides an alternative and often more informative view of a signal than its time-domain waveform.
3. Because linear circuits apply their transfer function independently to each harmonic, Fourier analysis lets you predict the exact output waveform of a filter or amplifier for any periodic input.

</details>

## 14.1 Introduction

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Every circuit you have analysed so far has a well-defined response to a sinusoidal input: the transfer function \(H(j\omega)\) scales the amplitude and shifts the phase. But real-world signals — speech, music, clock pulses, sensor readings — are rarely pure sinusoids. They are complex waveforms whose shape changes from moment to moment. How do you predict what a filter or amplifier will do to such a signal?
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The key is a remarkable result discovered by Jean-Baptiste Joseph Fourier around 1807: <strong style="color: #333;">any periodic signal can be expressed as a sum of sinusoids</strong>. This is the Fourier series.

<div class="mascot rezi" markdown>
**Definition: Fourier Series**
A Fourier series represents any periodic signal \(f(t)\) with period \(T\) as a DC component plus an infinite sum of harmonically related sinusoids: \(f(t) = a_0 + \sum_{n=1}^{\infty}[a_n\cos(n\omega_0 t) + b_n\sin(n\omega_0 t)]\), where \(\omega_0 = 2\pi/T\) is the fundamental angular frequency. Each sinusoidal term is called a **harmonic**; the \(n\)th harmonic has frequency \(nf_0\).
</div> Once a signal is expressed as a sum of sinusoids, linearity means you can apply the transfer function to each sinusoid independently and add the results. The Fourier series thereby transforms a difficult problem — system response to an arbitrary waveform — into a family of easy problems, each solved with the phasor techniques already in your toolkit.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The Fourier series also provides a second, equally important viewpoint: the <strong style="color: #333;">frequency domain</strong>. Rather than plotting a signal versus time, you plot its amplitude and phase versus frequency. This frequency-domain picture — called the <strong style="color: #333;">spectrum</strong> — reveals which frequencies carry the signal's energy. The spectrum is the language of filter design, audio engineering, communications, and signal processing. Learning to read and compute spectra is a foundational skill for any circuits engineer.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
This chapter builds the Fourier series from first principles, develops the coefficient integrals, introduces spectral representations, exploits waveform symmetry to simplify calculations, analyses the canonical waveforms — square, triangle, and sawtooth — and connects everything to practical applications in audio and filter design.
</p>

## 14.2 The Fourier Series Formula

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A signal \(f(t)\) is <strong style="color: #333;">periodic with period \(T\)</strong> if \(f(t + T) = f(t)\) for all \(t\). The <strong style="color: #333;">Fourier series</strong> represents any such signal as a DC offset plus an infinite sum of cosine and sine terms:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f(t) = a_0 + \sum_{n=1}^{\infty} \bigl[a_n \cos(n\omega_0 t) + b_n \sin(n\omega_0 t)\bigr]\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
where \(\omega_0 = 2\pi / T\) is the <strong style="color: #333;">fundamental angular frequency</strong> in radians per second. Each pair \(\{a_n \cos(n\omega_0 t),\ b_n \sin(n\omega_0 t)\}\) constitutes the <em>nth harmonic</em>.
</p>

### Fourier Coefficients

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
The three coefficient formulas follow from the orthogonality of sines and cosines over one period. Integrating \(f(t)\) against each basis function isolates the corresponding coefficient.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.4rem;"><strong>DC component (average value):</strong></p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[a_0 = \frac{1}{T}\int_0^T f(t)\, dt\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.4rem;"><strong>Cosine coefficients</strong> (for \(n = 1, 2, 3, \ldots\)):</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[a_n = \frac{2}{T}\int_0^T f(t)\cos(n\omega_0 t)\, dt\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.4rem;"><strong>Sine coefficients</strong> (for \(n = 1, 2, 3, \ldots\)):</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[b_n = \frac{2}{T}\int_0^T f(t)\sin(n\omega_0 t)\, dt\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The limits of integration can be any convenient interval of length \(T\), such as \([-T/2,\ T/2]\). Choose whichever limits make the integrand simplest.

<div class="mascot ohmy" markdown>
**Key Formula: Fourier Coefficient Integrals**

\[a_0 = \frac{1}{T}\int_0^T f(t)\,dt \qquad a_n = \frac{2}{T}\int_0^T f(t)\cos(n\omega_0 t)\,dt \qquad b_n = \frac{2}{T}\int_0^T f(t)\sin(n\omega_0 t)\,dt\]

\(a_0\) is the **average value** (DC component). The factor of \(2/T\) in \(a_n\) and \(b_n\) — but \(1/T\) in \(a_0\) — is a common source of errors; don't apply the factor of 2 to the DC term.
</div>
</p>

### Amplitude–Phase Form

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
It is often more intuitive to combine the cosine and sine terms into a single sinusoid with amplitude \(c_n\) and phase \(\phi_n\):
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[c_n = \sqrt{a_n^2 + b_n^2}, \qquad \phi_n = -\arctan\!\left(\frac{b_n}{a_n}\right)\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The equivalent amplitude–phase Fourier series is then:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f(t) = a_0 + \sum_{n=1}^{\infty} c_n \cos(n\omega_0 t + \phi_n)\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The amplitudes \(c_n\) are the heights of the lines in the <strong>amplitude spectrum</strong>; the angles \(\phi_n\) form the <strong>phase spectrum</strong>.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
<p style="color: #B8860B; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Key Insight — Linearity and the Fourier Series</p>
<p style="color: #555; line-height: 1.75; margin: 0;">
Because the Fourier series decomposes a signal into individual sinusoids, and because circuit analysis with phasors handles one sinusoid at a time, the response of any linear circuit to a periodic input is found by applying the transfer function \(H(j\omega)\) to each harmonic individually and summing the outputs. This is the practical power of the Fourier series.
</p>
</div>

## 14.3 Fundamental Frequency and Harmonics

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">fundamental frequency</strong> \(f_0\) is the reciprocal of the period:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f_0 = \frac{1}{T}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
It is the lowest frequency component of the signal and determines its repetition rate. In music, the fundamental sets the perceived pitch.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Harmonics</strong> are sinusoidal components at integer multiples of \(f_0\). The \(n\)th harmonic has frequency \(nf_0\) and angular frequency \(n\omega_0\):
</p>

| Harmonic number \(n\) | Frequency | Name |
|---|---|---|
| 1 | \(f_0\) | Fundamental (1st harmonic) |
| 2 | \(2f_0\) | 2nd harmonic |
| 3 | \(3f_0\) | 3rd harmonic |
| 4 | \(4f_0\) | 4th harmonic |
| \(n\) | \(nf_0\) | \(n\)th harmonic |

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem; margin-top: 1.2rem;">
<strong style="color: #333;">Harmonic content</strong> refers to the set of amplitudes \(\{c_n\}\) across all harmonics. It is harmonic content that distinguishes the timbre of two instruments playing the same note at the same loudness: a violin and a clarinet both at concert A (440 Hz) have the same fundamental but radically different harmonic amplitudes.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
<p style="color: #B8860B; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Even vs. Odd Harmonics</p>
<p style="color: #555; line-height: 1.75; margin: 0;">
Harmonics with \(n = 1, 3, 5, \ldots\) are called <strong>odd harmonics</strong>; those with \(n = 2, 4, 6, \ldots\) are <strong>even harmonics</strong>. Many common waveforms — square and triangle waves — contain only odd harmonics, a direct consequence of their symmetry (see Section 14.5).
</p>
</div>

#### Diagram: Harmonic Explorer

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/harmonic-explorer/main.html" width="100%" height="260px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

## 14.4 Spectrum Representation

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">frequency spectrum</strong> is a plot of the amplitude (and optionally phase) of each Fourier component against frequency. For a periodic signal with period \(T\), energy exists only at the discrete frequencies \(0,\ f_0,\ 2f_0,\ 3f_0,\ldots\) — this is called a <strong style="color: #333;">discrete line spectrum</strong>. Each line's height equals the amplitude \(c_n\) of the corresponding harmonic.
</p>

### Reading a Spectrum Plot

| Feature in spectrum | Meaning in time domain |
|---|---|
| Single line at \(f_0\) | Pure sinusoid at the fundamental frequency |
| Lines at \(f_0, 3f_0, 5f_0, \ldots\) only | Odd harmonics only — indicates symmetry |
| Lines at \(f_0, 2f_0, 3f_0, \ldots\) | All harmonics — asymmetric waveform |
| Rapidly falling amplitudes | Smooth, slowly changing waveform |
| Slowly falling amplitudes | Sharp transitions, many harmonics needed |
| DC line at \(f = 0\) | Non-zero average value |

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem; margin-top: 1.2rem;">
Two spectra are needed for a complete frequency-domain description of a periodic signal:
</p>

- **Amplitude spectrum:** Plot of \(c_n\) vs. \(nf_0\). This shows how signal power is distributed among harmonics.
- **Phase spectrum:** Plot of \(\phi_n\) vs. \(nf_0\). Important when waveform shape must be exactly reconstructed.

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
For many engineering purposes — especially filter design and power analysis — only the amplitude spectrum is needed. The phase spectrum matters when signal delay is significant, as in audio and communications systems.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
<p style="color: #B8860B; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Parseval's Theorem</p>
<p style="color: #555; line-height: 1.75; margin: 0;">
The total average power of a periodic signal equals the sum of the powers in its DC component and each harmonic:

\[\frac{1}{T}\int_0^T [f(t)]^2\, dt = a_0^2 + \frac{1}{2}\sum_{n=1}^{\infty}(a_n^2 + b_n^2) = a_0^2 + \frac{1}{2}\sum_{n=1}^{\infty} c_n^2\]

This means you can calculate total power either from the waveform directly or from the spectrum — both methods give the same answer.
</p>
</div>

#### Diagram: Time to Frequency Domain

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/time-to-frequency/main.html" width="100%" height="320px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

## 14.5 Waveform Symmetry

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Waveform symmetry</strong> is the single most useful shortcut in Fourier analysis. Before computing any integral, inspect the waveform for symmetry. Each type of symmetry eliminates a class of coefficients, turning an infinite integral computation into a finite one.
</p>

### Even Symmetry

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A waveform has <strong style="color: #333;">even symmetry</strong> if it is symmetric about the vertical axis:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f(-t) = f(t) \quad \text{for all } t\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
Because the product of an even function with the odd function \(\sin(n\omega_0 t)\) is odd and integrates to zero over a symmetric interval:</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[\text{Even symmetry} \implies b_n = 0 \text{ for all } n \quad \text{(cosine terms only)}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;"><strong>Examples:</strong> cosine wave, triangle wave (centred at peak), even rectangular pulse train.</p>

### Odd Symmetry

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A waveform has <strong style="color: #333;">odd symmetry</strong> if it is antisymmetric about the vertical axis:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f(-t) = -f(t) \quad \text{for all } t\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
By the same orthogonality argument, the product of an odd function with the even function \(\cos(n\omega_0 t)\) integrates to zero, and the average value is also zero:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[\text{Odd symmetry} \implies a_0 = 0,\quad a_n = 0 \text{ for all } n \quad \text{(sine terms only, no DC)}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;"><strong>Examples:</strong> sine wave, odd square wave (centred at zero crossing), sawtooth through origin.</p>

### Half-Wave Symmetry

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A waveform has <strong style="color: #333;">half-wave symmetry</strong> if the second half of each period is the negative of the first half:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f\!\left(t + \tfrac{T}{2}\right) = -f(t) \quad \text{for all } t\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
When this condition holds, the contributions from even-numbered harmonics cancel over a full period:</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[\text{Half-wave symmetry} \implies a_n = b_n = 0 \text{ for even } n \quad \text{(odd harmonics only)}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;"><strong>Examples:</strong> square wave, triangle wave, any waveform that looks like its own negative shifted by half a period.</p>

### Symmetry Summary Table

| Symmetry | Condition | Effect on Fourier series |
|---|---|---|
| Even | \(f(-t) = f(t)\) | \(b_n = 0\) (cosine terms only) |
| Odd | \(f(-t) = -f(t)\) | \(a_0 = 0\), \(a_n = 0\) (sine terms only, no DC) |
| Half-wave | \(f(t+T/2) = -f(t)\) | \(a_n = b_n = 0\) for even \(n\) (odd harmonics only) |

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
<p style="color: #B8860B; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Tip — Check Symmetry First</p>
<p style="color: #555; line-height: 1.75; margin: 0;">
Always inspect the waveform for all three symmetries before integrating. A waveform can have more than one type simultaneously — for example, a square wave that is both odd and half-wave symmetric. Each identified symmetry halves (or more) the number of coefficients you must actually compute.
</p>
</div>

<div class="mascot cappy" markdown>
**Pro Tip: Check Symmetry Before Computing Any Integrals**
Before touching a Fourier coefficient integral, spend 30 seconds checking all three symmetries: even (\(f(-t) = f(t)\) → all \(b_n = 0\)), odd (\(f(-t) = -f(t)\) → all \(a_n = 0\) and \(a_0 = 0\)), half-wave (\(f(t+T/2) = -f(t)\) → all even harmonics = 0). A typical square wave has both odd and half-wave symmetry, cutting the work to just computing \(b_n\) for odd \(n\) — eliminating \(a_0\), all \(a_n\), and all even \(b_n\) in one inspection.
</div>

## 14.6 Common Waveforms and Their Spectra

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Three waveforms appear so often in electronics that their Fourier series are worth memorising. Each has a characteristic spectral signature that immediately suggests which harmonics dominate and how quickly they decay.
</p>

### Square Wave

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A square wave of amplitude \(A\) alternates between \(+A\) and \(-A\) with 50 % duty cycle. It has odd symmetry and half-wave symmetry, so only odd sine terms survive.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f(t) = \frac{4A}{\pi}\left[\sin(\omega_0 t) + \frac{1}{3}\sin(3\omega_0 t) + \frac{1}{5}\sin(5\omega_0 t) + \cdots\right] = \frac{4A}{\pi}\sum_{\substack{n=1 \\ n \text{ odd}}}^{\infty} \frac{\sin(n\omega_0 t)}{n}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
Spectral characteristics:</p>

- Only odd harmonics present (\(n = 1, 3, 5, \ldots\))
- Amplitudes \(c_n = 4A/(n\pi)\) decay as \(1/n\) — slow decay
- Many harmonics needed to represent the sharp corners accurately

### Triangle Wave

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A triangle wave of amplitude \(A\) ramps linearly between \(+A\) and \(-A\). Depending on placement, it can have even or odd symmetry; it always has half-wave symmetry.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f(t) = \frac{8A}{\pi^2}\left[\sin(\omega_0 t) - \frac{1}{9}\sin(3\omega_0 t) + \frac{1}{25}\sin(5\omega_0 t) - \cdots\right] = \frac{8A}{\pi^2}\sum_{\substack{n=1 \\ n \text{ odd}}}^{\infty} \frac{(-1)^{(n-1)/2}}{n^2}\sin(n\omega_0 t)\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
Spectral characteristics:</p>

- Only odd harmonics present
- Amplitudes \(c_n \propto 1/n^2\) — rapid decay
- The \(1/n^2\) decay reflects the smoother waveform (no discontinuities in \(f(t)\) itself, only in its derivative)

### Sawtooth Wave

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
A sawtooth wave of amplitude \(A\) ramps linearly from \(-A\) to \(+A\) then resets abruptly. It lacks half-wave symmetry and (centred at the origin) has odd symmetry only, so all harmonics appear.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f(t) = \frac{2A}{\pi}\left[\sin(\omega_0 t) - \frac{1}{2}\sin(2\omega_0 t) + \frac{1}{3}\sin(3\omega_0 t) - \cdots\right] = \frac{2A}{\pi}\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n}\sin(n\omega_0 t)\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
Spectral characteristics:</p>

- All harmonics present (both odd and even)
- Amplitudes \(c_n = 2A/(n\pi)\) decay as \(1/n\)
- The sudden reset discontinuity requires all harmonics; eliminating even harmonics would produce a triangle wave instead

### Waveform Comparison

| Waveform | Harmonics present | Amplitude decay | Smoothness |
|---|---|---|---|
| Sine | Fundamental only (\(n = 1\)) | — | Perfectly smooth |
| Square | Odd only (\(n = 1, 3, 5, \ldots\)) | \(1/n\) | Sharp corners |
| Triangle | Odd only (\(n = 1, 3, 5, \ldots\)) | \(1/n^2\) | Smooth (no discontinuity in \(f\)) |
| Sawtooth | All (\(n = 1, 2, 3, \ldots\)) | \(1/n\) | Sharp reset |

<div class="mascot sparky" markdown>
**Common Mistake: Assuming Square and Triangle Waves Have the Same Harmonic Decay**
Both square and triangle waves contain only **odd** harmonics, so students sometimes assume their spectra look the same. They don't — the amplitude of the \(n\)th harmonic decays as \(1/n\) for a square wave but as \(1/n^2\) for a triangle wave. This means the triangle wave's higher harmonics are far weaker: at the 9th harmonic, the triangle is 81× weaker than the square at the same fundamental level. Smoother waveform = faster amplitude decay.
</div>

## 14.7 Applications

### Audio Timbre and Musical Instruments

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Every musical instrument produces a distinctive harmonic profile. A flute playing concert A (440 Hz) is nearly a pure sine — its spectrum shows one dominant line. A violin on the same note has strong 2nd, 3rd, and 4th harmonics that give it richness. A clarinet, owing to its cylindrical bore, emphasises odd harmonics almost exclusively. Fourier analysis quantifies these differences and enables digital synthesis, equalisation, and timbre modelling.
</p>

### Amplifier Distortion Analysis

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
When a sinusoidal signal passes through a nonlinear amplifier, the output contains harmonics not present in the input. <strong>Total harmonic distortion (THD)</strong> quantifies this:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[\text{THD} = \frac{\sqrt{c_2^2 + c_3^2 + c_4^2 + \cdots}}{c_1} \times 100\,\%\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A THD below 0.1 % is inaudible; high-fidelity audio amplifiers typically specify THD below 0.01 %. Fourier analysis of the output spectrum directly reveals which harmonics the amplifier generates and at what levels.
</p>

### Filter Design for Harmonic Control

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Because a low-pass filter attenuates high-frequency harmonics, it smooths sharp waveforms. A square wave passed through a low-pass filter with cutoff frequency between the 3rd and 5th harmonics loses its sharp corners and takes on a sinusoidal shape. Anti-aliasing filters in analogue-to-digital converters (ADCs) exploit this: by removing harmonics above the Nyquist frequency before sampling, they prevent aliasing artefacts. The Fourier series tells the designer exactly which harmonics fall above the cutoff and what their amplitudes are, allowing an accurate prediction of the filtered output.
</p>

#### Diagram: Signal Distortion Types

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/distortion-types/main.html" width="100%" height="260px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

### Power Systems — Harmonic Pollution

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Nonlinear loads on the power grid (variable-speed motor drives, switched-mode power supplies, fluorescent lighting) draw non-sinusoidal currents that inject harmonics back into the 50/60 Hz supply. The 3rd, 5th, and 7th harmonics (150, 250, 350 Hz in a 50 Hz system) cause overheating of neutral conductors, transformer core losses, and interference with sensitive equipment. Fourier analysis of the line current spectrum is the standard diagnostic tool for power quality assessment.
</p>

## 14.8 Worked Example — Fourier Coefficients of a Rectangular Pulse Train

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Compute the Fourier series of the following rectangular pulse train:
</p>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f(t) = \begin{cases} A & 0 < t < T/2 \\ 0 & T/2 < t < T \end{cases}\]

repeated with period \(T\).

</div>

### Step 1 — Identify Symmetry

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
The waveform is neither even nor odd (it is not symmetric about \(t = 0\)), and it does not satisfy \(f(t + T/2) = -f(t)\) because the second half is zero, not \(-A\). Therefore <strong>no symmetry shortcuts apply</strong>; all three coefficient integrals must be evaluated.
</p>

### Step 2 — DC Coefficient \(a_0\)

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[a_0 = \frac{1}{T}\int_0^T f(t)\, dt = \frac{1}{T}\int_0^{T/2} A\, dt = \frac{1}{T}\cdot A\cdot\frac{T}{2} = \frac{A}{2}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
The DC component equals the average value: the waveform is \(A\) for half the period and 0 for the other half, so the average is \(A/2\). ✓
</p>

### Step 3 — Cosine Coefficients \(a_n\)

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[a_n = \frac{2}{T}\int_0^{T/2} A\cos(n\omega_0 t)\, dt = \frac{2A}{T}\left[\frac{\sin(n\omega_0 t)}{n\omega_0}\right]_0^{T/2}\]

Since \(\omega_0 = 2\pi/T\), at the upper limit \(n\omega_0 \cdot T/2 = n\pi\):

\[a_n = \frac{2A}{T}\cdot\frac{\sin(n\pi) - \sin(0)}{n\omega_0} = \frac{2A}{T}\cdot\frac{0}{n\omega_0} = 0 \quad \text{for all } n\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
All cosine coefficients vanish because \(\sin(n\pi) = 0\) for every integer \(n\).
</p>

### Step 4 — Sine Coefficients \(b_n\)

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[b_n = \frac{2}{T}\int_0^{T/2} A\sin(n\omega_0 t)\, dt = \frac{2A}{T}\left[-\frac{\cos(n\omega_0 t)}{n\omega_0}\right]_0^{T/2} = \frac{2A}{T}\cdot\frac{1 - \cos(n\pi)}{n\omega_0}\]

Substituting \(\omega_0 = 2\pi/T\):

\[b_n = \frac{2A}{T}\cdot\frac{T}{2n\pi}\bigl[1 - \cos(n\pi)\bigr] = \frac{A}{n\pi}\bigl[1 - (-1)^n\bigr]\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
Evaluating for the first several harmonics:
</p>

| \(n\) | \((-1)^n\) | \(1 - (-1)^n\) | \(b_n\) |
|---|---|---|---|
| 1 | \(-1\) | 2 | \(2A/\pi\) |
| 2 | \(+1\) | 0 | 0 |
| 3 | \(-1\) | 2 | \(2A/(3\pi)\) |
| 4 | \(+1\) | 0 | 0 |
| 5 | \(-1\) | 2 | \(2A/(5\pi)\) |

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem; margin-top: 0.8rem;">
Even harmonics vanish; odd harmonics have \(b_n = 2A/(n\pi)\).
</p>

### Step 5 — Complete Fourier Series

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f(t) = \frac{A}{2} + \frac{2A}{\pi}\left[\sin(\omega_0 t) + \frac{1}{3}\sin(3\omega_0 t) + \frac{1}{5}\sin(5\omega_0 t) + \cdots\right]\]

\[= \frac{A}{2} + \frac{2A}{\pi}\sum_{\substack{n=1 \\ n \text{ odd}}}^{\infty}\frac{\sin(n\omega_0 t)}{n}\]

</div>

### Interpretation

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
The result is essentially a DC offset \(A/2\) plus a scaled square wave. This makes intuitive sense: a square wave toggling between \(+A/2\) and \(-A/2\) has a zero average; adding a DC level of \(A/2\) shifts it to toggle between \(A\) and \(0\) — exactly our pulse train. The factor \(2A/\pi\) vs. the square-wave factor \(4A/\pi\) reflects the different amplitude definition used here (\(0\) to \(A\) vs. \(-A\) to \(+A\)).
</p>

## 14.9 Summary

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
This chapter developed the Fourier series as the bridge between time-domain waveforms and frequency-domain spectra. The key results are:
</p>

1. **Any periodic signal** can be decomposed into a DC term plus sinusoids at integer multiples of the fundamental frequency \(f_0 = 1/T\).
2. **The three coefficient integrals** — for \(a_0\), \(a_n\), and \(b_n\) — follow from the orthogonality of sines and cosines. The amplitude–phase form \(c_n = \sqrt{a_n^2 + b_n^2}\) is the natural representation for spectrum plots.
3. **Even symmetry** eliminates all \(b_n\); **odd symmetry** eliminates \(a_0\) and all \(a_n\); **half-wave symmetry** eliminates all even harmonics. Checking these before integrating saves enormous effort.
4. **Square and sawtooth waves** have amplitudes decaying as \(1/n\) (slow); **triangle waves** decay as \(1/n^2\) (fast). Smoother waveforms require fewer harmonics.
5. **The frequency spectrum** of a periodic signal is a discrete line spectrum at \(0, f_0, 2f_0, \ldots\). Amplitude and phase spectra together completely characterise the signal in the frequency domain.
6. **Applications** include audio timbre analysis, amplifier THD measurement, filter design for harmonic control, and power-system harmonic assessment.

<div style="background: #E8F5E9; border: 2px solid #A5D6A7; border-radius: 12px; padding: 18px 24px; margin: 2rem 0; box-shadow: 0 2px 8px rgba(76,175,80,0.08);">
<p style="margin:0;color:#2E7D32;font-weight:600;font-size:1.02rem;">
&#128221; Test your understanding:
<a href="quiz/" style="color:#1565C0;font-weight:700;margin-left:0.5rem;">Go to Chapter 14 Quiz &rarr;</a>
</p>
</div>

</div>
