# AC Power Analysis

## Summary

This chapter examines power in AC circuits, which behaves quite differently from DC power due to the phase relationships between voltage and current. Students will learn about instantaneous, average, real, reactive, and apparent power, and understand how power factor affects energy efficiency. The chapter covers the power triangle, power factor correction using capacitors, and power calculations in resistive, capacitive, and inductive elements. Understanding AC power is crucial for audio amplifier design and power system efficiency.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. Instantaneous Power
2. Average Power
3. Real Power
4. Reactive Power
5. Apparent Power
6. Complex Power
7. Power Triangle
8. Power Factor
9. Leading Power Factor
10. Lagging Power Factor
11. Power Factor Correction
12. VAR
13. Watt
14. Volt-Ampere
15. Maximum Power in AC
16. RMS Power Calculation
17. Power in Resistors
18. Power in Capacitors
19. Power in Inductors
20. Efficiency
21. Power Gain

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Electric Charge and Basic Circuit Quantities](../01-electric-charge-basic-quantities/index.md)
- [Chapter 5: Passive Components: Resistors, Capacitors, and Inductors](../05-passive-components/index.md)
- [Chapter 9: Phasors and Complex Impedance](../09-phasors-complex-impedance/index.md)

---
title: AC Power Analysis
description: Understand real, reactive, and apparent power, power factor, and efficiency in AC circuits
generated_by: chapter-content-generator v0.03
date: 2026-01-30
---

## Introduction: Where Does the Power Go?

In DC circuits, power is straightforward: \(P = VI\), energy flows from source to load, and that's that. AC circuits tell a more interesting story. Sometimes energy flows *backward* from load to source. Sometimes voltage and current are working at cross-purposes. And sometimes what looks like a lot of power isn't doing any useful work at all.

Welcome to AC power analysis, where we untangle the mysteries of:

- Why your electric bill charges for "real" power while power companies worry about "reactive" power
- Why a motor can draw more current than you'd expect from its wattage
- Why power factor correction capacitors can save factories thousands of dollars
- Why your audio amplifier's speaker wires matter

Understanding AC power is where circuit theory meets the real world of energy efficiency, power distribution, and amplifier design. The concepts here apply to everything from the power grid to your laptop charger to concert PA systems.

## Instantaneous Power: The Moment-by-Moment Reality

**Instantaneous power** is the power at any specific instant in time:

\[p(t) = v(t) \cdot i(t)\]

For sinusoidal signals:
\[v(t) = V_m \cos(\omega t + \theta_v)\]
\[i(t) = I_m \cos(\omega t + \theta_i)\]

The instantaneous power is:
\[p(t) = V_m I_m \cos(\omega t + \theta_v) \cos(\omega t + \theta_i)\]

Using the trig identity \(\cos A \cos B = \frac{1}{2}[\cos(A-B) + \cos(A+B)]\):

\[p(t) = \frac{V_m I_m}{2}\cos(\theta_v - \theta_i) + \frac{V_m I_m}{2}\cos(2\omega t + \theta_v + \theta_i)\]

This reveals two components:

1. **Constant term:** \(\frac{V_m I_m}{2}\cos\theta\) - the average power
2. **Oscillating term:** Fluctuates at twice the signal frequency

The oscillating component means power flows back and forth between source and reactive elements (L and C) every quarter cycle!

#### Diagram: Instantaneous Power Oscillation

<iframe src="../../sims/instantaneous-power/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Instantaneous Power Oscillation</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how instantaneous power oscillates and can go negative, representing energy returning to the source.

Visual elements:
- Top plot: v(t) and i(t) waveforms
- Bottom plot: p(t) = v(t)×i(t) instantaneous power
- Shading: Positive power (green) and negative power (red)
- Average power line shown as horizontal dashed line
- Phase angle between v and i indicated
- Current time marker synchronized across both plots

Interactive controls:
- Slider: Phase angle θ between v and i (0° to 90°)
- Slider: Current magnitude (affects power scale)
- Toggle: Show/hide average power line
- Toggle: Show/hide shaded regions
- Display: Average power calculation

