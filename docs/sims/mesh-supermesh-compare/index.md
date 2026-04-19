---
title: Mesh vs Supermesh Comparison
description: Interactive comparison of standard mesh analysis and supermesh analysis, showing how a current source shared between two mesh loops creates a supermesh and requires a constraint equation.
---

# Mesh vs Supermesh Comparison

<iframe src="main.html" width="100%"
    style="height:640px; display:block; border:none;"
    scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim lets you switch between **Standard Mesh** and **Supermesh** mode. In standard mode the right branch is a plain wire and two independent KVL equations are written for the two loops. In supermesh mode a current source Is is shared between the two meshes — the sim shows how the two loops merge into a single outer KVL equation plus the constraint I₂ – I₁ = Is. Adjust resistors and source values with sliders or numeric inputs and press Solve to see the mesh currents update.

## Key Concepts

- **Mesh analysis** assigns a clockwise mesh current to each independent loop and writes KVL around that loop.
- A **supermesh** forms when a current source is shared between two adjacent mesh loops.
- The current source is *excluded* from the combined KVL; a **constraint equation** \(I_2 - I_1 = I_s\) replaces the missing loop equation.
- The total number of independent equations equals the number of mesh loops minus the number of current sources inside supermeshes.
- Mesh analysis is the loop-space dual of nodal analysis: meshes ↔ nodes, KVL ↔ KCL, mesh currents ↔ node voltages.

[Chapter 3 — Kirchhoff's Laws and Topology](../../chapters/03-kirchhoffs-laws-topology/index.md)
