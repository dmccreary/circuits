---
title: Chapter 11 Practice Problems — Frequency Response and Bode Plots
description: Practice problems with hints for Chapter 11 covering transfer functions, cutoff frequency, Bode magnitude and phase plots, poles, zeros, and roll-off rate
---

<div class="unit1-styled" markdown>

# Chapter 11 Practice Problems — Frequency Response and Bode Plots

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — First-Order RC Low-Pass Filter

An RC low-pass filter has R = 10 kΩ and C = 15.9 nF.

**(a)** Derive the transfer function \(H(j\omega) = V_{out}/V_{in}\) using the voltage divider rule with impedances.

**(b)** Find the cutoff frequency \(f_c\) in Hz.

**(c)** At \(f = f_c\), what is \(|H|\) in dB?

**(d)** Sketch the asymptotic Bode magnitude plot, labeling the corner frequency and the slope beyond \(f_c\).

??? tip "Hint"
    **(a)** Treat the capacitor as impedance \(Z_C = 1/(j\omega C)\). Apply the voltage divider: \(H = Z_C / (R + Z_C)\). Simplify to the form \(H = 1/(1 + j\omega/\omega_c)\).

    **(b)** The cutoff frequency is where \(|H| = 1/\sqrt{2}\), which occurs at \(\omega_c = 1/(RC)\), so \(f_c = 1/(2\pi RC)\).

    **(c)** At \(\omega = \omega_c\): \(|H| = 1/\sqrt{2}\). Convert to dB: \(20\log_{10}(1/\sqrt{2}) = -3\) dB.

    **(d)** The asymptotic Bode plot is flat (0 dB) below \(f_c\), then falls at −20 dB/decade above \(f_c\). The exact response is 3 dB below the asymptote exactly at \(f_c\).

---

## Problem 2 — High-Pass Filter Transfer Function

An RC high-pass filter has R = 4.7 kΩ and C = 33 nF. The output is taken across R.

**(a)** Write the transfer function \(H(j\omega)\).

**(b)** Find \(f_c\).

**(c)** At \(f = f_c/10\) (one decade below cutoff), estimate \(|H|\) in dB using the asymptotic approximation.

**(d)** What is the phase angle of H at \(f = f_c\)?

??? tip "Hint"
    **(a)** Output is across R, not C. The voltage divider gives \(H = R/(R + 1/(j\omega C))\). Multiply numerator and denominator by \(j\omega C\) and simplify to the standard high-pass form \(H = (j\omega/\omega_c)/(1 + j\omega/\omega_c)\).

    **(b)** Same formula: \(f_c = 1/(2\pi RC)\).

    **(c)** The asymptote below \(f_c\) rises at +20 dB/decade. At one decade below cutoff, the asymptote predicts −20 dB. (The exact value differs by ~3 dB only near the corner.)

    **(d)** At \(\omega = \omega_c\), the high-pass transfer function has angle \(\angle H = 90° - \arctan(1) = 45°\). Think about which way the angle shifts for a high-pass vs. low-pass filter.

---

## Problem 3 — Bode Plot from Transfer Function

A circuit has transfer function:

\[H(j\omega) = \frac{j\omega / 1000}{1 + j\omega / 1000}\]

**(a)** What type of filter is this?

**(b)** Identify the corner frequency in rad/s and Hz.

**(c)** Sketch the asymptotic Bode magnitude plot from 10 to 100,000 rad/s. Label slopes and key values.

**(d)** At \(\omega = 100\) rad/s and \(\omega = 10{,}000\) rad/s, estimate \(|H|\) in dB.

??? tip "Hint"
    **(a)** Examine what happens at \(\omega \to 0\) and \(\omega \to \infty\). A numerator with \(j\omega\) means the gain is low at DC and increases with frequency.

    **(b)** The corner is where the denominator term \(j\omega/\omega_c = 1\), so \(\omega_c = 1000\) rad/s. Convert with \(f_c = \omega_c/(2\pi)\).

    **(c)** Below \(\omega_c\): the \(j\omega/\omega_c\) term dominates and the slope is +20 dB/decade. Above \(\omega_c\): numerator and denominator both grow with \(\omega\), so the slope becomes 0 dB (flat).

    **(d)** Use the asymptotic slopes: at 100 rad/s (one decade below \(\omega_c\)), the asymptote gives −20 dB. At 10,000 rad/s (one decade above), the response is near 0 dB.

---

## Problem 4 — Identifying Filter Type and Order

You measure the frequency response of an unknown filter and observe:
- At 100 Hz: \(|H| \approx 0\) dB
- At 10 kHz: \(|H| \approx -40\) dB
- The phase shifts from 0° to −180°

**(a)** What type of filter is this (low-pass, high-pass, band-pass, band-reject)?

**(b)** What is the filter order? Justify from the roll-off rate.

**(c)** Estimate the cutoff frequency \(f_c\). Show your reasoning from the given data.

??? tip "Hint"
    **(a)** The gain is flat at low frequency and rolls off at high frequency. What type of filter passes low frequencies and attenuates high ones?

    **(b)** The roll-off between 100 Hz and 10 kHz is two decades (100× in frequency). Compute the dB change per decade. Recall that a first-order filter rolls off at −20 dB/decade; each additional order adds another −20 dB/decade.

    **(c)** The cutoff is where the roll-off begins (−3 dB point). With a −40 dB/decade slope, the response is −40 dB at 10 kHz. Work backwards: at −3 dB, how far up from −40 dB are you, and how many decades backward does that place \(f_c\)?

---

## Problem 5 — Poles, Zeros, and Gain

A transfer function has:
- A zero at \(\omega = 0\) (i.e., a factor of \(j\omega\) in the numerator)
- A pole at \(\omega_1 = 500\) rad/s
- A pole at \(\omega_2 = 5000\) rad/s
- DC gain factor K = 500

\[H(j\omega) = \frac{K \cdot j\omega}{(1 + j\omega/500)(1 + j\omega/5000)}\]

**(a)** What is the slope of the Bode magnitude plot at very low frequencies (\(\omega \ll 500\))?

**(b)** What is the slope at very high frequencies (\(\omega \gg 5000\))?

**(c)** What type of filter does this represent overall?

**(d)** Estimate \(|H|\) in dB at \(\omega = 500\) rad/s.

??? tip "Hint"
    **(a)** At low \(\omega\): the denominator terms approach 1, and the numerator is \(j\omega\). So \(|H| \approx K\omega\) — this is a +20 dB/decade slope. Each zero contributes +20 dB/decade; each pole contributes −20 dB/decade.

    **(b)** At high \(\omega\): count all poles and zeros. One zero: +20 dB/decade. Two poles: −40 dB/decade. Net slope = +20 − 40 = **−20 dB/decade**.

    **(c)** Gain is low at DC (due to the zero), peaks in the mid-band, and rolls off at high frequency. This is a **band-pass** response.

    **(d)** At \(\omega = 500\) (the first pole), evaluate the numerator and denominator magnitudes separately, then combine. The zero contributes \(|j\omega| = 500\), the first pole term gives \(|1 + j1| = \sqrt{2}\), and the second pole term \(|1 + j(500/5000)| \approx |1 + j0.1|\).

---

</div>
