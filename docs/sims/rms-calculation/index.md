---
title: RMS Calculation
description: Side-by-side AC and DC circuits demonstrating that Vrms delivers the same average power as an equivalent DC voltage
---

# RMS Calculation

<iframe src="main.html" width="100%" height="450px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **Vp slider** — set the AC peak voltage (1–20 V). Vrms is calculated automatically.
- **R slider** — set the load resistance (100 Ω – 10 kΩ).
- **Start / Stop** — animate the waveforms to see instantaneous power oscillate.

## What to Observe

- The AC instantaneous power (orange) oscillates between 0 and \(V_p^2/R\) at twice the signal frequency.
- The dashed green line shows the **average** AC power.
- The DC circuit uses \(V_{dc} = V_{rms}\) and delivers **constant** power equal to the AC average.
- Both average power values are always equal — this is the definition of RMS.

## Key Equations

\[V_{rms} = \frac{V_{peak}}{\sqrt{2}} \approx 0.707 \cdot V_{peak}\]

\[P_{avg} = \frac{V_{rms}^2}{R} = \frac{V_{peak}^2}{2R}\]
