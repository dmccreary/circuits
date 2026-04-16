---
title: Chapter 10 Glossary — AC Power Analysis
description: Key terms and definitions for Chapter 10
---

<div class="unit1-styled" markdown>

# Chapter 10 Glossary

| Term | Definition |
|------|-----------|
| Instantaneous power | The power at any specific instant in an AC circuit: \(p(t) = v(t) \cdot i(t)\). For sinusoidal signals, instantaneous power has two components: a constant term (average power) and an oscillating term at twice the signal frequency. The instantaneous power can go negative, meaning energy flows back to the source from reactive elements. |
| Average power | The time-averaged instantaneous power over one complete cycle, also called real power or active power. For sinusoidal signals: \(P = V_{rms} I_{rms} \cos\theta\), where \(\theta\) is the phase angle between voltage and current. Measured in watts (W). This is the power that does useful work. |
| Real power | The component of AC power that performs actual work — heating, rotating motors, producing light. \(P = V_{rms} I_{rms} \cos\theta = I_{rms}^2 R\). Measured in watts (W). Your electric utility bill is based on real power consumed (kilowatt-hours). Only resistive elements consume real power. |
| Reactive power | The power that oscillates between the source and energy-storage elements (inductors and capacitors) without being consumed. \(Q = V_{rms} I_{rms} \sin\theta = I_{rms}^2 X\). Measured in volt-amperes reactive (VAR). Positive for inductive loads (lagging), negative for capacitive loads (leading). Requires current to flow but does no useful work. |
| Apparent power | The total volt-ampere demand seen by the source: \(S = V_{rms} I_{rms}\). Measured in volt-amperes (VA). This determines wire sizing, transformer ratings, and generator capacity, as equipment must carry the full current regardless of power factor. Related to real and reactive power by \(S^2 = P^2 + Q^2\). |
| Complex power | A complex number that unifies real and reactive power: \(\mathbf{S} = P + jQ = \mathbf{V}_{rms} \mathbf{I}_{rms}^*\), where \(\mathbf{I}^*\) is the complex conjugate of the current phasor. The magnitude \(|\mathbf{S}| = S\) is the apparent power. Complex power makes AC power calculations as elegant as DC calculations. |
| Power triangle | A right triangle relating apparent power (hypotenuse), real power (adjacent), and reactive power (opposite): \(S^2 = P^2 + Q^2\). The angle is the power factor angle \(\theta\). Used as a visual aid for power factor correction, showing how adding capacitive power reduces the reactive component. |
| Power factor | The ratio of real power to apparent power: \(PF = P/S = \cos\theta\), where \(\theta\) is the phase angle between voltage and current. Dimensionless, ranging from 0 (purely reactive) to 1 (purely resistive). A power factor of 1 means all apparent power does useful work; a low power factor wastes transmission capacity. |
| Leading power factor | A power factor condition where the current leads the voltage (phase angle \(\theta < 0\)), characteristic of capacitive loads. Reactive power is negative (\(Q < 0\)). Occurs in circuits with more capacitive than inductive elements. Power factor correction capacitors are added to counteract inductive loads. |
| Lagging power factor | A power factor condition where the current lags the voltage (phase angle \(\theta > 0\)), characteristic of inductive loads such as motors and transformers. Reactive power is positive (\(Q > 0\)). Most industrial loads have lagging power factors. Utilities prefer unity or near-unity power factor. |
| Power factor correction | The practice of adding reactive elements (usually capacitors) in parallel with inductive loads to bring the power factor closer to unity. Reduces line current and transmission losses without changing the real power delivered. Capacitors supply the reactive power locally, so the utility supply sees a smaller, more resistive load. |
| VAR | Volt-Ampere Reactive — the unit of reactive power \(Q\). Like watts for real power or volt-amperes for apparent power, the VAR quantifies the reactive demand of a load. Reactive power does not appear on utility bills but must be accommodated in system design. Kilovars (kVAR) and megavars (MVAR) are common practical units. |
| Conjugate impedance matching | The AC condition for maximum power transfer to a load: \(Z_L = Z_{Th}^* = R_{Th} - jX_{Th}\). The load resistance must equal the source Thevenin resistance and the load reactance must cancel the source reactance. At this condition, maximum real power is transferred. Used in RF and audio amplifier output stage design. |
| Efficiency | The ratio of output power to input power: \(\eta = P_{out}/P_{in} \times 100\%\). In power transmission, losses occur in line resistance; in amplifiers, losses occur in transistor dissipation. For maximum power transfer (conjugate match), efficiency is exactly 50% — desirable for maximum signal transfer but not for energy systems. |

</div>
