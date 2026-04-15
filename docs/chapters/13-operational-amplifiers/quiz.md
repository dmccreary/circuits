# Chapter 13 Quiz — Operational Amplifiers

## Multiple Choice Quiz

**1. Which of the following best describes an ideal operational amplifier?**

- [ ] A) Finite voltage gain, infinite input impedance, zero output impedance
- [ ] B) Infinite voltage gain, zero input impedance, infinite output impedance
- [ ] C) Infinite voltage gain, infinite input impedance, zero output impedance
- [ ] D) Finite voltage gain, finite input impedance, finite output impedance

??? success "Answer"
    **C) Infinite voltage gain, infinite input impedance, zero output impedance.** The three defining characteristics of the ideal op-amp are \(A_{OL} \to \infty\), \(Z_{in} \to \infty\), and \(Z_{out} \to 0\). These idealizations make circuit analysis tractable while remaining accurate enough for most practical designs.

---

**2. In a negative-feedback op-amp circuit, the "virtual short" rule states:**

- [ ] A) The inputs are physically connected together with a wire
- [ ] B) The output voltage is always zero
- [ ] C) The voltage difference between the two inputs is essentially zero
- [ ] D) No current flows through the feedback resistor

??? success "Answer"
    **C) The voltage difference between the two inputs is essentially zero.** With negative feedback and very high open-loop gain, the feedback loop forces \(V_+ \approx V_-\). This is not a physical short circuit — no wire connects the inputs — but the feedback mechanism makes them appear shorted for analysis purposes.

---

**3. An inverting amplifier has \(R_i = 5\ \text{k}\Omega\) and \(R_f = 100\ \text{k}\Omega\). What is the closed-loop voltage gain?**

- [ ] A) \(+20\)
- [ ] B) \(-20\)
- [ ] C) \(+21\)
- [ ] D) \(-21\)

??? success "Answer"
    **B) \(-20\).** The inverting amplifier gain is:

    \[A_V = -\frac{R_f}{R_i} = -\frac{100\ \text{k}\Omega}{5\ \text{k}\Omega} = -20\]

    The negative sign indicates phase inversion. A non-inverting configuration would give \(+21\), but this is an inverting amplifier.

---

**4. A non-inverting amplifier is configured with \(R_f = 47\ \text{k}\Omega\) and \(R_i = 10\ \text{k}\Omega\). What is the voltage gain?**

- [ ] A) 4.7
- [ ] B) −4.7
- [ ] C) 5.7
- [ ] D) −5.7

??? success "Answer"
    **C) 5.7.** The non-inverting amplifier gain is:

    \[A_V = 1 + \frac{R_f}{R_i} = 1 + \frac{47}{10} = 1 + 4.7 = 5.7\]

    The gain is always positive (no phase inversion) and always greater than or equal to 1 for the non-inverting configuration.

---

**5. A voltage follower (unity-gain buffer) is used primarily because:**

- [ ] A) It provides very high voltage gain with low noise
- [ ] B) It provides very high input impedance and very low output impedance
- [ ] C) It inverts the phase of the signal by 180°
- [ ] D) It has a gain-bandwidth product much higher than other configurations

??? success "Answer"
    **B) It provides very high input impedance and very low output impedance.** The voltage follower has \(A_V = 1\) — it provides no voltage gain. Its value is impedance transformation: the extremely high input impedance does not load the source, and the extremely low output impedance can drive heavy loads. It isolates circuit stages from each other.

---

**6. An op-amp has a gain-bandwidth product (GBW) of 5 MHz. When configured as a non-inverting amplifier with \(R_f = 90\ \text{k}\Omega\) and \(R_i = 10\ \text{k}\Omega\), what is the maximum bandwidth of the circuit?**

- [ ] A) 5 MHz
- [ ] B) 1 MHz
- [ ] C) 500 kHz
- [ ] D) 50 kHz

