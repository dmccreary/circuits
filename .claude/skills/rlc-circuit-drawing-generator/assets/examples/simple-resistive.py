"""
Simple Resistive Circuit (Vertical Layout)
A DC voltage source with a single resistor.
"""
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    # Voltage source (left side, vertical, positive on top)
    source = d.add(elm.SourceV().up().label('V₁\n12V'))

    # Top rail to the right
    d += elm.Line().right().length(5).at(source.end)

    # Resistor vertical on right side
    d += elm.Resistor().down().label('R₁  1kΩ')

    # Return path with ground
    d += elm.Line().left().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)

    d.save('simple-resistive.svg')
