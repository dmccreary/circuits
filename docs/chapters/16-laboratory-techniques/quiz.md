---
title: Chapter 16 Quiz — Laboratory Measurement Techniques
description: Multiple choice quiz and practice problems covering multimeters, oscilloscopes, probes, triggering, loading errors, and safety
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

# Chapter 16 Quiz and Problems — Laboratory Measurement Techniques

## Multiple Choice Quiz

**1. A multimeter set to measure current is accidentally connected in parallel across a 10 Ω resistor in a 12 V circuit. What most likely happens?**

- [ ] A) The meter reads 1.2 A correctly
- [ ] B) The meter reads 0 A because it is not in series
- [ ] C) Very large current flows through the meter, likely blowing the internal fuse
- [ ] D) The meter reads 12 V because voltage and current measurements are equivalent

??? success "Answer"
    **C) Very large current flows through the meter, likely blowing the internal fuse.**
    
    An ammeter has very low internal resistance (ideally 0 Ω). When placed in parallel with a 10 Ω resistor in a 12 V circuit, the meter appears as a near-short across the resistor. The current through the meter is approximately \(12\,\text{V} / R_{meter}\), where \(R_{meter}\) is only a few ohms — yielding current well above the meter's fuse rating. Always insert an ammeter in series by breaking the circuit first.

---

**2. An oscilloscope displays a sine wave with a peak-to-peak height of 4.0 divisions and the vertical sensitivity is set to 2 V/div. What is the peak voltage \(V_p\)?**

- [ ] A) 2 V
- [ ] B) 4 V
- [ ] C) 8 V
- [ ] D) 16 V

??? success "Answer"
    **B) 4 V.**
    
    Peak-to-peak voltage: \(V_{pp} = 4.0\,\text{div} \times 2\,\text{V/div} = 8\,\text{V}\)
    
    Peak voltage: \(V_p = V_{pp} / 2 = 8 / 2 = 4\,\text{V}\)
    
    RMS voltage would be \(V_p / \sqrt{2} \approx 2.83\) V — a different quantity from the peak value.

---

**3. A function generator with 50 Ω output impedance is set to produce 4 V peak-to-peak. It is connected directly to a 50 Ω terminated load. What voltage does the load actually see?**

- [ ] A) 4 V peak-to-peak
- [ ] B) 2 V peak-to-peak
- [ ] C) 1 V peak-to-peak
- [ ] D) 8 V peak-to-peak

??? success "Answer"
    **B) 2 V peak-to-peak.**
    
    The generator's internal 50 Ω source resistance and the 50 Ω load form a voltage divider:
    
    \[V_{load} = 4\,\text{V} \times \frac{50}{50 + 50} = 4 \times 0.5 = 2\,\text{V}_{pp}\]
    
    The generator's front-panel amplitude display assumes a matched 50 Ω termination. Always verify the actual voltage at the circuit input with an oscilloscope.

---

**4. Which oscilloscope probe characteristic makes the 10X probe preferred over the 1X probe for most measurements?**

- [ ] A) The 10X probe amplifies the signal by 10, making small signals easier to see
- [ ] B) The 10X probe has higher input capacitance (~100 pF), providing better noise immunity
- [ ] C) The 10X probe has lower input capacitance (~10 pF) and higher input impedance (10 MΩ), reducing circuit loading
- [ ] D) The 10X probe is preferred because it draws more current, stabilizing the measured node

??? success "Answer"
    **C) The 10X probe has lower input capacitance (~10 pF) and higher input impedance (10 MΩ), reducing circuit loading.**
    
    The 10X probe's series 9 MΩ resistor, combined with the scope's 1 MΩ input, raises total impedance to 10 MΩ and reduces the effective capacitance from ~100 pF (1X) to ~10 pF. This dramatically reduces loading on the circuit — particularly at high frequencies where capacitive loading matters most — and extends usable bandwidth to hundreds of MHz.

---

**5. An oscilloscope display shows a waveform rolling slowly from left to right with no stable pattern. The most likely cause is:**

- [ ] A) The vertical sensitivity (V/div) is set too high
- [ ] B) The time base (s/div) is set too slow for the signal frequency
- [ ] C) The trigger level is outside the range of the signal amplitude
- [ ] D) The probe is in DC coupling instead of AC coupling

