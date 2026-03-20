---
title: Op-Amp Golden Rules Visualizer MicroSim
description: Step through how negative feedback creates the two golden rules — virtual short and zero input current — in an inverting amplifier. Node voltages update in real time as you adjust Vin and gain.
---

# Op-Amp Golden Rules Visualizer

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim walks through the **two golden rules** of ideal op-amps using an inverting amplifier circuit.

| Golden Rule | Statement | Why it holds |
|-------------|-----------|-------------|
| **Virtual Short** | \(V_+ = V_-\) | Negative feedback drives the output to equalise the two inputs |
| **No Input Current** | \(I_+ = I_- = 0\) | Ideal op-amp has infinite input impedance |

**Step-through mode (4 steps):**
1. Input voltage applied through Ri
2. Negative feedback minimises \(V_+ - V_-\)
3. Virtual ground: \(V_- = 0\,\text{V}\) (enforced, not wired)
4. Output settles: \(V_{out} = -V_{in} \times R_f/R_i\)

**Controls:** Vin slider (±5 V), Rf/Ri gain ratio slider (1–20), Prev/Next step buttons.
