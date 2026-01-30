# Filters and Resonance

## Summary

This chapter provides practical coverage of filter circuits used in audio and signal processing applications. Students will learn to design first and second-order filters using RC, RL, and RLC configurations, understand filter specifications like order and roll-off rate, and apply these concepts to audio tone control circuits. The chapter covers both passive filters using only RLC components and introduces active filters using operational amplifiers. By the end, students will be able to design filters to meet specific frequency response requirements.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

1. First-Order Filter
2. Second-Order Filter
3. RC Low-Pass Filter
4. RC High-Pass Filter
5. RL Low-Pass Filter
6. RL High-Pass Filter
7. RLC Band-Pass Filter
8. Passive Filter
9. Active Filter
10. Filter Design
11. Audio Tone Control
12. Bass Filter
13. Treble Filter
14. Amplifier Gain
15. Decibels in Audio
16. dBV
17. dBu
18. Headroom
19. Dynamic Range
20. Audio Signal
21. Microphone
22. Speaker

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Transient Analysis of RC and RL Circuits](../06-transient-analysis-rc-rl/index.md)
- [Chapter 7: Second-Order Circuits and RLC Behavior](../07-second-order-rlc-circuits/index.md)
- [Chapter 11: Frequency Response and Bode Plots](../11-frequency-response-bode/index.md)

---
title: Filters and Resonance
description: Design practical filter circuits for audio and signal processing applications
generated_by: chapter-content-generator v0.03
date: 2026-01-30
---

## Introduction: Sculpting Sound with Circuits

Every time you adjust the bass and treble on your stereo, you're using filters. Every time you talk on a phone that somehow makes your voice clear despite background noise, filters are working behind the scenes. Every time a radio picks out one station from thousands of signals crowding the airwaves—you guessed it, filters.

Filters are the sculptors of the frequency spectrum. They let you decide which frequencies to keep and which to discard, which to emphasize and which to suppress. In the previous chapter, you learned the theory of frequency response. Now it's time to put that theory to work designing real filter circuits.

This chapter bridges the gap between mathematical transfer functions and practical component selection. You'll learn to design first-order RC and RL filters, second-order RLC filters, and get your first taste of active filters that can amplify while filtering. Along the way, we'll explore audio applications where filters transform raw signals into the sounds we want to hear.

## First-Order Filters: The Building Blocks

**First-order filters** contain one reactive element (capacitor or inductor) and produce a -20 dB/decade roll-off. They're simple, predictable, and form the foundation for more complex filter designs.

**Transfer function form:**

\[H(j\omega) = \frac{K}{1 + j\omega/\omega_c} \text{ (low-pass)}\]
\[H(j\omega) = \frac{K \cdot j\omega/\omega_c}{1 + j\omega/\omega_c} \text{ (high-pass)}\]

**Characteristics:**

| Property | First-Order Value |
|----------|------------------|
| Roll-off rate | 20 dB/decade |
| Phase shift range | 0° to 90° |
| Order | 1 |
| Reactive elements | 1 (C or L) |

### RC Low-Pass Filter

The **RC low-pass filter** is the most common first-order filter. Output is taken across the capacitor.

**Circuit:** Series resistor, capacitor to ground

**Transfer function:**
\[H(j\omega) = \frac{1}{1 + j\omega RC}\]

**Cutoff frequency:**
\[f_c = \frac{1}{2\pi RC}\]

**Design equations:**
Given \(f_c\), choose R and C such that \(RC = \frac{1}{2\pi f_c}\)

**Example:** For \(f_c = 1\) kHz:
\[RC = \frac{1}{2\pi \times 1000} = 159.2 \text{ μs}\]

Choose C = 100 nF: \(R = \frac{159.2 \text{ μs}}{100 \text{ nF}} = 1.592 \text{ kΩ}\)
Use standard value R = 1.5 kΩ → actual \(f_c = 1.06\) kHz

### RC High-Pass Filter

The **RC high-pass filter** has the same components as the low-pass, but output is taken across the resistor.

**Circuit:** Series capacitor, resistor to ground (output across R)

**Transfer function:**
\[H(j\omega) = \frac{j\omega RC}{1 + j\omega RC}\]

**Cutoff frequency:**
\[f_c = \frac{1}{2\pi RC}\]

At low frequencies, the capacitor blocks; at high frequencies, it passes.

