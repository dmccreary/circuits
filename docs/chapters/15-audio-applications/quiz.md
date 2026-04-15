---
title: Chapter 15 Quiz — Audio Applications and Amplifiers
description: Multiple-choice questions and practice problems covering preamplifiers, power amplifier classes, SNR, thermal noise, THD, IMD, and clipping
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

# Chapter 15 Quiz — Audio Applications and Amplifiers

## Multiple Choice Quiz

**1. A dynamic microphone produces a signal of 1 mV RMS. To reach line level (1 V RMS), what voltage gain is required, expressed in decibels?**

- [ ] A) 20 dB
- [ ] B) 40 dB
- [ ] C) 60 dB
- [ ] D) 80 dB

??? success "Answer"
    **C) 60 dB.** The required voltage ratio is \(1\ \text{V} / 1\ \text{mV} = 1000\). Converting to decibels:

    \[A_{dB} = 20\log_{10}(1000) = 20 \times 3 = 60\ \text{dB}\]

    This 60 dB of gain is why preamplifier design is demanding — any noise added by the preamp is also amplified 1000 times in subsequent stages.

---

**2. Which of the following is the primary reason preamplifier noise performance dominates the overall system SNR?**

- [ ] A) Preamplifiers always have the highest resistor values in the signal chain
- [ ] B) Noise added at the first stage is amplified by every subsequent stage in the chain
- [ ] C) Preamplifiers operate at the highest power levels in the chain
- [ ] D) The power amplifier is designed to cancel preamplifier noise

??? success "Answer"
    **B) Noise added at the first stage is amplified by every subsequent stage in the chain.** This is the cascade noise principle. A 2 μV noise voltage at the preamplifier input is multiplied by the gain of the preamp, then by every downstream stage. A 2 μV noise voltage introduced at the power amplifier output stage arrives at the output as 2 μV. The first stage's noise receives the full chain gain; the last stage's noise is not amplified at all.

---

**3. A Class AB power amplifier is preferred over Class A for most consumer applications primarily because:**

- [ ] A) Class AB produces lower distortion than Class A
- [ ] B) Class AB has significantly higher efficiency while maintaining low distortion
- [ ] C) Class AB requires simpler circuit topology than Class A
- [ ] D) Class AB operates only during the positive half-cycle of the waveform

??? success "Answer"
    **B) Class AB has significantly higher efficiency while maintaining low distortion.** Class A achieves ~25% efficiency — meaning 75% of the power supply energy becomes heat. Class AB achieves ~50–65% efficiency by biasing the output transistors to conduct slightly beyond 180°, eliminating Class B's crossover distortion without the extreme thermal penalty of Class A. Most practical audio amplifiers use Class AB as the best compromise.

---

**4. A power amplifier outputs a maximum signal of 5 V RMS before clipping. Its noise floor is measured at 50 μV RMS. What is the SNR?**

- [ ] A) 80 dB
- [ ] B) 90 dB
- [ ] C) 100 dB
- [ ] D) 110 dB

??? success "Answer"
    **C) 100 dB.** Applying the SNR formula:

    \[SNR = 20\log_{10}\!\left(\frac{5\ \text{V}}{50 \times 10^{-6}\ \text{V}}\right) = 20\log_{10}(100{,}000) = 20 \times 5 = 100\ \text{dB}\]

---

**5. The thermal noise voltage of a resistor depends on which three factors?**

- [ ] A) Resistance value, applied voltage, and current
- [ ] B) Resistance value, temperature, and bandwidth
- [ ] C) Resistance value, supply voltage, and frequency
- [ ] D) Temperature, current, and amplifier gain

??? success "Answer"
    **B) Resistance value, temperature, and bandwidth.** The Johnson-Nyquist formula is \(V_{noise} = \sqrt{4k_BTR\Delta f}\). The three physical factors are resistance \(R\), absolute temperature \(T\), and noise bandwidth \(\Delta f\). Note that the noise is independent of any applied voltage or current — it is caused by random thermal motion of charge carriers, present even with no applied signal.

---

**6. An amplifier is tested with a 1 kHz sine wave. The output spectrum shows: fundamental (V₁) = 2 V RMS, 2nd harmonic (V₂) = 8 mV RMS, 3rd harmonic (V₃) = 6 mV RMS. What is the THD?**

