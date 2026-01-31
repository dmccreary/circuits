# Circuits 1 FAQ

This FAQ addresses common questions about the Circuits 1 course, covering fundamental concepts, technical details, common challenges, best practices, and advanced topics.

## Getting Started

### What is this course about?

Circuits 1 provides a comprehensive introduction to analog electrical systems with particular emphasis on audio circuits and signals. The course bridges mathematical foundations with practical applications, using audio systems as a unifying theme. You'll learn to analyze circuits in both time and frequency domains, developing intuition for how components like resistors, capacitors, and inductors shape electrical signals. See the [Course Description](course-description.md) for complete details.

### Who is this course for?

This course is designed for college students majoring in electrical engineering or computer science. It assumes you have completed introductory calculus (derivatives and integrals), basic algebra including complex number operations, and ideally fundamental physics covering electricity and magnetism. The course awards 4 credits with 3 lecture hours and 3 laboratory hours per week.

### What prerequisites do I need?

You should have completed:

- Introduction to calculus (derivatives and integrals)
- Basic algebra including complex number operations
- Fundamental physics covering electricity and magnetism (recommended)

If you're comfortable with taking derivatives, working with complex numbers like 3+4j, and understand basic concepts of electric charge and fields, you're ready to start.

### How is the course structured?

The course follows a progressive structure across 16 chapters:

1. **Chapters 1-3:** Foundational concepts (charge, voltage, current, Ohm's Law, Kirchhoff's Laws)
2. **Chapters 4-6:** DC circuit analysis and passive components
3. **Chapters 7-9:** Transient analysis and AC fundamentals
4. **Chapters 10-12:** AC power, frequency response, and filters
5. **Chapters 13-14:** Operational amplifiers and signal analysis
6. **Chapters 15-16:** Audio applications and laboratory techniques

### What tools and materials do I need?

You need a computer with Chrome or Firefox web browser and access to a generative AI tool like Claude Code. For laboratory work, you'll use oscilloscopes, function generators, multimeters, and spectrum analyzers (provided in the lab).

### How will I be assessed?

Assessment includes:

- Weekly problem sets (25%)
- Two midterm examinations (25%)
- Final examination (15%)
- Final project (10%)

### What topics are NOT covered in this course?

