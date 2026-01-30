# AC Signals and Sinusoidal Waveforms

## Summary

This chapter introduces alternating current (AC) and the sinusoidal waveforms that are fundamental to power systems and signal processing. Students will learn to characterize sinusoids by their amplitude, frequency, period, and phase, and understand the relationships between these parameters. The chapter covers important measurement quantities including peak, peak-to-peak, RMS, and average values. Complex numbers are introduced as the mathematical foundation for phasor analysis in the next chapter.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

1. Alternating Current
2. Sinusoidal Waveform
3. Complex Numbers
4. Rectangular Form
5. Polar Form
6. Euler's Formula
7. Signal
8. Periodic Signal
9. Aperiodic Signal
10. Time Domain
11. Frequency Domain
12. DC Component
13. AC Component
14. Signal Amplitude
15. Crest Factor
16. Form Factor
17. Voltage Gain
18. Current Gain

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Electric Charge and Basic Circuit Quantities](../01-electric-charge-basic-quantities/index.md)
- [Chapter 5: Passive Components: Resistors, Capacitors, and Inductors](../05-passive-components/index.md)

---
title: AC Signals and Sinusoidal Waveforms
description: Master alternating current, sinusoidal analysis, complex numbers, and signal characterization
generated_by: chapter-content-generator v0.03
date: 2026-01-30
---

## Introduction: Why the World Runs on Waves

Walk into any room, flip a light switch, and you're tapping into a global network of energy that flows back and forth, back and forth—60 times per second in the Americas, 50 times per second in most of the rest of the world. This isn't a design flaw or a compromise; it's a deliberate choice that makes modern electrical power possible.

Welcome to the world of **alternating current (AC)**, where voltages and currents don't just sit there—they *dance*. They follow a graceful sinusoidal pattern, the smoothest curve mathematics can produce, and this simple waveform turns out to be absurdly useful for everything from power transmission to radio communication to music recording.

In this chapter, you'll learn to describe these dancing signals mathematically, extract meaningful measurements from them, and prepare for the powerful analytical tools (phasors!) that make AC circuit analysis surprisingly elegant. You'll also meet complex numbers—not because we want to make your life complicated, but because they make *this* math beautifully simple.

## Alternating Current: The Back-and-Forth Flow

**Alternating current (AC)** is electric current that periodically reverses direction. Unlike direct current (DC), where electrons flow steadily in one direction like a river, AC electrons shuffle back and forth like commuters in a subway car.

**Why does AC dominate power systems?**

1. **Transformers work with AC** - Voltage can be stepped up for efficient long-distance transmission, then stepped down for safe household use
2. **Generation is natural** - Rotating generators naturally produce sinusoidal AC
3. **Motors are simpler** - AC induction motors have no brushes or commutators to wear out
4. **Switching is easier** - AC crosses through zero every half-cycle, making circuit breakers more effective

| Characteristic | DC | AC |
|----------------|----|----|
| Direction | Constant | Reverses periodically |
| Voltage transformation | Difficult | Easy (transformers) |
| Long-distance transmission | High losses | Low losses (high voltage) |
| Storage | Batteries | Requires conversion |
| Generation | Requires rectification | Natural (rotating machines) |

**The great AC/DC debate:** Thomas Edison championed DC, while Nikola Tesla and George Westinghouse promoted AC. AC won for power distribution because transformers allowed high-voltage transmission with low losses. DC has made a comeback in some applications (data centers, solar panels, electric vehicles) but AC still reigns for the grid.

## Sinusoidal Waveforms: Nature's Favorite Curve

A **sinusoidal waveform** (or sinusoid) is a mathematical curve describing smooth, repetitive oscillation. It's defined by the sine or cosine function:

\[v(t) = V_m \sin(\omega t + \phi)\]

Or equivalently:

\[v(t) = V_m \cos(\omega t + \phi - 90°)\]

Where:

- \(V_m\) = Peak amplitude (maximum value)
- \(\omega\) = Angular frequency in rad/s (\(\omega = 2\pi f\))
- \(t\) = Time in seconds
- \(\phi\) = Phase angle in radians (or degrees)

**Why sinusoids are special:**

