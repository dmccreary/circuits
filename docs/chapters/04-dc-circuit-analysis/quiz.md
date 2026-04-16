---
title: Chapter 4 Quiz — DC Circuit Analysis Methods
description: Multiple choice quiz and practice problems for Chapter 4 covering Thevenin, Norton, source transformation, and maximum power transfer
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 4 Quiz — DC Circuit Analysis Methods

## Multiple Choice Questions

**1.** A 20 V voltage source in series with a 5 Ω resistor is transformed to its Norton equivalent. What is the Norton current?

- A) 4 A
- B) 100 A
- C) 0.25 A
- D) 5 A

??? success "Answer"
    **A) 4 A**

    Norton current \(I_N = V_S / R_S = 20 / 5 = 4\) A. The Norton equivalent consists of a 4 A current source in parallel with a 5 Ω resistor.

---

**2.** To find the Thévenin resistance \(R_{Th}\) of a circuit containing only independent sources, you:

- A) Calculate \(V_{oc} / V_S\)
- B) Kill all independent sources and find the resistance looking into the terminals
- C) Short all terminals and measure current
- D) Add all resistances in the circuit

??? success "Answer"
    **B) Kill all independent sources and find the resistance looking into the terminals**

    Independent voltage sources are replaced by short circuits and independent current sources are replaced by open circuits. Then the resistance seen at the terminals is \(R_{Th}\).

---

**3.** A circuit's Thévenin equivalent has \(V_{Th} = 12\) V and \(R_{Th} = 4\) Ω. What value of load resistance \(R_L\) maximizes power transfer to the load?

- A) 2 Ω
- B) 8 Ω
- C) 4 Ω
- D) 12 Ω

??? success "Answer"
    **C) 4 Ω**

    By the maximum power transfer theorem, \(R_L = R_{Th} = 4\) Ω for maximum power.

---

**4.** Using the circuit in Q3 with \(R_L = R_{Th} = 4\) Ω, what is the maximum power delivered to the load?

- A) 9 W
- B) 36 W
- C) 18 W
- D) 3 W

??? success "Answer"
    **A) 9 W**

    \(P_{max} = V_{Th}^2 / (4 R_{Th}) = 144 / (4 \times 4) = 144 / 16 = 9\) W.

---

**5.** A Thévenin equivalent has \(V_{Th} = 8\) V and \(R_{Th} = 2\) Ω. What is the Norton equivalent current source?

- A) 16 A
- B) 0.25 A
- C) 4 A
- D) 2 A

??? success "Answer"
    **C) 4 A**

    \(I_N = V_{Th} / R_{Th} = 8 / 2 = 4\) A. The Norton resistance \(R_N = R_{Th} = 2\) Ω.

---

**6.** When finding the Thévenin resistance of a circuit containing dependent sources, you should:

- A) Kill all sources including dependent ones
- B) Kill only independent sources and apply a test voltage or current at the terminals
- C) Short all terminals and measure voltage
- D) Only kill voltage sources, leave current sources active

??? success "Answer"
    **B) Kill only independent sources and apply a test voltage or current at the terminals**

    Dependent sources must remain active. Apply a test voltage \(V_T\) or current \(I_T\) to the terminals, then \(R_{Th} = V_T / I_T\).

---

**7.** The efficiency at maximum power transfer (when \(R_L = R_{Th}\)) is:

- A) 100%
- B) 75%
- C) 25%
- D) 50%

??? success "Answer"
    **D) 50%**

    When \(R_L = R_{Th}\), equal power is dissipated in the load and in the source resistance, so the efficiency is exactly 50%.

---

**8.** A source has output resistance \(R_{out} = 500\) Ω and open-circuit voltage of 5 V. It drives a load with input resistance \(R_{in} = 500\) Ω. What voltage appears across the load?

- A) 5 V
- B) 1 V
- C) 2.5 V
- D) 0 V

??? success "Answer"
    **C) 2.5 V**

    Loading effect: \(V_{load} = V_S \times R_{in}/(R_{out} + R_{in}) = 5 \times 500/1000 = 2.5\) V. The 500 Ω source resistance and 500 Ω load form a voltage divider.

---

**9.** Which of the following is NOT a valid two-port network parameter set?

- A) Z-parameters
- B) h-parameters
- C) R-parameters
- D) Y-parameters

??? success "Answer"
    **C) R-parameters**

    Standard two-port parameter sets include Z (impedance), Y (admittance), h (hybrid), g (inverse hybrid), and ABCD (transmission) parameters. There is no "R-parameter" set.

---

**10.** A current source of 6 A in parallel with a 3 Ω resistor is converted to its Thévenin equivalent. What is \(V_{Th}\)?

- A) 2 V
- B) 0.5 V
- C) 18 V
- D) 3 V

??? success "Answer"
    **C) 18 V**

    \(V_{Th} = I_N \times R_P = 6 \times 3 = 18\) V. The Thévenin equivalent is an 18 V source in series with a 3 Ω resistor.


</div>
