---
title: A title under 60 characters.
description: A description under 110 characters.
image: /img/cover-preview.png
og:image: /img/cover-preview.png
twitter:image: /img/cover-preview.png
social:
   cards: false
hide:
  - toc
---
# Animated Wire MicroSim

<iframe src="./main.html" height="500px" scrolling="no"
  style="overflow: hidden;"></iframe>

You can include this MicroSim in your course by pasting the following HTML directly into your web page.

```html
<iframe src="https://dmccreary.github.io/circuits/sims/animated-wire/main.html" height="500px" scrolling="no"
  style="overflow: hidden;"></iframe>
```

[Run the Animated Wire MicroSim](./main.html){ .md-button .md-button--primary }

## Sample Animate Wire Function

```js
// Function for drawing an animated wire
function drawAnimatedWire(x1, y1, x2, y2, speed1, state) {
    if (state) {
        let distance = dist(x1, y1, x2, y2);
        let circlePos = map((millis() * speed1) % distance, 0, distance, 0, 1);

        let x = lerp(x1, x2, circlePos);
        let y = lerp(y1, y2, circlePos);

        stroke(0);
        strokeWeight(lineWidth)
        line(x1, y1, x2, y2);

        fill(255, 0, 0);
        noStroke();
        circle(x, y, 10);
    } else {
        stroke(0);
        strokeWeight(lineWidth)
        line(x1, y1, x2, y2);
    }
}
```