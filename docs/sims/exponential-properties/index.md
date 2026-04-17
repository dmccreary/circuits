---
title: Exponential Properties
description: Interactive MicroSim examining the tangent-line property, constant-ratio property, and derivative relationship of the exponential response
chapter: 6
bloom_level: Analyze (L4)
bloom_verb: examine
---

# Exponential Properties

<iframe src="main.html" width="660" height="525" scrolling="no" frameborder="0"></iframe>

## How to Use

1. **Drag the red-orange point** left and right along the curve to explore any moment in time.
2. **Click anywhere** on the plot to jump the point there.
3. **Toggle Rising / Falling** to switch between a charging (RC) and decaying exponential.
4. **Toggle Ratio Marks** to show or hide the constant-ratio visualization.
5. **Drag the τ slider** to rescale the time constant and watch all properties update.

## Three Key Properties

### 1. Tangent-Line Property (gold)
The tangent to the exponential at **any** point \(t\) always intersects the final value \(V_f\) at exactly \(t + \tau\):

\[
\text{slope at } t = \frac{dV}{dt}\bigg|_t = -\frac{V(t) - V_f}{\tau}
\quad\Rightarrow\quad
\text{tangent hits } V_f \text{ at } t + \tau
\]

Move the draggable point anywhere — the gold circle on \(V_f\) always stays exactly one \(\tau\) ahead.

### 2. Constant-Ratio Property (teal)
In every interval of length \(\tau\), the **gap** \(|V(t) - V_f|\) shrinks by the same factor \(e^{-1} \approx 0.368\):

\[
\frac{V(t+\tau) - V_f}{V(t) - V_f} = e^{-1} \approx 0.3679 \quad \text{(always)}
\]

### 3. Derivative Relationship (green)
The slope at any point is proportional to the remaining distance to the final value:

\[
\frac{dV}{dt} = -\frac{V(t) - V_f}{\tau}
\]

This is why the exponential is its own derivative — and why RC/RL circuits always follow this shape.
