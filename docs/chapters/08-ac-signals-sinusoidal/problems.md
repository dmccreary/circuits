---
title: Chapter 8 Practice Problems — AC Signals and Sinusoidal Waveforms
description: Practice problems with solutions for Chapter 8 covering sinusoidal analysis, complex numbers, and signal characterization
---

<div class="unit1-styled" markdown>

# Chapter 8 Practice Problems

## Practice Problems

### Problem 1 — Sinusoidal Parameters

A sinusoidal voltage is given by \(v(t) = 325\cos(314.16t - 30°)\) volts.

**(a)** Identify the peak amplitude, angular frequency, frequency, period, and phase angle.

**(b)** Calculate the RMS voltage.

**(c)** What is the value of \(v\) at t = 0?

**(d)** At what time does the first positive peak occur?

??? success "Solution"
    **(a)** From the equation:

    - Peak amplitude: \(V_m = 325\text{ V}\)
    - Angular frequency: \(\omega = 314.16\text{ rad/s}\)
    - Frequency: \(f = \omega/(2\pi) = 314.16/6.283 = 50\text{ Hz}\)
    - Period: \(T = 1/f = 0.02\text{ s} = 20\text{ ms}\)
    - Phase angle: \(\phi = -30°\) (the signal lags a reference cosine by 30°)

    **(b)** RMS voltage:

    \[V_{rms} = \frac{V_m}{\sqrt{2}} = \frac{325}{\sqrt{2}} = 229.8\text{ V} \approx 230\text{ V}\]

    (This is the European grid voltage.)

    **(c)** At t = 0:

    \[v(0) = 325\cos(-30°) = 325 \times 0.866 = 281.6\text{ V}\]

    **(d)** Peak occurs when \(314.16t - 30° = 0°\), so \(t = 30°/314.16 = (30\pi/180)/314.16 = 0.524/314.16 = 1.667\text{ ms}\).

---

### Problem 2 — Complex Number Operations

Perform the following complex number calculations, expressing results in both rectangular and polar form.

**(a)** \((3 + j4) + (1 - j2)\)

**(b)** \((3 + j4) \times (1 - j2)\)

**(c)** \(\dfrac{10\angle 45°}{2\angle -30°}\)

**(d)** The magnitude and angle of \(Z = 5 + j12\)

??? success "Solution"
    **(a)** Addition (add real and imaginary parts separately):

    \[(3+j4) + (1-j2) = 4 + j2 = \sqrt{4^2+2^2}\angle\arctan(2/4) = \sqrt{20}\angle 26.6° = 4.47\angle 26.6°\]

    **(b)** Multiplication (expand):

    \[(3+j4)(1-j2) = 3 - 6j + 4j - 8j^2 = 3 - 2j + 8 = 11 - 2j\]
    Polar: \(\sqrt{121+4}\angle\arctan(-2/11) = 11.18\angle -10.3°\)

    **(c)** Division in polar form (divide magnitudes, subtract angles):

    \[\frac{10\angle 45°}{2\angle -30°} = 5\angle(45° - (-30°)) = 5\angle 75°\]
    Rectangular: \(5\cos 75° + j5\sin 75° = 1.294 + j4.830\)

    **(d)** Magnitude and angle:

    \[|Z| = \sqrt{5^2 + 12^2} = \sqrt{25+144} = \sqrt{169} = 13\]
    \[\angle Z = \arctan(12/5) = \arctan(2.4) = 67.4°\]

---

### Problem 3 — RMS and Power Calculations

Three voltage signals are:

- \(v_1(t) = 10\sin(2\pi \times 60t)\) V
- \(v_2(t) = 15\cos(2\pi \times 60t + 45°)\) V  
- \(v_3(t) = 5\text{ V}\) (DC)

**(a)** Calculate the RMS value of each signal.

**(b)** Signal \(v_1\) is applied across a 50 Ω resistor. Calculate the average power.

**(c)** A signal has a DC component of 5 V and an AC component with amplitude 10 V. What is the total RMS value?

??? success "Solution"
    **(a)** RMS values:

    - \(V_{1,rms} = 10/\sqrt{2} = 7.07\text{ V}\)
    - \(V_{2,rms} = 15/\sqrt{2} = 10.61\text{ V}\)
    - \(V_{3,rms} = 5\text{ V}\) (DC RMS equals the DC value)

    **(b)** Average power from \(v_1\):

    \[P = \frac{V_{1,rms}^2}{R} = \frac{(7.07)^2}{50} = \frac{50}{50} = 1\text{ W}\]

    **(c)** For a signal with both DC and AC components, the total RMS is:

    \[V_{rms,total} = \sqrt{V_{DC}^2 + V_{AC,rms}^2} = \sqrt{5^2 + (10/\sqrt{2})^2} = \sqrt{25 + 50} = \sqrt{75} = 8.66\text{ V}\]

---

### Problem 4 — Phase Relationships

Two sinusoidal signals are \(v(t) = 10\sin(1000t + 30°)\) V and \(i(t) = 2\sin(1000t - 45°)\) A.

**(a)** What is the phase difference between v and i?

**(b)** Does the voltage lead or lag the current?

**(c)** Express both signals as phasors (peak value form): \(\mathbf{V} = V_m\angle\phi_v\) and \(\mathbf{I} = I_m\angle\phi_i\).

**(d)** What is the impedance \(Z = \mathbf{V}/\mathbf{I}\)?

??? success "Solution"
    **(a)** Phase difference:

    \[\Delta\phi = \phi_v - \phi_i = 30° - (-45°) = 75°\]

    **(b)** Since \(\phi_v > \phi_i\), the voltage **leads** the current by 75°.

    **(c)** Phasor representations:

    \[\mathbf{V} = 10\angle 30°\text{ V}, \qquad \mathbf{I} = 2\angle -45°\text{ A}\]

    **(d)** Impedance:

    \[Z = \frac{\mathbf{V}}{\mathbf{I}} = \frac{10\angle 30°}{2\angle -45°} = 5\angle 75°\ \Omega = 1.294 + j4.83\ \Omega\]

    The positive imaginary part indicates the circuit is inductive.

---

### Problem 5 — Frequency Calculations

A sinusoidal signal completes 3.5 cycles in 70 ms.

**(a)** Calculate the period and frequency.

**(b)** Calculate the angular frequency in rad/s.

**(c)** If the peak amplitude is 8 V, write the mathematical expression for this signal (assuming zero phase, sine form).

**(d)** At t = 15 ms, what is the instantaneous voltage?

??? success "Solution"
    **(a)** Period and frequency:

    \[T = \frac{70\text{ ms}}{3.5} = 20\text{ ms} = 0.020\text{ s}\]
    \[f = \frac{1}{T} = \frac{1}{0.020} = 50\text{ Hz}\]

    **(b)** Angular frequency:

    \[\omega = 2\pi f = 2\pi \times 50 = 314.2\text{ rad/s}\]

    **(c)** Mathematical expression:

    \[v(t) = 8\sin(314.2t)\text{ V}\]

    **(d)** Instantaneous voltage at t = 15 ms:

    \[v(0.015) = 8\sin(314.2 \times 0.015) = 8\sin(4.713) = 8\sin(270°) = 8 \times (-1) = -8\text{ V}\]

    At 15 ms = 0.75T, the signal is at its negative peak. ✓

</div>