This introductory course does not cover digital circuits, semiconductor physics, transistor-level amplifier design, Laplace transforms, transmission lines, or power electronics. These topics are covered in subsequent courses like Electronics I, Signals and Systems, and Circuits II. See [Topics Not Covered](course-description.md#topics-not-covered) for the complete list.

### How do I use the interactive MicroSims?

Each chapter includes interactive MicroSim simulations built with p5.js. These allow you to explore circuit concepts by adjusting parameters and observing results in real-time. Most MicroSims have:

- Start/Stop buttons to control animations
- Sliders to adjust circuit parameters
- Visual displays showing voltages, currents, and waveforms

Simply click the controls and observe how the circuit responds.

### What is Bloom's Taxonomy and how is it used in this course?

Bloom's Taxonomy is a hierarchical model for classifying learning objectives into six levels: Remember, Understand, Apply, Analyze, Evaluate, and Create. This course uses all six levels progressively—starting with recalling basic definitions and building up to designing complete audio circuits. The [Glossary](glossary.md#blooms-taxonomy) provides more details.

### How should I approach studying circuits?

Start by mastering the fundamentals: Ohm's Law, Kirchhoff's Laws, and series/parallel combinations. These form the foundation for everything else. Use the MicroSims to build intuition, work through the self-check questions at the end of each chapter, and don't skip the laboratory exercises—hands-on experience is irreplaceable for developing circuit intuition.

## Core Concepts

### What is the difference between voltage and current?

**Voltage** is the electrical potential difference between two points, measured in volts (V). It's the "pressure" that pushes charge through a circuit. **Current** is the actual flow of electric charge through a conductor, measured in amperes (A). The water analogy helps: voltage is like water pressure, while current is like the flow rate. See [Chapter 1](chapters/01-electric-charge-basic-quantities/index.md) for a detailed exploration.

### What is Ohm's Law and why is it important?

Ohm's Law states that voltage equals current times resistance: V = IR. It's the most fundamental relationship in circuit analysis and appears constantly throughout the course. It tells you that if you know any two of voltage, current, or resistance, you can calculate the third. See [Chapter 2](chapters/02-ohms-law-basic-configurations/index.md) for complete coverage.

### What is the difference between series and parallel circuits?

In a **series circuit**, components are connected end-to-end, so the same current flows through each component. In a **parallel circuit**, components share the same voltage across them but may carry different currents. These two configurations behave very differently—series resistances add directly, while parallel resistances combine as reciprocals. See [Chapter 2](chapters/02-ohms-law-basic-configurations/index.md) for details.

### What are Kirchhoff's Laws?

**Kirchhoff's Current Law (KCL)** states that the sum of currents entering a node equals the sum leaving it—conservation of charge. **Kirchhoff's Voltage Law (KVL)** states that the sum of voltages around any closed loop equals zero—conservation of energy. These two laws, combined with Ohm's Law, are sufficient to solve any linear circuit. See [Chapter 3](chapters/03-kirchhoffs-laws-topology/index.md) for detailed explanations.

### What is impedance?

Impedance (Z) is the AC generalization of resistance. It's a complex number that includes both resistance (the real part) and reactance (the imaginary part). Impedance is measured in ohms (Ω) and expressed as Z = R + jX, where R is resistance and X is reactance. It tells you how a component opposes AC current and what phase shift it introduces. See [Chapter 9](chapters/09-phasors-complex-impedance/index.md) for complete coverage.

### What is the difference between capacitive and inductive reactance?

**Capacitive reactance** (Xc = 1/ωC) decreases with frequency—capacitors pass high frequencies easily but block low frequencies. **Inductive reactance** (XL = ωL) increases with frequency—inductors pass low frequencies easily but block high frequencies. This frequency-dependent behavior is the basis for filter design. See [Chapter 9](chapters/09-phasors-complex-impedance/index.md) for detailed analysis.

### What is a phasor?

A phasor is a complex number that represents the magnitude and phase angle of a sinusoidal signal. Instead of dealing with time-varying sine waves, phasors let you use simple algebra with complex numbers. For example, a 10V signal leading by 30° becomes 10∠30° or 10e^(j30°). This dramatically simplifies AC circuit analysis. See [Chapter 9](chapters/09-phasors-complex-impedance/index.md) for the full treatment.

### What is resonance in circuits?

Resonance occurs when the inductive and capacitive reactances in a circuit are equal, causing them to cancel. At the resonant frequency, an RLC circuit exhibits maximum (series) or minimum (parallel) impedance, and energy oscillates between the inductor and capacitor. The resonant frequency is f₀ = 1/(2π√LC). See [Chapter 12](chapters/12-filters-resonance/index.md) for detailed analysis.

### What is the time constant?

The time constant (τ) characterizes how quickly a first-order circuit responds to changes. For RC circuits, τ = RC; for RL circuits, τ = L/R. After one time constant, the response reaches 63.2% of its final value. After five time constants (5τ), the circuit is considered to have reached steady state. See [Chapter 6](chapters/06-transient-analysis-rc-rl/index.md) for complete coverage.

### What is power factor?

Power factor is the ratio of real power (watts) to apparent power (volt-amperes): PF = P/S = cos(θ), where θ is the phase angle between voltage and current. A power factor of 1 means all power delivered is being consumed; lower values indicate reactive power circulating without doing useful work. See [Chapter 10](chapters/10-ac-power-analysis/index.md) for detailed analysis.

### What is an operational amplifier?

An operational amplifier (op-amp) is a high-gain electronic voltage amplifier with differential inputs and typically a single-ended output. The ideal op-amp has infinite gain, infinite input impedance, and zero output impedance. With negative feedback, op-amps can perform operations like amplification, filtering, and signal processing. See [Chapter 13](chapters/13-operational-amplifiers/index.md) for complete coverage.

### What is a transfer function?

A transfer function H(jω) describes how a circuit modifies signals as a function of frequency. It's the ratio of output to input: H(jω) = Vout/Vin. The magnitude |H(jω)| tells you the gain at each frequency, while the phase ∠H(jω) tells you the phase shift. See [Chapter 11](chapters/11-frequency-response-bode/index.md) for detailed treatment.

### What is the difference between a low-pass and high-pass filter?

A **low-pass filter** passes low frequencies and attenuates high frequencies—the cutoff frequency marks where attenuation begins. A **high-pass filter** does the opposite, passing high frequencies and attenuating low ones. Both are characterized by their cutoff frequency fc and roll-off rate (typically 20 dB/decade for first-order filters). See [Chapter 12](chapters/12-filters-resonance/index.md) for filter design.

### What is THD (Total Harmonic Distortion)?

THD measures how much harmonic content an amplifier adds to a signal. It's calculated as the RMS sum of all harmonic voltages divided by the fundamental: THD = √(V₂² + V₃² + V₄² + ...)/V₁ × 100%. Lower THD means cleaner amplification—professional audio typically requires THD < 0.1%. See [Chapter 15](chapters/15-audio-applications/index.md) for complete coverage.

### What is the difference between transient and steady-state response?

**Transient response** is the circuit's behavior immediately after a change (like a switch closing), during which energy is being redistributed among storage elements. **Steady-state response** is the long-term behavior after transients have died out. The complete response is the sum of both. See [Chapter 6](chapters/06-transient-analysis-rc-rl/index.md) for first-order analysis and [Chapter 7](chapters/07-second-order-rlc-circuits/index.md) for second-order systems.

### What determines whether a second-order circuit is overdamped, underdamped, or critically damped?

The damping ratio ζ determines the response character. For RLC circuits, ζ = R/(2√(L/C)). When ζ > 1, the circuit is overdamped (sluggish, no oscillation). When ζ < 1, it's underdamped (oscillates while decaying). When ζ = 1, it's critically damped (fastest settling without oscillation). See [Chapter 7](chapters/07-second-order-rlc-circuits/index.md) for detailed analysis.

### What is the difference between RMS and peak values?

**Peak value** is the maximum instantaneous amplitude of a waveform. **RMS (Root Mean Square)** is the equivalent DC value that would produce the same power dissipation in a resistor. For sinusoids, Vrms = Vpeak/√2 ≈ 0.707 × Vpeak. RMS values are used for power calculations because they represent actual heating effect. See [Chapter 8](chapters/08-ac-signals-sinusoidal/index.md).

### What is Thevenin's theorem?

Thevenin's theorem states that any linear circuit with two terminals can be replaced by an equivalent circuit consisting of a voltage source (Vth) in series with a resistance (Rth). This dramatically simplifies circuit analysis, especially when analyzing how a circuit behaves with different loads. See [Chapter 4](chapters/04-dc-circuit-analysis/index.md) for the method.

### What is the Fourier series and why does it matter for circuits?

The Fourier series expresses any periodic signal as a sum of sinusoids at harmonic frequencies. This matters because linear circuits respond to each harmonic independently—you can analyze each frequency component separately and add the results. This connects time-domain waveforms to frequency-domain analysis. See [Chapter 14](chapters/14-signals-audio-lab/index.md) for complete treatment.

### What is the difference between active and passive filters?

**Passive filters** use only resistors, capacitors, and inductors. They cannot amplify signals, and their performance can be affected by loading. **Active filters** include op-amps and can provide gain, better isolation, and sharper cutoffs without inductors. Active filters are preferred in most audio applications. See [Chapter 12](chapters/12-filters-resonance/index.md#active-filters).

## Technical Details

### How do I calculate equivalent resistance for series and parallel combinations?

For **series resistors**, add them directly: Req = R₁ + R₂ + R₃ + ...

For **parallel resistors**, use the reciprocal formula: 1/Req = 1/R₁ + 1/R₂ + 1/R₃ + ...

For two parallel resistors, use the shortcut: Req = (R₁ × R₂)/(R₁ + R₂)

See [Chapter 2](chapters/02-ohms-law-basic-configurations/index.md) for examples.

### How do I convert between rectangular and polar forms of complex numbers?

**Rectangular to polar:** Given z = a + jb, magnitude |z| = √(a² + b²) and angle θ = arctan(b/a)

**Polar to rectangular:** Given z = r∠θ, real part a = r·cos(θ) and imaginary part b = r·sin(θ)

Euler's formula connects them: re^(jθ) = r(cos θ + j sin θ). See [Chapter 9](chapters/09-phasors-complex-impedance/index.md).

### What is the formula for capacitive reactance?

Capacitive reactance is Xc = 1/(ωC) = 1/(2πfC), measured in ohms. Note that Xc decreases as frequency increases—a 1 μF capacitor has Xc = 159 Ω at 1 kHz but only 15.9 Ω at 10 kHz. In impedance form, Zc = -jXc = 1/(jωC). See [Chapter 9](chapters/09-phasors-complex-impedance/index.md).

### What is the formula for inductive reactance?

Inductive reactance is XL = ωL = 2πfL, measured in ohms. Unlike capacitive reactance, XL increases with frequency—a 10 mH inductor has XL = 62.8 Ω at 1 kHz but 628 Ω at 10 kHz. In impedance form, ZL = jXL = jωL. See [Chapter 9](chapters/09-phasors-complex-impedance/index.md).

### How do I calculate the cutoff frequency of an RC filter?

The cutoff frequency is fc = 1/(2πRC), where R is in ohms and C is in farads. At this frequency, the output is at -3 dB (70.7% of the input voltage), and the phase shift is 45°. For example, R = 10 kΩ and C = 0.1 μF gives fc = 159 Hz. See [Chapter 12](chapters/12-filters-resonance/index.md).

### How do I calculate resonant frequency?

For an RLC circuit, the resonant frequency is f₀ = 1/(2π√LC), where L is in henrys and C is in farads. At resonance, XL = Xc, so the reactive components cancel. For example, L = 10 mH and C = 1 μF gives f₀ = 1.59 kHz. See [Chapter 12](chapters/12-filters-resonance/index.md).

### What is the gain formula for an inverting amplifier?

For an inverting op-amp amplifier, the voltage gain is Av = -Rf/Rin, where Rf is the feedback resistor and Rin is the input resistor. The negative sign indicates phase inversion. For example, Rf = 100 kΩ and Rin = 10 kΩ gives Av = -10 (gain of 10 with inversion). See [Chapter 13](chapters/13-operational-amplifiers/index.md#inverting-amplifier).

### What is the gain formula for a non-inverting amplifier?

For a non-inverting op-amp amplifier, the voltage gain is Av = 1 + Rf/Rin. There is no phase inversion. The minimum gain is 1 (when Rf = 0 or Rin = ∞), which gives a voltage follower. For example, Rf = 90 kΩ and Rin = 10 kΩ gives Av = 10. See [Chapter 13](chapters/13-operational-amplifiers/index.md#non-inverting-amplifier).

### How do I read resistor color codes?

Standard resistors use 4-band color codes: first two bands give digits, third band is the multiplier, fourth band is tolerance. The color sequence is: Black=0, Brown=1, Red=2, Orange=3, Yellow=4, Green=5, Blue=6, Violet=7, Gray=8, White=9. For example, Brown-Black-Red-Gold = 10 × 100 = 1 kΩ ± 5%. See [Chapter 5](chapters/05-passive-components/index.md).

### What is the formula for power in AC circuits?

**Real power:** P = Vrms × Irms × cos(θ) watts
**Reactive power:** Q = Vrms × Irms × sin(θ) VAR
**Apparent power:** S = Vrms × Irms volt-amperes
**Complex power:** S = P + jQ

The power triangle relates these: S² = P² + Q². See [Chapter 10](chapters/10-ac-power-analysis/index.md) for complete coverage.

### How do I calculate thermal noise?

Thermal noise voltage is given by Vnoise,rms = √(4kBTRΔf), where kB is Boltzmann's constant (1.38 × 10⁻²³ J/K), T is temperature in Kelvin, R is resistance in ohms, and Δf is bandwidth in Hz. For a 10 kΩ resistor at room temperature over 20 kHz bandwidth, this gives approximately 1.8 μV. See [Chapter 15](chapters/15-audio-applications/index.md#thermal-noise).

### What is the formula for the time constant of an RC circuit?

The time constant τ = RC, where R is in ohms and C is in farads, giving τ in seconds. The voltage during charging is V(t) = Vfinal(1 - e^(-t/τ)), and during discharging is V(t) = Vinitial × e^(-t/τ). After 5τ, the circuit reaches approximately 99.3% of its final value. See [Chapter 6](chapters/06-transient-analysis-rc-rl/index.md).

### What is a decibel and how do I use it?

A decibel (dB) is a logarithmic unit for expressing ratios. For voltage: dB = 20 log₁₀(V₂/V₁). For power: dB = 10 log₁₀(P₂/P₁). Common values: +6 dB ≈ 2× voltage, +20 dB = 10× voltage, -3 dB ≈ 0.707× voltage (half power point). See [Chapter 11](chapters/11-frequency-response-bode/index.md).

### How do I draw a Bode plot?

1. Express the transfer function in standard form
2. Identify corner frequencies (poles and zeros)
3. Draw asymptotes: flat (0 dB/decade) below corner frequencies, ±20 dB/decade change at each corner
4. Round the corners (±3 dB at corner frequencies)
5. Add phase plot: 0° or 180° at low frequencies, ±90° change per pole/zero

See [Chapter 11](chapters/11-frequency-response-bode/index.md) for complete methodology.

### What is the quality factor Q and how do I calculate it?

Quality factor Q measures the sharpness of resonance. For series RLC: Q = (1/R)√(L/C) = ω₀L/R = 1/(ω₀RC). For parallel RLC: Q = R√(C/L). Higher Q means narrower bandwidth and sharper resonance. Bandwidth BW = f₀/Q. See [Chapter 12](chapters/12-filters-resonance/index.md).

## Common Challenges

### Why does my voltage divider give the wrong output when I connect a load?

Loading effect! The output of a voltage divider depends on the load resistance. When you connect a load RL, it appears in parallel with R₂, reducing the effective resistance and thus the output voltage. Solution: Use a buffer amplifier (voltage follower) between the divider and load, or design the divider with much lower resistance than the load. See [Chapter 4](chapters/04-dc-circuit-analysis/index.md).

### Why is my op-amp output stuck at the power supply rail?

This is saturation, and common causes include:

1. **Missing negative feedback** - The op-amp needs a feedback path from output to inverting input
2. **Open input** - Floating inputs cause unpredictable behavior
3. **Input exceeds common-mode range** - The input voltage is too close to the rails
4. **Gain too high** - Even small input offsets saturate high-gain stages

Check your feedback resistor connections first. See [Chapter 13](chapters/13-operational-amplifiers/index.md).

### Why is my filter's cutoff frequency different from what I calculated?

Common reasons include:

1. **Component tolerances** - A 10% resistor gives ±10% frequency variation
2. **Loading effects** - The next stage loads the filter output
3. **Parasitic capacitance** - Breadboard and wiring add stray capacitance
4. **Measurement error** - The -3 dB point must be measured precisely

Use 1% tolerance components for better accuracy. See [Chapter 12](chapters/12-filters-resonance/index.md).

### Why do I measure different voltages with different multimeters?

Multimeter input impedance matters! An older analog meter might have 20 kΩ/V, while a digital multimeter typically has 10 MΩ. When measuring high-impedance circuits, the meter's input resistance loads the circuit. Use a DMM with 10 MΩ input for most measurements. See [Chapter 16](chapters/16-laboratory-techniques/index.md#loading-error).

### Why does my oscilloscope show a different waveform than expected?

Check these common issues:

1. **Probe compensation** - Adjust the trim capacitor until a square wave shows flat tops
2. **Bandwidth limit** - A 20 MHz scope can't accurately show a 15 MHz sine wave
3. **Triggering** - Wrong trigger settings cause unstable or incorrect displays
4. **AC coupling** - This removes DC components and distorts low frequencies
5. **10X probe** - Remember the scope shows 1/10 of actual voltage with 10X probe

See [Chapter 16](chapters/16-laboratory-techniques/index.md#oscilloscope) for complete troubleshooting.

### Why is my circuit oscillating when it shouldn't be?

Unwanted oscillation usually comes from:

1. **Parasitic inductance** in long wires creating resonance
2. **Insufficient power supply bypassing** - Add 0.1 μF capacitors near op-amp power pins
3. **Ground loops** - Use star grounding
4. **Too much gain** - High-gain stages are more prone to oscillation
5. **Capacitive loading** - Long cables can cause instability

See [Chapter 13](chapters/13-operational-amplifiers/index.md) for prevention techniques.

### How do I debug a circuit that doesn't work?

Systematic debugging approach:

1. **Check power** - Are supply voltages correct at the component?
2. **Check ground** - Is there a solid ground connection?
3. **Divide and conquer** - Test stages individually
4. **Inject signals** - Use a function generator to test each stage
5. **Measure voltages** - Compare actual DC bias points to expected values
6. **Check for shorts/opens** - Look for solder bridges or broken connections

See [Chapter 16](chapters/16-laboratory-techniques/index.md#circuit-debugging) for complete methodology.

### Why is there noise in my audio circuit?

Common noise sources:

1. **Thermal noise** - Fundamental; use lower resistance values where possible
2. **Ground loops** - Use star grounding, avoid multiple ground paths
3. **Power supply ripple** - Add more filtering capacitors
4. **EMI pickup** - Shield sensitive inputs, use twisted pairs
5. **Component noise** - Carbon resistors are noisier than metal film

See [Chapter 15](chapters/15-audio-applications/index.md) for detailed noise reduction techniques.

### Why does my transient response look different from the simulation?

Real components differ from ideal models:

1. **Initial conditions** - Capacitors may not be fully discharged
2. **Parasitic elements** - Real inductors have resistance, real capacitors have ESR
3. **Switch bounce** - Mechanical switches don't close cleanly
4. **Measurement loading** - Your probe adds capacitance

See [Chapter 6](chapters/06-transient-analysis-rc-rl/index.md) and [Chapter 16](chapters/16-laboratory-techniques/index.md) for practical considerations.

## Best Practices

### How should I approach solving circuit problems?

1. **Draw the circuit** - Even if given, redraw for clarity
2. **Label everything** - Mark all voltages, currents, and nodes
3. **Identify what's asked** - Know your target before calculating
4. **Choose the right method** - KVL/KCL for small circuits, node/mesh analysis for larger ones
5. **Simplify first** - Combine series/parallel elements where possible
6. **Check units** - Ensure dimensional consistency throughout
7. **Verify reasonableness** - Does the answer make physical sense?

### When should I use node analysis vs. mesh analysis?

**Use node analysis** when:

- There are fewer nodes than meshes
- There are current sources
- You need node voltages directly

**Use mesh analysis** when:

- There are fewer meshes than nodes
- There are voltage sources
- You need mesh currents directly

For most circuits, either works—choose the one with fewer equations. See [Chapter 4](chapters/04-dc-circuit-analysis/index.md) for both methods.

### How do I choose between Thevenin and Norton equivalents?

**Use Thevenin** when connecting to a load in series (most common). **Use Norton** when connecting to a load in parallel or when the circuit naturally contains current sources. You can always convert between them: Vth = In × Rth. See [Chapter 4](chapters/04-dc-circuit-analysis/index.md).

### What probe setting should I use on the oscilloscope?

**Use 10X probes** for most measurements:

- Higher input impedance (10 MΩ vs 1 MΩ)
- Better bandwidth
- Less loading on circuit
- Reduced noise pickup

Use 1X only when signal amplitude is too small (< 10 mV range). Always compensate your probe and remember to adjust the scope's probe attenuation setting. See [Chapter 16](chapters/16-laboratory-techniques/index.md#oscilloscope-probes).

### How do I select component values for a filter?

1. **Start with the cutoff frequency** - Determine fc from your requirements
2. **Choose a standard capacitor value** - Capacitors have fewer standard values than resistors
3. **Calculate the resistor** - R = 1/(2πfcC) for first-order RC filters
4. **Select nearest standard resistor** - Use E24 or E96 series
5. **Recalculate actual fc** - Verify the achieved cutoff frequency
6. **Consider tolerances** - Use 1% components for precision filters

See [Chapter 12](chapters/12-filters-resonance/index.md) for detailed procedures.

### How do I minimize noise in audio circuit design?

1. **Keep signal paths short** - Especially for low-level inputs
2. **Use star grounding** - Single ground point for all connections
3. **Shield sensitive inputs** - Use coaxial cable for microphone connections
4. **Bypass power supplies** - 0.1 μF ceramic at each op-amp
5. **Use low-noise op-amps** - NE5532, OPA2134 for audio
6. **Choose metal film resistors** - Lower noise than carbon composition

See [Chapter 15](chapters/15-audio-applications/index.md#practical-design-considerations).

### How should I document my circuit measurements?

1. **Record setup conditions** - Power supply voltages, temperature, probe settings
2. **Note signal parameters** - Frequency, amplitude, waveform type
3. **Save screenshots** - Oscilloscope captures with scales visible
4. **Calculate uncertainties** - Propagate measurement errors
5. **Compare to theory** - Note and explain any discrepancies
6. **Keep a lab notebook** - Date, equipment serial numbers, observations

### When should I use AC coupling vs. DC coupling on the oscilloscope?

**Use DC coupling** (default):

- When measuring DC levels
- When signal has important DC offset
- For most general measurements

**Use AC coupling**:

- When DC offset obscures small AC signal
- When AC riding on large DC level
- Never for very low frequencies (< 10 Hz)

See [Chapter 16](chapters/16-laboratory-techniques/index.md).

## Advanced Topics

### How does maximum power transfer relate to impedance matching in audio?

Maximum power transfer occurs when the load impedance equals the complex conjugate of the source impedance: ZL = ZS*. For resistive circuits, this means RL = Rth. In audio, this is why amplifier output impedances and speaker impedances are specified (e.g., 8Ω speakers with low-impedance amplifiers). The damping factor (Zspeaker/Zamp) affects bass control. See [Chapter 10](chapters/10-ac-power-analysis/index.md).

### What causes intermodulation distortion and why is it worse than harmonic distortion?

Intermodulation distortion (IMD) occurs when two or more input frequencies mix to create sum and difference frequencies. For inputs f₁ and f₂, IMD creates f₁±f₂, 2f₁±f₂, etc. These products are NOT harmonically related to the input—they're musically dissonant. A 1 kHz + 1.5 kHz input creates 500 Hz and 2.5 kHz—notes that don't belong to either input. This sounds "dirty" even at low levels. See [Chapter 15](chapters/15-audio-applications/index.md).

### How do poles and zeros affect frequency response?

**Poles** (roots of the denominator) create -20 dB/decade roll-off and -90° phase shift each. **Zeros** (roots of the numerator) create +20 dB/decade rise and +90° phase shift each. Their locations in the s-plane determine stability and frequency response shape. Right half-plane poles indicate instability. See [Chapter 11](chapters/11-frequency-response-bode/index.md).

### What is gain-bandwidth product in op-amps?

Gain-bandwidth product (GBW) is constant for a given op-amp: GBW = Av × bandwidth. A 741 op-amp with GBW = 1 MHz can provide gain of 100 up to 10 kHz, or gain of 10 up to 100 kHz. This limits high-gain applications at high frequencies. For audio, ensure GBW >> 20 kHz × desired gain. See [Chapter 13](chapters/13-operational-amplifiers/index.md#gain-bandwidth-product).

### How do I design a second-order filter?

Second-order filters provide steeper roll-off (40 dB/decade) and can have peaked response near cutoff. Key parameters:

1. **Cutoff frequency** ω₀ = 1/√(LC) or set by RC values
2. **Quality factor Q** determines peaking and damping
3. **Damping ratio** ζ = 1/(2Q) determines transient response

Sallen-Key topology is common for active second-order filters. See [Chapter 12](chapters/12-filters-resonance/index.md).

### What is the difference between Class A, AB, and D amplifiers?

**Class A:** Transistors always conducting. Lowest distortion, lowest efficiency (~25%), runs hot. Used in high-end audio.

**Class AB:** Each transistor handles half the waveform with slight overlap. Good compromise—low distortion, ~60% efficiency. Most common in audio amplifiers.

**Class D:** Switching amplifier with PWM. Very high efficiency (>90%), requires output filtering. Good for portable devices and subwoofers.

See [Chapter 15](chapters/15-audio-applications/index.md).

### How do I analyze a circuit with mutual inductance?

Mutual inductance M couples two inductors through shared magnetic flux. The coupling coefficient k = M/√(L₁L₂) ranges from 0 (no coupling) to 1 (perfect coupling). In analysis:

- Add voltage contribution from coupled inductor: V = L(di/dt) ± M(di₂/dt)
- Sign depends on winding direction (dot convention)
- Forms the basis for transformers

See [Chapter 5](chapters/05-passive-components/index.md#mutual-inductance).

### What determines the settling time of a second-order system?

Settling time depends on the damping ratio ζ and natural frequency ω₀. For a specified settling percentage:

- Critically damped (ζ=1): ts ≈ 5/ω₀ for 1% settling
- Underdamped (ζ<1): ts ≈ 4/(ζω₀) for 2% settling

Faster natural frequency and higher damping (up to critical) reduce settling time. See [Chapter 7](chapters/07-second-order-rlc-circuits/index.md).

### How does power factor correction work?

Power factor correction adds capacitance (for inductive loads) or inductance (for capacitive loads) to bring the net reactive power closer to zero, improving power factor toward unity. For an inductive load with lagging PF:

1. Measure the reactive power Q = P·tan(θ)
2. Calculate required capacitive VAR: Qc = Q
3. Size capacitor: C = Qc/(ωV²)

This reduces current draw and line losses. See [Chapter 10](chapters/10-ac-power-analysis/index.md#power-factor-correction).

### What is CMRR and why does it matter?

Common-Mode Rejection Ratio (CMRR) measures how well a differential amplifier rejects signals that appear identically at both inputs. CMRR = Ad/Acm, typically expressed in dB (good op-amps: 80-120 dB). High CMRR is essential for rejecting noise pickup in instrumentation amplifiers and balanced audio connections. See [Chapter 13](chapters/13-operational-amplifiers/index.md).
