---
title: Real Capacitor Model
description: Compare ideal vs real capacitor impedance across frequency, with ESR and ESL parasitics and self-resonant frequency
---

# Real Capacitor Model

<iframe src="main.html" width="100%" height="400px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **Cap slider** — change capacitance (1–100 µF).
- **ESR slider** — adjust equivalent series resistance (1–1000 mΩ).
- **ESL slider** — adjust equivalent series inductance (1–100 nH).
- **Hover** over the impedance plot to read exact values at any frequency.

## What to Observe

- The ideal capacitor (blue) falls as a straight line: \(|Z| = 1/\omega C\).
- The real capacitor (red) has a V-shape — it reaches a minimum at the **self-resonant frequency (SRF)**.
- Below SRF: capacitive (impedance decreases with frequency).
- Above SRF: **inductive** — the capacitor acts like an inductor!
- ESR sets the impedance floor at resonance.

## Key Equations

\[f_{SRF} = \frac{1}{2\pi\sqrt{ESL \cdot C}}\]

\[|Z| = \sqrt{ESR^2 + \left(\omega \cdot ESL - \frac{1}{\omega C}\right)^2}\]
