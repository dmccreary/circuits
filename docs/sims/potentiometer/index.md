---
title: Potentiometer as Voltage Divider
description: Interactive simulation of a three-terminal potentiometer showing how wiper position controls the output voltage as a fraction of the supply, demonstrating the voltage divider principle with a variable resistor.
---

# Potentiometer as Voltage Divider

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim animates a potentiometer (variable resistor) connected as a voltage divider. Drag the wiper position slider and observe how the output voltage changes proportionally. The sim displays the resistance values of the upper and lower sections in real time and plots the output voltage versus wiper position to show the linear relationship.

## Key Concepts

- A **potentiometer** is a three-terminal resistor with a sliding or rotating wiper contact.
- When used as a **voltage divider**, \(V_{out} = V_{in} \times \frac{R_{lower}}{R_{total}}\).
- The output varies **linearly** from 0 V (wiper at bottom) to \(V_{in}\) (wiper at top).
- Potentiometers are used in volume controls, sensor interfaces, and reference voltage generation.
- Loading effect: connecting a low-impedance load to the wiper changes the effective resistance and shifts the output voltage.

[Chapter 2 — Ohm's Law and Basic Configurations](../../chapters/02-ohms-law-basic-configurations/index.md)
