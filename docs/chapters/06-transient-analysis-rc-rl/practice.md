---
title: Chapter 6 Practice Problems — Transient Analysis of RC and RL Circuits
description: Practice problems with hints for Chapter 6 covering time constants, exponential responses, initial/final conditions, and first-order transient analysis
---

<div class="unit1-styled" markdown>

# Chapter 6 Practice Problems — Transient Analysis of RC and RL Circuits

These problems are meant to build your problem-solving intuition. A hint is provided for each — try the problem on your own first before reading it.

---

## Problem 1 — RC Charging Time Constant

A 12 V DC source is connected to a series RC circuit with R = 22 kΩ and C = 47 μF at t = 0. The capacitor is initially uncharged.

**(a)** Calculate the time constant τ.

**(b)** Write the expression for \(V_C(t)\) for \(t \geq 0\).

**(c)** At what time has the capacitor charged to 10 V?

??? tip "Hint"
    **(a)** The time constant of an RC circuit is simply \(\tau = RC\). Multiply your values carefully, keeping track of units (kΩ × μF = ms).

    **(b)** For a capacitor charging from 0 to a final value \(V_\infty\), the universal step-response formula gives:
    \[V_C(t) = V_\infty\left(1 - e^{-t/\tau}\right)\]

    **(c)** Set \(V_C(t) = 10\) V, substitute your expression, then solve for t by taking the natural logarithm of both sides. Remember \(\ln(e^x) = x\).

---

## Problem 2 — RL Circuit Natural Response

An RL circuit has L = 50 mH and R = 200 Ω. The inductor carries an initial current of 80 mA when the source is disconnected at t = 0 (replaced by a short circuit through R).

**(a)** Find the time constant τ.

**(b)** Write the expression for \(i_L(t)\) for \(t \geq 0\).

**(c)** How long until the current falls below 5 mA?

??? tip "Hint"
    **(a)** For an RL circuit, \(\tau = L/R\). Check units: mH/Ω = ms.

    **(b)** With no driving source (natural response only), the inductor current decays exponentially from its initial value:
    \[i_L(t) = i_L(0)\,e^{-t/\tau}\]

    **(c)** Set \(i_L(t) = 5\) mA and solve. You will need to take \(\ln\) of both sides. Think about the ratio \(5/80\) before computing.

---

## Problem 3 — Complete Response with Non-Zero Initial Condition

In an RC circuit, R = 10 kΩ and C = 1 μF. At t = 0, a 20 V step is applied. The capacitor voltage just before switching is \(V_C(0^-) = 8\) V.

**(a)** Identify \(x(0)\), \(x(\infty)\), and τ.

**(b)** Use the universal formula to write \(V_C(t)\).

**(c)** At t = 2τ, what is \(V_C\)? What percentage of the total change has occurred?

??? tip "Hint"
    **(a)** For the universal step-response formula \(x(t) = x(\infty) + [x(0) - x(\infty)]e^{-t/\tau}\):
    - \(x(0)\) is the value just after switching (capacitor voltage cannot jump, so \(V_C(0^+) = V_C(0^-)\))
    - \(x(\infty)\) is the DC steady-state value long after switching (capacitor is an open circuit at DC)

    **(b)** Substitute your three values directly into the formula.

    **(c)** At \(t = 2\tau\), compute \(e^{-2}\). The percentage of total change is \((1 - e^{-2}) \times 100\%\).

---

## Problem 4 — Finding Initial and Final Conditions

The circuit below is at DC steady state before t = 0. At t = 0, a switch opens, disconnecting a 5 kΩ parallel resistor.

Given: \(V_s = 15\) V, \(R_1 = 3\) k Ω, \(R_2 = 5\) kΩ (switched out at t=0), \(C = 10\) μF.

**(a)** Find \(V_C(0^-)\) (before switching).

**(b)** Find \(V_C(\infty)\) (long after switching).

**(c)** Find the new τ after switching.

??? tip "Hint"
    **(a)** In DC steady state, the capacitor is an open circuit. Use a voltage divider with \(R_1\) and \(R_2\) (both present) to find \(V_C(0^-)\).

    **(b)** After the switch opens, \(R_2\) is removed. Now find the new DC steady state — again treat the capacitor as open and redo the voltage divider with only \(R_1\) remaining.

    **(c)** The Thévenin resistance seen by the capacitor after switching is just \(R_1\) (since \(R_2\) is disconnected). Use \(\tau = R_{th} \cdot C\).

---

## Problem 5 — Energy Stored and Dissipated

An RC circuit has R = 1 kΩ and C = 100 μF. The capacitor is initially charged to 20 V and then discharges through R.

**(a)** How much energy was initially stored in the capacitor?

**(b)** Write the expression for \(V_C(t)\) during the discharge.

**(c)** How much energy has been dissipated in R by t = τ?

**(d)** What fraction of the initial energy remains in C at t = τ?

??? tip "Hint"
    **(a)** Energy stored in a capacitor: \(W = \frac{1}{2}CV^2\). Substitute \(V = 20\) V.

    **(b)** Discharging from \(V_0\) with no source is a natural response: \(V_C(t) = V_0\,e^{-t/\tau}\).

    **(c)** Energy remaining in C at time t is \(\frac{1}{2}C[V_C(t)]^2\). Energy dissipated = initial energy − remaining energy. Compute \(V_C(\tau)\) first.

    **(d)** Divide the energy remaining at t = τ by the initial energy. The answer is a clean expression in terms of \(e\).

---

</div>
