---
title: Chapter 7 Quiz — Second-Order RLC Circuits
description: Multiple choice quiz and practice problems for Chapter 7 covering damping, natural frequency, resonance, and quality factor
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 7 Quiz — Second-Order RLC Circuits

## Multiple Choice Questions

**1.** A series RLC circuit has R = 100 Ω, L = 10 mH, C = 1 μF. What is the natural frequency \(\omega_0\)?

- A) 1,000 rad/s
- B) 10,000 rad/s
- C) 100,000 rad/s
- D) 316 rad/s

??? success "Answer"
    **B) 10,000 rad/s**

    \(\omega_0 = 1/\sqrt{LC} = 1/\sqrt{0.01 \times 10^{-6}} = 1/\sqrt{10^{-8}} = 10{,}000\) rad/s.

---

**2.** Using the values from Q1 (R = 100 Ω, L = 10 mH, C = 1 μF), what is the damping ratio \(\zeta\)?

- A) 0.1
- B) 0.5
- C) 1.0
- D) 2.0

??? success "Answer"
    **B) 0.5**

    \(\alpha = R/(2L) = 100/(2 \times 0.01) = 5{,}000\) rad/s.  
    \(\zeta = \alpha/\omega_0 = 5{,}000/10{,}000 = 0.5\).  
    Since \(\zeta < 1\), the circuit is underdamped.

---

**3.** A circuit's damping ratio is \(\zeta = 2.5\). Which response type does this indicate?

- A) Underdamped
- B) Critically damped
- C) Overdamped
- D) Undamped

??? success "Answer"
    **C) Overdamped**

    \(\zeta > 1\) means overdamped. The circuit will return to equilibrium slowly, without oscillating, following two decaying exponentials.

---

**4.** For an underdamped circuit with \(\omega_0 = 1{,}000\) rad/s and \(\zeta = 0.6\), what is the damped natural frequency \(\omega_d\)?

- A) 600 rad/s
- B) 800 rad/s
- C) 1,000 rad/s
- D) 1,250 rad/s

??? success "Answer"
    **B) 800 rad/s**

    \(\omega_d = \omega_0\sqrt{1-\zeta^2} = 1{,}000\sqrt{1-0.36} = 1{,}000\sqrt{0.64} = 1{,}000 \times 0.8 = 800\) rad/s.

---

**5.** What response type gives the fastest settling without any overshoot?

- A) Overdamped
- B) Underdamped
- C) Critically damped
- D) Undamped

??? success "Answer"
    **C) Critically damped**

    Critically damped (\(\zeta = 1\)) provides the fastest return to equilibrium without overshoot. Underdamped is faster initially but then overshoots; overdamped has no overshoot but is sluggish.

---

**6.** A series RLC circuit has Q = 20 and resonant frequency f₀ = 100 kHz. What is the bandwidth?

- A) 2 MHz
- B) 5 kHz
- C) 500 Hz
- D) 2 kHz

??? success "Answer"
    **B) 5 kHz**

    \(BW = f_0/Q = 100{,}000/20 = 5{,}000\) Hz = 5 kHz.

---

**7.** In a series RLC circuit at resonance, which statement is true?

- A) The impedance is maximum
- B) The current is minimum
- C) The impedance equals R (minimum)
- D) The inductor and capacitor voltages are both zero

??? success "Answer"
    **C) The impedance equals R (minimum)**

    At resonance, \(X_L = X_C\) so they cancel. The net reactance is zero, leaving only R. This means impedance is minimum and current is maximum.

---

**8.** If the damping ratio \(\zeta = 0.1\), what is the quality factor Q?

- A) 0.2
- B) 1
- C) 5
- D) 10

??? success "Answer"
    **C) 5**

    \(Q = 1/(2\zeta) = 1/(2 \times 0.1) = 1/0.2 = 5\).

---

**9.** An underdamped RLC circuit has \(\zeta = 0.3\). What is the approximate percent overshoot?

- A) 3%
- B) 16%
- C) 37%
- D) 63%

??? success "Answer"
    **C) 37%**

    \(PO = e^{-\pi \times 0.3/\sqrt{1-0.09}} \times 100 = e^{-\pi \times 0.3/0.954} \times 100 = e^{-0.988} \times 100 \approx 37.2\%\).

---

**10.** How does increasing resistance R affect the natural frequency \(\omega_0\) of an RLC circuit?

- A) Increases \(\omega_0\)
- B) Decreases \(\omega_0\)
- C) Has no effect on \(\omega_0\)
- D) Doubles \(\omega_0\)

??? success "Answer"
    **C) Has no effect on \(\omega_0\)**

    \(\omega_0 = 1/\sqrt{LC}\) depends only on L and C, not R. Resistance affects the damping ratio and quality factor, but not the natural frequency.

---

## Practice Problems

**Problem 1: Classify and Analyze**

A series RLC circuit: R = 40 Ω, L = 10 mH, C = 25 μF.

a) Calculate \(\omega_0\), \(\alpha\), and \(\zeta\).  
b) Classify the response type.  
c) If underdamped, find \(\omega_d\) and the percent overshoot.

