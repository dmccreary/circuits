---
title: Chapter 7 Practice Problems — Second-Order RLC Circuits
description: Practice problems with solutions for Chapter 7 covering RLC circuits, damping, natural frequency, and resonance
---

<div class="unit1-styled" markdown>

# Chapter 7 Practice Problems

## Practice Problems

### Problem 1 — Series RLC Parameters

A series RLC circuit has R = 10 Ω, L = 100 mH, C = 10 μF.

**(a)** Calculate the undamped natural frequency \(\omega_0\) (in rad/s) and \(f_0\) (in Hz).

**(b)** Calculate the damping coefficient \(\alpha\).

**(c)** Classify the response as overdamped, critically damped, or underdamped.

**(d)** Calculate the quality factor Q and bandwidth.

??? success "Solution"
    **(a)** Natural frequency:

    \[\omega_0 = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{0.1 \times 10 \times 10^{-6}}} = \frac{1}{\sqrt{10^{-6}}} = 1000\text{ rad/s}\]
    \[f_0 = \frac{\omega_0}{2\pi} = \frac{1000}{6.283} = 159.2\text{ Hz}\]

    **(b)** Damping coefficient for series RLC:

    \[\alpha = \frac{R}{2L} = \frac{10}{2 \times 0.1} = 50\text{ rad/s}\]

    **(c)** Since \(\alpha = 50 < \omega_0 = 1000\), the circuit is **underdamped**. Damping ratio: \(\zeta = \alpha/\omega_0 = 50/1000 = 0.05\).

    **(d)** Quality factor and bandwidth:

    \[Q = \frac{\omega_0 L}{R} = \frac{1000 \times 0.1}{10} = 10\]
    \[\text{BW} = \frac{f_0}{Q} = \frac{159.2}{10} = 15.9\text{ Hz}\]

---

### Problem 2 — Critical Damping Design

A series RLC circuit has L = 50 mH and C = 100 nF.

**(a)** What value of R produces critical damping?

**(b)** What is the natural frequency of this circuit?

**(c)** With R found in (a), write the step response form (leaving constants A1 and A2 to be determined by initial conditions).

??? success "Solution"
    **(a)** Natural frequency first: \(\omega_0 = 1/\sqrt{LC} = 1/\sqrt{0.05 \times 100\times10^{-9}} = 1/\sqrt{5\times10^{-9}} = 14{,}142\text{ rad/s}\)

    Critical damping requires \(\alpha = \omega_0\):

    \[\frac{R}{2L} = \omega_0 \Rightarrow R = 2L\omega_0 = 2 \times 0.05 \times 14{,}142 = 1{,}414\text{ Ω}\]

    **(b)** \(f_0 = 14{,}142 / (2\pi) = 2{,}251\text{ Hz} \approx 2.25\text{ kHz}\)

    **(c)** For critical damping, the step response form is:

    \[x(t) = x(\infty) + (A_1 + A_2 t)e^{-\alpha t}\]

    where \(\alpha = \omega_0 = 14{,}142\text{ rad/s}\) and \(A_1, A_2\) are determined from initial conditions \(x(0^+)\) and \(\dot{x}(0^+)\).

---

### Problem 3 — Underdamped Step Response

A series RLC circuit has R = 5 Ω, L = 100 mH, C = 25 μF. A 10 V step is applied at t = 0 (zero initial conditions).

**(a)** Calculate \(\omega_0\), \(\alpha\), and \(\omega_d\).

**(b)** Determine the damping ratio \(\zeta\) and percent overshoot.

**(c)** Estimate the settling time (±2% criterion: \(t_s \approx 4/\alpha\)).

