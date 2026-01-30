# Second-Order Circuits and RLC Behavior

## Summary

This chapter extends transient analysis to second-order circuits containing resistors, inductors, and capacitors (RLC). Students will learn how these circuits can exhibit oscillatory behavior and how the damping ratio determines whether the response is overdamped, underdamped, or critically damped. The chapter introduces the natural frequency concept and analyzes both series and parallel RLC configurations. Understanding second-order systems prepares students for analyzing resonant circuits and filters.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

1. Second-Order Circuits
2. RLC Circuit
3. Overdamped Response
4. Underdamped Response
5. Critically Damped Response
6. Damping Ratio
7. Natural Frequency
8. Pulse Response
9. Resonant Frequency
10. Quality Factor

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Passive Components: Resistors, Capacitors, and Inductors](../05-passive-components/index.md)
- [Chapter 6: Transient Analysis of RC and RL Circuits](../06-transient-analysis-rc-rl/index.md)

---
title: Second-Order Circuits and RLC Behavior
description: Explore oscillatory circuits with resistors, inductors, and capacitors including damping, resonance, and quality factor
generated_by: chapter-content-generator v0.03
date: 2026-01-30
---

## Introduction: When Circuits Get Dramatic

If first-order RC and RL circuits are like a polite conversation—one thing leads smoothly to another—then second-order RLC circuits are like a heated debate. Things can swing back and forth, overshoot their targets, or even oscillate indefinitely. Welcome to the world where circuits get *dramatic*.

In Chapter 6, you learned how capacitors and inductors store and release energy exponentially. But what happens when you put *both* energy storage elements in the same circuit? The energy sloshes back and forth between the electric field of the capacitor and the magnetic field of the inductor, like two friends tossing a ball between them. Add some resistance, and the ball gradually loses energy with each toss until everyone gets tired.

This energy exchange creates behaviors you won't see in simpler circuits:

- **Oscillations** that ring like a bell
- **Overshoot** that rockets past the target before settling back
- **Resonance** that amplifies signals at specific frequencies

Understanding these behaviors unlocks your ability to design everything from radio tuners to shock absorbers to audio equalizers. It's the physics of musical instruments, earthquake dampers, and your car's suspension—all described by the same beautiful mathematics.

## Second-Order Circuits: The Mathematical Upgrade

A **second-order circuit** is any circuit whose behavior is described by a second-order differential equation. This happens whenever a circuit contains two independent energy storage elements—typically an inductor and a capacitor. (Two capacitors in series/parallel still act as one equivalent capacitor, so they count as one energy storage element.)

The general form of a second-order differential equation is:

\[\frac{d^2x}{dt^2} + 2\alpha\frac{dx}{dt} + \omega_0^2 x = f(t)\]

Where:

- \(x\) is the response variable (voltage or current)
- \(\alpha\) is the damping coefficient (also written as \(\zeta\omega_0\))
- \(\omega_0\) is the undamped natural frequency
- \(f(t)\) is the forcing function (source input)

Don't let this equation intimidate you. It's just saying: "The acceleration of the response, plus some friction times the velocity, plus a spring force times position, equals the external push."

| Order | Energy Storage Elements | Equation Type | Example Response |
|-------|------------------------|---------------|------------------|
| First | 1 (C or L) | First-order ODE | Exponential decay/rise |
| Second | 2 (C and L) | Second-order ODE | Oscillatory, damped |
| Higher | 3+ | Higher-order ODE | Complex multi-frequency |

## RLC Circuits: The Dynamic Trio

An **RLC circuit** contains all three passive components: a **R**esistor, an indu**L**tor, and a **C**apacitor. These components can be connected in series or parallel, and each configuration has its own personality.

### Series RLC Circuit

In a series RLC circuit, all components share the same current. The voltage equation around the loop is:

\[V_R + V_L + V_C = V_S\]

\[iR + L\frac{di}{dt} + \frac{1}{C}\int i \, dt = V_S\]

Taking the derivative and rearranging:

\[\frac{d^2i}{dt^2} + \frac{R}{L}\frac{di}{dt} + \frac{1}{LC}i = \frac{1}{L}\frac{dV_S}{dt}\]

For a series RLC circuit:

- **Damping coefficient:** \(\alpha = \frac{R}{2L}\)
- **Undamped natural frequency:** \(\omega_0 = \frac{1}{\sqrt{LC}}\)
- **Resonant frequency:** \(\omega_r = \omega_0\) (for series)

### Parallel RLC Circuit

In a parallel RLC circuit, all components share the same voltage. The current equation at a node is:

\[i_R + i_L + i_C = I_S\]

\[\frac{v}{R} + \frac{1}{L}\int v \, dt + C\frac{dv}{dt} = I_S\]

For a parallel RLC circuit:

- **Damping coefficient:** \(\alpha = \frac{1}{2RC}\)
- **Undamped natural frequency:** \(\omega_0 = \frac{1}{\sqrt{LC}}\)

Notice that the undamped natural frequency \(\omega_0\) is the same for both configurations—it only depends on L and C.

#### Diagram: Series vs Parallel RLC Configuration

<iframe src="../../sims/series-parallel-rlc/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Series vs Parallel RLC Configuration</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: compare

Learning Objective: Students will compare the mathematical differences between series and parallel RLC circuits by observing how component arrangement affects damping and impedance.

Visual elements:
- Split canvas showing series RLC (left) and parallel RLC (right)
- Animated current flow in series circuit
- Animated voltage indication in parallel circuit
- Real-time equations displayed below each circuit
- Parameter values shown for R, L, and C

Interactive controls:
- Slider: Resistance R (10Ω to 1000Ω)
- Slider: Inductance L (1mH to 100mH)
- Slider: Capacitance C (0.1μF to 10μF)
- Toggle: Show/hide damping coefficient calculation
- Toggle: Show/hide natural frequency calculation

Display panels:
- Series circuit: α = R/2L, ω₀ = 1/√(LC)
- Parallel circuit: α = 1/2RC, ω₀ = 1/√(LC)
- Comparison: "Same ω₀, different damping!"

Default parameters:
- R = 100Ω
- L = 10mH
- C = 1μF

Canvas layout:
- Drawing area: 600 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js with circuit component library
</details>

## The Characteristic Equation: Finding the Roots

To solve the homogeneous second-order equation (no forcing function), we assume a solution of the form \(x = Ae^{st}\). Substituting this into the differential equation gives us the **characteristic equation**:

\[s^2 + 2\alpha s + \omega_0^2 = 0\]

Using the quadratic formula:

\[s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}\]

The nature of these roots—real, repeated, or complex—determines everything about how the circuit responds. This is where the magic happens!

| Condition | Root Type | Response Type |
|-----------|-----------|---------------|
| \(\alpha > \omega_0\) | Two distinct real roots | Overdamped |
| \(\alpha = \omega_0\) | Repeated real root | Critically damped |
| \(\alpha < \omega_0\) | Complex conjugate roots | Underdamped |

!!! tip "The Damping Sweet Spot"
    The relationship between α and ω₀ is the single most important factor in determining circuit behavior. It's like the Goldilocks problem of circuit design—too much damping is sluggish, too little is bouncy, and just right is critically damped.

## Natural Frequency: The Circuit's Heartbeat

The **natural frequency** \(\omega_0\) is the frequency at which an undamped circuit would oscillate forever. Think of it as the circuit's preferred rhythm—the tempo it naturally wants to follow when left to its own devices.

\[\omega_0 = \frac{1}{\sqrt{LC}} \text{ rad/s}\]

Or in Hertz:

\[f_0 = \frac{1}{2\pi\sqrt{LC}} \text{ Hz}\]

The natural frequency depends only on the energy storage elements (L and C), not on resistance. This makes physical sense: L and C determine how fast energy can slosh between the magnetic and electric fields, while R only determines how quickly that sloshing dies out.

**Physical intuition:**

- **Larger L** → More "inertia" in current changes → Lower frequency
- **Larger C** → More charge storage capacity → Lower frequency
- Think of a heavy pendulum (large L) swinging slowly, or a deep swimming pool (large C) with slow waves

| L (mH) | C (μF) | f₀ (Hz) | Audio Equivalent |
|--------|--------|---------|------------------|
| 100 | 100 | 50.3 | Low bass hum |
| 10 | 10 | 503 | Mid-range tone |
| 1 | 1 | 5,033 | High-pitched whistle |
| 0.1 | 0.1 | 50,330 | Ultrasonic |

#### Diagram: Natural Frequency Calculator

<iframe src="../../sims/natural-frequency-calc/main.html" width="100%" height="400px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Natural Frequency Calculator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate natural frequency from inductance and capacitance values and observe the inverse square root relationship.

Visual elements:
- Large display showing f₀ in Hz and ω₀ in rad/s
- Graphical representation of L and C as physical components
- Log-log plot showing f₀ vs LC product
- Current point highlighted on curve

Interactive controls:
- Slider: Inductance L (0.1mH to 100mH, logarithmic)
- Slider: Capacitance C (0.01μF to 100μF, logarithmic)
- Display: LC product value
- Display: Period T = 1/f₀

Calculation display:
- Show step-by-step: ω₀ = 1/√(LC) = 1/√(value) = result
- Convert to Hz: f₀ = ω₀/2π = result

Default parameters:
- L = 10mH
- C = 1μF
- Expected f₀ ≈ 1,592 Hz

