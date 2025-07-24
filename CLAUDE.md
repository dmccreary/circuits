# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI Circuits Course repository - an educational website that teaches electronic circuits using generative AI tools. The site is built with MkDocs Material and contains interactive simulations, educational content, and AI-generated circuit diagrams.

Website: https://dmccreary.github.io/circuits/

## Build and Development Commands

```bash
# Build the site (generates static files in site/ directory)
mkdocs build

# Serve the site locally for development
mkdocs serve

# Deploy to GitHub Pages  
mkdocs gh-deploy
```

## Project Architecture

### Content Structure
- `docs/` - Main documentation content organized by sections:
  - `sections/` - Course chapters (intro, laws, diodes, transistors, etc.)
  - `prompts/` - AI prompt examples for various circuit tasks
  - `sims/` - Interactive circuit simulations with HTML/JS
  - `faq/` - Frequently asked questions
- `src/` - Source code utilities:
  - `graph/` - Knowledge graph generation tools (Python)
  - `embeddings/` - Circuit embedding generation
  - `plot-question-similarity/` - Question similarity analysis
- `data/` - CSV files with concept graphs, taxonomies, and circuit data
- `site/` - Generated static site (auto-built by MkDocs)

### Interactive Simulations
The course includes custom JavaScript simulations in `docs/sims/` and `docs/sections/`. These are standalone HTML/JS files that demonstrate:
- Circuit component behavior (resistors, capacitors, diodes)
- Interactive circuit diagrams
- Current-voltage plots
- Animated circuit elements

### AI Integration
- Prompts for generating circuit diagrams using CircuiTikZ/LaTeX
- Knowledge graph generation for circuit concepts
- Circuit similarity analysis using embeddings
- Interactive chatbot examples

### Configuration
- `mkdocs.yml` - Main site configuration with navigation, theme, and plugin settings
- Material theme with custom CSS/JS in `docs/css/` and `docs/js/`
- LaTeX/MathJax support for equations
- Google Analytics integration

## Development Notes

- Content is primarily Markdown with embedded HTML/JS for simulations
- No traditional package.json - this is a documentation site, not a Node.js project
- Python scripts in `src/` handle data processing and analysis
- Generated site deploys automatically to GitHub Pages via `mkdocs gh-deploy`