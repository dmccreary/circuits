"""
Simple Resistive Circuit
A DC voltage source with a single resistor.
"""
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    # Voltage source (left side, vertical, positive on top)
    d += elm.SourceV().up().label('V₁\n12V')

    # Short connecting wire
    d += elm.Line().right().length(0.5)

    # Resistor
    d += elm.Resistor().right().label('R₁\n1kΩ')

    # Short connecting wire
    d += elm.Line().right().length(0.5)

    # Return path down
    d += elm.Line().down().length(3)

    # Ground reference on return path
    d += elm.Ground()

    # Return wire to source negative terminal
    d += elm.Line().left().length(2)

    # Connect back up to source negative
    d += elm.Line().up().to(d.here)

    d.save('simple-resistive.svg')
