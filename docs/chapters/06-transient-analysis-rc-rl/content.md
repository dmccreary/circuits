---
title: Chapter 6 Content — Transient Analysis of RC and RL Circuits
description: Teaching content for Chapter 6 covering time constants, exponential responses, and first-order circuit analysis
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 6 — Transient Analysis of RC and RL Circuits

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

When a switch opens or closes in a circuit containing a capacitor or inductor, the circuit transitions between two steady states through an exponential transient governed by a characteristic time constant. This chapter develops the complete analytical framework for first-order RC and RL circuits, covering both the natural response (energy decay) and the step response (energy charging).

**Key Takeaways**

1. The time constant tau (τ = RC or τ = L/R) determines how quickly a first-order circuit responds — after five time constants, the circuit is essentially at its new steady state.
2. The natural response is a decaying exponential representing the release of stored energy with no external forcing.
3. The complete response combines the natural response with the forced (particular) response to describe circuit behavior for any initial conditions and source values.

</details>

## 6.1 Transient vs. Steady-State Response

Every circuit exists in one of two states: **steady state** or **transient**.

In **steady state**, all voltages and currents are constant (for DC) or periodic (for AC). Nothing is changing — the circuit has settled to its final behavior. This is the comfortable world of Chapters 1–4.

A **transient** occurs whenever the circuit is disturbed — a switch opens or closes, a source turns on or off. During the transient, the circuit transitions from one steady state to another. The transient is temporary; eventually the circuit reaches the new steady state.

Why does the transition take time at all? Because capacitors and inductors **store energy** and cannot release or absorb it instantaneously:
- A capacitor's voltage cannot change instantaneously (stored charge must flow through finite resistance)
- An inductor's current cannot change instantaneously (stored magnetic energy must be released through finite resistance)

This chapter focuses on **first-order circuits** — circuits with exactly one energy storage element (one capacitor or one inductor). These circuits always produce **exponential** transients.

---

## 6.2 The RC Circuit: Charging

Consider a resistor \(R\) in series with a capacitor \(C\), connected to a voltage source \(V_S\) via a switch closed at \(t = 0\). The capacitor starts uncharged (\(V_C(0) = 0\)).

Applying KVL around the loop:

\[V_S = V_R + V_C = i R + V_C\]

Since \(i = C\,dV_C/dt\):

\[V_S = RC\,\frac{dV_C}{dt} + V_C\]

Solving this first-order differential equation with initial condition \(V_C(0) = 0\):

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[V_C(t) = V_S\left(1 - e^{-t/RC}\right)\]

\[i(t) = \frac{V_S}{R} e^{-t/RC}\]

</div>

The capacitor voltage starts at 0 and rises exponentially toward \(V_S\). The current starts at \(V_S/R\) (as if the capacitor were a short circuit) and decays to zero as the capacitor charges.

#### Diagram: RC Charging

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/rc-charging/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

**Charging behavior at key moments:**

| Time | \(V_C\) | \(i\) |
|------|---------|-------|
| \(t = 0\) | 0 | \(V_S/R\) |
| \(t = \tau\) | \(0.632\,V_S\) | \(0.368\,V_S/R\) |
| \(t = 2\tau\) | \(0.865\,V_S\) | \(0.135\,V_S/R\) |
| \(t = 5\tau\) | \(0.993\,V_S\) | \(0.007\,V_S/R\) |
| \(t \to \infty\) | \(V_S\) | 0 |

---

## 6.3 The Time Constant

The product \(RC\) appears in the exponent and has units of seconds. It is called the **time constant** \(\tau\) (tau):

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\tau = RC\]

where \(R\) is in ohms (Ω), \(C\) is in farads (F), and \(\tau\) is in seconds (s).

</div>

The time constant is the single most important parameter describing a first-order transient:

- At \(t = \tau\): the circuit is **63.2%** of the way from its initial to final value
- At \(t = 5\tau\): the circuit is **99.3%** complete — engineers consider this "done"

**Physical interpretation:** \(\tau\) is the time it would take the capacitor to charge to \(V_S\) if the initial rate of change were maintained. It's the "natural pace" of the circuit.

**Example:** An RC circuit with \(R = 10\) kΩ and \(C = 47\) μF has \(\tau = 10\,000 \times 47 \times 10^{-6} = 0.47\) s. After \(5\tau = 2.35\) s, the capacitor is fully charged.

The time constant applies equally to the discharging case.

#### Diagram: Time Constant

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/time-constant/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 6.4 The RC Circuit: Discharging

Now consider a capacitor initially charged to \(V_0\), connected to a resistor at \(t = 0\) (with the source removed). The capacitor discharges through the resistor.

