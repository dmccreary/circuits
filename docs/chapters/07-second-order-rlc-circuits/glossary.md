---
title: Chapter 7 Glossary — Second-Order RLC Circuits
description: Key terms and definitions for Chapter 7
---

<div class="unit1-styled" markdown>

# Chapter 7 Glossary

| Term | Definition |
|------|-----------|
| Second-order circuit | A circuit described by a second-order differential equation, arising when two independent energy storage elements (typically an inductor and a capacitor) are both present. The general form is \(\ddot{x} + 2\alpha\dot{x} + \omega_0^2 x = f(t)\). Solutions can be oscillatory, unlike first-order circuits. |
| RLC circuit | A circuit containing a resistor, inductor, and capacitor. May be arranged in series (same current) or parallel (same voltage). The interplay between L and C causes energy to exchange between magnetic and electric fields, producing potentially oscillatory behavior. |
| Characteristic equation | The algebraic equation derived from the second-order differential equation by assuming a solution of the form \(e^{st}\): \(s^2 + 2\alpha s + \omega_0^2 = 0\). Its two roots \(s_1, s_2 = -\alpha \pm \sqrt{\alpha^2 - \omega_0^2}\) determine the form and character of the response. |
| Damping coefficient | The parameter \(\alpha\) that represents the rate at which oscillations decay. For series RLC: \(\alpha = R/(2L)\). For parallel RLC: \(\alpha = 1/(2RC)\). Higher \(\alpha\) means faster decay. When \(\alpha > \omega_0\), the circuit is overdamped; when \(\alpha < \omega_0\), it is underdamped. |
| Natural frequency | The undamped natural frequency \(\omega_0 = 1/\sqrt{LC}\) in radians per second. It depends only on the inductance and capacitance, not on resistance. It represents the frequency at which the circuit would oscillate with no energy loss (zero resistance). Equal for both series and parallel RLC configurations. |
| Damping ratio | The dimensionless parameter \(\zeta = \alpha/\omega_0\) that classifies the circuit's response type. Overdamped: \(\zeta > 1\). Critically damped: \(\zeta = 1\). Underdamped: \(\zeta < 1\). The damping ratio relates to quality factor as \(\zeta = 1/(2Q)\). |
| Overdamped response | The response when \(\zeta > 1\) (or \(\alpha > \omega_0\)). Both characteristic roots are real and negative. The response decays without oscillation as the sum of two decaying exponentials: \(x(t) = A_1 e^{s_1 t} + A_2 e^{s_2 t}\). Slow and sluggish — resistance dominates. |
| Critically damped response | The response when \(\zeta = 1\) (or \(\alpha = \omega_0\)). The two characteristic roots are equal: \(s_{1,2} = -\alpha\). Response: \(x(t) = (A_1 + A_2 t)e^{-\alpha t}\). Settles to the final value faster than overdamped without oscillating — the fastest non-oscillatory response. |
| Underdamped response | The response when \(\zeta < 1\) (or \(\alpha < \omega_0\)). Characteristic roots are complex conjugates: \(s_{1,2} = -\alpha \pm j\omega_d\). The response oscillates with decaying amplitude: \(x(t) = e^{-\alpha t}(A_1\cos\omega_d t + A_2\sin\omega_d t)\). Exhibits overshoot before settling. |
| Damped natural frequency | The actual oscillation frequency in an underdamped circuit: \(\omega_d = \sqrt{\omega_0^2 - \alpha^2}\). Always less than the undamped natural frequency \(\omega_0\). The circuit oscillates at \(\omega_d\) while decaying at rate \(\alpha\). As \(\alpha \to 0\), \(\omega_d \to \omega_0\). |
| Resonant frequency | The frequency at which the impedances of the inductor and capacitor cancel in a series RLC circuit, leaving only resistance. \(f_0 = \omega_0/(2\pi) = 1/(2\pi\sqrt{LC})\). At resonance, series RLC impedance is minimum (equals R); parallel RLC impedance is maximum. |
| Quality factor | The dimensionless parameter \(Q = \omega_0 L / R = 1/(2\zeta)\) that quantifies how sharply the circuit resonates. Higher Q means narrower bandwidth, more selective frequency response, and less damping. \(Q = f_0 / \text{BW}\) relates quality factor to bandwidth. For parallel RLC: \(Q = R/(\omega_0 L)\). |
| Bandwidth | The range of frequencies over which the circuit's response is within −3 dB (70.7%) of its peak value. For a resonant circuit: \(\text{BW} = f_0/Q = \alpha/\pi\). A high-Q circuit has narrow bandwidth (frequency selective); a low-Q circuit has broad bandwidth. |
| Percent overshoot | In an underdamped step response, the amount by which the response exceeds its final value, expressed as a percentage. Related to damping ratio by \(\%\text{OS} = 100\, e^{-\pi\zeta/\sqrt{1-\zeta^2}}\). A damping ratio of \(\zeta = 0.707\) gives approximately 4.3% overshoot. |
| Settling time | The time required for the transient response to settle permanently within a specified percentage (typically ±2% or ±5%) of its final value. For an underdamped second-order system, approximately \(t_s \approx 4/\alpha\) for ±2% settling. Smaller \(\alpha\) means slower settling. |

</div>
