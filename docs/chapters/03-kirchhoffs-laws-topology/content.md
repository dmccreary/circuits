---
title: Chapter 3 Content — Kirchhoff's Laws and Circuit Topology
description: Teaching content covering KCL, KVL, circuit topology, node voltage method, mesh current method, superposition, and delta-wye transformation
generated_by: claude skill chapter-content-generator
date: 2026-01-30
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 3 — Kirchhoff's Laws and Circuit Topology

<h2 id="31-kirchhoffs-current-law" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">3.1 Kirchhoff's Current Law (KCL)</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Kirchhoff's Current Law</strong> is a direct consequence of the conservation of electric charge. It states that the algebraic sum of all currents entering and leaving any node in a circuit must equal zero. Every coulomb of charge that arrives at a node must also depart — charge cannot accumulate at a junction.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\sum_{k=1}^{n} i_k = 0$$

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Equivalently, the total current flowing into a node equals the total current flowing out. By convention, currents entering a node are assigned positive signs and currents leaving are assigned negative signs. Consistent application of this sign convention ensures correct results.
</p>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: KCL Node Visualization</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/kcl-node-viz/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Applying KCL</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — KCL at a Three-Wire Node</p>

<p style="color: #555; line-height: 1.75;">
Consider a node where three wires meet. If <span class="arithmatex">\(I_1 = 5\)</span> A flows in and <span class="arithmatex">\(I_2 = 3\)</span> A flows in, determine the current through the third wire.
</p>

<p style="color: #555; line-height: 1.75;">
By KCL: <span class="arithmatex">\(I_1 + I_2 + I_3 = 0\)</span>
</p>

<p style="color: #555; line-height: 1.75;">
Defining currents entering as positive: <span class="arithmatex">\(5 + 3 + I_3 = 0\)</span>
</p>

<p style="color: #555; line-height: 1.75; margin-bottom: 1rem;">
Therefore: <span class="arithmatex">\(I_3 = -8\)</span> A — the negative sign indicates current flows <strong>out</strong> of the node.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Current | Direction | Value |
|---------|-----------|-------|
| \(I_1\) | Into node | +5 A |
| \(I_2\) | Into node | +3 A |
| \(I_3\) | Out of node | −8 A |
| **Sum** | — | **0 A** |

</div>
</div>

---

<h2 id="32-kirchhoffs-voltage-law" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">3.2 Kirchhoff's Voltage Law (KVL)</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Kirchhoff's Voltage Law</strong> is a consequence of conservation of energy. It states that the algebraic sum of all voltages around any closed loop in a circuit must equal zero. When traversing a closed path, voltage rises from sources are exactly balanced by voltage drops across resistive elements.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\sum_{k=1}^{n} v_k = 0$$

</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Sign Convention for KVL</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
Correct application of KVL requires a consistent sign convention. The standard approach is:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Choose a traversal direction</strong> for the loop (clockwise is conventional)</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>For voltage sources:</strong> Entering the negative terminal and exiting the positive terminal constitutes a voltage rise (+V). The reverse constitutes a drop (−V).</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>For resistors:</strong> Traversing in the direction of current flow produces a voltage drop (−IR). Traversing against current flow produces a rise (+IR).</li>
</ul>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: KVL Loop Walkthrough</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/kvl-loop-walkthrough/main.html" width="100%" height="520px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">KVL Example: Single Loop Circuit</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — KVL in a Series Resistor Circuit</p>

<p style="color: #555; line-height: 1.75;">
Consider a circuit with a 12V battery and three series resistors: <span class="arithmatex">\(R_1 = 2\Omega\)</span>, <span class="arithmatex">\(R_2 = 3\Omega\)</span>, <span class="arithmatex">\(R_3 = 1\Omega\)</span>.
</p>

<p style="color: #555; line-height: 1.75;">
First, determine the current using Ohm's Law:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$I = \frac{V_{source}}{R_{total}} = \frac{12\text{V}}{2+3+1\;\Omega} = \frac{12\text{V}}{6\;\Omega} = 2\text{A}$$

