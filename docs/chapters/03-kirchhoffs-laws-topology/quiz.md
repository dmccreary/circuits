# Chapter 3 Quiz and Problems — Kirchhoff's Laws and Circuit Topology

## Multiple Choice Quiz

**1. Kirchhoff's Current Law (KCL) is a consequence of which fundamental principle?**

- [ ] A) Conservation of energy
- [ ] B) Conservation of charge
- [ ] C) Ohm's Law
- [ ] D) Conservation of momentum

??? success "Answer"
    **B) Conservation of charge.** KCL states that the algebraic sum of all currents at a node equals zero — no charge accumulates at a junction. Every coulomb entering must leave. KVL (not KCL) is the consequence of conservation of energy.

---

**2. Kirchhoff's Voltage Law (KVL) states that around any closed loop:**

- [ ] A) The sum of all currents equals zero
- [ ] B) The sum of all resistances equals zero
- [ ] C) The algebraic sum of all voltages equals zero
- [ ] D) The product of voltage and current is constant

??? success "Answer"
    **C) The algebraic sum of all voltages equals zero.** KVL enforces conservation of energy: voltage rises from sources are exactly balanced by voltage drops across resistive elements as you traverse any closed loop.

---

**3. What is the difference between a loop and a mesh in circuit topology?**

- [ ] A) A loop carries current; a mesh does not
- [ ] B) A mesh is a loop that contains no smaller loops within it
- [ ] C) A loop exists only in DC circuits; a mesh exists in AC circuits
- [ ] D) There is no difference — the terms are interchangeable

??? success "Answer"
    **B) A mesh is a loop that contains no smaller loops within it.** A loop is any closed path through the circuit. A mesh (also called a window pane) is a minimal loop — it encloses no other loops. All meshes are loops, but not all loops are meshes.

---

**4. For a circuit with \(n\) nodes, how many independent KCL equations can be written?**

- [ ] A) \(n\)
- [ ] B) \(n + 1\)
- [ ] C) \(n - 1\)
- [ ] D) \(2n\)

??? success "Answer"
    **C) \(n - 1\).** One node is designated as the reference (ground), and KCL is written at each of the remaining \(n - 1\) nodes. Writing KCL at the reference node gives a redundant equation (the negative sum of all others), so it provides no new information.

---

**5. At a node, currents of \(I_1 = 4\) A and \(I_2 = 7\) A flow in, and \(I_3\) flows out. What is \(I_3\)?**

- [ ] A) 3 A
- [ ] B) 7 A
- [ ] C) 11 A
- [ ] D) −11 A

??? success "Answer"
    **C) 11 A.** By KCL, the sum of currents into a node equals the sum of currents out of the node:

    \[I_1 + I_2 = I_3\]
    \[4 + 7 = 11 \text{ A}\]

---

**6. A series loop contains a 24 V source, \(R_1 = 4\) Ω, and \(R_2 = 8\) Ω. Using KVL, the current in the loop is:**

- [ ] A) 1 A
- [ ] B) 2 A
- [ ] C) 3 A
- [ ] D) 6 A

??? success "Answer"
    **B) 2 A.** Applying KVL around the loop:

    \[+24 - I(4) - I(8) = 0\]
    \[24 = 12I\]
    \[I = 2 \text{ A}\]

---

**7. In the node voltage method, which node is assigned a voltage of zero?**

- [ ] A) The node with the highest voltage
- [ ] B) The node connected to the positive terminal of the source
- [ ] C) The reference node (ground)
- [ ] D) The node with the most branches

??? success "Answer"
    **C) The reference node (ground).** The reference node is assigned \(V = 0\) by definition. All other node voltages are measured relative to this datum. Its physical location is arbitrary — it doesn't need to connect to earth ground.

---

**8. A supernode arises in the node voltage method when:**

- [ ] A) Two nodes are connected by a resistor
- [ ] B) A voltage source connects two non-reference nodes
- [ ] C) A current source connects to the reference node
- [ ] D) More than four branches meet at a single node

??? success "Answer"
    **B) A voltage source connects two non-reference nodes.** When a voltage source sits between two non-reference nodes, the current through it is unknown, so KCL cannot be written directly at either node. The supernode treats both nodes together as a single entity and adds the constraint equation \(V_a - V_b = V_s\).

---

**9. The superposition principle states that in a linear circuit with multiple sources:**

- [ ] A) All sources can be replaced by a single equivalent source
- [ ] B) The response is the product of individual source responses
- [ ] C) The response is the sum of responses due to each source acting alone
- [ ] D) Sources must be analyzed simultaneously to get the correct result

??? success "Answer"
    **C) The response is the sum of responses due to each source acting alone.** For each sub-analysis, deactivate all other sources: replace voltage sources with short circuits and current sources with open circuits. Superposition applies only to linear circuits.

---

**10. A delta (Δ) configuration of three resistors \(R_a = R_b = R_c = 30\) Ω is converted to an equivalent wye (Y). Each wye resistor equals:**

- [ ] A) 90 Ω
- [ ] B) 30 Ω
- [ ] C) 10 Ω
- [ ] D) 3 Ω

??? success "Answer"
    **C) 10 Ω.** For a balanced delta (all resistors equal), the delta-to-wye conversion formula gives:

    \[R_Y = \frac{R_\Delta}{3} = \frac{30}{3} = 10 \text{ Ω}\]

    For the general (unbalanced) case: \(R_Y = \frac{\text{product of adjacent } \Delta \text{ resistors}}{\text{sum of all } \Delta \text{ resistors}}\).

