---
title: Basic Op-Amp Configurations MicroSim
description: Interactive comparison of inverting amplifier, non-inverting amplifier, and voltage follower. Adjust Ri, Rf, and input amplitude to see gain, phase, and output waveforms update in real time.
---

# Basic Op-Amp Configurations

<iframe src="main.html" width="100%" height="550px" scrolling="no"></iframe>

[Run fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim compares the three fundamental op-amp configurations side by side: circuit schematic on the left, live input/output waveforms on the right.

| Configuration | Gain formula | Phase | Notes |
|---------------|-------------|-------|-------|
| **Inverting** | \(A_v = -R_f/R_i\) | 180° | Output inverted; \(Z_{in} = R_i\) |
| **Non-Inverting** | \(A_v = 1 + R_f/R_i\) | 0° | Always \(\geq 1\); high \(Z_{in}\) |
| **Voltage Follower** | \(A_v = 1\) | 0° | Unity gain buffer; very high \(Z_{in}\) |

**Controls:**
- Config buttons: switch between three topologies
- **Ri** slider: 1 kΩ – 100 kΩ
- **Rf** slider: 1 kΩ – 1 MΩ
- **Vin amplitude**: 0.1 V – 5 V
- **Start/Stop**: animate the waveforms in real time

Red shading on the waveform plot marks the ±15 V supply rails — output clips if it reaches these limits.
