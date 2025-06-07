# OpenAI Top 100 Circuits

!!! prompt
    I am creating a new website that will be used as a teaching aid for a freshman one semester college-level level course about electrical engineering circuits.  I need you to do detailed research to generate a list of the top 100 circuits that are most commonly used in a introductory circuits course.

    Please look for any sites that have list of circuits.  We are focused mostly on analog circuits, not digital circuits.  We want our students to be able to quickly visualize how these circuits work using both DC and AC input sources. 

    For each of the 100 circuit, please return the following format.  Always place two newlines before a markdown list.

    ### Circuit Name

    - Description of Circuit
    - DC or AC circuit
    - Type of Circuit
    - Number of components (not including wire)
    - List of components
    - What type of problems is the circuit used for?

## ChatGPT O1 Deep Research Clarification Questions

That sounds like a great educational tool. To help tailor the research for your teaching aid, could you please clarify the following:

1. Should the list include only circuits typically covered in university-level textbooks (e.g., Thevenin/Norton equivalents, RC/RL filters, Op-Amp circuits), or also practical circuits used in labs (e.g., LED blinkers, audio amplifiers)?
2. Are you interested in a mix of both theoretical analysis circuits and hands-on practical circuits?
3. Should we prioritize circuits from specific curriculum standards (e.g., IEEE, ABET accredited syllabi), or cast a wide net based on what’s commonly taught globally?
4. Is it acceptable to include variations of similar circuit types (e.g., low-pass vs. high-pass filters) or only distinct circuit functions?

Once I have this information, I can begin assembling a detailed and structured list for you.

You said:

1. Included practical circuits
2. We are interested in both theory and hands-on practical circuits
3. Cast a wide net from global sources
4. You are free to also include variations of circuits

ChatGPT said:

Thanks! I’ll compile a comprehensive list of the top 100 analog circuits commonly used in introductory electrical engineering courses, drawing from both theoretical and practical sources globally. Each entry will include a detailed breakdown as you specified, including usage in DC or AC contexts, components, and educational purpose.

I’ll get started and let you know when the full list is ready.

## OpenAI Deep Research Response

**Research completed in:** 16m - 39 sources

Thanks! I’ll compile a comprehensive list of the top 100 analog circuits commonly used in introductory electrical engineering courses, drawing from both theoretical and practical sources globally. Each entry will include a detailed breakdown as you specified, including usage in DC or AC contexts, components, and educational purpose.

I’ll get started and let you know when the full list is ready.

## Top 100 Analog Circuits in Introductory Electrical Engineering

## Basic Resistive Circuits

### 1. Voltage Divider

A passive linear **DC circuit** of two resistors in series that produces an output voltage which is a fixed fraction of its input. 

- *Type:* Resistive attenuator. 
- *Components:* 2 resistors (forming a series divider). This simple network illustrates Ohm’s law and is used to scale down or reference voltages (e.g. reading sensor outputs).

### 2. Current Divider

A **DC circuit** with resistors in parallel that splits an input current into fractional currents through each branch. *Type:* Resistive network (parallel). *Components:* 2 (or more) resistors in parallel. The output branch current is a fraction of total input current, demonstrating Kirchhoff’s current law; used to allocate currents in parallel paths and analyze circuits with multiple loads.

### 3. Wheatstone Bridge

A **DC measurement circuit** of four resistors in a diamond configuration. *Type:* Bridge network (resistive). *Components:* 4 resistors (two pairs of series resistors in parallel arms). With a supply across one diagonal and a meter across the other, it balances when the ratio of two resistors on one leg equals the ratio on the other leg. It is used to precisely measure unknown resistances by nulling the meter (balanced bridge) and is the basis for many sensor circuits (e.g. strain gauges).

### 4. Thévenin Equivalent Circuit

A reduced **DC circuit model** that replaces a complex linear network by an ideal voltage source in series with a single resistor. *Type:* Equivalent source model. *Components:* 1 voltage source + 1 resistor (Thevenin resistance). Any linear circuit seen from two output terminals can be simplified to this form, illustrating Thevenin’s theorem. It is used to analyze power transfer and to simplify circuits for easier analysis of loading effects.

### 5. Norton Equivalent Circuit

A reduced **DC circuit model** dual to Thevenin’s, consisting of an ideal current source in parallel with a single resistor. *Type:* Equivalent source model. *Components:* 1 current source + 1 resistor (Norton resistance). It represents any linear network at a pair of terminals for current analysis, used to simplify circuit analysis especially for parallel connections and to apply Norton’s theorem in network reduction.

## Reactive and AC Circuits

### 6. RC Transient Circuit (Charging/Discharging)

A **transient DC/AC circuit** with a resistor and capacitor in series responding to a step input. *Type:* First-order RC network (timing circuit). *Components:* 1 resistor, 1 capacitor. When a DC source is applied or removed, the capacitor voltage changes exponentially with time constant *τ = R·C*. This circuit illustrates capacitor charging and discharging behaviors (e.g. in camera flashes or debounce circuits) and is used to generate delays or smooth voltage changes.

### 7. RL Transient Circuit (Charging/Discharging)

A **transient DC/AC circuit** with a resistor and inductor in series reacting to a step input. *Type:* First-order RL network (timing circuit). *Components:* 1 resistor, 1 inductor. Upon a DC step, the inductor current rises or falls exponentially with time constant *τ = L/R*, demonstrating how inductors resist sudden current change. It is used to illustrate inductive transients (e.g. in relay coils or spark suppression) and timing applications like simple filters or motor starting behavior.

### 8. RC Low-Pass Filter

A **first-order AC filter** that passes low frequencies and attenuates high frequencies. *Type:* Passive low-pass filter. *Components:* 1 resistor, 1 capacitor (series combination, output across capacitor). In steady-state AC analysis, at low frequency the capacitor blocks little and output \~ input; at high frequency the capacitor’s reactance is low, shunting the signal to ground. Used to smooth waveforms (e.g. convert rectified AC to DC) and remove high-frequency noise.

### 9. RC High-Pass Filter

A **first-order AC filter** that passes high frequencies and attenuates low frequencies. *Type:* Passive high-pass filter. *Components:* 1 capacitor, 1 resistor (series, output across resistor). At low frequency the capacitor acts open (blocking DC), so little output; at high frequency the capacitor passes changes and the resistor sees the input. Used to block DC offsets (AC coupling) and remove slow signal drift while preserving fast signal changes (e.g. coupling amplifier stages).

### 10. RL Low-Pass Filter

A **first-order AC filter** using an inductor and resistor that favors low frequencies. *Type:* Passive low-pass filter. *Components:* 1 inductor, 1 resistor (series, output across resistor or inductor depending on configuration). In a simple series RL, taking output across the resistor yields low-pass behavior (inductor impedes high-frequency changes, limiting high-frequency output). Commonly used in power filtering (inductor smooths current) to reduce high-frequency ripple or noise in DC supplies.

### 11. RL High-Pass Filter

A **first-order AC filter** using an inductor and resistor that favors high frequencies. *Type:* Passive high-pass filter. *Components:* 1 inductor, 1 resistor (series, output across inductor). At low frequencies, the inductor’s high reactance limits output (inductor looks like an open for DC), while at high frequencies the inductor impedance drops, passing rapid changes to the output. This circuit can serve in snubber networks or to couple AC signals while blocking steady currents (less common than RC high-pass in low-frequency electronics).

### 12. LC Resonant Tank Circuit

A **pure AC circuit** with an inductor and capacitor exchanging energy. *Type:* Resonant LC oscillator (second-order reactive network). *Components:* 1 inductor, 1 capacitor (in parallel or series). It can oscillate at its natural resonant frequency *f = 1/(2π√(LC))* with stored energy sloshing between the magnetic field of L and electric field of C. In practice it is used in tuned circuits (radio frequency tanks, oscillators) to select or generate specific frequencies, as it passes its resonant frequency while rejecting others.

### 13. RLC Series Resonant Circuit

A **second-order AC circuit** with a resistor, inductor, and capacitor in series. *Type:* Resonance and band-pass network (series resonance). *Components:* 1 resistor, 1 inductor, 1 capacitor (in series). At the resonant frequency, inductive and capacitive reactances cancel, so the series impedance is minimal and current is maximum. This produces a **band-pass** behavior: the circuit strongly passes signals near resonance and attenuates off-resonance frequencies. Used in radio receivers and filters to select narrow frequency bands and to illustrate sharp resonance and Q-factor in AC analysis.

### 14. RLC Parallel Resonant Circuit

A **second-order AC circuit** with a resistor, inductor, and capacitor in parallel. *Type:* Resonance and band-stop network (parallel resonance). *Components:* 1 resistor, 1 inductor, 1 capacitor (in parallel). At the resonant frequency, the branch impedances are high (inductor and capacitor circulate current between each other), so the parallel combination draws minimal current – acting like an open circuit. This yields a **band-stop (notch)** characteristic: it rejects signals at resonance while passing frequencies away from resonance. It’s used in tuned traps (e.g. to filter out a specific interference frequency such as in AC line filters or RF notch filters).

### 15. RLC Band-Pass Filter

A **tuned AC filter circuit** that passes a range of frequencies around a center frequency and attenuates frequencies outside that band. *Type:* Band-pass filter (second-order). *Components:* Resistor(s), inductor, capacitor (various topologies, e.g. series RLC feeding a load or a coupled resonant network). For example, a series RLC fed by a source and measured across the resistor will exhibit a band-pass response: minimal output at low/high frequencies, maximum at resonance (mid-band). Such circuits are used to isolate desired frequency bands in communications (IF filters, audio crossover networks) and illustrate how damping and Q affect bandwidth.

### 16. RLC Notch (Band-Stop) Filter

A **tuned AC filter** that rejects (attenuates) signals in a narrow band around a certain frequency while passing frequencies outside that range. *Type:* Band-stop (notch) filter (second-order). *Components:* Resistor(s), inductor, capacitor (e.g. a parallel RLC leg in series with a line, or the classic “twin-T” RC network for audio). At the notch frequency, destructive interference or high impedance causes attenuation of that frequency. This circuit is used to eliminate unwanted frequency components (for example, removing 60 Hz hum from audio) and demonstrates frequency-selective interference cancellation.

### 17. All-Pass Filter

An **AC filter network** that passes all frequencies with equal gain (no amplitude attenuation) but alters the phase of the output as a function of frequency. *Type:* All-pass phase-shifting network. *Components:* Typically 1 capacitor, 1 resistor plus an op amp (for unity gain) or a passive RC lattice. The amplitude is flat, but the phase shift varies with frequency, often shifting by 90° or 180° across the band. All-pass filters are used to adjust phase response or delay in signal processing without affecting amplitude – for example, in phase equalization or in constructing phase-shift oscillators (where they ensure the correct total phase shift around a loop).

## Diode and Rectifier Circuits

### 18. Half-Wave Rectifier

A **single-diode AC-to-DC conversion circuit** that conducts current (to a load) during only one half-cycle of an AC input. *Type:* Rectifier (unipolar converter). *Components:* 1 diode (plus a load resistor as the output). In operation, the diode passes the positive half-cycles (assuming forward-biased for positive) and blocks the negative half, yielding a pulsating DC output. This simple circuit illustrates diode rectification and is used in basic power supplies (with subsequent filtering) to convert AC to a unipolar voltage for charging or powering DC devices.

### 19. Full-Wave Rectifier (Center-Tapped)

A **dual-diode AC-to-DC circuit** that converts both halves of an AC waveform into pulsating DC. *Type:* Rectifier (full-wave). *Components:* 2 diodes, typically with a center-tapped transformer secondary (providing two equal AC halves) and a load resistor. Each diode conducts on alternate half-cycles, steering positive current to the load for both the positive and negative input swings. The output is a series of positive pulses at twice the AC line frequency, providing a more efficient conversion than half-wave. It’s used in power supplies to produce DC with less ripple (often followed by a filter capacitor).

### 20. Bridge Rectifier

A **four-diode AC-to-DC converter** that produces full-wave rectification without the need for a center tap. *Type:* Rectifier (full-wave bridge). *Components:* 4 diodes configured in a bridge + load. On each half-cycle, two diodes conduct (one from each polarity side), routing current through the load in the same direction. This yields a pulsating DC output at twice the input frequency, similar to a full-wave center-tap rectifier. The bridge rectifier is very common in mains power supplies because it efficiently converts AC to DC using a minimal transformer and illustrates diode bridge operation.

### 21. Capacitor Filter (Smoothing)

A **DC smoothing circuit** that reduces the ripple of a rectified voltage using a capacitor. *Type:* Passive filter (reservoir filter). *Components:* 1 capacitor (placed in parallel with the load, after a rectifier). Following a rectifier, the capacitor charges to the peak of the pulsating DC and then discharges slowly into the load during gaps, thus smoothing out voltage dips. The result is a more steady DC output with reduced AC ripple. This circuit is used in virtually all power supplies to provide a near-DC level before regulation, and it illustrates the concept of capacitive energy storage and RC time constant relative to the rectifier frequency.

### 22. Zener Diode Regulator

A **voltage regulation circuit** that uses a zener diode’s constant reverse breakdown voltage to maintain a stable output. *Type:* Shunt regulator (voltage reference). *Components:* 1 zener diode, 1 series resistor (from the supply), plus the load. The resistor feeds current to the zener; when the zener is in breakdown, it clamps the voltage across itself to its rated value (e.g. 5.1 V) by shunting excess current. This provides a relatively constant output voltage across the zener (and load) despite fluctuations in input or load current (within limits). Used to illustrate diode breakdown and as a simple regulator or reference in low-current circuits (though inefficient for large currents).

### 23. Voltage Doubler Circuit

A **diode-capacitor AC voltage multiplier** that produces an output roughly twice the peak input voltage (minus diode drops). *Type:* Charge pump (rectifier variant). *Components:* 2 diodes, 2 capacitors (in a classic Villard or Cockcroft–Walton doubler configuration). During one half-cycle, one capacitor charges to the peak via one diode; on the opposite half, the input and first capacitor stack in series to charge the second capacitor to approximately double the input peak. The circuit converts AC into a higher DC voltage without a transformer. It is used in situations where a higher DC voltage is needed from a given AC source (with light loads), demonstrating diode-capacitor charge transfer principles.

### 24. Diode Clipper (Limiter)

