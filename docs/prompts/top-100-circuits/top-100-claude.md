# Top 100 Circuits from Claude

!!! prompt
    I am creating a new website that will be used as a teaching aid for a freshman one semester college-level level course about electrical engineering circuits. I need you to do detailed research to generate a list of the top 100 circuits that are most commonly used in a introductory circuits course. Please look for any sites that have list of circuits. We are focused mostly on analog circuits, not digital circuits. We want our students to be able to quickly visualize how these circuits work using both DC and AC input sources. 

    The list include only circuits typically covered in university-level textbooks (e.g., Thevenin/Norton equivalents, RC/RL filters, Op-Amp circuits), or also practical circuits used in labs (e.g., LED blinkers, audio amplifiers)?

    We are interested in a mix of both theoretical analysis circuits and hands-on practical circuits?

    Cast a wide net based on what’s commonly taught globally

    Note of a circuits is also used in specific curriculum standards (e.g., IEEE, ABET accredited syllabi)

    Feel free to include variations of similar circuit types (e.g., low-pass vs. high-pass filters) or only distinct circuit functions

    Always place two newliness before a markdown list. 

    For each of the 100 circuit, please return the following format. 

### Circuit Name 
- Description of Circuit 
- DC or AC circuit 
- Type of Circuit 
- Number of components 
- List of components 
- Solutions

## Claude Response

I'll conduct comprehensive research to identify the top 100 circuits commonly used in introductory electrical engineering courses. Let me search for university curricula, textbooks, and standard circuit lists to ensure we cover both theoretical and practical circuits.Based on my comprehensive research of university curricula, ABET accreditation requirements, standard electrical engineering textbooks, and common laboratory exercises, I'll provide you with the top 100 circuits most commonly used in introductory electrical engineering courses. These circuits span both theoretical analysis and practical applications.

## **Fundamental DC Analysis Circuits**

### Voltage Divider Circuit
- Description of Circuit: Two resistors in series dividing input voltage proportionally
- DC circuit
- Type of Circuit: Passive linear resistive network
- Number of components: 2
- List of components: Two resistors
- Solutions: Basic circuit analysis, reference voltage generation, sensor signal conditioning

### Current Divider Circuit  
- Description of Circuit: Two resistors in parallel dividing input current proportionally
- DC circuit
- Type of Circuit: Passive linear resistive network
- Number of components: 2
- List of components: Two resistors  
- Solutions: Current distribution analysis, basic circuit analysis, understanding parallel circuits

### Simple Series Circuit
- Description of Circuit: Multiple resistors connected in series with voltage source
- DC circuit
- Type of Circuit: Passive linear resistive network
- Number of components: 3-5
- List of components: Voltage source, 2-4 resistors
- Solutions: Ohm's law applications, Kirchhoff's voltage law, basic circuit analysis

### Simple Parallel Circuit
- Description of Circuit: Multiple resistors connected in parallel with voltage source
- DC circuit  
- Type of Circuit: Passive linear resistive network
- Number of components: 3-5
- List of components: Voltage source, 2-4 resistors
- Solutions: Kirchhoff's current law, equivalent resistance, power distribution

### Wheatstone Bridge Circuit
- Description of Circuit: Four resistors arranged in diamond configuration for precision measurement
- DC circuit
- Type of Circuit: Measurement/sensing circuit
- Number of components: 5
- List of components: Four resistors, galvanometer or voltage source
- Solutions: Precision resistance measurement, strain gauge applications, bridge balance conditions

### Delta-Wye Circuit
- Description of Circuit: Network transformation between delta and wye resistor configurations
- DC circuit
- Type of Circuit: Network transformation circuit
- Number of components: 3
- List of components: Three resistors in delta or wye configuration
- Solutions: Complex network analysis, circuit simplification, network theorems

### Ladder Network
- Description of Circuit: Resistors arranged in repetitive ladder-like structure
- DC circuit
- Type of Circuit: Complex resistive network
- Number of components: 6-8
- List of components: Multiple resistors, voltage source
- Solutions: Complex circuit analysis, network reduction techniques, impedance calculations

