# Circuits Course Concept Dependency Graph

[HTML Page for Dependency Graph](./dep-graph.html)

## Adjusting Visualization

In the [JavaScript](script.js) file you can change the display options.
Here is the portion of the JavaScript that changes the options.

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
```

## Left to Right Layout

[HTML Page for Dependency Graph](./lr-layout.html)

```js
var options = {
layout: {
        hierarchical: {
          direction: 'LR',  // Left to right
          sortMethod: 'directed',  // Sort nodes based on dependencies
          nodeSpacing: 200,  // Adjust spacing if needed
          levelSeparation: 150  // Adjust for horizontal space between levels
        }
      }
}
```

## Full Layout Options

```js
layout: {
    randomSeed: undefined,
    improvedLayout:true,
    clusterThreshold: 150,
    hierarchical: {
      enabled:false,
      levelSeparation: 150,
      nodeSpacing: 100,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
      direction: 'LR',        // UD, DU, LR, RL
      sortMethod: 'hubsize',  // hubsize, directed
      shakeTowards: 'leaves'  // roots, leaves
    }
  }
  ```

## Hierarchical Layout User Defined
https://visjs.github.io/vis-network/examples/network/layout/hierarchicalLayoutUserdefined.html

```js
  var options = {
          edges: {
            smooth: {
              type: "cubicBezier",
              forceDirection:
                directionInput.value == "UD" || directionInput.value == "DU"
                  ? "vertical"
                  : "horizontal",
              roundness: 0.4,
            },
          },
          layout: {
            hierarchical: {
              direction: directionInput.value,
            },
          },
          physics: false,
        };
```

  [Vis.js Network Layout Methods](https://visjs.github.io/vis-network/docs/network/#methodLayout)