Canvas layout:
- Calculator display: 300 × 200 pixels (top)
- Log-log plot: 300 × 150 pixels (bottom)
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Damping Ratio: How Quickly the Drama Fades

The **damping ratio** \(\zeta\) (Greek letter "zeta") is the dimensionless quantity that tells you how heavily damped a circuit is. It's defined as:

\[\zeta = \frac{\alpha}{\omega_0}\]

For a series RLC circuit:

\[\zeta = \frac{R}{2}\sqrt{\frac{C}{L}}\]

For a parallel RLC circuit:

\[\zeta = \frac{1}{2R}\sqrt{\frac{L}{C}}\]

The damping ratio is the single number that classifies circuit response:

| Damping Ratio | Condition | Response Type | Behavior |
|---------------|-----------|---------------|----------|
| \(\zeta > 1\) | \(\alpha > \omega_0\) | Overdamped | Slow, no oscillation |
| \(\zeta = 1\) | \(\alpha = \omega_0\) | Critically damped | Fastest without overshoot |
| \(0 < \zeta < 1\) | \(\alpha < \omega_0\) | Underdamped | Oscillation with decay |
| \(\zeta = 0\) | \(\alpha = 0\) | Undamped | Endless oscillation |

!!! note "Why Dimensionless Ratios Matter"
    The damping ratio ζ is powerful because it's dimensionless—it works the same whether you're analyzing tiny MEMS devices or massive power systems. A ζ of 0.5 means the same relative behavior regardless of the actual frequency or component values.

## Overdamped Response: The Cautious Approach

When \(\zeta > 1\) (or \(\alpha > \omega_0\)), the circuit is **overdamped**. The characteristic equation has two distinct negative real roots:

\[s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}\]

Both roots are negative (ensuring stability), but they're different values. The general solution is:

\[x(t) = A_1 e^{s_1 t} + A_2 e^{s_2 t}\]

**Characteristics of overdamped response:**

- No oscillation occurs
- Returns to equilibrium slowly
- The response "crawls" toward its final value
- One exponential dominates at first, then the slower one takes over

Think of overdamped response like a door closer that's been adjusted too tight—the door closes slowly without bouncing, but it takes forever to fully close.

**When overdamping is desirable:**

- Precision instruments that shouldn't overshoot
- Safety systems where oscillation could be dangerous
- Damping mechanical vibrations in sensitive equipment

#### Diagram: Overdamped Step Response

<iframe src="../../sims/overdamped-response/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Overdamped Step Response</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how overdamped circuits return to equilibrium without oscillation by observing the sum of two exponential decays.

Visual elements:
- Main plot: Response x(t) vs time
- Two separate exponential components shown as dashed lines
- Sum shown as solid line
- Final value shown as horizontal dashed line
- Annotations showing s₁ and s₂ values

Step-through mode:
- Stage 1: Show the two roots s₁ and s₂ on number line
- Stage 2: Show first exponential e^(s₁t) - fast decay
- Stage 3: Show second exponential e^(s₂t) - slow decay
- Stage 4: Show sum forming the total response
- Stage 5: Highlight that no zero crossings occur

Interactive controls:
- Slider: Damping ratio ζ (1.1 to 3.0)
- Button: Next Step / Previous Step
- Button: Animate continuous
- Display: Root values s₁ and s₂
- Display: Settling time estimate

Default parameters:
- ζ = 1.5
- ω₀ = 1000 rad/s (for visualization scaling)

Canvas layout:
- Plot area: 600 × 300 pixels
- Control area: 100 pixels below

Instructional Rationale: Step-through reveals how the two exponential components combine to create the overdamped response, making the mathematics visible.

Implementation: p5.js
</details>

## Underdamped Response: The Exciting One

When \(0 < \zeta < 1\) (or \(\alpha < \omega_0\)), the circuit is **underdamped**. Now the characteristic equation has complex conjugate roots:

\[s_{1,2} = -\alpha \pm j\omega_d\]

Where \(\omega_d\) is the **damped natural frequency**:

\[\omega_d = \omega_0\sqrt{1 - \zeta^2} = \sqrt{\omega_0^2 - \alpha^2}\]

The general solution is:

\[x(t) = e^{-\alpha t}(A\cos\omega_d t + B\sin\omega_d t)\]

Or equivalently:

\[x(t) = Ce^{-\alpha t}\cos(\omega_d t + \phi)\]

**Characteristics of underdamped response:**

- Oscillates around the final value
- Amplitude decays exponentially with time constant \(1/\alpha\)
- Frequency of oscillation is \(\omega_d\), not \(\omega_0\)
- Overshoots the target before settling

The underdamped response is what gives RLC circuits their musical quality. It's the reason bells ring, guitar strings vibrate, and radio tuners can select stations. This is where circuits get *interesting*.

**The damped frequency relationship:**

