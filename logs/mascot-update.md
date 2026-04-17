# Mascot System Update — Session Log

**Date:** 2026-04-16
**Branch:** main
**Primary commits:** `5751d02`, `46f5dc2`

## Context at session start

The repo already had a student-built five-character mascot cast —
**Rezi, Ohmy, Sparky, Cappy, Fusi** — wired into every chapter's
`content.md` via `<div class="mascot {name}" markdown>` blocks (added
in commit `b3ed3f0` on 2026-04-16 by the student team). These mascots
used line-art SVG icons (`rezi.svg`, `ohmy.svg`, `cappy.svg`,
`fusi.svg`, `sparky.svg`) under a `.mascot::before` pseudo-element
rule in `docs/css/mascots.css`.

A separate, newer effort to build a single-character **Sparky the
lightbulb** was partially in place: three PNG poses
(`sparky-welcome.png`, `sparky-thinking.png`, `sparky-tip.png`) and a
minimal `docs/learning-graph/mascot-test.md` that rendered them.
Several admonition class names (`mascot-welcome`, `mascot-thinking`,
etc.) existed in `docs/css/mascot.css` but had not been exercised
against real chapter content.

## What this session changed

### 1. Generated a complete Sparky pose library

Worked with Claude to author detailed image-generation prompts for
each pedagogical moment, then rendered them via my personal ChatGPT
account. The full set:

| File | Role |
|---|---|
| `welcome.png` | Chapter openers |
| `thinking.png` | Key insights / teaching moments |
| `tip.png` | Hints and shortcuts |
| `warning.png` | Common mistakes / cautions |
| `encouraging.png` | Before difficult sections |
| `celebration.png` | End-of-chapter payoffs |
| `neutral.png` | Default base pose (future logo/favicon candidate) |

**Footgun surfaced:** ChatGPT will silently return a white-matted PNG
even when the prompt forbids it. Mitigation is to open every prompt
with *"Please generate a new png image with a transparent background.
Do NOT use a white, black or checkered background"* and repeat the
requirement at the end.

### 2. Trimmed excess padding from every PNG

Every generated image came back with 30–40% empty transparent margin
around the character. Ran
`~/.claude/skills/book-installer/scripts/trim-padding-from-image.py`
against `docs/img/mascots/` — the script uses PIL to find the
alpha-channel bounding box and crop with a 4 px buffer. Results:

```
cropped celebration.png:  (1024, 1536) -> (895, 946)
cropped encouraging.png:  (1024, 1536) -> (548, 874)
cropped neutral.png:      (1024, 1536) -> (593, 898)
cropped thinking.png:     (1024, 1536) -> (837, 1229)
cropped tip.png:          (1024, 1536) -> (677, 823)
cropped warning.png:      (1024, 1536) -> (808, 957)
cropped welcome.png:      (1024, 1536) -> (839, 965)
```

The three earlier `sparky-*.png` files were not trimmed because they
have opaque near-white backgrounds rather than transparent alpha —
the alpha-threshold detector finds no padding. They would need to be
regenerated with true transparency, or trimmed by color detection.

### 3. Rebuilt the mascot test page

Expanded `docs/learning-graph/mascot-test.md` to demonstrate all seven
pose admonitions with representative body text, plus a boundary-test
grid (dashed blue border around each PNG) so padding issues are
visible at a glance.

Published: https://dmccreary.github.io/circuits/learning-graph/mascot-test/

### 4. Fixed CSS mismatches

- Renamed `.mascot-encourage` → `.mascot-encouraging` throughout
  `docs/css/mascot.css` (6 occurrences). The admonition markup used
  `mascot-encouraging`, so the block had been rendering with
  default/fallback admonition styling — small font, no background.
- Fixed `extra:` key in `mkdocs.yml`: `generate: false` →
  `generator: false`. The typo had been leaving the *"Made with
  Material for MkDocs"* footer line visible on every page.
- Fixed the broken Sparky icon repo-wide. `docs/css/mascots.css` was
  pointing `.mascot.sparky::before` at `sparky.svg`, which had been
  removed during cleanup. Repointed at `warning.png` so every student
  `<div class="mascot sparky">` box across all 15 chapter content
  files renders its icon again.
- Ported a header-logo sizing block from `../ecology/docs/css/extra.css`
  so the upper-left logo and favicon can be resized via a single
  `.md-header__button.md-logo img` rule. The neutral pose PNG is ready
  to wire in at the `logo:` / `favicon:` entries in `mkdocs.yml`.

