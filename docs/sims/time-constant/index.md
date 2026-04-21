---
title: RC Time Constant Visualization
description: Interactive demonstration of how τ = RC controls the speed of an RC transient response with adjustable R and C sliders
---

# RC Time Constant Visualization

<iframe src="main.html" width="100%"
    style="height:530px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>

## How to Use

- Drag the **R** and **C** sliders to change component values
- Observe how the time constant τ = RC updates and the curve shifts left or right
- Multiple curves are overlaid so you can compare different τ values side by side

## What to Observe

- **Shape invariance**: the normalized curve shape never changes — only the time scale stretches or compresses
- **63.2% rule**: the voltage always reaches 63.2% of its final value after exactly one time constant
- **5τ rule**: the response is within 1% of final value after five time constants, regardless of R or C individually
- **Proportionality**: doubling R or doubling C doubles τ and stretches the curve by the same factor
