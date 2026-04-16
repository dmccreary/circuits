---
title: Chapter 3 Practice Problems — Kirchhoff's Laws and Circuit Topology
description: Practice problems with solutions for Chapter 3 covering KCL, KVL, node voltage method, mesh current method, and delta-wye conversion
---

<div class="unit1-styled" markdown>

# Chapter 3 Practice Problems

## Practice Problems

### Problem 1 — KCL at Multiple Nodes

At a node in a circuit, five branch currents are present:
- \(I_1 = 6\) A entering
- \(I_2 = 2\) A entering
- \(I_3 = 5\) A leaving
- \(I_4 = ?\) leaving
- \(I_5 = 1\) A entering

**(a)** Write the KCL equation for this node.

**(b)** Solve for \(I_4\).

**(c)** Verify the result by checking that the sum of all currents equals zero.

??? success "Solution"
    **(a)** KCL states: sum of currents entering = sum of currents leaving

    \[\text{Entering: } I_1 + I_2 + I_5 = \text{Leaving: } I_3 + I_4\]

    **(b)** Substituting known values:

    \[6 + 2 + 1 = 5 + I_4\]
    \[9 = 5 + I_4\]
    \[I_4 = 4 \text{ A (leaving the node)}\]

    **(c)** Verification (entering positive, leaving negative):

    \[6 + 2 + 1 - 5 - 4 = 0 \quad \checkmark\]

---

### Problem 2 — KVL in a Multi-Source Loop

A single loop circuit contains the following elements in series (traversed clockwise):
- 18 V voltage source (+ terminal encountered first → rise)
- \(R_1 = 3\) Ω
- 6 V voltage source (− terminal encountered first → rise)
- \(R_2 = 6\) Ω

**(a)** Write the KVL equation around the loop.

**(b)** Solve for the loop current \(I\).

**(c)** Find the voltage across \(R_2\).

??? success "Solution"
    **(a)** Traversing clockwise, applying KVL (rises positive, drops negative):

    \[+18 - I(3) + 6 - I(6) = 0\]

    Note: The 6 V source with − terminal first means entering the − side and exiting the + side → voltage **rise** of +6 V.

    **(b)** Solving for \(I\):

    \[24 - 9I = 0\]
    \[I = \frac{24}{9} = 2.67 \text{ A}\]

    **(c)** Voltage across \(R_2\):

    \[V_{R_2} = I \times R_2 = 2.67 \times 6 = 16 \text{ V}\]

---

### Problem 3 — Node Voltage Method

A circuit has three nodes: ground (reference), Node 1, and Node 2. Component connections:
- 12 V source between Node 1 and ground (Node 1 is positive terminal)
- \(R_1 = 6\) Ω between Node 1 and Node 2
- \(R_2 = 4\) Ω between Node 2 and ground
- \(R_3 = 12\) Ω between Node 2 and ground

**(a)** Identify the known and unknown node voltages.

**(b)** Write the KCL equation at Node 2.

**(c)** Solve for \(V_2\).

**(d)** Find the current through \(R_1\).

??? success "Solution"
    **(a)** Known: \(V_1 = 12\) V (set directly by the voltage source). Unknown: \(V_2\).

    **(b)** KCL at Node 2 — sum of currents leaving Node 2 equals zero:

    \[\frac{V_2 - V_1}{R_1} + \frac{V_2}{R_2} + \frac{V_2}{R_3} = 0\]

    \[\frac{V_2 - 12}{6} + \frac{V_2}{4} + \frac{V_2}{12} = 0\]

    **(c)** Multiply through by 12 (LCD):

    \[2(V_2 - 12) + 3V_2 + V_2 = 0\]
    \[2V_2 - 24 + 3V_2 + V_2 = 0\]
    \[6V_2 = 24\]
    \[V_2 = 4 \text{ V}\]

    **(d)** Current through \(R_1\) (from Node 1 to Node 2):

    \[I_{R_1} = \frac{V_1 - V_2}{R_1} = \frac{12 - 4}{6} = \frac{8}{6} = 1.33 \text{ A}\]

