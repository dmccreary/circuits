---
title: Voltage Divider Calculator
description: Interactive dual-mode calculator for designing voltage divider circuits to produce specific output voltages.
---

# Voltage Divider Calculator

<iframe src="main.html" width="620" height="520" scrolling="no" style="border:none;"></iframe>

[Open in full screen](main.html){ .md-button }

## Overview

A **voltage divider** is one of the most fundamental circuits in electronics. Two resistors in series split a supply voltage (Vin) into a smaller output voltage (Vout) tapped between them.

This MicroSim has two modes:

| Mode | Description |
|------|-------------|
| **Find Vout** | Set Vin, R1, R2 → see the resulting output voltage |
| **Find R2 for target** | Set Vin, R1, and your desired Vout → get the required R2 value |

## The Voltage Divider Formula

$$V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}$$

In "Find R2" (inverse) mode the formula is rearranged:

$$R_2 = R_1 \times \frac{V_{out}}{V_{in} - V_{out}}$$

## Controls

| Control | Range | Notes |
|---------|-------|-------|
| Vin | 1 – 24 V | Supply voltage |
| R1 | 100 Ω – 100 kΩ | Log scale |
| R2 | 100 Ω – 100 kΩ | Log scale; active in **Find Vout** mode |
| Target Vout | 0.1 V – 0.99 Vin | Active in **Find R2** mode |

R1 and R2 use a **logarithmic scale** so small values (hundreds of ohms) and large values (tens of kilohms) are equally accessible on the slider.

## Learning Objectives

After using this simulation, students will be able to:

- **Implement** a voltage divider to produce a target output voltage (Bloom L3 — Apply)
- Explain how changing R1 or R2 affects the voltage ratio
- Recognise practical constraints (minimum and maximum resistance values)
- Calculate current draw and power dissipation for a divider design

## Key Observations

1. **Ratio, not absolute values**: Vout depends only on the *ratio* R2/(R1+R2). Doubling both resistors keeps Vout the same but halves the current.
2. **Loading effect**: This simulation shows the unloaded divider. A load in parallel with R2 will pull Vout down.
3. **Power trade-off**: Lower resistances give a stiffer divider (better load regulation) but waste more power.
4. **Impractical R2 warning**: If the required R2 falls below 10 Ω or above 10 MΩ, the simulation flags it as impractical.

## Lesson Plan

**Duration:** 20 minutes  
**Bloom Level:** Apply (L3)

| Phase | Activity |
|-------|----------|
| Warm-up (3 min) | Predict: "If R1 = R2, what is Vout/Vin?" |
| Explore (7 min) | Use **Find Vout** mode — vary R1 and R2, observe the voltage bar |
| Apply (7 min) | Switch to **Find R2** mode — design a 3.3 V divider from 5 V, then a 1.8 V divider |
| Reflect (3 min) | Compare current and power for two designs that both produce 6 V from 12 V |

## References

- Sedra & Smith, *Microelectronic Circuits*, §1.5 — Voltage Dividers
- Horowitz & Hill, *The Art of Electronics*, Ch. 1 — Foundations
- [AllAboutCircuits — Voltage Divider](https://www.allaboutcircuits.com/textbook/direct-current/chpt-6/voltage-divider-circuits/)