\[\omega_d = \omega_0\sqrt{1 - \zeta^2}\]

| Damping Ratio ζ | ω_d / ω₀ | Percent of Natural Frequency |
|-----------------|----------|------------------------------|
| 0.1 | 0.995 | 99.5% |
| 0.3 | 0.954 | 95.4% |
| 0.5 | 0.866 | 86.6% |
| 0.7 | 0.714 | 71.4% |
| 0.9 | 0.436 | 43.6% |

Notice that light damping barely affects the frequency, but heavy damping significantly reduces it.

#### Diagram: Underdamped Oscillation Anatomy

<iframe src="../../sims/underdamped-oscillation/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Underdamped Oscillation Anatomy</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: examine

Learning Objective: Students will examine the components of underdamped response including the envelope, oscillation frequency, and overshoot.

Visual elements:
- Main plot: Response x(t) vs time with oscillations
- Upper envelope: +Ce^(-αt) shown as dashed line
- Lower envelope: -Ce^(-αt) shown as dashed line
- Period markers showing T_d = 2π/ω_d
- First peak (overshoot) highlighted and labeled
- Settling band (±2% of final value) shown as shaded region

Interactive controls:
- Slider: Damping ratio ζ (0.05 to 0.95)
- Slider: Natural frequency ω₀ (100 to 10,000 rad/s)
- Toggle: Show/hide envelope
- Toggle: Show/hide period markers
- Display: Calculated values (ω_d, T_d, overshoot %)

Calculations displayed:
- ω_d = ω₀√(1-ζ²)
- T_d = 2π/ω_d
- Overshoot = e^(-πζ/√(1-ζ²)) × 100%
- Settling time ≈ 4/α

Default parameters:
- ζ = 0.3
- ω₀ = 1000 rad/s

Canvas layout:
- Plot area: 600 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

### Overshoot and Settling Time

Two key performance metrics for underdamped systems:

**Percent Overshoot (PO):**

\[PO = e^{-\pi\zeta/\sqrt{1-\zeta^2}} \times 100\%\]

| ζ | Percent Overshoot |
|---|-------------------|
| 0.1 | 72.9% |
| 0.3 | 37.2% |
| 0.5 | 16.3% |
| 0.7 | 4.6% |
| 0.9 | 0.2% |

**Settling Time** (to within 2% of final value):

\[t_s \approx \frac{4}{\alpha} = \frac{4}{\zeta\omega_0}\]

This creates a design trade-off: lower damping gives faster response but more overshoot; higher damping reduces overshoot but slows things down.

## Critically Damped Response: The Goldilocks Zone

When \(\zeta = 1\) (or \(\alpha = \omega_0\)), the circuit is **critically damped**. This is the boundary case with a repeated root:

\[s_1 = s_2 = -\alpha = -\omega_0\]

The general solution is:

\[x(t) = (A + Bt)e^{-\omega_0 t}\]

**Why critical damping is special:**

- Fastest possible return to equilibrium *without* overshoot
- Just barely on the edge of oscillation
- Optimal for many applications where overshoot is unacceptable
- The "perfect" door closer

**Characteristics:**

- No oscillation
- May appear to overshoot very slightly due to initial conditions, but mathematically returns to equilibrium faster than overdamped
- Response rises quickly then smoothly approaches final value

Critical damping is often the design target for:

- Automotive suspension systems
- Galvanometers and analog meters
- Camera stabilization systems
- Precision positioning systems

#### Diagram: Three Damping Regimes Comparison

<iframe src="../../sims/damping-comparison/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Three Damping Regimes Comparison</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: compare

Learning Objective: Students will compare overdamped, critically damped, and underdamped responses to understand the trade-offs in damping selection.

Visual elements:
- Single plot showing three response curves simultaneously
- Underdamped: Blue curve with oscillations
- Critically damped: Green curve (optimal path)
- Overdamped: Red curve (slow approach)
- Target/final value shown as horizontal line
- Time axis with settling time markers for each
- Settling band (±2%) shown as shaded region

Interactive controls:
- Master slider: Natural frequency ω₀ (sets timescale)
- Slider: Underdamped ζ (0.1 to 0.9)
- Slider: Overdamped ζ (1.1 to 3.0)
- Button: Reset to defaults
- Toggle: Show/hide settling times
- Toggle: Show/hide overshoot measurement

Annotations:
- "Fastest to settle" arrow pointing to critically damped curve
- "Overshoot" measurement on underdamped curve
- "Sluggish" label on overdamped curve

Default parameters:
- ω₀ = 1000 rad/s
- Underdamped ζ = 0.3
- Overdamped ζ = 2.0
- Critically damped ζ = 1.0 (fixed reference)

Canvas layout:
- Plot area: 600 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Resonant Frequency: When Circuits Sing

