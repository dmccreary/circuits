---
title: Chapter 14 Quiz — Signal Analysis and Fourier Series
description: Multiple choice questions and practice problems on Fourier series, harmonics, spectrum, and waveform symmetry
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

# Chapter 14 Quiz — Signal Analysis and Fourier Series

## Multiple Choice Questions

**1. A periodic signal has period \(T = 4\ \text{ms}\). What is its fundamental frequency?**

- [ ] A) 25 Hz
- [ ] B) 250 Hz
- [ ] C) 4 kHz
- [ ] D) 400 Hz

??? success "Answer"
    **B) 250 Hz.** The fundamental frequency is the reciprocal of the period:

    \[f_0 = \frac{1}{T} = \frac{1}{4 \times 10^{-3}\ \text{s}} = 250\ \text{Hz}\]

---

**2. Which of the following best describes the Fourier series of a periodic signal?**

- [ ] A) A sum of exponentially decaying sinusoids at the fundamental frequency only
- [ ] B) A DC offset plus sinusoids at integer multiples of the fundamental frequency
- [ ] C) A continuous distribution of sinusoids across all frequencies
- [ ] D) A sum of sinusoids at even multiples of the fundamental frequency

??? success "Answer"
    **B) A DC offset plus sinusoids at integer multiples of the fundamental frequency.** The Fourier series is:

    \[f(t) = a_0 + \sum_{n=1}^{\infty}\bigl[a_n\cos(n\omega_0 t) + b_n\sin(n\omega_0 t)\bigr]\]

    The DC term \(a_0\) is the signal average, and each subsequent pair constitutes the \(n\)th harmonic at frequency \(nf_0\). A continuous spectrum would describe a non-periodic signal.

---

**3. A waveform satisfies \(f(-t) = f(t)\). What does this tell you about its Fourier series?**

- [ ] A) All cosine coefficients \(a_n\) are zero
- [ ] B) All sine coefficients \(b_n\) are zero
- [ ] C) The DC coefficient \(a_0\) is zero
- [ ] D) Only odd harmonics are present

??? success "Answer"
    **B) All sine coefficients \(b_n\) are zero.** The condition \(f(-t) = f(t)\) is the definition of **even symmetry**. Because the product of an even function with the odd basis function \(\sin(n\omega_0 t)\) is itself odd, the integral over a symmetric interval vanishes:

    \[b_n = \frac{2}{T}\int_{-T/2}^{T/2} f(t)\sin(n\omega_0 t)\,dt = 0\]

    The Fourier series contains only cosine terms (and possibly a DC term).

---

**4. A square wave of amplitude \(A\) toggling between \(+A\) and \(-A\) has a third harmonic with amplitude \(c_3\). What is \(c_3\)?**

- [ ] A) \(4A/\pi\)
- [ ] B) \(4A/(3\pi)\)
- [ ] C) \(4A/(9\pi)\)
- [ ] D) \(A/3\)

??? success "Answer"
    **B) \(4A/(3\pi)\).** The Fourier series of the square wave is:

    \[f(t) = \frac{4A}{\pi}\sum_{\substack{n=1\\n\text{ odd}}}^{\infty}\frac{\sin(n\omega_0 t)}{n}\]

    The amplitude of the \(n\)th harmonic is \(c_n = 4A/(n\pi)\). For \(n = 3\):

    \[c_3 = \frac{4A}{3\pi}\]

---

**5. Which waveform has harmonic amplitudes that decay proportional to \(1/n^2\)?**

- [ ] A) Square wave
- [ ] B) Sawtooth wave
- [ ] C) Triangle wave
- [ ] D) Rectangular pulse with 10 % duty cycle

??? success "Answer"
    **C) Triangle wave.** The triangle wave is the integral of a square wave. Integrating a Fourier series multiplies each \(n\)th-harmonic coefficient by \(1/(n\omega_0)\), so if the square wave has \(1/n\) decay, the triangle wave has \(1/n^2\) decay. This rapid decay reflects the smoother shape of the triangle: it has no discontinuities in \(f(t)\) itself, only in its first derivative.

---

**6. A sawtooth wave contains all harmonics, including even ones. What symmetry property does it lack compared with a square wave?**

