---
title: Chapter 4 Practice Problems — DC Circuit Analysis Methods
description: Practice problems with solutions for Chapter 4 covering Thévenin/Norton equivalents, source transformation, and maximum power transfer
---

<div class="unit1-styled" markdown>

# Chapter 4 Practice Problems

## Practice Problems

**Problem 1: Thévenin Equivalent**

A circuit has a 30 V source, with R1 = 10 Ω in series with the source, and R2 = 15 Ω connected between node A and ground. Find the Thévenin equivalent circuit seen at terminals A–B (where B is ground).

??? success "Solution"
    **Finding \(V_{Th}\):**

    Remove any load from terminals A–B (open circuit). Voltage at A:
    
    R1 and R2 form a voltage divider: \(V_{Th} = 30 \times \frac{15}{10+15} = 30 \times 0.6 = 18\) V

    **Finding \(R_{Th}\):**

    Kill the 30 V source (replace with short). Looking into terminals A–B:
    R1 and R2 are in parallel: \(R_{Th} = \frac{10 \times 15}{10+15} = \frac{150}{25} = 6\) Ω

    **Thévenin equivalent:** 18 V source in series with 6 Ω.

---

**Problem 2: Maximum Power Transfer**

Using the Thévenin equivalent found in Problem 1, find:

a) The load resistance that maximizes power transfer  
b) The maximum power delivered to the load  
c) The efficiency at maximum power transfer

??? success "Solution"
    **a)** \(R_L = R_{Th} = 6\) Ω

    **b)** \(P_{max} = \frac{V_{Th}^2}{4 R_{Th}} = \frac{18^2}{4 \times 6} = \frac{324}{24} = 13.5\) W

    **c)** Efficiency = 50% (always at maximum power transfer condition).
    
    Verification: With \(R_L = 6\) Ω, current \(I = 18/(6+6) = 1.5\) A.  
    Power to load: \(P_L = 1.5^2 \times 6 = 13.5\) W ✓  
    Power from source: \(P_S = 18 \times 1.5 = 27\) W  
    Efficiency: \(13.5/27 = 50\%\) ✓

---

**Problem 3: Source Transformation**

Simplify the following circuit using source transformation: a 9 V voltage source with a 3 Ω series resistor in parallel with a 6 Ω resistor, driving a 4 Ω load.

??? success "Solution"
    **Step 1:** Transform the 9 V/3 Ω voltage source to a current source:
    \(I_N = 9/3 = 3\) A in parallel with 3 Ω.

    **Step 2:** The 3 Ω and 6 Ω are now in parallel:
    \(R_{eq} = (3 \times 6)/(3+6) = 2\) Ω

    **Step 3:** The circuit is now 3 A current source in parallel with 2 Ω and 4 Ω.
    
    Load current (current divider): \(I_L = 3 \times \frac{2}{2+4} = 1\) A  
    Load voltage: \(V_L = 1 \times 4 = 4\) V

---

**Problem 4: Norton Equivalent with Verification**

Find the Norton equivalent at terminals A–B for a circuit with a 24 V source, R1 = 8 Ω in series with the source, and R2 = 4 Ω from node A to ground. Verify using \(R_N = V_{oc}/I_{sc}\).

??? success "Solution"
    **\(I_{sc}\) (short A to B):**
    
    R2 is shorted. The only resistance is R1: \(I_{sc} = 24/8 = 3\) A  
    This is \(I_N = 3\) A.

    **\(R_N\) (kill source):**
    
    Short the 24 V source. Looking into A–B: R1 ∥ R2 = (8×4)/(8+4) = 32/12 = 8/3 Ω ≈ 2.67 Ω.

    **Verification via \(V_{oc}/I_{sc}\):**
    
    \(V_{oc}\) = voltage at A with B open = \(24 \times 4/(8+4) = 8\) V  
    \(R_{Th} = V_{oc}/I_{sc} = 8/3\) Ω ✓

    **Norton equivalent:** 3 A current source in parallel with 8/3 Ω (≈ 2.67 Ω).

</div>
