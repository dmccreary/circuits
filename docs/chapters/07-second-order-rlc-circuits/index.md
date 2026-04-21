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

### Key Concepts

- RLC circuits are governed by second-order differential equations with characteristic roots \(s_1, s_2\)
- The **damping ratio** ζ (or α vs. ω₀) determines the response type:
    - **Overdamped** (ζ > 1): two distinct real roots; exponential decay, no oscillation
    - **Critically damped** (ζ = 1): repeated real root; fastest non-oscillatory settling
    - **Underdamped** (ζ < 1): complex conjugate roots; oscillatory decay (ringing)
- **Resonance** occurs when \(Z_L = Z_C\): inductive and capacitive reactances cancel
- **Quality factor** Q: sharpness of resonance peak; higher Q = narrower bandwidth
- **Bandwidth** BW = f₀/Q: the frequency range around resonance where power exceeds half-maximum

### Important Equations

\[ \omega_0 = \frac{1}{\sqrt{LC}} \qquad \alpha = \frac{R}{2L} \text{ (series)} \qquad \zeta = \frac{\alpha}{\omega_0} \]

\[ Q = \frac{\omega_0 L}{R} = \frac{1}{2\zeta} \quad \text{(series RLC)} \qquad BW = \frac{f_0}{Q} \]

### What You Should Understand

- How to classify the response type given R, L, and C values
- Why critically damped gives the fastest settling without overshoot — often the design target
- The physical meaning of Q: approximately how many oscillation cycles before the energy dissipates
- How series and parallel RLC topologies differ in their resonance behavior and impedance characteristics

### Applications

- Radio and TV tuning circuits (selective resonance to pick a station)
- Switching power supply LC output filters
- Crystal oscillators and clock generation
- EMI filter design for noise suppression

### Quick Review Checklist

- [ ] I can calculate ω₀, α, and ζ for a given RLC circuit
- [ ] I can classify the response as overdamped, critically damped, or underdamped
- [ ] I can sketch all three response types qualitatively and label key features
- [ ] I can calculate the resonant frequency and bandwidth of a band-pass RLC circuit

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

## Interactive MicroSims

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

This chapter includes three interactive simulations. Use them alongside the reading to explore concepts hands-on.

| Section | Simulation | What it shows |
|---------|-----------|---------------|
| 7.3 | [RLC Circuit Explorer](../../sims/rlc-circuit/index.md) | Series and parallel RLC step response; adjustable R, L, C |
| 7.5 | [Natural Frequency Calculator](../../sims/natural-frequency-calculator/index.md) | ω₀ and f₀ from L and C; undamped oscillation visualized |
| 7.10 | [Resonance Comparison](../../sims/resonance-comparison/index.md) | Series vs parallel resonance: impedance and current vs frequency |

</div>

### RLC Circuit Explorer — Interactive Walkthrough

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/rlc-circuit/main.html" width="100%"
    style="height:550px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>
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
