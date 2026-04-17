---
title: Chapter 10 Practice Problems — AC Power Analysis
description: Practice problems with solutions for Chapter 10 covering real, reactive, apparent power, power factor, and power factor correction
---

<div class="unit1-styled" markdown>

# Chapter 10 Practice Problems

## Practice Problems

### Problem 1 — Basic AC Power Calculation

A load draws 8 A (RMS) from a 240 V (RMS) source. The phase angle between voltage and current is 37°.

**(a)** Calculate the apparent power S.

**(b)** Calculate the real power P.

**(c)** Calculate the reactive power Q.

**(d)** Is the load inductive or capacitive?

??? success "Solution"
    **(a)** Apparent power:

    \[S = V_{rms} I_{rms} = 240 \times 8 = 1{,}920\text{ VA}\]

    **(b)** Real power:

    \[P = S\cos\theta = 1{,}920 \times \cos(37°) = 1{,}920 \times 0.7986 = 1{,}533\text{ W}\]

    **(c)** Reactive power:

    \[Q = S\sin\theta = 1{,}920 \times \sin(37°) = 1{,}920 \times 0.6018 = 1{,}155\text{ VAR}\]

    Verify: \(\sqrt{P^2 + Q^2} = \sqrt{1533^2 + 1155^2} = \sqrt{2{,}350{,}089 + 1{,}334{,}025} = \sqrt{3{,}684{,}114} = 1{,}919\text{ VA} \approx S\) ✓

    **(d)** Positive Q (current lags voltage): the load is **inductive** (lagging power factor).

---

### Problem 2 — Power Factor Calculation

A motor draws 15 A (RMS) from a 120 V (RMS), 60 Hz source. The motor dissipates 1,200 W of real power.

**(a)** Calculate the apparent power and power factor.

**(b)** Calculate the reactive power.

**(c)** What is the phase angle between voltage and current?

**(d)** Express the motor's impedance in rectangular and polar form.

??? success "Solution"
    **(a)** Apparent power and power factor:

    \[S = V_{rms} I_{rms} = 120 \times 15 = 1{,}800\text{ VA}\]
    \[PF = \frac{P}{S} = \frac{1{,}200}{1{,}800} = 0.667 = 66.7\%\]

    **(b)** Reactive power:

    \[Q = \sqrt{S^2 - P^2} = \sqrt{1800^2 - 1200^2} = \sqrt{3{,}240{,}000 - 1{,}440{,}000} = \sqrt{1{,}800{,}000} = 1{,}342\text{ VAR}\]

    **(c)** Phase angle: \(\theta = \arccos(0.667) = 48.2°\) (lagging — motor is inductive)

    **(d)** Impedance: \(|Z| = V_{rms}/I_{rms} = 120/15 = 8\ \Omega\). Polar: \(8\angle 48.2°\ \Omega\). Rectangular: \(8\cos(48.2°) + j8\sin(48.2°) = 5.33 + j5.97\ \Omega\).

---

### Problem 3 — Power Factor Correction

An industrial load connected to 480 V (RMS), 60 Hz draws 50 A (RMS) at a power factor of 0.75 lagging.

**(a)** Calculate S, P, and Q for the load.

**(b)** A capacitor bank is to be added in parallel to correct the power factor to 0.95 lagging. Calculate the required reactive power from the capacitors.

**(c)** Calculate the capacitance required.

**(d)** After correction, calculate the new line current.

