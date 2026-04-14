# Chapter 8 Quiz and Problems — AC Signals and Sinusoidal Waveforms

## Multiple Choice Quiz

**1. In the expression \(v(t) = V_m \sin(\omega t + \phi)\), which parameter represents the peak amplitude of the waveform?**

- [ ] A) \(\omega\)
- [ ] B) \(\phi\)
- [ ] C) \(V_m\)
- [ ] D) \(t\)

??? success "Answer"
    **C) \(V_m\).** The peak amplitude \(V_m\) is the maximum instantaneous value of the waveform measured from zero. It appears as the coefficient of the sine function and determines the vertical extent of the signal.

---

**2. A sinusoidal voltage has a peak value of \(V_m\). What is its RMS value?**

- [ ] A) \(\frac{V_m}{2}\)
- [ ] B) \(\frac{V_m}{\sqrt{2}}\)
- [ ] C) \(\frac{2V_m}{\pi}\)
- [ ] D) \(\frac{\pi V_m}{2}\)

??? success "Answer"
    **B) \(\frac{V_m}{\sqrt{2}}\).** The RMS (Root Mean Square) value of a pure sinusoid is \(V_{rms} = \frac{V_m}{\sqrt{2}} \approx 0.707\,V_m\). RMS is the "equivalent DC" voltage that delivers the same power to a resistive load.

---

**3. A sinusoidal signal has a frequency of \(f = 400\) Hz. What is its period \(T\)?**

- [ ] A) 400 s
- [ ] B) 0.4 ms
- [ ] C) 2.5 ms
- [ ] D) 25 ms

??? success "Answer"
    **C) 2.5 ms.** The period is the reciprocal of frequency: \(T = \frac{1}{f} = \frac{1}{400} = 0.0025\text{ s} = 2.5\text{ ms}\).

---

**4. Given \(v_1(t) = V_m \sin(\omega t)\) and \(v_2(t) = V_m \sin(\omega t + 60°)\), which statement is correct?**

- [ ] A) \(v_1\) leads \(v_2\) by 60°
- [ ] B) \(v_2\) leads \(v_1\) by 60°
- [ ] C) The two signals are in phase
- [ ] D) \(v_2\) lags \(v_1\) by 30°

??? success "Answer"
    **B) \(v_2\) leads \(v_1\) by 60°.** A positive phase angle means the signal reaches its peak *earlier* in time. Since the phase of \(v_2\) is \(+60°\) relative to \(v_1\), \(v_2\) leads \(v_1\) by 60°.

---

**5. What is the angular frequency \(\omega\) of the US power grid, which operates at 60 Hz?**

- [ ] A) 60 rad/s
- [ ] B) 120 rad/s
- [ ] C) \(120\pi\) rad/s
- [ ] D) \(60\pi\) rad/s

??? success "Answer"
    **C) \(120\pi\) rad/s.** Angular frequency is related to frequency by \(\omega = 2\pi f = 2\pi \times 60 = 120\pi \approx 377\text{ rad/s}\).

---

**6. The crest factor of a waveform is defined as the ratio of its peak value to its RMS value. What is the crest factor of a pure sinusoid?**

- [ ] A) 1.0
- [ ] B) \(\sqrt{2}\)
- [ ] C) 2.0
- [ ] D) \(\frac{\pi}{2}\)

??? success "Answer"
    **B) \(\sqrt{2}\).** For a sinusoid, \(\text{Crest Factor} = \frac{V_m}{V_{rms}} = \frac{V_m}{V_m/\sqrt{2}} = \sqrt{2} \approx 1.414\). A square wave has a crest factor of 1 (peak equals RMS), while a spike signal has a very high crest factor.

---

**7. What is the full-cycle average value of a pure, unbiased sinusoidal waveform?**

- [ ] A) \(\frac{V_m}{\sqrt{2}}\)
- [ ] B) \(\frac{2V_m}{\pi}\)
- [ ] C) \(V_m\)
- [ ] D) Zero

