"""
Two-Way Audio Crossover Network
Splits audio signal into high and low frequency paths for tweeter and woofer.
A practical application of series-parallel RLC combinations.
Crossover frequency: ~3kHz
"""
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=11)

    # Audio input source
    source = d.add(elm.SourceSin().up().label('Audio\nInput'))

    # Connect to main junction
    d += elm.Line().right().length(1.5).at(source.end)
    d += elm.Dot()
    d.push()

    # === HIGH PASS PATH (to Tweeter) - goes up ===
    d += elm.Line().up().length(2)

    # HP Filter: Series capacitor
    d += elm.Capacitor().right().label('C₁  4.7μF')

    # Series inductor for 2nd order
    d += elm.Inductor().right().label('L₁  0.3mH')

    # Shunt capacitor
    d += elm.Dot()
    d.push()
    d += elm.Capacitor().down().label('C₂\n3.3μF')
    d += elm.Dot()
    d.pop()

    # Tweeter (represented as resistor) - offset to the right
    d += elm.Line().right().length(2)
    d += elm.Resistor().down().label('Tweeter\n8Ω')

    # Connect tweeter return
    d += elm.Line().left().length(5)
    d += elm.Line().down().length(2)
    d += elm.Dot()

    # Return to junction
    d.pop()

    # === LOW PASS PATH (to Woofer) - goes down ===
    d += elm.Line().down().length(2)

    # LP Filter: Series inductor
    d += elm.Inductor().right().label('L₂  0.7mH')

    # Series capacitor for 2nd order
    d += elm.Capacitor().right().label('C₃  15μF')

    # Shunt inductor
    d += elm.Dot()
    d.push()
    d += elm.Inductor().down().label('L₃\n0.5mH')
    d += elm.Dot()
    d.pop()

    # Woofer (represented as resistor) - offset to the right
    d += elm.Line().right().length(2)
    d += elm.Resistor().down().label('Woofer\n8Ω')

    # Connect woofer return
    d += elm.Line().left().length(5)
    d += elm.Line().up().length(2)

    # Ground/return junction
    d += elm.Dot()
    d += elm.Ground()

    # Return to source
    d += elm.Line().left().tox(source.start)
    d += elm.Line().up().toy(source.start)

    d.save('audio-crossover.svg')
