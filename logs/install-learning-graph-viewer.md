# Learning Graph Viewer Installation Log

**Date:** 2026-01-30
**Skill Used:** book-installer (learning-graph-viewer.md reference)
**Project:** Circuits 1

## Summary

Installed an interactive learning graph viewer using vis-network.js to visualize the 300-concept learning graph for the Circuits 1 course.

## Prerequisites Verified

- `docs/learning-graph/learning-graph.json` exists (57,783 bytes)
- JSON contains metadata with title "Circuits 1"
- JSON contains 12 taxonomy groups with proper `classifierName` values

## Files Created

| File | Size | Description |
|------|------|-------------|
| `docs/sims/graph-viewer/main.html` | 2 KB | Main HTML application with sidebar layout |
| `docs/sims/graph-viewer/script.js` | 12 KB | vis-network visualization logic |
| `docs/sims/graph-viewer/local.css` | 7 KB | Sidebar, search, legend, and graph styling |
| `docs/sims/graph-viewer/index.md` | 1 KB | Documentation page with iframe embed |

## Customizations Applied

### 1. Physics Auto-Stop (User Request)

Modified `script.js` to stop physics simulation after 5 seconds to prevent endless spinning:

```javascript
// Stop physics after 5 seconds to prevent endless spinning
setTimeout(() => {
    network.setOptions({ physics: { enabled: false } });
}, 5000);

// Re-enable physics when dragging a node, disable when done
network.on('dragStart', function(params) {
    if (params.nodes.length > 0) {
        network.setOptions({ physics: { enabled: true } });
    }
});

network.on('dragEnd', function(params) {
    if (params.nodes.length > 0) {
        setTimeout(() => {
            network.setOptions({ physics: { enabled: false } });
        }, 1000);
    }
});
```

### 2. Legend Order (User Request)

Modified `buildLegend()` function in `script.js` to display categories in pedagogical order matching `concept-taxonomy.md`:

```javascript
const taxonomyOrder = ['FOUND', 'ANLYS', 'PASV', 'TRANS', 'ACFND', 'POWER', 'FREQ', 'FILT', 'OPAMP', 'SIGNAL', 'AUDIO', 'LAB'];

const sortedGroups = Object.entries(groups).sort((a, b) => {
    const indexA = taxonomyOrder.indexOf(a[0]);
    const indexB = taxonomyOrder.indexOf(b[0]);
    const orderA = indexA === -1 ? 999 : indexA;
    const orderB = indexB === -1 ? 999 : indexB;
    return orderA - orderB;
});
```

Legend order:
1. FOUND - Foundation Concepts
2. ANLYS - Circuit Analysis
3. PASV - Passive Components
4. TRANS - Transient Analysis
5. ACFND - AC Fundamentals
6. POWER - AC Power
7. FREQ - Frequency Response
8. FILT - Filters
9. OPAMP - Operational Amplifiers
10. SIGNAL - Signal Analysis
11. AUDIO - Audio Applications
12. LAB - Laboratory

## Navigation Updates

Added Graph Viewer to `mkdocs.yml` navigation under Learning Graph section:

```yaml
- Learning Graph:
  - Introduction: learning-graph/index.md
  - Graph Viewer: sims/graph-viewer/index.md
  - Concept List: learning-graph/concept-list.md
  ...
```

## User Modifications (Post-Install)

The user made additional modifications to:

- `docs/sims/graph-viewer/index.md` - Moved button and iframe to top, added template example
- `docs/learning-graph/index.md` - Added button link to graph viewer
- `mkdocs.yml` - Removed Graph Viewer from nav (kept in Learning Graph section only)

## Viewer Features

- **Search**: Type-ahead search with dropdown results showing category badges
- **Category Filtering**: 12 checkboxes with color swatches, Check All/Uncheck All buttons
- **Statistics**: Real-time counts of visible nodes (300), edges (627), foundational concepts (4)
- **Interactive Graph**: Pan, zoom, click to highlight connections
- **Collapsible Sidebar**: Toggle button to maximize graph viewing area
- **Physics Control**: Auto-stops after 5 seconds, re-enables during node drag

## Testing

To test the installation:

```bash
mkdocs serve
# Navigate to: http://127.0.0.1:8000/circuits/sims/graph-viewer/main.html
```

## Dependencies

- vis-network.js (loaded from CDN: `https://unpkg.com/vis-network/standalone/umd/vis-network.min.js`)
- learning-graph.json (loaded from relative path: `../../learning-graph/learning-graph.json`)