**Resonant frequency** \(\omega_r\) is the frequency at which a circuit's response is maximum. For a series RLC circuit driven by a sinusoidal source, resonance occurs when the inductive reactance equals the capacitive reactance:

\[X_L = X_C\]
\[\omega_r L = \frac{1}{\omega_r C}\]
\[\omega_r = \frac{1}{\sqrt{LC}} = \omega_0\]

At resonance in a series RLC circuit:

- Impedance is minimum (equals R)
- Current is maximum
- Voltage across L and C can exceed source voltage!
- Phase angle is zero (current in phase with voltage)

For a parallel RLC circuit at resonance:

- Impedance is maximum
- Current from source is minimum
- Circulating current between L and C can exceed source current

**The resonance phenomenon:**

At resonance, energy continuously sloshes between the inductor and capacitor. In each half-cycle:
1. C releases energy → L absorbs energy (as magnetic field)
2. L releases energy → C absorbs energy (as electric field)

With no losses (R = 0), this would continue forever. With resistance, some energy is dissipated each cycle, and the source replenishes it.

| Circuit Type | At Resonance | Impedance | Current |
|--------------|--------------|-----------|---------|
| Series RLC | Z = R (minimum) | I = V/R (maximum) | V_L = V_C (cancel) |
| Parallel RLC | Z → ∞ (maximum) | I → 0 (minimum) | I_L = I_C (cancel) |

#### Diagram: Series RLC Resonance Explorer

<iframe src="../../sims/series-resonance/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Series RLC Resonance Explorer</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: demonstrate

Learning Objective: Students will demonstrate resonance in a series RLC circuit by finding the frequency where current is maximized and impedance is minimized.

Visual elements:
- Left panel: Circuit diagram with animated current flow
- Center panel: Impedance magnitude |Z| vs frequency plot
- Right panel: Current magnitude |I| vs frequency plot
- Vertical line showing current frequency position
- Resonance peak clearly marked
- Phase angle display

Interactive controls:
- Slider: Driving frequency f (0.1× to 10× resonant frequency)
- Slider: Resistance R (10Ω to 1000Ω)
- Slider: Inductance L (1mH to 100mH)
- Slider: Capacitance C (0.1μF to 10μF)
- Button: "Jump to Resonance"
- Display: f₀, current frequency, |Z|, |I|

Calculations shown:
- f₀ = 1/(2π√(LC))
- At current frequency: X_L = ωL, X_C = 1/ωC
- |Z| = √(R² + (X_L - X_C)²)
- |I| = V/|Z|

Observations highlighted:
- At resonance: X_L = X_C, so Z = R
- Below resonance: Capacitive (X_C > X_L)
- Above resonance: Inductive (X_L > X_C)

Default parameters:
- R = 100Ω
- L = 10mH
- C = 1μF
- f₀ ≈ 1592 Hz

Canvas layout:
- Drawing area: 600 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Quality Factor: How Sharp is the Resonance?

The **quality factor** Q is a dimensionless parameter that characterizes the sharpness of resonance and the efficiency of energy storage. Higher Q means sharper resonance peaks and lower energy loss per cycle.

**Definition for series RLC:**

\[Q = \frac{\omega_0 L}{R} = \frac{1}{\omega_0 CR} = \frac{1}{R}\sqrt{\frac{L}{C}}\]

**Definition for parallel RLC:**

\[Q = \omega_0 CR = \frac{R}{\omega_0 L} = R\sqrt{\frac{C}{L}}\]

Notice that Q has opposite relationships with R for series vs. parallel circuits!

**Relationships with damping:**

\[Q = \frac{1}{2\zeta}\]

\[\zeta = \frac{1}{2Q}\]

| Damping Ratio ζ | Quality Factor Q | Response Type |
|-----------------|------------------|---------------|
| 0.05 | 10 | Highly underdamped |
| 0.1 | 5 | Underdamped |
| 0.25 | 2 | Moderately underdamped |
| 0.5 | 1 | Boundary |
| 1.0 | 0.5 | Critically damped |

**Physical interpretations of Q:**

1. **Energy ratio:**
   \[Q = 2\pi \times \frac{\text{Energy stored}}{\text{Energy dissipated per cycle}}\]

2. **Bandwidth relationship:**
   \[Q = \frac{f_0}{BW}\]
   Where BW is the 3dB bandwidth (the frequency range where response is above 70.7% of peak)

3. **Number of oscillations:**
   A high-Q circuit oscillates many times before its amplitude decays significantly

**Bandwidth and selectivity:**

\[BW = \frac{f_0}{Q} = \frac{\omega_0}{Q} \text{ (rad/s)}\]