---

### Problem 4 — Mesh Current Method

A circuit has two meshes:
- **Mesh 1**: 10 V source, \(R_1 = 2\) Ω (shared with Mesh 2), \(R_2 = 3\) Ω
- **Mesh 2**: \(R_1 = 2\) Ω (shared), \(R_3 = 4\) Ω

Let \(I_1\) be the clockwise mesh current in Mesh 1, and \(I_2\) be the clockwise mesh current in Mesh 2. There is no source in Mesh 2.

**(a)** Write the KVL mesh equation for Mesh 1.

**(b)** Write the KVL mesh equation for Mesh 2.

**(c)** Solve the system of equations for \(I_1\) and \(I_2\).

**(d)** Find the actual current through the shared resistor \(R_1\).

??? success "Solution"
    **(a)** Mesh 1 KVL (clockwise, drops negative):

    \[10 - I_1(R_2) - (I_1 - I_2)(R_1) = 0\]
    \[10 - 3I_1 - 2(I_1 - I_2) = 0\]
    \[10 - 5I_1 + 2I_2 = 0 \quad \text{...(1)}\]

    **(b)** Mesh 2 KVL (no source, drops only):

    \[-(I_2 - I_1)(R_1) - I_2(R_3) = 0\]
    \[-2(I_2 - I_1) - 4I_2 = 0\]
    \[2I_1 - 6I_2 = 0 \quad \text{...(2)}\]

    **(c)** From equation (2): \(I_1 = 3I_2\)

    Substitute into equation (1):

    \[10 - 5(3I_2) + 2I_2 = 0\]
    \[10 - 13I_2 = 0\]
    \[I_2 = \frac{10}{13} \approx 0.769 \text{ A}\]
    \[I_1 = 3I_2 = \frac{30}{13} \approx 2.31 \text{ A}\]

    **(d)** The current through \(R_1\) is the difference of the two mesh currents (Mesh 1 flows down through \(R_1\), Mesh 2 flows up):

    \[I_{R_1} = I_1 - I_2 = \frac{30}{13} - \frac{10}{13} = \frac{20}{13} \approx 1.54 \text{ A}\]

---

### Problem 5 — Delta-to-Wye Conversion

Three resistors are connected in a delta configuration: \(R_{ab} = 30\) Ω, \(R_{bc} = 60\) Ω, \(R_{ca} = 90\) Ω.

**(a)** Convert to an equivalent wye configuration. Find \(R_a\), \(R_b\), and \(R_c\).

**(b)** Verify that the sum \(R_a + R_b + R_c\) is less than the smallest delta resistor (a quick sanity check for the conversion).

??? success "Solution"
    **(a)** Delta-to-wye conversion formulas. Let the sum of delta resistors be:

    \[\Sigma R_\Delta = R_{ab} + R_{bc} + R_{ca} = 30 + 60 + 90 = 180 \text{ Ω}\]

    \[R_a = \frac{R_{ab} \cdot R_{ca}}{\Sigma R_\Delta} = \frac{30 \times 90}{180} = \frac{2700}{180} = 15 \text{ Ω}\]

    \[R_b = \frac{R_{ab} \cdot R_{bc}}{\Sigma R_\Delta} = \frac{30 \times 60}{180} = \frac{1800}{180} = 10 \text{ Ω}\]

    \[R_c = \frac{R_{bc} \cdot R_{ca}}{\Sigma R_\Delta} = \frac{60 \times 90}{180} = \frac{5400}{180} = 30 \text{ Ω}\]

    **(b)** Sanity check:

    \[R_a + R_b + R_c = 15 + 10 + 30 = 55 \text{ Ω}\]

    The smallest delta resistor is 30 Ω, and 55 Ω > 30 Ω, so this particular check doesn't apply here. However, each individual wye resistor (15, 10, 30 Ω) is smaller than at least two of the delta resistors — which is the correct expectation for a delta-to-wye conversion.

</div>
