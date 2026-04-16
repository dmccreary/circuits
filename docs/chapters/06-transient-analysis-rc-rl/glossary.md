---
title: Chapter 6 Glossary — Transient Analysis of RC and RL Circuits
description: Key terms and definitions for Chapter 6
---

<div class="unit1-styled" markdown>

# Chapter 6 Glossary

| Term | Definition |
|------|-----------|
| Transient response | The behavior of a circuit during the transition from one steady state to another, following a disturbance such as a switch opening or closing. First-order circuits always produce exponential transients. The transient is temporary and dies out as the circuit settles to its new steady state. |
| Steady-state response | The long-term circuit behavior after all transients have died out. For DC sources, steady state means constant voltages and currents. For AC sources, steady state means periodic voltages and currents. Capacitors act as open circuits and inductors act as short circuits in DC steady state. |
| Time constant | The parameter \(\tau\) that governs the rate of a first-order exponential transient. For RC circuits: \(\tau = RC\). For RL circuits: \(\tau = L/R\). At \(t = \tau\) the response is 63.2% complete; at \(5\tau\) it is 99.3% complete and considered done. The time constant has units of seconds and represents the natural pace of the circuit. |
| RC circuit | A circuit containing a resistor and a capacitor. The capacitor voltage follows an exponential transient with time constant \(\tau = RC\). During charging from a voltage source: \(V_C(t) = V_S(1 - e^{-t/\tau})\). During discharging: \(V_C(t) = V_0 e^{-t/\tau}\). |
| RC charging | The process by which a capacitor charges toward a supply voltage through a series resistance. The voltage rises exponentially from its initial value toward \(V_S\). Current starts at \(V_S/R\) (capacitor initially a short circuit) and decays to zero as the capacitor charges fully. |
| RC discharging | The process by which a charged capacitor releases its stored energy through a resistance. Voltage decays exponentially: \(V_C(t) = V_0 e^{-t/\tau}\). All energy originally stored in the capacitor is dissipated as heat in the resistor. |
| RL circuit | A circuit containing a resistor and an inductor. The inductor current follows an exponential transient with time constant \(\tau = L/R\). During energizing: \(i_L(t) = (V_S/R)(1-e^{-t/\tau})\). During de-energizing (source removed): \(i_L(t) = I_0 e^{-t/\tau}\). |
| RL energizing | The process by which inductor current rises toward its final value \(V_S/R\) when a voltage source is connected. Current starts at 0 (inductor initially open circuit) and rises exponentially. The inductor voltage starts at \(V_S\) and decays to zero. |
| RL de-energizing | The process by which a current-carrying inductor releases its stored magnetic energy when the source is removed. Current decays exponentially through the load resistance. Inductors can produce large voltage spikes during rapid de-energizing (flyback), requiring protective diodes in switching circuits. |
| Exponential response | The universal form of the first-order transient: \(x(t) = x(\infty) + [x(0) - x(\infty)]e^{-t/\tau}\), where \(x(0)\) is the initial value, \(x(\infty)\) is the final value, and \(\tau\) is the time constant. This single equation describes charging, discharging, energizing, and de-energizing for any first-order circuit. |
| Initial conditions | The values of capacitor voltage and inductor current at the instant of switching (\(t = 0^+\)). These must be determined before applying the exponential response formula. Since capacitor voltage and inductor current cannot change instantaneously, \(V_C(0^+) = V_C(0^-)\) and \(I_L(0^+) = I_L(0^-)\). |
| Final conditions | The values of voltages and currents as \(t \to \infty\) in the new steady state. For DC sources: capacitors are open circuits (no current), inductors are short circuits (no voltage). Final conditions define the target that the exponential response approaches asymptotically. |
| Natural response | The component of the circuit response due to the initial energy stored in the circuit (initial capacitor voltage or inductor current), with all independent sources set to zero. Always an exponentially decaying function: \(x_n(t) = A e^{-t/\tau}\). It represents the circuit releasing its stored energy. |
| Forced response | The component of the circuit response due to the applied sources, with zero initial energy storage. For a DC source, the forced response is the constant DC steady-state value. It is the particular solution to the circuit differential equation. |
| Complete response | The sum of the natural and forced responses: \(x(t) = x_n(t) + x_f(t)\). Equivalently, using the universal formula: \(x(t) = x(\infty) + [x(0) - x(\infty)]e^{-t/\tau}\). The complete response satisfies both the initial conditions and the final steady state. |

</div>