- [ ] A) Even symmetry
- [ ] B) Odd symmetry
- [ ] C) Half-wave symmetry
- [ ] D) DC symmetry

??? success "Answer"
    **C) Half-wave symmetry.** Half-wave symmetry — \(f(t + T/2) = -f(t)\) — forces all even harmonics to zero. A square wave has half-wave symmetry (the second half is the exact negative of the first half), so only odd harmonics appear. A sawtooth wave does not satisfy this condition, so both odd and even harmonics are present.

---

**7. A periodic signal has \(f(-t) = -f(t)\). Which statement is correct?**

- [ ] A) The signal has a non-zero DC component and contains only cosine terms
- [ ] B) The signal has zero DC component and contains only sine terms
- [ ] C) The signal has zero DC component and contains only cosine terms
- [ ] D) The signal has a non-zero DC component and contains only sine terms

??? success "Answer"
    **B) The signal has zero DC component and contains only sine terms.** Odd symmetry (\(f(-t) = -f(t)\)) implies two things: (1) the average value is zero because positive and negative excursions are equal and opposite, so \(a_0 = 0\); and (2) all cosine coefficients vanish because the product of an odd function with the even function \(\cos(n\omega_0 t)\) is odd and integrates to zero. The series consists of sine terms only.

---

**8. An amplifier is fed a 1 kHz pure sine wave. The output contains harmonics at 2 kHz (amplitude 20 mV), 3 kHz (amplitude 10 mV), and 4 kHz (amplitude 5 mV). The fundamental amplitude at the output is 500 mV. What is the approximate THD?**

- [ ] A) 2.4 %
- [ ] B) 4.6 %
- [ ] C) 7 %
- [ ] D) 35 %

??? success "Answer"
    **B) 4.6 %.** Total harmonic distortion is:

    \[\text{THD} = \frac{\sqrt{c_2^2 + c_3^2 + c_4^2}}{c_1} = \frac{\sqrt{20^2 + 10^2 + 5^2}}{500}\ \text{mV} = \frac{\sqrt{400 + 100 + 25}}{500} = \frac{\sqrt{525}}{500} \approx \frac{22.9}{500} \approx 4.6\,\%\]

---

**9. The amplitude spectrum of a periodic signal shows lines at \(f_0,\ 3f_0,\ 5f_0,\ 7f_0\) only, with no DC component. Which combination of symmetries is consistent with this observation?**

- [ ] A) Even symmetry only
- [ ] B) Odd symmetry and half-wave symmetry
- [ ] C) Even symmetry and half-wave symmetry
- [ ] D) No symmetry

??? success "Answer"
    **B) Odd symmetry and half-wave symmetry.** Odd symmetry eliminates the DC term (\(a_0 = 0\)) and all cosine terms. Half-wave symmetry eliminates all even harmonics. Together, these two properties leave only odd sine terms — exactly the pattern seen. Even symmetry would give cosine terms, not sine, which would not change the amplitude spectrum lines but is inconsistent with zero DC if no additional constraint removed it.

---

**10. A square wave with fundamental frequency 500 Hz is passed through a low-pass filter with a cutoff frequency of 1.2 kHz. Approximately which harmonics pass through with negligible attenuation?**

- [ ] A) All harmonics up to the 5th
- [ ] B) The fundamental and 2nd harmonic only
- [ ] C) The fundamental only
- [ ] D) The fundamental and 3rd harmonic only

??? success "Answer"
    **C) The fundamental only.** The square wave contains odd harmonics at 500 Hz, 1.5 kHz, 2.5 kHz, \(\ldots\) The filter cutoff is 1.2 kHz, which lies between the fundamental (500 Hz) and the 3rd harmonic (1,500 Hz). Therefore only the 500 Hz fundamental passes without significant attenuation; the 3rd harmonic at 1.5 kHz is above the cutoff and is strongly attenuated. The output will be approximately sinusoidal.

---

## Practice Problems

**Practice Problem 1.** A periodic triangular pulse train has period \(T = 2\ \text{ms}\) and peak amplitude \(A = 3\ \text{V}\). The waveform rises linearly from 0 to \(A\) over the first half-period and falls linearly from \(A\) to 0 over the second half-period (a symmetric triangle with zero DC).

