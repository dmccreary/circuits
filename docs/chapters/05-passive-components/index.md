---
title: Chapter 5 — Passive Components: Resistors, Capacitors, and Inductors
description: Master energy storage elements and signal fundamentals for dynamic circuit analysis
generated_by: claude skill chapter-content-generator
date: 2026-01-30
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 5 — Passive Components: Resistors, Capacitors, and Inductors

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

Welcome to the chapter where circuits get interesting. Up until now, we've been dealing with resistors—components that do one thing: resist. They're the bouncers of the circuit world, limiting current and dissipating energy as heat. Useful, but let's be honest: a little one-dimensional.

Now we meet the **capacitor** and the **inductor**—components that *store* energy rather than waste it. These are the circuit equivalents of batteries, except they charge and discharge in fascinating ways that give circuits memory, timing, and the ability to filter signals. If resistors are the bouncers, capacitors and inductors are the DJs who shape the music.

This chapter also introduces **signal fundamentals**: amplitude, frequency, phase, and the mysterious decibel. These concepts form the vocabulary you'll need to discuss audio, radio, and any signal that changes over time.

Here's why this matters: every filter, every amplifier, every audio circuit you'll ever design relies on the interplay between resistance, capacitance, and inductance. Master these components, and you've got the building blocks for everything from your phone's speaker crossover to the power supply in your laptop.

Let's store some energy. (Unlike your coffee, these components actually return it.)

**Key Takeaways**

1. Capacitors store energy in electric fields (\(E = \frac{1}{2}CV^2\)); current flows only when voltage is changing (\(I = C\,dV/dt\)), so capacitors block DC and oppose instantaneous voltage changes.
2. Inductors store energy in magnetic fields (\(E = \frac{1}{2}LI^2\)); voltage appears only when current is changing (\(V = L\,dI/dt\)), so inductors pass DC freely and oppose instantaneous current changes.
3. Real components have parasitic elements (ESR, ESL, leakage) that limit high-frequency performance; signal parameters like RMS, frequency, and decibels form the vocabulary for all AC and audio work.

</details>

## Summary

### Key Concepts

- **Capacitor**: stores energy in an electric field; current leads voltage by 90°; blocks DC, passes AC
- **Inductor**: stores energy in a magnetic field; voltage leads current by 90°; passes DC, opposes AC
- Series capacitors combine like parallel resistors; **parallel capacitors add directly**
- Series inductors add directly; **parallel inductors combine like parallel resistors**
- **Mutual inductance** (M): magnetic coupling between two inductors; basis of transformer operation
- Real components have parasitics: capacitors have **ESR** (equivalent series resistance); inductors have winding resistance
- The **decibel** (dB) is a logarithmic scale for expressing voltage, current, or power ratios

### Important Equations

\[ i_C = C\,\frac{dv}{dt} \qquad E_C = \frac{1}{2}CV^2 \]

\[ v_L = L\,\frac{di}{dt} \qquad E_L = \frac{1}{2}LI^2 \]

\[ V_{rms} = \frac{V_p}{\sqrt{2}} \approx 0.707\,V_p \qquad \text{dB} = 20\log_{10}\!\left(\frac{V_2}{V_1}\right) \]

### What You Should Understand

- Why a capacitor acts as an open circuit at DC and a short circuit at very high frequency
- Why an inductor acts as a short circuit at DC and an open circuit at very high frequency
- The physical meaning of the I–V relationships: capacitor current depends on *rate of change* of voltage
- How the decibel scale compresses a wide dynamic range into a manageable number

### Applications

- Bypass and decoupling capacitors in power supply design
- Energy storage in DC-DC converter inductors
- Transformer design and operation (mutual inductance)
- Audio level metering and specification (dB scale)

### Quick Review Checklist

- [ ] I can write the I–V relationship for both a capacitor and an inductor
- [ ] I can calculate the energy stored in C or L given voltage or current
- [ ] I can combine capacitors and inductors in series and parallel configurations
- [ ] I can convert a voltage ratio to decibels and convert decibels back to a ratio

## Concepts Covered

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

1. Parallel Plate Capacitor
2. Capacitor Energy Storage
3. Capacitors in Series
4. Capacitors in Parallel
5. Inductor Energy Storage
6. Inductors in Series
7. Inductors in Parallel
8. Mutual Inductance
9. Coupling Coefficient
10. Parasitic Capacitance
11. Parasitic Inductance
12. Real vs Ideal Components
13. Amplitude
14. Period
15. Frequency
16. Angular Frequency
17. Phase Angle
18. Phase Shift
19. Peak Value
20. Peak-to-Peak Value
21. RMS Value
22. Average Value
23. Human Hearing Range
24. Audio Frequency Range
25. Decibel

</div>

---

## Prerequisites

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

This chapter builds on concepts from:

- [Chapter 1: Electric Charge and Basic Circuit Quantities](../01-electric-charge-basic-quantities/index.md)
- [Chapter 2: Ohm's Law and Basic Circuit Configurations](../02-ohms-law-basic-configurations/index.md)
- [Chapter 4: DC Circuit Analysis Methods](../04-dc-circuit-analysis/index.md)

</div>

</div>
