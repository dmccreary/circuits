"""
Multi-Stage Bandpass Filter
A 3-stage LC ladder filter with input/output impedance matching.
Demonstrates complex series-parallel RLC combinations.
"""
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=11)

    # AC Voltage source
    source = d.add(elm.SourceSin().up().label('Vin\n10V'))

    # Source impedance
    d += elm.Line().right().length(0.5).at(source.end)
    d += elm.Resistor().right().label('Rs  50Ω')

    # Stage 1: Series L, Shunt C
    d += elm.Inductor().right().label('L₁  100μH')
    d += elm.Dot()
    d.push()
    d += elm.Capacitor().down().label('C₁  100pF')
    d += elm.Ground()
    d.pop()

    # Stage 2: Series L, Shunt parallel LC (resonant trap)
    d += elm.Inductor().right().label('L₂  100μH')
    d += elm.Dot()
    d.push()

    # Parallel LC trap
    d += elm.Line().down().length(0.75)
    d += elm.Dot()
    d.push()
    d += elm.Inductor().down().label('L₃\n50μH')
    d += elm.Dot()
    d.pop()
    d += elm.Line().right().length(1.5)
    d += elm.Capacitor().down().label('C₂\n200pF')
    d += elm.Line().left().length(1.5)
    d += elm.Ground()

    d.pop()

    # Stage 3: Series L, Shunt C
    d += elm.Inductor().right().label('L₄  100μH')
    d += elm.Dot()
    d.push()
    d += elm.Capacitor().down().label('C₃  100pF')
    d += elm.Ground()
    d.pop()

    # Load resistor
    d += elm.Resistor().right().label('RL  50Ω')
    d += elm.Dot()
    d.push()
    d += elm.Line().right().length(0.5).label('Vout', loc='right')
    d.pop()

    # Return to source
    d += elm.Line().down().length(2.25)
    d += elm.Ground()
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)

    d.save('bandpass-filter.svg')
