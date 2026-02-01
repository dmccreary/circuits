# Audio Crossover Circuit Drawing Session Log

**Date:** 2026-01-30
**Status:** Partial Success - Layout challenges remain

## Objective

Create a professional-looking two-way audio crossover network schematic using Schemdraw for use in a LinkedIn post about the rlc-circuit-drawing-generator Claude Code skill.

## Circuit Requirements

- **Type:** 2nd Order Butterworth Crossover
- **Crossover Frequency:** ~3kHz
- **Load Impedance:** 8Ω speakers
- **Topology:**
  - High-pass: Series capacitor (C₁=4.7μF) + Shunt inductor (L₁=0.3mH) → Tweeter
  - Low-pass: Series inductor (L₂=0.6mH) + Shunt capacitor (C₂=4.7μF) → Woofer

## Iterations

### Attempt 1: Original Complex Design (INCORRECT)
- Had series L in high-pass path (wrong - blocks highs)
- Had series C in low-pass path (wrong - blocks lows)
- **Result:** Invalid filter topology

### Attempt 2: Corrected Topology, Vertical Layout
- Fixed filter topology (series C + shunt L for HP, series L + shunt C for LP)
- Used vertical layout with high-pass above, low-pass below main junction
- **Problem:** Wires from L₁ and Tweeter passed straight down through C₂ and Woofer
- Components visually overlapped

### Attempt 3: Routing L₁ Return Left
- Tried routing L₁ return wire left before going down
- **Problem:** Created long horizontal wire crossing through L₂

### Attempt 4: Routing L₁ Return Far Left (Past Source)
- Extended L₁ return to go past the source
- **Problem:** Created even longer horizontal wire through middle of diagram

### Attempt 5: Routing Tweeter Return Right
- Tried routing Tweeter return right then down to avoid Woofer
- **Problem:** Created hanging wire to the right

### Attempt 6: Back to Simple Vertical
- Reverted to simple straight-down connections
- **Problem:** Wires still cross through components below

### Attempt 7: Horizontal Layout (Current)
- Switched to horizontal layout (like reference image)
- High-pass path on top row
- Low-pass path on bottom row
- Speakers oriented horizontally (left to right)
- **Result:** Much cleaner, no component crossings
- **Remaining issue:** Ground rail positioning and connections

## Key Lessons Learned

1. **Vertical stacking creates crossing problems** - When paths are stacked vertically, return wires inevitably cross through components on other paths.

2. **Horizontal layout is cleaner for parallel paths** - Side-by-side layout (HP on top, LP on bottom) with horizontal component flow avoids most crossing issues.

3. **Schemdraw's `toy()` and `tox()` methods** - Useful for aligning endpoints but can create unintended wire paths.

4. **Push/pop stack management** - Critical for branching circuits but easy to lose track of position.

5. **Ground symbol placement matters** - Affects visual balance and can interfere with other components.

## Final Layout Structure

```
           C₁           Tweeter
    ┌──────┤├──────●───────/\/\/───────┐
    │              │                   │
    │             ┴┴┴ L₁               ⏚
    │              │
    ●              ⏚
    │
    │      L₂              Woofer
    ├──────))))────●───────/\/\/───────┐
    │              │                   │
   (~)            ═╪═ C₂               │
    │              │                   │
    │              │                   │
    └──────────────┴───────────────────┘
                   ⏚
```

## Files Modified

- `/Users/dan/Documents/ws/circuits/docs/circuits/schemadraw/audio-crossover.py`
- `/Users/dan/Documents/ws/circuits/docs/circuits/schemadraw/audio-crossover.svg`
- `/Users/dan/Documents/ws/circuits/docs/circuits/schemadraw/index.md`

## Recommendations for Future

1. **Start with horizontal layouts** for circuits with parallel signal paths
2. **Plan wire routing before coding** - sketch the layout first
3. **Use explicit coordinates** for complex routing instead of relative positioning
4. **Consider Schemdraw's `at()` method** for precise component placement
5. **Test with simple circuits first** before attempting complex multi-path designs

## Conclusion

The circuit is now electrically correct and the horizontal layout is much cleaner than the vertical attempts. Some visual refinements may still be needed for a polished social media post, but the fundamental layout challenges have been addressed by switching from vertical to horizontal orientation.