??? success "Answer"
    **C) The trigger level is outside the range of the signal amplitude.**
    
    A rolling or unstable display means the oscilloscope is not finding valid trigger events — it is not detecting the waveform crossing the trigger threshold. If the trigger level is set above the maximum or below the minimum of the waveform, no triggers occur (in Normal mode) or sweeps start at random (in Auto mode), producing the rolling appearance. Adjust the trigger level to a voltage within the waveform's amplitude range, on a cleanly sloped portion.

---

**6. A circuit node has a Thevenin equivalent of \(V_{th} = 10\) V and \(R_{th} = 1\) MΩ. A DMM with 10 MΩ input impedance measures this node. What does the meter read?**

- [ ] A) 10.0 V
- [ ] B) 9.09 V
- [ ] C) 1.00 V
- [ ] D) 5.00 V

??? success "Answer"
    **B) 9.09 V.**
    
    The source and meter impedances form a voltage divider:
    
    \[V_{measured} = 10\,\text{V} \times \frac{10\,\text{M}\Omega}{10\,\text{M}\Omega + 1\,\text{M}\Omega} = 10 \times \frac{10}{11} \approx 9.09\,\text{V}\]
    
    The loading error is approximately 9.1% — significant for a high-impedance source. A 10 GΩ electrometer or an op-amp voltage follower would reduce this error to negligible levels.

---

**7. When performing probe compensation on a 10X oscilloscope probe, you observe that the square wave top has rounded corners. This indicates:**

- [ ] A) The probe is over-compensated
- [ ] B) The probe is correctly compensated
- [ ] C) The probe is under-compensated
- [ ] D) The oscilloscope's bandwidth is too low

??? success "Answer"
    **C) The probe is under-compensated.**
    
    Under-compensation means the probe's compensation capacitor value is too small, resulting in insufficient high-frequency response — the high frequencies responsible for sharp edges are attenuated, producing rounded corners. Turn the trimmer capacitor clockwise (usually) to increase capacitance until the corners are sharp and the top is flat. Over-compensation produces the opposite effect: overshoot and ringing at the corners.

---

**8. Which coupling mode should be used to examine a 50 mV AC ripple superimposed on a 15 V DC supply rail?**

- [ ] A) DC coupling, with V/div set to include the full 15 V
- [ ] B) AC coupling, allowing the 15 V DC to be blocked while the ripple fills the screen
- [ ] C) Ground coupling, to establish a zero reference first
- [ ] D) External coupling, to separate the DC and AC paths

??? success "Answer"
    **B) AC coupling, allowing the 15 V DC to be blocked while the ripple fills the screen.**
    
    In DC coupling, the 15 V offset forces a very coarse V/div setting (e.g., 5 V/div), leaving the 50 mV ripple as only 0.01 divisions — completely unresolvable. AC coupling blocks the DC component, centering the display around zero. The V/div can then be set to, say, 10 mV/div, making the ripple 5 divisions tall and fully measurable.

---

**9. What is the correct procedure for measuring the resistance of a resistor that is already soldered into a powered circuit?**

- [ ] A) Set the DMM to resistance mode and measure directly — the meter will account for the supply voltage
- [ ] B) Remove power from the circuit and measure; the reading may still be incorrect if there are parallel paths
- [ ] C) Measure the voltage across and current through the resistor, then use Ohm's Law
- [ ] D) Use AC coupling on the oscilloscope to eliminate the DC bias before measuring

??? success "Answer"
    **C) Measure the voltage across and current through the resistor, then use Ohm's Law.**
    
    Answers A and B both have problems: an ohmmeter applies its own test current and will read incorrectly with any parallel supply voltage present. Even with power removed (B), other circuit paths in parallel will cause the meter to read a lower effective resistance than the component alone. The correct in-circuit approach is to use Ohm's Law — measure \(V\) with a voltmeter in parallel and \(I\) indirectly via a sense resistor, then calculate \(R = V/I\). Alternatively, remove the component from the circuit before measuring.

---

**10. The one-hand rule for electrical safety means:**

- [ ] A) Only one hand should ever touch a circuit component at a time
- [ ] B) Always use one hand to hold the probe and the other to adjust the oscilloscope controls
- [ ] C) When probing a live circuit, keep one hand in a pocket or behind your back to prevent current from crossing the chest
- [ ] D) Use only one probe at a time to avoid ground loops

