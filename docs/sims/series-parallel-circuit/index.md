---
title: Series-Parallel Circuit Analysis
description: Interactive mixed series-parallel resistor network that lets students build and analyze circuits combining both topologies, showing step-by-step equivalent resistance reduction.
---

# Series-Parallel Circuit Analysis

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>

[Run in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim presents a series-parallel resistor network and walks through the systematic reduction to a single equivalent resistance. Adjust individual resistor values and observe how voltages and currents throughout the network update. The step-by-step reduction panel on the side explains each simplification, bridging the gap between the two basic topologies.

## Key Concepts

- **Series-parallel circuits** combine both topologies; reduction works by repeatedly collapsing parallel groups then series strings.
- Identify **parallel sub-groups** first, replace with \(R_{eq}\), then combine results in series.
- Node voltages and branch currents satisfy both KVL and KCL simultaneously.
- The same source voltage drives different currents through different paths.
- This technique extends to arbitrarily complex resistive networks by repeated application.

[Chapter 2 — Ohm's Law and Basic Configurations](../../chapters/02-ohms-law-basic-configurations/index.md)
