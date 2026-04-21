---
title: Chapter 4 Content — DC Circuit Analysis Methods
description: Teaching content for Chapter 4 covering Thevenin, Norton, source transformation, maximum power transfer, and two-port networks
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 4 — DC Circuit Analysis Methods

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

This chapter presents the most powerful methods for analyzing DC circuits: the node voltage method, the mesh current method, superposition, and the Thevenin and Norton equivalent circuit theorems. These techniques let engineers reduce complex networks to simple models and calculate any desired quantity without solving a full system of equations from scratch every time.

**Key Takeaways**

1. The node voltage and mesh current methods provide systematic procedures for setting up and solving the equations that describe any DC circuit.
2. The superposition theorem allows each independent source to be analyzed separately, with results added together to find the total response.
3. Thevenin's and Norton's theorems let you replace any linear network with a simple two-element equivalent, greatly simplifying load analysis and design.

</details>

## 4.1 Source Transformation

Every circuit has sources — things that push energy into the circuit. A **voltage source** forces a specific voltage across its terminals regardless of current. A **current source** forces a specific current through itself regardless of voltage. Here's the punchline: any practical source can be converted between these two forms without changing the behavior at the terminals.

This is **source transformation**, and it's the circuit equivalent of being ambidextrous. Sometimes a voltage source model is easier to work with; sometimes a current source model is. With source transformation, you get to choose.

**Voltage source → Current source:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[I_N = \frac{V_S}{R_S}\]

A voltage source \(V_S\) in series with \(R_S\) becomes a current source \(I_N = V_S / R_S\) in **parallel** with \(R_S\).

</div>

**Current source → Voltage source:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[V_{Th} = I_N \cdot R_P\]

A current source \(I_N\) in parallel with \(R_P\) becomes a voltage source \(V_{Th} = I_N \cdot R_P\) in **series** with \(R_P\).

</div>