</div>

<p style="color: #555; line-height: 1.75;">
Apply KVL starting at the battery's negative terminal, going clockwise:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$+12\text{V} - (2\text{A})(2\;\Omega) - (2\text{A})(3\;\Omega) - (2\text{A})(1\;\Omega) = 0$$

$$+12\text{V} - 4\text{V} - 6\text{V} - 2\text{V} = 0 \quad \checkmark$$

</div>

<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
The 12V supplied by the battery is entirely dissipated across the three resistors, confirming conservation of energy.
</p>
</div>

---

<h2 id="33-circuit-topology" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">3.3 Circuit Topology</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Circuit topology</strong> is the study of how components are interconnected, independent of component type or value. Topological analysis determines the number of independent equations required to fully solve a circuit.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Term | Definition |
|------|------------|
| **Node** | A point where two or more components connect |
| **Branch** | A path containing a single component between two nodes |
| **Loop** | Any closed path through a circuit |
| **Mesh** | A loop that contains no other loops within it (a minimal loop) |

</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The Topology Formula</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
The relationship between branches, nodes, and independent meshes is given by:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$b = n - 1 + m$$

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
where <span class="arithmatex">\(b\)</span> is the number of branches, <span class="arithmatex">\(n\)</span> is the number of nodes, and <span class="arithmatex">\(m\)</span> is the number of independent meshes. KCL yields <span class="arithmatex">\(n-1\)</span> independent equations and KVL yields <span class="arithmatex">\(m\)</span> independent equations.
</p>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Circuit Topology Explorer</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/circuit-topology-explorer/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="34-node-voltage-method" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">3.4 The Node Voltage Method</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">node voltage method</strong> is a systematic procedure for circuit analysis that minimizes the number of unknowns by working with node voltages rather than individual branch currents. For a circuit with <span class="arithmatex">\(n\)</span> nodes, this method requires <span class="arithmatex">\(n-1\)</span> equations.
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 1:</strong> Select a <strong>reference node</strong> (ground) — typically the node with the most connections</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 2:</strong> Define voltages at all other nodes relative to the reference</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 3:</strong> Write KCL equations at each non-reference node</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 4:</strong> Solve the resulting system of equations</li>
</ul>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The Reference Node</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">reference node</strong> serves as the zero-potential point against which all other node voltages are measured. The assignment is arbitrary — it does not need to connect to physical earth ground.
</p>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(56,142,60,0.08);">
<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 10px;">Reference Node Selection Guidelines</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">
Choose the node with the greatest number of connections to minimize the number of required equations. If a ground symbol is present in the schematic, use that node. The negative terminal of a voltage source is often a convenient choice.
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Node Voltage Example</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Two-Node Circuit</p>

<p style="color: #555; line-height: 1.75;">
Consider a circuit with a 10V source, three nodes (A, B, and reference ground), and resistors connecting them.
</p>

<p style="color: #555; line-height: 1.75;"><strong>Step 1:</strong> Label the reference node (ground = 0V)</p>
<p style="color: #555; line-height: 1.75;"><strong>Step 2:</strong> Define node voltages <span class="arithmatex">\(V_A\)</span> and <span class="arithmatex">\(V_B\)</span></p>
<p style="color: #555; line-height: 1.75;"><strong>Step 3:</strong> Write KCL at each non-reference node. At node A (assuming all currents leaving):</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\frac{V_A - 10}{R_1} + \frac{V_A - V_B}{R_2} = 0$$

</div>

<p style="color: #555; line-height: 1.75;">At node B:</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\frac{V_B - V_A}{R_2} + \frac{V_B - 0}{R_3} = 0$$

</div>