1. **Derivatives and integrals are sinusoids** - The derivative of a sine is a cosine, and vice versa. This makes differential equations much easier!
2. **Sinusoids through linear systems remain sinusoids** - Only the amplitude and phase change, not the shape
3. **Any periodic signal can be built from sinusoids** - Fourier showed that any repeating waveform is just a sum of sinusoids at different frequencies

| Parameter | Symbol | Formula | Units |
|-----------|--------|---------|-------|
| Peak amplitude | \(V_m\), \(I_m\) | Maximum value | V, A |
| Angular frequency | \(\omega\) | \(2\pi f\) | rad/s |
| Frequency | \(f\) | \(1/T\) | Hz |
| Period | \(T\) | \(1/f\) | s |
| Phase | \(\phi\) | Angle offset | rad or ° |

#### Diagram: Sinusoidal Waveform Anatomy

<iframe src="../../sims/sinusoid-anatomy/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Sinusoidal Waveform Anatomy</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain the relationship between sinusoidal parameters (amplitude, frequency, phase) and the resulting waveform shape.

Visual elements:
- Main plot: Sinusoidal waveform v(t) vs time
- Amplitude markers: Peak-to-peak, peak, RMS shown as horizontal lines
- Period marker: Arrow spanning one complete cycle
- Phase reference: Vertical line at t=0 showing phase offset
- Mathematical formula displayed and updated in real-time
- Zero crossings highlighted

Interactive controls:
- Slider: Amplitude Vm (1V to 10V)
- Slider: Frequency f (1Hz to 100Hz, or period T)
- Slider: Phase φ (-180° to +180°)
- Toggle: Show/hide RMS level
- Toggle: Show sine or cosine reference
- Display: Current formula with values

Annotations:
- "Period T = 1/f" spanning one cycle
- "Peak Vm" at maximum point
- "Phase shift" showing offset from reference

Default parameters:
- Vm = 5V
- f = 10Hz
- φ = 0°

Canvas layout:
- Plot area: 600 × 350 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

### Amplitude Measurements

Different applications require different ways of characterizing amplitude:

**Peak Value (\(V_p\) or \(V_m\)):** The maximum instantaneous value from zero
\[V_p = V_m\]

**Peak-to-Peak Value (\(V_{pp}\)):** The total swing from minimum to maximum
\[V_{pp} = 2V_m\]

**RMS Value (\(V_{rms}\)):** The "equivalent DC" value for power calculations
\[V_{rms} = \frac{V_m}{\sqrt{2}} \approx 0.707 \times V_m\]

**Average Value (\(V_{avg}\)):** The mean value over one half-cycle (full-cycle average is zero!)
\[V_{avg} = \frac{2V_m}{\pi} \approx 0.637 \times V_m\]

| Measurement | Formula | For 120V RMS Wall Outlet |
|-------------|---------|-------------------------|
| RMS | \(V_{rms}\) | 120 V |
| Peak | \(V_m = \sqrt{2} \times V_{rms}\) | 170 V |
| Peak-to-Peak | \(V_{pp} = 2V_m\) | 340 V |
| Average (half-cycle) | \(V_{avg} = 2V_m/\pi\) | 108 V |

!!! tip "Why RMS Matters"
    RMS (Root Mean Square) is the most important AC measurement because it directly relates to power. A 120V RMS AC source delivers the same heating power to a resistor as a 120V DC source. This is why your wall outlet is rated at 120V RMS—that's the effective voltage for power delivery.

### Frequency and Period

**Frequency (\(f\))** tells you how many complete cycles occur per second:
\[f = \frac{1}{T} \text{ Hz}\]

**Period (\(T\))** is the time for one complete cycle:
\[T = \frac{1}{f} \text{ seconds}\]

**Angular frequency (\(\omega\))** converts frequency to radians:
\[\omega = 2\pi f \text{ rad/s}\]

| Standard | Frequency | Period | Angular Frequency |
|----------|-----------|--------|-------------------|
| US Power | 60 Hz | 16.67 ms | 377 rad/s |
| EU Power | 50 Hz | 20 ms | 314 rad/s |
| Audio (A4) | 440 Hz | 2.27 ms | 2,765 rad/s |
| AM Radio | 1 MHz | 1 μs | 6.28 × 10⁶ rad/s |
| WiFi | 2.4 GHz | 0.42 ns | 1.51 × 10¹⁰ rad/s |

### Phase: The Starting Point