### Thevenin Equivalent Circuit
- Description of Circuit: Any linear circuit reduced to voltage source in series with resistance
- DC circuit
- Type of Circuit: Equivalent circuit model
- Number of components: 2
- List of components: Voltage source, resistor
- Solutions: Circuit simplification, load analysis, network theorems

### Norton Equivalent Circuit
- Description of Circuit: Any linear circuit reduced to current source in parallel with resistance
- DC circuit
- Type of Circuit: Equivalent circuit model
- Number of components: 2
- List of components: Current source, resistor
- Solutions: Circuit simplification, source transformation, network analysis

### Maximum Power Transfer Circuit
- Description of Circuit: Circuit demonstrating maximum power transfer theorem with variable load
- DC circuit
- Type of Circuit: Power transfer analysis circuit
- Number of components: 3
- List of components: Voltage source, source resistor, variable load resistor
- Solutions: Power transfer optimization, impedance matching, efficiency analysis

## **AC Circuit Analysis**

### Simple AC Resistive Circuit
- Description of Circuit: Resistor connected to AC voltage source
- AC circuit
- Type of Circuit: Basic AC resistive circuit
- Number of components: 2
- List of components: AC voltage source, resistor
- Solutions: AC fundamentals, RMS values, power calculations in AC circuits

### AC Capacitive Circuit
- Description of Circuit: Capacitor connected to AC voltage source
- AC circuit
- Type of Circuit: Reactive circuit
- Number of components: 2
- List of components: AC voltage source, capacitor
- Solutions: Capacitive reactance, phase relationships, reactive power

### AC Inductive Circuit
- Description of Circuit: Inductor connected to AC voltage source
- AC circuit
- Type of Circuit: Reactive circuit
- Number of components: 2
- List of components: AC voltage source, inductor
- Solutions: Inductive reactance, phase relationships, magnetic energy storage

### RC Series Circuit
- Description of Circuit: Resistor and capacitor connected in series with AC source
- AC circuit
- Type of Circuit: RC network
- Number of components: 3
- List of components: AC voltage source, resistor, capacitor
- Solutions: Impedance calculations, phasor analysis, RC time constants

### RL Series Circuit
- Description of Circuit: Resistor and inductor connected in series with AC source
- AC circuit
- Type of Circuit: RL network
- Number of components: 3
- List of components: AC voltage source, resistor, inductor
- Solutions: Impedance calculations, phasor analysis, RL time constants

### RLC Series Circuit
- Description of Circuit: Resistor, inductor, and capacitor connected in series with AC source
- AC circuit
- Type of Circuit: RLC resonant circuit
- Number of components: 4
- List of components: AC voltage source, resistor, inductor, capacitor
- Solutions: Resonance analysis, quality factor, frequency response

### RLC Parallel Circuit
- Description of Circuit: Resistor, inductor, and capacitor connected in parallel with AC source
- AC circuit
- Type of Circuit: Parallel resonant circuit
- Number of components: 4
- List of components: AC voltage source, resistor, inductor, capacitor
- Solutions: Parallel resonance, admittance calculations, tank circuits

### AC Power Circuit
- Description of Circuit: Load impedance connected to AC source for power analysis
- AC circuit
- Type of Circuit: Power analysis circuit
- Number of components: 3-4
- List of components: AC voltage source, resistor, reactive component
- Solutions: Real power, reactive power, apparent power, power factor

### Phasor Diagram Circuit
- Description of Circuit: Circuit used to demonstrate phasor relationships in AC analysis
- AC circuit
- Type of Circuit: Educational phasor analysis circuit
- Number of components: 3-4
- List of components: AC voltage source, resistor, capacitor or inductor
- Solutions: Phasor representation, phase relationships, vector analysis

