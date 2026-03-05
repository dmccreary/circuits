"""
RC Charging Circuit — Schemdraw schematic
DC voltage source charges a capacitor through a resistor via a switch.
Circuit: Vs → SW → R → C → GND
"""
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3.5, fontsize=13)

    # Voltage source (left side, vertical, positive terminal on top)
    source = d.add(elm.SourceV().up().label('Vs\n9 V'))

    # Top rail going right
    d += elm.Line().right().length(1.5).at(source.end)

    # Switch (SPST, normally open)
    d += elm.Switch().right().label('SW', loc='top')

    # Resistor going right
    d += elm.Resistor().right().label('R\n1 kΩ')

    # Junction dot before capacitor
    d += elm.Dot()

    # Capacitor going down on the right side
    d += elm.Capacitor().down().label('C\n1 μF')

    # Bottom rail back to ground and source
    d += elm.Line().left().length(3)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)

    d.save('rc-charging-diagram.svg')
