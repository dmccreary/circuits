---
title: Chapter 12 Quiz — Filters and Resonance
description: Multiple-choice questions and practice problems covering RC/RL first-order filters, RLC band-pass design, passive vs. active filters, audio decibel levels, headroom, and dynamic range
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 12 Quiz — Filters and Resonance

## Multiple Choice Questions

**1.** An RC low-pass filter has \(R = 10\ \text{k}\Omega\) and \(C = 10\ \text{nF}\). What is the cutoff frequency?

- A) 159 Hz
- B) 1{,}592 Hz
- C) 15{,}920 Hz
- D) 100 kHz

??? success "Answer"
    **B) 1,592 Hz**

    \[f_c = \frac{1}{2\pi RC} = \frac{1}{2\pi \times 10{,}000 \times 10 \times 10^{-9}} = \frac{1}{628.3 \times 10^{-6}} \approx 1{,}592\ \text{Hz}\]

    This is the frequency at which the output voltage falls to \(1/\sqrt{2} \approx 0.707\) of the input, corresponding to -3 dB of attenuation.

---

**2.** In an RC high-pass filter, compared with an RC low-pass filter using the same R and C values, the cutoff frequency is:

- A) Twice as high
- B) Twice as low
- C) The same
- D) Dependent on the signal amplitude

??? success "Answer"
    **C) The same**

    Both the RC low-pass and RC high-pass filters have the same cutoff frequency \(f_c = 1/(2\pi RC)\). The only difference is which element — C or R — the output is taken across, which reverses the pass and stop bands but does not change the frequency at which \(|H| = 0.707\).

---

**3.** A series RLC circuit has \(L = 50\ \text{mH}\) and \(C = 50\ \text{nF}\). What is the resonant frequency?

- A) 318 Hz
- B) 1{,}004 Hz
- C) 3{,}183 Hz
- D) 10{,}066 Hz

??? success "Answer"
    **C) 3,183 Hz**

    \[f_0 = \frac{1}{2\pi\sqrt{LC}} = \frac{1}{2\pi\sqrt{50 \times 10^{-3} \times 50 \times 10^{-9}}} = \frac{1}{2\pi\sqrt{2.5 \times 10^{-9}}}\]

    \[\sqrt{2.5 \times 10^{-9}} = 5 \times 10^{-5}\ \text{s}\]

    \[f_0 = \frac{1}{2\pi \times 5 \times 10^{-5}} = \frac{1}{314.2 \times 10^{-6}} \approx 3{,}183\ \text{Hz}\]

---

**4.** An RLC band-pass filter has centre frequency \(f_0 = 5\ \text{kHz}\) and \(Q = 25\). What is the bandwidth?

- A) 20 Hz
- B) 200 Hz
- C) 2{,}000 Hz
- D) 125 kHz

??? success "Answer"
    **B) 200 Hz**

    \[BW = \frac{f_0}{Q} = \frac{5{,}000}{25} = 200\ \text{Hz}\]

    The filter passes frequencies from approximately 4,900 Hz to 5,100 Hz. A higher Q gives a narrower, more selective band.

---

**5.** Which of the following is an advantage of active filters over passive filters at audio frequencies?

- A) They require no power supply
- B) They can handle higher voltages
- C) They eliminate the need for large inductors
- D) They produce less noise than passive circuits

??? success "Answer"
    **C) They eliminate the need for large inductors**

    At audio frequencies (20 Hz–20 kHz), achieving a low cutoff with an RL filter would require inductors in the range of henries — physically large, expensive, and susceptible to magnetic interference. Active filters use only resistors, capacitors, and an op-amp, achieving the same frequency-shaping response with compact, inexpensive components. (Active filters do require a power supply and typically add more noise than a purely passive circuit.)

---

**6.** A microphone preamplifier must increase an input of −52 dBV to an output of +2 dBV. What is the required voltage gain in dB, and approximately what linear voltage gain does this represent?

- A) 50 dB, \(\approx 316\times\)
- B) 54 dB, \(\approx 501\times\)
- C) 50 dB, \(\approx 100{,}000\times\)
- D) 26 dB, \(\approx 20\times\)

??? success "Answer"
    **A) 50 dB, ≈ 316×**

    \[A_{dB} = V_{out} - V_{in} = +2 - (-52) = 54\ \text{dB}\]

    Wait — recalculating carefully: \(+2 - (-52) = 54\) dB, and \(A_V = 10^{54/20} = 10^{2.7} \approx 501\).

    **Correction — the correct answer is B) 54 dB, ≈ 501×.**

    \[A_V = 10^{54/20} = 10^{2.70} \approx 501\]

    The two-stage inverting design with each stage providing gain of ≈22 (≈27 dB) achieves this.