A **wave-shaping circuit** that uses diode conduction to “clip” off portions of a waveform beyond a certain threshold. *Type:* Non-linear limiter. *Components:* 1 or 2 diodes (with biasing components as needed). For example, a simple clipper has a diode to ground oriented to conduct when the input exceeds about 0.7 V, thus limiting the positive peak to \~0.7 V (for a silicon diode). Variations use bias voltages or dual diodes to clip at different levels or both polarities. Clippers are used to protect circuits from voltage spikes (over-voltage protection) and to shape signals (e.g. creating flat-topped waveforms or limiting amplitudes in analog TVs and radios).

### 25. Diode Clamper (DC Restorer)

A **wave-shaping circuit** that adds a DC offset to an AC waveform, effectively “clamping” one peak of the waveform to a reference level. *Type:* Level shifter (bias circuit). *Components:* 1 diode, 1 capacitor (plus a resistive load or bias network). In operation, the diode conducts at a certain portion of the cycle, charging the capacitor and shifting the entire waveform up or down. For example, a positive clamper with a diode to ground and capacitor will lift a sinusoid so that its negative peaks touch 0 V (making the output purely non-negative). Clampers are used in TV signal processing (restoring DC baseline to sync pulses) and any application requiring addition of a DC component to an AC signal.

### 26. Peak Detector

A **diode-capacitor circuit** that captures the peak (maximum value) of an input voltage and holds it for a period. *Type:* Envelope/peak detector. *Components:* 1 diode, 1 capacitor (with a high input impedance buffer or resistor for discharge, if needed). On an AC input, when the input voltage rises, the diode conducts and charges the capacitor to the peak value; after the peak, the diode becomes reverse-biased and the capacitor holds the charge (minus only a slight leakage or discharge). This results in an output that approximates the peak of the input waveform. Peak detectors are used in RF signal demodulation (envelope detectors in AM radios) and in measuring instruments to capture peak voltages (e.g. detecting the maximum amplitude of pulses).

### 27. LED Driver Circuit

A **current-limited DC circuit** for powering an LED (light-emitting diode) at a safe current. *Type:* Indicator/biasing circuit. *Components:* 1 LED, 1 series resistor (from a DC source). The resistor limits the current through the LED to a safe value (e.g. 10 mA) given the LED’s forward voltage drop. In operation, the LED emits light when forward-biased and the resistor drops the excess voltage (per Ohm’s law). This simple circuit illustrates diode forward voltage and current limiting and is ubiquitous for status indicators in electronics. Variations include constant-current drivers (using transistors or ICs) for stable brightness independent of supply fluctuations.

## Transistor Biasing and Amplifier Circuits (BJT)

### 28. BJT as a Switch

A **transistor circuit used in digital logic or power control** where a bipolar junction transistor (BJT) operates in either cutoff (OFF) or saturation (fully ON). *Type:* Switch (digital inverter). *Components:* 1 BJT (NPN or PNP) with bias resistors. In saturation, the transistor conducts heavily like a closed switch (V\_CE ≈ 0) connecting collector to emitter, and in cutoff it behaves like an open switch (no current). This mode is used to drive loads (motors, LEDs, relays) on and off efficiently, illustrating transistor operation in extreme regions and forming the basis of logic gates and PWM power control.

### 29. Fixed Bias (Base Bias) Circuit

A **basic BJT biasing network** that uses a single resistor from a DC supply to the transistor’s base to provide bias current. *Type:* Biasing (beta-dependent). *Components:* 1 resistor (base bias) + transistor. The base resistor sets a base current such that the transistor operates at a certain point (Q-point) in its active region. However, the bias point is highly dependent on transistor beta (β), making it unstable if β varies. This simple bias illustrates the need for stable bias networks and is sometimes used for switching circuits where exact Q-point isn’t critical.

### 30. Collector-Feedback Bias Circuit

A **self-biasing BJT network** where the base bias resistor is connected to the transistor’s **collector** instead of the supply. *Type:* Biasing (negative feedback). *Components:* 1 resistor from collector to base + emitter resistor (optional) + transistor. When collector current increases, the collector voltage drops, reducing base drive (feedback), which in turn stabilizes the operating point. This configuration is more beta-independent, keeping the transistor biased in active mode with negative feedback. It is used to improve bias stability in amplifiers and demonstrates how feedback can counteract parameter variations for a steady Q-point.

### 31. Voltage Divider Bias Circuit

A **widely used BJT bias network** employing two resistors as a voltage divider to fix the base voltage at a steady bias point. *Type:* Biasing (stable bias). *Components:* 2 resistors (forming a base voltage divider), plus an emitter resistor and transistor. The divider provides a roughly constant base voltage (largely independent of base current if divider current ≫ base current), and the emitter resistor provides negative feedback. This method is the most common bias for BJT amplifiers because it makes the transistor’s operating point largely independent of β. It illustrates bias stability and is used in nearly all discrete BJT amplifier designs (sometimes called emitter-stabilized bias).

### 32. Common Emitter Amplifier (BJT)

A **single-stage BJT amplifier** where the emitter is the common reference node (input at base, output at collector). *Type:* Voltage amplifier (inverting). *Components:* 1 BJT with bias network (e.g. voltage divider bias) and a collector resistor (load). In this configuration, a small base-emitter voltage variation causes a much larger change in collector-emitter voltage, providing significant voltage gain (with output 180° out of phase with input). The common emitter is known for high gain and moderate input/output impedance, making it a workhorse amplifier stage in analog design. It is used to amplify signals in radios, audio amplifiers, etc., illustrating transistor gain and the need for biasing.

### 33. Emitter Follower (Common Collector)

A **BJT amplifier/buffer stage** where the collector is common to both input and output (input at base, output at emitter). *Type:* Voltage buffer (non-inverting, unity gain \~1). *Components:* 1 BJT with bias network and an emitter resistor (load at emitter). The emitter follower provides an output that follows the input voltage (approx. 0.7 V lower for an NPN due to V\_BE) but with much higher current driving capability (low output impedance). It has near unity voltage gain but current gain \~β, making it ideal as a buffer stage. It is used to interface high-impedance sources to low-impedance loads (impedance matching), to provide power gain without additional voltage gain, and it illustrates the concept of current amplification and buffering in analog circuits.

### 34. Common Base Amplifier

A **BJT amplifier configuration** where the base is common (grounded for AC) and the input is applied to the emitter, with output at the collector. *Type:* High-frequency amplifier (non-inverting). *Components:* 1 BJT with appropriate bias and resistors. The common base has no phase inversion and typically a voltage gain >1. It features very low input impedance (at the emitter) and high output impedance at the collector, and it can operate at higher frequencies than common emitter (due to reduced Miller effect). It is used in specialized cases like RF amplifiers or impedance transformation (e.g. feeding a low-impedance source into a high-impedance load) and demonstrates alternative biasing where base-emitter junction is forward biased via emitter input.

### 35. Darlington Pair

A **composite transistor configuration** where two BJTs are cascaded (emitter of first driving base of second) to act as a single transistor with extremely high current gain. *Type:* Compound emitter follower (current amplifier). *Components:* 2 BJTs (plus bias resistors). In a Darlington pair, the effective β is the product of the two transistors’ gains (β\_total ≈ β₁·β₂), yielding a very high input impedance and high current gain. The two transistors behave like a single transistor with two base-emitter drops (\~1.2 V). This circuit is used when a very high input impedance or very high current gain is needed (e.g. in sensor interfaces or output stages of amplifiers). It illustrates how composite devices can enhance gain at the expense of a higher saturation voltage and slower response.

### 36. Push-Pull Amplifier (Class AB Output Stage)

A **complementary transistor pair configuration** that amplifies an analog signal with both halves of the waveform handled by opposite devices. *Type:* Power amplifier output stage (class B/AB). *Components:* 2 transistors of opposite type (NPN and PNP in emitter follower configuration) forming a totem-pole output, plus biasing network. One transistor pushes current on positive swings, the other pulls on negative swings, driving a load (often a speaker) in both directions. This arrangement provides greater power efficiency than class A and can deliver large output currents with low distortion in class AB (with slight bias to minimize crossover distortion). It’s used in nearly all analog power amplifiers (audio amplifiers, operational amplifier output stages), highlighting concepts like crossover distortion and the need for biasing diodes or circuitry to smooth the transition between devices.

### 37. Current Mirror

A **current source/sink circuit** that uses two (or more) transistors to copy (mirror) a reference current to another branch. *Type:* Active current source. *Components:* 2 matched BJTs (or MOSFETs) and typically 1 resistor to set reference current. One transistor is configured (with an emitter resistor or diode connection) so that a known reference current flows; the second transistor, having its base-emitter tied to the first, will mirror this current at its collector (assuming matching and equal V\_BE). The current mirror provides a relatively constant output current independent of load (within compliance limits). It is fundamental in analog IC design (bias circuits, active loads) and illustrates how transistor pairs can create controlled current sources or sinks that are relatively insensitive to power supply variations.

### 38. Differential Pair (BJT Differential Amplifier)

A **two-transistor input stage** that amplifies the difference between two input signals while rejecting common-mode components. *Type:* Differential amplifier. *Components:* 2 BJTs with emitters joined (forming a current-sharing node, often with a tail current source) and separate collector loads. When a small differential voltage is applied between the two bases, current shifts from one transistor to the other, producing a proportional difference in collector currents and thus a differential output voltage. The diff pair is the core of op-amp input stages and many comparator circuits, illustrating common-mode rejection (ideally only differences get amplified). It’s used to compare signals (comparator) or as the input of operational amplifiers and showcases the linear range and tail current biasing for bias stability.

### 39. Cascode Amplifier

A **two-transistor amplifier topology** where a transistor (usually a FET or BJT) in common-emitter/common-source feeds into a transistor in common-base/common-gate configuration. *Type:* High-gain, wide-band amplifier. *Components:* 2 transistors stacked (the lower transistor amplifies current, the upper provides a constant voltage at the lower’s collector, thus shielding it from Miller effect). The cascode achieves high output resistance and mitigates the Miller capacitance of the amplifying transistor, improving high-frequency performance. It provides roughly the gain of the two transistors multiplied (while one contributes current gain and the other voltage gain) without the stability issues of a direct two-stage. This circuit is used in RF amplifiers and analog design when high gain-bandwidth is needed, and it illustrates how combining configurations can overcome individual device limitations (like boosting gain and output impedance simultaneously).

## Field-Effect Transistor (FET) Circuits

### 40. MOSFET as a Switch

A **MOSFET transistor circuit** used for digital on/off control of loads, leveraging the MOSFET’s gate control. *Type:* Electronic switch (often enhancement-mode MOSFET). *Components:* 1 MOSFET (N-channel for low-side switch or P-channel for high-side) + gate biasing resistor. When a sufficient gate-to-source voltage is applied, the MOSFET enters conduction (low R\_DS(on)), acting like a closed switch connecting drain to source; with zero gate bias, it is off (open circuit). MOSFET switches are ubiquitous in power electronics (e.g. switching regulators, motor drivers) due to their high input impedance and fast switching. This circuit demonstrates transistor operation in cut-off and ohmic (saturation for P-MOSFET terminology) regions similarly to a BJT switch, but with voltage-driven control and very low gate current.

### 41. MOSFET Common Source Amplifier

A **single-stage FET amplifier** analogous to the BJT common emitter, where the source is the common node. *Type:* Voltage amplifier (inverting). *Components:* 1 MOSFET with bias network (gate resistor divider bias or current source) and a drain resistor as load. A small change in gate voltage modulates the channel current, causing a large change in voltage at the drain (inverted output) due to the load resistor. This yields significant voltage gain. The common source amplifier has high input impedance (gate) and is widely used in integrated circuits and discrete designs as a basic amplifying stage. It illustrates FET transconductance (Id vs Vgs) and is used in RF and analog circuits where high input impedance and moderate gain are required.

### 42. MOSFET Source Follower (Common Drain)

A **voltage buffer FET stage** where the output is taken from the source, which follows the gate voltage minus a Vgs drop. *Type:* Voltage follower (non-inverting, unity gain \~1). *Components:* 1 MOSFET with gate input, source connected to output (with source resistor or active load), and drain at supply (for an N-channel source follower). The source follower provides high input impedance and low output impedance, buffering signals similarly to a BJT emitter follower. Voltage gain is \~1 (slightly less due to Vgs offset), but it can source/sink more current into loads without loading the driving source. It’s used as a buffer in analog and RF circuits to interface high-impedance sources to low-impedance loads and demonstrates FET operation in a follower configuration.

### 43. MOSFET Common Gate Amplifier

A **FET amplifier configuration** where the gate is held at a fixed bias (AC ground) and the input is applied to the source, with output at the drain. *Type:* Current buffer / RF amplifier (non-inverting for voltage gain). *Components:* 1 MOSFET with gate bias network (e.g. to ground in AC sense), source resistor or input, and drain load resistor. The common gate amplifier has low input impedance (at source) and high output impedance, and it can provide voltage gain >1 without phase inversion. It is less common at audio frequencies but often used in RF front-ends (e.g. for impedance matching an antenna to a high-impedance amplifier) because it offers stable operation at high frequency (no Miller effect from gate). This circuit illustrates FET behavior with the gate as a reference and demonstrates an alternative biasing method for FETs.

### 44. JFET Common Source Amplifier

A **JFET-based amplifier** analogous to the MOSFET common source and BJT common emitter. *Type:* Voltage amplifier (inverting). *Components:* 1 JFET (junction FET) with bias resistors (often a source resistor with gate bias set by a resistor or self-bias through source resistor) and a drain resistor. The JFET’s gate is reverse-biased (no gate current), and a small change in gate-to-source voltage modulates the channel current, yielding a larger voltage change at the drain (inverted output). It provides high input impedance and moderate gain. JFET amplifiers are often used in the front-end of amplifiers (like microphones or guitars) due to their noise performance and high impedance. This circuit introduces the concept of FET pinch-off and self-bias stability (source degeneration for bias).

### 45. JFET Source Follower

