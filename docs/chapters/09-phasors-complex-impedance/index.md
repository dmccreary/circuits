# Phasors and Complex Impedance

## Summary

This chapter introduces phasors - rotating vectors that elegantly represent sinusoidal signals - and shows how they transform differential equations into algebraic ones. Students will learn about impedance, the AC equivalent of resistance, and how capacitors and inductors create frequency-dependent reactance. The chapter covers the impedance triangle, admittance, and the phasor domain approach to AC circuit analysis. Mastering phasor techniques is essential for efficient analysis of AC circuits.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. Phasor
2. Phasor Diagram
3. Phasor Addition
4. Impedance
5. Reactance
6. Capacitive Reactance
7. Inductive Reactance
8. Admittance
9. Susceptance
10. AC Resistance
11. Impedance Triangle
12. Complex Impedance
13. AC Circuit Analysis
14. Phasor Domain
15. Resonance
16. Series Resonance
17. Parallel Resonance
18. Selectivity
19. Bandwidth
20. Passband
21. Stopband

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Passive Components: Resistors, Capacitors, and Inductors](../05-passive-components/index.md)
- [Chapter 7: Second-Order Circuits and RLC Behavior](../07-second-order-rlc-circuits/index.md)
- [Chapter 8: AC Signals and Sinusoidal Waveforms](../08-ac-signals-sinusoidal/index.md)

---
title: Phasors and Complex Impedance
description: Transform AC circuit analysis from differential equations to simple algebra using phasors and impedance
generated_by: chapter-content-generator v0.03
date: 2026-01-30
---

## Introduction: Freezing the Dance

In the last chapter, you learned that AC signals are constantly in motion—sinusoids that rise and fall, shift and dance through time. Analyzing circuits with these moving signals seems like it should be complicated. And with differential equations, it *is* complicated.

But here's the secret that electrical engineers discovered over a century ago: if all your signals are sinusoids at the same frequency (which is true for most AC power and signal analysis), you can take a snapshot of the dance. You can freeze the rotating signals into stationary arrows called **phasors**, and suddenly all those intimidating differential equations become simple algebra that you already know how to do.

This chapter introduces the phasor transformation—one of the most powerful tools in circuit analysis. You'll learn that capacitors and inductors have a frequency-dependent "resistance" called impedance, and that Ohm's law works perfectly in the phasor domain. By the end, you'll be analyzing AC circuits with the same ease as DC circuits, just with complex numbers instead of real ones.

## Phasors: Rotating Vectors Frozen in Time

A **phasor** is a complex number that represents the amplitude and phase of a sinusoidal signal. It captures the "personality" of a sinusoid—how big and where in its cycle—while stripping away the time variation.

**The transformation:**

For a sinusoidal voltage:
\[v(t) = V_m \cos(\omega t + \phi)\]

The corresponding phasor is:
\[\mathbf{V} = V_m \angle \phi = V_m e^{j\phi}\]

**Key insight:** The phasor contains all the information about the sinusoid *except* the frequency, which we track separately. Since all signals in a typical AC analysis share the same frequency, we can factor it out!

To recover the time-domain signal from a phasor:
\[v(t) = \text{Re}\{\mathbf{V} e^{j\omega t}\} = \text{Re}\{V_m e^{j(\omega t + \phi)}\}\]

**Notation conventions:**

| Notation | Meaning |
|----------|---------|
| \(v(t)\) | Time-domain signal (lowercase, function of t) |
| \(\mathbf{V}\) | Phasor (bold uppercase, no time dependence) |
| \(V_m\) or \(|\mathbf{V}|\) | Magnitude (peak value) |
| \(\angle\phi\) | Phase angle |

!!! tip "Why Cosine as Reference?"
    Engineers typically use cosine (not sine) as the reference for phasor analysis because it aligns naturally with the real axis on the complex plane. A phasor at angle 0° corresponds to a cosine wave. Converting from sine is easy: \(\sin(\omega t) = \cos(\omega t - 90°)\).

#### Diagram: Phasor Transformation Visualizer

<iframe src="../../sims/phasor-transform/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Phasor Transformation Visualizer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain the relationship between a time-domain sinusoid and its phasor representation by observing both simultaneously.

