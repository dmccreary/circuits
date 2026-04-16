---
title: Chapter 1 Practice Problems — Electric Charge and Basic Quantities
description: Practice problems with solutions for Chapter 1 covering current, voltage, power, and energy calculations
---

<div class="unit1-styled" markdown>

# Chapter 1 Practice Problems

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

</div>