**Phase (\(\phi\))** describes where the waveform starts at time \(t = 0\). Two signals with the same frequency but different phases are said to be "out of phase."

**Phase relationships:**

- **In phase** (\(\phi = 0°\)): Peaks align
- **90° out of phase** (quadrature): One peaks when the other crosses zero
- **180° out of phase** (antiphase): Peaks of one align with troughs of the other

\[v_1(t) = V_m \sin(\omega t)\]
\[v_2(t) = V_m \sin(\omega t + 90°) = V_m \cos(\omega t)\]

When we say "\(v_2\) leads \(v_1\) by 90°," we mean \(v_2\) reaches its peak earlier in time.

#### Diagram: Phase Relationship Visualizer

<iframe src="../../sims/phase-relationship/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Phase Relationship Visualizer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: compare

Learning Objective: Students will compare two sinusoidal signals with different phase relationships and interpret leading/lagging terminology.

Visual elements:
- Dual waveform plot showing two signals (blue and red)
- Reference signal (blue): v₁(t) = Vm sin(ωt)
- Phase-shifted signal (red): v₂(t) = Vm sin(ωt + φ)
- Phase angle marked between corresponding points
- Phasor diagram showing both signals as rotating vectors
- "Leads" or "Lags" label indicating relationship

Interactive controls:
- Slider: Phase difference φ (-180° to +180°)
- Button: Quick select: 0°, 90°, 180°, -90°
- Toggle: Show/hide phasor diagram
- Toggle: Animate phasor rotation
- Display: Phase relationship description

Visual feedback:
- φ > 0: "Signal 2 LEADS signal 1 by φ°"
- φ < 0: "Signal 2 LAGS signal 1 by |φ|°"
- φ = 0: "Signals are IN PHASE"
- φ = ±180°: "Signals are in ANTIPHASE"

Default parameters:
- φ = 45° (signal 2 leads)
- Same amplitude for both signals
- f = 5 Hz for visible animation

Canvas layout:
- Waveform plot: 400 × 300 pixels
- Phasor diagram: 200 × 300 pixels (side)
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Signals: The Language of Information

A **signal** is any quantity that varies with time and conveys information. Signals are everywhere:

- Voltage from a microphone (audio signal)
- Current through a sensor (measurement signal)
- Digital bits on a network cable (data signal)
- Your heartbeat as recorded by an ECG (biosignal)

### Periodic and Aperiodic Signals

**Periodic signal:** A signal that repeats exactly after a fixed time interval (the period T).
\[x(t) = x(t + T) \text{ for all } t\]

Examples: Power line voltage, clock signals, musical tones

**Aperiodic signal:** A signal that doesn't repeat (or only exists for a finite duration).

Examples: Single pulse, speech, transients, noise

| Signal Type | Mathematical Property | Examples |
|-------------|----------------------|----------|
| Periodic | \(x(t) = x(t+T)\) | Sine wave, square wave, clock |
| Aperiodic | No repetition | Pulse, noise, speech |
| Continuous | Defined for all t | Analog audio |
| Discrete | Defined at sample points | Digital audio |

### DC and AC Components

Any signal can be decomposed into:

**DC Component:** The average (constant) value of the signal
\[V_{DC} = \frac{1}{T}\int_0^T v(t) \, dt\]

**AC Component:** The time-varying part that oscillates around the DC level
\[v_{AC}(t) = v(t) - V_{DC}\]

A pure sinusoid centered at zero has no DC component. Add a constant offset, and you've introduced DC:

\[v(t) = V_{DC} + V_m \sin(\omega t)\]

This decomposition is crucial in electronics:

- Power supplies filter out AC ripple to produce clean DC
- Coupling capacitors block DC while passing AC signals
- Bias circuits add DC offsets to center signals in their operating range

#### Diagram: DC and AC Component Separator

<iframe src="../../sims/dc-ac-separator/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>DC and AC Component Separator</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: classify

Learning Objective: Students will classify signal components as DC or AC by observing how a composite signal can be separated into its constant and varying parts.

Visual elements:
- Top plot: Original composite signal v(t) = V_DC + Vm sin(ωt)
- Middle plot: DC component only (horizontal line at V_DC)
- Bottom plot: AC component only (sinusoid centered at zero)
- Visual arrows showing extraction
- Coupling capacitor icon showing "blocks DC, passes AC"

