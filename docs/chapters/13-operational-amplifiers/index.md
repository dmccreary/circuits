---
title: Chapter 13 — Operational Amplifiers
description: Ideal op-amp model, negative feedback, and fundamental op-amp circuit configurations
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 13 — Operational Amplifiers

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

The operational amplifier — "op-amp" for short — is the most versatile and widely used analog IC ever designed. Originally developed for analog computers to perform mathematical operations like integration and summation, the modern op-amp costs pennies, fits in a package smaller than your thumbnail, and can amplify, filter, buffer, compare, and process signals with extraordinary precision. Understanding op-amps unlocks the entire world of analog circuit design.

This chapter begins with the ideal op-amp model, whose three defining characteristics — infinite open-loop gain, infinite input impedance, and zero output impedance — make analysis beautifully simple. From there, the chapter introduces negative feedback: the mechanism that transforms a wildly over-powered amplifier into a precise, stable, and predictable circuit element. Two golden rules emerge from this analysis (virtual short and no input current) and become the toolkit for solving every op-amp circuit that follows.

The chapter then systematically develops the fundamental configurations: the inverting amplifier, the non-inverting amplifier, and the unity-gain voltage follower. It extends these to arithmetic circuits (summing, difference, and instrumentation amplifiers), then explores integrators and differentiators — circuits that perform calculus on electrical signals. The chapter closes with practical limitations: gain-bandwidth product, slew rate, input offset voltage, bias current, and common-mode rejection, equipping students to select real op-amps and design around their constraints.

**Key Takeaways**

1. The ideal op-amp model (A→∞, Z_in→∞, Z_out→0) combined with negative feedback produces two golden rules — virtual short (V+ = V−) and no input current (I+ = I− = 0) — that solve virtually every linear op-amp circuit without complicated algebra.
2. Closed-loop gain depends entirely on the external feedback network, not on the op-amp's open-loop gain, which is why op-amp circuits are stable and repeatable despite large gain variations between individual chips.
3. Real op-amps are bounded by gain-bandwidth product (higher gain means narrower bandwidth), slew rate (maximum output rate of change), and small DC imperfections (offset voltage, bias current) that must be accounted for in precision designs.

</details>

## Summary

### Key Concepts

- **Ideal op-amp model**: infinite input impedance, zero output impedance, infinite open-loop gain \(A_{OL}\)
- **Golden Rules** (with negative feedback):
    1. The output drives the inputs to make \(V^+ = V^-\) (virtual short)
    2. No current flows into either input terminal
- **Inverting amplifier**: gain = \(-R_f/R_1\) — output is phase-inverted
- **Non-inverting amplifier**: gain = \(1 + R_f/R_1\) — output is in phase
- **Voltage follower (buffer)**: gain = 1; high-input, low-output impedance stage for isolation
- **Gain-bandwidth product** (GBW): \(A_v \times BW = \text{constant}\) — higher gain means lower bandwidth
- **Slew rate**: maximum rate of output voltage change; limits large-signal high-frequency performance

### Important Equations

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[ A_v = -\frac{R_f}{R_1} \quad \text{(inverting)} \qquad A_v = 1 + \frac{R_f}{R_1} \quad \text{(non-inverting)} \]

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[ V_{out} = -R_f\!\left(\frac{V_1}{R_1} + \frac{V_2}{R_2}\right) \quad \text{(summing)} \qquad GBW = A_v \times BW \]

</div>

### What You Should Understand

- Why **negative feedback** stabilizes gain, reduces distortion, and extends bandwidth
- How to apply the two Golden Rules to derive the gain of any op-amp configuration
- The difference between open-loop behavior (high-gain comparator) and closed-loop behavior (precise amplifier)
- How slew rate and GBW impose different limits: GBW limits small-signal bandwidth; slew rate limits large-signal speed

### Applications

- Instrumentation amplifiers for sensor signal conditioning (strain gauges, thermocouples)
- Active filters (Chapters 11–12)
- Audio preamplifiers, mixers, and tone controls
- PID controllers in feedback control systems

### Quick Review Checklist

- [ ] I can apply the two Golden Rules to derive the gain of any op-amp configuration
- [ ] I can design an inverting or non-inverting amplifier for a specified gain
- [ ] I can explain how gain-bandwidth product limits high-frequency performance
- [ ] I can identify at least three op-amp datasheet specifications relevant to practical design

## Concepts Covered

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

1. Operational Amplifier
2. Ideal Op-Amp
3. Op-Amp Symbol
4. Inverting Input
5. Non-Inverting Input
6. Op-Amp Output
7. Open-Loop Gain
8. Closed-Loop Gain
9. Negative Feedback
10. Positive Feedback
11. Virtual Short
12. Virtual Ground
13. Inverting Amplifier
14. Non-Inverting Amplifier
15. Voltage Follower
16. Buffer Amplifier
17. Summing Amplifier
18. Difference Amplifier
19. Instrumentation Amplifier
20. Integrator Circuit
21. Differentiator Circuit
22. Op-Amp Bandwidth
23. Gain-Bandwidth Product
24. Slew Rate
25. Input Offset Voltage
26. Input Bias Current
27. Common Mode Rejection
28. CMRR
29. Op-Amp Saturation
30. Rail-to-Rail Op-Amp

</div>

---

## Interactive MicroSims

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

This chapter includes three interactive simulations. Use them alongside the reading to explore concepts hands-on.

| Section | Simulation | What it shows |
|---------|-----------|---------------|
| 13.5 | [Op-Amp Golden Rules](../../sims/opamp-golden-rules/index.md) | Virtual short and virtual ground principles |
| 13.6 | [Inverting Op-Amp](../../sims/opamp-inverting/index.md) | Gain = -Rf/Rin, phase inversion, virtual ground |
| 13.9 | [Op-Amp Configurations](../../sims/opamp-configurations/index.md) | Inverting, non-inverting, summing, and other circuits |

</div>

### Op-Amp Golden Rules — Interactive Walkthrough

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/opamp-golden-rules/main.html" width="100%"
    style="height:550px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>
</div>

---

## Prerequisites

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Before beginning this chapter, students should have:

- Understanding of Ohm's Law and series/parallel circuit analysis ([Chapter 2](../02-ohms-law-basic-configurations/index.md))
- DC circuit analysis methods including node voltage and superposition ([Chapter 4](../04-dc-circuit-analysis/index.md))
- Frequency response concepts and Bode plots ([Chapter 11](../11-frequency-response-bode/index.md))

</div>

<div style="background: #E8F5E9; border: 2px solid #A5D6A7; border-radius: 12px; padding: 18px 24px; margin: 2rem 0; box-shadow: 0 2px 8px rgba(76,175,80,0.08);">
<p style="margin:0;color:#2E7D32;font-weight:600;font-size:1.02rem;">
&#128214; Ready to start?
<a href="content/" style="color:#1565C0;font-weight:700;margin-left:0.5rem;">Continue to Chapter Content &rarr;</a>
</p>
</div>

</div>