Visual elements:
- Left panel: Time-domain waveform v(t) = Vm cos(ωt + φ)
- Right panel: Complex plane with phasor arrow
- Animated rotating phasor (optional) showing e^(jωt) rotation
- Real-axis projection tracking the time waveform
- Current time marker on waveform
- Phase angle arc on phasor diagram

Interactive controls:
- Slider: Magnitude Vm (1 to 10)
- Slider: Phase angle φ (-180° to 180°)
- Toggle: Show rotating version vs frozen phasor
- Slider: Animation speed (when rotating)
- Button: Freeze at current angle
- Display: Phasor in polar and rectangular form

Step-through mode:
- Stage 1: Show time-domain sinusoid
- Stage 2: Show rotating phasor and how projection creates sinusoid
- Stage 3: "Freeze" the phasor at t=0 to get the static phasor

Annotations:
- "Magnitude = peak amplitude"
- "Phase = starting angle at t=0"
- Formula showing transformation

Default parameters:
- Vm = 5
- φ = 45°
- ω = 2π rad/s (1 Hz for visible animation)

Canvas layout:
- Dual panel: 300 × 350 pixels each
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Phasor Diagrams: Seeing Phase Relationships

A **phasor diagram** displays multiple phasors on the same complex plane, making phase relationships visually obvious. The lengths represent magnitudes, and the angles show relative phases.

**Reading a phasor diagram:**

- Phasors pointing in the same direction are in phase
- A phasor rotated counterclockwise from another *leads* it in phase
- A phasor rotated clockwise *lags*
- Perpendicular phasors are 90° out of phase

**Common reference conventions:**

In circuit analysis, we often choose one signal as the "reference" and assign it zero phase. Then all other phases are measured relative to this reference.

| Reference Choice | Common in |
|------------------|-----------|
| Source voltage | Voltage divider analysis |
| Source current | Current divider analysis |
| Total current | Series circuit analysis |
| Total voltage | Parallel circuit analysis |

### Phasor Addition

**Phasor addition** is how we add sinusoidal signals of the same frequency. Instead of wrestling with trigonometric identities, we simply add the complex numbers!

**In rectangular form:**
\[\mathbf{V}_1 + \mathbf{V}_2 = (a_1 + a_2) + j(b_1 + b_2)\]

**Graphically:** Place phasors head-to-tail like vector addition.

**Example:** Add \(v_1(t) = 10\cos(\omega t)\) and \(v_2(t) = 10\cos(\omega t + 90°)\)

Phasors:
\[\mathbf{V}_1 = 10\angle 0° = 10 + j0\]
\[\mathbf{V}_2 = 10\angle 90° = 0 + j10\]

Sum:
\[\mathbf{V}_{total} = 10 + j10 = 14.14\angle 45°\]

Time domain result:
\[v_{total}(t) = 14.14\cos(\omega t + 45°)\]

Try doing this with trig identities—phasors are *much* easier!

#### Diagram: Phasor Addition Visualizer

<iframe src="../../sims/phasor-addition/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Phasor Addition Visualizer</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate the sum of two sinusoidal signals using phasor addition and verify the result graphically.

Visual elements:
- Left panel: Phasor diagram showing V₁, V₂, and V_total
- V₁ and V₂ shown in different colors (blue, red)
- V_total shown as resultant (green)
- Head-to-tail construction visible
- Right panel: Time-domain plot showing all three waveforms
- Verification that sum waveform matches vector sum

Interactive controls:
- Slider: V₁ magnitude (1 to 10)
- Slider: V₁ phase (-180° to 180°)
- Slider: V₂ magnitude (1 to 10)
- Slider: V₂ phase (-180° to 180°)
- Toggle: Show/hide construction lines
- Display: All three phasors in polar form

Calculations displayed:
- V₁ + V₂ in rectangular: (a₁+a₂) + j(b₁+b₂)
- Conversion to polar: |V_total|∠θ
- Time-domain expression of sum

Default parameters:
- V₁ = 10∠0°
- V₂ = 10∠90°
- V_total = 14.14∠45°

