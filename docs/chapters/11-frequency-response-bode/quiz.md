---
title: Chapter 11 Quiz — Frequency Response and Bode Plots
description: Multiple choice quiz and practice problems for Chapter 11
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 11 Quiz — Frequency Response and Bode Plots

## Multiple Choice Questions

**1.** The transfer function \(H(j\omega)\) of a circuit is defined as:

- [ ] A) The ratio of input voltage to output voltage at a single frequency
- [ ] B) The ratio of output phasor to input phasor as a function of frequency
- [ ] C) The Fourier transform of the impulse response only at DC
- [ ] D) The ratio of output power to input power in decibels

??? success "Answer"
    **B) The ratio of output phasor to input phasor as a function of frequency.**

    \[H(j\omega) = \frac{\mathbf{V}_{out}(j\omega)}{\mathbf{V}_{in}(j\omega)}\]

    It is a complex function encoding both magnitude (gain/attenuation) and phase shift at every frequency. Option A has the ratio inverted. Options C and D describe related but different quantities.

---

**2.** A gain of \(|H| = 0.707\) expressed in decibels equals:

- [ ] A) \(-6\) dB
- [ ] B) \(-3\) dB
- [ ] C) \(0\) dB
- [ ] D) \(+3\) dB

??? success "Answer"
    **B) \(-3\) dB.**

    \[20\log_{10}(0.707) = 20\log_{10}\!\left(\frac{1}{\sqrt{2}}\right) = 20\times(-0.150) \approx -3\ \mathrm{dB}\]

    This is the half-power point. At this gain, output power is exactly half of input power, making it the standard definition of the cutoff frequency.

---

**3.** An RC low-pass filter has \(R = 10\ \mathrm{k\Omega}\) and \(C = 1.59\ \mathrm{nF}\). Its cutoff frequency is closest to:

- [ ] A) \(100\) Hz
- [ ] B) \(1\) kHz
- [ ] C) \(10\) kHz
- [ ] D) \(100\) kHz

??? success "Answer"
    **C) \(10\) kHz.**

    \[f_c = \frac{1}{2\pi RC} = \frac{1}{2\pi \times 10{,}000 \times 1.59\times10^{-9}} \approx \frac{1}{2\pi \times 1.59\times10^{-5}} \approx 10{,}000\ \mathrm{Hz}\]

    Use \(f_c = 1/(2\pi RC)\) as the key formula for a first-order RC filter cutoff.

---

**4.** What is the roll-off rate of a third-order low-pass filter?

- [ ] A) \(-20\) dB/decade
- [ ] B) \(-40\) dB/decade
- [ ] C) \(-60\) dB/decade
- [ ] D) \(-80\) dB/decade

??? success "Answer"
    **C) \(-60\) dB/decade.**

    Roll-off rate \(= -20n\) dB/decade, where \(n\) is the filter order. For a third-order filter: \(-20 \times 3 = -60\) dB/decade. Each reactive element (each pole) contributes \(-20\) dB/decade.

---

**5.** On a Bode magnitude plot, what happens to the slope each time a pole is encountered as frequency increases?

- [ ] A) The slope increases by \(+20\) dB/decade
- [ ] B) The slope increases by \(+6\) dB/decade
- [ ] C) The slope decreases by \(-20\) dB/decade
- [ ] D) The slope remains unchanged; only the intercept shifts

??? success "Answer"
    **C) The slope decreases by \(-20\) dB/decade.**

    Each pole in the denominator of \(H(j\omega)\) reduces the Bode magnitude slope by \(20\) dB/decade at its corner frequency. Zeros (roots of the numerator) do the opposite — they increase the slope by \(+20\) dB/decade.

---

**6.** The phase of a first-order RC low-pass filter at its cutoff frequency \(f_c\) is:

- [ ] A) \(0°\)
- [ ] B) \(-45°\)
- [ ] C) \(-90°\)
- [ ] D) \(-180°\)

