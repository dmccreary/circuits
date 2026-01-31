---
hide:
    - toc
---
# Schemdraw Test Table

<style>
table th:first-child, table td:first-child { width: 20%; }
table th:nth-child(2), table td:nth-child(2) { width: 45%; }
table th:nth-child(3), table td:nth-child(3) { width: 35%; }
</style>

| Description | Code | Diagram |
|-------------|------|---------|
| A 6V source with R=10kΩ and C=100μF in series (vertical layout) | `source = d.add(elm.SourceV().up().label('V₁\n6V'))`<br>`d += elm.Resistor().down().label('R₁  10kΩ')`<br>`d += elm.Capacitor().down().label('C₁  100μF')` | ![](./01-simple-rc.svg) |
| A 12V source with R=1kΩ and L=10mH in series (vertical layout) | `source = d.add(elm.SourceV().up().label('V₁\n12V'))`<br>`d += elm.Resistor().down().label('R₁  1kΩ')`<br>`d += elm.Inductor().down().label('L₁  10mH')` | ![](./02-simple-rl.svg) |
| A 10V AC source with R=100Ω, L=50mH, C=10μF in series | `source = d.add(elm.SourceSin().up().label('V₁\n10V'))`<br>`d += elm.Resistor().down().label('R₁  100Ω')`<br>`d += elm.Inductor().down().label('L₁  50mH')`<br>`d += elm.Capacitor().down().label('C₁  10μF')` | ![](./03-rlc-series.svg) |
| A 9V voltage divider with R₁=R₂=10kΩ (both vertical) | `d += elm.Resistor().down().label('R₁  10kΩ')`<br>`d += elm.Dot()`<br>`d.push()`<br>`d += elm.Line().right().label('Vout')`<br>`d.pop()`<br>`d += elm.Resistor().down().label('R₂  10kΩ')` | ![](./04-voltage-divider.svg) |
| A 5V AC RC low-pass filter with R=1kΩ, C=1μF | `source = d.add(elm.SourceSin().up().label('Vin\n5V'))`<br>`d += elm.Resistor().right().label('R₁  1kΩ')`<br>`d += elm.Dot()`<br>`d += elm.Capacitor().down().label('C₁  1μF')` | ![](./05-rc-lowpass.svg) |