Canvas layout:
- Phasor diagram: 300 × 350 pixels
- Time-domain plot: 300 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Impedance: AC's Generalized Resistance

**Impedance (\(Z\))** is the complex ratio of voltage phasor to current phasor:

\[Z = \frac{\mathbf{V}}{\mathbf{I}}\]

Impedance plays the same role in AC circuits that resistance plays in DC circuits. In fact, Ohm's law works perfectly with impedance:

\[\mathbf{V} = \mathbf{I} \cdot Z\]

But unlike resistance (which is just a real number), impedance is complex:

\[Z = R + jX\]

Where:

- \(R\) = Resistance (real part) - dissipates power
- \(X\) = Reactance (imaginary part) - stores and returns power

**Units:** Impedance, resistance, and reactance are all measured in ohms (Ω).

| Component | Impedance | Notes |
|-----------|-----------|-------|
| Resistor | \(Z_R = R\) | Purely real |
| Capacitor | \(Z_C = \frac{1}{j\omega C} = -\frac{j}{\omega C}\) | Purely imaginary, negative |
| Inductor | \(Z_L = j\omega L\) | Purely imaginary, positive |

### Reactance: The Imaginary Part

**Reactance (\(X\))** is the imaginary component of impedance. It represents opposition to current that *doesn't* dissipate power—instead, it stores energy temporarily and returns it to the circuit.

**Inductive Reactance (\(X_L\)):**
\[X_L = \omega L = 2\pi f L\]

- Positive reactance (current lags voltage by 90°)
- Increases with frequency (inductors "resist" fast changes)
- At DC (\(f = 0\)): \(X_L = 0\) (short circuit)

**Capacitive Reactance (\(X_C\)):**
\[X_C = \frac{1}{\omega C} = \frac{1}{2\pi f C}\]

- By convention, written as negative in impedance: \(Z_C = -jX_C\)
- Current leads voltage by 90°
- Decreases with frequency (capacitors pass high frequencies more easily)
- At DC (\(f = 0\)): \(X_C \to \infty\) (open circuit)

| Component | Low Frequency Behavior | High Frequency Behavior |
|-----------|----------------------|------------------------|
| Inductor | Small X_L, acts like short | Large X_L, acts like open |
| Capacitor | Large X_C, acts like open | Small X_C, acts like short |

!!! note "Why Reactance Doesn't Dissipate Power"
    When current and voltage are 90° out of phase (as with pure reactance), energy flows into the component for half the cycle and flows back out for the other half. The average power over a complete cycle is zero. Power is only dissipated when there's a resistance component.

#### Diagram: Reactance vs Frequency

<iframe src="../../sims/reactance-frequency/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Reactance vs Frequency</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: examine

Learning Objective: Students will examine how inductive and capacitive reactance vary with frequency and identify the crossover point where they are equal.

Visual elements:
- Log-log plot of reactance vs frequency
- X_L curve (positive, increasing) in red
- X_C curve (positive magnitude, decreasing) in blue
- Crossover point where X_L = X_C marked (resonant frequency)
- Current frequency marker (vertical line)
- Display showing X_L and X_C at current frequency

Interactive controls:
- Slider: Inductance L (0.1mH to 100mH, log scale)
- Slider: Capacitance C (0.1nF to 100μF, log scale)
- Slider: Frequency f (1Hz to 1MHz, log scale)
- Toggle: Linear vs Log scale
- Display: f₀ = 1/(2π√LC) resonant frequency

Annotations:
- "X_L = ωL = 2πfL" on inductor curve
- "X_C = 1/(ωC) = 1/(2πfC)" on capacitor curve
- "Resonance: X_L = X_C" at crossover

Default parameters:
- L = 10mH
- C = 1μF
- f₀ ≈ 1592 Hz

Canvas layout:
- Plot area: 600 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Complex Impedance and the Impedance Triangle

When a circuit contains both resistance and reactance, the **complex impedance** is:

\[Z = R + jX\]

**In polar form:**

\[Z = |Z| \angle \theta\]

Where:

- Magnitude: \(|Z| = \sqrt{R^2 + X^2}\)
- Phase angle: \(\theta = \tan^{-1}(X/R)\)