??? success "Solution"
    **(a)** Circuit parameters:

    \[\omega_0 = \frac{1}{\sqrt{0.1 \times 25\times10^{-6}}} = \frac{1}{\sqrt{2.5\times10^{-6}}} = 632.5\text{ rad/s}\]
    \[\alpha = \frac{R}{2L} = \frac{5}{0.2} = 25\text{ rad/s}\]
    \[\omega_d = \sqrt{\omega_0^2 - \alpha^2} = \sqrt{632.5^2 - 25^2} = \sqrt{400{,}006 - 625} = \sqrt{399{,}381} = 631.9\text{ rad/s}\]

    **(b)** Damping ratio and overshoot:

    \[\zeta = \frac{\alpha}{\omega_0} = \frac{25}{632.5} = 0.0395\]
    \[\%\text{OS} = 100\,e^{-\pi \times 0.0395/\sqrt{1-0.0395^2}} = 100\,e^{-0.124} = 100 \times 0.883 = 88.3\%\]

    This very low damping ratio produces extreme overshoot — the circuit nearly oscillates without decay.

    **(c)** Settling time:

    \[t_s \approx \frac{4}{\alpha} = \frac{4}{25} = 0.16\text{ s}\]

---

### Problem 4 — Resonance in Series RLC

A series RLC band-pass filter has L = 10 mH, C = 250 pF, R = 20 Ω.

**(a)** Calculate the resonant frequency in Hz.

**(b)** Calculate the quality factor Q.

**(c)** Calculate the 3 dB bandwidth.

**(d)** At resonance, what is the impedance of the circuit?

??? success "Solution"
    **(a)** Resonant frequency:

    \[\omega_0 = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{10\times10^{-3} \times 250\times10^{-12}}} = \frac{1}{\sqrt{2.5\times10^{-12}}} = 632{,}456\text{ rad/s}\]
    \[f_0 = \frac{632{,}456}{2\pi} = 100{,}658\text{ Hz} \approx 100.7\text{ kHz}\]

    **(b)** Quality factor:

    \[Q = \frac{\omega_0 L}{R} = \frac{632{,}456 \times 0.01}{20} = \frac{6{,}325}{20} = 316\]

    **(c)** Bandwidth:

    \[\text{BW} = \frac{f_0}{Q} = \frac{100{,}658}{316} = 318.5\text{ Hz}\]

    **(d)** At resonance, \(Z_L = j\omega_0 L\) and \(Z_C = 1/(j\omega_0 C)\) are equal and opposite, so they cancel. Total impedance = R = 20 Ω (purely resistive).

---

### Problem 5 — Parallel RLC Circuit

A parallel RLC circuit has R = 1 kΩ, L = 5 mH, C = 200 pF.

**(a)** Calculate the resonant frequency and damping coefficient for the parallel configuration (\(\alpha = 1/(2RC)\)).

**(b)** Calculate Q and bandwidth.

**(c)** At resonance, what is the admittance of the circuit? What current flows from the source if 10 V is applied?

??? success "Solution"
    **(a)** Resonant frequency:

    \[\omega_0 = \frac{1}{\sqrt{5\times10^{-3} \times 200\times10^{-12}}} = \frac{1}{\sqrt{10^{-12}}} = 10^6\text{ rad/s}\]
    \[f_0 = \frac{10^6}{2\pi} = 159.2\text{ kHz}\]

    Parallel RLC damping coefficient:

    \[\alpha = \frac{1}{2RC} = \frac{1}{2 \times 1000 \times 200\times10^{-12}} = \frac{1}{400\times10^{-9}} = 2.5\times10^6\text{ rad/s}\]

    **(b)** Since \(\alpha > \omega_0\), this is overdamped. \(Q = \omega_0/(2\alpha) = 10^6/(5\times10^6) = 0.2\).

    **(c)** At resonance, \(Z_L\) and \(Z_C\) cancel in the parallel combination (they present a very high combined impedance). The circuit reduces to R. Admittance \(Y = 1/R = 1/1000 = 1\text{ mS}\). Current: \(I = V \times Y = 10 \times 10^{-3} = 10\text{ mA}\).

</div>