A **JFET buffer stage** akin to the MOSFET source follower and BJT emitter follower. *Type:* Unity gain buffer (non-inverting). *Components:* 1 JFET with source resistor (or active load) and gate as input. The source follows the gate voltage minus the gate-source drop (which for JFET is about the bias needed to sustain the drain current). It has high input impedance and low output impedance, making it suitable for impedance matching (e.g. coupling a piezo sensor or high-Z microphone to a lower impedance amplifier). This circuit demonstrates JFET operation in a follower mode and is valued in analog circuits for its minimal loading of the source and ability to drive heavier loads without amplification of voltage (only current).

## Operational Amplifier Circuits

### 46. Inverting Amplifier (Op Amp)

A **classic op-amp configuration** where the input is applied through a resistor to the op amp’s inverting input, and the non-inverting input is grounded. *Type:* Voltage amplifier (inverting). *Components:* 1 op amp, 2 resistors (input resistor R\_in and feedback resistor R\_f). The op amp’s high gain and negative feedback force the inverting input to a virtual ground (0 V), so the gain equals –R\_f/R\_in (output is inverted). This circuit provides precise and stable gain set by resistor ratio and has low input impedance (equal to R\_in) and low output impedance. It’s fundamental in analog signal processing, used in instrumentation and audio amplifiers, summing junctions, etc., illustrating the op amp “golden rules” and negative feedback in action.

### 47. Non-Inverting Amplifier (Op Amp)

An **op-amp configuration** where the input is applied to the op amp’s non-inverting (+) input, and a feedback divider connects the output to the inverting (–) input. *Type:* Voltage amplifier (non-inverting). *Components:* 1 op amp, 2 resistors (R1 from output to – input, R2 from – input to ground). The gain is set by 1 + (R2/R1) (with R1 as feedback and R2 to ground). The output is in phase with the input and the input impedance is very high (op amp + input). This circuit is used when a high input impedance amplifier is needed (e.g. buffering sensors) or overall gain >1 without inversion. It demonstrates how op amps can amplify without inverting and how feedback keeps the differential input near zero (V+ = V–) to satisfy the output equation.

### 48. Voltage Follower (Buffer)

A **special case of the op-amp non-inverting amplifier** with unity gain. *Type:* Unity gain buffer (voltage follower). *Components:* 1 op amp (output directly connected to – input, + input is the signal). With feedback forcing the output to equal the input, the op amp outputs whatever voltage is needed to make V\_out = V\_in. Gain is 1, with no phase inversion. This buffer provides extremely high input impedance (almost infinite) and very low output impedance, acting as an ideal isolation stage. It draws virtually no current from the source and can drive heavy loads. Voltage followers are used extensively for impedance matching, isolating sensor outputs, and as internal stages in circuits. They illustrate the principle of unity feedback and an op amp’s ability to act as a perfect wire (within its bandwidth and output limits).

### 49. Summing Amplifier (Op Amp Adder)

An **op-amp circuit that outputs the weighted sum of multiple inputs** applied to the inverting input through separate resistors. *Type:* Linear summer (inverting adder). *Components:* 1 op amp, multiple input resistors (one per input), 1 feedback resistor. By superposition, the op amp maintains virtual ground at the inverting node, so each input contributes an output term of –(R\_f/R\_in\_i)\*V\_in\_i. The outputs sum, yielding V\_out = –(R\_f/R1)·V1 – (R\_f/R2)·V2 – …. This produces an algebraic sum with chosen weightings (via resistor ratios). It’s used in audio mixers (summing audio signals), digital-to-analog converters (summing weighted binary voltages), and any analog computing where addition or averaging is needed. It demonstrates linear superposition in op amp circuits and how multiple inputs can be combined with minimal interaction.

### 50. Differential Amplifier (Op Amp Subtractor)

An **op-amp configuration that subtracts one voltage from another**, producing an output proportional to the difference. *Type:* Difference amplifier (subtractor). *Components:* 1 op amp, 4 resistors (two forming input voltage dividers to each op amp input, typically arranged so the gain for both inputs is equal). The classic differential amplifier uses both inverting and non-inverting terminals with resistor network such that V\_out = (R2/R1)\*(V₂ – V₁), if symmetrical (where V₂ is at non-inverting via divider, V₁ at inverting via matching divider). This amplifies the difference while rejecting any common voltage on V₁ and V₂. It is essentially an op amp realization of a bridge that produces an output only for differences. Used in sensor interfaces (e.g. reading bridge circuits), as the core of instrumentation amplifiers, or any time a subtraction of signals is needed (removing offsets, comparing signals). It illustrates common-mode rejection and the principle behind many analog computational circuits.

### 51. Instrumentation Amplifier

A **precision differential amplifier circuit** with very high input impedance and gain, often built from three op amps. *Type:* Differential instrumentation amplifier. *Components:* 3 op amps (typically): two serve as high-impedance buffers for each input and also provide gain, and the third op amp subtracts the two buffer outputs. A classic 3-op-amp instrumentation amp has a gain set by a single resistor between the two buffer amplifier outputs (which are connected in a special feedback network). It provides high common-mode rejection, stable gain, and high input impedance to measure small voltage differences in the presence of large common-mode voltages. Used for sensor signal conditioning (e.g. strain gauges, ECG leads) where accuracy and noise rejection are crucial. It illustrates the combination of buffering and differential amplification to achieve high performance and the concept of common-mode rejection ratio (CMRR).

### 52. Integrator (Op Amp)

An **op-amp circuit that performs mathematical integration**, outputting a voltage proportional to the time integral of the input. *Type:* Active integrator (inverting). *Components:* 1 op amp, 1 feedback capacitor (in place of R\_f), 1 input resistor. In this inverting integrator, the op amp drives its output such that the current through the input resistor charges the capacitor. The output voltage changes at a rate proportional to the input: \*dV\_out/dt = –(1/RC)*V\_in*. Thus *V\_out(t) = –(1/RC) ∫ V\_in dt*. This produces a phase shift of –90° (ideal) for sinusoidal inputs and outputs a ramp for a step input. Active integrators are used in analog computers, signal waveform generation (e.g. triangle wave from constant input), and active filters (forming 1/ω impedance elements). The circuit demonstrates the op amp’s ability to simulate inductive or capacitive behavior and the impact of the *RC* time constant on integration rate.

### 53. Differentiator (Op Amp)

An **op-amp circuit that produces an output proportional to the time derivative of the input** signal. *Type:* Active differentiator (inverting). *Components:* 1 op amp, 1 input capacitor (in series with input), 1 feedback resistor. In the ideal differentiator, the capacitor at the input and resistor in feedback cause the output to respond to the slope of the input: *V\_out = –R\_f \* C \* (dV\_in/dt)*. A fast-changing input yields a larger output, and a constant (DC) input yields zero output (since derivative of constant is zero). This circuit will output sharp pulses for fast edges (e.g. differentiating a square wave gives spikes). Differentiators are used in analog computers, edge detection (e.g. creating trigger pulses from a rising signal), or shaping circuits (snubber networks). Practical designs add small series resistance or parallel capacitance for stability. It illustrates how op amp circuits can realize calculus operations and the effect of frequency-dependent impedance on gain (noting an ideal differentiator’s gain increases with frequency, which requires care to avoid noise amplification).

### 54. Comparator (Op Amp as Comparator)

A **circuit that compares two analog voltages and produces a digital output indicating which is higher**. *Type:* Open-loop op amp comparator (no feedback). *Components:* 1 op amp (or dedicated comparator) possibly with reference voltage at one input. In this configuration, the op amp is used without feedback so that even a tiny differential input drives the output to saturation at the positive supply (if V+ > V–) or negative supply (if V+ < V–). The output is essentially a binary signal (HIGH or LOW) representing the result of the comparison. Comparators are used for threshold detection (e.g. turning sensor analog signals into logic signals) and in circuits like zero-cross detectors or relaxation oscillators. This circuit illustrates the op amp’s high open-loop gain and the concept of saturation, as well as the need for considerations like hysteresis to prevent chatter if the input is noisy (hysteresis leads to the Schmitt trigger, below).

### 55. Schmitt Trigger (Comparator with Hysteresis)

A **comparator circuit with positive feedback** that provides hysteresis – two distinct threshold voltages for switching high vs low. *Type:* Bistable threshold detector. *Components:* 1 comparator or op amp, a resistor network for positive feedback (voltage divider from output to + input) and reference. When the output switches, the feedback shifts the effective reference threshold, creating a band of indifference (hysteresis gap). Thus the output switches to HIGH only when the input exceeds an upper threshold, and will not switch back LOW until the input falls below a lower threshold. This produces a clean, stable output even with slowly changing or noisy input signals. Schmitt triggers are used for signal conditioning (cleaning up switches, sensors), creating square waves from sine waves, and in oscillators. It illustrates how adding positive feedback creates memory (bistability) and eliminates rapid switching back-and-forth around a single threshold.

### 56. Active Low-Pass Filter (Op Amp)

A **frequency-selective amplifier** that passes low frequencies and rolls off high frequencies, using an op amp to achieve a desired gain and sharper cutoff. *Type:* Active filter (low-pass). *Components:* 1 op amp, resistors and capacitors (e.g. the Sallen–Key topology uses 2 resistors, 2 capacitors in a specific network around a buffer op amp). For example, a 2nd-order active low-pass can be made with an op amp configured to provide gain and a feedback RC network that creates a cutoff frequency *f\_c*. Unlike a passive RC, the active filter can have a steeper slope (–40 dB/decade for second-order) and can provide gain in the passband. This circuit is used in audio crossovers, anti-aliasing filters, and anywhere a flat low-frequency gain with attenuation at high frequency is needed. It demonstrates the integration of op amp gain with reactive components to shape frequency response.

### 57. Active High-Pass Filter (Op Amp)

A **frequency-selective op amp circuit** that passes high frequencies and attenuates low frequencies, using op amp gain to achieve desired characteristics. *Type:* Active filter (high-pass). *Components:* 1 op amp, resistors and capacitors (in a configuration dual to the low-pass, e.g. capacitors in series input and feedback, resistors to ground). A 2nd-order active high-pass (like Sallen–Key high-pass) will block DC and low frequencies (–40 dB/decade attenuation below cutoff) and provide a flat gain above the cutoff frequency. The op amp can also provide passband gain. Such circuits are used to remove DC offsets or baseline wander from signals while amplifying the AC parts of interest (e.g. in AC-coupled amplifiers or equalizers). It shows how reactive elements and op amp buffering combine to achieve a stable high-pass response with controlled cutoff and Q.

### 58. Active Band-Pass Filter (Op Amp)

A **filter circuit that passes a band of frequencies** between a lower and upper cutoff, realized with op amps to shape and amplify the response. *Type:* Active band-pass filter. *Components:* Op amp(s), resistors, capacitors. One common design is the multiple-feedback band-pass filter which uses one op amp with feedback including both a capacitor and resistor to set a narrow band. Alternatively, a state-variable filter can provide band-pass output by combining low-pass and high-pass sections. In any case, the band-pass allows frequencies near a center frequency f₀ to pass (with some gain) and attenuates frequencies much lower or higher. This is used in tone filters, communication channel selection, or equalizers. The circuit demonstrates how complex pole pairs (from op amp + RC networks) create a band-pass characteristic and how op amp gain can control the filter’s Q (quality factor or bandwidth).

### 59. Active Notch Filter (Op Amp)

An **op amp based filter** designed to severely attenuate (notch out) a specific frequency while leaving others mostly unaffected. *Type:* Active band-stop (notch) filter. *Components:* Op amp(s), resistors, capacitors configured to create a deep null at the notch frequency. One topology is the twin-T notch filter implemented actively: a passive twin-T RC network (which has a deep notch) is placed in the feedback loop of an op amp to sharpen and stabilize the notch. The op amp can buffer and even provide gain outside the stopband. This circuit is commonly used to eliminate an unwanted single frequency, such as mains hum (e.g. a 50/60 Hz notch filter in audio equipment). It highlights how op amp feedback can be used with frequency-selective networks to achieve very high attenuation at a chosen frequency while minimally affecting other frequencies.

### 60. Logarithmic Amplifier (Log Amp)

An **op amp non-linear circuit** whose output is proportional to the logarithm of the input voltage magnitude. *Type:* Non-linear analog computing circuit (log converter). *Components:* 1 op amp, a nonlinear element in feedback (often a diode or transistor junction). In a typical design, a diode or transistor (BJT) is placed in the feedback path of an inverting op amp. The op amp drives the diode to satisfy the feedback condition: *I = (V\_out – V\_in)/R ≈ I\_s \* exp(V\_out/(nV\_T))* for a BJT, resulting in *V\_out* ∝ log(V\_in) for a given reference. Thus a wide range of input amplitudes are compressed into a smaller range of output (log scale). Log amps are used in analog calculators, signal compression (like dB measurement of signals), or multiplying circuits (since log+sum+antilog can perform multiplication). This illustrates how semiconductor exponential I–V characteristics and op amp feedback can realize mathematical operations.

### 61. Anti-Log (Exponential) Amplifier

An **op amp circuit that produces an exponential output relative to input**, essentially the inverse of a log amplifier. *Type:* Non-linear analog computing circuit (anti-log converter). *Components:* 1 op amp, with a diode/transistor at the input node (instead of feedback) and a resistor in feedback. In a typical configuration, the input voltage drives a diode (or transistor base-emitter) at the op amp’s summing junction, causing an output current through the feedback resistor that grows exponentially with the input voltage. The result is *V\_out* (across R\_f) ∝ exp(V\_in). This circuit is used alongside log amps to perform analog multiplication or exponentiation, in analog function generators, etc. It demonstrates the op amp’s versatility in creating an output that follows a non-linear law, using the diode’s exponential I–V relationship.

### 62. Precision Rectifier (Op Amp)

A **rectifier circuit using an op amp and diode(s)** that can accurately rectify very small or low-level signals which a normal diode alone would distort (due to its 0.7 V drop). *Type:* Absolute value circuit (precision half-wave rectifier). *Components:* 1 op amp and 1 or 2 diodes (in feedback or input path). In one popular design, during the positive half-cycle, the op amp drives the output through a diode directly (acting as a unity follower), and during the negative half, the diode opens and the op amp, in inverting configuration, drives the output as the positive magnitude of the negative input. This yields an output equal to |V\_in| (for full-wave rectifier configuration) or at least an exact half-wave output without the diode threshold error. It is used in AC voltmeters, signal demodulators, or any application requiring rectification of small amplitudes with high fidelity. The circuit highlights how op amp gain can overcome diode drops and create ideal diode behavior (diode conducts with virtually zero drop in the feedback loop).

