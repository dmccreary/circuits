---
title: Chapter 10 Content — AC Power Analysis
description: Teaching content for Chapter 10 covering real, reactive, apparent power, power factor, and efficiency
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 10 — AC Power Analysis

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

AC power analysis distinguishes between three types of power — real, reactive, and apparent — that together characterize how efficiently energy is delivered to a load. This chapter develops the mathematics of complex power and the power triangle, and explains power factor correction, an essential technique for reducing wasted energy in electrical systems.

**Key Takeaways**

1. Real (average) power P, measured in watts, represents energy actually consumed; reactive power Q, measured in VARs, represents energy oscillating back and forth between source and reactive elements.
2. Apparent power S is the product of RMS voltage and current, and equals the magnitude of complex power S = P + jQ.
3. Power factor (cos θ) measures how effectively a load uses apparent power; capacitor banks are added to correct a lagging power factor and reduce transmission losses.

</details>

## 10.1 Instantaneous Power

**Instantaneous power** is the power at any specific instant:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[p(t) = v(t) \cdot i(t)\]

For sinusoidal signals: \(p(t) = \dfrac{V_m I_m}{2}\cos(\theta_v - \theta_i) + \dfrac{V_m I_m}{2}\cos(2\omega t + \theta_v + \theta_i)\]

</div>

This reveals two components: a **constant term** (the average power) and an **oscillating term** at twice the signal frequency. The oscillating component means power flows back and forth between the source and reactive elements every quarter cycle — it can actually go negative, meaning energy flows *back* to the source.

---

## 10.2 Real Power (Average Power)

**Real power** (also called average power or active power) is the time-averaged power over one complete cycle. It represents the power that actually does useful work — heating elements, turning motors, producing light and sound.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[P = V_{rms} I_{rms} \cos\theta = I_{rms}^2 R\]

Measured in **watts (W)**. \(\theta = \theta_v - \theta_i\) is the phase angle between voltage and current.

</div>

The factor \(\cos\theta\) is the **power factor** — it determines how much of the apparent power does useful work. Your electric bill is based on real power (kilowatt-hours).

| Phase Angle θ | cos θ | Interpretation |
|---------------|-------|----------------|
| 0° | 1.00 | Pure resistive — all power is real |
| 30° | 0.866 | Moderate reactive component |
| 60° | 0.50 | Mostly reactive |
| 90° | 0.00 | Pure reactive — zero real power |

---

## 10.3 Reactive Power

**Reactive power** (Q) represents energy oscillating between the source and reactive elements without being consumed. It's measured in **volt-amperes reactive (VAR)**.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[Q = V_{rms} I_{rms} \sin\theta = I_{rms}^2 X\]

Inductive loads: \(Q > 0\) (lagging). Capacitive loads: \(Q < 0\) (leading).

</div>

Reactive power doesn't do useful work, but it still requires current to flow — meaning larger wires, transformers, and generators must be sized to carry it. This is why utilities penalize poor power factor.

---

## 10.4 Apparent Power

**Apparent power** (S) is the product of RMS voltage and RMS current — the total "power handling" demanded from the source. Measured in **volt-amperes (VA)**.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[S = V_{rms} I_{rms} \qquad S^2 = P^2 + Q^2\]

</div>

Apparent power determines wire sizing, transformer ratings, generator capacity, and circuit breaker ratings — equipment must handle the full current regardless of power factor.

**Example:** A motor draws 10 A from a 120 V source at PF = 0.8:
- \(S = 120 \times 10 = 1{,}200\) VA
- \(P = 1{,}200 \times 0.8 = 960\) W
- \(Q = 1{,}200 \times 0.6 = 720\) VAR

The motor does only 960 W of work, but the supply must have capacity for 1,200 VA.

---

## 10.5 Complex Power

**Complex power** combines real and reactive power into a single complex number:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\mathbf{S} = P + jQ = \mathbf{V}_{rms}\, \mathbf{I}_{rms}^* = I_{rms}^2 Z\]

where \(\mathbf{I}^*\) is the complex conjugate of the current phasor.

</div>

| Quantity | Symbol | Units | Formula |
|----------|--------|-------|---------|
| Real Power | \(P\) | W | \(V I \cos\theta\) |
| Reactive Power | \(Q\) | VAR | \(V I \sin\theta\) |
| Apparent Power | \(S\) | VA | \(VI = \|\mathbf{S}\|\) |
| Complex Power | \(\mathbf{S}\) | VA | \(P + jQ\) |

---

## 10.6 The Power Triangle

The power triangle shows the geometric relationship between P, Q, and S — they form a right triangle:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[S = \sqrt{P^2 + Q^2} \qquad PF = \cos\theta = \frac{P}{S} \qquad \tan\theta = \frac{Q}{P}\]

</div>

- **Hypotenuse:** Apparent power S (VA)
- **Horizontal leg:** Real power P (W)
- **Vertical leg:** Reactive power Q (VAR)
- **Angle θ:** Phase angle between voltage and current

The power triangle is identical in shape to the impedance triangle (\(|Z|\), R, X).

---

## 10.7 Power Factor: Leading and Lagging

**Power factor** (PF) = \(\cos\theta = P/S\). It ranges from 0 to 1 and measures how efficiently apparent power converts to real work.

**Lagging power factor** — current lags voltage (inductive loads: motors, transformers, ballasts):
- \(\theta > 0\), \(Q > 0\), load absorbs VARs from source

**Leading power factor** — current leads voltage (capacitive loads: correction capacitors, some power supplies):
- \(\theta < 0\), \(Q < 0\), load supplies VARs to circuit

