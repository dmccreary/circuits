---
title: "Chapter 9 — Phasors and Complex Impedance"
description: "Transform AC circuit analysis from differential equations to simple algebra using phasors and impedance"
---

<div class="unit1-styled" markdown>

# Chapter 9 — Phasors and Complex Impedance

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

This chapter introduces phasors — rotating vectors that elegantly represent sinusoidal signals — and shows how they transform differential equations into algebraic ones. Students will learn about impedance, the AC equivalent of resistance, and how capacitors and inductors create frequency-dependent reactance. The chapter covers the impedance triangle, admittance, and the phasor domain approach to AC circuit analysis. Mastering phasor techniques is essential for efficient analysis of AC circuits.

</details>

## Summary

### Key Concepts

- A **phasor** is a complex number representing a sinusoidal signal by its amplitude and phase angle
- **Impedance** Z (Ω) is the AC generalization of resistance: \(\mathbf{Z} = \mathbf{V}/\mathbf{I}\) in the phasor domain
- **Resistor**: \(Z_R = R\) — purely real, no frequency dependence
- **Capacitor**: \(Z_C = 1/(j\omega C)\) — decreases with frequency; capacitor passes high frequencies
- **Inductor**: \(Z_L = j\omega L\) — increases with frequency; inductor blocks high frequencies
- **Reactance** X: imaginary part of impedance; **admittance** Y = 1/Z
- Phasor analysis replaces differential equations with straightforward complex algebra

### Important Equations

\[ \mathbf{Z}_R = R \qquad \mathbf{Z}_C = \frac{1}{j\omega C} \qquad \mathbf{Z}_L = j\omega L \]

\[ \mathbf{V} = \mathbf{Z}\,\mathbf{I} \quad \text{(phasor Ohm's Law)} \qquad \mathbf{Z}_{series} = \mathbf{Z}_1 + \mathbf{Z}_2 \qquad \mathbf{Y} = \frac{1}{\mathbf{Z}} \]

### What You Should Understand

- Phasors are only valid for **sinusoidal steady-state** at a single frequency — not for transients
- Why Z_C decreases at high frequency: capacitor impedance → 0 (short) as f → ∞
- Why Z_L increases at high frequency: inductor impedance → ∞ (open) as f → ∞
- How to draw an impedance triangle and read off magnitude, resistance, and reactance

### Applications

- AC circuit analysis using the same node/mesh methods as DC (replace R with Z)
- Filter behavior prediction from impedance vs. frequency
- Impedance matching in RF and audio systems
- Power factor analysis (real vs. reactive components of Z)

### Quick Review Checklist

- [ ] I can write the impedance of R, C, and L at any given frequency
- [ ] I can apply phasor Ohm's Law and phasor voltage/current dividers
- [ ] I can find total impedance for series and parallel combinations of R, L, C
- [ ] I can determine whether a circuit is inductive or capacitive from the sign of the phase angle

## Concepts Covered

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<ul style="list-style:none;padding-left:0.5rem;margin:0;">
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Phasor</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Phasor Diagram</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Phasor Addition</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Impedance</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Reactance</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Capacitive Reactance</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Inductive Reactance</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Admittance</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Susceptance</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>AC Resistance</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Impedance Triangle</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Complex Impedance</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>AC Circuit Analysis</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Phasor Domain</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Resonance</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Series Resonance</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Parallel Resonance</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Selectivity</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Bandwidth</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Passband</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Stopband</li>
</ul>
</div>

## Prerequisites

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color:#555;margin-bottom:0.8rem;line-height:1.75;">Before beginning this chapter, students should have completed:</p>
<ul style="list-style:none;padding-left:0.5rem;margin:0;">
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span><a href="../05-passive-components/index.md">Chapter 5: Passive Components: Resistors, Capacitors, and Inductors</a></li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span><a href="../07-second-order-rlc-circuits/index.md">Chapter 7: Second-Order Circuits and RLC Behavior</a></li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span><a href="../08-ac-signals-sinusoidal/index.md">Chapter 8: AC Signals and Sinusoidal Waveforms</a></li>
</ul>
</div>

<div style="background: #E8F5E9; border: 2px solid #A5D6A7; border-radius: 12px; padding: 18px 24px; margin: 2rem 0; box-shadow: 0 2px 8px rgba(76,175,80,0.08);">
<p style="margin:0;color:#2E7D32;font-weight:600;font-size:1.02rem;">
&#128214; Ready to start?
<a href="content/" style="color:#1565C0;font-weight:700;margin-left:0.5rem;">Continue to Chapter Content &rarr;</a>
</p>
</div>

</div>
