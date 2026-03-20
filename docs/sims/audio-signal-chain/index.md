---
title: Audio Signal Chain MicroSim
description: Interactive audio signal chain from microphone to speaker. Adjust preamp gain, bass/treble tone controls, and volume to see signal levels at each stage. Color-coded meters show bass, mid, and treble levels with clipping indicators.
---

# Audio Signal Chain

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim visualizes the complete audio signal chain: **Microphone → Preamplifier → Tone Control → Power Amplifier → Speaker**.

Level meters below each stage show signal levels in dBV across three frequency bands:

- **Blue bars**: Bass (100 Hz)
- **Green bars**: Midrange (1 kHz)
- **Orange bars**: Treble (10 kHz)

Red clipping indicators appear when a stage exceeds +10 dBV.

**Controls:**

| Control | Range | Effect |
|---------|-------|--------|
| Mic level | −70 to −30 dBV | Simulates microphone sensitivity |
| Preamp gain | +20 to +60 dB | Brings mic level up to line level |
| Bass adjust | ±12 dB | Tone control affecting low frequencies |
| Treble adjust | ±12 dB | Tone control affecting high frequencies |
| Volume | −30 to 0 dB | Power amplifier output level |

**Signal level references:**

| Level | dBV | Typical use |
|-------|-----|-------------|
| Mic output | −60 to −40 dBV | Dynamic microphone |
| Consumer line | −10 dBV | Home audio equipment |
| Pro line | +4 dBV (~0 dBu) | Studio equipment |
| Clip point | +10 dBV | Distortion above this level |
