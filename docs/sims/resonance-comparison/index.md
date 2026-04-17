---
title: Series vs Parallel Resonance
description: Compare impedance and current behavior of series and parallel RLC circuits as frequency sweeps through resonance, highlighting their opposite responses
---

# Series vs Parallel Resonance

<iframe src="main.html" width="100%" height="500px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **L slider** — set inductance (1–100 mH).
- **C slider** — set capacitance (1–100 µF).
- **Q slider** — set the quality factor, which controls bandwidth. (R is derived from Q and f₀.)
- **f marker slider** — move a cursor across both plots to read values at any frequency.
- **Sweep f button** — animates the frequency cursor automatically across both plots.

## What to Observe

- Both circuits share the **same resonant frequency** f₀ = 1/(2π√LC).
- **Series RLC at f₀**: Impedance is *minimum* (= R); current is *maximum*. XL and XC cancel.
- **Parallel RLC at f₀**: Impedance is *maximum* (= Q²R); current from source is *minimum*.
- At frequencies above or below f₀, both circuits move away from their resonant extremes.
- **Higher Q** → sharper peak (series) or sharper notch (parallel) → better frequency selectivity.
- Series resonance is used as a **bandpass filter** (passes f₀, blocks others).
- Parallel resonance is used as a **bandstop / tank circuit** (blocks f₀, passes others).

## Key Equations

**Series RLC:**
\[|Z_{series}| = \sqrt{R^2 + (X_L - X_C)^2} \quad \text{(minimum at } f_0\text{)}\]

**Parallel RLC:**
\[|Z_{parallel}| = \frac{1}{\sqrt{(1/R)^2 + (\omega C - 1/(\omega L))^2}} \quad \text{(maximum at } f_0\text{)}\]

**Resonant frequency (same for both):**
\[f_0 = \frac{1}{2\pi\sqrt{LC}}, \qquad Q = \frac{\omega_0 L}{R}\]

| Property | Series at f₀ | Parallel at f₀ |
|----------|--------------|----------------|
| |Z| | Minimum (= R) | Maximum |
| |I_source| | Maximum | Minimum |
| Application | Bandpass (select f₀) | Bandstop (reject f₀) |
| Q effect | Voltage magnification | Current magnification |

## Key Concepts

- **Series resonance**: Reactive elements cancel; circuit "looks" purely resistive at f₀
- **Parallel resonance**: Large circulating current between L and C; source sees high impedance
- **Tank circuit**: Common name for a parallel LC resonant circuit
- **Quality factor Q**: Ratio of energy stored to energy dissipated per cycle; controls sharpness
