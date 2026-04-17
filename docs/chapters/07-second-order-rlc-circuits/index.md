---
title: Chapter 7 — Second-Order RLC Circuits
description: Damping, natural frequency, resonance, and quality factor in circuits with both capacitors and inductors
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 7 — Second-Order RLC Circuits

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

If first-order RC and RL circuits are like a polite conversation — one thing leads smoothly to another — then second-order RLC circuits are like a heated debate. Things can swing back and forth, overshoot their targets, or even oscillate indefinitely. Welcome to the world where circuits get *dramatic*.

When both a capacitor and an inductor share the same circuit, energy sloshes back and forth between the electric field of the capacitor and the magnetic field of the inductor. Add some resistance, and the oscillation gradually dies out. The mathematics that describes this behavior — the second-order differential equation — is the same mathematics that governs car suspensions, tuning forks, radio receivers, and earthquake dampers.

This chapter introduces the three damping regimes (overdamped, critically damped, underdamped), the natural frequency \(\omega_0\), the damping ratio \(\zeta\), and the quality factor \(Q\). It culminates in resonance — the remarkable phenomenon where an RLC circuit amplifies signals at a specific frequency and rejects all others.

**Key Takeaways**

1. The damping ratio \(\zeta = \alpha/\omega_0\) determines the character of the response: overdamped (\(\zeta > 1\)) creeps slowly, critically damped (\(\zeta = 1\)) settles fastest without overshoot, and underdamped (\(\zeta < 1\)) oscillates.
2. The natural frequency \(\omega_0 = 1/\sqrt{LC}\) depends only on L and C; resistance controls how quickly oscillations die but not their frequency.
3. The quality factor \(Q = \omega_0 L / R = 1/(2\zeta)\) quantifies sharpness of resonance: higher Q means narrower bandwidth and more selective frequency response.

</details>

## Summary

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
This chapter analyzes circuits containing both inductors and capacitors, whose behavior is governed by second-order differential equations. Students will learn how to classify circuit responses as overdamped, underdamped, or critically damped based on the relationship between the damping coefficient and natural frequency. The chapter covers series and parallel RLC configurations, the quality factor, resonant frequency, bandwidth, and the physical phenomenon of resonance. Interactive simulations let students observe how changing R, L, and C shifts damping behavior and resonance peaks in real time.
</p>
</div>

## Concepts Covered

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

1. Second-Order Circuits
2. RLC Circuit
3. Series RLC
4. Parallel RLC
5. Characteristic Equation
6. Damping Coefficient
7. Natural Frequency
8. Damping Ratio
9. Overdamped Response
10. Critically Damped Response
11. Underdamped Response
12. Damped Natural Frequency
13. Percent Overshoot
14. Settling Time
15. Resonant Frequency
16. Quality Factor
17. Bandwidth
18. Pulse Response

</div>

---

## Prerequisites

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Before beginning this chapter, students should have:

- Mastery of capacitor and inductor V-I relationships and energy storage ([Chapter 5](../05-passive-components/index.md))
- Understanding of first-order transient analysis, time constants, and exponential responses ([Chapter 6](../06-transient-analysis-rc-rl/index.md))
- Familiarity with complex numbers (for damped natural frequency calculations)

</div>

</div>
