---
title: Chapter 2 Content — Ohm's Law and Basic Circuit Configurations
description: Teaching content for Chapter 2 covering Ohm's Law, series/parallel circuits, voltage dividers, and resistor properties
generated_by: claude skill chapter-content-generator
date: 2026-01-30
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 2 — Ohm's Law and Basic Circuit Configurations

<h2 id="21-the-resistor" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.1 The Resistor: Your First Real Component</h2>

Before we can talk about Ohm's Law, we need to understand the humble **resistor** — the most common component in electronics. Every circuit you'll ever build will probably have at least one.

A resistor is a component that opposes the flow of electric current. Think of it like a narrow section in a water pipe: water (current) can still flow through, but the narrow section (resistance) limits how much can pass for a given pressure (voltage).

Resistors serve several critical functions:

- Limiting current to protect sensitive components
- Dividing voltage to create reference levels
- Converting electrical energy to heat (sometimes intentionally!)
- Setting operating points in amplifier circuits

| Parameter | Symbol | Unit | Typical Range |
|-----------|--------|------|---------------|
| Resistance | R | Ohms (Ω) | 0.1Ω to 10MΩ |
| Power Rating | P | Watts (W) | 0.125W to 2W (common) |
| Tolerance | — | Percent (%) | ±1% to ±10% |
| Temperature Coefficient | TC | ppm/°C | ±50 to ±200 |

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Physical Construction</h3>

Real resistors come in various forms, but the most common type you'll encounter in lab is the **carbon film** or **metal film** resistor. These cylindrical components have colored bands that encode their resistance value — a system we'll decode shortly.

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Resistor Physical Structure</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/resistor-physical-structure/main.html" width="100%" height="400px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="22-ohms-law" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.2 Ohm's Law: The E = mc² of Circuits</h2>

If physics has \(E = mc^2\), then electrical engineering has Ohm's Law. It's equally fundamental, considerably more practical for everyday use, and thankfully much easier to derive.

Georg Simon Ohm discovered this relationship in 1827, and engineers have been grateful ever since.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

**Ohm's Law**

$$V = I \cdot R$$

where \(V\) is the voltage across the resistor (volts), \(I\) is the current through the resistor (amperes), and \(R\) is the resistance (ohms).

</div>

This deceptively simple equation tells us that voltage and current are directly proportional when resistance is constant. Double the voltage? Double the current. It's beautifully linear.

!!! tip "The Three Forms of Ohm's Law"
    Ohm's Law can be rearranged to solve for any variable:

    - \(V = I \cdot R\) (find voltage)
    - \(I = V / R\) (find current)
    - \(R = V / I\) (find resistance)

    Memorize all three forms. You'll use them constantly.

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The Ohm's Law Triangle</h3>

Many students find the "Ohm's Law Triangle" helpful for remembering the three forms. Cover the variable you want to find, and the remaining two show you the formula.

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Ohm's Law Triangle</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/ohms-triangle/main.html" width="100%" height="350px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Applying Ohm's Law: A Simple Example</h3>

Suppose you have a 9V battery connected to a 1000Ω (1kΩ) resistor. How much current flows?

\[I = \frac{V}{R} = \frac{9\text{V}}{1000\text{Ω}} = 0.009\text{A} = 9\text{mA}\]

Nine milliamps. That's enough current to light an LED, run a small sensor, or power a microcontroller's GPIO pin.

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Ohm's Law Calculator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/ohms-law-calculator/main.html" width="100%" height="450px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="23-power" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.3 Power in Resistive Circuits</h2>

Current flowing through a resistor converts electrical energy into heat. The rate of this energy conversion is **power**, measured in watts (W). This matters because resistors have power ratings — exceed them, and you'll get a dramatic (and smoky) demonstration of why specifications exist.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$P = V \cdot I = I^2 \cdot R = \frac{V^2}{R}$$

Use whichever form is most convenient given the known quantities.

</div>

| Known Quantities | Formula to Use |
|------------------|----------------|
| V and I | \(P = V \cdot I\) |
| I and R | \(P = I^2 \cdot R\) |
| V and R | \(P = V^2 / R\) |

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Component Power Rating and Derating</h3>

Every resistor has a **power rating** — the maximum power it can safely dissipate without damage. Common values are 1/8W, 1/4W, 1/2W, and 1W for through-hole resistors. A resistor will happily try to dissipate whatever power you throw at it — exceed the rating and you'll see discoloration, smell burning, and eventually witness component failure.

Smart engineers practice **derating** — operating a component below its maximum specifications to improve reliability and lifespan. A common rule of thumb: derate to 50–70% of the rated maximum. If your calculation shows 0.4W dissipation, use a 1W resistor, not a 1/2W unit right at the edge.

