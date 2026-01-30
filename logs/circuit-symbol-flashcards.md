# Circuit Symbol Flashcards MicroSim

**Created:** 2026-01-30
**Skill:** microsim-generator (p5-guide)
**Location:** `docs/sims/circuit-symbol-flashcards/`

## Summary

Created an interactive flashcard trainer for learning circuit schematic symbols with three learning modes, flip animation, category filtering, and quiz functionality.

## Files Created

| File | Purpose |
|------|---------|
| `circuit-symbol-flashcards.js` | Main p5.js simulation (~650 lines) |
| `main.html` | HTML wrapper with p5.js CDN |
| `index.md` | Documentation and lesson plan |
| `metadata.json` | Dublin Core metadata |

## Features Implemented

### Three Learning Modes

| Mode | Default | Behavior |
|------|---------|----------|
| **Learn** | Yes | Symbol with name displayed underneath; click for description overlay |
| **Flip** | No | Classic flashcard - flip to reveal name and description |
| **Quiz** | No | Self-assessment with score tracking |

### 16 Circuit Symbols (4 Categories)

**Passive (6 symbols):**
- Resistor (US style - zigzag)
- Resistor (EU style - rectangle)
- Capacitor (non-polarized)
- Polarized Capacitor (electrolytic)
- Inductor (coils)
- Switch (SPST)

**Sources (5 symbols):**
- DC Voltage Source
- AC Voltage Source
- Current Source
- Dependent Voltage Source (diamond)
- Dependent Current Source (diamond with arrow)

**Connections (4 symbols):**
- Earth Ground
- Signal Ground
- Wire Crossing (no connection)
- Wire Junction (with dot)

**Active (1 symbol):**
- Operational Amplifier (op-amp)

### Interactive Features

- Flip animation with visual card rotation
- Category filter (All, Passive, Sources, Connections, Active)
- Shuffle function for randomized practice
- Score tracking in Quiz mode
- Keyboard navigation (arrow keys, spacebar)
- Responsive width design

## Technical Details

- **Canvas Height:** 480px (drawHeight: 400 + controlHeight: 80)
- **Iframe Height:** 482px
- **Framework:** p5.js 1.11.10
- **Bloom Level:** Remember (L1) - appropriate for symbol recognition/recall

## Integration

- Added to `mkdocs.yml` navigation under MicroSims section
- Updated Chapter 1 iframe to correct height (482px)
- Specification in Chapter 1 details block references this MicroSim

## Symbol Drawing

All 16 symbols are drawn using custom p5.js functions within the MicroSim. These could potentially be added to `src/circuits-js-lib/p5-circuit-lib.js` in the future for reuse.

## Instructional Design

- **Learning Objective:** Students will identify common circuit schematic symbols and recall their names and functions
- **Pattern:** Flashcard trainer - proven effective for memorization tasks
- **Progressive Learning:** Learn → Flip → Quiz progression supports scaffolded learning