| Q | f₀ = 1 MHz | Bandwidth | Application |
|---|------------|-----------|-------------|
| 10 | 100 kHz | Wide, poor selectivity | Audio filter |
| 100 | 10 kHz | Moderate selectivity | IF stage |
| 1000 | 1 kHz | Sharp selectivity | Crystal oscillator |
| 10000 | 100 Hz | Very sharp | Atomic clock |

!!! warning "Q and Practical Limits"
    Very high Q values are difficult to achieve with real components because all inductors have some resistance and all capacitors have some leakage. Practical Q factors for discrete L-C circuits rarely exceed 100-200. For higher Q, engineers use quartz crystals or mechanical resonators.

#### Diagram: Quality Factor and Bandwidth

<iframe src="../../sims/quality-factor/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Quality Factor and Bandwidth</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: examine

Learning Objective: Students will examine how quality factor affects resonance sharpness and bandwidth by observing frequency response curves.

Visual elements:
- Main plot: Normalized magnitude response vs frequency (log scale)
- Multiple curves showing different Q values (5, 10, 20, 50)
- 3dB points marked on each curve
- Bandwidth arrows connecting 3dB points
- Peak labeled with Q value

Interactive controls:
- Slider: Quality factor Q (1 to 100)
- Slider: Resonant frequency f₀ (100 Hz to 10 kHz)
- Toggle: Show/hide multiple Q curves for comparison
- Toggle: Linear/Log frequency scale
- Display: Calculated bandwidth BW = f₀/Q

Calculations displayed:
- BW = f₀/Q
- Lower 3dB frequency: f₁ = f₀/√(1 + 1/4Q²) - f₀/2Q
- Upper 3dB frequency: f₂ = f₀/√(1 + 1/4Q²) + f₀/2Q
- Damping ratio: ζ = 1/2Q

Visual annotations:
- "Sharper peak = Higher Q"
- "Narrower bandwidth = Better selectivity"
- 3dB = 0.707 of peak value shown

Default parameters:
- Q = 10
- f₀ = 1 kHz

Canvas layout:
- Plot area: 600 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Pulse Response: Ringing and Transients

The **pulse response** is how a circuit responds to a sudden rectangular pulse input rather than a step. This is crucial for digital circuits where signals switch between 0 and 1.

When an underdamped RLC circuit receives a pulse:

1. **Leading edge:** Circuit begins oscillating in response to the step-up
2. **Pulse duration:** Oscillations continue, possibly settling partially
3. **Trailing edge:** Second disturbance adds to (or cancels) existing oscillation
4. **Ring-out:** Damped oscillations continue after pulse ends

**Why ringing matters:**

- In digital circuits, ringing can cause false triggers
- Oscillations might be interpreted as additional pulses
- High-speed digital buses require careful impedance matching to minimize ringing

**Pulse width effects:**

| Pulse Width vs Period | Result |
|----------------------|--------|
| Much shorter than T_d | Minimal energy transfer, weak response |
| Equal to T_d/2 | Maximum energy transfer, strongest ringing |
| Much longer than T_d | Settles during pulse, two separate step responses |

#### Diagram: Pulse Response and Ringing

<iframe src="../../sims/pulse-ringing/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Pulse Response and Ringing</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: demonstrate

Learning Objective: Students will demonstrate how pulse width and damping affect ringing in RLC circuits.

Visual elements:
- Top plot: Input pulse signal
- Bottom plot: Circuit response with ringing
- Overlay showing damped oscillations
- Pulse edges aligned between plots
- Ringing peaks counted and labeled

Interactive controls:
- Slider: Pulse width (0.1× to 5× natural period)
- Slider: Damping ratio ζ (0.05 to 0.9)
- Slider: Natural frequency ω₀
- Button: Send single pulse
- Button: Continuous pulses
- Display: Number of ringing cycles visible

Observations highlighted:
- Pulse width = T_d/2: "Maximum ringing - resonant excitation"
- High ζ: "Quick settling, minimal overshoot"
- Low ζ: "Extended ringing, many oscillations"

Default parameters:
- ζ = 0.2
- Pulse width = T_d (one natural period)
- ω₀ = 1000 rad/s

Canvas layout:
- Two plot areas: 600 × 175 pixels each
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Energy Exchange in RLC Circuits

The oscillatory behavior of RLC circuits comes from energy continuously exchanging between the electric field of the capacitor and the magnetic field of the inductor.

**Energy expressions:**

- Capacitor energy: \(W_C = \frac{1}{2}Cv^2\)
- Inductor energy: \(W_L = \frac{1}{2}Li^2\)
- Total energy: \(W_{total} = W_C + W_L\)

In an ideal LC circuit (no resistance):

- Total energy remains constant
- Energy oscillates completely between L and C
- When all energy is in C: maximum voltage, zero current
- When all energy is in L: maximum current, zero voltage

With resistance:

- Total energy decreases exponentially
- Energy is dissipated as heat in R
- Rate of energy loss: \(P_R = i^2R\)