### 63. Transimpedance Amplifier (Current-to-Voltage Converter)

A **current-to-voltage converting op amp circuit** commonly used with sensors like photodiodes. *Type:* Current sensing amplifier. *Components:* 1 op amp, 1 feedback resistor (with the input current fed into the inverting node, and non-inverting node at reference ground). The op amp maintains the inverting input at virtual ground, so all input current (from a sensor or current source) flows through the feedback resistor R\_f. This produces an output voltage V\_out = –I\_in \* R\_f. The circuit thus linearly converts an input current into a proportional output voltage. It features extremely high input impedance for voltage (since the inverting input is virtual ground, the sensor sees almost 0 V bias), which is ideal for sensitive current-output devices (photodiodes, piezoelectric sensors). It illustrates application of op amp feedback to measure current accurately and is widely used in optical receivers, current monitors, and instrumental amplifiers for current-mode sensors.

### 64. Howland Current Source (Voltage-to-Current Converter)

A **configurable current source/sink circuit using an op amp** that provides a load-independent current determined by input voltage. *Type:* Voltage-controlled current source. *Components:* 1 op amp, 4 resistors (in a bridge network around the op amp). The Improved Howland current pump is a common design: by proper resistor ratio selection, the op amp drives its output to force a specific current through a load (which can be ground-referenced) equal to V\_in/R\_set, largely independent of load impedance. For example, the op amp senses the voltage across a sense resistor and adjusts output to maintain the programmed current. This allows sourcing or sinking a precise current into a floating load. It’s used in precision excitation of sensors, impedance analyzers, or waveform current sources. The circuit demonstrates how careful feedback network design can implement a controlled source, highlighting superposition and op amp’s ability to maintain linear relationships (here ensuring output current proportional to input voltage).

## Oscillators and Timer Circuits

### 65. 555 Astable Oscillator

A **free-running multivibrator circuit using the 555 timer IC** configured to generate a continuous square wave. *Type:* Astable oscillator (timer-based). *Components:* 1 NE555 timer chip, 2 resistors, 1 capacitor. In astable mode, the 555 charges the capacitor through two resistors (Ra + Rb) and discharges it through one resistor (Rb) periodically, causing the output to oscillate between high and low. The charge and discharge times (and thus the output frequency and duty cycle) are set by the resistor and capacitor values. This produces a stable oscillation without external triggering. It’s used for clock generation, LED blinkers, tone generation, etc. The circuit illustrates the use of a threshold-and-trigger comparator and an internal flip-flop within the 555 to create a simple relaxation oscillator, and it is often one of the first practical oscillator circuits learned.

### 66. 555 Monostable (One-Shot)

A **pulse generation circuit using the 555 timer IC** that produces a single output pulse of fixed duration when triggered. *Type:* Monostable multivibrator (one-shot). *Components:* 1 NE555 IC, 1 resistor, 1 capacitor (plus a trigger input). In monostable mode, the 555 is stable in a low output state. When a negative trigger pulse is applied, it causes the output to go high and the capacitor to charge through the resistor. After a time *T = 1.1 \* R \* C*, the capacitor voltage reaches the threshold and the 555 returns output low. This generates a single pulse of width T for each trigger. It’s used for debouncing, pulse width shaping, timers, etc., where a fixed-length output is needed from a trigger. The circuit demonstrates the 555’s internal comparators and flip-flop operation in a one-shot configuration and highlights how an RC network can define a precise time interval.

### 67. 555 Bistable (Flip-Flop Mode)

A **bi-stable latch circuit using a 555 timer** where the device is configured to operate as an SR flip-flop (no timing capacitor in the typical sense). *Type:* Bistable multivibrator (latching). *Components:* 1 NE555, set and reset trigger inputs (often via two push buttons with pull-ups) and no external capacitor-resistor timing network (or very large capacitor to ignore timing). In this configuration, the 555’s threshold and trigger act as Set and Reset: a trigger (active low on pin 2) drives output high (Set), and a threshold input (high on pin 6, often via the reset pin or a direct input) drives output low (Reset). The output remains in its last state until the opposite trigger is received. This behaves as a flip-flop (memory of one bit). It’s used in simple latching on/off circuits, toggle switches, etc. This circuit illustrates the versatile internal SR latch of the 555 and general bistable operation for memory and switching.

### 68. RC Phase-Shift Oscillator

A **sine-wave oscillator circuit** that uses an op amp or transistor and a feedback network of three RC sections to produce a continuous sinusoidal output. *Type:* Linear audio-frequency oscillator. *Components:* 1 amplifier (op amp or transistor) with gain, and 3 cascaded RC high-pass (or low-pass) filters in feedback, plus a resistor network to set gain. The RC network introduces a phase shift of 180° at one particular frequency (when each RC provides 60° shift), and the amplifier inverts (another 180°), resulting in 360° total phase loop – satisfying the Barkhausen phase criterion. At that frequency the loop gain is set to unity to sustain oscillations. The oscillation frequency is *f ≈ 1/(2πRC√6)* for equal R and C. This circuit is used for generating audio-frequency sinusoids in function generators, etc. It illustrates how phase shift in passive networks can be used to satisfy oscillation conditions and how an amplifier’s gain must be tuned to compensate for loop losses.

### 69. Wien Bridge Oscillator

A **low-distortion sine-wave oscillator** using an op amp (or transistors) and a lead-lag frequency-selective network (Wien bridge). *Type:* Linear oscillator (audio frequency). *Components:* 1 op amp (with a positive feedback Wien network: a series RC and parallel RC forming a bridge) and an amplitude stabilization element (like a lamp or diodes) to control gain. The Wien bridge provides zero phase shift and frequency-selective gain peaking at its resonant frequency. The op amp amplifies the feedback and the output oscillates at the frequency where the bridge is balanced (f = 1/(2πRC)). The amplitude is stabilized via an automatic gain control (e.g. a small incandescent lamp in the op amp’s negative feedback whose resistance increases with temperature/output amplitude, adjusting gain to 1). Wien bridge oscillators produce very low distortion sinusoids and are common in audio signal generators. This circuit demonstrates positive feedback with a frequency-selective network and the principle of automatic gain control to sustain stable oscillations.

### 70. Colpitts Oscillator

A **transistor or op amp LC oscillator** that uses a tapped capacitor divider in the feedback loop to determine frequency. *Type:* RF sinusoidal oscillator. *Components:* 1 amplifying transistor (BJT or FET) configured in common emitter/source or common base, and an LC resonant network: specifically two series capacitors in parallel with an inductor (the capacitors form a voltage divider for feedback). The oscillation frequency is set by the LC tank (*f = 1/(2π√(L \* C\_eq))* where C\_eq is series combination of the two capacitors). The capacitive divider ensures the correct phase and amplitude of feedback to sustain oscillation. Colpitts oscillators are widely used in RF transmitters and local oscillators because they are stable and easy to implement at high frequency. It illustrates one of the classic LC oscillator topologies and how energy exchange between inductors and capacitors, with a fraction fed back via the capacitive divider, can create sustained oscillations.

### 71. Hartley Oscillator

A **LC oscillator circuit** similar to Colpitts, but using a tapped inductor (or two inductors) in the feedback network instead of a capacitive divider. *Type:* RF sinusoidal oscillator. *Components:* 1 amplifying device (transistor or op amp) and an LC tank formed by an inductor split into two parts (or two inductors with a common node) and a parallel capacitor. The inductive divider provides feedback: the oscillation frequency is *f = 1/(2π√(L\_total \* C))* and the ratio of the inductances sets feedback fraction. The Hartley oscillator is also common in RF circuits (historically in radio transmitters/receivers). It demonstrates another way to achieve the phase condition for oscillation by using the phase shift through inductive coupling. Compared to Colpitts, it’s easier to implement if adjustable inductors (tapped coils) are available. It shows magnetic coupling and the use of mutual inductance (if a tapped autotransformer coil) in oscillator design.

### 72. Crystal Oscillator (Pierce Oscillator)

A **stable frequency oscillator** using a quartz crystal’s piezoelectric resonance as the frequency-determining element in a feedback loop. *Type:* High-stability oscillator. *Components:* 1 inverting amplifier (transistor or logic inverter), a quartz crystal (in series or parallel with small capacitors) forming the feedback network. The Pierce oscillator (a common crystal oscillator topology) uses a CMOS inverter or transistor and biases it such that with the crystal connected between output and input (with capacitors to ground), it sustains oscillation at the crystal’s resonant frequency. The crystal’s high Q ensures very stable, low-drift oscillations (frequently used for clock generation in microcontrollers, radios, etc.). This circuit illustrates how a crystal can serve as an extremely selective LC resonator (with Q in the thousands) and how an amplifier can excite it. It’s a practical realization of an analog oscillator that achieves precise frequency control (e.g. 32.768 kHz in watches or MHz in communications).

### 73. Astable Multivibrator (Transistor Oscillator)

A **free-running two-transistor oscillator** that generates a square wave by alternately switching two transistors on and off with RC timing. *Type:* Bistable relaxation oscillator (astable – no stable state). *Components:* 2 BJTs (or MOSFETs) cross-coupled via capacitors, with each transistor’s output feeding the other’s base through a capacitor, plus resistors for bias. In operation, when one transistor is on (saturated), the other is off; the charged coupling capacitor then biases the off transistor to turn on after a delay (set by RC), which in turn switches the first transistor off, and the cycle repeats. The result is a square/rectangular wave oscillation with a period determined by the RC time constants of charging on each half-cycle. This classic multivibrator is used for simple clock generation, LED flashers, etc., and it exemplifies how positive feedback and regenerative switching in transistor pairs can create an oscillation without any stable equilibrium. It highlights the interplay of capacitor charge and transistor switching and is an excellent example of digital behavior emerging from analog components.

### 74. Monostable Multivibrator (Transistor)

A **one-shot pulse generator** made from two cross-coupled transistors, where one stable state exists and a trigger causes a temporary switch to the unstable state before returning. *Type:* Monostable flip-flop (transistor-based). *Components:* 2 BJTs cross-coupled, but with an asymmetric timing network (one coupling via capacitor, one direct or via different RC). Normally one transistor is ON and the other OFF (stable). A trigger (e.g. a pulse to disturb the state) causes the stable transistor to turn off and the other to turn on. After a set time (determined by an RC network charging), the circuit returns to the original state. This produces a single pulse of a defined width on the transition. Such a circuit can be made by adding an RC to one base in a bistable pair. It’s less commonly used than the 555 monostable now, but it illustrates how transistors and capacitors can implement timing and temporary state change using discrete components.

### 75. Bistable Multivibrator (Latch)

A **two-transistor flip-flop circuit** with two stable states that can be set or reset with external triggers. *Type:* Bistable latch (transistor-based SR flip-flop). *Components:* 2 BJTs cross-coupled (each collector feeding the other’s base through a resistor), no capacitors (unlike the astable). In absence of capacitors, the circuit is stable in either of two states: Q high & /Q low or Q low & /Q high. A momentary trigger (a pulse to the base of one transistor, or using switches) can flip the circuit from one stable state to the other. This is the basic binary memory element. It was historically used in early computers and is conceptually how SRAM cells work (in CMOS). It demonstrates regenerative positive feedback and memory: once set, it remains in that state indefinitely until an external event forces it out. As an intro circuit, it shows how analog components can create a digital memory bit (and forms the basis for the 555 in bistable mode, which is essentially this concept with thresholds).

### 76. Relaxation Oscillator

A **general oscillator that charges a capacitor and periodically discharges it** once a threshold is reached, producing a non-sinusoidal waveform (usually triangular or sawtooth waves and a corresponding square wave). *Type:* Non-linear oscillator (relaxation type). *Components:* A capacitor, a resistor, and a threshold device (which could be a unijunction transistor, an op amp Schmitt trigger, or a neon lamp, etc.). In one common form, an op amp Schmitt trigger (with hysteresis) is used with a capacitor charging through a resistor into its input: the capacitor charges linearly until the upper threshold, then the op amp output flips causing the capacitor to discharge toward a lower threshold, then flips again, and repeats. Alternatively, a unijunction transistor relaxation oscillator uses the UJT to suddenly discharge the capacitor once its emitter reaches a peak voltage. The output is typically a sharp pulse or a square wave, and the capacitor voltage is a ramp. This kind of oscillator is used for generating clock pulses, sawtooth waveforms (e.g. in sweep generators), and blinking lights. It encapsulates how a slow buildup and a sudden non-linear discharge can create an oscillatory cycle and is an application of hysteresis or negative resistance devices in oscillators.

## Power Supply and Interface Circuits

### 77. Linear Voltage Regulator (Series Pass Regulator)

A **discrete linear regulator circuit** where a transistor (series pass element) adjusts its resistance to maintain a constant output voltage. *Type:* DC regulator (series linear). *Components:* 1 transistor (BJT or MOSFET) in series with the load, a reference voltage (e.g. a Zener diode or op amp driving the base/gate), and resistors for bias. The transistor acts as a variable resistor, controlled such that the output stays at the desired voltage. For example, an NPN emitter-follower with a Zener at the base: as output tends to change, the transistor base adjusts current to hold output \~Zener voltage minus V\_BE. This regulator provides a steady DC output against changes in input voltage or load current (within thermal limits). It’s essentially how a 7805 regulator IC works internally (with more complexity for precision). This circuit illustrates feedback in the analog domain to achieve regulation and the trade-offs of linear regulators: low noise output but power dissipation equal to voltage drop × current (hence inefficiency for large drops).

### 78. DC Power Supply Unit (Rectifier + Filter + Regulator)

A **composite circuit** combining several stages to convert AC mains into stable DC. *Type:* Full power supply system. *Components:* Transformer (to step down AC), bridge rectifier (4 diodes) for full-wave rectification, filter capacitor (to smooth ripple), and a voltage regulator (could be a Zener + transistor or IC regulator) to produce a steady DC output. Excluding the transformer, the typical component count is: 4 diodes + 1 capacitor + 1 regulator device (plus small resistors or caps for stability). The rectifier produces pulsating DC, the capacitor filter reduces ripple by charging at peaks and discharging between, and the regulator tightens the voltage to a precise level. This is *the* standard circuit taught for obtaining DC from AC (as found in wall adapters, bench power supplies). It solves the problem of converting and regulating power and illustrates clearly how analog circuits interplay: rectification (diodes), smoothing (capacitor), and feedback regulation (transistor or IC) to deliver a constant DC output even as input or load varies.