| Power Factor | Description | Typical Load |
|--------------|-------------|--------------|
| 1.0 | Unity | Resistive heaters, incandescent bulbs |
| 0.95 lagging | Excellent | Well-corrected industrial motors |
| 0.85 lagging | Good | Typical industrial mix |
| 0.70 lagging | Poor | Uncompensated motors |
| 0.50 lagging | Very poor | Lightly loaded motors |

---

## 10.8 Power Factor Correction

**Power factor correction** improves PF by adding capacitors in parallel with inductive loads. The capacitors supply reactive power locally, reducing the reactive current drawn from the source.

**Benefits:** reduced line current, less I²R loss, increased infrastructure capacity, avoided utility penalties.

**Correction formula** — to improve from \(\theta_1\) to \(\theta_2\):

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[Q_C = P(\tan\theta_1 - \tan\theta_2) \qquad C = \frac{Q_C}{\omega\, V_{rms}^2}\]

</div>

**Example:** A 10 kW load at PF = 0.7 lagging from 240 V, 60 Hz. Correct to PF = 0.95:

\(\theta_1 = 45.57°\), \(\tan\theta_1 = 1.020\) ; \(\theta_2 = 18.19°\), \(\tan\theta_2 = 0.329\)

\(Q_C = 10{,}000(1.020 - 0.329) = 6{,}910\) VAR

\(C = 6{,}910 / (2\pi \times 60 \times 240^2) = 319\) μF

A 320 μF capacitor reduces reactive demand from the utility by 6,910 VAR.

---

## 10.9 Power in Resistors, Capacitors, and Inductors

Each passive component has distinct power behavior:

**Resistors** — voltage and current are in phase (\(\theta = 0\)):

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[P_R = I_{rms}^2 R = \frac{V_{rms}^2}{R} \qquad Q_R = 0\]

</div>

**Capacitors** — current leads voltage by 90°, no real power consumed:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[P_C = 0 \qquad Q_C = -\frac{V_{rms}^2}{X_C} \quad \text{(negative — supplies VARs)}\]

</div>

**Inductors** — current lags voltage by 90°, no real power consumed:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[P_L = 0 \qquad Q_L = \frac{V_{rms}^2}{X_L} \quad \text{(positive — absorbs VARs)}\]

</div>

| Element | Real Power P | Reactive Power Q | PF |
|---------|--------------|------------------|----|
| Resistor | \(I^2 R\) | 0 | 1 |
| Capacitor | 0 | \(-V^2/X_C\) | 0 leading |
| Inductor | 0 | \(+V^2/X_L\) | 0 lagging |

---

## 10.10 Maximum Power Transfer in AC

For maximum power transfer from a source with internal impedance \(Z_s = R_s + jX_s\) to load \(Z_L\):

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[Z_L = Z_s^* = R_s - jX_s \qquad P_{max} = \frac{|V_s|^2}{4R_s}\]

The load impedance must be the **complex conjugate** of the source impedance.

</div>

At conjugate matching: \(R_L = R_s\) (equal resistances) and \(X_L = -X_s\) (reactances cancel). The result is resonance — maximum current and maximum power transfer — but efficiency is only 50%. This trade-off is acceptable in RF and audio signal systems; power delivery systems optimize for efficiency instead.

---

## 10.11 Efficiency and Power Gain

**Efficiency:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\eta = \frac{P_{out}}{P_{in}} \times 100\%\]

</div>

| Device | Typical Efficiency |
|--------|-------------------|
| Power transformer | 95–99% |
| AC induction motor | 80–95% |
| LED bulb | 35–50% |
| Incandescent bulb | 2–5% |
| Switching power supply | 85–95% |

**Power gain** measures amplification:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[A_P = \frac{P_{out}}{P_{in}} \qquad A_P(dB) = 10\log_{10}\!\left(\frac{P_{out}}{P_{in}}\right)\]

</div>

---

## 10.12 Worked Example: Complete Power Analysis

**Problem:** A series RL load with R = 30 Ω and \(X_L = 40\) Ω is connected to a 120 V RMS, 60 Hz source. Find all power quantities and the capacitor needed for unity PF correction.

**Step 1 — Impedance and current:**

\(Z = 30 + j40 = 50\angle 53.13°\) Ω \(\quad I_{rms} = 120/50 = 2.4\) A

**Step 2 — Powers:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[P = I^2 R = (2.4)^2(30) = 172.8 \text{ W}\]
\[Q = I^2 X_L = (2.4)^2(40) = 230.4 \text{ VAR}\]
\[S = I^2|Z| = (2.4)^2(50) = 288 \text{ VA} \qquad PF = P/S = 0.6 \text{ lagging}\]

</div>

**Step 3 — Power factor correction to unity:**

\(Q_C = -230.4\) VAR needed. \(C = 230.4 / (2\pi \times 60 \times 120^2) = 42.5\) μF

After correction: current drops from 2.4 A to \(172.8/120 = 1.44\) A — a 40% reduction!

---

## 10.13 Chapter Summary

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 28px; margin: 1rem 0;" markdown>

**The three power quantities:**

| Quantity | Symbol | Units | Formula |
|----------|--------|-------|---------|
| Real (active) | P | W | \(V_{rms} I_{rms}\cos\theta\) |
| Reactive | Q | VAR | \(V_{rms} I_{rms}\sin\theta\) |
| Apparent | S | VA | \(V_{rms} I_{rms}\) |

**Power triangle:** \(S^2 = P^2 + Q^2\), \(\quad PF = P/S = \cos\theta\)

**Power factor correction:** add \(C = Q_C/(\omega V^2)\) in parallel with inductive load

**Per-element power:**
- Resistors: only P (real power)
- Capacitors: only Q < 0 (supply VARs)
- Inductors: only Q > 0 (absorb VARs)

**AC maximum power transfer:** \(Z_L = Z_s^*\) (conjugate matching), efficiency = 50%

</div>

</div>