The **impedance triangle** is a right triangle showing the relationship:

```
        |Z|
         /|
        / |
       /  | X (reactance)
      /   |
     /θ___|
       R (resistance)
```

**Phase angle interpretation:**

| Condition | Phase Angle | Circuit Behavior |
|-----------|-------------|------------------|
| X = 0 | θ = 0° | Purely resistive |
| X > 0 (inductive) | θ > 0° | Current lags voltage |
| X < 0 (capacitive) | θ < 0° | Current leads voltage |
| R = 0 | θ = ±90° | Purely reactive |

**Example:** Series R-L circuit with R = 30Ω and X_L = 40Ω

\[Z = 30 + j40 = 50\angle 53.13°\]

The magnitude is 50Ω, and current lags voltage by 53.13°.

#### Diagram: Impedance Triangle Explorer

<iframe src="../../sims/impedance-triangle/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Impedance Triangle Explorer</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate impedance magnitude and phase angle from resistance and reactance using the impedance triangle.

Visual elements:
- Impedance triangle with R on horizontal, X on vertical, |Z| as hypotenuse
- Phase angle θ marked with arc
- Labels showing R, X, |Z|, and θ values
- Color coding: R (blue), X (red for inductive, green for capacitive), |Z| (purple)
- Phasor diagram showing V and I relationship

Interactive controls:
- Slider: Resistance R (0 to 100Ω)
- Slider: Reactance X (-100 to +100Ω)
- Toggle: Show as R-L or R-C circuit
- Display: Z in rectangular and polar form
- Display: Phase relationship (leads/lags)

Calculations displayed:
- |Z| = √(R² + X²) with values
- θ = tan⁻¹(X/R) with values
- Power factor = cos(θ)

Visual feedback:
- Triangle updates in real-time
- Positive X shows above horizontal (inductive)
- Negative X shows below horizontal (capacitive)

Default parameters:
- R = 30Ω
- X = 40Ω (inductive)
- |Z| = 50Ω, θ = 53.13°

Canvas layout:
- Triangle/phasor area: 450 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Admittance and Susceptance

**Admittance (\(Y\))** is the reciprocal of impedance—it measures how easily current flows:

\[Y = \frac{1}{Z} = \frac{\mathbf{I}}{\mathbf{V}}\]

**Units:** Siemens (S), formerly called mhos (℧)

\[Y = G + jB\]

Where:

- \(G\) = Conductance (real part)
- \(B\) = Susceptance (imaginary part)

**Susceptance (\(B\))** is the imaginary part of admittance:

**Capacitive susceptance:** \(B_C = \omega C\) (positive)

**Inductive susceptance:** \(B_L = -\frac{1}{\omega L}\) (negative)

Note the sign flip compared to reactance!

| Quantity | Symbol | Units | Formula |
|----------|--------|-------|---------|
| Impedance | Z | Ω | R + jX |
| Admittance | Y | S | G + jB |
| Resistance | R | Ω | Re{Z} |
| Conductance | G | S | Re{Y} |
| Reactance | X | Ω | Im{Z} |
| Susceptance | B | S | Im{Y} |

**When to use admittance:**

- Parallel circuits (admittances add directly)
- High-frequency analysis
- When measuring with siemens makes more sense

**Converting between Z and Y:**

If \(Z = R + jX\), then:
\[Y = \frac{1}{R + jX} = \frac{R - jX}{R^2 + X^2}\]

So: \(G = \frac{R}{R^2 + X^2}\) and \(B = \frac{-X}{R^2 + X^2}\)

Note: \(G \neq 1/R\) unless \(X = 0\)!

## AC Resistance and Power Factor

In AC circuits, **AC resistance** (also called effective resistance) includes all power-dissipating effects, which may differ from DC resistance due to:

- **Skin effect:** Current crowds toward conductor surface at high frequencies
- **Proximity effect:** Nearby conductors affect current distribution
- **Core losses:** In inductors with magnetic cores

The **power factor** relates real power to apparent power:

\[\text{Power Factor} = \cos\theta = \frac{R}{|Z|}\]