---

<h2 id="24-color-codes" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.4 Resistor Color Codes and Tolerance</h2>

Those colored bands on resistors aren't decorative — they encode the resistance value. Learning to read them is like learning a secret language, except the secret is just "how many ohms."

| Color | Digit | Multiplier | Tolerance |
|-------|-------|------------|-----------|
| Black | 0 | ×1 | — |
| Brown | 1 | ×10 | ±1% |
| Red | 2 | ×100 | ±2% |
| Orange | 3 | ×1k | — |
| Yellow | 4 | ×10k | — |
| Green | 5 | ×100k | ±0.5% |
| Blue | 6 | ×1M | ±0.25% |
| Violet | 7 | ×10M | ±0.1% |
| Gray | 8 | — | ±0.05% |
| White | 9 | — | — |
| Gold | — | ×0.1 | ±5% |
| Silver | — | ×0.01 | ±10% |

**For a 4-band resistor:** Band 1 = first digit, Band 2 = second digit, Band 3 = multiplier, Band 4 = tolerance.

!!! note "Mnemonic Alert"
    Need to remember the color order? "**B**ad **B**eer **R**ots **O**ur **Y**oung **G**uts **B**ut **V**odka **G**oes **W**ell" gives you Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Gray, White.

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Resistor Color Code Reader</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/resistor-color-code/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

No resistor is perfect. A "1kΩ resistor" with ±5% tolerance (gold band) will actually be somewhere between 950Ω and 1050Ω. For precision circuits (measurement equipment, audio filters), specify ±1% (brown band) or better. For most applications, ±5% is fine — and often preferred because it's cheaper.

---

<h2 id="25-sources" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.5 Voltage and Current Sources</h2>

Circuits need something to drive current flow. That's where **sources** come in. We have two ideal types: voltage sources and current sources.

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Voltage Sources</h3>

An ideal **voltage source** maintains a constant voltage across its terminals regardless of the current drawn. Real-world examples include batteries (approximately) and regulated power supplies.

Schematic symbols: Battery (long and short parallel lines — long line is positive), DC source (circle with + and − labels), AC source (circle with sine wave inside).

The ideal voltage source is a mathematical convenience — real batteries have internal resistance that causes their terminal voltage to drop under load. But for many calculations, treating a battery as ideal is close enough.

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Current Sources</h3>

An ideal **current source** maintains a constant current through itself regardless of the voltage across it. These are less intuitive than voltage sources but essential for understanding amplifier biasing. Certain transistor configurations behave as current sources.

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Dependent Sources</h3>

**Dependent sources** (also called controlled sources) have their output determined by a voltage or current elsewhere in the circuit. There are four types: VCVS, VCCS, CCVS, and CCCS. Dependent sources are drawn as diamond shapes to distinguish them from independent sources. We'll explore them deeply when we hit transistor chapters.

| Source Type | Symbol | Maintains Constant | Varies With Load |
|-------------|--------|-------------------|------------------|
| Ideal Voltage Source | Circle with +/− | Voltage | Current |
| Ideal Current Source | Circle with arrow | Current | Voltage |

---

<h2 id="26-series" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.6 Series Circuits: The Single-File Line</h2>

When components are connected end-to-end, forming a single path for current, we call it a **series circuit**. Think of it like a single-lane road: all the cars (charges) must pass through every toll booth (component) along the way.

Key properties of series circuits:

- **Same current** flows through every component
- **Voltages add up** to equal the source voltage
- **Resistances add directly**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$R_{total} = R_1 + R_2 + R_3 + \cdots + R_n$$

The total resistance is always larger than any individual resistor.

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Series Circuit Analysis</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/series-circuit/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="27-parallel" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.7 Parallel Circuits: Multiple Paths</h2>

When components connect across the same two nodes, sharing the same voltage, they're in **parallel**. Think of parallel lanes on a highway: traffic (current) divides among them, but they all connect the same two points.

Key properties of parallel circuits:

- **Same voltage** appears across every component
- **Currents add up** to equal the total current from the source
- **Resistances combine reciprocally**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots + \frac{1}{R_n}$$

For two resistors in parallel (the "product over sum" formula):

$$R_{total} = \frac{R_1 \cdot R_2}{R_1 + R_2}$$

</div>

A key insight: **the total resistance of a parallel combination is always less than the smallest individual resistor**. Adding more parallel paths makes it easier for current to flow.

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Parallel Circuit Analysis</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/parallel-circuit/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="28-series-parallel" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.8 Series-Parallel Circuits: The Real World</h2>

