---
title: Parallel Circuit Analysis
description: Interactive parallel resistor circuit showing how the same voltage appears across all branches while current splits inversely proportional to each branch resistance.
---

# Parallel Circuit Analysis

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates a parallel circuit with up to four resistors sharing the same two nodes. Adjust each branch resistance with sliders and watch the individual branch currents and total current update in real time. The equivalent parallel resistance is displayed, and KCL is verified by showing that all branch currents sum to the total source current.

## Key Concepts

- In a **parallel circuit**, all branches share the same voltage: \(V_1 = V_2 = \cdots = V_n = V_s\).
- Each branch current is independent: \(I_k = V_s / R_k\).
- **Equivalent resistance** satisfies \(\frac{1}{R_{eq}} = \sum \frac{1}{R_k}\); always smaller than the smallest branch.
- KCL confirms: \(I_{total} = I_1 + I_2 + \cdots + I_n\).
- Parallel circuits are used in wiring household outlets and distributing power to independent loads.

[Chapter 2 — Ohm's Law and Basic Configurations](../../chapters/02-ohms-law-basic-configurations/index.md)
