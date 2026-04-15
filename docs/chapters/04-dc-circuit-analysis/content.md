---
title: Chapter 4 Content — DC Circuit Analysis Methods
description: Teaching content for Chapter 4 covering Thevenin, Norton, source transformation, maximum power transfer, and two-port networks
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 4 — DC Circuit Analysis Methods

<h2 id="41-source-transformation" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.1 Source Transformation</h2>

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

<h2 id="42-thevenins-theorem" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.2 Thévenin's Theorem</h2>

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

---

<h2 id="43-nortons-theorem" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.3 Norton's Theorem</h2>

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

<h2 id="44-maximum-power-transfer" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.4 Maximum Power Transfer</h2>

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

<h2 id="45-nodal-analysis-advanced" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.5 Advanced Nodal and Mesh Analysis</h2>

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

---

<h2 id="46-two-port-networks" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.6 Two-Port Networks</h2>

A **two-port network** is a circuit viewed from two pairs of terminals: an input port and an output port. This is the standard model for amplifiers, filters, and any device with a defined input and output.

At the input port: voltage \(V_1\), current \(I_1\) (entering).  
At the output port: voltage \(V_2\), current \(I_2\) (entering).

The two most common parameter sets are:

**Z-parameters (impedance parameters):**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\begin{bmatrix} V_1 \\ V_2 \end{bmatrix} = \begin{bmatrix} Z_{11} & Z_{12} \\ Z_{21} & Z_{22} \end{bmatrix} \begin{bmatrix} I_1 \\ I_2 \end{bmatrix}\]

</div>

**h-parameters (hybrid parameters):** Used for BJT transistor models.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\begin{bmatrix} V_1 \\ I_2 \end{bmatrix} = \begin{bmatrix} h_{11} & h_{12} \\ h_{21} & h_{22} \end{bmatrix} \begin{bmatrix} I_1 \\ V_2 \end{bmatrix}\]

</div>

---

<h2 id="47-input-output-resistance" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.7 Input Resistance, Output Resistance, and the Loading Effect</h2>

When you connect one circuit to another, they interact. This interaction — called the **loading effect** — is one of the most practically important phenomena in circuit design.

**Input resistance** (\(R_{in}\)) is the resistance seen looking into the input port of a circuit. Measured as \(R_{in} = V_{in} / I_{in}\) with the output port open.

**Output resistance** (\(R_{out}\)) is the Thévenin resistance seen looking back into the output port. Measured with all independent sources killed (but dependent sources remain).

**The loading effect in action:**

Suppose a source with Thévenin equivalent \(V_S = 10\) V, \(R_{out,source} = 1\) kΩ drives a load with \(R_{in,load} = 1\) kΩ. The voltage at the load is only 5 V — not 10 V — because the resistances form a voltage divider:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[V_{load} = V_S \times \frac{R_{in,load}}{R_{out,source} + R_{in,load}}\]

</div>

**Design principle:** To minimize loading:
- Make the source output resistance **much smaller** than the load input resistance: \(R_{out,source} \ll R_{in,load}\)
- This is why ideal voltage amplifiers have \(R_{out} \to 0\) and \(R_{in} \to \infty\)

---

<h2 id="48-chapter-summary" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.8 Chapter Summary</h2>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 28px; margin: 1rem 0;" markdown>

**Core theorems:**
- **Source transformation**: Voltage source + series R ↔ Current source + parallel R, with \(I_N = V_S / R\)
- **Thévenin's theorem**: Any linear two-terminal circuit = \(V_{Th}\) in series with \(R_{Th}\)
- **Norton's theorem**: Any linear two-terminal circuit = \(I_N\) in parallel with \(R_N\)
- Thévenin and Norton are interconvertible: \(V_{Th} = I_N R_N\), \(R_{Th} = R_N\)

**Maximum power transfer:**
- Occurs when \(R_L = R_{Th}\)
- Maximum power: \(P_{max} = V_{Th}^2 / (4 R_{Th})\)
- Efficiency is exactly 50% at this condition

**Dependent sources:**
- Must be kept active when finding \(R_{Th}\) (use test-source method)
- Express controlling variables in terms of node voltages or mesh currents

**Loading effect:**
- \(V_{load} = V_S \times R_{in,load} / (R_{out,source} + R_{in,load})\)
- Minimize by ensuring \(R_{out,source} \ll R_{in,load}\)

</div>

</div>