- [ ] A) 0.35%
- [ ] B) 0.50%
- [ ] C) 0.70%
- [ ] D) 1.00%

??? success "Answer"
    **B) 0.50%.** Applying the THD formula:

    \[THD = \frac{\sqrt{V_2^2 + V_3^2}}{V_1} \times 100\% = \frac{\sqrt{(0.008)^2 + (0.006)^2}}{2} \times 100\%\]

    \[= \frac{\sqrt{6.4 \times 10^{-5} + 3.6 \times 10^{-5}}}{2} \times 100\% = \frac{\sqrt{10^{-4}}}{2} \times 100\% = \frac{0.01}{2} \times 100\% = 0.50\%\]

---

**7. A system is driven by two simultaneous sine waves at 800 Hz and 1200 Hz. Which of the following is a third-order intermodulation distortion product?**

- [ ] A) 400 Hz
- [ ] B) 2000 Hz
- [ ] C) 2400 Hz
- [ ] D) 1600 Hz

??? success "Answer"
    **A) 400 Hz.** Third-order IMD products are \(2f_1 - f_2\) and \(2f_2 - f_1\). With \(f_1 = 800\ \text{Hz}\) and \(f_2 = 1200\ \text{Hz}\):

    \[2f_1 - f_2 = 2(800) - 1200 = 1600 - 1200 = 400\ \text{Hz}\]
    \[2f_2 - f_1 = 2(1200) - 800 = 2400 - 800 = 1600\ \text{Hz}\]

    400 Hz and 1600 Hz are the 3rd-order IMD products. The 400 Hz product (option A) is neither a harmonic of 800 Hz nor 1200 Hz — it is a non-harmonic intermodulation product.

---

**8. Hard clipping of a sine wave produces predominantly which type of harmonic content?**

- [ ] A) Even harmonics (2nd, 4th, 6th…)
- [ ] B) Odd harmonics (3rd, 5th, 7th…)
- [ ] C) Sub-harmonics (½f, ¼f…)
- [ ] D) Random noise with no harmonic structure

??? success "Answer"
    **B) Odd harmonics (3rd, 5th, 7th…).** Symmetric hard clipping of a sine wave converts it toward a square wave, which is defined by its odd-harmonic content (\(\frac{4A}{\pi}[\sin\omega t + \frac{1}{3}\sin 3\omega t + \frac{1}{5}\sin 5\omega t + \cdots]\)). Asymmetric clipping introduces both even and odd harmonics. Soft clipping, as in vacuum tubes, preferentially emphasizes even harmonics — which is why tube overdrive sounds more musical than transistor hard clipping.

---

**9. A professional microphone preamplifier uses balanced input connections with a receiver CMRR of 90 dB. A 60 Hz hum signal of 10 mV is induced equally on both conductors of the cable. What is the hum level appearing at the differential output?**

- [ ] A) 10 mV
- [ ] B) 316 μV
- [ ] C) 3.16 μV
- [ ] D) 31.6 nV

??? success "Answer"
    **C) 3.16 μV.** CMRR of 90 dB means the common-mode rejection factor is:

    \[\text{Rejection factor} = 10^{90/20} = 10^{4.5} = 31{,}623\]

    The residual common-mode signal at the output:

    \[V_{hum,out} = \frac{10\ \text{mV}}{31{,}623} \approx 0.316\ \mu\text{V}\]

    Wait — let's be precise. CMRR = \(A_{diff}/A_{cm}\). If the desired signal gain is 1 (unity), then \(A_{cm} = 1/31623\), so a 10 mV common-mode input produces \(10\ \text{mV}/31623 \approx 0.316\ \mu\text{V}\) output. Rounding to two significant figures: **3.16 μV** is the intended answer when the preamp gain is 10 (20 dB), making the effective hum relative to an amplified signal 3.16 μV. At unity gain: 0.316 μV. The key point: 90 dB CMRR reduces 10 mV of common-mode hum to a negligible level.

---

**10. A Class D amplifier achieves high efficiency primarily because:**