Interactive controls:
- Slider: DC offset V_DC (0 to 5V)
- Slider: AC amplitude Vm (0 to 5V)
- Slider: Frequency f (1Hz to 20Hz)
- Toggle: Show/hide component labels
- Display: Calculated values for DC and AC RMS

Annotations:
- "Average value = DC component"
- "Oscillation around average = AC component"
- Formula showing v(t) = V_DC + v_AC(t)

Default parameters:
- V_DC = 2.5V
- Vm = 2V
- f = 5Hz

Canvas layout:
- Three stacked plot areas: 600 × 120 pixels each
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Time Domain and Frequency Domain: Two Perspectives

Every signal can be viewed from two complementary perspectives:

**Time Domain:** Shows how the signal varies over time. The x-axis is time, and you see the actual waveform shape.

**Frequency Domain:** Shows what frequencies are present in the signal. The x-axis is frequency, and you see the spectrum—which sinusoids combine to create the signal.

Think of it like describing a musical chord:

- **Time domain:** The actual sound wave shape—complicated!
- **Frequency domain:** A list of notes being played—C, E, G (a C major chord)

The transformation between these views is called the **Fourier Transform**, and it's one of the most powerful tools in engineering. We'll explore this more in Chapter 14, but for now, understand that:

- A pure sinusoid appears as a single spike in the frequency domain
- A complex wave appears as multiple spikes (multiple frequency components)
- The frequency domain reveals information hidden in the time domain

| Domain | X-axis | Y-axis | Shows |
|--------|--------|--------|-------|
| Time | Time (s) | Amplitude (V) | Waveform shape, timing |
| Frequency | Frequency (Hz) | Amplitude (V) | Spectral content, harmonics |

#### Diagram: Time Domain vs Frequency Domain

<iframe src="../../sims/time-frequency-domain/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Time Domain vs Frequency Domain</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how time domain waveforms correspond to frequency domain spectra by observing simple sinusoids and their spectral representations.

Visual elements:
- Left panel: Time domain plot v(t) vs t
- Right panel: Frequency domain spectrum |V(f)| vs f
- For composite signals: show individual components in different colors
- Spectral lines with amplitude markers
- Animation showing how adding sinusoids builds complex waves

Step-through mode:
- Stage 1: Single sinusoid → single spectral line
- Stage 2: Two sinusoids → two spectral lines
- Stage 3: Three sinusoids → three lines, complex time waveform
- Stage 4: Many sinusoids → approaching square wave

Interactive controls:
- Dropdown: Signal type (single sine, two sines, square wave approximation)
- Slider: Fundamental frequency f₁ (1-20 Hz)
- Slider: Number of harmonics (for square wave)
- Button: Step through / Animate
- Toggle: Show individual components

Annotations:
- "Time domain shows SHAPE"
- "Frequency domain shows CONTENT"

Default parameters:
- Single sinusoid at 5 Hz
- Step-through mode active

Canvas layout:
- Two side-by-side plots: 300 × 350 pixels each
- Control area: 100 pixels below

Instructional Rationale: Step-through helps students see the one-to-one correspondence between time and frequency representations.

Implementation: p5.js
</details>

## Complex Numbers: Your New Best Friend

If you've been dreading complex numbers, prepare for a surprise: they're going to make your life *easier*. Complex numbers provide a compact way to represent both magnitude and phase in a single mathematical object.

**Definition:** A complex number \(z\) has a real part and an imaginary part:
\[z = a + jb\]

Where:

- \(a\) = Real part (\(\text{Re}(z)\))
- \(b\) = Imaginary part (\(\text{Im}(z)\))
- \(j = \sqrt{-1}\) (Engineers use \(j\) because \(i\) is reserved for current!)

**Why complex numbers for AC circuits?**

- Sinusoids at the same frequency can be represented as complex numbers called phasors
- Adding sinusoids becomes adding complex numbers (simple!)
- Differentiation and integration become multiplication and division (even simpler!)
- Circuit analysis with complex impedances follows all the DC rules you already know

### Rectangular Form

**Rectangular form** (or Cartesian form) expresses a complex number as:
\[z = a + jb\]

This form is best for:

- Addition and subtraction
- Visualizing real and imaginary parts separately

