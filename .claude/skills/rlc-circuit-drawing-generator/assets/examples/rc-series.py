"""
RC Series Circuit
A DC voltage source with resistor and capacitor in series.
Common for timing circuits and low-pass filters.
"""
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    # Voltage source (left side, vertical, positive on top)
    source = d.add(elm.SourceV().up().label('V₁\n12V'))

    # Short connecting wire
    d += elm.Line().right().length(0.5)

    # Resistor
    d += elm.Resistor().right().label('R₁\n10kΩ')

    # Capacitor
    d += elm.Capacitor().right().label('C₁\n100μF')

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

    d.save('rc-series.svg')
