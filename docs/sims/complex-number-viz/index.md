---
title: Complex Number Visualizer
description: Interactive p5.js MicroSim that plots a complex number on the complex plane and shows the worked conversion between rectangular form a + jb and polar form r at angle theta, with a quiz mode for practice.
image: /sims/complex-number-viz/complex-number-viz.png
og:image: /sims/complex-number-viz/complex-number-viz.png
twitter:image: /sims/complex-number-viz/complex-number-viz.png
social:
   cards: false
quality_score: 100
---

# Complex Number Visualizer

<iframe src="main.html" height="562px" width="100%" scrolling="no"></iframe>

[Run the Complex Number Visualizer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

To experiment with the code, paste [complex-number-viz.js](complex-number-viz.js) into the [p5.js editor](https://editor.p5js.org/).

## About This MicroSim

A complex number can be written two ways:

- **Rectangular form** \(z = a + jb\): a real part \(a\) and an imaginary part \(b\)
- **Polar form** \(z = r\angle\theta\): a magnitude \(r\) and an angle \(\theta\)

(Engineers write \(j\) for \(\sqrt{-1}\) because \(i\) is reserved for current.)

The complex plane on the left draws the number as a point \(z\). The colors tie the picture to the formulas:

| Color | Quantity | On the plane |
|-------|----------|--------------|
| Blue | Real part \(a\) | Bar along the real axis |
| Green | Imaginary part \(b\) | Bar along the imaginary axis |
| Red | Magnitude \(r\) | Arrow from the origin to \(z\) |
| Purple | Angle \(\theta\) | Arc measured from the positive real axis |

The panel on the right shows the number in both forms and writes out the conversion with your numbers substituted:

\[r = \sqrt{a^2 + b^2} \qquad \theta = \tan^{-1}\!\left(\frac{b}{a}\right)\ \text{(with quadrant adjustment)}\]

\[a = r\cos\theta \qquad b = r\sin\theta\]

**Quadrant adjustment.** A calculator's \(\tan^{-1}\) key only returns angles between −90° and +90°, so it cannot tell \(3 + j4\) from \(-3 - j4\). When \(a < 0\) the point is in quadrant II or III and you must add 180° (quadrant II) or subtract 180° (quadrant III). The panel shows the calculator result and the adjustment separately.

## How to Use

1. With **Enter: Rectangular (a, b)** selected, move the two sliders to set \(a\) and \(b\) (−5 to 5). Read the polar form and follow the calculation of \(r\) and \(\theta\).
2. Click the **Enter** button to switch to **Polar (r, θ)** entry. The same number is kept. Now the sliders set \(r\) (0 to 7) and \(\theta\) (−180° to 180°), and the panel shows the calculation of \(a\) and \(b\).
3. Click **New Problem** for a random number in the current entry form. The other form is hidden and replaced with question marks. Work out the conversion on paper, then click **Show Answer** to check.
4. Click **Hide Answer** at any time to practice with a number you set yourself.

### Check the numbers

The default is the 3-4-5 triangle, \(z = 3 + j4\):

- \(r = \sqrt{3^2 + 4^2} = \sqrt{25} = 5\)
- \(\theta = \tan^{-1}(4/3) = 53.13°\)

Try \(z = -3 + j4\). The calculator gives \(\tan^{-1}(4/(-3)) = -53.13°\), which points into quadrant IV. Adding 180° gives the correct angle, \(126.87°\).

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/circuits/sims/complex-number-viz/main.html"
        height="562px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Learning Objective

Students will calculate complex number conversions between rectangular and polar forms using the complex plane visualization.

### Target Audience

College students in a first circuits course (electrical engineering or computer science majors).

### Duration

15-20 minutes

### Prerequisites

- The Pythagorean theorem
- Sine, cosine and inverse tangent
- The definition \(j = \sqrt{-1}\)

### Activities

1. **Read the picture** (3 min): With the default \(3 + j4\), students identify the right triangle formed by the blue bar, the dotted green projection and the red arrow, and explain why \(r\) comes from the Pythagorean theorem.
2. **One number per quadrant** (5 min): Students enter \(3 + j4\), \(-3 + j4\), \(-3 - j4\) and \(3 - j4\). For each they record the calculator value of \(\tan^{-1}(b/a)\), the adjustment and the final angle. They should notice that the calculator value alone is wrong whenever \(a < 0\).
3. **Polar to rectangular** (4 min): Switch to polar entry. Students enter \(5\angle 53°\), \(2\angle 90°\) and \(4\angle{-120°}\), predict the signs of \(a\) and \(b\) from the quadrant before reading the result, and check with \(a = r\cos\theta\), \(b = r\sin\theta\).
4. **Quiz practice** (5 min): Students click New Problem five times in each entry mode, do the conversion on paper with a calculator, and check with Show Answer.

### Assessment

- Convert \(z = 5 - j12\) to polar form by hand (answer: \(13\angle{-67.38°}\)).
- Convert \(z = 10\angle 60°\) to rectangular form by hand (answer: \(5 + j8.66\)).
- Explain why \(\tan^{-1}(b/a)\) alone gives the wrong angle for a number in quadrant II.

## References

1. [Wikipedia: Complex number](https://en.wikipedia.org/wiki/Complex_number) - Rectangular and polar forms and the complex plane
2. [Wikipedia: Complex plane](https://en.wikipedia.org/wiki/Complex_plane) - Geometric interpretation of real part, imaginary part, modulus and argument
3. [Wikipedia: atan2](https://en.wikipedia.org/wiki/Atan2) - The two-argument arctangent and the quadrant adjustment it performs
4. [p5.js Reference](https://p5js.org/reference/) - Documentation for the p5.js library used to build this MicroSim