### RL Low-Pass Filter

The **RL low-pass filter** uses an inductor instead of a capacitor.

**Circuit:** Resistor to ground, series inductor (output across R)

**Cutoff frequency:**
\[f_c = \frac{R}{2\pi L}\]

**Why RL is less common:**
- Inductors are larger, heavier, and more expensive than capacitors
- Inductors have parasitic resistance
- Inductors can pick up magnetic interference

RL filters are mainly used in power applications where inductors handle high currents better than capacitors.

### RL High-Pass Filter

**Circuit:** Inductor to ground, series resistor (output across L)

**Cutoff frequency:**
\[f_c = \frac{R}{2\pi L}\]

#### Diagram: First-Order Filter Comparison

<iframe src="../../sims/first-order-filters/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>First-Order Filter Comparison</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: compare

Learning Objective: Students will compare RC and RL implementations of low-pass and high-pass filters by observing their frequency responses with the same cutoff frequency.

Visual elements:
- Four circuits: RC LP, RC HP, RL LP, RL HP
- Bode magnitude plot showing all four responses overlaid
- Cutoff frequency marker shared by all
- Component values displayed for each circuit

Interactive controls:
- Slider: Target cutoff frequency (100 Hz to 10 kHz)
- Toggle: Show RC only / RL only / All
- Toggle: Normalize component values
- Display: Calculated R, C, L for each circuit
- Input: Fix R or C/L value

Observations highlighted:
- "Same cutoff, same response shape"
- "RC more practical at audio frequencies"
- "RL used in power applications"

Default parameters:
- f_c = 1 kHz
- R = 1 kΩ for all
- C = 159 nF, L = 159 mH (calculated)

Canvas layout:
- Circuit schematics: 400 × 200 pixels (top)
- Bode plot: 600 × 250 pixels (bottom)
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Second-Order Filters: Adding Resonance

**Second-order filters** contain two reactive elements and produce -40 dB/decade roll-off. They can exhibit resonance, producing a peak in the response.

**Key parameters:**

- **Cutoff frequency** (\(f_c\) or \(\omega_0\)): Where roll-off begins
- **Quality factor** (Q): Sharpness of response
- **Damping ratio** (\(\zeta = 1/2Q\)): Controls peak behavior

**Standard form transfer function:**
\[H(s) = \frac{\omega_0^2}{s^2 + (2\omega_0/Q)s + \omega_0^2}\]

| Q Value | Damping | Response Shape |
|---------|---------|----------------|
| < 0.5 | Overdamped | No peak, gradual rolloff |
| 0.707 | Butterworth | Maximally flat passband |
| 1 | Slightly underdamped | Small peak (≈3 dB) |
| > 1 | Underdamped | Pronounced peak |
| 10 | Highly underdamped | Sharp resonance |

### RLC Band-Pass Filter

The **RLC band-pass filter** passes a band of frequencies centered at the resonant frequency.

**Series RLC band-pass** (output across R):
\[f_0 = \frac{1}{2\pi\sqrt{LC}}\]
\[Q = \frac{1}{R}\sqrt{\frac{L}{C}} = \frac{f_0}{BW}\]
\[BW = \frac{R}{2\pi L}\]

**Design process:**

1. Choose center frequency \(f_0\)
2. Choose desired Q (affects bandwidth)
3. Calculate LC product: \(LC = \frac{1}{(2\pi f_0)^2}\)
4. Choose L or C, calculate the other
5. Calculate R: \(R = \frac{2\pi f_0 L}{Q}\)

#### Diagram: Second-Order Filter Designer

<iframe src="../../sims/second-order-filter/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Second-Order Filter Designer</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: design

Learning Objective: Students will design second-order RLC filters by specifying center frequency and Q, then observing the resulting component values and frequency response.

Visual elements:
- Circuit schematic (series RLC)
- Bode magnitude and phase plots
- Peak height indicator for underdamped responses
- Bandwidth markers on plot
- Component values display

Interactive controls:
- Slider: Center frequency f₀ (100 Hz to 100 kHz, log)
- Slider: Q factor (0.5 to 20)
- Radio: Filter type (LP, HP, BP)
- Toggle: Fix L or Fix C for design
- Input: Fixed component value
- Button: Calculate components

