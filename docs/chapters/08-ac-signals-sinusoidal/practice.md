---
title: Chapter 8 Practice Problems — AC Signals and Sinusoidal Waveforms
description: Practice problems with hints for Chapter 8 covering sinusoidal parameters, RMS values, phase relationships, phasor representation, and frequency-domain concepts
---

<div class="unit1-styled" markdown>

# Chapter 8 Practice Problems — AC Signals and Sinusoidal Waveforms

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — Sinusoidal Parameters

A voltage signal is given by \(v(t) = 8\sin(500\pi t - 30°)\) volts.

**(a)** Identify the peak amplitude \(V_m\), angular frequency \(\omega\), frequency \(f\), period \(T\), and phase angle \(\phi\).

**(b)** Calculate the RMS voltage.

**(c)** Write the equivalent cosine expression for this signal. (Recall: \(\sin\theta = \cos(\theta - 90°)\).)

??? tip "Hint"
    **(a)** Match the signal to the general form \(v(t) = V_m \sin(\omega t + \phi)\): the coefficient of t inside the sine gives \(\omega\). Then \(f = \omega/(2\pi)\) and \(T = 1/f\). The phase is the constant term in the argument.

    **(b)** For any sinusoid: \(V_{rms} = V_m / \sqrt{2}\). This factor of \(\sqrt{2} \approx 1.414\) appears because the sinusoid's squared average equals half its peak squared.

    **(c)** Use the identity \(\sin(\theta) = \cos(\theta - 90°)\). Add −90° to the existing phase angle to convert the sine to a cosine form.

---

## Problem 2 — RMS Values and Power

A sinusoidal current \(i(t) = 5\cos(120\pi t + 45°)\) A flows through a 10 Ω resistor.

**(a)** Find the RMS current \(I_{rms}\).

**(b)** Calculate the average power dissipated in the resistor using \(P = I_{rms}^2 R\).

**(c)** What peak current would a DC source need to dissipate the same average power in the same resistor? Compare this to the AC peak current and explain the factor you observe.

??? tip "Hint"
    **(a)** The cosine form has the same RMS formula as sine: \(I_{rms} = I_m / \sqrt{2}\) where \(I_m = 5\) A. Phase has no effect on RMS.

    **(b)** Use \(P = I_{rms}^2 R\). This is the average (not instantaneous) power and is what a wattmeter would read.

    **(c)** For DC, \(P = I_{DC}^2 R\), so \(I_{DC} = \sqrt{P/R} = I_{rms}\). The DC equivalent current equals the RMS current — that is precisely the definition of RMS: the equivalent DC that delivers the same power.

---

## Problem 3 — Phase Relationships

Two sinusoidal voltage signals share the same frequency \(f = 1\) kHz:

\[v_1(t) = 10\sin(2\pi \cdot 1000 \cdot t)\text{ V}\]
\[v_2(t) = 10\sin(2\pi \cdot 1000 \cdot t + 60°)\text{ V}\]

**(a)** Which signal leads and by how many degrees? By how many milliseconds?

**(b)** Represent each signal as a phasor in polar form using its RMS amplitude and phase angle.

**(c)** Using the phasor representations, add the two phasors. Convert to rectangular form, add, and express the result in polar form. Then write the corresponding time-domain expression.

??? tip "Hint"
    **(a)** The signal with the larger (more positive) phase angle leads. The time delay between them is \(\Delta t = \Delta\phi / (360° \cdot f)\).

    **(b)** The phasor magnitude is the RMS value: \(V_{rms} = V_m/\sqrt{2} \approx 7.07\) V. The phase angle is taken directly from the time-domain expression. Phasors: \(\mathbf{V_1} = 7.07\angle 0°\) V and \(\mathbf{V_2} = 7.07\angle 60°\) V.

    **(c)** Convert each phasor to rectangular form (\(a + jb\)), add real and imaginary parts separately, then convert back to polar (\(r\angle\theta\)). The time-domain sum uses the peak amplitude \(V_m = r\sqrt{2}\) and the phase from the polar result.

---

## Problem 4 — Frequency Spectrum of Non-Sinusoidal Waveforms

A square wave with peak amplitude 4 V and fundamental frequency \(f_1 = 1\) kHz can be approximated by its Fourier series:

\[v(t) = \frac{16}{\pi}\left[\sin(2\pi f_1 t) + \frac{1}{3}\sin(2\pi \cdot 3f_1 \cdot t) + \frac{1}{5}\sin(2\pi \cdot 5f_1 \cdot t) + \cdots\right]\]

**(a)** Identify the frequencies, amplitudes, and periods of the first three harmonic components.

**(b)** Calculate the RMS value of the first harmonic (fundamental) alone.

**(c)** At what frequency does the 7th harmonic occur, and what is its amplitude? Explain in one sentence why higher harmonics have smaller amplitudes.

??? tip "Hint"
    **(a)** The fundamental is at \(f_1\), the third harmonic at \(3f_1\), and the fifth harmonic at \(5f_1\). The amplitude of the nth harmonic is \(\frac{16}{\pi n}\) (for odd n only — the square wave contains only odd harmonics). The period of each harmonic is \(T = 1/f\).

    **(b)** RMS of the fundamental: \(V_{rms,1} = A_1/\sqrt{2}\) where \(A_1 = 16/\pi\) V. This is the same formula as for a pure sinusoid.

    **(c)** The 7th harmonic is at \(7f_1 = 7\) kHz with amplitude \(16/(\pi \cdot 7)\) V. Higher harmonics have smaller amplitudes because a square wave's sharp transitions contain mostly low-frequency energy; the high-frequency components are responsible only for the steepness of the edges and contribute progressively less to the overall waveform shape.

---

</div>
