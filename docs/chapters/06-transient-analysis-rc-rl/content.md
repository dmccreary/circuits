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

**Problem:** A 24 V source drives a circuit with R1 = 6 kΩ in series with a parallel combination of R2 = 12 kΩ and C = 10 μF. The switch closes at \(t = 0\). Find \(V_C(t)\) for \(t \geq 0\).

Assume the capacitor is initially uncharged.

**Step 1 — Initial condition:**
At \(t = 0^-\), capacitor is uncharged: \(V_C(0) = 0\) V.

**Step 2 — Final condition:**
At \(t \to \infty\), capacitor is open circuit. Current through R1 and R2 in series:
\(I = 24 / (6\,\text{k} + 12\,\text{k}) = 24/18\,\text{k} = 1.33\) mA  
\(V_C(\infty) = I \times R2 = 1.33\,\text{m} \times 12\,\text{k} = 16\) V

**Step 3 — Time constant:**
Kill the source (short); Thévenin resistance seen by C = R1 ∥ R2 = (6k × 12k)/(6k + 12k) = 4 kΩ  
\(\tau = R_{Th} C = 4\,000 \times 10 \times 10^{-6} = 40\) ms

**Step 4 — Complete response:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[V_C(t) = 16 + (0 - 16)\,e^{-t/0.04} = 16\left(1 - e^{-25t}\right) \text{ V}, \quad t \geq 0\]

</div>

At \(t = \tau = 40\) ms: \(V_C = 16(1 - e^{-1}) = 16 \times 0.632 = 10.1\) V ✓

---

## 6.9 Chapter Summary

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 28px; margin: 1rem 0;" markdown>

**Key results:**

| Circuit | Time Constant | Energizing | De-energizing |
|---------|--------------|------------|---------------|
| RC | \(\tau = RC\) | \(V_C = V_S(1-e^{-t/\tau})\) | \(V_C = V_0 e^{-t/\tau}\) |
| RL | \(\tau = L/R\) | \(I_L = (V_S/R)(1-e^{-t/\tau})\) | \(I_L = I_0 e^{-t/\tau}\) |

**Universal formula for any first-order DC transient:**

\[x(t) = x(\infty) + [x(0) - x(\infty)]\,e^{-t/\tau}\]

**Procedure:**
1. Find \(x(0)\): DC steady state before switching (C = open, L = short)
2. Find \(x(\infty)\): DC steady state after switching (C = open, L = short)
3. Find \(\tau = R_{Th}C\) or \(\tau = L/R_{Th}\) (Thévenin resistance seen by storage element)
4. Apply the universal formula

**Rules:**
- At \(t = \tau\): circuit is 63.2% from initial to final
- After \(5\tau\): circuit is 99.3% complete — treated as fully settled

</div>

</div>
