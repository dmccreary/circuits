---
title: Time Domain to Frequency Domain
description: Side-by-side time-domain waveform and frequency spectrum showing how square, sawtooth, and triangle waves decompose into harmonics
---

# Time Domain to Frequency Domain

<iframe src="main.html" width="100%"
    style="height:500px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>

## How to Use

- Select a waveform type (Sine, Square, Sawtooth, Triangle) using the buttons
- Observe the time-domain waveform on the left and its frequency spectrum on the right
- Adjust the number of harmonics to see how the waveform shape changes as more components are added

## What to Observe

- **Sine wave**: single spike in the spectrum — the purest possible signal
- **Square wave**: odd harmonics only (f, 3f, 5f...) with 1/n amplitude falloff
- **Sawtooth wave**: all harmonics (f, 2f, 3f...) with 1/n falloff — richer harmonic content
- **Triangle wave**: odd harmonics with 1/n² falloff — smoother due to faster convergence
- Adding harmonics improves time-domain accuracy but requires more bandwidth
