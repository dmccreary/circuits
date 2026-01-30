---
title: Ohm's Law and Basic Circuit Configurations
description: Master Ohm's Law and learn to analyze series, parallel, and combined circuits
generated_by: claude skill chapter-content-generator
date: 2026-01-30
version: 0.03
---

# Ohm's Law and Basic Circuit Configurations

## Summary

This chapter covers Ohm's Law, the fundamental relationship between voltage, current, and resistance, and introduces the basic circuit configurations used throughout electrical engineering. Students will learn about voltage and current sources, series and parallel circuit arrangements, and how to use voltage and current dividers to analyze circuits. The chapter also introduces resistor properties including color codes, tolerance, and power ratings. After completing this chapter, students will be able to analyze simple resistive circuits and select appropriate components for basic applications.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

1. Ohm's Law
2. Voltage Source
3. Current Source
4. Dependent Sources
5. Series Circuits
6. Parallel Circuits
7. Series-Parallel Circuits
8. Voltage Divider
9. Current Divider
10. Energy Conservation
11. Linearity
12. Resistor
13. Resistor Color Code
14. Resistor Tolerance
15. Potentiometer
16. Wire Resistance
17. Component Power Rating
18. Component Derating

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Electric Charge and Basic Circuit Quantities](../01-electric-charge-basic-quantities/index.md)

---

## Introduction: The Secret Language of Circuits

Welcome to the chapter that unlocks your first real superpower in electrical engineering. If Chapter 1 was about learning the alphabet—voltage, current, charge—then this chapter teaches you to speak in complete sentences. And the most important sentence you'll ever learn? **Ohm's Law**.

Here's a secret that practicing engineers won't always admit: about 80% of circuit analysis boils down to applying Ohm's Law creatively. Master this chapter, and you'll suddenly be able to look at a circuit schematic and *understand* what it's doing. That's not just useful—it's genuinely cool. You'll start seeing circuits everywhere: in your phone charger, your headphones, even in the humble LED indicator light on your laptop.

Let's dive in. Fair warning: there will be puns. Resistance is futile.

## The Resistor: Your First Real Component

Before we can talk about Ohm's Law, we need to understand the humble **resistor**—the most common component in electronics. Every circuit you'll ever build will probably have at least one.

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
| Tolerance | - | Percent (%) | ±1% to ±10% |
| Temperature Coefficient | TC | ppm/°C | ±50 to ±200 |

### Physical Construction

Real resistors come in various forms, but the most common type you'll encounter in lab is the **carbon film** or **metal film** resistor. These cylindrical components have colored bands that encode their resistance value—a system we'll decode shortly.

#### Diagram: Resistor Physical Structure

<iframe src="../../sims/resistor-physical-structure/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Resistor Physical Structure Diagram</summary>
Type: diagram

Purpose: Show the internal construction of a through-hole resistor

Bloom Level: Remember (L1)
Bloom Verb: identify

Learning Objective: Students will identify the physical parts of a resistor and understand how construction affects performance.

Components to show:
- Ceramic or fiberglass core (cylindrical, center)
- Resistive element layer (carbon or metal film wrapped around core)
- End caps with leads (metal connections at each end)
- Protective coating (outer epoxy layer)
- Color bands (4-5 bands showing value encoding)

Visual style: Cross-section cutaway view showing internal layers

Labels:
- "Ceramic Core" pointing to center
- "Resistive Film" pointing to the wrapped layer
- "End Caps" pointing to metal connections
- "Color Bands" pointing to surface markings
- "Leads" pointing to wire extensions

Color scheme:
- Tan/beige for ceramic core
- Dark gray for resistive film
- Silver for end caps
- Various colors for bands

Interactive features:
- Hover over each layer to see description and function

Implementation: p5.js with layered drawing and hover detection
</details>

## Ohm's Law: The E = mc² of Circuits

If physics has $E = mc^2$, then electrical engineering has Ohm's Law. It's equally fundamental, considerably more practical for everyday use, and thankfully much easier to derive.

Georg Simon Ohm discovered this relationship in 1827, and engineers have been grateful ever since. (Students taking their first circuits exam, perhaps less so.)

#### Ohm's Law

$V = I \cdot R$

where:

- $V$ is the voltage across the resistor (in volts, V)
- $I$ is the current through the resistor (in amperes, A)
- $R$ is the resistance (in ohms, Ω)

This deceptively simple equation tells us that voltage and current are directly proportional when resistance is constant. Double the voltage? Double the current. It's beautifully linear—and that linearity is a gift that keeps on giving throughout circuit analysis.

!!! tip "The Three Forms of Ohm's Law"
    Ohm's Law can be rearranged to solve for any variable:

    - $V = I \cdot R$ (find voltage)
    - $I = V / R$ (find current)
    - $R = V / I$ (find resistance)

    Memorize all three forms. You'll use them constantly.

### The Ohm's Law Triangle

