# Operational Amplifiers

## Summary

This chapter provides comprehensive coverage of operational amplifiers (op-amps), the versatile building blocks of analog electronics. Students will learn the ideal op-amp model and how negative feedback creates stable, predictable circuits. The chapter covers fundamental configurations including inverting and non-inverting amplifiers, voltage followers, summing amplifiers, and integrator/differentiator circuits. Practical limitations like bandwidth, slew rate, and input offset are also addressed. Mastering op-amps enables students to design sophisticated audio processing circuits.

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

1. Operational Amplifier
2. Ideal Op-Amp
3. Op-Amp Symbol
4. Inverting Input
5. Non-Inverting Input
6. Op-Amp Output
7. Open-Loop Gain
8. Closed-Loop Gain
9. Negative Feedback
10. Positive Feedback
11. Virtual Short
12. Virtual Ground
13. Inverting Amplifier
14. Non-Inverting Amplifier
15. Voltage Follower
16. Buffer Amplifier
17. Summing Amplifier
18. Difference Amplifier
19. Instrumentation Amplifier
20. Integrator Circuit
21. Differentiator Circuit
22. Op-Amp Bandwidth
23. Gain-Bandwidth Product
24. Slew Rate
25. Input Offset Voltage
26. Input Bias Current
27. Common Mode Rejection
28. CMRR
29. Op-Amp Saturation
30. Rail-to-Rail Op-Amp

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Ohm's Law and Basic Circuit Configurations](../02-ohms-law-basic-configurations/index.md)
- [Chapter 4: DC Circuit Analysis Methods](../04-dc-circuit-analysis/index.md)
- [Chapter 11: Frequency Response and Bode Plots](../11-frequency-response-bode/index.md)

---
title: Operational Amplifiers
description: Master the versatile op-amp - the building block of analog electronics
generated_by: chapter-content-generator v0.03
date: 2026-01-30
---

## Introduction: The Swiss Army Knife of Electronics

If passive components are the nouns of circuit language, operational amplifiers are the verbs. They *do* things: amplify, buffer, sum, subtract, integrate, differentiate, compare, and more. A single IC costing less than a dollar can perform tasks that would require dozens of discrete transistors.

The **operational amplifier** (op-amp) earned its name from early analog computers where it performed mathematical "operations" like addition and integration. Today, op-amps are everywhere: in your phone's microphone preamplifier, your laptop's audio output, every sensor interface, and countless industrial control systems.

The beauty of op-amps lies in how negative feedback tames their enormous gain into precise, predictable behavior. With just two rules—and a handful of resistors—you can design amplifiers with exactly the gain you need, every time. This chapter teaches you those rules and how to apply them.

## The Ideal Op-Amp Model

The **ideal op-amp** is a simplified model that makes analysis straightforward. Real op-amps approach this ideal closely enough that the model works remarkably well for most designs.

**Ideal op-amp characteristics:**

| Property | Ideal Value | Why It Matters |
|----------|-------------|----------------|
| Open-loop gain (A) | ∞ | Any input difference creates huge output |
| Input impedance | ∞ | No current flows into inputs |
| Output impedance | 0 | Can drive any load without voltage drop |
| Bandwidth | ∞ | Works at all frequencies |
| CMRR | ∞ | Rejects common-mode perfectly |
| Slew rate | ∞ | Output changes instantly |

### The Op-Amp Symbol

The standard **op-amp symbol** is a triangle with five terminals:

- **Inverting input (−):** Marked with minus sign
- **Non-inverting input (+):** Marked with plus sign
- **Output:** At the triangle apex
- **Power supplies (V+ and V−):** Often omitted from schematics

The output voltage is proportional to the *difference* between the inputs:
\[V_{out} = A(V_+ - V_-)\]

Where A is the open-loop gain (typically 100,000 to 1,000,000 for real op-amps).

!!! note "The Power Supply Convention"
    Op-amp schematics often don't show power connections, but they're always there! Typical supplies are ±15V, ±12V, ±5V (dual supply) or +5V, +3.3V (single supply). The output can only swing between these rails.

## Open-Loop vs. Closed-Loop Gain

