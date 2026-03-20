---
title: RC Filter Frequency Response MicroSim
description: Interactive Bode plot for RC low-pass and high-pass filters. Adjust R and C with sliders to see cutoff frequency and magnitude response update in real time, with an animated frequency sweep cursor.
---

# RC Filter Frequency Response MicroSim

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/circuits/sims/filter-frequency-response/main.html" width="100%" height="500px" scrolling="no"></iframe>
```

[Run the Filter Frequency Response MicroSim in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim displays an interactive **Bode plot** — a graph of filter gain (in decibels) versus frequency (on a log scale) — for a first-order RC filter. Students can switch between low-pass and high-pass configurations, adjust component values, and watch the response curve, cutoff frequency marker, and \(-3 \text{ dB}\) reference line update instantly.

**Key Concepts Demonstrated:**

| Quantity | Formula | Meaning |
|----------|---------|---------|
| Cutoff frequency | \(f_c = \dfrac{1}{2\pi RC}\) | Frequency at which gain drops to \(-3 \text{ dB}\) (≈ 70.7% of passband) |
| Low-pass gain | \(\|H(f)\| = \dfrac{1}{\sqrt{1+(f/f_c)^2}}\) | Passes low frequencies, attenuates high |
| High-pass gain | \(\|H(f)\| = \dfrac{f/f_c}{\sqrt{1+(f/f_c)^2}}\) | Passes high frequencies, attenuates low |
| Roll-off rate | \(-20 \text{ dB/decade}\) | Gain drops 20 dB for each ×10 in frequency beyond \(f_c\) |

**Interactive Features:**

- **Filter Type Buttons**: Switch between Low-Pass and High-Pass instantly
- **R Slider**: Adjust resistance from 100 Ω to 100 kΩ (log scale)
- **C Slider**: Adjust capacitance from 1 nF to 10 μF (log scale)
- **Live \(f_c\) Display**: Cutoff frequency updates in real time as you move sliders
- **Dashed Reference Lines**: \(-3 \text{ dB}\) horizontal line and \(f_c\) vertical marker
- **Frequency Sweep**: Animated orange cursor sweeps across the plot, showing gain at each frequency

### How to Use

1. Observe the initial state: 1 kΩ, 100 nF, \(f_c \approx 1.59 \text{ kHz}\), Low-Pass selected
2. Move the **R slider** right — watch \(f_c\) drop and the curve shift left
3. Move the **C slider** left — watch \(f_c\) rise and the curve shift right
4. Click **High-Pass** — the curve flips; low frequencies are now attenuated
5. Click **Start Sweep** to animate a cursor across the plot; the readout shows frequency and gain at each point
6. Note where the cursor crosses the \(-3 \text{ dB}\) line — that is \(f_c\)
7. Click **Reset** to return to default values

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

- Calculate the cutoff frequency \(f_c = \frac{1}{2\pi RC}\) for a given RC filter
- Explain why the \(-3 \text{ dB}\) point is the standard definition of cutoff frequency
- Predict how increasing R or C shifts the frequency response curve
- Distinguish the behavior of low-pass and high-pass RC filters from their Bode plots
- Describe the \(-20 \text{ dB/decade}\) roll-off rate of a first-order filter

### Target Audience

- College freshmen/sophomores in introductory circuits or signals courses
- Prerequisites: Understanding of resistors, capacitors, and the concept of impedance

### Activities

1. **Cutoff Frequency Prediction**: Set R = 10 kΩ and C = 10 nF. Before moving sliders, calculate \(f_c\) by hand. Then check the display — does it match?

2. **Decade Comparison**: Set R = 1 kΩ, C = 100 nF (\(f_c \approx 1.59 \text{ kHz}\)). Now multiply R by 10 (10 kΩ) — how does \(f_c\) change? Then restore R and multiply C by 10 — same result?

3. **Low-Pass vs High-Pass**: With identical R and C values, toggle between the two filter types. What do you notice about the curves at \(f_c\)?

4. **Sweep Observation**: Start the sweep and watch the gain readout. Pause mentally when the cursor is exactly at \(f_c\) — what is the gain in dB?

5. **Design Challenge**: Design a low-pass filter with \(f_c = 10 \text{ kHz}\) using available component values. Use the sim to verify your design.

### Assessment

**Formative Questions:**

- If R = 4.7 kΩ and C = 33 nF, what is \(f_c\)?
- At a frequency of \(10 f_c\), what is the approximate gain in dB for a low-pass filter?
- Why do both low-pass and high-pass filters have the same gain (\(-3 \text{ dB}\)) at \(f_c\)?
- If you need to shift \(f_c\) up by one decade, what change to R would achieve this?

**Reflection Prompt:**

Explain in your own words why the Bode plot x-axis uses a logarithmic frequency scale instead of a linear scale.

## Technical Notes

The simulation implements the first-order RC filter transfer function:

**Low-pass:**
\[H_{LP}(f) = \frac{1}{1 + j(f/f_c)}, \quad |H_{LP}| = \frac{1}{\sqrt{1 + (f/f_c)^2}}\]

**High-pass:**
\[H_{HP}(f) = \frac{j(f/f_c)}{1 + j(f/f_c)}, \quad |H_{HP}| = \frac{f/f_c}{\sqrt{1 + (f/f_c)^2}}\]

Both are plotted as \(20 \log_{10}(|H|)\) in dB over 200 log-spaced frequency points from 1 Hz to 10 MHz. The chart uses Chart.js 4.x with a logarithmic x-axis. Component sliders use log mapping so each decade of R or C gets equal slider travel.

## References

- [Khan Academy: Filters](https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-filters) - Introduction to filter concepts
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/) - JavaScript charting library used for the Bode plot
- [All About Circuits: RC Filters](https://www.allaboutcircuits.com/textbook/alternating-current/chpt-8/low-pass-filters/) - Detailed treatment of RC filter theory
