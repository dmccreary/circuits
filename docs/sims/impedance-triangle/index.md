---
title: Impedance Triangle Explorer
description: Visualize the relationship between resistance R, reactance X, and impedance magnitude |Z| using an interactive right-triangle diagram with real-time calculations
---

# Impedance Triangle Explorer

<iframe src="main.html" width="100%" height="500px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **Resistance R slider** — set the resistive component (0–100 Ω). The horizontal side of the triangle.
- **Reactance X slider** — set the reactive component (−100 to +100 Ω). Positive = inductive (triangle points up), negative = capacitive (triangle points down).
- The right panel shows live calculations of |Z|, θ, and power factor.

## What to Observe

- The **blue horizontal side** represents resistance R — always positive, dissipates power.
- The **vertical side** is reactance X: **red** when positive (inductive), **green** when negative (capacitive).
- The **purple hypotenuse** is the impedance magnitude |Z|.
- The **phase angle θ** opens at the origin — positive for inductive, negative for capacitive.
- When X = 0, the triangle collapses to a horizontal line and the circuit is purely resistive.
- When R = 0, the triangle collapses to a vertical line and the circuit is purely reactive (θ = ±90°).
- **Power factor** = cos(θ) = R/|Z|; ranges from 0 (purely reactive) to 1 (purely resistive).

## Key Equations

\[Z = R + jX \quad \text{(rectangular form)}\]

\[|Z| = \sqrt{R^2 + X^2} \quad \text{(Pythagorean theorem)}\]

\[\theta = \tan^{-1}\!\left(\frac{X}{R}\right) \quad \text{(phase angle)}\]

\[Z = |Z|\angle\theta \quad \text{(polar form)}\]

\[\text{Power Factor} = \cos\theta = \frac{R}{|Z|}\]

| Condition | θ | Circuit Type |
|-----------|---|--------------|
| X = 0 | 0° | Purely resistive |
| X > 0 | 0° to 90° | Inductive (current lags) |
| X < 0 | 0° to −90° | Capacitive (current leads) |
| R = 0 | ±90° | Purely reactive |

## Key Concepts

- **Impedance Z**: Complex ratio of voltage to current in an AC circuit (Ω)
- **Resistance R**: Real part of Z — dissipates energy as heat
- **Reactance X**: Imaginary part of Z — stores and returns energy
- **Phase angle θ**: Angle by which current lags (positive) or leads (negative) voltage
- **Power factor**: Fraction of apparent power that does real work
