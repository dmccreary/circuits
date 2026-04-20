---
title: Chapter 5 Content — Passive Components
description: Teaching content for Chapter 5 covering capacitors, inductors, mutual inductance, real components, and signal fundamentals
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.04
---

<div class="unit1-styled" markdown>

# Chapter 5 — Passive Components: Resistors, Capacitors, and Inductors

<details class="video-overview">
<summary><strong>Chapter Overview</strong> (click to expand)</summary>

Beyond the resistor, two essential passive components — capacitors and inductors — store energy rather than dissipating it, giving circuits memory and frequency-dependent behavior. This chapter explains the physical construction, V-I relationships, and energy storage properties of all three passive component types, laying the groundwork for transient and AC analysis.

**Key Takeaways**

1. A capacitor stores energy in an electric field and its current is proportional to the rate of change of voltage: i = C dv/dt.
2. An inductor stores energy in a magnetic field and its voltage is proportional to the rate of change of current: v = L di/dt.
3. Under DC steady-state conditions, capacitors behave as open circuits and inductors behave as short circuits, which is a key simplification for initial analysis.

</details>

## 5.1 The Capacitor

A **capacitor** is a component that stores energy in an **electric field**. In its simplest form, it consists of two conductive plates separated by an insulating material called a **dielectric**. When a voltage is applied across the plates, charge accumulates — positive charge on one plate, negative on the other — and an electric field forms between them.

The relationship between charge and voltage defines **capacitance** \(C\):

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[C = \frac{Q}{V}\]

where \(C\) is capacitance in farads (F), \(Q\) is charge in coulombs (C), and \(V\) is voltage in volts (V).

</div>

For a parallel plate capacitor, capacitance depends on physical dimensions:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[C = \varepsilon_0 \varepsilon_r \frac{A}{d}\]

where \(\varepsilon_0 = 8.854 \times 10^{-12}\) F/m is the permittivity of free space, \(\varepsilon_r\) is the relative permittivity of the dielectric, \(A\) is the plate area, and \(d\) is the plate separation.

</div>

The unit of capacitance is the **farad** (F), named after Michael Faraday. One farad is enormous in practice — most capacitors are measured in microfarads (μF, 10⁻⁶ F), nanofarads (nF, 10⁻⁹ F), or picofarads (pF, 10⁻¹² F).

**The V-I relationship for a capacitor:**

Since \(Q = CV\), differentiating both sides with respect to time:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[i_C = C \frac{dv_C}{dt}\]

</div>

This is the defining equation of a capacitor. Two immediate consequences:

1. **A capacitor passes no DC current.** If \(dv/dt = 0\) (constant voltage), then \(i = 0\). Capacitors block DC.
2. **Voltage across a capacitor cannot change instantaneously.** An instantaneous voltage change (\(dv/dt \to \infty\)) would require infinite current, which is physically impossible.

#### Diagram: Capacitor

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/capacitor/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

#### Diagram: Parallel-Plate Capacitor

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/parallel-plate-capacitor/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 5.2 Energy Stored in a Capacitor

Unlike a resistor, which dissipates energy as heat, a capacitor stores energy and can return it to the circuit later. The energy stored in a charged capacitor is:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[E_C = \frac{1}{2} C V^2\]

where \(E\) is in joules (J), \(C\) in farads (F), and \(V\) in volts (V).

</div>

This is analogous to the kinetic energy of a moving mass (\(\frac{1}{2}mv^2\)), with capacitance analogous to mass and voltage analogous to velocity. The capacitor "resists" changes in voltage just as a mass resists changes in velocity.

**Example:** A 100 μF capacitor charged to 12 V stores:
\(E = \frac{1}{2} \times 100 \times 10^{-6} \times 144 = 7.2\) mJ

---

## 5.3 Capacitors in Series and Parallel

Capacitors combine differently from resistors — the formulas are *swapped*.

**Capacitors in parallel** — plates effectively add together:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[C_{eq} = C_1 + C_2 + C_3 + \cdots\]

</div>

**Capacitors in series** — same charge on each, voltages add:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\frac{1}{C_{eq}} = \frac{1}{C_1} + \frac{1}{C_2} + \frac{1}{C_3} + \cdots\]

For two capacitors: \(\displaystyle C_{eq} = \frac{C_1 C_2}{C_1 + C_2}\)

</div>

!!! tip "Memory Aid"
    Capacitors combine like resistors but with the series/parallel rules **reversed**: parallel capacitors add directly (like series resistors), and series capacitors use the reciprocal formula (like parallel resistors).

