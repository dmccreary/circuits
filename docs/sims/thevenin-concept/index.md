---
title: Thévenin Equivalent Circuit
description: A 5-stage interactive MicroSim demonstrating how any linear circuit can be replaced by a Thévenin equivalent (voltage source in series with resistance) that behaves identically at its output terminals.
quality_score: 92
---

# Thévenin Equivalent Circuit

<iframe src="main.html" height="542px" scrolling="no" style="width:100%; border:none;"></iframe>

[Run the Thévenin Equivalent MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## Overview

This MicroSim walks through the five-step process of finding and verifying a Thévenin equivalent circuit.

| Circuit Parameter | Value |
|---|---|
| Source voltage \(V_s\) | 12 V |
| Series resistance \(R_1\) | 4 Ω |
| Shunt resistance \(R_2\) | 8 Ω |
| **Thévenin voltage \(V_{th}\)** | **8 V** |
| **Thévenin resistance \(R_{th}\)** | **2.67 Ω** |

## Stage-by-Stage Guide

| Stage | Action | What to observe |
|---|---|---|
| 1 | Load the sim | Original voltage-divider circuit with terminals A-B |
| 2 | Click **Find Vth →** | Open-circuit voltage across R₂ highlighted; \(V_{th} = 8\text{ V}\) |
| 3 | Click **Find Rth →** | Vs shorted; \(R_{th} = R_1 \| R_2 = 2.67\text{ Ω}\) |
| 4 | Click **Show Equiv →** | Thévenin circuit appears alongside the original |
| 5 | Click **Connect Load →** | Load RL attached to both; drag the slider to verify identical \(V_L\) and \(I_L\) |

## Key Equations

**Open-circuit voltage (Thévenin voltage):**

\[V_{th} = V_s \times \frac{R_2}{R_1 + R_2} = 12 \times \frac{8}{4+8} = 8 \text{ V}\]

**Thévenin resistance** (with voltage source short-circuited):

\[R_{th} = R_1 \| R_2 = \frac{R_1 R_2}{R_1 + R_2} = \frac{4 \times 8}{4 + 8} = 2.67 \text{ Ω}\]

**Load current and voltage (same for both circuits):**

\[V_L = V_{th} \times \frac{R_L}{R_{th} + R_L}, \qquad I_L = \frac{V_{th}}{R_{th} + R_L}\]

## Learning Objective

Students will **explain** how any linear circuit seen from two terminals can be represented by a single voltage source \(V_{th}\) in series with a single resistance \(R_{th}\) that produces identical terminal behavior for any load.

## Lesson Plan

### Prerequisites
- Ohm's Law and series/parallel resistor combinations
- Voltage divider rule
- Concept of a two-terminal (port) circuit

### Suggested Classroom Use

1. **Before the sim** — Ask students: *"If you could only see the two output terminals of a black box, what measurements could you take to characterise it?"*
2. **Stages 1-3** — Let students predict \(V_{th}\) and \(R_{th}\) before clicking each button. Check their calculations.
3. **Stage 4** — Discuss: *"Why are these two circuits equivalent at the terminals even though they look different inside?"*
4. **Stage 5** — Have students predict \(V_L\) and \(I_L\) for a specific RL, then verify with the slider.

### Assessment

- Calculate \(V_{th}\) and \(R_{th}\) for a different source/resistor combination.
- Explain in words why \(R_{th}\) is found by short-circuiting independent voltage sources.
- Predict the I-V characteristic slope from \(R_{th}\) alone.

## Embed This MicroSim

```html
<iframe src="https://dmccreary.github.io/circuits/sims/thevenin-equivalent/main.html"
        height="542px" scrolling="no" style="width:100%; border:none;"></iframe>
```
