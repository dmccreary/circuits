---
title: RC Charging Circuit MicroSim
description: Interactive simulation of an RC charging circuit with animated electron flow and real-time voltage and current graphs.
image: /sims/rc-charging/rc-charging.png
og:image: /sims/rc-charging/rc-charging.png
---

# RC Charging Circuit MicroSim

<iframe src="main.html" width="100%" height="612px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/circuits/sims/rc-charging/main.html" width="100%" height="612px" scrolling="no"></iframe>
```

[Run the RC Charging MicroSim in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim visualizes the RC charging process — what happens when a capacitor charges through a resistor after a switch is closed. The simulation combines an animated circuit schematic with real-time voltage and current graphs.

**Key Concepts Demonstrated:**

| Quantity | Formula | Behavior |
|----------|---------|----------|
| Capacitor Voltage | \(V_C(t) = V_s(1 - e^{-t/\tau})\) | Rises exponentially toward \(V_s\) |
| Circuit Current | \(I(t) = \frac{V_s}{R} e^{-t/\tau}\) | Falls exponentially toward zero |
| Time Constant | \(\tau = RC\) | Time to reach 63.2% of final voltage |

**Interactive Features:**

- **Source Voltage Slider**: Adjust \(V_s\) from 1V to 20V
- **Resistance Slider**: Adjust R from 1k\(\Omega\) to 100k\(\Omega\)
- **Capacitance Slider**: Adjust C from 1\(\mu\)F to 100\(\mu\)F
- **Close/Open Switch**: Starts and stops the charging process
- **Reset Button**: Returns circuit to initial uncharged state
- **Animated Electrons**: Flow speed decreases as current drops
- **Charge Indicator**: Capacitor visually fills as it charges

### How to Use

1. Observe the initial state: switch open, capacitor uncharged (\(V_C = 0\), \(I = 0\))
2. Click **Close Switch** to start charging
3. Watch electrons flow fast initially, then slow as current decreases
4. Observe the voltage graph rising and current graph falling simultaneously
5. Note the \(\tau\) marker — at \(t = \tau\), voltage reaches 63.2% of \(V_s\)
6. After \(5\tau\), the capacitor is essentially fully charged
7. Click **Reset**, adjust sliders, and repeat with different parameters

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

- Explain the complementary relationship between capacitor voltage (rising) and circuit current (falling) during RC charging
- Calculate the time constant \(\tau = RC\) and predict charging behavior
- Identify that at \(t = \tau\), the capacitor reaches 63.2% of the source voltage
- Describe why current decreases as the capacitor charges (self-limiting behavior)
- Predict how changing R, C, or \(V_s\) affects the charging curve

### Target Audience

- College freshmen/sophomores in introductory circuits courses
- High school AP Physics students
- Prerequisites: Understanding of voltage, current, resistance, and capacitance

### Activities

1. **Prediction Activity**: Before closing the switch, have students sketch what they think the \(V_C(t)\) and \(I(t)\) curves will look like. Then run the simulation to check.

2. **Time Constant Exploration**: Set R=10k\(\Omega\), C=10\(\mu\)F (\(\tau\) = 100ms). Close the switch and observe. Then double R to 20k\(\Omega\) — what happens to the charging speed? Halve C to 5\(\mu\)F — same \(\tau\)?

3. **Data Collection**: For a given R and C, record \(V_C\) at \(t = \tau, 2\tau, 3\tau, 4\tau, 5\tau\). Verify the values match 63.2%, 86.5%, 95.0%, 98.2%, 99.3% of \(V_s\).

4. **Discussion Questions**:
    - Why does the current start at its maximum value and then decrease?
    - What would happen if we used a very small resistor (approaching 0)?
    - Why is the capacitor considered "fully charged" at \(5\tau\) even though it never quite reaches \(V_s\)?
    - How does this circuit behave like a "self-regulating" system?

### Assessment

**Formative Questions:**

- If R = 10k\(\Omega\) and C = 47\(\mu\)F, what is \(\tau\)?
- At \(t = 2\tau\), what percentage of the source voltage has the capacitor reached?
- If you want the capacitor to charge faster, should you increase or decrease R?
- What is the initial current when \(V_s\) = 12V and R = 4.7k\(\Omega\)?

**Reflection Prompt:**

Explain in your own words why the charging current decreases over time, even though the battery voltage stays constant.

## Technical Notes

The simulation implements the first-order RC circuit step response:

1. **Exponential charging**: \(V_C(t) = V_s(1 - e^{-t/RC})\) — the capacitor voltage asymptotically approaches the source voltage
2. **Exponential current decay**: \(I(t) = \frac{V_s}{R}e^{-t/RC}\) — current starts at \(I_0 = V_s/R\) and decays to zero
3. **Energy perspective**: The battery delivers energy, half stored in the capacitor (\(\frac{1}{2}CV^2\)) and half dissipated in the resistor
4. **Self-limiting mechanism**: As \(V_C\) rises, the voltage across R decreases, reducing current, which slows charging

## References

- Chapter 6: [Transient Analysis RC/RL](../../chapters/06-transient-analysis-rc-rl/index.md) - Course chapter covering RC charging theory
- [Khan Academy: RC Circuits](https://www.khanacademy.org/science/physics/circuits-topic) - Supplementary circuit concepts
- [p5.js Reference](https://p5js.org/reference/) - Documentation for the JavaScript library used