| Power Factor | θ | Circuit Type |
|--------------|---|--------------|
| 1.0 | 0° | Purely resistive |
| 0 | ±90° | Purely reactive |
| 0.8 lagging | 36.87° | Inductive load |
| 0.8 leading | -36.87° | Capacitive load |

We'll explore power factor in depth in the next chapter on AC power analysis.

## Phasor Domain Analysis: The Method

The **phasor domain** (or frequency domain) approach transforms time-domain differential equations into algebraic equations. Here's the systematic method:

**Step 1: Transform to Phasor Domain**

- Replace time-domain sources \(v(t)\) with phasors \(\mathbf{V}\)
- Replace R, L, C with their impedances \(Z_R\), \(Z_L\), \(Z_C\)

**Step 2: Analyze Using DC Techniques**

- Apply Ohm's law: \(\mathbf{V} = \mathbf{I}Z\)
- Apply KVL around loops (with phasor voltages)
- Apply KCL at nodes (with phasor currents)
- Use voltage/current dividers
- Apply Thevenin/Norton equivalents

**Step 3: Transform Back to Time Domain**

- Convert phasor results to time-domain expressions
- \(\mathbf{V} = V_m \angle \phi \rightarrow v(t) = V_m \cos(\omega t + \phi)\)

**The magic:** Differentiation becomes multiplication by \(j\omega\), integration becomes division by \(j\omega\). All the calculus disappears!

| Time Domain | Phasor Domain |
|-------------|---------------|
| \(v(t) = V_m\cos(\omega t + \phi)\) | \(\mathbf{V} = V_m\angle\phi\) |
| \(\frac{dv}{dt}\) | \(j\omega \mathbf{V}\) |
| \(\int v \, dt\) | \(\frac{\mathbf{V}}{j\omega}\) |
| Differential equation | Algebraic equation |

### Worked Example: Series RLC Analysis

**Problem:** Find the steady-state current in a series RLC circuit with:
- \(v_s(t) = 100\cos(1000t)\) V
- R = 10Ω, L = 20mH, C = 50μF

**Solution:**

**Step 1: Calculate impedances at ω = 1000 rad/s**

\[Z_R = 10 \text{ Ω}\]
\[Z_L = j\omega L = j(1000)(0.02) = j20 \text{ Ω}\]
\[Z_C = \frac{1}{j\omega C} = \frac{1}{j(1000)(50 \times 10^{-6})} = \frac{1}{j0.05} = -j20 \text{ Ω}\]

**Step 2: Find total impedance**

\[Z_{total} = Z_R + Z_L + Z_C = 10 + j20 - j20 = 10 + j0 = 10 \text{ Ω}\]

Notice that \(Z_L\) and \(Z_C\) cancel! This is resonance.

**Step 3: Find current phasor**

\[\mathbf{V}_s = 100\angle 0°\]
\[\mathbf{I} = \frac{\mathbf{V}_s}{Z_{total}} = \frac{100\angle 0°}{10\angle 0°} = 10\angle 0° \text{ A}\]

**Step 4: Convert to time domain**

\[i(t) = 10\cos(1000t) \text{ A}\]

At resonance, the current is in phase with the voltage and limited only by the resistance!

#### Diagram: Phasor Domain Circuit Solver

<iframe src="../../sims/phasor-circuit-solver/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Phasor Domain Circuit Solver</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: solve

Learning Objective: Students will solve for current and voltage in series RLC circuits using phasor domain analysis.

Visual elements:
- Circuit schematic showing series RLC with AC source
- Impedance calculation panel showing Z_R, Z_L, Z_C, Z_total
- Phasor diagram showing V_s, V_R, V_L, V_C, I
- KVL verification: V_s = V_R + V_L + V_C shown graphically
- Time-domain waveform showing voltage and current

Step-through mode:
- Step 1: "Transform source to phasor"
- Step 2: "Calculate component impedances"
- Step 3: "Sum impedances for Z_total"
- Step 4: "Calculate current phasor I = V/Z"
- Step 5: "Calculate component voltage phasors"
- Step 6: "Transform back to time domain"

