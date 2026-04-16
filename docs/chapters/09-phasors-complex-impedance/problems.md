---
title: Chapter 9 Practice Problems — Phasors and Complex Impedance
description: Practice problems with solutions for Chapter 9 covering phasors, impedance, and AC circuit analysis
---

<div class="unit1-styled" markdown>

# Chapter 9 Practice Problems

## Practice Problems

### Problem 1 — Impedance of Components

Calculate the impedance of each component at the specified frequency. Express in rectangular (\(R + jX\)) and polar (\(|Z|\angle\theta\)) form.

**(a)** Resistor R = 1 kΩ at any frequency.

**(b)** Capacitor C = 100 nF at f = 1 kHz.

**(c)** Inductor L = 10 mH at f = 5 kHz.

**(d)** The series combination of R = 100 Ω and C = 10 μF at f = 200 Hz.

??? success "Solution"
    **(a)** Resistor: \(Z_R = R + j0 = 1000\angle 0°\ \Omega\)

    **(b)** Capacitor at 1 kHz: \(\omega = 2\pi \times 1000 = 6283\text{ rad/s}\)

    \[Z_C = \frac{1}{j\omega C} = \frac{1}{j \times 6283 \times 100\times10^{-9}} = \frac{1}{j\, 6.283\times10^{-4}} = -j\, 1592\text{ Ω} = 1592\angle -90°\ \Omega\]

    **(c)** Inductor at 5 kHz: \(\omega = 2\pi \times 5000 = 31{,}416\text{ rad/s}\)

    \[Z_L = j\omega L = j \times 31{,}416 \times 0.01 = j\, 314.2\text{ Ω} = 314.2\angle 90°\ \Omega\]

    **(d)** Series RC at 200 Hz: \(\omega = 2\pi \times 200 = 1257\text{ rad/s}\)

    \[Z_C = \frac{1}{j \times 1257 \times 10\times10^{-6}} = -j\, 79.6\text{ Ω}\]
    \[Z_{total} = R + Z_C = 100 - j\, 79.6\text{ Ω}\]
    \[|Z| = \sqrt{100^2 + 79.6^2} = \sqrt{10000 + 6336} = \sqrt{16{,}336} = 127.8\text{ Ω}\]
    \[\theta = \arctan(-79.6/100) = -38.5°\]

---

### Problem 2 — Series RLC Circuit Analysis

A series circuit has R = 50 Ω, L = 20 mH, C = 5 μF. A source \(v_s = 10\cos(2000t)\) V is applied.

**(a)** Calculate the impedances of R, L, and C at \(\omega = 2000\text{ rad/s}\).

**(b)** Find the total impedance.

**(c)** Find the phasor current \(\mathbf{I}\).

**(d)** Find the phasor voltage across each element.

??? success "Solution"
    **(a)** Impedances at \(\omega = 2000\text{ rad/s}\):

    \[Z_R = 50\text{ Ω}, \quad Z_L = j(2000)(0.02) = j40\text{ Ω}, \quad Z_C = \frac{1}{j(2000)(5\times10^{-6})} = -j100\text{ Ω}\]

    **(b)** Total impedance:

    \[\mathbf{Z}_{total} = 50 + j40 - j100 = 50 - j60\text{ Ω} = \sqrt{50^2+60^2}\angle\arctan(-60/50) = 78.1\angle -50.2°\ \Omega\]

    **(c)** Source phasor: \(\mathbf{V}_s = 10\angle 0°\text{ V}\)

    \[\mathbf{I} = \frac{\mathbf{V}_s}{\mathbf{Z}} = \frac{10\angle 0°}{78.1\angle -50.2°} = 0.128\angle 50.2°\text{ A}\]

    **(d)** Voltages across each element:

    \[\mathbf{V}_R = \mathbf{I} Z_R = 0.128\angle 50.2° \times 50 = 6.40\angle 50.2°\text{ V}\]
    \[\mathbf{V}_L = \mathbf{I} Z_L = 0.128\angle 50.2° \times 40\angle 90° = 5.12\angle 140.2°\text{ V}\]
    \[\mathbf{V}_C = \mathbf{I} Z_C = 0.128\angle 50.2° \times 100\angle -90° = 12.8\angle -39.8°\text{ V}\]

---

### Problem 3 — Phasor Domain Ohm's Law

A voltage \(\mathbf{V} = 120\angle 30°\text{ V}\) (RMS) is applied across an impedance \(\mathbf{Z} = 40 + j30\text{ Ω}\).

**(a)** Find the current phasor \(\mathbf{I}\).

