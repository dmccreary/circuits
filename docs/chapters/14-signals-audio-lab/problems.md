---
title: Chapter 14 Practice Problems — Signal Analysis and Fourier Series
description: Practice problems with solutions for Chapter 14 covering Fourier series, harmonic analysis, and waveform symmetry
---

<div class="unit1-styled" markdown>

# Chapter 14 Practice Problems

## Practice Problems

### Problem 1 — Fourier Coefficients of a Square Wave

A square wave has amplitude A = 4 V, period T = 2 ms, and is defined as:
\[f(t) = \begin{cases} +4\text{ V} & 0 < t < T/2 \\ -4\text{ V} & T/2 < t < T \end{cases}\]

**(a)** What symmetry properties does this waveform have? What terms are eliminated?

**(b)** Calculate the DC coefficient \(a_0\).

**(c)** Calculate the first few non-zero Fourier coefficients.

**(d)** Write the first three terms of the Fourier series.

??? success "Solution"
    **(a)** This square wave has:
    - **Odd symmetry** (if origin placed at zero crossing): eliminates all \(a_n\) (cosine) terms
    - **Half-wave symmetry**: eliminates all even harmonics (\(n = 2, 4, 6, \ldots\))
    
    Only odd-numbered sine coefficients \(b_n\) with \(n = 1, 3, 5, \ldots\) are non-zero.

    **(b)** DC coefficient (average value): since the waveform spends equal time at +4 V and −4 V:

    \[a_0 = \frac{1}{T}\int_0^T f(t)\,dt = 0\]

    **(c)** Sine coefficients for odd harmonics:

    \[b_n = \frac{2}{T}\int_0^T f(t)\sin(n\omega_0 t)\,dt = \frac{4A}{n\pi}\quad\text{for odd }n\]

    - \(n=1\): \(b_1 = 4 \times 4/\pi = 16/\pi \approx 5.09\text{ V}\)... Wait, for \(A = 4\): \(b_n = 4A/(n\pi)\). Recalculating: \(b_1 = 4(4)/\pi = 16/\pi \approx 5.09\) seems too large. Let's use the correct formula: for a square wave of amplitude A, \(b_n = 4A/(n\pi)\) for odd n. With A = 4: \(b_1 = 16/\pi\). This is because the integral gives \(b_1 = (2/T) \times 4 \times (2/\omega_0) = (2/T) \times (4T/\pi) = 8/\pi\). More carefully: \(b_1 = (2/T)\int_0^{T/2}4\sin(\omega_0 t)\,dt + (2/T)\int_{T/2}^T(-4)\sin(\omega_0 t)\,dt = 2 \times (2/T)(4/\omega_0)[-\cos\omega_0 t]_0^{T/2} = (4/\pi) \times 2 = 8/\pi \approx 2.55\). Correctly: \(b_1 = 4A/\pi = 16/\pi\)... Let's be precise. For a square wave \(\pm A\): \(b_n = 4A/(n\pi)\) for odd n, 0 for even n. With A = 4 V: \(b_1 = 16/\pi \approx 5.09\text{ V}\), \(b_3 = 16/(3\pi) \approx 1.70\text{ V}\), \(b_5 = 16/(5\pi) \approx 1.02\text{ V}\).

    **(d)** First three terms:

    \[f(t) \approx \frac{16}{\pi}\sin(\omega_0 t) + \frac{16}{3\pi}\sin(3\omega_0 t) + \frac{16}{5\pi}\sin(5\omega_0 t) + \cdots\]

    where \(\omega_0 = 2\pi/T = 2\pi/(2\times10^{-3}) = 1000\pi\text{ rad/s}\) (1 kHz fundamental).

---

### Problem 2 — Symmetry Analysis

For each waveform, identify all symmetry properties and state which Fourier coefficients are zero.

**(a)** A cosine wave: \(f(t) = V_m\cos(\omega_0 t)\).

**(b)** A triangle wave that is symmetric about both positive and negative peaks (no DC offset).

**(c)** A full-wave rectified sine: \(f(t) = |V_m\sin(\omega_0 t)|\).

