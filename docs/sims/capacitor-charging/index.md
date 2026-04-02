---
title: Capacitor Charging
description: Animate charge flow and observe V, I, and E graphs during RC circuit charging and discharging
---

# Capacitor Charging

<iframe src="main.html" width="100%" height="450px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **Voltage / Cap / Res sliders** — set the source voltage, capacitance, and series resistance.
- **Charge** — start charging animation; voltage rises exponentially toward Vs.
- **Discharge** — discharge the capacitor; voltage decays exponentially toward 0.
- **Reset** — clear charge and graphs instantly.

## What to Observe

- Voltage \(V_C\) follows \(V_C(t) = V_s(1 - e^{-t/\tau})\) during charging.
- Current starts high and decays: \(I(t) = \frac{V_s}{R}e^{-t/\tau}\).
- Stored energy \(E = \frac{1}{2}CV_C^2\) grows with the square of voltage.
- After one time constant τ = RC, the capacitor reaches ~63% of its final voltage.
- The three live graphs show V, I, and E simultaneously.

## Key Equations

\[\tau = RC\]

\[V_C(t) = V_s\left(1 - e^{-t/\tau}\right) \quad \text{(charging)}\]

\[I(t) = \frac{V_s}{R}e^{-t/\tau}\]

\[E = \frac{1}{2}CV_C^2\]
