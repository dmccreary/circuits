---
title: Passive Components - Resistors, Capacitors, and Inductors
description: Master energy storage elements and signal fundamentals for dynamic circuit analysis
generated_by: claude skill chapter-content-generator
date: 2026-01-30
version: 0.03
---

# Passive Components: Resistors, Capacitors, and Inductors

## Summary

This chapter provides an in-depth examination of passive electronic components beyond basic resistors. Students will learn how capacitors store energy in electric fields and how inductors store energy in magnetic fields. The chapter covers series and parallel combinations of capacitors and inductors, mutual inductance between inductors, and the practical considerations of real versus ideal components. Understanding these energy storage elements is essential for analyzing dynamic circuits and filters in subsequent chapters.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Parallel Plate Capacitor
2. Capacitor Energy Storage
3. Capacitors in Series
4. Capacitors in Parallel
5. Inductor Energy Storage
6. Inductors in Series
7. Inductors in Parallel
8. Mutual Inductance
9. Coupling Coefficient
10. Parasitic Capacitance
11. Parasitic Inductance
12. Real vs Ideal Components
13. Amplitude
14. Period
15. Frequency
16. Angular Frequency
17. Phase Angle
18. Phase Shift
19. Peak Value
20. Peak-to-Peak Value
21. RMS Value
22. Average Value
23. Human Hearing Range
24. Audio Frequency Range
25. Decibel

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Electric Charge and Basic Circuit Quantities](../01-electric-charge-basic-quantities/index.md)
- [Chapter 2: Ohm's Law and Basic Circuit Configurations](../02-ohms-law-basic-configurations/index.md)
- [Chapter 4: DC Circuit Analysis Methods](../04-dc-circuit-analysis/index.md)

---

## Introduction: The Dynamic Duo (Plus Their Resistor Friend)

Welcome to the chapter where circuits get interesting. Up until now, we've been dealing with resistors—components that do one thing: resist. They're the bouncers of the circuit world, limiting current and dissipating energy as heat. Useful, but let's be honest: a little one-dimensional.

Now we meet the **capacitor** and the **inductor**—components that *store* energy rather than waste it. These are the circuit equivalents of batteries, except they charge and discharge in fascinating ways that give circuits memory, timing, and the ability to filter signals. If resistors are the bouncers, capacitors and inductors are the DJs who shape the music.

This chapter also introduces **signal fundamentals**: amplitude, frequency, phase, and the mysterious decibel. These concepts form the vocabulary you'll need to discuss audio, radio, and any signal that changes over time.

Here's why this matters: every filter, every amplifier, every audio circuit you'll ever design relies on the interplay between resistance, capacitance, and inductance. Master these components, and you've got the building blocks for everything from your phone's speaker crossover to the power supply in your laptop.

Let's store some energy. (Unlike your coffee, these components actually return it.)

## The Parallel Plate Capacitor: Where the Magic Happens

We introduced capacitors briefly in Chapter 4. Now let's understand them properly.

A **parallel plate capacitor** is the simplest capacitor design: two conducting plates separated by an insulating material (the dielectric). Apply a voltage, and charges accumulate on the plates—positive on one side, negative on the other. The electric field between the plates stores energy.

#### Capacitance of a Parallel Plate Capacitor

$C = \varepsilon_0 \varepsilon_r \frac{A}{d}$

where:

- $C$ is the capacitance in farads (F)
- $\varepsilon_0$ is the permittivity of free space ($8.854 \times 10^{-12}$ F/m)
- $\varepsilon_r$ is the relative permittivity (dielectric constant) of the material
- $A$ is the plate area in square meters
- $d$ is the separation between plates in meters

This formula reveals three ways to increase capacitance:

- **Increase plate area**: More surface = more charge storage
- **Decrease plate separation**: Closer plates = stronger field
- **Use a better dielectric**: Higher $\varepsilon_r$ = more energy per volt

| Dielectric Material | Relative Permittivity ($\varepsilon_r$) | Typical Use |
|---------------------|----------------------------------------|-------------|
| Air/Vacuum | 1.0 | Variable capacitors |
| Paper | 2-4 | Older capacitors |
| Polyester film | 3.2 | General purpose |
| Ceramic (Class 1) | 10-100 | Precision circuits |
| Ceramic (Class 2) | 1000-20000 | Bypass, coupling |
| Electrolytic | ~10 | High capacitance |

#### Diagram: Parallel Plate Capacitor Structure

<iframe src="../../sims/parallel-plate-capacitor/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Parallel Plate Capacitor MicroSim</summary>
Type: microsim

Purpose: Visualize how plate area, separation, and dielectric affect capacitance

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how changing physical parameters affects capacitance value and understand the role of the dielectric material.

Instructional Rationale: Interactive manipulation of physical parameters with real-time capacitance calculation builds intuition for the C = εA/d relationship.

Canvas layout:
- Left (350px): Visual representation of parallel plates with dielectric
- Right (250px): Parameter controls and calculations

Visual elements:
- Two parallel plates shown in perspective
- Electric field lines between plates
- Dielectric material (colored region) between plates
- Charge symbols (+ and -) on plate surfaces
- Dimension labels for area and separation

Interactive controls:
- Slider: Plate area (1 cm² to 100 cm²)
- Slider: Plate separation (0.1 mm to 10 mm)
- Dropdown: Dielectric material (air, paper, ceramic, etc.)
- Display: Calculated capacitance
- Display: Electric field strength
- Display: Stored energy at given voltage

Default parameters:
- Area = 10 cm²
- Separation = 1 mm
- Dielectric = Air (εr = 1)
- Applied voltage = 10V

Behavior:
- Plate visualization scales with area
- Separation shown visually
- Field line density changes with charge
- Capacitance updates in real-time
- Energy calculation: E = ½CV²

Implementation: p5.js with 3D perspective drawing
</details>

## Capacitor Energy Storage

Unlike resistors that dissipate energy as heat, capacitors **store** energy in their electric field. This energy can be recovered—which is why capacitors are used in camera flashes, defibrillators, and power supply filtering.

#### Capacitor Energy

$E = \frac{1}{2}CV^2 = \frac{1}{2}\frac{Q^2}{C} = \frac{1}{2}QV$

where:

- $E$ is stored energy in joules (J)
- $C$ is capacitance in farads (F)
- $V$ is voltage across the capacitor in volts (V)
- $Q$ is stored charge in coulombs (C)

Notice the voltage-squared relationship: double the voltage, quadruple the energy. This is why high-voltage capacitors store serious energy and demand respect in the lab.

!!! warning "Capacitor Safety"
    Large capacitors can hold their charge for hours or even days after power is removed. Always discharge capacitors before working on circuits. A capacitor charged to 400V doesn't care that the power supply is off—it's still ready to ruin your day (or worse).

### The Capacitor's Time-Domain Behavior

The fundamental relationship between current and voltage in a capacitor:

#### Capacitor I-V Relationship

$I = C \frac{dV}{dt}$

where:

- $I$ is current through the capacitor in amperes (A)
- $C$ is capacitance in farads (F)
- $\frac{dV}{dt}$ is the rate of voltage change in volts per second (V/s)

This equation says: **current flows through a capacitor only when voltage is changing**. Constant voltage? Zero current. This is why capacitors block DC but pass AC—the voltage must be changing for current to flow.

Key implications:

- Sudden voltage changes require infinite current (impossible)
- Therefore, **capacitor voltage cannot change instantaneously**
- Capacitors oppose changes in voltage
- At DC steady state, capacitors act as open circuits

#### Diagram: Capacitor Charging Visualization

<iframe src="../../sims/capacitor-charging/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Capacitor Charging Animation MicroSim</summary>
Type: microsim

Purpose: Visualize charge accumulation and energy storage during capacitor charging

Bloom Level: Understand (L2)
Bloom Verb: describe

Learning Objective: Students will describe how charge accumulates on capacitor plates during charging and explain the relationship between voltage, charge, and stored energy.

Instructional Rationale: Animated charge flow and accumulation makes the abstract concept of energy storage concrete and visual.

Canvas layout:
- Main area (400px): Capacitor with animated charge flow
- Right panel (200px): Real-time graphs of V, I, E

Visual elements:
- Capacitor plates with accumulating + and - charges
- Wire connecting to voltage source
- Animated charge carriers (electrons) flowing
- Growing electric field lines between plates
- Three stacked graphs: voltage, current, energy vs time

Interactive controls:
- Slider: Applied voltage (1V to 20V)
- Slider: Capacitance (1µF to 1000µF)
- Slider: Series resistance (100Ω to 10kΩ)
- Button: "Charge" starts charging animation
- Button: "Discharge" reverses process
- Button: "Reset" clears charge

Default parameters:
- V = 10V
- C = 100µF
- R = 1kΩ
- τ = RC = 100ms

Behavior:
- Charges animate flowing onto plates
- Plate charge symbols increase over time
- Voltage rises exponentially toward applied voltage
- Current starts high, decays exponentially
- Energy grows as ½CV²
- Time constant τ = RC shown on graphs

Implementation: p5.js with particle animation and real-time graphing
</details>

## Capacitors in Series and Parallel

Just like resistors, capacitors can be combined. But here's the twist: **the formulas are backwards** compared to resistors.

### Capacitors in Series

When capacitors connect in series, the total capacitance is *less* than any individual capacitor.

#### Capacitors in Series Formula

$\frac{1}{C_{total}} = \frac{1}{C_1} + \frac{1}{C_2} + \frac{1}{C_3} + ...$

where:

- $C_{total}$ is the equivalent total capacitance
- $C_1, C_2, C_3, ...$ are individual capacitor values

For two capacitors, the "product over sum" formula works:

$C_{total} = \frac{C_1 \cdot C_2}{C_1 + C_2}$

Why does series combination reduce capacitance? Think of it as increasing the effective plate separation—the charges must spread across multiple gaps.

### Capacitors in Parallel

When capacitors connect in parallel, capacitances add directly:

#### Capacitors in Parallel Formula

$C_{total} = C_1 + C_2 + C_3 + ...$

where:

- $C_{total}$ is the equivalent total capacitance
- $C_1, C_2, C_3, ...$ are individual capacitor values

This makes intuitive sense: parallel capacitors effectively increase the plate area.

| Configuration | Formula | Total C | Voltage Handling |
|---------------|---------|---------|------------------|
| Series | $1/C_T = 1/C_1 + 1/C_2$ | Decreases | Increases |
| Parallel | $C_T = C_1 + C_2$ | Increases | Same as lowest |

!!! tip "Memory Trick"
    Capacitor formulas are the **opposite** of resistor formulas:

    - Resistors in series: add directly
    - Capacitors in series: add reciprocally

    - Resistors in parallel: add reciprocally
    - Capacitors in parallel: add directly

#### Diagram: Series and Parallel Capacitors

<iframe src="../../sims/capacitor-combinations/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Capacitor Combinations MicroSim</summary>
Type: microsim

Purpose: Compare series and parallel capacitor combinations with interactive calculation

Bloom Level: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate equivalent capacitance for series and parallel combinations and predict how total capacitance changes when adding capacitors.

Instructional Rationale: Side-by-side comparison with the same capacitor values in series vs parallel makes the "opposite of resistors" relationship clear.

Canvas layout:
- Top half: Series configuration with calculation
- Bottom half: Parallel configuration with calculation
- Side panel: Comparison summary

Visual elements:
- Schematic symbols for capacitors
- Value labels on each capacitor
- Equivalent single capacitor representation
- Calculation steps shown

Interactive controls:
- Slider: C1 value (1µF to 100µF)
- Slider: C2 value (1µF to 100µF)
- Slider: C3 value (1µF to 100µF)
- Toggle: Show/hide C3 (two vs three capacitors)
- Display: Series equivalent
- Display: Parallel equivalent

Default parameters:
- C1 = 10µF, C2 = 20µF, C3 = 30µF

Behavior:
- Real-time calculation updates
- Visual comparison of equivalent size
- Shows step-by-step calculation
- Highlights that series < smallest, parallel = sum

Implementation: p5.js with dual circuit display
</details>

## Inductor Energy Storage

While capacitors store energy in electric fields, **inductors** store energy in magnetic fields. An inductor is typically a coil of wire—current flowing through creates a magnetic field that stores energy.

#### Inductor Energy

$E = \frac{1}{2}LI^2$

where:

- $E$ is stored energy in joules (J)
- $L$ is inductance in henrys (H)
- $I$ is current through the inductor in amperes (A)

Notice the current-squared relationship (parallel to capacitors with voltage-squared). More current means more magnetic field means more stored energy.

### The Inductor's Time-Domain Behavior

The fundamental relationship between voltage and current in an inductor:

#### Inductor V-I Relationship

$V = L \frac{dI}{dt}$

where:

- $V$ is voltage across the inductor in volts (V)
- $L$ is inductance in henrys (H)
- $\frac{dI}{dt}$ is the rate of current change in amperes per second (A/s)

This equation says: **voltage appears across an inductor only when current is changing**. Constant current? Zero voltage. This is why inductors pass DC freely but impede AC—only changing currents create opposing voltages.

Key implications:

- Sudden current changes require infinite voltage (impossible)
- Therefore, **inductor current cannot change instantaneously**
- Inductors oppose changes in current
- At DC steady state, inductors act as short circuits (just wire resistance)

| Property | Capacitor | Inductor |
|----------|-----------|----------|
| Stores energy in | Electric field | Magnetic field |
| Energy formula | $\frac{1}{2}CV^2$ | $\frac{1}{2}LI^2$ |
| Opposes changes in | Voltage | Current |
| At DC steady state | Open circuit | Short circuit |
| I-V relationship | $I = C \frac{dV}{dt}$ | $V = L \frac{dI}{dt}$ |

## Inductors in Series and Parallel

Inductors combine like resistors (thankfully—we needed something to be normal):

### Inductors in Series

#### Inductors in Series Formula

$L_{total} = L_1 + L_2 + L_3 + ...$

where:

- $L_{total}$ is the equivalent total inductance
- $L_1, L_2, L_3, ...$ are individual inductor values

Series inductors add directly because the magnetic fields add.

### Inductors in Parallel

#### Inductors in Parallel Formula

$\frac{1}{L_{total}} = \frac{1}{L_1} + \frac{1}{L_2} + \frac{1}{L_3} + ...$

where:

- $L_{total}$ is the equivalent total inductance
- $L_1, L_2, L_3, ...$ are individual inductor values

For two inductors in parallel:

$L_{total} = \frac{L_1 \cdot L_2}{L_1 + L_2}$

!!! note "Component Combination Summary"
    - **Resistors**: Series adds, parallel uses reciprocals
    - **Inductors**: Same as resistors
    - **Capacitors**: Opposite of resistors

## Mutual Inductance: When Coils Talk to Each Other

When two inductors are placed near each other, their magnetic fields can interact. The magnetic field from one coil can induce voltage in the other—this is **mutual inductance**, the principle behind transformers.

#### Mutual Inductance

$V_2 = M \frac{dI_1}{dt}$

where:

- $V_2$ is induced voltage in coil 2 (volts)
- $M$ is the mutual inductance between coils (henrys)
- $\frac{dI_1}{dt}$ is the rate of current change in coil 1 (A/s)

The mutual inductance $M$ depends on how much magnetic flux from coil 1 actually links with coil 2.

### Coupling Coefficient

The **coupling coefficient** ($k$) describes how well two inductors are magnetically coupled:

#### Coupling Coefficient

$M = k\sqrt{L_1 \cdot L_2}$

where:

- $M$ is mutual inductance in henrys (H)
- $k$ is coupling coefficient (0 ≤ k ≤ 1)
- $L_1, L_2$ are the self-inductances of each coil (H)

| Coupling Coefficient | Description | Typical Application |
|---------------------|-------------|---------------------|
| k ≈ 0 | No coupling | Separated inductors |
| k ≈ 0.01-0.1 | Loose coupling | Some wireless power |
| k ≈ 0.3-0.7 | Medium coupling | Air-core transformers |
| k ≈ 0.95-0.99 | Tight coupling | Iron-core transformers |
| k = 1 | Perfect coupling | Ideal (theoretical only) |

#### Diagram: Mutual Inductance Visualization

<iframe src="../../sims/mutual-inductance/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Mutual Inductance MicroSim</summary>
Type: microsim

Purpose: Visualize magnetic field coupling between two inductors

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how changing current in one coil induces voltage in a nearby coil through magnetic coupling.

Instructional Rationale: Animated magnetic field lines linking two coils makes the abstract concept of mutual inductance visible.

Canvas layout:
- Main area (450px): Two coils with animated magnetic field
- Side panel (150px): Voltage and current displays

Visual elements:
- Two coils shown in cross-section
- Animated magnetic field lines
- Field lines that link both coils highlighted differently
- Current direction arrows
- Induced voltage indicator on second coil

Interactive controls:
- Slider: Current in coil 1 (0 to 1A, with time variation)
- Slider: Coil separation (affects coupling)
- Slider: Coil alignment (affects coupling)
- Toggle: Iron core vs air core
- Display: Coupling coefficient k
- Display: Mutual inductance M
- Display: Induced voltage V2

Default parameters:
- L1 = L2 = 10mH
- Separation: medium
- Air core initially

Behavior:
- Changing I1 creates animated field line changes
- V2 spikes when I1 changes rapidly
- Coupling coefficient updates with geometry
- Iron core dramatically increases coupling

Implementation: p5.js with animated field line visualization
</details>

## Real vs. Ideal Components

So far we've treated components as ideal: perfect capacitors, perfect inductors, lossless resistors. Reality is messier.

### Parasitic Elements

**Parasitic capacitance** and **parasitic inductance** are unwanted capacitance and inductance that appear in real components due to their physical construction.

| Component | Main Function | Parasitic Elements |
|-----------|---------------|-------------------|
| Resistor | Resistance | Series inductance, parallel capacitance |
| Capacitor | Capacitance | Series inductance (ESL), series resistance (ESR) |
| Inductor | Inductance | Parallel capacitance, series resistance |
| Wire | Connection | Inductance (~1 nH/mm), capacitance to nearby conductors |

**Parasitic inductance** matters at high frequencies. Every wire has inductance—at MHz frequencies, a few centimeters of wire can have significant inductive reactance. This is why high-frequency circuits use short, direct connections.

**Parasitic capacitance** also matters at high frequencies. Conductors near each other form unintended capacitors. A wire over a ground plane has capacitance to ground.

### Real Capacitor Model

A real capacitor isn't just a capacitance—it has:

- **ESR (Equivalent Series Resistance)**: Energy lost as heat during charging/discharging
- **ESL (Equivalent Series Inductance)**: Inductance of leads and internal structure
- **Leakage resistance**: Imperfect insulation allows tiny DC current

#### Diagram: Real vs Ideal Capacitor

<iframe src="../../sims/real-capacitor-model/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Real Capacitor Model MicroSim</summary>
Type: microsim

Purpose: Show how ESR and ESL affect capacitor behavior at different frequencies

Bloom Level: Analyze (L4)
Bloom Verb: compare

Learning Objective: Students will compare ideal and real capacitor behavior, identifying the frequency ranges where parasitic elements dominate.

Canvas layout:
- Left (300px): Ideal vs real equivalent circuit
- Right (300px): Impedance vs frequency plot

Visual elements:
- Ideal capacitor: single C symbol
- Real capacitor: C with series ESR and ESL
- Bode-style impedance magnitude plot
- Frequency markers for different regions

Interactive controls:
- Slider: Capacitance value
- Slider: ESR value (1mΩ to 1Ω)
- Slider: ESL value (1nH to 100nH)
- Display: Self-resonant frequency
- Display: Impedance at selected frequency

Default parameters:
- C = 10µF
- ESR = 50mΩ
- ESL = 10nH

Behavior:
- Impedance plot shows V-shape (capacitive, minimum at SRF, then inductive)
- Self-resonant frequency calculated: f = 1/(2π√(LC))
- ESR sets minimum impedance at resonance
- Above SRF, capacitor acts like inductor!

Implementation: p5.js with frequency response plotting
</details>

### Real Inductor Model

Real inductors have:

- **DCR (DC Resistance)**: Resistance of the wire
- **Parallel capacitance**: Between windings
- **Core losses**: Energy lost in magnetic core material

At the **self-resonant frequency**, the parasitic capacitance resonates with the inductance, and the inductor stops acting like an inductor!

!!! tip "Component Selection"
    When choosing components:

    - For low frequencies: Almost any component works
    - For high frequencies: Check the self-resonant frequency (SRF)
    - For power applications: Check ESR (affects efficiency and heating)
    - For precision: Check tolerance and temperature coefficient

## Signal Fundamentals: The Language of Waveforms

Now we shift to describing signals—voltages and currents that change over time. Understanding these parameters is essential for audio and AC circuit work.

### Amplitude

The **amplitude** of a signal is its maximum excursion from zero (or from its average value). For a sinusoid:

#### Amplitude Definition

$v(t) = A \sin(\omega t + \phi)$

where:

- $A$ is the amplitude (peak value)
- $\omega$ is angular frequency
- $\phi$ is phase angle
- $t$ is time

### Period and Frequency

For a periodic signal that repeats:

#### Period

$T$ = time for one complete cycle (seconds)

#### Frequency

$f = \frac{1}{T}$

where:

- $f$ is frequency in hertz (Hz)
- $T$ is period in seconds (s)

Frequency tells you how many complete cycles occur per second. A 1 kHz signal completes 1000 cycles every second.

#### Angular Frequency

$\omega = 2\pi f = \frac{2\pi}{T}$

where:

- $\omega$ is angular frequency in radians per second (rad/s)
- $f$ is frequency in hertz (Hz)
- $T$ is period in seconds (s)

Angular frequency ($\omega$) is convenient for mathematics because it relates directly to the argument of sine and cosine functions.

| Parameter | Symbol | Unit | Relationship |
|-----------|--------|------|--------------|
| Period | $T$ | seconds (s) | - |
| Frequency | $f$ | hertz (Hz) | $f = 1/T$ |
| Angular frequency | $\omega$ | rad/s | $\omega = 2\pi f$ |

### Phase Angle and Phase Shift

The **phase angle** ($\phi$) tells you where in its cycle a signal starts at $t = 0$.

#### Phase Relationship

$v(t) = A \sin(\omega t + \phi)$

where:

- $\phi$ is phase angle in radians (or degrees)
- Positive $\phi$ means the signal is "ahead" (shifted left in time)
- Negative $\phi$ means the signal is "behind" (shifted right in time)

**Phase shift** describes the phase difference between two signals:

$\Delta\phi = \phi_2 - \phi_1$

In AC circuits, the voltage and current often have different phases due to reactive components. This phase relationship is crucial for power calculations.

#### Diagram: Signal Parameters Visualization

<iframe src="../../sims/signal-parameters/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Signal Parameters Interactive MicroSim</summary>
Type: microsim

Purpose: Visualize amplitude, frequency, period, and phase on a sinusoidal waveform

Bloom Level: Remember (L1)
Bloom Verb: identify

Learning Objective: Students will identify amplitude, period, frequency, and phase angle on a sinusoidal waveform display.

Instructional Rationale: Interactive manipulation of each parameter with immediate visual feedback builds familiarity with signal terminology.

Canvas layout:
- Main area (500px): Waveform display with labeled measurements
- Bottom (100px): Parameter controls

Visual elements:
- Sinusoidal waveform
- Amplitude marked with vertical arrows
- Period marked with horizontal bracket
- Phase shown by position relative to reference
- Reference sinusoid (dotted) for phase comparison
- Grid with time and voltage markings

Interactive controls:
- Slider: Amplitude (0.1 to 10V)
- Slider: Frequency (1Hz to 1000Hz, log scale)
- Slider: Phase angle (-180° to +180°)
- Checkbox: Show reference signal (zero phase)
- Display: Period (calculated)
- Display: Angular frequency (calculated)

Default parameters:
- Amplitude = 5V
- Frequency = 100Hz
- Phase = 0°

Behavior:
- Waveform updates in real-time
- Measurement labels update automatically
- Reference signal enables phase comparison
- Zooms to show 2-3 complete cycles regardless of frequency

Implementation: p5.js with annotated waveform display
</details>

### Peak, Peak-to-Peak, and Average Values

Different applications need different ways to describe signal magnitude:

#### Peak Value

$V_{peak} = A$ (maximum excursion from zero)

#### Peak-to-Peak Value

$V_{p-p} = 2A$ (total excursion from minimum to maximum)

#### Average Value

For a sinusoid:

$V_{avg} = \frac{1}{T}\int_0^T v(t) \, dt$

For a pure sinusoid over a complete cycle: $V_{avg} = 0$ (positive and negative halves cancel).

For a half-wave rectified sinusoid: $V_{avg} = \frac{V_{peak}}{\pi} \approx 0.318 \cdot V_{peak}$

For a full-wave rectified sinusoid: $V_{avg} = \frac{2V_{peak}}{\pi} \approx 0.637 \cdot V_{peak}$

### RMS Value: The Most Useful Measurement

The **RMS (Root Mean Square)** value is the most important AC measurement because it relates directly to power.

#### RMS Value

$V_{RMS} = \sqrt{\frac{1}{T}\int_0^T v^2(t) \, dt}$

For a sinusoid:

$V_{RMS} = \frac{V_{peak}}{\sqrt{2}} \approx 0.707 \cdot V_{peak}$

where:

- $V_{RMS}$ is the RMS voltage
- $V_{peak}$ is the peak (amplitude) voltage

Why RMS? Because an AC voltage with $V_{RMS}$ delivers the same power to a resistor as a DC voltage of the same value. When someone says "120V AC," they mean 120V RMS. The peak voltage is actually $120 \times \sqrt{2} \approx 170V$.

| Measurement | Formula (for sinusoid) | Relation to Peak |
|-------------|------------------------|------------------|
| Peak | $V_{peak}$ | 1.000 |
| RMS | $V_{peak}/\sqrt{2}$ | 0.707 |
| Average (rectified) | $2V_{peak}/\pi$ | 0.637 |
| Peak-to-Peak | $2V_{peak}$ | 2.000 |

#### Diagram: RMS Explanation

<iframe src="../../sims/rms-calculation/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>RMS Value Demonstration MicroSim</summary>
Type: microsim

Purpose: Show why RMS relates to equivalent DC power dissipation

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain why RMS voltage determines power delivery in AC circuits and calculate RMS from peak values.

Instructional Rationale: Side-by-side AC and DC circuits showing equal power delivery makes the RMS concept tangible.

Canvas layout:
- Top left: AC circuit with sinusoidal source
- Top right: DC circuit with RMS-equivalent source
- Bottom: Power waveforms comparison

Visual elements:
- AC circuit: sinusoidal source, resistor, power waveform (always positive, double frequency)
- DC circuit: DC source at Vrms, resistor, constant power line
- Average power lines on both showing equality
- Instantaneous and average power displayed

Interactive controls:
- Slider: Peak voltage (1V to 20V)
- Slider: Resistance (100Ω to 10kΩ)
- Display: Vrms calculated
- Display: Average power (should match for both circuits)
- Animation: Time-varying waveforms

Default parameters:
- Vpeak = 10V (Vrms = 7.07V)
- R = 1kΩ

Behavior:
- AC power oscillates between 0 and Vpeak²/R
- DC power is constant at Vrms²/R
- Average AC power equals DC power (proof of RMS concept)
- Shows P = V²/R calculation for both

Implementation: p5.js with dual circuit animation
</details>

## Audio Frequency Fundamentals

Since this is a circuits course with audio emphasis, let's establish the frequency ranges we care about.

### Human Hearing Range

The typical **human hearing range** is **20 Hz to 20,000 Hz (20 kHz)**. However:

- Young people may hear up to 22 kHz
- Hearing sensitivity decreases with age, especially at high frequencies
- A 50-year-old might have effective hearing only to 12-15 kHz
- We're most sensitive around 2-4 kHz (where speech information concentrates)

### Audio Frequency Range

The **audio frequency range** for professional audio extends slightly beyond human hearing:

| Band | Frequency Range | Characteristics |
|------|-----------------|-----------------|
| Sub-bass | 20-60 Hz | Felt more than heard |
| Bass | 60-250 Hz | Kick drum, bass guitar fundamentals |
| Low-mids | 250-500 Hz | Body of instruments |
| Mids | 500 Hz - 2 kHz | Presence, clarity |
| High-mids | 2-4 kHz | Brilliance, speech clarity |
| Highs | 4-10 kHz | Sibilance, air |
| Ultra-highs | 10-20 kHz | Sparkle, harmonics |

### The Decibel: A Logarithmic Scale

Audio engineers use **decibels (dB)** because:

1. Human perception is roughly logarithmic
2. The dynamic range of hearing spans about 120 dB (trillion-to-one power ratio)
3. Cascaded gains and losses simply add in dB

#### Decibel Definitions

For power:

$dB = 10 \log_{10}\left(\frac{P_2}{P_1}\right)$

For voltage (with equal impedances):

$dB = 20 \log_{10}\left(\frac{V_2}{V_1}\right)$

where:

- $P_1, P_2$ are power values
- $V_1, V_2$ are voltage values
- The reference ($P_1$ or $V_1$) depends on context

| dB Change | Power Ratio | Voltage Ratio | Perception |
|-----------|-------------|---------------|------------|
| +3 dB | 2× | 1.41× | Barely noticeable |
| +6 dB | 4× | 2× | Noticeable |
| +10 dB | 10× | 3.16× | Twice as loud |
| +20 dB | 100× | 10× | Much louder |
| -3 dB | 0.5× | 0.71× | Half power |
| -6 dB | 0.25× | 0.5× | Half voltage |

!!! tip "Quick dB Math"
    Remember these:

    - **+3 dB ≈ double power** (or +1.41× voltage)
    - **+6 dB = double voltage** (or 4× power)
    - **+10 dB ≈ double perceived loudness**
    - **+20 dB = 10× voltage** (or 100× power)

    You can combine these: +26 dB = +20 + 6 = 10× × 2× = 20× voltage

#### Diagram: Decibel Scale Interactive

<iframe src="../../sims/decibel-scale/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Decibel Scale Calculator MicroSim</summary>
Type: microsim

Purpose: Convert between linear ratios and decibels, with audio examples

Bloom Level: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate decibel values from voltage and power ratios and interpret common dB levels in audio contexts.

Canvas layout:
- Left (300px): Ratio to dB converter
- Right (300px): dB scale with audio reference levels

Visual elements:
- Slider for linear ratio input
- dB calculation display
- Vertical dB scale with labeled reference points
- Audio examples at each level (whisper, conversation, concert, etc.)

Interactive controls:
- Slider: Linear ratio (0.001 to 1000, log scale)
- Radio: Voltage ratio or Power ratio
- Display: Calculated dB value
- Reverse calculator: Input dB, get ratio
- Display: Audio SPL reference examples

Default parameters:
- Ratio = 2
- Mode = voltage ratio
- Result = +6 dB

Behavior:
- Real-time calculation both directions
- Shows 10log vs 20log difference
- Reference scale shows common audio levels
- Color coding for dangerous SPL levels

Implementation: p5.js with interactive calculator
</details>

## Practical Applications

### Application 1: Bypass Capacitor Selection

Your microcontroller needs bypass capacitors to filter power supply noise. You need to filter frequencies from 1 MHz to 100 MHz.

**Analysis**: A single capacitor has a self-resonant frequency (SRF). Above SRF, it acts like an inductor! The solution: use multiple capacitors with different values:

- 10 µF electrolytic: Good below 1 MHz
- 100 nF ceramic: Good from 1-50 MHz
- 10 nF ceramic: Good from 10-100 MHz

The parallel combination covers the full frequency range.

### Application 2: Audio Signal Levels

You're connecting a microphone (output: -50 dBV) to an amplifier input that expects -10 dBV line level.

**Needed gain**: -10 dBV - (-50 dBV) = 40 dB

**In voltage ratio**: $10^{40/20} = 100×$

Your preamplifier needs to provide 100× voltage gain to bring the microphone signal to line level.

### Application 3: Inductor Energy Storage

A relay coil has L = 100 mH and carries 200 mA when energized. When the switch opens, where does the energy go?

**Stored energy**: $E = \frac{1}{2}LI^2 = \frac{1}{2}(0.1)(0.2)^2 = 2 mJ$

Without protection, this energy creates a voltage spike as the current tries to maintain itself ($V = L \frac{dI}{dt}$). Fast current collapse means high voltage—potentially hundreds of volts from a 12V supply! This is why relay drivers use flyback diodes.

## Summary and Key Takeaways

You've now mastered the dynamic duo of energy storage components. Here's what you can do:

**Capacitor Skills:**

- Calculate capacitance from physical parameters
- Combine capacitors in series (reciprocals) and parallel (direct sum)
- Determine stored energy from voltage
- Understand that capacitors block DC and oppose voltage changes

**Inductor Skills:**

- Calculate stored energy from current
- Combine inductors in series (direct sum) and parallel (reciprocals)
- Understand mutual inductance and coupling coefficient
- Recognize that inductors block high-frequency AC and oppose current changes

**Component Reality:**

- Real components have parasitic elements (ESR, ESL, etc.)
- Self-resonant frequency limits high-frequency performance
- Choose components based on application frequency and power requirements

**Signal Parameters:**

- Amplitude, frequency, period, and phase describe sinusoids
- RMS relates to power (Vrms = Vpeak/√2 for sinusoids)
- Decibels are logarithmic (+6 dB = 2× voltage, +3 dB ≈ 2× power)

**Key Formulas:**

| Formula | Application |
|---------|-------------|
| $C = \varepsilon A/d$ | Parallel plate capacitance |
| $E_C = \frac{1}{2}CV^2$ | Capacitor energy |
| $E_L = \frac{1}{2}LI^2$ | Inductor energy |
| $I = C \frac{dV}{dt}$ | Capacitor I-V relationship |
| $V = L \frac{dI}{dt}$ | Inductor V-I relationship |
| $V_{RMS} = V_{peak}/\sqrt{2}$ | RMS for sinusoids |
| $dB = 20\log(V_2/V_1)$ | Voltage ratio in decibels |

In the next chapter, we'll put these components to work and watch circuits evolve over time with transient analysis. Get ready to see exponentials everywhere!

??? question "Self-Check: Can You Answer These?"
    1. A parallel plate capacitor has plates of 5 cm² separated by 0.5 mm with a polyester dielectric (εr = 3.2). Calculate the capacitance.

    2. Three capacitors (10 µF, 20 µF, 30 µF) are connected in series. What's the equivalent capacitance? Now connect them in parallel—what's the new equivalent?

    3. An inductor stores 50 mJ when carrying 500 mA. What is its inductance? How much energy would it store at 1A?

    4. A sinusoidal voltage has Vpeak = 170V and frequency = 60 Hz. Calculate: Vrms, period, and angular frequency.

    5. Your amplifier has a voltage gain of 35 dB. If the input is 10 mV, what's the output voltage?
