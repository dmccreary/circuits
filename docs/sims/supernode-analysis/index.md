---
title: Supernode Analysis
description: Interactive nodal analysis simulator that handles voltage sources between two non-reference nodes by forming a supernode, showing how the constraint equation and KCL equation combine to solve for node voltages.
---

# Supernode Analysis

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates what happens when a voltage source connects two non-reference nodes in a circuit. The sim highlights the supernode formed around the voltage source, writes out the KCL equation for the supernode boundary, and adds the voltage constraint equation. Adjust source and resistor values to see how the node voltages change, and verify results against manual calculation.

## Key Concepts

- A **supernode** is formed when a voltage source (dependent or independent) connects two non-reference nodes.
- The supernode encloses both nodes; KCL is applied to the **combined boundary**.
- An additional **constraint equation** \(V_a - V_b = V_s\) is required, replacing the missing KCL equation.
- Supernodes reduce the total number of unknown node voltages by one per voltage source involved.
- The technique generalizes to multiple voltage sources and dependent sources.

[Chapter 3 — Kirchhoff's Laws and Topology](../../chapters/03-kirchhoffs-laws-topology/index.md)
