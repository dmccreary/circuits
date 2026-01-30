---
title: Power Triangle Visualization
description: Interactive power triangle for learning power, voltage, current, and resistance relationships using P=VI and Ohm's Law
quality_score: 85
image: /sims/power-triangle/power-triangle.png
og:image: /sims/power-triangle/power-triangle.png
twitter:image: /sims/power-triangle/power-triangle.png
social:
   cards: false
---
# Power Triangle Visualization

<iframe src="main.html" height="452px" width="100%" scrolling="no"></iframe>

[Run the Power Triangle MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Power Triangle MicroSim with the p5.js editor](https://editor.p5js.org/)

## Embedding in Your Course

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/circuits/sims/power-triangle/main.html" height="452px" width="100%" scrolling="no"></iframe>
```

## Description

The Power Triangle is a classic mnemonic tool for remembering the relationships between power (P), voltage (V), and current (I) in electrical circuits. This interactive MicroSim allows students to:

1. **Explore the Triangle**: Click on P, V, or I in the triangle to "cover" that variable and reveal the formula needed to calculate it
2. **Calculate Power**: Enter any two of the three values (voltage, current, resistance) and the calculator will compute power using the appropriate formula
3. **See All Formulas**: The reference panel shows all three forms of the power equation: P = VI, P = I²R, and P = V²/R

### How It Works

The power triangle works on the principle that if you cover the variable you want to find, the remaining visible variables show you the formula:

- **Cover P**: See V × I (Power = Voltage × Current)
- **Cover V**: See P / I (Voltage = Power / Current)
- **Cover I**: See P / V (Current = Power / Voltage)

### Color Coding

Variables are color-coded for easy identification:

- **Power (P)**: Gold
- **Voltage (V)**: Blue
- **Current (I)**: Green
- **Resistance (R)**: Orange

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Identify which formula to use for calculating power, voltage, or current given known values
2. Apply the power equations P = VI, P = I²R, and P = V²/R to solve circuit problems
3. Explain the relationship between power, voltage, current, and resistance

### Suggested Activities

**Activity 1: Formula Discovery (5 minutes)**

- Have students click on each variable in the triangle
- Ask them to record the formula revealed for each
- Discuss why the triangle works as a memory aid

**Activity 2: Calculation Practice (10 minutes)**

- Provide students with practice problems:
  - A 9V battery powers a circuit with 0.5A current. What is the power?
  - A 60W light bulb operates at 120V. What current does it draw?
  - A heater draws 10A through a 12Ω element. What power does it dissipate?
- Students use the calculator to verify their answers

**Activity 3: Real-World Applications (5 minutes)**

- Examine power ratings on common devices (phone chargers, laptops, appliances)
- Calculate the current draw given the voltage and power rating
- Discuss why power ratings matter for circuit design and safety

### Assessment Questions

1. A resistor has 5V across it and 0.1A through it. Calculate the power dissipated.
2. If a circuit element dissipates 24W with 2A flowing through it, what is the voltage across it?
3. Which formula would you use to find power if you only know resistance and current?

### Common Misconceptions

- **Power is not voltage or current** - Power is the *rate* of energy transfer, calculated from voltage and current together
- **Higher voltage doesn't always mean more power** - A circuit with 100V and 0.001A has less power than one with 5V and 1A
- **The triangle shows relationships, not all possible formulas** - Students should also learn P = I²R and P = V²/R for when current or voltage is unknown

## Technical Details

- **Framework**: p5.js 1.11.10
- **Canvas Size**: Width-responsive, 450px height (370px draw + 80px controls)
- **Interaction**: Click on triangle variables, keyboard input for calculator
- **Accessibility**: Screen reader description included

## References

- [Ohm's Law and Power](../../chapters/01-electric-charge-basic-quantities/index.md) - Course chapter covering these concepts
- [p5.js Reference](https://p5js.org/reference/) - JavaScript library documentation
