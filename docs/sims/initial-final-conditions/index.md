---
title: Initial and Final Conditions
description: Step-through MicroSim for finding V(0-), V(0+), V(∞), and τ in RC and RL switching circuits
chapter: 6
bloom_level: Apply (L3)
---

# Initial and Final Conditions

<iframe src="main.html" width="660" height="560" scrolling="no" frameborder="0"></iframe>

## How to Use

1. **Select a preset** (RC Charging, RC with Initial Charge, RL Energizing, or Thevenin-RC) using the buttons in the lower right.
2. **Click "Step Through Analysis"** to advance through the five analysis stages:
   - **Step 1** — Original circuit with switch position shown
   - **Step 2** — t < 0 steady-state: capacitor → open circuit, inductor → short circuit
   - **Step 3** — t = 0⁺ continuity: stored-element values cannot jump
   - **Step 4** — t → ∞ steady-state: find final value
   - **Step 5** — Complete solution formula with calculated values, animated response curve
3. **Click "Reset"** to return to Step 1 at any time.

## Learning Objective

Students will solve for initial and final conditions given a circuit with a switch, then predict the transient response using the universal exponential formula:

$$x(t) = x(\infty) + [x(0^+) - x(\infty)]\,e^{-t/\tau}$$

## Key Rules

| Element | t < 0 (before switch) | t = 0⁺ (just after) | t → ∞ (steady state) |
|---------|----------------------|----------------------|----------------------|
| Capacitor | Open circuit | V_C unchanged | Open circuit |
| Inductor  | Short circuit | I_L unchanged | Short circuit |

The **continuity conditions** are the critical insight: capacitor voltage and inductor current cannot change instantaneously because that would require infinite power.
