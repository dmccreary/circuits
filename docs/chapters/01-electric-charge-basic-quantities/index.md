---
title: Electric Charge and Basic Circuit Quantities
description: Introduction to fundamental electrical quantities including charge, voltage, current, power, and resistance
generated_by: claude skill chapter-content-generator
date: 2026-01-30
version: 0.03
---

# Electric Charge and Basic Circuit Quantities

## Summary

This chapter introduces the fundamental electrical quantities that form the foundation of all circuit analysis. Students will learn about electric charge, voltage, current, power, and resistance - the essential building blocks for understanding how electrical circuits work. The chapter also covers basic circuit terminology including nodes, branches, and the concept of electrical ground. By the end of this chapter, students will be able to identify and define the core quantities measured in electrical systems and understand the SI units used throughout the course.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Electric Charge
2. Voltage
3. Current
4. Electrical Energy
5. Power
6. Resistance
7. Conductance
8. Electrical Ground
9. Circuit Schematic Symbols
10. Node
11. Branch
12. Open Circuit
13. Short Circuit
14. Power Dissipation
15. SI Units for Circuits

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md). Students should have completed introductory calculus and basic algebra including complex number operations.

## Welcome to Your New Superpower

Congratulations! You're about to acquire a superpower that most people will never have. No, you won't be able to fly or read minds (sorry), but you *will* be able to look at any electronic device and understand *how it actually works*. That smartphone in your pocket? You'll know what's happening inside. That amplifier pushing sound through your speakers? You'll understand why it does what it does.

Think about it: electricity powers almost everything in modern life, yet most people treat it like magic. "I flip the switch, light comes on. Cool." But you? You're going to understand *why* the light comes on, and more importantly, how to make your own things come on (that didn't come out right, but you know what I mean).

This chapter lays the foundation for everything that follows. We'll start with the tiniest players in the electrical universe—charged particles—and work our way up to the quantities you'll measure, calculate, and eventually master. Let's get started.

## Electric Charge: Where It All Begins

Everything in the electrical world starts with **electric charge**. Charge is a fundamental property of matter, just like mass, but instead of telling you how much "stuff" something has, charge tells you how that stuff will interact electromagnetically.

Here's the key insight: there are exactly two types of charge, which we creatively call *positive* and *negative*. (Benjamin Franklin made this naming choice in the 1750s, and we've been stuck with it ever since. Thanks, Ben.) Opposite charges attract, like charges repel. Simple as that.

The fundamental unit of charge is the **coulomb** (C), named after Charles-Augustin de Coulomb, who spent a lot of time measuring forces between charged objects so you wouldn't have to. One coulomb is actually a *huge* amount of charge—roughly 6.24 × 10¹⁸ electrons worth. In practical circuits, we usually deal with much smaller quantities like microcoulombs (μC) or nanocoulombs (nC).

| Prefix | Symbol | Multiplier | Example |
|--------|--------|------------|---------|
| mega | M | 10⁶ | 1 MC = 1,000,000 C |
| kilo | k | 10³ | 1 kC = 1,000 C |
| milli | m | 10⁻³ | 1 mC = 0.001 C |
| micro | μ | 10⁻⁶ | 1 μC = 0.000001 C |
| nano | n | 10⁻⁹ | 1 nC = 0.000000001 C |
| pico | p | 10⁻¹² | 1 pC = 0.000000000001 C |

!!! tip "The Electron's Charge"
    A single electron carries a charge of approximately $-1.602 \times 10^{-19}$ coulombs. Yes, that's negative—electrons are the negative ones. Protons carry the same magnitude but positive. This tiny number is sometimes called the *elementary charge* and is one of the fundamental constants of nature.

## Current: Charge in Motion

Here's where things get interesting. Charge sitting still is about as useful as a car with no gas—it has potential, but it's not doing anything. When charges *move*, that's when the magic happens. This flow of charge is called **electric current**.

Current is defined as the rate at which charge flows past a point:

#### Electric Current

$I = \frac{dQ}{dt}$