Many students find the "Ohm's Law Triangle" helpful for remembering the three forms. Cover the variable you want to find, and the remaining two show you the formula.

#### Diagram: Ohm's Law Triangle

<iframe src="../../sims/ohms-law-triangle/main.html" width="100%" height="350px" scrolling="no"></iframe>

<details markdown="1">
<summary>Ohm's Law Triangle Interactive</summary>
Type: microsim

Purpose: Help students quickly recall all three forms of Ohm's Law

Bloom Level: Remember (L1)
Bloom Verb: recall

Learning Objective: Students will recall all three forms of Ohm's Law and use the triangle as a mnemonic device.

Instructional Rationale: The triangle mnemonic provides a visual memory aid. Clicking to "cover" variables reinforces the relationship between the three forms through active recall practice.

Canvas layout:
- Drawing area: 400x250 for triangle visualization
- Control area: 100px height for instructions

Visual elements:
- Large triangle divided into top section (V) and bottom two sections (I and R)
- V in top section
- I and R in bottom sections, separated by multiplication symbol
- Horizontal line separates V from I×R (represents division)

Interactive controls:
- Click on V: highlights V, shows formula V = I × R
- Click on I: highlights I, shows formula I = V / R
- Click on R: highlights R, shows formula R = V / I
- Each click displays the corresponding formula prominently

Default state: All three visible, no formula displayed

Behavior:
- Clicking a variable "covers" it visually (dims or hides)
- The resulting formula appears below the triangle
- Reset after 3 seconds or when another variable is clicked

Implementation: p5.js with click detection on triangle regions
</details>

### Applying Ohm's Law: A Simple Example

Let's put this to work immediately. Suppose you have a 9V battery connected to a 1000Ω (1kΩ) resistor. How much current flows?

Using Ohm's Law:

$I = \frac{V}{R} = \frac{9V}{1000Ω} = 0.009A = 9mA$

Nine milliamps. That's enough current to light an LED, run a small sensor, or give you a really disappointing shock if you touched both terminals (don't do that—it's bad practice and won't even be exciting).

#### Diagram: Ohm's Law Calculator

<iframe src="../../sims/ohms-law-calculator/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Ohm's Law Calculator MicroSim</summary>
Type: microsim

Purpose: Allow students to experiment with different voltage and resistance values to see resulting current

Bloom Level: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will apply Ohm's Law to calculate current, voltage, or resistance given the other two quantities.

Instructional Rationale: Parameter exploration with immediate visual feedback helps students develop intuition for the relationships between V, I, and R. Seeing the formula update in real-time reinforces the mathematical relationship.

Canvas layout:
- Top section (300px): Circuit diagram with battery, resistor, and ammeter
- Middle section (100px): Calculation display showing V = I × R with current values
- Bottom section (100px): Slider controls

Visual elements:
- Simple circuit schematic with battery (left), resistor (top), ammeter (right)
- Animated current flow (small dots moving through circuit)
- Digital displays showing V, I, and R values
- Speed of animated dots proportional to current

Interactive controls:
- Slider: Voltage (1V to 24V, default 9V)
- Slider: Resistance (100Ω to 10kΩ, logarithmic scale, default 1kΩ)
- Display: Calculated current with appropriate units (mA or A)

Default parameters:
- Voltage: 9V
- Resistance: 1000Ω
- Initial state: Animation stopped

Behavior:
- Current updates instantly as sliders change
- Animation speed reflects relative current magnitude
- Formula display shows actual calculation: "9V ÷ 1000Ω = 9mA"
- Warning indicator if current exceeds 1A (getting into power territory)

Implementation: p5.js with sliders and animated circuit visualization
</details>

## Power in Resistive Circuits

Current flowing through a resistor converts electrical energy into heat. The rate of this energy conversion is **power**, measured in watts (W). This matters because resistors have power ratings—exceed them, and you'll get a dramatic (and smoky) demonstration of why specifications exist.

#### Power Equation

$P = V \cdot I$

where:

- $P$ is the power dissipated (in watts, W)
- $V$ is the voltage across the resistor (in volts, V)
- $I$ is the current through the resistor (in amperes, A)

By combining this with Ohm's Law, we get two more useful forms:

#### Power in Terms of Resistance

$P = I^2 \cdot R = \frac{V^2}{R}$

where:

- $P$ is power in watts
- $I$ is current in amperes
- $V$ is voltage in volts
- $R$ is resistance in ohms

These three power formulas are your friends. The form you choose depends on what quantities you know.

| Known Quantities | Formula to Use |
|------------------|----------------|
| V and I | $P = V \cdot I$ |
| I and R | $P = I^2 \cdot R$ |
| V and R | $P = V^2 / R$ |

### Component Power Rating

Every resistor has a **power rating**—the maximum power it can safely dissipate without damage. Common values are 1/8W, 1/4W, 1/2W, and 1W for through-hole resistors.

