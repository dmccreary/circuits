---
title: Phasor Addition Visualizer
description: Add two sinusoidal signals graphically using phasor head-to-tail construction and verify the result against the time-domain waveform sum
---

# Phasor Addition Visualizer

<iframe src="main.html" width="100%" height="500px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **V₁ magnitude / V₁ phase sliders** — set the amplitude (0.5–10 V) and phase (−180° to 180°) of the first phasor.
- **V₂ magnitude / V₂ phase sliders** — set the amplitude and phase of the second phasor.
- **Construction Lines button** — toggle the head-to-tail construction (V₂ translated to tip of V₁).
- The green arrow **V_T** is the resultant phasor; the right panel verifies it matches the waveform sum.

## What to Observe

- Phasor addition is simple **complex number addition** — no trig identities needed.
- The **head-to-tail construction** (pink dashed arrow) shows geometrically how V₁ + V₂ = V_T.
- The right panel plots v₁(t), v₂(t), and v_T(t) simultaneously — the green curve should match v₁(t) + v₂(t) point-by-point.
- When V₁ and V₂ are in phase (same angle), |V_T| = |V₁| + |V₂|.
- When V₁ and V₂ are 180° apart, they can cancel: |V_T| can be zero.
- Try V₁ = 10∠0° and V₂ = 10∠90° — the result is 14.14∠45° (√2 amplification).

## Key Equations

\[\mathbf{V}_1 = V_{m1}\angle\phi_1 = V_{m1}\cos\phi_1 + jV_{m1}\sin\phi_1\]

\[\mathbf{V}_2 = V_{m2}\angle\phi_2 = V_{m2}\cos\phi_2 + jV_{m2}\sin\phi_2\]

\[\mathbf{V}_{total} = \mathbf{V}_1 + \mathbf{V}_2 = (a_1+a_2) + j(b_1+b_2)\]

\[|\mathbf{V}_{total}| = \sqrt{(a_1+a_2)^2 + (b_1+b_2)^2}, \quad \phi_{total} = \tan^{-1}\!\left(\frac{b_1+b_2}{a_1+a_2}\right)\]

## Key Concepts

- **Phasor addition**: Add real parts together, add imaginary parts together
- **Head-to-tail method**: Graphical equivalent of complex number addition
- **Resultant phasor**: The vector from the common origin to the total tip
- **Rectangular form**: Best for addition/subtraction
- **Polar form**: Best for multiplication/division
