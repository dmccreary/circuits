# Chapter 9 Quiz and Problems — Phasors and Complex Impedance

## Multiple Choice Quiz

**1. A phasor is best described as:**

- [ ] A) A time-domain sinusoidal function
- [ ] B) A complex number representing the amplitude and phase of a sinusoid
- [ ] C) The derivative of a sinusoidal signal
- [ ] D) A rotating vector that varies with time

??? success "Answer"
    **B) A complex number representing the amplitude and phase of a sinusoid.** A phasor is a "frozen" snapshot of a rotating vector. It captures the magnitude \(V_m\) and phase angle \(\phi\) of a sinusoid while factoring out the common time dependence \(e^{j\omega t}\). The result is a static complex number, not a function of time.

---

**2. What is the impedance of a capacitor \(C\) at angular frequency \(\omega\)?**

- [ ] A) \(j\omega C\)
- [ ] B) \(\omega C\)
- [ ] C) \(\frac{1}{j\omega C}\)
- [ ] D) \(j\omega L\)

??? success "Answer"
    **C) \(\frac{1}{j\omega C}\).** The capacitor impedance is \(Z_C = \frac{1}{j\omega C} = -\frac{j}{\omega C}\). It is purely imaginary and negative, meaning current leads voltage by 90°. At higher frequencies the impedance decreases (capacitors pass AC more easily).

---

**3. What is the impedance of an ideal inductor \(L\) at angular frequency \(\omega\)?**

- [ ] A) \(\frac{1}{j\omega L}\)
- [ ] B) \(j\omega L\)
- [ ] C) \(\omega L\)
- [ ] D) \(\frac{1}{\omega L}\)

??? success "Answer"
    **B) \(j\omega L\).** The inductor impedance is \(Z_L = j\omega L\). It is purely imaginary and positive, meaning voltage leads current by 90°. Inductive reactance \(X_L = \omega L\) increases with frequency (inductors resist high-frequency changes in current).

---

**4. A series RLC circuit has \(X_L > X_C\) at a given frequency. How does the circuit behave?**

- [ ] A) Capacitively — current leads voltage
- [ ] B) Resistively — voltage and current are in phase
- [ ] C) Inductively — voltage leads current
- [ ] D) The circuit is at resonance

??? success "Answer"
    **C) Inductively — voltage leads current.** When \(X_L > X_C\), the net reactance is positive (\(X = X_L - X_C > 0\)), and the total impedance has a positive imaginary part. This causes the circuit to behave like an inductor, with voltage leading current by an angle between 0° and 90°.

---

**5. The admittance \(Y\) of a circuit element is related to its impedance \(Z\) by:**

- [ ] A) \(Y = Z^2\)
- [ ] B) \(Y = \sqrt{Z}\)
- [ ] C) \(Y = \frac{1}{Z}\)
- [ ] D) \(Y = -Z\)

??? success "Answer"
    **C) \(Y = \frac{1}{Z}\).** Admittance is the reciprocal of impedance. Just as conductance \(G = 1/R\) simplifies parallel resistor analysis, admittance \(Y = G + jB\) simplifies parallel AC circuit analysis by allowing elements to be added directly (instead of using the reciprocal formula for impedances in parallel).

---

**6. In the impedance triangle, if the resistance is \(R\) and the net reactance is \(X\), what is the magnitude of the impedance \(|Z|\)?**

- [ ] A) \(R + X\)
- [ ] B) \(\frac{R}{X}\)
- [ ] C) \(R^2 + X^2\)
- [ ] D) \(\sqrt{R^2 + X^2}\)

??? success "Answer"
    **D) \(\sqrt{R^2 + X^2}\).** The impedance \(Z = R + jX\) is a complex number. Its magnitude follows the Pythagorean theorem: \(|Z| = \sqrt{R^2 + X^2}\). The impedance triangle visually shows \(R\) and \(X\) as the two legs, with \(|Z|\) as the hypotenuse.

---

**7. What happens to capacitive reactance \(X_C\) as frequency increases?**

- [ ] A) \(X_C\) increases proportionally to frequency
- [ ] B) \(X_C\) remains constant
- [ ] C) \(X_C\) decreases
- [ ] D) \(X_C\) becomes negative

??? success "Answer"
    **C) \(X_C\) decreases.** Since \(X_C = \frac{1}{\omega C} = \frac{1}{2\pi f C}\), as frequency \(f\) increases, \(X_C\) decreases. At very high frequencies, the capacitor acts like a short circuit (\(X_C \to 0\)). At DC (\(f = 0\)), the capacitor is an open circuit (\(X_C \to \infty\)).

---

**8. For a pure resistor in an AC circuit, the phase relationship between voltage and current is:**

