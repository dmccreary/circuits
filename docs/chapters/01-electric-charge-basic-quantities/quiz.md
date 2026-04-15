# Chapter 1 Quiz — Electric Charge and Basic Circuit Quantities

## Multiple Choice Quiz

**1. The fundamental unit of electric charge is the:**

- [ ] A) Ampere
- [ ] B) Coulomb
- [ ] C) Volt
- [ ] D) Joule

??? success "Answer"
    **B) Coulomb.** The coulomb (C) is the SI unit of electric charge. One coulomb is equal to approximately 6.24 × 10¹⁸ elementary charges (the charge of a proton or the magnitude of the charge of an electron).

---

**2. Electric current is defined as:**

- [ ] A) The energy stored in a circuit
- [ ] B) The voltage difference between two points
- [ ] C) The rate of flow of electric charge
- [ ] D) The opposition to charge flow

??? success "Answer"
    **C) The rate of flow of electric charge.** Current \(I = dQ/dt\) — it is the rate at which charge moves past a point in the circuit. Its SI unit is the ampere (A), equal to one coulomb per second.

---

**3. If a charge of 5 coulombs passes a point in 2 seconds, the current is:**

- [ ] A) 10 A
- [ ] B) 7 A
- [ ] C) 2.5 A
- [ ] D) 0.4 A

??? success "Answer"
    **C) 2.5 A.** Using \(I = Q/t = 5\text{ C} / 2\text{ s} = 2.5\text{ A}\). One ampere is defined as one coulomb per second.

---

**4. Which of the following correctly states Ohm's Law?**

- [ ] A) \(P = IV\)
- [ ] B) \(V = IR\)
- [ ] C) \(G = R\)
- [ ] D) \(W = Pt\)

??? success "Answer"
    **B) \(V = IR\).** Ohm's Law states that the voltage across a resistor equals the current through it multiplied by its resistance. The other options are: P = IV (power equation), G = 1/R (conductance), W = Pt (energy equation).

---

**5. A 6V battery is connected to a 2kΩ resistor. What current flows?**

- [ ] A) 12 mA
- [ ] B) 3 mA
- [ ] C) 0.3 mA
- [ ] D) 300 mA

??? success "Answer"
    **B) 3 mA.** Using Ohm's Law: \(I = V/R = 6\text{ V} / 2000\text{ Ω} = 0.003\text{ A} = 3\text{ mA}\).

---

**6. Power dissipated in a resistor can be calculated as:**

- [ ] A) \(P = V + I\)
- [ ] B) \(P = V/I\)
- [ ] C) \(P = I^2 R\)
- [ ] D) \(P = R/V\)

??? success "Answer"
    **C) \(P = I^2 R\).** Power dissipated in a resistor is given by \(P = VI = I^2R = V^2/R\). All three forms are equivalent; use whichever is convenient given the known quantities.

---

**7. In electrical circuits, "ground" refers to:**

- [ ] A) The physical Earth connection required for all circuits
- [ ] B) The 0V reference point from which voltages are measured
- [ ] C) The negative terminal of the battery
- [ ] D) A short circuit condition

??? success "Answer"
    **B) The 0V reference point from which voltages are measured.** Ground (or electrical ground) is a conventional reference point assigned 0V. It does not need to be physically connected to Earth — it is simply the datum from which all other voltages in the circuit are measured.

---

**8. An open circuit has:**

- [ ] A) Zero resistance and zero voltage
- [ ] B) Infinite resistance and zero current
- [ ] C) Zero resistance and maximum current
- [ ] D) Finite resistance and maximum voltage

??? success "Answer"
    **B) Infinite resistance and zero current.** An open circuit is a break in the conduction path — effectively infinite resistance. No current can flow (\(I = V/\infty = 0\)), though a voltage may appear across the open gap.

---

**9. A node in a circuit is defined as:**

- [ ] A) Any component that dissipates power
- [ ] B) A closed loop through the circuit
- [ ] C) A point where two or more circuit elements connect
- [ ] D) The junction between series and parallel sections

??? success "Answer"
    **C) A point where two or more circuit elements connect.** A node is a connection point. All points connected by ideal (zero-resistance) wire belong to the same node — even if they appear as multiple physical junction points in a schematic.

---

**10. A resistor is rated at 0.5W. If 200mA flows through it, what is the maximum resistance this rating allows?**