??? success "Answer"
    **B) \(-45°\).**

    For \(H(j\omega) = 1/(1 + j\omega/\omega_c)\), at \(\omega = \omega_c\):

    \[\phi = -\arctan\!\left(\frac{\omega_c}{\omega_c}\right) = -\arctan(1) = -45°\]

    The phase ranges from \(0°\) (DC) to \(-90°\) (very high frequency), passing through \(-45°\) at the cutoff.

---

**7.** A circuit is said to be a **notch filter** when it:

- [ ] A) Passes all frequencies below a single cutoff frequency
- [ ] B) Rejects a very narrow band of frequencies around a center frequency
- [ ] C) Amplifies a specific frequency band while attenuating all others
- [ ] D) Converts a band-pass filter to a low-pass filter by cascading stages

??? success "Answer"
    **B) Rejects a very narrow band of frequencies around a center frequency.**

    A notch filter is a special case of a band-reject filter with a high \(Q\) factor — the rejected notch is very narrow. A common application is removing 60 Hz power-line hum from audio recordings.

---

**8.** How many octaves are in one decade?

- [ ] A) Approximately \(2\) octaves
- [ ] B) Approximately \(3.32\) octaves
- [ ] C) Exactly \(10\) octaves
- [ ] D) Approximately \(0.301\) octaves

??? success "Answer"
    **B) Approximately \(3.32\) octaves.**

    One decade is a 10× change in frequency. One octave is a 2× change. The number of octaves in a decade is:

    \[\log_2(10) = \frac{\log_{10}(10)}{\log_{10}(2)} = \frac{1}{0.301} \approx 3.32\ \text{octaves}\]

    This means a \(-20\) dB/decade roll-off is equivalent to \(-6\) dB/octave.

---

**9.** In the asymptotic Bode phase approximation for a first-order low-pass filter, the phase transitions from \(0°\) to \(-90°\). Over what frequency range does this linear transition occur?

- [ ] A) From \(0.1\,f_c\) to \(f_c\)
- [ ] B) From \(f_c\) to \(10\,f_c\)
- [ ] C) From \(0.1\,f_c\) to \(10\,f_c\)
- [ ] D) From \(0.01\,f_c\) to \(100\,f_c\)

??? success "Answer"
    **C) From \(0.1\,f_c\) to \(10\,f_c\).**

    The straight-line phase approximation spans one decade on each side of the corner frequency: flat at \(0°\) for \(f < 0.1\,f_c\), a linear \(-45°/\text{decade}\) slope from \(0.1\,f_c\) to \(10\,f_c\), then flat at \(-90°\) for \(f > 10\,f_c\). The maximum error between asymptote and exact phase is about \(5.7°\).

---

**10.** A series RLC band-pass filter has \(f_0 = 500\ \mathrm{kHz}\) and \(Q = 25\). What is the \(-3\ \mathrm{dB}\) bandwidth?

- [ ] A) \(2\ \mathrm{kHz}\)
- [ ] B) \(20\ \mathrm{kHz}\)
- [ ] C) \(200\ \mathrm{kHz}\)
- [ ] D) \(12.5\ \mathrm{MHz}\)

??? success "Answer"
    **B) \(20\ \mathrm{kHz}\).**

    \[BW = \frac{f_0}{Q} = \frac{500\ \mathrm{kHz}}{25} = 20\ \mathrm{kHz}\]

    The bandwidth is inversely proportional to \(Q\): a higher \(Q\) means a narrower, more selective passband.

---

## Practice Problems

**Problem 1: Transfer Function and Cutoff Frequency**

A first-order RC low-pass filter has \(R = 4.7\ \mathrm{k\Omega}\) and \(C = 33\ \mathrm{nF}\).

(a) Write the transfer function \(H(j\omega)\).

(b) Calculate the cutoff frequency \(f_c\) in Hz.

(c) At what frequency is the magnitude \(-20\ \mathrm{dB}\) below the DC value? (Use the asymptotic approximation.)

(d) What is the exact magnitude \(|H|\) at \(f = f_c\)?