??? success "Answer"
    **C) When probing a live circuit, keep one hand in a pocket or behind your back to prevent current from crossing the chest.**
    
    Electrical current is dangerous when it flows through the chest cavity, where it can disrupt heart rhythm. If both hands contact live conductors at different potentials, current flows hand-to-hand across the chest — the most dangerous path. Keeping one hand out of the circuit limits any accidental current to a less critical path. This rule is standard practice in industrial electrical safety.

---

## Practice Problems

### Problem 1 — Loading Error Analysis

A piezoelectric sensor has an open-circuit output voltage of 8.0 V and a Thevenin source resistance of 5 MΩ.

**(a)** Calculate the voltage measured by a standard 10 MΩ DMM.

**(b)** Calculate the percentage loading error.

**(c)** An engineer connects an op-amp voltage follower (buffer) with 1 TΩ (\(10^{12}\) Ω) input impedance before the DMM. What voltage does the DMM now read (assume ideal buffer with no output impedance)?

**(d)** Explain in one sentence why a voltage follower eliminates loading error in this situation.

??? success "Solution"
    **(a)** Apply the loading formula. The meter and source form a voltage divider:
    
    \[V_{measured} = V_{th} \times \frac{R_{meter}}{R_{meter} + R_{source}}\]
    
    \[V_{measured} = 8.0 \times \frac{10\,\text{M}\Omega}{10\,\text{M}\Omega + 5\,\text{M}\Omega} = 8.0 \times \frac{10}{15} = 5.33\,\text{V}\]
    
    **(b)** Percentage loading error:
    
    \[\text{Error} = \frac{V_{actual} - V_{measured}}{V_{actual}} \times 100\% = \frac{8.0 - 5.33}{8.0} \times 100\% = 33.3\%\]
    
    Alternatively, directly: \(\text{Error} = \frac{R_{source}}{R_{meter} + R_{source}} = \frac{5}{15} = 33.3\%\)
    
    **(c)** The op-amp buffer's \(10^{12}\) Ω input impedance forms a voltage divider with the 5 MΩ source:
    
    \[V_{buffer\_input} = 8.0 \times \frac{10^{12}}{10^{12} + 5 \times 10^6} \approx 8.0 \times \frac{10^{12}}{10^{12}} \approx 8.000\,\text{V}\]
    
    The buffer outputs 8.000 V into the DMM. The DMM then measures:
    
    \[V_{DMM} = 8.000 \times \frac{10\,\text{M}\Omega}{10\,\text{M}\Omega + 0\,\Omega} = 8.000\,\text{V}\]
    
    (The ideal buffer has zero output impedance, so the DMM sees no source resistance and reads the full value.)
    
    **(d)** The voltage follower presents virtually infinite impedance to the sensor (drawing no current and causing no voltage drop) while presenting zero output impedance to the DMM, isolating the high-impedance source from the loading effect of the meter.

---

### Problem 2 — Phase Measurement from Oscilloscope Readings

A 500 Hz sinusoidal input is applied to an RL circuit. A dual-channel oscilloscope displays the input on CH1 and the output on CH2 with a time base of 500 µs/div.

The rising zero crossing of CH1 occurs at the 2.0-division mark. The rising zero crossing of CH2 occurs at the 2.6-division mark.

**(a)** Calculate the time delay \(\Delta t\) between the two channels.

**(b)** Calculate the period \(T\) of the signal from the given frequency.

**(c)** Calculate the phase angle \(\phi\) of CH2 relative to CH1.

**(d)** Does the output lead or lag the input? Is this consistent with an inductive load?