Annotations for different phase angles:
- θ = 0°: "All positive - resistive load"
- θ = 45°: "Some energy returns to source"
- θ = 90°: "Average power = 0, all reactive"

Default parameters:
- θ = 30° (typical inductive load)
- Vm = 10V, Im = 5A

Canvas layout:
- Dual stacked plots: 600 × 200 pixels each
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Average Power: What Actually Gets Used

**Average power** (also called real power or active power) is the time-averaged value of instantaneous power over one complete cycle:

\[P_{avg} = \frac{1}{T}\int_0^T p(t) \, dt\]

For sinusoids, this works out to:

\[P = \frac{V_m I_m}{2}\cos\theta = V_{rms} I_{rms} \cos\theta\]

Where \(\theta = \theta_v - \theta_i\) is the phase angle between voltage and current.

**Key insight:** The factor \(\cos\theta\) is the **power factor**. It determines how much of the apparent power does useful work.

| Phase Angle θ | cos θ | Power Factor | Interpretation |
|---------------|-------|--------------|----------------|
| 0° | 1.00 | Unity | All power is real (resistive) |
| 30° | 0.866 | 0.866 lagging | Moderate reactive component |
| 45° | 0.707 | 0.707 | Equal real and reactive |
| 60° | 0.50 | 0.5 lagging | Mostly reactive |
| 90° | 0.00 | Zero | All reactive (pure L or C) |

## Real Power: The Workhorse

**Real power** (P) is the average power that performs actual work—heating elements, turning motors, producing light and sound. It's measured in **watts (W)**.

\[P = V_{rms} I_{rms} \cos\theta = I_{rms}^2 R = \frac{V_{rms}^2}{R} \cdot \frac{R}{|Z|^2}\]

**Where real power goes:**

- Heat in resistive elements
- Mechanical work in motors
- Light from lamps
- Sound from speakers
- Computation in processors

**What you pay for:** Your electric bill is based on real power consumed (kilowatt-hours), not apparent power.

!!! tip "Why Watts Matter"
    When someone asks "How much power?" they usually mean real power in watts. A 100W light bulb consumes 100W of real power. A 1000W microwave uses 1000W of real power. This is the energy that does useful work and appears on your electric bill.

## Reactive Power: The Busy Work

**Reactive power** (Q) represents energy that oscillates between the source and reactive elements (inductors and capacitors) without being consumed. It's measured in **volt-amperes reactive (VAR)**.

\[Q = V_{rms} I_{rms} \sin\theta = I_{rms}^2 X\]

**Reactive power characteristics:**

- Doesn't perform useful work
- Energy flows back and forth each quarter cycle
- Still requires current to flow (sizing wires, transformers)
- Inductive loads: Q > 0 (positive, "lagging")
- Capacitive loads: Q < 0 (negative, "leading")

**Why reactive power matters:**

Even though reactive power doesn't do work, it:

- Increases current magnitude (I²R losses in wires)
- Requires larger transformers and generators
- Reduces power system capacity
- Can cause voltage drops

| Load Type | Q | Sign Convention |
|-----------|---|-----------------|
| Inductive | Positive | Absorbs VARs (lagging) |
| Capacitive | Negative | Supplies VARs (leading) |
| Resistive | Zero | No reactive power |

## Apparent Power: The Full Picture

**Apparent power** (S) is the product of RMS voltage and RMS current, representing the total "power handling" required:

\[S = V_{rms} I_{rms}\]

Apparent power is measured in **volt-amperes (VA)**, not watts, to distinguish it from real power.

**The power relationship:**

\[S^2 = P^2 + Q^2\]

Or equivalently:

\[S = \sqrt{P^2 + Q^2}\]

**Apparent power determines:**

- Wire and cable sizing (must carry full current)
- Transformer ratings
- Generator capacity
- Circuit breaker ratings

**Example:** A motor draws 10A from a 120V source with power factor 0.8.
- Apparent power: S = 120 × 10 = 1200 VA
- Real power: P = 1200 × 0.8 = 960 W
- Reactive power: Q = 1200 × 0.6 = 720 VAR