??? success "Solution"
    **(a) Transfer function:**

    \[H(j\omega) = \frac{1}{1 + j\omega RC}\]

    **(b) Cutoff frequency:**

    \[f_c = \frac{1}{2\pi RC} = \frac{1}{2\pi \times 4{,}700 \times 33\times10^{-9}}\]
    \[f_c = \frac{1}{2\pi \times 1.551\times10^{-4}} = \frac{1}{9.745\times10^{-4}} \approx 1{,}026\ \mathrm{Hz} \approx 1.03\ \mathrm{kHz}\]

    **(c) Frequency at \(-20\ \mathrm{dB}\):**

    The asymptotic approximation gives \(-20\) dB/decade above the cutoff. One decade above \(f_c\):

    \[f_{-20\,\mathrm{dB}} \approx 10 \times f_c = 10 \times 1{,}026 \approx 10.26\ \mathrm{kHz}\]

    **(d) Exact magnitude at \(f = f_c\):**

    At the cutoff frequency \(\omega = \omega_c\), so \(\omega/\omega_c = 1\):

    \[\left|H(j\omega_c)\right| = \frac{1}{\sqrt{1 + 1^2}} = \frac{1}{\sqrt{2}} \approx 0.707 = -3\ \mathrm{dB}\]

    The magnitude at the cutoff is always exactly \(1/\sqrt{2}\) — that is the definition of the half-power point.

---

**Problem 2: Bode Plot Asymptote Sketch**

A circuit has the following transfer function:

\[H(j\omega) = \frac{10\,(1 + j\omega/\omega_z)}{(1 + j\omega/\omega_{p1})(1 + j\omega/\omega_{p2})}\]

with \(\omega_z = 100\ \mathrm{rad/s}\), \(\omega_{p1} = 1{,}000\ \mathrm{rad/s}\), \(\omega_{p2} = 10{,}000\ \mathrm{rad/s}\).

(a) What is the DC gain in dB?

(b) Describe the magnitude Bode plot: give the slope in each frequency region.

(c) What is the high-frequency roll-off rate?

??? success "Solution"
    **(a) DC gain:**

    At DC (\(\omega \to 0\)), each factor \((1 + j\omega/\omega_x) \to 1\), so:

    \[\left|H(0)\right| = 10 \quad \Rightarrow \quad 20\log_{10}(10) = +20\ \mathrm{dB}\]

    **(b) Slope in each region:**

    The corner frequencies divide the frequency axis into regions. Working left to right:

    | Frequency range | Active factors | Slope |
    |---|---|---|
    | \(\omega < 100\) | None — all in passband | \(0\) dB/decade (flat at \(+20\) dB) |
    | \(100 < \omega < 1{,}000\) | Zero at \(\omega_z = 100\) kicks in | \(+20\) dB/decade |
    | \(1{,}000 < \omega < 10{,}000\) | Zero \(+20\), pole \(-20\) cancel | \(0\) dB/decade (flat) |
    | \(\omega > 10{,}000\) | Two poles rolling off, one zero | \(-20\) dB/decade |

    **(c) High-frequency roll-off:**

    At high frequency: 2 poles contribute \(-40\) dB/decade total, 1 zero contributes \(+20\) dB/decade.

    \[\text{Net roll-off} = -40 + 20 = -20\ \mathrm{dB/decade}\]

    This is a first-order effective roll-off at high frequencies because there are 2 poles and 1 zero (net 1 excess pole).

---

**Problem 3: Band-Pass Filter Design**

Design a series RLC band-pass filter centered at \(f_0 = 10\ \mathrm{kHz}\) with a bandwidth of \(500\ \mathrm{Hz}\). Use \(L = 10\ \mathrm{mH}\).

(a) Find the required capacitor value \(C\).

(b) Find the required resistor value \(R\).

(c) Calculate the quality factor \(Q\).

(d) Find the lower and upper \(-3\ \mathrm{dB}\) frequencies \(f_L\) and \(f_H\).