??? success "Answer"
    **C) 500 kHz.** First calculate the closed-loop gain:

    \[A_{CL} = 1 + \frac{90}{10} = 10\]

    Then use the GBW relationship:

    \[BW = \frac{GBW}{A_{CL}} = \frac{5\ \text{MHz}}{10} = 500\ \text{kHz}\]

---

**7. Which configuration is produced when a capacitor replaces \(R_f\) in an inverting amplifier?**

- [ ] A) Differentiator
- [ ] B) Voltage follower
- [ ] C) Summing amplifier
- [ ] D) Integrator

??? success "Answer"
    **D) Integrator.** Placing a capacitor in the feedback position (where \(R_f\) normally sits) creates an integrator. The output is proportional to the time integral of the input: \(V_{out} = -(1/RC)\int V_{in}\,dt\). Placing a capacitor at the input (where \(R_i\) normally sits) would create a differentiator.

---

**8. An op-amp's slew rate is 2 V/µs. What is the maximum frequency at which a sinusoidal output of 8 V peak can be reproduced without distortion?**

- [ ] A) 250 kHz
- [ ] B) 159 kHz
- [ ] C) 39.8 kHz
- [ ] D) 25 kHz

??? success "Answer"
    **C) 39.8 kHz.** Using the slew rate frequency limit:

    \[f_{max} = \frac{SR}{2\pi V_{peak}} = \frac{2 \times 10^6}{2\pi \times 8} = \frac{2{,}000{,}000}{50.27} \approx 39{,}800\ \text{Hz} = 39.8\ \text{kHz}\]

    Above this frequency, the output cannot keep up with the required rate of change and produces a triangular waveform instead of a sinusoid.

---

**9. CMRR (Common-Mode Rejection Ratio) is defined as:**

- [ ] A) The ratio of output voltage to input voltage in dB
- [ ] B) \(20\log_{10}(A_{differential}/A_{common})\) in dB
- [ ] C) The difference between the positive and negative supply voltages
- [ ] D) The ratio of GBW to slew rate

??? success "Answer"
    **B) \(20\log_{10}(A_{differential}/A_{common})\) in dB.** CMRR measures how much better the op-amp amplifies the desired differential signal compared to the unwanted common-mode signal. A CMRR of 100 dB means the differential gain is 100,000 times larger than the common-mode gain — virtually all the common-mode interference is rejected.

---

**10. "Virtual ground" at the inverting input of an op-amp occurs when:**

- [ ] A) The inverting input is directly connected to ground with a wire
- [ ] B) The non-inverting input is grounded and negative feedback is applied
- [ ] C) Both input terminals are connected to a common supply rail
- [ ] D) The output voltage is exactly zero volts

??? success "Answer"
    **B) The non-inverting input is grounded and negative feedback is applied.** When \(V_+ = 0\) V (grounded non-inverting input), the virtual short rule (\(V_+ = V_-\)) forces \(V_- = 0\) V as well. The inverting input sits at 0 V without being physically connected to ground — it is virtually grounded through the feedback action. This is the key insight for analyzing the inverting amplifier, summing amplifier, integrator, and differentiator.

---

## Practice Problems

### Problem 1 — Design an Inverting Amplifier for Gain −25

Design an inverting amplifier with a closed-loop voltage gain of exactly −25. Use standard resistor values.

**(a)** Select an appropriate \(R_i\) value and calculate the required \(R_f\).

**(b)** If the nearest standard E24 resistor value for \(R_f\) is 240 kΩ, what is the actual achieved gain?

**(c)** Calculate the bias-compensation resistor \(R_{bias}\) to minimize errors from input bias current. Connect it from the non-inverting input to ground.

**(d)** If the op-amp has an input offset voltage \(V_{OS} = 2\ \text{mV}\), what is the resulting DC error at the output?

