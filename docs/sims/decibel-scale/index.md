---
title: Decibel Scale
description: Interactive dB calculator converting between linear ratios and decibels, with a vertical audio SPL reference scale
---

# Decibel Scale

<iframe src="main.html" width="100%" height="400px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **Ratio slider** — set a linear ratio (0.001–1000); the dB value is calculated instantly.
- **dB slider** — enter a dB value directly; the equivalent ratio is shown.
- **Voltage / Power buttons** — switch between 20·log and 10·log formulas.
- The right panel shows a **vertical SPL scale** with real-world audio reference levels color-coded by hearing risk.

## What to Observe

- +6 dB doubles voltage; +20 dB multiplies voltage by 10.
- +3 dB doubles power; +10 dB multiplies power by 10.
- The two formulas differ because power scales as voltage squared.
- Levels above 85 dB SPL can cause hearing damage over prolonged exposure (shown in orange/red).

## Key Equations

\[dB_{voltage} = 20\log_{10}\!\left(\frac{V_2}{V_1}\right)\]

\[dB_{power} = 10\log_{10}\!\left(\frac{P_2}{P_1}\right)\]
