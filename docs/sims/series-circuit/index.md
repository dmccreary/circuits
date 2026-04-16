---
title: Series Circuit Analysis
description: Interactive series resistor circuit showing how a single current flows through all elements and how voltage divides proportionally across each resistor.
---

# Series Circuit Analysis

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates a series circuit with up to four resistors connected end-to-end. Adjust each resistor value with a slider and watch the single loop current update instantly. Voltage drops across each element are shown as labeled arrows, and the sum is verified to equal the source voltage — illustrating Kirchhoff's Voltage Law in action.

## Key Concepts

- In a **series circuit**, the same current flows through every element: \(I = \frac{V_s}{R_1 + R_2 + \cdots + R_n}\).
- **Total resistance** is the arithmetic sum: \(R_{total} = R_1 + R_2 + \cdots + R_n\).
- Each resistor's **voltage drop** is proportional to its resistance: \(V_k = I \cdot R_k\).
- KVL confirms: \(\sum V_{drops} = V_{source}\).
- Series circuits are used as **voltage dividers** and in current-limiting applications.

[Chapter 2 — Ohm's Law and Basic Configurations](../../chapters/02-ohms-law-basic-configurations/index.md)
