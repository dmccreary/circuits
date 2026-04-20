---
title: Chapter 10 — AC Power Analysis
description: Real, reactive, and apparent power, power factor, and efficiency in AC circuits
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 10 — AC Power Analysis

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

In DC circuits, power is straightforward: \(P = VI\), energy flows one way, and that's that. AC circuits tell a more interesting story. Sometimes energy flows *backward* from load to source. Sometimes voltage and current work at cross-purposes. And sometimes what looks like a lot of power isn't doing any useful work at all.

This chapter untangles three kinds of power in AC circuits: **real power** (watts — what actually does work), **reactive power** (VARs — energy sloshing back and forth without doing work), and **apparent power** (volt-amperes — the total demand seen by the source). These three are related by the **power triangle**, and their ratio — the **power factor** — is a critical efficiency metric in power systems and audio amplifier design.

The chapter covers power factor correction (how to add capacitors to improve efficiency), how each passive component handles power differently, and how maximum power transfer extends to AC circuits through conjugate impedance matching.

**Key Takeaways**

1. Real power \(P = V_{rms} I_{rms} \cos\theta\) is the only power that does useful work; reactive power \(Q = V_{rms} I_{rms} \sin\theta\) oscillates between source and load without net transfer.
2. The power triangle relates \(S^2 = P^2 + Q^2\), where power factor \(PF = P/S = \cos\theta\) measures how efficiently apparent power converts to real work.
3. Power factor correction uses capacitors in parallel with inductive loads to supply reactive power locally, reducing line current and losses without changing the real power delivered.

</details>

## Summary

### Key Concepts

- **Real power** P (watts): average power actually consumed; produced only by resistive elements
- **Reactive power** Q (VAR): power exchanged with energy-storage elements (L, C); not consumed
- **Apparent power** S (VA): product of RMS voltage and RMS current; \(S = V_{rms} I_{rms}\)
- **Power factor** PF = cos θ: ratio of real to apparent power; ranges from 0 (pure reactive) to 1 (purely resistive)
- **Inductive loads**: lagging power factor (current lags voltage); **capacitive loads**: leading power factor
- **Power factor correction**: adding capacitance in parallel reduces reactive current in inductive systems
- **Complex power**: \(\mathbf{S} = P + jQ\)

### Important Equations

\[ P = V_{rms} I_{rms} \cos\theta \qquad Q = V_{rms} I_{rms} \sin\theta \]

\[ S = V_{rms} I_{rms} = \sqrt{P^2 + Q^2} \qquad PF = \frac{P}{S} = \cos\theta \]

### What You Should Understand

- Why reactive power does not consume energy but still stresses power lines, transformers, and generators
- How a power factor below 1 requires larger currents to deliver the same real power
- Why electric utilities charge large industrial customers for poor (low) power factor
- How adding a capacitor in parallel corrects a lagging (inductive) power factor toward unity

### Applications

- Industrial motor drives and power systems
- Utility billing and power factor penalty calculations
- UPS, inverter, and generator sizing
- Wireless power transfer efficiency optimization

### Quick Review Checklist

- [ ] I can calculate P, Q, and S for any load given V, I, and phase angle θ
- [ ] I can draw the power triangle and correctly label P, Q, and S
- [ ] I can determine whether a load is inductive or capacitive from the power factor angle
- [ ] I can calculate the capacitance required to correct power factor to unity

## Concepts Covered

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

1. Instantaneous Power
2. Average Power
3. Real Power
4. Reactive Power
5. Apparent Power
6. Complex Power
7. Power Triangle
8. Power Factor
9. Leading Power Factor
10. Lagging Power Factor
11. Power Factor Correction
12. VAR (Volt-Ampere Reactive)
13. Volt-Ampere (VA)
14. Maximum Power Transfer (AC)
15. Conjugate Impedance Matching
16. RMS Power Calculation
17. Power in Resistors
18. Power in Capacitors
19. Power in Inductors
20. Efficiency
21. Power Gain

</div>

---

## Interactive MicroSims

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

This chapter includes two interactive simulations. Use them alongside the reading to explore concepts hands-on.

| Section | Simulation | What it shows |
|---------|-----------|---------------|
| 10.2 | [RMS Calculation](../../../sims/rms-calculation/index.md) | RMS vs peak vs average power relationships |
| 10.6 | [Power Triangle](../../../sims/power-triangle/index.md) | P, Q, S, and power factor angle interactively |

</div>

### Power Triangle — Interactive Walkthrough

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/power-triangle/main.html" width="100%"
    style="height:550px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>
</div>

---

## Prerequisites

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Before beginning this chapter, students should have:

- Understanding of voltage, current, power, and resistance ([Chapter 1](../01-electric-charge-basic-quantities/index.md))
- Familiarity with capacitors, inductors, and signal fundamentals including RMS and decibels ([Chapter 5](../05-passive-components/index.md))
- Mastery of phasors, impedance, and AC circuit analysis ([Chapter 9](../09-phasors-complex-impedance/index.md))

</div>

</div>