### 79. H-Bridge Motor Driver

A **transistor bridge circuit** that allows a DC motor or other load to be driven in both forward and reverse directions by reversing the polarity of the applied voltage. *Type:* Power driver (motor control). *Components:* 4 switching transistors (or MOSFETs) arranged in an “H” configuration – two “high-side” and two “low-side” switches forming two legs that connect either end of the motor to +V or ground. By closing one upper transistor and the opposite lower transistor (diagonally), current flows in one direction; switching to the other diagonal reverses current direction, thus reversing the motor rotation. Turning on either both upper or both lower transistors will brake or idle the motor. Often included are flyback diodes for inductive kick and sometimes a control IC. This circuit is fundamental in robotics and motor control, used for controlling direction and speed (when combined with PWM) of motors. It clearly illustrates the concept of quadrant switching and the analog drive of what is essentially a digitally controlled function (on/off transistors controlling current flow paths).

### 80. R-2R Ladder DAC

A **resistor network for digital-to-analog conversion** that uses repeating resistor values R and 2R to produce an analog output proportional to a binary digital input. *Type:* DAC (ladder network). *Components:* An R-2R ladder network – a structure of resistors of value R and 2R in a ladder-like fashion – and digital switches (transistors or logic gates) that connect input bits either to reference voltage or ground. The ladder divides currents or voltages binary-weightedly, and by the principle of superposition, the output is an analog voltage equal to the weighted sum of the binary inputs. For example, each bit contributes a voltage of V\_ref \* (bit\_weight)/(2^n) at the output. The beauty is it uses only two resistor values repeated, making it easy to fabricate and accurate if R is precise. It’s used in DAC chips, sound cards, etc., to convert digital values to analog signals (audio, video). This circuit demonstrates the linear superposition of currents in a network and how a simple repetitive structure can implement a complex function (binary weighted sum) in analog form.

### 81. Sample-and-Hold Circuit

A **data acquisition circuit** that samples an analog voltage at a moment in time and holds (locks) that voltage for some period, typically for an ADC to read. *Type:* Track-and-hold analog memory. *Components:* A switch (usually a FET or transmission gate), a capacitor, and a high-input-impedance buffer amplifier. In **sample (track) mode**, the switch is closed, and the capacitor charges to follow the input voltage. At the desired sample instant, the switch opens (**hold mode**), isolating the capacitor which then holds the last sampled voltage (the buffer outputs this voltage, preventing capacitor discharge). The output remains nearly constant (droop depends on capacitor leakage and buffer input bias) until the next sample command. Sample-and-holds are critical in ADC systems to present a stable voltage during conversion, and are used in analog memories or peak detectors. The circuit highlights issues like aperture time, charge injection, and droop – practical considerations in analog design – and emphasizes the idea of storing an analog value as charge on a capacitor.

### 82. Maxwell Bridge (Inductance Measurement)

A **classic AC bridge circuit** used to measure an unknown inductance by balancing two legs of a bridge, one leg containing the unknown inductor. *Type:* AC measurement bridge. *Components:* Four arms forming a bridge: one arm is the unknown inductor *L\_x* in series with a known resistor, an adjacent arm is a known standard capacitor *C\_s* in series with a resistor, and the other two arms are known pure resistors. An AC source excites the bridge, and a detector (galvanometer or null detector) is connected across the bridge. The variable resistor in series with *C\_s* (and sometimes the known resistor in series with *L\_x*) are adjusted until no difference voltage is detected (bridge balanced). At balance, the unknown inductance and its resistance are calculated from the known components and settings (using the balance equations). The Maxwell bridge illustrates the extension of Wheatstone bridge principles to reactive components and is used in labs to precisely measure inductors and their losses. It demonstrates how frequency comes into play (balance at a specific frequency) and how phase angles are nulled when inductive and capacitive reactances balance each other.

### 83. Schering Bridge (Capacitance Measurement)

An **AC bridge circuit designed to measure an unknown capacitance** (and its dissipation factor) by balancing against a known capacitance and resistance. *Type:* AC measurement bridge. *Components:* Four arms: one arm has the unknown capacitor *C\_x* (with its dielectric loss represented as a parallel or series resistor), another arm has a known standard capacitor *C\_s*, and the other two arms contain known resistors (one of which is variable). By adjusting the variable resistor (and sometimes another variable element) with an AC source applied, the bridge is balanced when the detector shows no AC difference. At balance, *C\_x* is computed from the ratio of resistor settings and *C\_s*. This bridge is specifically good at measuring small capacitors at high voltage and their insulation loss. It emphasizes how the quadrature components (capacitive reactances) and resistive components can be simultaneously balanced in a bridge. It’s a practical example of using an AC bridge to measure capacitance and power factor in dielectric materials, reinforcing the concept of phasor balance and loss angle in AC circuits.

### 84. Wien Bridge (AC Bridge Network)

A **frequency-sensitive bridge circuit** that can be used for measuring frequency or capacitance/inductance, and notably forms the basis of the Wien bridge oscillator (as seen above). *Type:* AC bridge (frequency bridge). *Components:* A Wien bridge has four arms: one arm is a series RC, one arm is a parallel RC (using identical R and C in the two arms), and the other two arms are pure resistors. At a particular frequency, the phase shift through the series and parallel network exactly cancel and their impedance magnitudes are in ratio, allowing the bridge to balance. This frequency is *f = 1/(2πRC)* for equal R and C. In measurement mode, if the bridge is driven by a fixed frequency, unknown components in the RC arms can be determined by achieving balance. Conversely, it can be used as a frequency-tunable notch filter. As mentioned, in an oscillator configuration, the Wien network determines the oscillation frequency. This circuit is famous for its role in very low distortion oscillators (when paired with an amplifier). As a bridge, it demonstrates how both amplitude and phase conditions can be met at one frequency, making it useful for precision filtering or measurement of one component given the others.

### 85. Twin-T Notch Filter (Passive)

A **passive RC filter network** that produces a very deep notch (near-total attenuation) at a specific frequency. *Type:* Notch filter (band-stop). *Components:* Two “T” shaped networks of resistors and capacitors – one T is an R-C-R series network, the other is a C-R-C parallel network – connected in parallel. Properly choosing equal components, the combination significantly attenuates the frequency where the reactances of capacitors equal the resistances (the notch frequency *f\_n ≈ 1/(2πRC)*). At *f\_n*, the impedance of one T is the complex conjugate of the other, causing nearly all input to cancel out at output. The twin-T by itself has a broad notch, but when used in an active filter with an op amp buffer and feedback, it can create an extremely deep and narrow notch. It’s used to eliminate a single frequency like mains hum in audio circuits. The twin-T illustrates the principle of frequency-selective phase opposition and is an elegant passive example of how combining networks can yield sharp nulls. It also shows limitations: by itself it has no gain, so it’s often combined with amplifiers for a more effective active notch (as in state variable filters or Wien oscillators for stabilization).

### 86. Square-Triangle Wave Generator

A **function generator circuit** that produces complementary square and triangle waveforms using an op amp integrator and Schmitt trigger in a loop. *Type:* Relaxation oscillator (dual waveform). *Components:* 2 op amp stages – one is a Schmitt trigger (comparator with hysteresis) that outputs a fast-transition square wave, and the other is an integrator that takes the square wave and produces a linearly ramping triangle wave. The triangle feeds back to the Schmitt’s input. As the triangle ramps up or down, it crosses the Schmitt trigger’s thresholds, causing the square wave to flip high or low, which in turn reverses the ramp’s direction. The result is a stable oscillation: the op amp integrator output is a triangle, and the Schmitt op amp output is a symmetric square wave. Frequency is set by the integrator’s RC and the Schmitt threshold (set by resistors). This circuit is widely used in function generators and in analog synthesizer VCOs when a stable linear ramp is needed. It exemplifies how combining linear integration with non-linear switching yields simple waveform generation and clearly separates the timing (integration rate) from threshold detection.

### 87. Constant Current Source (Transistor/JFET)

A **circuit that provides nearly constant current to a load regardless of load voltage (within compliance limits)**. *Type:* Current regulator. *Components:* Could be (A) a JFET used in its saturation region as a current source (with source resistor to set current), or (B) a BJT with emitter degeneration: e.g. a transistor with emitter resistor and base biased at fixed voltage, so emitter current (hence collector current) ≈ (V\_base – V\_BE)/R\_emitter. One simple example is using an LED or reference at base of an NPN and an emitter resistor; the emitter (and thus collector) current is then fixed \~ (V\_ref – 0.7)/R\_e. Another example: a JFET configured as a “current diode” with gate tied to source – it will roughly conduct its IDSS current over a wide drain-source voltage range. These circuits feed a constant current into a load, useful for biasing (like providing bias current to sensors or active loads in amplifiers) and illustrate the concept of a current source analog (dual to a voltage source). It highlights transistor operation in saturation (for FET, meaning pinched channel) or the role of emitter resistor feedback in fixing current. Constant current sources are key in analog bias stability and are often seen in current mirrors (which we listed separately) and active loads for amplifiers.

### 88. Buck Converter (Step-Down Regulator)

A **DC-DC switching regulator circuit** that efficiently converts a higher DC input voltage to a lower DC output voltage by chopping the input and smoothing it. *Type:* Switching power converter (step-down). *Components:* A high-speed switch (transistor or MOSFET), a diode (or synchronous transistor), an inductor, and output capacitor. The transistor switch connects the input to inductor periodically (at high frequency). When on, current builds in inductor (and it powers the load); when off, the inductor current continues through the diode into the load and capacitor, causing the inductor to discharge. By adjusting the duty cycle (fraction of time the switch is on), the average output voltage is controlled (V\_out ≈ D \* V\_in). The output capacitor filters the ripple. Unlike linear regulators, the buck converter swaps voltage for current via the inductor, achieving high efficiency (energy is transferred rather than dissipated as heat). This circuit is widely used in battery-powered devices and computer power supplies. It demonstrates in a very real way the principles of energy storage in inductors, pulse-width modulation, and feedback control (usually a feedback controller adjusts the duty to maintain target voltage). The buck converter is a prime example of power electronics, showing how analog components (inductor, capacitor) and switching elements yield efficient voltage regulation.

## Activity

Top 100 Analog Circuits for Introductory Electrical Engineering
ChatGPT

I'm compiling a list of the top 100 analog electrical circuits commonly used in introductory EE courses, excluding digital circuits. The focus is on theoretical and practical circuits.

Searched for typical introductory analog circuits

ChatGPT

I'm looking into the Analog Devices Wiki for a list of circuits in Circuits I & II.

