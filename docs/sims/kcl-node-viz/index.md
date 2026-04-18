---
title: KCL Node Visualization
description: Interactive visualization of Kirchhoff's Current Law showing animated current arrows at a selected node, demonstrating that the algebraic sum of all currents entering and leaving any node is zero.
---

# KCL Node Visualization

<iframe src="main.html" width="100%" height="550px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim places several current-carrying branches meeting at a common node and animates the current flow. Click any node in the circuit to highlight it and see labeled current arrows. A running tally on the right confirms that the sum of entering currents equals the sum of leaving currents, verifying KCL at each selected node.

## Key Concepts

- **Kirchhoff's Current Law (KCL)**: The algebraic sum of all currents at any node equals zero: \(\sum I_{in} = \sum I_{out}\).
- KCL is a consequence of **conservation of charge** — charge cannot accumulate at a node.
- Sign convention: currents entering a node are positive; currents leaving are negative (or vice versa — choose one consistently).
- KCL applies at every instant in time, including in AC circuits using phasor notation.
- Applying KCL at each independent node generates the equations needed for **nodal analysis**.

[Chapter 3 — Kirchhoff's Laws and Topology](../../chapters/03-kirchhoffs-laws-topology/index.md)
