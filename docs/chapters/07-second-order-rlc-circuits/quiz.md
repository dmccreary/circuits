# Chapter 7 Quiz and Problems — Second-Order RLC Circuits

## Multiple Choice Quiz

**1. What makes a circuit "second-order"?**

- [ ] A) It has two resistors
- [ ] B) It has two independent energy storage elements
- [ ] C) It uses two voltage sources
- [ ] D) It has two loops

??? success "Answer"
    **B) It has two independent energy storage elements.** A second-order circuit is described by a second-order differential equation, which arises when the circuit contains two independent energy storage elements — typically an inductor and a capacitor.

---

**2. For a series RLC circuit, what is the damping coefficient \(\alpha\)?**

- [ ] A) \(\frac{1}{2RC}\)
- [ ] B) \(\frac{R}{2L}\)
- [ ] C) \(\frac{1}{\sqrt{LC}}\)
- [ ] D) \(\frac{R}{L}\)

??? success "Answer"
    **B) \(\alpha = \frac{R}{2L}\).** For a parallel RLC circuit, the damping coefficient is \(\alpha = \frac{1}{2RC}\).

---

**3. A series RLC circuit has \(\zeta = 0.3\). What type of response does it exhibit?**

- [ ] A) Overdamped
- [ ] B) Critically damped
- [ ] C) Underdamped
- [ ] D) Undamped

??? success "Answer"
    **C) Underdamped.** When \(0 < \zeta < 1\), the circuit is underdamped and oscillates with decaying amplitude.

---

**4. What is the undamped natural frequency \(\omega_0\) of an RLC circuit?**

- [ ] A) \(\frac{R}{2L}\)
- [ ] B) \(\frac{1}{LC}\)
- [ ] C) \(\frac{1}{\sqrt{LC}}\)
- [ ] D) \(\sqrt{\frac{L}{C}}\)

??? success "Answer"
    **C) \(\omega_0 = \frac{1}{\sqrt{LC}}\).** The natural frequency depends only on L and C, not on the resistance R.

---

**5. In a critically damped circuit, the damping ratio \(\zeta\) equals:**

- [ ] A) 0
- [ ] B) 0.5
- [ ] C) 1
- [ ] D) 2

??? success "Answer"
    **C) \(\zeta = 1\).** Critical damping is the boundary between underdamped and overdamped response. It provides the fastest return to equilibrium without overshoot.

---

**6. What happens to the impedance of a series RLC circuit at resonance?**

- [ ] A) It becomes infinite
- [ ] B) It equals \(R\) (minimum)
- [ ] C) It equals \(\omega_0 L\)
- [ ] D) It equals zero

??? success "Answer"
    **B) At resonance, the impedance of a series RLC circuit equals R.** The inductive and capacitive reactances cancel each other (\(X_L = X_C\)), leaving only the resistance.

---

**7. How is the quality factor Q related to the damping ratio \(\zeta\)?**

- [ ] A) \(Q = 2\zeta\)
- [ ] B) \(Q = \frac{1}{2\zeta}\)
- [ ] C) \(Q = \zeta^2\)
- [ ] D) \(Q = \frac{\zeta}{2}\)

??? success "Answer"
    **B) \(Q = \frac{1}{2\zeta}\).** High Q means low damping (sharp resonance), while low Q means high damping (broad resonance).

---

**8. The damped natural frequency \(\omega_d\) is related to \(\omega_0\) by:**

- [ ] A) \(\omega_d = \omega_0(1 - \zeta)\)
- [ ] B) \(\omega_d = \omega_0\sqrt{1 - \zeta^2}\)
- [ ] C) \(\omega_d = \omega_0\zeta\)
- [ ] D) \(\omega_d = \omega_0 / \zeta\)

??? success "Answer"
    **B) \(\omega_d = \omega_0\sqrt{1 - \zeta^2}\).** The damped frequency is always less than the natural frequency. Light damping (\(\zeta \approx 0\)) barely reduces the frequency, while heavy damping significantly lowers it.

---

**9. An overdamped circuit has characteristic roots that are:**

- [ ] A) Complex conjugate
- [ ] B) Two distinct negative real roots
- [ ] C) A repeated real root
- [ ] D) Purely imaginary

??? success "Answer"
    **B) Two distinct negative real roots.** When \(\zeta > 1\), the discriminant \(\alpha^2 - \omega_0^2 > 0\), giving two different real negative roots.

---

**10. What does a higher quality factor Q indicate about a resonant circuit's bandwidth?**

- [ ] A) Wider bandwidth
- [ ] B) Narrower bandwidth
- [ ] C) Bandwidth is unrelated to Q
- [ ] D) Zero bandwidth

??? success "Answer"
    **B) Narrower bandwidth.** The bandwidth is \(BW = f_0/Q\), so higher Q means a narrower, sharper resonance peak and better frequency selectivity.

---

## Practice Problems

### Problem 1 — Classifying Circuit Response

A series RLC circuit has R = 40 Ω, L = 10 mH, and C = 10 μF.

**(a)** Calculate the undamped natural frequency \(\omega_0\).