**(a)** Identify all symmetries present.

**(b)** State which Fourier coefficient types are zero based on those symmetries.

**(c)** Compute the fundamental frequency \(f_0\) and the frequencies of the first three non-zero harmonics.

**(d)** Write the leading two non-zero terms of the Fourier series (use the result that the even-symmetric triangle wave of amplitude \(A\) has \(a_n = 8A/(\pi^2 n^2)\) for odd \(n\) only).

??? success "Solution"
    **(a) Symmetry identification**

    The waveform peaks at \(t = T/2\) and is zero at \(t = 0\) and \(t = T\). Centering the analysis at the peak, the waveform satisfies \(f(-t) = f(t)\) — **even symmetry**. It also satisfies \(f(t + T/2) = -f(t)\) only if the waveform goes negative, which it does not here. However, because the waveform is non-negative (ranging from 0 to \(A\)), it has a non-zero DC component and does **not** have half-wave symmetry. Even symmetry is the only applicable type.

    **(b) Zero coefficient types**

    Even symmetry \(\Rightarrow b_n = 0\) for all \(n\). The Fourier series contains only \(a_0\) and cosine terms.

    **(c) Frequencies**

    \[f_0 = \frac{1}{T} = \frac{1}{2\times10^{-3}} = 500\ \text{Hz}\]

    The waveform has even symmetry but not half-wave symmetry, so all harmonics (odd and even) are in principle present. The leading non-zero harmonics are at:

    \[f_1 = 500\ \text{Hz}, \quad f_2 = 1{,}000\ \text{Hz}, \quad f_3 = 1{,}500\ \text{Hz}\]

    **(d) Leading two non-zero terms**

    The DC component equals the average value of the waveform. For a symmetric triangle of amplitude \(A\) and zero minimum: \(a_0 = A/2 = 1.5\ \text{V}\).

    Using the given formula for odd harmonics \(a_n = 8A/(\pi^2 n^2)\) (valid for odd \(n\) when the triangle is defined as even-symmetric and half-wave symmetric about zero — here, because our waveform is non-negative, even harmonics are also present, but the dominant odd-harmonic terms govern):

    \[a_1 = \frac{8A}{\pi^2} = \frac{8\times3}{\pi^2} \approx \frac{24}{9.87} \approx 2.43\ \text{V}\]

    \[a_3 = \frac{8A}{9\pi^2} \approx \frac{24}{88.8} \approx 0.270\ \text{V}\]

    Leading two non-zero harmonic terms:

    \[f(t) \approx \frac{A}{2} + \frac{8A}{\pi^2}\cos(\omega_0 t) + \frac{8A}{9\pi^2}\cos(3\omega_0 t) + \cdots\]

    \[\approx 1.5 + 2.43\cos(2\pi \cdot 500\, t) + 0.27\cos(2\pi \cdot 1{,}500\, t) + \cdots \quad [\text{V}]\]

---

**Practice Problem 2.** An odd square wave of amplitude \(A = 5\ \text{V}\) has period \(T = 1\ \text{ms}\).

**(a)** Write the complete Fourier series.

**(b)** Compute the RMS value of the square wave directly from its waveform.

**(c)** Using Parseval's theorem, verify the RMS value by summing the power in the first five non-zero harmonics and comparing with the exact answer. Comment on the convergence.

