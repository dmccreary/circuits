---
title: Phasor Transformation Visualizer
description: Animate a rotating phasor on the complex plane and observe how its real-axis projection generates a time-domain sinusoid
---

# Phasor Transformation Visualizer

<iframe src="main.html" width="100%" height="500px" scrolling="no" style="border:1px solid #ccc; border-radius:6px;"></iframe>

## How to Use

- **Amplitude Vₘ slider** — set the peak voltage of the sinusoid (1–10 V).
- **Phase φ slider** — set the initial phase angle of the frozen phasor (−180° to 180°).
- **Speed slider** — control the animation speed of the rotating phasor.
- **Animate / Pause button** — toggle the rotating phasor animation on or off.

## What to Observe

- The **green arrow** on the right panel is the frozen phasor **V = Vₘ∠φ** — it captures amplitude and phase at t = 0.
- When animating, the **blue arrow** rotates counterclockwise, representing **V·e^(jωt)**.
- The **red dot** on the real axis traces the real part of the rotating phasor — exactly matching the time-domain waveform on the left.
- At t = 0, the rotating phasor coincides with the frozen phasor at angle φ.
- Changing φ shifts the waveform left (positive) or right (negative) in time.

## Key Equations

\[v(t) = V_m \cos(\omega t + \phi)\]

\[\mathbf{V} = V_m \angle \phi = V_m e^{j\phi} = V_m\cos\phi + jV_m\sin\phi\]

\[v(t) = \text{Re}\left\{\mathbf{V} e^{j\omega t}\right\}\]

The phasor **V** contains all the information about the sinusoid — amplitude and phase — without carrying the time variable. Since all signals in an AC circuit share the same frequency ω, the phasor representation is complete.

## Key Concepts

- **Phasor**: A complex number representing amplitude and phase of a sinusoid
- **Magnitude |V|**: Peak amplitude of the waveform
- **Phase angle φ**: Starting angle at t = 0 (positive = leads, negative = lags)
- **Rectangular form**: V = a + jb, where a = Vₘcos(φ), b = Vₘsin(φ)
- **Polar form**: V = Vₘ∠φ
