---
title: Matrix Equation Builder
description: Interactive tool that builds the conductance matrix (G) and source vector for nodal analysis, or the impedance matrix (Z) for mesh analysis, from a user-defined circuit topology — showing the systematic path from circuit to matrix equation.
---

# Matrix Equation Builder

<iframe src="main.html" width="100%"
    style="height:790px; display:block; border:none;"
    scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim takes a simple resistive circuit as input and assembles the full matrix equation \(\mathbf{G}\mathbf{V} = \mathbf{I}\) for nodal analysis (or \(\mathbf{Z}\mathbf{I} = \mathbf{V}\) for mesh analysis). Each matrix entry is color-coded to show which element contributed it, and the solution vector is computed and displayed. Toggle between nodal and mesh modes to see the duality in action.

## Key Concepts

- **Nodal analysis matrix form**: \(\mathbf{G}\mathbf{V} = \mathbf{I}_s\), where \(\mathbf{G}\) is the conductance matrix assembled by inspection.
- Diagonal entries \(G_{kk}\) = sum of conductances connected to node k.
- Off-diagonal entries \(G_{kj}\) = negative sum of conductances between nodes k and j.
- **Mesh analysis matrix form**: \(\mathbf{Z}\mathbf{I}_m = \mathbf{V}_s\), with the impedance matrix assembled by similar inspection rules.
- The matrix equation can be solved by **Gaussian elimination**, **Cramer's rule**, or matrix inversion \(\mathbf{V} = \mathbf{G}^{-1}\mathbf{I}_s\).

[Chapter 3 — Kirchhoff's Laws and Topology](../../chapters/03-kirchhoffs-laws-topology/index.md)
