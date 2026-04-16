---
title: Chapter 5 Practice Problems — Passive Components
description: Practice problems with solutions for Chapter 5 covering capacitors, inductors, energy storage, and signal fundamentals
---

<div class="unit1-styled" markdown>

# Chapter 5 Practice Problems

## Practice Problems

### Problem 1 — Capacitor Combinations

Three capacitors are given: C1 = 10 μF, C2 = 22 μF, C3 = 47 μF.

**(a)** Calculate the equivalent capacitance when all three are in parallel.

**(b)** Calculate the equivalent capacitance when all three are in series.

**(c)** Calculate the equivalent capacitance when C1 is in series with the parallel combination of C2 and C3.

??? success "Solution"
    **(a)** Parallel capacitors add directly:

    \[C_{eq} = 10 + 22 + 47 = 79\text{ μF}\]

    **(b)** Series combination uses the reciprocal formula:

    \[\frac{1}{C_{eq}} = \frac{1}{10} + \frac{1}{22} + \frac{1}{47} = 0.100 + 0.0455 + 0.0213 = 0.1668\text{ μF}^{-1}\]
    \[C_{eq} = \frac{1}{0.1668} = 5.99\text{ μF}\]

    **(c)** First find C2 ∥ C3:

    \[C_{23} = C_2 + C_3 = 22 + 47 = 69\text{ μF}\]

    Then C1 in series with C23:

    \[C_{eq} = \frac{C_1 \cdot C_{23}}{C_1 + C_{23}} = \frac{10 \times 69}{10 + 69} = \frac{690}{79} = 8.73\text{ μF}\]

---

### Problem 2 — Capacitor Energy Storage

A 100 μF electrolytic capacitor is charged to 25 V.

**(a)** How much energy is stored in the capacitor?

**(b)** The capacitor discharges to 10 V. How much energy was released?

**(c)** If this energy is released in 5 ms, what is the average power delivered during discharge?

??? success "Solution"
    **(a)** Energy stored at 25 V:

    \[E_{initial} = \frac{1}{2}CV^2 = \frac{1}{2} \times 100 \times 10^{-6} \times (25)^2 = 50 \times 10^{-6} \times 625 = 31.25\text{ mJ}\]

    **(b)** Energy remaining at 10 V:

    \[E_{final} = \frac{1}{2} \times 100 \times 10^{-6} \times (10)^2 = 5.0\text{ mJ}\]

    Energy released: \(\Delta E = 31.25 - 5.0 = 26.25\text{ mJ}\)

    **(c)** Average power:

    \[P = \frac{\Delta E}{\Delta t} = \frac{26.25 \times 10^{-3}}{5 \times 10^{-3}} = 5.25\text{ W}\]

---

### Problem 3 — Inductor Characteristics

An inductor has L = 50 mH. A current that increases linearly from 0 to 2 A in 10 ms is applied.

**(a)** Calculate the voltage across the inductor during this ramp.

**(b)** Calculate the energy stored in the inductor at the end of the ramp (when I = 2 A).

**(c)** If this inductor has a winding resistance of 0.5 Ω, how much power is dissipated in the winding when carrying 2 A DC in steady state?

??? success "Solution"
    **(a)** The voltage across an inductor is \(v = L\, di/dt\). The rate of change is:

    \[\frac{di}{dt} = \frac{2\text{ A} - 0}{10 \times 10^{-3}\text{ s}} = 200\text{ A/s}\]
    \[v = L \frac{di}{dt} = 50 \times 10^{-3} \times 200 = 10\text{ V}\]

    **(b)** Energy stored at 2 A:

    \[E_L = \frac{1}{2}LI^2 = \frac{1}{2} \times 50 \times 10^{-3} \times (2)^2 = 0.025 \times 4 = 0.1\text{ J} = 100\text{ mJ}\]

    **(c)** In DC steady state \(di/dt = 0\), so \(v_L = 0\). All voltage drops appear across the winding resistance:

    \[P_{winding} = I^2 R_w = (2)^2 \times 0.5 = 2\text{ W}\]