The motor only does 960W of work, but the supply must provide capacity for 1200 VA!

## Complex Power: The Elegant Formulation

**Complex power** combines real and reactive power into a single complex number:

\[\mathbf{S} = P + jQ = V_{rms} I_{rms}^*\]

Where \(I^*\) is the complex conjugate of the current phasor.

**Alternative formula using impedance:**

\[\mathbf{S} = I_{rms}^2 Z = \frac{V_{rms}^2}{Z^*}\]

**Components:**

- Real part: \(P = \text{Re}\{\mathbf{S}\}\) = Real power (W)
- Imaginary part: \(Q = \text{Im}\{\mathbf{S}\}\) = Reactive power (VAR)
- Magnitude: \(|\mathbf{S}| = S\) = Apparent power (VA)

| Quantity | Symbol | Formula | Units |
|----------|--------|---------|-------|
| Real Power | P | \(V I \cos\theta\) | Watts (W) |
| Reactive Power | Q | \(V I \sin\theta\) | VAR |
| Apparent Power | S | \(V I\) | VA |
| Complex Power | **S** | \(P + jQ\) | VA |

## The Power Triangle: Visualizing the Relationship

The **power triangle** shows the geometric relationship between P, Q, and S:

```
           S (VA)
           /|
          / |
         /  | Q (VAR)
        /θ__|
         P (W)
```

**Relationships:**

- Hypotenuse: Apparent power S
- Horizontal leg: Real power P
- Vertical leg: Reactive power Q
- Angle: Phase angle θ (same as impedance angle)

**From the triangle:**

\[S = \sqrt{P^2 + Q^2}\]
\[\cos\theta = \frac{P}{S}\] (power factor)
\[\tan\theta = \frac{Q}{P}\]

#### Diagram: Interactive Power Triangle

<iframe src="../../sims/power-triangle/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Interactive Power Triangle</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate power quantities from the power triangle relationship and observe how power factor affects the relationship between P, Q, and S.

Visual elements:
- Power triangle with P, Q, S labeled
- Phase angle θ shown with arc
- Color coding: P (green), Q (red for inductive/blue for capacitive), S (purple)
- Phasor diagram showing V and I relationship (linked)
- Numerical values displayed on triangle sides

Interactive controls:
- Mode toggle: "Enter P and Q" vs "Enter S and θ"
- Slider: P or S (depending on mode)
- Slider: Q or θ (depending on mode)
- Toggle: Inductive/Capacitive load
- Display: All calculated values

Calculations displayed:
- S = √(P² + Q²)
- Power factor = P/S = cos(θ)
- θ = tan⁻¹(Q/P)
- Current = S/V (for given V)

Visual feedback:
- Triangle reshapes with parameter changes
- Q above horizontal for inductive (lagging)
- Q below horizontal for capacitive (leading)

Default parameters:
- P = 800W
- Q = 600 VAR (inductive)
- S = 1000 VA
- PF = 0.8 lagging

Canvas layout:
- Triangle display: 450 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Power Factor: Leading and Lagging

**Power factor** (PF) is the cosine of the phase angle between voltage and current:

\[PF = \cos\theta = \frac{P}{S}\]

Power factor ranges from 0 to 1 and indicates how efficiently apparent power is converted to real power.

### Lagging Power Factor

A **lagging power factor** occurs when current lags behind voltage. This happens with inductive loads:

- Motors
- Transformers
- Fluorescent light ballasts
- Most industrial loads

**Characteristics:**
- θ > 0° (positive angle)
- Q > 0 (positive reactive power)
- Load absorbs VARs

### Leading Power Factor

A **leading power factor** occurs when current leads voltage. This happens with capacitive loads:

- Power factor correction capacitors
- Lightly loaded synchronous motors
- Some electronic power supplies

**Characteristics:**
- θ < 0° (negative angle)
- Q < 0 (negative reactive power)
- Load supplies VARs

