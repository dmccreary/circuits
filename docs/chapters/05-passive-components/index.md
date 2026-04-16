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

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
This chapter provides an in-depth examination of passive electronic components beyond basic resistors. Students will learn how capacitors store energy in electric fields and how inductors store energy in magnetic fields. The chapter covers series and parallel combinations of capacitors and inductors, mutual inductance between inductors, and the practical considerations of real versus ideal components. Understanding these energy storage elements is essential for analyzing dynamic circuits and filters in subsequent chapters. The chapter concludes with signal fundamentals — amplitude, frequency, phase, RMS value, and the decibel — forming the vocabulary needed for all AC and audio circuit work.
</p>
</div>

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
