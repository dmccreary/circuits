# Audio Applications and Amplifiers

## Summary

This chapter focuses on audio-specific circuit applications, bringing together concepts from throughout the course. Students will learn about audio amplifier types including preamplifiers for low-level signals and power amplifiers for driving speakers. The chapter addresses critical audio quality metrics including signal-to-noise ratio, noise sources, and various forms of distortion. Understanding these concepts enables students to design and evaluate audio circuits that meet professional quality standards.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Audio Amplifier
2. Preamplifier
3. Power Amplifier
4. Signal-to-Noise Ratio
5. Noise Floor
6. Thermal Noise
7. Audio Distortion
8. Harmonic Distortion
9. THD
10. Intermodulation Distortion
11. Clipping

## Prerequisites

This chapter builds on concepts from:

- [Chapter 12: Filters and Resonance](../12-filters-resonance/index.md)
- [Chapter 13: Operational Amplifiers](../13-operational-amplifiers/index.md)
- [Chapter 14: Signal Analysis and Fourier Series](../14-signals-audio-lab/index.md)

---
title: Audio Applications and Amplifiers
description: Design audio circuits including preamplifiers, power amplifiers, and learn to measure audio quality
generated_by: chapter-content-generator v0.03
date: 2026-01-30
---

## Introduction: Making Music with Electrons

Audio electronics bridges the gap between the abstract world of circuits and the visceral experience of sound. When you crank up your favorite song and feel the bass hit your chest, you're experiencing the final output of a carefully designed chain of amplifiers, each contributing to the signal's journey from a tiny electrical impulse to a room-shaking sound wave.

This chapter brings together everything you've learned—op-amps, filters, frequency response, Fourier analysis—and applies it to the specific challenges of audio. We'll explore how preamplifiers handle delicate signals from microphones and guitars, how power amplifiers drive speakers without distortion, and how to measure whether your audio circuit is any good.

The goal isn't just to amplify—it's to amplify *faithfully*. A perfect audio amplifier would be an invisible wire that happens to be louder. Real amplifiers fall short of this ideal in measurable ways, and understanding those shortcomings is the key to designing better ones.

## Audio Amplifiers: The Signal Chain

An **audio amplifier** increases the power of an audio signal—making quiet signals loud enough to drive headphones, speakers, or recording equipment.

**The typical audio signal chain:**

1. **Source** (microphone, instrument, playback device)
2. **Preamplifier** (boosts low-level signals to line level)
3. **Signal processing** (EQ, effects, mixing)
4. **Power amplifier** (drives speakers)
5. **Transducer** (speaker converts electrical to acoustic)

Each stage must preserve signal quality while providing the necessary gain.

### Preamplifier

A **preamplifier** (preamp) amplifies weak signals to a standard "line level" for further processing.

**Input signal levels:**

| Source | Typical Level | Required Gain |
|--------|---------------|---------------|
| Dynamic microphone | -60 dBV (1 mV) | 40-60 dB |
| Condenser microphone | -40 dBV (10 mV) | 20-40 dB |
| Electric guitar | -20 dBV (100 mV) | 10-20 dB |
| CD player | 0 dBV (1 V) | 0 dB (line level) |

**Preamplifier requirements:**