---

**7.** The dBu audio level reference is based on:

- A) 1 V RMS into any impedance
- B) 1 mW into any impedance
- C) 0.775 V RMS (the voltage delivering 1 mW into 600 Ω)
- D) The thermal noise voltage at room temperature

??? success "Answer"
    **C) 0.775 V RMS**

    0 dBu is defined as 0.775 V RMS because that is the voltage that produces exactly 1 milliwatt of power in a 600 Ω load, which was the original telephone-industry standard termination impedance. The formula is \(\text{dBu} = 20\log_{10}(V_{rms}/0.775)\).

---

**8.** A professional audio amplifier has a maximum output of +24 dBu and a nominal operating level of +4 dBu. What is its headroom?

- A) 4 dB
- B) 20 dB
- C) 24 dB
- D) 28 dB

??? success "Answer"
    **B) 20 dB**

    \[\text{Headroom} = \text{Maximum level} - \text{Nominal level} = +24\ \text{dBu} - (+4\ \text{dBu}) = 20\ \text{dB}\]

    This 20 dB of headroom (a factor of 10× in voltage above nominal) accommodates loud transients — drum strikes, vocal peaks — without clipping.

---

**9.** A bass shelving filter in an audio tone control is best described as:

- A) A band-pass filter centred at 100 Hz
- B) A high-pass filter with -20 dB/decade roll-off
- C) A filter that boosts or cuts frequencies below a corner frequency while leaving higher frequencies unaffected
- D) A notch filter that removes 60 Hz hum

??? success "Answer"
    **C) A filter that boosts or cuts frequencies below a corner frequency while leaving higher frequencies unaffected**

    A shelving filter levels off (shelves) to a constant gain at both low and high frequencies, unlike a simple LP filter whose gain continues to decrease above the cutoff. The bass shelf adjusts only the low-frequency region; midrange and treble are unaltered. The treble shelf does the same at high frequencies.

---

**10.** For a 16-bit PCM digital audio system, what is the approximate theoretical dynamic range?

- A) 48 dB
- B) 96 dB
- C) 120 dB
- D) 144 dB

??? success "Answer"
    **B) 96 dB**

    The theoretical dynamic range of an \(n\)-bit PCM system is approximately \(6.02n + 1.76\) dB:

    \[DR = 6.02 \times 16 + 1.76 = 96.32 + 1.76 \approx 98\ \text{dB}\]

    This is often rounded to 96 dB (6 dB per bit). CD audio uses 16-bit encoding, giving approximately 96 dB of dynamic range — enough for quiet whispers to loud orchestral fortissimos.

---

## Practice Problems

**Problem 1: RC Low-Pass Filter Design**

Design an RC low-pass filter with a cutoff frequency of \(f_c = 3.4\ \text{kHz}\) (the upper edge of the telephone voice band). Use \(C = 10\ \text{nF}\). Find the required R, select the nearest E24 standard value, and calculate the actual cutoff frequency with the standard value.

??? success "Solution"
    **Step 1 — Ideal R:**

    \[R = \frac{1}{2\pi f_c C} = \frac{1}{2\pi \times 3{,}400 \times 10 \times 10^{-9}} = \frac{1}{213.6 \times 10^{-6}} = 4{,}682\ \Omega\]

    **Step 2 — Nearest E24 standard value:**

    E24 values near 4.68 kΩ: 4.7 kΩ (the E24 series includes 4.7 kΩ as a standard value).

    Choose \(R = 4.7\ \text{k}\Omega\).

    **Step 3 — Actual cutoff frequency:**

    \[f_c = \frac{1}{2\pi \times 4{,}700 \times 10 \times 10^{-9}} = \frac{1}{295.3 \times 10^{-6}} = 3{,}386\ \text{Hz}\]

    **Result:** The actual cutoff is 3.39 kHz — 0.4% below the 3.4 kHz target. Excellent agreement; no adjustment needed.

---

**Problem 2: RLC Band-Pass Filter Design**

Design a series RLC band-pass filter with centre frequency \(f_0 = 455\ \text{kHz}\) (a common AM radio intermediate frequency) and bandwidth \(BW = 10\ \text{kHz}\). Calculate Q, the LC product, and suitable component values using \(L = 220\ \mu\text{H}\).

