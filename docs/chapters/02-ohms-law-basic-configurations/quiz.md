# Chapter 2 Quiz — Ohm's Law and Basic Circuit Configurations

## Multiple Choice Quiz

**1. Ohm's Law states that, for a resistor with constant resistance:**

- [ ] A) Voltage and current are inversely proportional
- [ ] B) Voltage and current are directly proportional
- [ ] C) Resistance increases with temperature
- [ ] D) Power is constant regardless of current

??? success "Answer"
    **B) Voltage and current are directly proportional.** Ohm's Law is \(V = IR\). When resistance \(R\) is constant, doubling the voltage doubles the current — a linear (directly proportional) relationship. This linearity is one of the most useful properties of resistive circuits.

---

**2. A 15V source is connected to a 5kΩ resistor. The current through the resistor is:**

- [ ] A) 75 mA
- [ ] B) 3 mA
- [ ] C) 0.33 mA
- [ ] D) 300 mA

??? success "Answer"
    **B) 3 mA.** Using Ohm's Law: \(I = V/R = 15\text{ V} / 5000\text{ Ω} = 0.003\text{ A} = 3\text{ mA}\).

---

**3. Two resistors R1 = 4Ω and R2 = 6Ω are connected in series. Their equivalent resistance is:**

- [ ] A) 2.4 Ω
- [ ] B) 5 Ω
- [ ] C) 10 Ω
- [ ] D) 24 Ω

??? success "Answer"
    **C) 10 Ω.** Series resistances add directly: \(R_{eq} = R_1 + R_2 = 4 + 6 = 10\text{ Ω}\). The equivalent resistance of a series combination is always larger than any individual resistor.

---

**4. Two resistors R1 = 4Ω and R2 = 6Ω are connected in parallel. Their equivalent resistance is:**

- [ ] A) 2.4 Ω
- [ ] B) 5 Ω
- [ ] C) 10 Ω
- [ ] D) 24 Ω

??? success "Answer"
    **A) 2.4 Ω.** Using the product-over-sum formula: \(R_{eq} = (R_1 \cdot R_2)/(R_1 + R_2) = (4 \times 6)/(4 + 6) = 24/10 = 2.4\text{ Ω}\). The equivalent resistance of a parallel combination is always less than the smallest individual resistor.

---

**5. In a series circuit with a 12V source and three equal resistors, the voltage across each resistor is:**

- [ ] A) 36 V
- [ ] B) 12 V
- [ ] C) 6 V
- [ ] D) 4 V

??? success "Answer"
    **D) 4 V.** In a series circuit, the source voltage divides among the resistors in proportion to their resistance. With three equal resistors, each gets \(12\text{V} / 3 = 4\text{V}\). The sum \(4 + 4 + 4 = 12\text{ V}\) satisfies Kirchhoff's Voltage Law.

---

**6. A voltage divider uses R1 = 8kΩ and R2 = 2kΩ connected to a 10V source. The output voltage (across R2) is:**

- [ ] A) 8 V
- [ ] B) 5 V
- [ ] C) 2 V
- [ ] D) 4 V

??? success "Answer"
    **C) 2 V.** Using the voltage divider formula:

    \[V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2} = 10 \times \frac{2\text{k}}{8\text{k} + 2\text{k}} = 10 \times \frac{2}{10} = 2\text{ V}\]

---

**7. In a parallel circuit with a 24V source and two resistors (R1 = 6Ω, R2 = 12Ω), the current through R1 is:**

- [ ] A) 2 A
- [ ] B) 4 A
- [ ] C) 6 A
- [ ] D) 3 A

??? success "Answer"
    **B) 4 A.** In a parallel circuit, the same voltage (24V) appears across both resistors. Each branch is analyzed with Ohm's Law independently: \(I_1 = V/R_1 = 24/6 = 4\text{ A}\).

---

**8. A resistor has color bands: Orange, Orange, Red, Gold. Its resistance value and tolerance are:**

- [ ] A) 3.3kΩ ±5%
- [ ] B) 3.3kΩ ±10%
- [ ] C) 33kΩ ±5%
- [ ] D) 330Ω ±5%

??? success "Answer"
    **A) 3.3kΩ ±5%.** Decoding: Orange = 3 (first digit), Orange = 3 (second digit), Red = ×100 (multiplier), Gold = ±5% (tolerance). Value = 33 × 100 = 3300Ω = 3.3kΩ, tolerance ±5%.

---

**9. A resistor is rated at 1W. If 50V appears across it, what minimum resistance is required to stay within the power rating?**

- [ ] A) 500 Ω
- [ ] B) 1000 Ω
- [ ] C) 2500 Ω
- [ ] D) 50 Ω

??? success "Answer"
    **C) 2500 Ω.** Using \(P = V^2/R\), solving for \(R\):

    \[R_{min} = \frac{V^2}{P_{max}} = \frac{(50)^2}{1} = 2500\text{ Ω}\]

    A resistance below 2500Ω would cause the power dissipation to exceed 1W, violating the rating.

---

**10. The current divider rule states that, for two parallel resistors R1 and R2 with total current I, the current through R1 is:**

- [ ] A) \(I \times R_1 / (R_1 + R_2)\)
- [ ] B) \(I \times R_2 / (R_1 + R_2)\)
- [ ] C) \(I \times (R_1 + R_2) / R_2\)
- [ ] D) \(I / R_1\)