Series combination increases the effective plate separation (lower capacitance, higher voltage rating). Parallel combination increases effective plate area (higher capacitance).

#### Diagram: Capacitor Combinations

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/capacitor-combinations/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 5.4 The Inductor

An **inductor** is a component that stores energy in a **magnetic field**. In its basic form, it's a coil of wire. When current flows through the coil, it creates a magnetic field. If the current changes, the changing magnetic flux induces a voltage that *opposes* the change — this is Lenz's Law in action.

The defining relationship for an inductor:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[v_L = L \frac{di_L}{dt}\]

where \(L\) is inductance in henrys (H), \(v_L\) is the voltage across the inductor in volts, and \(i_L\) is the current through the inductor in amperes.

</div>

Two key consequences, perfectly dual to the capacitor:

1. **An inductor has no voltage across it in DC steady state.** If \(di/dt = 0\) (constant current), then \(v = 0\). Inductors are short circuits to DC.
2. **Current through an inductor cannot change instantaneously.** An instantaneous current change would require infinite voltage, which is physically impossible.

**Inductance formula for a solenoid:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[L = \mu_0 \mu_r \frac{N^2 A}{\ell}\]

where \(N\) is the number of turns, \(A\) is the cross-sectional area, \(\ell\) is the coil length, and \(\mu_r\) is the relative permeability of the core.

</div>

#### Diagram: Inductor

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/inductor/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 5.5 Energy Stored in an Inductor

The energy stored in an inductor's magnetic field:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[E_L = \frac{1}{2} L I^2\]

</div>

The **duality** between capacitors and inductors is complete:

| Property | Capacitor | Inductor |
|----------|-----------|----------|
| Stores energy in | Electric field | Magnetic field |
| Energy stored | \(\frac{1}{2}CV^2\) | \(\frac{1}{2}LI^2\) |
| V-I relation | \(i = C\,dv/dt\) | \(v = L\,di/dt\) |
| Cannot change instantly | Voltage | Current |
| Blocks | DC | AC |
| Passes | AC | DC |

---

## 5.6 Inductors in Series and Parallel

Inductors combine exactly like resistors (assuming no mutual coupling):

**Inductors in series:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[L_{eq} = L_1 + L_2 + L_3 + \cdots\]

</div>

**Inductors in parallel:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\frac{1}{L_{eq}} = \frac{1}{L_1} + \frac{1}{L_2} + \cdots\]

For two: \(\displaystyle L_{eq} = \frac{L_1 L_2}{L_1 + L_2}\)

</div>

---

## 5.7 Mutual Inductance

When two inductors are placed near each other, the magnetic field of one can influence the other. This is **mutual inductance** \(M\), and it is the operating principle of **transformers**.

If current \(i_1\) changes in inductor 1, it induces a voltage in inductor 2:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[v_2 = M \frac{di_1}{dt}\]

</div>

The **coupling coefficient** \(k\) describes how tightly the inductors are coupled:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[k = \frac{M}{\sqrt{L_1 L_2}}, \quad 0 \le k \le 1\]

</div>

- \(k = 0\): No coupling (inductors completely isolated)
- \(k = 1\): Perfect coupling (all flux of one links the other) — ideal transformer behavior
- Practical transformers achieve \(k\) between 0.95 and 0.999

#### Diagram: Mutual Inductance

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/mutual-inductance/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

For inductors in series with mutual inductance:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[L_{eq} = L_1 + L_2 \pm 2M\]

\(+2M\) when fields aid (series-aiding), \(-2M\) when fields oppose (series-opposing)

</div>

---

## 5.8 Real vs. Ideal Components

The components you've been analyzing are **ideal**: a capacitor is purely capacitive, an inductor is purely inductive. Real components are more complicated.

**Real capacitors** have:
- **Equivalent Series Resistance (ESR):** A small resistance in series with the capacitor, representing losses in the plates and leads. Matters in power supply filtering and high-current applications.
- **Equivalent Series Inductance (ESL):** At high frequencies, the leads act as inductors, limiting the capacitor's effectiveness.
- **Leakage resistance:** A large resistance in parallel, causing slow self-discharge.

**Real inductors** have:
- **Winding resistance (DCR):** The wire forming the coil has finite resistance. A real inductor looks like an ideal inductor in series with a small resistor.
- **Parasitic capacitance:** At high frequencies, capacitance between adjacent windings dominates. Every inductor has a **self-resonant frequency (SRF)** above which it acts like a capacitor.
- **Core losses:** If a ferromagnetic core is used, hysteresis and eddy current losses dissipate energy, modeled as a resistance in parallel with the inductor.

