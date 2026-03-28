---
title: Chapter 3 — Kirchhoff's Laws and Circuit Topology
description: Conservation laws and systematic methods for analyzing any electrical circuit including KCL, KVL, node voltage, mesh current, and delta-wye transformation
generated_by: claude skill chapter-content-generator
date: 2026-01-30
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 3 — Kirchhoff's Laws and Circuit Topology

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

This chapter introduces Kirchhoff's Voltage Law (KVL) and Kirchhoff's Current Law (KCL), the two fundamental conservation laws that govern all electrical circuits. These laws, published by Gustav Kirchhoff in 1845, provide the mathematical framework needed to analyze circuits of any complexity.

While Ohm's Law describes the behavior of individual components, Kirchhoff's Laws describe what happens at connections — where currents meet at nodes and voltages distribute around loops. Combined with systematic methods, these laws make it possible to solve any linear DC circuit.

The chapter covers circuit topology concepts including nodes, branches, loops, and meshes, then develops two powerful systematic techniques: the node voltage method and the mesh current method. Special cases involving supernodes and supermeshes are addressed, along with the superposition principle for multi-source circuits. The chapter concludes with delta-wye transformations and circuit simplification strategies.

**Key Takeaways**

1. Kirchhoff's Current Law (KCL) enforces conservation of charge at every node, and Kirchhoff's Voltage Law (KVL) enforces conservation of energy around every closed loop.
2. The node voltage method and mesh current method provide systematic procedures that can solve any linear circuit, with the choice between them depending on circuit topology.
3. Delta-wye transformations convert between equivalent resistor configurations, enabling simplification of circuits that cannot be reduced by series and parallel rules alone.

</details>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
This chapter introduces Kirchhoff's Voltage Law (KVL) and Kirchhoff's Current Law (KCL), the two fundamental conservation laws that govern all electrical circuits. Students will learn about circuit topology concepts including loops, meshes, and the systematic methods for analyzing complex circuits. The chapter covers node voltage and mesh current methods, including techniques for handling special cases like supernodes and supermeshes. By the end of this chapter, students will have the tools to systematically analyze any DC circuit using matrix-based techniques.
</p>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Concepts Covered</h2>

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

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Prerequisites</h2>

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Before beginning this chapter, students should have:

- Understanding of electric charge, voltage, current, power, and resistance (Chapter 1)
- Mastery of Ohm's Law, series and parallel circuits, and voltage/current dividers (Chapter 2)
- Familiarity with circuit schematic symbols and conventions

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.1 Kirchhoff's Current Law (KCL)</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Kirchhoff's Current Law** is a direct consequence of the conservation of electric charge. It states that the algebraic sum of all currents entering and leaving any node in a circuit must equal zero.

In equation form:

$$\sum_{k=1}^{n} i_k = 0$$

Equivalently, the total current flowing into a node equals the total current flowing out of that node. This principle holds because charge cannot accumulate at a node — every coulomb that arrives must also depart.

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: KCL Node Visualization</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/kcl-node-viz/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Applying KCL</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — KCL at a Three-Wire Node</p>

Consider a node where three wires meet. If $I_1 = 5$ A flows in and $I_2 = 3$ A flows in, determine the current through the third wire.

By KCL: $I_1 + I_2 + I_3 = 0$

Defining currents entering as positive: $5 + 3 + I_3 = 0$

Therefore: $I_3 = -8$ A (the negative sign indicates current flows **out** of the node)

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Current | Direction | Value |
|---------|-----------|-------|
| $I_1$ | Into node | +5 A |
| $I_2$ | Into node | +3 A |
| $I_3$ | Out of node | -8 A |
| **Sum** | — | **0 A** |

</div>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.2 Kirchhoff's Voltage Law (KVL)</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Kirchhoff's Voltage Law** is a consequence of conservation of energy. It states that the algebraic sum of all voltages around any closed loop in a circuit must equal zero.

$$\sum_{k=1}^{n} v_k = 0$$