Here's the thing: a resistor doesn't "know" its power rating. It will happily try to dissipate whatever power you throw at it. Exceed the rating, and the resistor heats up. Keep exceeding it, and you'll see discoloration, smell burning, and eventually witness component failure. (In lab, this is embarrassing. In a product, it's a lawsuit.)

### Component Derating

Smart engineers don't run components at their maximum ratings. **Derating** means operating a component below its maximum specifications to improve reliability and lifespan.

A common rule of thumb: derate power components to 50-70% of their rated maximum. If your calculation shows 0.4W dissipation, use a 1W resistor, not a 1/2W unit that's right at the edge.

Why bother?

- Temperature affects resistance (more on this in later chapters)
- Components age faster under stress
- Manufacturing tolerances mean your "1/2W" resistor might actually be slightly less capable
- Ambient temperature in your enclosure may be higher than bench conditions

## Resistor Color Codes

Those colored bands on resistors aren't decorative—they encode the resistance value. Learning to read them is like learning a secret language, except the secret is just "how many ohms."

The standard color code uses position and color to represent digits and multipliers:

| Color | Digit | Multiplier | Tolerance |
|-------|-------|------------|-----------|
| Black | 0 | ×1 | - |
| Brown | 1 | ×10 | ±1% |
| Red | 2 | ×100 | ±2% |
| Orange | 3 | ×1k | - |
| Yellow | 4 | ×10k | - |
| Green | 5 | ×100k | ±0.5% |
| Blue | 6 | ×1M | ±0.25% |
| Violet | 7 | ×10M | ±0.1% |
| Gray | 8 | - | ±0.05% |
| White | 9 | - | - |
| Gold | - | ×0.1 | ±5% |
| Silver | - | ×0.01 | ±10% |

**For a 4-band resistor:**
- Band 1: First digit
- Band 2: Second digit
- Band 3: Multiplier
- Band 4: Tolerance

!!! note "Mnemonic Alert"
    Need to remember the color order? "**B**ad **B**eer **R**ots **O**ur **Y**oung **G**uts **B**ut **V**odka **G**oes **W**ell" gives you Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Gray, White. Yes, it's a bit dark. That's engineering humor for you.

#### Diagram: Resistor Color Code Reader

<iframe src="../../sims/resistor-color-code/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Resistor Color Code Interactive</summary>
Type: microsim

Purpose: Teach students to read and decode resistor color bands

Bloom Level: Apply (L3)
Bloom Verb: use

Learning Objective: Students will use the resistor color code to determine resistance values from band colors, and select appropriate band colors for a desired resistance.

Instructional Rationale: Interactive practice with immediate feedback is more effective than memorization tables. The bidirectional nature (colors→value and value→colors) reinforces understanding.

Canvas layout:
- Top section (200px): Large resistor image with selectable color bands
- Middle section (100px): Decoded value display and calculation breakdown
- Bottom section (150px): Color selection palette and mode toggle

Visual elements:
- Large horizontal resistor body (beige/tan)
- Four or five clickable color band regions
- Color palette showing all possible band colors
- Formula breakdown: "X Y × 10^Z = Value"

Interactive controls:
- Click on band position to select it
- Click on color in palette to apply to selected band
- Toggle: 4-band vs 5-band mode
- Display: Calculated resistance with tolerance range
- Button: "Random" generates a random valid resistor for practice
- Button: "Quiz Mode" hides the calculated value until user submits answer

Default parameters:
- 4-band mode
- Brown-Black-Red-Gold (1kΩ ±5%)

Behavior:
- Clicking a band highlights it
- Selecting a color updates that band
- Resistance value updates in real-time
- Invalid combinations (like gold as digit 1) are prevented
- Shows tolerance range: "1kΩ ±5% (950Ω to 1050Ω)"

Implementation: p5.js with click regions and color selection
</details>

### Resistor Tolerance

No resistor is perfect. Manufacturing processes introduce small variations, so a "1kΩ resistor" might actually measure 980Ω or 1015Ω. The **tolerance** specification tells you the expected range.

A 1kΩ resistor with ±5% tolerance (gold band) will be somewhere between 950Ω and 1050Ω. For most applications, this is fine. For precision circuits (like measurement equipment or audio filters), you'll want ±1% (brown band) or better.

Here's the practical impact: if you're designing a circuit where the exact resistance matters, either specify tight-tolerance resistors or design your circuit to be insensitive to component variations. The second approach is often wiser—and cheaper.

## Voltage and Current Sources

Circuits need something to drive current flow. That's where **sources** come in. We have two ideal types: voltage sources and current sources.

### Voltage Source

An ideal **voltage source** maintains a constant voltage across its terminals regardless of the current drawn. Real-world examples include batteries (approximately) and regulated power supplies.

Schematic symbols for voltage sources:

