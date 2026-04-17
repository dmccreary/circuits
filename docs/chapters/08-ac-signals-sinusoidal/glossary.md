---
title: Chapter 8 Glossary — AC Signals and Sinusoidal Waveforms
description: Key terms and definitions for Chapter 8
---

<div class="unit1-styled" markdown>

# Chapter 8 Glossary

| Term | Definition |
|------|-----------|
| Alternating current | Electric current that periodically reverses direction. Unlike DC, AC electrons oscillate back and forth. AC dominates power distribution because transformers can step voltages up for efficient long-distance transmission and down for safe household use. Standard frequencies are 60 Hz (Americas) and 50 Hz (most of the world). |
| Sinusoidal waveform | A signal whose instantaneous value follows the sine or cosine function: \(v(t) = V_m\sin(\omega t + \phi)\). Sinusoids are the only waveform shape that passes through linear circuits unchanged (only amplitude and phase are affected). Any periodic signal can be expressed as a sum of sinusoids (Fourier series). |
| Complex number | A number with real and imaginary parts, written \(z = a + jb\) (rectangular form) or \(r\angle\theta\) (polar form), where \(j = \sqrt{-1}\). Essential for phasor analysis: the imaginary unit captures the 90° phase shifts introduced by capacitors and inductors. Euler's formula links the two forms: \(e^{j\theta} = \cos\theta + j\sin\theta\). |
| Polar form | Representation of a complex number by its magnitude \(r = \sqrt{a^2+b^2}\) and angle \(\theta = \arctan(b/a)\), written \(r\angle\theta\). Useful for multiplication and division: magnitudes multiply/divide, angles add/subtract. Corresponds directly to phasor notation. |
| Euler's formula | The fundamental relationship linking exponential and trigonometric functions: \(e^{j\theta} = \cos\theta + j\sin\theta\). Allows sinusoidal functions to be represented as the real part of complex exponentials, which is the mathematical foundation for phasor analysis. |
| Signal | A time-varying physical quantity that conveys information or energy. In circuits, signals are typically voltages or currents. Characterized by amplitude, frequency, phase, and waveform shape. Signals can be periodic or aperiodic, deterministic or random. |
| Periodic signal | A signal that repeats the same pattern at regular intervals: \(f(t+T) = f(t)\) for all \(t\), where \(T\) is the period. Characterized by frequency \(f = 1/T\). The power spectrum of a periodic signal consists of discrete lines at multiples of the fundamental frequency. |
| Signal amplitude | The maximum displacement of a periodic signal from its zero or DC reference. For a sinusoid, the amplitude equals the peak value \(V_m\). Not to be confused with RMS value or peak-to-peak value. Determines the signal's voltage swing and power-carrying capacity. |
| Crest factor | The ratio of the peak value to the RMS value of a waveform: \(CF = V_m/V_{rms}\). For a pure sinusoid: \(CF = \sqrt{2} \approx 1.414\). Indicates how "peaky" a signal is relative to its average power. Important for amplifier and equipment headroom calculations. |
| Form factor | The ratio of the RMS value to the average (rectified) value of a waveform: \(FF = V_{rms}/V_{avg}\). For a sinusoid: \(FF = \pi/(2\sqrt{2}) \approx 1.11\). Used in instrumentation to relate average-responding and RMS-responding meter readings. |
| Frequency domain | A way of representing signals as a function of frequency rather than time, showing which frequencies are present and at what amplitudes and phases. The Fourier transform moves between time and frequency domains. Frequency-domain analysis simplifies the study of how circuits respond to complex inputs. |
| DC component | The constant average value of a signal, equal to the zero-frequency component in its Fourier spectrum. A signal with non-zero DC component has \(a_0 \neq 0\) in its Fourier series. Capacitors block DC; inductors pass DC freely. |
| Voltage gain | The ratio of output voltage amplitude to input voltage amplitude for a circuit or device, often expressed in decibels as \(A_v(\text{dB}) = 20\log_{10}(V_{out}/V_{in})\). For amplifiers, gain > 0 dB; for passive attenuators, gain < 0 dB. Determines how much a stage amplifies or attenuates a signal. |
| Time domain | A way of representing signals as a function of time, showing instantaneous values at each moment. The natural representation for oscilloscope measurements and transient analysis. Complementary to frequency-domain representation via the Fourier transform. |
| AC component | The time-varying portion of a signal, obtained by subtracting the DC average. A signal can be decomposed as \(v(t) = V_{DC} + v_{AC}(t)\). Coupling capacitors in amplifiers block the DC component and pass only the AC component to the next stage. |

</div>