---

### Problem 4 — RMS and Peak Values

A sinusoidal voltage is described by \(v(t) = 170\sin(377t)\) volts.

**(a)** Identify the peak voltage, angular frequency, frequency, and period.

**(b)** Calculate the RMS voltage.

**(c)** This voltage is applied across a 100 Ω resistor. Calculate the average power dissipated.

**(d)** What is the peak-to-peak voltage of this signal?

??? success "Solution"
    **(a)** From the equation:

    - Peak voltage: \(V_m = 170\text{ V}\)
    - Angular frequency: \(\omega = 377\text{ rad/s}\)
    - Frequency: \(f = \omega / (2\pi) = 377 / 6.283 = 60\text{ Hz}\) (standard US AC frequency)
    - Period: \(T = 1/f = 1/60 = 16.7\text{ ms}\)

    **(b)** RMS voltage:

    \[V_{rms} = \frac{V_m}{\sqrt{2}} = \frac{170}{\sqrt{2}} = \frac{170}{1.414} = 120.2\text{ V} \approx 120\text{ V}\]

    **(c)** Average power:

    \[P = \frac{V_{rms}^2}{R} = \frac{(120)^2}{100} = \frac{14{,}400}{100} = 144\text{ W}\]

    **(d)** Peak-to-peak voltage:

    \[V_{pp} = 2V_m = 2 \times 170 = 340\text{ V}\]

---

### Problem 5 — Decibel Calculations

An audio amplifier has an input signal of 10 mV and produces an output of 5 V.

**(a)** Calculate the voltage gain in decibels.

**(b)** A signal passes through two cascaded stages: Stage 1 has a gain of +20 dB, Stage 2 has a gain of −6 dB. What is the overall voltage gain in dB? What is the overall voltage ratio?

**(c)** A power amplifier increases signal power from 1 mW to 50 W. Express this as a power gain in decibels.

??? success "Solution"
    **(a)** Voltage gain in dB:

    \[A_v(\text{dB}) = 20\log_{10}\left(\frac{V_{out}}{V_{in}}\right) = 20\log_{10}\left(\frac{5}{0.010}\right) = 20\log_{10}(500) = 20 \times 2.699 = 53.98\text{ dB}\]

    **(b)** Cascaded gains add in dB:

    \[A_{total} = +20 + (-6) = +14\text{ dB}\]

    Converting back to voltage ratio: \(V_{ratio} = 10^{14/20} = 10^{0.7} = 5.01\)

    **(c)** Power gain in dB:

    \[G_P = 10\log_{10}\left(\frac{P_{out}}{P_{in}}\right) = 10\log_{10}\left(\frac{50}{0.001}\right) = 10\log_{10}(50{,}000) = 10 \times 4.699 = 46.99\text{ dB} \approx 47\text{ dB}\]

---

### Problem 6 — Mutual Inductance

Two coupled inductors have L1 = 100 mH, L2 = 400 mH, and a coupling coefficient k = 0.5.

**(a)** Calculate the mutual inductance M.

**(b)** If the current in L1 changes at a rate of 500 A/s, what voltage is induced in L2?

**(c)** If both inductors are connected in series with aiding flux (currents in same direction), what is the total inductance?

??? success "Solution"
    **(a)** Mutual inductance:

    \[M = k\sqrt{L_1 L_2} = 0.5\sqrt{0.1 \times 0.4} = 0.5\sqrt{0.04} = 0.5 \times 0.2 = 0.1\text{ H} = 100\text{ mH}\]

    **(b)** Induced voltage in L2:

    \[v_{12} = M\frac{di_1}{dt} = 0.1 \times 500 = 50\text{ V}\]

    **(c)** Series-aiding inductors:

    \[L_{total} = L_1 + L_2 + 2M = 100 + 400 + 2(100) = 700\text{ mH}\]

</div>