- **Battery**: Long and short parallel lines (long line is positive)
- **DC source**: Circle with + and - labels
- **AC source**: Circle with sine wave inside

The ideal voltage source is a mathematical convenience—real batteries have internal resistance that causes their terminal voltage to drop under load. But for many calculations, treating a battery as ideal is close enough.

### Current Source

An ideal **current source** maintains a constant current through itself regardless of the voltage across it. These are less intuitive than voltage sources because we don't encounter obvious examples in daily life.

Real current sources exist in electronics—certain transistor configurations behave as current sources—and they're essential for understanding amplifier biasing and many other circuits.

The schematic symbol is a circle with an arrow indicating current direction.

| Source Type | Symbol | Maintains Constant | Varies With Load |
|-------------|--------|-------------------|------------------|
| Ideal Voltage Source | Circle with +/- | Voltage | Current |
| Ideal Current Source | Circle with arrow | Current | Voltage |

### Dependent Sources

**Dependent sources** (also called controlled sources) have their output determined by a voltage or current elsewhere in the circuit. These become critical when we study amplifiers and transistors later.

There are four types:

- **VCVS**: Voltage-Controlled Voltage Source
- **VCCS**: Voltage-Controlled Current Source
- **CCVS**: Current-Controlled Voltage Source
- **CCCS**: Current-Controlled Current Source

Dependent sources are drawn as diamond shapes to distinguish them from independent sources. For now, just know they exist—we'll explore them deeply when we hit transistor chapters.

## Series Circuits: The Single-File Line

When components are connected end-to-end, forming a single path for current, we call it a **series circuit**. Think of it like a single-lane road: all the cars (charges) must pass through every toll booth (component) along the way.

Key properties of series circuits:

- **Same current** flows through every component
- **Voltages add up** to equal the source voltage
- **Resistances add directly**

#### Series Resistance Formula

$R_{total} = R_1 + R_2 + R_3 + ... + R_n$

where:

- $R_{total}$ is the equivalent total resistance
- $R_1, R_2, ... R_n$ are individual resistor values

This makes intuitive sense: put two equal resistors in series, and you've doubled the obstacle course for current. The total resistance is always larger than any individual resistor.

#### Diagram: Series Circuit Analysis

<iframe src="../../sims/series-circuit/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Series Circuit MicroSim</summary>
Type: microsim

Purpose: Demonstrate current continuity and voltage division in series circuits

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how current remains constant throughout a series circuit while voltage divides across components proportionally to their resistance.

Instructional Rationale: Step-through analysis with concrete values helps students trace current and voltage through each component, building understanding of series circuit behavior before abstract formula manipulation.

Data Visibility Requirements:
- Stage 1: Show source voltage and resistor values
- Stage 2: Show total resistance calculation
- Stage 3: Show current calculation using Ohm's Law
- Stage 4: Show voltage across each resistor
- Stage 5: Verify KVL (voltages sum to source)

Canvas layout:
- Left section (400px): Circuit schematic with three series resistors
- Right section (200px): Calculation panel showing values

Visual elements:
- Battery/voltage source at left
- Three resistors in series loop (R1, R2, R3)
- Animated current flow (dots moving through circuit)
- Voltage labels across each component
- Ammeter symbol showing current value

Interactive controls:
- Slider: Source voltage (1V to 20V, default 12V)
- Slider: R1 value (100Ω to 2kΩ, default 1kΩ)
- Slider: R2 value (100Ω to 2kΩ, default 2kΩ)
- Slider: R3 value (100Ω to 2kΩ, default 1kΩ)
- Button: Step through analysis
- Checkbox: Show current animation

Default parameters:
- Vs = 12V
- R1 = 1kΩ, R2 = 2kΩ, R3 = 1kΩ
- Animation off initially

Behavior:
- Total resistance updates: R_total = R1 + R2 + R3
- Current calculates: I = Vs / R_total
- Individual voltages calculate: V1 = I×R1, V2 = I×R2, V3 = I×R3
- KVL verification shows V1 + V2 + V3 = Vs
- Animation speed proportional to current magnitude

Implementation: p5.js with animated circuit and step-through controls
</details>

## Parallel Circuits: Multiple Paths

When components connect across the same two nodes, sharing the same voltage, they're in **parallel**. Think of parallel lanes on a highway: traffic (current) divides among them, but they all connect the same two points.

Key properties of parallel circuits:

- **Same voltage** appears across every component
- **Currents add up** to equal the total current from the source
- **Resistances combine reciprocally** (the formula looks weird but makes sense)

#### Parallel Resistance Formula

$\frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + ... + \frac{1}{R_n}$

where:

- $R_{total}$ is the equivalent total resistance
- $R_1, R_2, ... R_n$ are individual resistor values

For two resistors in parallel, there's a simpler formula:

#### Two Resistors in Parallel

$R_{total} = \frac{R_1 \cdot R_2}{R_1 + R_2}$

