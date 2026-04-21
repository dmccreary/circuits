---
title: Chapter 12 — Filters and Resonance
description: Design first and second-order filter circuits for audio and signal processing
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 12 — Filters and Resonance

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

Filters are the frequency sculptors of electronics. Every time you turn up the bass on a speaker system, remove 60 Hz hum from a recording, or tune a radio to a specific station, a filter circuit is at work. This chapter transforms the frequency-response theory from Chapter 11 into practical design tools — selecting topologies, calculating component values, and verifying specifications for real-world applications.

We begin with first-order RC and RL filters, the simplest building blocks that provide a gentle -20 dB/decade roll-off. These lead naturally to second-order RLC circuits, which introduce resonance — a sharper frequency selectivity achieved when inductive and capacitive effects cancel each other at a specific frequency. The quality factor Q quantifies how narrow or broad that resonance peak is, and understanding Q is the key to designing band-pass filters for everything from radio receivers to audio equalizers.

The chapter then applies these principles to audio engineering: how bass and treble tone controls work as shelving filters, what decibel references like dBV and dBu mean in practice, and how the complete signal chain from microphone to speaker uses gain and filtering at every stage. By the end, you will be able to specify, design, and verify filters for real audio and signal-processing applications.

**Key Takeaways**

1. First-order RC and RL filters share the same cutoff-frequency formula structure (\(f_c = 1/(2\pi RC)\) or \(f_c = R/(2\pi L)\)) and produce -20 dB/decade roll-off; the choice between high-pass and low-pass depends only on which element the output is taken across.
2. Second-order RLC band-pass filters are governed by three linked parameters — resonant frequency \(f_0\), quality factor Q, and bandwidth BW = \(f_0/Q\) — allowing precise spectral selectivity that is impossible with first-order circuits.
3. Active filters using op-amps eliminate bulky inductors at audio frequencies, allow gain greater than unity, and cascade without loading, making them the preferred technology for audio tone-control and signal-processing applications.

</details>

## Summary

### Key Concepts

- **First-order filters** (RC, RL): roll off at −20 dB/decade; simple, single-element designs
- **Second-order RLC filters**: roll off at −40 dB/decade; enable band-pass and band-stop responses
- **Quality factor** Q: determines resonance sharpness and bandwidth; \(BW = f_0/Q\)
- **Active filters**: use op-amps to achieve precise gain and filter responses without large inductors
- **Shelving filters**: boost or cut all frequencies above (treble) or below (bass) a shelf frequency — used in audio EQ
- Audio level standards: **0 dBu = 775 mV RMS**; **0 dBV = 1 V RMS**; professional line level = +4 dBu

### Important Equations

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[ f_c = \frac{1}{2\pi RC} \quad \text{(RC filter)} \qquad f_c = \frac{R}{2\pi L} \quad \text{(RL filter)} \]

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[ f_0 = \frac{1}{2\pi\sqrt{LC}} \quad \text{(resonant frequency)} \qquad Q = \frac{f_0}{BW} \qquad BW = \frac{f_0}{Q} \]

</div>

### What You Should Understand

- How to select R and C values to achieve a target cutoff frequency
- The trade-off between Q and bandwidth in second-order band-pass filter design
- Why op-amp active filters replace inductors in audio applications (size, loss, cost)
- How headroom, dynamic range, and clipping relate to audio signal level standards

### Applications

- Audio crossover networks for splitting bass and treble to separate speaker drivers
- Radio IF filters (narrow band-pass selection at a fixed intermediate frequency)
- Power supply ripple reduction
- Parametric and graphic equalizer design for studio audio

### Quick Review Checklist

- [ ] I can design an RC low-pass filter for a specified cutoff frequency
- [ ] I can calculate Q and bandwidth for a second-order band-pass RLC filter
- [ ] I understand the difference between dBV and dBu audio level standards
- [ ] I can compare first- and second-order filter roll-off rates and explain the trade-offs

## Concepts Covered

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

1. First-Order Filter
2. Second-Order Filter
3. RC Low-Pass Filter
4. RC High-Pass Filter
5. RL Low-Pass Filter
6. RL High-Pass Filter
7. RLC Band-Pass Filter
8. Passive Filter
9. Active Filter
10. Filter Design
11. Audio Tone Control
12. Bass Filter
13. Treble Filter
14. Amplifier Gain
15. Decibels in Audio
16. dBV
17. dBu
18. Headroom
19. Dynamic Range
20. Audio Signal
21. Microphone
22. Speaker

</div>

---

## Interactive MicroSims

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

This chapter includes seven interactive simulations. Use them alongside the reading to explore concepts hands-on.

| Section | Simulation | What it shows |
|---------|-----------|---------------|
| 12.2 | [Filter Frequency Response](../../sims/filter-frequency-response/index.md) | Bode magnitude and phase for RC filters |
| 12.2 | [First-Order Filters](../../sims/first-order-filters/index.md) | LP and HP filter responses and cutoff frequency |
| 12.3 | [Resonance Comparison](../../sims/resonance-comparison/index.md) | Series vs parallel RLC resonance |
| 12.3 | [Second-Order Filter](../../sims/second-order-filter/index.md) | Butterworth, underdamped, overdamped responses |
| 12.3 | [Bandwidth and Selectivity](../../sims/bandwidth-selectivity/index.md) | Q factor, -3 dB bandwidth, selectivity |
| 12.6 | [3-Band Equalizer](../../sims/equalizer-demo/index.md) | Bass/mid/treble shelving and peak EQ curves |
| 12.7 | [Decibel Scale](../../sims/decibel-scale/index.md) | dB values, dBV, dBu conversions |
| 12.10 | [Audio Signal Chain](../../sims/audio-signal-chain/index.md) | Complete audio path from mic to speaker |

</div>

### Filter Frequency Response — Interactive Walkthrough

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/filter-frequency-response/main.html" width="100%"
    style="height:550px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>
</div>

---

## Prerequisites

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Before beginning this chapter, students should have:

- Understanding of RC and RL transient behaviour, time constants, and energy storage in reactive components ([Chapter 6](../06-transient-analysis-rc-rl/index.md))
- Familiarity with second-order RLC circuits, natural frequency, and damping ratio ([Chapter 7](../07-second-order-rlc-circuits/index.md))
- Mastery of transfer functions, Bode plots, cutoff frequency, roll-off rate, and the four filter types ([Chapter 11](../11-frequency-response-bode/index.md))

</div>

</div>
