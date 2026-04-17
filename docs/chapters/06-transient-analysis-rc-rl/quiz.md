---
title: Chapter 6 Quiz — Transient Analysis of RC and RL Circuits
description: Multiple choice quiz and practice problems for Chapter 6 covering time constants, exponential responses, and first-order transient analysis
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 6 Quiz — Transient Analysis of RC and RL Circuits

## Multiple Choice Questions

**1.** An RC circuit has R = 47 kΩ and C = 10 μF. What is the time constant?

- A) 47 ms
- B) 470 ms
- C) 4.7 s
- D) 4.7 ms

??? success "Answer"
    **B) 470 ms**

    \(\tau = RC = 47 \times 10^3 \times 10 \times 10^{-6} = 470 \times 10^{-3}\) s = 470 ms.

---

**2.** A capacitor is initially uncharged and is connected to a 10 V source through a resistor. After one time constant, the capacitor voltage is approximately:

- A) 3.68 V
- B) 6.32 V
- C) 5 V
- D) 10 V

??? success "Answer"
    **B) 6.32 V**

    After \(t = \tau\): \(V_C = V_S(1 - e^{-1}) = 10(1 - 0.368) = 10 \times 0.632 = 6.32\) V.

---

**3.** How many time constants must elapse before a first-order circuit is considered to have reached steady state (99.3% complete)?

- A) 1
- B) 3
- C) 5
- D) 10

??? success "Answer"
    **C) 5**

    After \(5\tau\): \(e^{-5} \approx 0.0067\), so the circuit is 99.3% of the way to its final value. Engineers consider the transient complete after 5 time constants.

---

**4.** An inductor cannot change its current instantaneously. This is because:

- A) Resistors in series limit the current
- B) An instantaneous current change would require infinite voltage (\(v = L\,di/dt\))
- C) Capacitors block the change
- D) KVL prevents it

??? success "Answer"
    **B) An instantaneous current change would require infinite voltage**

    The V-I relationship \(v = L\,di/dt\) means that \(di/dt \to \infty\) (instantaneous change) would require \(v \to \infty\), which is physically impossible in a real circuit.

---

**5.** For an RL circuit with L = 100 mH and R = 50 Ω, what is the time constant?

- A) 5 s
- B) 50 ms
- C) 2 ms
- D) 0.5 s

??? success "Answer"
    **C) 2 ms**

    \(\tau = L/R = 0.1 / 50 = 0.002\) s = 2 ms.

---

**6.** Using the universal step-response formula, what value does \(x(t)\) approach as \(t \to \infty\)?

- A) \(x(0)\)
- B) Zero
- C) \(x(\infty)\)
- D) \(\tau\)

??? success "Answer"
    **C) \(x(\infty)\)**

    The formula is \(x(t) = x(\infty) + [x(0) - x(\infty)]e^{-t/\tau}\). As \(t \to \infty\), \(e^{-t/\tau} \to 0\), so \(x(t) \to x(\infty)\).

---

**7.** When analyzing a complex circuit to find the time constant \(\tau\), what do you use as the resistance \(R\)?

- A) The total resistance in the circuit
- B) The Thévenin resistance seen by the energy storage element (C or L)
- C) The series resistance only
- D) The parallel resistance only

??? success "Answer"
    **B) The Thévenin resistance seen by the energy storage element**

    Kill all independent sources, remove the capacitor or inductor, and find the resistance seen at those terminals — this is \(R_{Th}\). Then \(\tau = R_{Th} C\) or \(\tau = L/R_{Th}\).

---

**8.** In DC steady state, how does an inductor behave?

- A) As an open circuit with large voltage across it
- B) As a short circuit with zero voltage across it
- C) As a resistor
- D) As a capacitor

??? success "Answer"
    **B) As a short circuit with zero voltage across it**

    In DC steady state, current is constant (\(di/dt = 0\)), so \(v_L = L\,di/dt = 0\). An inductor is a short circuit (a wire) at DC.

---

**9.** A capacitor voltage is \(V_C(t) = 15 - 15e^{-2t}\) V. What are the initial and final values?

- A) Initial = 0 V, Final = 15 V
- B) Initial = 15 V, Final = 0 V
- C) Initial = 0 V, Final = 30 V
- D) Initial = 7.5 V, Final = 15 V

??? success "Answer"
    **A) Initial = 0 V, Final = 15 V**

    At \(t = 0\): \(V_C(0) = 15 - 15e^0 = 15 - 15 = 0\) V.  
    As \(t \to \infty\): \(V_C(\infty) = 15 - 0 = 15\) V.

---

**10.** The "natural response" of a first-order circuit is:

- A) The steady-state response to the source
- B) The circuit's response due to initial stored energy, which decays to zero
- C) The complete response including all sources
- D) The sinusoidal AC response

??? success "Answer"
    **B) The circuit's response due to initial stored energy, which decays to zero**

    The natural response \(x_n(t) = Ae^{-t/\tau}\) results from the energy initially stored in the capacitor or inductor, decaying exponentially to zero without any external forcing.

---

## Practice Problems

**Problem 1: RC Charging Transient**

