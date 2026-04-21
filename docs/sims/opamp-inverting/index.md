---
title: Inverting Op-Amp Amplifier
description: Interactive op-amp inverting amplifier with adjustable Rf and Rin, showing gain and phase-inverted waveforms
---

# Inverting Op-Amp Amplifier

<iframe src="main.html" width="100%"
    style="height:560px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>

## How to Use

- Adjust **Rf** (feedback resistor) and **Rin** (input resistor) to change the gain
- The **gain** is displayed as \(\text{Gain} = -R_f / R_{in}\)
- Adjust **Vin amplitude** and **frequency** to see the waveform scale
- The red dot at the inverting input shows the virtual ground (V ≈ 0)

## What to Observe

- **Phase inversion**: output (red) is always 180° out of phase with input (blue)
- **Gain magnitude**: increasing Rf or decreasing Rin makes the output larger
- **Virtual ground**: the inverting input stays near 0V due to negative feedback
- Gain > 1 means the output amplitude exceeds the input; gain < 1 is attenuation