- [ ] A) Voltage leads current by 90°
- [ ] B) Current leads voltage by 90°
- [ ] C) Voltage and current are in phase (0° difference)
- [ ] D) Voltage leads current by 45°

??? success "Answer"
    **C) Voltage and current are in phase (0° difference).** A resistor's impedance is purely real: \(Z_R = R\). Since there is no imaginary component, the phase angle is 0°. Resistors dissipate energy and do not store or return it, unlike reactive elements.

---

**9. Phasor analysis (phasor domain circuit analysis) is valid when:**

- [ ] A) All sources in the circuit are DC
- [ ] B) The circuit contains only resistors
- [ ] C) All sources are sinusoidal at the same frequency and the circuit is in steady state
- [ ] D) The circuit is in a transient (switching) state

??? success "Answer"
    **C) All sources are sinusoidal at the same frequency and the circuit is in steady state.** Phasor analysis applies only to the **sinusoidal steady state**. It requires all sources to share the same frequency so the \(e^{j\omega t}\) factor can be factored out. Transient behavior (such as the initial response after switching) must be handled with time-domain methods.

---

**10. At resonance in a series RLC circuit, what is true?**

- [ ] A) \(X_L = 0\)
- [ ] B) \(X_C = 0\)
- [ ] C) \(X_L = X_C\), and the total impedance equals \(R\)
- [ ] D) The impedance is maximum

??? success "Answer"
    **C) \(X_L = X_C\), and the total impedance equals \(R\).** At resonance, the inductive and capacitive reactances are equal and opposite, canceling each other. The total impedance reduces to the purely resistive value \(Z = R\). Current is at maximum (for a series circuit) and is in phase with the source voltage.

---

## Practice Problems

### Problem 1 — Impedance Calculation for Reactive Components

Calculate the impedance of each component at a frequency of \(f = 5\) kHz:

**(a)** Resistor: \(R = 100\) Ω

**(b)** Inductor: \(L = 10\) mH

**(c)** Capacitor: \(C = 100\) nF

**(d)** Express each impedance in polar form.

??? success "Solution"
    First, find the angular frequency:

    \[\omega = 2\pi f = 2\pi \times 5000 = 31{,}416\text{ rad/s}\]

    **(a)** Resistor impedance:

    \[Z_R = R = 100\text{ Ω} = 100\angle 0°\text{ Ω}\]

    **(b)** Inductor impedance:

    \[Z_L = j\omega L = j(31{,}416)(0.01) = j314.2\text{ Ω} = 314.2\angle 90°\text{ Ω}\]

    **(c)** Capacitor impedance:

    \[Z_C = \frac{1}{j\omega C} = \frac{1}{j(31{,}416)(100 \times 10^{-9})} = \frac{1}{j0.003142} = -j318.3\text{ Ω} = 318.3\angle -90°\text{ Ω}\]

    **(d)** Summary in polar form:

    | Component | Impedance (Rectangular) | Impedance (Polar) |
    |-----------|------------------------|-------------------|
    | Resistor | \(100 + j0\) | \(100\angle 0°\) Ω |
    | Inductor | \(0 + j314.2\) | \(314.2\angle 90°\) Ω |
    | Capacitor | \(0 - j318.3\) | \(318.3\angle -90°\) Ω |

---

### Problem 2 — Phasor Conversion and Addition

Two sinusoidal voltages in a circuit are:

\[v_1(t) = 120\cos(\omega t)\text{ V}\]

\[v_2(t) = 80\cos(\omega t - 90°)\text{ V}\]

**(a)** Write the phasor representation of each voltage.

**(b)** Compute the total phasor \(\mathbf{V}_{total} = \mathbf{V}_1 + \mathbf{V}_2\) in rectangular form.

**(c)** Convert \(\mathbf{V}_{total}\) to polar form.

**(d)** Write the time-domain expression for \(v_{total}(t)\).

??? success "Solution"
    **(a)** Phasor representations:

    \[\mathbf{V}_1 = 120\angle 0° = 120 + j0\text{ V}\]

    \[\mathbf{V}_2 = 80\angle -90° = 0 - j80\text{ V}\]

    **(b)** Addition in rectangular form:

    \[\mathbf{V}_{total} = (120 + 0) + j(0 - 80) = 120 - j80\text{ V}\]

    **(c)** Polar conversion:

    \[|\mathbf{V}_{total}| = \sqrt{120^2 + 80^2} = \sqrt{14400 + 6400} = \sqrt{20800} = 144.2\text{ V}\]

    \[\theta = \tan^{-1}\!\left(\frac{-80}{120}\right) = \tan^{-1}(-0.667) = -33.7°\]

    \[\mathbf{V}_{total} = 144.2\angle -33.7°\text{ V}\]

    **(d)** Time-domain expression:

    \[v_{total}(t) = 144.2\cos(\omega t - 33.7°)\text{ V}\]