A series RC circuit has R = 20 kΩ, C = 25 μF, and a 15 V source. The switch closes at \(t = 0\) with the capacitor initially uncharged.

a) Find the time constant.  
b) Write the expression for \(V_C(t)\).  
c) What is \(V_C\) after 1 time constant? After 3 time constants?  
d) How long until \(V_C = 10\) V?

??? success "Solution"
    **a)** \(\tau = RC = 20\,000 \times 25 \times 10^{-6} = 0.5\) s

    **b)** \(V_C(t) = 15(1 - e^{-t/0.5}) = 15(1 - e^{-2t})\) V

    **c)** After \(\tau = 0.5\) s: \(V_C = 15 \times 0.632 = 9.48\) V

    After \(3\tau = 1.5\) s: \(V_C = 15(1 - e^{-3}) = 15 \times 0.950 = 14.25\) V

    **d)** Solve \(10 = 15(1 - e^{-2t})\):

    \(e^{-2t} = 1 - 10/15 = 1/3\)

    \(-2t = \ln(1/3) = -\ln 3\)

    \(t = \frac{\ln 3}{2} = \frac{1.099}{2} \approx 0.55\) s

---

**Problem 2: RL Energizing Transient**

A 12 V source is switched into an RL circuit with R = 6 Ω and L = 30 mH at \(t = 0\). The inductor carries no initial current.

a) Find the time constant and the final (steady-state) current.  
b) Write the expression for \(i_L(t)\).  
c) Find the inductor voltage \(v_L(t)\).  
d) Verify that at \(t = 0^+\): the inductor voltage equals 12 V and current is 0.

??? success "Solution"
    **a)** \(\tau = L/R = 30 \times 10^{-3} / 6 = 5\) ms

    Final current: \(I_\infty = V_S/R = 12/6 = 2\) A

    **b)** \(i_L(t) = 2(1 - e^{-t/0.005}) = 2(1 - e^{-200t})\) A

    **c)** \(v_L = L\,di/dt = 0.03 \times 2 \times 200\,e^{-200t} = 12\,e^{-200t}\) V

    **d)** At \(t = 0^+\):
    - \(i_L(0) = 2(1-1) = 0\) A ✓ (current starts at zero)
    - \(v_L(0) = 12\,e^0 = 12\) V ✓ (all source voltage appears across inductor initially)

---

**Problem 3: Universal Step-Response Formula**

A circuit contains a 20 V source and two resistors: R1 = 4 Ω, R2 = 6 Ω. A capacitor C = 500 μF is in parallel with R2. The switch closes at \(t = 0\). Before switching, the capacitor was charged to 5 V.

a) Find \(V_C(0)\), \(V_C(\infty)\), and \(\tau\).  
b) Write \(V_C(t)\).  
c) At what time does \(V_C = 10\) V?

??? success "Solution"
    **a)** \(V_C(0) = 5\) V (given)

    \(V_C(\infty)\): At DC steady state, C is open. Voltage divider: \(V_C(\infty) = 20 \times \frac{6}{4+6} = 12\) V

    \(\tau\): Kill source (short it). R1 and R2 in parallel as seen by C: \(R_{Th} = \frac{4 \times 6}{4+6} = 2.4\) Ω  
    \(\tau = R_{Th}C = 2.4 \times 500 \times 10^{-6} = 1.2\) ms

    **b)** \(V_C(t) = 12 + (5 - 12)e^{-t/0.0012} = 12 - 7e^{-833t}\) V

    **c)** Solve \(10 = 12 - 7e^{-833t}\):

    \(7e^{-833t} = 2\)  
    \(e^{-833t} = 2/7\)  
    \(t = -\ln(2/7)/833 = \ln(7/2)/833 = 1.253/833 \approx 1.5\) ms

---

**Problem 4: RC Discharge with Energy**

A 100 μF capacitor is charged to 24 V and then discharged through a 2 kΩ resistor at \(t = 0\).

a) Find the initial stored energy.  
b) Write \(V_C(t)\) and \(i(t)\).  
c) Find the power dissipated in the resistor as a function of time.  
d) Show that the total energy dissipated equals the initial stored energy.

??? success "Solution"
    **a)** \(E_0 = \frac{1}{2}CV^2 = \frac{1}{2} \times 100\times10^{-6} \times 576 = 28.8\) mJ

    **b)** \(\tau = RC = 2000 \times 100 \times 10^{-6} = 0.2\) s

    \(V_C(t) = 24\,e^{-5t}\) V (since \(1/\tau = 5\))

    \(i(t) = \frac{V_C}{R} = \frac{24}{2000}e^{-5t} = 12\,e^{-5t}\) mA

    **c)** \(p_R(t) = i^2 R = (12\times10^{-3})^2 \times 2000 \times e^{-10t} = 0.288\,e^{-10t}\) W

    **d)** Total energy dissipated:

    \(E = \int_0^\infty 0.288\,e^{-10t}\,dt = 0.288 \times \frac{1}{10} = 0.0288\) J = 28.8 mJ ✓

    All stored energy is dissipated as heat in the resistor.

</div>