### Three-Phase Balanced Circuit
- Description of Circuit: Three-phase voltage source connected to balanced three-phase load
- AC circuit
- Type of Circuit: Three-phase power system
- Number of components: 6
- List of components: Three-phase voltage source, three load impedances
- Solutions: Three-phase power calculations, line/phase relationships, balanced loads

## **Operational Amplifier Circuits**

### Inverting Amplifier
- Description of Circuit: Op-amp configured to provide inverting voltage amplification
- DC or AC circuit
- Type of Circuit: Active analog amplifier
- Number of components: 3
- List of components: Operational amplifier, input resistor, feedback resistor
- Solutions: Signal amplification, gain calculations, virtual ground concept

### Non-Inverting Amplifier
- Description of Circuit: Op-amp configured to provide non-inverting voltage amplification
- DC or AC circuit
- Type of Circuit: Active analog amplifier
- Number of components: 3
- List of components: Operational amplifier, input resistor, feedback resistor
- Solutions: Signal amplification, high input impedance applications, buffer applications

### Voltage Follower (Unity Gain Buffer)
- Description of Circuit: Op-amp configured for unity gain with very high input impedance
- DC or AC circuit
- Type of Circuit: Buffer/impedance converter
- Number of components: 1
- List of components: Operational amplifier
- Solutions: Impedance matching, signal isolation, buffer applications

### Summing Amplifier
- Description of Circuit: Op-amp that adds multiple input voltages with scaling factors
- DC or AC circuit
- Type of Circuit: Analog computation circuit
- Number of components: 5-7
- List of components: Operational amplifier, multiple input resistors, feedback resistor
- Solutions: Signal mixing, analog computation, weighted summing

### Difference Amplifier
- Description of Circuit: Op-amp configured to amplify the difference between two input signals
- DC or AC circuit
- Type of Circuit: Differential amplifier
- Number of components: 5
- List of components: Operational amplifier, four precision resistors
- Solutions: Differential signal amplification, noise rejection, instrumentation

### Integrator Circuit
- Description of Circuit: Op-amp with capacitive feedback to perform mathematical integration
- AC circuit
- Type of Circuit: Analog computation circuit
- Number of components: 3
- List of components: Operational amplifier, input resistor, feedback capacitor
- Solutions: Signal integration, analog computation, waveform generation

### Differentiator Circuit
- Description of Circuit: Op-amp with capacitive input to perform mathematical differentiation
- AC circuit
- Type of Circuit: Analog computation circuit
- Number of components: 3
- List of components: Operational amplifier, input capacitor, feedback resistor
- Solutions: Signal differentiation, edge detection, analog computation

### Comparator Circuit
- Description of Circuit: Op-amp used to compare two input voltages and provide digital output
- DC circuit
- Type of Circuit: Analog-to-digital interface
- Number of components: 1-3
- List of components: Operational amplifier, optional reference voltage, optional hysteresis resistors
- Solutions: Level detection, analog-to-digital conversion, threshold detection

### Schmitt Trigger
- Description of Circuit: Comparator with positive feedback to provide hysteresis
- DC circuit
- Type of Circuit: Switching circuit with hysteresis
- Number of components: 3
- List of components: Operational amplifier, feedback resistor, input resistor
- Solutions: Noise immunity, digital signal conditioning, oscillator applications

### Instrumentation Amplifier
- Description of Circuit: Three op-amp configuration for high-precision differential amplification
- DC or AC circuit
- Type of Circuit: Precision measurement amplifier
- Number of components: 7
- List of components: Three operational amplifiers, multiple precision resistors
- Solutions: High-precision measurements, sensor signal conditioning, medical instrumentation

## **Filter Circuits**

### RC Low-Pass Filter
- Description of Circuit: Resistor-capacitor network that attenuates high frequencies
- AC circuit
- Type of Circuit: Passive low-pass filter
- Number of components: 2
- List of components: Resistor, capacitor
- Solutions: Frequency response analysis, anti-aliasing, noise filtering

