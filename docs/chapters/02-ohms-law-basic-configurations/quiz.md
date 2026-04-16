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