??? success "Solution"
    **(a) Capacitor value:**

    From \(f_0 = 1/(2\pi\sqrt{LC})\):

    \[C = \frac{1}{(2\pi f_0)^2 L} = \frac{1}{(2\pi \times 10{,}000)^2 \times 0.01}\]
    \[C = \frac{1}{(62{,}832)^2 \times 0.01} = \frac{1}{3.948\times10^7} \approx 25.3\ \mathrm{nF}\]

    **(b) Resistor value:**

    From \(BW = R/(2\pi L)\):

    \[R = BW \times 2\pi L = 500 \times 2\pi \times 0.01 = 500 \times 0.06283 \approx 31.4\ \Omega\]

    **(c) Quality factor:**

    \[Q = \frac{f_0}{BW} = \frac{10{,}000}{500} = 20\]

    Alternatively: \(Q = (1/R)\sqrt{L/C} = (1/31.4)\sqrt{0.01/25.3\times10^{-9}} = (1/31.4) \times 628 = 20\). ✓

    **(d) Lower and upper cutoff frequencies:**

    \[f_L = f_0 - \frac{BW}{2} = 10{,}000 - 250 = 9{,}750\ \mathrm{Hz}\]
    \[f_H = f_0 + \frac{BW}{2} = 10{,}000 + 250 = 10{,}250\ \mathrm{Hz}\]

    (These approximations are accurate for high \(Q\). Exact values use \(f_L = f_0/\sqrt{1 + 1/(2Q)^2} - f_0/(2Q)\), but for \(Q = 20\) the approximation error is less than 0.1%.)

---

**Problem 4: Determining Filter Type and Order from Bode Data**

A measured Bode magnitude plot shows:

- Magnitude is \(+2\ \mathrm{dB}\) at \(100\ \mathrm{Hz}\) (approximately flat)
- Magnitude is \(-1\ \mathrm{dB}\) at \(1\ \mathrm{kHz}\) (still approximately flat)
- Magnitude is \(-3\ \mathrm{dB}\) at \(5\ \mathrm{kHz}\)
- Magnitude is \(-23\ \mathrm{dB}\) at \(50\ \mathrm{kHz}\)
- Magnitude is \(-43\ \mathrm{dB}\) at \(500\ \mathrm{kHz}\)

(a) What type of filter is this?

(b) What is the approximate cutoff frequency?

(c) What is the roll-off rate in dB/decade? Show your calculation.

(d) What is the filter order?

??? success "Solution"
    **(a) Filter type:**

    The filter has flat (near-unity) gain at low frequencies and falls off at high frequencies — this is a **low-pass filter**.

    **(b) Cutoff frequency:**

    The \(-3\ \mathrm{dB}\) point occurs at \(f_c \approx 5\ \mathrm{kHz}\).

    **(c) Roll-off rate:**

    Compare two points in the stopband:

    - At \(50\ \mathrm{kHz}\): \(-23\ \mathrm{dB}\) (relative to passband \(\approx 0\ \mathrm{dB}\))
    - At \(500\ \mathrm{kHz}\): \(-43\ \mathrm{dB}\)

    These two frequencies differ by one decade (\(500/50 = 10\)):

    \[\text{Roll-off} = \frac{-43 - (-23)}{1\ \text{decade}} = \frac{-20\ \text{dB}}{1\ \text{decade}} = -20\ \mathrm{dB/decade}\]

    We can verify: from \(5\ \mathrm{kHz}\) to \(50\ \mathrm{kHz}\) is one decade, and the change is approximately \(-23 - (-3) = -20\ \mathrm{dB}\). Consistent.

    **(d) Filter order:**

    \[\text{Order} = \frac{\text{Roll-off}}{20\ \mathrm{dB/decade}} = \frac{20}{20} = 1\]

    This is a **first-order low-pass filter** with \(f_c \approx 5\ \mathrm{kHz}\) — consistent with a single RC section where \(RC = 1/(2\pi \times 5{,}000) \approx 31.8\ \mu\mathrm{s}\).

</div>
