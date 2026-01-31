# Schemdraw Circuit Generator

Schemdraw is a Python package for producing high-quality electrical circuit schematic diagrams. This course includes a **Claude Code skill** that generates circuit diagrams from natural language descriptions.

## Overview

The `rlc-circuit-drawing-generator` skill allows you to describe a circuit in plain English, and Claude will generate the Schemdraw Python code and render it to an SVG image.

**Example prompt:**
> "Draw a series RC circuit with R=10kΩ and C=100μF powered by 6V DC"

**Result:**

![Simple RC Circuit](./01-simple-rc.svg)

## How It Works

1. **Describe the circuit** - Use natural language to specify components, values, and topology
2. **Claude generates code** - The skill creates Schemdraw Python code following best practices
3. **Render to SVG** - The code is executed to produce a scalable vector image

## Layout Convention

The skill uses a **vertical layout** for components, which produces clean, readable diagrams:

```
    ┌──────────────┐
    │              │
   (+)           [R₁]
  (V₁)             │
   (-)           [C₁]
    │              │
    └──────⏚──────┘
```

- **Power source**: Vertical on left, positive terminal on top
- **Components**: Arranged vertically on the right using `.down()`
- **Ground**: On the return path, connected to source negative
- **Labels**: Automatically positioned by Schemdraw

## Sample Circuits

### Simple RC Series Circuit

A 6V DC source with a 10kΩ resistor and 100μF capacitor in series.

![RC Series Circuit](./01-simple-rc.svg)

```python
source = d.add(elm.SourceV().up().label('V₁\n6V'))
d += elm.Line().right().length(5).at(source.end)
d += elm.Resistor().down().label('R₁  10kΩ')
d += elm.Capacitor().down().label('C₁  100μF')
```

### Simple RL Series Circuit

A 12V DC source with a 1kΩ resistor and 10mH inductor in series.

![RL Series Circuit](./02-simple-rl.svg)

```python
source = d.add(elm.SourceV().up().label('V₁\n12V'))
d += elm.Line().right().length(5).at(source.end)
d += elm.Resistor().down().label('R₁  1kΩ')
d += elm.Inductor().down().label('L₁  10mH')
```

### RLC Series Circuit

A 10V AC source with R=100Ω, L=50mH, and C=10μF in series - the fundamental resonant circuit.

![RLC Series Circuit](./03-rlc-series.svg)

```python
source = d.add(elm.SourceSin().up().label('V₁\n10V'))
d += elm.Line().right().length(5).at(source.end)
d += elm.Resistor().down().label('R₁  100Ω')
d += elm.Inductor().down().label('L₁  50mH')
d += elm.Capacitor().down().label('C₁  10μF')
```

### Voltage Divider

A 9V DC source with two 10kΩ resistors creating a voltage divider with output tap.

![Voltage Divider](./04-voltage-divider.svg)

```python
source = d.add(elm.SourceV().up().label('V₁\n9V'))
d += elm.Line().right().length(5).at(source.end)
d += elm.Resistor().down().label('R₁  10kΩ')
d += elm.Dot()
d.push()
d += elm.Line().right().length(1).label('Vout', loc='right')
d.pop()
d += elm.Resistor().down().label('R₂  10kΩ')
```

### RC Low-Pass Filter

A 5V AC source with a 1kΩ resistor and 1μF capacitor configured as a low-pass filter.

![RC Low-Pass Filter](./05-rc-lowpass.svg)

```python
source = d.add(elm.SourceSin().up().label('Vin\n5V'))
d += elm.Line().right().length(0.5).at(source.end)
d += elm.Resistor().right().label('R₁  1kΩ')
d += elm.Dot()
d.push()
d += elm.Line().right().length(1).label('Vout', loc='right')
d.pop()
d += elm.Capacitor().down().label('C₁  1μF')
```

## Components Reference

| Component | Schemdraw Element | Symbol |
|-----------|-------------------|--------|
| DC Voltage Source | `elm.SourceV()` | Circle with +/- |
| AC Voltage Source | `elm.SourceSin()` | Circle with sine wave |
| Battery | `elm.Battery()` | Long/short lines |
| Resistor | `elm.Resistor()` | Zigzag |
| Capacitor | `elm.Capacitor()` | Parallel plates |
| Inductor | `elm.Inductor()` | Coil |
| Ground | `elm.Ground()` | Standard ground symbol |

## Direction Methods

All elements support direction methods:

| Method | Description |
|--------|-------------|
| `.right()` | Draw element going right (default) |
| `.left()` | Draw element going left |
| `.up()` | Draw element going up |
| `.down()` | Draw element going down |

## Labeling Best Practices

Use `.label('text')` **without** specifying `loc` - Schemdraw's default positioning handles label placement intelligently based on element orientation.

```python
# Good - let Schemdraw position the label
d += elm.Resistor().down().label('R₁  10kΩ')

# Avoid - manual positioning can cause overlaps
d += elm.Resistor().down().label('R₁  10kΩ', loc='right')
```

## Complete Code Template

Here's a complete template for generating a circuit:

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    # Power source (vertical, positive on top)
    source = d.add(elm.SourceV().up().label('V₁\n12V'))

    # Top rail to the right
    d += elm.Line().right().length(5).at(source.end)

    # Components (vertical arrangement)
    d += elm.Resistor().down().label('R₁  10kΩ')
    d += elm.Capacitor().down().label('C₁  100μF')

    # Return path with ground
    d += elm.Line().left().length(3)
    d += elm.Ground()

    # Connect back to source negative
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)

    d.save('circuit.svg')
```

## Using the Skill

To use this skill with Claude Code, simply describe the circuit you want:

- "Draw a series RLC circuit with R=100Ω, L=10mH, C=1μF powered by 12V DC"
- "Create an RC low-pass filter with a 10kΩ resistor and 100nF capacitor"
- "Show a voltage divider with two 5kΩ resistors and 9V input"

Claude will generate the Schemdraw code and render it to an SVG file.

## Installation

To run Schemdraw locally:

```bash
pip install schemdraw
```

## References

- [Schemdraw Documentation](https://schemdraw.readthedocs.io/en/stable/index.html)
- [Schemdraw GitHub](https://github.com/cdelker/schemdraw)
- [Claude Code Skill]()
