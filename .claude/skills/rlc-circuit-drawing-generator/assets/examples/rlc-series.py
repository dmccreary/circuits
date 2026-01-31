"""
RLC Series Circuit (Vertical Layout)
A DC voltage source with resistor, inductor, and capacitor in series.
The fundamental resonant circuit for studying oscillations and damping.
"""
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    # Voltage source (left side, vertical, positive on top)
    source = d.add(elm.SourceV().up().label('V₁\n12V'))

    # Top rail to the right
    d += elm.Line().right().length(5).at(source.end)

    # Components vertical on right side
    d += elm.Resistor().down().label('R₁  100Ω')
    d += elm.Inductor().down().label('L₁  10mH')
    d += elm.Capacitor().down().label('C₁  1μF')

    # Return path with ground
    d += elm.Line().left().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)

    d.save('rlc-series.svg')
