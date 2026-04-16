---
title: Delta-Wye Transformation
description: Interactive Δ-Y and Y-Δ resistor network transformer showing the conversion formulas with labeled before-and-after circuit diagrams and numerical verification.
---

# Delta-Wye Transformation

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim displays a three-terminal resistor network in both Delta (Δ) and Wye (Y) configurations side by side. Adjust the resistor values in either configuration and the other is computed automatically using the conversion formulas. The equivalent resistance between any pair of terminals is shown for both networks and confirmed to be equal, demonstrating the transformation's validity.

## Key Concepts

- The **Delta-to-Wye** conversion: \(R_a = \frac{R_{ab} R_{ca}}{R_{ab}+R_{bc}+R_{ca}}\), with cyclic permutations for \(R_b\) and \(R_c\).
- The **Wye-to-Delta** conversion: \(R_{ab} = R_a + R_b + \frac{R_a R_b}{R_c}\), with cyclic permutations.
- Both networks present **identical terminal behavior** — the same voltages and currents at the three terminals.
- Delta-Wye transforms are used to simplify **bridge circuits** and unbalanced three-phase networks.
- The special case of equal resistors: a balanced delta \(R_\Delta\) converts to a balanced wye \(R_Y = R_\Delta / 3\).

[Chapter 3 — Kirchhoff's Laws and Topology](../../chapters/03-kirchhoffs-laws-topology/index.md)