When traversing a closed path, voltage rises from sources are exactly balanced by voltage drops across resistive elements. The net change in electrical potential around any complete loop is always zero.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Sign Convention for KVL</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Correct application of KVL requires a consistent sign convention:

1. **Choose a traversal direction** for the loop (clockwise is conventional)
2. **For voltage sources:** Entering the negative terminal and exiting the positive terminal constitutes a voltage rise (+V). The reverse constitutes a drop (−V).
3. **For resistors:** Traversing in the direction of current flow produces a voltage drop (−IR). Traversing against current flow produces a rise (+IR).

Consistency in sign assignment is essential. The same physical circuit will yield the correct result regardless of which direction is chosen for traversal, provided signs are applied consistently throughout.

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: KVL Loop Walkthrough</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/kvl-loop-walkthrough/main.html" width="100%" height="520px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">KVL Example: Single Loop Circuit</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — KVL in a Series Resistor Circuit</p>

Consider a circuit with a 12V battery and three series resistors: $R_1 = 2\Omega$, $R_2 = 3\Omega$, $R_3 = 1\Omega$.

First, determine the current using Ohm's Law:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$I = \frac{V_{source}}{R_{total}} = \frac{12\text{V}}{2+3+1\;\Omega} = \frac{12\text{V}}{6\;\Omega} = 2\text{A}$$

</div>

Apply KVL starting at the battery's negative terminal, going clockwise:

$$+12\text{V} - (2\text{A})(2\;\Omega) - (2\text{A})(3\;\Omega) - (2\text{A})(1\;\Omega) = 0$$

$$+12\text{V} - 4\text{V} - 6\text{V} - 2\text{V} = 0 \quad \checkmark$$

The 12V supplied by the battery is entirely dissipated across the three resistors, confirming conservation of energy.
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.3 Circuit Topology</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Circuit topology** is the study of how components are interconnected, independent of component type or value. Topological analysis determines the number of independent equations required to fully solve a circuit.

The fundamental topological elements are:

| Term | Definition |
|------|------------|
| **Node** | A point where two or more components connect |
| **Branch** | A path containing a single component between two nodes |
| **Loop** | Any closed path through a circuit |
| **Mesh** | A loop that contains no other loops within it (a minimal loop) |

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">The Topology Formula</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The relationship between branches, nodes, and independent meshes is given by:

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center;" markdown>

$$b = n - 1 + m$$

</div>

Where $b$ is the number of branches, $n$ is the number of nodes, and $m$ is the number of independent meshes. This formula determines that KCL yields $n-1$ independent equations and KVL yields $m$ independent equations.

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Circuit Topology Explorer</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/circuit-topology-explorer/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.4 The Node Voltage Method</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **node voltage method** is a systematic procedure for circuit analysis that minimizes the number of unknowns by working with node voltages rather than individual branch currents. The procedure is:

1. Select a **reference node** (ground) — typically the node with the most connections
2. Define voltages at all other nodes relative to the reference
3. Write KCL equations at each non-reference node
4. Solve the resulting system of equations

This method requires $n-1$ equations for a circuit with $n$ nodes. All branch currents can subsequently be derived from the solved node voltages using Ohm's Law.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">The Reference Node</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **reference node** serves as the zero-potential point against which all other node voltages are measured. Selection guidelines:

- Choose the node with the greatest number of connections (reduces the number of required equations)
- If a ground symbol is present in the schematic, use that node
- The negative terminal of a voltage source is often a convenient choice

The reference node assignment is arbitrary — it does not need to connect to physical earth ground. It is simply the datum point for voltage measurements within the circuit.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Node Voltage Example</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Two-Node Circuit</p>

Consider a circuit with a 10V source, three nodes (A, B, and reference ground), and resistors connecting them.

**Step 1:** Label the reference node (ground = 0V)

**Step 2:** Define node voltages $V_A$ and $V_B$

**Step 3:** Write KCL at each non-reference node:

At node A (assuming all currents leaving):

$$\frac{V_A - 10}{R_1} + \frac{V_A - V_B}{R_2} = 0$$

At node B:

$$\frac{V_B - V_A}{R_2} + \frac{V_B - 0}{R_3} = 0$$

