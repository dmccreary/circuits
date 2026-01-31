"""
RLC Parallel Circuit (Tank Circuit)
A voltage source with R, L, and C in parallel.
Used in radio frequency circuits and bandpass filters.
"""
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=12)

    # Voltage source (left side, vertical, positive on top)
    source = d.add(elm.SourceV().up().label('V₁\n12V'))

    # Connect to junction
    d += elm.Line().right().length(1)
    d += elm.Dot()

    # Top branch - Resistor (use default label positioning)
    d.push()
    d += elm.Resistor().right().label('R₁  1kΩ')
    d += elm.Dot()
    d.pop()

    # Middle branch - Inductor
    d += elm.Line().down().length(1.5)
    d += elm.Dot()
    d.push()
    d += elm.Inductor().right().label('L₁  10mH')
    d += elm.Dot()
    d += elm.Line().up().length(1.5)
    d.pop()

    # Bottom branch - Capacitor
    d += elm.Line().down().length(1.5)
    d += elm.Capacitor().right().label('C₁  100nF')
    d += elm.Line().up().length(3)

    # Continue to return path
    d += elm.Line().right().length(1)
    d += elm.Line().down().length(3)

    # Ground reference on return path
    d += elm.Ground()

    # Return wire toward source
    d += elm.Line().left().tox(source.start)

    # Connect up to source negative terminal
    d += elm.Line().up().toy(source.start)

    d.save('rlc-parallel.svg')