Most practical circuits aren't purely series or purely parallel — they're combinations. Analyzing these **series-parallel circuits** requires breaking them down systematically.

The strategy:

1. Identify groups of resistors that are purely in series or purely in parallel
2. Replace each group with its equivalent resistance
3. Repeat until you have a single equivalent resistance
4. Work backward to find individual voltages and currents

This is like simplifying a complex fraction: you work from the inside out, reducing the complexity step by step.

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Series-Parallel Analysis</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/series-parallel-circuit/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="29-voltage-divider" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.9 The Voltage Divider: A Circuit You'll Build a Thousand Times</h2>

Take two resistors in series, connect them to a voltage source, and tap the middle point. Congratulations — you've built a **voltage divider**, one of the most useful circuits in electronics.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$V_{out} = V_{in} \cdot \frac{R_2}{R_1 + R_2}$$

where \(V_{out}\) is the output voltage (at the junction of R1 and R2), \(V_{in}\) is the input voltage, \(R_1\) is the resistor connected to the positive input, and \(R_2\) is the resistor connected to ground.

</div>

!!! tip "Quick Check"
    If \(R_1 = R_2\), then \(V_{out} = V_{in}/2\). Equal resistors give you half the input voltage.

Voltage dividers are everywhere: creating reference voltages for comparators, scaling signals to fit ADC input ranges, biasing transistor circuits, and reading resistive sensors (thermistors, photoresistors).

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Voltage Divider Loading Effect</h3>

Here's a trap that catches beginners: voltage dividers work perfectly when nothing is connected to the output. Connect a load (which has its own resistance), and the output voltage drops. The load resistance appears in parallel with R2, reducing the effective lower resistance. For a voltage divider to work well, the load resistance must be much larger than R2 — typically 10× larger or more.

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Voltage Divider Calculator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/voltage-divider/main.html" width="100%" height="450px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="210-current-divider" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.10 The Current Divider: Sharing the Flow</h2>

Just as voltage divides in series circuits, current divides in parallel circuits. A **current divider** lets you calculate how current splits between parallel branches.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

For two parallel resistors:

$$I_1 = I_{total} \cdot \frac{R_2}{R_1 + R_2}$$

Notice: more current flows through the **smaller** resistance — the path of least resistance, literally.

</div>

!!! warning "Don't Mix Them Up"
    In a voltage divider, output voltage increases with R2 (the bottom resistor).
    In a current divider, current through a branch increases when the *other* branch has higher resistance.

    When in doubt, use Ohm's Law directly rather than memorizing formulas you might misapply.

---

<h2 id="211-potentiometer" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.11 Potentiometers: Variable Resistance</h2>

A **potentiometer** (or "pot") is a three-terminal resistor with an adjustable center tap. Turn the knob (or slide the lever), and you change the resistance ratio — and therefore the voltage at the wiper terminal.

Potentiometers are essentially adjustable voltage dividers. They're used for:

- Volume controls in audio equipment
- User-adjustable settings (brightness, contrast)
- Calibration adjustments
- Position sensing (linear or rotary)

The three terminals are: End terminal 1, Wiper (the moving contact), and End terminal 2.

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Potentiometer as Voltage Divider</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/potentiometer/main.html" width="100%" height="400px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="212-wire-resistance" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.12 Wire Resistance: The Overlooked Reality</h2>

In ideal circuit analysis, we assume wires have zero resistance. In reality, every wire has some resistance, determined by:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$R_{wire} = \rho \cdot \frac{L}{A}$$

where \(\rho\) (rho) is the resistivity of the material (Ω·m), \(L\) is the wire length (m), and \(A\) is the cross-sectional area (m²).

</div>

For most bench circuits with short wires, this resistance is negligible. But it matters when wires are long, currents are high, or precision measurements are needed.

**American Wire Gauge (AWG)** specifies wire sizes. Smaller AWG numbers mean thicker wires with lower resistance.

| AWG | Diameter (mm) | Resistance (Ω/m) | Typical Use |
|-----|---------------|------------------|-------------|
| 10 | 2.59 | 0.0033 | Power distribution |
| 14 | 1.63 | 0.0083 | House wiring |
| 18 | 1.02 | 0.021 | Lamp cord |
| 22 | 0.64 | 0.053 | Hookup wire |
| 26 | 0.40 | 0.134 | Ribbon cable |

---

<h2 id="213-linearity" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.13 Linearity and the Foundation for Advanced Analysis</h2>

Ohm's Law describes a **linear** relationship. If you double the voltage, you double the current. If you halve the voltage, you halve the current. No surprises, no complications.

