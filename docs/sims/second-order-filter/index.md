---
title: Second-Order RLC Filter Designer MicroSim
description: Design second-order RLC filters by adjusting center frequency and Q factor. Observe bandwidth, peak gain, damping ratio, and component values update in real time across Low-Pass, High-Pass, and Band-Pass configurations.
---

# Second-Order RLC Filter Designer

<iframe src="main.html" width="100%" height="550px" scrolling="no"></iframe>

[Run fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim lets you design a second-order RLC filter by setting the resonant frequency \(f_0\) and quality factor \(Q\). The Bode plot, bandwidth, peak gain, and component values all update in real time.

**Filter types (series RLC, output tap changes):**

| Type | Output across | Behavior |
|------|--------------|---------|
| Low-Pass | C | Passes low frequencies; peaks near \(f_0\) when Q > 0.707 |
| High-Pass | L | Passes high frequencies; symmetric peak behavior |
| Band-Pass | R | Passes a band centered at \(f_0\); peak = 0 dB always |

**Key parameters:**

| Parameter | Formula | Notes |
|-----------|---------|-------|
| Bandwidth | \(BW = f_0 / Q\) | Narrower for higher Q |
| Damping ratio | \(\zeta = 1/(2Q)\) | \(\zeta < 1\) → underdamped (peak) |
| Peak gain (LP/HP) | \(\approx 20\log_{10}(Q)\) dB | Only when Q > 0.707 |

Component values are calculated for a fixed **L = 10 mH**:
\[C = \frac{1}{\omega_0^2 L}, \quad R = \frac{\omega_0 L}{Q}\]