!!! warning "Direction Matters"
    When transforming, the polarity of the voltage source and the direction of the current source must be consistent. The current arrow in the current source model should point from − to + *through* the source (the direction positive current would flow from the equivalent voltage source's positive terminal through the external circuit).

**Example:** A 12 V voltage source in series with a 4 Ω resistor transforms to a 3 A current source in parallel with 4 Ω. Verify: if you connect a 2 Ω load, the original gives \(I = 12/(4+2) = 2\) A; the transformed gives \(I_L = 3 \times 4/(4+2) = 2\) A. ✓

Source transformation is most powerful when you chain multiple transformations to consolidate sources — turning a complex network into something you can solve by inspection.

---

## 4.2 Thévenin's Theorem

Here is one of the most powerful ideas in all of circuit analysis: **any linear circuit with sources and resistors, viewed from two terminals, is electrically equivalent to a single voltage source \(V_{Th}\) in series with a single resistance \(R_{Th}\).**

This is **Thévenin's theorem**, published by Léon Charles Thévenin in 1883. It means that no matter how many components are inside a black box — dozens of resistors, multiple sources, complicated networks — it all collapses to just two elements from the perspective of whatever you connect to it.

**Finding \(V_{Th}\):**

Remove the load (open the terminals). \(V_{Th}\) equals the open-circuit voltage \(V_{oc}\) across those terminals.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[V_{Th} = V_{oc}\]

</div>

**Finding \(R_{Th}\) — three methods:**

1. **Kill all independent sources** (replace voltage sources with short circuits, current sources with open circuits), then calculate the resistance looking into the terminals.
2. **Short-circuit method**: Apply a test voltage \(V_T\) to the terminals and measure the resulting current \(I_T\), then \(R_{Th} = V_T / I_T\). Required when dependent sources are present.
3. **\(V_{oc}/I_{sc}\) method**: \(R_{Th} = V_{oc} / I_{sc}\), where \(I_{sc}\) is the short-circuit current (terminals shorted).

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[R_{Th} = \frac{V_{oc}}{I_{sc}}\]

</div>

**Thévenin procedure (step by step):**

1. Identify and label the two terminals A and B.
2. Remove the load connected between A and B.
3. Calculate \(V_{oc}\) using any analysis method (KVL, KCL, node voltage, etc.).
4. Kill all independent sources; calculate \(R_{Th}\) by looking into terminals A–B.
5. Draw the Thévenin equivalent: \(V_{Th}\) in series with \(R_{Th}\), with the load reconnected.

**Example:** Given a circuit with a 30 V source, R1 = 6 Ω, R2 = 4 Ω (R2 is across terminals A–B):

\(V_{Th} = 30 \times \frac{4}{6+4} = 12\) V.  
Kill the source (short): \(R_{Th} = 6 \| 4 \) ... wait, R2 is between A and B, so only R1 appears across terminals → \(R_{Th} = 6 \| \infty\) — actually \(R_{Th}\) = 6 Ω (R1 in parallel with the shorted source, R2 is the load, not part of the network).

The Thévenin equivalent is 12 V in series with 6 Ω.

#### Diagram: Thévenin's Theorem

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/thevenin-concept/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 4.3 Norton's Theorem

**Norton's theorem** is Thévenin's theorem wearing different clothes. It states that any linear circuit viewed from two terminals is equivalent to a **current source \(I_N\) in parallel with a resistance \(R_N\).**

The relationship between the two theorems is:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[I_N = I_{sc} = \frac{V_{Th}}{R_{Th}}\qquad R_N = R_{Th}\]

</div>

\(I_N\) equals the current that flows when the terminals are shorted together. \(R_N\) is found the same way as \(R_{Th}\) — kill all independent sources and find the resistance looking into the terminals.

**Norton procedure:**

1. Identify terminals A and B; remove the load.
2. Short the terminals A–B; calculate the current flowing through the short — this is \(I_N\).
3. Kill all independent sources; find \(R_N = R_{Th}\) looking into A–B.
4. Draw the Norton equivalent: \(I_N\) in parallel with \(R_N\), reconnect the load.

!!! tip "Thévenin or Norton?"
    Use **Thévenin** when the load is in series with other elements, or when you're interested in voltage. Use **Norton** when the load is in parallel with other elements, or when you're interested in current. You can always convert between them.

---

## 4.4 Maximum Power Transfer

How do you design a circuit to deliver the most power to a load? This question matters in audio amplifiers (delivering power to speakers), radio transmitters (delivering power to antennas), and sensor interfaces.

Using the Thévenin equivalent, the circuit looks like \(V_{Th}\) in series with \(R_{Th}\), connected to load \(R_L\). The power delivered to the load is:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[P_L = I^2 R_L = \left(\frac{V_{Th}}{R_{Th} + R_L}\right)^2 R_L\]

</div>

Taking the derivative with respect to \(R_L\) and setting it to zero yields the **maximum power transfer theorem**:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[R_L = R_{Th}\]

Maximum power transferred: \(\displaystyle P_{max} = \frac{V_{Th}^2}{4 R_{Th}}\)

</div>

The efficiency at maximum power transfer is exactly 50% — half the source power goes to the load, half is dissipated in \(R_{Th}\). This is fine for signal applications (you want *maximum power*, not efficiency) but unacceptable for power delivery applications (power companies would hate 50% efficiency).

**Example:** A source with \(V_{Th} = 10\) V and \(R_{Th} = 50\) Ω delivers maximum power when \(R_L = 50\) Ω. Maximum power: \(P_{max} = 100 / (4 \times 50) = 0.5\) W.

---

## 4.5 Advanced Nodal and Mesh Analysis

You encountered nodal analysis and mesh analysis in Chapter 3. This section extends those methods to handle circuits with dependent sources — a critically important capability for analyzing transistor and op-amp circuits.

**Dependent sources** produce a voltage or current that depends on some other voltage or current in the circuit. There are four types:

| Type | Symbol | Output |
|------|--------|--------|
| Voltage-Controlled Voltage Source (VCVS) | diamond | \(V_{out} = \mu V_x\) |
| Current-Controlled Voltage Source (CCVS) | diamond | \(V_{out} = r\, I_x\) |
| Voltage-Controlled Current Source (VCCS) | diamond | \(I_{out} = g_m V_x\) |
| Current-Controlled Current Source (CCCS) | diamond | \(I_{out} = \beta I_x\) |

**Nodal analysis with dependent sources:**

Treat the dependent source exactly like an independent source when writing KCL equations. But the controlling variable (\(V_x\) or \(I_x\)) must be expressed in terms of the node voltages — this is where the extra equation comes from.

**Steps:**
1. Assign node voltages (with a reference/ground node).
2. Write KCL at each non-reference node.
3. If a dependent source appears, express its controlling variable in terms of node voltages.
4. Solve the resulting system of equations.

**Mesh analysis with dependent sources:**

Similarly, write KVL around each mesh. Express any dependent source's control variable in terms of mesh currents. Solve the resulting system.

!!! tip "Counting Equations"
    Nodal analysis gives \(n-1\) equations for \(n\) nodes. Mesh analysis gives \(b - n + 1\) equations for \(b\) branches and \(n\) nodes. Choose whichever produces fewer equations for the circuit at hand.

#### Diagram: Nodal Analysis Steps

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/nodal-analysis-steps/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

#### Diagram: Mesh Analysis

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/mesh-analysis/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 4.6 Two-Port Networks

A **two-port network** is a circuit viewed from two pairs of terminals: an input port and an output port. This is the standard model for amplifiers, filters, and any device with a defined input and output.

At the input port: voltage \(V_1\), current \(I_1\) (entering).  
At the output port: voltage \(V_2\), current \(I_2\) (entering).

The sign convention is that currents \(I_1\) and \(I_2\) both flow *into* the positive terminal of each port. This consistent convention is what makes the parameter matrices work.

### Z-Parameters (Impedance Parameters)

The **Z-parameters** (also called open-circuit impedance parameters) express port voltages in terms of port currents:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\begin{bmatrix} V_1 \\ V_2 \end{bmatrix} = \begin{bmatrix} Z_{11} & Z_{12} \\ Z_{21} & Z_{22} \end{bmatrix} \begin{bmatrix} I_1 \\ I_2 \end{bmatrix}\]

