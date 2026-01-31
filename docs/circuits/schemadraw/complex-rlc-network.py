"""
Complex RLC Network with Series and Parallel Sections
A multi-stage filter circuit demonstrating series and parallel combinations.
Perfect for showcasing Claude Code skill capabilities.
"""
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=11)

    # AC Voltage source (left side, vertical)
    source = d.add(elm.SourceSin().up().label('Vin\n120V AC\n60Hz'))

    # Top rail to the right
    d += elm.Line().right().length(1).at(source.end)

    # First stage: Series RL (input filter)
    d += elm.Resistor().right().label('R₁  100Ω')
    d += elm.Inductor().right().label('L₁  50mH')

    # Junction for parallel section
    d += elm.Dot()
    d.push()

    # Top parallel branch: RC series
    d += elm.Line().up().length(1.5)
    d += elm.Resistor().right().label('R₂  1kΩ')
    d += elm.Capacitor().right().label('C₁  10μF')
    d += elm.Line().down().length(1.5)
    d += elm.Dot()

    # Return to junction for bottom parallel branch
    d.pop()

    # Bottom parallel branch: LC series (resonant tank)
    d += elm.Line().down().length(1.5)
    d += elm.Inductor().right().label('L₂  100mH')
    d += elm.Capacitor().right().label('C₂  1μF')
    d += elm.Line().up().length(1.5)

    # Continue from merged point
    d += elm.Dot()
    d.push()

    # Output tap
    d += elm.Line().right().length(0.5)
    d += elm.Dot()
    d.push()
    d += elm.Line().right().length(1).label('Vout', loc='right')
    d.pop()

    # Final load section: parallel RC
    d += elm.Line().down().length(1.5)
    d += elm.Dot()
    d.push()

    # Load resistor branch
    d += elm.Resistor().down().label('R₃\n10kΩ\n(Load)')
    d += elm.Dot()
    d.pop()

    # Load capacitor branch (parallel to R3)
    d += elm.Line().right().length(2)
    d += elm.Capacitor().down().label('C₃  100nF')
    d += elm.Line().left().length(2)

    # Ground at load
    d += elm.Ground()

    # Return path back to source
    d += elm.Line().left().length(2)
    d.pop()

    # Connect back from the junction before output
    d += elm.Line().down().length(1.5)
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)

    d.save('complex-rlc-network.svg')