??? success "Solution"
    **(a)** Time delay between zero crossings:
    
    \[\Delta t = (2.6 - 2.0)\,\text{div} \times 500\,\mu\text{s/div} = 0.6 \times 500 = 300\,\mu\text{s}\]
    
    **(b)** Period from frequency:
    
    \[T = \frac{1}{f} = \frac{1}{500\,\text{Hz}} = 2000\,\mu\text{s} = 2\,\text{ms}\]
    
    **(c)** Phase angle:
    
    \[\phi = \frac{\Delta t}{T} \times 360° = \frac{300\,\mu\text{s}}{2000\,\mu\text{s}} \times 360° = 0.15 \times 360° = 54°\]
    
    **(d)** CH2 zero crossing occurs **after** CH1 (at a later division number), so the output **lags** the input by 54°. This is consistent with an inductive (RL) load: in an RL series circuit, the voltage across the resistor lags the source voltage by a phase angle \(\phi = \arctan(X_L / R)\). A 54° lag corresponds to \(\tan(54°) \approx 1.38\), so \(X_L / R \approx 1.38\), meaning the inductive reactance and resistance are of comparable magnitude at 500 Hz.

---

### Problem 3 — Probe Selection and Compensation

An engineer is characterizing a 4 MHz clock signal with 3.3 V amplitude in a digital circuit.

**(a)** Should a 1X or 10X probe be used? Justify with reference to input capacitance at 4 MHz.

**(b)** The 10X probe is connected and the 1 kHz compensation square wave shows overshoot at the leading edge. What does this indicate, and how is it corrected?

**(c)** After compensation, the engineer uses the oscilloscope's automatic frequency measurement and reads 4.02 MHz. The time base is set to 50 ns/div. How many divisions does one period of a 4 MHz signal occupy on the display?

**(d)** Estimate the capacitive reactance of a 1X probe (~100 pF) and a 10X probe (~10 pF) at 4 MHz. Which provides better signal fidelity?

??? success "Solution"
    **(a)** A **10X probe** should be used. At 4 MHz, capacitive loading is a significant concern. A 1X probe with ~100 pF input capacitance, when connected to a typical source impedance of 50–100 Ω, forms a low-pass RC filter with corner frequency:
    
    \[f_{c} = \frac{1}{2\pi R C} = \frac{1}{2\pi \times 100\,\Omega \times 100\,\text{pF}} \approx 16\,\text{MHz}\]
    
    While 16 MHz > 4 MHz, the attenuation at 4 MHz is already \(\sim 25\%\) of the corner, introducing measurable rolloff and phase error. The 10X probe (~10 pF) raises the corner to ~160 MHz, making loading negligible at 4 MHz.
    
    **(b)** Overshoot indicates the probe is **over-compensated** — the probe's trimmer capacitor has too much capacitance, emphasizing high frequencies relative to low. Correct by adjusting the trimmer (typically counterclockwise) to reduce compensation capacitance until the square wave top is flat with sharp, clean corners and no ringing.
    
    **(c)** Period of a 4 MHz signal:
    
    \[T = \frac{1}{4 \times 10^6\,\text{Hz}} = 250\,\text{ns}\]
    
    Number of divisions at 50 ns/div:
    
    \[\text{Divisions} = \frac{T}{\text{s/div}} = \frac{250\,\text{ns}}{50\,\text{ns/div}} = 5.0\,\text{divisions}\]
    
    One complete cycle spans 5 divisions — a convenient display that allows clear period and amplitude measurement.
    
    **(d)** Capacitive reactance at 4 MHz:
    
    For 1X probe (100 pF):
    \[X_{C1} = \frac{1}{2\pi f C} = \frac{1}{2\pi \times 4 \times 10^6 \times 100 \times 10^{-12}} = \frac{1}{2513 \times 10^{-6}} \approx 398\,\Omega\]
    
    For 10X probe (10 pF):
    \[X_{C10} = \frac{1}{2\pi \times 4 \times 10^6 \times 10 \times 10^{-12}} \approx 3980\,\Omega\]
    
    The 10X probe's capacitive reactance is 10× higher, meaning it draws 10× less capacitive current from the circuit and introduces 10× less loading at 4 MHz. The 10X probe provides significantly better signal fidelity.

---

### Problem 4 — Debugging a Non-Functioning Amplifier

A single-supply inverting op-amp amplifier is built on a breadboard. The supply is +12 V / GND. The circuit uses \(R_1 = 10\) kΩ (input resistor) and \(R_f = 100\) kΩ (feedback resistor), so the designed voltage gain is \(-10\). A 100 mV, 1 kHz sine wave is applied at the input.

The oscilloscope shows:
- CH1 (input): clean 100 mV sine wave at 1 kHz ✓
- CH2 (output): flat line at approximately 0 V

