---
title: Chapter 7 Practice Problems — Second-Order RLC Circuits
description: Practice problems with hints for Chapter 7 covering the characteristic equation, damping ratio, natural frequency, overdamped/underdamped/critically damped responses, and quality factor
---

<div class="unit1-styled" markdown>

# Chapter 7 Practice Problems — Second-Order RLC Circuits

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — Natural Frequency and Characteristic Equation

A series RLC circuit has \(R = 40\) Ω, \(L = 10\) mH, and \(C = 1\) μF.

**(a)** Calculate the undamped natural frequency \(\omega_0\) in rad/s and \(f_0\) in Hz.

**(b)** Calculate the damping coefficient \(\alpha\) for the series configuration.

**(c)** Write the characteristic equation \(s^2 + 2\alpha s + \omega_0^2 = 0\) and find its two roots \(s_1\) and \(s_2\).

??? tip "Hint"
    **(a)** Natural frequency: \(\omega_0 = 1/\sqrt{LC}\). Convert L to henrys and C to farads before substituting. Then \(f_0 = \omega_0 / (2\pi)\).

    **(b)** For a series RLC: \(\alpha = R / (2L)\). Make sure L is in henrys.

    **(c)** Substitute \(\alpha\) and \(\omega_0\) into the quadratic formula: \(s_{1,2} = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}\). Compare \(\alpha^2\) to \(\omega_0^2\) — this comparison determines the damping regime.

---

## Problem 2 — Damping Classification

Three series RLC circuits all share \(L = 100\) mH and \(C = 10\) μF but have different resistances.

**(a)** For \(R = 100\) Ω: compute \(\alpha\), \(\omega_0\), and \(\zeta = \alpha/\omega_0\). Classify the response.

**(b)** Find the value of \(R\) that produces critical damping (\(\zeta = 1\)).

**(c)** For \(R = 20\) Ω: classify the response and find the damped natural frequency \(\omega_d = \omega_0\sqrt{1 - \zeta^2}\).

??? tip "Hint"
    **(a)** \(\omega_0 = 1/\sqrt{LC}\) is the same for all three. Compute \(\alpha = R/(2L)\) for R = 100 Ω, then \(\zeta = \alpha/\omega_0\). Compare \(\zeta\) to 1 to classify: overdamped (\(\zeta > 1\)), critically damped (\(\zeta = 1\)), or underdamped (\(\zeta < 1\)).

    **(b)** For critical damping, \(\alpha = \omega_0\), so \(R/(2L) = \omega_0\). Solve for R: \(R_{crit} = 2L\omega_0 = 2\sqrt{L/C}\).

    **(c)** With R = 20 Ω, compute \(\alpha\) and \(\zeta\). Since \(\zeta < 1\), the circuit is underdamped and oscillates at \(\omega_d = \omega_0\sqrt{1-\zeta^2}\).

---

## Problem 3 — Underdamped Response: Overshoot and Settling Time

An underdamped series RLC circuit has \(\omega_0 = 1000\) rad/s and \(\zeta = 0.2\).

**(a)** Calculate the percent overshoot using \(PO = e^{-\pi\zeta/\sqrt{1-\zeta^2}} \times 100\%\).

**(b)** Estimate the settling time (to within 2% of the final value) using \(t_s \approx 4/(\zeta\omega_0)\).

**(c)** What value of \(\zeta\) would reduce the overshoot to approximately 5%? (Hint: set up the overshoot equation and solve for \(\zeta\) — a trial-and-error or logarithmic approach works.)

??? tip "Hint"
    **(a)** Substitute \(\zeta = 0.2\) and compute the exponent. \(\sqrt{1 - \zeta^2} = \sqrt{1 - 0.04} = \sqrt{0.96}\). The result should be a sizeable overshoot — underdamped circuits with low \(\zeta\) overshoot significantly.

    **(b)** This is a quick estimate: \(t_s = 4/(\alpha) = 4/(\zeta\omega_0)\). The response is considered settled when it stays within ±2% of the final value.

    **(c)** Set \(PO = 0.05\) and solve \(0.05 = e^{-\pi\zeta/\sqrt{1-\zeta^2}}\). Take the natural log: \(\ln(0.05) = -\pi\zeta/\sqrt{1-\zeta^2}\). This is transcendental — try \(\zeta \approx 0.69\) as a starting estimate and verify.

---

## Problem 4 — Resonance and Quality Factor

A parallel RLC circuit has \(R = 500\) Ω, \(L = 2\) mH, and \(C = 5\) nF.

**(a)** Calculate the resonant frequency \(f_0\) in kHz.

**(b)** Calculate the quality factor Q for the parallel circuit using \(Q = R\sqrt{C/L}\).

**(c)** Find the bandwidth BW = \(f_0 / Q\) in kHz and the half-power frequencies \(f_1 = f_0 - BW/2\) and \(f_2 = f_0 + BW/2\).

??? tip "Hint"
    **(a)** \(\omega_0 = 1/\sqrt{LC}\). Convert L and C to base SI units (H and F). Then \(f_0 = \omega_0/(2\pi)\) in Hz; divide by 1000 for kHz.

    **(b)** For a parallel RLC, \(Q = R\sqrt{C/L}\). A high Q means sharp resonance (narrow bandwidth). High R in a parallel circuit means less energy loss per cycle.

    **(c)** \(BW = f_0/Q\). The half-power (−3 dB) frequencies are approximately \(f_0 \pm BW/2\) for high-Q circuits. Verify that \(Q = f_0/BW\) gives back the Q you calculated.

---

</div>
