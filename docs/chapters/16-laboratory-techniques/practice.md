---
title: Chapter 16 Practice Problems — Laboratory Measurement Techniques
description: Practice problems with hints for Chapter 16 covering oscilloscope settings, probe compensation, loading error calculation, multimeter accuracy, measurement uncertainty, and systematic circuit debugging
---

<div class="unit1-styled" markdown>

# Chapter 16 Practice Problems — Laboratory Measurement Techniques

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — Oscilloscope Settings and Reading

An oscilloscope is set to 200 µs/div (time base) and 0.5 V/div (vertical sensitivity). A repeating waveform is observed on the screen. The waveform completes exactly 2.5 cycles across the 10 horizontal divisions, and the waveform peak-to-peak height spans 6 vertical divisions.

**(a)** Calculate the period \(T\) and frequency \(f\) of the waveform.

**(b)** Calculate the peak-to-peak voltage \(V_{pp}\), the peak voltage \(V_p\), and the RMS voltage \(V_{rms}\) (assuming the waveform is sinusoidal).

**(c)** You want to display exactly 3 complete cycles of this same signal. What time base setting (s/div) should you choose?

??? tip "Hint"
    **(a)** The total time window is \(10 \text{ div} \times 200\,\mu\text{s/div} = 2000\,\mu\text{s}\). If 2.5 cycles fit in this window, one period is \(T = 2000\,\mu\text{s} / 2.5\). Then \(f = 1/T\).

    **(b)** \(V_{pp} = 6 \text{ div} \times 0.5\,\text{V/div} = 3\,\text{V}\). For a symmetric sinusoid, \(V_p = V_{pp}/2\). The RMS value of a sinusoid is \(V_{rms} = V_p / \sqrt{2}\).

    **(c)** To show 3 cycles, the total time window must be \(3T\). Divide by 10 divisions to get the required s/div setting. Choose the nearest standard oscilloscope time base setting (e.g., 100, 200, 500 µs/div).

---

## Problem 2 — Probe Compensation and Selection

A technician connects a 10X probe to an oscilloscope and probes a 1 kHz square wave. The displayed waveform shows rounded corners — the rising edge takes nearly a quarter period to reach its final value.

**(a)** Is the probe under-compensated or over-compensated? Describe what an over-compensated probe's square wave would look like instead.

**(b)** Explain step-by-step how to correctly compensate the probe using the oscilloscope's calibration output.

**(c)** For a high-frequency measurement at 50 MHz, should a 1X or 10X probe be used? Justify your answer using the input capacitance values from the chapter (\(\approx 100\) pF for 1X vs. \(\approx 10\) pF for 10X).

??? tip "Hint"
    **(a)** Rounded corners indicate the probe is forming an excessive low-pass filter — this is **under-compensation**. The trimmer capacitance is too low. Over-compensation produces the opposite: overshoot and ringing at the transitions because there is too much high-frequency boost.

    **(b)** The standard procedure: connect probe tip to the CAL output (1 kHz square wave), connect probe ground to the adjacent ground terminal, set time base and V/div to clearly display the waveform, then adjust the probe's trimmer capacitor (usually at the BNC end) with a non-metallic tool until the top of the square wave is flat with sharp, clean corners.

    **(c)** The capacitive reactance of the probe's input capacitance at 50 MHz is \(X_C = 1/(2\pi f C)\). For 100 pF: \(X_C \approx 32\) Ω, which heavily loads the circuit. For 10 pF: \(X_C \approx 320\) Ω, which is 10 times less loading. The 10X probe is strongly preferred for high-frequency work.

---

## Problem 3 — Loading Error Calculation

A circuit node has a Thevenin equivalent of \(V_{th} = 3.3\) V and \(R_{th} = 220\) kΩ.

**(a)** A digital multimeter with \(R_{meter} = 10\) MΩ is connected to measure this node. Using the loading formula \(V_{measured} = V_{th} \times R_{meter}/(R_{meter} + R_{th})\), find the reading and the percentage error.

**(b)** A 10X oscilloscope probe is used instead, presenting 10 MΩ in parallel with 10 pF. At DC, find the measured voltage and percentage error.

**(c)** An op-amp voltage follower (buffer) is inserted between the circuit node and the measuring instrument. What loading error does the instrument now see, and why does the buffer solve the problem?

??? tip "Hint"
    **(a)** Substitute \(R_{meter} = 10\,\text{M}\Omega\) and \(R_{th} = 220\,\text{k}\Omega\) into the voltage divider formula. The fractional error is \(R_{th}/(R_{meter} + R_{th})\). Convert to percentage.

    **(b)** At DC the capacitor is an open circuit, so the probe appears as pure 10 MΩ — the same as the DMM. The result should match part (a). (At high frequencies the capacitive loading would worsen the error.)

    **(c)** A voltage follower has input impedance approaching infinity and output impedance approaching zero. The instrument now sees the buffer's near-zero output impedance as \(R_{source}\), making \(R_{source} \approx 0\) and the loading error negligible. The buffer's high input impedance also minimally loads the original 220 kΩ source.

---

## Problem 4 — Systematic Circuit Debugging

A student builds an inverting amplifier with \(R_i = 10\) kΩ, \(R_f = 47\) kΩ, powered by ±12 V. The expected gain is \(-4.7\). The measured output is approximately \(-12\) V (saturated) for any non-zero input.

**(a)** List three possible root causes that could explain why the output is saturated.

**(b)** Describe a step-by-step measurement sequence using a multimeter and oscilloscope to isolate the fault, without removing components.

**(c)** It is discovered that \(R_f\) was accidentally replaced by a 470 kΩ resistor. Calculate the intended gain and the actual gain with the wrong resistor. At what input voltage would the output first clip with ±12 V supplies and approximately ±10 V saturation limits?

??? tip "Hint"
    **(a)** Saturation means the feedback is insufficient to control the output. Possible causes include: (1) the feedback resistor is open-circuited or has wrong value (too high gain), (2) the non-inverting input is not at ground (floating or connected to wrong node), (3) the input resistor is open (infinite gain loop), (4) the op-amp is wired without negative feedback (positive feedback instead).

    **(b)** Systematic sequence: First verify supply voltages at the op-amp power pins with the multimeter. Then check that \(V_+ = 0\) V (non-inverting input at ground). Check continuity of \(R_i\) and \(R_f\) in-circuit. Inject a small known AC signal from the function generator and trace it through — observe the op-amp's inverting input with the oscilloscope; if it is not at virtual ground, the feedback path is broken.

    **(c)** Intended gain: \(-R_f/R_i = -47\,\text{k}\Omega/10\,\text{k}\Omega = -4.7\). Actual gain with 470 kΩ: \(-470\,\text{k}\Omega/10\,\text{k}\Omega = -47\). With ±10 V saturation limits, the maximum input before clipping is \(|V_{in,max}| = 10\,\text{V}/47 \approx 0.21\,\text{V}\). Any input larger than 210 mV drives the output into saturation.

---

</div>
