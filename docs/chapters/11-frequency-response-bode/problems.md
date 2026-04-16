---
title: Chapter 11 Practice Problems — Frequency Response and Bode Plots
description: Practice problems with solutions for Chapter 11 covering transfer functions, Bode plots, and filter analysis
---

<div class="unit1-styled" markdown>

# Chapter 11 Practice Problems

## Practice Problems

### Problem 1 — Transfer Function of an RC Filter

An RC low-pass filter has R = 10 kΩ and C = 15.9 nF.

**(a)** Derive the transfer function \(H(j\omega) = V_{out}/V_{in}\) (output taken across C).

**(b)** Calculate the cutoff frequency \(f_c\) in Hz.

**(c)** Calculate \(|H|\) and \(\angle H\) at f = \(f_c\), at \(f = f_c/10\), and at \(f = 10f_c\).

**(d)** Express the magnitude at \(f = 10f_c\) in dB.

??? success "Solution"
    **(a)** Transfer function (voltage divider with \(Z_C = 1/(j\omega C)\)):

    \[H(j\omega) = \frac{Z_C}{R + Z_C} = \frac{1/(j\omega C)}{R + 1/(j\omega C)} = \frac{1}{1 + j\omega RC}\]

    **(b)** Cutoff frequency:

    \[f_c = \frac{1}{2\pi RC} = \frac{1}{2\pi \times 10{,}000 \times 15.9\times10^{-9}} = \frac{1}{2\pi \times 1.59\times10^{-4}} = \frac{1}{9.988\times10^{-4}} \approx 1{,}001\text{ Hz} \approx 1\text{ kHz}\]

    **(c)** At \(f = f_c\): \(\omega RC = 1\), so \(H = 1/(1+j) = 0.707\angle -45°\)

    At \(f = f_c/10\): \(\omega RC = 0.1\), \(H = 1/(1+j0.1)\), \(|H| = 1/\sqrt{1.01} = 0.995\), \(\angle H = -\arctan(0.1) = -5.7°\)

    At \(f = 10f_c\): \(\omega RC = 10\), \(H = 1/(1+j10)\), \(|H| = 1/\sqrt{101} = 0.0995\), \(\angle H = -\arctan(10) = -84.3°\)

    **(d)** At \(f = 10f_c\): \(|H|_{dB} = 20\log_{10}(0.0995) = 20 \times (-1.002) = -20.0\text{ dB}\). Asymptotic approximation predicts −20 dB/decade × 1 decade = −20 dB. ✓

---

### Problem 2 — Bode Plot Sketching

A transfer function is \(H(j\omega) = \dfrac{10}{(1 + j\omega/100)(1 + j\omega/10{,}000)}\).

**(a)** Identify the DC gain (in dB) and the two pole frequencies.

**(b)** Describe the asymptotic Bode magnitude plot: slopes in each region.

**(c)** At f = 100 Hz, f = 1,000 Hz, and f = 10,000 Hz, what does the asymptotic approximation predict for \(|H|_{dB}\)?

**(d)** What is the phase at \(\omega = \omega_{p2}/10\) (one decade below the second pole)?

??? success "Solution"
    **(a)** DC gain: at \(\omega = 0\), \(H(0) = 10\), so \(|H|_{dB} = 20\log_{10}(10) = 20\text{ dB}\). Pole frequencies: \(\omega_{p1} = 100\text{ rad/s}\) (\(f_{p1} = 15.9\text{ Hz}\)) and \(\omega_{p2} = 10{,}000\text{ rad/s}\) (\(f_{p2} = 1{,}592\text{ Hz}\)).

    **(b)** Asymptotic regions:
    - Below 15.9 Hz: flat at 20 dB
    - 15.9 Hz to 1,592 Hz: −20 dB/decade (one active pole)
    - Above 1,592 Hz: −40 dB/decade (both poles active)

    **(c)** Asymptotic approximation:
    - At f = 100 Hz (1 decade above \(f_{p1}\)): \(20 - 20 = 0\text{ dB}\)
    - At f = 1,000 Hz: \(0 - 20\log(1000/15.9) \approx 0 - 20\times1.8 = -36\text{ dB}\)... More precisely, at \(f_{p2} = 1592\text{ Hz}\): \(20 - 20\log(1592/15.9) = 20 - 40 = -20\text{ dB}\)
    - At f = 10,000 Hz (1 decade above \(f_{p2}\)): \(-20 - 20 = -40\text{ dB}\)

    **(d)** Phase contribution at \(\omega = \omega_{p2}/10\): each pole contributes approximately −5.7° at one decade below its corner frequency. Total phase ≈ −90° (from first pole, fully past its 45° midpoint by now) − 5.7° (from second pole) ≈ −95.7°.

---

### Problem 3 — High-Pass Filter Design

Design an RC high-pass filter with cutoff frequency \(f_c = 500\) Hz.

**(a)** Write the transfer function for an RC high-pass filter.

