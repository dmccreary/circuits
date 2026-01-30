# Water Flow Analogy MicroSim - Session Log

**Date:** 2026-01-30
**Location:** `/docs/sims/water-flow-analogy/`

## Overview

This MicroSim demonstrates how electric current flow is analogous to water flow in pipes. It uses a split-screen design showing a water system (top) and electrical circuit (bottom) side-by-side.

## User Prompts and Changes

### 1. Initial Creation

**Prompt:** "generate the first microsim water-flow-analogy using the /microsim-generator skill"

**Specification from Chapter 1:**
- Type: microsim
- Bloom Level: Understand (L2)
- Bloom Verb: Compare, explain
- Learning Objective: Students will be able to explain how electric current flow is analogous to water flow in pipes, comparing pressure to voltage and flow rate to current.

**Files Created:**
- `main.html` - Entry point HTML file
- `water-flow-analogy.js` - p5.js simulation code
- `index.md` - Documentation with lesson plan
- `metadata.json` - Dublin Core metadata

**Initial Features:**
- Split-screen design (water system top, electrical circuit bottom)
- Animated particles for water droplets and electrons
- Pressure/Voltage slider (1-12 units)
- Pipe/Wire diameter selector
- Animation toggle
- Reset button
- Pressure gauge / Voltmeter displays
- Flow meter / Ammeter displays

---

### 2. Refactor Animation Using Circuit Library

**Prompt:** "redo the animation of the wire using the @src/circuits-js-lib/p5-circuit-lib.js specifically look for the drawAnimatedWire function"

**Changes:**
- Replaced particle array-based animation with `drawAnimatedWire` pattern from circuit library
- Created `drawAnimatedPipe()` function following the same pattern for water particles
- Created `drawAnimatedWire()` function matching the library's approach
- Key animation pattern:
```javascript
let firstPos = (animationTime * speed) % spacingPixels;
for (let pos = firstPos; pos < distance; pos += spacingPixels) {
    let t = pos / distance;
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);
    circle(x, y, particleSize);
}
```

---

### 3. Fix Diameter Slider Effect

**Prompt:** "The Pipe Wire Size Slider does not change the animation"

**Changes:**
- Made diameter effect more dramatic:
  - Pipe width: 8px (Narrow) → 18px (Medium) → 28px (Wide)
  - Wire width: 4px → 10px → 16px
  - Spacing: 2.5 units → 1.25 units → 0.83 units
  - Particle size (water): 7px → 10px → 13px
  - Particle size (electron): 5.5px → 8px → 10.5px
  - Flow rate multiplier: 1x → 4x → 9x (based on diameter²)
- Increased base flow rate multiplier from 0.008 to 0.015

---

### 4. Fix Slider Overflow

**Prompt:** "the right edge of the the sliders is too far to the right and off the drawing canvas"

**Changes:**
- Changed slider right margin from 20px to 100px to accommodate value labels
- Updated both setup() and windowResized() functions

---

### 5. Document Circuit Library in CLAUDE.md

**Prompt:** "add the information about the availability of the @src/circuits-js-lib/p5-circuit-lib.js to the CLAUDE.md file. Make sure that anytime we are generating circuit diagrams that the functions in this library are preferred."

**Changes:**
- Added comprehensive "p5.js Circuit Component Library" section to CLAUDE.md
- Documented all available functions: drawAnimatedWire, drawBattery, drawResistor, drawInductor, drawCapacitor, drawPhotoresistor, drawResistorHorizPhysical
- Included common parameters, animation pattern, and usage example

---

### 6. Move Slider Labels to Left

**Prompt:** "Move the slider labels N units etc to the LEFT of the slider, not the RIGHT. Use the same text() to draw both the label and the value. Adjust the sliderLeftMargin to be larger"

**Changes:**
- Increased `sliderLeftMargin` from 160 to 250
- Combined label and value into single right-aligned text() call: `text(label + " " + value + suffix, x - 10, y)`
- Removed separate value display on right side of slider
- Reduced right margin to 20px since no labels there
- Labels now display as: "Pump Pressure / Voltage: 6 units" [slider]

---

### 7. Add Start/Stop Button and Tick Marks

**Prompt:** "Add a Start/Stop Animation button in the lower left. By default, all MicroSims should be in the stopped state when they initialize. Also add three tick marks under the Pipe/Wire size for 'Narrow, Medium and Wide'"

**Changes:**
- Changed `isAnimating` default from `true` to `false` (starts stopped)
- Changed `resetSimulation()` to set `isAnimating = false`
- Replaced toggle with Start/Stop button that changes label dynamically
- Moved Reset button next to Start/Stop button
- Added `drawSliderTicks()` function for tick marks under slider
- Added tick marks with "Narrow", "Medium", "Wide" labels under diameter slider
- Removed unused `drawToggle` function and `toggleX`, `toggleY` variables

---

### 8. Slow Down Animation

**Prompt:** "make the animation 3x slower so it is easier to see the circles move on the pipe and wire"

**Changes:**
- Changed speed multiplier from 80 to 27 (≈80÷3) in both:
  - `drawWaterSystem()`: `let speed = flowRate * 27;`
  - `drawElectricalCircuit()`: `let speed = flowRate * 27;`

---

## Final File Structure

```
docs/sims/water-flow-analogy/
├── main.html           # Entry point
├── water-flow-analogy.js   # p5.js simulation (canvas-based controls)
├── index.md            # Documentation and lesson plan
└── metadata.json       # Dublin Core metadata
```

## Key Technical Decisions

1. **Canvas-based controls** - Used rect(), text(), ellipse() for UI elements instead of p5.js DOM functions (createButton, createSlider) per project requirements for iframe embedding

2. **Animation pattern** - Adopted `drawAnimatedWire` pattern from circuit library using single offset calculation for consistent particle spacing

3. **Responsive design** - Canvas width adapts to container, control positions recalculated on resize

4. **Split-screen layout** - 400px draw height divided equally between water system (top) and electrical circuit (bottom), with 100px control area below

## Navigation Update

Added to `mkdocs.yml` under MicroSims section:
```yaml
- Water Flow Analogy: sims/water-flow-analogy/index.md
```