Interactive controls:
- Slider: Frequency f or ω
- Slider: R (1 to 100Ω)
- Slider: L (1mH to 100mH)
- Slider: C (0.1μF to 100μF)
- Source voltage amplitude (fixed or adjustable)
- Button: Step through / Auto-solve

Displays:
- Z_total in rectangular and polar form
- I in polar form and time domain
- V_R, V_L, V_C phasors
- Resonant frequency indicator

Default parameters:
- f = 1000/(2π) ≈ 159 Hz (ω = 1000 rad/s)
- R = 10Ω, L = 20mH, C = 50μF
- At resonance, X_L = X_C = 20Ω

Canvas layout:
- Circuit diagram: 250 × 400 pixels (left)
- Phasor diagram: 350 × 400 pixels (right)
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Resonance in AC Circuits

**Resonance** occurs when the inductive and capacitive reactances are equal, causing them to cancel. The resonant frequency is:

\[f_0 = \frac{1}{2\pi\sqrt{LC}} \text{ Hz}\]

Or in angular frequency:

\[\omega_0 = \frac{1}{\sqrt{LC}} \text{ rad/s}\]

At resonance, the circuit behavior depends on whether components are in series or parallel.

### Series Resonance

In a **series resonant circuit**:

- \(X_L = X_C\), so \(Z = R\) (minimum impedance)
- Current is maximum: \(I = V_s/R\)
- Current is in phase with voltage
- Voltage across L and C can exceed source voltage!

**Voltage magnification:**
\[Q = \frac{V_L}{V_s} = \frac{V_C}{V_s} = \frac{X_L}{R} = \frac{\omega_0 L}{R}\]

At resonance with Q = 100, the voltage across L or C is 100 times the source voltage! This is useful for selecting frequencies but requires care to avoid component damage.

### Parallel Resonance

In a **parallel resonant circuit** (also called a "tank" circuit):

- Admittances cancel, so impedance is maximum
- Current from source is minimum
- Large circulating current flows between L and C
- Acts as a high-impedance "trap" at the resonant frequency

| Property | Series Resonance | Parallel Resonance |
|----------|------------------|-------------------|
| Impedance at f₀ | Minimum (= R) | Maximum |
| Current at f₀ | Maximum | Minimum |
| Use | Bandpass (select f₀) | Bandstop (reject f₀) |
| Q effect | Voltage magnification | Current magnification |

#### Diagram: Series vs Parallel Resonance

<iframe src="../../sims/resonance-comparison/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Series vs Parallel Resonance</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: compare

Learning Objective: Students will compare series and parallel resonance by observing impedance and current behavior as frequency sweeps through resonance.

Visual elements:
- Split display: Series RLC (left) and Parallel RLC (right)
- Top plots: |Z| vs frequency for each configuration
- Bottom plots: |I| vs frequency for each configuration
- Resonant frequency marked on all plots
- Current frequency marker (sweepable)
- Energy flow animations showing circulating current at resonance

Interactive controls:
- Slider: Frequency sweep (0.1× to 10× f₀)
- Slider: Q factor (affects bandwidth)
- Button: Auto-sweep animation
- Toggle: Show series only / parallel only / both
- Display: Current impedance and current values

Annotations:
- Series at f₀: "Z minimum, I maximum"
- Parallel at f₀: "Z maximum, I minimum"
- "Same resonant frequency!"

Default parameters:
- L = 10mH, C = 1μF
- f₀ ≈ 1592 Hz
- Q = 10 (for visible bandwidth)

Canvas layout:
- Dual configuration display: 600 × 400 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Bandwidth, Selectivity, Passband, and Stopband

**Bandwidth (BW)** is the range of frequencies over which a circuit or filter passes signals effectively. For a resonant circuit:

\[BW = \frac{f_0}{Q}\]

**Selectivity** describes how well a circuit discriminates between desired and undesired frequencies. Higher Q means better selectivity (narrower bandwidth).

| Term | Definition |
|------|------------|
| Passband | Frequency range where signals pass through with little attenuation |
| Stopband | Frequency range where signals are significantly attenuated |
| Cutoff frequency | Boundary between passband and stopband (usually -3dB point) |
| Transition band | Region between passband and stopband |

