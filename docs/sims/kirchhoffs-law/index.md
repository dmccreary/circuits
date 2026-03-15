---
title: Kirchhoff's Laws, Mesh & Node Analysis
description: Interactive MicroSim teaching KVL, KCL, mesh current method, and node voltage method using a live two-mesh circuit with adjustable components.
---

# Kirchhoff's Laws, Mesh & Node Analysis

<iframe src="main.html" width="100%" height="550px" scrolling="no"></iframe>

[Open in full page](main.html){ .md-button }

## How to Use

The simulation uses a fixed two-mesh circuit:

```
V₁ ──[R₁]── A ──[R₃]── V₂
|            |           |
+           [R₂]         +
−            |           −
└────────────┴───────────┘
            GND
```

Use the **five sliders** at the bottom to change V₁, V₂, R₁, R₂, and R₃. All equations and solved values update immediately.

Switch between the three teaching modes using the tabs at the top:

### Tab 1 — KVL & KCL

- Shows current arrows on every branch with magnitudes.
- **KVL Loop 1**: \(V_1 - R_1 I_1 - R_2(I_1+I_2) = 0\) — verified to equal zero.
- **KVL Loop 2**: \(V_2 - R_3 I_2 - R_2(I_1+I_2) = 0\) — verified to equal zero.
- **KCL at node A**: sum of branch currents equals zero.

### Tab 2 — Mesh Analysis

- Each mesh loop is shaded in a different colour with a rotating arrow showing the mesh current direction.
- Displays the mesh equations in both symbolic and numeric form:

\[
\begin{bmatrix} R_1+R_2 & R_2 \\ R_2 & R_2+R_3 \end{bmatrix}
\begin{bmatrix} I_1 \\ I_2 \end{bmatrix}
=
\begin{bmatrix} V_1 \\ V_2 \end{bmatrix}
\]

- Solved mesh currents and branch currents shown live.

### Tab 3 — Node Analysis

- Node A is highlighted; the reference node (GND) is at the bottom rail.
- KCL equation at A expanded and solved for \(V_A\):

\[
V_A\!\left(\frac{1}{R_1}+\frac{1}{R_2}+\frac{1}{R_3}\right) = \frac{V_1}{R_1} + \frac{V_2}{R_3}
\]

- All three branch currents computed from \(V_A\) and verified.

## Learning Objectives

After using this simulation, students will be able to:

1. State KVL and KCL and identify where each applies in a circuit.
2. Set up mesh-current equations for a two-mesh planar circuit.
3. Set up a node-voltage equation for a circuit with one unknown node.
4. Verify that both methods yield the same branch currents.

## Key Equations

**KVL** (sum of voltages around any closed loop = 0):

\[\sum_k V_k = 0\]

**KCL** (sum of currents leaving any node = 0):

\[\sum_k I_k = 0\]

**Mesh equations** (matrix form):

\[(R_1+R_2)\,I_1 + R_2\,I_2 = V_1\]
\[R_2\,I_1 + (R_2+R_3)\,I_2 = V_2\]

**Node equation** at A:

\[V_A = \frac{V_1/R_1 + V_2/R_3}{1/R_1 + 1/R_2 + 1/R_3}\]
