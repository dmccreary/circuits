---
title: Chapter 12 Practice Problems — Filters and Resonance
description: Practice problems with solutions for Chapter 12 covering RC filter design, RLC band-pass filters, and audio applications
---

<div class="unit1-styled" markdown>

# Chapter 12 Practice Problems

## Practice Problems

### Problem 1 — RC Low-Pass Filter Design

Design an RC low-pass filter with a cutoff frequency of 3.4 kHz (telephone voice band upper limit).

**(a)** Select C = 47 nF and calculate the required R.

**(b)** Calculate the actual cutoff frequency with a standard 1.0 kΩ resistor (the nearest standard value, if R comes out near 1 kΩ — check your calculation).

**(c)** What is the filter's attenuation at 34 kHz (one decade above cutoff)?

**(d)** What is the attenuation at 68 kHz (two decades above)?

??? success "Solution"
    **(a)** Required R:

    \[R = \frac{1}{2\pi f_c C} = \frac{1}{2\pi \times 3400 \times 47\times10^{-9}} = \frac{1}{1.003\times10^{-3}} = 997\ \Omega \approx 1.0\text{ kΩ}\]

    **(b)** Actual cutoff with R = 1.0 kΩ:

    \[f_c = \frac{1}{2\pi \times 1000 \times 47\times10^{-9}} = \frac{1}{295.3\times10^{-6}} = 3{,}386\text{ Hz}\]

    Very close to the target — within 0.4%.

    **(c)** Attenuation at 34 kHz (10× above \(f_c\)): for a first-order filter, one decade above the cutoff attenuates by approximately −20 dB.

    More precisely: \(|H| = 1/\sqrt{1+(10)^2} = 1/\sqrt{101} = 0.0995\), \(|H|_{dB} = -20.04\text{ dB} \approx -20\text{ dB}\)

    **(d)** At 68 kHz (20× above \(f_c\)): \(|H| = 1/\sqrt{1+(20)^2} = 1/\sqrt{401} = 0.0499\), \(|H|_{dB} = -26.0\text{ dB}\). Note: two decades above cutoff does NOT give −40 dB for a first-order filter — it gives approximately −26 dB (the −20 dB/decade rule is only asymptotic).

---

### Problem 2 — RC High-Pass Filter for Hum Removal

A 60 Hz power line hum contaminates an audio signal. Design an RC high-pass filter with \(f_c = 80\) Hz to attenuate the hum.

**(a)** With C = 220 nF, calculate R.

**(b)** Calculate the attenuation of the 60 Hz hum component.

**(c)** Calculate the attenuation at 1 kHz (in the signal passband) — should be less than −3 dB.

??? success "Solution"
    **(a)** Required R:

    \[R = \frac{1}{2\pi f_c C} = \frac{1}{2\pi \times 80 \times 220\times10^{-9}} = \frac{1}{110.6\times10^{-6}} = 9{,}042\ \Omega \approx 9.1\text{ kΩ}\]

    Use 10 kΩ (nearest E24 value; actual \(f_c = 72.3\) Hz — use this for parts b, c).

    **(b)** At 60 Hz with \(f_c = 72.3\) Hz: \(\omega RC = f/f_c = 60/72.3 = 0.830\)

    High-pass: \(|H| = \omega RC / \sqrt{1+(\omega RC)^2} = 0.830/\sqrt{1+0.689} = 0.830/1.300 = 0.638\)
    \[|H|_{dB} = 20\log_{10}(0.638) = -3.90\text{ dB}\]

    **(c)** At 1 kHz: \(f/f_c = 1000/72.3 = 13.83\)

    \[|H| = 13.83/\sqrt{1+13.83^2} = 13.83/\sqrt{192.3} = 13.83/13.87 = 0.997\]
    \[|H|_{dB} = 20\log_{10}(0.997) = -0.026\text{ dB}\]

    Virtually no attenuation at 1 kHz — the signal is unaffected.

