---
title: RC/RL Applications
description: Interactive MicroSim exploring four practical RC/RL timing circuits — camera flash, 555 timer, relay protection, and audio coupling
chapter: 6
bloom_level: Apply (L3)
bloom_verb: design
---

# RC/RL Applications

<iframe src="main.html" width="660" height="515" scrolling="no" frameborder="0"></iframe>

## How to Use

1. **Select an application** using the tabs at the top.
2. **Adjust the component sliders** (R and C or L) to see how timing changes in real time.
3. **Set a target** with the orange "Target" slider, then read the required component values in the results panel — green means achievable, red means out of the practical range.
4. **Click "Animate"** to see the circuit behavior animated on the graph.

## Applications

| Tab | Circuit | Key Formula |
|-----|---------|-------------|
| Camera Flash | RC charging loop | \(t_{98\%} = 5RC\) |
| Timer (555) | 555 monostable | \(t = 1.1RC\) |
| Relay Protect | RL inductive kickback | \(\tau = L/R\) |
| Audio Coupling | RC high-pass filter | \(f_c = \frac{1}{2\pi RC}\) |

## Learning Objective

Students will **design** RC or RL circuits to achieve specific timing requirements by:

1. Choosing a target timing value (pulse width, charge time, cutoff frequency, or decay constant)
2. Using the universal relationship \(x(t) = x(\infty) + [x(0^+) - x(\infty)]\,e^{-t/\tau}\) to select component values
3. Verifying the design meets real-world component constraints

## Design Procedure

For any first-order RC/RL circuit:

1. **Identify** the timing formula (column 3 above)
2. **Pick one component** to hold fixed (e.g., keep C = 10 µF)
3. **Solve** for the other: rearrange the formula for R or L
4. **Check** the result against practical component ranges
