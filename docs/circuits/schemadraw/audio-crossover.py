"""
Two-Way Audio Crossover Network (2nd Order Butterworth)
Horizontal layout - high-pass on top, low-pass on bottom.
Crossover frequency: ~3kHz for 8Ω speakers

Correct topology:
- High-pass: Series capacitor + Shunt inductor (passes highs to tweeter)
- Low-pass: Series inductor + Shunt capacitor (passes lows to woofer)

Component values for 3kHz crossover, 8Ω load (Butterworth Q=0.707):
- HP: C = 4.7μF, L = 0.3mH
- LP: L = 0.6mH, C = 4.7μF
"""
import schemdraw
import schemdraw.elements as elm

with schemdraw.Drawing() as d:
    d.config(unit=3, fontsize=11)

    # Audio input source (left side)
    source = d.add(elm.SourceSin().up().label('Audio\nInput'))

    # Top rail from source positive
    d += elm.Line().right().length(1).at(source.end)
    d += elm.Dot()
    d.push()

    # === HIGH PASS PATH (top) ===
    d += elm.Line().up().length(1.5)
    d += elm.Capacitor().right().label('C₁  4.7μF')

    # Shunt inductor
    d += elm.Dot()
    d.push()
    d += elm.Inductor().down().label('L₁  0.3mH')
    d += elm.Dot()
    d.pop()

    # Tweeter
    d += elm.Line().right().length(1)
    d += elm.Resistor().right().label('Tweeter 8Ω')
    d += elm.Line().down().length(1.5)
    d += elm.Ground()

    # Back to junction
    d.pop()

    # === LOW PASS PATH (bottom) ===
    d += elm.Line().down().length(1.5)
    d += elm.Inductor().right().label('L₂  0.6mH')

    # Shunt capacitor
    d += elm.Dot()
    d.push()
    d += elm.Capacitor().down().label('C₂  4.7μF')
    d += elm.Ground()
    d.pop()

    # Woofer
    d += elm.Line().right().length(1)
    d += elm.Resistor().right().label('Woofer 8Ω')
    d += elm.Line().down().length(3)

    # Bottom return rail with ground
    d += elm.Line().left().tox(source.start)
    d += elm.Ground()
    d += elm.Line().up().toy(source.start)

    d.save('audio-crossover.svg')
