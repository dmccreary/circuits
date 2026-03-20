---
title: First-Order Filter Comparison MicroSim
description: Compare RC and RL implementations of low-pass and high-pass first-order filters. Adjust target cutoff frequency and resistance to see component values update and confirm identical frequency responses.
---

# First-Order Filter Comparison

<iframe src="main.html" width="100%" height="550px" scrolling="no"></iframe>

[Run fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim compares all four first-order filter topologies — RC Low-Pass, RC High-Pass, RL Low-Pass, and RL High-Pass — on the same Bode plot.

**Key insight:** RC and RL filters with the same cutoff frequency produce **identical frequency response curves**. The difference is only in which components are used.

| Filter | Output tap | Cutoff formula |
|--------|-----------|----------------|
| RC Low-Pass | Across C | \(f_c = \frac{1}{2\pi RC}\) |
| RC High-Pass | Across R | \(f_c = \frac{1}{2\pi RC}\) |
| RL Low-Pass | Across R | \(f_c = \frac{R}{2\pi L}\) |
| RL High-Pass | Across L | \(f_c = \frac{R}{2\pi L}\) |

**Controls:**
- **f\(_c\) slider**: Set target cutoff frequency (100 Hz – 10 kHz)
- **R slider**: Set resistance (100 Ω – 10 kΩ); C and L are auto-calculated
- **Toggle buttons**: Show all four filters, RC only, or RL only
- **Component table**: Displays the calculated R, C, and L values for each topology
