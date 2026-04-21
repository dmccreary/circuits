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

#### Diagram: RMS and Average Power Visualizer

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/rms-calculation/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 10.3 Reactive Power

**Reactive power** (Q) represents energy oscillating between the source and reactive elements without being consumed. It's measured in **volt-amperes reactive (VAR)**.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[Q = V_{rms} I_{rms} \sin\theta = I_{rms}^2 X\]

Inductive loads: \(Q > 0\) (lagging). Capacitive loads: \(Q < 0\) (leading).

</div>

### Energy Storage vs. Dissipation

The distinction between real and reactive power comes down to what happens to the energy each half-cycle.

In a **resistor**, energy flows in one direction only — from source to resistor — and is permanently converted to heat. The instantaneous power \(p_R(t) = v^2(t)/R\) is always non-negative, and its average (real power P) is positive.

In an **inductor**, energy is stored in the magnetic field during the first quarter-cycle (when current is increasing), then returned to the source during the second quarter-cycle (when current decreases). The net energy delivered over a full cycle is zero. This "back-and-forth" energy is reactive power.

In a **capacitor**, energy is stored in the electric field while the capacitor charges, then returned as it discharges. Again, the net energy per cycle is zero.

### Sign Convention

The sign of Q tells you the direction of reactive energy flow:

- **\(Q > 0\) (positive, inductive):** The load absorbs VARs from the source. Motors, transformers, and inductors all have positive Q. The current *lags* the voltage.
- **\(Q < 0\) (negative, capacitive):** The load *supplies* VARs to the circuit. Capacitors generate reactive power. The current *leads* the voltage.

This sign convention is why capacitors are used for power factor correction — they supply the VARs that inductive loads demand, so the utility doesn't have to.

### Why Reactive Power Matters Practically

Reactive power doesn't do useful work, but it still requires current to flow. Consider a motor with P = 800 W and Q = 600 VAR:

\[S = \sqrt{800^2 + 600^2} = 1{,}000 \text{ VA}\qquad I_{rms} = S / V_{rms} = 1{,}000/120 = 8.33 \text{ A}\]

The utility must supply 8.33 A even though the motor only needs \(800/120 = 6.67\) A worth of useful current. The extra current causes real losses in transmission lines (\(I^2 R_{line}\)) — losses that the utility pays for but the customer's watt-hour meter never registers. This is why utilities charge large industrial customers a **power factor penalty** and why power factor correction saves money.

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

### Phasor Derivation of \(\mathbf{S} = \mathbf{V}\mathbf{I}^*\)

Let the voltage and current phasors be:

\[\mathbf{V} = V_m \angle \theta_v \qquad \mathbf{I} = I_m \angle \theta_i\]

The complex conjugate of the current phasor simply negates the angle:

\[\mathbf{I}^* = I_m \angle (-\theta_i)\]

Multiplying:

\[\mathbf{S} = \mathbf{V}\,\mathbf{I}^* = (V_m \angle \theta_v)(I_m \angle -\theta_i) = V_m I_m \angle (\theta_v - \theta_i)\]

Let \(\theta = \theta_v - \theta_i\) (the impedance angle). Using RMS values (\(V_{rms} = V_m/\sqrt{2}\), \(I_{rms} = I_m/\sqrt{2}\)):

\[\mathbf{S} = V_{rms} I_{rms} \angle\theta = V_{rms} I_{rms}(\cos\theta + j\sin\theta) = P + jQ\]

This confirms: \(P = V_{rms}I_{rms}\cos\theta\) and \(Q = V_{rms}I_{rms}\sin\theta\).

!!! note "Why the Conjugate?"
    We use \(\mathbf{I}^*\) (not \(\mathbf{I}\)) so that P and Q have the correct physical signs. Using \(\mathbf{V}\mathbf{I}\) instead would swap inductive and capacitive signs.

### Worked Example: Computing Complex Power from Phasors

**Problem:** A load has voltage phasor \(\mathbf{V} = 120\angle 0°\) V (rms) and draws current phasor \(\mathbf{I} = 6\angle -36.87°\) A (rms). Find \(\mathbf{S}\), P, Q, and the power factor.

**Step 1 — Complex conjugate of current:**

\[\mathbf{I}^* = 6\angle +36.87° \text{ A}\]

**Step 2 — Complex power:**

\[\mathbf{S} = \mathbf{V}\,\mathbf{I}^* = (120\angle 0°)(6\angle 36.87°) = 720\angle 36.87° \text{ VA}\]

**Step 3 — Convert to rectangular form:**

\[\mathbf{S} = 720(\cos 36.87° + j\sin 36.87°) = 720(0.8 + j0.6) = 576 + j432 \text{ VA}\]

**Step 4 — Read off results:**

\[P = 576 \text{ W}\qquad Q = 432 \text{ VAR (inductive, positive)}\qquad S = |\mathbf{S}| = 720 \text{ VA}\]

\[PF = \cos(36.87°) = 0.8 \text{ lagging}\]

**Verification:** \(\sqrt{576^2 + 432^2} = \sqrt{331776 + 186624} = \sqrt{518400} = 720\) VA ✓

| Quantity | Symbol | Units | Formula |
|----------|--------|-------|---------|
| Real Power | \(P\) | W | \(V I \cos\theta\) |
| Reactive Power | \(Q\) | VAR | \(V I \sin\theta\) |
| Apparent Power | \(S\) | VA | \(VI = \|\mathbf{S}\|\) |
| Complex Power | \(\mathbf{S}\) | VA | \(P + jQ = \mathbf{V}\mathbf{I}^*\) |

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

#### Diagram: Power Triangle Explorer

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/power-triangle/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

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

