---
title: Chapter 1 Content — Electric Charge and Basic Circuit Quantities
description: Teaching content for Chapter 1 covering charge, current, voltage, power, resistance, and circuit fundamentals
generated_by: claude skill chapter-content-generator
date: 2026-01-30
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 1 — Electric Charge and Basic Circuit Quantities

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

This chapter introduces the fundamental electrical quantities that every circuit engineer works with every day. We begin with electric charge — the basic property of matter that makes all electrical phenomena possible — and build up to current, voltage, resistance, power, and energy. Along the way you will learn Ohm's Law, the most important equation in electronics, which links voltage, current, and resistance. We cover conductance, the complement of resistance, and explain why ground is simply a chosen reference point rather than a connection to the physical earth. The chapter closes with circuit schematic symbols, the language of circuit diagrams, and the concepts of nodes, branches, open circuits, and short circuits that form the vocabulary of circuit analysis. By the end you will have the complete toolkit needed to analyze any resistive circuit.

**Key Takeaways**

1. Electric charge (coulombs) is the source of all electrical phenomena; current (amperes) is charge in motion, defined as the rate of charge flow over time.
2. Voltage (volts) is the potential difference that drives current; resistance (ohms) opposes it; and Ohm's Law — V equals I times R — links all three.
3. Power (P equals V times I) is the rate of energy transfer in watts, and every resistor has a maximum power rating that must not be exceeded in a safe design.

</details>

## 1.1 Electric Charge: Where It All Begins

Everything in the electrical world starts with **electric charge**. Charge is a fundamental property of matter, just like mass, but instead of telling you how much "stuff" something has, charge tells you how that stuff will interact electromagnetically.

Here's the key insight: there are exactly two types of charge, which we creatively call *positive* and *negative*. (Benjamin Franklin made this naming choice in the 1750s, and we've been stuck with it ever since. Thanks, Ben.) Opposite charges attract, like charges repel. Simple as that.

The fundamental unit of charge is the **coulomb** (C), named after Charles-Augustin de Coulomb. One coulomb is actually a *huge* amount of charge — roughly 6.24 × 10¹⁸ electrons worth. In practical circuits, we usually deal with much smaller quantities like microcoulombs (μC) or nanocoulombs (nC).

| Prefix | Symbol | Multiplier | Example |
|--------|--------|------------|---------|
| mega | M | 10⁶ | 1 MC = 1,000,000 C |
| kilo | k | 10³ | 1 kC = 1,000 C |
| milli | m | 10⁻³ | 1 mC = 0.001 C |
| micro | μ | 10⁻⁶ | 1 μC = 0.000001 C |
| nano | n | 10⁻⁹ | 1 nC = 0.000000001 C |
| pico | p | 10⁻¹² | 1 pC = 0.000000000001 C |

!!! tip "The Electron's Charge"
    A single electron carries a charge of approximately \(-1.602 \times 10^{-19}\) coulombs. Yes, that's negative — electrons are the negative ones. Protons carry the same magnitude but positive. This tiny number is sometimes called the *elementary charge* and is one of the fundamental constants of nature.

---

## 1.2 Current: Charge in Motion

Here's where things get interesting. Charge sitting still is about as useful as a car with no gas — it has potential, but it's not doing anything. When charges *move*, that's when the magic happens. This flow of charge is called **electric current**.

Current is defined as the rate at which charge flows past a point:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$I = \frac{dQ}{dt}$$

where \(I\) is the current in amperes (A), \(Q\) is the charge in coulombs (C), and \(t\) is time in seconds (s).

</div>

For those of you who remember your calculus, this is just saying that current is the derivative of charge with respect to time. If charge is flowing at a steady rate, the equation simplifies to \(I = Q/t\).

The unit of current is the **ampere** (A), named after André-Marie Ampère. One ampere equals one coulomb per second — about 6.24 × 10¹⁸ electrons moving past every second.

Here's a fun fact that trips up a lot of students: in most circuits, the actual electrons move incredibly slowly — often just millimeters per second. This is called *drift velocity*. So why does your light turn on instantly when you flip the switch? Because you're not waiting for specific electrons to arrive; you're waiting for the *electromagnetic field* to propagate, which happens at nearly the speed of light. It's like a pipe full of water: when you turn on the faucet, water comes out the other end immediately, even though the specific water molecules at the faucet won't arrive at the spout for a while.

