---
title: Chapter 9 Practice Problems — Phasors and Complex Impedance
description: Practice problems with hints for Chapter 9 covering phasor conversion, impedance of R/L/C elements, series and parallel impedance combinations, voltage divider with impedances, and phasor diagrams
---

<div class="unit1-styled" markdown>

# Chapter 9 Practice Problems — Phasors and Complex Impedance

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — Time Domain to Phasor Conversion

Convert the following signals to phasor form and sketch the phasor diagram.

**(a)** \(v_1(t) = 12\cos(2000t + 45°)\) V

**(b)** \(v_2(t) = 8\sin(2000t - 30°)\) V

**(c)** Add \(v_1\) and \(v_2\) in the phasor domain, then write the result as a time-domain cosine expression.

??? tip "Hint"
    **(a)** Drop the \(\cos(\omega t)\) carrier and keep the amplitude and phase: \(\mathbf{V}_1 = 12\angle 45°\).

    **(b)** First convert sine to cosine: \(\sin(\omega t + \theta) = \cos(\omega t + \theta - 90°)\). Then \(\mathbf{V}_2 = 8\angle(-30° - 90°) = 8\angle{-120°}\).

    **(c)** Convert both phasors to rectangular form, add real parts and imaginary parts separately, then convert back to polar. The result \(\mathbf{V}_{total} = A\angle\phi\) maps to \(v(t) = A\cos(2000t + \phi)\). Remember both signals share the same frequency \(\omega = 2000\) rad/s.

---

## Problem 2 — Component Impedances and the Impedance Triangle

A series RC circuit has \(R = 60\) Ω and \(C = 22\) μF. The source frequency is \(f = 120\) Hz.

**(a)** Find the impedance of the capacitor \(Z_C\) at this frequency.

**(b)** Find the total series impedance \(Z_{total}\) in rectangular and polar form.

**(c)** If the source is \(v_s(t) = 170\cos(2\pi \cdot 120 \cdot t)\) V, find the phasor current \(\mathbf{I}\) and write the time-domain expression \(i(t)\).

??? tip "Hint"
    **(a)** First compute \(\omega = 2\pi f\). Capacitor impedance is \(Z_C = \frac{1}{j\omega C} = -\frac{j}{\omega C}\). Evaluate numerically.

    **(b)** Series impedances add: \(Z_{total} = R + Z_C = R - jX_C\). Magnitude is \(|Z| = \sqrt{R^2 + X_C^2}\) and angle is \(\theta = \arctan(-X_C/R)\) — negative because the circuit is capacitive.

    **(c)** The source phasor is \(\mathbf{V}_s = 170\angle 0°\). By Ohm's law in the phasor domain, \(\mathbf{I} = \mathbf{V}_s / Z_{total}\). Divide the magnitudes and subtract the phase angles. Convert back to time domain using \(i(t) = I_m\cos(\omega t + \phi_I)\).

---

## Problem 3 — Parallel Impedance Combination

An inductor \(L = 50\) mH and a resistor \(R = 200\) Ω are connected in parallel. The operating frequency is \(f = 500\) Hz.

**(a)** Find the impedance of the inductor \(Z_L\).

**(b)** Find the parallel equivalent impedance \(Z_{parallel}\) using the product-over-sum rule. Express in rectangular form.

**(c)** A current source \(\mathbf{I}_s = 0.1\angle 0°\) A drives the parallel combination. Find the voltage across the parallel combination and the current through the inductor alone.

??? tip "Hint"
    **(a)** \(Z_L = j\omega L\). Compute \(\omega = 2\pi f\) and evaluate.

    **(b)** For two impedances in parallel: \(Z_p = \frac{Z_R \cdot Z_L}{Z_R + Z_L}\). Multiply numerator and denominator, then rationalize by multiplying by the complex conjugate of the denominator.

    **(c)** The voltage across the parallel combination is \(\mathbf{V} = \mathbf{I}_s \cdot Z_{parallel}\). Then apply Ohm's law to the inductor alone: \(\mathbf{I}_L = \mathbf{V} / Z_L\). You can verify by current divider: \(\mathbf{I}_L = \mathbf{I}_s \cdot \frac{Z_R}{Z_R + Z_L}\).

---

## Problem 4 — Phasor Voltage Divider

A series RLC circuit has \(R = 100\) Ω, \(L = 80\) mH, and \(C = 10\) μF. The source voltage is \(\mathbf{V}_s = 50\angle 0°\) V at \(\omega = 1000\) rad/s.

**(a)** Find \(Z_R\), \(Z_L\), and \(Z_C\) at \(\omega = 1000\) rad/s.

**(b)** Find the total impedance \(Z_{total}\) and the phasor current \(\mathbf{I}\).

**(c)** Using the phasor voltage divider, find the voltage across the capacitor \(\mathbf{V}_C\). Express the result in polar form and convert back to a time-domain expression.

??? tip "Hint"
    **(a)** \(Z_R = R\), \(Z_L = j\omega L\), \(Z_C = 1/(j\omega C) = -j/(\omega C)\). Evaluate each numerically.

    **(b)** \(Z_{total} = Z_R + Z_L + Z_C\). Combine the imaginary parts (one positive, one negative). Then \(\mathbf{I} = \mathbf{V}_s / Z_{total}\).

    **(c)** The voltage divider formula gives \(\mathbf{V}_C = \mathbf{V}_s \cdot \frac{Z_C}{Z_{total}}\). Alternatively, \(\mathbf{V}_C = \mathbf{I} \cdot Z_C\). Note that at \(\omega = 1000\) rad/s the reactances may not cancel (this is not necessarily the resonant frequency), so \(|\mathbf{V}_C|\) need not equal \(|\mathbf{V}_s|\).

---

</div>
