---
title: Oscilloscope Interface Guide
description: Interactive oscilloscope simulator with graticule, triggered waveform display, V/div, T/div, trigger controls, and automatic measurements
chapter: 16
bloom_level: Apply (L3)
bloom_verb: use
---

# Oscilloscope Interface Guide

<iframe src="main.html" width="660" height="568" scrolling="no" frameborder="0"></iframe>

## How to Use

**Scope controls (right panel)**

| Control | What it does |
|---------|-------------|
| **Volts/div** | Vertical scale — 10 mV/div to 10 V/div (1-2-5 sequence) |
| **Vert pos** | Shifts the trace up/down; the cyan **G** marker shows where 0 V is on screen |
| **Time/div** | Horizontal scale — 1 µs/div to 1 s/div (1-2-5 sequence) |
| **Trigger Level** | The yellow **T** marker on the right edge shows the trigger voltage |
| **Edge ↑/↓** | Trigger on rising or falling edge |
| **Coupling DC/AC** | DC coupling shows the full signal including DC offset; AC removes the DC |
| **AUTO** | Resets trigger level to 0 V and restarts |
| **STOP/RUN** | Freezes or re-enables the sweep |

**Signal generator (bottom panel)**

| Control | Range |
|---------|-------|
| Waveform type | Sine, Square, Triangle |
| Frequency | 10 Hz – 100 kHz (log scale) |
| Amplitude | 100 mV – 10 V peak (log scale) |
| DC Offset | –5 V to +5 V |

## Exercises

Work through the three goals shown at the bottom of the display:

1. **Display exactly 2 cycles** — Calculate the correct Time/div: \(T/\text{div} = \frac{2\,T}{10} = \frac{2}{10 f}\)
2. **Signal spans ≥ 6 divisions** — Set Volts/div so \(V_{pp} / (V/\text{div}) \geq 6\)
3. **Stable trigger** — Keep the trigger level inside the signal's voltage range

## Key Measurements

The right panel continuously displays:

- **Freq** — signal frequency (from the generator)
- **Vpp** — peak-to-peak voltage measured from the displayed waveform
- **Vavg** — average (DC) value of the displayed waveform
- **Vrms** — RMS voltage (for a 1 V peak sine: \(V_{rms} = 1/\sqrt{2} \approx 707\) mV)

## Phosphor Glow

The trace uses a three-layer phosphor glow effect to mimic a real analog oscilloscope CRT display. The bright inner line represents the electron beam; the outer glow represents phosphor persistence.
