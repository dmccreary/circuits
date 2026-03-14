---
title: RL Energizing / De-energizing Circuit MicroSim
description: Interactive simulation of an RL circuit showing inductor energizing and de-energizing with animated current flow and real-time graphs.
---

# RL Energizing / De-energizing Circuit MicroSim

<iframe src="main.html" width="100%" height="650px" scrolling="no"></iframe>

**Copy this iframe to your website:**

```html
<iframe src="https://dmccreary.github.io/circuits/sims/rl-charging/main.html" width="100%" height="650px" scrolling="no"></iframe>
```

[Run the RL Charging MicroSim in fullscreen](main.html){ .md-button .md-button--primary }

## Description

This MicroSim visualizes the RL transient process — what happens when an inductor energizes through a resistor after a switch is closed (Position A), and how the inductor de-energizes through a second resistor when the switch moves to Position B.

**Key Concepts Demonstrated:**

| Quantity | Formula | Behavior |
|----------|---------|----------|
| Inductor Current (energize) | \(I_L(t) = \frac{V_s}{R_1}(1 - e^{-t/\tau})\) | Rises exponentially toward \(V_s/R_1\) |
| Inductor Voltage (energize) | \(V_L(t) = V_s e^{-t/\tau}\) | Falls exponentially toward zero |
| Inductor Current (de-energize) | \(I_L(t) = I_0 e^{-t/\tau}\) | Decays exponentially toward zero |
| Inductor Voltage (de-energize) | \(V_L(t) = -I_0 R_2 e^{-t/\tau}\) | Negative — flyback effect |
| Time Constant | \(\tau = L/R\) | Time to reach 63.2% of final current |

**Note on Flyback Voltage:** During de-energizing, the inductor voltage is *negative* (shown in orange on the VL graph). If \(R_2 > R_1\), the flyback voltage can exceed \(V_s\) — this is the dangerous inductive kick that can damage switches and semiconductors.

**Interactive Features:**

- **Source Voltage Slider**: Adjust \(V_s\) from 1V to 20V
- **R₁ Slider**: Energizing resistance from 10Ω to 1000Ω
- **R₂ Slider**: De-energizing resistance from 10Ω to 1000Ω
- **Inductance Slider**: Adjust L from 10mH to 500mH
- **Switch Button**: Flip between energizing (A) and de-energizing (B)
- **Animated Electrons**: Flow speed proportional to current
- **Magnetic Field Glow**: Blue glow inside coil grows with inductor current

### How to Use

1. Observe initial state: switch at A, inductor with no current
2. Click **Start** to begin energizing
3. Watch current rise and inductor voltage fall (mirror image of RC charging)
4. Flip the switch to **B** to de-energize through R₂
5. Observe the negative flyback voltage on the VL graph
6. Try setting R₂ > R₁ to see how the flyback voltage exceeds Vs

## Technical Notes

The simulation uses the first-order RL step response:

1. **Energizing**: \(I_L(t) = \frac{V_s}{R_1}(1 - e^{-t/\tau_1})\) — current asymptotically approaches \(V_s/R_1\)
2. **De-energizing**: \(I_L(t) = I_0 e^{-t/\tau_2}\) — current decays from initial value \(I_0\)
3. **Flyback voltage**: \(V_L = -I_0 R_2 e^{-t/\tau_2}\) — can exceed supply voltage when \(R_2 > R_1\)
4. **Duality with RC**: IL in RL ↔ Vc in RC; VL in RL ↔ I in RC

## References

- Chapter 6: [Transient Analysis RC/RL](../../chapters/06-transient-analysis-rc-rl/index.md)
- [RC Charging MicroSim](../rc-charging/index.md) - The RC counterpart to this simulation