---

### Problem 3 — Series RLC Impedance

A series RLC circuit has \(R = 47\) Ω, \(L = 15\) mH, and \(C = 220\) nF. The source frequency is \(f = 2\) kHz.

**(a)** Calculate \(X_L\) and \(X_C\).

**(b)** Find the total impedance \(Z\) in rectangular form.

**(c)** Express \(Z\) in polar form and determine whether the circuit is inductive or capacitive.

**(d)** If the source voltage is \(V_s = 10\angle 0°\) V (RMS), find the current phasor \(\mathbf{I}\).

??? success "Solution"
    **(a)** Angular frequency: \(\omega = 2\pi \times 2000 = 12{,}566\text{ rad/s}\)

    \[X_L = \omega L = 12{,}566 \times 0.015 = 188.5\text{ Ω}\]

    \[X_C = \frac{1}{\omega C} = \frac{1}{12{,}566 \times 220 \times 10^{-9}} = \frac{1}{0.002765} = 361.7\text{ Ω}\]

    **(b)** Total impedance:

    \[Z = R + j(X_L - X_C) = 47 + j(188.5 - 361.7) = 47 - j173.2\text{ Ω}\]

    **(c)** Polar form:

    \[|Z| = \sqrt{47^2 + 173.2^2} = \sqrt{2{,}209 + 30{,}000} = \sqrt{32{,}209} = 179.5\text{ Ω}\]

    \[\theta = \tan^{-1}\!\left(\frac{-173.2}{47}\right) = -74.8°\]

    \[Z = 179.5\angle -74.8°\text{ Ω}\]

    Since \(X_C > X_L\), the net reactance is negative: the circuit is **capacitive** (current leads voltage).

    **(d)** Current phasor using Ohm's law in the phasor domain:

    \[\mathbf{I} = \frac{\mathbf{V}_s}{Z} = \frac{10\angle 0°}{179.5\angle -74.8°} = \frac{10}{179.5}\angle(0° - (-74.8°)) = 55.7\angle 74.8°\text{ mA}\]

---

### Problem 4 — Parallel Impedance and Resonance

A parallel RLC circuit has \(R = 1\text{ kΩ}\), \(L = 5\text{ mH}\), and \(C = 10\text{ nF}\).

**(a)** Find the resonant frequency \(f_0\).

**(b)** At resonance, calculate \(X_L\) and \(X_C\) and verify they are equal.

**(c)** What is the total impedance of the parallel circuit at resonance?

**(d)** Calculate the quality factor \(Q\) of this parallel circuit.

??? success "Solution"
    **(a)** Resonant frequency:

    \[\omega_0 = \frac{1}{\sqrt{LC}} = \frac{1}{\sqrt{0.005 \times 10 \times 10^{-9}}} = \frac{1}{\sqrt{5 \times 10^{-11}}} = \frac{1}{7.07 \times 10^{-6}} = 141{,}400\text{ rad/s}\]

    \[f_0 = \frac{\omega_0}{2\pi} = \frac{141{,}400}{6.283} = 22{,}508\text{ Hz} \approx 22.5\text{ kHz}\]

    **(b)** At resonance:

    \[X_L = \omega_0 L = 141{,}400 \times 0.005 = 707\text{ Ω}\]

    \[X_C = \frac{1}{\omega_0 C} = \frac{1}{141{,}400 \times 10 \times 10^{-9}} = \frac{1}{1.414 \times 10^{-3}} = 707\text{ Ω} \checkmark\]

    Both reactances are 707 Ω at resonance, confirming \(X_L = X_C\).

    **(c)** For a parallel circuit at resonance, the L and C branches cancel each other (their susceptances sum to zero), leaving only the resistor. The total impedance is:

    \[Z_{total} = R = 1\text{ kΩ}\]

    This is the **maximum** impedance for a parallel resonant circuit (opposite of the series case where impedance is minimum).

    **(d)** Quality factor for a parallel RLC circuit:

    \[Q = R\sqrt{\frac{C}{L}} = 1000\sqrt{\frac{10 \times 10^{-9}}{0.005}} = 1000\sqrt{2 \times 10^{-6}} = 1000 \times 1.414 \times 10^{-3} = 1.414\]

    Alternatively: \(Q = \frac{R}{X_L} = \frac{1000}{707} = 1.414\)

---

### Answer Key

| Question | Answer |
|----------|--------|
| 1 | B |
| 2 | C |
| 3 | B |
| 4 | C |
| 5 | C |
| 6 | D |
| 7 | C |
| 8 | C |
| 9 | C |
| 10 | C |

*Practice problem solutions are provided in the collapsible blocks above.*
