---
title: I-V Characteristics — Resistor vs Diode
description: Interactive chart comparing the linear I-V characteristic of a resistor with the nonlinear exponential characteristic of a diode.
---

# I-V Characteristics: Resistor vs Diode

<iframe src="main.html" width="620" height="508" scrolling="no" style="border:none;"></iframe>

[Open in full screen](main.html){ .md-button }

## Overview

The **current-voltage (I-V) characteristic** is the fundamental fingerprint of any circuit element — it tells you exactly how much current flows for any applied voltage.

This MicroSim plots two I-V curves side-by-side so you can directly **compare** their shapes:

| Component | Relationship | Shape |
|-----------|-------------|-------|
| Resistor (R) | \(I = V/R\) — Ohm's Law | Straight line through origin |
| Diode | \(I = I_S(e^{V/V_T} - 1)\) | Exponential — nearly zero for V < 0, sharp rise above ~0.6 V |

## Why Linearity Matters

Because the resistor's I-V curve is a **straight line**, every technique from Chapter 2 — superposition, Thévenin equivalents, node-voltage analysis — applies without restriction.

The diode's curve is **nonlinear**: doubling the voltage does *not* double the current. This means simple scaling and superposition break down, requiring more advanced methods (piecewise-linear models, iterative solvers) covered in later chapters.

## The Diode Equation

$$I = I_S \left(e^{V/V_T} - 1\right)$$

where:

- \(I_S \approx 10^{-12}\) A — saturation current
- \(V_T = kT/q \approx 25.85\) mV at 25 °C — thermal voltage
- **Knee** ≈ 0.6 V — the voltage at which forward current rises steeply

## Interactive Controls

| Control | Effect |
|---------|--------|
| **R slider** (50 – 500 Ω) | Changes the slope of the resistor line; shallower for larger R |
| **Hide Resistor** | Isolate the diode curve |
| **Hide Diode** | Isolate the linear relationship |
| **Hide Knee** | Remove the 0.6 V marker |
| **Hover** | Tooltip shows exact V and I values for each curve |

## Learning Objectives

After using this simulation, students will be able to:

- **Compare** the linear I-V characteristic of a resistor with the nonlinear characteristic of a diode (Bloom L2 — Understand)
- Explain why linearity is a simplifying assumption that enables superposition and Thévenin analysis
- Read an I-V plot and identify whether a device is linear or nonlinear
- Describe how resistance controls the slope of the linear I-V curve

## Key Observations

1. **Slope = 1/R**: Drag the R slider from 50 Ω to 500 Ω and watch the resistor line rotate around the origin. Steeper = lower R = more current per volt.
2. **Diode is off for negative voltages**: The diode passes essentially zero current (≈ −10⁻¹² A) for any negative voltage — this is reverse bias.
3. **The knee at 0.6 V**: Current jumps from microamps to milliamps in a very narrow voltage range — about 0.1 V. This is unlike anything a resistor does.
4. **20 mA clamp**: The chart clips at ±20 mA. The diode current continues to rise exponentially beyond this; the resistor current keeps rising linearly.

## Lesson Plan

**Duration:** 20 minutes  
**Bloom Level:** Understand (L2)

| Phase | Activity |
|-------|----------|
| Predict (3 min) | "What shape do you expect if I = V/R?" — students sketch before seeing the chart |
| Explore (5 min) | Show both curves; identify the knee; hover to read off exact values at V = 0.6 V |
| Contrast (7 min) | Hide one curve at a time; drag R slider; answer: "What changes, and what stays the same?" |
| Discuss (5 min) | Why can we use Kirchhoff's laws directly for resistors but not raw diodes? |

## References

- Sedra & Smith, *Microelectronic Circuits*, §3.1 — The Ideal Diode
- Razavi, *Fundamentals of Microelectronics*, Ch. 2 — Diode Models
- Horowitz & Hill, *The Art of Electronics*, §1.2 — Nonlinear Devices
