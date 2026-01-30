# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI Circuits Course repository - an educational website that teaches electronic circuits using generative AI tools. The site is built with MkDocs Material and contains interactive simulations, educational content, and AI-generated circuit diagrams.

Website: https://dmccreary.github.io/circuits/

## Build and Development Commands

```bash
# Build the site (generates static files in site/ directory)
mkdocs build

# Serve the site locally for development
mkdocs serve

# Deploy to GitHub Pages  
mkdocs gh-deploy
```

## Project Architecture

### Content Structure
- `docs/` - Main documentation content organized by sections:
  - `sections/` - Course chapters (intro, laws, diodes, transistors, etc.)
  - `prompts/` - AI prompt examples for various circuit tasks
  - `sims/` - Interactive circuit simulations with HTML/JS
  - `faq/` - Frequently asked questions
- `src/` - Source code utilities:
  - `graph/` - Knowledge graph generation tools (Python)
  - `embeddings/` - Circuit embedding generation
  - `plot-question-similarity/` - Question similarity analysis
- `data/` - CSV files with concept graphs, taxonomies, and circuit data
- `site/` - Generated static site (auto-built by MkDocs)

### Interactive Simulations
The course includes custom JavaScript simulations in `docs/sims/` and `docs/sections/`. These are standalone HTML/JS files that demonstrate:
- Circuit component behavior (resistors, capacitors, diodes)
- Interactive circuit diagrams
- Current-voltage plots
- Animated circuit elements

### p5.js Circuit Component Library

**IMPORTANT**: When generating p5.js circuit simulations, always use the functions in `src/circuits-js-lib/p5-circuit-lib.js`. This library provides standardized, tested functions for drawing circuit components.

**Available Functions:**

| Function | Description |
|----------|-------------|
| `drawAnimatedWire(x1, y1, x2, y2, speed, spacing)` | Draws a wire with animated electron flow (red circles) |
| `drawBattery(x, y, width, height, orientation, level)` | Draws a battery with charge level indicator |
| `drawResistor(x, y, width, height, lineWidth, orientation, label, labelPosition)` | Draws a schematic resistor (zigzag symbol) |
| `drawInductor(x, y, width, height, lineWidth, orientation, label, labelPosition)` | Draws a schematic inductor (coil humps) |
| `drawCapacitor(x, y, width, height, lineWidth, orientation, label, labelPosition)` | Draws a schematic capacitor (parallel plates) |
| `drawPhotoresistor(x, y, size)` | Draws a photoresistor symbol |
| `drawResistorHorizPhysical(x, y, w, h, bands)` | Draws a physical resistor with color bands |

**Common Parameters:**
- `orientation`: Use `HORIZONTAL` (0) or `VERTICAL` (1)
- `labelPosition`: Use p5.js constants `TOP`, `BOTTOM`, `LEFT`, or `RIGHT`
- `lineWidth`: Stroke weight for component drawing

**Animation Pattern:**
The `drawAnimatedWire` function uses a global `animationTime` variable that should be incremented in `draw()`:
```javascript
if (isAnimating) {
    animationTime += deltaTime;
}
```

**Usage Example:**
```javascript
// Include in HTML: <script src="path/to/p5-circuit-lib.js"></script>

let lineWidth = 3;
let animationTime = 0;

function draw() {
    animationTime += deltaTime;

    // Draw animated wire
    drawAnimatedWire(50, 100, 200, 100, 0.1, 1.0);

    // Draw resistor with label
    drawResistor(100, 50, 80, 40, 2, HORIZONTAL, "R1", TOP);
}
```

### MicroSim UI Standards

When creating p5.js MicroSims, follow these UI conventions for consistency:

**Animation Control Rule:**
ALL MicroSims with animations MUST:
1. Include a Start/Stop button to control the animation
2. Default to the STOPPED state when first loaded (`isAnimating = false`)
3. Allow users to observe the initial state before starting animation

**Slider Layout:**
- Place slider labels AND current values to the LEFT of the slider track
- Use right-aligned text just before the slider: `text(label + " " + value + suffix, sliderX - 10, y)`
- Use a `sliderLeftMargin` of 250px or more to accommodate label text
- For discrete sliders (e.g., 3 options), add tick marks with labels below the slider track

**Example slider with ticks:**
```javascript
// Draw slider
drawSlider("Pipe Size:", diameter, 1, 3, sliderX, sliderY, sliderWidth, " (Medium)");
// Draw tick marks below
drawSliderTicks(sliderX, sliderY + 8, sliderWidth, ["Narrow", "Medium", "Wide"]);
```

**Animation Speeds:**
- Use slow animation speeds so users can observe particle/electron movement
- Recommended speed multiplier: ~25-30 for visible particle motion
- Reset button should return to stopped state

**Button Layout:**
- Place Start/Stop button in lower left of control area
- Place Reset button next to Start/Stop
- Use canvas-based buttons (not p5.js DOM createButton) for iframe compatibility

**Control Area:**
- Standard control height: 100px below the drawing area
- Background color: light gray (`fill(245)`)
- Leave adequate margins on all sides

### AI Integration
- Prompts for generating circuit diagrams using CircuiTikZ/LaTeX
- Knowledge graph generation for circuit concepts
- Circuit similarity analysis using embeddings
- Interactive chatbot examples

### Configuration
- `mkdocs.yml` - Main site configuration with navigation, theme, and plugin settings
- Material theme with custom CSS/JS in `docs/css/` and `docs/js/`
- LaTeX/MathJax support for equations
- Google Analytics integration

## Development Notes

- Content is primarily Markdown with embedded HTML/JS for simulations
- No traditional package.json - this is a documentation site, not a Node.js project
- Python scripts in `src/` handle data processing and analysis
- Generated site deploys automatically to GitHub Pages via `mkdocs gh-deploy`