**Operations in rectangular form:**

Addition: \((a_1 + jb_1) + (a_2 + jb_2) = (a_1 + a_2) + j(b_1 + b_2)\)

Subtraction: \((a_1 + jb_1) - (a_2 + jb_2) = (a_1 - a_2) + j(b_1 - b_2)\)

Multiplication: \((a_1 + jb_1)(a_2 + jb_2) = (a_1 a_2 - b_1 b_2) + j(a_1 b_2 + a_2 b_1)\)

### Polar Form

**Polar form** expresses a complex number using magnitude and angle:
\[z = r \angle \theta = r(\cos\theta + j\sin\theta)\]

Where:

- \(r = |z| = \sqrt{a^2 + b^2}\) (magnitude)
- \(\theta = \tan^{-1}(b/a)\) (angle or argument)

This form is best for:

- Multiplication and division
- Representing phasors (sinusoid magnitude and phase)

**Operations in polar form:**

Multiplication: \(r_1 \angle \theta_1 \times r_2 \angle \theta_2 = r_1 r_2 \angle (\theta_1 + \theta_2)\)

Division: \(\frac{r_1 \angle \theta_1}{r_2 \angle \theta_2} = \frac{r_1}{r_2} \angle (\theta_1 - \theta_2)\)

**Converting between forms:**

| From | To | Formulas |
|------|-----|----------|
| Rectangular | Polar | \(r = \sqrt{a^2+b^2}\), \(\theta = \tan^{-1}(b/a)\) |
| Polar | Rectangular | \(a = r\cos\theta\), \(b = r\sin\theta\) |

!!! tip "Choosing the Right Form"
    Use rectangular form for addition/subtraction, polar form for multiplication/division. Your calculator can switch between them, but understanding both builds intuition for what complex numbers represent.

#### Diagram: Complex Number Visualizer

<iframe src="../../sims/complex-number-viz/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Complex Number Visualizer</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate complex number conversions between rectangular and polar forms using the complex plane visualization.

Visual elements:
- Complex plane with real (x) and imaginary (y) axes
- Point representing complex number z
- Vector from origin to point showing magnitude
- Angle arc showing θ
- Projections onto real and imaginary axes
- Both rectangular and polar forms displayed

Interactive controls:
- Mode toggle: "Enter rectangular" vs "Enter polar"
- Rectangular mode: Sliders for a (-5 to 5) and b (-5 to 5)
- Polar mode: Sliders for r (0 to 7) and θ (-180° to 180°)
- Button: Generate random number (quiz mode)
- Display: Both forms shown with live updates

Conversion formulas shown:
- r = √(a² + b²) with calculation
- θ = tan⁻¹(b/a) with quadrant adjustment
- a = r cos(θ) with calculation
- b = r sin(θ) with calculation

Visual feedback:
- Dotted lines showing projections
- Color coding: real part (blue), imaginary part (green)
- Magnitude shown as red vector

Default parameters:
- z = 3 + j4 (classic 3-4-5 triangle)
- Shows r = 5, θ = 53.13°

Canvas layout:
- Complex plane: 400 × 400 pixels
- Control/display panel: 200 × 400 pixels (side)
- Control area: 100 pixels below

Implementation: p5.js
</details>

### Euler's Formula: The Bridge Between Worlds

**Euler's formula** is one of the most beautiful equations in mathematics:

\[e^{j\theta} = \cos\theta + j\sin\theta\]

This connects exponentials with trigonometry, allowing us to write complex numbers as:

\[z = re^{j\theta}\]

**Why this matters for circuits:**

The sinusoid \(v(t) = V_m \cos(\omega t + \phi)\) can be written as:

\[v(t) = \text{Re}\{V_m e^{j(\omega t + \phi)}\}\]

This exponential form makes differentiation trivial:

\[\frac{d}{dt}e^{j\omega t} = j\omega e^{j\omega t}\]

Differentiation just multiplies by \(j\omega\)! This is why complex exponentials (and phasors) are so powerful for AC analysis.

**Euler's identity** (the "most beautiful equation"):
\[e^{j\pi} + 1 = 0\]

This single equation connects five fundamental constants: \(e\), \(j\), \(\pi\), 1, and 0.

