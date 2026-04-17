---
title: Chapter 3 Glossary — Kirchhoff's Laws and Circuit Topology
description: Key terms and definitions for Chapter 3
---

<div class="unit1-styled" markdown>

# Chapter 3 Glossary

| Term | Definition |
|------|-----------|
| Kirchhoff's Current Law | The conservation of electric charge at a circuit node: the algebraic sum of all currents entering and leaving any node equals zero. Mathematically: \(\sum_{k=1}^{n} i_k = 0\). Every coulomb of charge arriving must also depart — charge cannot accumulate at a junction. |
| Kirchhoff's Voltage Law | The conservation of energy around any closed loop in a circuit: the algebraic sum of all voltages around any closed loop equals zero. Mathematically: \(\sum_{k=1}^{n} v_k = 0\). Voltage rises from sources are exactly balanced by drops across resistive elements. |
| Loop | Any closed path through a circuit, starting and ending at the same node, regardless of how many elements are traversed. KVL applies to every loop. A circuit may have many loops, but only some are independent. |
| Mesh | A loop that contains no smaller loops within it — the minimal loop of a planar circuit. Mesh analysis assigns one unknown current to each mesh, making it the basis of the mesh current method. |
| Circuit topology | The study of how circuit elements are interconnected, independent of component type or value. Topological properties determine the number of independent KCL and KVL equations: a circuit with \(n\) nodes and \(m\) meshes has \(n-1\) independent KCL equations and \(m\) independent KVL equations. |
| Node voltage method | A systematic analysis technique that assigns voltage variables to each non-reference node and writes KCL equations in terms of those voltages. Requires \(n-1\) equations for a circuit with \(n\) nodes. Particularly efficient when there are few nodes relative to branches. |
| Reference node | The node assigned zero potential (ground) in the node voltage method, against which all other node voltages are measured. The choice is arbitrary but conventionally placed at the most connected node or at a marked ground symbol. |
| Supernode | A technique used in the node voltage method when a voltage source connects two non-reference nodes. A supernode encloses both nodes and the source in a single boundary, writing one KCL equation for the combined surface plus a constraint equation from the source voltage. |
| Mesh current method | A systematic analysis technique that assigns a circulating current variable to each mesh and writes KVL equations in terms of those mesh currents. Requires \(m\) equations for a circuit with \(m\) meshes. Preferred when there are few meshes relative to nodes. |
| Supermesh | A technique used in the mesh current method when a current source appears in a branch shared between two meshes. A supermesh bypasses the current source by writing one KVL equation around the outer perimeter of the two meshes, plus a constraint equation from the source current. |
| Superposition principle | A property of linear circuits stating that the total response is the sum of responses to each independent source acting alone (with all other sources killed — voltage sources replaced by short circuits, current sources by open circuits). Applies only to linear circuits; cannot be used to compute power directly. |
| Delta configuration | A three-terminal resistor arrangement in which three resistors are connected end-to-end in a triangle (Δ shape). Used in three-phase power systems and as an intermediate form in delta-wye transformation. |
| Wye configuration | A three-terminal resistor arrangement in which three resistors share one common node, radiating outward like a Y or star. Common in three-phase power systems. Equivalent to a delta network through the delta-wye transformation. |
| Delta-wye transformation | A technique for converting a delta (Δ) resistor network to an equivalent wye (Y) network, or vice versa. The transformation formulas are \(R_Y = R_{\Delta,\text{adj}} \cdot R_{\Delta,\text{adj}} / \sum R_\Delta\) for delta-to-wye, enabling simplification of circuits that cannot be reduced by series/parallel rules alone. |
| Equivalent resistance | The single resistance value that, when substituted for a network, produces the same terminal voltage-current relationship as the original network. Found by combining resistors using series/parallel rules, delta-wye transformations, or by applying a test source to the terminals. |

</div>