**Component selection tips:**
- For high-frequency bypass (decoupling), choose capacitors with low ESL — chip capacitors over lead-type.
- For RF inductors, use air-core to avoid core losses.
- Derate voltage and current ratings in design (typically to 80% of maximum).

#### Diagram: Real Capacitor Model

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/real-capacitor-model/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 5.9 Signal Fundamentals

Before diving into AC circuits, we need the vocabulary to describe signals that change over time.

A **sinusoidal signal** (the most important signal in electrical engineering) is described by:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[v(t) = V_m \sin(\omega t + \phi)\]

where \(V_m\) is the **peak (amplitude)**, \(\omega = 2\pi f\) is the **angular frequency** (rad/s), \(f\) is the **frequency** (Hz), and \(\phi\) is the **phase angle** (rad or degrees).

</div>

**Key signal parameters:**

| Parameter | Symbol | Definition | Unit |
|-----------|--------|------------|------|
| Period | \(T\) | Time for one complete cycle | seconds (s) |
| Frequency | \(f\) | Cycles per second, \(f = 1/T\) | hertz (Hz) |
| Angular frequency | \(\omega\) | \(\omega = 2\pi f\) | rad/s |
| Peak value | \(V_m\) | Maximum amplitude | V |
| Peak-to-peak | \(V_{pp}\) | \(V_{pp} = 2V_m\) | V |
| Phase angle | \(\phi\) | Time offset from reference | degrees or rad |

**RMS value:** For a sinusoid, the **Root Mean Square (RMS)** value is:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[V_{rms} = \frac{V_m}{\sqrt{2}} \approx 0.707 V_m\]

</div>

The RMS value is what meters measure (for sinusoids), and it's what you use to calculate power. US household voltage is 120 V RMS — the peak voltage is actually \(120\sqrt{2} \approx 170\) V.

**Phase relationships:**

When \(\phi > 0\), the signal **leads** the reference (arrives earlier in time).  
When \(\phi < 0\), the signal **lags** the reference (arrives later in time).

#### Diagram: Signal Parameters

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/signal-parameters/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 5.10 The Decibel Scale

The **decibel (dB)** is a logarithmic unit for expressing ratios of power, voltage, or current. It's used everywhere in audio and communications because human hearing is approximately logarithmic and because gains/losses cascade multiplicatively (which becomes addition in dB).

**Power ratio:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\text{dB} = 10 \log_{10}\!\left(\frac{P_2}{P_1}\right)\]

</div>

**Voltage ratio** (assuming equal impedances):

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

\[\text{dB} = 20 \log_{10}\!\left(\frac{V_2}{V_1}\right)\]

</div>

**Key dB values to memorize:**

| dB | Power ratio | Voltage ratio |
|----|------------|---------------|
| +3 dB | ×2 | ×1.41 |
| +6 dB | ×4 | ×2 |
| +10 dB | ×10 | ×3.16 |
| +20 dB | ×100 | ×10 |
| 0 dB | ×1 | ×1 |
| -3 dB | ÷2 | ÷1.41 |
| -20 dB | ÷100 | ÷10 |

The **human hearing range** spans approximately 20 Hz to 20,000 Hz (20 kHz). In amplitude, the ear can handle a power range of about 10¹² (120 dB) from threshold of hearing to threshold of pain.

#### Diagram: Decibel Scale

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../../../sims/decibel-scale/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

## 5.11 Chapter Summary

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 28px; margin: 1rem 0;" markdown>

**Capacitors:**
- Store energy in electric fields: \(E = \frac{1}{2}CV^2\)
- V-I: \(i = C\,dv/dt\) — block DC, voltage cannot change instantaneously
- Parallel: \(C_{eq} = C_1 + C_2\); Series: \(1/C_{eq} = 1/C_1 + 1/C_2\)

**Inductors:**
- Store energy in magnetic fields: \(E = \frac{1}{2}LI^2\)
- V-I: \(v = L\,di/dt\) — short to DC, current cannot change instantaneously
- Series: \(L_{eq} = L_1 + L_2\); Parallel: \(1/L_{eq} = 1/L_1 + 1/L_2\)
- With mutual inductance: \(L_{eq} = L_1 + L_2 \pm 2M\)

**Real components:** Have parasitic ESR, ESL (capacitors) and DCR, capacitance, core losses (inductors)

**Signal fundamentals:**
- Sinusoid: \(v(t) = V_m \sin(\omega t + \phi)\)
- RMS: \(V_{rms} = V_m/\sqrt{2}\) for sinusoids
- Decibel: \(\text{dB} = 20\log_{10}(V_2/V_1)\) for voltage

</div>

</div>
