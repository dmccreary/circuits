---
title: Euler's Formula on the Unit Circle
description: Interactive p5.js MicroSim that steps or rotates a unit phasor around the complex plane and shows its real-axis projection tracing cos(theta) and its imaginary-axis projection tracing sin(theta).
image: /sims/euler-circle/euler-circle.png
og:image: /sims/euler-circle/euler-circle.png
twitter:image: /sims/euler-circle/euler-circle.png
social:
   cards: false
quality_score: 100
---

# Euler's Formula on the Unit Circle

<iframe src="main.html" height="532px" width="100%" scrolling="no"></iframe>

[Run the Euler's Formula on the Unit Circle MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To experiment with the code, paste [euler-circle.js](euler-circle.js) into the [p5.js editor](https://editor.p5js.org/).

## About This MicroSim

Euler's formula connects the complex exponential to the two trigonometric functions:

\[e^{j\theta} = \cos\theta + j\sin\theta\]

The red arrow is the phasor \(e^{j\theta}\): a vector of length 1 at angle \(\theta\) on the complex plane. Its tip always lies on the unit circle.

- The **blue** bar is the arrow's shadow on the real axis. Its length is \(\cos\theta\), the **real part**.
- The **green** bar is the arrow's shadow on the imaginary axis. Its length is \(\sin\theta\), the **imaginary part**.

The two plots on the right record those shadows as the angle advances from 0° to 360°. The solid part of each curve is what has been traced so far; the dashed part is still to come. One trip around the circle draws exactly one cycle of the cosine and one cycle of the sine. This is why a *rotating* phasor \(e^{j\omega t}\) is the natural way to describe a sinusoid.

The second line under the title substitutes the current angle into Euler's formula and shows the numerical result.

## How to Use

1. Click **Step** to move through the key angles 0°, 30°, 45°, 60°, 90°, 180°, 270° and 360°. At each stop the gray line under the formula gives the angle in radians and the exact values.
2. Click **Back** to return to the previous key angle.
3. Click **Start** to rotate the phasor continuously and watch both waveforms being traced. Click **Stop** to freeze it at any angle.
4. Use the **Rotation speed** slider (10°/s to 120°/s) to slow down or speed up the rotation.
5. Click **Waveforms** to hide the two plots and enlarge the circle, or show them again.
6. Click **Reset** to stop and return to 0°.

### Check the numbers

| \(\theta\) | \(\cos\theta\) | \(\sin\theta\) | \(e^{j\theta}\) |
|-----------|----------------|----------------|-----------------|
| 0° | 1 | 0 | \(1\) |
| 30° | 0.866 | 0.500 | \(0.866 + j0.500\) |
| 45° | 0.707 | 0.707 | \(0.707 + j0.707\) |
| 60° | 0.500 | 0.866 | \(0.500 + j0.866\) |
| 90° | 0 | 1 | \(j\) |
| 180° | −1 | 0 | \(-1\) |
| 270° | 0 | −1 | \(-j\) |

At 180° the MicroSim shows \(e^{j\pi} = -1\), which rearranges to Euler's identity \(e^{j\pi} + 1 = 0\).

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/circuits/sims/euler-circle/main.html"
        height="532px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will explain how Euler's formula relates rotating phasors to sinusoidal projections by observing the unit circle animation.

### Target Audience

College students in a first circuits course (electrical engineering or computer science majors).

### Duration

10-15 minutes

### Prerequisites

- Complex numbers in rectangular and polar form
- Sine and cosine of the standard angles
- Degrees and radians

### Activities

1. **Predict each step** (5 min): Before each click of Step, students predict the real and imaginary parts at the next key angle, then check the blue and green bars and the values in the formula line.
2. **Where is it purely real or purely imaginary?** (3 min): Students find the four angles at which one of the bars disappears and write \(e^{j\theta}\) for each (1, \(j\), −1, \(-j\)).
3. **From rotation to waveform** (5 min): Students click Start and describe, in their own words, why the blue trace starts at its maximum while the green trace starts at zero, and why the two traces are a quarter turn apart.
4. **Explain the identity** (2 min): With the phasor at 180°, students explain \(e^{j\pi} + 1 = 0\) using the picture rather than algebra.

### Assessment

- Without the MicroSim, students write \(e^{j120°}\) in rectangular form (answer: \(-0.5 + j0.866\)) and sketch it on the unit circle.
- Students explain in two or three sentences how a phasor rotating at a constant rate produces a cosine on the real axis.

## References

1. [Wikipedia: Euler's formula](https://en.wikipedia.org/wiki/Euler%27s_formula) - Statement, interpretation on the complex plane and relationship to trigonometry
2. [Wikipedia: Unit circle](https://en.wikipedia.org/wiki/Unit_circle) - Sine and cosine as coordinates of a point on the unit circle
3. [Wikipedia: Euler's identity](https://en.wikipedia.org/wiki/Euler%27s_identity) - The special case at an angle of pi radians
4. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to build this MicroSim
