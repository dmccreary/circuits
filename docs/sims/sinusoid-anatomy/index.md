---
title: Sinusoidal Waveform Anatomy
description: Interactive p5.js MicroSim that labels the peak, peak-to-peak, RMS level, period, zero crossings and phase shift of a sinusoidal voltage while sliders change amplitude, frequency and phase.
image: /sims/sinusoid-anatomy/sinusoid-anatomy.png
og:image: /sims/sinusoid-anatomy/sinusoid-anatomy.png
twitter:image: /sims/sinusoid-anatomy/sinusoid-anatomy.png
social:
   cards: false
quality_score: 100
---

# Sinusoidal Waveform Anatomy

<iframe src="main.html" height="577px" width="100%" scrolling="no"></iframe>

[Run the Sinusoidal Waveform Anatomy MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To experiment with the code, paste [sinusoid-anatomy.js](sinusoid-anatomy.js) into the [p5.js editor](https://editor.p5js.org/).

## About This MicroSim

A sinusoidal voltage is completely described by three numbers: its **amplitude** \(V_m\), its **frequency** \(f\), and its **phase** \(\phi\):

\[v(t) = V_m \sin(2\pi f t + \phi)\]

This MicroSim draws that waveform on fixed axes (−50 ms to 200 ms, ±13 V) so that moving a slider changes the *shape on the screen*, not just the axis labels. Every part of the waveform's "anatomy" is labeled and updates as you move the sliders:

| Label | Color | Meaning |
|-------|-------|---------|
| Peak \(V_m\) | red dashed lines and dots | Maximum value measured from zero |
| RMS | purple dotted line | \(V_{rms} = V_m/\sqrt{2} \approx 0.707\,V_m\), the equivalent DC value for power |
| Peak-to-peak | orange arrow | \(V_{pp} = 2V_m\), the full swing from trough to peak |
| Period \(T\) | teal arrow | \(T = 1/f\), the time for one complete cycle |
| Zero crossings | green circles | Instants where \(v(t) = 0\), spaced \(T/2\) apart |
| Phase shift | magenta bar | How far the waveform is shifted from the dashed zero-phase reference |

The formula at the top is rewritten with the current slider values, together with the angular frequency \(\omega = 2\pi f\) and the period \(T = 1/f\).

## How to Use

1. Move the **Amplitude** slider (1 V to 10 V). The peak, RMS and peak-to-peak labels all scale together.
2. Move the **Frequency** slider (1 Hz to 100 Hz). More cycles fit in the same 250 ms window and the period arrow shrinks.
3. Move the **Phase** slider (−180° to +180°). A positive phase slides the waveform to the *left* (it leads the dashed reference); a negative phase slides it to the *right* (it lags).
4. Click **RMS Level** to show or hide the RMS line.
5. Click **Reference** to switch between the sine form \(V_m \sin(\omega t + \phi)\) and the cosine form \(V_m \cos(\omega t + \phi)\). The dashed reference curve and the formula change with it.
6. Click **Reset** to return to the defaults: 5 V, 10 Hz, 0°.

### Check the numbers

With the defaults (\(V_m = 5\) V, \(f = 10\) Hz):

- \(V_{rms} = 5/\sqrt{2} = 3.54\) V
- \(V_{pp} = 2 \times 5 = 10\) V
- \(\omega = 2\pi \times 10 = 62.8\) rad/s
- \(T = 1/10 = 100\) ms

Setting the phase to +90° shifts the waveform left by a quarter period, \(T/4 = 25\) ms.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/circuits/sims/sinusoid-anatomy/main.html"
        height="577px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will explain the relationship between the parameters of a sinusoid (amplitude, frequency, phase) and the resulting waveform shape.

### Target Audience

College students in a first circuits course (electrical engineering or computer science majors).

### Duration

10-15 minutes

### Prerequisites

- Sine and cosine functions and radian measure
- Voltage as a quantity that can vary with time
- Square roots

### Activities

1. **Predict, then check** (5 min): Before touching a slider, students predict what will happen to the picture when the amplitude doubles, when the frequency doubles, and when the phase changes from 0° to +90°. They then move each slider and compare.
2. **Guided measurement** (5 min): Set \(V_m = 8\) V and \(f = 20\) Hz. Students compute \(V_{rms}\), \(V_{pp}\), \(\omega\) and \(T\) by hand and confirm each value against the labels (5.66 V, 16 V, 125.7 rad/s, 50 ms).
3. **Sine or cosine?** (5 min): With the sine reference selected, set the phase to +90°. Switch to the cosine reference and set the phase to 0°. Students explain why the two solid curves are identical, using \(\sin(\omega t + 90°) = \cos(\omega t)\).

### Assessment

- Given a formula such as \(v(t) = 6\sin(2\pi \cdot 25 \cdot t - 45°)\) V, students state the peak, RMS, peak-to-peak, period, and whether the waveform leads or lags the zero-phase reference, then verify with the MicroSim.
- Students explain in one or two sentences why the RMS line always sits at about 71% of the peak, no matter the frequency or phase.

## References

1. [Wikipedia: Sine wave](https://en.wikipedia.org/wiki/Sine_wave) - Definition of a sinusoid and its amplitude, frequency and phase parameters
2. [Wikipedia: Root mean square](https://en.wikipedia.org/wiki/Root_mean_square) - Why the RMS value of a sinusoid is the peak divided by the square root of two
3. [Wikipedia: Phase (waves)](https://en.wikipedia.org/wiki/Phase_(waves)) - Phase shift, leading and lagging
4. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to build this MicroSim
