---
title: Circuit Simplification Steps
description: Step-by-step animated resistor network reduction tool that highlights each series or parallel pair to be combined, showing the intermediate equivalent circuit at each stage until a single equivalent resistance remains.
---

# Circuit Simplification Steps

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim guides students through a multi-step resistor network reduction. At each step, the next pair of series or parallel resistors to be combined is highlighted in orange, the formula is shown, and the result is drawn into the simplified network. Clicking "Next Step" advances through the full reduction sequence. Students can also enter custom resistor values to practice with different networks.

## Key Concepts

- **Series combination**: \(R_{eq} = R_1 + R_2 + \cdots\) — merge when the same current flows through each.
- **Parallel combination**: \(\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots\) — merge when the same voltage appears across each.
- Complex networks are reduced by **iteratively** applying series and parallel rules from the inside out.
- Not all networks are reducible by series-parallel rules alone — some require **Delta-Wye transformations**.
- The final equivalent resistance determines the current drawn from the source and the power delivered.

[Chapter 3 — Kirchhoff's Laws and Topology](../../chapters/03-kirchhoffs-laws-topology/index.md)
