---
title: Chapter 15 — Audio Applications and Amplifiers
description: Preamplifiers, power amplifiers, SNR, distortion, and audio quality metrics
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 15 — Audio Applications and Amplifiers

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

Audio electronics sits at the intersection of physics, mathematics, and human perception. Every microphone, guitar amplifier, home stereo, and hearing aid relies on a chain of carefully designed circuits that capture, condition, amplify, and deliver sound with minimum added noise and distortion. Understanding how these systems work — and how to quantify their performance — is essential for any electronics engineer working in consumer products, professional audio, communications, or medical devices.

This chapter traces the complete audio signal chain from microphone to speaker. It begins with preamplifiers: high-impedance, low-noise circuits that raise delicate microphone and instrument signals to a usable level. It then examines power amplifiers and their trade-offs between efficiency and linearity, covering the three dominant classes — Class A, AB, and D. The chapter develops the mathematical tools for measuring system quality: signal-to-noise ratio, noise floor, thermal noise, total harmonic distortion, intermodulation distortion, and clipping behavior.

The chapter closes with practical design considerations — grounding strategies, cable shielding, and balanced connections — that separate a functional audio circuit from a professional one. Students will leave with both the vocabulary and the quantitative tools to specify, analyze, and design real audio systems.

**Key Takeaways**

1. Every audio system is a signal chain; each stage adds gain, noise, and potential distortion, and the preamplifier's noise performance dominates the chain's overall SNR because its noise is amplified by every subsequent stage.
2. Distortion — whether harmonic (THD) or intermodulation (IMD) — is mathematically characterized by the non-linear terms in a system's transfer function; minimizing it requires operating amplifiers well below their clipping threshold.
3. Power amplifier efficiency and linearity are fundamentally in tension: Class A is most linear but least efficient (~25%), Class AB balances both (~60%), and Class D achieves >90% efficiency by switching rather than linearly amplifying, at the cost of greater complexity.

</details>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
This chapter applies the amplifier and signal-analysis concepts from Chapters 12–14 to the practical domain of audio electronics. Students will understand the complete audio signal chain — from microphone to speaker — and learn to analyze each stage for gain, noise, and distortion. Key quantitative tools include signal-to-noise ratio (SNR), thermal noise calculations, total harmonic distortion (THD), and intermodulation distortion (IMD). Power amplifier classes (A, AB, D) are compared for efficiency and linearity. The chapter concludes with professional grounding and shielding techniques that control noise in real systems.
</p>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Concepts Covered</h2>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

1. Audio Amplifier
2. Preamplifier
3. Power Amplifier
4. Signal-to-Noise Ratio
5. Noise Floor
6. Thermal Noise
7. Audio Distortion
8. Harmonic Distortion
9. THD
10. Intermodulation Distortion
11. Clipping

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Prerequisites</h2>

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Before beginning this chapter, students should have:

- Filter design and audio signals ([Chapter 12](../12-filters-resonance/index.md))
- Operational amplifiers and gain ([Chapter 13](../13-operational-amplifiers/index.md))
- Fourier analysis and harmonic content ([Chapter 14](../14-signals-audio-lab/index.md))

</div>

<div style="background: #E8F5E9; border: 2px solid #A5D6A7; border-radius: 12px; padding: 18px 24px; margin: 2rem 0; box-shadow: 0 2px 8px rgba(76,175,80,0.08);">
<p style="margin:0;color:#2E7D32;font-weight:600;font-size:1.02rem;">
&#128214; Ready to start?
<a href="content/" style="color:#1565C0;font-weight:700;margin-left:0.5rem;">Continue to Chapter Content &rarr;</a>
</p>
</div>

</div>
