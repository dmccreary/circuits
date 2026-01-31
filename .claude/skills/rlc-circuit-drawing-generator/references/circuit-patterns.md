# Circuit Topology Patterns

Common circuit patterns and their Schemdraw implementations.

**Important**:
- The ground symbol must be connected to the source negative terminal to form a complete circuit.
- Use `.label('text')` without `loc` parameter - Schemdraw's default positioning handles label placement intelligently.

## Pattern 1: Simple Single-Component Circuit

A voltage source with one component (resistor, capacitor, or inductor).

```
    ┌────[R₁]────┐
    │            │
   (+)           │
  (V₁)           │
   (-)           │
    │            │
    └─────⏚─────┘
```

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    # Voltage source (left side, vertical)
    source = d.add(elm.SourceV().up().label('V₁\n12V'))

    # Top component
    d += elm.Line().right().length(0.5)
    d += elm.Resistor().right().label('R₁\n1kΩ')
    d += elm.Line().right().length(0.5)

    # Return path
    d += elm.Line().down().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)  # Connect to source negative

    d.save('simple_resistor.svg')
```

## Pattern 2: Series RC Circuit

Resistor and capacitor in series.

```
    ┌────[R₁]────[C₁]────┐
    │                     │
   (+)                    │
  (V₁)                    │
   (-)                    │
    │                     │
    └─────────⏚──────────┘
```

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    source = d.add(elm.SourceV().up().label('V₁\n12V'))
    d += elm.Line().right().length(0.5)
    d += elm.Resistor().right().label('R₁\n10kΩ')
    d += elm.Capacitor().right().label('C₁\n100nF')
    d += elm.Line().right().length(0.5)
    d += elm.Line().down().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)  # Connect to source negative

    d.save('rc_series.svg')
```

## Pattern 3: Series RL Circuit

Resistor and inductor in series.

```
    ┌────[R₁]────[L₁]────┐
    │                     │
   (+)                    │
  (V₁)                    │
   (-)                    │
    │                     │
    └─────────⏚──────────┘
```

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    source = d.add(elm.SourceV().up().label('V₁\n12V'))
    d += elm.Line().right().length(0.5)
    d += elm.Resistor().right().label('R₁\n100Ω')
    d += elm.Inductor().right().label('L₁\n10mH')
    d += elm.Line().right().length(0.5)
    d += elm.Line().down().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)  # Connect to source negative

    d.save('rl_series.svg')
```

## Pattern 4: Series RLC Circuit

Full RLC series circuit - the fundamental resonant circuit.

```
    ┌────[R₁]────[L₁]────[C₁]────┐
    │                             │
   (+)                            │
  (V₁)                            │
   (-)                            │
    │                             │
    └─────────────⏚──────────────┘
```

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    source = d.add(elm.SourceV().up().label('V₁\n12V'))
    d += elm.Line().right().length(0.5)
    d += elm.Resistor().right().label('R₁\n100Ω')
    d += elm.Inductor().right().label('L₁\n10mH')
    d += elm.Capacitor().right().label('C₁\n1μF')
    d += elm.Line().right().length(0.5)
    d += elm.Line().down().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)  # Connect to source negative

    d.save('rlc_series.svg')
```

## Pattern 5: Parallel RC Circuit

Resistor and capacitor in parallel.

```
    ┌────┬────[R₁]────┬────┐
    │    │            │    │
   (+)   └────[C₁]────┘    │
  (V₁)                     │
   (-)                     │
    │                      │
    └──────────⏚──────────┘
```

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    source = d.add(elm.SourceV().up().label('V₁\n12V'))
    d += elm.Line().right().length(1)

    d.push()  # Save position for parallel branch
    d += elm.Resistor().right().label('R₁\n10kΩ')
    d.pop()   # Return to junction

    d += elm.Line().down().length(1.5)
    d += elm.Capacitor().right().label('C₁\n100nF')
    d += elm.Line().up().length(1.5)

    d += elm.Line().right().length(1)
    d += elm.Line().down().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)  # Connect to source negative

    d.save('rc_parallel.svg')
