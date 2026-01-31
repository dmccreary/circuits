"""
Simple Resistive Circuit
A DC voltage source with a single resistor.
"""
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    # Voltage source (left side, vertical, positive on top)
    source = d.add(elm.SourceV().up().label('V₁\n12V'))

    # Short connecting wire
    d += elm.Line().right().length(0.5)

    # Resistor - use default label positioning
    d += elm.Resistor().right().label('R₁  1kΩ')

    # Short connecting wire
    d += elm.Line().right().length(0.5)

    # Return path down
    d += elm.Line().down().length(3)

    # Ground reference on return path
    d += elm.Ground()

    # Return wire toward source
    d += elm.Line().left().tox(source.start)

    # Connect up to source negative terminal
    d += elm.Line().up().toy(source.start)

    d.save('simple-resistive.svg')
