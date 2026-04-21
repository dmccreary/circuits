---
title: Chapter 5 Practice Problems — Passive Components
description: Practice problems with hints for Chapter 5 covering series/parallel capacitors and inductors, energy storage, RC/RL time constants, and real component models
---

<div class="unit1-styled" markdown>

# Chapter 5 Practice Problems — Passive Components

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — Series and Parallel Capacitors

Three capacitors have values \(C_1 = 10\) μF, \(C_2 = 22\) μF, and \(C_3 = 47\) μF.

**(a)** Find the equivalent capacitance when all three are connected in parallel.

**(b)** Find the equivalent capacitance when all three are connected in series.

**(c)** A 12 V source is connected across the parallel combination. How much total charge is stored, and how much energy?

??? tip "Hint"
    **(a)** Capacitors in parallel add directly (like resistors in series): \(C_{eq} = C_1 + C_2 + C_3\). The parallel combination has more plate area, so capacitance increases.

    **(b)** Series capacitors use the reciprocal formula: \(1/C_{eq} = 1/C_1 + 1/C_2 + 1/C_3\). The result will be smaller than the smallest individual capacitor.

    **(c)** Total charge: \(Q = C_{eq,parallel} \cdot V\). Energy stored: \(W = \frac{1}{2} C_{eq,parallel} V^2\). Remember to convert μF to F before computing energy in joules.

---

## Problem 2 — Series and Parallel Inductors

Two inductors, \(L_1 = 15\) mH and \(L_2 = 60\) mH, are connected with no mutual coupling.

**(a)** Find the equivalent inductance when they are in series.

**(b)** Find the equivalent inductance when they are in parallel.

**(c)** At DC steady state, a 6 A current flows through the series combination. Calculate the energy stored in each inductor and in the series combination.

??? tip "Hint"
    **(a)** Inductors in series add like resistors: \(L_{eq} = L_1 + L_2\). With no mutual coupling, this is straightforward.

    **(b)** Inductors in parallel use the reciprocal formula: \(L_{eq} = \frac{L_1 L_2}{L_1 + L_2}\).

    **(c)** Energy in each: \(W_k = \frac{1}{2} L_k I^2\). Since the same 6 A flows through both (series), compute each separately. The total should equal \(\frac{1}{2} L_{total} I^2\) as a check. Convert mH to H.

---

## Problem 3 — Energy Stored and the Capacitor V-I Relationship

A 470 μF capacitor is initially uncharged. Starting at t = 0, a constant current of 2 mA is forced through it.

**(a)** Write the expression for \(V_C(t)\) using the integral form of the capacitor V-I relationship.

**(b)** How long does it take for the capacitor to reach 10 V?

**(c)** How much energy is stored in the capacitor at that moment?

??? tip "Hint"
    **(a)** The integral form is \(v_C(t) = \frac{1}{C}\int_0^t i \, d\tau + v_C(0)\). For a constant current \(i = I\), this simplifies to \(v_C(t) = \frac{I}{C} t\) (a linear ramp from zero).

    **(b)** Set \(v_C(t) = 10\) V and solve for t: \(t = \frac{10 \cdot C}{I}\). Be careful with units: C in farads, I in amperes.

    **(c)** Use \(W = \frac{1}{2} C V^2\) with \(V = 10\) V. Express the result in millijoules.

---

## Problem 4 — Real Inductor Model and RC Time Constant

A real inductor is modeled as an ideal 50 mH inductor in series with its winding resistance \(R_{DCR} = 8\) Ω.

**(a)** This real inductor is connected in series with an external resistor \(R_{ext} = 42\) Ω and a 12 V DC source. Find the DC steady-state current.

**(b)** What is the time constant \(\tau\) of this RL circuit? (Use the total series resistance.)

**(c)** At DC steady state, how much energy is stored in the inductor's magnetic field? How does the winding resistance affect this compared to an ideal inductor with no DCR?

??? tip "Hint"
    **(a)** At DC steady state, the inductor is a short circuit (zero voltage drop). The only opposition is the total series resistance: \(R_{total} = R_{DCR} + R_{ext}\). Apply Ohm's Law.

    **(b)** \(\tau = L / R_{total}\). Both the DCR and the external resistor contribute to the total resistance the circuit "sees" when computing the time constant.

    **(c)** Energy: \(W = \frac{1}{2} L I^2\). The winding resistance DCR reduces the steady-state current compared to an ideal inductor (which would draw more current with only \(R_{ext}\)), so it also reduces the stored energy.

---

</div>