**The -3dB points:**

The bandwidth is typically measured between the frequencies where the response drops to 70.7% of its peak value (half power, or -3dB):

\[f_1 = f_0\sqrt{1 + \frac{1}{4Q^2}} - \frac{f_0}{2Q} \approx f_0 - \frac{BW}{2}\]
\[f_2 = f_0\sqrt{1 + \frac{1}{4Q^2}} + \frac{f_0}{2Q} \approx f_0 + \frac{BW}{2}\]

**Quality factor and bandwidth relationship:**

| Q | Bandwidth (% of f₀) | Selectivity |
|---|---------------------|-------------|
| 1 | 100% | Poor |
| 10 | 10% | Moderate |
| 100 | 1% | Good |
| 1000 | 0.1% | Excellent |

#### Diagram: Bandwidth and Selectivity

<iframe src="../../sims/bandwidth-selectivity/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Bandwidth and Selectivity</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how Q factor affects bandwidth and selectivity by observing frequency response curves at different Q values.

Visual elements:
- Frequency response plot showing |H(f)| vs frequency
- Multiple curves for different Q values displayed simultaneously
- -3dB line (0.707) marked horizontally
- Bandwidth markers showing f₁ and f₂ for selected curve
- Passband region shaded
- Stopband regions indicated

Interactive controls:
- Slider: Q factor (1 to 100)
- Slider: Resonant frequency f₀
- Toggle: Show multiple Q curves (5, 10, 20, 50) simultaneously
- Toggle: Linear vs dB scale
- Display: Calculated bandwidth BW = f₀/Q

Annotations:
- "Higher Q = narrower bandwidth"
- "Better selectivity = sharper peak"
- Passband and stopband labels

Default parameters:
- Q = 10
- f₀ = 1000 Hz
- BW = 100 Hz

Canvas layout:
- Plot area: 600 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Component Impedances Summary

Here's a comprehensive reference for working with component impedances:

| Component | Time Domain | Impedance | Admittance |
|-----------|-------------|-----------|------------|
| Resistor | \(v = iR\) | \(Z = R\) | \(Y = G = 1/R\) |
| Capacitor | \(i = C\frac{dv}{dt}\) | \(Z = \frac{1}{j\omega C}\) | \(Y = j\omega C\) |
| Inductor | \(v = L\frac{di}{dt}\) | \(Z = j\omega L\) | \(Y = \frac{1}{j\omega L}\) |

**Series combinations:** Add impedances
\[Z_{series} = Z_1 + Z_2 + Z_3 + ...\]

**Parallel combinations:** Add admittances (or use product/sum)
\[Y_{parallel} = Y_1 + Y_2 + Y_3 + ...\]
\[Z_{parallel} = \frac{Z_1 Z_2}{Z_1 + Z_2}\] (for two impedances)

**Voltage divider (series):**
\[\mathbf{V}_1 = \mathbf{V}_s \cdot \frac{Z_1}{Z_1 + Z_2}\]

**Current divider (parallel):**
\[\mathbf{I}_1 = \mathbf{I}_s \cdot \frac{Z_2}{Z_1 + Z_2}\]

## Self-Check Questions

??? question "1. A sinusoidal voltage v(t) = 20cos(500t + 30°) V is applied to a series RL circuit with R = 40Ω and L = 60mH. Find the impedance, current phasor, and time-domain current expression."
    **Find impedance:**

    \[Z_R = 40 \text{ Ω}\]
    \[Z_L = j\omega L = j(500)(0.06) = j30 \text{ Ω}\]
    \[Z_{total} = 40 + j30 = 50\angle 36.87° \text{ Ω}\]

    **Find current phasor:**

    \[\mathbf{V} = 20\angle 30°\]
    \[\mathbf{I} = \frac{\mathbf{V}}{Z} = \frac{20\angle 30°}{50\angle 36.87°} = 0.4\angle (30° - 36.87°) = 0.4\angle -6.87° \text{ A}\]

    **Time-domain expression:**

    \[i(t) = 0.4\cos(500t - 6.87°) \text{ A}\]

    The current lags the voltage by 36.87° because the circuit is inductive.