### Open-Loop Gain

**Open-loop gain** (A or A_OL) is the op-amp's intrinsic gain with no feedback—typically 100,000 or more (100 dB).

This enormous gain means that even a tiny input difference (microvolts) drives the output to the supply rails. Open-loop operation is essentially useless for linear amplification but perfect for comparators.

### Closed-Loop Gain

**Closed-loop gain** (A_CL) is the overall gain when feedback is applied. It depends on the feedback network, not the op-amp's open-loop gain.

\[A_{CL} = \frac{A_{OL}}{1 + A_{OL}\beta}\]

Where β is the feedback fraction. When \(A_{OL}\beta >> 1\):

\[A_{CL} \approx \frac{1}{\beta}\]

The closed-loop gain depends *only* on the feedback network—not on the op-amp's gain! This is the magic of negative feedback.

## Negative Feedback: The Taming Force

**Negative feedback** connects a portion of the output back to the inverting input. It's the key to stable, predictable op-amp circuits.

**How it works:**

1. Any increase in output feeds back to inverting input
2. This reduces the input difference (V+ − V−)
3. Which reduces the output
4. System settles at a stable equilibrium

**Benefits of negative feedback:**

- Stable, predictable gain
- Reduced distortion
- Increased bandwidth
- Reduced output impedance
- Reduced sensitivity to component variations

### Positive Feedback

**Positive feedback** connects output to the non-inverting input. Instead of stabilizing, it drives the output harder in the same direction.

**Uses:**

- Oscillators (intentional instability)
- Comparators with hysteresis (Schmitt triggers)
- Not used for linear amplification!

| Feedback Type | Connection | Effect | Use |
|---------------|------------|--------|-----|
| Negative | Output → V− | Stabilizing | Amplifiers |
| Positive | Output → V+ | Destabilizing | Oscillators, comparators |

## The Golden Rules: Virtual Short and Virtual Ground

For ideal op-amps with negative feedback, two simple rules solve almost every circuit:

### Rule 1: Virtual Short

**Virtual short:** The voltage difference between the inputs is essentially zero.
\[V_+ \approx V_-\]

Why? With infinite gain, even a tiny difference would rail the output. Negative feedback forces the inputs to be equal.

### Rule 2: No Input Current

**No input current:** The inputs draw essentially zero current.
\[I_+ \approx I_- \approx 0\]

Why? The input impedance is infinite, so no current flows into the op-amp inputs.

### Virtual Ground

**Virtual ground** is a special case of virtual short when the non-inverting input is grounded:
\[V_+ = 0 \Rightarrow V_- = 0\]

The inverting input sits at 0V even though it's not directly connected to ground—it's *virtually* grounded through the feedback mechanism.

#### Diagram: Op-Amp Golden Rules Visualizer

<iframe src="../../sims/opamp-golden-rules/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Op-Amp Golden Rules Visualizer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how the golden rules (virtual short, no input current) emerge from negative feedback by observing voltage and current values in an inverting amplifier.

Visual elements:
- Inverting amplifier circuit with labeled nodes
- Voltage values displayed at each node (V+, V−, Vout)
- Current arrows showing direction and magnitude (zero into inputs)
- "Virtual ground" label when V− ≈ 0
- Input difference (V+ − V−) shown approaching zero

Interactive controls:
- Slider: Input voltage Vin (-5V to +5V)
- Slider: Rf/Ri ratio (1 to 100)
- Toggle: Show ideal vs real op-amp (with finite gain)
- Display: V+, V−, |V+ - V−|, input currents

Step-through mode:
- Step 1: "Apply input voltage"
- Step 2: "Feedback forces V− toward V+"
- Step 3: "With V+ = 0, V− becomes virtual ground"
- Step 4: "Output settles at -Vin × Rf/Ri"

Annotations:
- "V+ = V− (virtual short)"
- "I+ = I− = 0 (no input current)"
- "Virtual ground when V+ is grounded"

Default parameters:
- Vin = 1V
- Ri = 10kΩ, Rf = 100kΩ
- Gain = -10