**(b)** Calculate the damping coefficient \(\alpha\).

**(c)** Calculate the damping ratio \(\zeta\).

**(d)** Classify the response as overdamped, critically damped, or underdamped.

??? success "Solution"
    **(a)** Natural frequency:

    \[\omega_0 = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{0.01 \times 10 \times 10^{-6}}} = \frac{1}{\sqrt{10^{-7}}} = 3{,}162 \text{ rad/s}\]

    **(b)** Damping coefficient:

    \[\alpha = \frac{R}{2L} = \frac{40}{2 \times 0.01} = 2{,}000 \text{ rad/s}\]

    **(c)** Damping ratio:

    \[\zeta = \frac{\alpha}{\omega_0} = \frac{2{,}000}{3{,}162} = 0.632\]

    **(d)** Since \(\zeta = 0.632 < 1\), the circuit is **underdamped** and will exhibit oscillatory behavior with decaying amplitude.

---

### Problem 2 — Critical Damping Design

You need to design a series RLC circuit that is critically damped with a natural frequency of \(f_0 = 1\text{ kHz}\). The inductor value is fixed at L = 25 mH.

**(a)** Find the required capacitance C.

**(b)** Find the required resistance R for critical damping.

??? success "Solution"
    **(a)** From \(\omega_0 = \frac{1}{\sqrt{LC}}\):

    \[\omega_0 = 2\pi f_0 = 2\pi \times 1000 = 6{,}283 \text{ rad/s}\]

    \[C = \frac{1}{\omega_0^2 L} = \frac{1}{(6{,}283)^2 \times 0.025} = \frac{1}{987{,}000} = 1.013 \text{ μF}\]

    **(b)** For critical damping, \(\zeta = 1\), so \(\alpha = \omega_0\):

    \[\frac{R}{2L} = \omega_0\]

    \[R = 2L\omega_0 = 2 \times 0.025 \times 6{,}283 = 314.2 \text{ Ω}\]

---

### Problem 3 — Underdamped Response Analysis

A series RLC circuit with R = 20 Ω, L = 50 mH, and C = 2 μF is excited by a step input.

**(a)** Calculate \(\omega_0\), \(\alpha\), and \(\zeta\).

**(b)** Calculate the damped frequency \(\omega_d\) and the corresponding frequency in Hz.

**(c)** Calculate the percent overshoot.

**(d)** Calculate the 2% settling time.

??? success "Solution"
    **(a)**

    \[\omega_0 = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{0.05 \times 2 \times 10^{-6}}} = \frac{1}{\sqrt{10^{-7}}} = 3{,}162 \text{ rad/s}\]

    \[\alpha = \frac{R}{2L} = \frac{20}{2 \times 0.05} = 200 \text{ rad/s}\]

    \[\zeta = \frac{\alpha}{\omega_0} = \frac{200}{3{,}162} = 0.0632\]

    **(b)** Damped frequency:

    \[\omega_d = \omega_0\sqrt{1 - \zeta^2} = 3{,}162\sqrt{1 - 0.004} = 3{,}156 \text{ rad/s}\]

    \[f_d = \frac{\omega_d}{2\pi} = \frac{3{,}156}{6.283} = 502.3 \text{ Hz}\]

    **(c)** Percent overshoot:

    \[PO = e^{-\pi\zeta/\sqrt{1-\zeta^2}} \times 100\% = e^{-\pi \times 0.0632/\sqrt{1-0.004}} \times 100\%\]

    \[PO = e^{-0.1992} \times 100\% = 81.9\%\]

    **(d)** Settling time:

    \[t_s \approx \frac{4}{\alpha} = \frac{4}{200} = 20 \text{ ms}\]

---

### Problem 4 — Quality Factor and Bandwidth

A series RLC circuit is used as a bandpass filter with L = 5 mH, C = 0.5 μF, and R = 10 Ω.

**(a)** Find the resonant frequency \(f_0\).

**(b)** Calculate the quality factor Q.

**(c)** Determine the 3 dB bandwidth in Hz.

**(d)** Find the upper and lower cutoff frequencies.

??? success "Solution"
    **(a)** Resonant frequency:

    \[f_0 = \frac{1}{2\pi\sqrt{LC}} = \frac{1}{2\pi\sqrt{0.005 \times 0.5 \times 10^{-6}}} = \frac{1}{2\pi\sqrt{2.5 \times 10^{-9}}}\]

    \[f_0 = \frac{1}{2\pi \times 5 \times 10^{-5}} = \frac{1}{3.14 \times 10^{-4}} = 3{,}183 \text{ Hz}\]

    **(b)** Quality factor:

    \[Q = \frac{1}{R}\sqrt{\frac{L}{C}} = \frac{1}{10}\sqrt{\frac{0.005}{0.5 \times 10^{-6}}} = \frac{1}{10}\sqrt{10{,}000} = \frac{100}{10} = 10\]

    **(c)** Bandwidth:

    \[BW = \frac{f_0}{Q} = \frac{3{,}183}{10} = 318.3 \text{ Hz}\]

    **(d)** Cutoff frequencies (approximate):

    \[f_{low} \approx f_0 - \frac{BW}{2} = 3{,}183 - 159 = 3{,}024 \text{ Hz}\]

    \[f_{high} \approx f_0 + \frac{BW}{2} = 3{,}183 + 159 = 3{,}342 \text{ Hz}\]