### 5. New book-installer skill: mascot-chapter-updater

Added a new reference guide to the `book-installer` skill for
retrofitting existing chapters with the pose-based admonitions:

- `~/Documents/ws/claude-skills/skills/book-installer/references/mascot-chapter-updater.md`
- `~/Documents/ws/claude-skills/skills/book-installer/scripts/validate-chapter-mascots.py`
- Registered in `SKILL.md` as feature #35 with routing keywords,
  decision-tree entry, guide description, and a usage example.

The guide codifies the placement rules (≤6 admonitions per chapter,
singleton welcome and celebration, no back-to-backs, 1–3 sentences of
body text, voice-consistent prose) and walks Claude through the
survey → plan → confirm → edit → validate workflow.

The validator parses mascot admonitions out of a markdown file and
flags: total count over the cap, duplicate singletons, back-to-back
placements with no prose between, missing `<img>` tags, empty or
overlong body text. Smoke-tested against the mascot-test page
(correctly flagged its intentional back-to-backs — by design, since
it's a style guide, not a real chapter).

### 6. Sample retrofit — Chapter 1

Used the new guide to retrofit `docs/chapters/01-electric-charge-basic-quantities/content.md`
as a working demo of the two mascot systems coexisting.

**Added (new `!!! mascot-*` admonitions, 4 total, validator clean):**

| Pose | Location | Purpose |
|---|---|---|
| `mascot-welcome` | After chapter overview `<details>` | Sparky introduces himself and the chapter |
| `mascot-tip` | Wraps the "Not Everything Obeys Ohm's Law" callout | Ohmic vs non-ohmic caveat |
| `mascot-encouraging` | Before §1.13 Worked Example | Reassurance before the synthesis section |
| `mascot-celebration` | Before Chapter Summary | End-of-chapter payoff |

**Converted (student-system `<div class="mascot sparky">`):**

- `!!! warning "Safety First"` (§1.3) → now a Sparky warning box so
  high-voltage safety notes render with the character rather than the
  plain Material admonition.
- `!!! danger "Short Circuits Are Dangerous"` (§1.10) → same conversion
  for consistency.

**Untouched:** every existing Rezi, Ohmy, Cappy, Fusi, and Sparky
block authored by the students. The retrofit is purely additive.

Published: https://dmccreary.github.io/circuits/chapters/01-electric-charge-basic-quantities/content/

## Open questions / next steps

1. **Direction for Chapters 2–16.** Extend the pose-based system
   across all chapters, keep it as a Chapter-1-only demo, or use a
   hybrid (poses for welcome/celebration bookends, student cast for
   topical content)? Deferred to the team.
2. **Wire the neutral Sparky into `logo:` and `favicon:`.** The CSS
   and the trimmed PNG are ready; only the `mkdocs.yml` entries need
   to be updated.
3. **Regenerate the three legacy `sparky-*.png` files with true
   transparent backgrounds** so the alpha trimmer can shrink them
   too, or replace them outright with the new trimmed pose PNGs and
   delete the old filenames.
4. **Retrofit more chapters** using the new book-installer guide once
   direction is agreed.

## Commits

- `5751d02` — Add full Sparky mascot pose set and fix encouraging admonition
- `46f5dc2` — Demo Sparky mascot admonitions in Chapter 1 and fix broken Sparky icon
- (claude-skills) `dd9b35ab` — Add mascot-chapter-updater reference and validator to book-installer

Deployed to GitHub Pages: gh-pages `e106dfe`.

---

## Email sent to students and profs

**Subject:** Circuits Course Mascot System — Big Update + Chapter 1 Demo

Hi team,

First, a real congratulations to the four of you on the mascot system you built. The line-art SVG cast — **Rezi, Ohmy, Sparky, Cappy, and Fusi** — is genuinely clever work. Assigning each character a specific pedagogical role (Rezi for definitions, Ohmy for key formulas, Sparky for common mistakes, Cappy for intuition tips, Fusi for safety) turns the textbook into a guided experience rather than a wall of prose. You also wired the full cast into every chapter's `content.md` file, which gave me a clean, consistent baseline to build on. That's the kind of structural thinking that's hard to do well on a first pass.

### What we generated this week

I spent several Claude Code sessions filling out a complete image library for Sparky, the lightbulb character, as pedagogical-moment PNGs:

- `welcome.png` — chapter openers
- `thinking.png` — key insights
- `tip.png` — hints and shortcuts
- `warning.png` — common mistakes
- `encouraging.png` — before hard sections
- `celebration.png` — end-of-chapter payoffs
- `neutral.png` — default/base pose

One important thing to flag about the workflow: **Claude Code cannot actually generate PNG images on its own.** It can only write detailed text-to-image prompts, and those prompts then have to be run through a separate tool. I used my personal ChatGPT to render each pose, iterating on the prompts until character consistency held up across all seven images.

The single biggest headache was **transparent backgrounds** — ChatGPT will quietly hand you a white-matted PNG even when the prompt explicitly says not to. The fix was to start the base prompt with "*Please generate a new png image with a transparent background. Do NOT use a white, black, or checkered background*" and then repeat the transparency requirement at the end of every pose prompt.

### New tooling

- **A dedicated mascot test page.** Every pose, every admonition style, and a "boundary test" grid with a dashed blue border around each image so you can see exactly where the PNG ends and how much padding it's carrying:

  https://dmccreary.github.io/circuits/learning-graph/mascot-test/

- **A padding trimmer.** Generated PNGs typically come back with 30–40% empty transparent space around the character. I added a small Python script (`trim-padding-from-image.py` in the `claude-skills` repo) that uses PIL to find the alpha-channel bounding box and crop. Runs in seconds per image.

- **Header logo and favicon sizing CSS.** I ported a small block from the ecology project so we can swap in the neutral Sparky pose as the upper-left site logo and the browser favicon — one rule controls the header size. The neutral pose PNG is ready; wiring it into the `logo:` and `favicon:` entries in `mkdocs.yml` is the last step.

- **A `/book-installer` guide for retrofitting chapters.** New skill reference (`mascot-chapter-updater.md`) that walks Claude through surveying a chapter, proposing placement, and adding the new `!!! mascot-welcome`, `mascot-thinking`, `mascot-tip`, `mascot-warning`, `mascot-encouraging`, `mascot-celebration`, and `mascot-neutral` admonitions — with hard rules enforced by a validator script (≤6 per chapter, no back-to-backs, singleton welcome and celebration).

### Sample retrofit — Chapter 1

I used the new guide to demo how the pose-based Sparky system can live alongside your original cast:

https://dmccreary.github.io/circuits/chapters/01-electric-charge-basic-quantities/content/

On that page you'll see **both mascot systems coexisting**:

1. **Your original cast** (Rezi, Ohmy, Sparky-warning, Cappy, Fusi) stays exactly where you placed it — definitions, formulas, common-mistake callouts, pro tips, and safety warnings.
2. **The new pose-based Sparky admonitions** sit around your cast at pedagogical transition points: a welcome after the chapter overview, a tip for the "not everything obeys Ohm's Law" caveat, an encouragement before the worked example, and a celebration before the chapter summary.

I also fixed a bug that had been hiding the Sparky icon in every existing `<div class="mascot sparky">` box across all 15 chapters — the CSS was pointing at `sparky.svg`, which had been removed during cleanup. It now points at `warning.png`, so all your existing Sparky warning boxes render their icon correctly again.

**Nothing you wrote was deleted or rewritten.** The demo is purely additive so you can compare the two approaches on one page and decide where to go next.

### Two tooling recommendations for your own work

- **The new Claude Desktop app is much easier to use than the terminal CLI.** Same Claude Code engine underneath, but the inline diffs, clickable file links, built-in activity log, and skills picker make the experience noticeably smoother. There's a short learning curve — give yourself a couple of sessions before judging it — but it will save you real time.
- **Try Opus 4.7 for MicroSim development.** The new reasoning model is substantially better than 4.6 at the multi-step geometry, animation loops, and state-machine logic that MicroSims need. Switch with `/model`. I've seen it one-shot simulations that previously took three or four correction rounds.

### Office hours and 1-on-1s

I'm available for 1-on-1 calls if any of you want to walk through a specific chapter, a specific tool, or a specific design question — just email me a couple of time windows and I'll take the first one that works.

We'll also reconvene next week at our regular **2:30 and 3:30 office hours**. Bring anything you're stuck on.

Again — really good work on the original mascot design. The fact that your system was already clean enough for me to layer a second one on top without breaking anything says a lot about what you put together.

Best,
Dan
