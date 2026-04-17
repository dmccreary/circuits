---
title: Chapter 15 Practice Problems — Audio Applications and Amplifiers
description: Practice problems with solutions for Chapter 15 covering audio signal chains, SNR, noise, THD, and amplifier classes
---

<div class="unit1-styled" markdown>

# Chapter 15 Practice Problems

## Practice Problems

### Problem 1 — Audio Signal Chain Gain

A microphone produces −60 dBV. The signal passes through three stages: a preamplifier (+50 dB gain), a tone control stage (−2 dB insertion loss), and a power amplifier stage (+20 dB voltage gain).

**(a)** Calculate the signal level in dBV at the output of each stage.

**(b)** Calculate the final output voltage in volts (RMS).

**(c)** Convert the final output level to dBu.

**(d)** The system clips at +18 dBV. How much headroom exists above the nominal output?

??? success "Solution"
    **(a)** Signal levels at each stage:

    - After preamp: \(-60 + 50 = -10\text{ dBV}\) (line level, approximately 316 mV)
    - After tone control: \(-10 + (-2) = -12\text{ dBV}\)
    - After power amp stage: \(-12 + 20 = +8\text{ dBV}\)

    **(b)** Final output voltage:

    \[V_{out} = 10^{8/20} = 10^{0.4} = 2.51\text{ V RMS}\]

    **(c)** Convert to dBu: \(\text{dBu} = \text{dBV} + 2.218 = 8 + 2.218 = 10.22\text{ dBu}\)

    **(d)** Headroom above nominal output:

    \[\text{Headroom} = 18 - 8 = 10\text{ dB}\]

---

### Problem 2 — Thermal Noise Calculation

A microphone preamplifier has an input resistor of 1 kΩ at room temperature (T = 293 K), and operates over a 20 kHz audio bandwidth.

**(a)** Calculate the RMS thermal noise voltage from the input resistor.

**(b)** The preamp has 40 dB gain. What is this noise voltage referred to the output?

**(c)** If the signal at the preamp input is 1 mV (RMS), calculate the SNR at the output.

**(d)** If the preamp itself adds 2 μV of equivalent input noise, what is the total input-referred noise?

??? success "Solution"
    **(a)** Thermal noise: \(V_n = \sqrt{4kTRB}\)

    \[V_n = \sqrt{4 \times 1.38\times10^{-23} \times 293 \times 1000 \times 20{,}000}\]
    \[= \sqrt{4 \times 1.38\times10^{-23} \times 293 \times 2\times10^7}\]
    \[= \sqrt{3.234\times10^{-13}} = 5.69\times10^{-7}\text{ V} = 0.569\text{ μV RMS}\]

    **(b)** After 40 dB gain (voltage ratio = 100):

    \[V_{n,out} = 100 \times 0.569\text{ μV} = 56.9\text{ μV RMS}\]

    **(c)** Input signal = 1 mV = 1000 μV. Input noise = 0.569 μV. SNR at output (same as input, since gain applies to both equally):

    \[\text{SNR} = 20\log_{10}\left(\frac{1000}{0.569}\right) = 20\log_{10}(1757) = 64.9\text{ dB}\]

    **(d)** Total input-referred noise (sum in quadrature since uncorrelated):

    \[V_{n,total} = \sqrt{(0.569)^2 + (2)^2} = \sqrt{0.324 + 4} = \sqrt{4.324} = 2.08\text{ μV}\]

    The amplifier's own noise dominates over the resistor thermal noise.

---

### Problem 3 — Total Harmonic Distortion

An audio amplifier outputs a 1 kHz sine wave with amplitude 1 V (fundamental). Measurement shows the following harmonic content:

| Harmonic | Frequency | Amplitude |
|----------|-----------|-----------|
| 2nd | 2 kHz | 25 mV |
| 3rd | 3 kHz | 12 mV |
| 4th | 4 kHz | 5 mV |
| 5th | 5 kHz | 3 mV |

**(a)** Calculate the THD percentage.

**(b)** Express the THD in dB below the fundamental.

**(c)** Is this amplifier suitable for high-fidelity audio (THD < 0.1%)?

**(d)** The 3rd harmonic is particularly objectionable in audio. Why?

