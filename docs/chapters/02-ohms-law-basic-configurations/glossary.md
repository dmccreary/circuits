---
title: Chapter 2 Glossary — Ohm's Law and Basic Circuit Configurations
description: Key terms and definitions for Chapter 2
---

<div class="unit1-styled" markdown>

# Chapter 2 Glossary

| Term | Definition |
|------|-----------|
| Ohm's Law | The fundamental linear relationship between voltage, current, and resistance in a resistor: \(V = IR\). Three equivalent forms allow solving for any variable: \(V = IR\), \(I = V/R\), and \(R = V/I\). Applies to resistors and any component exhibiting linear behavior. |
| Voltage source | An ideal circuit element that maintains a constant voltage across its terminals regardless of the current drawn. Schematically represented as a circle with + and − labels, or as the battery symbol. Real sources have internal resistance that causes terminal voltage to drop under load. |
| Current source | An ideal circuit element that maintains a constant current through itself regardless of the voltage across its terminals. Schematically represented as a circle with an arrow. Used to model transistor behavior and certain biasing configurations. |
| Dependent source | A voltage or current source whose output is controlled by a voltage or current elsewhere in the circuit. Drawn as a diamond shape. There are four types: VCVS, VCCS, CCVS, and CCCS. Models transistor and op-amp behavior in circuit analysis. |
| Series circuit | A circuit configuration in which all components are connected end-to-end in a single path, so the same current flows through every element. Total resistance is the sum of individual resistances: \(R_s = R_1 + R_2 + \cdots + R_n\). Voltages across each element add to the supply voltage. |
| Parallel circuit | A circuit configuration in which all components are connected between the same two nodes, sharing the same voltage. Currents add, and total resistance is found from the reciprocal formula \(1/R_p = 1/R_1 + 1/R_2 + \cdots\). Total resistance is always less than the smallest branch resistance. |
| Voltage divider | Two resistors in series connected to a voltage source, with the output taken at the midpoint. The output voltage is \(V_{out} = V_{in} \cdot R_2/(R_1 + R_2)\). Used to create reference voltages, bias transistors, and scale sensor outputs. Sensitive to loading from the connected circuit. |
| Current divider | Two resistors in parallel connected to a current source, where the current splits inversely proportional to resistance. For two parallel resistors: \(I_1 = I_{total} \cdot R_2/(R_1 + R_2)\). More current flows through the lower resistance. |
| Resistor color code | A system of colored bands printed on through-hole resistors that encodes resistance value and tolerance. For a four-band resistor: bands 1 and 2 are the first two digits, band 3 is the multiplier, and band 4 is the tolerance. Gold tolerance band means ±5%, silver means ±10%, brown means ±1%. |
| Resistor tolerance | The allowed deviation of a resistor's actual value from its nominal value, expressed as a percentage. A 1 kΩ resistor with ±5% tolerance has an actual value between 950 Ω and 1050 Ω. Precision circuits require ±1% or better; general-purpose circuits usually accept ±5%. |
| Potentiometer | A three-terminal variable resistor with an adjustable wiper contact that divides the total resistance. Functions as an adjustable voltage divider. Common uses include volume controls in audio equipment, brightness adjustments, and position sensing. |
| Wire resistance | The resistance of a conductor, given by \(R_{wire} = \rho L / A\), where \(\rho\) is the material's resistivity (Ω·m), \(L\) is the wire length, and \(A\) is the cross-sectional area. Specified by AWG (American Wire Gauge) — lower AWG numbers indicate thicker wire with lower resistance. |
| Component power rating | The maximum power a component can safely dissipate as heat without damage, measured in watts. Common resistor ratings are 1/8 W, 1/4 W, 1/2 W, and 1 W. Exceeding the power rating causes overheating, discoloration, and failure. |
| Derating | The engineering practice of operating a component at a fraction of its maximum rated value to improve reliability and extend lifespan. A common rule is to derate to 50–70% of the rated maximum. If a calculation shows 0.4 W dissipation, a 1 W resistor should be used instead of a 0.5 W unit. |
| Linearity | A property of a circuit or component where the output is directly proportional to the input; doubling the input doubles the output. Resistors and linear networks obey superposition, meaning responses to multiple sources can be analyzed separately and summed. Non-linear components like diodes and transistors do not obey this principle. |

</div>
