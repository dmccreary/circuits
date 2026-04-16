---
title: Superposition Principle Demonstrator
description: Interactive demonstration of the superposition principle showing how each independent source contributes separately to branch currents and node voltages, with the total equal to the sum of individual contributions.
---

# Superposition Principle Demonstrator

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim decomposes a circuit with two independent sources into two sub-circuits, each with one source active and the other replaced by its internal resistance (voltage source → short, current source → open). The contribution of each source to the selected branch current or node voltage is shown separately, and the superposition sum is compared to the full-circuit result. Toggle sources on and off to build intuition.

## Key Concepts

- **Superposition** states that in a linear circuit, any response (voltage or current) equals the sum of responses caused by each independent source acting alone.
- To isolate one source: replace all other **voltage sources with short circuits** and **current sources with open circuits**.
- Superposition applies only to **linear circuits** — it cannot be used directly for power (which is quadratic in V or I).
- The principle is powerful for circuits with multiple sources and for analyzing sensitivity to individual sources.
- Superposition is the basis for transfer functions, convolution, and Fourier analysis in AC and signal theory.

[Chapter 3 — Kirchhoff's Laws and Topology](../../chapters/03-kirchhoffs-laws-topology/index.md)