#### Diagram: Energy Exchange Animation

<iframe src="../../sims/energy-exchange/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Energy Exchange Animation</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how energy oscillates between the capacitor's electric field and the inductor's magnetic field in an RLC circuit.

Visual elements:
- Circuit diagram showing RLC with animated current
- Capacitor energy bar (blue) - electric field representation
- Inductor energy bar (red) - magnetic field representation
- Total energy bar (gray) - decreasing over time
- Phase indicator showing voltage and current relationship
- Energy vs time plot showing oscillation

Step-through mode for conceptual understanding:
- Stage 1: "Capacitor fully charged" - all energy in E-field
- Stage 2: "Current rising" - energy transferring to L
- Stage 3: "Inductor at max current" - all energy in B-field
- Stage 4: "Current falling" - energy returning to C (opposite polarity)
- Stage 5: "Cycle completes" - back to initial state (with losses)

Interactive controls:
- Button: Step / Auto-animate
- Slider: Damping (0 for ideal LC, up to 0.5)
- Slider: Animation speed
- Toggle: Show/hide energy plot
- Display: Current W_C, W_L, W_total values

Default parameters:
- Light damping (ζ = 0.1) to show both oscillation and decay
- Initial condition: Capacitor fully charged

Canvas layout:
- Circuit and energy bars: 400 × 300 pixels
- Energy plot: 200 × 300 pixels (side)
- Control area: 100 pixels below

Instructional Rationale: Step-through mode helps students understand energy conservation and transfer without the distraction of continuous animation.

Implementation: p5.js
</details>

## Design Applications

Understanding second-order systems empowers you to design circuits for specific behaviors:

### Radio Tuning

Radio receivers use LC resonance to select stations. The resonant frequency determines which radio frequency passes through:

\[f_0 = \frac{1}{2\pi\sqrt{LC}}\]

By varying C (using a variable capacitor), you "tune" to different frequencies. Higher Q gives better selectivity between adjacent stations.

### Shock Absorbers and Mechanical Analogy

Mechanical systems follow the same mathematics! A mass-spring-damper system is described by:

\[m\frac{d^2x}{dt^2} + b\frac{dx}{dt} + kx = F(t)\]

Comparing to the electrical equation:

| Electrical | Mechanical |
|------------|------------|
| L (inductance) | m (mass) |
| R (resistance) | b (damping coefficient) |
| 1/C (elastance) | k (spring constant) |
| Voltage V | Force F |
| Current i | Velocity v |
| Charge q | Displacement x |

Car suspension is designed for critical damping (ζ ≈ 1) so the car returns to level quickly after hitting a bump without bouncing.

### Audio Crossover Networks

Speaker crossover networks use RLC filters to direct different frequencies to appropriate drivers:

- Low frequencies → Woofer (large speaker)
- High frequencies → Tweeter (small speaker)

The Q factor determines how sharply the crossover separates frequencies.

### Bandpass Filters

A series RLC circuit naturally acts as a bandpass filter, passing frequencies near resonance while attenuating others. The bandwidth and center frequency are controlled by component selection.

| Application | Typical Q | Bandwidth |
|-------------|-----------|-----------|
| Audio tone control | 1-5 | Wide |
| Radio IF stage | 20-50 | Moderate |
| Frequency reference | 100-1000 | Narrow |

## Practical Considerations

### Real Component Limitations

Ideal RLC analysis assumes perfect components, but real parts have limitations:

**Inductors:**
- Series resistance (wire resistance)
- Self-capacitance (between windings)
- Saturation at high currents

**Capacitors:**
- Equivalent series resistance (ESR)
- Equivalent series inductance (ESL)
- Leakage current
- Voltage rating limits

**Resistors:**
- Temperature coefficient
- Parasitic inductance at high frequencies

These parasitics can cause unexpected resonances or damping in high-frequency circuits.

### Initial Conditions