- High input impedance (avoid loading the source)
- Low noise (don't add hiss to quiet signals)
- Adequate gain range
- Low distortion
- Appropriate frequency response (20 Hz - 20 kHz minimum)

**Typical topology:** Inverting or non-inverting op-amp circuit, sometimes with selectable gain.

### Power Amplifier

A **power amplifier** drives loudspeakers, converting a line-level signal into substantial current and voltage swings.

**Power amplifier characteristics:**

| Specification | Typical Values |
|---------------|----------------|
| Input sensitivity | 1-2 V RMS for full output |
| Output power | 10W - 1000W+ |
| Speaker impedance | 4Ω, 8Ω, 16Ω |
| Damping factor | 50-500 (higher = better bass control) |

**Classes of power amplifiers:**

- **Class A:** Always conducting, lowest distortion, lowest efficiency (~25%)
- **Class B:** Each transistor handles half the waveform, higher efficiency (~70%), crossover distortion
- **Class AB:** Combination, reduced crossover distortion, ~60% efficiency
- **Class D:** Switching amplifier, very high efficiency (>90%), requires output filtering

| Class | Efficiency | Distortion | Heat | Typical Use |
|-------|------------|------------|------|-------------|
| A | ~25% | Lowest | High | High-end audio |
| AB | ~60% | Low | Moderate | Most amplifiers |
| D | >90% | Varies | Low | Portable, subwoofers |

#### Diagram: Audio Amplifier Chain

<iframe src="../../sims/audio-amp-chain/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Audio Amplifier Chain</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain the function of each stage in an audio amplifier chain by observing signal levels through the system.

Visual elements:
- Block diagram: Mic → Preamp → Mixer → Power Amp → Speaker
- Level meters at each stage (dBV or dBu)
- Signal waveform display at selected stage
- Gain annotations showing dB boost at each stage
- Clipping indicators

Interactive controls:
- Slider: Input signal level (simulating mic sensitivity)
- Slider: Preamp gain
- Slider: Master volume
- Dropdown: Select stage to view waveform
- Toggle: Show/hide noise floor

Annotations:
- Mic level: "~-50 dBV"
- After preamp: "Line level ~0 dBV"
- Power amp output: "X watts into 8Ω"

Clipping demonstration:
- Overdrive preamp to show soft clipping
- Overdrive power amp to show hard clipping

Default parameters:
- Typical vocal recording chain
- Signal levels showing healthy headroom

Canvas layout:
- Signal chain diagram: 600 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Signal-to-Noise Ratio

**Signal-to-noise ratio (SNR)** measures how much louder the desired signal is compared to the unwanted noise:

\[SNR = 20\log_{10}\left(\frac{V_{signal}}{V_{noise}}\right) \text{ dB}\]

Higher SNR means cleaner sound. For quality audio, you need at least 60 dB; professional equipment aims for 100 dB or more.

### Noise Floor

The **noise floor** is the level of background noise present when no signal is applied—the quietest sound the system can reproduce.

\[\text{Noise Floor (dBV)} = 20\log_{10}(V_{noise,rms})\]

**Typical noise floors:**

| Equipment | Noise Floor |
|-----------|-------------|
| Quiet preamp | -90 to -100 dBV |
| Consumer gear | -80 to -90 dBV |
| Poor equipment | > -70 dBV |

### Thermal Noise

**Thermal noise** (Johnson-Nyquist noise) is fundamental noise caused by random thermal motion of electrons in resistors.

\[V_{noise,rms} = \sqrt{4k_B T R \Delta f}\]

Where:
- \(k_B\) = Boltzmann's constant (1.38 × 10⁻²³ J/K)
- T = Temperature in Kelvin
- R = Resistance in ohms
- Δf = Bandwidth in Hz

**Example:** A 10 kΩ resistor at room temperature (300K) over 20 kHz bandwidth:
\[V_{noise} = \sqrt{4 \times 1.38 \times 10^{-23} \times 300 \times 10000 \times 20000} = 1.8 \text{ μV}\]

This is the absolute minimum noise you'll get from any 10 kΩ resistor—physics says so!

**Reducing thermal noise:**

- Lower resistance values (where practical)
- Narrower bandwidth (filter out frequencies you don't need)
- Lower temperature (cryogenic cooling for extreme cases)

!!! note "Noise Adds as RMS"
    Multiple noise sources add in quadrature (root of sum of squares), not linearly. If you have two equal noise sources, the total noise is only √2 times one source, not 2×.

## Audio Distortion: When Amplifiers Lie

**Distortion** is any change to the signal shape that wasn't intentional. Perfect amplification would multiply the signal by a constant; distortion adds extra components.

### Harmonic Distortion

**Harmonic distortion** adds new frequencies that are multiples of the input signal. If you input a pure 1 kHz tone, harmonic distortion adds 2 kHz, 3 kHz, 4 kHz...

**Sources:**

- Non-linear transistor or op-amp characteristics
- Saturation effects
- Asymmetric clipping

**Even vs. odd harmonics:**

- **Even harmonics** (2nd, 4th, 6th): Often described as "warm" or "musical"
- **Odd harmonics** (3rd, 5th, 7th): Harsher, "edgy" sound

### THD (Total Harmonic Distortion)

**THD** combines all harmonic distortion into one percentage:

\[THD = \frac{\sqrt{V_2^2 + V_3^2 + V_4^2 + ...}}{V_1} \times 100\%\]

Where \(V_1\) is the fundamental and \(V_n\) are harmonic amplitudes.

**THD quality levels:**

| THD | Quality |
|-----|---------|
| < 0.01% | Inaudible, excellent |
| 0.01% - 0.1% | High-quality audio |
| 0.1% - 1% | Acceptable consumer |
| 1% - 5% | Noticeable distortion |
| > 5% | Significant coloration |

### Intermodulation Distortion (IMD)

**Intermodulation distortion** creates new frequencies that are sums and differences of the input frequencies—not harmonically related.

If you input 1 kHz and 1.5 kHz, IMD creates:

- Sum: 2.5 kHz
- Difference: 500 Hz
- And more complex combinations

IMD is particularly objectionable because the new frequencies are *not* harmonically related to the input—they sound dissonant and unnatural.

### Clipping

**Clipping** occurs when the output signal tries to exceed the amplifier's maximum capability (typically the power supply rails).

**Types of clipping:**

- **Hard clipping:** Abrupt flattening at the rail (transistor saturation)
- **Soft clipping:** Gradual rounding as the limit approaches (tube-like)

**Effects:**

- Adds strong harmonic content (odd harmonics for symmetric clipping)
- Creates harsh, buzzing sound at high levels
- Can damage tweeters with excessive high-frequency energy

#### Diagram: Distortion Types Visualizer

<iframe src="../../sims/distortion-types/main.html" width="100%" height="550px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Distortion Types Visualizer</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: compare

Learning Objective: Students will compare different types of audio distortion by observing waveform changes and spectral effects.

Visual elements:
- Input waveform (pure sine)
- Output waveform (with distortion)
- Frequency spectrum showing added harmonics
- THD percentage display
- IMD product identification (for two-tone test)

Interactive controls:
- Dropdown: Distortion type (none, soft clip, hard clip, asymmetric, IMD)
- Slider: Input level (drive into distortion)
- Slider: Distortion amount (for adjustable types)
- Toggle: Single tone vs two-tone (for IMD)
- Audio playback option (if available)

For each distortion type:
- Waveform showing the specific effect
- Spectrum showing added frequencies
- THD calculation

Annotations:
- "Harmonic content added" for THD
- "Non-harmonic products" for IMD
- "Clipping at rails" for hard clipping

Default parameters:
- Soft clipping
- Moderate drive level
- 1 kHz test tone

Canvas layout:
- Waveforms: 300 × 200 pixels (stacked)
- Spectrum: 300 × 300 pixels (side)
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Measuring Audio Quality

**Key audio measurements:**

| Specification | What It Measures | Typical Target |
|---------------|------------------|----------------|
| THD | Harmonic distortion | < 0.1% |
| THD+N | Distortion plus noise | < 0.1% |
| SNR | Signal vs. noise | > 90 dB |
| Dynamic range | Loudest to quietest | > 90 dB |
| Frequency response | Gain flatness | ±0.5 dB, 20 Hz-20 kHz |
| Crosstalk | Channel separation | > 60 dB |

**Test signals:**

- **1 kHz sine:** Standard for THD, SNR measurements
- **Two-tone (e.g., 60 Hz + 7 kHz):** Reveals IMD
- **Swept sine:** Maps frequency response
- **Pink noise:** Tests full spectrum, sounds balanced to ear

## Practical Design Considerations

### Grounding and Shielding

- **Star grounding:** All grounds connect at one point to avoid ground loops
- **Shielded cables:** For low-level signals susceptible to interference
- **Balanced connections:** Cancel induced noise (professional audio)

### Power Supply Rejection

Op-amps and power supplies add noise/ripple. Choose components with good PSRR (Power Supply Rejection Ratio).

### Component Selection

- **Low-noise op-amps:** For preamp stages (e.g., NE5532, OPA2134)
- **Low-tolerance resistors:** 1% metal film for consistent gain
- **Quality capacitors:** Film or ceramic for signal path, not electrolytic

## Self-Check Questions

??? question "1. A microphone outputs 2 mV RMS. What preamp gain (in dB) is needed to reach line level of 1V RMS?"
    Gain required:
    \[A = \frac{V_{out}}{V_{in}} = \frac{1\text{V}}{2\text{mV}} = 500\]

    In decibels:
    \[A_{dB} = 20\log_{10}(500) = 20 \times 2.7 = 54 \text{ dB}\]

    The preamp needs about 54 dB of gain.

??? question "2. An amplifier has THD of 0.5%. If the fundamental is 2V RMS, what is the total RMS voltage of all harmonics?"
    THD is defined as:
    \[THD = \frac{V_{harmonics}}{V_{fundamental}}\]

    Therefore:
    \[V_{harmonics} = THD \times V_{fundamental} = 0.005 \times 2\text{V} = 10 \text{ mV}\]

    The combined harmonic content is 10 mV RMS.

??? question "3. Why is intermodulation distortion often considered more objectionable than harmonic distortion?"
    Harmonic distortion produces frequencies that are integer multiples of the input—these are musically related and can sound like a richer version of the original.

    Intermodulation distortion produces sum and difference frequencies that are NOT harmonically related to either input tone. For example, 1 kHz + 1.5 kHz creates 500 Hz and 2.5 kHz—frequencies that have no musical relationship to the originals.

    These inharmonic products sound dissonant and "dirty," making IMD more subjectively unpleasant even at the same percentage level as THD.

??? question "4. What's the theoretical thermal noise from a 1 kΩ resistor at 25°C over a 20 kHz audio bandwidth?"
    Using the thermal noise formula:
    \[V_{noise} = \sqrt{4k_B T R \Delta f}\]

    With T = 298K (25°C), R = 1000Ω, Δf = 20,000 Hz:
    \[V_{noise} = \sqrt{4 \times 1.38 \times 10^{-23} \times 298 \times 1000 \times 20000}\]
    \[V_{noise} = \sqrt{3.3 \times 10^{-13}} = 0.57 \text{ μV}\]

    This is the minimum noise floor imposed by physics—no amplifier can be quieter than this with a 1 kΩ source impedance.

## Summary

Audio circuit design combines all your circuit skills with the specific requirements of human hearing:

1. **Audio amplifiers form a chain** - From microphone level through preamp to power amp to speaker

2. **Preamplifiers handle weak signals** - High gain, low noise, high input impedance

3. **Power amplifiers drive speakers** - High current, various efficiency classes

4. **SNR measures signal quality** - Higher is better; 90+ dB is professional grade

5. **Thermal noise sets the theoretical limit** - It's fundamental physics, not poor design

6. **Harmonic distortion adds multiples** - Even harmonics sound warmer than odd

7. **THD quantifies total harmonic distortion** - Under 0.1% is high quality

8. **IMD creates non-harmonic frequencies** - Often more objectionable than THD

9. **Clipping is the ultimate distortion** - Occurs when the amplifier runs out of headroom

10. **Good design minimizes noise and distortion** - Component selection, grounding, and shielding all matter

Audio electronics is where engineering meets art. The specifications tell part of the story, but ultimately, audio circuits are judged by how they sound. Understanding the science behind sound quality gives you the tools to design circuits that not only measure well but sound great too.