This is often called the "product over sum" formula. Memorize it—you'll use it constantly.

A key insight: **the total resistance of a parallel combination is always less than the smallest individual resistor**. Adding more parallel paths makes it easier for current to flow, reducing the overall resistance.

#### Diagram: Parallel Circuit Analysis

<iframe src="../../sims/parallel-circuit/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Parallel Circuit MicroSim</summary>
Type: microsim

Purpose: Demonstrate voltage equality and current division in parallel circuits

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how voltage remains equal across all branches of a parallel circuit while current divides inversely proportional to resistance.

Instructional Rationale: Visualization of current splitting at nodes helps students understand why more current flows through lower resistance paths, connecting to physical intuition about "easier paths."

Data Visibility Requirements:
- Stage 1: Show source voltage and resistor values
- Stage 2: Show each branch current calculation
- Stage 3: Show total current (sum of branches)
- Stage 4: Show equivalent resistance calculation
- Stage 5: Verify total current = Vs / R_eq

Canvas layout:
- Left section (400px): Circuit schematic with three parallel resistors
- Right section (200px): Calculation panel

Visual elements:
- Battery/voltage source on left
- Three parallel resistor branches
- Animated current flow showing branching at nodes
- Current labels on each branch
- Common voltage labeled across each resistor

Interactive controls:
- Slider: Source voltage (1V to 20V, default 12V)
- Slider: R1 value (500Ω to 5kΩ, default 1kΩ)
- Slider: R2 value (500Ω to 5kΩ, default 2kΩ)
- Slider: R3 value (500Ω to 5kΩ, default 3kΩ)
- Checkbox: Show current animation
- Display: Equivalent resistance

Default parameters:
- Vs = 12V
- R1 = 1kΩ, R2 = 2kΩ, R3 = 3kΩ

Behavior:
- Branch currents: I1 = Vs/R1, I2 = Vs/R2, I3 = Vs/R3
- Total current: I_total = I1 + I2 + I3
- Equivalent resistance calculated and displayed
- Animation shows current splitting proportionally at nodes
- Thicker animated paths for higher current branches

Implementation: p5.js with branching current animation
</details>

## Series-Parallel Circuits: The Real World

Most practical circuits aren't purely series or purely parallel—they're combinations. Analyzing these **series-parallel circuits** requires breaking them down systematically.

The strategy:

1. Identify groups of resistors that are purely in series or purely in parallel
2. Replace each group with its equivalent resistance
3. Repeat until you have a single equivalent resistance
4. Work backward to find individual voltages and currents

This is like simplifying a complex fraction: you work from the inside out, reducing the complexity step by step.

#### Diagram: Series-Parallel Analysis

<iframe src="../../sims/series-parallel-circuit/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Series-Parallel Circuit Analysis MicroSim</summary>
Type: microsim

Purpose: Guide students through systematic analysis of combined series-parallel circuits

Bloom Level: Analyze (L4)
Bloom Verb: examine

Learning Objective: Students will analyze series-parallel circuits by systematically identifying and reducing series and parallel combinations to find equivalent resistance.

Instructional Rationale: Step-by-step reduction with visual circuit transformation shows students the process of simplification. Each step maintains circuit equivalence while reducing complexity.

Data Visibility Requirements:
- Stage 1: Original circuit with all resistor values
- Stage 2: Identify first reducible group (highlight)
- Stage 3: Show calculation for that group
- Stage 4: Redraw circuit with equivalent resistor
- Stage 5-N: Repeat until single equivalent
- Final: Calculate total current, then work backward for individual values

Canvas layout:
- Main area (500px): Circuit diagram that transforms at each step
- Side panel (150px): Step-by-step calculation log
- Bottom (80px): Navigation controls

Visual elements:
- Circuit with R1 in series with parallel combination of (R2 || R3)
- Additional R4 in series after the parallel section
- Highlighting to show current reduction step
- Intermediate equivalent resistor replaces reduced section

Interactive controls:
- Button: "Next Step" advances the reduction
- Button: "Previous Step" goes back
- Button: "Reset" returns to original circuit
- Slider: Each resistor value adjustable
- Display: Running calculation log

Default circuit:
- Vs = 24V
- R1 = 2kΩ (in series)
- R2 = 6kΩ, R3 = 3kΩ (in parallel with each other)
- R4 = 1kΩ (in series)

Solution steps:
1. Identify R2 || R3 parallel combination
2. Calculate: R23 = (6k × 3k)/(6k + 3k) = 2kΩ
3. Redraw with R23 replacing R2,R3
4. Add series resistances: R_total = 2k + 2k + 1k = 5kΩ
5. Total current: I = 24V / 5kΩ = 4.8mA
6. Work backward for individual voltages

Implementation: p5.js with step-based circuit redrawing
</details>

## The Voltage Divider: A Circuit You'll Build a Thousand Times