| Form | Expression | Best for |
|------|------------|----------|
| Rectangular | \(a + jb\) | Addition, subtraction |
| Polar | \(r \angle \theta\) | Multiplication, division |
| Exponential | \(re^{j\theta}\) | Calculus, phasor analysis |

#### Diagram: Euler's Formula on the Unit Circle

<iframe src="../../sims/euler-circle/main.html" width="100%" height="450px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Euler's Formula on the Unit Circle</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how Euler's formula relates rotating phasors to sinusoidal projections by observing the unit circle animation.

Visual elements:
- Unit circle on complex plane
- Rotating phasor e^(jωt) as animated vector
- Projection onto real axis: cos(ωt)
- Projection onto imaginary axis: sin(ωt)
- Side plots showing cos and sin waveforms being traced
- Current angle θ displayed

Step-through or animation mode:
- Step through key angles: 0°, 30°, 45°, 60°, 90°, 180°, 270°, 360°
- Or continuous rotation at adjustable speed

Interactive controls:
- Button: Step / Animate
- Slider: Rotation speed (when animating)
- Button: Reset to 0°
- Toggle: Show/hide projection waveforms
- Display: e^(jθ) = cos(θ) + j·sin(θ) with values

Visual annotations:
- "Real part = cos(θ)" on horizontal projection
- "Imaginary part = sin(θ)" on vertical projection
- Formula: e^(jθ) = cos(θ) + j sin(θ)

Default parameters:
- Step mode starting at θ = 0°
- Unit magnitude (r = 1)

Canvas layout:
- Unit circle: 350 × 350 pixels
- Side waveform plots: 250 × 175 pixels (stacked)
- Control area: 100 pixels below

Instructional Rationale: Step-through reveals the fundamental connection between rotating vectors and sinusoidal waveforms.

Implementation: p5.js
</details>

## Signal Amplitude: Beyond Peak Values

We've already introduced peak, peak-to-peak, RMS, and average values. Now let's look at two ratios that characterize waveform shape:

### Crest Factor

**Crest factor** (or peak factor) is the ratio of peak value to RMS value:
\[CF = \frac{V_{peak}}{V_{RMS}}\]

For a pure sinusoid:
\[CF = \frac{V_m}{V_m/\sqrt{2}} = \sqrt{2} \approx 1.414\]

Crest factor tells you how "peaky" a waveform is:

| Waveform | Crest Factor |
|----------|--------------|
| DC | 1.00 |
| Sine wave | 1.414 |
| Square wave | 1.00 |
| Triangle wave | 1.73 |
| Pulse (10% duty) | 3.16 |

**Why crest factor matters:**

- High crest factor signals stress components more than their RMS value suggests
- Amplifiers must handle peak values without clipping
- Power supplies must provide headroom for peaks

### Form Factor

**Form factor** is the ratio of RMS value to average (rectified) value:
\[FF = \frac{V_{RMS}}{V_{avg}}\]

For a pure sinusoid:
\[FF = \frac{V_m/\sqrt{2}}{2V_m/\pi} = \frac{\pi}{2\sqrt{2}} \approx 1.111\]

| Waveform | Form Factor |
|----------|-------------|
| Sine wave | 1.111 |
| Square wave | 1.00 |
| Triangle wave | 1.155 |
| Sawtooth wave | 1.155 |

Form factor describes the "fullness" of a waveform. A square wave fills every moment at maximum, giving it a form factor of 1. A sine wave has "wasted" area near zero crossings.

## Voltage Gain and Current Gain

**Gain** measures how much a circuit amplifies (or attenuates) a signal:

**Voltage gain:**
\[A_V = \frac{V_{out}}{V_{in}}\]

**Current gain:**
\[A_I = \frac{I_{out}}{I_{in}}\]

**Power gain:**
\[A_P = \frac{P_{out}}{P_{in}} = A_V \times A_I\]

Gain can be:

- Greater than 1: Amplification
- Equal to 1: Unity gain (buffer)
- Less than 1: Attenuation
- Negative: Signal inversion (180° phase shift)

**Decibel notation** is often used because:

- Large gain ranges become manageable numbers
- Cascaded gains add instead of multiply

\[A_V(dB) = 20\log_{10}|A_V|\]
\[A_P(dB) = 10\log_{10}|A_P|\]