Design calculations displayed:
- LC = 1/(2πf₀)²
- R = 2πf₀L/Q (or R = Q/(2πf₀C))
- BW = f₀/Q
- Peak height (dB) if Q > 0.707

Default parameters:
- f₀ = 1 kHz
- Q = 5 (narrow band-pass)
- L = 10 mH (fixed)
- Calculated: C = 2.53 μF, R = 12.6 Ω

Canvas layout:
- Circuit/specs: 250 × 400 pixels
- Bode plots: 350 × 400 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Passive vs. Active Filters

### Passive Filters

**Passive filters** use only resistors, capacitors, and inductors—no power supply or amplification.

**Advantages:**

- Simple, no power supply needed
- High reliability
- Can handle high power
- No active device noise

**Disadvantages:**

- Cannot amplify (gain ≤ 1)
- Loading effects change response
- Large inductors for low frequencies
- Limited Q in some topologies

### Active Filters

**Active filters** use amplifying devices (usually op-amps) along with RC networks.

**Advantages:**

- Can provide gain (amplify while filtering)
- No inductors needed (cheaper, smaller)
- Easy to cascade without loading
- High Q achievable
- Adjustable gain and cutoff

**Disadvantages:**

- Requires power supply
- Bandwidth limited by op-amp
- More components
- Potential for noise and distortion

| Property | Passive | Active |
|----------|---------|--------|
| Gain | ≤ 1 (loss) | Any value |
| Inductors | Often needed | Not needed |
| Power supply | None | Required |
| Cascading | Loading issues | No loading |
| High Q | Difficult | Easy |
| High frequency | Excellent | Limited by op-amp |

!!! tip "When to Choose Active Filters"
    Use active filters for audio frequencies when you need gain, precise response shapes, or want to avoid large inductors. Use passive filters for RF, high-power applications, or when simplicity and reliability are paramount.

## Filter Design Process

Designing a filter involves translating specifications into component values:

**Step 1: Define specifications**

- Filter type (LP, HP, BP, BR)
- Cutoff frequency/frequencies
- Passband ripple (if any)
- Stopband attenuation
- Order required

**Step 2: Choose topology**

- First-order RC/RL for simple roll-off
- Second-order RLC for steeper roll-off or resonance
- Active for gain or inductor-free design

**Step 3: Calculate component values**

Using design equations for the chosen topology.

**Step 4: Select standard values**

Components come in standard values (E12, E24 series). Choose nearest values.

**Step 5: Verify response**

Simulate or measure to confirm specifications are met.

## Audio Tone Control: Bass and Treble

**Audio tone control** circuits adjust the frequency balance of sound. The classic Baxandall tone control (named after Peter Baxandall) provides independent bass and treble adjustment.

### Bass Filter

A **bass filter** emphasizes or attenuates low frequencies (typically below 200-500 Hz).

**Bass boost:** Low-pass shelving filter with gain at low frequencies

**Bass cut:** Attenuate low frequencies while passing midrange and treble

**Typical bass control range:** ±12 dB at 100 Hz

### Treble Filter

A **treble filter** emphasizes or attenuates high frequencies (typically above 2-5 kHz).

**Treble boost:** High-pass shelving filter with gain at high frequencies

**Treble cut:** Attenuate high frequencies while passing bass and midrange

**Typical treble control range:** ±12 dB at 10 kHz

### Shelving Filters

Unlike the simple filters that continue rolling off forever, **shelving filters** level off to a constant gain in the stop band. They're like stepping up or down to a shelf, not sliding off a cliff.

**Low-frequency shelf:** Adjusts gain below a corner frequency, flat response above

**High-frequency shelf:** Adjusts gain above a corner frequency, flat response below

## Audio Signal Levels and Decibels

Audio engineers use specific decibel references:

### dBV (decibels relative to 1 volt)

\[dBV = 20\log_{10}\left(\frac{V_{rms}}{1V}\right)\]

**Reference:** 1 V RMS = 0 dBV

**Common levels:**

| dBV | Voltage | Application |
|-----|---------|-------------|
| +4 dBV | 1.58 V | Professional line level |
| 0 dBV | 1.0 V | Consumer line level (some) |
| -10 dBV | 316 mV | Consumer line level (typical) |
| -60 dBV | 1 mV | Microphone level |

### dBu (decibels relative to 0.775 volts)

\[dBu = 20\log_{10}\left(\frac{V_{rms}}{0.775V}\right)\]