where:

- $I$ is the current in amperes (A)
- $Q$ is the charge in coulombs (C)
- $t$ is time in seconds (s)

For those of you who remember your calculus (and I know you do, because it was a prerequisite), this is just saying that current is the derivative of charge with respect to time. If charge is flowing at a steady rate, the equation simplifies to $I = Q/t$.

The unit of current is the **ampere** (A), named after André-Marie Ampère. One ampere equals one coulomb per second. That's a lot of electrons moving past—about 6.24 × 10¹⁸ of them every second!

Here's a fun fact that trips up a lot of students: in most circuits, the actual electrons move incredibly slowly—often just millimeters per second. This is called *drift velocity*. So why does your light turn on instantly when you flip the switch? Because you're not waiting for specific electrons to arrive; you're waiting for the *electromagnetic field* to propagate, which happens at nearly the speed of light. It's like a pipe full of water: when you turn on the faucet, water comes out the other end immediately, even though the specific water molecules at the faucet won't arrive at the spout for a while.

#### Diagram: Water Flow Analogy for Electric Current

<iframe src="../../sims/water-flow-analogy/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>Water Flow Analogy for Electric Current</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Compare, explain

Learning Objective: Students will be able to explain how electric current flow is analogous to water flow in pipes, comparing pressure to voltage and flow rate to current.

Visual Elements:
- Split screen showing water pipe system (top) and electrical circuit (bottom)
- Water pipe with visible water particles/droplets flowing
- Electrical wire with animated electrons (small dots) drifting
- Pressure gauge on water system corresponding to voltmeter on circuit
- Flow meter on water system corresponding to ammeter on circuit
- Pump on water system corresponding to battery in circuit

Interactive Controls:
- Slider: "Pump Pressure / Battery Voltage" (1-12 units)
- Slider: "Pipe Diameter / Wire Gauge" (narrow to wide)
- Toggle: Show/Hide particle animation
- Button: Reset to defaults

Default Parameters:
- Pressure/Voltage: 6 units
- Pipe/Wire: Medium
- Animation: On

Behavior:
- Increasing pressure/voltage increases flow rate in both systems proportionally
- Wider pipe/wire allows more flow for same pressure
- Particles move slowly but field effect is instant
- Display numerical values for flow rate and current
- Show that turning on "pump" instantly affects flow at outlet

Canvas Layout:
- Width: responsive to container
- Height: 400px
- Top half: water system
- Bottom half: electrical equivalent
- Right panel: controls and readouts

Instructional Rationale: The water analogy is a classic tool for understanding current flow because students have intuitive experience with water pressure and flow. This side-by-side comparison reinforces the abstract electrical concepts with concrete physical analogs.

Implementation: p5.js with particle system for water/electron animation
Link to Microsim: [Water Flow Analogy](../../sims/water-flow-analogy/index.md)
</details>

### Conventional Current vs. Electron Flow

Here's a historical quirk that causes endless confusion: **conventional current** flows from positive to negative, but electrons actually flow from negative to positive. Why? Because when scientists first defined current direction, they didn't know electrons existed. They guessed that positive charges were moving, and they guessed wrong. By the time we figured out the truth, the convention was too deeply embedded to change.

For circuit analysis, we use conventional current (positive to negative), and everything works out mathematically. Just remember:

- **Conventional current**: Flows from + to − (what we use in analysis)
- **Electron flow**: Flows from − to + (what actually happens in wires)

Don't let this keep you up at night. Pick one convention and stick with it. We'll use conventional current throughout this course.

## Voltage: The Electrical "Push"

If current is the flow of charge, **voltage** is what makes charges want to flow in the first place. Voltage is the *electrical potential difference* between two points—it's the "pressure" that pushes charges through a circuit.

More precisely, voltage is the energy required to move a unit of charge between two points:

#### Voltage Definition

$V = \frac{W}{Q}$

where:

- $V$ is the voltage in volts (V)
- $W$ is the work (energy) in joules (J)
- $Q$ is the charge in coulombs (C)