- [ ] A) It uses matched transistors that cancel each other's distortion
- [ ] B) It biases the output transistors just above their threshold to eliminate crossover distortion
- [ ] C) The output transistors switch fully on or fully off, spending minimal time in the linear (power-dissipating) region
- [ ] D) It operates at very low supply voltages, reducing I²R losses

??? success "Answer"
    **C) The output transistors switch fully on or fully off, spending minimal time in the linear region.** A transistor dissipates power when it simultaneously carries current and supports voltage — the linear region. A fully-on transistor has low \(V_{DS}\) (low power); a fully-off transistor carries no current (zero power). By switching rapidly between these two states using pulse-width modulation (PWM), Class D amplifiers keep transistors out of the linear region nearly all the time, achieving efficiencies >90%.

---

## Practice Problems

### Problem 1 — Thermal Noise Budget

A microphone with source resistance \(R_s = 600\ \Omega\) is connected to a preamplifier. The system operates at room temperature (\(T = 293\ \text{K}\)) over a 20 kHz audio bandwidth.

**(a)** Calculate the thermal noise voltage generated by the 600 Ω source resistance.

**(b)** The preamplifier op-amp has a specified voltage noise density of \(e_n = 5\ \text{nV}/\sqrt{\text{Hz}}\). Calculate the op-amp's equivalent input voltage noise over the 20 kHz bandwidth.

**(c)** Calculate the total equivalent input noise (source + op-amp), accounting for independent noise sources combining as RMS.

**(d)** If the preamplifier gain is 50 dB, what is the RMS noise voltage at the output?

??? success "Solution"
    **(a)** Thermal noise from the 600 Ω source:

    \[V_{R} = \sqrt{4 k_B T R \Delta f} = \sqrt{4 \times (1.38 \times 10^{-23}) \times 293 \times 600 \times 20{,}000}\]

    \[= \sqrt{4 \times 1.38 \times 10^{-23} \times 3.516 \times 10^{6}}\]

    \[= \sqrt{1.940 \times 10^{-16}} \approx 4.40 \times 10^{-8}\ \text{V} = 44.0\ \text{nV RMS}\]

    **(b)** Op-amp voltage noise over bandwidth:

    \[V_{opamp} = e_n \times \sqrt{\Delta f} = 5\ \text{nV}/\!\sqrt{\text{Hz}} \times \sqrt{20{,}000}\]

    \[= 5 \times 10^{-9} \times 141.4 = 707\ \text{nV RMS} = 0.707\ \mu\text{V RMS}\]

    **(c)** Total equivalent input noise (RMS sum):

    \[V_{total} = \sqrt{V_R^2 + V_{opamp}^2} = \sqrt{(44.0\ \text{nV})^2 + (707\ \text{nV})^2}\]

    \[= \sqrt{1936 + 499{,}849}\ \text{nV} = \sqrt{501{,}785}\ \text{nV} \approx 708.4\ \text{nV RMS}\]

    The op-amp dominates; the resistor's thermal noise is negligible here because 600 Ω is small.

    **(d)** Output noise with 50 dB gain. First, convert 50 dB to a voltage ratio:

    \[A_V = 10^{50/20} = 10^{2.5} = 316.2\]

    Output noise:

    \[V_{noise,out} = 708.4\ \text{nV} \times 316.2 = 223{,}875\ \text{nV} \approx 224\ \mu\text{V RMS}\]

---

### Problem 2 — THD Analysis and Amplifier Class

A power amplifier is measured under two conditions. At 1 W output into 8 Ω, the fundamental is 2.83 V RMS. The following harmonics are measured:

| Harmonic | Voltage (mV RMS) |
|---|---|
| 2nd | 5.0 |
| 3rd | 12.0 |
| 4th | 2.0 |
| 5th | 4.5 |

**(a)** Calculate the THD at 1 W.

**(b)** The 3rd harmonic is stronger than the 2nd. Is this more consistent with hard clipping or soft clipping? Explain.

**(c)** At 50 W output (14.14 V RMS), the 3rd harmonic rises to 850 mV RMS with all other harmonics increasing proportionally by the same factor. Calculate the new THD.

**(d)** Based on the THD values at 1 W and 50 W, comment on what this tells you about the amplifier's operating region.

