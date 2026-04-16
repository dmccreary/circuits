---
title: Chapter 12 Glossary — Filters and Resonance
description: Key terms and definitions for Chapter 12
---

<div class="unit1-styled" markdown>

# Chapter 12 Glossary

| Term | Definition |
|------|-----------|
| First-order filter | A filter with exactly one reactive element (one capacitor or one inductor), producing a transfer function with a single pole. Magnitude rolls off at −20 dB/decade in the stopband with a maximum phase shift of 90°. The simplest building blocks for audio and signal processing: RC low-pass, RC high-pass, RL low-pass, RL high-pass. |
| Second-order filter | A filter with two reactive elements, producing a transfer function with two poles (and possibly zeros). Rolls off at −40 dB/decade in the stopband. Can exhibit resonance, peaking, or very selective band-pass behavior. Characterized by center frequency \(f_0\), quality factor Q, and bandwidth BW = \(f_0/Q\). |
| RC low-pass filter | An RC circuit with series resistor R and shunt capacitor C, with output across the capacitor. Transfer function: \(H(j\omega) = 1/(1 + j\omega RC)\). Cutoff frequency: \(f_c = 1/(2\pi RC)\). Attenuates high-frequency signals while passing low-frequency and DC signals. Used for anti-aliasing and noise removal. |
| RC high-pass filter | An RC circuit with series capacitor C and shunt resistor R, with output across the resistor. Transfer function: \(H(j\omega) = j\omega RC/(1 + j\omega RC)\). Same cutoff frequency as the RC low-pass with the same R and C: \(f_c = 1/(2\pi RC)\). Removes DC offset and low-frequency hum from signals. |
| RLC band-pass filter | A second-order filter using a series or parallel RLC combination that passes a band of frequencies centered on the resonant frequency \(f_0 = 1/(2\pi\sqrt{LC})\). The bandwidth BW = \(f_0/Q = R/(2\pi L)\) for series RLC. Used in radio tuners, audio equalizers, and communications channel selection. |
| Passive filter | A filter built exclusively from passive components (resistors, capacitors, inductors) without active devices (transistors, op-amps). Maximum gain is unity (0 dB). Inductors at audio frequencies are large and expensive, making passive filters less popular than active designs for audio applications. |
| Active filter | A filter using op-amps (or other active devices) together with R and C components. Can achieve gains greater than unity, eliminates the need for inductors at audio frequencies, and cascades without loading because of low output impedance. Standard topology at audio frequencies. |
| Filter design | The process of selecting topology and calculating component values to meet a frequency-response specification. Given a target cutoff frequency \(f_c\), resonant frequency \(f_0\), and quality factor Q, design equations yield R, L, C values: \(f_c = 1/(2\pi RC)\), \(Q = f_0/\text{BW} = \omega_0 L/R\). |
| Audio tone control | A filter circuit that allows the user to boost or cut audio signals in specific frequency regions. Bass tone control boosts or attenuates signals below ~300 Hz (shelving filter). Treble tone control boosts or attenuates signals above ~3 kHz. Used in amplifiers, mixers, and consumer audio equipment. |
| Decibels in audio | The standard unit for expressing audio signal levels, gains, and losses. \(0\text{ dBV} = 1\text{ V RMS}\) is the consumer reference. \(0\text{ dBu} = 0.775\text{ V RMS}\) (\(= 1\text{ mW}\) into 600 Ω) is the professional reference. Voltage ratios: \(20\log_{10}(V_2/V_1)\). 6 dB ≈ double voltage; 20 dB = 10× voltage; 40 dB = 100× voltage. |
| Headroom | The difference in decibels between the operating signal level and the clipping level (maximum undistorted output). Expressed as a positive number of dB. Higher headroom means the system can handle transient peaks without distortion. Professional audio equipment typically has 18–24 dB of headroom above 0 dBu. |
| Dynamic range | The ratio in decibels between the loudest undistorted signal and the noise floor of a system. \(DR = \text{Max level} - \text{Noise floor}\). CD audio: ~96 dB. Professional digital audio: ~120–130 dB. Determines the fidelity with which a system can reproduce both loud and quiet signals simultaneously. |
| Amplifier gain | The ratio of output signal amplitude to input signal amplitude, expressed in decibels as \(A_v = 20\log_{10}(V_{out}/V_{in})\). For cascaded stages, gains in dB add: \(A_{total} = A_1 + A_2 + \cdots\). This additive property is a primary reason decibels are used throughout audio engineering. |
| dBV | A logarithmic voltage level measured relative to 1 V RMS: \(L_{dBV} = 20\log_{10}(V/1\text{ V})\). Consumer audio standard. A CD player output of 2 V RMS = +6 dBV. A microphone at 1 mV = −60 dBV. Used in consumer equipment datasheets and specifications. |
| dBu | A logarithmic voltage level measured relative to 0.7746 V RMS (the voltage that produces 1 mW in 600 Ω): \(L_{dBu} = 20\log_{10}(V/0.7746)\). Professional audio standard. Nominal line level in professional equipment is +4 dBu. Used in studio consoles, outboard gear, and professional amplifiers. |

</div>
