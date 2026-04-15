---
title: Chapter 12 Practice Problems — Filters and Resonance
description: Practice problems with hints for Chapter 12 covering RC and RL filter design, RLC resonance, quality factor Q, bandwidth, and audio applications
---

<div class="unit1-styled" markdown>

# Chapter 12 Practice Problems — Filters and Resonance

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — First-Order RC Filter Design

You are designing an audio tone-control circuit. You need a low-pass RC filter with a cutoff frequency of 3.4 kHz to remove high-frequency hiss from an audio signal.

**(a)** If you choose C = 10 nF, what value of R is needed?

**(b)** What is the attenuation (in dB) at 34 kHz (one decade above cutoff)?

**(c)** Is −20 dB/decade sufficient to remove hiss, or would you need a higher-order filter? Justify your reasoning.

??? tip "Hint"
    **(a)** Start from \(f_c = 1/(2\pi RC)\) and solve for R. Keep units consistent (nF needs careful handling).

    **(b)** Use the asymptotic approximation: one decade above \(f_c\), a first-order filter attenuates by −20 dB. For more accuracy, use \(|H| = 1/\sqrt{1+(\omega/\omega_c)^2}\) with \(\omega/\omega_c = 10\).

    **(c)** Consider what −20 dB means as a voltage ratio. A signal at 34 kHz is reduced to 1/10 of its amplitude. For audio hiss (which often extends to 20 kHz), think about whether 1/10 amplitude is audible.

---

## Problem 2 — Series RLC Resonance

A series RLC circuit has R = 50 Ω, L = 10 mH, and C = 1 μF.

**(a)** Find the resonant frequency \(f_0\).

**(b)** Calculate the quality factor Q.

**(c)** Find the bandwidth BW of the circuit.

**(d)** Find the half-power frequencies \(f_1\) and \(f_2\).

??? tip "Hint"
    **(a)** At resonance, inductive and capacitive reactances cancel. The resonant frequency is \(\omega_0 = 1/\sqrt{LC}\), then \(f_0 = \omega_0/(2\pi)\).

    **(b)** For a series RLC, \(Q = \omega_0 L / R = 1/(\omega_0 RC)\). A high Q means a narrow, sharp peak.

    **(c)** Bandwidth and Q are linked: \(\text{BW} = f_0 / Q\).

    **(d)** The half-power frequencies are symmetrically placed (on a log scale) around \(f_0\): \(f_1 = f_0 - \text{BW}/2\) and \(f_2 = f_0 + \text{BW}/2\) (linear approximation valid for high Q).

---

## Problem 3 — Band-Pass Filter Design

You need to design an RLC band-pass filter centered at \(f_0 = 10\) kHz with a bandwidth of 500 Hz. You have a 100 mH inductor available.

**(a)** Find the required capacitance C.

**(b)** Find the required resistance R.

**(c)** What is the Q of this filter?

**(d)** At \(f = 12\) kHz, is the signal inside or outside the passband? By how much?

??? tip "Hint"
    **(a)** Use \(f_0 = 1/(2\pi\sqrt{LC})\) and solve for C.

    **(b)** From \(\text{BW} = R/(2\pi L)\), solve for R. (Equivalently, BW = \(f_0/Q\) and \(Q = \omega_0 L/R\).)

    **(c)** \(Q = f_0/\text{BW}\).

    **(d)** The passband extends from \(f_1 = f_0 - \text{BW}/2\) to \(f_2 = f_0 + \text{BW}/2\). Check where 12 kHz falls. For the exact attenuation, you would evaluate the transfer function magnitude — but a qualitative answer based on the bandwidth is sufficient here.

---

## Problem 4 — RL High-Pass Filter

You want to build an RL high-pass filter (output taken across L) with \(f_c = 8\) kHz. You have a 5 mH inductor.

**(a)** What resistance R is needed?

**(b)** At what frequency does the phase of \(V_{out}/V_{in}\) equal +45°?

**(c)** How does the roll-off of this RL high-pass filter compare to the RC high-pass filter from Chapter 11 in terms of slope and behavior at high frequency?

??? tip "Hint"
    **(a)** For an RL high-pass filter (output across L), the cutoff frequency is \(f_c = R/(2\pi L)\). Solve for R.

    **(b)** The phase of an RL high-pass filter is \(\phi(\omega) = 90° - \arctan(\omega L/R)\). Set \(\phi = 45°\) and solve. You should find this occurs exactly at \(f_c\).

    **(c)** Both are first-order filters with the same −20 dB/decade roll-off (but rolling off below \(f_c\), not above). At high frequency, the RL high-pass passes the signal with 0 dB gain, just like the RC version. The difference is which component the output is taken across.

---

## Problem 5 — Audio Signal Chain and dBu

A microphone outputs −60 dBu. The signal passes through:
1. A preamplifier with gain +40 dB
2. An RC high-pass filter (cutoff 80 Hz) — assume the signal frequency is well above cutoff, so filter has ~0 dB insertion loss
3. A tone-control bass shelving filter that adds +6 dB boost below 200 Hz (the signal is at 100 Hz)
4. A power amplifier with gain +20 dB

**(a)** What is the signal level (in dBu) after each stage?

**(b)** What is the final output level in dBu?

**(c)** A mixing console has a maximum input of +24 dBu before clipping. Does any stage in the chain risk exceeding this limit?

??? tip "Hint"
    **(a)** dBu levels add/subtract linearly with gain/attenuation in dB. Start at −60 dBu and add each stage's gain in order. The filter contributes 0 dB at 100 Hz since that's well above its 80 Hz cutoff. The bass shelf adds +6 dB at 100 Hz.

    **(b)** Sum all gains and add to the starting level.

    **(c)** Track the level after each stage and compare to +24 dBu. Headroom = +24 dBu − signal level at that point. If any stage output exceeds +24 dBu, clipping can occur downstream if the signal hits a +24 dBu-limited input.

---

</div>
