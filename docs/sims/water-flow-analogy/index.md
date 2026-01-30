---
title: Water Flow Analogy MicroSim
description: Interactive simulation comparing water flow in pipes to electric current in wires, demonstrating voltage-pressure and current-flow rate analogies.
quality_score: 90
image: /sims/water-flow-analogy/water-flow-analogy.png
og:image: /sims/water-flow-analogy/water-flow-analogy.png
---

# Water Flow Analogy MicroSim

<iframe src="main.html" width="100%" height="502px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/circuits/sims/water-flow-analogy/main.html" width="100%" height="502px" scrolling="no"></iframe>
```

[Run the Water Flow Analogy MicroSim in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides a visual comparison between water flowing through pipes and electric current flowing through wires. The split-screen design shows both systems side-by-side, making the analogy concrete and intuitive.

**Key Analogies Demonstrated:**

| Water System | Electrical System | Relationship |
|--------------|------------------|--------------|
| Pump | Battery | Energy source |
| Water Pressure (PSI) | Voltage (V) | Driving force |
| Flow Rate (L/s) | Current (mA) | Rate of flow |
| Pipe Diameter | Wire Gauge | Resistance to flow |
| Pressure Gauge | Voltmeter | Measures driving force |
| Flow Meter | Ammeter | Measures flow rate |

**Interactive Features:**

- **Pressure/Voltage Slider**: Adjust from 1-12 units to see how increased pressure/voltage increases flow
- **Pipe/Wire Size**: Choose narrow, medium, or wide to see how resistance affects flow
- **Animation Toggle**: Turn particle animation on/off to observe or pause the simulation
- **Reset Button**: Return to default settings

### How to Use

1. Observe both systems running simultaneously with default settings
2. Increase the **Pressure/Voltage** slider and watch both flow rates increase proportionally
3. Change the **Pipe/Wire Size** to see how wider conductors allow more flow
4. Notice that the pump instantly affects flow throughout the water system, just as voltage changes instantly affect current
5. Toggle animation off to examine the particle positions

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

- Explain how electric current flow is analogous to water flow in pipes
- Compare voltage to water pressure as the driving force for flow
- Compare current to flow rate as a measure of how much flows per unit time
- Describe how conductor size (wire gauge) affects current flow similar to pipe diameter affecting water flow
- Predict how changes in voltage or resistance will affect current

### Target Audience

- College freshmen/sophomores in introductory circuits courses
- High school physics students (grades 11-12)
- Prerequisites: Basic understanding of water flow concepts

### Activities

1. **Prediction Activity**: Before adjusting controls, have students predict what will happen when pressure is doubled. Then test their prediction.

2. **Data Collection**: Record flow rate values for different pressure/diameter combinations. Create a table showing the relationships.

3. **Discussion Questions**:
    - Why does a wider pipe allow more water to flow?
    - If you could only see the flow meters/ammeters, could you tell which system is water vs electrical?
    - What happens at the "instant" you turn on the pump? Does water immediately flow at the outlet?

4. **Extension Activity**: Discuss the limitations of the water analogy. Where does it break down? (Hint: electrons don't actually travel fast through wires like water through pipes)

### Assessment

**Formative Questions:**

- What does increasing the pump pressure correspond to in the electrical circuit?
- If you want more current to flow but can't change the voltage, what could you change?
- Why do the particles move slowly but the effect is instant throughout the circuit?

**Reflection Prompt:**

Write a short paragraph explaining to a friend how understanding water in pipes helps you understand electricity.

## Technical Notes

The simulation demonstrates several important physics concepts:

1. **Ohm's Law analog**: Flow rate is proportional to pressure (V = IR becomes Flow = Pressure/Resistance)
2. **Resistance analog**: Narrower pipes/wires have higher resistance, reducing flow for the same pressure
3. **Drift velocity vs signal speed**: Particles move slowly, but the "push" propagates instantly throughout the system

## References

- [Khan Academy: Circuits](https://www.khanacademy.org/science/physics/circuits-topic) - Foundational circuit concepts
- [PhET Circuit Construction Kit](https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc) - Interactive circuit simulations
- [p5.js Reference](https://p5js.org/reference/) - Documentation for the JavaScript library used
- Chapter 1: [Electric Charge and Basic Circuit Quantities](../../chapters/01-electric-charge-basic-quantities/index.md) - Course chapter using this MicroSim
