# Circuits Course Concept Dependency Graph

[HTML Page for Dependency Graph](./dep-graph.html)

## Adjusting Visualization

```js
var options = {
    nodes: {
        shape: 'dot',
        size: 10,
        font: {
            size: 14,
        },
    },
    edges: {
        arrows: 'to',
        smooth: true,
    },
    physics: {
        stabilization: false,
    },
};
``