**(a)** List three distinct hypotheses that could explain a flat-zero output, ordered from most to least likely to encounter on a breadboard.

**(b)** Describe the measurement sequence you would follow to localize the fault using a systematic divide-and-conquer strategy. Specify which instrument, connection points, and expected readings at each step.

**(c)** The DMM reads +12 V at the op-amp V+ supply pin (pin 7) and 0 V at the V− supply pin (pin 4). The non-inverting input (pin 3) reads 6.0 V (a mid-supply bias resistor sets this). The inverting input (pin 2) reads 6.0 V also — consistent with a working amplifier in negative feedback. Yet the output (pin 6) reads 6.0 V and does not change with the input signal. What does this pattern suggest, and what is the next measurement?

**(d)** It is discovered that the output pin (pin 6) is not connected to \(R_f\) — the wire from pin 6 is seated in the wrong row on the breadboard. After fixing, the output shows a clipped square wave instead of a sine wave. What additional adjustment is needed, and how would you verify it?

??? success "Solution"
    **(a)** Three hypotheses for flat-zero output, most to least likely on a breadboard:
    
    1. **Wiring error** — An input, output, supply, or feedback wire is in the wrong breadboard row. This is the most common breadboard fault; even an experienced builder misplaces wires.
    2. **Missing or incorrect supply voltage at the op-amp power pins** — The op-amp receives no power (supply not wired to the IC's V+ and V− pins, or a broken bus strip connection).
    3. **Op-amp is in open-loop condition** — The feedback resistor \(R_f\) is disconnected or in the wrong row, putting the amplifier into open-loop with gain of ~100,000, which would drive the output to saturation (not zero). A true flat-zero suggests the output cannot source any voltage, pointing to a supply or connectivity issue rather than feedback.
    
    **(b)** Systematic measurement sequence:
    
    | Step | Instrument | Measurement | Expected (healthy) | Action if wrong |
    |------|-----------|------------|-------------------|-----------------|
    | 1 | DMM (DC V) | +12 V supply bus to ground | +12.0 V | Check power supply CV/CC status; check bus strip connection |
    | 2 | DMM (DC V) | Op-amp pin 7 (V+) to ground | +12.0 V | Find missing or misrouted V+ wire |
    | 3 | DMM (DC V) | Op-amp pin 4 (V−) to ground | 0.0 V (GND) | Find missing or misrouted GND wire |
    | 4 | Scope CH1 | Op-amp pin 2 (inverting input) | 100 mV AC signal visible | Trace back through \(R_1\); check \(R_1\) connection to pin 2 |
    | 5 | Scope CH2 | Op-amp pin 6 (output) | −1.0 V pk-pk (gain −10) | If 0 V, feedback path is broken; check \(R_f\) and output wiring |
    
    **(c)** The pattern — supply correct, both inputs at mid-supply, output stuck at mid-supply without responding to signal — suggests the **feedback is broken**. With no feedback path, the op-amp should saturate (go to near +12 V or 0 V), not sit at mid-supply. A mid-supply output with no signal response is consistent with the output pin being disconnected from the rest of the circuit. The op-amp is correctly biased (both inputs at 6 V due to the bias resistor and negative feedback that isn't working), and the output is at 6 V because no load is pulling it.
    
    **Next measurement:** Verify continuity between op-amp pin 6 and the node connecting \(R_f\) and the load. Use the DMM continuity beep mode. This will immediately reveal whether the output pin is physically connected to where it should be.
    
    **(d)** After fixing the output connection, a clipped square wave indicates the amplifier is **saturating** — the output is driven to its supply limits (+12 V and 0 V) because the input signal is too large for the gain setting. With gain = −10 and a 100 mV input, the expected output is 1.0 V peak-to-peak — well within the supply headroom. However, if the input amplitude was inadvertently increased during debugging (e.g., the function generator output was changed), or if the scope is now showing the actual waveform that was always there but previously hidden by the wiring fault, the input may need to be reduced.
    
    **Adjustment:** Reduce the function generator amplitude until the output is a clean sine wave without clipping. Verify on the oscilloscope that the output peak-to-peak is exactly 10× the input peak-to-peak, confirming the gain of −10 is correct. Also verify with the DMM that the DC operating point at the output is mid-supply (~6 V), confirming proper biasing.
