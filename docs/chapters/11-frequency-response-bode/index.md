---
title: Chapter 11 — Frequency Response and Bode Plots
description: Transfer functions, Bode plots, cutoff frequency, and filter types
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 11 — Frequency Response and Bode Plots

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

Every circuit has a personality when it comes to frequency. A subwoofer amplifier loves low frequencies and ignores high ones. A radio receiver singles out one narrow slice of the spectrum and ignores everything else. A noise filter strips out high-frequency interference while leaving your signal untouched. Understanding *how* circuits respond across a range of frequencies — not just at a single point — is what frequency response analysis is all about.

This chapter builds on your phasor and impedance skills to develop one of the most powerful tools in electrical engineering: the **Bode plot**. Named after Hendrik Bode of Bell Labs, Bode plots use logarithmic scales to compress huge frequency ranges into readable graphs and reveal the magnitude and phase response of any linear circuit. You will learn how the **transfer function** \(H(j\omega)\) encodes a circuit's complete frequency behavior, how **poles and zeros** shape that response, and how to use asymptotic straight-line approximations to sketch accurate Bode plots without solving complex algebra each time.

By the end of this chapter, you will be able to identify all four fundamental filter types (low-pass, high-pass, band-pass, and band-reject/notch), derive their cutoff frequencies, calculate roll-off rates, and design simple RC and RLC filter circuits for a given specification. These skills are essential for audio engineering, communications, control systems, and virtually every domain where signals of different frequencies must be treated differently.

**Key Takeaways**

1. The transfer function \(H(j\omega) = V_{out}/V_{in}\) is a complex quantity whose magnitude \(|H|\) and phase \(\phi(\omega)\) fully describe frequency response; the cutoff (half-power) frequency satisfies \(|H(j\omega_c)| = 1/\sqrt{2} \approx 0.707\).
2. Bode plots use dB magnitude (\(20\log_{10}|H|\)) vs.\ log frequency and phase vs.\ log frequency; each pole reduces slope by \(-20\) dB/decade and each zero increases it by \(+20\) dB/decade.
3. For a first-order RC filter the cutoff frequency is \(f_c = \dfrac{1}{2\pi RC}\) and the roll-off is \(-20n\) dB/decade for an \(n\)th-order filter.

</details>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
This chapter introduces frequency response analysis — the study of how a circuit's output magnitude and phase vary with input frequency. Students will learn to derive and interpret transfer functions, construct Bode magnitude and phase plots using asymptotic approximations, and identify the cutoff frequency, roll-off rate, and filter type for any linear circuit. The chapter concludes with practical RC and RLC filter designs and an introduction to poles, zeros, and filter order as tools for shaping frequency response.
</p>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Concepts Covered</h2>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

<ul style="list-style:none;padding-left:0.5rem;margin:0;">
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Frequency Response</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Transfer Function</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Magnitude Response</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Phase Response</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Bode Plot</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Bode Magnitude Plot</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Bode Phase Plot</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Decade</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Octave</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Cutoff Frequency</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Corner Frequency</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Half-Power Point</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Roll-Off Rate</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Asymptotic Approximation</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Poles and Zeros</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Filter</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Low-Pass Filter</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>High-Pass Filter</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Band-Pass Filter</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Band-Reject Filter</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Notch Filter</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span>Filter Order</li>
</ul>

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Prerequisites</h2>

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Before beginning this chapter, students should have:

<ul style="list-style:none;padding-left:0.5rem;margin:0;">
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span><a href="../05-passive-components/index.md">Chapter 5: Passive Components — Resistors, Capacitors, and Inductors</a> — familiarity with RC and RL time constants and impedance of reactive elements</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span><a href="../09-phasors-complex-impedance/index.md">Chapter 9: Phasors and Complex Impedance</a> — ability to work with complex impedances \(Z_C = 1/(j\omega C)\) and \(Z_L = j\omega L\) and use voltage-divider analysis in the phasor domain</li>
<li style="margin-bottom:0.6rem;line-height:1.7;color:#333;"><span style="color:#5A3EED;font-weight:700;margin-right:0.5rem;">&#9679;</span><a href="../10-ac-power-analysis/index.md">Chapter 10: AC Power Analysis</a> — understanding of average power, RMS values, and the significance of the \(-3\) dB (half-power) point</li>
</ul>

</div>

<div style="background: #E8F5E9; border: 2px solid #A5D6A7; border-radius: 12px; padding: 18px 24px; margin: 2rem 0; box-shadow: 0 2px 8px rgba(76,175,80,0.08);">
<p style="margin:0;color:#2E7D32;font-weight:600;font-size:1.02rem;">
&#128214; Ready to start?
<a href="content/" style="color:#1565C0;font-weight:700;margin-left:0.5rem;">Continue to Chapter Content &rarr;</a>
</p>
</div>

</div>
