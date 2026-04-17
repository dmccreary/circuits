---
title: Chapter 10 Quiz — AC Power Analysis
description: Multiple choice quiz and practice problems for Chapter 10 covering real, reactive, apparent power, and power factor
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 10 Quiz — AC Power Analysis

## Multiple Choice Questions

**1.** A load draws 8 A RMS from a 120 V RMS source at a phase angle of 30°. What is the real power?

- A) 960 W
- B) 831 W
- C) 480 W
- D) 1,109 W

??? success "Answer"
    **B) 831 W**

    \(P = V_{rms} I_{rms}\cos\theta = 120 \times 8 \times \cos 30° = 960 \times 0.866 = 831\) W.

---

**2.** What is the unit of reactive power?

- A) Watt (W)
- B) Volt-Ampere (VA)
- C) Volt-Ampere Reactive (VAR)
- D) Joule (J)

??? success "Answer"
    **C) Volt-Ampere Reactive (VAR)**

    Reactive power Q is measured in VAR (volt-ampere reactive) to distinguish it from real power (watts) and apparent power (VA).

---

**3.** A load has P = 600 W and Q = 800 VAR. What is the apparent power S?

- A) 1,400 VA
- B) 200 VA
- C) 1,000 VA
- D) 700 VA

??? success "Answer"
    **C) 1,000 VA**

    \(S = \sqrt{P^2 + Q^2} = \sqrt{600^2 + 800^2} = \sqrt{360{,}000 + 640{,}000} = \sqrt{1{,}000{,}000} = 1{,}000\) VA.

---

**4.** Using the values in Q3 (P = 600 W, Q = 800 VAR, S = 1,000 VA), what is the power factor?

- A) 0.8 lagging
- B) 0.6 lagging
- C) 0.8 leading
- D) 0.6 leading

??? success "Answer"
    **B) 0.6 lagging**

    \(PF = P/S = 600/1{,}000 = 0.6\). Since Q > 0, the load is inductive (lagging).

---

**5.** A pure capacitor in an AC circuit has which of the following power characteristics?

- A) Real power only
- B) Reactive power only, Q > 0 (absorbs VARs)
- C) Reactive power only, Q < 0 (supplies VARs)
- D) Equal real and reactive power

??? success "Answer"
    **C) Reactive power only, Q < 0 (supplies VARs)**

    A pure capacitor has zero real power (\(P = 0\)). Current leads voltage by 90°, giving negative reactive power — the capacitor acts as a source of VARs rather than a load.

---

**6.** To improve power factor from 0.7 lagging to unity, you should add a _______ in _______ with the load.

- A) Inductor, series
- B) Capacitor, series
- C) Resistor, parallel
- D) Capacitor, parallel

??? success "Answer"
    **D) Capacitor, parallel**

    A parallel capacitor supplies VARs locally to cancel the inductive VARs of the load, improving power factor without affecting the real power delivered to the load.

---

**7.** For maximum power transfer in an AC circuit, the load impedance should be:

- A) Equal to the source impedance: \(Z_L = Z_s\)
- B) The complex conjugate of source impedance: \(Z_L = Z_s^*\)
- C) Zero (short circuit)
- D) Much larger than source impedance

??? success "Answer"
    **B) The complex conjugate of source impedance: \(Z_L = Z_s^*\)**

    Conjugate matching cancels the reactive parts (\(X_L = -X_s\)) and makes the real parts equal (\(R_L = R_s\)), maximizing power transfer.

---

**8.** At the conjugate-matched condition (maximum power transfer), what is the efficiency?

- A) 100%
- B) 75%
- C) 63.2%
- D) 50%

??? success "Answer"
    **D) 50%**

    When \(R_L = R_s\), equal power is dissipated in the load and source resistance, giving 50% efficiency — the same result as in DC circuits.

---

**9.** A motor draws 2,000 VA with a power factor of 0.85 lagging. What is the reactive power?

- A) 1,700 VAR
- B) 1,054 VAR
- C) 300 VAR
- D) 2,353 VAR

??? success "Answer"
    **B) 1,054 VAR**

    \(P = S \times PF = 2{,}000 \times 0.85 = 1{,}700\) W.
    \(Q = \sqrt{S^2 - P^2} = \sqrt{2{,}000^2 - 1{,}700^2} = \sqrt{4{,}000{,}000 - 2{,}890{,}000} = \sqrt{1{,}110{,}000} \approx 1{,}054\) VAR.

---

**10.** Power gain of an amplifier in dB is 20 dB. By what factor is the power amplified?

- A) 20×
- B) 10×
- C) 100×
- D) 40×

??? success "Answer"
    **C) 100×**

    \(A_P(dB) = 10\log_{10}(P_{out}/P_{in})\), so \(20 = 10\log_{10}(A_P)\), giving \(\log_{10}(A_P) = 2\), so \(A_P = 10^2 = 100\).

