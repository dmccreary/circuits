---
title: Chapter 13 Practice Problems — Operational Amplifiers
description: Practice problems with solutions for Chapter 13 covering op-amp configurations, golden rules, and practical limitations
---

<div class="unit1-styled" markdown>

# Chapter 13 Practice Problems

## Practice Problems

### Problem 1 — Inverting Amplifier

An inverting amplifier has \(R_1 = 10\text{ kΩ}\) and \(R_f = 47\text{ kΩ}\). The supply voltage is ±15 V.

**(a)** Calculate the closed-loop voltage gain.

**(b)** An input signal of 0.5 V is applied. Calculate the output voltage.

**(c)** What is the maximum undistorted output amplitude? (Output saturates at approximately ±13 V for a ±15 V supply.)

**(d)** What is the input impedance of this circuit?

??? success "Solution"
    **(a)** Closed-loop gain of inverting amplifier:

    \[A_{CL} = -\frac{R_f}{R_1} = -\frac{47}{10} = -4.7\]

    The gain is −4.7 (magnitude 4.7, with phase inversion).

    **(b)** Output voltage:

    \[V_{out} = A_{CL} \times V_{in} = -4.7 \times 0.5 = -2.35\text{ V}\]

    **(c)** With saturation at ±13 V, maximum input is \(|V_{in,max}| = 13/4.7 = 2.77\text{ V}\). For signals larger than 2.77 V, the output clips at ±13 V.

    **(d)** Input impedance of an inverting amplifier equals \(R_1\):

    \[Z_{in} = R_1 = 10\text{ kΩ}\]

---

### Problem 2 — Non-Inverting Amplifier Design

Design a non-inverting amplifier with a closed-loop gain of exactly +11.

**(a)** Using \(R_1 = 10\text{ kΩ}\), find the required \(R_f\).

**(b)** Verify: confirm the gain formula gives +11.

**(c)** An op-amp has a gain-bandwidth product (GBW) of 1 MHz. What is the bandwidth of this amplifier?

**(d)** What happens to the circuit if \(R_f\) is reduced to zero?

??? success "Solution"
    **(a)** Non-inverting gain formula: \(A_{CL} = 1 + R_f/R_1\). Solving for \(R_f\):

    \[11 = 1 + \frac{R_f}{10\text{ kΩ}} \Rightarrow R_f = 10 \times 10\text{ kΩ} = 100\text{ kΩ}\]

    **(b)** Verify: \(A_{CL} = 1 + 100/10 = 1 + 10 = 11\) ✓

    **(c)** Bandwidth from GBW product:

    \[\text{BW} = \frac{\text{GBW}}{A_{CL}} = \frac{1\text{ MHz}}{11} = 90.9\text{ kHz}\]

    **(d)** With \(R_f = 0\): \(A_{CL} = 1 + 0/R_1 = 1\). The circuit becomes a **voltage follower** (unity gain buffer) with maximum bandwidth = GBW = 1 MHz.

---

### Problem 3 — Summing Amplifier (Audio Mixer)

An op-amp summing amplifier has three inputs: \(R_1 = R_2 = R_3 = 10\text{ kΩ}\) and \(R_f = 20\text{ kΩ}\).

**(a)** Write the output voltage equation.

**(b)** Three signals are applied: \(V_1 = 0.5\text{ V}\), \(V_2 = -0.3\text{ V}\), \(V_3 = 0.8\text{ V}\). Calculate \(V_{out}\).

**(c)** To change the gain of the V2 input to −4 (while keeping other gains at −2), what should \(R_2\) be changed to?

??? success "Solution"
    **(a)** Summing amplifier output:

    \[V_{out} = -R_f\left(\frac{V_1}{R_1} + \frac{V_2}{R_2} + \frac{V_3}{R_3}\right) = -20\left(\frac{V_1}{10} + \frac{V_2}{10} + \frac{V_3}{10}\right) = -2(V_1 + V_2 + V_3)\]

    Each input has gain magnitude \(R_f/R_i = 20/10 = 2\).

    **(b)** With given values:

    \[V_{out} = -2(0.5 + (-0.3) + 0.8) = -2(1.0) = -2.0\text{ V}\]

    **(c)** For gain \(-R_f/R_2 = -4\): \(R_2 = R_f/4 = 20\text{ kΩ}/4 = 5\text{ kΩ}\).

---

### Problem 4 — Op-Amp Bandwidth and Slew Rate

An op-amp has GBW = 10 MHz and slew rate SR = 5 V/μs. It is configured as an inverting amplifier with gain = −20.

**(a)** Calculate the −3 dB bandwidth of this configuration.

**(b)** What is the maximum frequency at which a 2 V peak output signal can be reproduced without slew-rate distortion?

**(c)** An input signal \(v_{in} = 0.1\sin(2\pi \times 500{,}000 t)\text{ V}\) is applied. Does slew-rate limiting occur?

??? success "Solution"
    **(a)** Bandwidth:

    \[\text{BW} = \frac{\text{GBW}}{|A_{CL}|} = \frac{10\text{ MHz}}{20} = 500\text{ kHz}\]

    **(b)** The output must slew at rate \(dV/dt|_{max} = \omega V_m = 2\pi f \times V_m\). Maximum frequency before slew limiting:

    \[f_{max} = \frac{\text{SR}}{2\pi V_m} = \frac{5 \times 10^6}{2\pi \times 2} = \frac{5\times10^6}{12.57} = 397.9\text{ kHz}\]

    **(c)** The output signal would be \(v_{out} = -20 \times 0.1\sin(\cdots) = -2\sin(2\pi \times 500{,}000 t)\). Required slew rate: \(2\pi \times 500{,}000 \times 2 = 6.28\text{ MV/s} = 6.28\text{ V/μs}\). This **exceeds** the SR of 5 V/μs, so slew-rate distortion will occur. The output will be a triangular wave rather than a sinusoid.

---

### Problem 5 — Difference Amplifier

A difference amplifier has four equal resistors: \(R_1 = R_2 = R_3 = R_4 = 10\text{ kΩ}\).

**(a)** Write the output voltage equation.

**(b)** The two inputs are \(V_1 = 5.02\text{ V}\) and \(V_2 = 4.98\text{ V}\) (a small differential signal on a large common-mode voltage). Calculate \(V_{out}\).

**(c)** If the resistors are not perfectly matched — say \(R_4 = 10.1\text{ kΩ}\) while all others remain 10 kΩ — what output error appears for a pure common-mode signal of 5 V?

??? success "Solution"
    **(a)** With matched resistors (\(R_1 = R_2 = R_3 = R_4 = R\)):

    \[V_{out} = \frac{R_f}{R_1}(V_2 - V_1)\]

    Here \(R_f/R_1 = 10/10 = 1\), so \(V_{out} = V_2 - V_1\).

    **(b)** Differential signal:

    \[V_{out} = V_2 - V_1 = 4.98 - 5.02 = -0.04\text{ V} = -40\text{ mV}\]

    The 5 V common-mode component is completely rejected. Only the 40 mV difference appears at the output.

    **(c)** With \(R_4 = 10.1\text{ kΩ}\), the non-inverting path gain becomes \(R_4/(R_3+R_4) = 10.1/20.1 = 0.5025\) instead of ideal 0.5. For \(V_1 = V_2 = 5\text{ V}\) (pure common mode):

    \[V_{out,error} \approx 5 \times \frac{\Delta R_4}{R} = 5 \times \frac{0.1}{10} = 50\text{ mV}\]

    A 1% resistor mismatch causes 50 mV error — illustrating why instrumentation amplifiers use precision matched resistors or IC implementations.

</div>