??? success "Solution"
    **(a)** Choose \(R_i = 10\ \text{k}\Omega\) (good compromise between source loading and noise). Calculate \(R_f\):

    \[R_f = |A_V| \times R_i = 25 \times 10\ \text{k}\Omega = 250\ \text{k}\Omega\]

    **(b)** With \(R_f = 240\ \text{k}\Omega\) (nearest standard E24 value):

    \[A_V = -\frac{R_f}{R_i} = -\frac{240}{10} = -24\]

    The actual gain is −24 rather than −25 (4% low). Use a 240 kΩ resistor in series with a 20 kΩ trim pot if precise gain is required.

    **(c)** Bias-compensation resistor \(R_{bias} = R_i \| R_f\):

    \[R_{bias} = \frac{R_i \cdot R_f}{R_i + R_f} = \frac{10 \times 240}{10 + 240} = \frac{2400}{250} = 9.6\ \text{k}\Omega \approx 10\ \text{k}\Omega\]

    Connect a 10 kΩ resistor from the non-inverting input to ground.

    **(d)** Output DC error from offset voltage (using actual gain magnitude of 24):

    \[V_{OS,out} = V_{OS} \times \left(1 + \frac{R_f}{R_i}\right) = 2\ \text{mV} \times \left(1 + \frac{240}{10}\right) = 2\ \text{mV} \times 25 = 50\ \text{mV}\]

    The 2 mV input offset appears as a 50 mV DC offset at the output.

---

### Problem 2 — Gain-Bandwidth Product Analysis

An op-amp datasheet specifies GBW = 8 MHz and slew rate SR = 3 V/µs.

**(a)** You need to amplify a signal with gain \(A_V = +40\) (non-inverting configuration). What is the bandwidth limit imposed by the GBW?

**(b)** The same amplifier must faithfully reproduce a 5 V peak sinusoidal output. What is the maximum frequency allowed by the slew rate?

**(c)** If the signal to be amplified has frequency content up to 150 kHz, does this design meet both requirements? If not, what gain and/or slew rate would be required?

??? success "Solution"
    **(a)** Bandwidth limit from GBW. For non-inverting gain of +40:

    \[BW = \frac{GBW}{A_{CL}} = \frac{8\ \text{MHz}}{40} = 200\ \text{kHz}\]

    **(b)** Maximum frequency from slew rate with 5 V peak output:

    \[f_{max} = \frac{SR}{2\pi V_{peak}} = \frac{3 \times 10^6}{2\pi \times 5} = \frac{3{,}000{,}000}{31.42} \approx 95.5\ \text{kHz}\]

    **(c)** The signal requires 150 kHz bandwidth. The GBW allows 200 kHz (adequate), but the slew rate only allows 95.5 kHz (inadequate — the slew rate is the binding constraint).

    **To meet the requirement:**

    Required slew rate:
    \[SR_{min} = 2\pi f V_{peak} = 2\pi \times 150{,}000 \times 5 = 4.71\ \text{V/µs}\]

    Select an op-amp with SR ≥ 5 V/µs (with margin). For example, the TL071 (SR = 13 V/µs) or OPA2134 (SR = 20 V/µs) would work.

---

### Problem 3 — Summing Amplifier Analysis

A summing amplifier has the following configuration:
- \(V_1 = 0.5\ \text{V}\), \(R_1 = 10\ \text{k}\Omega\)
- \(V_2 = -1.2\ \text{V}\), \(R_2 = 20\ \text{k}\Omega\)
- \(V_3 = 2.0\ \text{V}\), \(R_3 = 40\ \text{k}\Omega\)
- Feedback resistor: \(R_f = 40\ \text{k}\Omega\)
- Op-amp supply: ±15 V

**(a)** Using the virtual ground assumption, find the current through each input resistor.

**(b)** Apply KCL at the virtual ground node to find the total current through \(R_f\).

**(c)** Calculate the output voltage \(V_{out}\).

**(d)** Does the output voltage remain within the linear operating range of the op-amp?

