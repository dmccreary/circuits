---
title: Chapter 5 Quiz — Passive Components
description: Multiple choice quiz and practice problems for Chapter 5 covering capacitors, inductors, mutual inductance, and signal fundamentals
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 5 Quiz — Passive Components

## Multiple Choice Questions

**1.** A 10 μF capacitor is charged to 50 V. How much energy is stored?

- A) 500 μJ
- B) 12.5 mJ
- C) 25 mJ
- D) 2.5 mJ

??? success "Answer"
    **B) 12.5 mJ**

    \(E = \frac{1}{2}CV^2 = \frac{1}{2} \times 10 \times 10^{-6} \times 2500 = 12.5 \times 10^{-3}\) J = 12.5 mJ.

---

**2.** Which of the following correctly describes a capacitor in DC steady state?

- A) It acts as a short circuit
- B) It acts as an open circuit
- C) It acts as a resistor
- D) It continuously draws current

??? success "Answer"
    **B) It acts as an open circuit**

    In DC steady state, \(dV/dt = 0\), so \(i = C\,dV/dt = 0\). No current flows through the capacitor; it appears as an open circuit.

---

**3.** Three capacitors — 4 μF, 6 μF, and 12 μF — are connected in series. What is the equivalent capacitance?

- A) 22 μF
- B) 2 μF
- C) 6 μF
- D) 4 μF

??? success "Answer"
    **B) 2 μF**

    \(\frac{1}{C_{eq}} = \frac{1}{4} + \frac{1}{6} + \frac{1}{12} = \frac{3+2+1}{12} = \frac{6}{12} = \frac{1}{2}\), so \(C_{eq} = 2\) μF.

---

**4.** An inductor has 5 mH inductance and carries 4 A of current. How much energy is stored?

- A) 40 mJ
- B) 10 mJ
- C) 20 mJ
- D) 80 mJ

??? success "Answer"
    **B) 10 mJ**

    \(E = \frac{1}{2}LI^2 = \frac{1}{2} \times 5 \times 10^{-3} \times 16 = 40 \times 10^{-3} = 40\) mJ... wait, let me recalculate.

    \(E = \frac{1}{2} \times 0.005 \times 16 = 0.04\) J = 40 mJ.

    **Correction:** The correct answer is **A) 40 mJ**.

    \(E = \frac{1}{2} \times 5\times10^{-3} \times 4^2 = \frac{1}{2} \times 0.005 \times 16 = 0.04\) J = 40 mJ.

---

**5.** Which statement about an ideal inductor in DC steady state is correct?

- A) It has a large voltage across it
- B) It acts as an open circuit
- C) It acts as a short circuit (zero voltage)
- D) It blocks all current

??? success "Answer"
    **C) It acts as a short circuit (zero voltage)**

    In DC steady state, \(di/dt = 0\), so \(v = L\,di/dt = 0\). The inductor has zero voltage across it and acts as a short circuit (assuming no winding resistance).

---

**6.** Two inductors L1 = 8 mH and L2 = 2 mH are coupled with mutual inductance M = 3 mH. When connected series-aiding, the equivalent inductance is:

- A) 10 mH
- B) 16 mH
- C) 4 mH
- D) 13 mH

??? success "Answer"
    **B) 16 mH**

    Series-aiding: \(L_{eq} = L_1 + L_2 + 2M = 8 + 2 + 6 = 16\) mH.

---

**7.** A sinusoidal voltage \(v(t) = 170\sin(377t)\) V. What is the RMS value and frequency?

- A) 170 V RMS, 60 Hz
- B) 120 V RMS, 60 Hz
- C) 85 V RMS, 120 Hz
- D) 120 V RMS, 377 Hz

??? success "Answer"
    **B) 120 V RMS, 60 Hz**

    \(V_{rms} = V_m/\sqrt{2} = 170/1.414 \approx 120\) V.  
    \(\omega = 377\) rad/s, so \(f = 377/(2\pi) \approx 60\) Hz.  
    This is standard US household voltage!

---

**8.** A signal level increases by 20 dB. By what factor does the voltage increase?

- A) 20 times
- B) 10 times
- C) 100 times
- D) 4 times

??? success "Answer"
    **B) 10 times**

    \(20 = 20\log_{10}(V_2/V_1)\), so \(\log_{10}(V_2/V_1) = 1\), giving \(V_2/V_1 = 10\).

---

**9.** What is Equivalent Series Resistance (ESR) in a real capacitor?

- A) The capacitance times the resistance
- B) Parasitic resistance in series with the capacitor representing internal losses
- C) The resistance that must be added in series for proper operation
- D) The resistance of the dielectric material only

??? success "Answer"
    **B) Parasitic resistance in series with the capacitor representing internal losses**

    ESR is an undesired parasitic parameter of real capacitors that causes power dissipation and limits performance in filtering and switching applications.

---

**10.** The coupling coefficient \(k\) between two inductors equals 1. This means:

- A) The inductors have equal inductance
- B) All the magnetic flux of one inductor links the other (perfect coupling)
- C) The inductors are in series
- D) There is no magnetic coupling

??? success "Answer"
    **B) All the magnetic flux of one inductor links the other (perfect coupling)**

    \(k = M/\sqrt{L_1 L_2} = 1\) represents perfect (100%) magnetic coupling, the ideal transformer condition.

---

## Practice Problems

**Problem 1: Capacitor Combinations**

Three capacitors — C1 = 2 μF, C2 = 3 μF, C3 = 6 μF — are arranged so that C2 and C3 are in parallel, and that parallel combination is in series with C1.

a) Find the equivalent capacitance.  
b) If 12 V is applied across the whole combination, find the voltage across C1 and across the parallel combination (C2 ∥ C3).

??? success "Solution"
    **a) Equivalent capacitance:**

    C2 ∥ C3: \(C_{23} = 3 + 6 = 9\) μF

    C1 in series with C23: \(\frac{1}{C_{eq}} = \frac{1}{2} + \frac{1}{9} = \frac{9+2}{18} = \frac{11}{18}\)

    \(C_{eq} = 18/11 \approx 1.636\) μF

    **b) Charge on series combination:**
    \(Q = C_{eq} \times V = (18/11 \times 10^{-6}) \times 12 = 216/11 \approx 19.6\) μC

    Voltage across C1: \(V_1 = Q/C_1 = (19.6 \times 10^{-6})/(2 \times 10^{-6}) \approx 9.82\) V

    Voltage across C2 ∥ C3: \(V_{23} = Q/C_{23} = (19.6 \times 10^{-6})/(9 \times 10^{-6}) \approx 2.18\) V

    Check: \(9.82 + 2.18 = 12\) V ✓

---

**Problem 2: Inductor Energy**

An inductor with L = 50 mH is carrying 2 A when a switch suddenly opens. The inductor current must discharge through a parallel resistor R = 100 Ω.

a) How much energy was stored in the inductor?  
b) Write an expression for the inductor current after the switch opens.  
c) What voltage appears across the inductor immediately after the switch opens?

??? success "Solution"
    **a)** \(E = \frac{1}{2}LI^2 = \frac{1}{2} \times 0.05 \times 4 = 0.1\) J = 100 mJ

    **b)** \(\tau = L/R = 0.05/100 = 0.5\) ms

    \(i_L(t) = 2\,e^{-t/0.0005} = 2\,e^{-2000t}\) A, for \(t \geq 0\)

    **c)** At \(t = 0^+\): \(v_L = L\,di/dt\)

    Since the current decays through R, \(v_L(0^+) = -I_0 R = -2 \times 100 = -200\) V

    The negative sign indicates the inductor reverses polarity to maintain current flow (Lenz's Law). This 200 V spike can destroy unprotected transistors!

---

**Problem 3: Signal Parameters**

A sinusoidal voltage is described as \(v(t) = 5\sin(1000\pi t + 30°)\) V.

Determine: a) amplitude, b) period, c) frequency, d) angular frequency, e) phase angle, f) RMS value.

??? success "Solution"
    - **a) Amplitude (peak value):** \(V_m = 5\) V
    - **b) Period:** \(\omega = 1000\pi\) rad/s, so \(T = 2\pi/\omega = 2\pi/(1000\pi) = 2/1000 = 2\) ms
    - **c) Frequency:** \(f = 1/T = 1/0.002 = 500\) Hz
    - **d) Angular frequency:** \(\omega = 1000\pi \approx 3142\) rad/s
    - **e) Phase angle:** \(\phi = 30°\) (the signal leads the reference by 30°)
    - **f) RMS value:** \(V_{rms} = V_m/\sqrt{2} = 5/1.414 \approx 3.54\) V

---

**Problem 4: Decibel Calculations**

An audio amplifier has a voltage gain of 40 in the midband, dropping to 28.28 at the cutoff frequencies.

a) Express the midband gain in dB.  
b) Express the gain at the cutoff frequency in dB.  
c) What is the dB drop at the cutoff frequency?

??? success "Solution"
    **a)** Midband: \(A_{dB} = 20\log_{10}(40) = 20 \times 1.602 = 32.04\) dB ≈ **32 dB**

    **b)** Cutoff: \(A_{dB} = 20\log_{10}(28.28) = 20\log_{10}(20\sqrt{2}) = 20\log_{10}(40/\sqrt{2})\)

    More directly: \(28.28 = 40/\sqrt{2}\), so the gain is \(40/\sqrt{2}\).

    \(A_{dB} = 20\log_{10}(28.28) = 20 \times 1.452 = 29.04\) dB ≈ **29 dB**

    **c)** Drop = 32 − 29 = **3 dB** — this is the classic "−3 dB point" or "half-power point," since a voltage ratio of \(1/\sqrt{2}\) corresponds to a power ratio of 1/2 (i.e., −3 dB).

</div>
