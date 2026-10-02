---
title: Gain and Decibel Converter
description: Interactive p5.js MicroSim that converts between linear gain and decibels for voltage and power gains, shows the effect of the gain on an input signal, and places the gain on a logarithmic scale.
image: /sims/gain-db-converter/gain-db-converter.png
og:image: /sims/gain-db-converter/gain-db-converter.png
twitter:image: /sims/gain-db-converter/gain-db-converter.png
social:
   cards: false
quality_score: 100
---

# Gain and Decibel Converter

<iframe src="main.html" height="512px" width="100%" scrolling="no"></iframe>

[Run the Gain and Decibel Converter MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To experiment with the code, paste [gain-db-converter.js](gain-db-converter.js) into the [p5.js editor](https://editor.p5js.org/).

## About This MicroSim

**Gain** is the ratio of a circuit's output to its input. It can be written as a plain ratio (a *linear gain*) or in **decibels**:

\[A_V(\text{dB}) = 20\log_{10}(A_V) \qquad A_V = 10^{\,\text{dB}/20}\]

\[A_P(\text{dB}) = 10\log_{10}(A_P) \qquad A_P = 10^{\,\text{dB}/10}\]

The factor is 20 for voltage (and current) ratios and 10 for power ratios because power is proportional to voltage squared.

The MicroSim has four parts:

- **Signal plot** (top left): a fixed 1 V peak input (blue) and the output (red) after the gain is applied. The vertical axis rescales to the larger signal, so with a large gain the input shrinks to a flat line. A linear picture cannot show both signals at once, which is the reason decibels exist.
- **Conversion panel** (top right): the gain in both forms, with the conversion written out in both directions using your number.
- **Logarithmic scale** (middle): the gain's position between ×0.001 and ×1000. Equal distances are equal *ratios*, and every ×10 adds the same number of decibels.
- **Quick reference** (bottom): the values worth memorizing. The column for the current mode is highlighted.

For the audio sound-pressure-level side of decibels, see the [Decibel Scale](../decibel-scale/index.md) MicroSim.

## How to Use

1. Drag the slider to set the gain. In **Enter as: Linear gain** mode it is a logarithmic slider from 0.001 to 1000 (rounded to two significant figures).
2. Click **Enter as** to switch to **Decibels**. The slider now sets a whole number of decibels (−60 dB to +60 dB for voltage, −30 dB to +30 dB for power) and the linear gain is calculated.
3. Click **Mode** to switch between **Voltage gain** (20·log) and **Power gain** (10·log). The number you entered is kept and the other form is recalculated.
4. Click **Reset** to return to the default: a voltage gain of 10 (+20 dB).

### Check the numbers

| Enter | Mode | Result |
|-------|------|--------|
| Linear gain 10 | Voltage | \(20\log_{10}(10) = +20\) dB |
| Linear gain 2 | Voltage | \(20\log_{10}(2) = +6.02\) dB |
| Linear gain 2 | Power | \(10\log_{10}(2) = +3.01\) dB |
| Linear gain 0.5 | Voltage | \(20\log_{10}(0.5) = -6.02\) dB |
| +40 dB | Voltage | \(10^{40/20} = 100\) |
| +30 dB | Power | \(10^{30/10} = 1000\) |

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/circuits/sims/gain-db-converter/main.html"
        height="512px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will calculate conversions between linear gain and decibel notation for voltage and power gains.

### Target Audience

College students in a first circuits course (electrical engineering or computer science majors).

### Duration

10-15 minutes

### Prerequisites

- Base-10 logarithms and powers of ten
- Voltage gain \(A_V = V_{out}/V_{in}\) and power gain \(A_P = P_{out}/P_{in}\)
- Peak amplitude of a sinusoid

### Activities

1. **Calculate, then check** (5 min): Students compute by hand the decibel value of voltage gains of 1, 2, 10, 100 and 0.1, then enter each value and compare. They repeat for power gains of 2, 10 and 100.
2. **Go backwards** (3 min): Switch to decibel entry. Students predict the linear voltage gain for +6 dB, +20 dB, +26 dB and −20 dB before reading the result. (+26 dB = +20 dB + 6 dB, so ×10 × ×2 = ×20.)
3. **Same number, two meanings** (3 min): With +20 dB entered, students switch between Voltage gain and Power gain and explain why the same decibel value means ×10 in voltage but ×100 in power.
4. **Why a log scale?** (3 min): Students raise the linear gain from 1 to 1000 and describe what happens to the blue input trace on the signal plot and to the marker on the logarithmic scale.

### Assessment

- An amplifier has a voltage gain of 40 dB and a 10 mV RMS input. Students find the linear gain (100) and the output (1 V RMS).
- Two amplifier stages with voltage gains of 5 and 20 are cascaded. Students express each gain in decibels (13.98 dB and 26.02 dB) and show that the decibel values add to 40 dB, the same as \(20\log_{10}(100)\).
- Students explain why halving the voltage is −6 dB but halving the power is −3 dB.

## References

1. [Wikipedia: Decibel](https://en.wikipedia.org/wiki/Decibel) - Definition of the decibel for power quantities and root-power (voltage) quantities
2. [Wikipedia: Gain (electronics)](https://en.wikipedia.org/wiki/Gain_(electronics)) - Voltage, current and power gain and their logarithmic units
3. [Wikipedia: Logarithmic scale](https://en.wikipedia.org/wiki/Logarithmic_scale) - Why equal distances on a logarithmic scale represent equal ratios
4. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to build this MicroSim