<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
<strong>Step 4:</strong> Solve the system for <span class="arithmatex">\(V_A\)</span> and <span class="arithmatex">\(V_B\)</span>, then derive all branch currents using Ohm's Law.
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The Supernode Technique</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
When a voltage source connects two non-reference nodes, the standard KCL equation cannot be written directly because the current through an ideal voltage source is unknown. The <strong style="color: #333;">supernode</strong> technique resolves this situation.
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Enclose the voltage source and its two connected nodes within a single boundary</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Write a KCL equation for the entire supernode (total current entering = total current leaving)</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Add a constraint equation relating the two node voltages through the voltage source value</li>
</ul>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Supernode Analysis</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/supernode-analysis/main.html" width="100%" height="480px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="35-mesh-current-method" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">3.5 The Mesh Current Method</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">mesh current method</strong> takes the complementary approach to node voltages. Instead of defining node voltages and deriving currents, this method assigns a circulating current to each mesh and writes KVL equations. For a circuit with <span class="arithmatex">\(m\)</span> meshes, exactly <span class="arithmatex">\(m\)</span> equations are required. This method is particularly efficient when the circuit has many nodes but few meshes.
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 1:</strong> Assign a <strong>mesh current</strong> to each mesh (conventionally all clockwise)</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 2:</strong> Write KVL equations around each mesh</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 3:</strong> Solve for the mesh currents</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 4:</strong> Derive branch currents and voltages as needed</li>
</ul>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Mesh Current Sign Convention</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
When two meshes share a branch, the actual branch current is determined by the combination of both mesh currents:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Situation | Branch Current |
|-----------|---------------|
| Only mesh 1 passes through branch | \(I_1\) |
| Meshes 1 and 2 share branch, same direction | \(I_1 + I_2\) |
| Meshes 1 and 2 share branch, opposite direction | \(I_1 - I_2\) |

</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Mesh Analysis Example</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Two-Mesh Circuit</p>

<p style="color: #555; line-height: 1.75;">
Define mesh currents <span class="arithmatex">\(I_1\)</span> (left mesh, clockwise) and <span class="arithmatex">\(I_2\)</span> (right mesh, clockwise).
</p>

<p style="color: #555; line-height: 1.75;"><strong>Mesh 1 (left):</strong></p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$V_s - I_1 R_1 - (I_1 - I_2)R_2 = 0$$

</div>

<p style="color: #555; line-height: 1.75;"><strong>Mesh 2 (right):</strong></p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$-(I_2 - I_1)R_2 - I_2 R_3 = 0$$

</div>

<p style="color: #555; line-height: 1.75;">
Rearranging into matrix form:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\begin{bmatrix} R_1 + R_2 & -R_2 \\ -R_2 & R_2 + R_3 \end{bmatrix} \begin{bmatrix} I_1 \\ I_2 \end{bmatrix} = \begin{bmatrix} V_s \\ 0 \end{bmatrix}$$

</div>

<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
The resistance matrix is symmetric: the main diagonal contains the sum of resistances in each mesh, and the off-diagonal entries contain the negative of shared resistances.
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The Supermesh Technique</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
When a current source is shared between two meshes, a standard KVL equation cannot be written for the branch containing the current source because the voltage across an ideal current source is unknown. The <strong style="color: #333;">supermesh</strong> technique resolves this by:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Combining the two meshes that share the current source into a single outer loop</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Writing KVL around the supermesh (excluding the current source branch)</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Adding a constraint equation relating the two mesh currents through the current source value</li>
</ul>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Mesh vs. Supermesh Comparison</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/mesh-supermesh-compare/main.html" width="100%" height="520px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="36-superposition-principle" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">3.6 The Superposition Principle</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">superposition principle</strong> provides a divide-and-conquer approach for circuits with multiple independent sources. In a linear circuit, the response at any point equals the algebraic sum of the responses caused by each source acting alone, with all other independent sources deactivated.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
Deactivating sources means:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Voltage sources</strong> → Replace with a short circuit (0V, wire)</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Current sources</strong> → Replace with an open circuit (0A, break)</li>
</ul>