??? success "Solution"
    **(a) Fourier series**

    The odd square wave has odd symmetry and half-wave symmetry, so only odd sine terms are present and \(a_0 = 0\):

    \[f(t) = \frac{4A}{\pi}\sum_{\substack{n=1\\n\text{ odd}}}^{\infty}\frac{\sin(n\omega_0 t)}{n} = \frac{20}{\pi}\left[\sin(\omega_0 t) + \frac{\sin(3\omega_0 t)}{3} + \frac{\sin(5\omega_0 t)}{5} + \cdots\right]\]

    where \(\omega_0 = 2\pi/T = 2\pi \times 1{,}000 = 6{,}283\ \text{rad/s}\).

    **(b) Direct RMS calculation**

    A square wave alternates between \(+A\) and \(-A\), so \([f(t)]^2 = A^2\) at all times:

    \[V_\text{rms} = \sqrt{\frac{1}{T}\int_0^T [f(t)]^2\,dt} = \sqrt{\frac{1}{T}\int_0^T A^2\,dt} = \sqrt{A^2} = A = 5\ \text{V}\]

    **(c) Parseval's theorem verification**

    Each harmonic \(c_n \sin(n\omega_0 t)\) contributes average power \(c_n^2/2\) to the total. With \(c_n = 4A/(n\pi)\):

    \[P_n = \frac{c_n^2}{2} = \frac{1}{2}\left(\frac{4A}{n\pi}\right)^2 = \frac{8A^2}{n^2\pi^2}\]

    Summing the first five non-zero harmonics (\(n = 1, 3, 5, 7, 9\)):

    \[P_\text{total} \approx \frac{8A^2}{\pi^2}\left(1 + \frac{1}{9} + \frac{1}{25} + \frac{1}{49} + \frac{1}{81}\right) = \frac{8\times25}{\pi^2}\left(1.000 + 0.111 + 0.040 + 0.020 + 0.012\right)\]

    \[= \frac{200}{9.87}\times1.183 \approx 20.27 \times 1.183 \approx 23.98\ \text{W}\]

    The exact total power is \(A^2 = 25\ \text{W}\) (into 1 \(\Omega\)), so the partial sum recovers \(23.98/25 \approx 95.9\,\%\) of the power with only five harmonics. Convergence is relatively slow — the \(1/n^2\) convergence of the power series (compared with \(1/n\) amplitude decay) means many terms are needed to approach 100 %. Note that \(\sum_{n\text{ odd}} 1/n^2 = \pi^2/8\), confirming the exact power \(8A^2/\pi^2 \times \pi^2/8 = A^2\).

---

**Practice Problem 3.** A filter has the voltage transfer function:

\[H(j\omega) = \frac{1}{1 + j(\omega/\omega_c)}\]

with \(\omega_c = 2\pi \times 2{,}000\ \text{rad/s}\) (cutoff frequency 2 kHz). The input is an odd square wave with amplitude \(A = 2\ \text{V}\) and fundamental frequency \(f_0 = 1\ \text{kHz}\).

**(a)** Write the first four non-zero harmonics of the input (amplitudes and frequencies).

**(b)** Compute the output amplitude of each harmonic by applying \(|H(j\omega)|\) at the harmonic frequency.

**(c)** Write the first four terms of the output Fourier series, including the phase shifts introduced by the filter.

**(d)** What waveform does the output approach as the order of harmonics increases beyond the 5th?