??? question "2. At what frequency will a 100mH inductor have the same reactance magnitude as a 10μF capacitor?"
    Set \(X_L = X_C\):

    \[\omega L = \frac{1}{\omega C}\]
    \[\omega^2 = \frac{1}{LC} = \frac{1}{(0.1)(10 \times 10^{-6})} = 10^6\]
    \[\omega = 1000 \text{ rad/s}\]

    Converting to Hz:
    \[f = \frac{\omega}{2\pi} = \frac{1000}{2\pi} = 159.2 \text{ Hz}\]

    At this frequency, both have reactance:
    \[X_L = X_C = \omega L = (1000)(0.1) = 100 \text{ Ω}\]

    This is the resonant frequency of the L-C combination.

??? question "3. A series RLC circuit has R = 20Ω, and at resonance the Q factor is 50. If the resonant frequency is 10 kHz, what are L and C?"
    **From Q factor:**

    \[Q = \frac{\omega_0 L}{R} = \frac{X_L}{R}\]
    \[50 = \frac{X_L}{20}\]
    \[X_L = 1000 \text{ Ω}\]

    **Find L:**

    \[\omega_0 = 2\pi f_0 = 2\pi(10000) = 62832 \text{ rad/s}\]
    \[X_L = \omega_0 L\]
    \[L = \frac{X_L}{\omega_0} = \frac{1000}{62832} = 15.92 \text{ mH}\]

    **Find C (at resonance X_C = X_L):**

    \[X_C = \frac{1}{\omega_0 C} = 1000 \text{ Ω}\]
    \[C = \frac{1}{\omega_0 X_C} = \frac{1}{62832 \times 1000} = 15.92 \text{ nF}\]

    **Verify:** \(\omega_0 = 1/\sqrt{LC} = 1/\sqrt{(15.92 \times 10^{-3})(15.92 \times 10^{-9})} = 62832\) rad/s ✓

??? question "4. What is the bandwidth of the circuit in Question 3, and what are the lower and upper cutoff frequencies?"
    **Bandwidth:**

    \[BW = \frac{f_0}{Q} = \frac{10000}{50} = 200 \text{ Hz}\]

    **Cutoff frequencies (approximately):**

    \[f_1 \approx f_0 - \frac{BW}{2} = 10000 - 100 = 9900 \text{ Hz}\]
    \[f_2 \approx f_0 + \frac{BW}{2} = 10000 + 100 = 10100 \text{ Hz}\]

    The passband extends from 9900 Hz to 10100 Hz (just 200 Hz wide). This high-Q circuit is very selective, passing only frequencies very close to 10 kHz.

## Summary

This chapter equipped you with the essential tools for AC circuit analysis:

1. **Phasors freeze rotating signals** - Complex numbers represent sinusoid amplitude and phase, allowing algebraic analysis

2. **Phasor diagrams reveal phase relationships** - Visualizing multiple phasors shows leading/lagging relationships at a glance

3. **Impedance extends Ohm's law to AC** - Z = R + jX includes both dissipative (R) and reactive (X) components

4. **Reactance is frequency-dependent** - Inductors impede high frequencies; capacitors impede low frequencies

5. **The impedance triangle relates R, X, and Z** - Magnitude, angle, and power factor are geometrically linked

6. **Admittance simplifies parallel circuits** - Y = G + jB is the reciprocal of impedance

7. **Resonance cancels reactance** - At ω₀ = 1/√(LC), inductive and capacitive effects cancel

8. **Series resonance minimizes impedance** - Used for bandpass filters that select specific frequencies

9. **Parallel resonance maximizes impedance** - Used for bandstop filters or "traps"

10. **Q determines selectivity** - Higher Q means narrower bandwidth and sharper frequency selection

With phasors and impedance in your toolkit, you can now analyze any AC circuit using the same familiar techniques you learned for DC. Kirchhoff's laws, voltage dividers, and Thevenin/Norton equivalents all work perfectly—just with complex numbers. The next chapter will show you how to analyze power in AC circuits, where the phase relationships you've learned become crucial for understanding real, reactive, and apparent power.