Take two resistors in series, connect them to a voltage source, and tap the middle point. Congratulations—you've built a **voltage divider**, one of the most useful circuits in electronics.

The voltage at the middle point is a fraction of the source voltage, determined by the resistance ratio.

#### Voltage Divider Formula

$V_{out} = V_{in} \cdot \frac{R_2}{R_1 + R_2}$

where:

- $V_{out}$ is the output voltage (at the junction of R1 and R2)
- $V_{in}$ is the input voltage
- $R_1$ is the resistor connected to the positive input
- $R_2$ is the resistor connected to ground

!!! tip "Quick Check"
    Notice that if $R_1 = R_2$, then $V_{out} = V_{in}/2$. Equal resistors give you half the input voltage. This is handy for quick mental calculations.

Voltage dividers are everywhere:

- Creating reference voltages for comparators
- Scaling signals to fit ADC input ranges
- Biasing transistor circuits
- Reading resistive sensors (thermistors, photoresistors)

#### Diagram: Voltage Divider Calculator

<iframe src="../../sims/voltage-divider/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Voltage Divider MicroSim</summary>
Type: microsim

Purpose: Allow students to design voltage dividers for specific output voltages

Bloom Level: Apply (L3)
Bloom Verb: implement

Learning Objective: Students will implement voltage divider circuits to produce specific output voltages and understand the effect of resistor ratio on output.

Instructional Rationale: Bidirectional interaction (adjust resistors to see output, or specify output to see required resistors) builds deeper understanding than one-way calculation.

Canvas layout:
- Left (350px): Circuit schematic
- Right (250px): Calculator interface

Visual elements:
- Voltage source connected to series R1-R2
- Output tap between R1 and R2 (to ground)
- Voltage labels at input and output
- Visual representation of voltage "dropping" across R1

Interactive controls:
- Slider: Input voltage (1V to 24V, default 12V)
- Slider: R1 value (100Ω to 100kΩ, log scale)
- Slider: R2 value (100Ω to 100kΩ, log scale)
- Display: Output voltage calculated
- Display: Ratio R2/(R1+R2) as percentage
- Mode toggle: "Find Vout" vs "Find R2 for target Vout"
- Target Vout slider (active in second mode)

Default parameters:
- Vin = 12V
- R1 = 10kΩ
- R2 = 10kΩ
- Vout = 6V (calculated)

Behavior:
- Real-time Vout calculation as sliders move
- In "Find R2" mode, calculates required R2 for target Vout given Vin and R1
- Warning if required R2 is impractical (<10Ω or >10MΩ)
- Shows loading effect warning if connected load resistance mentioned

Implementation: p5.js with dual-mode calculator
</details>

### Voltage Divider Loading Effect

Here's a trap that catches beginners: voltage dividers work perfectly when nothing is connected to the output. Connect a load (which has its own resistance), and the output voltage drops.

The load resistance appears in parallel with R2, reducing the effective lower resistance. For a voltage divider to work well, the load resistance must be much larger than R2—typically 10× larger or more.

This is why high-impedance inputs are valuable: they don't disturb the circuits they measure.

## The Current Divider: Sharing the Flow

Just as voltage divides in series circuits, current divides in parallel circuits. A **current divider** lets you calculate how current splits between parallel branches.

#### Current Divider Formula

For two parallel resistors:

$I_1 = I_{total} \cdot \frac{R_2}{R_1 + R_2}$

where:

- $I_1$ is the current through R1
- $I_{total}$ is the total current entering the parallel combination
- $R_1$ and $R_2$ are the parallel resistors

Notice something counterintuitive? The current through R1 depends on R2 (and vice versa). More current flows through the **smaller** resistance—the path of least resistance, literally.

!!! warning "Don't Mix Them Up"
    In a voltage divider, output voltage increases with R2 (the bottom resistor).
    In a current divider, current through a branch increases when the *other* branch has higher resistance.

    When in doubt, use Ohm's Law directly rather than memorizing formulas you might misapply.

## Energy Conservation and Kirchhoff's Laws

Everything we've discussed obeys a fundamental principle: **energy conservation**. Charge moving through a circuit gains energy from sources and loses energy in resistors (and other components). The total energy gained must equal the total energy lost.

This principle gives us **Kirchhoff's Voltage Law (KVL)**: the sum of all voltages around any closed loop equals zero.

#### Kirchhoff's Voltage Law

$\sum_{k=1}^{n} V_k = 0$

where:

- $V_k$ is the voltage across the $k$th element
- The sum is taken around a closed loop

In practice: as you go around a loop, voltage rises through sources and drops across resistors. Add them up (with proper signs), and you get zero.

Similarly, **Kirchhoff's Current Law (KCL)** states that current is conserved at any node: what flows in must flow out.

These laws are the foundation of systematic circuit analysis. We'll explore them deeply in the next chapter when we tackle more complex circuits.

## Linearity: The Gift That Keeps on Giving