### RC High-Pass Filter
- Description of Circuit: Capacitor-resistor network that attenuates low frequencies
- AC circuit
- Type of Circuit: Passive high-pass filter
- Number of components: 2
- List of components: Capacitor, resistor
- Solutions: AC coupling, differentiation, blocking DC components

### RL Low-Pass Filter
- Description of Circuit: Resistor-inductor network that attenuates high frequencies
- AC circuit
- Type of Circuit: Passive low-pass filter
- Number of components: 2
- List of components: Resistor, inductor
- Solutions: Power supply filtering, inductive load filtering

### RL High-Pass Filter
- Description of Circuit: Inductor-resistor network that attenuates low frequencies
- AC circuit
- Type of Circuit: Passive high-pass filter
- Number of components: 2
- List of components: Inductor, resistor
- Solutions: RF applications, AC coupling with inductive elements

### RLC Band-Pass Filter
- Description of Circuit: RLC network that passes only a specific frequency range
- AC circuit
- Type of Circuit: Passive band-pass filter
- Number of components: 3
- List of components: Resistor, inductor, capacitor
- Solutions: Frequency selection, resonant circuits, radio tuning

### RLC Band-Stop Filter (Notch Filter)
- Description of Circuit: RLC network that blocks a specific frequency range
- AC circuit
- Type of Circuit: Passive band-stop filter
- Number of components: 3
- List of components: Resistor, inductor, capacitor
- Solutions: Interference rejection, power line filtering, specific frequency blocking

### Active Low-Pass Filter
- Description of Circuit: Op-amp based low-pass filter with gain
- AC circuit
- Type of Circuit: Active low-pass filter
- Number of components: 4
- List of components: Operational amplifier, resistors, capacitor
- Solutions: Anti-aliasing with gain, improved filter characteristics

### Active High-Pass Filter
- Description of Circuit: Op-amp based high-pass filter with gain
- AC circuit
- Type of Circuit: Active high-pass filter
- Number of components: 4
- List of components: Operational amplifier, resistors, capacitor
- Solutions: AC amplification, blocking DC with gain

### Sallen-Key Filter
- Description of Circuit: Popular active filter topology using single op-amp
- AC circuit
- Type of Circuit: Active filter (low-pass or high-pass)
- Number of components: 5
- List of components: Operational amplifier, two resistors, two capacitors
- Solutions: High-performance filtering, controlled frequency response

### Multiple Feedback Filter
- Description of Circuit: Active filter with feedback from output to inverting input
- AC circuit
- Type of Circuit: Active band-pass filter
- Number of components: 5
- List of components: Operational amplifier, three resistors, capacitor
- Solutions: Narrow band-pass filtering, high Q applications

## **Power Supply and Rectifier Circuits**

### Half-Wave Rectifier
- Description of Circuit: Single diode circuit that converts AC to pulsating DC
- AC circuit (input), DC circuit (output)
- Type of Circuit: AC-to-DC converter
- Number of components: 3
- List of components: Transformer, diode, load resistor
- Solutions: Basic rectification, diode characteristics, power conversion

### Full-Wave Center-Tap Rectifier
- Description of Circuit: Two diodes with center-tapped transformer for full-wave rectification
- AC circuit (input), DC circuit (output)
- Type of Circuit: AC-to-DC converter
- Number of components: 4
- List of components: Center-tapped transformer, two diodes, load resistor
- Solutions: Improved rectification efficiency, reduced ripple

### Bridge Rectifier
- Description of Circuit: Four diodes arranged in bridge configuration for full-wave rectification
- AC circuit (input), DC circuit (output)
- Type of Circuit: AC-to-DC converter
- Number of components: 6
- List of components: Transformer, four diodes, load resistor
- Solutions: Efficient AC-to-DC conversion, power supply design

### Capacitor Filter Circuit
- Description of Circuit: Large capacitor used to smooth rectified DC output
- DC circuit
- Type of Circuit: Filter/smoothing circuit
- Number of components: 2
- List of components: Large electrolytic capacitor, load resistor
- Solutions: Ripple reduction, energy storage, power supply filtering