**(b)** Find the phase angle between voltage and current.

**(c)** Write the time-domain expression for the current (assuming 60 Hz).

??? success "Solution"
    **(a)** Convert impedance to polar: \(|Z| = \sqrt{40^2+30^2} = \sqrt{2500} = 50\text{ Ω}\), \(\theta_Z = \arctan(30/40) = 36.87°\)

    \[\mathbf{I} = \frac{\mathbf{V}}{\mathbf{Z}} = \frac{120\angle 30°}{50\angle 36.87°} = 2.4\angle -6.87°\text{ A (RMS)}\]

    **(b)** Phase difference: The voltage leads the current by \(30° - (-6.87°) = 36.87°\). This equals \(\arctan(30/40)\), confirming the inductive circuit.

    **(c)** Time-domain at 60 Hz (converting RMS phasor to peak):

    \[i(t) = 2.4\sqrt{2}\cos(2\pi\times60\,t - 6.87°) = 3.394\cos(377t - 6.87°)\text{ A}\]

---

### Problem 4 — Voltage Divider with Impedances

A voltage source \(V_s = 10\angle 0°\text{ V}\) drives a series circuit with \(Z_1 = 100\ \Omega\) (resistor) and \(Z_2 = -j100\ \Omega\) (capacitor).

**(a)** Find the output voltage \(\mathbf{V}_{out}\) across \(Z_2\) using the voltage divider formula.

**(b)** Find the magnitude and phase of \(\mathbf{V}_{out}\).

**(c)** What is this circuit? (Identify filter type.)

**(d)** At what frequency would \(|V_{out}| = V_s / \sqrt{2}\) (the −3 dB point)?

??? success "Solution"
    **(a)** Voltage divider:

    \[\mathbf{V}_{out} = V_s \cdot \frac{Z_2}{Z_1 + Z_2} = 10\angle 0° \cdot \frac{-j100}{100 - j100}\]

    **(b)** Denominator magnitude: \(|100 - j100| = 100\sqrt{2} = 141.4\), angle = \(-45°\)

    \[\mathbf{V}_{out} = 10 \cdot \frac{100\angle -90°}{141.4\angle -45°} = 10 \times \frac{100}{141.4}\angle(-90° + 45°) = 7.07\angle -45°\text{ V}\]

    **(c)** This is an RC **low-pass filter** — the output is taken across the capacitor, which passes low frequencies and attenuates high frequencies.

    **(d)** The −3 dB point occurs where \(|Z_C| = |Z_R|\), i.e., \(1/(\omega C) = R\):

    \[\omega_c = \frac{1}{RC} = \frac{1}{100 \times C}\]

    Since \(Z_C = -j100\text{ Ω}\) at the operating frequency means \(1/(\omega C) = 100\), so \(\omega C = 0.01\text{ S}\). The −3 dB point is at this same \(\omega\) when R also equals 100 Ω, confirming the analysis. \(f_c = \omega_c/(2\pi)\).

---

### Problem 5 — Resonance Calculation

A series RLC circuit is tuned to resonate at 100 kHz. The capacitor is 100 pF. The circuit has Q = 50.

**(a)** Find the required inductance L.

**(b)** Find the resistance R.

**(c)** Find the 3 dB bandwidth in Hz.

**(d)** At resonance, what is the voltage across the capacitor if 1 V is applied to the series circuit?

??? success "Solution"
    **(a)** From \(\omega_0 = 1/\sqrt{LC}\): \(\omega_0 = 2\pi \times 10^5 = 628{,}318\text{ rad/s}\)

    \[L = \frac{1}{\omega_0^2 C} = \frac{1}{(628{,}318)^2 \times 100\times10^{-12}} = \frac{1}{3.948\times10^{13} \times 10^{-10}} = \frac{1}{3948} = 253.3\ \mu\text{H}\]

    **(b)** From \(Q = \omega_0 L / R\):

    \[R = \frac{\omega_0 L}{Q} = \frac{628{,}318 \times 253.3\times10^{-6}}{50} = \frac{159.2}{50} = 3.18\ \Omega\]

    **(c)** Bandwidth:

    \[\text{BW} = \frac{f_0}{Q} = \frac{100{,}000}{50} = 2{,}000\text{ Hz} = 2\text{ kHz}\]

    **(d)** At resonance, the voltage across the capacitor (or inductor) is Q times the applied voltage:

    \[V_C = Q \times V_{in} = 50 \times 1\text{ V} = 50\text{ V}\]

    This Q-factor voltage magnification is the basis of selectivity in radio receivers and can be used for impedance matching.

</div>
