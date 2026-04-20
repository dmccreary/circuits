---
title: Chapter 3 — Kirchhoff's Laws and Circuit Topology
description: Conservation laws and systematic methods for analyzing any electrical circuit including KCL, KVL, node voltage, mesh current, and delta-wye transformation
generated_by: claude skill chapter-content-generator
date: 2026-01-30
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 3 — Kirchhoff's Laws and Circuit Topology

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

This chapter introduces Kirchhoff's Voltage Law (KVL) and Kirchhoff's Current Law (KCL), the two fundamental conservation laws that govern all electrical circuits. Published by Gustav Kirchhoff in 1845, these laws provide the mathematical framework needed to analyze circuits of any complexity.

While Ohm's Law describes the behavior of individual components, Kirchhoff's Laws describe what happens at connections — where currents meet at nodes and voltages distribute around loops. Combined with systematic methods, these laws make it possible to solve any linear DC circuit.

The chapter covers circuit topology concepts including nodes, branches, loops, and meshes, then develops two powerful systematic techniques: the node voltage method and the mesh current method. Special cases involving supernodes and supermeshes are addressed, along with the superposition principle for multi-source circuits. The chapter concludes with delta-wye transformations and circuit simplification strategies.

**Key Takeaways**

1. Kirchhoff's Current Law (KCL) enforces conservation of charge at every node, and Kirchhoff's Voltage Law (KVL) enforces conservation of energy around every closed loop.
2. The node voltage method and mesh current method provide systematic procedures that can solve any linear circuit, with the choice between them depending on circuit topology.
3. Delta-wye transformations convert between equivalent resistor configurations, enabling simplification of circuits that cannot be reduced by series and parallel rules alone.

</details>

## Summary

### Key Concepts

- **KCL** (Kirchhoff's Current Law): the algebraic sum of all currents entering a node equals zero — conservation of charge
- **KVL** (Kirchhoff's Voltage Law): the algebraic sum of all voltages around any closed loop equals zero — conservation of energy
- **Node voltage method**: assign voltages to nodes relative to ground; write KCL at each non-reference node
- **Mesh current method**: assign loop currents to independent meshes; write KVL around each mesh
- A **supernode** arises when a voltage source connects two non-reference nodes
- A **supermesh** arises when a current source is shared between two adjacent mesh loops

### Important Equations

\[ \sum I_{in} = \sum I_{out} \quad \text{(KCL at any node)} \qquad \sum V = 0 \quad \text{(KVL around any closed loop)} \]

### What You Should Understand

- KCL is a statement of charge conservation; KVL is a statement of energy conservation
- How to select a reference node and write the minimum number of independent equations
- Why the number of independent equations equals the number of unknown node voltages or mesh currents
- How supernodes and supermeshes handle voltage and current sources in systematic analysis

### Applications

- Multi-loop power distribution circuit analysis
- Wheatstone bridge circuits for precision sensor readout
- Ladder networks in filter design
- Foundation of SPICE circuit simulation (nodal analysis engine)

### Quick Review Checklist

- [ ] I can apply KCL at any node with a consistent current sign convention
- [ ] I can apply KVL around any loop with a consistent polarity convention
- [ ] I can set up and solve a node-voltage system for a three-node circuit
- [ ] I can identify and correctly handle a supernode or supermesh

## Concepts Covered

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

1. Kirchhoff's Voltage Law
2. Kirchhoff's Current Law
3. Loop
4. Mesh
5. Circuit Topology
6. Node Voltage Method
7. Reference Node
8. Supernode
9. Mesh Current Method
10. Supermesh
11. Superposition Principle
12. Load Resistance
13. Equivalent Resistance
14. Delta Configuration
15. Wye Configuration
16. Delta-Wye Transformation
17. Circuit Simplification

</div>

---

## Interactive MicroSims

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

This chapter includes nine interactive simulations. Use them alongside the reading to explore concepts hands-on.

| Section | Simulation | What it shows |
|---------|-----------|---------------|
| 3.1 | [KCL Node Visualization](../../../sims/kcl-node-viz/index.md) | Current sums at a node; sign conventions |
| 3.2 | [KVL Loop Walkthrough](../../../sims/kvl-loop-walkthrough/index.md) | Voltage rises and drops around a loop |
| 3.3 | [Circuit Topology Explorer](../../../sims/circuit-topology-explorer/index.md) | Nodes, branches, meshes, and the b = n−1+m formula |
| 3.4 | [Supernode Analysis](../../../sims/supernode-analysis/index.md) | Node voltage method with a floating voltage source |
| 3.5 | [Mesh vs. Supermesh](../../../sims/mesh-supermesh-compare/index.md) | Mesh current method; current-source handling |
| 3.6 | [Superposition Demonstrator](../../../sims/superposition-demo/index.md) | Individual source contributions that sum to the full solution |
| 3.8 | [Delta-Wye Transformation](../../../sims/delta-wye-transform/index.md) | Bidirectional Δ↔Y conversion with live formula evaluation |
| 3.9 | [Circuit Simplification](../../../sims/circuit-simplification/index.md) | Step-by-step bridge-circuit reduction via Δ→Y and series/parallel rules |
| 3.11 | [Matrix Equation Builder](../../../sims/matrix-equation-builder/index.md) | Build and solve the \(\mathbf{G}\mathbf{V}=\mathbf{I}\) or \(\mathbf{Z}\mathbf{I}=\mathbf{V}\) matrix interactively |

</div>

---

## Prerequisites

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Before beginning this chapter, students should have:

- Understanding of electric charge, voltage, current, power, and resistance ([Chapter 1](../01-electric-charge-basic-quantities/index.md))
- Mastery of Ohm's Law, series and parallel circuits, and voltage/current dividers ([Chapter 2](../02-ohms-law-basic-configurations/index.md))
- Familiarity with circuit schematic symbols and conventions

</div>

</div>