### Derivation of Required Capacitor Size

The goal is to add a capacitor whose reactive power \(Q_C\) exactly cancels the excess reactive power of the load.

Starting from the power triangle: the load has real power P and reactive power \(Q_1 = P\tan\theta_1\). The corrected system should have the same P but reduced reactive power \(Q_2 = P\tan\theta_2\):

\[\Delta Q = Q_1 - Q_2 = P(\tan\theta_1 - \tan\theta_2)\]

This \(\Delta Q\) must be supplied by the correction capacitor. The reactive power of a capacitor connected across voltage \(V_{rms}\) at angular frequency \(\omega\) is:

\[|Q_C| = \frac{V_{rms}^2}{X_C} = V_{rms}^2 \cdot \omega C\]

Setting \(|Q_C| = \Delta Q\) and solving for C:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[Q_C = P(\tan\theta_1 - \tan\theta_2) \qquad C = \frac{Q_C}{\omega\, V_{rms}^2}\]

</div>

### Worked Example: Full Power Factor Correction Design

**Problem:** A factory load draws P = 10 kW at PF = 0.70 lagging from a 240 V, 60 Hz supply. The utility requires PF ≥ 0.95. Find the capacitor needed and the resulting line current reduction.

**Step 1 — Characterize the existing load:**

\[\theta_1 = \cos^{-1}(0.70) = 45.57°\qquad\tan\theta_1 = 1.020\]

\[Q_1 = P\tan\theta_1 = 10{,}000 \times 1.020 = 10{,}200 \text{ VAR}\]

\[S_1 = P/PF = 10{,}000/0.70 = 14{,}286 \text{ VA}\qquad I_1 = S_1/V_{rms} = 14{,}286/240 = 59.5 \text{ A}\]

**Step 2 — Target reactive power at corrected PF:**

\[\theta_2 = \cos^{-1}(0.95) = 18.19°\qquad\tan\theta_2 = 0.329\]

\[Q_2 = P\tan\theta_2 = 10{,}000 \times 0.329 = 3{,}290 \text{ VAR}\]

**Step 3 — Required capacitor reactive power:**

\[Q_C = Q_1 - Q_2 = 10{,}200 - 3{,}290 = 6{,}910 \text{ VAR}\]

**Step 4 — Capacitor value:**

\[C = \frac{Q_C}{\omega V_{rms}^2} = \frac{6{,}910}{2\pi \times 60 \times 240^2} = \frac{6{,}910}{2{,}170{,}354} = 318 \text{ μF}\]

Use a standard 320 μF capacitor.

**Step 5 — Verify reduced line current:**

\[S_2 = P/PF_2 = 10{,}000/0.95 = 10{,}526 \text{ VA}\qquad I_2 = 10{,}526/240 = 43.9 \text{ A}\]

Current reduction: \((59.5 - 43.9)/59.5 = 26\%\) less current from the utility.

Line loss reduction: \(I^2 R\) losses drop by \(1 - (43.9/59.5)^2 = 1 - 0.544 = 45.6\%\) — nearly half the wasted power in the cables is eliminated.

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

Use the simulation below to explore how real and reactive power change as you vary the component type, resistance, reactance, and supply voltage:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/power-dissipation-calc/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

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

**Complete AC power quantity reference:**

| Quantity | Symbol | Units | Formula | Notes |
|----------|--------|-------|---------|-------|
| Instantaneous power | \(p(t)\) | W | \(v(t)\cdot i(t)\) | Varies at 2ω |
| Real (active) power | \(P\) | W | \(V_{rms} I_{rms}\cos\theta\) | Useful work; billed by utility |
| Reactive power | \(Q\) | VAR | \(V_{rms} I_{rms}\sin\theta\) | \(Q>0\) inductive; \(Q<0\) capacitive |
| Apparent power | \(S\) | VA | \(V_{rms} I_{rms} = |\mathbf{S}|\) | Equipment sizing |
| Complex power | \(\mathbf{S}\) | VA | \(P + jQ = \mathbf{V}\mathbf{I}^*\) | Phasor computation |
| Power factor | PF | — | \(\cos\theta = P/S\) | 0 to 1; lagging or leading |

**Power triangle relationship:**

\[S^2 = P^2 + Q^2 \qquad PF = \frac{P}{S} = \cos\theta \qquad \tan\theta = \frac{Q}{P}\]

**Per-element power behavior:**

| Element | P | Q | PF |
|---------|---|---|----|
| Resistor | \(I^2 R > 0\) | 0 | 1 (unity) |
| Inductor | 0 | \(I^2 X_L > 0\) | 0 lagging |
| Capacitor | 0 | \(-V^2/X_C < 0\) | 0 leading |

**Power factor correction:**
- Add capacitor in parallel with inductive load
- Required VAR: \(Q_C = P(\tan\theta_1 - \tan\theta_2)\)
- Required capacitance: \(C = Q_C / (\omega V_{rms}^2)\)
- Result: reduced line current, lower \(I^2R\) losses, no change in real power delivered

**AC maximum power transfer:** \(Z_L = Z_s^*\) (conjugate matching)
- \(R_L = R_s\), \(X_L = -X_s\) (reactances cancel, creating resonance)
- Maximum real power: \(P_{max} = |V_s|^2/(4R_s)\)
- Efficiency: 50% — acceptable for signal applications, not for power delivery

**Key sign rules:**
- \(\theta = \theta_v - \theta_i\): positive when current lags (inductive/lagging)
- Complex power uses \(\mathbf{I}^*\) (conjugate), not \(\mathbf{I}\), to get correct P and Q signs
- Utilities penalize PF below ~0.90–0.95 for large industrial customers

</div>

</div>
