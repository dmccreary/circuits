---
title: Chapter 14 Practice Problems — Signal Analysis and Fourier Series
description: Practice problems with hints for Chapter 14 covering Fourier series coefficients, harmonic content of standard waveforms, bandwidth, signal power from spectrum, and dB conversions
---

<div class="unit1-styled" markdown>

# Chapter 14 Practice Problems — Signal Analysis and Fourier Series

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — Fourier Coefficients of a Rectangular Pulse Train

A rectangular pulse train has period \(T = 1\) ms and amplitude \(A = 4\) V. The signal is high (\(+4\) V) for the first quarter of each period and zero for the remaining three-quarters.

**(a)** Find the DC coefficient \(a_0\) (the average value).

**(b)** Find a general expression for the sine coefficients \(b_n\). Identify which harmonics have zero coefficient.

**(c)** Evaluate \(b_1\), \(b_2\), and \(b_3\). Which harmonic has the largest amplitude?

??? tip "Hint"
    **(a)** The average value is simply the area of the pulse per period: \(a_0 = \frac{1}{T}\int_0^T f(t)\,dt = \frac{A \cdot (T/4)}{T} = A/4\). The signal is on for 25% of the period.

    **(b)** Evaluate \(b_n = \frac{2}{T}\int_0^{T/4} A\sin(n\omega_0 t)\,dt\). The integral gives \(b_n = \frac{2A}{n\pi}\sin^2(n\pi/4)\cdot 2\) — or work through it carefully. Harmonics where \(\sin(n\omega_0 t)\) integrates to zero over the pulse interval have \(b_n = 0\).

    **(c)** Substitute \(n = 1, 2, 3\) into your expression. The fundamental (\(n = 1\)) typically dominates, but check each value. Note that the duty cycle (25%) shifts which harmonics are suppressed compared to a 50% duty cycle square wave.

---

## Problem 2 — Harmonic Content and Symmetry

Identify all symmetry properties of each waveform and state which Fourier coefficients are guaranteed to be zero.

**(a)** A square wave that alternates between \(+5\) V and \(-5\) V with 50% duty cycle, centered so that it crosses zero at \(t = 0\) on a rising edge.

**(b)** A triangle wave with peaks at \(+2\) V and \(-2\) V, with its positive peak at \(t = 0\).

**(c)** A sawtooth wave that ramps from \(-3\) V to \(+3\) V and then resets abruptly, with the reset occurring at \(t = 0\).

??? tip "Hint"
    **(a)** Check for odd symmetry: \(f(-t) = -f(t)\)? If yes, then \(a_0 = 0\) and all \(a_n = 0\) (no DC, no cosine terms). Also check half-wave symmetry: \(f(t + T/2) = -f(t)\)? If yes, all even harmonics vanish.

    **(b)** If the peak is at \(t = 0\), the triangle is symmetric about the vertical axis: \(f(-t) = f(t)\). This is even symmetry, which means all \(b_n = 0\). Does it also have half-wave symmetry? If so, even harmonics vanish as well.

    **(c)** A sawtooth through the origin with the reset at \(t = 0\) has odd symmetry (\(f(-t) = -f(t)\)), so \(a_0 = 0\) and \(a_n = 0\). However, it does not have half-wave symmetry, so both odd and even harmonics appear. All harmonics are present as sine terms only.

---

## Problem 3 — Signal Power and RMS from Spectrum

A periodic signal has the following Fourier amplitude spectrum: fundamental amplitude \(c_1 = 6\) V, third harmonic \(c_3 = 2\) V, fifth harmonic \(c_5 = 1.2\) V, all higher harmonics negligible. The signal has no DC component.

**(a)** Using Parseval's theorem, calculate the total average power delivered to a 1 Ω resistor.

**(b)** What fraction of the total power is carried by the fundamental?

**(c)** A low-pass filter passes only the fundamental frequency. The output of the filter drives a 50 Ω load. What is the RMS voltage across the load?

??? tip "Hint"
    **(a)** Parseval's theorem states the average power into 1 Ω equals \(P = a_0^2 + \frac{1}{2}\sum c_n^2\). With \(a_0 = 0\), compute \(P = \frac{1}{2}(c_1^2 + c_3^2 + c_5^2)\). The factor of \(\frac{1}{2}\) converts peak amplitude to RMS power.

    **(b)** The power in the fundamental alone is \(P_1 = \frac{1}{2}c_1^2\). Divide by \(P_{total}\) from part (a) and express as a percentage.

    **(c)** After the filter, only the fundamental \(c_1\cos(\omega_0 t)\) remains. Its RMS voltage is \(V_{rms} = c_1/\sqrt{2}\). This RMS value is independent of the load (it is the open-circuit voltage). If the source driving the filter has negligible output impedance, the full RMS voltage appears across the 50 Ω load.

---

## Problem 4 — Decibel Conversions and Bandwidth

A system's frequency response is described by the following measurements: the output is 5 V at 100 Hz, 5 V at 1 kHz (reference), 3.54 V at 10 kHz, and 0.5 V at 100 kHz.

**(a)** Convert each output voltage to dB relative to the 1 kHz reference using \(A_{dB} = 20\log_{10}(V_{out}/V_{ref})\).

**(b)** Identify the approximate bandwidth of this system, defined as the range of frequencies where the response is within −3 dB of the reference.

**(c)** If the input power to this system is 10 mW and the output power is 2.5 W, calculate the power gain in dB. How does this relate to the voltage gain in dB if the input and output impedances are both 50 Ω?

??? tip "Hint"
    **(a)** At the reference (1 kHz): \(A_{dB} = 20\log_{10}(1) = 0\) dB. For 3.54 V: \(20\log_{10}(3.54/5) \approx 20\log_{10}(0.707) = -3\) dB. Note that 0.707 is \(1/\sqrt{2}\), the classical half-power point.

    **(b)** The −3 dB bandwidth runs from the lower frequency where the response first drops to 0.707 of its peak to the upper frequency where it drops again. Find these crossover points from your dB values in (a).

    **(c)** Power gain in dB is \(G_{dB} = 10\log_{10}(P_{out}/P_{in})\). If input and output impedances are equal, voltage gain and power gain differ only by a factor: \(G_P = V_{out}^2 R_{in} / (V_{in}^2 R_{out})\). With equal impedances the ratio simplifies and \(G_{dB}(power) = 20\log_{10}(V_{out}/V_{in})\) — the same formula as voltage gain in dB.

---

</div>