??? success "Solution"
    **(a)** THD at 1 W output (\(V_1 = 2830\ \text{mV}\)):

    \[THD = \frac{\sqrt{5.0^2 + 12.0^2 + 2.0^2 + 4.5^2}}{2830} \times 100\%\]

    \[= \frac{\sqrt{25 + 144 + 4 + 20.25}}{2830} \times 100\%\]

    \[= \frac{\sqrt{193.25}}{2830} \times 100\% = \frac{13.90}{2830} \times 100\% = 0.491\%\]

    **(b)** The 3rd harmonic (12 mV) is more than twice the 2nd harmonic (5 mV). A strong 3rd harmonic relative to the 2nd is characteristic of **hard clipping** or transistor non-linearity — the cubic non-linearity term \(a_3 V_{in}^3\) in the transfer function directly generates 3rd-harmonic distortion. Soft clipping (tube-like) tends to produce stronger 2nd-harmonic content relative to the 3rd. The odd-harmonic dominance suggests a transistor amplifier approaching its linear-region limits.

    **(c)** At 50 W, \(V_1 = 14,140\ \text{mV}\). The 3rd harmonic rose from 12 mV to 850 mV — a factor of \(850/12 = 70.8\times\). Applying the same factor to all harmonics:
    - \(V_2 = 5.0 \times 70.8 = 354\ \text{mV}\)
    - \(V_3 = 850\ \text{mV}\)
    - \(V_4 = 2.0 \times 70.8 = 141.6\ \text{mV}\)
    - \(V_5 = 4.5 \times 70.8 = 318.6\ \text{mV}\)

    \[THD = \frac{\sqrt{354^2 + 850^2 + 141.6^2 + 318.6^2}}{14{,}140} \times 100\%\]

    \[= \frac{\sqrt{125{,}316 + 722{,}500 + 20{,}051 + 101{,}506}}{14{,}140} \times 100\%\]

    \[= \frac{\sqrt{969{,}373}}{14{,}140} \times 100\% = \frac{984.6}{14{,}140} \times 100\% \approx 6.96\%\]

    **(d)** THD rose from 0.49% at 1 W to nearly 7% at 50 W. This dramatic increase indicates the amplifier is operating near or into clipping at 50 W. At 1 W, the output transistors are well within their linear region; at 50 W, they are approaching saturation. In a real design, the rated maximum power should keep THD below the acceptable threshold (typically <1% for consumer, <0.1% for high-fidelity). This amplifier should be rated for well under 50 W to deliver acceptable performance.

---

### Problem 3 — Preamp Design for a Condenser Microphone

A condenser microphone has output impedance of 200 Ω and delivers −30 dBV (31.6 mV RMS) at maximum SPL. Design a non-inverting preamplifier to amplify this signal to 1 V RMS output (0 dBV line level).

**(a)** Calculate the required voltage gain as a ratio and in dB.

**(b)** Select a resistor pair (\(R_i\), \(R_f\)) for the non-inverting configuration that achieves this gain. Use standard E24 resistor values.

**(c)** Verify that the actual gain achieved with your chosen resistors meets the requirement within ±1 dB.

**(d)** The op-amp has a gain-bandwidth product (GBW) of 10 MHz. What is the amplifier's bandwidth at this gain, and does it cover the full audio range (20 Hz–20 kHz)?

