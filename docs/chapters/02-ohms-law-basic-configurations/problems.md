---
title: Chapter 2 Practice Problems — Ohm's Law and Basic Circuit Configurations
description: Practice problems with solutions for Chapter 2 covering series/parallel circuits, voltage dividers, and power calculations
---

<div class="unit1-styled" markdown>

# Chapter 2 Practice Problems

## Practice Problems

### Problem 1 — Ohm's Law and Power

A 9V battery is connected to a 470Ω resistor.

**(a)** Find the current through the resistor.

**(b)** Find the power dissipated by the resistor.

**(c)** Is a standard 1/4W (0.25W) resistor adequate?

**(d)** What value of resistance would dissipate exactly 1W at 9V?

??? success "Solution"
    **(a)** \[I = \frac{V}{R} = \frac{9\text{ V}}{470\text{ Ω}} = 19.1\text{ mA}\]

    **(b)** \[P = I^2 R = (0.0191)^2 \times 470 = 0.000365 \times 470 = 171.6\text{ mW}\]

    Or: \(P = V^2/R = 81/470 = 172\text{ mW}\)

    **(c)** 172 mW > 250 mW? No — 172 mW is less than 250 mW, so a 1/4W resistor is adequate. However, it operates at 69% of rating, which is marginal. A 1/2W resistor would be better practice (34% utilization).

    **(d)** \[R = \frac{V^2}{P} = \frac{81}{1} = 81\text{ Ω}\]

---

### Problem 2 — Series Circuit Analysis

A 24V source is connected to three series resistors: R1 = 2kΩ, R2 = 4kΩ, R3 = 6kΩ.

**(a)** Find the equivalent resistance.

**(b)** Find the current through the circuit.

**(c)** Find the voltage across each resistor.

**(d)** Verify Kirchhoff's Voltage Law.

??? success "Solution"
    **(a)** \[R_{eq} = R_1 + R_2 + R_3 = 2\text{k} + 4\text{k} + 6\text{k} = 12\text{kΩ}\]

    **(b)** \[I = \frac{V}{R_{eq}} = \frac{24\text{ V}}{12{,}000\text{ Ω}} = 2\text{ mA}\]

    **(c)** \[V_1 = IR_1 = 2\text{ mA} \times 2\text{kΩ} = 4\text{ V}\]
    \[V_2 = IR_2 = 2\text{ mA} \times 4\text{kΩ} = 8\text{ V}\]
    \[V_3 = IR_3 = 2\text{ mA} \times 6\text{kΩ} = 12\text{ V}\]

    **(d)** KVL check: \(V_1 + V_2 + V_3 = 4 + 8 + 12 = 24\text{ V} = V_s\) ✓

---

### Problem 3 — Parallel Circuit Analysis

Three resistors R1 = 100Ω, R2 = 200Ω, and R3 = 400Ω are connected in parallel across a 20V source.

**(a)** Find the equivalent resistance.

**(b)** Find the current through each resistor.

**(c)** Find the total current from the source.

**(d)** Verify: the total current should equal \(V_s / R_{eq}\).

??? success "Solution"
    **(a)** \[\frac{1}{R_{eq}} = \frac{1}{100} + \frac{1}{200} + \frac{1}{400} = \frac{4}{400} + \frac{2}{400} + \frac{1}{400} = \frac{7}{400}\]

    \[R_{eq} = \frac{400}{7} \approx 57.1\text{ Ω}\]

    **(b)** All resistors share the 20V source voltage:

    \[I_1 = \frac{20}{100} = 200\text{ mA}, \quad I_2 = \frac{20}{200} = 100\text{ mA}, \quad I_3 = \frac{20}{400} = 50\text{ mA}\]

    **(c)** \[I_{total} = I_1 + I_2 + I_3 = 200 + 100 + 50 = 350\text{ mA}\]

    **(d)** \[I_{total} = \frac{V_s}{R_{eq}} = \frac{20}{400/7} = \frac{20 \times 7}{400} = \frac{140}{400} = 0.35\text{ A} = 350\text{ mA}\] ✓

---

### Problem 4 — Voltage Divider Design

You need to produce a 3.3V reference from a 12V supply using a voltage divider. Assume the load draws negligible current.

**(a)** If R1 = 10kΩ, find the required value of R2.

**(b)** Calculate the current flowing through the divider.

**(c)** What power does each resistor dissipate?

**(d)** Are 1/4W resistors adequate?

??? success "Solution"
    **(a)** Using the voltage divider formula and solving for R2:

    \[V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}\]

    \[3.3 = 12 \times \frac{R_2}{10\text{k} + R_2}\]

    \[3.3(10\text{k} + R_2) = 12 R_2\]

    \[33{,}000 = 12 R_2 - 3.3 R_2 = 8.7 R_2\]

    \[R_2 = \frac{33{,}000}{8.7} \approx 3.79\text{ kΩ}\]

    The nearest standard value is 3.9kΩ (E24 series), giving \(V_{out} = 12 \times 3.9/(10 + 3.9) = 3.37\text{ V}\), which is close enough for most applications.

    **(b)** \[I = \frac{V_{in}}{R_1 + R_2} = \frac{12\text{ V}}{10\text{k} + 3.79\text{k}} = \frac{12}{13.79\text{k}} = 0.87\text{ mA}\]

    **(c)** \[P_1 = I^2 R_1 = (0.00087)^2 \times 10{,}000 = 7.57\text{ mW}\]
    \[P_2 = I^2 R_2 = (0.00087)^2 \times 3{,}790 = 2.87\text{ mW}\]

    **(d)** Both are well below 250 mW. Yes, 1/4W resistors are more than adequate.

</div>