| Voltage Gain | Decibels | Description |
|--------------|----------|-------------|
| 1000 | 60 dB | High amplification |
| 100 | 40 dB | Strong amplification |
| 10 | 20 dB | Moderate amplification |
| 1 | 0 dB | Unity |
| 0.1 | -20 dB | Moderate attenuation |
| 0.01 | -40 dB | Strong attenuation |

#### Diagram: Gain and Decibel Converter

<iframe src="../../sims/gain-db-converter/main.html" width="100%" height="400px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Gain and Decibel Converter</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate conversions between linear gain and decibel notation for voltage and power gains.

Visual elements:
- Input signal representation (fixed amplitude)
- Output signal representation (scaled by gain)
- Visual comparison of input vs output amplitudes
- Logarithmic scale showing dB relationship
- Bidirectional conversion display

Interactive controls:
- Toggle: Enter as "Linear gain" or "Decibels"
- Slider: Gain value (0.001 to 1000, logarithmic)
- Toggle: Voltage gain or Power gain mode
- Display: Both linear and dB values

Calculations shown:
- Voltage: dB = 20 log₁₀(A_V)
- Power: dB = 10 log₁₀(A_P)
- Inverse formulas for conversion

Quick reference displayed:
- ×2 = +6 dB (voltage), +3 dB (power)
- ×10 = +20 dB (voltage), +10 dB (power)
- ×0.5 = -6 dB (voltage), -3 dB (power)

Default parameters:
- Voltage gain mode
- A_V = 10 (20 dB)

Canvas layout:
- Signal visualization: 300 × 200 pixels
- Conversion display: 300 × 200 pixels
- Control area: 100 pixels below

Implementation: p5.js
</details>

## Worked Example: Characterizing an AC Signal

Let's put it all together with a practical example.

**Problem:** A voltage signal is measured as:
\[v(t) = 3 + 5\sin(2\pi \cdot 60 \cdot t + 30°) \text{ V}\]

Find: DC component, AC amplitude, frequency, period, RMS value (total), peak value (total), and crest factor.

**Solution:**

**DC Component:**
\[V_{DC} = 3 \text{ V}\]

**AC Amplitude (peak):**
\[V_m = 5 \text{ V}\]

**Frequency:**
The argument of sine is \(2\pi \cdot 60 \cdot t\), so \(\omega = 2\pi \cdot 60\) rad/s
\[f = 60 \text{ Hz}\]

**Period:**
\[T = \frac{1}{f} = \frac{1}{60} = 16.67 \text{ ms}\]

**RMS of AC component only:**
\[V_{AC,rms} = \frac{V_m}{\sqrt{2}} = \frac{5}{\sqrt{2}} = 3.54 \text{ V}\]

**Total RMS value** (DC + AC):
\[V_{rms,total} = \sqrt{V_{DC}^2 + V_{AC,rms}^2} = \sqrt{3^2 + 3.54^2} = \sqrt{9 + 12.5} = 4.64 \text{ V}\]

**Peak value (total):**
\[V_{peak} = V_{DC} + V_m = 3 + 5 = 8 \text{ V}\]

**Minimum value:**
\[V_{min} = V_{DC} - V_m = 3 - 5 = -2 \text{ V}\]

**Crest factor:**
\[CF = \frac{V_{peak}}{V_{rms,total}} = \frac{8}{4.64} = 1.72\]

Note that the crest factor is higher than a pure sinusoid (1.414) because the DC offset pushes the peak higher relative to the RMS value.

## Complex Number Operations: Practice

**Example 1: Addition (use rectangular form)**

Add \(z_1 = 3 + j4\) and \(z_2 = 2 - j5\):

\[z_1 + z_2 = (3 + 2) + j(4 - 5) = 5 - j1\]

**Example 2: Multiplication (use polar form)**

Multiply \(z_1 = 5\angle 53.13°\) and \(z_2 = 3\angle -30°\):

\[z_1 \times z_2 = (5 \times 3)\angle(53.13° - 30°) = 15\angle 23.13°\]

**Example 3: Division (use polar form)**

Divide \(z_1 = 10\angle 60°\) by \(z_2 = 2\angle 15°\):

\[\frac{z_1}{z_2} = \frac{10}{2}\angle(60° - 15°) = 5\angle 45°\]

**Example 4: Convert and multiply**

