# Schemdraw Reference Guide

Quick reference for generating circuit diagrams with Schemdraw.

## Installation

```bash
pip install schemdraw
```

## Basic Structure

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)
    # Add elements here
    d.save('circuit.svg')
```

## Power Sources

### DC Voltage Source
```python
elm.SourceV().label('V₁\n12V')
```
Circle with + and - symbols.

### AC Voltage Source
```python
elm.SourceSin().label('V₁\n120V')
```
Circle with sine wave symbol.

### Battery
```python
elm.Battery().label('9V')
```
Long line (positive) and short line (negative).

### Current Source
```python
elm.SourceI().label('I₁\n1A')
```
Circle with arrow.

## Passive Components

### Resistor
```python
elm.Resistor().label('R₁\n10kΩ')
```
Zigzag (American) or rectangle (IEC) symbol.

### Capacitor
```python
elm.Capacitor().label('C₁\n100μF')
```
Two parallel plates.

### Polarized Capacitor
```python
elm.Capacitor2().label('C₁\n100μF')
```
Capacitor with polarity marking.

### Inductor
```python
elm.Inductor().label('L₁\n10mH')
```
Coil/loops symbol.

### Inductor (European)
```python
elm.Inductor2().label('L₁\n10mH')
```
Rectangle with inductance symbol.

## Meters

### Ammeter
```python
elm.Ammeter().label('A')
```
Circle with 'A' inside.

### Voltmeter
```python
elm.Voltmeter().label('V')
```
Circle with 'V' inside.

## Connections

### Wire/Line
```python
elm.Line()
```
Simple connecting wire.

### Ground
```python
elm.Ground()
```
Standard ground symbol (3 horizontal lines).

### Chassis Ground
```python
elm.GroundChassis()
```
Chassis/earth ground symbol.

### Dot (Junction)
```python
elm.Dot()
```
Filled circle indicating wire junction.

## Direction Methods

All elements support direction methods:

```python
elm.Resistor().right()   # Draw element going right (default)
elm.Resistor().left()    # Draw element going left
elm.Resistor().up()      # Draw element going up
elm.Resistor().down()    # Draw element going down
```

## Length

Control element length:

```python
elm.Line().right().length(2)      # Line of length 2 units
elm.Resistor().right().length(3)  # Resistor spanning 3 units
```

## Labeling

### Basic Label
```python
elm.Resistor().label('R₁')
```

### Label with Value
```python
elm.Resistor().label('R₁\n10kΩ')
```

### Label Position
```python
elm.Resistor().label('R₁', loc='top')     # Label on top
elm.Resistor().label('R₁', loc='bottom')  # Label on bottom
elm.Resistor().label('R₁', loc='left')    # Label on left
elm.Resistor().label('R₁', loc='right')   # Label on right
```

### Multiple Labels
```python
elm.Resistor().label('R₁', loc='top').label('10kΩ', loc='bottom')
```

## Anchors

Elements have anchor points for precise connections:

```python
# Store element reference
R1 = d.add(elm.Resistor().right().label('R₁'))

# Access anchors
R1.start  # Starting point
R1.end    # Ending point
R1.center # Center point
```

## Push/Pop for Branches

Create parallel branches:

```python
with schemdraw.Drawing() as d:
    d += elm.SourceV().up()
    d += elm.Line().right()

    d.push()  # Save current position
    d += elm.Resistor().down().label('R₁')
    d += elm.Line().left()
    d.pop()   # Return to saved position

    d += elm.Line().right()
    d += elm.Capacitor().down().label('C₁')
    d += elm.Line().left()
```

## At Method for Positioning

Position elements at specific anchors:

```python
R1 = d.add(elm.Resistor().right())
d.add(elm.Capacitor().down().at(R1.end))
```

## Drawing Configuration

```python
d.config(
    unit=3,           # Default element length
    fontsize=12,      # Text size
    font='sans-serif', # Font family
    lw=2,             # Line width
    color='black'     # Default color
)
```

## Saving

```python
d.save('circuit.svg')  # SVG format (recommended)
d.save('circuit.png')  # PNG format
d.save('circuit.pdf')  # PDF format
```

## Unicode Symbols for Labels

Common electrical symbols:
- Ω (Omega) - Ohms
- μ (Mu) - Micro prefix
- Δ (Delta) - Change/difference
- ∞ (Infinity)
- ± (Plus-minus)
- ₁₂₃ (Subscript numbers)

## Complete Example

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    # Power source
    d += elm.SourceV().up().label('V₁\n12V')

    # Top rail
    d += elm.Line().right().length(0.5)
    d += elm.Resistor().right().label('R₁\n1kΩ')
    d += elm.Inductor().right().label('L₁\n10mH')
    d += elm.Capacitor().right().label('C₁\n100μF')
    d += elm.Line().right().length(0.5)

    # Right side down
    d += elm.Line().down().length(3)

    # Bottom rail with ground
    d += elm.Ground()
    d += elm.Line().left().length(4.5)

    d.save('rlc_series.svg')
```
