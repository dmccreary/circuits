---
title: Chapter 14 Glossary — Signal Analysis and Fourier Series
description: Key terms and definitions for Chapter 14
---

<div class="unit1-styled" markdown>

# Chapter 14 Glossary

| Term | Definition |
|------|-----------|
| Fourier series | The representation of any periodic signal as a DC offset plus an infinite sum of sinusoids at integer multiples of the fundamental frequency: \(f(t) = a_0 + \sum_{n=1}^{\infty}[a_n\cos(n\omega_0 t) + b_n\sin(n\omega_0 t)]\). Named for Jean-Baptiste Joseph Fourier (1807). Allows filter analysis of complex periodic signals using phasor techniques. |
| Fundamental frequency | The lowest frequency component in a periodic signal's Fourier series, equal to the reciprocal of the period: \(f_0 = 1/T\), \(\omega_0 = 2\pi f_0\). All other components (harmonics) are integer multiples of \(f_0\). Determines the perceived pitch of a musical tone. |
| Harmonics | Sinusoidal frequency components at integer multiples of the fundamental frequency: \(2f_0\) (2nd harmonic), \(3f_0\) (3rd harmonic), etc. The relative amplitudes of harmonics determine the timbre (tonal color) of a sound. A pure sine wave has only the fundamental; a square wave contains odd harmonics only; a sawtooth wave contains all harmonics. |
| Harmonic content | The set of harmonic amplitudes and phases that characterize a periodic waveform's frequency composition. Determined by computing the Fourier coefficients \(a_n\) and \(b_n\). Rich harmonic content produces complex, colorful timbres (saxophone, violin); sparse harmonic content produces pure, simple tones (flute, tuning fork). |
| Spectrum | The frequency-domain representation of a signal, showing the amplitudes and phases of its frequency components. For a periodic signal, the spectrum is discrete — consisting of lines at \(f_0, 2f_0, 3f_0, \ldots\). For an aperiodic signal, the spectrum is continuous. The spectrum is the "fingerprint" of a signal in the frequency domain. |
| Frequency spectrum | The graphical or mathematical representation of a signal's Fourier components plotted versus frequency. The amplitude spectrum shows \(|c_n|\) vs. \(nf_0\); the phase spectrum shows \(\angle c_n\) vs. \(nf_0\). The frequency spectrum reveals which frequencies carry the signal's energy and at what relative strengths. |
| Waveform symmetry | Geometric properties of a periodic waveform that simplify Fourier analysis by eliminating entire classes of coefficients before computation. Even symmetry means \(f(-t) = f(t)\); odd symmetry means \(f(-t) = -f(t)\); half-wave symmetry means \(f(t + T/2) = -f(t)\). Symmetry reduces integration effort significantly. |
| Even symmetry | A waveform property where \(f(-t) = f(t)\) — the function is a mirror image about the vertical axis. Consequence: all sine coefficients \(b_n = 0\). Only cosine terms remain in the Fourier series. A cosine wave is the classic even function. Waveforms symmetric about a peak exhibit even symmetry. |
| Odd symmetry | A waveform property where \(f(-t) = -f(t)\) — the function has 180° rotational symmetry about the origin. Consequences: DC term \(a_0 = 0\), and all cosine coefficients \(a_n = 0\). Only sine terms remain. A sine wave is the classic odd function. Triangle waves and sawtooth waves passing through zero can exhibit odd symmetry. |
| Half-wave symmetry | A waveform property where the negative half-cycle is the mirror of the positive half-cycle: \(f(t + T/2) = -f(t)\). Consequence: all even harmonics are zero — only odd harmonics (\(n = 1, 3, 5, \ldots\)) are present. Square waves and triangle waves with no DC offset both exhibit half-wave symmetry. |

</div>
