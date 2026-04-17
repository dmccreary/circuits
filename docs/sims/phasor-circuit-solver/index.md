---
title: Phasor Domain Circuit Solver
description: Solve a series RLC circuit step-by-step in the phasor domain, computing impedances, current, and component voltages with a live phasor diagram
---

# Phasor Domain Circuit Solver

<iframe src="main.html" width="100%" height="550px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **R slider** — set resistance (1–100 Ω).
- **L slider** — set inductance (1–100 mH).
- **C slider** — set capacitance (1–200 µF).
- **f slider** — set the AC source frequency (10–2000 Hz). Source voltage is fixed at V_s = 100∠0° V.
- The left panel shows the step-by-step solution; the right panel shows the phasor diagram.

## What to Observe

- **Step 1**: Watch how Z_R, Z_L, and Z_C are computed at the given frequency.
- **Step 2**: Z_total = R + j(XL − XC). At resonance, XL = XC and Z_total = R (minimum).
- **Step 3**: Current I = V_s / Z_total. Maximum current occurs at resonance.
- **Step 4**: V_R is in phase with I; V_L leads I by 90°; V_C lags I by 90°.
- **KVL check**: V_R + V_L + V_C must equal V_s = 100 V.
- At **resonance**: V_L and V_C are equal and opposite — they cancel! Z = R and I is at maximum.
- V_L and V_C can exceed V_s at resonance if Q > 1 — this is voltage magnification.

## Key Equations

\[Z_R = R, \quad Z_L = j\omega L = jX_L, \quad Z_C = \frac{1}{j\omega C} = -jX_C\]

\[Z_{total} = R + j(X_L - X_C)\]

\[\mathbf{I} = \frac{\mathbf{V}_s}{Z_{total}}, \quad |\mathbf{I}| = \frac{V_s}{|Z_{total}|}, \quad \phi_I = -\theta_Z\]

\[\mathbf{V}_R = \mathbf{I} R, \quad \mathbf{V}_L = \mathbf{I}(jX_L), \quad \mathbf{V}_C = \mathbf{I}(-jX_C)\]

\[f_0 = \frac{1}{2\pi\sqrt{LC}} \quad \text{(resonant frequency)}\]

## Key Concepts

- **Phasor domain analysis**: Replace time derivatives with jω — differential equations become algebra
- **Series impedance**: Add impedances Z = Z_R + Z_L + Z_C
- **Ohm's law for AC**: V = IZ works with complex numbers
- **KVL in phasor domain**: Sum of voltage phasors around a loop = 0
- **Resonance**: When XL = XC, the circuit is purely resistive and current is maximum
- **Voltage magnification**: At resonance, V_L = V_C = Q × V_s