Applying KVL: \(V_C = -iR\) (current flows opposite to charging direction), which gives:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[V_C(t) = V_0\, e^{-t/RC} = V_0\, e^{-t/\tau}\]

\[i(t) = -\frac{V_0}{R} e^{-t/\tau}\]

</div>

The capacitor voltage decays exponentially from \(V_0\) toward 0. The time constant \(\tau = RC\) governs the discharge rate just as it governs charging.

#### Diagram: RC Discharging

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/rc-discharging/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

!!! tip "Finding τ in a Complex Circuit"
    When finding the time constant, reduce the circuit seen by the capacitor (or inductor) to its Thévenin equivalent. Then \(\tau = R_{Th} \cdot C\) or \(\tau = L / R_{Th}\).

---

## 6.5 The RL Circuit

An **RL circuit** pairs a resistor \(R\) with an inductor \(L\). It behaves as the dual of the RC circuit, with current replacing voltage and inductance replacing capacitance.

**Energizing (switch closed at \(t = 0\), inductor initially uncharged):**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[i_L(t) = \frac{V_S}{R}\left(1 - e^{-t/\tau}\right)\]

\[v_L(t) = V_S\, e^{-t/\tau}\]

where \(\tau = \frac{L}{R}\)

</div>

**De-energizing (switch opened, inductor initially carrying current \(I_0\)):**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[i_L(t) = I_0\, e^{-t/\tau}\]

\[v_L(t) = -I_0 R\, e^{-t/\tau}\]

</div>

**The RL time constant:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\tau = \frac{L}{R}\]

where \(L\) is in henrys (H), \(R\) is in ohms (Ω), and \(\tau\) is in seconds (s).

</div>

!!! warning "Inductor Voltage Spike"
    When you abruptly open a switch carrying inductor current, the inductor tries to maintain its current instantaneously, producing a very large voltage spike: \(v = L\,di/dt\) with \(di/dt \to \infty\). This can damage switches and semiconductors. In practice, a **freewheeling diode** or snubber circuit is placed across the inductor to provide a controlled discharge path.

#### Diagram: RL Circuit Charging

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/rl-charging/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

**RC and RL duality:**

| RC Circuit | RL Circuit |
|-----------|-----------|
| \(V_C\) is continuous | \(I_L\) is continuous |
| \(\tau = RC\) | \(\tau = L/R\) |
| \(V_C\) charges toward \(V_S\) | \(I_L\) energizes toward \(V_S/R\) |
| At steady state: open circuit | At steady state: short circuit |

---

## 6.6 Initial and Final Conditions

To solve any first-order transient, you need two pieces of information: the **initial condition** and the **final condition**.

**Initial condition \(x(0^+)\):**

The value of the state variable immediately after switching. Due to continuity:
- Capacitor voltage immediately after switching = capacitor voltage immediately before: \(V_C(0^+) = V_C(0^-)\)
- Inductor current immediately after switching = inductor current immediately before: \(I_L(0^+) = I_L(0^-)\)

To find the initial condition, analyze the circuit at \(t = 0^-\) (DC steady state before switching):
- Capacitor → open circuit (in DC steady state, \(i_C = 0\))
- Inductor → short circuit (in DC steady state, \(v_L = 0\))

**Final condition \(x(\infty)\):**

The DC steady-state value as \(t \to \infty\). Analyze the circuit at DC steady state with the new switch configuration:
- Capacitor → open circuit
- Inductor → short circuit

#### Diagram: Initial and Final Conditions

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/initial-final-conditions/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 6.7 Natural, Forced, and Complete Response

The complete response of a first-order circuit has two components:

**Natural response** \(x_n(t)\): The circuit's response due to its initial stored energy, with no external forcing. It decays to zero:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[x_n(t) = A\, e^{-t/\tau}\]

</div>

**Forced response** \(x_f(t)\): The response driven by the external source(s), which the circuit eventually settles to. For DC sources, this is a constant equal to the final value \(x(\infty)\).

**Complete response** = natural + forced:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[x(t) = x(\infty) + \bigl[x(0) - x(\infty)\bigr]\, e^{-t/\tau}\]

</div>

This is the **universal step-response formula** — it solves *any* first-order DC transient. Once you know \(x(0)\), \(x(\infty)\), and \(\tau\), you're done.

#### Diagram: Exponential Properties

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/exponential-properties/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

**Procedure for first-order transient analysis:**

1. Find \(x(0)\): analyze circuit at DC steady state before switching (C → open, L → short)
2. Find \(x(\infty)\): analyze circuit at DC steady state after switching (C → open, L → short)
3. Find \(\tau\): find Thévenin resistance seen by the energy storage element; \(\tau = R_{Th}C\) or \(\tau = L/R_{Th}\)
4. Write the solution: \(x(t) = x(\infty) + [x(0) - x(\infty)]e^{-t/\tau}\)