One volt means one joule of energy per coulomb of charge. The unit is named after Alessandro Volta, who invented the first true battery (the "voltaic pile") in 1800.

Here's the crucial point: **voltage is always measured between two points**. You can't talk about "the voltage at point A" without implicitly referencing some other point. This is like altitude—when you say a mountain is 14,000 feet tall, you mean 14,000 feet above sea level, not 14,000 feet above nothing.

| Common Voltage Sources | Typical Voltage |
|------------------------|-----------------|
| AA battery | 1.5 V |
| USB port | 5 V |
| Car battery | 12 V |
| US wall outlet (RMS) | 120 V |
| European wall outlet (RMS) | 230 V |
| High-voltage transmission line | 115,000 - 765,000 V |

!!! warning "Safety First"
    Voltages above about 50V can be dangerous to humans under certain conditions. While we'll mostly work with low-voltage circuits in the lab, always treat electricity with respect. The wall outlet in your room can absolutely kill you. Don't be a statistic.

## Electrical Energy and Power: Getting Work Done

Now we can talk about what electricity actually *does* for us: **work**. When charges move through a circuit, they can transfer energy—lighting bulbs, spinning motors, heating elements, or processing information.

**Electrical energy** is the capacity to do work, measured in joules (J). When a charge $Q$ moves through a voltage $V$, the energy transferred is:

#### Electrical Energy

$W = Q \cdot V$

where:

- $W$ is energy in joules (J)
- $Q$ is charge in coulombs (C)
- $V$ is voltage in volts (V)

But usually we care more about the *rate* at which energy is transferred. This is **power**, measured in watts (W):

#### Electrical Power

$P = \frac{dW}{dt} = V \cdot I$

where:

- $P$ is power in watts (W)
- $V$ is voltage in volts (V)
- $I$ is current in amperes (A)

One watt equals one joule per second. This elegant equation, $P = VI$, will become one of your best friends in circuit analysis.