??? success "Solution"
    **(a) Input harmonics**

    Input Fourier series (odd, half-wave symmetric):

    \[v_{in}(t) = \frac{4A}{\pi}\sum_{\substack{n=1\\n\text{ odd}}}^\infty \frac{\sin(n\omega_0 t)}{n}\]

    | Harmonic | Frequency | Amplitude \(c_n = 4A/(n\pi)\) |
    |---|---|---|
    | \(n=1\) | 1,000 Hz | \(4\times2/\pi \approx 2.546\ \text{V}\) |
    | \(n=3\) | 3,000 Hz | \(8/(3\pi) \approx 0.849\ \text{V}\) |
    | \(n=5\) | 5,000 Hz | \(8/(5\pi) \approx 0.509\ \text{V}\) |
    | \(n=7\) | 7,000 Hz | \(8/(7\pi) \approx 0.364\ \text{V}\) |

    **(b) Output amplitudes**

    The magnitude of the transfer function at frequency \(f = nf_0\) is:

    \[\lvert H(jn\omega_0)\rvert = \frac{1}{\sqrt{1+(nf_0/f_c)^2}} = \frac{1}{\sqrt{1+(n/2)^2}}\]

    | \(n\) | \(nf_0/f_c = n/2\) | \(\lvert H\rvert\) | Output amplitude |
    |---|---|---|---|
    | 1 | 0.5 | \(1/\sqrt{1.25} = 0.894\) | \(2.546\times0.894 \approx 2.277\ \text{V}\) |
    | 3 | 1.5 | \(1/\sqrt{3.25} = 0.555\) | \(0.849\times0.555 \approx 0.471\ \text{V}\) |
    | 5 | 2.5 | \(1/\sqrt{7.25} = 0.372\) | \(0.509\times0.372 \approx 0.189\ \text{V}\) |
    | 7 | 3.5 | \(1/\sqrt{13.25} = 0.275\) | \(0.364\times0.275 \approx 0.100\ \text{V}\) |

    **(c) Output Fourier series**

    The filter also introduces a phase shift \(\phi_n = -\arctan(n/2)\) at each harmonic. The output is:

    \[v_{out}(t) \approx 2.277\sin(\omega_0 t - 26.6°) + 0.471\sin(3\omega_0 t - 56.3°)\]
    \[+ 0.189\sin(5\omega_0 t - 68.2°) + 0.100\sin(7\omega_0 t - 74.1°) + \cdots\]

    Phase angles: \(\phi_1 = -\arctan(0.5) \approx -26.6°\), \(\phi_3 = -\arctan(1.5) \approx -56.3°\), \(\phi_5 = -\arctan(2.5) \approx -68.2°\), \(\phi_7 = -\arctan(3.5) \approx -74.1°\).

    **(d) Waveform at high harmonic orders**

    As \(n \to \infty\), \(\lvert H\rvert \to 0\) — the filter increasingly attenuates higher harmonics. The output therefore loses its sharp corners and approaches the shape of the lowest-frequency components that remain. Since the fundamental dominates, the output approaches a **sinusoid** at the fundamental frequency 1 kHz. The filter converts the square wave into an approximately sinusoidal waveform, exactly as expected for a first-order low-pass filter.

---

**Practice Problem 4.** Determine the Fourier series of the following half-wave rectified sine wave with amplitude \(A\) and period \(T\):

\[f(t) = \begin{cases} A\sin(\omega_0 t) & 0 \leq t < T/2 \\ 0 & T/2 \leq t < T \end{cases}\]

**(a)** Identify any symmetries.

**(b)** Compute \(a_0\).

**(c)** Compute \(a_n\) for \(n \geq 1\) using the identity \(\sin\alpha\cos\beta = \tfrac{1}{2}[\sin(\alpha+\beta)+\sin(\alpha-\beta)]\).

**(d)** Compute \(b_n\) for \(n \geq 1\). Show that \(b_1 = A/2\) and \(b_n = 0\) for \(n \geq 2\) with \(n \neq 1\).

**(e)** Write the first four terms of the complete Fourier series.