---

## 6.8 Worked Example: Complete Transient Analysis

This example walks through all five steps of a complete transient analysis — including a circuit that has both initial stored energy and a step input, which represents the most general case.

**Problem:** The circuit below has been in the position shown (switch open, 48 V source connected through R1 = 12 kΩ and R2 = 6 kΩ in series, with capacitor C = 5 μF across R2) for a long time. At \(t = 0\), the switch closes, connecting an additional parallel resistor R3 = 6 kΩ in parallel with R2 and C. Find \(V_C(t)\) for \(t \geq 0\).

### Step 1 — Initial Condition from Pre-Switching Steady State

Before \(t = 0\) (long time, switch open), the capacitor acts as an open circuit (no DC current through it). The circuit is simply R1 and R2 in series from the 48 V source, with the capacitor across R2:

\[V_C(0^-) = 48 \times \frac{R2}{R1 + R2} = 48 \times \frac{6}{12 + 6} = 48 \times \frac{1}{3} = 16 \text{ V}\]

By the continuity principle: \(V_C(0^+) = V_C(0^-) = 16\) V. This is the initial condition.

### Step 2 — Final Condition After Switching

After \(t = 0\) (long time, switch closed), the capacitor is again open circuit. Now R2 and R3 are in parallel, and that combination is in series with R1:

\[R_{23} = R2 \| R3 = \frac{6\,\text{k} \times 6\,\text{k}}{6\,\text{k} + 6\,\text{k}} = 3 \text{ k}\Omega\]

\[V_C(\infty) = 48 \times \frac{R_{23}}{R1 + R_{23}} = 48 \times \frac{3}{12 + 3} = 48 \times 0.2 = 9.6 \text{ V}\]

The final capacitor voltage has dropped from 16 V to 9.6 V — the switch disturbed the steady state.

### Step 3 — Time Constant After Switching

Kill the 48 V source (replace with short circuit). Looking into the capacitor terminals, R1 appears in parallel with the series path through the closed switch. The Thévenin resistance seen by C is:

\[R_{Th} = R1 \| R2 \| R3 = R1 \| (R2 \| R3) = 12\,\text{k} \| 3\,\text{k} = \frac{12 \times 3}{12 + 3} = 2.4 \text{ k}\Omega\]

\[\tau = R_{Th} \cdot C = 2{,}400 \times 5 \times 10^{-6} = 12 \text{ ms}\]

### Step 4 — Complete Response

Applying the universal step-response formula with \(V_C(0) = 16\) V, \(V_C(\infty) = 9.6\) V, \(\tau = 12\) ms:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[V_C(t) = 9.6 + (16 - 9.6)\,e^{-t/0.012} = 9.6 + 6.4\,e^{-83.3t} \text{ V}, \quad t \geq 0\]

</div>

The voltage starts at 16 V and decays exponentially toward 9.6 V, with the transient term \(6.4\,e^{-83.3t}\) dying away with time constant 12 ms.

### Step 5 — Verification

**At \(t = 0^+\):** \(V_C = 9.6 + 6.4\,e^0 = 9.6 + 6.4 = 16\) V ✓ (matches initial condition)

**At \(t \to \infty\):** \(V_C = 9.6 + 6.4 \times 0 = 9.6\) V ✓ (matches final condition)

**At \(t = \tau = 12\) ms:** \(V_C = 9.6 + 6.4\,e^{-1} = 9.6 + 6.4 \times 0.368 = 9.6 + 2.35 = 11.95\) V

This is 63.2% of the way from the initial value (16 V) *down* to the final value (9.6 V):  
\(16 - 0.632 \times (16 - 9.6) = 16 - 4.04 = 11.96\) V ✓

---

## 6.9 Chapter Summary

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 28px; margin: 1rem 0;" markdown>

**Complete formula reference for first-order transients:**

| Circuit | Condition | State Variable | Formula | Time Constant |
|---------|-----------|---------------|---------|---------------|
| RC | Charging (0 → \(V_S\)) | \(V_C(t)\) | \(V_S\!\left(1-e^{-t/\tau}\right)\) | \(\tau = RC\) |
| RC | Discharging (\(V_0\) → 0) | \(V_C(t)\) | \(V_0\,e^{-t/\tau}\) | \(\tau = RC\) |
| RL | Energizing (0 → \(V_S/R\)) | \(I_L(t)\) | \(\dfrac{V_S}{R}\!\left(1-e^{-t/\tau}\right)\) | \(\tau = L/R\) |
| RL | De-energizing (\(I_0\) → 0) | \(I_L(t)\) | \(I_0\,e^{-t/\tau}\) | \(\tau = L/R\) |