Since $V = IR$ (as we'll see shortly), we can also express power as:

#### Power Equations

$P = VI = I^2R = \frac{V^2}{R}$

These three forms are all equivalent; use whichever is most convenient for your problem.

#### Diagram: Power Triangle Visualization

<iframe src="../../sims/power-triangle/main.html" width="100%" height="400px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Power Triangle Visualization</summary>
Type: infographic

Bloom Level: Apply (L3)
Bloom Verb: Calculate, use

Learning Objective: Students will be able to use the power triangle to quickly identify which formula to use for calculating power, voltage, current, or resistance.

Visual Elements:
- Large triangle divided into sections
- Top section: P (Power)
- Bottom left section: V (Voltage)
- Bottom right section: I (Current)
- Below triangle: R (Resistance) relationships
- Highlighting system to show which formula applies

Interactive Elements:
- Click on any variable to "cover" it and reveal the formula to solve for it
- Hover over formulas to see them enlarged
- Input fields to enter known values
- Calculate button to solve for unknown
- Display of result with units

Layout:
- Center: Interactive triangle centered at 30% of canvasWidth
- Right side: Calculator panel using right 30% of the canvasWidth
- Bottom: Formula reference showing all three forms of power equation

Color Scheme:
- Power (P): Gold/Yellow
- Voltage (V): Blue
- Current (I): Green
- Resistance (R): Orange

Default State:
- No variable covered
- All formulas visible
- Empty input fields

Instructional Rationale: The "cover the variable you want" trick is a classic mnemonic for Ohm's law and power relationships. This interactive version lets students practice the technique while also performing calculations.

Implementation: p5.js 
</details>

### A Note on Energy Units

Your electricity bill doesn't list energy in joules—it uses **kilowatt-hours (kWh)**. One kilowatt-hour is the energy consumed when using 1000 watts for one hour:

$1 \text{ kWh} = 1000 \text{ W} \times 3600 \text{ s} = 3.6 \times 10^6 \text{ J} = 3.6 \text{ MJ}$

So when you leave a 100W light bulb on for 10 hours, you use 1 kWh of energy. At typical US electricity prices (around $0.12-0.15/kWh), that costs you about 12-15 cents. Not much for one bulb, but it adds up across all the devices in your home!

## Resistance: The Opposition

Not all materials let charges flow through them equally. **Resistance** is the property that opposes the flow of current. It's like friction for electricity.

The relationship between voltage, current, and resistance is captured in the most famous equation in electronics:

#### Ohm's Law

$V = IR$

where:

- $V$ is voltage in volts (V)
- $I$ is current in amperes (A)
- $R$ is resistance in ohms (Ω)

This is **Ohm's Law**, named after Georg Ohm, who discovered this relationship in 1827. It tells us that for a given resistance, increasing voltage increases current proportionally. Or equivalently, for a given voltage, increasing resistance decreases current.

The unit of resistance is the **ohm** (Ω), represented by the Greek letter omega. One ohm is the resistance that allows one ampere to flow when one volt is applied.

| Material | Typical Resistivity | Classification |
|----------|---------------------|----------------|
| Silver | 1.59 × 10⁻⁸ Ω·m | Conductor |
| Copper | 1.68 × 10⁻⁸ Ω·m | Conductor |
| Aluminum | 2.65 × 10⁻⁸ Ω·m | Conductor |
| Silicon (pure) | ~2300 Ω·m | Semiconductor |
| Glass | 10¹⁰ - 10¹⁴ Ω·m | Insulator |
| Rubber | ~10¹³ Ω·m | Insulator |

!!! note "Not Everything Obeys Ohm's Law"
    Ohm's Law applies to *ohmic* (linear) materials where resistance is constant regardless of voltage or current. Many real devices—like diodes, transistors, and even light bulbs—are *non-ohmic*, meaning their resistance changes with operating conditions. We'll explore some of these in later chapters.

## Conductance: The Flip Side

**Conductance** is simply the reciprocal of resistance—it measures how easily current flows rather than how much it's opposed:

#### Conductance

$G = \frac{1}{R} = \frac{I}{V}$

where:

- $G$ is conductance in siemens (S)
- $R$ is resistance in ohms (Ω)

The unit is the **siemens** (S), named after Werner von Siemens. (You might also see the older unit "mho," which is "ohm" spelled backward. Electrical engineers have a... particular sense of humor.)

Why bother with conductance? In some analyses, especially with parallel circuits, it's mathematically more convenient. If you have conductances in parallel, they simply add up—much easier than dealing with reciprocals of resistances.

## Electrical Ground: The Reference Point

Remember how we said voltage is always measured between two points? Well, we need to pick a reference point for our measurements, and that reference is called **electrical ground**.

Ground is typically defined as 0V, and all other voltages in a circuit are measured relative to it. In different contexts, ground can be:

- **Earth ground**: Literally connected to the Earth (like the third prong on a US outlet)
- **Chassis ground**: Connected to a device's metal enclosure
- **Signal ground**: A common reference point in a circuit (may not be connected to Earth)

In circuit diagrams, ground is shown with one of several symbols:

- Chassis/Earth ground: Three horizontal lines of decreasing width
- Signal ground: A single line (sometimes with a small triangle)

The key insight is that ground doesn't necessarily mean "connected to the physical earth." It's just a convenient reference point we all agree to call 0V.

#### Diagram: Ground Symbol Reference

<iframe src="../../sims/ground-symbols/main.html" width="100%" height="350px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Ground Symbol Reference Guide</summary>
Type: infographic

Bloom Level: Remember (L1)
Bloom Verb: Identify, recognize

Learning Objective: Students will be able to identify and distinguish between different ground symbols used in circuit schematics.

Visual Elements:
- Grid of 4-6 common ground symbols
- Each symbol clearly drawn with proper proportions
- Label below each symbol with name and typical use
- Brief description of when each type is used

Ground Symbols to Include:
1. Earth Ground (three decreasing horizontal lines)
   - Use: Power systems, safety grounds, building wiring
2. Chassis Ground (three lines with chassis rectangle)
   - Use: Equipment enclosures, shielding
3. Signal Ground (single triangle pointing down)
   - Use: Common reference in circuits, audio systems
4. Digital Ground (may have "DGND" label)
   - Use: Digital circuit reference
5. Analog Ground (may have "AGND" label)
   - Use: Sensitive analog circuits

Interactive Elements:
- Hover over each symbol for expanded description
- Click to see example circuit using that ground type
- Quiz mode: Symbol appears, student identifies type

Layout:
- 2x3 grid of ground symbols
- Clean white background
- Consistent sizing for all symbols

Color Scheme:
- Symbols in black
- Labels in dark gray
- Hover highlights in blue

Instructional Rationale: Recognizing ground symbols is essential for reading schematics. This reference provides quick visual recognition practice.

Implementation: p5.js with hover detection
</details>

## Circuit Schematic Symbols: The Language of Circuits

Just as musicians read sheet music, electrical engineers read **circuit schematics**. These diagrams use standardized symbols to represent components and their connections. Learning these symbols is like learning an alphabet—once you know them, you can read any circuit diagram.

Here are the essential symbols you'll encounter in this course:

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

<iframe src="../../sims/circuit-symbol-flashcards/main.html" width="100%" height="482px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Circuit Symbol Flashcard Trainer</summary>
Type: microsim

Bloom Level: Remember (L1)
Bloom Verb: Recall, identify

Learning Objective: Students will be able to identify common circuit schematic symbols and recall their names and functions.

Visual Elements:
- Large flashcard area showing symbol
- Card flip animation revealing answer
- Progress indicator showing cards completed
- Score tracker for quiz mode
- Symbol drawn in clean black lines on white background

Interactive Controls:
- Button: "Flip Card" (reveals answer)
- Button: "Next Card" (shows new symbol)
- Button: "Previous Card" (review previous)
- Toggle: "Quiz Mode" (hide answers until flip)
- Dropdown: Select category (All, Sources, Passive, Connections)
- Button: "Shuffle Deck"

Symbol Set (minimum 15 symbols):
1. Resistor (US style)
2. Resistor (EU style)
3. Capacitor (non-polarized)
4. Capacitor (polarized/electrolytic)
5. Inductor
6. DC Voltage Source
7. AC Voltage Source
8. Current Source
9. Dependent Voltage Source (diamond)
10. Dependent Current Source (diamond)
11. Ground (earth)
12. Ground (signal/chassis)
13. Wire crossing (no connection)
14. Wire junction (connection/node)
15. Switch (SPST)
16. Operational Amplifier

Default Parameters:
- Quiz mode: Off
- Category: All
- Start with card 1

Behavior:
- Cards cycle through all symbols in category
- In quiz mode, answer hidden until flip
- Tracks correct/incorrect in quiz mode
- Shuffle randomizes order
- Shows name, symbol, and one-sentence description

Canvas Layout:
- Width: responsive
- Height: 400px
- Center: Large flashcard (300x200px)
- Bottom: Navigation controls
- Top right: Progress/Score

Instructional Rationale: Flashcards are proven effective for memorizing symbol recognition, which is a pure recall task. Interactive digital flashcards allow self-paced practice with immediate feedback.

Implementation: p5.js with card flip animation and celebration animations upon completions
Use the src/circuits-js-lib/p5-circuit-lib.js to draw the symbols.
If you need to create a new symbol, add it to the src/circuits-js-lib/p5-circuit-lib.js
</details>

## Nodes and Branches: Circuit Anatomy

To analyze circuits, we need vocabulary for describing their structure. Two fundamental concepts are **nodes** and **branches**.

A **node** is any point where two or more circuit elements connect. Think of it as a junction or intersection in the circuit. All points that are connected by ideal wire (zero resistance) form a single node, even if they look like multiple points in the schematic.

A **branch** is a path between two nodes that contains a single circuit element (like a resistor, capacitor, or source). Each branch carries its own current.

Here's a simple way to think about it:

- **Nodes** are the dots where things meet
- **Branches** are the paths between dots

Why does this matter? Because these concepts are the foundation of systematic circuit analysis. Kirchhoff's laws (coming in Chapter 3) are expressed in terms of nodes and branches, and techniques like nodal analysis are built entirely around them.

Consider a simple circuit with a battery and two resistors:

- If the resistors are in series, you have 2 nodes and 2 branches
- If the resistors are in parallel, you have 2 nodes and 3 branches (one for each resistor plus the battery)

#### Diagram: Node and Branch Identification Trainer

<iframe src="../../sims/node-branch-trainer/main.html" width="100%" height="500px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Node and Branch Identification Trainer</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Identify, classify

Learning Objective: Students will be able to identify and count nodes and branches in circuit schematics, distinguishing between apparent visual junctions and true electrical nodes.

Visual Elements:
- Circuit schematic display area (left side)
- Multiple example circuits of increasing complexity
- Highlighted nodes (when identified correctly)
- Highlighted branches (different color from nodes)
- Counters showing node count and branch count
- Feedback messages for correct/incorrect identification

Interactive Controls:
- Click on schematic to mark nodes (places a dot)
- Drag to trace branches (draws highlight line)
- Button: "Check Answer"
- Button: "Show Solution"
- Button: "Next Circuit"
- Button: "Previous Circuit"
- Dropdown: Difficulty (Easy/Medium/Hard)
- Button: "Clear Markings"

Circuit Examples (progressive difficulty):
Easy:
1. Single resistor with voltage source (2 nodes, 2 branches)
2. Two resistors in series with source (2 nodes, 2 branches - tricky!)
3. Two resistors in parallel with source (2 nodes, 3 branches)

Medium:
4. Three resistors mixed (3 nodes, 4 branches)
5. Voltage source with 3 parallel resistors (2 nodes, 4 branches)
6. Ladder network (4 nodes, 5 branches)

Hard:
7. Bridge circuit (4 nodes, 6 branches)
8. Complex network (5+ nodes)

Default Parameters:
- Difficulty: Easy
- Start with circuit 1
- No markings

Behavior:
- Clicking places/removes node marker
- Dragging creates branch trace
- Check Answer compares to correct count
- Show Solution reveals all nodes (gold) and branches (blue)
- Score tracking across circuits
- Hints available after two wrong attempts

Canvas Layout:
- Width: responsive
- Height: 450px
- Left 60%: Circuit display
- Right 40%: Controls, counters, feedback

Instructional Rationale: Students often struggle with the concept that wires connecting components form a single node. This interactive trainer provides practice with immediate feedback, reinforcing the abstract concept through hands-on identification.

Implementation: p5.js with clickable regions and path drawing
</details>

## Open Circuits and Short Circuits: The Extremes

Two special circuit conditions that every engineer must understand are **open circuits** and **short circuits**. These represent the extreme cases of resistance.

An **open circuit** has infinite resistance—no current can flow. This happens when there's a break in the circuit path, like a switch in the off position or a wire that's been cut. In an open circuit:

- Current = 0 (no path for current to flow)
- Voltage can be anything (it's the "open-circuit voltage")
- Power = 0 (no current means no power transfer)

A **short circuit** has zero resistance—current can flow with no voltage drop. This happens when two points are connected by a path of zero resistance (like a wire). In a short circuit:

- Voltage = 0 across the short (V = IR = I × 0 = 0)
- Current can be very large (limited only by other circuit elements)
- This is often dangerous because excessive current causes overheating

!!! danger "Short Circuits Are Dangerous"
    Never create an unintentional short circuit, especially across a power source. A short across a battery can cause it to rapidly overheat, potentially causing fire or explosion. A short across wall power can cause fires and electrical shocks. Circuit breakers and fuses exist specifically to protect against short-circuit conditions.

The humor in "short circuit" is that there's nothing humorous about it—it can literally set things on fire. Always double-check your circuits before applying power!

| Condition | Resistance | Current | Voltage Across |
|-----------|------------|---------|----------------|
| Open Circuit | ∞ (infinite) | 0 | Any value |
| Short Circuit | 0 | Limited by rest of circuit | 0 |
| Normal Operation | Finite, non-zero | Finite, non-zero | Finite, non-zero |

## Power Dissipation: Where the Energy Goes

When current flows through a resistance, electrical energy is converted to heat. This is called **power dissipation**, and it's governed by our power equations:

#### Power Dissipation in a Resistor

$P = I^2R = \frac{V^2}{R}$

where:

- $P$ is power dissipated in watts (W)
- $I$ is current through the resistor in amperes (A)
- $V$ is voltage across the resistor in volts (V)
- $R$ is resistance in ohms (Ω)

This might seem like a bad thing (wasted energy!), but it's actually essential for many applications:

- **Heating elements** in toasters, space heaters, and hair dryers rely on resistive heating
- **Light bulbs** (incandescent) produce light by heating a filament until it glows
- **Current-sensing resistors** convert current to a measurable voltage drop

However, power dissipation in components that aren't *supposed* to heat up (like resistors in signal circuits) is indeed waste. Engineers spend considerable effort minimizing unwanted power dissipation to improve efficiency and prevent overheating.

Every resistor has a **power rating**—the maximum power it can safely dissipate without damage. Common ratings are 1/8W, 1/4W, 1/2W, 1W, and 2W for small resistors. Exceeding this rating will cause the resistor to overheat, potentially changing its resistance value, failing open, or even catching fire.

#### Diagram: Power Dissipation Calculator

<iframe src="../../sims/power-dissipation-calc/main.html" width="100%" height="400px" scrolling="no" style="overflow: hidden;"></iframe>

<details markdown="1">
<summary>Power Dissipation Calculator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Calculate, solve

Learning Objective: Students will be able to calculate power dissipation in resistors using any combination of known values (V, I, R) and determine if a resistor's power rating is adequate.

Visual Elements:
- Resistor symbol in center with current arrow and voltage labels
- Three input/output displays for V, I, R
- Large power readout showing calculated P
- Visual thermometer or heat indicator showing "temperature"
- Power rating selector with color-coded safety indicator
- Warning indicator when power exceeds rating

Interactive Controls:
- Input field: Voltage (V) - with unit selector (V, mV)
- Input field: Current (I) - with unit selector (A, mA, μA)
- Input field: Resistance (R) - with unit selector (Ω, kΩ, MΩ)
- Dropdown: Power rating (1/8W, 1/4W, 1/2W, 1W, 2W, 5W)
- Radio buttons: Select which two values to input (V&I, V&R, or I&R)
- Button: Calculate

Behavior:
- User selects which two values to input
- Third value and power are calculated automatically
- Thermometer rises proportionally to power
- If calculated power > rating, show red warning and "hot" animation
- If power < 50% of rating, show green "safe" indicator
- If power 50-100% of rating, show yellow "caution"
- Display all three forms of power equation with current values substituted

Default Parameters:
- V = 5V, R = 1kΩ (calculate I and P)
- Power rating: 1/4W

Canvas Layout:
- Width: responsive
- Height: 350px
- Center: Circuit visualization with resistor
- Left: Input controls
- Right: Results and safety indicator

Instructional Rationale: Power calculations are a core skill, and connecting them to real-world consequences (overheating) motivates careful attention. The safety indicator bridges theory to practical engineering concerns.

Implementation: p5.js with input validation and animated heat indicator
</details>

## SI Units for Circuits: Speaking the Language

Throughout this course (and your entire career in electrical engineering), you'll use the **International System of Units (SI)**. Consistency in units prevents errors and allows engineers worldwide to communicate precisely.

Here's your essential reference table for electrical quantities:

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

The SI prefix system lets us express very large or very small quantities conveniently. You'll frequently encounter:

- **Milliamps (mA)**: 10⁻³ A — typical current in small circuits
- **Microfarads (μF)**: 10⁻⁶ F — common capacitor values
- **Kilohms (kΩ)**: 10³ Ω — common resistor values
- **Megohms (MΩ)**: 10⁶ Ω — high resistor values

!!! tip "Dimensional Analysis Is Your Friend"
    When you're not sure if your answer is correct, check the units. If you're calculating current and your answer comes out in volts, something went wrong. This simple technique catches more errors than you'd expect.

## Putting It All Together

Let's see how all these concepts connect in a simple example. Consider a circuit with a 9V battery connected to a 1kΩ resistor.

**What we know:**
- V = 9V
- R = 1kΩ = 1000Ω

**Calculate current using Ohm's Law:**

$I = \frac{V}{R} = \frac{9\text{ V}}{1000\text{ Ω}} = 0.009\text{ A} = 9\text{ mA}$

**Calculate power dissipation:**

$P = VI = (9\text{ V})(0.009\text{ A}) = 0.081\text{ W} = 81\text{ mW}$

Or equivalently:

$P = \frac{V^2}{R} = \frac{(9\text{ V})^2}{1000\text{ Ω}} = \frac{81}{1000}\text{ W} = 81\text{ mW}$

A standard 1/4W (250mW) resistor can easily handle this power level. We're well within the safe operating range.

**In terms of energy**, if this circuit runs for one hour:

$W = Pt = (0.081\text{ W})(3600\text{ s}) = 291.6\text{ J}$

Or about 0.081 Wh, which is 0.000081 kWh. At $0.12/kWh, running this circuit for an hour costs about $0.00001—basically free!

## Key Takeaways

Congratulations! You've just acquired the vocabulary of electrical engineering. Let's recap the essential concepts:

1. **Electric Charge (Q)**: The fundamental property that creates electrical phenomena. Measured in coulombs (C).

2. **Current (I)**: The flow of charge. Current = charge per time. Measured in amperes (A).

3. **Voltage (V)**: The "push" that moves charges. Voltage = energy per charge. Measured in volts (V).

4. **Resistance (R)**: Opposition to current flow. Measured in ohms (Ω).

5. **Ohm's Law**: V = IR. The most important equation in circuits.

6. **Power (P)**: Rate of energy transfer. P = VI. Measured in watts (W).

7. **Nodes and Branches**: The structural elements of circuits used in analysis.

8. **Ground**: The reference point for voltage measurements (defined as 0V).

9. **Open Circuit**: Infinite resistance, zero current.

10. **Short Circuit**: Zero resistance, potentially dangerous high current.

These concepts are your foundation. Every circuit you analyze for the rest of your career will use these building blocks. In the next chapter, we'll see how to apply these concepts to real circuit configurations using Ohm's Law, voltage dividers, and current dividers.

Now go forth and see the world differently. That LED on your phone? You know there's current flowing through it, limited by a resistor, powered by a voltage from the battery. That's not magic anymore—that's engineering. That's your superpower.

---

## Chapter Summary

??? note "Quick Review Questions - Click to Reveal Answers"

    **Q1: What is the relationship between conventional current direction and electron flow?**

    Conventional current flows from positive to negative, while electrons actually flow from negative to positive. We use conventional current for circuit analysis.

    **Q2: If a 12V source is connected to a 3kΩ resistor, what current flows?**

    $I = V/R = 12V / 3000Ω = 0.004A = 4mA$

    **Q3: What power is dissipated in the above resistor?**

    $P = VI = (12V)(0.004A) = 0.048W = 48mW$

    **Q4: Why is voltage always measured between two points?**

    Voltage is a *difference* in electrical potential. Just like height needs a reference point (sea level), voltage needs a reference point (ground). A single point doesn't have a voltage—only the difference between two points does.

    **Q5: What's the difference between an open circuit and a short circuit?**

    Open circuit: infinite resistance, zero current, can have voltage across it. Short circuit: zero resistance, zero voltage across it, current limited only by rest of circuit (potentially very high and dangerous).