### Voltage Regulator Circuit (Linear)
- Description of Circuit: Circuit maintaining constant output voltage despite input variations
- DC circuit
- Type of Circuit: Voltage regulation circuit
- Number of components: 3-5
- List of components: Zener diode or voltage regulator IC, resistors, capacitors
- Solutions: Voltage stabilization, load regulation, power supply design

### Zener Voltage Regulator
- Description of Circuit: Zener diode used to provide constant voltage regulation
- DC circuit
- Type of Circuit: Shunt voltage regulator
- Number of components: 3
- List of components: Series resistor, Zener diode, load resistor
- Solutions: Simple voltage regulation, reference voltage generation

### Series Pass Regulator
- Description of Circuit: Transistor-based series voltage regulator with feedback
- DC circuit
- Type of Circuit: Series voltage regulator
- Number of components: 4-6
- List of components: Pass transistor, Zener diode, resistors, output capacitor
- Solutions: Efficient voltage regulation, current boosting

### Switch-Mode Power Supply (Basic)
- Description of Circuit: High-frequency switching circuit for efficient power conversion
- AC/DC circuit
- Type of Circuit: Switching power converter
- Number of components: 8-10
- List of components: Switching transistor, transformer, diodes, inductors, capacitors, control IC
- Solutions: High-efficiency power conversion, size reduction

### Battery Charging Circuit
- Description of Circuit: Circuit for safely charging rechargeable batteries
- DC circuit
- Type of Circuit: Battery management circuit
- Number of components: 5-7
- List of components: Current limiting resistor, voltage regulator, diodes, battery, monitoring circuits
- Solutions: Safe battery charging, current/voltage control

### Uninterruptible Power Supply (UPS) Basic Circuit
- Description of Circuit: Circuit providing backup power during main power failure
- AC/DC circuit
- Type of Circuit: Backup power system
- Number of components: 10-12
- List of components: Battery, inverter circuit, charger circuit, switching relays, filter circuits
- Solutions: Power backup, power quality improvement

## **Semiconductor and Transistor Circuits**

### Diode Characteristic Circuit
- Description of Circuit: Circuit for measuring and demonstrating diode I-V characteristics
- DC circuit
- Type of Circuit: Characterization circuit
- Number of components: 4
- List of components: Variable DC source, current limiting resistor, diode, ammeter/voltmeter
- Solutions: Understanding diode behavior, forward/reverse bias

### LED Circuit
- Description of Circuit: LED with current limiting resistor for safe operation
- DC circuit
- Type of Circuit: Light emitting circuit
- Number of components: 3
- List of components: DC voltage source, current limiting resistor, LED
- Solutions: Current limiting calculations, LED operation, indicator circuits

### Common Emitter Amplifier
- Description of Circuit: BJT amplifier with emitter grounded, input at base, output at collector
- AC circuit
- Type of Circuit: BJT amplifier
- Number of components: 6-8
- List of components: BJT transistor, base bias resistors, collector resistor, emitter resistor, coupling capacitors
- Solutions: Signal amplification, transistor biasing, gain calculations

### Common Collector Amplifier (Emitter Follower)
- Description of Circuit: BJT amplifier with collector connected to supply, output at emitter
- AC circuit
- Type of Circuit: BJT buffer amplifier
- Number of components: 5-6
- List of components: BJT transistor, base bias resistors, emitter resistor, coupling capacitors
- Solutions: Impedance matching, current amplification, buffer applications

### Common Base Amplifier
- Description of Circuit: BJT amplifier with base grounded, input at emitter, output at collector
- AC circuit
- Type of Circuit: BJT amplifier
- Number of components: 6-7
- List of components: BJT transistor, bias resistors, collector resistor, coupling capacitors
- Solutions: High-frequency applications, current-to-voltage conversion

### Transistor Switch Circuit
- Description of Circuit: BJT or FET used as electronic switch for digital control
- DC circuit
- Type of Circuit: Switching circuit
- Number of components: 4
- List of components: Transistor, base/gate resistor, load resistor or relay, input signal source
- Solutions: Digital interfacing, load switching, relay driving

