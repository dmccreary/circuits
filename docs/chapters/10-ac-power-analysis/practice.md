---
title: Chapter 10 Practice Problems — AC Power Analysis
description: Practice problems with hints for Chapter 10 covering real, reactive, apparent power, power factor, power factor correction, and maximum power transfer
---

<div class="unit1-styled" markdown>

# Chapter 10 Practice Problems — AC Power Analysis

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — Real, Reactive, and Apparent Power

A load is connected to a 120 V (rms), 60 Hz source. The load draws 8 A (rms) at a power factor of 0.75 lagging.

**(a)** Find the apparent power S.

**(b)** Find the real power P.

**(c)** Find the reactive power Q.

**(d)** Is the load primarily inductive or capacitive?

??? tip "Hint"
    **(a)** Apparent power is simply \(S = V_{rms} \cdot I_{rms}\) in volt-amperes (VA).

    **(b)** Real power uses the power factor: \(P = S \cdot \text{PF} = S\cos\theta\).

    **(c)** Use the power triangle: \(Q = \sqrt{S^2 - P^2}\), or equivalently \(Q = S\sin\theta\). First find \(\theta = \cos^{-1}(0.75)\).

    **(d)** A lagging power factor means current lags voltage — think about which passive component causes current to lag.

---

## Problem 2 — Power in a Series RL Load

A series RL load has R = 40 Ω and \(X_L = 30\) Ω. It is connected to a 200 V (rms) source.

**(a)** Find the impedance magnitude |Z| and phase angle θ.

**(b)** Find the rms current.

**(c)** Calculate P, Q, and S.

**(d)** Express complex power \(\mathbf{S}\) in rectangular form.

??? tip "Hint"
    **(a)** For a series RL, \(Z = R + jX_L\). The magnitude is \(|Z| = \sqrt{R^2 + X_L^2}\) and the angle is \(\theta = \arctan(X_L/R)\).

    **(b)** \(I_{rms} = V_{rms}/|Z|\).

    **(c)** \(P = I_{rms}^2 R\), \(Q = I_{rms}^2 X_L\), \(S = I_{rms}^2 |Z|\). Verify that \(S^2 = P^2 + Q^2\).

    **(d)** Complex power is \(\mathbf{S} = P + jQ\). For an inductive load Q is positive.

---

## Problem 3 — Power Factor Correction

An industrial load draws 10 kW at 0.60 lagging power factor from a 480 V (rms), 60 Hz supply.

**(a)** Find the current drawn before correction.

**(b)** Find the reactive power Q before correction.

**(c)** What value of capacitor (in μF) must be placed in parallel with the load to raise the power factor to 0.95 lagging?

**(d)** Find the new line current after correction.

??? tip "Hint"
    **(a)** \(P = V_{rms} I_{rms} \cos\theta\). Solve for \(I_{rms}\).

    **(b)** \(Q_{before} = P \tan\theta_{before}\), where \(\theta_{before} = \cos^{-1}(0.60)\).

    **(c)** The capacitor must supply reactive power \(Q_C = Q_{before} - Q_{after}\), where \(Q_{after} = P\tan(\cos^{-1}(0.95))\). Then \(Q_C = V_{rms}^2 / X_C\) and \(X_C = 1/(\omega C)\). Solve for C.

    **(d)** With the corrected power factor, re-apply \(P = V_{rms} I_{new} \cos\theta_{new}\). The real power P does not change.

---

## Problem 4 — Maximum Power Transfer in AC

A source has Thévenin equivalent \(V_{th} = 100\angle 0°\) V and \(Z_{th} = 4 + j3\) Ω.

**(a)** What load impedance \(Z_L\) maximizes power delivered to the load?

**(b)** What is the maximum average power transferred to the load?

**(c)** If the load is constrained to be purely resistive, what value of \(R_L\) maximizes transfer, and what is that power?

??? tip "Hint"
    **(a)** Maximum power transfer in AC occurs when the load is the **complex conjugate** of the source impedance: \(Z_L = Z_{th}^*\). If \(Z_{th} = R_{th} + jX_{th}\), then \(Z_L = R_{th} - jX_{th}\).

    **(b)** At conjugate match, the reactances cancel and the circuit reduces to purely resistive. The current is \(I = V_{th}/(2R_{th})\) and \(P_{max} = \frac{|V_{th}|^2}{8R_{th}}\).

    **(c)** For a purely resistive load, the optimal \(R_L = |Z_{th}|\). Then compute I and \(P = I^2 R_L\).

---

## Problem 5 — Power Triangle and Efficiency

A transformer supplies three parallel loads:
- Load 1: 2 kW at unity power factor
- Load 2: 3 kVA at 0.80 lagging power factor
- Load 3: 1.5 kVAR capacitive (purely reactive, leading)

**(a)** Find the total real power \(P_{total}\).

**(b)** Find the total reactive power \(Q_{total}\) (watch signs: inductive Q > 0, capacitive Q < 0).

**(c)** Find the total apparent power \(S_{total}\) and overall power factor.

??? tip "Hint"
    **(a)** Real powers add directly. Convert Load 2: \(P_2 = S_2 \cdot \text{PF}_2\).

    **(b)** Reactive powers also add algebraically. For Load 2: \(Q_2 = S_2 \sin\theta_2\) (lagging → positive). Load 3 is capacitive: \(Q_3 = -1.5\) kVAR. Load 1 has unity PF so \(Q_1 = 0\).

    **(c)** \(S_{total} = \sqrt{P_{total}^2 + Q_{total}^2}\) and \(\text{PF} = P_{total}/S_{total}\). Note that combining an inductive and a capacitive load partially cancels reactive power, improving the overall power factor.

---

</div>
