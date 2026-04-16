---
title: Chapter 2 — Ohm's Law and Basic Circuit Configurations
description: Master Ohm's Law and learn to analyze series, parallel, and combined circuits
generated_by: claude skill chapter-content-generator
date: 2026-01-30
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 2 — Ohm's Law and Basic Circuit Configurations

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

Welcome to the chapter that unlocks your first real superpower in electrical engineering. If Chapter 1 was about learning the alphabet — voltage, current, charge — then this chapter teaches you to speak in complete sentences. And the most important sentence you'll ever learn? **Ohm's Law**.

Here's a secret that practicing engineers won't always admit: about 80% of circuit analysis boils down to applying Ohm's Law creatively. Master this chapter, and you'll suddenly be able to look at a circuit schematic and *understand* what it's doing. You'll start seeing circuits everywhere: in your phone charger, your headphones, even in the humble LED indicator light on your laptop.

From the humble resistor through series and parallel combinations to voltage dividers and current dividers, this chapter provides the practical toolkit for analyzing any resistive circuit. Understanding how resistance, current, and voltage interact in different configurations is the cornerstone of all circuit design.

**Key Takeaways**

1. Ohm's Law (\(V = IR\)) describes a linear relationship between voltage, current, and resistance — master all three forms and apply them instinctively.
2. Series circuits share the same current; parallel circuits share the same voltage — these two properties drive all analysis of resistive networks.
3. Voltage dividers and current dividers are fundamental circuit building blocks that appear everywhere in electronics, from sensor interfaces to amplifier biasing.

</details>

## Summary

### Key Concepts

- **Ohm's Law**: voltage across a resistor is directly proportional to current through it
- **Series circuits**: same current flows through all elements; voltages add
- **Parallel circuits**: same voltage across all elements; currents add
- **Voltage divider**: two series resistors divide voltage in proportion to resistance values
- **Current divider**: two parallel resistors divide current inversely proportional to resistance
- **Ideal voltage source**: maintains constant terminal voltage regardless of current drawn
- **Ideal current source**: maintains constant current regardless of load voltage

### Important Equations

\[ V = IR \qquad R_{series} = R_1 + R_2 + \cdots \qquad \frac{1}{R_{parallel}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots \]

\[ V_x = V_s \cdot \frac{R_x}{R_1 + R_2} \quad \text{(voltage divider)} \qquad I_x = I_s \cdot \frac{R_{other}}{R_1 + R_2} \quad \text{(current divider)} \]

### What You Should Understand

- Why series resistors add directly but parallel resistors combine as reciprocals
- How a voltage divider behaves under no load vs. under a finite load (loading effect)
- The difference between ideal and real (non-ideal) voltage and current sources
- How to read a resistor color code for resistance value, tolerance, and power rating

### Applications

- Current-limiting resistor selection for LEDs and indicators
- Sensor signal conditioning (thermistor voltage dividers for temperature measurement)
- Battery terminal voltage under load (internal resistance effect)
- Volume control resistor networks in audio circuits

### Quick Review Checklist

- [ ] I can apply Ohm's Law to find V, I, or R given any two values
- [ ] I can calculate equivalent resistance for series and parallel networks
- [ ] I can design a voltage divider for a specified output ratio
- [ ] I can read a four-band resistor color code for resistance and tolerance

## Concepts Covered

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

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

</div>

---

## Prerequisites

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

This chapter builds on concepts from:

- [Chapter 1: Electric Charge and Basic Circuit Quantities](../01-electric-charge-basic-quantities/index.md) — electric charge, voltage, current, power, resistance, Ohm's Law, nodes, branches, and SI units

</div>

</div>