??? success "Solution"
    **a)** 
    \(\omega_0 = 1/\sqrt{LC} = 1/\sqrt{0.01 \times 25\times10^{-6}} = 1/\sqrt{2.5\times10^{-7}} = 2{,}000\) rad/s

    \(\alpha = R/(2L) = 40/(2\times0.01) = 2{,}000\) rad/s

    \(\zeta = \alpha/\omega_0 = 2{,}000/2{,}000 = 1.0\)

    **b)** \(\zeta = 1.0\) → **Critically damped** — fastest response without overshoot.

    The solution form is \(x(t) = (A + Bt)e^{-2000t}\).

    **c)** Not applicable — critical damping has no oscillation and zero overshoot.

---

**Problem 2: Quality Factor and Bandwidth**

A parallel RLC circuit resonates at f₀ = 455 kHz (a classic AM radio IF frequency) with R = 50 kΩ, L = 100 μH.

a) Find C to achieve resonance at 455 kHz.  
b) Calculate Q.  
c) Calculate the 3 dB bandwidth.  
d) Can this circuit distinguish between stations 10 kHz apart?

??? success "Solution"
    **a)** \(f_0 = 1/(2\pi\sqrt{LC})\), so \(C = 1/(4\pi^2 f_0^2 L)\)

    \(C = 1/(4\pi^2 \times (455\times10^3)^2 \times 100\times10^{-6})\)

    \(C = 1/(4\pi^2 \times 2.07\times10^{11} \times 10^{-4}) = 1/(8.17\times10^{8}) \approx 1.22\) nF

    **b)** For parallel RLC: \(Q = R\sqrt{C/L} = 50{,}000\sqrt{1.22\times10^{-9}/10^{-4}} = 50{,}000\sqrt{1.22\times10^{-5}}\)

    \(Q = 50{,}000 \times 3.5\times10^{-3} \approx 175\)

    Alternatively: \(Q = \omega_0 CR = 2\pi\times455\times10^3\times1.22\times10^{-9}\times50{,}000 \approx 174\)

    **c)** \(BW = f_0/Q = 455{,}000/175 \approx 2{,}600\) Hz = **2.6 kHz**

    **d)** Yes — the bandwidth is 2.6 kHz, which is much less than the 10 kHz station spacing. This circuit easily distinguishes adjacent stations.

---

**Problem 3: Underdamped Step Response**

An underdamped series RLC circuit: L = 1 mH, C = 10 nF, R = 20 Ω. A 5 V step is applied at t = 0 with zero initial conditions.

a) Find \(\omega_0\), \(\alpha\), \(\zeta\), and \(\omega_d\).  
b) Write the complete step response for \(v_C(t)\).  
c) Find the percent overshoot and the peak voltage.  
d) Find the settling time (2% criterion).

??? success "Solution"
    **a)**
    \(\omega_0 = 1/\sqrt{10^{-3}\times10^{-8}} = 1/\sqrt{10^{-11}} \approx 316{,}000\) rad/s

    \(\alpha = R/(2L) = 20/(2\times10^{-3}) = 10{,}000\) rad/s

    \(\zeta = 10{,}000/316{,}000 \approx 0.0316\)

    \(\omega_d = \omega_0\sqrt{1-\zeta^2} \approx 316{,}000\sqrt{1-0.001} \approx 315{,}840\) rad/s

    **b)** Step response (capacitor voltage):

    \(v_C(t) = 5\left[1 - \frac{e^{-10{,}000t}}{\sqrt{1-\zeta^2}}\sin(\omega_d t + \cos^{-1}\zeta)\right]\) V

    **c)** \(PO = e^{-\pi\times0.0316/\sqrt{1-0.001}} \times 100 = e^{-0.0992}\times100 \approx 90.6\%\)

    Peak voltage: \(V_{peak} = 5(1 + 0.906) = 9.53\) V — the capacitor voltage nearly doubles during the overshoot! This illustrates why very lightly damped circuits can be dangerous.

    **d)** \(t_s = 4/\alpha = 4/10{,}000 = 0.4\) ms

---

**Problem 4: Design for Critical Damping**

You have L = 50 mH and C = 2 μF. What value of R produces critical damping? What is the natural frequency?

??? success "Solution"
    **Natural frequency:**

    \(\omega_0 = 1/\sqrt{LC} = 1/\sqrt{0.05\times2\times10^{-6}} = 1/\sqrt{10^{-7}} \approx 3{,}162\) rad/s

    \(f_0 = \omega_0/(2\pi) \approx 503\) Hz

    **Critical damping condition:** \(\zeta = 1\), so \(\alpha = \omega_0\)

    For series RLC: \(\alpha = R/(2L) = \omega_0\)

    \(R = 2L\omega_0 = 2\times0.05\times3{,}162 = 316.2\) Ω

    **Verification:** \(\zeta = (R/2)\sqrt{C/L} = (316.2/2)\sqrt{2\times10^{-6}/0.05} = 158.1\sqrt{4\times10^{-5}} = 158.1\times6.32\times10^{-3} \approx 1.0\) ✓

</div>