```

## Pattern 6: Parallel RLC Circuit (Tank Circuit)

LC tank circuit with damping resistor.

```
    ┌────┬────[R₁]────┬────┐
    │    │            │    │
    │    ├────[L₁]────┤    │
   (+)   │            │    │
  (V₁)   └────[C₁]────┘    │
   (-)                     │
    │                      │
    └──────────⏚──────────┘
```

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    source = d.add(elm.SourceV().up().label('V₁\n12V'))
    d += elm.Line().right().length(1)

    # First branch - Resistor
    d.push()
    d += elm.Resistor().right().label('R₁\n1kΩ')
    branch_end = d.here
    d.pop()

    # Second branch - Inductor
    d += elm.Line().down().length(1.5)
    d.push()
    d += elm.Inductor().right().label('L₁\n10mH')
    d += elm.Line().up().length(1.5)
    d.pop()

    # Third branch - Capacitor
    d += elm.Line().down().length(1.5)
    d += elm.Capacitor().right().label('C₁\n100nF')
    d += elm.Line().up().length(3)

    d += elm.Line().right().length(1)
    d += elm.Line().down().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)  # Connect to source negative

    d.save('rlc_parallel.svg')
```

## Pattern 7: AC Source with RLC

Same patterns work with AC source.

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    # Use SourceSin for AC
    source = d.add(elm.SourceSin().up().label('V₁\n120V\n60Hz'))
    d += elm.Line().right().length(0.5)
    d += elm.Resistor().right().label('R₁\n100Ω')
    d += elm.Inductor().right().label('L₁\n10mH')
    d += elm.Capacitor().right().label('C₁\n1μF')
    d += elm.Line().right().length(0.5)
    d += elm.Line().down().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)  # Connect to source negative

    d.save('rlc_ac.svg')
```

## Pattern 8: Voltage Divider

Two resistors creating a voltage divider.

```
    ┌────[R₁]────┬────[R₂]────┐
    │            │            │
   (+)          Vout          │
  (V₁)                        │
   (-)                        │
    │                         │
    └────────────⏚───────────┘
```

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    source = d.add(elm.SourceV().up().label('Vin\n12V'))
    d += elm.Line().right().length(0.5)
    d += elm.Resistor().right().label('R₁\n10kΩ')

    # Output tap point
    d += elm.Dot()
    d += elm.Line().down().length(0.75)
    d += elm.Line().right().length(1).label('Vout', loc='right')
    d += elm.Line().up().length(0.75)

    d += elm.Resistor().right().label('R₂\n10kΩ')
    d += elm.Line().right().length(0.5)
    d += elm.Line().down().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)  # Connect to source negative

    d.save('voltage_divider.svg')
```

## Pattern 9: With Ammeter

Adding current measurement to a circuit.

```python
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    source = d.add(elm.SourceV().up().label('V₁\n12V'))
    d += elm.Line().right().length(0.5)
    d += elm.Ammeter().right().label('A')
    d += elm.Resistor().right().label('R₁\n1kΩ')
    d += elm.Line().right().length(0.5)
    d += elm.Line().down().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)  # Connect to source negative

    d.save('with_ammeter.svg')
```

## Tips for Clean Layouts

1. **Default label positioning**: Use `.label('text')` without `loc` parameter - Schemdraw automatically positions labels based on element orientation
2. **Consistent spacing**: Use `length(0.5)` for short connecting wires
3. **Vertical source**: Always place voltage source vertically on the left
4. **Ground placement**: Put ground on the return path (bottom)
5. **Complete circuit**: Always connect the return path back to the source negative terminal using `.tox()` and `.toy()`
6. **Label formatting**: Use spaces (`R₁  10kΩ`) or newlines (`\n`) to separate name from value
7. **Unit scaling**: Use `d.config(unit=3)` for good proportions
8. **Push/Pop**: Use for parallel branches to return to junction points
9. **Store source reference**: Use `source = d.add(...)` to reference anchors later