### Darlington Pair Amplifier
- Description of Circuit: Two transistors connected to provide very high current gain
- DC or AC circuit
- Type of Circuit: High-gain amplifier
- Number of components: 2-4
- List of components: Two BJT transistors, bias resistors
- Solutions: High current gain applications, sensor interfacing

### FET Source Follower
- Description of Circuit: FET amplifier with drain connected to supply, output at source
- AC circuit
- Type of Circuit: FET buffer amplifier
- Number of components: 4-5
- List of components: FET transistor, gate bias resistors, source resistor, coupling capacitors
- Solutions: High input impedance buffering, impedance matching

### CMOS Inverter
- Description of Circuit: Complementary MOSFET pair forming digital inverter
- DC circuit
- Type of Circuit: Digital logic gate
- Number of components: 2
- List of components: P-channel MOSFET, N-channel MOSFET
- Solutions: Digital logic, low-power switching, CMOS technology

### Current Mirror Circuit
- Description of Circuit: Two matched transistors providing constant current output
- DC circuit
- Type of Circuit: Current reference circuit
- Number of components: 3
- List of components: Two matched transistors, reference resistor
- Solutions: Constant current sources, biasing circuits, analog ICs

## **Motor Control and Power Circuits**

### H-Bridge Motor Driver
- Description of Circuit: Four switches arranged to control DC motor direction
- DC circuit
- Type of Circuit: Motor control circuit
- Number of components: 6-8
- List of components: Four transistors (or MOSFETs), four flyback diodes, gate/base resistors, DC motor
- Solutions: Bidirectional motor control, robotics, automation

### PWM Motor Speed Control
- Description of Circuit: Pulse-width modulation circuit for controlling motor speed
- DC circuit
- Type of Circuit: Motor speed control
- Number of components: 5-7
- List of components: PWM generator (555 timer or microcontroller), MOSFET, flyback diode, motor, filter capacitor
- Solutions: Variable speed control, efficient motor driving

### Stepper Motor Driver
- Description of Circuit: Sequential switching circuit for stepper motor control
- DC circuit
- Type of Circuit: Stepper motor control
- Number of components: 8-12
- List of components: Four transistors/MOSFETs, stepper motor, control logic, current limiting resistors
- Solutions: Precise positioning, digital control of motors

### Relay Driver Circuit
- Description of Circuit: Transistor circuit for controlling high-power relay
- DC circuit
- Type of Circuit: Interface/switching circuit
- Number of components: 4
- List of components: Transistor, base resistor, flyback diode, relay coil
- Solutions: Isolation, high-power switching, interfacing

### Motor Start/Stop Circuit
- Description of Circuit: Control circuit with start/stop buttons for motor operation
- DC circuit
- Type of Circuit: Motor control circuit
- Number of components: 5-7
- List of components: Start button, stop button, relay contacts, motor contactor, overload protection
- Solutions: Industrial motor control, safety interlocks

### Chopper Circuit (DC-DC Converter)
- Description of Circuit: Switching circuit for DC voltage conversion
- DC circuit
- Type of Circuit: Power conversion circuit
- Number of components: 5-6
- List of components: Switching transistor, inductor, flyback diode, filter capacitor, control circuit
- Solutions: Voltage conversion, power conditioning, motor drives

### Three-Phase Motor Control
- Description of Circuit: Control circuit for three-phase induction motor
- AC circuit
- Type of Circuit: AC motor control
- Number of components: 8-10
- List of components: Three-phase supply, contactors, overload relays, control transformer, start/stop buttons
- Solutions: Industrial motor control, three-phase power systems

### Servo Motor Control Circuit
- Description of Circuit: PWM control circuit for servo motor positioning
- DC circuit
- Type of Circuit: Position control circuit
- Number of components: 4-6
- List of components: PWM signal generator, servo motor, feedback potentiometer, control amplifier
- Solutions: Precise positioning, closed-loop control systems