| Power Factor | Description | Typical Load |
|--------------|-------------|--------------|
| 1.0 | Unity | Resistive heaters, incandescent bulbs |
| 0.95 lagging | Excellent | Well-corrected motors |
| 0.85 lagging | Good | Typical industrial mix |
| 0.70 lagging | Poor | Uncompensated motors |
| 0.50 lagging | Very poor | Lightly loaded motors |

## Power Factor Correction

**Power factor correction** improves power factor by adding reactive elements (usually capacitors) that supply reactive power locally, reducing the reactive power drawn from the source.

**Why correct power factor?**

1. **Reduce current:** Lower current for same real power means smaller wires, less I²R loss
2. **Increase capacity:** Existing infrastructure can handle more load
3. **Avoid penalties:** Utilities charge penalties for poor power factor
4. **Improve voltage regulation:** Less reactive current means less voltage drop

**Correction method:**

For an inductive load with lagging power factor, add parallel capacitors:

\[Q_C = P(\tan\theta_{old} - \tan\theta_{new})\]

\[C = \frac{Q_C}{\omega V_{rms}^2}\]

**Example:** A 10 kW load operates at 0.7 PF lagging from 240V, 60Hz. Correct to 0.95 PF.

Old: \(\theta_1 = \cos^{-1}(0.7) = 45.57°\), \(\tan\theta_1 = 1.02\)
New: \(\theta_2 = \cos^{-1}(0.95) = 18.19°\), \(\tan\theta_2 = 0.329\)

\[Q_C = 10000(1.02 - 0.329) = 6910 \text{ VAR}\]
\[C = \frac{6910}{2\pi(60)(240)^2} = 319 \text{ μF}\]

Adding about 320 μF of capacitance reduces reactive power from the source by 6910 VAR!

#### Diagram: Power Factor Correction Simulator

<iframe src="../../sims/pf-correction/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Power Factor Correction Simulator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: solve

Learning Objective: Students will solve for the required capacitance to correct power factor and observe the resulting reduction in line current.

Visual elements:
- Circuit diagram showing load with parallel correction capacitor
- Before/after power triangles side by side
- Current phasor diagram showing reduction
- Ammeter showing line current before and after
- Savings calculation display

Interactive controls:
- Slider: Real power P (1kW to 100kW)
- Slider: Original power factor (0.5 to 0.95)
- Slider: Target power factor (0.9 to 1.0)
- Input: Supply voltage (120V, 240V, 480V options)
- Input: Frequency (50Hz or 60Hz)
- Button: Calculate correction

Calculations displayed:
- Q_old and Q_new
- Required Q_C
- Required capacitance C
- Current reduction percentage
- Power loss reduction (I²R savings)

Visual feedback:
- Power triangle shrinks vertically (Q reduction)
- S vector shortens
- Current magnitude decreases
- "Savings: X% current reduction" highlighted

Default parameters:
- P = 10 kW
- PF_old = 0.7 lagging
- PF_new = 0.95 lagging
- V = 240V, f = 60Hz

Canvas layout:
- Circuit/triangles: 450 × 400 pixels
- Current display: 150 × 400 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Power in Circuit Elements

Each passive component has a distinct power behavior:

### Power in Resistors

Resistors only have real power—voltage and current are in phase:

\[P_R = I_{rms}^2 R = \frac{V_{rms}^2}{R}\]
\[Q_R = 0\]

All power absorbed by a resistor is converted to heat. Power factor for a pure resistor is 1.

### Power in Capacitors

Pure capacitors have only reactive power—current leads voltage by 90°:

\[P_C = 0\]
\[Q_C = -V_{rms} I_{rms} = -I_{rms}^2 X_C = -\frac{V_{rms}^2}{X_C}\]

