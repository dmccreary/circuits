---
title: Fourier Series Builder
description: Build time-domain waveforms by combining harmonics; see the resulting frequency spectrum
---

# Fourier Series Builder

<iframe src="main.html" width="100%"
    style="height:580px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>

## How to Use

- Drag the **H1–H7** sliders to set the amplitude of each harmonic (0 to 1)
- Use **preset buttons** to load classic waveforms: Square, Sawtooth, or Triangle
- The left panel shows individual harmonics (colored thin lines) and the composite (purple)
- The right panel shows the frequency spectrum (bar heights = amplitude of each harmonic)

## What to Observe

- A **square wave** uses only odd harmonics (H1, H3, H5...) in a 1/n pattern
- A **sawtooth wave** includes all harmonics in a 1/n pattern
- A **triangle wave** uses odd harmonics in a 1/n² pattern — much smoother rolloff
- Adding more harmonics makes the composite waveform sharper and more "digital" looking
- This is the essence of Fourier analysis: any periodic signal is a sum of sinusoids
