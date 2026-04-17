---
title: Chapter 6 Practice Problems — Transient Analysis of RC and RL Circuits
description: Practice problems with solutions for Chapter 6 covering time constants, RC charging/discharging, and RL transients
---

<div class="unit1-styled" markdown>

# Chapter 6 Practice Problems

## Practice Problems

### Problem 1 — RC Time Constant

An RC circuit has R = 47 kΩ and C = 10 μF.

**(a)** Calculate the time constant τ.

**(b)** At t = τ, what fraction of the final voltage has the capacitor reached?

**(c)** How long does it take the capacitor to charge to 99% of the supply voltage?

??? success "Solution"
    **(a)** Time constant:

    \[\tau = RC = 47{,}000 \times 10 \times 10^{-6} = 0.47\text{ s}\]

    **(b)** At \(t = \tau\): the capacitor voltage is \(V_C = V_S(1 - e^{-1}) = V_S(1 - 0.368) = 0.632\, V_S\). It reaches 63.2% of the final voltage.

    **(c)** Setting \(V_C = 0.99 V_S\):

    \[0.99 V_S = V_S(1 - e^{-t/\tau})\]
    \[e^{-t/\tau} = 0.01\]
    \[-t/\tau = \ln(0.01) = -4.605\]
    \[t = 4.605\tau = 4.605 \times 0.47 = 2.16\text{ s}\]

    This confirms the "5τ rule": at 5τ = 2.35 s the capacitor is 99.3% charged.

---

### Problem 2 — RC Charging Transient

A 1 μF capacitor (initially uncharged) is connected to a 12 V source through a 10 kΩ resistor at t = 0.

**(a)** Write the equation for capacitor voltage \(V_C(t)\).

**(b)** Calculate \(V_C\) at t = 5 ms, 10 ms, and 50 ms.

**(c)** Calculate the initial charging current.

**(d)** At what time does the current equal 20% of its initial value?

??? success "Solution"
    **(a)** Time constant: \(\tau = RC = 10{,}000 \times 1 \times 10^{-6} = 10\text{ ms}\)

    \[V_C(t) = 12\left(1 - e^{-t/0.01}\right)\text{ V}\]

    **(b)** Evaluating:

    - At t = 5 ms = 0.5τ: \(V_C = 12(1 - e^{-0.5}) = 12(1 - 0.607) = 4.71\text{ V}\)
    - At t = 10 ms = τ: \(V_C = 12(1 - e^{-1}) = 12(0.632) = 7.58\text{ V}\)
    - At t = 50 ms = 5τ: \(V_C = 12(1 - e^{-5}) = 12(0.993) = 11.92\text{ V}\)

    **(c)** Initial current (capacitor uncharged, acts as short circuit):

    \[i(0) = \frac{V_S}{R} = \frac{12}{10{,}000} = 1.2\text{ mA}\]

    **(d)** Current decays as \(i(t) = 1.2\,e^{-t/\tau}\). Setting \(i = 0.2 \times 1.2 = 0.24\text{ mA}\):

    \[0.24 = 1.2\, e^{-t/0.01} \Rightarrow e^{-t/0.01} = 0.2 \Rightarrow t = -0.01\ln(0.2) = 0.01 \times 1.609 = 16.1\text{ ms}\]

---

### Problem 3 — RC Discharging

A 470 μF capacitor is initially charged to 9 V. At t = 0, it is connected to a 2.2 kΩ discharge resistor.

**(a)** Calculate the time constant.

**(b)** Write the expression for \(V_C(t)\).

**(c)** Calculate the initial discharge current.

**(d)** How long until the capacitor voltage drops to 1 V?

??? success "Solution"
    **(a)** \(\tau = RC = 2200 \times 470 \times 10^{-6} = 1.034\text{ s}\)

    **(b)** \[V_C(t) = 9\,e^{-t/1.034}\text{ V}\]

    **(c)** Initial discharge current: \(i(0) = V_0/R = 9/2200 = 4.09\text{ mA}\) (flowing out of capacitor)

    **(d)** Set \(V_C = 1\text{ V}\):

    \[1 = 9\,e^{-t/1.034}\]
    \[e^{-t/1.034} = 1/9 = 0.111\]
    \[t = -1.034\ln(0.111) = 1.034 \times 2.197 = 2.27\text{ s}\]

---

### Problem 4 — RL Circuit Energizing

An RL circuit has L = 100 mH and R = 20 Ω. A 10 V source is switched in at t = 0 (inductor initially de-energized).

**(a)** Calculate the time constant and the final (steady-state) current.

**(b)** Write the equation for inductor current \(i_L(t)\).

**(c)** Calculate the inductor voltage at t = 0 and at t = τ.

**(d)** At what time does the current reach 4 A?

??? success "Solution"
    **(a)** Time constant and final current:

    \[\tau = \frac{L}{R} = \frac{0.1}{20} = 5\text{ ms}\]
    \[I_{final} = \frac{V_S}{R} = \frac{10}{20} = 0.5\text{ A}\]

    **(b)** \[i_L(t) = 0.5\left(1 - e^{-t/0.005}\right)\text{ A}\]

    **(c)** Inductor voltage: \(v_L = V_S - i_L R\). At t = 0: \(v_L(0) = 10 - 0 = 10\text{ V}\) (inductor supports full source voltage). At t = τ: \(v_L(\tau) = 10\,e^{-1} = 3.68\text{ V}\).

    **(d)** 4 A exceeds the final steady-state value of 0.5 A — it cannot be reached. This is an important check: the exponential approaches but never exceeds the final value.

---

### Problem 5 — Universal Transient Formula

A circuit is switched at t = 0. The voltage at node X is measured to be 8 V before switching. After a long time it settles to 2 V. The Thevenin resistance seen by the capacitor (C = 22 μF) is 15 kΩ.

**(a)** Calculate the time constant.

**(b)** Write the complete response \(V_X(t)\) for t ≥ 0.

**(c)** At what time does \(V_X\) reach 3 V?

??? success "Solution"
    **(a)** Time constant using Thevenin resistance:

    \[\tau = R_{Th} \cdot C = 15{,}000 \times 22 \times 10^{-6} = 0.33\text{ s}\]

    **(b)** Applying the universal formula with \(V_X(0) = 8\text{ V}\) and \(V_X(\infty) = 2\text{ V}\):

    \[V_X(t) = 2 + (8 - 2)e^{-t/0.33} = 2 + 6\,e^{-t/0.33}\text{ V}\]

    **(c)** Set \(V_X = 3\text{ V}\):

    \[3 = 2 + 6\,e^{-t/0.33}\]
    \[e^{-t/0.33} = 1/6\]
    \[t = -0.33\ln(1/6) = 0.33 \times 1.792 = 0.59\text{ s}\]

</div>
