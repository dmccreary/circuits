---
title: Chapter 11 Glossary — Frequency Response and Bode Plots
description: Key terms and definitions for Chapter 11
---

<div class="unit1-styled" markdown>

# Chapter 11 Glossary

| Term | Definition |
|------|-----------|
| Frequency response | The description of how a circuit's output amplitude and phase vary as a function of input frequency. For linear circuits, a sinusoidal input at frequency f always produces a sinusoidal output at the same frequency f — only the amplitude and phase differ. The complete frequency response is captured by the transfer function \(H(j\omega)\). |
| Transfer function | The ratio of the output phasor to the input phasor as a function of frequency: \(H(j\omega) = \mathbf{V}_{out}/\mathbf{V}_{in}\). A complex quantity encoding both magnitude response (gain vs. frequency) and phase response (phase shift vs. frequency). Found by replacing each impedance with its phasor-domain form and applying voltage divider or mesh/node analysis. |
| Magnitude response | The absolute value of the transfer function \(|H(j\omega)|\) as a function of frequency, indicating how much the circuit amplifies or attenuates signals at each frequency. Usually expressed in decibels: \(|H|_{dB} = 20\log_{10}|H|\). Values above 0 dB represent gain; below 0 dB represent attenuation. |
| Phase response | The angle \(\phi(\omega) = \angle H(j\omega)\) as a function of frequency, indicating the phase shift introduced by the circuit at each frequency. Measured in degrees or radians. Phase shift is important for timing, signal integrity, and stability in feedback systems. |
| Bode plot | A pair of graphs on logarithmic frequency axes showing magnitude response (in dB) and phase response (in degrees) versus log frequency. Named after Bell Labs engineer Hendrik Bode. Uses logarithmic scaling to compress wide frequency ranges and straight-line (asymptotic) approximations to simplify sketching. |
| Decade | A tenfold change in frequency. Bode plots are typically drawn on a log frequency axis where each decade spans one unit of log scale. Roll-off rates are expressed per decade: a first-order filter rolls off at −20 dB/decade; a second-order filter at −40 dB/decade. |
| Octave | A twofold change in frequency. Equivalent to \(\log_2(2) = 1\) octave. Roll-off can also be expressed in dB/octave: −6 dB/octave equals −20 dB/decade. The term is borrowed from music, where each octave doubles frequency. |
| Cutoff frequency | The frequency at which the filter output power falls to half the passband power (−3 dB), or equivalently the output voltage falls to \(1/\sqrt{2} \approx 0.707\) of the passband value. Also called the half-power frequency or corner frequency. For a first-order RC filter: \(f_c = 1/(2\pi RC)\). |
| Corner frequency | Another term for cutoff frequency, named for its role as the "corner" in the asymptotic Bode approximation where the slope changes from 0 dB/decade to −20 dB/decade. Multiple poles and zeros produce multiple corners that progressively increase the roll-off slope. |
| Half-power point | The frequency at which output power is exactly half the passband power: \(|H| = 1/\sqrt{2}\), or \(|H|_{dB} = -3\text{ dB}\). Defines the boundary between passband and stopband for first-order filters. For a two-sided (band-pass) filter, there are upper and lower half-power frequencies defining the bandwidth. |
| Roll-off rate | The rate at which the filter magnitude response decreases in the stopband, expressed in dB/decade or dB/octave. Each pole in the transfer function contributes −20 dB/decade; each zero contributes +20 dB/decade. A first-order filter has −20 dB/decade roll-off; a second-order filter has −40 dB/decade. |
| Poles and zeros | The frequencies at which the transfer function's denominator becomes zero (poles) or numerator becomes zero (zeros), respectively. A pole at \(\omega = \omega_p\) creates a magnitude corner at \(\omega_p\) and contributes −20 dB/decade roll-off above \(\omega_p\) and a −90° phase shift. A zero contributes +20 dB/decade and +90° phase shift. |
| Low-pass filter | A filter that passes signals below the cutoff frequency and attenuates signals above it. Transfer function approaches unity at DC and falls off above \(f_c\). An RC low-pass filter has the output taken across the capacitor: \(H(j\omega) = 1/(1 + j\omega RC)\). Used to remove high-frequency noise and interference. |
| High-pass filter | A filter that passes signals above the cutoff frequency and attenuates signals below it. Transfer function approaches unity at high frequency and falls off below \(f_c\). An RC high-pass filter takes output across the resistor: \(H(j\omega) = j\omega RC/(1 + j\omega RC)\). Used to remove DC offset and low-frequency hum. |
| Band-pass filter | A filter that passes signals within a range of frequencies (the passband) and attenuates signals outside it. Characterized by center frequency \(f_0\), bandwidth BW, and quality factor \(Q = f_0/\text{BW}\). Requires at least second-order (two reactive elements). Used in radio receivers, audio equalizers, and communications. |
| Filter order | The number of poles in the transfer function's denominator, equal to the number of independent reactive elements (capacitors plus inductors). A first-order filter has one pole; a second-order filter has two poles. Higher-order filters have steeper roll-off: an nth-order filter rolls off at −20n dB/decade. |

</div>
