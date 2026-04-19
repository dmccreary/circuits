---
title: Circuit Topology Explorer
description: Interactive graph-based tool that lets students add nodes and branches to a circuit graph, automatically counting independent loops and verifying Euler's formula for planar circuit topologies.
---

# Circuit Topology Explorer

<iframe src="main.html" width="100%" height="640px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim presents an interactive circuit graph editor. Add nodes, connect them with branches, and identify loops by clicking on closed paths. The sim automatically updates counts of nodes (N), branches (B), and independent loops (L), and checks the topological relation \(B = N + L - 1\) for connected planar graphs. This reinforces how circuit structure dictates the number of equations needed for full analysis.

## Key Concepts

- **Nodes (N)**: Junctions where two or more branches meet.
- **Branches (B)**: Individual two-terminal elements connecting two nodes.
- **Loops (L)**: Closed paths through the circuit; independent loops = \(B - N + 1\).
- Euler's formula for connected planar graphs: \(N - B + L = 1\) (the **circuit topology relation**).
- The number of independent KCL equations is \(N - 1\); the number of independent KVL equations is \(B - N + 1\).

[Chapter 3 — Kirchhoff's Laws and Topology](../../chapters/03-kirchhoffs-laws-topology/index.md)