**Reference:** 0.775 V RMS = 0 dBu (originally referenced to 600Ω termination = 1 mW)

**Why 0.775V?** It's the voltage that produces 1 mW into 600Ω.

| dBu | dBV | Voltage |
|-----|-----|---------|
| +4 dBu | +1.8 dBV | 1.23 V |
| 0 dBu | -2.2 dBV | 0.775 V |
| -10 dBu | -12.2 dBV | 245 mV |

### Headroom and Dynamic Range

**Headroom** is the safety margin between normal operating level and maximum level (clipping).

\[\text{Headroom (dB)} = \text{Maximum level} - \text{Nominal level}\]

Typical professional equipment has 20+ dB of headroom.

**Dynamic range** is the ratio between the loudest and quietest signals a system can handle:

\[\text{Dynamic Range (dB)} = \text{Maximum level} - \text{Noise floor}\]

| Medium | Typical Dynamic Range |
|--------|---------------------|
| CD audio | 96 dB |
| Vinyl record | 60-70 dB |
| FM radio | 50-60 dB |
| Telephone | 30-40 dB |

## Audio Transducers: Microphones and Speakers

### Microphones

A **microphone** converts sound (acoustic energy) to electrical signals.

**Types:**

- **Dynamic:** Moving coil in magnetic field, rugged, no power needed
- **Condenser:** Capacitor with moving plate, sensitive, needs phantom power
- **Ribbon:** Thin metal ribbon in magnetic field, delicate, warm sound

**Typical output levels:** -60 to -40 dBV (1-10 mV)

**Amplifier gain needed:** 40-60 dB to reach line level

### Speakers

A **speaker** (loudspeaker) converts electrical signals to sound.

**Basic operation:**

1. Current through voice coil creates magnetic field
2. Interacts with permanent magnet
3. Cone moves, pushing air
4. Air pressure waves = sound

**Impedance:** Typically 4Ω, 8Ω, or 16Ω (mostly resistive at low frequencies, complex at higher frequencies)

**Sensitivity:** Sound pressure level (SPL) produced for 1W input at 1 meter distance

**Crossover networks:** Filter circuits that direct different frequencies to appropriate drivers (woofer, tweeter)

#### Diagram: Audio Signal Chain

<iframe src="../../sims/audio-signal-chain/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Audio Signal Chain</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain the signal levels and gain stages in a typical audio system from microphone to speaker.

Visual elements:
- Signal flow diagram: Mic → Preamp → Tone Control → Power Amp → Speaker
- Level meters at each stage showing dBV or dBu
- Gain stages with amplification/attenuation values
- Frequency response modification at tone control
- Headroom indication at each stage

Interactive controls:
- Slider: Input level (mic sensitivity)
- Slider: Preamp gain (20-60 dB)
- Slider: Bass adjustment (±12 dB)
- Slider: Treble adjustment (±12 dB)
- Slider: Volume (power amp gain)
- Display: Level at each stage

Annotations:
- "Mic level: ~-50 dBV"
- "Line level: ~0 dBV"
- "Power amp output: Watts to speaker"
- Clipping indicator if any stage overloads

Default parameters:
- Typical vocal recording chain
- Moderate levels with good headroom

Canvas layout:
- Signal chain diagram: 600 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Amplifier Gain in Filter Circuits

When using active filters, **amplifier gain** becomes a design parameter alongside cutoff frequency.

**First-order active low-pass (inverting):**
\[H(j\omega) = -\frac{R_f/R_i}{1 + j\omega R_f C}\]

- DC gain: \(-R_f/R_i\)
- Cutoff: \(f_c = \frac{1}{2\pi R_f C}\)

**Sallen-Key second-order (unity gain):**

A popular topology for second-order active filters using a single op-amp with gain of 1.

\[f_c = \frac{1}{2\pi\sqrt{R_1 R_2 C_1 C_2}}\]

For equal-value components (\(R_1 = R_2 = R\), \(C_1 = C_2 = C\)):
\[f_c = \frac{1}{2\pi RC}\]

## Practical Design Example

**Design a tone control circuit for a guitar amplifier:**

**Specifications:**

- Bass control: ±15 dB at 100 Hz
- Treble control: ±15 dB at 3 kHz
- Unity gain at 1 kHz (midpoint)

**Approach:**

