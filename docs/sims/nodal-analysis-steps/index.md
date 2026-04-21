---
title: Nodal Analysis Step-Through
description: Animated step-by-step walkthrough of nodal analysis for a three-node circuit, showing KCL equation setup and solution
---

# Nodal Analysis Step-Through

<iframe src="main.html" width="100%"
    style="height:570px; display:block; border:none; border-radius:8px;"
    scrolling="no"></iframe>

## How to Use

- Press **Next Step** to walk through the nodal analysis procedure
- Each step highlights the active node and shows the KCL equation being applied
- The final steps display the solved node voltages and all branch currents

## What to Observe

- **Node identification**: one node is the reference (ground); remaining nodes get voltage variables
- **KCL at each node**: sum of currents leaving equals zero — currents expressed as (V_node − V_neighbor)/R
- **Matrix form**: the KCL equations form a symmetric conductance matrix
- **Verification**: branch currents confirm that KCL holds at every node