**(b)** Select C = 100 nF and calculate the required R.

**(c)** Calculate \(|H|\) and phase at f = 50 Hz, 500 Hz, and 5 kHz.

**(d)** What is the roll-off rate in the stopband (below \(f_c\))?

??? success "Solution"
    **(a)** Transfer function (output across R, capacitor in series):

    \[H(j\omega) = \frac{R}{R + 1/(j\omega C)} = \frac{j\omega RC}{1 + j\omega RC}\]

    **(b)** Required R:

    \[R = \frac{1}{2\pi f_c C} = \frac{1}{2\pi \times 500 \times 100\times10^{-9}} = \frac{1}{314.2\times10^{-6}} = 3{,}183\ \Omega \approx 3.2\text{ kΩ}\]

    Use nearest standard value: 3.3 kΩ (gives \(f_c = 1/(2\pi \times 3300 \times 100\times10^{-9}) = 482\text{ Hz}\)).

    **(c)** At each frequency (using \(f_c = 500\text{ Hz}\) for simplicity):

    - f = 50 Hz (0.1\(f_c\)): \(\omega RC = 0.1\), \(|H| = 0.1/\sqrt{1.01} = 0.0995\), \(\angle H = 90° - \arctan(0.1) = 84.3°\)
    - f = 500 Hz (\(f_c\)): \(|H| = 1/\sqrt{2} = 0.707\), \(\angle H = +45°\)
    - f = 5 kHz (10\(f_c\)): \(\omega RC = 10\), \(|H| = 10/\sqrt{101} = 0.995\), \(\angle H = 5.7°\)

    **(d)** In the stopband below \(f_c\), the high-pass filter rolls off at **+20 dB/decade** going toward higher frequencies, or equivalently **−20 dB/decade** going toward lower frequencies. First-order filter, one pole.

---

### Problem 4 — Identifying Filter Type from Transfer Function

A circuit has the transfer function:

\[H(j\omega) = \frac{j\omega/\omega_0}{1 + 2j(\omega/\omega_0) - (\omega/\omega_0)^2}\]

**(a)** What type of filter is this? (Examine behavior at \(\omega \to 0\), \(\omega = \omega_0\), and \(\omega \to \infty\).)

**(b)** At \(\omega = \omega_0\), what determines the peak magnitude?

**(c)** How does this compare to a first-order band-pass filter?

??? success "Solution"
    **(a)** Evaluate at extremes:

    - \(\omega \to 0\): numerator \(\to 0\), denominator \(\to 1\): \(H \to 0\) (attenuated)
    - \(\omega = \omega_0\): numerator = \(j\), denominator = \(1 + 2j - 1 = 2j\): \(H = j/(2j) = 1/2\) (peak)
    - \(\omega \to \infty\): numerator grows as \(\omega\), denominator grows as \(\omega^2\): \(H \to 0\) (attenuated)

    This is a **second-order band-pass filter** centered at \(\omega_0\).

    **(b)** At \(\omega = \omega_0\) the denominator reduces to \(2j\zeta\) (where \(\zeta\) is the damping ratio). Peak magnitude = \(1/(2\zeta) = Q\). Higher Q gives higher peak gain and narrower bandwidth.

    **(c)** A first-order band-pass filter cannot achieve the sharp roll-off of this second-order design. The second-order filter rolls off at −20 dB/decade on each side of the passband versus −20 dB/decade for the first-order RC band-pass.

---

### Problem 5 — Cascaded Filters

Two RC filters are cascaded: Stage 1 is a high-pass filter with \(f_{c1} = 200\) Hz, Stage 2 is a low-pass filter with \(f_{c2} = 8\) kHz.

**(a)** What is the overall filter type?

**(b)** What is the passband (approximate frequency range where the response is within −3 dB)?

**(c)** In dB, what is the combined roll-off rate for frequencies above 80 kHz?

**(d)** If both stages have unity passband gain, what is the combined gain (in dB) at f = 20 Hz?

??? success "Solution"
    **(a)** A high-pass filter cascaded with a low-pass filter creates a **band-pass filter** that passes frequencies between 200 Hz and 8 kHz.

    **(b)** Approximate passband: 200 Hz to 8 kHz. At exactly these frequencies, each stage contributes −3 dB, so the overall response is −6 dB at the edges. The −3 dB passband is slightly narrower than 200 Hz to 8 kHz.

    **(c)** Above 80 kHz (one decade above \(f_{c2} = 8\text{ kHz}\)): Stage 2 (LPF) rolls off at −20 dB/decade. Stage 1 (HPF) is fully in its passband and contributes 0 dB/decade. Combined: −20 dB/decade.

    **(d)** At 20 Hz (one decade below \(f_{c1} = 200\text{ Hz}\)): Stage 1 (HPF) attenuates by −20 dB/decade × 1 decade = −20 dB. Stage 2 (LPF) is fully in its passband. Combined: −20 dB.

</div>