**Universal step-response formula — works for ANY first-order DC transient:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 14px 24px; margin: 0.6rem 0 1rem 0; text-align: center;" markdown>

\[x(t) = x(\infty) + \bigl[x(0) - x(\infty)\bigr]\,e^{-t/\tau}\]

</div>

**Procedure:**
1. Find \(x(0)\): DC steady state before switching (C = open, L = short)
2. Find \(x(\infty)\): DC steady state after switching (C = open, L = short)
3. Find \(\tau = R_{Th}C\) or \(\tau = L/R_{Th}\) (Thévenin resistance seen by storage element)
4. Apply the universal formula

**Key milestones on the exponential curve:**

| Time elapsed | % complete (from \(x(0)\) to \(x(\infty)\)) |
|---|---|
| \(\tau\) | 63.2% |
| \(2\tau\) | 86.5% |
| \(3\tau\) | 95.0% |
| \(5\tau\) | 99.3% — treated as "done" |

</div>

---

## 6.10 Common Mistakes and Misconceptions

Even after mastering the procedure, students frequently make a handful of predictable errors. Here are the most common ones — with the correct reasoning.

### Mistake 1: Assuming Capacitor Voltage or Inductor Current Can Jump

**The error:** Setting the initial condition to the new steady-state value because "the switch just changed everything."

**The truth:** The state variable of the storage element (\(V_C\) or \(I_L\)) is continuous. It **cannot jump** at \(t = 0\). Energy cannot change instantaneously. The initial condition \(x(0^+)\) always equals the pre-switching value \(x(0^-)\).

!!! warning "Continuity Rule — Never Violate This"
    \(V_C(0^+) = V_C(0^-)\) always.  
    \(I_L(0^+) = I_L(0^-)\) always.  
    Everything else in the circuit **can** jump — resistor currents, capacitor current, inductor voltage — but not these two.

**Example of the error:** A capacitor charged to 5 V is connected to a 10 V source at \(t = 0\). A student writes \(V_C(0) = 10\) V. **Wrong.** The capacitor starts at 5 V and exponentially approaches 10 V.

### Mistake 2: Confusing Natural Response and Step Response

**Natural response** is the circuit's behavior when there is no external source — only the stored energy decaying away:

\[x_n(t) = x(0)\,e^{-t/\tau}\]

**Step response** (or forced response) is the circuit's behavior driven by a suddenly applied DC source, starting from zero initial conditions:

\[x_s(t) = x(\infty)\!\left(1 - e^{-t/\tau}\right)\]

**Complete response** is what you almost always want — both initial energy and a source driving the circuit:

\[x(t) = x(\infty) + \bigl[x(0) - x(\infty)\bigr]\,e^{-t/\tau}\]

The mistake is applying the natural-response formula (\(x(0)\,e^{-t/\tau}\)) when a source is present, which gives the wrong final value.

### Mistake 3: Using the Wrong Thévenin Resistance for τ

To find \(\tau\), you must find the Thévenin resistance **seen by the energy storage element**, not the Thévenin resistance looking into the terminals of the whole circuit.

**Procedure:**
1. Remove the capacitor (or inductor) from the circuit.
2. Kill all independent sources (short voltage sources, open current sources).
3. Find the equivalent resistance looking into the terminals where the element was connected.

!!! danger "Keep Dependent Sources Active"
    When killing sources to find \(R_{Th}\), only independent sources are killed. Dependent sources (those controlled by a voltage or current elsewhere in the circuit) must remain. If dependent sources are present, use the test-voltage or \(V_{oc}/I_{sc}\) method.

### Mistake 4: Sign Errors in the Exponential Term

The universal formula \(x(\infty) + [x(0) - x(\infty)]\,e^{-t/\tau}\) always has a **negative** exponent (\(-t/\tau\)), never positive. A positive exponent would produce a signal growing without bound, which violates energy conservation in a passive circuit.

If you find yourself writing \(e^{+t/\tau}\), stop and check your algebra — the sign error is almost certainly in the step where you match initial conditions.

### Mistake 5: Applying Steady-State Assumptions Mid-Transient

In DC steady state: capacitor → open circuit, inductor → short circuit. These substitutions are **only valid at \(t = 0^-\) and \(t \to \infty\)**. During the transient, the capacitor has an impedance \(1/(j\omega C)\) and the inductor has impedance \(j\omega L\) — but since we're in the time domain, we represent them by their differential equations, not by open/short substitutions.

Never draw a circuit diagram with the capacitor as an open and then write KCL for a mid-transient time. The open-circuit substitution only applies at the two steady-state endpoints used to find \(x(0)\) and \(x(\infty)\).

</div>

</div>
