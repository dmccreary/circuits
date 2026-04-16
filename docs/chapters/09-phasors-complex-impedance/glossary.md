---
title: Chapter 9 Glossary — Phasors and Complex Impedance
description: Key terms and definitions for Chapter 9
---

<div class="unit1-styled" markdown>

# Chapter 9 Glossary

| Term | Definition |
|------|-----------|
| Phasor | A complex number representing the amplitude and phase of a sinusoidal signal. For a sinusoid \(v(t) = V_m\cos(\omega t + \phi)\), the phasor is \(\mathbf{V} = V_m\angle\phi\). Phasors strip away the time variation, converting sinusoidal differential equations into algebraic equations that can be solved with complex arithmetic. |
| Phasor diagram | A graphical representation of multiple phasors on the complex plane, showing their relative magnitudes and phase angles. Phasor diagrams make phase relationships between voltages and currents visually apparent. Commonly used to illustrate KVL (voltage phasors sum to zero) and KCL (current phasors sum to zero). |
| Phasor addition | The addition of two sinusoidal signals at the same frequency is accomplished by adding their phasors as complex numbers. Rectangular form: add real and imaginary parts. Polar form: convert to rectangular first. The result gives the amplitude and phase of the combined signal. |
| Impedance | The generalization of resistance to AC circuits, defined as \(\mathbf{Z} = \mathbf{V}/\mathbf{I}\) in the phasor domain, where \(\mathbf{V}\) and \(\mathbf{I}\) are voltage and current phasors. Measured in ohms (Ω). Impedance is a complex quantity: \(\mathbf{Z} = R + jX\), where R is resistance and X is reactance. |
| Reactance | The imaginary part of impedance \(\mathbf{Z} = R + jX\), representing the opposition to AC current due to energy storage in capacitors or inductors. Capacitive reactance: \(X_C = -1/(\omega C)\) (negative). Inductive reactance: \(X_L = \omega L\) (positive). Unlike resistance, reactance does not dissipate energy. |
| Capacitive reactance | The reactance of a capacitor: \(X_C = 1/(\omega C) = 1/(2\pi f C)\), measured in ohms. Decreases with increasing frequency — capacitors pass high-frequency signals and block low-frequency or DC signals. The capacitor impedance is \(Z_C = -jX_C = 1/(j\omega C)\). |
| Inductive reactance | The reactance of an inductor: \(X_L = \omega L = 2\pi f L\), measured in ohms. Increases with increasing frequency — inductors block high-frequency signals and pass low-frequency or DC signals. The inductor impedance is \(Z_L = jX_L = j\omega L\). |
| Admittance | The reciprocal of impedance: \(\mathbf{Y} = 1/\mathbf{Z} = G + jB\), measured in siemens (S). The real part G is conductance and the imaginary part B is susceptance. Admittances in parallel add directly, just as conductances add in DC circuits. |
| Susceptance | The imaginary part of admittance \(\mathbf{Y} = G + jB\), defined as \(B = -X/|Z|^2\). Capacitive susceptance is positive; inductive susceptance is negative. Susceptance represents the reactive (energy-storage) component of admittance. |
| Impedance triangle | A right triangle relating resistance, reactance, and impedance magnitude: \(|Z|^2 = R^2 + X^2\). The angle \(\theta = \arctan(X/R)\) is the phase angle between current and voltage. Positive \(\theta\) indicates inductive; negative indicates capacitive. |
| Complex impedance | The full complex representation of impedance \(\mathbf{Z} = R + jX\), combining resistive dissipation (R) and reactive energy storage (X) in a single complex number. Allows all DC circuit analysis techniques (Ohm's law, KCL, KVL, series/parallel combinations, mesh and node analysis) to be applied directly to AC circuits. |
| Phasor domain | The frequency-domain representation in which time-domain sinusoidal signals are replaced by phasors and component V-I relationships become algebraic: \(\mathbf{V} = \mathbf{Z}\mathbf{I}\). All linear circuit analysis methods apply in the phasor domain. Converting back to time domain: multiply by \(e^{j\omega t}\) and take the real part. |
| Series resonance | The condition in a series RLC circuit where inductive and capacitive reactances cancel: \(X_L = X_C\), or equivalently \(\omega_0 = 1/\sqrt{LC}\). At resonance, the impedance is minimum (equals R), the current is maximum, and voltage and current are in phase. The circuit passes signals at \(f_0\) and rejects others. |
| Parallel resonance | The condition in a parallel RLC circuit where the susceptances of the inductor and capacitor cancel: \(B_L = B_C\). At resonance, the admittance is minimum (equals 1/R), the impedance is maximum, and the circuit presents a very high impedance at \(f_0\). Used in tank circuits and RF filters. |
| Selectivity | The ability of a resonant circuit to distinguish between signals at nearby frequencies. A highly selective circuit has a narrow bandwidth relative to its resonant frequency. Quantified by the quality factor Q: higher Q means greater selectivity. Critical in radio receiver design to separate adjacent stations. |

</div>