---

### Problem 5 — Parallel RLC Circuit

A parallel RLC circuit has R = 1 kΩ, L = 20 mH, and C = 5 μF.

**(a)** Calculate the damping coefficient \(\alpha\) and natural frequency \(\omega_0\).

**(b)** Determine the damping ratio \(\zeta\) and classify the response.

**(c)** Calculate the quality factor Q.

**(d)** Compare: what resistance R would make this circuit critically damped?

??? success "Solution"
    **(a)** For a parallel RLC circuit:

    \[\alpha = \frac{1}{2RC} = \frac{1}{2 \times 1000 \times 5 \times 10^{-6}} = \frac{1}{0.01} = 100 \text{ rad/s}\]

    \[\omega_0 = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{0.02 \times 5 \times 10^{-6}}} = \frac{1}{\sqrt{10^{-7}}} = 3{,}162 \text{ rad/s}\]

    **(b)**

    \[\zeta = \frac{\alpha}{\omega_0} = \frac{100}{3{,}162} = 0.0316\]

    Since \(\zeta \ll 1\), the circuit is **highly underdamped** with significant oscillation.

    **(c)**

    \[Q = \frac{1}{2\zeta} = \frac{1}{2 \times 0.0316} = 15.8\]

    **(d)** For critical damping, \(\zeta = 1\), so \(\alpha = \omega_0\):

    \[\frac{1}{2RC} = \omega_0 \implies R = \frac{1}{2\omega_0 C} = \frac{1}{2 \times 3{,}162 \times 5 \times 10^{-6}} = 31.6 \text{ Ω}\]

    Note: For a parallel RLC circuit, **lower** resistance increases damping (opposite of series).

---

### Problem 6 — Energy in an RLC Circuit

An LC circuit (R = 0) has L = 100 mH and C = 10 μF. The capacitor is initially charged to 12 V with zero initial current.

**(a)** Calculate the total energy stored in the circuit.

**(b)** What is the maximum current that will flow through the inductor?

**(c)** At what frequency does the energy oscillate between L and C?

??? success "Solution"
    **(a)** Total energy (all initially in the capacitor):

    \[W = \frac{1}{2}CV^2 = \frac{1}{2} \times 10 \times 10^{-6} \times 12^2 = 720 \text{ μJ} = 0.72 \text{ mJ}\]

    **(b)** At maximum current, all energy is in the inductor:

    \[\frac{1}{2}Li_{max}^2 = W\]

    \[i_{max} = \sqrt{\frac{2W}{L}} = \sqrt{\frac{2 \times 720 \times 10^{-6}}{0.1}} = \sqrt{0.0144} = 120 \text{ mA}\]

    **(c)** The energy oscillates at twice the natural frequency (since energy goes through a full cycle in half the voltage period):

    \[f_0 = \frac{1}{2\pi\sqrt{LC}} = \frac{1}{2\pi\sqrt{0.1 \times 10 \times 10^{-6}}} = \frac{1}{2\pi \times 10^{-3}} = 159.2 \text{ Hz}\]

    The voltage/current oscillates at 159.2 Hz, but the **energy** oscillation occurs at \(2f_0 = 318.4\) Hz since energy is proportional to the square of voltage or current.

---

### Problem 7 — Mechanical Analogy

A car suspension can be modeled as a mass-spring-damper system. A car with mass m = 1500 kg has a spring constant k = 60,000 N/m.

**(a)** Using the electrical-mechanical analogy, find the equivalent L and C values if we set R = 1 Ω.

**(b)** What damping coefficient b (in N·s/m) gives critical damping?

**(c)** If the actual damping is b = 12,000 N·s/m, is the suspension underdamped, critically damped, or overdamped?

??? success "Solution"
    **(a)** Using the analogy: \(L \leftrightarrow m\), \(1/C \leftrightarrow k\), \(R \leftrightarrow b\):

    \[L = m = 1{,}500 \text{ H (in analogy units)}\]

    \[C = \frac{1}{k} = \frac{1}{60{,}000} \text{ F (in analogy units)}\]

    **(b)** The natural frequency:

    \[\omega_0 = \sqrt{\frac{k}{m}} = \sqrt{\frac{60{,}000}{1{,}500}} = \sqrt{40} = 6.32 \text{ rad/s}\]

    For critical damping:

    \[b_{critical} = 2m\omega_0 = 2 \times 1{,}500 \times 6.32 = 18{,}974 \text{ N·s/m}\]

    **(c)** Damping ratio:

    \[\zeta = \frac{b}{b_{critical}} = \frac{12{,}000}{18{,}974} = 0.632\]

    Since \(\zeta = 0.632 < 1\), the suspension is **underdamped**. This is typical for car suspensions — they allow some oscillation for a smoother ride while still damping out bumps relatively quickly.
