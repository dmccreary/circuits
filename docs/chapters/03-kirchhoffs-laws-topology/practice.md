---
title: Chapter 3 Practice Problems — Kirchhoff's Laws and Circuit Topology
description: Practice problems with hints for Chapter 3 covering KCL, KVL, nodes, branches, loops, and multi-loop circuit analysis
---

<div class="unit1-styled" markdown>

# Chapter 3 Practice Problems — Kirchhoff's Laws and Circuit Topology

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — KCL at a Node

At a circuit node, four wires carry the following currents (positive values enter the node, negative values leave):

\(I_1 = 8\) mA (into node), \(I_2 = -3\) mA, \(I_3 = 5\) mA (into node), and \(I_4\) is unknown.

**(a)** Apply KCL to find \(I_4\).

**(b)** Does \(I_4\) flow into or out of the node? How do you know?

**(c)** If a fifth branch is added carrying \(I_5 = 4\) mA out of the node, what current must now flow through a sixth branch to maintain KCL?

??? tip "Hint"
    **(a)** KCL states \(\sum i_k = 0\) at any node. With your sign convention (into = positive), write \(I_1 + I_2 + I_3 + I_4 = 0\) and solve for \(I_4\).

    **(b)** A negative result for \(I_4\) means current flows out of the node (opposite to the assumed positive direction). A positive result means it flows in.

    **(c)** Add the new branch: \(I_1 + I_2 + I_3 + I_4 + (-I_5) + I_6 = 0\). Substitute the known values and solve for \(I_6\).

---

## Problem 2 — KVL Around a Single Loop

A single loop contains a 15 V source, \(R_1 = 1\) kΩ, and \(R_2 = 4\) kΩ in series. The loop also contains an unknown voltage element \(V_x\).

**(a)** Using KVL (going clockwise from the negative terminal of the source), write the equation and identify all terms.

**(b)** If \(V_x = 3\) V (a voltage rise when traversed clockwise), find the current in the loop.

**(c)** Verify your answer by computing the voltage drops across \(R_1\) and \(R_2\) and confirming that all voltages around the loop sum to zero.

??? tip "Hint"
    **(a)** KVL: the sum of voltage rises and drops around any closed loop equals zero. Assign signs carefully: going through the source from − to + is a rise (+15 V); going through a resistor in the direction of current is a drop (−IR).

    **(b)** With \(V_x = +3\) V included, the loop equation becomes \(+15 - I R_1 - I R_2 - 3 = 0\). Solve for I. The equivalent source driving the loop is \(15 - 3 = 12\) V.

    **(c)** Compute \(V_{R1} = I R_1\) and \(V_{R2} = I R_2\). Check that \(+15 - V_{R1} - V_{R2} - 3 = 0\).

---

## Problem 3 — Circuit Topology: Nodes, Branches, and Meshes

A circuit contains the following elements connected as described:
- Three resistors: \(R_1\) between nodes A and B, \(R_2\) between nodes B and C, \(R_3\) between nodes A and C
- One voltage source: between nodes A and ground (node D)
- One current source: between nodes C and ground (node D)

**(a)** List all nodes and count them.

**(b)** Count the branches (each component is one branch).

**(c)** Use the topology formula \(b = n - 1 + m\) to find the number of independent meshes. How many independent KVL equations can you write?

??? tip "Hint"
    **(a)** Nodes are the named connection points. Count: A, B, C, and ground (D) — four nodes in total.

    **(b)** Count every two-terminal element: \(R_1\), \(R_2\), \(R_3\), the voltage source, and the current source give 5 branches.

    **(c)** Rearrange to \(m = b - (n - 1)\). Substitute \(b = 5\) and \(n = 4\). The number of independent KVL equations equals the number of meshes \(m\).

---

## Problem 4 — Two-Loop KVL Analysis

A circuit has a 12 V source with internal resistance \(R_s = 1\) Ω. It drives two parallel branches: \(R_1 = 5\) Ω and \(R_2 = 10\) Ω.

**(a)** Define mesh currents \(I_1\) (outer clockwise loop through \(R_s\) and \(R_1\)) and \(I_2\) (inner loop through \(R_1\) and \(R_2\)). Write the KVL equation for each mesh.

**(b)** Solve the system of two equations for \(I_1\) and \(I_2\).

**(c)** Find the actual current through \(R_1\) (which is shared by both meshes) and the voltage across \(R_2\).

??? tip "Hint"
    **(a)** Mesh 1 (outer): \(+12 - I_1 R_s - (I_1 - I_2) R_1 = 0\). Mesh 2 (inner): \(-(I_2 - I_1) R_1 - I_2 R_2 = 0\). Substitute the numeric values and collect terms.

    **(b)** You will get two equations in two unknowns. Solve by substitution or elimination.

    **(c)** The current through the shared branch \(R_1\) is \(I_1 - I_2\). The voltage across \(R_2\) is \(I_2 R_2\).

---

</div>