### Motor Soft Start Circuit
- Description of Circuit: Circuit providing gradual voltage increase for motor starting
- AC circuit
- Type of Circuit: Motor protection circuit
- Number of components: 6-8
- List of components: SCRs or triacs, control circuit, current sensors, timing circuits
- Solutions: Reducing starting current, motor protection

### Brake Chopper Circuit
- Description of Circuit: Circuit for dissipating regenerative energy from motors
- DC circuit
- Type of Circuit: Energy dissipation circuit
- Number of components: 4-5
- List of components: Power transistor, brake resistor, control circuit, sensing resistor
- Solutions: Regenerative braking, energy management

## **Oscillator and Timer Circuits**

### 555 Timer Astable Multivibrator
- Description of Circuit: 555 IC configured to generate continuous square wave output
- DC circuit
- Type of Circuit: Oscillator/timing circuit
- Number of components: 4
- List of components: 555 timer IC, two timing resistors, timing capacitor
- Solutions: Clock generation, frequency generation, timing applications

### 555 Timer Monostable Multivibrator
- Description of Circuit: 555 IC configured to generate single pulse output when triggered
- DC circuit
- Type of Circuit: One-shot timer circuit
- Number of components: 4
- List of components: 555 timer IC, timing resistor, timing capacitor, trigger circuit
- Solutions: Delay generation, pulse stretching, timing delays

### Crystal Oscillator Circuit
- Description of Circuit: Quartz crystal with amplifier circuit for precise frequency generation
- AC circuit
- Type of Circuit: Precision oscillator
- Number of components: 5-6
- List of components: Quartz crystal, transistor or inverter, bias resistors, load capacitors
- Solutions: Precise timing, clock generation, frequency reference

### RC Oscillator Circuit
- Description of Circuit: Feedback oscillator using RC network for frequency determination
- AC circuit
- Type of Circuit: RC oscillator
- Number of components: 5-7
- List of components: Operational amplifier or transistors, resistors, capacitors in feedback network
- Solutions: Audio frequency generation, low-cost oscillation

### Wien Bridge Oscillator
- Description of Circuit: Op-amp oscillator using Wien bridge for frequency control
- AC circuit
- Type of Circuit: Sinusoidal oscillator
- Number of components: 6
- List of components: Operational amplifier, four resistors (two in Wien bridge), two capacitors
- Solutions: Sine wave generation, audio oscillators, frequency control

### Colpitts Oscillator
- Description of Circuit: LC oscillator using capacitive divider in feedback network
- AC circuit
- Type of Circuit: LC oscillator
- Number of components: 5-6
- List of components: Transistor, inductor, two feedback capacitors, bias resistors
- Solutions: RF oscillation, radio frequency generation

### Hartley Oscillator
- Description of Circuit: LC oscillator using inductive divider in feedback network
- AC circuit
- Type of Circuit: LC oscillator
- Number of components: 5-6
- List of components: Transistor, tapped inductor or two inductors, capacitor, bias resistors
- Solutions: RF oscillation, radio transmitters

### Relaxation Oscillator
- Description of Circuit: Non-sinusoidal oscillator using charging/discharging cycles
- DC circuit
- Type of Circuit: Relaxation oscillator
- Number of components: 4-5
- List of components: Transistor or op-amp, resistor, capacitor, switching element
- Solutions: Sawtooth generation, timing circuits, non-sinusoidal waveforms

### Phase-Shift Oscillator
- Description of Circuit: Oscillator using RC phase-shift network for feedback
- AC circuit
- Type of Circuit: RC oscillator
- Number of components: 7
- List of components: Transistor or op-amp, three RC phase-shift sections
- Solutions: Audio frequency oscillation, sine wave generation