The complete solution to a second-order equation requires two initial conditions (because it's second-order). Typically:

- Initial voltage: \(v(0)\) or \(v_C(0)\)
- Initial current: \(i(0)\) or \(i_L(0)\)

These determine the constants in the general solution and can dramatically affect the transient response.

## Key Formulas Summary

| Parameter | Series RLC | Parallel RLC |
|-----------|------------|--------------|
| Damping coefficient α | R/2L | 1/2RC |
| Natural frequency ω₀ | 1/√(LC) | 1/√(LC) |
| Damping ratio ζ | (R/2)√(C/L) | (1/2R)√(L/C) |
| Quality factor Q | (1/R)√(L/C) | R√(C/L) |
| Resonant frequency ω_r | 1/√(LC) | 1/√(LC) |
| Bandwidth BW | R/L | 1/RC |

**Response classification:**

- Overdamped: \(\zeta > 1\), roots = \(-\alpha \pm \sqrt{\alpha^2 - \omega_0^2}\)
- Critically damped: \(\zeta = 1\), root = \(-\omega_0\) (repeated)
- Underdamped: \(\zeta < 1\), roots = \(-\alpha \pm j\omega_d\), where \(\omega_d = \omega_0\sqrt{1-\zeta^2}\)

## Self-Check Questions

??? question "1. What determines whether a circuit is overdamped, underdamped, or critically damped?"
    The relationship between the damping coefficient α and the natural frequency ω₀ determines the damping type:

    - **Overdamped:** α > ω₀ (or ζ > 1)
    - **Critically damped:** α = ω₀ (or ζ = 1)
    - **Underdamped:** α < ω₀ (or ζ < 1)

    For a series RLC circuit, α = R/2L and ω₀ = 1/√(LC). So increasing R increases damping, while increasing L or C changes both α and ω₀.

??? question "2. A series RLC circuit has R = 100Ω, L = 10mH, and C = 1μF. Calculate ω₀, α, and ζ. What type of response will it have?"
    Given: R = 100Ω, L = 10mH = 0.01H, C = 1μF = 10⁻⁶F

    Natural frequency:
    ω₀ = 1/√(LC) = 1/√(0.01 × 10⁻⁶) = 1/√(10⁻⁸) = 10,000 rad/s

    Damping coefficient:
    α = R/2L = 100/(2 × 0.01) = 5,000 rad/s

    Damping ratio:
    ζ = α/ω₀ = 5,000/10,000 = 0.5

    Since ζ = 0.5 < 1, the circuit is **underdamped** and will oscillate.

    The damped frequency will be:
    ω_d = ω₀√(1-ζ²) = 10,000√(1-0.25) = 10,000 × 0.866 = 8,660 rad/s

??? question "3. Why is critical damping often preferred in practical applications despite not being the 'fastest' in all senses?"
    Critical damping provides the fastest return to equilibrium **without overshoot**. While an underdamped system might initially reach the target faster, it then overshoots and oscillates before settling.

    Critical damping is preferred when:
    - Overshoot could cause damage (mechanical systems hitting limits)
    - False readings are unacceptable (measuring instruments)
    - Oscillation could trigger unwanted events (digital circuits)
    - Smooth motion is required (camera stabilization)

    The "fastest" actually depends on what you're optimizing. If you need to reach 90% of the target quickly and can tolerate overshoot, underdamped is faster. If you need to stay within ±2% of the target, critical damping usually wins.

??? question "4. How does the quality factor Q relate to both the damping ratio and the bandwidth of a resonant circuit?"
    Q is inversely related to damping ratio:
    Q = 1/(2ζ)  or  ζ = 1/(2Q)

    Q is also related to bandwidth:
    Q = f₀/BW  or  BW = f₀/Q

    This means:
    - High Q → Low damping → Narrow bandwidth → Sharp resonance
    - Low Q → High damping → Wide bandwidth → Broad resonance

    For example, a circuit with Q = 100 at f₀ = 1 MHz has:
    - ζ = 1/(2×100) = 0.005 (very underdamped)
    - BW = 1 MHz/100 = 10 kHz (very selective)

    A circuit with Q = 2 at f₀ = 1 MHz has:
    - ζ = 1/(2×2) = 0.25 (moderately underdamped)
    - BW = 1 MHz/2 = 500 kHz (not selective at all)

## Summary

Second-order RLC circuits introduce the rich dynamics of oscillation and resonance that first-order circuits can't produce. The key insights from this chapter:

1. **Second-order means two energy storage elements** - The interplay between L and C creates oscillatory behavior

2. **The damping ratio ζ controls everything** - It determines whether the response is overdamped (sluggish), critically damped (optimal), or underdamped (oscillatory)

3. **Natural frequency depends only on L and C** - Resistance affects damping but not the fundamental frequency of oscillation

4. **Resonance is powerful** - At the resonant frequency, series circuits maximize current and parallel circuits maximize impedance

5. **Quality factor Q indicates selectivity** - High Q means sharp resonance and narrow bandwidth; Q and ζ are inversely related

6. **Energy sloshes between L and C** - The electric field and magnetic field continuously exchange energy, with R dissipating some each cycle

7. **The same math describes mechanical systems** - Mass-spring-dampers follow identical equations, making RLC circuit analysis a universal skill

These concepts prepare you for AC analysis, where sinusoidal signals interact with resonant circuits to create the filters, tuners, and oscillators that make modern electronics possible. The dramatic behavior of second-order circuits—the ringing, the resonance, the critical balance between too much and too little damping—is where circuit analysis becomes genuinely exciting.

Next chapter, we'll see how AC signals and sinusoidal analysis build on these foundations to analyze circuits in the frequency domain.