??? success "Answer"
    **B) \(I \times R_2 / (R_1 + R_2)\).** The counterintuitive aspect: the current through R1 depends on R2. More current flows through the smaller resistance — the path of least resistance. The formula assigns more current to whichever branch has *lower* resistance.

---

## Practice Problems

### Problem 1 — Ohm's Law and Power

A 9V battery is connected to a 470Ω resistor.

**(a)** Find the current through the resistor.

**(b)** Find the power dissipated by the resistor.

**(c)** Is a standard 1/4W (0.25W) resistor adequate?

**(d)** What value of resistance would dissipate exactly 1W at 9V?

??? success "Solution"
    **(a)** \[I = \frac{V}{R} = \frac{9\text{ V}}{470\text{ Ω}} = 19.1\text{ mA}\]

    **(b)** \[P = I^2 R = (0.0191)^2 \times 470 = 0.000365 \times 470 = 171.6\text{ mW}\]

    Or: \(P = V^2/R = 81/470 = 172\text{ mW}\)

    **(c)** 172 mW > 250 mW? No — 172 mW is less than 250 mW, so a 1/4W resistor is adequate. However, it operates at 69% of rating, which is marginal. A 1/2W resistor would be better practice (34% utilization).

    **(d)** \[R = \frac{V^2}{P} = \frac{81}{1} = 81\text{ Ω}\]

---

### Problem 2 — Series Circuit Analysis

A 24V source is connected to three series resistors: R1 = 2kΩ, R2 = 4kΩ, R3 = 6kΩ.

**(a)** Find the equivalent resistance.

**(b)** Find the current through the circuit.

**(c)** Find the voltage across each resistor.

**(d)** Verify Kirchhoff's Voltage Law.

??? success "Solution"
    **(a)** \[R_{eq} = R_1 + R_2 + R_3 = 2\text{k} + 4\text{k} + 6\text{k} = 12\text{kΩ}\]

    **(b)** \[I = \frac{V}{R_{eq}} = \frac{24\text{ V}}{12{,}000\text{ Ω}} = 2\text{ mA}\]

    **(c)** \[V_1 = IR_1 = 2\text{ mA} \times 2\text{kΩ} = 4\text{ V}\]
    \[V_2 = IR_2 = 2\text{ mA} \times 4\text{kΩ} = 8\text{ V}\]
    \[V_3 = IR_3 = 2\text{ mA} \times 6\text{kΩ} = 12\text{ V}\]

    **(d)** KVL check: \(V_1 + V_2 + V_3 = 4 + 8 + 12 = 24\text{ V} = V_s\) ✓

---

### Problem 3 — Parallel Circuit Analysis

Three resistors R1 = 100Ω, R2 = 200Ω, and R3 = 400Ω are connected in parallel across a 20V source.

**(a)** Find the equivalent resistance.

**(b)** Find the current through each resistor.

**(c)** Find the total current from the source.

**(d)** Verify: the total current should equal \(V_s / R_{eq}\).

??? success "Solution"
    **(a)** \[\frac{1}{R_{eq}} = \frac{1}{100} + \frac{1}{200} + \frac{1}{400} = \frac{4}{400} + \frac{2}{400} + \frac{1}{400} = \frac{7}{400}\]

    \[R_{eq} = \frac{400}{7} \approx 57.1\text{ Ω}\]

    **(b)** All resistors share the 20V source voltage:

    \[I_1 = \frac{20}{100} = 200\text{ mA}, \quad I_2 = \frac{20}{200} = 100\text{ mA}, \quad I_3 = \frac{20}{400} = 50\text{ mA}\]

    **(c)** \[I_{total} = I_1 + I_2 + I_3 = 200 + 100 + 50 = 350\text{ mA}\]

    **(d)** \[I_{total} = \frac{V_s}{R_{eq}} = \frac{20}{400/7} = \frac{20 \times 7}{400} = \frac{140}{400} = 0.35\text{ A} = 350\text{ mA}\] ✓

---

### Problem 4 — Voltage Divider Design

You need to produce a 3.3V reference from a 12V supply using a voltage divider. Assume the load draws negligible current.

**(a)** If R1 = 10kΩ, find the required value of R2.

**(b)** Calculate the current flowing through the divider.

**(c)** What power does each resistor dissipate?

**(d)** Are 1/4W resistors adequate?

??? success "Solution"
    **(a)** Using the voltage divider formula and solving for R2:

    \[V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2}\]

    \[3.3 = 12 \times \frac{R_2}{10\text{k} + R_2}\]

    \[3.3(10\text{k} + R_2) = 12 R_2\]

    \[33{,}000 = 12 R_2 - 3.3 R_2 = 8.7 R_2\]

    \[R_2 = \frac{33{,}000}{8.7} \approx 3.79\text{ kΩ}\]

    The nearest standard value is 3.9kΩ (E24 series), giving \(V_{out} = 12 \times 3.9/(10 + 3.9) = 3.37\text{ V}\), which is close enough for most applications.

    **(b)** \[I = \frac{V_{in}}{R_1 + R_2} = \frac{12\text{ V}}{10\text{k} + 3.79\text{k}} = \frac{12}{13.79\text{k}} = 0.87\text{ mA}\]

    **(c)** \[P_1 = I^2 R_1 = (0.00087)^2 \times 10{,}000 = 7.57\text{ mW}\]
    \[P_2 = I^2 R_2 = (0.00087)^2 \times 3{,}790 = 2.87\text{ mW}\]

    **(d)** Both are well below 250 mW. Yes, 1/4W resistors are more than adequate.
