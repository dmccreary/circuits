---
title: Linear vs Nonlinear I-V Characteristics
description: Side-by-side I-V curve comparison between a linear resistor (straight line through origin) and a nonlinear diode (exponential curve), with a shared voltage slider that moves a dot along each curve simultaneously.
---

# Linear vs Nonlinear I-V Characteristics

<iframe src="main.html" width="100%" height="540px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim displays two I-V graphs side by side. The left panel shows the linear I-V characteristic of a resistor — a straight line whose slope equals 1/R. The right panel shows the exponential I-V characteristic of a diode using the Shockley equation. A shared voltage slider moves a red dot along both curves simultaneously so students can directly compare how each element responds to the same applied voltage.

## Key Concepts

- A **linear element** (resistor) obeys Ohm's Law: \(I = V/R\), giving a straight-line I-V curve.
- A **nonlinear element** (diode) follows the Shockley equation: \(I = I_S(e^{V/V_T} - 1)\).
- The **thermal voltage** \(V_T \approx 25.85\) mV at room temperature governs the diode's exponential turn-on.
- A diode conducts significant current only above its **forward voltage** (~0.6 V for silicon).
- The concept of **small-signal resistance** arises from linearizing the diode curve around an operating point.

[Chapter 2 — Ohm's Law and Basic Configurations](../../chapters/02-ohms-law-basic-configurations/index.md)
