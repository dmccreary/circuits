---
title: Chapter 16 Practice Problems — Laboratory Measurement Techniques
description: Practice problems with solutions for Chapter 16 covering oscilloscope settings, multimeter usage, loading errors, and circuit debugging
---

<div class="unit1-styled" markdown>

# Chapter 16 Practice Problems

## Practice Problems

### Problem 1 — Oscilloscope Settings

You need to display a 440 Hz audio tone (A4 musical note) with a peak amplitude of 3 V on an oscilloscope.

**(a)** Calculate the period of this signal.

**(b)** Select the time base (s/div) to display approximately 2 complete cycles on a 10-division horizontal screen.

**(c)** Select the vertical sensitivity (V/div) so the waveform occupies about 6 of the 8 vertical divisions.

**(d)** The signal has a +1 V DC offset. Should you use AC or DC coupling to see the AC signal clearly? Explain.

??? success "Solution"
    **(a)** Period:

    \[T = \frac{1}{f} = \frac{1}{440} = 2.273\text{ ms}\]

    **(b)** For 2 cycles across 10 divisions: time per cycle = \(T = 2.273\text{ ms}\), so time per 5 divisions = \(T/2 = 1.136\text{ ms}\). Set time base to **500 μs/div**. This shows \(10 \times 0.5\text{ ms} = 5\text{ ms} \approx 2.2\) cycles. Alternatively, 200 μs/div shows about 5.5 cycles.

    **(c)** Peak amplitude = 3 V, so peak-to-peak = 6 V. For 6 divisions: \(6\text{ V} / 6\text{ div} = 1\text{ V/div}\). Set vertical sensitivity to **1 V/div**.

    **(d)** Use **AC coupling** to observe the 3 V peak AC signal clearly. With DC coupling, the +1 V DC offset would shift the waveform upward by 1 division, consuming display space. AC coupling blocks the DC component and centers the waveform, making it easier to measure amplitude and frequency. (However, if you need to see the DC offset, use DC coupling.)

---

### Problem 2 — Multimeter Loading Error

A voltage divider circuit has R1 = 1 MΩ and R2 = 1 MΩ connected across a 10 V source. A digital multimeter with 10 MΩ input impedance is connected across R2 to measure its voltage.

**(a)** Calculate the ideal voltage across R2 (no meter connected).

**(b)** Calculate the actual voltage measured, accounting for the meter's 10 MΩ loading.

**(c)** What is the percentage error introduced by the meter?

**(d)** Repeat with a voltmeter of only 100 kΩ input impedance. What is the percentage error now?

??? success "Solution"
    **(a)** Ideal voltage (equal resistors, 10 V source):

    \[V_{R2,ideal} = 10 \times \frac{1\text{M}}{1\text{M} + 1\text{M}} = 10 \times 0.5 = 5.0\text{ V}\]

    **(b)** With 10 MΩ meter in parallel with R2:

    \[R_{2,loaded} = \frac{1\text{M} \times 10\text{M}}{1\text{M} + 10\text{M}} = \frac{10}{11}\text{ MΩ} = 909\text{ kΩ}\]
    \[V_{measured} = 10 \times \frac{909\text{k}}{1000\text{k} + 909\text{k}} = 10 \times \frac{909}{1909} = 4.76\text{ V}\]

    **(c)** Percentage error: \((5.0 - 4.76)/5.0 \times 100\% = 4.8\%\). A 10 MΩ meter introduces a 4.8% error with 1 MΩ source resistance.

    **(d)** With 100 kΩ meter:

    \[R_{2,loaded} = \frac{1\text{M} \times 100\text{k}}{1\text{M} + 100\text{k}} = \frac{100\text{k}}{11} = 90.9\text{ kΩ}\]
    \[V_{measured} = 10 \times \frac{90.9\text{k}}{1000\text{k} + 90.9\text{k}} = \frac{909}{10{,}909} = 0.833\text{ V}\]

    Error: \((5.0 - 0.833)/5.0 \times 100\% = 83.3\%\). A 100 kΩ meter is completely unsuitable here — it nearly short-circuits R2.

---

### Problem 3 — Function Generator and Filter Measurement

You are measuring the frequency response of an RC low-pass filter (R = 10 kΩ, C = 15.9 nF) using a function generator and oscilloscope. The generator output resistance is 50 Ω.

**(a)** Calculate the theoretical cutoff frequency of the filter.

**(b)** At what frequency should the output amplitude fall to 0.707 of the input amplitude? What phase shift should you measure?

**(c)** The oscilloscope probe has 10 pF capacitance in parallel with the filter's output capacitor. Does probe capacitance matter here? (Compare 10 pF to 15.9 nF.)

**(d)** List the measurement steps to record the Bode magnitude plot from 100 Hz to 100 kHz.

