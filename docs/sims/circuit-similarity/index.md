---
title: Circuit Similarity Map
description: Interactive 2D visualization of electrical circuits based on content similarity using D3.js.
quality_score: 85
image: /sims/circuit-similarity/circuit-similarity.png
og:image: /sims/circuit-similarity/circuit-similarity.png
---

# Circuit Similarity Map

<iframe src="main.html" width="100%" height="750px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/circuits/sims/circuit-similarity/main.html" width="100%" height="750px" scrolling="no"></iframe>
```

[Run the Circuit Similarity Map in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive 2D visualization of electrical circuits organized by their content similarity. Using dimensionality reduction techniques, circuits with similar characteristics are placed closer together on the map. The visualization helps students and educators explore relationships between different types of circuits.

Key features:

- Interactive scatter plot of circuit embeddings
- Color coding by category, complexity, type, or component count
- Size scaling based on complexity or component count
- Category filtering and minimum component filtering
- Zoom and pan navigation
- Hover tooltips with detailed circuit information
- Cluster statistics showing groups of related circuits

### How to Use

1. Use the **Color By** dropdown to change how circuits are colored
2. Use the **Size By** dropdown to change what determines dot size
3. Use **Filter Category** to show only specific circuit types
4. Adjust **Min Components** slider to filter by complexity
5. Hover over any dot to see detailed circuit information
6. Click **Zoom In/Out/Reset** buttons to navigate the visualization
7. Drag to pan around the visualization

## Lesson Plan

### Learning Objectives

After completing this lesson, students will be able to:

- Identify relationships between different circuit categories
- Understand how circuits can be grouped by similarity
- Analyze circuit complexity based on component count
- Compare and contrast different circuit types and their applications

### Target Audience

- Grade level: High school to college (grades 10-14)
- Prerequisites: Familiarity with basic circuit types and components

### Activities

1. **Exploration Activity**: Filter by different categories and observe which circuits cluster together. Why might similar circuits be grouped?

2. **Guided Investigation**: Compare circuit complexity across categories. Which category has the highest average complexity? Which has the simplest circuits?

3. **Extension Activity**: Research one circuit from each major cluster and explain why they might be considered "similar."

### Assessment

- Discussion question: Why might a voltage divider and LED circuit be placed near each other on the map?
- Reflection prompt: How could this similarity map help someone learning about electronics?
- Demonstrate understanding by explaining what "circuit embedding" means

## References

- [D3.js Documentation](https://d3js.org/) - JavaScript visualization library used
- [Dimensionality Reduction Techniques](https://en.wikipedia.org/wiki/Dimensionality_reduction) - Background on t-SNE and UMAP
- [Circuit Categories and Types](https://www.allaboutcircuits.com/) - Educational electronics resource