Ohm's Law describes a **linear** relationship. If you double the voltage, you double the current. If you halve the voltage, you halve the current. No surprises, no complications.

This **linearity** property enables powerful analysis techniques:

- **Superposition**: Analyze each source separately and add the results
- **Thevenin/Norton equivalents**: Reduce complex circuits to simple models
- **Linear algebra methods**: Solve circuit equations using matrices

Not all components are linear (diodes and transistors aren't), but resistive circuits are, and that makes them beautifully predictable.

#### Diagram: Linear vs Nonlinear Behavior

<iframe src="../../sims/linear-vs-nonlinear/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Linear vs Nonlinear I-V Characteristics</summary>
Type: chart

Purpose: Contrast linear (resistor) and nonlinear (diode) current-voltage relationships

Bloom Level: Understand (L2)
Bloom Verb: compare

Learning Objective: Students will compare the linear I-V characteristic of a resistor with the nonlinear characteristic of a diode to understand why linearity simplifies analysis.

Chart type: Line chart with two curves

X-axis: Voltage (-2V to +2V)
Y-axis: Current (-20mA to +20mA)

Data series:
1. Resistor (R = 100Ω): Straight line through origin, slope = 1/R
   - Points: (-2V, -20mA), (-1V, -10mA), (0V, 0mA), (1V, 10mA), (2V, 20mA)

2. Diode (ideal exponential): Curved line showing exponential behavior
   - Minimal current for negative voltage
   - Sharp rise above ~0.6V
   - Points follow I = Is(e^(V/Vt) - 1) approximation

Title: "I-V Characteristics: Resistor vs Diode"

Annotations:
- Label on resistor line: "Linear: I = V/R"
- Label on diode curve: "Nonlinear: exponential relationship"
- Highlight the 0.6V "knee" of the diode curve

Interactive features:
- Slider to change resistor value and see slope change
- Toggle to show/hide diode curve
- Hover to see exact values

Color scheme:
- Blue for resistor (linear)
- Orange for diode (nonlinear)

Implementation: p5.js or Chart.js with interactive elements
</details>

## Potentiometers: Variable Resistance

A **potentiometer** (or "pot") is a three-terminal resistor with an adjustable center tap. Turn the knob (or slide the lever), and you change the resistance ratio—and therefore the voltage at the wiper terminal.

Potentiometers are essentially adjustable voltage dividers. They're used for:

- Volume controls in audio equipment
- User-adjustable settings (brightness, contrast)
- Calibration adjustments
- Position sensing (linear or rotary)

The three terminals are:

- End terminal 1 (one end of the resistive element)
- Wiper (the moving contact)
- End terminal 2 (other end of the resistive element)

Common potentiometer values range from 1kΩ to 1MΩ. Types include linear taper (linear relationship between rotation and resistance) and logarithmic/audio taper (designed to match human perception of loudness).

#### Diagram: Potentiometer as Voltage Divider

<iframe src="../../sims/potentiometer/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Potentiometer MicroSim</summary>
Type: microsim

Purpose: Demonstrate how potentiometer position creates a variable voltage divider

Bloom Level: Apply (L3)
Bloom Verb: demonstrate

Learning Objective: Students will demonstrate how adjusting a potentiometer changes the voltage divider ratio and output voltage.

Instructional Rationale: Direct manipulation of a virtual potentiometer with immediate voltage feedback builds intuition for this common component.

Canvas layout:
- Left (300px): Physical potentiometer representation with rotating knob
- Right (300px): Equivalent circuit schematic showing variable R1 and R2

Visual elements:
- Circular potentiometer body with knob indicator
- Three terminals labeled
- Equivalent circuit showing two resistors with moving tap
- Output voltage display
- Resistance values for "upper" and "lower" portions

Interactive controls:
- Draggable knob (0° to 300° rotation)
- Slider alternative for precise control
- Display: Position as percentage (0% to 100%)
- Display: Upper resistance, lower resistance, output voltage
- Input voltage slider (1V to 12V)
- Total potentiometer value selector (1kΩ, 10kΩ, 100kΩ)

Default parameters:
- Total resistance: 10kΩ
- Position: 50%
- Input voltage: 5V
- Output: 2.5V

Behavior:
- Knob rotation changes position percentage
- Upper R = Total × (1 - position)
- Lower R = Total × position
- Output voltage = Vin × position (for unloaded divider)
- Real-time update of all values

Implementation: p5.js with rotational input and circuit visualization
</details>

## Wire Resistance: The Overlooked Reality

In ideal circuit analysis, we assume wires have zero resistance. In reality, every wire has some resistance, determined by:

#### Wire Resistance Formula

$R_{wire} = \rho \cdot \frac{L}{A}$

where:

- $R_{wire}$ is the wire resistance in ohms
- $\rho$ (rho) is the resistivity of the material (Ω·m)
- $L$ is the wire length (m)
- $A$ is the cross-sectional area (m²)

For most bench circuits with short wires, this resistance is negligible. But it matters when:

- Wires are long (power distribution, speaker cables)
- Currents are high (power supply connections)
- Precision measurements are needed
- Wire gauge is small (thin wires)

**American Wire Gauge (AWG)** specifies wire sizes. Smaller AWG numbers mean thicker wires with lower resistance. Common hookup wire is 22 AWG; house wiring uses 12 or 14 AWG.

| AWG | Diameter (mm) | Resistance (Ω/m) | Typical Use |
|-----|---------------|------------------|-------------|
| 10 | 2.59 | 0.0033 | Power distribution |
| 14 | 1.63 | 0.0083 | House wiring |
| 18 | 1.02 | 0.021 | Lamp cord |
| 22 | 0.64 | 0.053 | Hookup wire |
| 26 | 0.40 | 0.134 | Ribbon cable |
| 30 | 0.25 | 0.339 | Wire wrap |

## Putting It All Together: Analysis Example

Let's work through a complete circuit analysis using all the tools we've developed.

**Problem**: Find all currents and voltages in a circuit with:
- 12V voltage source
- R1 = 2kΩ in series with a parallel combination
- Parallel combination: R2 = 3kΩ and R3 = 6kΩ

**Solution**:

**Step 1: Find equivalent resistance of parallel combination**

$R_{23} = \frac{R_2 \cdot R_3}{R_2 + R_3} = \frac{3k \cdot 6k}{3k + 6k} = \frac{18M}{9k} = 2kΩ$

**Step 2: Find total resistance**

$R_{total} = R_1 + R_{23} = 2kΩ + 2kΩ = 4kΩ$

**Step 3: Find total current** (from source, through R1)

$I_{total} = \frac{V_s}{R_{total}} = \frac{12V}{4kΩ} = 3mA$

**Step 4: Find voltage across R1**

$V_1 = I_{total} \cdot R_1 = 3mA \cdot 2kΩ = 6V$

**Step 5: Find voltage across parallel combination**

$V_{23} = V_s - V_1 = 12V - 6V = 6V$

(Or: $V_{23} = I_{total} \cdot R_{23} = 3mA \cdot 2kΩ = 6V$)

**Step 6: Find branch currents**

$I_2 = \frac{V_{23}}{R_2} = \frac{6V}{3kΩ} = 2mA$

$I_3 = \frac{V_{23}}{R_3} = \frac{6V}{6kΩ} = 1mA$

**Verification**: $I_2 + I_3 = 2mA + 1mA = 3mA = I_{total}$ ✓

The current divides according to the inverse resistance ratio: twice as much current flows through R2 (half the resistance of R3).

## Summary and Key Takeaways

Congratulations! You've acquired some serious circuit superpowers in this chapter. Let's recap what you can now do:

**Core Skills Gained:**

- Apply Ohm's Law in all three forms to find voltage, current, or resistance
- Calculate power dissipation and select appropriately rated components
- Decode resistor color bands to determine resistance values
- Analyze series circuits (same current, voltages add, resistances add)
- Analyze parallel circuits (same voltage, currents add, resistances combine reciprocally)
- Break down series-parallel combinations systematically
- Design voltage dividers for specific output voltages
- Understand current division in parallel branches

**Key Formulas to Remember:**

| Formula | Application |
|---------|-------------|
| $V = IR$ | Ohm's Law |
| $P = VI = I^2R = V^2/R$ | Power |
| $R_s = R_1 + R_2 + ...$ | Series resistance |
| $1/R_p = 1/R_1 + 1/R_2 + ...$ | Parallel resistance |
| $R_p = (R_1 \cdot R_2)/(R_1 + R_2)$ | Two parallel resistors |
| $V_{out} = V_{in} \cdot R_2/(R_1 + R_2)$ | Voltage divider |

**Practical Wisdom:**

- Always check power ratings—components fail when overheated
- Derate components to improve reliability
- Voltage dividers need high-impedance loads to work properly
- Real wires have resistance that may matter at high currents
- Tolerance specifications tell you the range of actual values to expect

In the next chapter, we'll build on these foundations with Kirchhoff's Laws and more sophisticated analysis techniques. The circuits will get more complex, but the fundamental tools you've learned here will carry you through.

Now go forth and analyze circuits! And remember: resistance isn't futile—it's measured in ohms.

??? question "Self-Check: Can You Answer These?"
    1. A 5V source connects to two 10kΩ resistors in series. What current flows? What is the voltage across each resistor?

    2. Those same resistors are now in parallel across the 5V source. What is the equivalent resistance? What is the total current? What current flows through each resistor?

    3. You need exactly 2.5V from a 9V battery using a voltage divider. If R1 = 2.6kΩ, what should R2 be?

    4. A 470Ω resistor with 0.4V across it dissipates how much power? Would a 1/4W resistor be adequate?

