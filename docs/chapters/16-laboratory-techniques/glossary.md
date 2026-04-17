---
title: Chapter 16 Glossary — Laboratory Measurement Techniques
description: Key terms and definitions for Chapter 16
---

<div class="unit1-styled" markdown>

# Chapter 16 Glossary

| Term | Definition |
|------|-----------|
| Multimeter | A multi-function test instrument (DMM — digital multimeter) that measures voltage, current, resistance, and often capacitance, frequency, diode voltage, and continuity. Voltage measurement: connected in parallel with high impedance (~10 MΩ). Current measurement: inserted in series with low impedance. Resistance: measured with power off. |
| Oscilloscope | An instrument that displays voltage as a function of time, allowing waveform shape, amplitude, frequency, rise time, and phase relationships to be observed. Essential for dynamic circuit analysis. Modern digital oscilloscopes provide automatic measurements, cursor readouts, and FFT spectrum analysis. |
| Function generator | An instrument that produces standard periodic waveforms (sine, square, triangle, sawtooth) at programmable frequencies, amplitudes, and offsets. Used to inject test signals into circuits. Frequency range typically covers DC to 1–100+ MHz. Sweep modes enable frequency response testing. |
| DC power supply | An instrument that provides stable, adjustable DC voltage and current for powering circuits on the bench. Key specifications: output voltage range, maximum current, voltage regulation (how much voltage changes with load), and current limiting (protects the circuit under test from fault currents). |
| Oscilloscope probe | A coaxial cable assembly with a tip that connects to the circuit and a BNC connector at the scope input. Standard 10× probes have a 9 MΩ series resistor that divides the signal by 10, reducing the probe's capacitive loading on the circuit. The oscilloscope automatically compensates by scaling the display by 10. |
| Probe compensation | The adjustment of a small trimmer capacitor in the probe to match the probe's capacitive divider to the oscilloscope input impedance. A properly compensated probe shows flat-topped square waves; an over-compensated probe shows overshoot; under-compensated shows sag. Must be checked when a probe is connected to a new scope. |
| Triggering | The oscilloscope function that starts the display sweep at a consistent, user-defined point on the waveform — typically a voltage threshold crossing. Proper triggering produces a stable, stationary display. Trigger modes include edge (rising or falling), level threshold, and auto (runs continuously without a stable trigger). |
| Time base | The oscilloscope horizontal axis control that sets the time per division (s/div). Setting the time base so that 1–3 complete cycles are visible allows clear period measurement. For a 1 kHz signal (T = 1 ms), a time base of 200 μs/div shows two cycles. |
| Vertical sensitivity | The oscilloscope vertical axis control that sets the voltage per division (V/div). Must be set so the waveform occupies most of the screen height without clipping. For a 1 V peak signal, 200 mV/div uses 5 divisions of the 8-division screen. |
| AC coupling | An oscilloscope or amplifier input mode that blocks the DC component of a signal, displaying only the AC variations. Achieved with a series capacitor. Useful for observing small AC signals riding on a large DC offset. The low-frequency cutoff is determined by the coupling capacitor and input resistance. |
| DC coupling | An oscilloscope or amplifier input mode that passes both DC and AC components of a signal. Required for measuring DC voltages, slow signals, or signals where the absolute DC level is important. Cannot observe small AC signals riding on a large DC offset without the signal going off-screen. |
| Breadboard | A solderless prototyping board with spring-clip contacts arranged in a grid. Components are inserted and connected by plugging leads into the holes. The horizontal rows are typically connected in groups of 5; the vertical bus rails run the full length. High-frequency performance is limited by parasitic capacitance (~2 pF/hole). |
| Loading error | The systematic measurement error that occurs when the measuring instrument's impedance is not much greater than the source impedance being measured. A voltmeter with 10 MΩ input impedance connected across a 1 MΩ resistor in a voltage divider loads the circuit and reduces the measured voltage below its true value. Always consider the measurement instrument's impedance. |
| Circuit debugging | The systematic process of finding and correcting faults in a circuit that does not behave as designed. A structured approach: check power and ground first, then verify voltages at key nodes, compare measurements to calculated predictions, isolate the misbehaving section, and check components individually. Avoid random changes without a hypothesis. |
| Safety practices | Essential precautions when working with electrical circuits. Key rules: always power off before making connections; use the one-hand rule near live circuits (keep one hand in pocket to prevent chest-crossing current); discharge capacitors before touching; never measure mains voltage without proper high-voltage probes; know the location of the power-off switch before energizing. |

</div>
