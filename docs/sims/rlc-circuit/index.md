---
title: RLC Series Circuit Transient Response MicroSim
description: Interactive simulation of a series RLC circuit showing overdamped, critically damped, and underdamped step responses with real-time Vc and IL graphs.
---

# RLC Series Circuit Transient Response MicroSim

<iframe src="main.html" width="100%" height="660px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/circuits/sims/rlc-circuit/main.html" width="100%" height="660px" scrolling="no"></iframe>
```

[Run the RLC Circuit MicroSim in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim visualizes the second-order transient response of a series RLC circuit. When the switch closes, a DC source charges a capacitor through a resistor and inductor. Depending on the resistance, the response can be **underdamped** (oscillating), **critically damped** (fastest non-oscillating), or **overdamped** (sluggish, exponential).

**Key Parameters:**

| Parameter | Formula | Description |
|-----------|---------|-------------|
| Neper frequency | \(\alpha = \frac{R}{2L}\) | Controls envelope decay rate |
| Natural frequency | \(\omega_0 = \frac{1}{\sqrt{LC}}\) | Undamped oscillation frequency |
| Damped frequency | \(\omega_d = \sqrt{\omega_0^2 - \alpha^2}\) | Actual oscillation frequency |
| Critical resistance | \(R_{crit} = 2\sqrt{L/C}\) | Boundary between damped/underdamped |

**Damping Conditions:**

| Condition | Response |
|-----------|----------|
| \(R < R_{crit}\) (α < ω₀) | Underdamped — Vc overshoots and oscillates |
| \(R = R_{crit}\) (α = ω₀) | Critically damped — fastest rise without overshoot |
| \(R > R_{crit}\) (α > ω₀) | Overdamped — slow exponential rise, no oscillation |

**Interactive Features:**

- **Resistance Slider**: Sweep from 0Ω through critical damping to overdamped
- **Inductance & Capacitance Sliders**: Change natural frequency ω₀
- **Damping Info Box**: Live display of α, ω₀, ωd, R_crit, and damping type
- **Animated Electrons**: Flow speed proportional to current magnitude
- **Capacitor Fill**: Visual charge level indicator
- **Inductor Glow**: Blue glow proportional to stored magnetic energy

### How to Use

1. Click **Start** — switch closes, circuit starts charging with default R=20Ω (underdamped)
2. Observe Vc overshoot above Vs and IL oscillations in the graphs
3. Reset, then drag the **R slider** to R_crit (shown in the info box) — see critically damped response
4. Keep increasing R past R_crit — observe overdamped, sluggish response
5. Change L and C to shift the natural frequency ω₀

## Technical Notes

The simulation uses numerical integration (Euler method with 20 sub-steps per frame):

\[
\frac{dI_L}{dt} = \frac{V_s - RI_L - V_C}{L}
\]

\[
\frac{dV_C}{dt} = \frac{I_L}{C}
\]

Animation speed scales with the natural period \(T_0 = 2\pi/\omega_0\), so one natural period takes approximately one real second regardless of component values.

## References

- Chapter 7: [Second-Order RLC Circuits](../../chapters/07-second-order-rlc-circuits/index.md)
- Chapter 6: [Transient Analysis RC/RL](../../chapters/06-transient-analysis-rc-rl/index.md)
- [RL Charging MicroSim](../rl-charging/index.md) - First-order RL counterpart
- [RC Charging MicroSim](../rc-charging/index.md) - First-order RC counterpart