---

## Practice Problems

**Problem 1: Complete Power Analysis**

A 240 V RMS, 60 Hz source drives a parallel combination of:
- R = 120 Ω (purely resistive)
- \(X_L = 80\) Ω (purely inductive)

Find P, Q, S, and the power factor.

??? success "Solution"
    **Power in each branch (using V = 240 V RMS across both):**

    Resistor: \(P_R = V^2/R = 240^2/120 = 480\) W, \(Q_R = 0\)

    Inductor: \(P_L = 0\), \(Q_L = V^2/X_L = 240^2/80 = 720\) VAR

    **Totals:**

    \(P = 480\) W, \(Q = 720\) VAR

    \(S = \sqrt{480^2 + 720^2} = \sqrt{230{,}400 + 518{,}400} = \sqrt{748{,}800} \approx 865\) VA

    \(PF = P/S = 480/865 \approx 0.555\) lagging

---

**Problem 2: Power Factor Correction**

The circuit in Problem 1 (240 V, 60 Hz, P = 480 W, Q = 720 VAR) needs to be corrected to PF = 0.95 lagging.

a) Find the required capacitive reactive power \(Q_C\).  
b) Find the required capacitance C.  
c) Find the new line current after correction.

??? success "Solution"
    **a) Required \(Q_C\):**

    Target: \(\theta_2 = \cos^{-1}(0.95) = 18.19°\), \(\tan\theta_2 = 0.329\)

    \(Q_{new} = P\tan\theta_2 = 480 \times 0.329 = 157.9\) VAR

    \(Q_C = Q_{old} - Q_{new} = 720 - 157.9 = 562.1\) VAR (capacitor must supply this)

    **b) Capacitance:**

    \(C = Q_C/(\omega V^2) = 562.1/(2\pi \times 60 \times 240^2) = 562.1/271{,}433 \approx 2.07\) μF

    **c) New line current:**

    \(S_{new} = P/PF_{new} = 480/0.95 = 505.3\) VA

    \(I_{new} = S_{new}/V = 505.3/240 = 2.11\) A

    Before correction: \(I_{old} = 865/240 = 3.60\) A — a 41% reduction in line current!

---

**Problem 3: Maximum Power Transfer**

A source has Thévenin equivalent \(V_s = 10\angle 0°\) V and \(Z_s = 3 + j4\) Ω.

a) What load impedance maximizes power transfer?  
b) What is the maximum power delivered to the load?  
c) What is the efficiency?

??? success "Solution"
    **a)** \(Z_L = Z_s^* = 3 - j4\) Ω (conjugate of source impedance)

    **b)** At conjugate matching, reactances cancel. The circuit becomes \(V_s\) driving \(R_s + R_L = 3 + 3 = 6\) Ω:

    \(I = |V_s|/(R_s + R_L) = 10/6 = 1.667\) A RMS

    \(P_{max} = I^2 R_L = (1.667)^2 \times 3 = 8.33\) W

    Or: \(P_{max} = |V_s|^2/(4R_s) = 100/(4 \times 3) = 8.33\) W ✓

    **c)** \(P_{source} = I^2 \times R_s = (1.667)^2 \times 3 = 8.33\) W (same as load)

    Efficiency = \(8.33/(8.33 + 8.33) = 50\%\)

---

**Problem 4: Complex Power Calculation**

A load has impedance \(Z = 6 + j8\) Ω and is connected to a 100 V RMS source.

a) Find the current phasor \(\mathbf{I}\).  
b) Calculate the complex power \(\mathbf{S} = \mathbf{V}\mathbf{I}^*\).  
c) Verify using \(\mathbf{S} = I_{rms}^2 Z\).  
d) State P, Q, S, and PF.

??? success "Solution"
    **a)** \(|Z| = \sqrt{6^2 + 8^2} = 10\) Ω, \(\theta_Z = \tan^{-1}(8/6) = 53.13°\)

    Let \(\mathbf{V} = 100\angle 0°\) V (reference).

    \(\mathbf{I} = \mathbf{V}/Z = 100\angle 0° / 10\angle 53.13° = 10\angle -53.13°\) A

    So \(I_{rms} = 10\) A, current lags voltage by 53.13°.

    **b)** \(\mathbf{I}^* = 10\angle +53.13° = 10(0.6 + j0.8) = 6 + j8\) A

    \(\mathbf{S} = \mathbf{V}\mathbf{I}^* = 100\angle 0° \times (6+j8) = 600 + j800\) VA

    **c)** \(\mathbf{S} = I^2 Z = 100 \times (6+j8) = 600 + j800\) VA ✓

    **d)** \(P = 600\) W, \(Q = 800\) VAR (lagging), \(S = \sqrt{600^2+800^2} = 1{,}000\) VA

    \(PF = P/S = 0.6\) lagging

</div>