??? success "Answer"
    **D) Zero.** A symmetric sinusoid spends equal time above and below zero, so the positive and negative areas cancel exactly. The full-cycle average is zero. The half-cycle average (used in rectifier circuits) is \(\frac{2V_m}{\pi} \approx 0.637\,V_m\).

---

**8. Euler's formula relates complex exponentials to trigonometric functions. Which expression is correct?**

- [ ] A) \(e^{j\theta} = \cos\theta - j\sin\theta\)
- [ ] B) \(e^{j\theta} = j\cos\theta + \sin\theta\)
- [ ] C) \(e^{j\theta} = \cos\theta + j\sin\theta\)
- [ ] D) \(e^{j\theta} = \sin\theta + j\cos\theta\)

??? success "Answer"
    **C) \(e^{j\theta} = \cos\theta + j\sin\theta\).** This is Euler's formula, a fundamental relationship that connects complex exponentials to sinusoids. It is the mathematical bridge between the time-domain sinusoid and its phasor representation.

---

**9. A signal that satisfies \(x(t) = x(t + T)\) for all values of \(t\) is called:**

- [ ] A) An aperiodic signal
- [ ] B) A transient signal
- [ ] C) A periodic signal
- [ ] D) A stochastic signal

??? success "Answer"
    **C) A periodic signal.** This mathematical definition states that the signal repeats exactly every \(T\) seconds, where \(T\) is the period. Sinusoids, square waves, and triangular waves are all periodic signals.

---

**10. A North American household outlet is rated at 120 V RMS. What is its peak-to-peak voltage?**

- [ ] A) 120 V
- [ ] B) 170 V
- [ ] C) 240 V
- [ ] D) 340 V

??? success "Answer"
    **D) 340 V.** First find the peak: \(V_m = \sqrt{2} \times V_{rms} = \sqrt{2} \times 120 \approx 170\text{ V}\). Then the peak-to-peak value is \(V_{pp} = 2V_m = 2 \times 170 = 340\text{ V}\). This large swing is why household wiring is designed with proper insulation.

---

## Practice Problems

### Problem 1 — Sinusoid Characterization

A sinusoidal voltage source is described by:

\[v(t) = 50\sin(1000\pi t + 30°)\text{ V}\]

**(a)** Identify the peak amplitude \(V_m\), angular frequency \(\omega\), frequency \(f\), period \(T\), and phase angle \(\phi\).

**(b)** Calculate the RMS voltage.

**(c)** Calculate the half-cycle average voltage.

**(d)** At what value of \(t > 0\) does the voltage first reach its positive peak?

??? success "Solution"
    **(a)** Identifying parameters directly from the expression:

    \[V_m = 50\text{ V}, \quad \omega = 1000\pi\text{ rad/s}, \quad \phi = 30°\]

    \[f = \frac{\omega}{2\pi} = \frac{1000\pi}{2\pi} = 500\text{ Hz}\]

    \[T = \frac{1}{f} = \frac{1}{500} = 2\text{ ms}\]

    **(b)** RMS voltage:

    \[V_{rms} = \frac{V_m}{\sqrt{2}} = \frac{50}{\sqrt{2}} = 35.36\text{ V}\]

    **(c)** Half-cycle average:

    \[V_{avg} = \frac{2V_m}{\pi} = \frac{2 \times 50}{\pi} = 31.83\text{ V}\]

    **(d)** The positive peak occurs when \(\omega t + 30° = 90°\), so:

    \[\omega t = 60° = \frac{\pi}{3}\text{ rad}\]

    \[t = \frac{\pi/3}{1000\pi} = \frac{1}{3000} \approx 333\text{ μs}\]

---

### Problem 2 — Phase Relationship Analysis

Two sinusoidal currents share the same frequency:

\[i_1(t) = 8\cos(2\pi \times 1000\, t - 45°)\text{ mA}\]

\[i_2(t) = 5\sin(2\pi \times 1000\, t + 30°)\text{ mA}\]