The negative sign indicates capacitors *supply* reactive power (they're sources of VARs). Power factor is 0 leading.

### Power in Inductors

Pure inductors have only reactive power—current lags voltage by 90°:

\[P_L = 0\]
\[Q_L = V_{rms} I_{rms} = I_{rms}^2 X_L = \frac{V_{rms}^2}{X_L}\]

Inductors *absorb* reactive power (they're loads for VARs). Power factor is 0 lagging.

| Element | Real Power P | Reactive Power Q | Power Factor |
|---------|--------------|------------------|--------------|
| Resistor | I²R | 0 | 1 (resistive) |
| Capacitor | 0 | -V²/X_C (negative) | 0 (leading) |
| Inductor | 0 | V²/X_L (positive) | 0 (lagging) |

#### Diagram: Power Flow in R, L, C

<iframe src="../../sims/power-flow-rlc/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Power Flow in R, L, C</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain the difference in power behavior between resistors, capacitors, and inductors by observing energy flow patterns.

Visual elements:
- Three circuits side by side: Pure R, Pure C, Pure L
- Each with animated energy flow arrows
- Instantaneous power plots below each circuit
- Energy storage indicators (E-field for C, B-field for L)
- Heat dissipation indicator for R

Interactive controls:
- Slider: Frequency (affects L and C reactance)
- Slider: Component value (R, L, or C)
- Toggle: Animate energy flow
- Toggle: Show all three or focus on one
- Display: P and Q for each element

Animation behavior:
- R: Steady energy flow to heat
- C: Energy pulses back and forth, average = 0
- L: Energy pulses back and forth, average = 0
- Arrows show energy direction, thickness shows magnitude

Visual annotations:
- R: "Energy → Heat (P = I²R, Q = 0)"
- C: "Energy ↔ E-field (P = 0, Q < 0)"
- L: "Energy ↔ B-field (P = 0, Q > 0)"

Default parameters:
- ω = 1000 rad/s
- Visible animation speed

Canvas layout:
- Three-panel display: 600 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## RMS Power Calculations

Since AC power involves time-varying quantities, we use RMS values to simplify calculations:

**For any load with impedance Z:**

\[P = I_{rms}^2 R = V_{rms} I_{rms} \cos\theta\]
\[Q = I_{rms}^2 X = V_{rms} I_{rms} \sin\theta\]
\[S = I_{rms}^2 |Z| = V_{rms} I_{rms}\]

**The power formulas summary:**

| Formula | Using I_rms | Using V_rms | Using both |
|---------|-------------|-------------|------------|
| P (real) | \(I_{rms}^2 R\) | \(\frac{V_{rms}^2 R}{|Z|^2}\) | \(V_{rms} I_{rms} \cos\theta\) |
| Q (reactive) | \(I_{rms}^2 X\) | \(\frac{V_{rms}^2 X}{|Z|^2}\) | \(V_{rms} I_{rms} \sin\theta\) |
| S (apparent) | \(I_{rms}^2 |Z|\) | \(\frac{V_{rms}^2}{|Z|}\) | \(V_{rms} I_{rms}\) |

!!! note "Why RMS Works"
    RMS (Root Mean Square) values are specifically designed so that power formulas work the same as DC. The RMS value of an AC signal delivers the same power to a resistor as a DC signal of that value. That's why RMS is the standard for AC measurements.

## Maximum Power Transfer in AC Circuits

For maximum power transfer from a source with internal impedance \(Z_s = R_s + jX_s\) to a load \(Z_L\):

\[Z_L = Z_s^* = R_s - jX_s\]

The load impedance should be the **complex conjugate** of the source impedance.

**When conjugate matched:**

- Load resistance equals source resistance: \(R_L = R_s\)
- Load reactance cancels source reactance: \(X_L = -X_s\)
- Resonance occurs, maximizing current
- Maximum power delivered: \(P_{max} = \frac{V_s^2}{4R_s}\)

**Efficiency consideration:**

At conjugate matching, only 50% of the total power reaches the load (the other 50% is lost in the source). For high-efficiency applications, \(R_L >> R_s\) is preferred, trading maximum power for maximum efficiency.

| Match Type | Condition | Power | Efficiency |
|------------|-----------|-------|------------|
| Conjugate match | Z_L = Z_s* | Maximum | 50% |
| High efficiency | R_L >> R_s | Less than max | >90% |
| Mismatch | Random Z_L | Low | Variable |

## Efficiency

**Efficiency** (η) is the ratio of useful output power to total input power:

\[\eta = \frac{P_{out}}{P_{in}} = \frac{P_{out}}{P_{out} + P_{losses}}\]

Usually expressed as a percentage:

\[\eta(\%) = \frac{P_{out}}{P_{in}} \times 100\%\]

**Power loss sources:**

- I²R losses in wires (copper losses)
- Core losses in transformers and motors (iron losses)
- Switching losses in electronics
- Friction and windage in rotating machines

**Typical efficiencies:**

| Device | Typical Efficiency |
|--------|-------------------|
| Power transformer | 95-99% |
| AC induction motor | 80-95% |
| Incandescent bulb | 2-5% |
| LED bulb | 35-50% |
| Solar panel | 15-22% |
| Power electronics | 85-98% |

## Power Gain

**Power gain** measures amplification in terms of power:

\[A_P = \frac{P_{out}}{P_{in}}\]

In decibels:

\[A_P(dB) = 10\log_{10}\left(\frac{P_{out}}{P_{in}}\right)\]

**Relationship to voltage and current gain:**

\[A_P = A_V \cdot A_I\]

In dB: \(A_P(dB) = A_V(dB) + A_I(dB)\)

**For impedance-matched systems:**

\[A_P(dB) = 20\log_{10}|A_V| = 20\log_{10}|A_I|\]

(when Z_in = Z_out)

| Power Gain | dB | Description |
|------------|-----|-------------|
| 1000 | 30 dB | High gain amplifier |
| 100 | 20 dB | Moderate amplifier |
| 10 | 10 dB | Low gain amplifier |
| 1 | 0 dB | Unity (buffer) |
| 0.1 | -10 dB | Attenuator |

## Worked Example: Complete Power Analysis

**Problem:** A series RL load with R = 30Ω and X_L = 40Ω is connected to a 120V RMS, 60Hz source. Find all power quantities, power factor, and the capacitor needed for unity power factor correction.

**Solution:**

**Step 1: Find impedance and current**

\[Z = R + jX_L = 30 + j40 = 50\angle 53.13° \text{ Ω}\]
\[I_{rms} = \frac{V_{rms}}{|Z|} = \frac{120}{50} = 2.4 \text{ A}\]

**Step 2: Calculate powers**

\[P = I_{rms}^2 R = (2.4)^2 (30) = 172.8 \text{ W}\]
\[Q = I_{rms}^2 X_L = (2.4)^2 (40) = 230.4 \text{ VAR}\]
\[S = I_{rms}^2 |Z| = (2.4)^2 (50) = 288 \text{ VA}\]

Check: \(\sqrt{P^2 + Q^2} = \sqrt{172.8^2 + 230.4^2} = 288\) ✓

**Step 3: Find power factor**

\[PF = \cos\theta = \cos(53.13°) = 0.6 \text{ lagging}\]

Or: \(PF = P/S = 172.8/288 = 0.6\) ✓

**Step 4: Power factor correction to unity**

For PF = 1.0, we need Q_C = -Q_L to cancel all reactive power:

\[Q_C = -230.4 \text{ VAR}\]

\[C = \frac{|Q_C|}{\omega V_{rms}^2} = \frac{230.4}{2\pi(60)(120)^2} = 42.5 \text{ μF}\]

**After correction:**

- Current drops from 2.4A to \(I = P/V = 172.8/120 = 1.44\) A
- 40% current reduction!
- Same real power delivered with less line current

## Self-Check Questions

??? question "1. A motor draws 5A from a 240V, 60Hz source at 0.8 power factor lagging. Calculate P, Q, S, and the phase angle."
    **Apparent power:**
    \[S = V \cdot I = 240 \times 5 = 1200 \text{ VA}\]

    **Real power:**
    \[P = S \times PF = 1200 \times 0.8 = 960 \text{ W}\]

    **Phase angle:**
    \[\theta = \cos^{-1}(0.8) = 36.87°\]

    **Reactive power:**
    \[Q = S \times \sin\theta = 1200 \times 0.6 = 720 \text{ VAR}\]

    Or: \(Q = \sqrt{S^2 - P^2} = \sqrt{1200^2 - 960^2} = 720\) VAR

    The motor consumes 960W of real power and 720 VAR of reactive power.

??? question "2. Why does a capacitor have negative reactive power while an inductor has positive reactive power?"
    This is a sign convention that reflects energy flow direction relative to the source:

    **Inductor (Q > 0, positive):**
    - Current lags voltage
    - Absorbs reactive power from the source
    - Acts as a VAR "load"

    **Capacitor (Q < 0, negative):**
    - Current leads voltage
    - Supplies reactive power back to the circuit
    - Acts as a VAR "source"

    Think of it this way: Inductors are hungry for VARs (they absorb them), while capacitors are generous with VARs (they supply them). This is why adding capacitors to an inductive load cancels out the VAR requirement from the source—the capacitor supplies what the inductor needs locally.

??? question "3. A factory has a 500 kW load at 0.7 PF lagging. What size capacitor bank (in kVAR) is needed to improve power factor to 0.95 lagging?"
    **Original reactive power:**
    \[\theta_1 = \cos^{-1}(0.7) = 45.57°\]
    \[Q_1 = P \tan\theta_1 = 500 \times 1.02 = 510 \text{ kVAR}\]

    **Target reactive power:**
    \[\theta_2 = \cos^{-1}(0.95) = 18.19°\]
    \[Q_2 = P \tan\theta_2 = 500 \times 0.329 = 164.5 \text{ kVAR}\]

    **Required capacitor bank:**
    \[Q_C = Q_1 - Q_2 = 510 - 164.5 = 345.5 \text{ kVAR}\]

    A 350 kVAR capacitor bank (rounded to standard size) would provide the needed correction.

??? question "4. At maximum power transfer with conjugate matching, why is efficiency only 50%?"
    With conjugate matching:
    - \(Z_L = Z_s^*\), which means \(R_L = R_s\) and \(X_L = -X_s\)
    - The reactances cancel, leaving only resistances in series
    - The circuit becomes equivalent to \(R_s\) and \(R_L = R_s\) in series

    Total current: \(I = V_s/(R_s + R_L) = V_s/(2R_s)\)

    Power to load: \(P_L = I^2 R_L = \frac{V_s^2}{4R_s}\)

    Power in source: \(P_s = I^2 R_s = \frac{V_s^2}{4R_s}\)

    Total power: \(P_{total} = P_L + P_s = \frac{V_s^2}{2R_s}\)

    Efficiency: \(\eta = P_L/P_{total} = 50\%\)

    Half the power is always dissipated in the source resistance. This is acceptable in communication systems where maximizing signal power is critical. For power delivery (utility systems), we prioritize efficiency by making \(R_L >> R_s\).

## Summary

AC power analysis reveals the complex relationship between voltage, current, and useful work:

1. **Instantaneous power oscillates** - It can go negative, meaning energy flows back to the source

2. **Real power (P) does useful work** - Measured in watts, it's what you pay for and what performs tasks

3. **Reactive power (Q) sloshes back and forth** - Measured in VAR, it doesn't do work but requires current capacity

4. **Apparent power (S) is the total "burden"** - Measured in VA, it determines equipment sizing

5. **The power triangle relates P, Q, and S** - They form a right triangle with \(S^2 = P^2 + Q^2\)

6. **Power factor measures efficiency** - \(PF = P/S = \cos\theta\); higher is better

7. **Lagging PF means inductive load** - Most industrial loads are lagging due to motors

8. **Power factor correction uses capacitors** - They supply VARs locally, reducing current from the source

9. **Resistors consume real power only** - Capacitors and inductors have only reactive power

10. **Maximum power requires conjugate matching** - But efficiency is only 50%; for power systems, we optimize differently

Understanding these concepts is essential for anyone working with power systems, from designing efficient motor drives to sizing cables to understanding why your electricity bill exists. In audio applications, these same principles govern amplifier efficiency, speaker matching, and power delivery to transducers. The physics of power is everywhere—now you have the tools to analyze it.