---

### Problem 3 — RLC Band-Pass Filter

Design a series RLC band-pass filter centered at 10 kHz with a quality factor Q = 25. Use L = 1 mH.

**(a)** Calculate the required capacitance C.

**(b)** Calculate the resistance R.

**(c)** Calculate the 3 dB bandwidth.

**(d)** What are the lower and upper −3 dB frequencies?

??? success "Solution"
    **(a)** From \(f_0 = 1/(2\pi\sqrt{LC})\):

    \[C = \frac{1}{(2\pi f_0)^2 L} = \frac{1}{(2\pi\times10{,}000)^2 \times 0.001} = \frac{1}{3.948\times10^9 \times 0.001} = \frac{1}{3.948\times10^6} = 253.3\text{ pF}\]

    **(b)** From \(Q = \omega_0 L / R\):

    \[R = \frac{\omega_0 L}{Q} = \frac{2\pi \times 10{,}000 \times 0.001}{25} = \frac{62.83}{25} = 2.51\ \Omega\]

    **(c)** Bandwidth:

    \[\text{BW} = \frac{f_0}{Q} = \frac{10{,}000}{25} = 400\text{ Hz}\]

    **(d)** The −3 dB frequencies straddle \(f_0\):

    \[f_L = f_0 - \frac{\text{BW}}{2} = 10{,}000 - 200 = 9{,}800\text{ Hz}\]
    \[f_H = f_0 + \frac{\text{BW}}{2} = 10{,}000 + 200 = 10{,}200\text{ Hz}\]

---

### Problem 4 — Decibels and Audio Levels

A microphone produces −50 dBV. A preamplifier with 40 dB gain amplifies it to line level.

**(a)** Calculate the output voltage level in dBV.

**(b)** Calculate the output voltage in volts (RMS).

**(c)** Convert the output level to dBu.

**(d)** A second stage amplifier has 12 dB gain. What is its output in dBV?

??? success "Solution"
    **(a)** Output level in dBV:

    \[L_{out} = L_{in} + G = -50 + 40 = -10\text{ dBV}\]

    **(b)** Convert −10 dBV to volts:

    \[V = 10^{-10/20} = 10^{-0.5} = 0.316\text{ V RMS}\]

    **(c)** Converting dBV to dBu: \(0\text{ dBV} = 1\text{ V} = 2.218\text{ dBu}\) (since \(1\text{ V}/0.7746\text{ V} = 1.291\) and \(20\log(1.291) = 2.218\text{ dB}\))

    \[L_{dBu} = L_{dBV} + 2.218 = -10 + 2.218 = -7.78\text{ dBu}\]

    **(d)** After second stage: \(-10 + 12 = +2\text{ dBV}\), which is \(10^{2/20} = 1.26\text{ V RMS}\).

---

### Problem 5 — Filter Dynamic Range

A high-quality audio recording system has a noise floor of −90 dBV and a maximum output before clipping of +10 dBV.

**(a)** Calculate the dynamic range in dB.

**(b)** What is the noise floor voltage in microvolts?

**(c)** A 60 dB-gain preamplifier adds its own noise of −110 dBV referred to input. What is the noise floor referred to output?

**(d)** What headroom does the system have above a nominal operating level of 0 dBV?

??? success "Solution"
    **(a)** Dynamic range:

    \[\text{DR} = +10 - (-90) = 100\text{ dB}\]

    **(b)** Noise floor voltage:

    \[V_{noise} = 10^{-90/20} = 10^{-4.5} = 31.6\text{ μV RMS}\]

    **(c)** Preamplifier input noise: −110 dBV. After 60 dB gain:

    \[L_{noise,out} = -110 + 60 = -50\text{ dBV}\]

    **(d)** Headroom = Maximum level − Nominal level = \(+10 - 0 = 10\text{ dB}\). This 10 dB headroom accommodates transient peaks 3.16× the nominal level without clipping.

</div>