This **linearity** property enables powerful analysis techniques:

- **Superposition**: Analyze each source separately and add the results
- **Thévenin/Norton equivalents**: Reduce complex circuits to simple models
- **Linear algebra methods**: Solve circuit equations using matrices

Not all components are linear (diodes and transistors aren't), but resistive circuits are, and that makes them beautifully predictable.

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Linear vs Nonlinear I-V Characteristics</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../sims/linear-vs-nonlinear/main.html" width="100%" height="400px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="214-example" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.14 Putting It All Together: A Complete Analysis Example</h2>

Let's work through a complete circuit analysis using all the tools we've developed.

**Problem**: Find all currents and voltages in a circuit with:
- 12V voltage source
- R1 = 2kΩ in series with a parallel combination
- Parallel combination: R2 = 3kΩ and R3 = 6kΩ

**Step 1: Find equivalent resistance of parallel combination**

\[R_{23} = \frac{R_2 \cdot R_3}{R_2 + R_3} = \frac{3\text{k} \cdot 6\text{k}}{3\text{k} + 6\text{k}} = \frac{18\text{M}}{9\text{k}} = 2\text{kΩ}\]

**Step 2: Find total resistance**

\[R_{total} = R_1 + R_{23} = 2\text{kΩ} + 2\text{kΩ} = 4\text{kΩ}\]

**Step 3: Find total current** (from source, through R1)

\[I_{total} = \frac{V_s}{R_{total}} = \frac{12\text{V}}{4\text{kΩ}} = 3\text{mA}\]

**Step 4: Find voltage across R1**

\[V_1 = I_{total} \cdot R_1 = 3\text{mA} \cdot 2\text{kΩ} = 6\text{V}\]

**Step 5: Find voltage across parallel combination**

\[V_{23} = V_s - V_1 = 12\text{V} - 6\text{V} = 6\text{V}\]

**Step 6: Find branch currents**

\[I_2 = \frac{V_{23}}{R_2} = \frac{6\text{V}}{3\text{kΩ}} = 2\text{mA} \qquad I_3 = \frac{V_{23}}{R_3} = \frac{6\text{V}}{6\text{kΩ}} = 1\text{mA}\]

**Verification**: \(I_2 + I_3 = 2\text{mA} + 1\text{mA} = 3\text{mA} = I_{total}\) ✓

The current divides according to the inverse resistance ratio: twice as much current flows through R2 (half the resistance of R3).

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Chapter Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
This chapter built on basic quantities to develop practical circuit analysis skills. Ohm's Law (\(V = IR\)) in its three forms is the foundation for all resistive circuit analysis. Series circuits share the same current while voltages and resistances add. Parallel circuits share the same voltage while currents add and resistances combine reciprocally. The voltage divider and current divider are fundamental building blocks that appear in nearly every circuit design. Resistor color codes encode component values; tolerances specify manufacturing variation; power ratings must be respected to prevent failure. Derating improves reliability. Wire resistance, while often negligible, matters in high-current or precision applications. The linearity of resistive circuits enables superposition and other powerful analysis techniques.
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Key Equations Reference</h3>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

| Formula | Application |
|---------|-------------|
| \(V = IR\) | Ohm's Law |
| \(P = VI = I^2R = V^2/R\) | Power |
| \(R_s = R_1 + R_2 + \cdots\) | Series resistance |
| \(1/R_p = 1/R_1 + 1/R_2 + \cdots\) | Parallel resistance |
| \(R_p = (R_1 \cdot R_2)/(R_1 + R_2)\) | Two parallel resistors |
| \(V_{out} = V_{in} \cdot R_2/(R_1 + R_2)\) | Voltage divider |
| \(I_1 = I_{total} \cdot R_2/(R_1 + R_2)\) | Current divider |

</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">What's Next</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Chapter 3 introduces Kirchhoff's Laws — the two fundamental conservation principles that make it possible to systematically analyze any electrical circuit, no matter how complex. The circuits will get more complex, but the fundamental tools you've learned here will carry you through.
</p>

---

??? question "Self-Check: Can You Answer These?"
    1. A 5V source connects to two 10kΩ resistors in series. What current flows? What is the voltage across each resistor?
    2. Those same resistors are now in parallel across the 5V source. What is the equivalent resistance? What is the total current? What current flows through each resistor?
    3. You need exactly 2.5V from a 9V battery using a voltage divider. If R1 = 2.6kΩ, what should R2 be? (Hint: \(V_{out}/V_{in} = R_2/(R_1 + R_2)\))
    4. A 470Ω resistor with 0.4V across it dissipates how much power? Would a 1/4W resistor be adequate?

</div>