<div style="background: #FFF8E1; border-left: 4px solid #F0D87A; border-radius: 8px; padding: 16px 20px; margin: 1rem 0;">
<strong style="color: #B8860B;">Key Insight — Linearity Requirement:</strong> Superposition is valid because Ohm's Law is linear — voltage and current are proportional, and responses from multiple sources combine additively. This principle does not apply to circuits containing nonlinear elements such as diodes.
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Superposition Principle Demonstrator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/superposition-demo/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="37-load-and-equivalent-resistance" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">3.7 Load Resistance and Equivalent Resistance</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Load resistance</strong> (<span class="arithmatex">\(R_L\)</span>) is the resistance of the component or subsystem being powered by a circuit. <strong style="color: #333;">Equivalent resistance</strong> (<span class="arithmatex">\(R_{eq}\)</span>) reduces a complex resistor network to a single resistance value that draws the same current from the source as the original network.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Configuration | Formula |
|---------------|---------|
| Series | \(R_{eq} = R_1 + R_2 + \cdots + R_n\) |
| Parallel | \(\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots + \frac{1}{R_n}\) |
| Mixed | Combine step by step using series and parallel rules |

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Some resistor configurations — notably bridge circuits — cannot be reduced using series and parallel rules alone. These require the <strong style="color: #333;">delta-wye transformation</strong> described in the next section.
</p>

---

<h2 id="38-delta-and-wye-configurations" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">3.8 Delta and Wye Configurations</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Two three-terminal resistor configurations frequently appear in circuit analysis:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Delta configuration</strong> (Δ, also called pi π) — three resistors connected in a triangle, where each resistor directly connects two of the three terminals</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Wye configuration</strong> (Y, also called T) — three resistors that share a common central node, with each resistor extending to one of the three terminals</li>
</ul>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Delta-to-Wye Transformation</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
Each wye resistor equals the product of the two adjacent delta resistors divided by the sum of all three delta resistors:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$R_1 = \frac{R_a R_b}{R_a + R_b + R_c} \qquad R_2 = \frac{R_b R_c}{R_a + R_b + R_c} \qquad R_3 = \frac{R_a R_c}{R_a + R_b + R_c}$$

</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Wye-to-Delta Transformation</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
Each delta resistor equals the sum of all pairwise products of wye resistors divided by the opposite wye resistor:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$R_a = \frac{R_1 R_2 + R_2 R_3 + R_1 R_3}{R_3} \qquad R_b = \frac{R_1 R_2 + R_2 R_3 + R_1 R_3}{R_1} \qquad R_c = \frac{R_1 R_2 + R_2 R_3 + R_1 R_3}{R_2}$$

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Delta-Wye Transformation Calculator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/delta-wye-transform/main.html" width="100%" height="520px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="39-circuit-simplification" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">3.9 Circuit Simplification</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Circuit simplification</strong> reduces a complex circuit to its simplest equivalent form using a systematic strategy:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 1:</strong> Identify series or parallel resistor groups</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 2:</strong> Combine them step by step using the appropriate formulas</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 3:</strong> Apply delta-wye transformation if no further series/parallel reductions are possible</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Step 4:</strong> Repeat until a single equivalent resistance remains</li>
</ul>