??? success "Solution"
    **(a) Symmetry**

    The waveform is non-negative and non-zero only in \([0, T/2]\). It does not satisfy \(f(-t) = f(t)\) (not even) or \(f(-t) = -f(t)\) (not odd), and the second half-period is identically zero rather than the negative of the first half, so **no symmetry shortcuts apply**. All integrals must be evaluated.

    **(b) DC coefficient \(a_0\)**

    \[a_0 = \frac{1}{T}\int_0^{T/2} A\sin(\omega_0 t)\,dt = \frac{A}{T}\left[-\frac{\cos(\omega_0 t)}{\omega_0}\right]_0^{T/2}\]

    At \(t = T/2\): \(\omega_0 \cdot T/2 = \pi\), so \(\cos(\pi) = -1\). At \(t = 0\): \(\cos(0) = 1\).

    \[a_0 = \frac{A}{T}\cdot\frac{-(-1)+1}{\omega_0} = \frac{A}{T}\cdot\frac{2}{\omega_0} = \frac{A}{T}\cdot\frac{2T}{2\pi} = \frac{A}{\pi}\]

    **(c) Cosine coefficients \(a_n\)**

    \[a_n = \frac{2}{T}\int_0^{T/2} A\sin(\omega_0 t)\cos(n\omega_0 t)\,dt\]

    Applying the product-to-sum identity \(\sin\alpha\cos\beta = \tfrac{1}{2}[\sin(\alpha+\beta)+\sin(\alpha-\beta)]\):

    \[a_n = \frac{A}{T}\int_0^{T/2}\left[\sin\bigl((n+1)\omega_0 t\bigr) + \sin\bigl((1-n)\omega_0 t\bigr)\right]dt\]

    For \(n = 1\): the second term is \(\sin(0) = 0\), so:

    \[a_1 = \frac{A}{T}\int_0^{T/2}\sin(2\omega_0 t)\,dt = \frac{A}{T}\left[-\frac{\cos(2\omega_0 t)}{2\omega_0}\right]_0^{T/2} = \frac{A}{T}\cdot\frac{-\cos(2\pi)+\cos(0)}{2\omega_0} = 0\]

    For \(n \neq 1\), evaluating the definite integral from 0 to \(T/2\) (where \(\omega_0 T/2 = \pi\)):

    \[a_n = \frac{A}{T}\left[\frac{-\cos\bigl((n+1)\pi\bigr)}{(n+1)\omega_0} + \frac{-\cos\bigl((1-n)\pi\bigr)}{(1-n)\omega_0} + \frac{1}{(n+1)\omega_0} + \frac{1}{(1-n)\omega_0}\right]\]

    Since \(\cos(k\pi) = (-1)^k\):

    \[a_n = \frac{A}{T\omega_0}\left[\frac{1-(-1)^{n+1}}{n+1} + \frac{1-(-1)^{n-1}}{1-n}\right]\]

    For **odd** \(n \neq 1\): \((-1)^{n+1} = +1\) and \((-1)^{n-1} = +1\), so both brackets are \(1-1 = 0\). Therefore \(a_n = 0\) for odd \(n \geq 3\).

    For **even** \(n\): \((-1)^{n+1} = -1\) and \((-1)^{n-1} = -1\), so both brackets equal 2:

    \[a_n = \frac{A}{T\omega_0}\left[\frac{2}{n+1} - \frac{2}{n-1}\right] = \frac{2A}{T\omega_0}\cdot\frac{-2}{n^2-1} = \frac{-4A}{T\omega_0(n^2-1)}\]

    Substituting \(\omega_0 = 2\pi/T\):

    \[a_n = \frac{-4A}{2\pi(n^2-1)} = \frac{-2A}{\pi(n^2-1)} \quad \text{for even } n \geq 2\]

    **(d) Sine coefficients \(b_n\)**

    \[b_n = \frac{2}{T}\int_0^{T/2}A\sin(\omega_0 t)\sin(n\omega_0 t)\,dt\]

    Using \(\sin\alpha\sin\beta = \tfrac{1}{2}[\cos(\alpha-\beta)-\cos(\alpha+\beta)]\):

    For \(n = 1\): the integrand becomes \(\frac{A}{T}\int_0^{T/2}[\cos(0)-\cos(2\omega_0 t)]\,dt = \frac{A}{T}\cdot\frac{T}{2} = \frac{A}{2}\).

    \[\boxed{b_1 = \frac{A}{2}}\]

    For \(n \neq 1\): evaluating the integral over \([0, T/2]\) gives \(\cos\bigl((n-1)\pi\bigr) - 1\) and \(\cos\bigl((n+1)\pi\bigr) - 1\) terms. For all integer \(n \geq 2\) the contributions cancel:

    \[b_n = 0 \quad \text{for } n \geq 2,\ n \neq 1\]

    **(e) Complete Fourier series (first four terms)**

    \[f(t) = \frac{A}{\pi} + \frac{A}{2}\sin(\omega_0 t) - \frac{2A}{\pi}\left[\frac{\cos(2\omega_0 t)}{3} + \frac{\cos(4\omega_0 t)}{15} + \frac{\cos(6\omega_0 t)}{35} + \cdots\right]\]

    The four leading terms explicitly:

    \[f(t) \approx \frac{A}{\pi} + \frac{A}{2}\sin(\omega_0 t) - \frac{2A}{3\pi}\cos(2\omega_0 t) - \frac{2A}{15\pi}\cos(4\omega_0 t)\]

    **Interpretation:** The DC component \(A/\pi\) is the average of a half-wave rectified sine. The fundamental appears as a pure sine at half the full-wave amplitude. All even harmonics appear as cosines with amplitudes \(2A/[\pi(n^2-1)]\) decaying rapidly. Odd harmonics beyond \(n = 1\) are absent — a consequence of the specific shape of the half-wave rectified sine.