**Step 4:** Solve the system of equations for $V_A$ and $V_B$, then derive all branch currents using Ohm's Law.
</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">The Supernode Technique</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

When a voltage source connects two non-reference nodes, the standard KCL equation cannot be written directly because the current through an ideal voltage source is unknown. The **supernode** technique resolves this by:

1. Enclosing the voltage source and its two connected nodes within a single boundary
2. Writing a KCL equation for the entire supernode (total current entering equals total current leaving)
3. Adding a constraint equation that relates the two node voltages through the voltage source value

This approach provides the necessary equations to solve for all unknowns.

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Supernode Analysis</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/supernode-analysis/main.html" width="100%" height="480px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.5 The Mesh Current Method</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **mesh current method** takes the complementary approach to node voltages. Instead of defining node voltages and deriving currents, this method assigns a circulating current to each mesh and writes KVL equations. The procedure is:

1. Assign a **mesh current** to each mesh (conventionally all clockwise)
2. Write KVL equations around each mesh
3. Solve for the mesh currents
4. Derive branch currents and voltages as needed

For a circuit with $m$ meshes, exactly $m$ equations are required. This method is particularly efficient when the circuit has many nodes but few meshes.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Mesh Current Sign Convention</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

When two meshes share a branch, the actual branch current is determined by the combination of both mesh currents:

| Situation | Branch Current |
|-----------|---------------|
| Only mesh 1 passes through branch | $I_1$ |
| Meshes 1 and 2 share branch, same direction | $I_1 + I_2$ |
| Meshes 1 and 2 share branch, opposite direction | $I_1 - I_2$ |

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Mesh Analysis Example</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Two-Mesh Circuit</p>

Define mesh currents $I_1$ (left mesh, clockwise) and $I_2$ (right mesh, clockwise).

**Mesh 1 (left):**
$$V_s - I_1 R_1 - (I_1 - I_2)R_2 = 0$$

**Mesh 2 (right):**
$$-(I_2 - I_1)R_2 - I_2 R_3 = 0$$

Rearranging into matrix form:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\begin{bmatrix} R_1 + R_2 & -R_2 \\ -R_2 & R_2 + R_3 \end{bmatrix} \begin{bmatrix} I_1 \\ I_2 \end{bmatrix} = \begin{bmatrix} V_s \\ 0 \end{bmatrix}$$

</div>

The resistance matrix is symmetric: the main diagonal contains the sum of resistances in each mesh, and the off-diagonal entries contain the negative of shared resistances.
</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">The Supermesh Technique</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

When a current source is shared between two meshes, a standard KVL equation cannot be written for the branch containing the current source because the voltage across an ideal current source is unknown. The **supermesh** technique resolves this by:

1. Combining the two meshes that share the current source into a single outer loop
2. Writing KVL around the supermesh (excluding the current source branch)
3. Adding a constraint equation relating the two mesh currents through the current source value

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Mesh vs. Supermesh Comparison</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/mesh-supermesh-compare/main.html" width="100%" height="520px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.6 The Superposition Principle</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **superposition principle** provides a divide-and-conquer approach for circuits with multiple independent sources:

In a linear circuit with multiple independent sources, the response (voltage or current) at any point equals the algebraic sum of the responses caused by each source acting alone, with all other independent sources deactivated.

Deactivating sources means:

- **Voltage sources** → Replace with a short circuit (0V, wire)
- **Current sources** → Replace with an open circuit (0A, break)

Superposition is valid because Ohm's Law is linear — the relationship between voltage and current is proportional, and responses from multiple sources combine additively. This principle does not apply to circuits containing nonlinear elements.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Superposition Example</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Two-Source Circuit</p>

Consider a circuit with a 12V voltage source and a 2A current source. To find the current through resistor $R$:

**Step 1:** Deactivate the current source (open circuit). Solve for $I_R'$ due to the voltage source alone.

**Step 2:** Deactivate the voltage source (short circuit). Solve for $I_R''$ due to the current source alone.

**Step 3:** Combine: $I_R = I_R' + I_R''$