</div>

Each parameter is measured with one port open-circuited:

| Parameter | Definition | Measurement |
|-----------|-----------|-------------|
| \(Z_{11}\) | \(V_1 / I_1\) with \(I_2 = 0\) | Input impedance, output open |
| \(Z_{12}\) | \(V_1 / I_2\) with \(I_1 = 0\) | Reverse transfer impedance |
| \(Z_{21}\) | \(V_2 / I_1\) with \(I_2 = 0\) | Forward transfer impedance |
| \(Z_{22}\) | \(V_2 / I_2\) with \(I_1 = 0\) | Output impedance, input open |

For a reciprocal (passive, no dependent sources) network: \(Z_{12} = Z_{21}\).

### Y-Parameters (Admittance Parameters)

The **Y-parameters** (short-circuit admittance parameters) are the inverse relationship — port currents expressed in terms of port voltages:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\begin{bmatrix} I_1 \\ I_2 \end{bmatrix} = \begin{bmatrix} Y_{11} & Y_{12} \\ Y_{21} & Y_{22} \end{bmatrix} \begin{bmatrix} V_1 \\ V_2 \end{bmatrix}\]

</div>

Each Y-parameter is measured with one port short-circuited (\(V = 0\)):

\[Y_{11} = \frac{I_1}{V_1}\bigg|_{V_2=0} \qquad Y_{21} = \frac{I_2}{V_1}\bigg|_{V_2=0}\]

Y-parameters are particularly useful for circuits connected in parallel, since the combined Y-matrix is just the sum of the individual matrices.

### h-Parameters (Hybrid Parameters)

