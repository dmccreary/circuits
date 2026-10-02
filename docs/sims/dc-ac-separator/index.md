---
title: DC and AC Component Separator
description: Interactive p5.js MicroSim that splits a composite signal into its constant DC component and its oscillating AC component on three stacked plots that share one voltage scale.
image: /sims/dc-ac-separator/dc-ac-separator.png
og:image: /sims/dc-ac-separator/dc-ac-separator.png
twitter:image: /sims/dc-ac-separator/dc-ac-separator.png
social:
   cards: false
quality_score: 100
---

# DC and AC Component Separator

<iframe src="main.html" height="622px" width="100%" scrolling="no"></iframe>

[Run the DC and AC Component Separator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To experiment with the code, paste [dc-ac-separator.js](dc-ac-separator.js) into the [p5.js editor](https://editor.p5js.org/).

## About This MicroSim

Any signal can be written as a constant part plus a part that oscillates around that constant:

\[v(t) = V_{DC} + v_{AC}(t) = V_{DC} + V_m \sin(2\pi f t)\]

- The **DC component** \(V_{DC}\) is the *average value* of the signal. It is a flat line.
- The **AC component** \(v_{AC}(t) = v(t) - V_{DC}\) is what is left after the average is removed. It is centered on zero.

The three stacked plots show the composite signal (top), its DC component (middle) and its AC component (bottom). All three use the same volts-per-pixel scale, so you can see that the AC plot is simply the top plot slid down by \(V_{DC}\).

The sketch on the right shows how a circuit performs the same separation. An averaging (low-pass) stage keeps only the constant part. A **coupling capacitor** does the opposite: it blocks DC and passes AC.

The line under the formula reports three calculated values:

| Value | Formula |
|-------|---------|
| DC | \(V_{DC}\) |
| AC RMS | \(V_m/\sqrt{2}\) |
| Total RMS | \(\sqrt{V_{DC}^2 + V_{AC,rms}^2}\) |

## How to Use

1. Move the **DC offset** slider (0 V to 5 V). The top plot rides up and down, the middle plot's flat line follows it, and the bottom plot does not change at all.
2. Move the **AC amplitude** slider (0 V to 5 V). The top and bottom plots grow and shrink together; the middle plot does not change.
3. Move the **Frequency** slider (1 Hz to 20 Hz). Only the oscillating part is affected. The DC value and both RMS values stay the same.
4. Click **Component Labels** to hide or show the dashed average line and the annotations.
5. Click **Reset** to return to the defaults: 2.5 V DC, 2 V AC amplitude, 5 Hz.

### Check the numbers

Set \(V_{DC} = 3\) V and \(V_m = 5\) V, the signal from the chapter's worked example:

- AC RMS \(= 5/\sqrt{2} = 3.54\) V
- Total RMS \(= \sqrt{3^2 + 3.54^2} = \sqrt{21.5} = 4.64\) V
- Maximum \(= 3 + 5 = 8\) V, minimum \(= 3 - 5 = -2\) V

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/circuits/sims/dc-ac-separator/main.html"
        height="622px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will classify signal components as DC or AC by observing how a composite signal can be separated into its constant and varying parts.

### Target Audience

College students in a first circuits course (electrical engineering or computer science majors).

### Duration

10-15 minutes

### Prerequisites

- Sinusoidal waveforms: amplitude and frequency
- The idea of an average value
- RMS value of a sinusoid, \(V_m/\sqrt{2}\)

### Activities

1. **Which plot moves?** (4 min): Before touching each slider, students predict which of the three plots will change. They then move the slider and record which plots responded. They should conclude that the DC slider never changes the bottom plot and the AC and frequency sliders never change the middle plot.
2. **Classify the special cases** (4 min): Students set \(V_m = 0\) (pure DC) and then \(V_{DC} = 0\) (pure AC) and describe each plot. They classify a battery voltage, a wall-outlet voltage and a microphone signal riding on a bias voltage as DC, AC or composite.
3. **Worked example** (5 min): Students set \(V_{DC} = 3\) V and \(V_m = 5\) V and verify the AC RMS (3.54 V), the total RMS (4.64 V) and the maximum and minimum values by hand.
4. **Why a capacitor?** (2 min): Using the sketch on the right, students explain in their own words what a coupling capacitor does to each component.

### Assessment

- Given \(v(t) = 1.5 + 0.5\sin(2\pi \cdot 1000 \cdot t)\) V, students state the DC component, the AC amplitude, the AC RMS value and the total RMS value.
- Students explain why changing the frequency does not change any of the RMS values.

## References

1. [Wikipedia: DC bias](https://en.wikipedia.org/wiki/DC_bias) - The DC component of a signal as its mean value
2. [Wikipedia: Capacitive coupling](https://en.wikipedia.org/wiki/Capacitive_coupling) - How a coupling capacitor blocks DC and passes AC between circuit stages
3. [Wikipedia: Root mean square](https://en.wikipedia.org/wiki/Root_mean_square) - RMS of a sinusoid and of a sum of a constant and a sinusoid
4. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to build this MicroSim