1. Use shelving filter topology
2. Calculate component values for corner frequencies
3. Add potentiometers for variable boost/cut
4. Buffer input and output with op-amp stages

**Component guidelines:**

- Bass control: RC time constant for ~100 Hz
- Treble control: RC time constant for ~3 kHz
- Use log-taper potentiometers for perceptually linear adjustment

## Self-Check Questions

??? question "1. Design an RC low-pass filter with cutoff frequency 5 kHz. If C = 10 nF, what value of R is needed?"
    Using the cutoff frequency formula:
    \[f_c = \frac{1}{2\pi RC}\]

    Solving for R:
    \[R = \frac{1}{2\pi f_c C} = \frac{1}{2\pi \times 5000 \times 10 \times 10^{-9}}\]
    \[R = \frac{1}{3.14 \times 10^{-4}} = 3183 \text{ Ω}\]

    Use standard value R = 3.3 kΩ (E24 series)

    Actual cutoff with R = 3.3 kΩ:
    \[f_c = \frac{1}{2\pi \times 3300 \times 10 \times 10^{-9}} = 4.82 \text{ kHz}\]

    Close enough for most applications!

??? question "2. A band-pass filter has center frequency 10 kHz and Q = 20. What is the bandwidth?"
    Bandwidth formula:
    \[BW = \frac{f_0}{Q} = \frac{10000}{20} = 500 \text{ Hz}\]

    The filter passes frequencies from approximately:
    - Lower cutoff: \(f_0 - BW/2 = 10000 - 250 = 9750\) Hz
    - Upper cutoff: \(f_0 + BW/2 = 10000 + 250 = 10250\) Hz

    This 500 Hz window centered at 10 kHz is quite narrow, making it useful for selecting a specific frequency.

??? question "3. Why are active filters preferred over passive LC filters at audio frequencies?"
    Several practical reasons favor active filters for audio:

    1. **No inductors:** At audio frequencies (20 Hz - 20 kHz), inductors would need to be very large (henries!) and expensive. Capacitors and op-amps are much cheaper and smaller.

    2. **Gain is possible:** Active filters can amplify the signal while filtering, eliminating the need for separate amplifier stages.

    3. **No loading issues:** Op-amp buffers provide high input impedance and low output impedance, so cascading multiple filter stages doesn't change their individual responses.

    4. **High Q easily achieved:** Getting high Q with passive RLC requires either very large L or very small R, both problematic. Active filters achieve high Q with just RC components.

    5. **Adjustability:** Active filter parameters can be made adjustable with potentiometers without complex switching.

??? question "4. A microphone outputs -50 dBV. What voltage is this, and how much gain (in dB) is needed to reach +4 dBV professional line level?"
    Converting -50 dBV to voltage:
    \[V = 10^{-50/20} \times 1\text{V} = 10^{-2.5} \text{V} = 3.16 \text{ mV}\]

    Gain needed:
    \[\text{Gain (dB)} = +4 - (-50) = 54 \text{ dB}\]

    This is a voltage gain of:
    \[A_V = 10^{54/20} = 10^{2.7} = 501\]

    The microphone preamp needs about 500× voltage gain to bring the signal to professional line level.

## Summary

This chapter equipped you with practical filter design skills:

1. **First-order filters are building blocks** - RC and RL configurations provide -20 dB/decade roll-off

2. **Second-order filters add resonance capability** - RLC circuits can have peaked responses with high Q

3. **Passive filters are simple but limited** - No gain, loading effects, large inductors at low frequencies

4. **Active filters overcome passive limitations** - Gain, no inductors, easy cascading, but need power

5. **Design starts with specifications** - Cutoff frequency, Q, gain, filter type

6. **Standard component values constrain designs** - Adjust calculations to nearest E12 or E24 values

7. **Audio tone controls use shelving filters** - Bass and treble adjust low and high frequencies

8. **Decibel references matter in audio** - dBV and dBu have specific voltage references

9. **Headroom prevents clipping** - Design for adequate margin above normal levels

10. **The signal chain has multiple gain stages** - Microphone to speaker involves several amplification and filtering steps

With these tools, you can design filters for any frequency response specification. Whether you're building an audio equalizer, removing noise from a sensor signal, or selecting a radio channel, the principles are the same: choose the right topology, calculate component values, and verify the response. Filter design is where theory meets practice—and now you're equipped to make it happen.