Canvas layout:
- Circuit diagram: 450 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Fundamental Op-Amp Configurations

### Inverting Amplifier

The **inverting amplifier** is the most common op-amp configuration. Input connects through Ri to the inverting input; feedback resistor Rf connects from output to inverting input.

**Gain:**
\[A_V = -\frac{R_f}{R_i}\]

The negative sign indicates phase inversion (180°).

**Analysis using golden rules:**

1. V− = V+ = 0 (virtual ground)
2. Current through Ri: \(I_i = \frac{V_{in}}{R_i}\)
3. This current must flow through Rf (no current into op-amp)
4. \(V_{out} = 0 - I_i R_f = -V_{in}\frac{R_f}{R_i}\)

**Input impedance:** \(Z_{in} = R_i\) (looking into the circuit)

### Non-Inverting Amplifier

The **non-inverting amplifier** has input at V+ and a voltage divider feedback network.

**Gain:**
\[A_V = 1 + \frac{R_f}{R_i}\]

Always positive (non-inverting) and always ≥ 1.

**Analysis:**

1. V− = V+ = Vin (virtual short)
2. V− comes from voltage divider of Vout
3. \(V_- = V_{out} \cdot \frac{R_i}{R_i + R_f}\)
4. Therefore: \(V_{out} = V_{in}(1 + \frac{R_f}{R_i})\)

**Input impedance:** Very high (approaches ideal ∞)

### Voltage Follower (Buffer)

The **voltage follower** (or **buffer amplifier**) is a special case of non-inverting amplifier with Rf = 0 and Ri = ∞.

**Gain:**
\[A_V = 1\]

Output equals input: \(V_{out} = V_{in}\)

**Why use it?**

