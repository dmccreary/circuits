---
title: Chapter 4 Practice Problems — DC Circuit Analysis Methods
description: Practice problems with hints for Chapter 4 covering Thévenin/Norton equivalents, source transformation, maximum power transfer, and nodal/mesh analysis
---

<div class="unit1-styled" markdown>

# Chapter 4 Practice Problems — DC Circuit Analysis Methods

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — Source Transformation

A practical voltage source is modeled as a 24 V ideal voltage source in series with an internal resistance of \(R_s = 6\) Ω.

**(a)** Transform this voltage source model into an equivalent Norton current source in parallel with a resistor. State the current source value and the parallel resistance.

**(b)** Connect a load \(R_L = 12\) Ω to the Norton equivalent and find the load current and load voltage.

**(c)** Verify your answer by returning to the original Thévenin (series) model and computing the same quantities using a simple voltage divider.

??? tip "Hint"
    **(a)** Norton current: \(I_N = V_S / R_S = 24 / 6\). The Norton resistance equals the series source resistance: \(R_N = R_S = 6\) Ω.

    **(b)** In the Norton equivalent, \(R_N\) and \(R_L\) are in parallel. Use the current divider: \(I_L = I_N \cdot \frac{R_N}{R_N + R_L}\). Then \(V_L = I_L R_L\).

    **(c)** In the Thévenin model, total resistance is \(R_S + R_L\). Use \(I = 24 / (R_S + R_L)\) and \(V_L = I R_L\). Both methods must give identical results.

---

## Problem 2 — Thévenin Equivalent Circuit

Find the Thévenin equivalent seen by a load connected between terminals A and B, given: a 30 V source, \(R_1 = 10\) Ω in series with the source, and \(R_2 = 20\) Ω connected from the junction of \(R_1\) to ground (node B).

**(a)** Find the open-circuit voltage \(V_{Th}\) by computing the voltage at node A with no load connected.

**(b)** Find \(R_{Th}\) by killing the independent source (replacing the 30 V source with a short circuit) and computing the resistance looking into terminals A–B.

**(c)** A load \(R_L = 10\) Ω is connected from A to B. Using the Thévenin equivalent, find the load voltage and current.

??? tip "Hint"
    **(a)** With no load, \(R_1\) and \(R_2\) form a voltage divider. \(V_{Th} = V_{oc} = 30 \times \frac{R_2}{R_1 + R_2}\).

    **(b)** Short the source. Looking into A–B, you see \(R_2\) in parallel with \(R_1\) (the shorted source connects the far end of \(R_1\) to ground). \(R_{Th} = R_1 \| R_2\).

    **(c)** In the Thévenin equivalent, \(V_{Th}\) drives \(R_{Th}\) in series with \(R_L\). Apply Ohm's Law: \(I_L = V_{Th} / (R_{Th} + R_L)\) and \(V_L = I_L R_L\).

---

## Problem 3 — Norton Equivalent and Maximum Power Transfer

A network has a Thévenin equivalent of \(V_{Th} = 20\) V and \(R_{Th} = 25\) Ω.

**(a)** Determine the Norton equivalent current \(I_N\) and resistance \(R_N\).

**(b)** What value of load resistance \(R_L\) achieves maximum power transfer from the source to the load?

**(c)** Calculate the maximum power delivered to \(R_L\) and the efficiency of power transfer at this condition.

??? tip "Hint"
    **(a)** Norton current: \(I_N = V_{Th} / R_{Th}\). Norton resistance equals Thévenin resistance: \(R_N = R_{Th}\).

    **(b)** The maximum power transfer theorem states that maximum power is delivered when \(R_L = R_{Th}\).

    **(c)** Maximum power: \(P_{max} = V_{Th}^2 / (4 R_{Th})\). At maximum transfer, the efficiency is exactly 50% — half the source power goes to the load, half is dissipated internally in \(R_{Th}\).

---

## Problem 4 — Nodal Analysis

A circuit has three nodes: reference (ground), node 1, and node 2. Components:
- 10 V source from node 1 to ground
- \(R_1 = 5\) Ω from node 1 to node 2
- \(R_2 = 10\) Ω from node 2 to ground
- \(R_3 = 20\) Ω from node 2 to ground

**(a)** Identify the node voltages. Note that the voltage source fixes one node voltage directly.

**(b)** Write the KCL equation at node 2, expressing all currents leaving the node in terms of node voltages.

**(c)** Solve for \(V_2\) and find the current through each resistor.

??? tip "Hint"
    **(a)** Since a 10 V source connects node 1 to ground, \(V_1 = 10\) V by inspection. Only \(V_2\) is unknown.

    **(b)** KCL at node 2 (currents leaving): \(\frac{V_2 - V_1}{R_1} + \frac{V_2}{R_2} + \frac{V_2}{R_3} = 0\). Substitute \(V_1 = 10\) V.

    **(c)** Collect terms and solve for \(V_2\). Then apply Ohm's Law to each resistor using the node voltage difference across it.

---

</div>
