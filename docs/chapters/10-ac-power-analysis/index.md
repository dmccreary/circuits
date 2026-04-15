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

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
This chapter examines power in AC circuits, where phase relationships between voltage and current create fundamentally different behavior from DC. Students will learn about instantaneous, average, real, reactive, and apparent power, and understand how power factor affects energy efficiency. The chapter covers the power triangle, power factor correction using capacitors, power calculations in resistive, capacitive, and inductive elements, and maximum power transfer in AC systems.
</p>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Concepts Covered</h2>

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

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Prerequisites</h2>

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Before beginning this chapter, students should have:

- Understanding of voltage, current, power, and resistance ([Chapter 1](../01-electric-charge-basic-quantities/index.md))
- Familiarity with capacitors, inductors, and signal fundamentals including RMS and decibels ([Chapter 5](../05-passive-components/index.md))
- Mastery of phasors, impedance, and AC circuit analysis ([Chapter 9](../09-phasors-complex-impedance/index.md))

</div>

</div>
