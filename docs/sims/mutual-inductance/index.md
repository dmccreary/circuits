---
title: Mutual Inductance
description: Visualize magnetic field coupling between two inductors with animated field lines, coupling coefficient, and induced voltage
---

# Mutual Inductance

<iframe src="main.html" width="100%" height="470px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **Current slider** — set the peak current in Coil 1 (0–1 A).
- **Separation slider** — move the coils apart; coupling decreases with distance.
- **Alignment slider** — misalign the coils vertically; coupling drops as coils shift off-axis.
- **Iron Core toggle** — switch between air core and iron core; iron dramatically increases coupling.
- **Start / Stop** — pause the animation to inspect a moment in time.

## What to Observe

- Animated field lines show energy linking from Coil 1 to Coil 2.
- \(V_2\) spikes when \(dI_1/dt\) is highest (at the zero crossing of current).
- Coupling coefficient \(k\) updates in real time as you change geometry and core material.
- Iron core raises \(k\) toward 1, approaching an ideal transformer.

## Key Equations

\[M = k\sqrt{L_1 L_2}\]

\[V_2 = M \frac{dI_1}{dt}\]

\[k = \frac{M}{\sqrt{L_1 L_2}} \quad (0 \leq k \leq 1)\]