??? success "Solution"
    **(a)** Before correction:

    \[S = 480 \times 50 = 24{,}000\text{ VA} = 24\text{ kVA}\]
    \[P = S \times PF = 24{,}000 \times 0.75 = 18{,}000\text{ W} = 18\text{ kW}\]
    \[Q_L = \sqrt{S^2 - P^2} = \sqrt{24000^2 - 18000^2} = \sqrt{576{,}000{,}000 - 324{,}000{,}000} = \sqrt{252{,}000{,}000} = 15{,}875\text{ VAR}\]

    **(b)** Required new Q after correction to PF = 0.95:

    \[\theta_{new} = \arccos(0.95) = 18.19°\]
    \[Q_{new} = P\tan\theta_{new} = 18{,}000 \times \tan(18.19°) = 18{,}000 \times 0.3287 = 5{,}917\text{ VAR}\]
    \[Q_C = Q_L - Q_{new} = 15{,}875 - 5{,}917 = 9{,}958\text{ VAR (capacitive)}\]

    **(c)** Capacitor reactive power formula \(Q_C = V_{rms}^2/X_C = V_{rms}^2 \omega C\):

    \[C = \frac{Q_C}{V_{rms}^2 \omega} = \frac{9{,}958}{480^2 \times 2\pi\times60} = \frac{9{,}958}{230{,}400 \times 376.99} = \frac{9{,}958}{86{,}860{,}416} = 114.6\text{ μF}\]

    **(d)** New apparent power: \(S_{new} = P/PF_{new} = 18{,}000/0.95 = 18{,}947\text{ VA}\). New line current: \(I_{new} = S_{new}/V = 18{,}947/480 = 39.5\text{ A}\). Reduced from 50 A — a 21% decrease in line current.

---

### Problem 4 — Complex Power

A load has impedance \(\mathbf{Z} = 6 + j8\ \Omega\) and carries a current of \(\mathbf{I} = 5\angle -30°\text{ A (RMS)}\).

**(a)** Calculate the complex power \(\mathbf{S} = I_{rms}^2 Z\).

**(b)** Identify P, Q, and S.

**(c)** Calculate the voltage phasor \(\mathbf{V}\).

**(d)** Verify by computing \(\mathbf{S} = \mathbf{V} \mathbf{I}^*\).

??? success "Solution"
    **(a)** Complex power:

    \[\mathbf{S} = I_{rms}^2 \mathbf{Z} = (5)^2 (6 + j8) = 25(6 + j8) = 150 + j200\text{ VA}\]

    **(b)** \(P = 150\text{ W}\), \(Q = 200\text{ VAR}\), \(S = |\mathbf{S}| = \sqrt{150^2 + 200^2} = \sqrt{22{,}500 + 40{,}000} = 250\text{ VA}\)

    **(c)** Voltage: \(|Z| = \sqrt{36+64} = 10\ \Omega\), \(\angle Z = \arctan(8/6) = 53.13°\)

    \[\mathbf{V} = \mathbf{I}\mathbf{Z} = 5\angle -30° \times 10\angle 53.13° = 50\angle 23.13°\text{ V}\]

    **(d)** Verify: \(\mathbf{I}^* = 5\angle +30°\)

    \[\mathbf{S} = \mathbf{V}\mathbf{I}^* = 50\angle 23.13° \times 5\angle 30° = 250\angle 53.13° = 250(\cos53.13° + j\sin53.13°) = 150 + j200\text{ VA}\] ✓

---

### Problem 5 — Maximum Power Transfer (AC)

A source has Thevenin equivalent \(V_{Th} = 100\angle 0°\text{ V}\) and \(Z_{Th} = 10 + j6\ \Omega\).

**(a)** What load impedance \(Z_L\) draws maximum real power?

**(b)** Calculate the maximum real power delivered to the load.

**(c)** What is the efficiency at maximum power transfer?

??? success "Solution"
    **(a)** For maximum real power transfer, the load impedance must be the complex conjugate of the source:

    \[Z_L = Z_{Th}^* = 10 - j6\ \Omega\]

    **(b)** At conjugate match, the reactive parts cancel and the total series impedance is \(Z_{total} = Z_{Th} + Z_L = (10+j6) + (10-j6) = 20\ \Omega\). The maximum power is:

    \[P_{max} = \frac{|V_{Th}|^2}{4 R_{Th}} = \frac{100^2}{4 \times 10} = \frac{10{,}000}{40} = 250\text{ W}\]

    **(c)** Total power from source: \(P_{total} = I_{rms}^2 \times 2R_{Th}\), where \(I_{rms} = 100/(2\times10\sqrt{2}) = 3.536\text{ A}\). Efficiency = \(P_L/P_{source} = 250/500 = 50\%\). At maximum power transfer, efficiency is always exactly 50%.

</div>