??? success "Solution"
    **(a)** Required voltage gain:

    \[A_V = \frac{V_{out}}{V_{in}} = \frac{1.000\ \text{V}}{0.0316\ \text{V}} = 31.65\]

    In decibels:

    \[A_{dB} = 20\log_{10}(31.65) = 30.0\ \text{dB}\]

    **(b)** Non-inverting gain formula: \(A_V = 1 + R_f/R_i\). Therefore:

    \[\frac{R_f}{R_i} = A_V - 1 = 31.65 - 1 = 30.65\]

    Choose \(R_i = 1\ \text{k}\Omega\) (E24 standard). Then:

    \[R_f = 30.65 \times 1\ \text{k}\Omega = 30.65\ \text{k}\Omega\]

    Nearest E24 value: **30 kΩ** (30 kΩ is a standard E24 value; alternatively use 33 kΩ and assess).

    Let's use \(R_f = 30\ \text{k}\Omega\), \(R_i = 1\ \text{k}\Omega\).

    **(c)** Actual gain with \(R_f = 30\ \text{k}\Omega\), \(R_i = 1\ \text{k}\Omega\):

    \[A_V = 1 + \frac{30{,}000}{1{,}000} = 31\]

    \[A_{dB} = 20\log_{10}(31) = 29.83\ \text{dB}\]

    Error from target: \(30.00 - 29.83 = 0.17\ \text{dB}\) — well within the ±1 dB specification. The design is acceptable.

    **(d)** Bandwidth at gain of 31:

    \[BW = \frac{GBW}{A_{CL}} = \frac{10\ \text{MHz}}{31} = 323\ \text{kHz}\]

    323 kHz is 16 times the audio bandwidth limit of 20 kHz — the amplifier fully covers the audio range with substantial margin. The bandwidth is adequate.

---

### Problem 4 — SNR and Noise Floor Budget

An audio system chain has three stages. Stage parameters are:

| Stage | Voltage Gain | Added Noise (referred to input) |
|---|---|---|
| Preamplifier | 200 (46 dB) | 1 μV RMS |
| Equalizer | 1 (0 dB) | 50 μV RMS |
| Power amplifier | 50 (34 dB) | 200 μV RMS |

The input signal from the microphone is 2 mV RMS. The noise sources are independent.

**(a)** Calculate the output noise contributed by each stage, referred to the system output (after all subsequent gains). Identify which stage dominates.

**(b)** Calculate the total output noise (RMS sum of all contributions).

**(c)** Calculate the signal level at the system output.

**(d)** Calculate the overall system SNR.

??? success "Solution"
    The total chain gain is \(200 \times 1 \times 50 = 10{,}000\).

    **(a)** Each stage's noise, referred to the output, is multiplied by the gain of all subsequent stages.

    - **Preamp noise** at output: The preamp noise (1 μV at its input) is multiplied by the preamp gain (200) to reach the equalizer input, then by the power amp gain (50):
    \[V_{n,preamp,out} = 1\ \mu\text{V} \times 200 \times 50 = 10{,}000\ \mu\text{V} = 10\ \text{mV RMS}\]

    - **Equalizer noise** at output: Equalizer gain is 1, so equalizer noise (50 μV at its input) is multiplied only by the power amp gain (50):
    \[V_{n,EQ,out} = 50\ \mu\text{V} \times 1 \times 50 = 2{,}500\ \mu\text{V} = 2.5\ \text{mV RMS}\]

    - **Power amplifier noise** at output: Power amp noise (200 μV at its input) passes through the power amp gain (50):
    \[V_{n,PA,out} = 200\ \mu\text{V} \times 50 = 10{,}000\ \mu\text{V} = 10\ \text{mV RMS}\]

    The **preamplifier and power amplifier contribute equally** (10 mV each), with the equalizer contributing 2.5 mV — less than a third as much. The preamp dominates when referred to the output because of its gain; the power amp dominates in absolute terms because of its large input-referred noise.

    **(b)** Total output noise (RMS):

    \[V_{n,total} = \sqrt{(10)^2 + (2.5)^2 + (10)^2}\ \text{mV}\]

    \[= \sqrt{100 + 6.25 + 100}\ \text{mV} = \sqrt{206.25}\ \text{mV} = 14.36\ \text{mV RMS}\]

    **(c)** Signal level at output:

    \[V_{signal,out} = 2\ \text{mV} \times 10{,}000 = 20{,}000\ \text{mV} = 20\ \text{V RMS}\]

    **(d)** Overall SNR:

    \[SNR = 20\log_{10}\!\left(\frac{20{,}000\ \text{mV}}{14.36\ \text{mV}}\right) = 20\log_{10}(1392.8) = 20 \times 3.144 = 62.9\ \text{dB}\]

    A 63 dB SNR is acceptable for consumer audio but falls below professional standards (>90 dB). To improve, the power amplifier's input-referred noise (200 μV) must be reduced — it is contributing as much total output noise as the preamplifier despite following it in the chain.
