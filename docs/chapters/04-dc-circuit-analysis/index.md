---
title: DC Circuit Analysis Methods
description: Master Thevenin, Norton, and systematic analysis techniques for simplifying complex circuits
generated_by: claude skill chapter-content-generator
date: 2026-01-30
version: 0.03
---

# DC Circuit Analysis Methods

## Summary

This chapter covers advanced circuit analysis techniques including Thevenin's and Norton's theorems, which allow complex circuits to be simplified to equivalent forms. Students will learn source transformation, the maximum power transfer theorem, and how to analyze two-port networks. The chapter also addresses practical considerations like input and output resistance and the loading effect. After completing this chapter, students will be able to simplify complex circuits, design for maximum power transfer, and understand how connecting circuits together affects their behavior.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

1. Source Transformation
2. Thevenin's Theorem
3. Thevenin Equivalent
4. Norton's Theorem
5. Norton Equivalent
6. Maximum Power Transfer
7. Nodal Analysis
8. Mesh Analysis
9. Two-Port Networks
10. Input Resistance
11. Output Resistance
12. Loading Effect
13. Capacitor
14. Capacitance
15. Dielectric Material
16. Inductor
17. Inductance
18. Magnetic Field

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Electric Charge and Basic Circuit Quantities](../01-electric-charge-basic-quantities/index.md)
- [Chapter 2: Ohm's Law and Basic Circuit Configurations](../02-ohms-law-basic-configurations/index.md)
- [Chapter 3: Kirchhoff's Laws and Circuit Topology](../03-kirchhoffs-laws-topology/index.md)

---

## Introduction: The Circuit Whisperer's Toolkit

Welcome to the chapter where you level up from "person who can solve circuits" to "person who can make circuits *behave*." If previous chapters gave you the vocabulary of circuit analysis, this chapter teaches you the rhetorical flourishes—the elegant shortcuts that practicing engineers use to tame even the most intimidating schematics.

Here's a confession from the engineering world: nobody actually wants to write down 47 equations and solve them simultaneously. Life's too short, and coffee only keeps you awake for so long. That's why clever engineers developed **Thevenin's theorem**, **Norton's theorem**, and systematic analysis methods like **nodal** and **mesh analysis**. These techniques are the intellectual equivalent of a "skip to the good part" button.

Think of this chapter as learning the cheat codes for circuit analysis. Except they're not cheating—they're mathematically rigorous shortcuts that will make you look like a wizard to anyone watching you work.

Ready to simplify complexity? Let's dive in. (Don't worry, there will be puns. Current events demand it.)

## Nodal Analysis: Every Node Tells a Story

Before we get to the glamorous theorems, let's master **nodal analysis**—a systematic method that works on any circuit, every time, no exceptions. It's not flashy, but it's reliable. Think of it as the sensible sedan of circuit analysis: it won't turn heads, but it'll always get you there.

Nodal analysis is based on **Kirchhoff's Current Law (KCL)**: the sum of currents entering any node equals the sum of currents leaving. We use this to write equations at each node, solving for unknown node voltages.

### The Nodal Analysis Recipe

Here's the step-by-step procedure:

1. **Choose a reference node** (ground)—typically the node with the most connections
2. **Label remaining node voltages** ($V_1$, $V_2$, etc.) relative to ground
3. **Write KCL equations** at each non-reference node
4. **Express currents using Ohm's Law**: $I = \frac{V_{across}}{R}$
5. **Solve the system of equations** for node voltages
6. **Calculate any desired branch currents** using Ohm's Law

Let's see why this works with a concrete example.

#### Diagram: Nodal Analysis Step-by-Step

<iframe src="../../sims/nodal-analysis-steps/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Nodal Analysis Step-by-Step MicroSim</summary>
Type: microsim

Purpose: Guide students through the nodal analysis process with a three-node circuit

Bloom Level: Apply (L3)
Bloom Verb: execute

Learning Objective: Students will execute the nodal analysis procedure to solve for unknown node voltages in a multi-node circuit.

Instructional Rationale: Step-through with concrete worked examples shows students the complete process. Seeing equations form and solve builds confidence in the systematic method.

Data Visibility Requirements:
- Stage 1: Show circuit with labeled nodes and ground
- Stage 2: Write KCL equation for Node 1 (show current directions)
- Stage 3: Write KCL equation for Node 2
- Stage 4: Show system of equations in matrix form
- Stage 5: Solve and display node voltages
- Stage 6: Calculate branch currents from node voltages

Canvas layout:
- Left section (450px): Circuit diagram with highlighting
- Right section (200px): Equation panel showing current step

Visual elements:
- Circuit with voltage source, three nodes, four resistors
- Node labels (V1, V2) with ground reference
- Current direction arrows that appear as equations are written
- Highlighting to show which node is being analyzed

Interactive controls:
- Button: "Next Step" advances through analysis
- Button: "Previous Step" goes back
- Button: "Reset" returns to beginning
- Checkbox: "Show all currents"
- Display: Running equation development

Default circuit:
- 10V voltage source
- R1 = 2kΩ, R2 = 4kΩ, R3 = 4kΩ, R4 = 2kΩ
- Three-node configuration

Behavior:
- Each step highlights relevant circuit portion
- Equations build incrementally
- Matrix form shows after individual equations
- Solution shows substitution process
- Final currents calculated and displayed

Implementation: p5.js with step-based visualization and equation rendering
</details>

### Setting Up the KCL Equations

For each node, we write: **sum of currents leaving = 0** (treating entering currents as negative). Using Ohm's Law to express each current:

#### KCL at a Node

For node with voltage $V_n$ connected to nodes $V_1, V_2, ...$ through resistors $R_1, R_2, ...$:

$\frac{V_n - V_1}{R_1} + \frac{V_n - V_2}{R_2} + ... = 0$

where:

- $V_n$ is the voltage at node n (what we're solving for)
- $V_1, V_2, ...$ are voltages at connected nodes
- $R_1, R_2, ...$ are resistances connecting to those nodes

!!! tip "Sign Convention Consistency"
    Always be consistent with your sign convention. If you define currents as "leaving the node" being positive, stick with that throughout. Mixing conventions is the #1 source of errors in nodal analysis.

### Nodal Analysis with Voltage Sources

Here's a twist: what if there's a voltage source between two nodes? You can't write a simple KCL equation because you don't know the current through a voltage source from Ohm's Law (it's whatever the circuit requires).

The solution: create a **supernode** by drawing a boundary around both nodes connected by the voltage source. Write KCL for the supernode boundary, and add the constraint equation from the voltage source.

| Situation | Approach |
|-----------|----------|
| Voltage source to ground | That node voltage is known! |
| Voltage source between nodes | Create supernode |
| Current source | Current is known; include directly in KCL |

## Mesh Analysis: Going Around in Circles (On Purpose)

While nodal analysis focuses on nodes and voltages, **mesh analysis** focuses on loops and currents. It's based on **Kirchhoff's Voltage Law (KVL)**: the sum of voltages around any closed loop equals zero.

A **mesh** is a loop that contains no other loops inside it—the "smallest" possible loops in a planar circuit.

### The Mesh Analysis Recipe

1. **Assign mesh currents** ($I_1$, $I_2$, etc.) to each mesh, all in the same direction (usually clockwise)
2. **Write KVL equations** around each mesh
3. **Express voltages using Ohm's Law**: $V = I \cdot R$
4. **Handle shared elements**: if a resistor is shared by two meshes, the current through it is the difference of mesh currents
5. **Solve the system of equations** for mesh currents
6. **Calculate any desired voltages** using Ohm's Law

#### Diagram: Mesh Analysis Visualization

<iframe src="../../sims/mesh-analysis/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Mesh Analysis Step-by-Step MicroSim</summary>
Type: microsim

Purpose: Demonstrate mesh analysis on a two-mesh circuit with shared resistor

Bloom Level: Apply (L3)
Bloom Verb: solve

Learning Objective: Students will solve for mesh currents using KVL equations and determine actual branch currents from mesh current differences.

Instructional Rationale: Visual representation of mesh currents as circulating loops helps students understand the concept. Highlighting shared resistors shows why current subtraction is needed.

Data Visibility Requirements:
- Stage 1: Show circuit with mesh current assignments (I1, I2)
- Stage 2: Write KVL equation for Mesh 1, showing each voltage term
- Stage 3: Write KVL equation for Mesh 2
- Stage 4: Show system of equations
- Stage 5: Solve for mesh currents
- Stage 6: Calculate actual branch currents (especially shared resistor: I1 - I2)

Canvas layout:
- Main area (500px): Circuit with mesh current loops visualized
- Side panel (150px): Equation development

Visual elements:
- Two adjacent meshes sharing one resistor
- Circular arrows showing mesh current direction
- Shared resistor highlighted to show both currents
- Voltage drops labeled with polarity
- Different colors for each mesh

Interactive controls:
- Button: "Next Step"
- Button: "Previous Step"
- Sliders for voltage source and resistor values
- Display: Mesh current values
- Display: Actual branch currents

Default circuit:
- Vs1 = 10V, Vs2 = 5V
- R1 = 1kΩ, R2 = 2kΩ (shared), R3 = 1kΩ
- Two meshes sharing R2

Behavior:
- Mesh currents shown as animated loops
- Shared resistor shows both currents with subtraction
- Step through builds equations incrementally
- Final branch currents clearly labeled

Implementation: p5.js with animated mesh current visualization
</details>

### Nodal vs. Mesh: When to Use Which?

Both methods always work, but one may be easier depending on the circuit:

| Circuit Characteristic | Better Method |
|------------------------|---------------|
| More nodes than meshes | Mesh analysis |
| More meshes than nodes | Nodal analysis |
| Voltage sources | Nodal (except between nodes) |
| Current sources | Mesh analysis |
| Need to find voltages | Nodal analysis |
| Need to find currents | Mesh analysis |

Pro tip: if a circuit has both current and voltage sources scattered around, pick the method that results in fewer equations. Your future self (at 2 AM before the exam) will thank you.

## Thevenin's Theorem: The Great Simplifier

Now we arrive at one of the most powerful tools in circuit analysis: **Thevenin's theorem**. It says something almost magical:

> Any linear circuit with voltage sources, current sources, and resistors can be replaced by a single voltage source in series with a single resistor.

Read that again. *Any* linear circuit. Two components. That's it.

This is the circuit equivalent of reducing a complex recipe to "add water." The resulting **Thevenin equivalent circuit** behaves identically to the original from the perspective of anything connected to its terminals.

#### Thevenin Equivalent Circuit

The Thevenin equivalent consists of:

$V_{Th}$ = Thevenin voltage (open-circuit voltage at the terminals)

$R_{Th}$ = Thevenin resistance (equivalent resistance seen from terminals with sources zeroed)

where:

- $V_{Th}$ is the voltage measured at the terminals with nothing connected (open circuit)
- $R_{Th}$ is the resistance "looking into" the terminals with independent voltage sources replaced by short circuits and independent current sources replaced by open circuits

#### Diagram: Thevenin Equivalent Concept

<iframe src="../../sims/thevenin-concept/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Thevenin Equivalent Concept MicroSim</summary>
Type: microsim

Purpose: Visualize the concept of replacing a complex circuit with its Thevenin equivalent

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how a complex circuit can be represented by a simple voltage source and series resistance that behaves identically at the terminals.

Instructional Rationale: Side-by-side comparison of original and equivalent circuit with matching I-V characteristics demonstrates equivalence visually.

Data Visibility Requirements:
- Stage 1: Show original complex circuit with load terminals highlighted
- Stage 2: Show measurement of open-circuit voltage (Vth)
- Stage 3: Show calculation of Thevenin resistance
- Stage 4: Show Thevenin equivalent circuit
- Stage 5: Connect same load to both; show identical currents and voltages

Canvas layout:
- Top half (250px): Original circuit and Thevenin equivalent side by side
- Bottom half (200px): I-V characteristic curves overlaid (should match perfectly)

Visual elements:
- Original circuit with internal components
- Thevenin equivalent: simple Vth in series with Rth
- Terminal points clearly marked
- Load resistor that can be connected to either
- I-V plot showing both circuits trace the same line

Interactive controls:
- Button: "Find Vth" (animates open-circuit measurement)
- Button: "Find Rth" (animates resistance calculation)
- Button: "Connect Load" (attaches test load to both circuits)
- Slider: Load resistance value
- Display: Current through load, voltage across load (both circuits)

Behavior:
- When load connected, both circuits show identical readings
- Varying load resistance shows same I-V relationship
- I-V plot builds point by point as load varies
- Both curves overlap perfectly

Implementation: p5.js with dual circuit visualization and synchronized I-V plotting
</details>

### Finding the Thevenin Equivalent

There are several methods to find $V_{Th}$ and $R_{Th}$:

**Method 1: Direct Calculation**

1. **Find $V_{Th}$**: Remove the load and calculate the open-circuit voltage at the terminals
2. **Find $R_{Th}$**: Turn off all independent sources (voltage sources → short circuit, current sources → open circuit) and find the equivalent resistance from the terminals

**Method 2: Using Short-Circuit Current**

1. Find the open-circuit voltage $V_{oc} = V_{Th}$
2. Find the short-circuit current $I_{sc}$ (short the terminals and calculate current)
3. Calculate $R_{Th} = V_{oc} / I_{sc}$

| Step | Procedure | What You Get |
|------|-----------|--------------|
| 1 | Open-circuit terminals | $V_{Th}$ |
| 2a | Zero sources, find resistance | $R_{Th}$ (Method 1) |
| 2b | Short terminals, find current | $I_{sc}$, then $R_{Th} = V_{Th}/I_{sc}$ |

!!! note "Why This Matters"
    Thevenin's theorem isn't just a mathematical curiosity—it's how engineers think about connecting circuits together. When you plug your phone into a charger, the charger "sees" your phone as a load. When your phone's charging circuit analyzes the charger, it "sees" a Thevenin equivalent. Everyone's modeling everyone else!

#### Diagram: Thevenin Step-by-Step Solver

<iframe src="../../sims/thevenin-solver/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Thevenin Equivalent Solver MicroSim</summary>
Type: microsim

Purpose: Guide students through finding Thevenin equivalent step-by-step

Bloom Level: Apply (L3)
Bloom Verb: calculate

Learning Objective: Students will calculate Thevenin voltage and resistance for a given circuit using the systematic zeroing-and-measuring approach.

Instructional Rationale: Interactive step-through with circuit transformation visualization shows what "zeroing sources" looks like and how resistance is measured.

Data Visibility Requirements:
- Stage 1: Show original circuit with load marked
- Stage 2: Remove load, show open-circuit voltage measurement
- Stage 3: Show voltage sources replaced by short circuits
- Stage 4: Show current sources replaced by open circuits
- Stage 5: Calculate Rth from resulting resistor network
- Stage 6: Display complete Thevenin equivalent

Canvas layout:
- Main area (500px): Circuit that transforms at each step
- Side panel (150px): Calculation summary

Visual elements:
- Original circuit with highlighted load terminals
- Visual transformation: voltage source becoming wire, current source becoming gap
- Resistance combination shown step by step
- Final Thevenin equivalent highlighted

Interactive controls:
- Button: "Next Step"
- Button: "Previous Step"
- Adjustable source and resistor values
- Display: Vth and Rth values
- Button: "Verify" connects test load to compare

Default circuit:
- 12V voltage source
- 4 resistors in bridge-like configuration
- Two output terminals

Behavior:
- Each step shows transformation with explanation
- Sources visually change (voltage source dims and shows short, current source shows gap)
- Equivalent resistance calculation walks through series/parallel
- Final answer verified by comparing original and equivalent with test load

Implementation: p5.js with animated circuit transformation
</details>

## Norton's Theorem: Thevenin's Alter Ego

If Thevenin's theorem gives you a voltage source with a series resistor, **Norton's theorem** gives you the dual: a current source with a parallel resistor. Same idea, different flavor.

> Any linear circuit with voltage sources, current sources, and resistors can be replaced by a single current source in parallel with a single resistor.

The **Norton equivalent** consists of:

#### Norton Equivalent Circuit

$I_N$ = Norton current (short-circuit current at the terminals)

$R_N$ = Norton resistance (same as Thevenin resistance!)

where:

- $I_N$ is the current that flows when the terminals are shorted
- $R_N$ is the equivalent resistance seen from terminals (identical to $R_{Th}$)

Here's the beautiful part: **$R_N = R_{Th}$**, and Thevenin and Norton equivalents are related by:

#### Thevenin-Norton Relationship

$I_N = \frac{V_{Th}}{R_{Th}}$

and

$V_{Th} = I_N \cdot R_N$

where:

- $I_N$ is the Norton current
- $V_{Th}$ is the Thevenin voltage
- $R_{Th} = R_N$ is the equivalent resistance

This means you can convert between them instantly. Find one, get the other free!

#### Diagram: Thevenin-Norton Duality

<iframe src="../../sims/thevenin-norton-duality/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Thevenin-Norton Conversion MicroSim</summary>
Type: microsim

Purpose: Demonstrate equivalence between Thevenin and Norton representations

Bloom Level: Understand (L2)
Bloom Verb: compare

Learning Objective: Students will compare Thevenin and Norton equivalent circuits and convert between them using the relationship In = Vth/Rth.

Instructional Rationale: Side-by-side display with conversion animation helps students see that these are two representations of the same thing.

Canvas layout:
- Left (275px): Thevenin equivalent circuit
- Center (50px): Conversion arrows
- Right (275px): Norton equivalent circuit
- Bottom (100px): Shared I-V characteristic plot

Visual elements:
- Thevenin: Vth voltage source in series with Rth
- Norton: In current source in parallel with Rn
- Animated conversion showing relationship
- I-V plot that's identical for both

Interactive controls:
- Slider: Vth value (1V to 20V)
- Slider: Rth/Rn value (100Ω to 10kΩ)
- Display: In calculated automatically
- Button: "Animate Conversion"
- Display: Both circuits' behavior with same test load

Default parameters:
- Vth = 10V
- Rth = Rn = 1kΩ
- In = 10mA

Behavior:
- Changing Vth updates In = Vth/Rth
- Changing R updates In
- Animation shows conceptual transformation
- Test load shows identical behavior
- I-V plots overlap perfectly

Implementation: p5.js with dual circuit display and synchronized parameters
</details>

## Source Transformation: The Quick Conversion

We can extend the Thevenin-Norton relationship to any voltage or current source with a resistor. **Source transformation** is the ability to convert:

- A voltage source $V_s$ in series with resistor $R$ → Current source $I_s = V_s/R$ in parallel with same $R$
- A current source $I_s$ in parallel with resistor $R$ → Voltage source $V_s = I_s \cdot R$ in series with same $R$

This is incredibly useful for simplifying circuits before analysis. Got a mix of voltage and current sources? Transform them all to the same type, and combining them becomes easy.

| Original | Transformed | Relationship |
|----------|-------------|--------------|
| $V_s$ in series with R | $I_s$ in parallel with R | $I_s = V_s/R$ |
| $I_s$ in parallel with R | $V_s$ in series with R | $V_s = I_s \cdot R$ |

!!! warning "What You Can't Transform"
    - An ideal voltage source without a series resistor (infinite current capability)
    - An ideal current source without a parallel resistor (infinite voltage capability)

    The resistor is essential for the transformation. No resistor, no transformation.

#### Diagram: Source Transformation Practice

<iframe src="../../sims/source-transformation/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Source Transformation MicroSim</summary>
Type: microsim

Purpose: Practice converting between voltage and current source representations

Bloom Level: Apply (L3)
Bloom Verb: use

Learning Objective: Students will use source transformation to convert circuits between voltage-source and current-source representations while maintaining equivalent behavior.

Instructional Rationale: Interactive transformation with immediate visual feedback reinforces that these are equivalent representations.

Canvas layout:
- Top (250px): Original and transformed circuits side by side
- Bottom (150px): Verification showing both drive same load identically

Visual elements:
- Original circuit: Either Vs with series R, or Is with parallel R
- Transformed circuit: The equivalent
- Animated transformation showing relationship
- Load connection showing identical behavior

Interactive controls:
- Radio buttons: Start with voltage source or current source
- Slider: Source value (voltage or current)
- Slider: Resistance value
- Button: "Transform!"
- Display: Calculated equivalent values
- Load slider to verify equivalence

Default parameters:
- Voltage source: 12V with 3kΩ series resistor
- Equivalent: 4mA current source with 3kΩ parallel resistor

Behavior:
- Transform button triggers animated conversion
- Values update automatically
- Load verification shows identical IL and VL for both
- Can transform back and forth

Implementation: p5.js with animated circuit transformation
</details>

## Maximum Power Transfer: Getting the Most Bang for Your Buck

Here's a question with practical implications: given a source (with internal resistance), what load resistance extracts the maximum possible power?

The answer, derived from calculus but intuitive once you see it:

#### Maximum Power Transfer Theorem

For maximum power transfer from source to load:

$R_{Load} = R_{Th}$

The load resistance should equal the Thevenin resistance of the source.

where:

- $R_{Load}$ is the load resistance
- $R_{Th}$ is the Thevenin resistance of the source network

At this condition, exactly half the total power is delivered to the load. The other half? Dissipated in the source resistance. This 50% efficiency might seem wasteful, but for low-power signal applications (like audio amplifiers driving speakers), extracting maximum power often matters more than efficiency.

#### Maximum Power Formula

$P_{max} = \frac{V_{Th}^2}{4R_{Th}}$

where:

- $P_{max}$ is the maximum power delivered to the load
- $V_{Th}$ is the Thevenin voltage
- $R_{Th}$ is the Thevenin resistance

#### Diagram: Maximum Power Transfer Curve

<iframe src="../../sims/max-power-transfer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Maximum Power Transfer MicroSim</summary>
Type: microsim

Purpose: Visualize how load power varies with load resistance, peaking when RL = Rth

Bloom Level: Analyze (L4)
Bloom Verb: examine

Learning Objective: Students will examine how power delivered to a load varies with load resistance and verify that maximum power occurs when RL equals Rth.

Instructional Rationale: Interactive graph with movable load resistance shows the power curve and confirms the maximum point. Students can explore "what if" scenarios.

Data Visibility Requirements:
- Stage 1: Show source (Vth, Rth) and variable load
- Stage 2: Plot power vs load resistance curve
- Stage 3: Show current calculation for given RL
- Stage 4: Show power calculation: P = I²RL
- Stage 5: Highlight maximum at RL = Rth

Canvas layout:
- Left (300px): Circuit diagram with Thevenin source and load
- Right (300px): Power vs resistance curve

Visual elements:
- Thevenin equivalent with load resistor
- Graph: P_load vs R_load (curve with peak)
- Vertical line at current RL value
- Dot showing operating point on curve
- Horizontal line at Rth showing optimal point

Interactive controls:
- Slider: Vth (5V to 20V)
- Slider: Rth (100Ω to 10kΩ)
- Slider: RL (10Ω to 100kΩ, log scale)
- Display: Current I
- Display: Power to load
- Display: Power to Rth
- Display: Efficiency (%)
- Button: "Jump to Maximum" sets RL = Rth

Default parameters:
- Vth = 12V
- Rth = 1kΩ
- RL = 1kΩ (at maximum)

Behavior:
- Moving RL slider updates operating point on curve
- Power curve updates if Vth or Rth change
- Display shows power, efficiency, and comparison
- Maximum clearly marked on curve
- Numerical readout confirms PL = Vth²/(4Rth) at maximum

Implementation: p5.js with interactive graph and circuit display
</details>

### When Maximum Power Transfer Matters

Maximum power transfer is crucial in:

- **Audio systems**: Matching amplifier output to speaker impedance
- **RF systems**: Antenna matching for maximum signal transmission
- **Sensor interfaces**: Extracting maximum signal from transducers

But it's NOT the goal when:

- **Power efficiency matters**: Power supplies want high efficiency, not maximum power to load
- **Voltage regulation matters**: Loads often need constant voltage regardless of current

| Application | Goal | Optimal Condition |
|-------------|------|-------------------|
| Audio amplifier → Speaker | Maximum power | RL = Rth |
| Power supply → Device | High efficiency | RL >> Rth |
| Signal source → Measurement | Maximum signal | RL = Rth |
| Battery → Motor | Depends on application | Varies |

## Input and Output Resistance: What the World Sees

When you connect two circuits together, they interact. Each circuit "sees" the other as a resistance—and these resistances determine how signals transfer between them.

### Output Resistance

The **output resistance** ($R_{out}$) of a circuit is the Thevenin resistance seen looking back into its output terminals. It tells you how much the output voltage drops when you draw current.

#### Output Resistance

$R_{out} = R_{Th}$ (of the source circuit)

An ideal voltage source has $R_{out} = 0$ (output voltage doesn't change with load). Real circuits have finite output resistance, causing voltage drop under load.

### Input Resistance

The **input resistance** ($R_{in}$) of a circuit is the equivalent resistance seen looking into its input terminals. It tells you how much current the circuit draws from whatever drives it.

#### Input Resistance

$R_{in}$ = equivalent resistance at input terminals

An ideal voltmeter has $R_{in} = \infty$ (draws no current). Real circuits have finite input resistance, loading the source they're connected to.

#### Diagram: Input and Output Resistance

<iframe src="../../sims/input-output-resistance/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Input/Output Resistance MicroSim</summary>
Type: microsim

Purpose: Demonstrate how input and output resistance affect signal transfer between stages

Bloom Level: Analyze (L4)
Bloom Verb: examine

Learning Objective: Students will examine how input and output resistance of connected circuits form a voltage divider that affects signal transfer.

Instructional Rationale: Visual representation of two stages connected shows the inherent voltage divider formed by Rout and Rin, making loading effect intuitive.

Canvas layout:
- Main area (500px): Two circuit blocks connected, showing internal structure
- Bottom (100px): Calculations and display

Visual elements:
- Source stage: Thevenin equivalent (Vth, Rout)
- Load stage: Input represented as Rin
- Connection showing voltage divider formed
- Voltage labels: Vsource, Vat-input

Interactive controls:
- Slider: Source Vth
- Slider: Source Rout (100Ω to 10kΩ)
- Slider: Load Rin (1kΩ to 1MΩ)
- Display: Voltage division ratio
- Display: Input voltage as percentage of source
- Display: Voltage "loss" due to loading

Default parameters:
- Vth = 10V
- Rout = 1kΩ
- Rin = 10kΩ
- Voltage ratio = 10/(1+10) = 90.9%

Behavior:
- Shows voltage divider calculation: Vin = Vth × Rin/(Rout + Rin)
- High Rin/Rout ratio approaches 100% transfer
- Low ratio shows significant loading
- Rule of thumb highlight: Rin should be >10× Rout for <10% loss

Implementation: p5.js with two-stage circuit visualization
</details>

## The Loading Effect: When Circuits Misbehave

The **loading effect** is what happens when connecting a circuit disturbs what it's supposed to measure or receive. It's the circuit equivalent of the observer effect in quantum mechanics—except entirely classical and much more annoying.

Remember the voltage divider from Chapter 2? It works perfectly with no load. Connect a load, and suddenly the output voltage drops. Why? The load resistance appears in parallel with R2, reducing the effective lower resistance.

### Minimizing Loading

To minimize loading:

1. **Source side**: Design for low output resistance
2. **Load side**: Design for high input resistance
3. **Rule of thumb**: $R_{in} > 10 \times R_{out}$ keeps loading under 10%

| Ratio Rin/Rout | Signal Transfer | Loading Effect |
|----------------|-----------------|----------------|
| 10:1 | 91% | Minor |
| 100:1 | 99% | Negligible |
| 1:1 | 50% | Severe |
| 1:10 | 9% | Don't do this |

!!! tip "Buffer Amplifiers"
    When you need to connect a high-output-resistance source to a low-input-resistance load, use a **buffer amplifier** (unity-gain amplifier). It has high Rin (doesn't load the source) and low Rout (drives the load well). We'll study these in the operational amplifier chapter.

#### Diagram: Loading Effect Demonstration

<iframe src="../../sims/loading-effect/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Loading Effect MicroSim</summary>
Type: microsim

Purpose: Show how connecting a load changes voltage divider output

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how connecting a load to a voltage divider changes the output voltage due to the parallel resistance combination.

Instructional Rationale: Before/after comparison with clear calculation shows why loading happens and when it matters.

Data Visibility Requirements:
- Stage 1: Show unloaded voltage divider with calculated Vout
- Stage 2: Connect load resistor
- Stage 3: Show R2 || Rload calculation
- Stage 4: Show new Vout with loaded calculation
- Stage 5: Calculate percentage change in output

Canvas layout:
- Top (300px): Circuit with/without load (toggle)
- Bottom (150px): Calculations and comparison

Visual elements:
- Voltage divider R1, R2 with voltage source
- Load resistor that can connect/disconnect
- Parallel resistance visualization when loaded
- Output voltage reading that changes

Interactive controls:
- Slider: R1 (1kΩ to 100kΩ)
- Slider: R2 (1kΩ to 100kΩ)
- Slider: Rload (1kΩ to 1MΩ)
- Toggle: Load connected/disconnected
- Display: Vout unloaded
- Display: Vout loaded
- Display: Percentage change

Default parameters:
- Vin = 10V
- R1 = 10kΩ
- R2 = 10kΩ
- Vout (unloaded) = 5V
- Rload = 10kΩ
- Vout (loaded) = 3.33V (33% drop!)

Behavior:
- Toggle shows before/after comparison
- Calculations update in real time
- Warning when loading exceeds 10%
- Shows R2 || Rload parallel calculation

Implementation: p5.js with before/after comparison
</details>

## Two-Port Networks: The Black Box View

A **two-port network** is a circuit viewed as a black box with two pairs of terminals: an input port and an output port. We don't care what's inside—we only care about the relationships between voltages and currents at the ports.

This abstraction is powerful for analyzing cascaded stages, filters, and amplifiers.

### Two-Port Parameters

There are several ways to characterize a two-port:

| Parameter Set | Matrix | Relates |
|---------------|--------|---------|
| Z-parameters (impedance) | $[Z]$ | V = Z × I |
| Y-parameters (admittance) | $[Y]$ | I = Y × V |
| h-parameters (hybrid) | $[h]$ | Mixed V and I |
| ABCD (transmission) | $[T]$ | Input to output |

For cascaded networks, ABCD parameters are especially nice: just multiply the matrices!

#### Two-Port Impedance Parameters

$V_1 = Z_{11}I_1 + Z_{12}I_2$

$V_2 = Z_{21}I_1 + Z_{22}I_2$

where:

- $Z_{11}$ is input impedance with output open
- $Z_{12}$ is reverse transfer impedance
- $Z_{21}$ is forward transfer impedance
- $Z_{22}$ is output impedance with input open

#### Diagram: Two-Port Network Concept

<iframe src="../../sims/two-port-network/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Two-Port Network Parameters MicroSim</summary>
Type: microsim

Purpose: Introduce two-port network concept and parameter measurement

Bloom Level: Understand (L2)
Bloom Verb: describe

Learning Objective: Students will describe how two-port parameters characterize the input-output relationships of a circuit without requiring knowledge of internal components.

Instructional Rationale: Black-box visualization with measurement procedures shows how parameters are determined experimentally.

Canvas layout:
- Center (400px): Black box with input and output ports
- Left (100px): Input port (V1, I1)
- Right (100px): Output port (V2, I2)
- Bottom (80px): Parameter display

Visual elements:
- Rectangular black box labeled "Two-Port Network"
- Input port with V1, I1 labels and arrows
- Output port with V2, I2 labels and arrows
- Parameter matrix display
- Measurement setup showing how each parameter is found

Interactive controls:
- Button: "Measure Z11" (open output, apply V1, measure I1)
- Button: "Measure Z22" (open input, apply V2, measure I2)
- Button: "Measure Z21" (open output, measure V2 per I1)
- Button: "Show internal circuit" (reveals what's inside)
- Display: Z-parameter matrix

Default parameters:
- Simple T-network inside (two series R, one shunt R)
- Z-parameters calculated from component values

Behavior:
- Each measurement button animates the procedure
- Shows what ports are open/short during measurement
- Calculated parameters displayed in matrix form
- Internal circuit reveal shows specific component arrangement

Implementation: p5.js with animated measurement procedures
</details>

## Introduction to Reactive Components

Before we leave this chapter, let's preview two components that will become central in AC analysis: capacitors and inductors. Unlike resistors, these components store energy rather than dissipate it.

### The Capacitor: Storing Charge

A **capacitor** stores energy in an electric field between two conductive plates separated by an insulating material called a **dielectric**.

#### Capacitance

$C = \frac{Q}{V} = \varepsilon \frac{A}{d}$

where:

- $C$ is capacitance in farads (F)
- $Q$ is charge in coulombs (C)
- $V$ is voltage across the capacitor in volts (V)
- $\varepsilon$ is the permittivity of the dielectric material
- $A$ is the plate area
- $d$ is the plate separation

The **dielectric material** between the plates increases capacitance and prevents direct conduction. Common dielectrics include ceramic, polyester film, and electrolytic paste.

Key capacitor behaviors:

- **Opposes changes in voltage** (voltage can't change instantaneously)
- **Current flows when voltage changes**: $I = C \frac{dV}{dt}$
- **Stores energy**: $E = \frac{1}{2}CV^2$
- **In DC steady state**: acts as an open circuit (no current through it)

#### Diagram: Capacitor Construction and Symbol

<iframe src="../../sims/capacitor-basics/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Capacitor Basics MicroSim</summary>
Type: microsim

Purpose: Introduce capacitor construction, symbol, and basic behavior

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how a capacitor stores energy in an electric field and describe the relationship between charge, voltage, and capacitance.

Canvas layout:
- Left (300px): Physical construction cross-section
- Right (300px): Schematic symbol and I-V relationship

Visual elements:
- Two parallel plates with dielectric between
- Electric field lines between plates
- Charges accumulating on plates as voltage applied
- Schematic symbol (two parallel lines)
- Graph showing Q vs V (linear for ideal capacitor)

Interactive controls:
- Slider: Applied voltage (0 to 10V)
- Slider: Plate area (visualization scales)
- Slider: Plate separation (affects capacitance)
- Display: Capacitance value
- Display: Stored charge
- Display: Stored energy

Default parameters:
- Parallel plate visualization
- C = 10µF
- V = 5V initially

Behavior:
- Charge visualization increases with voltage
- Field lines become denser with higher charge
- Capacitance updates with geometry changes
- Energy calculation: E = ½CV²

Implementation: p5.js with animated charge visualization
</details>

### The Inductor: Storing Current

An **inductor** stores energy in a magnetic field created by current flowing through a coil of wire.

#### Inductance

$L = \frac{\Phi}{I} = \frac{N^2 \mu A}{l}$

where:

- $L$ is inductance in henrys (H)
- $\Phi$ is magnetic flux in webers (Wb)
- $I$ is current through the inductor in amperes (A)
- $N$ is the number of turns
- $\mu$ is the permeability of the core material
- $A$ is the cross-sectional area
- $l$ is the length of the coil

The **magnetic field** forms inside and around the coil, storing energy proportional to the square of the current.

Key inductor behaviors:

- **Opposes changes in current** (current can't change instantaneously)
- **Voltage appears when current changes**: $V = L \frac{dI}{dt}$
- **Stores energy**: $E = \frac{1}{2}LI^2$
- **In DC steady state**: acts as a short circuit (just wire resistance)

#### Diagram: Inductor Construction and Symbol

<iframe src="../../sims/inductor-basics/main.html" width="100%" height="400px" scrolling="no"></iframe>

<details markdown="1">
<summary>Inductor Basics MicroSim</summary>
Type: microsim

Purpose: Introduce inductor construction, symbol, and basic behavior

Bloom Level: Understand (L2)
Bloom Verb: explain

Learning Objective: Students will explain how an inductor stores energy in a magnetic field and describe the relationship between flux, current, and inductance.

Canvas layout:
- Left (300px): Physical coil with magnetic field visualization
- Right (300px): Schematic symbol and Φ-I relationship

Visual elements:
- Wire coil around core
- Magnetic field lines through and around coil
- Current flowing through wire (animated)
- Schematic symbol (humps representing coil)
- Graph showing Φ vs I (linear for ideal inductor)

Interactive controls:
- Slider: Current through inductor (0 to 1A)
- Slider: Number of turns (visualization changes)
- Slider: Core material (air vs iron, affects L)
- Display: Inductance value
- Display: Magnetic flux
- Display: Stored energy

Default parameters:
- Air-core inductor visualization
- L = 10mH
- I = 0.5A initially

Behavior:
- Magnetic field lines appear and strengthen with current
- More turns = more flux lines
- Iron core significantly increases field strength
- Energy calculation: E = ½LI²

Implementation: p5.js with animated magnetic field visualization
</details>

### Capacitors vs. Inductors: A Comparison

These components are duals of each other in many ways:

| Property | Capacitor | Inductor |
|----------|-----------|----------|
| Stores energy in | Electric field | Magnetic field |
| Opposes changes in | Voltage | Current |
| V-I relationship | $I = C \frac{dV}{dt}$ | $V = L \frac{dI}{dt}$ |
| Energy stored | $\frac{1}{2}CV^2$ | $\frac{1}{2}LI^2$ |
| DC steady state | Open circuit | Short circuit |
| Units | Farad (F) | Henry (H) |
| Typical values | pF to mF | µH to H |

We'll explore these components deeply in coming chapters on transient analysis and AC circuits. For now, recognize that they introduce time-dependent behavior that pure resistor circuits don't have.

## Practical Applications

Let's see how these concepts combine in real engineering scenarios.

### Application 1: Audio Amplifier Output Matching

Your audio amplifier has an output stage with $R_{out} = 8Ω$, and you're connecting an 8Ω speaker. This is maximum power transfer configuration—the speaker extracts maximum power from the amplifier.

With $V_{Th} = 10V_{peak}$ and $R_{Th} = 8Ω$:

$P_{max} = \frac{V_{Th}^2}{4R_{Th}} = \frac{100}{32} = 3.125W$

At 50% efficiency, the amplifier also dissipates 3.125W internally.

### Application 2: Sensor Signal Conditioning

A temperature sensor has $R_{out} = 10kΩ$ and produces a small voltage signal. You need to connect it to an ADC with $R_{in} = 1MΩ$. What's the loading?

Ratio: $R_{in}/R_{out} = 100:1$

Signal transfer: $\frac{R_{in}}{R_{in} + R_{out}} = \frac{1M}{1M + 10k} = 99\%$

Excellent! Only 1% signal loss. If the ADC had $R_{in} = 10kΩ$ (same as sensor output), transfer would be only 50%—you'd lose half your signal.

### Application 3: Battery Characterization

A 9V battery isn't really a perfect 9V source. It has internal resistance. To characterize it:

1. Measure open-circuit voltage: $V_{oc} = 9.2V$
2. Connect 100Ω load, measure: $V_{load} = 8.7V$, so $I = 87mA$
3. Calculate: $R_{int} = \frac{V_{oc} - V_{load}}{I} = \frac{0.5V}{87mA} ≈ 5.7Ω$

Now you have the Thevenin equivalent: $V_{Th} = 9.2V$, $R_{Th} = 5.7Ω$. This predicts performance for any load.

## Summary and Key Takeaways

You've just acquired some serious analytical superpowers. Let's recap:

**Systematic Analysis Methods:**

- **Nodal analysis**: Write KCL at each node, solve for node voltages
- **Mesh analysis**: Write KVL around each mesh, solve for mesh currents
- Choose the method that gives fewer equations

**The Great Simplifiers:**

- **Thevenin's theorem**: Any linear circuit → voltage source + series resistor
- **Norton's theorem**: Any linear circuit → current source + parallel resistor
- **Source transformation**: Convert between voltage and current source representations

**Key Relationships:**

| Formula | Meaning |
|---------|---------|
| $V_{Th} = V_{open-circuit}$ | Thevenin voltage |
| $R_{Th} = R_{with-sources-zeroed}$ | Thevenin resistance |
| $I_N = V_{Th}/R_{Th}$ | Norton current |
| $R_{Load} = R_{Th}$ | Maximum power transfer condition |
| $P_{max} = V_{Th}^2/4R_{Th}$ | Maximum power to load |

**Practical Wisdom:**

- Loading effect: $R_{in} > 10 \times R_{out}$ for minimal signal loss
- Maximum power transfer is for signals, not power supplies
- Capacitors oppose voltage changes; inductors oppose current changes
- Two-port parameters characterize black-box circuits

**What's Coming Next:**

In the next chapter, we'll introduce capacitors and inductors as time-domain circuit elements and analyze how circuits respond to sudden changes—the transient response. You'll see why these "reactive" components make circuits so much more interesting (and occasionally frustrating).

Until then, keep simplifying. Thevenin would be proud.

??? question "Self-Check: Can You Answer These?"
    1. A circuit has nodes A, B, and ground. Node A connects to ground through 2kΩ and to node B through 4kΩ. Node B connects to ground through 2kΩ and to a 10V source through a wire. Set up the nodal equations.

    2. Find the Thevenin equivalent looking into terminals a-b for: 12V source in series with 3kΩ, connected to a parallel combination of 6kΩ and terminals a-b.

    3. A Thevenin equivalent has $V_{Th} = 15V$ and $R_{Th} = 5kΩ$. What's the Norton equivalent? What load resistance maximizes power transfer? What's that maximum power?

    4. Your sensor has $R_{out} = 50kΩ$. Your measurement circuit has $R_{in} = 100kΩ$. What percentage of the sensor signal actually reaches the measurement circuit? Is this acceptable?
