---
title: Chapter 13 Practice Problems — Operational Amplifiers
description: Practice problems with hints for Chapter 13 covering inverting and non-inverting amplifiers, voltage follower, summing amplifier, op-amp golden rules, and output voltage calculations
---

<div class="unit1-styled" markdown>

# Chapter 13 Practice Problems — Operational Amplifiers

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — Inverting Amplifier Analysis

An inverting op-amp circuit has \(R_i = 10\) kΩ and \(R_f = 150\) kΩ, powered by ±15 V supplies.

**(a)** Calculate the closed-loop voltage gain \(A_V\).

**(b)** If the input is \(V_{in} = 0.4\) V DC, find \(V_{out}\). Will the output clip?

**(c)** What is the maximum input voltage that keeps the output in the linear region (assuming the op-amp saturates at ±13 V)?

??? tip "Hint"
    **(a)** For the inverting configuration, \(A_V = -R_f/R_i\). Substitute the resistor values directly.

    **(b)** Apply \(V_{out} = A_V \cdot V_{in}\). Compare the result to the ±13 V saturation limits to determine if clipping occurs.

    **(c)** The output saturates at ±13 V. Set \(|A_V \cdot V_{in}| = 13\) V and solve for \(V_{in,max}\). Because the gain is negative, a positive input saturates the output negative and vice versa.

---

## Problem 2 — Non-Inverting Amplifier Design

Design a non-inverting amplifier with a voltage gain of exactly \(+11\).

**(a)** Using the gain formula \(A_V = 1 + R_f/R_i\), find the required resistor ratio \(R_f/R_i\).

**(b)** Choose standard resistor values (common values: 1 kΩ, 2.2 kΩ, 4.7 kΩ, 10 kΩ, 22 kΩ, 47 kΩ, 100 kΩ) that achieve exactly this ratio.

**(c)** Using your chosen resistors, confirm the gain and calculate \(V_{out}\) when \(V_{in} = 0.25\) V. What is the input impedance seen by the source?

??? tip "Hint"
    **(a)** Rearranging: \(R_f/R_i = A_V - 1 = 10\). Any pair of resistors whose ratio is 10:1 works.

    **(b)** Convenient choices include \(R_i = 10\) kΩ with \(R_f = 100\) kΩ, or \(R_i = 1\) kΩ with \(R_f = 10\) kΩ. Verify the ratio gives exactly 10.

    **(c)** Substitute into the gain formula to confirm \(A_V = 11\), then compute \(V_{out} = A_V \cdot V_{in}\). The input impedance of a non-inverting amplifier is essentially infinite because the signal drives the non-inverting (+) input directly.

---

## Problem 3 — Summing Amplifier

A summing amplifier has three inputs: \(V_1 = 2\) V, \(V_2 = -1\) V, \(V_3 = 0.5\) V. The input resistors are \(R_1 = 10\) kΩ, \(R_2 = 20\) kΩ, \(R_3 = 10\) kΩ, and the feedback resistor is \(R_f = 40\) kΩ.

**(a)** State the two golden rules that make the summing amplifier analysis straightforward.

**(b)** Calculate the current from each input source to the virtual ground node.

**(c)** Apply KCL at the virtual ground node to find the output voltage \(V_{out}\).

??? tip "Hint"
    **(a)** Golden Rule 1 (virtual short): \(V_+ = V_-\). Since \(V_+ = 0\), the inverting input is a virtual ground (\(V_- = 0\)). Golden Rule 2 (no input current): \(I_- = 0\), so all currents entering the virtual ground node must flow through \(R_f\).

    **(b)** With the inverting node at 0 V, the current through each input resistor is \(I_n = V_n / R_n\). Compute \(I_1\), \(I_2\), and \(I_3\) individually — watch the sign of \(V_2\).

    **(c)** KCL at the virtual ground: \(I_1 + I_2 + I_3 + I_f = 0\), where \(I_f\) flows through \(R_f\) toward the output. Then \(V_{out} = -I_f \cdot R_f = -R_f (V_1/R_1 + V_2/R_2 + V_3/R_3)\). Notice different input resistors give different weights to each input.

---

## Problem 4 — Voltage Follower and Gain-Bandwidth

An op-amp has a gain-bandwidth product (GBW) of 5 MHz.

**(a)** The op-amp is configured as a voltage follower (unity-gain buffer). What is the maximum usable bandwidth in this configuration?

**(b)** The same op-amp is now used in a non-inverting amplifier with \(A_V = 50\). What is the maximum usable bandwidth?

**(c)** An audio signal at 15 kHz must be amplified by a factor of 20. Is this op-amp suitable? What minimum GBW would a replacement op-amp need?

??? tip "Hint"
    **(a)** For a single-pole op-amp, \(\text{GBW} = A_{CL} \times BW\). With \(A_{CL} = 1\), \(BW = \text{GBW}/1 = 5\) MHz.

    **(b)** With \(A_{CL} = 50\), \(BW = \text{GBW}/A_{CL} = 5\,\text{MHz}/50 = 100\) kHz.

    **(c)** The required bandwidth must extend to at least 15 kHz (the signal frequency), so check whether \(A_{CL} \times f_{signal} < \text{GBW}\). Compute \(20 \times 15\,\text{kHz} = 300\) kHz. If this exceeds the available GBW, the op-amp cannot do the job — choose a replacement with GBW exceeding 300 kHz.

---

</div>