??? success "Solution"
    **Step 1 — Quality factor:**

    \[Q = \frac{f_0}{BW} = \frac{455{,}000}{10{,}000} = 45.5\]

    **Step 2 — LC product:**

    \[LC = \frac{1}{(2\pi f_0)^2} = \frac{1}{(2\pi \times 455{,}000)^2} = \frac{1}{(2.859 \times 10^6)^2} = \frac{1}{8.172 \times 10^{12}} = 1.224 \times 10^{-13}\ \text{H·F}\]

    **Step 3 — Capacitor (given \(L = 220\ \mu\text{H}\)):**

    \[C = \frac{1.224 \times 10^{-13}}{220 \times 10^{-6}} = 5.56 \times 10^{-10}\ \text{F} = 556\ \text{pF}\]

    Nearest E12 value: 560 pF.

    **Step 4 — Resistor:**

    \[R = \frac{2\pi f_0 L}{Q} = \frac{2\pi \times 455{,}000 \times 220 \times 10^{-6}}{45.5} = \frac{628.6}{45.5} = 13.8\ \Omega\]

    Nearest E24 value: 13 Ω or 15 Ω. Use 13 Ω (gives slightly wider bandwidth for better AM reception).

    **Verification:**

    \[f_0' = \frac{1}{2\pi\sqrt{220 \times 10^{-6} \times 560 \times 10^{-12}}} = \frac{1}{2\pi\sqrt{1.232 \times 10^{-13}}} \approx 454\ \text{kHz}\]

    Very close to the 455 kHz target. Actual BW with 13 Ω: \(R/(2\pi L) = 13/(2\pi \times 220 \times 10^{-6}) \approx 9.4\ \text{kHz}\).

---

**Problem 3: Decibel Level Calculations**

A recording studio chain has the following stages: microphone output = −55 dBu; preamplifier gain = +48 dB; equaliser gain = +3 dB; power amplifier gain = +26 dB. (a) What is the signal level at the preamplifier output? (b) After the equaliser? (c) At the power amplifier output? (d) If the power amplifier clips at +30 dBu, does any stage clip?

??? success "Solution"
    **Calculating levels stage by stage (adding gains in dB):**

    **(a) Preamplifier output:**

    \[-55 + 48 = -7\ \text{dBu}\]

    **(b) After equaliser:**

    \[-7 + 3 = -4\ \text{dBu}\]

    **(c) Power amplifier output:**

    \[-4 + 26 = +22\ \text{dBu}\]

    **(d) Clipping check:**

    The power amplifier clips at +30 dBu. Its output is +22 dBu — 8 dB below clipping. No stage clips.

    **Headroom at power amplifier output:** \(30 - 22 = 8\ \text{dB}\). This is below the professional standard of 20 dB; if a loud transient arrives 8 dB above the nominal level, the amplifier will clip. The system designer might reduce the equaliser gain or preamplifier gain by ~12 dB to restore adequate headroom.

---

**Problem 4: Active Filter Gain and Cutoff Design**

Design a first-order inverting active low-pass filter with DC gain = +20 dB (gain magnitude = 10) and cutoff frequency \(f_c = 800\ \text{Hz}\). Choose \(C_f = 22\ \text{nF}\) and determine \(R_f\), then determine \(R_i\). Select E24 standard values for all resistors.

??? success "Solution"
    **Step 1 — Recall the transfer function:**

    \[H(j\omega) = -\frac{R_f/R_i}{1 + j\omega R_f C_f}\]

    DC gain magnitude: \(|A_{DC}| = R_f / R_i = 10\)

    Cutoff frequency: \(f_c = 1/(2\pi R_f C_f)\)

    **Step 2 — Find \(R_f\) from \(f_c\):**

    \[R_f = \frac{1}{2\pi f_c C_f} = \frac{1}{2\pi \times 800 \times 22 \times 10^{-9}} = \frac{1}{110.5 \times 10^{-6}} = 9{,}050\ \Omega\]

    Nearest E24 value: \(R_f = 9.1\ \text{k}\Omega\).

    **Step 3 — Find \(R_i\):**

    \[R_i = \frac{R_f}{|A_{DC}|} = \frac{9{,}100}{10} = 910\ \Omega\]

    E24 value: \(R_i = 910\ \Omega\) (910 Ω is a standard E24 value). ✓

    **Step 4 — Verify actual cutoff:**

    \[f_c = \frac{1}{2\pi \times 9{,}100 \times 22 \times 10^{-9}} = \frac{1}{1.258 \times 10^{-3}} = 795\ \text{Hz}\]

    **Result:** DC gain = 9,100/910 = 10× (+20 dB) ✓. Actual cutoff = 795 Hz (0.6% below 800 Hz target) ✓. Both specifications are met with standard E24 components.

</div>