#### Diagram: Water Flow Analogy for Electric Current

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/water-flow-analogy/main.html" width="100%" height="450px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<details markdown="1">
<summary>Water Flow Analogy for Electric Current — MicroSim Details</summary>
Type: microsim | Bloom Level: Understand (L2) | Bloom Verb: Compare, explain

Learning Objective: Students will be able to explain how electric current flow is analogous to water flow in pipes, comparing pressure to voltage and flow rate to current.

Link to Microsim: [Water Flow Analogy](../../sims/water-flow-analogy/index.md)
</details>

### Conventional Current vs. Electron Flow

Here's a historical quirk that causes endless confusion: **conventional current** flows from positive to negative, but electrons actually flow from negative to positive. Why? Because when scientists first defined current direction, they didn't know electrons existed. They guessed that positive charges were moving, and they guessed wrong. By the time we figured out the truth, the convention was too deeply embedded to change.

For circuit analysis, we use conventional current (positive to negative), and everything works out mathematically. Just remember:

- **Conventional current**: Flows from + to − (what we use in analysis)
- **Electron flow**: Flows from − to + (what actually happens in wires)

Don't let this keep you up at night. Pick one convention and stick with it. We'll use conventional current throughout this course.

---

## 1.3 Voltage: The Electrical "Push"

If current is the flow of charge, **voltage** is what makes charges want to flow in the first place. Voltage is the *electrical potential difference* between two points — it's the "pressure" that pushes charges through a circuit.

More precisely, voltage is the energy required to move a unit of charge between two points:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$V = \frac{W}{Q}$$

where \(V\) is the voltage in volts (V), \(W\) is the work (energy) in joules (J), and \(Q\) is the charge in coulombs (C).

</div>

One volt means one joule of energy per coulomb of charge. The unit is named after Alessandro Volta, who invented the first true battery in 1800.

Here's the crucial point: **voltage is always measured between two points**. You can't talk about "the voltage at point A" without implicitly referencing some other point. This is like altitude — when you say a mountain is 14,000 feet tall, you mean 14,000 feet above sea level, not 14,000 feet above nothing.

| Common Voltage Sources | Typical Voltage |
|------------------------|-----------------|
| AA battery | 1.5 V |
| USB port | 5 V |
| Car battery | 12 V |
| US wall outlet (RMS) | 120 V |
| European wall outlet (RMS) | 230 V |
| High-voltage transmission line | 115,000 – 765,000 V |

!!! warning "Safety First"
    Voltages above about 50V can be dangerous to humans under certain conditions. While we'll mostly work with low-voltage circuits in the lab, always treat electricity with respect. The wall outlet in your room can absolutely kill you. Don't be a statistic.

---

## 1.4 Electrical Energy and Power: Getting Work Done

Now we can talk about what electricity actually *does* for us: **work**. When charges move through a circuit, they can transfer energy — lighting bulbs, spinning motors, heating elements, or processing information.

**Electrical energy** is the capacity to do work, measured in joules (J). When a charge \(Q\) moves through a voltage \(V\), the energy transferred is:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$W = Q \cdot V$$

</div>

But usually we care more about the *rate* at which energy is transferred. This is **power**, measured in watts (W):

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$P = \frac{dW}{dt} = V \cdot I$$

Since \(V = IR\), we can also express power as:

$$P = VI = I^2R = \frac{V^2}{R}$$

</div>

One watt equals one joule per second. These three forms are all equivalent; use whichever is most convenient for your problem.

#### Diagram: Power Triangle Visualization

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/power-triangle/main.html" width="100%" height="400px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

### A Note on Energy Units

Your electricity bill doesn't list energy in joules — it uses **kilowatt-hours (kWh)**. One kilowatt-hour is the energy consumed when using 1000 watts for one hour:

\[1 \text{ kWh} = 1000 \text{ W} \times 3600 \text{ s} = 3.6 \times 10^6 \text{ J} = 3.6 \text{ MJ}\]

