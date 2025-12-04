---
title: Animated Wire MicroSim
description: Interactive simulation showing electron flow through a wire circuit with adjustable speed and spacing.
quality_score: 85
image: /sims/animated-wire/animated-wire.png
og:image: /sims/animated-wire/animated-wire.png
---

# Animated Wire MicroSim

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/circuits/sims/animated-wire/main.html" width="100%" height="500px" scrolling="no"></iframe>
```

[Run the Animated Wire MicroSim in fullscreen](main.html){ .md-button .md-button--primary }

[Edit in the p5.js Editor](https://editor.p5js.org/dmccreary/sketches/gZgpvo2zS){ .md-button }

## Description

This MicroSim visualizes the flow of electric current through a simple wire circuit. Animated red circles represent electrons moving through the circuit wires, providing an intuitive understanding of how electric current flows in a closed loop.

Key features:

- Animated electron flow through a square wire loop
- Adjustable speed control for electron movement
- Adjustable spacing between electrons
- Start/Pause and Reset controls
- Electrons remain visible when paused for observation

### How to Use

1. Click **Start** to begin the electron flow animation
2. Use the **Speed** slider to control how fast the electrons move
3. Use the **Spacing** slider to adjust the distance between electrons
4. Click **Pause** to freeze the animation and observe electron positions
5. Click **Reset** to return to default settings

## Sample Animated Wire Function

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

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

- Visualize how electric current flows through a conductor
- Understand that electrons move continuously in a closed circuit
- Explain the relationship between electron speed and current magnitude
- Describe the concept of electron drift velocity

### Target Audience

- Grade level: Middle school (grades 6-8)
- Prerequisites: Basic understanding of atoms and electrons

### Activities

1. **Exploration Activity**: Have students start the animation and describe what they see. Ask: "What do the red circles represent?"

2. **Guided Investigation**: Experiment with different speed settings. Ask: "What happens to current when electrons move faster?"

3. **Extension Activity**: Compare this animation to water flowing through pipes. Discuss similarities and differences.

### Assessment

- Discussion question: Why must electrons flow in a complete loop (closed circuit)?
- Reflection prompt: How fast do you think real electrons move in a wire?
- Demonstrate understanding by explaining what the animation represents

## References

- [Paul Falstad's Circuit Simulator](https://www.falstad.com/circuit/) - Interactive circuit simulation tool
- [PhET Circuit Construction Kit](https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc) - Educational circuit simulations
- [p5.js Reference](https://p5js.org/reference/) - Documentation for the JavaScript library used