Multiply \(z_1 = 3 + j4\) and \(z_2 = 1 + j1\):

First convert to polar:
- \(z_1 = 5\angle 53.13°\)
- \(z_2 = \sqrt{2}\angle 45°\)

Then multiply:
\[z_1 \times z_2 = 5\sqrt{2}\angle 98.13° = 7.07\angle 98.13°\]

Convert back to rectangular if needed:
\[z = 7.07(\cos 98.13° + j\sin 98.13°) = -1 + j7\]

You can verify: \((3 + j4)(1 + j1) = 3 + j3 + j4 + j^2 4 = 3 + j7 - 4 = -1 + j7\) ✓

## Self-Check Questions

??? question "1. A sinusoidal voltage has a peak value of 170V and a frequency of 60 Hz. Write its time-domain expression (assuming zero phase) and calculate its RMS value."
    Time-domain expression:
    \[v(t) = 170\sin(2\pi \cdot 60 \cdot t) = 170\sin(377t) \text{ V}\]

    RMS value:
    \[V_{rms} = \frac{V_m}{\sqrt{2}} = \frac{170}{\sqrt{2}} = 120.2 \text{ V}\]

    This is actually the standard US wall outlet specification: 120V RMS with 170V peak at 60 Hz!

??? question "2. Convert z = 5 - j12 to polar form."
    Magnitude:
    \[r = \sqrt{5^2 + (-12)^2} = \sqrt{25 + 144} = \sqrt{169} = 13\]

    Angle (note: the point is in the fourth quadrant):
    \[\theta = \tan^{-1}\left(\frac{-12}{5}\right) = \tan^{-1}(-2.4) = -67.38°\]

    Polar form:
    \[z = 13\angle -67.38°\]

    Or in exponential form:
    \[z = 13e^{-j67.38°}\]

??? question "3. Two voltage sources are v₁(t) = 10sin(ωt) and v₂(t) = 10sin(ωt + 90°). What is the phase relationship between them?"
    Signal v₂ has a phase of +90° relative to v₁.

    Since v₂ has a positive phase angle (leading angle), **v₂ leads v₁ by 90°**.

    Equivalently, **v₁ lags v₂ by 90°**.

    At any instant, v₂ reaches its peak 1/4 of a period earlier than v₁. When v₁ is at zero (crossing positive), v₂ is at its positive peak.

    Note: v₂(t) = 10sin(ωt + 90°) = 10cos(ωt), so this is the classic sine-cosine relationship.

??? question "4. An amplifier has a voltage gain of 40 dB. What is the linear voltage gain? If the input is 10 mV RMS, what is the output?"
    Convert dB to linear gain:
    \[A_V = 10^{(40/20)} = 10^2 = 100\]

    Output voltage:
    \[V_{out} = A_V \times V_{in} = 100 \times 10 \text{ mV} = 1000 \text{ mV} = 1 \text{ V RMS}\]

    The amplifier increases the signal by a factor of 100, turning a 10 mV signal into 1 V.

## Summary

This chapter introduced the mathematical language of AC circuits:

1. **Alternating current reverses periodically** - AC dominates power systems because transformers enable efficient voltage transformation and transmission

2. **Sinusoids are characterized by amplitude, frequency, and phase** - These three parameters completely describe any pure sinusoidal signal

3. **RMS is the most important amplitude measure** - It directly relates to power delivery and equals \(V_m/\sqrt{2}\) for sinusoids

4. **Signals can be viewed in time domain or frequency domain** - Time shows waveform shape, frequency shows spectral content

5. **DC and AC components can be separated** - Any signal is the sum of its constant (DC) and varying (AC) parts

6. **Complex numbers simplify AC analysis** - Rectangular form for addition, polar form for multiplication

7. **Euler's formula bridges trigonometry and exponentials** - \(e^{j\theta} = \cos\theta + j\sin\theta\) enables phasor analysis

8. **Gain measures amplification** - Expressed as linear ratio or in decibels; voltage dB = 20 log(A_V)

With these foundations in place, you're ready for the next chapter where we'll transform sinusoids into phasors—stationary complex numbers that represent rotating signals. This transformation will make AC circuit analysis as straightforward as DC analysis with Ohm's law. The math of complex numbers that might seem like extra work now will pay enormous dividends in simplifying circuit calculations.
