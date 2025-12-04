---
title: Circuit Component Library Test
description: Interactive test demonstration of the p5.js circuit component drawing library.
quality_score: 85
image: /sims/circuit-lib/circuit-lib.png
og:image: /sims/circuit-lib/circuit-lib.png
---

# Circuit Component Library Test

<iframe src="main.html" width="100%" height="480px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/circuits/sims/circuit-lib/main.html" width="100%" height="480px" scrolling="no"></iframe>
```

[Run the Circuit Library Test in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim is a test demonstration of the circuit component drawing library for p5.js. The library provides reusable functions to draw standard electronic components including resistors, capacitors, inductors, batteries, and switches. All components support both horizontal and vertical orientations with customizable labels.

Key features:

- Complete set of basic circuit component drawing functions
- Support for both horizontal and vertical orientations
- Customizable line widths and labels
- Animated wire function for visualizing current flow
- Responsive design for different screen sizes

### Library Components

The circuit library (`circuit-lib.js`) includes the following drawing functions:

- **drawResistor()** - Draws a resistor with zig-zag pattern
- **drawCapacitor()** - Draws a capacitor with parallel plates
- **drawInductor()** - Draws an inductor with coil pattern
- **drawBattery()** - Draws a battery with +/- terminals
- **drawSwitch()** - Draws an on/off switch
- **drawAnimatedWire()** - Draws wire with animated electron flow

### How to Use the Library

1. Include `circuit-lib.js` in your HTML file
2. Call the drawing functions with position, size, and orientation parameters
3. Customize labels and line widths as needed

```javascript
// Example: Draw a horizontal resistor
drawResistor(x, y, width, height, lineWidth, HORIZONTAL, "100Ω");

// Example: Draw a vertical capacitor
drawCapacitor(x, y, width, height, lineWidth, VERTICAL, "10μF");
```

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

- Identify standard circuit component symbols
- Understand the purpose of each component type
- Recognize components in both horizontal and vertical orientations
- Describe the role of component libraries in circuit simulation

### Target Audience

- Grade level: High school (grades 9-12)
- Prerequisites: Familiarity with basic circuit concepts and components

### Activities

1. **Exploration Activity**: Examine each component type and identify its key visual features.

2. **Guided Investigation**: Compare the component symbols to their real-world counterparts. Discuss why these symbols are used.

3. **Extension Activity**: Use the library functions to create your own circuit diagram drawing.

### Assessment

- Discussion question: Why is it helpful to have standardized symbols for circuit components?
- Reflection prompt: How would you modify the library to add a new component?
- Demonstrate understanding by identifying all components shown

## References

- [Standard Circuit Symbols](https://en.wikipedia.org/wiki/Electronic_symbol) - Wikipedia reference
- [IEEE Standard Graphic Symbols](https://standards.ieee.org/) - Industry standards
- [p5.js Reference](https://p5js.org/reference/) - Documentation for the JavaScript library used