- [ ] A) 2.5 Ω
- [ ] B) 12.5 Ω
- [ ] C) 25 Ω
- [ ] D) 100 Ω

??? success "Answer"
    **B) 12.5 Ω.** Using \(P = I^2 R\):

    \[R = \frac{P}{I^2} = \frac{0.5\text{ W}}{(0.2\text{ A})^2} = \frac{0.5}{0.04} = 12.5\text{ Ω}\]

    A resistance greater than 12.5 Ω at 200mA would exceed the 0.5W power rating.

---

## Practice Problems

### Problem 1 — Current Calculation

A charge of 120 mC passes through a wire in 40 milliseconds.

**(a)** Calculate the current in amperes.

**(b)** Express the current in milliamperes.

**(c)** How long would it take for 1 coulomb of charge to pass at this rate?

??? success "Solution"
    **(a)** Convert units and apply the current definition:

    \[I = \frac{Q}{t} = \frac{120 \times 10^{-3}\text{ C}}{40 \times 10^{-3}\text{ s}} = \frac{0.12}{0.04} = 3\text{ A}\]

    **(b)** \(3\text{ A} = 3000\text{ mA}\)

    **(c)** \[t = \frac{Q}{I} = \frac{1\text{ C}}{3\text{ A}} = 0.333\text{ s} \approx 333\text{ ms}\]

---

### Problem 2 — Ohm's Law Application

A 9V battery is connected to a circuit containing a 3.3kΩ resistor.

**(a)** Calculate the current through the resistor.

**(b)** Calculate the power dissipated by the resistor.

**(c)** Is a standard 1/4W (0.25W) resistor adequate for this application?

??? success "Solution"
    **(a)** Apply Ohm's Law:

    \[I = \frac{V}{R} = \frac{9\text{ V}}{3300\text{ Ω}} = 2.73\text{ mA}\]

    **(b)** Calculate power:

    \[P = VI = 9\text{ V} \times 0.00273\text{ A} = 24.5\text{ mW}\]

    Or equivalently: \(P = V^2/R = 81/3300 = 24.5\text{ mW}\)

    **(c)** 24.5 mW is well below the 250 mW rating of a 1/4W resistor. A 1/4W resistor is more than adequate — it is running at less than 10% of its rated power, which is excellent practice.

---

### Problem 3 — Power and Energy

A 60W light bulb is left on for 8 hours.

**(a)** How much energy (in joules) is consumed?

**(b)** Express the energy in kilowatt-hours.

**(c)** If electricity costs \$0.13/kWh, what does it cost to run this bulb for 8 hours?

**(d)** What current does the bulb draw from a 120V outlet?

??? success "Solution"
    **(a)** Convert 8 hours to seconds and calculate energy:

    \[W = Pt = 60\text{ W} \times (8 \times 3600\text{ s}) = 60 \times 28800 = 1{,}728{,}000\text{ J} = 1.728\text{ MJ}\]

    **(b)** \(W = 60\text{ W} \times 8\text{ h} = 480\text{ Wh} = 0.48\text{ kWh}\)

    **(c)** Cost \(= 0.48\text{ kWh} \times \$0.13/\text{kWh} = \$0.062 \approx 6.2\text{ cents}\)

    **(d)** Using \(P = VI\):

    \[I = \frac{P}{V} = \frac{60\text{ W}}{120\text{ V}} = 0.5\text{ A}\]

---

### Problem 4 — Conductance

A resistor has a resistance of 470Ω.

**(a)** Calculate its conductance in siemens.

**(b)** If two 470Ω resistors are connected in parallel, what is the equivalent conductance?

**(c)** What is the equivalent resistance of the parallel combination?

??? success "Solution"
    **(a)** \[G = \frac{1}{R} = \frac{1}{470\text{ Ω}} = 2.128\text{ mS}\]

    **(b)** Conductances in parallel add directly:

    \[G_{total} = G_1 + G_2 = 2.128\text{ mS} + 2.128\text{ mS} = 4.255\text{ mS}\]

    **(c)** \[R_{eq} = \frac{1}{G_{total}} = \frac{1}{4.255 \times 10^{-3}} = 235\text{ Ω}\]

    This confirms the parallel resistance formula: two equal resistors in parallel give half the resistance of one.
