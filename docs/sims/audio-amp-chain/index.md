---
title: Audio Amplifier Chain
description: Interactive signal-flow visualizer showing gain, clipping, and frequency response through a multi-stage audio amplifier
---

# Audio Amplifier Chain

<iframe src="main.html" width="100%"
    style="height:550px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>

## How to Use

- Adjust input signal amplitude and observe how each stage amplifies or clips the signal
- Change gain settings to see how cascaded stages multiply total gain
- Watch for clipping when a stage saturates — the output waveform flattens at the supply rails

## What to Observe

- **Gain multiplication**: total gain equals the product of individual stage gains
- **Clipping**: occurs when input drives a stage beyond its linear range
- **Stage interaction**: the output of each stage feeds directly into the next