??? success "Solution"
    **(a)** THD calculation:

    \[\text{THD} = \frac{\sqrt{V_2^2 + V_3^2 + V_4^2 + V_5^2}}{V_1} \times 100\%\]
    \[= \frac{\sqrt{25^2 + 12^2 + 5^2 + 3^2}}{1000}\text{ mV/mV} \times 100\%\]
    \[= \frac{\sqrt{625 + 144 + 25 + 9}}{1000} \times 100\% = \frac{\sqrt{803}}{1000} \times 100\% = \frac{28.3}{1000} \times 100\% = 2.83\%\]

    **(b)** THD in dB: \(20\log_{10}(0.0283) = 20 \times (-1.548) = -30.9\text{ dB}\) below the fundamental.

    **(c)** 2.83% THD far exceeds the 0.1% threshold for high-fidelity audio. This amplifier would produce audibly colored, distorted sound and is not suitable for high-fidelity applications.

    **(d)** The 3rd harmonic (at 3× the fundamental) falls on the musical interval of an octave-plus-fifth above the fundamental. While some harmonic distortion can be masked or even preferred (even harmonics in vacuum tube amps), odd harmonics (3rd, 5th) create musically dissonant intervals that clash with the original signal, producing a harsh, buzzy character.

---

### Problem 4 — Amplifier Efficiency

A Class A audio amplifier delivers 10 W to a speaker load. The DC power supply provides 100 W to the amplifier.

**(a)** Calculate the efficiency of the Class A amplifier.

**(b)** A Class AB amplifier delivering the same 10 W uses 16.7 W from the supply. Calculate its efficiency.

**(c)** How much power is dissipated as heat in each amplifier?

**(d)** Why is Class A amplifier efficiency always less than 25%?

??? success "Solution"
    **(a)** Class A efficiency:

    \[\eta_A = \frac{P_{out}}{P_{in}} \times 100\% = \frac{10}{100} \times 100\% = 10\%\]

    **(b)** Class AB efficiency:

    \[\eta_{AB} = \frac{10}{16.7} \times 100\% = 59.9\% \approx 60\%\]

    **(c)** Heat dissipated:

    - Class A: \(P_{heat} = 100 - 10 = 90\text{ W}\) (nine times the signal power!)
    - Class AB: \(P_{heat} = 16.7 - 10 = 6.7\text{ W}\)

    **(d)** In Class A, the output transistors are biased to conduct continuously at maximum rated current, regardless of signal level. This maintains a constant power draw from the supply equal to \(V_{supply} \times I_{bias}\). The maximum efficiency with sinusoidal output is limited to \(P_{out,max}/P_{dc} = (V_{peak}^2/2R_L)/(V_{supply} \times V_{peak}/R_L) = 25\%\) — but only at full output. At lower signal levels (most of the time), efficiency is even lower. The transistors must be large enough to handle the continuously dissipated heat.

---

### Problem 5 — Noise Cascade in a Signal Chain

An audio system has three cascaded stages. Each stage's performance:
- Stage 1 (preamp): Gain = 40 dB, Input-referred noise = 2 μV
- Stage 2 (EQ): Gain = 0 dB (unity), Input-referred noise = 100 μV
- Stage 3 (power amp): Gain = 20 dB, Input-referred noise = 500 μV

**(a)** What is the total voltage gain of the chain?

**(b)** Refer all noise sources to the input of Stage 1. What is the dominant noise source?

**(c)** Calculate the total input-referred noise.

**(d)** Why is the preamplifier's noise the most critical in the chain?

??? success "Solution"
    **(a)** Total gain: \(40 + 0 + 20 = 60\text{ dB}\), or voltage ratio \(= 1000\times\).

    **(b)** Refer each stage's noise to the system input by dividing by the gain preceding that stage:

    - Stage 1 noise at input: \(2\text{ μV}\) (already at input)
    - Stage 2 noise referred to input: divide by Stage 1 gain (×100): \(100/100 = 1\text{ μV}\)
    - Stage 3 noise referred to input: divide by Stages 1×2 gain (×100): \(500/100 = 5\text{ μV}\)

    Dominant: Stage 3 noise is 5 μV input-referred — largest single contributor. But Stage 1 (2 μV) and Stage 3 (5 μV) are both significant.

    **(c)** Total input-referred noise (add in quadrature):

    \[V_{n,total} = \sqrt{2^2 + 1^2 + 5^2} = \sqrt{4 + 1 + 25} = \sqrt{30} = 5.48\text{ μV}\]

    **(d)** The preamplifier is critical because its noise is amplified by all subsequent stages. Every microvolt of preamplifier noise appears at the final output multiplied by 1000 (the total gain). By contrast, noise added by the final power amp stage passes through with gain 1 (it's already at the output). The noise cascade principle dictates that the first-stage noise figure dominates the entire system SNR.

</div>