??? success "Solution"
    **(a)** With virtual ground at the inverting input (\(V_- = 0\)), each input current flows through its resistor from \(V_n\) to 0 V:

    \[I_1 = \frac{V_1}{R_1} = \frac{0.5\ \text{V}}{10\ \text{k}\Omega} = 50\ \mu\text{A}\]

    \[I_2 = \frac{V_2}{R_2} = \frac{-1.2\ \text{V}}{20\ \text{k}\Omega} = -60\ \mu\text{A}\]

    \[I_3 = \frac{V_3}{R_3} = \frac{2.0\ \text{V}}{40\ \text{k}\Omega} = 50\ \mu\text{A}\]

    **(b)** KCL at the virtual ground node (no current enters the op-amp input):

    \[I_f = I_1 + I_2 + I_3 = 50 - 60 + 50 = 40\ \mu\text{A}\]

    **(c)** Output voltage. The current \(I_f\) flows from the virtual ground (0 V) through \(R_f\) to the output:

    \[V_{out} = 0 - I_f \cdot R_f = -40 \times 10^{-6} \times 40 \times 10^3 = -1.6\ \text{V}\]

    Alternatively, using the formula directly:

    \[V_{out} = -R_f\!\left(\frac{V_1}{R_1} + \frac{V_2}{R_2} + \frac{V_3}{R_3}\right) = -40\!\left(\frac{0.5}{10} + \frac{-1.2}{20} + \frac{2.0}{40}\right)\!\text{k} = -40(0.05 - 0.06 + 0.05)\ \text{mA} = -1.6\ \text{V}\]

    **(d)** The output is −1.6 V. With ±15 V supply, the linear output range is approximately ±13 V. Since −1.6 V is well within this range, the op-amp remains in its linear region. The golden rules apply and the result is valid.

---

### Problem 4 — Integrator Output for a Step Input

An op-amp integrator has \(R = 22\ \text{k}\Omega\) and \(C = 47\ \text{nF}\). At \(t = 0\), a step voltage of \(V_{in} = +3\ \text{V}\) is applied. Assume the initial condition \(V_{out}(0) = 0\) and the op-amp supply is ±12 V.

**(a)** Calculate the RC time constant.

**(b)** Write the expression for \(V_{out}(t)\) for \(t > 0\).

**(c)** How long does it take for the output to reach −6 V?

**(d)** The op-amp saturates at approximately ±11 V. How long until the output saturates?

**(e)** Sketch the shape of \(V_{out}\) versus time, labeling the saturation point.

??? success "Solution"
    **(a)** RC time constant:

    \[RC = 22 \times 10^3 \times 47 \times 10^{-9} = 1{,}034 \times 10^{-6}\ \text{s} \approx 1.034\ \text{ms}\]

    **(b)** For a constant input \(V_{in} = +3\ \text{V}\), the integrator output ramps linearly:

    \[V_{out}(t) = -\frac{V_{in}}{RC}\cdot t = -\frac{3\ \text{V}}{1.034\ \text{ms}}\cdot t = -2{,}902 \cdot t\ \ (\text{with } t \text{ in seconds})\]

    Or equivalently: \(V_{out}(t) = -2.902\,t/\text{ms}\ \text{V}\)

    **(c)** Time to reach −6 V:

    \[t = \frac{|V_{out}| \cdot RC}{V_{in}} = \frac{6\ \text{V} \times 1.034\ \text{ms}}{3\ \text{V}} = 2.068\ \text{ms}\]

    **(d)** Time to saturation at −11 V:

    \[t_{sat} = \frac{11\ \text{V} \times 1.034\ \text{ms}}{3\ \text{V}} = \frac{11.374\ \text{ms}}{3} = 3.79\ \text{ms}\]

    After 3.79 ms, the output reaches −11 V and pins to the negative rail. The golden rules no longer apply once the op-amp saturates.

    **(e)** Shape description: \(V_{out}\) is a straight line with slope \(-2{,}902\ \text{V/s}\) starting at 0 V at \(t = 0\), crossing −6 V at \(t = 2.07\ \text{ms}\), and clamping at −11 V at \(t = 3.79\ \text{ms}\). After saturation, the output remains flat at −11 V regardless of the input.

---