**h-parameters** (hybrid parameters) mix input current and output voltage as independent variables — a natural description of how BJT transistors behave:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\begin{bmatrix} V_1 \\ I_2 \end{bmatrix} = \begin{bmatrix} h_{11} & h_{12} \\ h_{21} & h_{22} \end{bmatrix} \begin{bmatrix} I_1 \\ V_2 \end{bmatrix}\]

</div>

| Parameter | Definition | Meaning |
|-----------|-----------|---------|
| \(h_{11}\) (or \(h_i\)) | \(V_1/I_1\) with \(V_2 = 0\) | Input resistance (Ω) |
| \(h_{12}\) (or \(h_r\)) | \(V_1/V_2\) with \(I_1 = 0\) | Reverse voltage ratio (dimensionless) |
| \(h_{21}\) (or \(h_f\)) | \(I_2/I_1\) with \(V_2 = 0\) | Forward current gain \(\beta\) (dimensionless) |
| \(h_{22}\) (or \(h_o\)) | \(I_2/V_2\) with \(I_1 = 0\) | Output admittance (S) |

**Worked Example — Z-parameters of a T-network:**

A T-network has series impedances \(Z_A = 10\) Ω and \(Z_B = 20\) Ω, with shunt impedance \(Z_C = 30\) Ω between them.

- \(Z_{11} = Z_A + Z_C = 10 + 30 = 40\) Ω (input resistance with output open)
- \(Z_{22} = Z_B + Z_C = 20 + 30 = 50\) Ω (output resistance with input open)
- \(Z_{12} = Z_{21} = Z_C = 30\) Ω (reciprocal network — only the shunt element contributes to transfer impedance)

The Z-matrix is:

\[\mathbf{Z} = \begin{bmatrix} 40 & 30 \\ 30 & 50 \end{bmatrix} \text{ Ω}\]

!!! tip "Choosing a Parameter Set"
    Use **Z-parameters** for series-connected networks (matrices add). Use **Y-parameters** for parallel-connected networks (matrices add). Use **h-parameters** for transistor small-signal models (BJT datasheets list \(h_{fe}\), \(h_{ie}\), etc.).

---

## 4.7 Input Resistance, Output Resistance, and the Loading Effect

When you connect one circuit to another, they interact. This interaction — called the **loading effect** — is one of the most practically important phenomena in circuit design.

**Input resistance** (\(R_{in}\)) is the resistance seen looking into the input port of a circuit. Measured as \(R_{in} = V_{in} / I_{in}\) with the output port open.

**Output resistance** (\(R_{out}\)) is the Thévenin resistance seen looking back into the output port. Measured with all independent sources killed (but dependent sources remain).

### The General Loading Formula

Whenever a source drives a load through a series resistance, the delivered voltage is reduced by a voltage-divider ratio. Using the Thévenin equivalent of the source (\(V_{th}\), \(R_{th}\)) and the load resistance \(R_L\):

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[V_{out} = V_{th} \cdot \frac{R_L}{R_{th} + R_L}\]

</div>

This is the fundamental loading equation. When \(R_L \gg R_{th}\), the denominator approaches \(R_L\) and \(V_{out} \to V_{th}\) — no loading. When \(R_L = R_{th}\), the output drops to exactly half.

**The loading effect in action:**

Suppose a source with Thévenin equivalent \(V_{th} = 10\) V, \(R_{th} = 1\) kΩ drives a load with \(R_L = 1\) kΩ:

\[V_{out} = 10 \times \frac{1{,}000}{1{,}000 + 1{,}000} = 10 \times 0.5 = 5 \text{ V}\]

Half the voltage is lost inside the source resistance — a severe loading effect.

Now suppose the load is increased to \(R_L = 10\) kΩ:

\[V_{out} = 10 \times \frac{10{,}000}{1{,}000 + 10{,}000} = 10 \times \frac{10}{11} = 9.09 \text{ V}\]

Only 9% loss — acceptable in most designs.

### Worked Example: Voltage Divider Under Load

**Problem:** A voltage divider uses R1 = 8 kΩ and R2 = 2 kΩ from a 15 V supply. An instrument with input resistance \(R_{in} = 5\) kΩ is connected across R2. Find the loaded output voltage.

