---
title: Reactance vs Frequency
description: Explore how inductive and capacitive reactance vary with frequency on a log-log plot, and identify the resonant crossover point where XL equals XC
---

# Reactance vs Frequency

<iframe src="main.html" width="100%" height="450px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **Inductance L slider** — set the inductor value (0.1 µH to 100 mH, log scale).
- **Capacitance C slider** — set the capacitor value (1 nF to 100 µF, log scale).
- **Frequency f slider** — move the cursor line to read XL and XC at any frequency.
- The **Log Scale button** toggles between logarithmic and linear axis display.

## What to Observe

- The **red curve** (XL = 2πfL) rises linearly on the log-log plot — inductors oppose higher frequencies more.
- The **blue curve** (XC = 1/2πfC) falls linearly — capacitors oppose lower frequencies more.
- The two curves **cross at f₀** (the resonant frequency) — the purple dot marks this point.
- At f₀, XL = XC and the reactances exactly cancel in a series or parallel LC circuit.
- The resonant frequency f₀ depends on both L and C: changing either moves the crossover left or right.
- At **very low frequencies**: XC → ∞ (capacitor = open), XL → 0 (inductor = short).
- At **very high frequencies**: XL → ∞ (inductor = open), XC → 0 (capacitor = short).

## Key Equations

\[X_L = \omega L = 2\pi f L \quad \text{(increases with frequency)}\]

\[X_C = \frac{1}{\omega C} = \frac{1}{2\pi f C} \quad \text{(decreases with frequency)}\]

\[f_0 = \frac{1}{2\pi\sqrt{LC}} \quad \text{(resonant frequency: } X_L = X_C\text{)}\]

| Frequency | Inductor | Capacitor |
|-----------|----------|-----------|
| DC (f=0)  | Short circuit (XL=0) | Open circuit (XC=∞) |
| f₀        | XL = XC | XL = XC |
| High f    | Open circuit (XL→∞) | Short circuit (XC→0) |

## Key Concepts

- **Inductive reactance XL**: Opposition to current by an inductor; proportional to frequency
- **Capacitive reactance XC**: Opposition to current by a capacitor; inversely proportional to frequency
- **Resonant frequency f₀**: Frequency at which XL = XC; reactances cancel
- **Log-log plot**: Both reactance curves appear as straight lines with slopes +1 (XL) and −1 (XC)