**(a)** Convert \(i_2(t)\) to cosine form.

**(b)** Determine the phase difference between \(i_1\) and \(i_2\).

**(c)** Which signal leads, and by how many degrees?

??? success "Solution"
    **(a)** Using the identity \(\sin\theta = \cos(\theta - 90°)\):

    \[i_2(t) = 5\cos(2\pi \times 1000\,t + 30° - 90°) = 5\cos(2\pi \times 1000\,t - 60°)\text{ mA}\]

    **(b)** Phase angles (in cosine reference):
    - \(i_1\): phase \(\phi_1 = -45°\)
    - \(i_2\): phase \(\phi_2 = -60°\)

    Phase difference: \(\Delta\phi = \phi_1 - \phi_2 = -45° - (-60°) = +15°\)

    **(c)** Since \(\phi_1 > \phi_2\), signal \(i_1\) **leads** \(i_2\) by **15°**.

---

### Problem 3 — DC and AC Component Separation

A voltage signal is given by:

\[v(t) = 6 + 10\sin(377t)\text{ V}\]

**(a)** Identify the DC component and the AC component.

**(b)** Calculate the RMS value of the AC component.

**(c)** Calculate the total RMS value of the composite signal \(v(t)\).

**(d)** If this voltage is applied across a 50 Ω resistor, what is the average power dissipated?

??? success "Solution"
    **(a)** By inspection:

    \[V_{DC} = 6\text{ V}, \quad v_{AC}(t) = 10\sin(377t)\text{ V (peak} = 10\text{ V)}\]

    **(b)** RMS of the AC component:

    \[V_{AC,rms} = \frac{10}{\sqrt{2}} = 7.07\text{ V}\]

    **(c)** For a signal with both DC and AC parts, the total RMS is:

    \[V_{rms,total} = \sqrt{V_{DC}^2 + V_{AC,rms}^2} = \sqrt{6^2 + 7.07^2} = \sqrt{36 + 50} = \sqrt{86} = 9.27\text{ V}\]

    **(d)** Average power using the total RMS:

    \[P_{avg} = \frac{V_{rms,total}^2}{R} = \frac{86}{50} = 1.72\text{ W}\]

---

### Problem 4 — Complex Numbers in Rectangular and Polar Form

Perform the following operations and express results in both rectangular and polar form:

**(a)** Add: \(Z_1 = 3 + j4\) and \(Z_2 = 5 - j2\)

**(b)** Convert \(Z_3 = 8\angle{-30°}\) to rectangular form.

**(c)** Multiply \(Z_4 = 2\angle{45°}\) by \(Z_5 = 3\angle{-60°}\).

??? success "Solution"
    **(a)** Addition (add real and imaginary parts separately):

    \[Z_1 + Z_2 = (3+5) + j(4-2) = 8 + j2\]

    Polar form: \(|Z| = \sqrt{8^2 + 2^2} = \sqrt{68} = 8.25\), \(\theta = \tan^{-1}(2/8) = 14.0°\)

    \[Z_1 + Z_2 = 8 + j2 = 8.25\angle{14.0°}\]

    **(b)** Rectangular conversion using Euler's formula:

    \[Z_3 = 8\cos(-30°) + j8\sin(-30°) = 8(0.866) + j8(-0.5) = 6.93 - j4\]

    **(c)** Multiplication (add angles, multiply magnitudes):

    \[Z_4 \times Z_5 = (2 \times 3)\angle(45° + (-60°)) = 6\angle{-15°}\]

    Rectangular: \(6\cos(-15°) + j6\sin(-15°) = 5.80 - j1.55\)

---

### Answer Key

| Question | Answer |
|----------|--------|
| 1 | C |
| 2 | B |
| 3 | C |
| 4 | B |
| 5 | C |
| 6 | B |
| 7 | D |
| 8 | C |
| 9 | C |
| 10 | D |

*Practice problem solutions are provided in the collapsible blocks above.*
