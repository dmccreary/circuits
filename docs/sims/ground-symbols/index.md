---
title: Ground Symbol Reference Guide
description: Interactive reference guide for identifying and distinguishing between different ground symbols used in circuit schematics
quality_score: 85
image: /sims/ground-symbols/ground-symbols.png
og:image: /sims/ground-symbols/ground-symbols.png
twitter:image: /sims/ground-symbols/ground-symbols.png
social:
   cards: false
---
# Ground Symbol Reference Guide

<iframe src="main.html" height="422px" width="100%" scrolling="no"></iframe>

[Run the Ground Symbols MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

[Edit the Ground Symbols MicroSim with the p5.js editor](https://editor.p5js.org/)

## Embedding in Your Course

Place the following line in your website to include this MicroSim in your course:

```html
<iframe src="https://dmccreary.github.io/circuits/sims/ground-symbols/main.html" height="422px" width="100%" scrolling="no"></iframe>
```

## Description

This interactive reference guide helps students identify and distinguish between the six most common ground symbols used in circuit schematics:

1. **Earth Ground** - Three decreasing horizontal lines, representing connection to physical earth
2. **Chassis Ground** - Similar to earth ground with diagonal accents, indicating connection to equipment enclosure
3. **Signal Ground** - Downward-pointing triangle, used as a common reference in signal circuits
4. **Digital Ground (DGND)** - Triangle with "D", dedicated reference for digital circuits
5. **Analog Ground (AGND)** - Triangle with "A", dedicated reference for sensitive analog circuits
6. **Common Ground** - Horizontal line with vertical serifs, general circuit reference point

### How to Use

**Reference Mode (default):**
- Hover over any symbol to see its full name and description
- The info panel appears at the bottom showing usage context

**Quiz Mode:**
- Click "Quiz Mode" to test your knowledge
- A symbol will be highlighted with "???" as its label
- Click on the correct symbol from memory
- Track your score as you practice

## Lesson Plan

### Learning Objectives

By the end of this lesson, students will be able to:

1. Identify the six common ground symbols used in circuit schematics
2. Distinguish between earth ground, chassis ground, and signal ground
3. Explain when digital and analog grounds are kept separate
4. Recognize ground symbols in real circuit diagrams

### Suggested Activities

**Activity 1: Symbol Recognition (5 minutes)**

- Have students hover over each symbol to read the descriptions
- Discuss why different ground types exist
- Ask students to identify which they've seen before

**Activity 2: Quiz Challenge (5 minutes)**

- Students enter Quiz Mode and answer 10 questions
- Goal: achieve 8/10 or better
- Discuss any symbols that were commonly confused

**Activity 3: Real Schematic Hunt (10 minutes)**

- Provide students with actual circuit schematics (audio amplifier, microcontroller board, etc.)
- Have them identify and label all ground symbols
- Discuss why certain ground types were chosen for each application

### Assessment Questions

1. What is the difference between earth ground and chassis ground?
2. Why might a circuit have separate AGND and DGND symbols?
3. In what type of circuit would you most likely see a signal ground (triangle symbol)?
4. What does the earth ground symbol represent physically?

### Common Misconceptions

- **All grounds are the same** - Different ground symbols indicate different reference points that may or may not be connected
- **Ground means zero voltage** - Ground is a *reference* point defined as 0V; actual potential may vary
- **Earth ground is always required** - Many battery-powered devices have no earth connection at all

## Technical Details

- **Framework**: p5.js 1.11.10
- **Canvas Size**: Width-responsive, 420px height (370px draw + 50px controls)
- **Interaction**: Hover for details, click in quiz mode
- **Accessibility**: Screen reader description included

## References

- [Electrical Ground](../../chapters/01-electric-charge-basic-quantities/index.md#electrical-ground-the-reference-point) - Course chapter section on ground
- [Circuit Schematic Symbols](../../chapters/01-electric-charge-basic-quantities/index.md#circuit-schematic-symbols-the-language-of-circuits) - Full symbol reference
- [p5.js Reference](https://p5js.org/reference/) - JavaScript library documentation