**Step 1 — Unloaded output (no instrument):**

\[V_{out,no load} = 15 \times \frac{2\,000}{8\,000 + 2\,000} = 15 \times 0.2 = 3.0 \text{ V}\]

**Step 2 — Thévenin resistance of the divider:**

Kill the source (short); R1 and R2 appear in parallel:

\[R_{th} = R1 \| R2 = \frac{8\,000 \times 2\,000}{8\,000 + 2\,000} = 1.6 \text{ k}\Omega\]

**Step 3 — Loaded output:**

\[V_{out,loaded} = V_{th} \cdot \frac{R_L}{R_{th} + R_L} = 3.0 \times \frac{5\,000}{1\,600 + 5\,000} = 3.0 \times 0.758 = 2.27 \text{ V}\]

The instrument loading has reduced the output by 24% — a significant measurement error. The fix: use an instrument with higher input resistance (\(R_{in} \gg R_{th}\)).

### Design Principle

To minimize loading:
- Make the source output resistance **much smaller** than the load input resistance: \(R_{th} \ll R_L\)
- This is why ideal voltage amplifiers have \(R_{out} \to 0\) and \(R_{in} \to \infty\)
- Rule of thumb: loading error is less than 10% when \(R_L > 9\, R_{th}\)

| \(R_L / R_{th}\) ratio | Voltage loss to loading |
|------------------------|------------------------|
| 1 (equal) | 50% |
| 9 | 10% |
| 99 | 1% |
| 999 | 0.1% |

---

## 4.8 Chapter Summary

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 28px; margin: 1rem 0;" markdown>

**Complete reference table — all theorems and key formulas:**

| Theorem / Technique | Purpose | Key Formula(s) |
|---------------------|---------|----------------|
| **Source Transformation** | Convert between voltage and current source models | \(I_N = V_S/R_S\); \(V_{Th} = I_N R_P\) |
| **Thévenin's Theorem** | Replace any linear network with \(V_{Th}\) + \(R_{Th}\) | \(V_{Th} = V_{oc}\); \(R_{Th} = V_{oc}/I_{sc}\) |
| **Norton's Theorem** | Replace any linear network with \(I_N\) ∥ \(R_N\) | \(I_N = I_{sc} = V_{Th}/R_{Th}\); \(R_N = R_{Th}\) |
| **Maximum Power Transfer** | Find \(R_L\) for greatest load power | \(R_L = R_{Th}\); \(P_{max} = V_{Th}^2/(4R_{Th})\) |
| **Nodal Analysis** | Systematic KCL-based solution | \(n-1\) equations for \(n\) nodes |
| **Mesh Analysis** | Systematic KVL-based solution | \(b-n+1\) equations; \(b\) branches, \(n\) nodes |
| **Superposition** | Handle multiple independent sources | \(x_{total} = x_1 + x_2 + \cdots\) (one source active at a time) |
| **Two-Port Z-Parameters** | Model input/output port behavior | \(\mathbf{V} = \mathbf{Z}\,\mathbf{I}\) |
| **Two-Port Y-Parameters** | Parallel network combination | \(\mathbf{I} = \mathbf{Y}\,\mathbf{V}\) |
| **Two-Port h-Parameters** | BJT transistor small-signal model | \(h_{21} = \beta\) (forward current gain) |
| **Loading Effect** | Voltage loss when source drives load | \(V_{out} = V_{th} \cdot R_L/(R_{th}+R_L)\) |

**Key rules to remember:**
- Thévenin and Norton are interconvertible: \(V_{Th} = I_N R_N\), \(R_{Th} = R_N\)
- Efficiency at maximum power transfer is exactly **50%** — acceptable for signals, not for power delivery
- Dependent sources must be kept alive when finding \(R_{Th}\) — use the test-source method
- Loading error < 10% when \(R_L > 9\,R_{th}\)
- Z-parameters: open-circuit measurement. Y-parameters: short-circuit measurement. h-parameters: mixed.

</div>

</div>