If the two contributions flow in opposite directions, algebraic addition accounts for the sign difference automatically.
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Superposition Principle Demonstrator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/superposition-demo/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.7 Load Resistance and Equivalent Resistance</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Load resistance** ($R_L$) is the resistance of the component or subsystem being powered by a circuit. The remainder of the circuit exists to deliver energy to this load.

**Equivalent resistance** ($R_{eq}$) reduces a complex resistor network to a single resistance value that draws the same current from the source as the original network. The standard reduction formulas are:

| Configuration | Formula |
|---------------|---------|
| Series | $R_{eq} = R_1 + R_2 + \cdots + R_n$ |
| Parallel | $\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots + \frac{1}{R_n}$ |
| Mixed | Combine step by step using series and parallel rules |

Some resistor configurations — notably bridge circuits — cannot be reduced using series and parallel rules alone. These require the delta-wye transformation described in the next section.

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.8 Delta and Wye Configurations</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Two three-terminal resistor configurations frequently appear in circuit analysis:

**Delta configuration** (Δ, also called pi π): Three resistors connected in a triangle, where each resistor directly connects two of the three terminals.

**Wye configuration** (Y, also called T): Three resistors that share a common central node, with each resistor extending to one of the three terminals.

These two configurations can be made electrically equivalent — from the external terminals, they exhibit identical behavior despite having different internal structures.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Delta-Wye Transformation Formulas</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Delta to Wye** — each wye resistor equals the product of the two adjacent delta resistors divided by the sum of all three delta resistors:

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center;" markdown>

$$R_1 = \frac{R_a R_b}{R_a + R_b + R_c} \qquad R_2 = \frac{R_b R_c}{R_a + R_b + R_c} \qquad R_3 = \frac{R_a R_c}{R_a + R_b + R_c}$$

</div>

**Wye to Delta** — each delta resistor equals the sum of all pairwise products of wye resistors divided by the opposite wye resistor:

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center;" markdown>

$$R_a = \frac{R_1 R_2 + R_2 R_3 + R_1 R_3}{R_3} \qquad R_b = \frac{R_1 R_2 + R_2 R_3 + R_1 R_3}{R_1} \qquad R_c = \frac{R_1 R_2 + R_2 R_3 + R_1 R_3}{R_2}$$

</div>

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Delta-Wye Transformation Calculator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/delta-wye-transform/main.html" width="100%" height="520px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">When to Use Delta-Wye Transformation</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Delta-wye transformation is most applicable in these situations:

1. **Bridge circuits** (such as the Wheatstone bridge) where a resistor cannot be classified as series or parallel
2. **Complex networks** that resist simplification through series and parallel reduction alone
3. **Three-phase power systems** encountered in later chapters

After performing the transformation, standard series and parallel reduction rules can be applied to complete the simplification.

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.9 Circuit Simplification</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Circuit simplification** reduces a complex circuit to its simplest equivalent form using a systematic strategy:

1. **Identify** series or parallel resistor groups
2. **Combine** them step by step using the appropriate formulas
3. **Apply delta-wye transformation** if no further series/parallel reductions are possible
4. **Repeat** until a single equivalent resistance remains

The available simplification tools are:

| Technique | Formula |
|-----------|---------|
| Series combination | $R_{eq} = R_1 + R_2$ |
| Parallel combination | $R_{eq} = \frac{R_1 R_2}{R_1 + R_2}$ |
| Delta-wye transformation | See Section 3.8 |
| Source transformations | Covered in Chapter 4 |

Always attempt series and parallel reduction before resorting to delta-wye transformation, as the simpler methods are less prone to computational error.

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Circuit Simplification Step-by-Step</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/circuit-simplification/main.html" width="100%" height="580px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.10 Choosing an Analysis Method</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

With multiple analysis techniques available, the choice of method depends on the circuit characteristics:

| Circuit Characteristic | Recommended Method |
|-----------------------|-------------------|
| Few nodes, many meshes | Node Voltage Method |
| Few meshes, many nodes | Mesh Current Method |
| Multiple independent sources | Superposition (then either method) |
| Need only one current or voltage | Simplification + Ohm's Law |
| Bridge or complex topology | Delta-Wye transformation first |
| Voltage source between non-reference nodes | Supernode technique |
| Current source shared between meshes | Supermesh technique |

