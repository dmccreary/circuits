---
title: Chapter 13 Glossary — Operational Amplifiers
description: Key terms and definitions for Chapter 13
---

<div class="unit1-styled" markdown>

# Chapter 13 Glossary

| Term | Definition |
|------|-----------|
| Operational amplifier | A high-gain DC-coupled differential amplifier IC, abbreviated as op-amp. The fundamental relationship is \(V_{out} = A(V_+ - V_-)\), where A is the open-loop gain (typically 100,000 to 1,000,000). When combined with negative feedback, the op-amp's behavior is determined entirely by the external feedback network. |
| Ideal op-amp | A simplified model with three ideal properties: infinite open-loop gain (\(A \to \infty\)), infinite input impedance (\(Z_{in} \to \infty\)), and zero output impedance (\(Z_{out} \to 0\)). With negative feedback, these properties produce the two golden rules: virtual short and no input current. The ideal model is accurate for most audio-frequency designs. |
| Open-loop gain | The gain of the op-amp without any feedback: \(A = V_{out}/(V_+ - V_-)\). Typically 100 dB (100,000×) to 120 dB (1,000,000×) at DC, decreasing with frequency. So large that any input imbalance drives the output to the supply rail — this enormous gain is the raw material that negative feedback tames into precise amplification. |
| Closed-loop gain | The actual gain of an op-amp circuit with negative feedback applied, determined by the external resistor network. For an inverting amplifier: \(A_{CL} = -R_f/R_1\). For a non-inverting amplifier: \(A_{CL} = 1 + R_f/R_1\). Independent of the open-loop gain, making circuits repeatable and stable. |
| Negative feedback | A configuration where a fraction of the output signal is fed back to the inverting input (−) of the op-amp. This reduces the effective gain but makes the circuit stable, accurate, and predictable. Negative feedback is the mechanism that gives op-amps their utility: it forces \(V_+ \approx V_-\) (virtual short), making the circuit depend only on external passive components. |
| Virtual short | One of the two golden rules of ideal op-amp analysis: with negative feedback, the op-amp adjusts its output to force the inverting input voltage to equal the non-inverting input voltage: \(V_- = V_+\). This is not a real short circuit — no current flows between the terminals — but the voltages are forced equal by the feedback action. |
| Virtual ground | A special case of the virtual short where the non-inverting input is at 0 V (ground). The feedback forces the inverting input to also be at 0 V. Current flowing into the summing node at the inverting input must all flow through the feedback resistor, because no current enters the ideal op-amp terminal. |
| Inverting amplifier | A fundamental op-amp configuration with input through \(R_1\) and feedback through \(R_f\), with the non-inverting input at ground. Closed-loop gain: \(A_{CL} = -R_f/R_1\). The negative sign indicates phase inversion. Input impedance is \(R_1\). Versatile and commonly used in audio signal processing. |
| Non-inverting amplifier | A fundamental op-amp configuration where the signal is applied to the non-inverting (+) input and the feedback network connects between output and inverting input. Closed-loop gain: \(A_{CL} = 1 + R_f/R_1\). Very high input impedance (approaching the op-amp's differential input impedance). No phase inversion. |
| Voltage follower | A non-inverting amplifier with 100% feedback (\(R_f = 0\), \(R_1 = \infty\)). Gain = 1 (unity). Output equals input in amplitude and phase. Has very high input impedance and very low output impedance, making it ideal for impedance matching — connecting a high-impedance source to a low-impedance load without signal loss. |
| Summing amplifier | An inverting amplifier with multiple input resistors connecting to the summing node at the inverting input. Output: \(V_{out} = -R_f(V_1/R_1 + V_2/R_2 + \cdots)\). If all resistors are equal: \(V_{out} = -(V_1 + V_2 + \cdots)\). Used in audio mixers to combine multiple signals. |
| Difference amplifier | A four-resistor op-amp circuit that amplifies the difference between two input signals while rejecting common-mode signals. With matched resistors: \(V_{out} = (R_f/R_1)(V_2 - V_1)\). Used for differential signal amplification and common-mode interference rejection. |
| Gain-bandwidth product | A constant for a given op-amp: \(\text{GBW} = A_{OL} \times f\). As closed-loop gain increases, bandwidth decreases proportionally. For a 741 op-amp with GBW = 1 MHz, a closed-loop gain of 100 limits bandwidth to 10 kHz. Higher-speed op-amps have GBW of hundreds of MHz to GHz. |
| Slew rate | The maximum rate at which the op-amp output can change, in V/μs. Limited by the internal compensation capacitor charging current. If the input signal requires a faster output change than the slew rate allows, the output is distorted. For a 741: SR ≈ 0.5 V/μs. Modern op-amps: 10–1000 V/μs. |
| CMRR | Common Mode Rejection Ratio — the ratio of the differential gain to the common-mode gain, expressed in dB. \(\text{CMRR} = 20\log_{10}(A_{diff}/A_{cm})\). Ideal op-amp has infinite CMRR; real op-amps have 60–100+ dB. Higher CMRR means better rejection of noise that appears equally on both inputs. |

</div>