So when you leave a 100W light bulb on for 10 hours, you use 1 kWh of energy. At typical US electricity prices (around \$0.12–\$0.15/kWh), that costs you about 12–15 cents.

---

## 1.5 Resistance: The Opposition

Not all materials let charges flow through them equally. **Resistance** is the property that opposes the flow of current. It's like friction for electricity.

The relationship between voltage, current, and resistance is captured in the most famous equation in electronics:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

**Ohm's Law**

$$V = IR$$

where \(V\) is voltage in volts (V), \(I\) is current in amperes (A), and \(R\) is resistance in ohms (Ω).

</div>

This is **Ohm's Law**, named after Georg Ohm, who discovered this relationship in 1827. It tells us that for a given resistance, increasing voltage increases current proportionally.

The unit of resistance is the **ohm** (Ω), represented by the Greek letter omega. One ohm is the resistance that allows one ampere to flow when one volt is applied.

| Material | Typical Resistivity | Classification |
|----------|---------------------|----------------|
| Silver | 1.59 × 10⁻⁸ Ω·m | Conductor |
| Copper | 1.68 × 10⁻⁸ Ω·m | Conductor |
| Aluminum | 2.65 × 10⁻⁸ Ω·m | Conductor |
| Silicon (pure) | ~2300 Ω·m | Semiconductor |
| Glass | 10¹⁰ – 10¹⁴ Ω·m | Insulator |
| Rubber | ~10¹³ Ω·m | Insulator |

!!! note "Not Everything Obeys Ohm's Law"
    Ohm's Law applies to *ohmic* (linear) materials where resistance is constant regardless of voltage or current. Many real devices — like diodes, transistors, and even light bulbs — are *non-ohmic*, meaning their resistance changes with operating conditions. We'll explore some of these in later chapters.

---

## 1.6 Conductance: The Flip Side

**Conductance** is simply the reciprocal of resistance — it measures how easily current flows rather than how much it's opposed:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$G = \frac{1}{R} = \frac{I}{V}$$

where \(G\) is conductance in siemens (S) and \(R\) is resistance in ohms (Ω).

</div>

The unit is the **siemens** (S), named after Werner von Siemens. (You might also see the older unit "mho," which is "ohm" spelled backward. Electrical engineers have a particular sense of humor.)

Why bother with conductance? In some analyses, especially with parallel circuits, it's mathematically more convenient. If you have conductances in parallel, they simply add up — much easier than dealing with reciprocals of resistances.

---

## 1.7 Electrical Ground: The Reference Point

Remember how we said voltage is always measured between two points? Well, we need to pick a reference point for our measurements, and that reference is called **electrical ground**.

Ground is typically defined as 0V, and all other voltages in a circuit are measured relative to it. In different contexts, ground can be:

- **Earth ground**: Literally connected to the Earth (like the third prong on a US outlet)
- **Chassis ground**: Connected to a device's metal enclosure
- **Signal ground**: A common reference point in a circuit (may not be connected to Earth)

The key insight is that ground doesn't necessarily mean "connected to the physical earth." It's just a convenient reference point we all agree to call 0V.

#### Diagram: Ground Symbol Reference

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/ground-symbols/main.html" width="100%" height="350px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 1.8 Circuit Schematic Symbols: The Language of Circuits

Just as musicians read sheet music, electrical engineers read **circuit schematics**. These diagrams use standardized symbols to represent components and their connections. Learning these symbols is like learning an alphabet — once you know them, you can read any circuit diagram.

| Component | Symbol Description | Key Characteristic |
|-----------|-------------------|-------------------|
| Resistor | Zigzag line (US) or rectangle (EU) | Opposes current |
| Capacitor | Two parallel lines (one may be curved) | Stores charge |
| Inductor | Coiled line | Stores energy in magnetic field |
| Voltage source | Circle with + and − | Provides constant voltage |
| Current source | Circle with arrow | Provides constant current |
| Ground | Three lines or triangle | Reference point (0V) |
| Wire | Straight line | Ideal conductor (0Ω) |
| Node | Dot at wire junction | Connection point |