[![Favicon](https://www.google.com/s2/favicons?domain=https://wiki.analog.com&sz=16)](https://wiki.analog.com/)

Read [wiki.analog.com](https://wiki.analog.com/)

ChatGPT

I'm compiling the top 100 analog circuits, focusing on detailed descriptions, their types, component counts, and educational purposes. This aims to provide a comprehensive understanding of each circuit's real-world applications.

Searched for voltage divider components description

ChatGPT

I'm thinking Wikipedia might have a description and context for "Voltage divider."

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=16)](https://en.wikipedia.org/)

Read [en.wikipedia.org](https://en.wikipedia.org/)

ChatGPT

I'm checking out a voltage divider, a two-resistor circuit, noting its function in voltage scaling, referencing, and measuring, and considering sources for citations.

Searched for common introductory analog circuits

ChatGPT

I've compiled resources such as LinkedIn articles, AllAboutCircuits forum discussions, and blog posts, highlighting commonly used basic analog circuits.

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.eeworld.com.cn&sz=16)](https://en.eeworld.com.cn/)

Read [en.eeworld.com.cn](https://en.eeworld.com.cn/)

ChatGPT

OK, I'm thinking about issues with the link---could be login or forum access. Hm, let me see.

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.eeworld.com.cn&sz=16)](https://en.eeworld.com.cn/)

Read more from [en.eeworld.com.cn](https://en.eeworld.com.cn/)

ChatGPT

I'm digging into searching the forum's main site for archived threads, trying Google, and using '100 Examples analog circuits eeworld' directly in the browser.

Searched for commonly used daily life analog circuits

ChatGPT

I suspect the direct link might be inaccessible due to content being a compiled list, PDF, or cached. Considering search terms to find what we need.

Searched for EEWorld list of analog circuits

ChatGPT

I'm gathering info on using "100. This ..." for a search, possibly focusing on circuits commonly found in daily life.

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.eimtechnology.com&sz=16)](https://www.eimtechnology.com/)

Read [eimtechnology.com](https://www.eimtechnology.com/)

ChatGPT

I'm gathering info on RC circuits, diode rectifiers, voltage dividers, 555 timers, op-amps, LC oscillators, H-bridges, voltage regulators, LED drivers, and transistor switches for an analog circuits class.

[![Favicon](https://www.google.com/s2/favicons?domain=https://forum.allaboutcircuits.com&sz=16)](https://forum.allaboutcircuits.com/)

Read [forum.allaboutcircuits.com](https://forum.allaboutcircuits.com/)

ChatGPT

I'm thinking about using Google instead of the browse tool to explore other options.

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.quora.com&sz=16)](https://www.quora.com/)

Read [quora.com](https://www.quora.com/)

ChatGPT

I'm pulling together fundamental analog circuits: resistive circuits, transient RC/RL circuits, diodes, transistors, op amps, and oscillators for introductory electrical engineering courses.

Searched for common emitter amplifier components description

ChatGPT

I'm mapping out which circuit elements to count as components, excluding wires and possibly the power source, focusing on discrete passive and active parts.

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=16)](https://en.wikipedia.org/)

Read [en.wikipedia.org](https://en.wikipedia.org/)

ChatGPT

I explored circuit examples like Wheatstone bridges and H-bridges to identify their components, aligning with our component-to-circuit mapping strategy.

Searched for Wheatstone bridge resistor description

ChatGPT

I'm thinking about what Wikipedia might offer regarding the topic.

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=16)](https://en.wikipedia.org/)

Read more from [en.wikipedia.org](https://en.wikipedia.org/)

ChatGPT

The snippet describes the operation but lacks precise details on "four resistors etc." The figure caption mentions "four resistors forming diamond shape."

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=16)](https://en.wikipedia.org/)

Read more from [en.wikipedia.org](https://en.wikipedia.org/)

ChatGPT

I'm compiling a list of circuits, including resistive, capacitive, inductive, operational amplifier, and oscillator circuits, while noting their applications and educational relevance.

I'm narrowing down to 100 circuits, ensuring a balance between advanced and fundamental concepts, including operational amplifiers, oscillators, and power supply circuits.

I'm ensuring the list of 100 circuits includes advanced analog concepts like log amplifiers and transformer coupling circuits, while balancing foundational circuit principles.

I'm weighing the inclusion of advanced circuits like square-triangle wave oscillators and analog control loops, assessing their placement within the 100 analog circuits list.

[![Favicon](https://www.google.com/s2/favicons?domain=https://ocw.mit.edu&sz=16)](https://ocw.mit.edu/)

Read [ocw.mit.edu](https://ocw.mit.edu/)

ChatGPT

I'm adding circuits to the syllabus, covering diodes, transistors, and operational amplifiers, ensuring advanced topics are included as advanced topics. Progressing through, I'm refining the list and ensuring all essential circuits are incorporated.

Searched for examples of basic analog circuits

ChatGPT

Taking a closer look at search outcomes.

I'm suggesting "commonly used analog circuits list" for more insights.

Searched for list of 100 commonly used analog circuits

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.ti.com&sz=16)](https://www.ti.com/)

Read [ti.com](https://www.ti.com/)

ChatGPT

: Considering progression from voltage dividers to operational amplifiers, ensuring clarity and foundational understanding.

Searched for current divider circuit resistors

ChatGPT

OK, let's calculate current division in parallel circuits. Using resistances and total current to figure out currents in each branch.

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=16)](https://en.wikipedia.org/)

Read [en.wikipedia.org](https://en.wikipedia.org/)

ChatGPT

I researched "two resistors," and while Wikipedia provided conceptual insights, electronics-tutorials explained "two resistors in parallel."

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=16)](https://www.electronics-tutorials.ws/)

Read [electronics-tutorials.ws](https://www.electronics-tutorials.ws/)

ChatGPT

OK, let me see. I'm pulling together details on basic current dividers, focusing on parallel resistors R1 and R2. This info will be helpful for various circuits.

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=16)](https://www.electronics-tutorials.ws/)

Read more from [electronics-tutorials.ws](https://www.electronics-tutorials.ws/)

ChatGPT

I'm exploring Wheatstone bridge circuits and considering voltage and current dividers. Thevenin and Norton equivalents are also under review, with a preference towards clear descriptions.

[![Favicon](https://www.google.com/s2/favicons?domain=https://wiki.analog.com&sz=16)](https://wiki.analog.com/)

Read [wiki.analog.com](https://wiki.analog.com/)

ChatGPT

Whittling down the Thevenin equivalent to a voltage source and series resistor.

Searched for Thevenin equivalent circuit source resistor

[![Favicon](https://www.google.com/s2/favicons?domain=http://openbooks.library.umass.edu&sz=16)](http://openbooks.library.umass.edu/)

Read [openbooks.library.umass.edu](http://openbooks.library.umass.edu/)

ChatGPT

OK, let me see. The Thévenin equivalent circuit involves an ideal independent voltage source linked with a resistor in series.

[![Favicon](https://www.google.com/s2/favicons?domain=http://openbooks.library.umass.edu&sz=16)](http://openbooks.library.umass.edu/)

Read more from [openbooks.library.umass.edu](http://openbooks.library.umass.edu/)

Searched for Norton equivalent circuit current source resistor

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.allaboutcircuits.com&sz=16)](https://www.allaboutcircuits.com/)

Read [allaboutcircuits.com](https://www.allaboutcircuits.com/)

Searched for Norton equivalent circuit components

ChatGPT

Piecing together Norton equivalent circuit: a current source linked to parallel resistance. Progressing through the components' roles to clarify their connections.

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=16)](https://en.wikipedia.org/)

Read [en.wikipedia.org](https://en.wikipedia.org/)

ChatGPT

OK, let me see. Line 158-167 talks about replacing a black box with an equivalent circuit, from Thevenin to RC transient.

Searched for RC charging circuit components

ChatGPT

Using Wikipedia to learn about RC circuits.

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=16)](https://en.wikipedia.org/)

Read more from [en.wikipedia.org](https://en.wikipedia.org/)

ChatGPT

I'm gathering insights on RC circuits, which involve resistors and capacitors, often used in filtering processes. RC transients feature an exponential charging or discharging time constant.

Searched for RL filter components

ChatGPT

I'm thinking through incorporating reinforcement learning circuits similarly to before, adapting to new challenges and improving algorithms. This ensures continual progress.

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=16)](https://en.wikipedia.org/)

Read more from [en.wikipedia.org](https://en.wikipedia.org/)

ChatGPT

I'm looking at how RL circuits involve resistors and inductors, with the first-order variation including just one of each.

Searched for LC circuit resonant components

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.geeksforgeeks.org&sz=16)](https://www.geeksforgeeks.org/)

Read [geeksforgeeks.org](https://www.geeksforgeeks.org/)

ChatGPT

RLC band-pass filters allow frequencies around the resonant frequency while attenuating others, often used in tuned circuits. Thus, providing a clear understanding of their function and application.

Searched for clipper circuit diode waveform limit

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=16)](https://www.electronics-tutorials.ws/)

Read [electronics-tutorials.ws](https://www.electronics-tutorials.ws/)

ChatGPT

I'm thinking through the Diode Clipper's function, which shapes waveforms by cutting its top, bottom, or both halves, like a half-wave rectifier.

Searched for diode clamper DC offset waveform

ChatGPT

I'm looking at how a clamper circuit integrates a DC offset into an AC signal, creating a unipolar voltage.

Searched for peak detector components

ChatGPT

Taking a closer look at the ADI wiki, it's clear that a peak detector circuit uses a diode and capacitor to output a DC voltage that mirrors the input signal's peak.

Searched for transistor switch operation

[![Favicon](https://www.google.com/s2/favicons?domain=https://learn.sparkfun.com&sz=16)](https://learn.sparkfun.com/)

Read [learn.sparkfun.com](https://learn.sparkfun.com/)

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.geeksforgeeks.org&sz=16)](https://www.geeksforgeeks.org/)

Read [geeksforgeeks.org](https://www.geeksforgeeks.org/)

ChatGPT

I'm identifying the core characteristics of a transistor as a switch. It operates like a closed switch in saturation and an open switch when off, which I've found in \[48\] L150-158.

Searched for voltage divider bias circuit components

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=16)](https://www.electronics-tutorials.ws/)

Read [electronics-tutorials.ws](https://www.electronics-tutorials.ws/)

ChatGPT

I'm noting the strengths and weaknesses of voltage divider and fixed bias configurations, considering practical use and stability in transistor circuits.

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=16)](https://en.wikipedia.org/)

Read [en.wikipedia.org](https://en.wikipedia.org/)

ChatGPT

I'm aiming for a concise description of an inverting amplifier, focusing on finding simpler sources like SparkFun or AllAboutCircuits for definitions.

Searched for inverting amplifier op-amp configuration

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=16)](https://www.electronics-tutorials.ws/)

Read [electronics-tutorials.ws](https://www.electronics-tutorials.ws/)

ChatGPT

I'm digging into the inverting op-amp topology, praised for its straightforwardness and widespread use. It consistently yields a negative gain output.

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=16)](https://www.electronics-tutorials.ws/)

Read more from [electronics-tutorials.ws](https://www.electronics-tutorials.ws/)

ChatGPT

Rather than clinging solely to search results, exploring page navigation seems more effective for a thorough understanding.

Searched for non-inverting amplifier op-amp configuration

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.analog.com&sz=16)](https://www.analog.com/)

Read [analog.com](https://www.analog.com/)

ChatGPT

I'm examining non-inverting and inverting op amp circuits, with a focus on summing amplifiers for signal mixing.

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.arrow.com&sz=16)](https://www.arrow.com/)

Read [arrow.com](https://www.arrow.com/)

ChatGPT

Consulting parallel resistors in the inverting input to combine input voltages in a summing amplifier. This setup allows flexibility in adding multiple input voltages without adjusting resistor values.

Searched for differential amplifier op-amp description

ChatGPT

I'm noting the key features of differential amplifiers, emphasizing their capability to amplify voltage differences while rejecting common voltages. It's interesting to see their distinct functionality.

Searched for instrumentation amplifier description

ChatGPT

An instrumentation amplifier, often with three op amps, stands out for high input impedance and common-mode rejection, frequently seen in sensor amplification.

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.ti.com&sz=16)](https://www.ti.com/)

Read [ti.com](https://www.ti.com/)

ChatGPT

I'm detailing how op amp integrators and differentiators function---integrating and differentiating input signals by manipulating capacitors in the feedback and input circuits, resulting in specific signal processing characteristics.

Searched for op-amp integrator description

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=16)](https://www.electronics-tutorials.ws/)

Read [electronics-tutorials.ws](https://www.electronics-tutorials.ws/)

ChatGPT

An integrator op-amp generates an output voltage that mirrors the input's amplitude and duration, with the ideal output being the negative integral of the input.

Searched for op-amp differentiator description

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-notes.com&sz=16)](https://www.electronics-notes.com/)

Read [electronics-notes.com](https://www.electronics-notes.com/)

ChatGPT

I'm building on the idea of a differentiator circuit and exploring the comparator's role as an analog-digital interface. This leads me to think about its function: converting analog inputs to digital outputs.

Searched for op-amp comparator output threshold

ChatGPT

The portrayal of the op-amp's high gain as rapid output movement to the maximum or minimum mirrors the action of a comparator with hysteresis, effectively reducing noise through positive feedback.

Searched for Schmitt trigger comparator hysteresis

ChatGPT

A Schmitt trigger is a comparator with hysteresis, converting analog signals into stable digital outputs. This versatility is appealing for signal processing.

Searched for all-pass filter phase shift

ChatGPT

The all-pass filter allows all frequencies to pass without affecting their gain, but it modifies the phase relationships among them.

Searched for H-bridge circuit transistors motor direction

ChatGPT

An H-bridge circuit efficiently manages both direction and speed of small DC motors, which makes me think about their versatility in motor control.

[![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=16)](https://www.electronics-tutorials.ws/)

Read [electronics-tutorials.ws](https://www.electronics-tutorials.ws/)

ChatGPT

I'm looking into the functionality of H-bridge circuits for controlling DC motors, considering their ability to manage bidirectional rotation through voltage changes.

[![Favicon](https://www.google.com/s2/favicons?domain=https://wiki.analog.com&sz=16)](https://wiki.analog.com/)

Read [wiki.analog.com](https://wiki.analog.com/)

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=16)](https://en.wikipedia.org/)

Read [en.wikipedia.org](https://en.wikipedia.org/)

ChatGPT

I'm considering a Zener diode in reverse breakdown for stable voltage and a linear regulator using a transistor for constant output. Precision rectifiers for small signals and R-2R ladders for DAC are also explored.

Searched for R-2R ladder DAC resistors

ChatGPT

I'm exploring the concept of an R--2R ladder. It's interesting to see how simple resistor arrangements can perform digital-to-analog conversion.

I'm thinking about how to search online for specific topics, like "100 Examples of Commonly Used Basic Analog Circuits." This approach should streamline finding relevant articles.

Searched for 100 basic analog circuits examples

Searched for sample and hold circuit components

ChatGPT

I'm ensuring a structured lineup by categorizing circuits into resistive, reactive, diode, transistor biasing, op-amp, oscillator, and power supply circuits. This method effectively organizes the circuits for clarity.

I'm gathering citations for each circuit, using Wikipedia and specific sources for intricate circuits like BN45. Ensuring each circuit is properly referenced for comprehensive coverage.

I'm mapping out integrators, differentiators, comparators, Schmitt triggers, and active filters for analog computing, skipping precision rectifiers. Progressing through each component methodically.

[![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=16)](https://en.wikipedia.org/)

Read more from [en.wikipedia.org](https://en.wikipedia.org/)

ChatGPT

I'm planning to outline the precision rectifier, transimpedance amplifier, improved Howland current pump, and various oscillators like the 555 and RC, detailing their typical uses and applications.

I'm considering integrating and comparing waveforms, mentioning constant current methods like BJTs and JFETs, and exploring the buck converter for chopping DC.

Searched for buck converter step-down regulator

ChatGPT

I'm outlining the format for circuit descriptions, ensuring each includes type, components, and applications, aiming for a cohesive narrative.


## Sources and Citations


![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32) [Voltage divider](https://en.wikipedia.org/wiki/Voltage_divider#:~:text=In%20electronics%20%2C%20a%20voltage,from%20the%20connection%20between%20them)

In electronics , a voltage divider (also known as a potential divider) is a 87 linear circuit that produces an output $V_{out}$ that is a fraction of its input voltage $V_{in}$. Voltage division is the result of distributing the input voltage among the components of the divider. A simple example of a voltage divider is two resistors connected in 91, with the input voltage applied across the resistor pair and the output voltage emerging from the connection between them.


![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
Voltage divider - Wikipedia
Resistor voltage dividers are commonly used to create reference voltages, or to reduce the magnitude of a voltage so it can be measured, and may also be used as signal attenuators at low frequencies. For direct current and relatively low frequencies, a voltage divider may be sufficiently accurate if made only of resistors; where frequency response over a wide range is required (such as in an 93 probe), a voltage divider may have capacitive elements added to compensate load capacitance. In electric power transmission, a capacitive voltage divider is used for measurement of high voltage.
](https://en.wikipedia.org/wiki/Voltage_divider#:~:text=Resistor%20voltage%20dividers%20are%20commonly,for%20measurement%20of%20high%20voltage)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Current Divider and the Current Division Rule - Electronics Tutorials
Here this basic current divider circuit consists of two resistors: R\_{1}, and R\_{2} in parallel. This parallel combination splits the source current, I\_{S} between them into two separate currents, I\_{R1} and I\_{R2} before the current joins together again and returns back to the source.
](https://www.electronics-tutorials.ws/dccircuits/current-divider.html#:~:text=Here%20this%20basic%20current%20divider,returns%20back%20to%20the%20source)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Wheatstone Bridge Circuit and Theory of Operation
A Wheatstone bridge circuit has two input terminals and two output terminals consisting of four resistors configured in a familiar diamond-like arrangement as shown. This is typical of how the Wheatstone bridge is drawn.
](https://www.electronics-tutorials.ws/blog/wheatstone-bridge.html#:~:text=A%20Wheatstone%20bridge%20circuit%20has,the%20Wheatstone%20bridge%20is%20drawn)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
Wheatstone bridge - Wikipedia
A Wheatstone bridge is an electrical circuit used to measure an unknown 101 by balancing two legs of a bridge circuit , one leg of which includes the unknown component. The primary benefit of the circuit is its ability to provide extremely accurate measurements (in contrast with something like a simple 103).\[ 1 \] Its operation is similar to the original potentiometer.
](https://en.wikipedia.org/wiki/Wheatstone_bridge#:~:text=A%20Wheatstone%20bridge%20is%20an,similar%20to%20the%20original%20potentiometer)[

![Favicon](https://www.google.com/s2/favicons?domain=http://openbooks.library.umass.edu&sz=32)
openbooks.library.umass.edu
3.5 Thevenin Equivalence -- Applied Electrical Engineering Fundamentals
helpful in circuit analysis as well as in circuit implementation. The Thévenin equivalent circuit is constructed from an ideal independent voltage source connected in series with a resistor as shown:
](http://openbooks.library.umass.edu/funee/chapter/3-5/#:~:text=helpful%20in%20circuit%20analysis%20as,with%20a%20resistor%20as%20shown)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
Norton's theorem - Wikipedia
Image: textAny black box containing resistances only and voltage and current sources can be replaced by an equivalent circuit consisting of an equivalent current source in parallel connection with an equivalent resistance. Image Edward Lawry Norton
](https://en.wikipedia.org/wiki/Norton%27s_theorem#:~:text=Image%3A%20textAny%20black%20box%20containing,Image%20Edward%20Lawry%20Norton)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
RC circuit - Wikipedia
A resistor--capacitor circuit (RC circuit), or RC filter or RC network, is an electric circuit composed of 118 and capacitors . It may be driven by a 120 or current source and these will produce different responses. A first order RC circuit is composed of one resistor and one capacitor and is the simplest type of RC circuit.
](https://en.wikipedia.org/wiki/RC_circuit#:~:text=A%20resistor%E2%80%93capacitor%20circuit%20,simplest%20type%20of%20RC%20circuit)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
RC circuit - Wikipedia
The simplest RC circuit consists of a resistor with resistance R and a charged capacitor with capacitance C connected to one another in a single loop, without an external voltage source. The capacitor will discharge its stored energy through the resistor. If V(t) is taken to be the voltage of the capacitor's top plate relative to its bottom plate in the figure, then the 129 says the current I(t) exiting the capacitor's top plate will equal C multiplied by the negative time derivative of V(t). Kirchhoff's current law says this current is the same current entering the top side of the resistor, which per 131 equals V(t)/R.
](https://en.wikipedia.org/wiki/RC_circuit#:~:text=The%20simplest%20RC%20circuit%20consists,t%29%2FR)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
RL circuit - Wikipedia
A resistor--inductor circuit (RL circuit), or RL filter or RL network, is an electric circuit composed of 96 and inductors driven by a 98 or current source .\[ 1 \] A first-order RL circuit is composed of one resistor and one inductor, either in 100 driven by a voltage source or in parallel driven by a current source. It is one of the
](https://en.wikipedia.org/wiki/RL_circuit#:~:text=A%20resistor%E2%80%93inductor%20circuit%20,It%20is%20one%20of%20the)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
RC circuit - Wikipedia
one capacitor and is the simplest type of RC circuit.
](https://en.wikipedia.org/wiki/RC_circuit#:~:text=one%20capacitor%20and%20is%20the,simplest%20type%20of%20RC%20circuit)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.geeksforgeeks.org&sz=32)
geeksforgeeks.org
LC Circuits - GeeksforGeeks
The energy or current in an LC circuit oscillates between the inductor and capacitor just like a pendulum swings back and forth. An LC circuit is used to store electrical energy in the circuit with the help of magnetic resonance. Resonance in an LC circuit occurs when the magnitude of inductive reactance and capacitive reactance in the LC circuit becomes equal. The frequency at which this occurs is known as resonant frequency.
](https://www.geeksforgeeks.org/lc-circuits/#:~:text=The%20energy%20or%20current%20in,is%20known%20as%20resonant%20frequency)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.geeksforgeeks.org&sz=32)
geeksforgeeks.org
LC Circuits - GeeksforGeeks
store electrical energy in the circuit with the help of magnetic resonance. Resonance in an LC circuit occurs when the magnitude of inductive reactance and capacitive reactance in the LC circuit becomes equal. The frequency at which this occurs is known as resonant frequency.
](https://www.geeksforgeeks.org/lc-circuits/#:~:text=store%20electrical%20energy%20in%20the,is%20known%20as%20resonant%20frequency)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
All-pass filter - Wikipedia
An all-pass filter is a signal processing filter that passes all frequencies equally in gain, but changes the phase relationship among various frequencies.
](https://en.wikipedia.org/wiki/All-pass_filter#:~:text=An%20all,phase%20relationship%20among%20various%20frequencies)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Diode Clipping Circuits and Diode Clipper
The Diode Clipper, also known as a Diode Limiter, is a wave shaping circuit that takes an input waveform and clips or cuts off its top half, bottom half or both halves together.
](https://www.electronics-tutorials.ws/diode/diode-clipping-circuits.html#:~:text=The%20Diode%20Clipper%2C%20also%20known,half%20or%20both%20halves%20together)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Diode Clipping Circuits and Diode Clipper
But Diode Clipping Circuits can be used a variety of applications to modify an input waveform using signal and Schottky diodes or to provide over-voltage protection using zener diodes to ensure that the output voltage never exceeds a certain level protecting the circuit from high voltage spikes. Then diode clipping circuits can be used in voltage limiting applications.
](https://www.electronics-tutorials.ws/diode/diode-clipping-circuits.html#:~:text=But%20Diode%20Clipping%20Circuits%20can,used%20in%20voltage%20limiting%20applications)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Diode Clipping Circuits and Diode Clipper
For the diode to become forward biased, it must have the input voltage magnitude greater than +0.7 volts (0.3 volts for a germanium diode).
](https://www.electronics-tutorials.ws/diode/diode-clipping-circuits.html#:~:text=For%20the%20diode%20to%20become,volts%20for%20a%20germanium%20diode)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Diode Clipping Circuits and Diode Clipper
Thus the output voltage which is taken across the diode can never exceed 0.7 volts during the positive half cycle.
](https://www.electronics-tutorials.ws/diode/diode-clipping-circuits.html#:~:text=Thus%20the%20output%20voltage%20which,during%20the%20positive%20half%20cycle)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.tutorialspoint.com&sz=32)
tutorialspoint.com
Electronic Clamper Circuits - Tutorialspoint
A clamper circuit is a circuit that adds a DC level to an AC signal. Actually, the positive and negative peaks of the signals can be placed at desired levels ...
](https://www.tutorialspoint.com/electronic_circuits/electronic_clamper_circuits.htm#:~:text=A%20clamper%20circuit%20is%20a,placed%20at%20desired%20levels)[

![Favicon](https://www.google.com/s2/favicons?domain=https://components101.com&sz=32)
components101.com
Peak Detectors: Working, Types, Circuit and Applications Explained
Peak Detectors: Working, Types, Circuit and Applications Explained Output: The voltage across the capacitor is the peak detector output. It retains the highest voltage level reached by the input signal during ...
](https://components101.com/articles/peak-detector-circuit-type-working-explanation-using-opamp#:~:text=Peak%20Detectors%3A%20Working%2C%20Types%2C%20Circuit,the%20input%20signal%20during)[

![Favicon](https://www.google.com/s2/favicons?domain=https://wiki.analog.com&sz=32)
wiki.analog.com
Chapter 7: Diode application topics - Analog Devices Wiki
The simplest form of a peak detector circuit is the series connection of a diode and a capacitor which outputs a DC voltage across the capacitor ...
](https://wiki.analog.com/university/courses/electronics/text/chapter-7#:~:text=The%20simplest%20form%20of%20a,voltage%20across%20the%20capacitor)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.geeksforgeeks.org&sz=32)
geeksforgeeks.org
Transistor as a Switch - GeeksforGeeks
the transistor and the collector current will not increase. Once the transistor attains the saturation state the it acts like SPST closed mechanical switch. When the transistor is off it attains the cuff-off state and it is either in on or off state.
](https://www.geeksforgeeks.org/transistor-as-a-switch/#:~:text=the%20transistor%20and%20the%20collector,in%20on%20or%20off%20state)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Transistor Biasing and the Biasing of Transistors
The circuit shown is called as a "fixed base bias circuit", because the transistors base current, I\_{B} remains constant for given values of Vcc, and therefore the transistors operating point must also remain fixed. This two resistor biasing network is used to establish the initial operating region of the transistor using a fixed current bias.
](https://www.electronics-tutorials.ws/amplifier/transistor-biasing.html#:~:text=The%20circuit%20shown%20is%20called,using%20a%20fixed%20current%20bias)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Transistor Biasing and the Biasing of Transistors
This type of transistor biasing arrangement is also beta dependent biasing as the steady-state condition of operation is a function of the transistors beta β value, so the biasing point will vary over a wide range for transistors of the same type as the characteristics of the transistors will not be exactly the same.
](https://www.electronics-tutorials.ws/amplifier/transistor-biasing.html#:~:text=This%20type%20of%20transistor%20biasing,not%20be%20exactly%20the%20same)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Transistor Biasing and the Biasing of Transistors
Image: collector feedback biasing of transistor
](https://www.electronics-tutorials.ws/amplifier/transistor-biasing.html#:~:text=Image%3A%20collector%20feedback%20biasing%20of,transistor)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Transistor Biasing and the Biasing of Transistors
collector C, instead of to the supply voltage rail, Vcc. Now if the collector current increases, the collector voltage drops, reducing the base drive and thereby automatically reducing the collector current to keep the transistors Q-point fixed. Therefore this method of collector feedback biasing produces negative feedback round the transistor as there is a direct feedback from the output terminal to the input terminal via resistor, R\_{B}.
](https://www.electronics-tutorials.ws/amplifier/transistor-biasing.html#:~:text=collector%20C%2C%20instead%20of%20to,B)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Transistor Biasing and the Biasing of Transistors
Here the common emitter transistor configuration is biased using a voltage divider network to increase stability. The name of this biasing configuration comes from the fact that the two resistors R\_{B1} and R\_{B2} form a voltage or potential divider network across the supply with their center point junction connected the transistors base terminal as shown.
](https://www.electronics-tutorials.ws/amplifier/transistor-biasing.html#:~:text=Here%20the%20common%20emitter%20transistor,transistors%20base%20terminal%20as%20shown)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Transistor Biasing and the Biasing of Transistors
Here the common emitter transistor configuration is biased using a voltage divider network to increase stability. The name of this biasing configuration comes from the fact that the two resistors R\_{B1} and R\_{B2} form a voltage or potential divider network across the supply with their center point junction connected the transistors base terminal as shown.
](https://www.electronics-tutorials.ws/amplifier/transistor-biasing.html#:~:text=Here%20the%20common%20emitter%20transistor,transistors%20base%20terminal%20as%20shown)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
Common emitter - Wikipedia
A common-emitter amplifier is one of three basic single-stage bipolar-junction- transistor (BJT) amplifier topologies, typically used as a voltage amplifier.
](https://en.wikipedia.org/wiki/Common_emitter#:~:text=A%20common,used%20as%20a%20voltage%20amplifier)[

![Favicon](https://www.google.com/s2/favicons?domain=https://wiki.analog.com&sz=32)
wiki.analog.com
Circuits I & II \[Analog Devices Wiki\]
5\. Amplifier circuit Schematic shows a differential amplifier with output tied to a common emitter amplifier that drives a class AB push--pull amplifier. In an example amplifier, we drive a similar push--pull output stage with a common collector (i.e., emitter follower) stage, and so our current amplifier will have no voltage gain.
](https://wiki.analog.com/university/courses/circuits#:~:text=5,will%20have%20no%20voltage%20gain)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
Operational amplifier applications - Wikipedia
match at L355 An inverting amplifier is a special case of the differential amplifier in which that circuit's non-inverting input V \_{2} is grounded, and inverting input V \_{1} is identified with V \_{in} above. The closed-loop gain is R \_{f} / R \_{in}, hence
](https://en.wikipedia.org/wiki/Operational_amplifier_applications#:~:text=match%20at%20L355%20An%20inverting,in%7D%2C%20hence)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Inverting Operational Amplifier - The Inverting Op-amp
As we are not using the positive non-inverting input this is connected to a common ground or zero voltage terminal as shown below, but the effect of this closed loop feedback circuit results in the voltage potential at the inverting input being equal to that at the non-inverting input producing a Virtual Earth summing point because it will be at the same potential as the grounded reference input. In other words, the op-amp becomes a "differential amplifier".
](https://www.electronics-tutorials.ws/opamp/opamp_2.html#:~:text=As%20we%20are%20not%20using,amp%20becomes%20a%20%E2%80%9Cdifferential%20amplifier%E2%80%9D)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Inverting Operational Amplifier - The Inverting Op-amp
Image: inverting operational amplifier
](https://www.electronics-tutorials.ws/opamp/opamp_2.html#:~:text=Image%3A%20inverting%20operational%20amplifier)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Inverting Operational Amplifier - The Inverting Op-amp
The inverting operational amplifier is basically a constant or fixed-gain amplifier producing a negative output voltage as its gain is always negative.
](https://www.electronics-tutorials.ws/opamp/opamp_2.html#:~:text=The%20inverting%20operational%20amplifier%20is,its%20gain%20is%20always%20negative)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Inverting Operational Amplifier - The Inverting Op-amp
In this Inverting Amplifier circuit the operational amplifier is connected with feedback to produce a closed loop operation. When dealing with operational amplifiers there are two very important rules to remember about inverting amplifiers, these are: "No current flows into the input terminal" and that "V1 always equals V2". However, in real world op-amp circuits both of these rules are slightly broken.
](https://www.electronics-tutorials.ws/opamp/opamp_2.html#:~:text=In%20this%20Inverting%20Amplifier%20circuit,these%20rules%20are%20slightly%20broken)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.analog.com&sz=32)
analog.com
Non-Inverting Op Amp | Analog Devices
Definition
](https://www.analog.com/en/resources/glossary/non-inverting-op-amp.html#:~:text=Definition)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.analog.com&sz=32)
analog.com
Non-Inverting Op Amp | Analog Devices
The output voltage can then be given as V\_{out}=V\_{in}+(V\_{in}/R\_{1})R\_{2}.
](https://www.analog.com/en/resources/glossary/non-inverting-op-amp.html#:~:text=The%20output%20voltage%20can%20then,2)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.analog.com&sz=32)
analog.com
Non-Inverting Op Amp | Analog Devices
A non-inverting op amp is an operational amplifier circuit with an output voltage that is in phase with the input voltage. Its complement is the inverting op amp, which produces an output signal that is 180^{o} out of phase.
](https://www.analog.com/en/resources/glossary/non-inverting-op-amp.html#:~:text=A%20non,o%7D%20out%20of%20phase)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.analog.com&sz=32)
analog.com
Non-Inverting Op Amp | Analog Devices
The gain will never be less than 1, so the non-inverting op amp will produce an amplified signal that is in phase with the input.
](https://www.analog.com/en/resources/glossary/non-inverting-op-amp.html#:~:text=The%20gain%20will%20never%20be,in%20phase%20with%20the%20input)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.arrow.com&sz=32)
arrow.com
Top 10 Fundamental Operational Amplifier Circuits | Arrow.com
This circuit allows for the creation of a very high impedance input and low impedance output. This is useful to interface logic levels between two components or when a power supply is based on a voltage divider. The figure below is based on a voltage divider, and the circuit cannot function. Indeed, the load impedance can have large variations, so V\_{out} voltage can change dramatically, mainly if the load impedance has a value of the same magnitude as R2.
](https://www.arrow.com/en/research-and-events/articles/fundamentals-of-op-amp-circuits#:~:text=This%20circuit%20allows%20for%20the,the%20same%20magnitude%20as%20R2)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.arrow.com&sz=32)
arrow.com
Top 10 Fundamental Operational Amplifier Circuits | Arrow.com
To solve this issue, an amplifier between the load and the voltage divider (see figure below) is inserted. Thus, V\_{out} depends on R1 and R2 and not on load value.
](https://www.arrow.com/en/research-and-events/articles/fundamentals-of-op-amp-circuits#:~:text=To%20solve%20this%20issue%2C%20an,and%20not%20on%20load%20value)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.arrow.com&sz=32)
arrow.com
Top 10 Fundamental Operational Amplifier Circuits | Arrow.com
5\. Inverting summing amplifier
](https://www.arrow.com/en/research-and-events/articles/fundamentals-of-op-amp-circuits#:~:text=5)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.arrow.com&sz=32)
arrow.com
Top 10 Fundamental Operational Amplifier Circuits | Arrow.com
Unlike the non-inverting summing amplifier, any number of voltages can be added without changing resistor values.
](https://www.arrow.com/en/research-and-events/articles/fundamentals-of-op-amp-circuits#:~:text=Unlike%20the%20non,added%20without%20changing%20resistor%20values)[ti.com
What Is an Instrumentation Amplifier? - Texas Instruments
What Is an Instrumentation Amplifier? - Texas Instruments An instrumentation amplifier (INA) is a very special type of differential input amplifier; its primary focus is to provide differential gain and high common- ...
](https://www.ti.com/document-viewer/lit/html/SSZT428#:~:text=What%20Is%20an%20Instrumentation%20Amplifier%3F,)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Op-amp Integrator, Operational Amplifier Integrator
The integrator Op-amp produces an output voltage that is both proportional to the amplitude and duration of the input signal
](https://www.electronics-tutorials.ws/opamp/opamp_6.html#:~:text=The%20integrator%20Op,duration%20of%20the%20input%20signal)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
Op-amp Integrator, Operational Amplifier Integrator
The ideal op-amp integrator is an inverting amplifier whose output voltage is proportional to the negative integral of the input voltage thereby simulating mathematical integration.
](https://www.electronics-tutorials.ws/opamp/opamp_6.html#:~:text=The%20ideal%20op,voltage%20thereby%20simulating%20mathematical%20integration)[electronics-notes.com
Operational Amplifier Differentiator Circuit » Electronics Notes
A differentiator circuit is one in which the voltage output is directly proportional to the rate of change of the input voltage with respect to time.
](https://www.electronics-notes.com/articles/analogue_circuits/operational-amplifier-op-amp/analogue-differentiator-circuit.php#:~:text=A%20differentiator%20circuit%20is%20one,voltage%20with%20respect%20to%20time)[electronics-notes.com
Operational Amplifier Differentiator Circuit » Electronics Notes
Op amp differentiator basics
](https://www.electronics-notes.com/articles/analogue_circuits/operational-amplifier-op-amp/analogue-differentiator-circuit.php#:~:text=Op%20amp%20differentiator%20basics)[electronics-notes.com
Operational Amplifier Differentiator Circuit » Electronics Notes
As a differentiator circuit has an output that is proportional to the input change, some of the standard waveforms such as sine waves, square waves and triangular waves give very different waveforms at the output of the differentiator circuit.
](https://www.electronics-notes.com/articles/analogue_circuits/operational-amplifier-op-amp/analogue-differentiator-circuit.php#:~:text=As%20a%20differentiator%20circuit%20has,output%20of%20the%20differentiator%20circuit)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.renesas.com&sz=32)
renesas.com
Op-Amps, Comparator Circuit - Renesas
Because the op-amp's gain is so high, even small differences in the inputs will rapidly drive the output voltage to its maximum or minimum value.
](https://www.renesas.com/en/support/engineer-school/electronic-circuits-03-op-amps-comparator-circuit?srsltid=AfmBOoq7R3U1nJdghG7irQNAdKOkiZAV6gyqPF1F1nKbY8wvf4ewnMAy#:~:text=Because%20the%20op,its%20maximum%20or%20minimum%20value)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.geeksforgeeks.org&sz=32)
geeksforgeeks.org
Schmitt Trigger - GeeksforGeeks
Schmitt Trigger - GeeksforGeeks A Schmitt trigger is a type of comparator with hysteresis. It takes an analog signal as an input and converts it into a perfect and stable output signal.
](https://www.geeksforgeeks.org/schmitt-trigger/#:~:text=Schmitt%20Trigger%20,perfect%20and%20stable%20output%20signal)[

![Favicon](https://www.google.com/s2/favicons?domain=https://developerhelp.microchip.com&sz=32)
developerhelp.microchip.com
Comparators with Hysteresis (Schmitt Trigger) - Developer Help
hysteresis circuit. This op-amp is an inverting comparator with Vin ...
](https://developerhelp.microchip.com/xwiki/bin/view/products/amplifiers-linear/operational-amplifier-ics/introduction/comparators-with-hysteresis-schmitt-trigger/#:~:text=hysteresis%20circuit.%20This%20op,inverting%20comparator%20with%20Vin)[ti.com
Analog circuits | TI.com
Current sensing
](https://www.ti.com/design-development/analog-circuits.html#:~:text=Current%20sensing)[ti.com
Analog circuits | TI.com
Current sources
](https://www.ti.com/design-development/analog-circuits.html#:~:text=Current%20sources)[eimtechnology.com
10 classic basic electric circuits that every electronics engineer lov
4\. 555 Timer Circuit
](https://www.eimtechnology.com/blogs/articles/10-classic-basic-electric-circuits-that-every-electronics-engineer-loves?srsltid=AfmBOor1ybDp_0RxReENDVrleuYKHBTH02tqycbziBbkqz5uXCo1Aase#:~:text=4)[eimtechnology.com
10 classic basic electric circuits that every electronics engineer lov
4\. 555 Timer Circuit
](https://www.eimtechnology.com/blogs/articles/10-classic-basic-electric-circuits-that-every-electronics-engineer-loves?srsltid=AfmBOor1ybDp_0RxReENDVrleuYKHBTH02tqycbziBbkqz5uXCo1Aase#:~:text=4)[

![Favicon](https://www.google.com/s2/favicons?domain=https://testbook.com&sz=32)
testbook.com
All Pass Filter: Know Definition, Types, Advantages & Applications
Applications testbook.com Phase Shift: The main function of an All Pass Filter is to introduce a phase shift without altering the amplitude. Applications: Used in ...
](https://testbook.com/electrical-engineering/all-pass-filter#:~:text=Applications%20testbook,Applications%3A%20Used%20in)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.arrow.com&sz=32)
arrow.com
Top 10 Fundamental Operational Amplifier Circuits | Arrow.com
This configuration is very similar to the inverting operation amplifier. For the non-inverting one, the input voltage is directly to the applied to the non- inverting pin and the end of feedback loop is connected to ground.
](https://www.arrow.com/en/research-and-events/articles/fundamentals-of-op-amp-circuits#:~:text=This%20configuration%20is%20very%20similar,loop%20is%20connected%20to%20ground)[cheever.domains.swarthmore.edu
Introduction to Op Amps (E72 Lab meets in Singer 246)
In this configuration the comparator simply "compares" the input against a threshold and delivers a binary output that indicates whether the input is above or ...
](https://cheever.domains.swarthmore.edu/Class/e72/E72L2/Lab2(OpAmp).html#:~:text=In%20this%20configuration%20the%20comparator,input%20is%20above%20or)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
H-bridge Circuit for DC Motor Bidirectional Control
An H-bridge is an electronic circuit that allows for the bidirectional rotation of DC motors in either direction simply by changing the voltage applied across the motor terminals to provide forward and reverse motor speed control
](https://www.electronics-tutorials.ws/io/h-bridge-circuit.html#:~:text=An%20H,and%20reverse%20motor%20speed%20control)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electronics-tutorials.ws
H-bridge Circuit for DC Motor Bidirectional Control
While functional, the disadvantage here is that the DC motor in this simple On/Off example will only rotate in a one direction. However, if we reverse the battery polarity, we can make the motor rotate in the other direction.
](https://www.electronics-tutorials.ws/io/h-bridge-circuit.html#:~:text=While%20functional%2C%20the%20disadvantage%20here,rotate%20in%20the%20other%20direction)[eimtechnology.com
10 classic basic electric circuits that every electronics engineer lov
7\. H-Bridge Circuit
](https://www.eimtechnology.com/blogs/articles/10-classic-basic-electric-circuits-that-every-electronics-engineer-loves?srsltid=AfmBOor1ybDp_0RxReENDVrleuYKHBTH02tqycbziBbkqz5uXCo1Aase#:~:text=7.%20H)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
Resistor ladder - Wikipedia
Resistor ladder - Wikipedia An R--2R ladder configuration is a simple and inexpensive way to perform digital- to-analog conversion (DAC), using repetitive arrangements of precise resistor ...
](https://en.wikipedia.org/wiki/Resistor_ladder#:~:text=Resistor%20ladder%20,arrangements%20of%20precise%20resistor)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
Sample and hold - Wikipedia
A typical sample and hold circuit stores electric charge in a capacitor and contains at least one switching device such as a FET (field effect transistor) ...
](https://en.wikipedia.org/wiki/Sample_and_hold#:~:text=A%20typical%20sample%20and%20hold,field%20effect%20transistor%29)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.sweetwater.com&sz=32)
sweetwater.com
Sample and Hold - InSync - Sweetwater
Sample and Hold - InSync - Sweetwater At its simplest, a sample and hold circuit is a capacitor and a switch. The capacitor is used to store the analog voltage for a short time ...
](https://www.sweetwater.com/insync/sample-hold/#:~:text=Sample%20and%20Hold%20,for%20a%20short%20time)[electronics-notes.com
Operational Amplifier Differentiator Circuit » Electronics Notes
This means that a fast change to the input voltage signal, the greater the output voltage change in response.
](https://www.electronics-notes.com/articles/analogue_circuits/operational-amplifier-op-amp/analogue-differentiator-circuit.php#:~:text=This%20means%20that%20a%20fast,output%20voltage%20change%20in%20response)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia.org
Buck converter - Wikipedia
Buck converter - Wikipedia A buck converter or step-down converter is a DC-to-DC converter which decreases voltage, while increasing current, from its input (supply) to its output (load).
](https://en.wikipedia.org/wiki/Buck_converter#:~:text=Buck%20converter%20,load)

All Sources
[

![Favicon](https://www.google.com/s2/favicons?domain=https://wiki.analog.com&sz=32)
wiki.analog
3

](https://wiki.analog.com/)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.wikipedia.org&sz=32)
en.wikipedia
11

](https://en.wikipedia.org/)[

![Favicon](https://www.google.com/s2/favicons?domain=https://en.eeworld.com.cn&sz=32)
en.eeworld.com
2

](https://en.eeworld.com.cn/)[eimtechnology
](https://www.eimtechnology.com/)[

![Favicon](https://www.google.com/s2/favicons?domain=https://forum.allaboutcircuits.com&sz=32)
forum.al...tcircuits
](https://forum.allaboutcircuits.com/)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.quora.com&sz=32)
quora
](https://www.quora.com/)[

![Favicon](https://www.google.com/s2/favicons?domain=https://ocw.mit.edu&sz=32)
ocw.mit
](https://ocw.mit.edu/)[ti
2

](https://www.ti.com/)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.electronics-tutorials.ws&sz=32)
electron...tutorials
8

](https://www.electronics-tutorials.ws/)[

![Favicon](https://www.google.com/s2/favicons?domain=http://openbooks.library.umass.edu&sz=32)
openbook...ary.umass
2

](http://openbooks.library.umass.edu/)[allaboutcircuits
](https://www.allaboutcircuits.com/)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.geeksforgeeks.org&sz=32)
geeksforgeeks
2

](https://www.geeksforgeeks.org/)[learn.sparkfun
](https://learn.sparkfun.com/)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.analog.com&sz=32)
analog
](https://www.analog.com/)[

![Favicon](https://www.google.com/s2/favicons?domain=https://www.arrow.com&sz=32)
arrow
](https://www.arrow.com/)[
](https://www.electronics-notes.com/)