??? success "Solution"
    **(a)** Cutoff frequency:

    \[f_c = \frac{1}{2\pi RC} = \frac{1}{2\pi \times 10{,}000 \times 15.9\times10^{-9}} = \frac{1}{9.99\times10^{-4}} \approx 1{,}001\text{ Hz} \approx 1\text{ kHz}\]

    The 50 Ω generator source resistance is negligible compared to the 10 kΩ filter resistor.

    **(b)** The output amplitude falls to 0.707 (−3 dB) at the cutoff frequency \(f_c \approx 1\text{ kHz}\). The phase shift at this frequency is −45°.

    **(c)** Probe capacitance of 10 pF adds to the 15.9 nF filter capacitor: \(15{,}900 + 10 = 15{,}910\text{ pF}\). This is a 0.063% change — negligible. However, for high-frequency circuits or with very small filter capacitors, probe capacitance can significantly shift the cutoff frequency.

    **(d)** Measurement steps:
    1. Set function generator to sine wave, 100 Hz, amplitude 1 Vpp
    2. Connect channel 1 probe to filter input, channel 2 probe to filter output
    3. Record input amplitude and output amplitude from oscilloscope
    4. Calculate \(|H| = V_{out}/V_{in}\) and convert to dB: \(|H|_{dB} = 20\log_{10}(V_{out}/V_{in})\)
    5. Read phase difference between CH1 and CH2 trigger cursors or use scope's built-in phase measurement
    6. Repeat for each test frequency: 100 Hz, 200 Hz, 500 Hz, 1 kHz, 2 kHz, 5 kHz, 10 kHz, 20 kHz, 50 kHz, 100 kHz
    7. Plot \(|H|_{dB}\) vs. log frequency and phase vs. log frequency

---

### Problem 4 — Debugging a Misbehaving Circuit

You build the circuit from Problem 3 (RC low-pass filter) but the measured output at 1 kHz is only 20% of the expected value instead of 70.7%.

**(a)** List at least four possible causes of this malfunction.

**(b)** Describe the first diagnostic step.

**(c)** You measure the supply voltage and it's correct. You then measure the voltage at the input node: it reads 1 V as expected. You measure across the capacitor: 0.2 V. You measure the voltage across the resistor: 0.8 V. What does this imply?

**(d)** How would you verify the actual capacitance value?

??? success "Solution"
    **(a)** Possible causes:
    1. Wrong capacitor value (e.g., 159 nF instead of 15.9 nF, shifting \(f_c\) to 100 Hz)
    2. Wrong resistor value (e.g., 100 kΩ instead of 10 kΩ, shifting \(f_c\) to 100 Hz)
    3. Capacitor installed backwards (for electrolytic capacitors, wrong polarity)
    4. Loose breadboard connection causing extra series resistance
    5. Breadboard parasitic capacitance in parallel, effectively increasing C
    6. Component damaged or counterfeit

    **(b)** First step: verify the power supply voltage and ground connections are correct. Then verify the input signal amplitude and frequency with the oscilloscope probed directly at the generator output (not at the filter input), confirming the source is producing the correct signal before the filter loads it.

    **(c)** With 0.8 V across R and 0.2 V across C at 1 kHz, the circuit is behaving like a filter with \(f_c\) much lower than 1 kHz. At the true cutoff frequency, R and C voltages are equal (both 0.707 Vin). Here \(|Z_C| << R\), indicating the capacitance is much larger than designed. The most likely cause is that the capacitor is 10× too large (159 nF instead of 15.9 nF), which would place \(f_c\) at about 100 Hz.

    **(d)** Measure the capacitance directly with the multimeter's capacitance mode, with the capacitor removed from the circuit (to avoid parallel paths). Alternatively, build a simple RC timing circuit: charge the capacitor through a known resistor and measure the time constant from the oscilloscope.

---

### Problem 5 — Oscilloscope Waveform Interpretation

An oscilloscope displays a waveform with the following settings:
- Time base: 1 ms/div
- Vertical sensitivity: 2 V/div
- The waveform appears as a sine wave spanning 4 vertical divisions peak-to-peak, completing 2.5 cycles across the 10 horizontal divisions.

**(a)** Calculate the peak-to-peak voltage and peak voltage.

**(b)** Calculate the period and frequency.

**(c)** Calculate the RMS voltage (assuming pure sinusoid).

**(d)** The waveform appears to have a small offset — the positive peak reads at 2.3 divisions from center and the negative peak at 1.7 divisions from center. What is the DC offset?

??? success "Solution"
    **(a)** Peak-to-peak voltage:

    \[V_{pp} = 4\text{ div} \times 2\text{ V/div} = 8\text{ V}\]
    \[V_m = V_{pp}/2 = 4\text{ V}\]

    **(b)** Period and frequency: 2.5 cycles occupy 10 divisions at 1 ms/div (total 10 ms):

    \[T = \frac{10\text{ ms}}{2.5\text{ cycles}} = 4\text{ ms}\]
    \[f = \frac{1}{T} = \frac{1}{4\times10^{-3}} = 250\text{ Hz}\]

    **(c)** RMS voltage:

    \[V_{rms} = \frac{V_m}{\sqrt{2}} = \frac{4}{\sqrt{2}} = 2.83\text{ V}\]

    **(d)** DC offset: the positive peak is at 2.3 div above center, negative peak at 1.7 div below center. If there were no offset, both would be equal (2 div each for a 4-div P-P signal). The asymmetry indicates:

    \[V_{DC} = \frac{V_{+peak} - |V_{-peak}|}{2} = \frac{(2.3 \times 2\text{ V}) - (1.7 \times 2\text{ V})}{2} = \frac{4.6 - 3.4}{2} = \frac{1.2}{2} = 0.6\text{ V}\]

    The signal has a +0.6 V DC offset.

</div>