#### Diagram: Interactive Circuit Symbol Flashcards

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/circuit-symbol-flashcards/main.html" width="100%" height="482px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 1.9 Nodes and Branches: Circuit Anatomy

To analyze circuits, we need vocabulary for describing their structure. Two fundamental concepts are **nodes** and **branches**.

A **node** is any point where two or more circuit elements connect. All points that are connected by ideal wire (zero resistance) form a single node, even if they look like multiple points in the schematic.

A **branch** is a path between two nodes that contains a single circuit element (like a resistor, capacitor, or source). Each branch carries its own current.

Here's a simple way to think about it:

- **Nodes** are the dots where things meet
- **Branches** are the paths between dots

Consider a simple circuit with a battery and two resistors:

- If the resistors are in series, you have 2 nodes and 2 branches
- If the resistors are in parallel, you have 2 nodes and 3 branches (one for each resistor plus the battery)

#### Diagram: Node and Branch Identification Trainer

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/node-branch-trainer/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 1.10 Open Circuits and Short Circuits: The Extremes

Two special circuit conditions that every engineer must understand are **open circuits** and **short circuits**. These represent the extreme cases of resistance.

An **open circuit** has infinite resistance — no current can flow. This happens when there's a break in the circuit path, like a switch in the off position or a wire that's been cut. In an open circuit:

- Current = 0 (no path for current to flow)
- Voltage can be anything (it's the "open-circuit voltage")
- Power = 0 (no current means no power transfer)

A **short circuit** has zero resistance — current can flow with no voltage drop. In a short circuit:

- Voltage = 0 across the short (\(V = IR = I \times 0 = 0\))
- Current can be very large (limited only by other circuit elements)
- This is often dangerous because excessive current causes overheating

!!! danger "Short Circuits Are Dangerous"
    Never create an unintentional short circuit, especially across a power source. A short across a battery can cause it to rapidly overheat, potentially causing fire or explosion. Circuit breakers and fuses exist specifically to protect against short-circuit conditions.

| Condition | Resistance | Current | Voltage Across |
|-----------|------------|---------|----------------|
| Open Circuit | ∞ (infinite) | 0 | Any value |
| Short Circuit | 0 | Limited by rest of circuit | 0 |
| Normal Operation | Finite, non-zero | Finite, non-zero | Finite, non-zero |

---

## 1.11 Power Dissipation: Where the Energy Goes

When current flows through a resistance, electrical energy is converted to heat. This is called **power dissipation**, and it's governed by our power equations:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$P = I^2R = \frac{V^2}{R}$$

where \(P\) is power dissipated in watts (W), \(I\) is current through the resistor in amperes (A), \(V\) is voltage across the resistor in volts (V), and \(R\) is resistance in ohms (Ω).

</div>

Power dissipation enables many applications:

- **Heating elements** in toasters, space heaters, and hair dryers rely on resistive heating
- **Light bulbs** (incandescent) produce light by heating a filament until it glows
- **Current-sensing resistors** convert current to a measurable voltage drop

Every resistor has a **power rating** — the maximum power it can safely dissipate without damage. Common ratings are 1/8W, 1/4W, 1/2W, 1W, and 2W for small resistors. Exceeding this rating will cause the resistor to overheat, potentially changing its resistance value, failing open, or even catching fire.

#### Diagram: Power Dissipation Calculator

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/power-dissipation-calc/main.html" width="100%" height="400px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 1.12 SI Units for Circuits: Speaking the Language

Throughout this course and your entire career in electrical engineering, you'll use the **International System of Units (SI)**. Consistency in units prevents errors and allows engineers worldwide to communicate precisely.

| Quantity | Symbol | SI Unit | Unit Symbol | Base Units |
|----------|--------|---------|-------------|------------|
| Charge | Q | coulomb | C | A·s |
| Current | I | ampere | A | A (base unit) |
| Voltage | V | volt | V | kg·m²/(A·s³) |
| Resistance | R | ohm | Ω | V/A |
| Conductance | G | siemens | S | A/V |
| Power | P | watt | W | J/s = V·A |
| Energy | W | joule | J | kg·m²/s² |
| Capacitance | C | farad | F | A·s/V |
| Inductance | L | henry | H | V·s/A |

The SI prefix system lets us express very large or very small quantities conveniently:

- **Milliamps (mA)**: 10⁻³ A — typical current in small circuits
- **Microfarads (μF)**: 10⁻⁶ F — common capacitor values
- **Kilohms (kΩ)**: 10³ Ω — common resistor values
- **Megohms (MΩ)**: 10⁶ Ω — high resistor values

!!! tip "Dimensional Analysis Is Your Friend"
    When you're not sure if your answer is correct, check the units. If you're calculating current and your answer comes out in volts, something went wrong. This simple technique catches more errors than you'd expect.

---

## 1.13 Putting It All Together: A Worked Example

Let's see how all these concepts connect in a simple example. Consider a circuit with a 9V battery connected to a 1kΩ resistor.

**What we know:**
- V = 9V
- R = 1kΩ = 1000Ω

**Calculate current using Ohm's Law:**

\[I = \frac{V}{R} = \frac{9\text{ V}}{1000\text{ Ω}} = 0.009\text{ A} = 9\text{ mA}\]

**Calculate power dissipation:**

\[P = VI = (9\text{ V})(0.009\text{ A}) = 0.081\text{ W} = 81\text{ mW}\]

Or equivalently:

\[P = \frac{V^2}{R} = \frac{(9\text{ V})^2}{1000\text{ Ω}} = \frac{81}{1000}\text{ W} = 81\text{ mW}\]

A standard 1/4W (250mW) resistor can easily handle this power level.

**In terms of energy**, if this circuit runs for one hour:

\[W = Pt = (0.081\text{ W})(3600\text{ s}) = 291.6\text{ J}\]

---

## Chapter Summary

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
You've just acquired the vocabulary of electrical engineering. Electric charge (Q, measured in coulombs) is the fundamental property from which all electrical phenomena arise. Current (I, amperes) is charge in motion. Voltage (V, volts) is the potential difference that drives current. Resistance (R, ohms) opposes current flow. Ohm's Law (V = IR) links these three quantities and is the most important equation in circuits. Power (P = VI = I²R = V²/R, watts) is the rate of energy transfer. Every resistor has a power rating that must not be exceeded. Nodes and branches describe circuit structure. Ground is the 0V reference point. Open circuits have infinite resistance (zero current); short circuits have zero resistance and can be dangerous.
</p>
</div>

### Key Equations Reference

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

| Concept | Equation |
|---------|----------|
| Electric current | \(I = dQ/dt\) |
| Voltage definition | \(V = W/Q\) |
| Ohm's Law | \(V = IR\) |
| Conductance | \(G = 1/R\) |
| Electrical energy | \(W = QV\) |
| Power | \(P = VI = I^2R = V^2/R\) |
| Power dissipation | \(P = I^2R = V^2/R\) |

</div>

### What's Next

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Chapter 2 builds directly on these foundations, introducing Ohm's Law in full detail and applying it to series circuits, parallel circuits, voltage dividers, and current dividers. The resistor — your new favorite component — takes center stage.
</p>

---

??? question "Chapter 1 Review: Test Your Understanding"
    1. What is the relationship between conventional current direction and electron flow?
    2. If a 12V source is connected to a 3kΩ resistor, what current flows?
    3. What power is dissipated in the above resistor?
    4. Why is voltage always measured between two points?
    5. What's the difference between an open circuit and a short circuit?

    **Answers:**

    1. Conventional current flows from positive to negative, while electrons actually flow from negative to positive. We use conventional current for circuit analysis.
    2. \(I = V/R = 12\text{V} / 3000\text{Ω} = 4\text{ mA}\)
    3. \(P = VI = (12\text{V})(0.004\text{A}) = 48\text{ mW}\)
    4. Voltage is a *difference* in electrical potential. Just like height needs a reference point, voltage needs a reference point (ground). Only the difference between two points has meaning.
    5. Open circuit: infinite resistance, zero current, can have voltage across it. Short circuit: zero resistance, zero voltage across it, current limited only by rest of circuit (potentially very high and dangerous).

</div>