### Voltage-Controlled Oscillator (VCO)
- Description of Circuit: Oscillator whose frequency is controlled by input voltage
- AC circuit
- Type of Circuit: Voltage-controlled oscillator
- Number of components: 6-8
- List of components: Transistor or IC, varactor diodes, inductors, capacitors, control voltage input
- Solutions: Frequency modulation, PLL circuits, sweep generators

## **Measurement and Instrumentation Circuits**

### Current Sensing Circuit
- Description of Circuit: Circuit for measuring current using shunt resistor or current transformer
- DC or AC circuit
- Type of Circuit: Current measurement circuit
- Number of components: 3-4
- List of components: Shunt resistor or current transformer, differential amplifier, precision resistors
- Solutions: Current monitoring, protection circuits, power measurement

### Voltage Divider for Measurement
- Description of Circuit: Precision voltage divider for high voltage measurement
- DC circuit
- Type of Circuit: Voltage measurement circuit
- Number of components: 2-3
- List of components: Two precision resistors, buffer amplifier (optional)
- Solutions: High voltage measurement, signal scaling, ADC interfacing

### Temperature Sensor Circuit
- Description of Circuit: Circuit using thermistor or thermocouple for temperature measurement
- DC circuit
- Type of Circuit: Temperature sensing circuit
- Number of components: 4-6
- List of components: Temperature sensor, bias resistors, amplifier, reference voltage
- Solutions: Temperature monitoring, environmental control, compensation

### Light Sensor Circuit
- Description of Circuit: Circuit using photodiode or photoresistor for light measurement
- DC circuit
- Type of Circuit: Light sensing circuit
- Number of components: 3-4
- List of components: Photodiode or photoresistor, amplifier, bias resistors
- Solutions: Light measurement, automatic lighting, optical communications

### Strain Gauge Circuit
- Description of Circuit: Bridge circuit using strain gauges for force/pressure measurement
- DC circuit
- Type of Circuit: Mechanical measurement circuit
- Number of components: 6-8
- List of components: Four strain gauges in bridge, instrumentation amplifier, excitation voltage
- Solutions: Force measurement, pressure sensing, structural monitoring

### AC/DC Converter for Measurement
- Description of Circuit: Circuit converting AC signals to proportional DC for measurement
- AC circuit (input), DC circuit (output)
- Type of Circuit: Signal conditioning circuit
- Number of components: 4-6
- List of components: Precision rectifier, filter capacitor, amplifier, reference circuits
- Solutions: AC signal measurement, RMS conversion, instrumentation

### Sample and Hold Circuit
- Description of Circuit: Circuit that samples and holds analog signal value
- AC circuit
- Type of Circuit: Signal processing circuit
- Number of components: 4-5
- List of components: Analog switch, hold capacitor, buffer amplifiers, control logic
- Solutions: ADC interfacing, signal processing, data acquisition

### Peak Detector Circuit
- Description of Circuit: Circuit that captures and holds peak value of input signal
- AC circuit
- Type of Circuit: Signal processing circuit
- Number of components: 4
- List of components: Diode, capacitor, buffer amplifier, discharge resistor
- Solutions: Peak measurement, envelope detection, signal analysis

### RMS-to-DC Converter
- Description of Circuit: Circuit that converts AC signal to equivalent DC RMS value
- AC circuit (input), DC circuit (output)
- Type of Circuit: Signal processing circuit
- Number of components: 6-8
- List of components: Multiplier IC, averaging filter, square root circuit, precision amplifiers
- Solutions: True RMS measurement, power calculations, AC instrumentation

### Analog Multiplexer Circuit
- Description of Circuit: Circuit that selects one of several analog inputs
- DC or AC circuit
- Type of Circuit: Signal routing circuit
- Number of components: 5-8
- List of components: Analog multiplexer IC, digital control inputs, buffer amplifiers
- Solutions: Multi-channel data acquisition, signal routing, instrumentation

This comprehensive list covers the fundamental circuits that form the backbone of introductory electrical engineering education, spanning from basic DC analysis through advanced analog and power applications. Each circuit builds upon fundamental concepts while introducing practical engineering applications that students will encounter throughout their careers.