- Provides very high input impedance (doesn't load the source)
- Provides very low output impedance (can drive heavy loads)
- Isolates stages from each other

**Applications:**

- Buffer between high-impedance source and low-impedance load
- Sample-and-hold circuits
- Active probes for oscilloscopes

| Configuration | Gain | Phase | Z_in |
|---------------|------|-------|------|
| Inverting | −Rf/Ri | 180° | Ri |
| Non-inverting | 1 + Rf/Ri | 0° | Very high |
| Voltage follower | 1 | 0° | Very high |

#### Diagram: Basic Op-Amp Configurations

<iframe src="../../sims/opamp-configurations/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Basic Op-Amp Configurations</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate gain for inverting, non-inverting, and follower configurations by selecting resistor values.

Visual elements:
- Three circuit diagrams side by side (inverting, non-inverting, follower)
- Input and output waveforms for selected configuration
- Gain calculation shown step-by-step
- Phase relationship indicated

Interactive controls:
- Radio buttons: Select configuration
- Slider: Ri (1kΩ to 100kΩ)
- Slider: Rf (1kΩ to 1MΩ)
- Slider: Input voltage (sinusoidal amplitude)
- Display: Calculated gain, input/output relationship

For each configuration:
- Circuit schematic with component values
- Gain formula with calculation
- Output waveform with correct amplitude and phase

Default parameters:
- Inverting: Ri = 10kΩ, Rf = 100kΩ → Gain = -10
- Non-inverting: Ri = 10kΩ, Rf = 90kΩ → Gain = +10
- Follower: Gain = 1

Canvas layout:
- Circuit/waveform display: 600 × 400 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Arithmetic Circuits

### Summing Amplifier

The **summing amplifier** adds multiple input signals. Each input has its own input resistor connected to the virtual ground at V−.

**For equal input resistors (R):**
\[V_{out} = -\frac{R_f}{R}(V_1 + V_2 + V_3 + ...)\]

**For different input resistors:**
\[V_{out} = -R_f\left(\frac{V_1}{R_1} + \frac{V_2}{R_2} + \frac{V_3}{R_3}\right)\]

**Applications:**

- Audio mixing (combining multiple channels)
- Weighted averaging
- Digital-to-analog conversion

### Difference Amplifier

The **difference amplifier** subtracts one input from another.

**Basic configuration (equal R):**
\[V_{out} = \frac{R_f}{R_i}(V_2 - V_1)\]

The output is proportional to the *difference* between the two inputs.

**Limitation:** Input impedances are different and relatively low.

### Instrumentation Amplifier

The **instrumentation amplifier** is a precision difference amplifier with:

- Very high input impedance on both inputs
- Excellent CMRR (common-mode rejection)
- Gain set by a single resistor

**Structure:** Three op-amps (two input buffers + difference amp)

**Applications:**

- Sensor interfaces (strain gauges, thermocouples)
- Medical instrumentation (ECG, EEG)
- Precision measurement

## Integrator and Differentiator

### Integrator Circuit

The **integrator** replaces Rf with a capacitor, producing output proportional to the integral of the input.

\[V_{out}(t) = -\frac{1}{RC}\int V_{in}(t) \, dt\]

**In frequency domain:**
\[H(j\omega) = -\frac{1}{j\omega RC}\]

Gain increases at low frequencies—acts as a low-pass filter with -20 dB/decade slope.

**Applications:**

- Analog computing
- Active low-pass filters
- Waveform generation (triangle wave from square wave)

### Differentiator Circuit

The **differentiator** replaces Ri with a capacitor, producing output proportional to the rate of change of input.

\[V_{out}(t) = -RC\frac{dV_{in}}{dt}\]

**In frequency domain:**
\[H(j\omega) = -j\omega RC\]

Gain increases at high frequencies—acts as a high-pass filter, but amplifies noise!

**Practical issue:** High-frequency noise is amplified. Usually add a small series resistor for stability.

## Bandwidth and Frequency Response

### Op-Amp Bandwidth

Real op-amps have finite bandwidth. The **open-loop gain** decreases with frequency at -20 dB/decade above a low corner frequency (often just a few Hz).

**Unity-gain frequency (f_T or GBW):**
The frequency where open-loop gain drops to 1 (0 dB).

Typical values: 1 MHz to 100 MHz for general-purpose op-amps.

### Gain-Bandwidth Product

**Gain-bandwidth product (GBW)** is approximately constant for a given op-amp:

\[GBW = A_{CL} \times BW\]

**Implication:** Higher gain means lower bandwidth!

**Example:** Op-amp with GBW = 10 MHz
- At gain = 10: BW = 1 MHz
- At gain = 100: BW = 100 kHz
- At gain = 1000: BW = 10 kHz

### Slew Rate

**Slew rate** is the maximum rate of change of the output voltage:

\[SR = \left|\frac{dV_{out}}{dt}\right|_{max} \text{ in V/μs}\]

It limits the output at high frequencies even if gain-bandwidth allows.

**Maximum frequency for full output swing:**
\[f_{max} = \frac{SR}{2\pi V_{peak}}\]

**Example:** SR = 1 V/μs, desired 10V peak output:
\[f_{max} = \frac{10^6}{2\pi \times 10} = 15.9 \text{ kHz}\]

Above this frequency, output cannot follow the full swing.

| Parameter | Effect | Typical Values |
|-----------|--------|----------------|
| GBW | Gain × Bandwidth trade-off | 1-100 MHz |
| Slew rate | Large signal speed limit | 0.5-100 V/μs |
| f_T | Unity-gain frequency | ≈ GBW |

## Practical Op-Amp Limitations

### Input Offset Voltage

**Input offset voltage** (V_OS) is the small DC voltage that must be applied between the inputs to make the output exactly zero.

Typical values: 1-10 mV (general purpose), < 100 μV (precision)

**Effect:** DC error at output = V_OS × (1 + Rf/Ri)

**Mitigation:** Use precision op-amps, add trimming circuit, or AC-couple input.

### Input Bias Current

**Input bias current** (I_B) is the small DC current that flows into the inputs.

Typical values: 10 nA - 10 μA (BJT input), < 1 pA (JFET/CMOS input)

**Effect:** Voltage drop across source resistance appears as offset.

**Mitigation:** Use FET-input op-amps, or match source impedances.

### Common-Mode Rejection Ratio (CMRR)

**Common-mode rejection ratio** measures how well the op-amp rejects signals that appear on both inputs simultaneously.

\[CMRR = 20\log_{10}\left(\frac{A_{differential}}{A_{common}}\right) \text{ dB}\]

Typical values: 80-120 dB

**Why it matters:** Real-world signals often have common-mode interference (60 Hz hum, ground noise). High CMRR rejects this interference while amplifying the desired differential signal.

### Op-Amp Saturation

**Saturation** occurs when the output reaches its maximum or minimum voltage, determined by the power supply rails.

For ±15V supplies, typical output swing: ±13V to ±14V (1-2V from rails)

**Rail-to-rail op-amps** can swing output very close to the supply rails—important for low-voltage, single-supply designs.

## Self-Check Questions

??? question "1. Design an inverting amplifier with gain of -20. If Ri = 10kΩ, what value of Rf is needed?"
    Using the inverting amplifier gain formula:
    \[A_V = -\frac{R_f}{R_i}\]

    \[-20 = -\frac{R_f}{10k\Omega}\]

    \[R_f = 20 \times 10k\Omega = 200k\Omega\]

    Use Rf = 200 kΩ (or nearest standard value 220 kΩ for gain of -22).

??? question "2. An op-amp has GBW = 5 MHz. What is the bandwidth when configured for gain of 50?"
    Using the gain-bandwidth product relationship:
    \[GBW = A_{CL} \times BW\]

    \[BW = \frac{GBW}{A_{CL}} = \frac{5 \text{ MHz}}{50} = 100 \text{ kHz}\]

    At gain of 50, the amplifier's bandwidth is limited to 100 kHz.

??? question "3. Why does a voltage follower have gain of exactly 1, even though it's a non-inverting configuration?"
    The voltage follower is a non-inverting amplifier with Rf = 0 and Ri = ∞ (open circuit).

    Non-inverting gain formula:
    \[A_V = 1 + \frac{R_f}{R_i}\]

    With Rf = 0:
    \[A_V = 1 + \frac{0}{R_i} = 1 + 0 = 1\]

    The output connects directly to V−, so the virtual short (V+ = V−) means Vout = V+ = Vin. The gain is unity regardless of any resistor values.

??? question "4. An integrator has R = 10kΩ and C = 100nF. What is the output after 1ms if Vin = constant 1V?"
    For an integrator with constant input:
    \[V_{out}(t) = -\frac{1}{RC}\int_0^t V_{in} \, dt = -\frac{V_{in} \cdot t}{RC}\]

    \[RC = 10 \times 10^3 \times 100 \times 10^{-9} = 1 \text{ ms}\]

    \[V_{out}(1\text{ ms}) = -\frac{1\text{V} \times 1\text{ ms}}{1 \text{ ms}} = -1\text{ V}\]

    After 1 ms, the output is -1V. The integrator ramps linearly when the input is constant.

## Summary

Operational amplifiers are the foundation of analog circuit design:

1. **Ideal op-amp model simplifies analysis** - Infinite gain, infinite input impedance, zero output impedance

2. **Negative feedback creates stability** - Output adjusts to minimize input difference

3. **Two golden rules solve most circuits** - Virtual short (V+ = V−) and no input current

4. **Inverting amplifier gain = -Rf/Ri** - Simple, predictable, phase-inverting

5. **Non-inverting amplifier gain = 1 + Rf/Ri** - Always ≥ 1, non-inverting

6. **Voltage follower is the ultimate buffer** - Unity gain, very high Zin, very low Zout

7. **Summing and difference amplifiers do math** - Add, subtract, weighted average

8. **Integrators and differentiators process signals** - Mathematical operations become circuit operations

9. **GBW limits high-frequency, high-gain operation** - Trade gain for bandwidth

10. **Real op-amps have imperfections** - Offset, bias current, limited CMRR, saturation

With op-amps in your toolkit, you can design active filters, precision amplifiers, signal conditioners, and countless other circuits. The ideal op-amp model and the two golden rules give you the analytical power to tackle any configuration. Real-world limitations exist, but understanding them lets you choose the right op-amp for the job and design around the constraints. Op-amps truly are the Swiss Army knife of electronics—master them, and you've gained a superpower.
