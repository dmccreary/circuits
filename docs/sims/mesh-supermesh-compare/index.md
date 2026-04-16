---
title: Mesh vs Supermesh Comparison
description: Side-by-side comparison of standard mesh analysis and supermesh analysis, showing how a current source shared between two meshes creates a supermesh and requires a constraint equation.
---

# Mesh vs Supermesh Comparison

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim presents two circuit variants side by side: one solved with standard mesh analysis and one requiring a supermesh. In the supermesh panel, a current source is shared between two mesh loops, and the sim shows how the two mesh currents are merged into a single supermesh equation plus a constraint. Adjust source values and watch both solutions update simultaneously.

## Key Concepts

- **Mesh analysis** assigns a clockwise mesh current to each independent loop and writes KVL for each mesh.
- A **supermesh** arises when a current source is shared between two adjacent meshes.
- The current source is excluded from the KVL equation; instead a **constraint** \(I_a - I_b = I_s\) is written.
- The number of mesh equations equals the number of independent loops minus the number of current sources involved in supermeshes.
- Mesh analysis is dual to nodal analysis: meshes ↔ nodes, KVL ↔ KCL, mesh currents ↔ node voltages.

[Chapter 3 — Kirchhoff's Laws and Topology](../../chapters/03-kirchhoffs-laws-topology/index.md)
