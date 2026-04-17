---
title: Bandwidth and Selectivity
description: Explore how the Q factor controls bandwidth and frequency selectivity by observing the bandpass frequency response curve, -3dB points, and passband shading
---

# Bandwidth and Selectivity

<iframe src="main.html" width="100%" height="450px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **Q factor slider** — increase Q to sharpen the peak and narrow the bandwidth (1–100).
- **f₀ slider** — shift the resonant center frequency (100 Hz – 5 kHz).
- **Multi-Q Curves button** — overlay five curves at Q = 2, 5, 10, 25, 50 to compare selectivity.
- **dB Scale button** — toggle between linear and decibel (dB) vertical axis.

## What to Observe

- The **blue shaded region** is the passband — frequencies passed with |H(f)| > 0.707 (−3 dB).
- The **−3 dB line** marks the cutoff points f₁ and f₂; the bandwidth BW = f₂ − f₁.
- **Higher Q** → narrower bandwidth → the circuit is more selective (passes fewer frequencies).
- **Lower Q** → wider bandwidth → the circuit passes a broad range of frequencies.
- With Multi-Q mode, notice that all curves peak at 1.0 at f₀, but higher-Q curves fall off more steeply.
- In dB mode, the −3 dB cutoff appears as a horizontal line at −3 dB.
- Real-world radios use high-Q resonant circuits to select one station while rejecting adjacent channels.

## Key Equations

\[\text{Bandwidth:} \quad BW = \frac{f_0}{Q}\]

\[\text{Cutoff frequencies:} \quad f_{1,2} = f_0\sqrt{1 + \frac{1}{4Q^2}} \mp \frac{f_0}{2Q}\]

\[\text{Frequency response:} \quad |H(f)| = \frac{1}{\sqrt{1 + Q^2\!\left(\dfrac{f}{f_0} - \dfrac{f_0}{f}\right)^2}}\]

\[\text{At } f_1, f_2: \quad |H| = \frac{1}{\sqrt{2}} \approx 0.707 \quad (\text{half power, } {-3}\text{ dB})\]

| Q | BW (% of f₀) | Selectivity |
|---|-------------|-------------|
| 1 | 100% | Poor |
| 5 | 20% | Fair |
| 10 | 10% | Moderate |
| 25 | 4% | Good |
| 100 | 1% | Excellent |

## Key Concepts

- **Bandwidth BW**: Frequency range between the −3 dB points; BW = f₀/Q
- **Selectivity**: Ability to distinguish between closely spaced frequencies; higher Q = better
- **Passband**: Frequencies passed with less than 3 dB attenuation
- **Stopband**: Frequencies attenuated significantly below the −3 dB level
- **−3 dB point**: Frequency where power drops to half its peak value (voltage to 70.7%)
- **Q factor**: Quality factor; ratio of center frequency to bandwidth; measures sharpness