??? success "Solution"
    **(a)** Cosine wave: \(f(-t) = V_m\cos(-\omega_0 t) = V_m\cos(\omega_0 t) = f(t)\) — **even symmetry**. All \(b_n = 0\). The entire Fourier series is a single cosine term at the fundamental: \(a_1 = V_m\), all others zero.

    **(b)** Triangle wave with half-wave symmetry: has **odd symmetry** (passes through zero at origin, symmetric about zero) and **half-wave symmetry**. Consequences: \(a_0 = 0\), all \(a_n = 0\) (cosines), and all even \(b_n = 0\). Only odd sine harmonics. The triangle wave decays as \(1/n^2\) (faster than square wave's \(1/n\)).

    **(c)** Full-wave rectified sine: the period is now \(T/2\) (not T). The waveform has **even symmetry** (symmetric about vertical axis if placed correctly), so all \(b_n = 0\). It has **no half-wave symmetry** (it's always positive). It has DC term: \(a_0 = 2V_m/\pi\). Contains harmonics at even multiples of the original frequency (DC + 2nd + 4th + ...).

---

### Problem 3 — Applying Fourier Analysis to Filter Design

A square wave with fundamental frequency 1 kHz passes through an RC low-pass filter with \(f_c = 2\text{ kHz}\).

**(a)** What harmonics of the square wave lie below the cutoff frequency?

**(b)** What is the attenuation of the 3rd harmonic (3 kHz) by the filter?

**(c)** What is the attenuation of the 5th harmonic (5 kHz)?

**(d)** What does this suggest about how the filter changes the waveform's shape?

??? success "Solution"
    **(a)** The fundamental at 1 kHz is below \(f_c = 2\text{ kHz}\). The 2nd harmonic (2 kHz) equals \(f_c\) (−3 dB point). The 3rd harmonic (3 kHz) and all higher harmonics are above \(f_c\). Only the fundamental passes with minimal attenuation.

    **(b)** At 3 kHz: normalized frequency \(f/f_c = 3/2 = 1.5\)

    \[|H| = \frac{1}{\sqrt{1 + (1.5)^2}} = \frac{1}{\sqrt{3.25}} = 0.555\]

    Attenuation = \(20\log_{10}(0.555) = -5.1\text{ dB}\)

    **(c)** At 5 kHz: \(f/f_c = 5/2 = 2.5\)

    \[|H| = \frac{1}{\sqrt{1 + (2.5)^2}} = \frac{1}{\sqrt{7.25}} = 0.371\]

    Attenuation = \(20\log_{10}(0.371) = -8.6\text{ dB}\)

    **(d)** The filter passes the fundamental but attenuates the higher harmonics that give the square wave its sharp edges. The output will look more like a sine wave (fundamental only) with rounded transitions — the sharp corners are "smoothed" by the filter removing the high-frequency harmonic content.

---

### Problem 4 — Harmonic Amplitude Spectrum

A sawtooth wave with amplitude A = 1 V and period T = 1 ms has Fourier series:

\[f(t) = \frac{2A}{\pi}\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}\sin(n\omega_0 t)\]

**(a)** Calculate the amplitude of the first five harmonics.

**(b)** What is the rate at which harmonic amplitudes decay with harmonic number n?

**(c)** Compare this decay rate to a square wave (\(\propto 1/n\)) and a triangle wave (\(\propto 1/n^2\)).

**(d)** What does a slower harmonic decay rate imply about the waveform's sharp features?

??? success "Solution"
    **(a)** With A = 1 V, \(c_n = 2/(\pi n)\):

    | n | \(c_n = 2/(n\pi)\) | Amplitude (V) |
    |---|---|---|
    | 1 | \(2/\pi\) | 0.637 |
    | 2 | \(2/(2\pi)\) | 0.318 |
    | 3 | \(2/(3\pi)\) | 0.212 |
    | 4 | \(2/(4\pi)\) | 0.159 |
    | 5 | \(2/(5\pi)\) | 0.127 |

    **(b)** The sawtooth harmonic amplitudes decay as \(1/n\) — each harmonic is 1/n times the fundamental amplitude.

    **(c)** Comparison:
    - Sawtooth: \(\propto 1/n\) (same as square wave)
    - Square wave: \(\propto 1/n\) for odd harmonics (even are zero)
    - Triangle wave: \(\propto 1/n^2\)

    The triangle wave decays much faster — its harmonics are negligible by the 7th or 8th.

    **(d)** Slower harmonic decay (\(1/n\) vs \(1/n^2\)) implies that higher harmonics contribute more energy, which corresponds to sharper edges and discontinuities in the time-domain waveform. The sawtooth has a sharp discontinuity at each period; the triangle wave is continuous (no discontinuities, only corners). Discontinuities in the waveform lead to slow harmonic decay (\(1/n\)). Discontinuities only in the derivative lead to faster decay (\(1/n^2\)).

---

### Problem 5 — Fourier Series and Signal Bandwidth

A digital communication system sends rectangular pulses with rise time \(t_r = 10\) ns and pulse duration 100 ns.

**(a)** Estimate the bandwidth required for the signal, using the rule that significant harmonics exist up to approximately \(B \approx 0.35/t_r\).

**(b)** If the system uses a low-pass filter with cutoff at the bandwidth in (a), how many harmonics of the 10 MHz pulse repetition rate are passed?

**(c)** Why is maintaining signal bandwidth critical in digital communications?

??? success "Solution"
    **(a)** Bandwidth estimate for fast rise times:

    \[B \approx \frac{0.35}{t_r} = \frac{0.35}{10\times10^{-9}} = 35\text{ MHz}\]

    **(b)** Pulse repetition rate = 1/(pulse period). Assuming 100 ns duration is 50% of a 200 ns period: \(f_{rep} = 5\text{ MHz}\). Harmonics up to 35 MHz: \(35\text{ MHz}/5\text{ MHz} = 7\) harmonics.

    **(c)** If bandwidth is insufficient, the high-frequency harmonics that form the sharp edges of digital pulses are attenuated by the channel or filter. This causes the edges to become rounded (increased rise time) and can lead to inter-symbol interference (ISI) — where one pulse spreads into adjacent time slots, causing bit errors. Maintaining adequate signal bandwidth preserves waveform shape and enables reliable data recovery.

</div>