<div style="background: #FFF8E1; border-left: 4px solid #F0D87A; border-radius: 8px; padding: 16px 20px; margin: 1rem 0;">
<strong style="color: #B8860B;">Key Insight — Simplification Priority:</strong> Always attempt series and parallel reduction before resorting to delta-wye transformation. The simpler methods are less prone to computational error and should be exhausted first.
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Circuit Simplification Step-by-Step</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/circuit-simplification/main.html" width="100%" height="580px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="310-choosing-an-analysis-method" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">3.10 Choosing an Analysis Method</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
With multiple analysis techniques available, the choice of method depends on the circuit characteristics:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Circuit Characteristic | Recommended Method |
|-----------------------|-------------------|
| Few nodes, many meshes | Node Voltage Method |
| Few meshes, many nodes | Mesh Current Method |
| Multiple independent sources | Superposition (then either method) |
| Need only one current or voltage | Simplification + Ohm's Law |
| Bridge or complex topology | Delta-Wye transformation first |
| Voltage source between non-reference nodes | Supernode technique |
| Current source shared between meshes | Supermesh technique |

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Both the node voltage method and the mesh current method can solve any planar circuit. Select the method that produces fewer simultaneous equations based on the circuit's node and mesh count.
</p>

---

<h2 id="311-matrix-approach" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">3.11 Systematic Analysis: The Matrix Approach</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
For larger circuits, organizing the system of equations into matrix form enables efficient computation. The two standard matrix formulations are:
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
<strong style="color: #333;">Node voltage formulation</strong> with <span class="arithmatex">\(n-1\)</span> unknowns:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\mathbf{G} \mathbf{V} = \mathbf{I}$$

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
<strong style="color: #333;">Mesh current formulation</strong> with <span class="arithmatex">\(m\)</span> unknowns:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\mathbf{R} \mathbf{I} = \mathbf{V}$$

</div>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(56,142,60,0.08);">
<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 10px;">Matrix Properties</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">
For circuits containing only passive elements and independent sources, both matrices are <strong>symmetric</strong>. Main diagonal entries are positive sums of connected conductances or resistances. Off-diagonal entries are the negatives of shared conductances or resistances.
</p>
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Matrix Equation Builder</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/matrix-equation-builder/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Chapter Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
This chapter covered the fundamental laws and systematic methods for analyzing any DC circuit. Kirchhoff's Current Law enforces conservation of charge at nodes, while Kirchhoff's Voltage Law enforces conservation of energy around loops. Circuit topology — nodes, branches, loops, and meshes — determines the structure of analysis equations. The node voltage method and mesh current method provide systematic procedures that work for any linear circuit, with supernodes and supermeshes handling special source configurations. The superposition principle decomposes multi-source circuits into single-source problems. Delta-wye transformations enable simplification of circuits that cannot be reduced by series and parallel rules alone.
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Key Equations Reference</h3>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

| Concept | Equation |
|---------|----------|
| KCL | \(\sum i_k = 0\) |
| KVL | \(\sum v_k = 0\) |
| Topology | \(b = n - 1 + m\) |
| Delta→Wye | \(R_Y = \frac{R_{\Delta,adj1} \cdot R_{\Delta,adj2}}{\sum R_\Delta}\) |
| Wye→Delta | \(R_\Delta = \frac{\sum (R_Y \text{ products})}{R_{Y,opposite}}\) |

</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">What's Next</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Chapter 4 introduces additional analysis tools: Thévenin and Norton equivalent circuits, source transformations, and the maximum power transfer theorem. These techniques enable further circuit simplification and address practical questions about optimal power delivery to loads.
</p>

---

??? question "Chapter 3 Review: Test Your Understanding"
    1. At a node with four wires, if currents of 3A, −5A, and 4A flow through three of them (positive = into node), what current flows through the fourth wire?
    2. In a loop with a 9V battery and two resistors (3Ω and 6Ω), what is the current?
    3. When should you use a supernode?
    4. What is the difference between a loop and a mesh?
    5. If a circuit has 4 nodes and 6 branches, how many independent meshes does it have?

    **Answers:**

    1. By KCL: 3 + (−5) + 4 + I₄ = 0, so I₄ = −2A (flows out of node)
    2. I = V/(R₁+R₂) = 9V/9Ω = 1A
    3. When a voltage source connects two non-reference nodes
    4. A mesh is a loop that contains no other loops inside it (a minimal loop)
    5. Using b = n − 1 + m: 6 = 4 − 1 + m, so m = 3 meshes

</div>
