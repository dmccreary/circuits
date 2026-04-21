---
title: Chapter 2 Practice Problems — Ohm's Law and Basic Configurations
description: Practice problems with hints for Chapter 2 covering Ohm's Law, series/parallel resistors, voltage dividers, and current dividers
---

<div class="unit1-styled" markdown>

# Chapter 2 Practice Problems — Ohm's Law and Basic Configurations

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — Ohm's Law and Power

A 12 V source is connected to a single resistor and the current is measured at 40 mA.

**(a)** Find the resistance using Ohm's Law.

**(b)** Calculate the power dissipated by the resistor using all three power formulas (\(P = VI\), \(P = I^2R\), \(P = V^2/R\)) and verify they agree.

**(c)** Is a standard 1/4 W (250 mW) resistor adequate for this application? What rating would you choose?

??? tip "Hint"
    **(a)** Rearrange Ohm's Law to \(R = V/I\). Convert mA to A: 40 mA = 0.040 A.

    **(b)** All three formulas must yield the same power. If they don't, check your arithmetic. Express the final answer in milliwatts.

    **(c)** Compare the computed power to 250 mW. A safe design practice is to derate to 50–70% of the rated maximum, meaning the actual dissipation should be well below the rated value. Choose the next standard rating above your calculated power.

---

## Problem 2 — Series Resistors

Three resistors — \(R_1 = 1.0\) kΩ, \(R_2 = 2.2\) kΩ, and \(R_3 = 3.3\) kΩ — are connected in series across an 18 V supply.

**(a)** Find the total equivalent resistance.

**(b)** Find the current through the series string.

**(c)** Find the voltage drop across each resistor. Verify that the three voltage drops sum to 18 V (KVL check).

??? tip "Hint"
    **(a)** Series resistors add directly: \(R_{total} = R_1 + R_2 + R_3\). Keep all values in kΩ and the answer will also be in kΩ.

    **(b)** With the total resistance found, apply \(I = V/R_{total}\). The same current flows through every element in series.

    **(c)** Apply Ohm's Law to each resistor: \(V_k = I \cdot R_k\). A larger resistor always has a larger voltage drop when the current is common.

---

## Problem 3 — Parallel Resistors and Current Divider

Two resistors, \(R_1 = 6\) kΩ and \(R_2 = 12\) kΩ, are connected in parallel across a 9 V supply.

**(a)** Find the equivalent parallel resistance using the product-over-sum formula.

**(b)** Find the total current supplied by the source.

**(c)** Use the current divider formula to find the current through each resistor. Verify the currents add to the total found in (b).

??? tip "Hint"
    **(a)** For two resistors in parallel: \(R_{eq} = \frac{R_1 R_2}{R_1 + R_2}\). The result is always smaller than the smaller of the two resistors.

    **(b)** \(I_{total} = V / R_{eq}\). Since both resistors share the same 9 V, you can also confirm by computing \(V/R_1\) and \(V/R_2\) separately and adding.

    **(c)** Current divider: \(I_1 = I_{total} \cdot \frac{R_2}{R_1 + R_2}\). Note that more current flows through the smaller resistor — this is the path of least resistance.

---

## Problem 4 — Voltage Divider with a Load

A voltage divider is built from \(R_1 = 10\) kΩ (top) and \(R_2 = 10\) kΩ (bottom), supplied from \(V_{in} = 10\) V.

**(a)** Find the unloaded output voltage \(V_{out}\) (no load connected).

**(b)** A load \(R_L = 10\) kΩ is now connected across \(R_2\). Find the effective parallel resistance of \(R_2 \| R_L\), then calculate the new \(V_{out}\).

**(c)** What is the percentage drop in output voltage due to the load? Why is this load poorly matched to this divider?

??? tip "Hint"
    **(a)** Apply the voltage divider formula: \(V_{out} = V_{in} \cdot \frac{R_2}{R_1 + R_2}\). With equal resistors the answer is exactly half the supply.

    **(b)** Compute \(R_2 \| R_L = \frac{R_2 \cdot R_L}{R_2 + R_L}\), then substitute this effective resistance as the new "bottom" resistor in the divider formula.

    **(c)** Percentage drop = \(\frac{V_{unloaded} - V_{loaded}}{V_{unloaded}} \times 100\%\). For a divider to work well under load, the load resistance should be at least 10× the bottom resistor value.

---

</div>
