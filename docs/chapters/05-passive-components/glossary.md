---
title: Chapter 5 Glossary — Passive Components
description: Key terms and definitions for Chapter 5
---

<div class="unit1-styled" markdown>

# Chapter 5 Glossary

| Term | Definition |
|------|-----------|
| Capacitance | A measure of a component's ability to store charge per unit voltage, defined as \(C = Q/V\) and measured in farads (F). For a parallel plate capacitor: \(C = \varepsilon_0 \varepsilon_r A/d\), where \(A\) is plate area, \(d\) is plate separation, and \(\varepsilon_r\) is the dielectric's relative permittivity. Practical values range from picofarads (pF) to millifarads (mF). |
| Capacitor energy storage | A charged capacitor stores energy in its electric field: \(E_C = \frac{1}{2}CV^2\), where \(E\) is in joules, \(C\) in farads, and \(V\) in volts. Unlike a resistor, this energy is not dissipated but can be returned to the circuit. Analogous to kinetic energy \(\frac{1}{2}mv^2\) with capacitance as mass and voltage as velocity. |
| Capacitors in series | When capacitors are connected in series, the equivalent capacitance is smaller than any individual value, following the reciprocal formula: \(1/C_{eq} = 1/C_1 + 1/C_2 + \cdots\). For two capacitors: \(C_{eq} = C_1 C_2/(C_1+C_2)\). Series combination increases the effective plate separation and voltage rating. |
| Capacitors in parallel | When capacitors are connected in parallel, the equivalent capacitance is the sum of individual values: \(C_{eq} = C_1 + C_2 + \cdots\). Parallel combination increases effective plate area and total charge storage capacity. Note: capacitors combine opposite to resistors — parallel capacitors add directly, series capacitors use the reciprocal formula. |
| Inductance | A measure of a coil's ability to store energy in a magnetic field, opposing changes in current. Defined by \(v = L\, di/dt\), measured in henrys (H). For a solenoid: \(L = \mu_0 \mu_r N^2 A / \ell\). An inductor passes DC freely (zero voltage drop at constant current) but opposes instantaneous current changes. |
| Inductor energy storage | An inductor carrying current stores energy in its magnetic field: \(E_L = \frac{1}{2}LI^2\), where \(E\) is in joules, \(L\) in henrys, and \(I\) in amperes. Analogous to kinetic energy with inductance as mass and current as velocity. Current through an inductor cannot change instantaneously. |
| Inductors in series | Series inductors add directly: \(L_{eq} = L_1 + L_2 + \cdots\), assuming no mutual coupling. This is the same rule as resistors in series. The total inductance is larger than any individual inductor. |
| Inductors in parallel | Parallel inductors follow the reciprocal formula: \(1/L_{eq} = 1/L_1 + 1/L_2 + \cdots\), assuming no mutual coupling. The equivalent inductance is less than the smallest individual inductor. Same rule as parallel resistors. |
| Mutual inductance | The property by which current changing in one inductor induces a voltage in a nearby inductor through their shared magnetic flux. Quantified by \(M\) in henrys. Voltage induced: \(v_{12} = M\, di_1/dt\). The coupling coefficient \(k = M / \sqrt{L_1 L_2}\) ranges from 0 (no coupling) to 1 (perfect coupling). |
| Parasitic elements | Unintended electrical characteristics inherent in real components. Capacitors have equivalent series resistance (ESR) and equivalent series inductance (ESL). Inductors have winding resistance and inter-winding capacitance. These parasitics limit high-frequency performance and cause real components to deviate from ideal behavior. |
| RMS value | The root mean square value of a periodic signal, equal to the equivalent DC value that delivers the same average power to a resistor. For a sinusoid: \(V_{rms} = V_m / \sqrt{2} \approx 0.707 V_m\). Used for power calculations: \(P = V_{rms}^2 / R = I_{rms}^2 R\). |
| Decibel | A logarithmic unit for expressing power or amplitude ratios. Power ratio: \(dB = 10\log_{10}(P_2/P_1)\). Voltage ratio: \(dB = 20\log_{10}(V_2/V_1)\). A 3 dB increase corresponds to doubling power; −3 dB means half power (0.707 times voltage). The logarithmic scale compresses large dynamic ranges into manageable numbers. |
| Angular frequency | The rate of change of phase for a sinusoidal signal, \(\omega = 2\pi f\) in radians per second (rad/s). Appears naturally in the impedance formulas for capacitors (\(Z_C = 1/(j\omega C)\)) and inductors (\(Z_L = j\omega L\)). Related to period by \(\omega = 2\pi/T\). |
| Phase angle | The horizontal shift of a sinusoidal signal relative to a reference, measured in degrees or radians. A signal \(v(t) = V_m \sin(\omega t + \phi)\) leads a reference by \(\phi\) radians. Phase relationships between voltage and current determine power factor and energy storage versus dissipation. |
| Peak-to-peak value | The total voltage swing of a periodic signal from its maximum positive value to its maximum negative value: \(V_{pp} = 2V_m\) for a symmetric sinusoid. Measured directly on an oscilloscope. Useful for assessing signal swing versus supply rails. |

</div>
