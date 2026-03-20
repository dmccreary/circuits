---
title: Natural Frequency Calculator
description: An interactive calculator MicroSim that computes the natural frequency of an LC circuit from inductance and capacitance values, showing the inverse square root relationship on a log-log plot.
image: /sims/natural-frequency-calculator/natural-frequency-calculator.png
og:image: /sims/natural-frequency-calculator/natural-frequency-calculator.png
twitter:image: /sims/natural-frequency-calculator/natural-frequency-calculator.png
social:
   cards: false
quality_score: 72
---

# Natural Frequency Calculator

<iframe src="main.html" height="482px" width="100%" scrolling="no"></iframe>

[Run the Natural Frequency Calculator Fullscreen](./main.html){ .md-button .md-button--primary }

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://dmccreary.github.io/circuits/sims/natural-frequency-calculator/main.html" height="482px" width="100%" scrolling="no"></iframe>
```

## Description

This MicroSim allows students to calculate the **natural frequency** (\(f_0\)) of an LC (inductor-capacitor) circuit by adjusting inductance and capacitance values using logarithmic sliders.

The natural frequency is determined by the formula:

\[\omega_0 = \frac{1}{\sqrt{LC}}\]

\[f_0 = \frac{\omega_0}{2\pi} = \frac{1}{2\pi\sqrt{LC}}\]

### How to Use

1. **Adjust the Inductance (L)** slider to set values from 0.1 mH to 100 mH
2. **Adjust the Capacitance (C)** slider to set values from 0.01 µF to 100 µF
3. Observe the **step-by-step calculation** showing how \(\omega_0\) and \(f_0\) are derived
4. Watch how the **current point** moves along the log-log plot curve
5. Notice the **inverse square root relationship**: doubling the LC product reduces \(f_0\) by a factor of \(\sqrt{2}\)

### Default Values

- L = 10 mH, C = 1 µF gives \(f_0 \approx 1{,}592\) Hz

### Key Concepts

- The natural frequency depends only on L and C, not on resistance
- The relationship is an **inverse square root**: \(f_0 \propto \frac{1}{\sqrt{LC}}\)
- On the log-log plot, this relationship appears as a straight line with slope -1/2
- Larger inductance or capacitance values produce lower natural frequencies

## Lesson Plan

### Learning Objective

Students will be able to calculate the natural frequency of an LC circuit from given inductance and capacitance values and describe the inverse square root relationship between natural frequency and the LC product.

### Target Audience

High school physics or introductory college-level electrical engineering students.

### Prerequisites

- Understanding of inductance and capacitance
- Familiarity with square roots and logarithms
- Basic knowledge of LC circuits

### Activities

1. **Predict and Verify**: Before adjusting sliders, have students calculate \(f_0\) for L = 10 mH and C = 1 µF by hand. Then verify with the MicroSim.
2. **Doubling Experiment**: Double L while keeping C constant. What happens to \(f_0\)? Repeat by doubling C. Students should observe the \(\sqrt{2}\) factor.
3. **Log-Log Exploration**: Ask students why the curve on the log-log plot is a straight line. What is the slope?
4. **Design Challenge**: What values of L and C produce a natural frequency of exactly 1 kHz? Can students find multiple valid combinations?

### Assessment

- Students calculate \(f_0\) for three different LC combinations without the MicroSim, then verify their answers.
- Students explain in writing why the log-log plot shows a linear relationship.

## References

1. [Wikipedia: LC Circuit](https://en.wikipedia.org/wiki/LC_circuit) - Comprehensive overview of LC circuit theory, natural frequency derivation, and applications
2. [Wikipedia: Resonance](https://en.wikipedia.org/wiki/Resonance) - Explanation of resonance phenomena in physical and electrical systems
3. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to build this MicroSim