Both the node voltage method and the mesh current method can solve any planar circuit. Select the method that produces fewer simultaneous equations based on the circuit's node and mesh count.

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.11 Systematic Analysis: The Matrix Approach</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

For larger circuits, organizing the system of equations into matrix form enables efficient computation. The two standard matrix formulations are:

**Node voltage formulation** with $n-1$ unknowns:

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center;" markdown>

$$\mathbf{G} \mathbf{V} = \mathbf{I}$$

</div>

where $\mathbf{G}$ is the conductance matrix, $\mathbf{V}$ is the node voltage vector, and $\mathbf{I}$ is the source current vector.

**Mesh current formulation** with $m$ unknowns:

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center;" markdown>

$$\mathbf{R} \mathbf{I} = \mathbf{V}$$

</div>

where $\mathbf{R}$ is the resistance matrix, $\mathbf{I}$ is the mesh current vector, and $\mathbf{V}$ is the source voltage vector.

For circuits containing only passive elements and independent sources, both matrices exhibit these properties:

- **Symmetric** — the matrix equals its transpose
- **Positive main diagonal** — entries are sums of connected conductances or resistances
- **Negative off-diagonal** — entries are the negatives of shared conductances or resistances

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Matrix Equation Builder</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/matrix-equation-builder/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Chapter Summary</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

This chapter covered the fundamental laws and systematic methods for analyzing any DC circuit:

- **Kirchhoff's Current Law (KCL):** The algebraic sum of currents at any node equals zero
- **Kirchhoff's Voltage Law (KVL):** The algebraic sum of voltages around any closed loop equals zero
- **Circuit topology:** Nodes, branches, loops, and meshes define circuit structure
- **Node Voltage Method:** Systematic analysis using KCL at non-reference nodes
- **Mesh Current Method:** Systematic analysis using KVL around each mesh
- **Supernodes and Supermeshes:** Techniques for handling voltage sources between nodes and current sources in meshes
- **Superposition:** Analyzing multi-source circuits by considering each source independently
- **Delta-Wye Transformation:** Converting between equivalent three-terminal resistor configurations
- **Circuit Simplification:** Systematic reduction of complex networks to equivalent resistance

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Key Equations Reference</h3>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

| Concept | Equation |
|---------|----------|
| KCL | $\sum i_k = 0$ |
| KVL | $\sum v_k = 0$ |
| Topology | $b = n - 1 + m$ |
| Delta→Wye | $R_Y = \frac{R_{\Delta,adj1} \cdot R_{\Delta,adj2}}{\sum R_\Delta}$ |
| Wye→Delta | $R_\Delta = \frac{\sum (R_Y \text{ products})}{R_{Y,opposite}}$ |

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">What's Next</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Chapter 4 introduces additional analysis tools: Thévenin and Norton equivalent circuits, source transformations, and the maximum power transfer theorem. These techniques enable further circuit simplification and address practical questions about optimal power delivery to loads.

</div>

---

??? question "Chapter 3 Review: Test Your Understanding"
    1. At a node with four wires, if currents of 3A, -5A, and 4A flow through three of them (positive = into node), what current flows through the fourth wire?

    2. In a loop with a 9V battery and two resistors (3Ω and 6Ω), what is the current?

    3. When should you use a supernode?

    4. What is the difference between a loop and a mesh?

    5. If a circuit has 4 nodes and 6 branches, how many independent meshes does it have?

    **Answers:**

    1. By KCL: 3 + (-5) + 4 + I₄ = 0, so I₄ = -2A (flows out of node)

    2. I = V/(R₁+R₂) = 9V/9Ω = 1A

    3. When a voltage source connects two non-reference nodes

    4. A mesh is a loop that contains no other loops inside it (a minimal loop)

    5. Using b = n - 1 + m: 6 = 4 - 1 + m, so m = 3 meshes

</div>
