---
title: Chapter 13 Content — Operational Amplifiers
description: Teaching content covering ideal op-amp model, negative feedback, golden rules, fundamental configurations, arithmetic circuits, integrators, differentiators, bandwidth, and practical limitations
generated_by: claude skill chapter-content-generator
date: 2026-04-14
version: 0.05
---

<div class="unit1-styled" markdown>

# Chapter 13 — Operational Amplifiers

<h2 id="131-introduction" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.1 Introduction</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
If passive components are the nouns of circuit language, <strong style="color: #333;">operational amplifiers</strong> are the verbs. They <em>do</em> things: amplify, buffer, sum, subtract, integrate, differentiate, compare, and oscillate. A single IC costing less than a dollar can perform tasks that would require dozens of discrete transistors and hours of careful matching and biasing.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The operational amplifier earned its name from 1940s analog computers, where it performed mathematical <em>operations</em> — addition, integration, and differentiation — on continuously varying electrical signals. Today, op-amps appear in virtually every electronic system: microphone preamplifiers, audio equalizers, sensor interfaces, active filters, motor controllers, medical instruments, and countless industrial applications. The iconic 741 introduced in 1968 democratized analog design; its modern descendants offer dramatically improved performance at a fraction of the cost.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
The beauty of op-amp design lies in how <strong style="color: #333;">negative feedback</strong> tames enormous open-loop gain into precise, stable, predictable behavior. With just two rules — and a handful of resistors — you can design amplifiers with exactly the gain you need, every time, regardless of manufacturing variations between individual chips. This chapter teaches you those rules and applies them systematically to the complete family of fundamental op-amp configurations.
</p>

<h2 id="132-ideal-op-amp" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.2 The Ideal Op-Amp Model</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">ideal op-amp</strong> is a simplified model that makes circuit analysis straightforward. Real op-amps approach this ideal closely enough that the model yields accurate results for the vast majority of designs.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Ideal Op-Amp Characteristics</h3>

| Property | Ideal Value | Practical Significance |
|---|---|---|
| Open-loop gain \(A\) | \(\infty\) | Any input difference drives output to a rail |
| Input impedance \(Z_{in}\) | \(\infty\) | No current flows into the input terminals |
| Output impedance \(Z_{out}\) | 0 | Can drive any load without voltage drop |
| Bandwidth | \(\infty\) | Works equally at all frequencies |
| CMRR | \(\infty\) | Perfectly rejects common-mode signals |
| Slew rate | \(\infty\) | Output changes instantaneously |

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The Op-Amp Symbol</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The standard <strong style="color: #333;">op-amp symbol</strong> is a triangle pointing right with five terminals:
</p>

- **Inverting input (−):** The input at which a positive signal produces a negative output change
- **Non-inverting input (+):** The input at which a positive signal produces a positive output change
- **Output:** The amplified difference signal, at the apex of the triangle
- **Positive power supply (V+):** Often labeled V_CC or V_DD, typically +5 V to +18 V
- **Negative power supply (V−):** Often labeled V_EE or GND for single-supply, typically 0 V to −18 V

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
The fundamental relationship is:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[V_{out} = A(V_+ - V_-)\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
where \(A\) is the open-loop gain (typically 100,000 to 1,000,000 for real op-amps). Power supply connections are almost always omitted from schematics, but they are always physically present — the output can only swing between the supply rails.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">
<p style="color: #B8860B; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Ideal Op-Amp Summary</p>
<p style="color: #555; line-height: 1.75; margin: 0;">

\[A \to \infty, \quad Z_{in} \to \infty, \quad Z_{out} \to 0\]

</p>
</div>

<h2 id="133-open-closed-loop" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.3 Open-Loop vs. Closed-Loop Gain</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Open-Loop Gain</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Open-loop gain</strong> (\(A_{OL}\)) is the op-amp's intrinsic voltage gain with no external feedback — typically 100,000 (100 dB) or more at DC. This enormous gain means that even a 1 µV input difference would ideally produce a 100 mV output change. In practice, any tiny offset drives the output all the way to one of the power supply rails.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Open-loop operation is therefore useless for linear amplification but is the basis of <strong>comparator</strong> circuits, where we <em>want</em> the output to saturate at one rail or the other.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Closed-Loop Gain</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Closed-loop gain</strong> (\(A_{CL}\)) is the overall gain when a feedback network is connected from the output back to one of the inputs. Let \(\beta\) be the fraction of the output fed back to the inverting input. Then:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[A_{CL} = \frac{A_{OL}}{1 + A_{OL}\beta}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
When \(A_{OL}\beta \gg 1\) (which is almost always true in practical circuits):
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[A_{CL} \approx \frac{1}{\beta}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The closed-loop gain depends <strong>only</strong> on the feedback network — not on the op-amp's open-loop gain. This is the central magic of negative feedback: resistors are far more stable and predictable than transistor gains, so the circuit's behavior is stable and repeatable.
</p>

| Mode | Gain | Stability | Use |
|---|---|---|---|
| Open-loop | \(A_{OL} \approx 10^5\) | Saturates immediately | Comparators |
| Closed-loop | \(\approx 1/\beta\) | Stable, predictable | Amplifiers, filters |

<h2 id="134-negative-feedback" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.4 Negative Feedback</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Negative feedback</strong> connects a portion of the output signal back to the <em>inverting</em> input. It is the cornerstone of stable, linear op-amp operation.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">How Negative Feedback Works</h3>

1. The output increases slightly due to a change at the input
2. A fraction of that output is fed back to the inverting (−) input
3. The increased signal at (−) reduces the difference \(V_+ - V_-\)
4. The reduced difference reduces the output
5. The system reaches a stable equilibrium

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem; margin-top: 1rem;">
The benefits of negative feedback go well beyond stability:
</p>

- **Reduced distortion** — nonlinearities in the op-amp are suppressed by the loop gain
- **Increased bandwidth** — the feedback extends usable frequency range
- **Reduced output impedance** — the amplifier can drive heavier loads
- **Reduced sensitivity** — gain varies only slightly with temperature or supply voltage

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Positive Feedback</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Positive feedback</strong> connects output back to the <em>non-inverting</em> (+) input. Instead of opposing changes, it reinforces them — the circuit is intentionally unstable. Positive feedback is the basis of oscillators and Schmitt triggers (comparators with hysteresis), but is never used for linear amplification.
</p>

| Feedback Type | Connected To | Effect | Applications |
|---|---|---|---|
| Negative | Inverting (−) input | Stabilizing | Amplifiers, filters, integrators |
| Positive | Non-inverting (+) input | Destabilizing | Oscillators, Schmitt triggers |

<h2 id="135-golden-rules" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.5 The Golden Rules: Virtual Short and Virtual Ground</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
For an ideal op-amp operating with negative feedback, two simple rules solve almost every linear op-amp circuit. These are commonly called the <strong style="color: #333;">golden rules</strong>.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Golden Rule 1 — Virtual Short</h3>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[V_+ = V_-\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The voltage at the inverting input equals the voltage at the non-inverting input. This is not a physical short circuit — no wire connects them — but the feedback loop forces them to be equal. The reasoning: with infinite open-loop gain, even a microvolt difference would drive the output to a rail. Negative feedback continuously corrects any difference until it vanishes. The two inputs appear <em>virtually</em> shorted.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Golden Rule 2 — No Input Current</h3>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[I_+ = I_- = 0\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
No current flows into either input terminal. This follows from the infinite input impedance of the ideal op-amp. Any current arriving at a node connected to an op-amp input must flow somewhere else — through the feedback resistor or the source, but never into the op-amp itself.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Virtual Ground</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Virtual ground</strong> is the special — and extremely common — case of the virtual short when the non-inverting input is connected to actual ground:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[V_+ = 0 \quad \Rightarrow \quad V_- = 0\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The inverting input node sits at exactly 0 V without being connected directly to ground. This virtual ground is maintained by the feedback loop, not by a wire. It is the key to analyzing inverting-configuration circuits: any current flowing toward the inverting input node through the input resistor must flow away through the feedback resistor, since the op-amp draws none of it.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 12px;">The Two Golden Rules (Summary)</p>

**Rule 1 — Virtual Short:** \(V_+ = V_-\) (inputs are at the same voltage when negative feedback is present)

**Rule 2 — No Input Current:** \(I_+ = I_- = 0\) (no current flows into either input terminal)

**Corollary — Virtual Ground:** When \(V_+ = 0\), then \(V_- = 0\) as well
</div>

<h2 id="136-inverting-amplifier" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.6 Inverting Amplifier</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">inverting amplifier</strong> is the most widely used basic op-amp configuration. The input signal connects through an input resistor \(R_i\) to the inverting (−) input, and a feedback resistor \(R_f\) connects from the output back to the inverting input. The non-inverting (+) input is tied to ground.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Voltage Gain</h3>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[A_V = -\frac{R_f}{R_i}, \qquad Z_{in} = R_i\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The negative sign indicates <strong>phase inversion</strong> — a positive input produces a negative output, and vice versa. The magnitude of gain is set entirely by the resistor ratio.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Step-by-Step Analysis Using the Golden Rules</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 12px;">Worked Analysis — Inverting Amplifier</p>

**Given:** \(R_i\), \(R_f\), input voltage \(V_{in}\). Find \(V_{out}\).

**Step 1 — Apply virtual short.** Since \(V_+ = 0\) (grounded) and \(V_+ = V_-\), we conclude \(V_- = 0\). The inverting input is a virtual ground.

**Step 2 — Find current through \(R_i\).** The voltage across \(R_i\) is \(V_{in} - V_- = V_{in} - 0 = V_{in}\):

\[I_i = \frac{V_{in}}{R_i}\]

**Step 3 — Apply no-input-current rule.** Since \(I_- = 0\), all of \(I_i\) must flow through \(R_f\) (KCL at the virtual ground node):

\[I_f = I_i = \frac{V_{in}}{R_i}\]

**Step 4 — Find \(V_{out}\).** The current \(I_f\) flows from the virtual ground node (0 V) through \(R_f\) to the output. The output is at the other end of \(R_f\):

\[V_{out} = V_- - I_f R_f = 0 - \frac{V_{in}}{R_i} R_f = -\frac{R_f}{R_i} V_{in}\]

**Result:**

\[A_V = \frac{V_{out}}{V_{in}} = -\frac{R_f}{R_i}\]
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Worked Design Example</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 12px;">Design — Inverting Amplifier with Gain = −25</p>

**Specification:** Design an inverting amplifier with \(A_V = -25\). Use standard 5% resistors.

**Step 1 — Choose \(R_i\).** A value of \(R_i = 10\ \text{k}\Omega\) is a good starting point (low enough to source easily, high enough not to load most sources).

**Step 2 — Calculate \(R_f\):**

\[|A_V| = \frac{R_f}{R_i} \quad \Rightarrow \quad R_f = 25 \times 10\ \text{k}\Omega = 250\ \text{k}\Omega\]

**Step 3 — Select standard value.** The nearest standard E24 value is 240 kΩ, giving actual gain:

\[A_V = -\frac{240\ \text{k}\Omega}{10\ \text{k}\Omega} = -24\]

Or use 270 kΩ for \(A_V = -27\). If precise gain is required, use a trim pot in series with \(R_f\).

**Step 4 — Add a bias-compensation resistor.** Connect a resistor \(R_{bias} = R_i \| R_f\) from the non-inverting input to ground to cancel errors from input bias current:

\[R_{bias} = \frac{R_i \cdot R_f}{R_i + R_f} = \frac{10\ \text{k} \times 240\ \text{k}}{250\ \text{k}} \approx 9.6\ \text{k}\Omega \approx 10\ \text{k}\Omega\]

**Final design:** \(R_i = 10\ \text{k}\Omega\), \(R_f = 240\ \text{k}\Omega\), \(R_{bias} = 10\ \text{k}\Omega\)
</div>

<h2 id="137-non-inverting" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.7 Non-Inverting Amplifier</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">non-inverting amplifier</strong> connects the input signal to the non-inverting (+) input, with a resistor voltage divider providing feedback from the output to the inverting (−) input. The input and output are in phase.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Voltage Gain</h3>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[A_V = 1 + \frac{R_f}{R_i}, \qquad Z_{in} \approx \infty\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The gain is always positive (no phase inversion) and always greater than or equal to 1. The input impedance is extremely high — essentially infinite for the ideal case — because the signal drives the non-inverting input directly.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Analysis Using the Golden Rules</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
By the virtual short: \(V_- = V_+ = V_{in}\). The inverting input voltage is set by the feedback voltage divider \(R_i\) and \(R_f\):
</p>

\[V_- = V_{out} \cdot \frac{R_i}{R_i + R_f}\]

Setting \(V_- = V_{in}\) and solving for \(V_{out}\):

\[V_{in} = V_{out} \cdot \frac{R_i}{R_i + R_f} \quad \Rightarrow \quad V_{out} = V_{in}\left(1 + \frac{R_f}{R_i}\right)\]

<h2 id="138-voltage-follower" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.8 Voltage Follower (Buffer Amplifier)</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">voltage follower</strong> (also called a <strong>unity-gain buffer</strong> or <strong>buffer amplifier</strong>) is the special case of the non-inverting amplifier where the output is connected directly to the inverting input (\(R_f = 0\), \(R_i = \infty\)).
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[A_V = 1, \qquad V_{out} = V_{in}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The gain is exactly 1 — the output follows the input. But why use a circuit that provides no gain? The voltage follower provides <strong>impedance transformation</strong>: its input impedance is essentially infinite (does not load the source), and its output impedance is essentially zero (can drive heavy loads without voltage drop). It isolates one stage from the next.
</p>

**Applications of the voltage follower:**
- Buffer between a high-impedance source (sensor, potentiometer) and a low-impedance load
- Prevent a load from affecting the source voltage in precision measurement
- Sample-and-hold circuits
- Active oscilloscope probes

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Configuration Comparison</h3>

| Configuration | Gain Formula | Gain Sign | \(Z_{in}\) | Use |
|---|---|---|---|---|
| Inverting | \(-R_f/R_i\) | Negative | \(R_i\) | Precise inverting gain |
| Non-inverting | \(1 + R_f/R_i\) | Positive | \(\approx \infty\) | Non-inverting gain |
| Voltage follower | 1 | Positive | \(\approx \infty\) | Impedance buffering |

<h2 id="139-arithmetic" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.9 Arithmetic Circuits</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Summing Amplifier</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">summing amplifier</strong> extends the inverting configuration by adding multiple input resistors. Each input signal connects through its own resistor to the virtual ground node at V−. Because the virtual ground prevents any input from affecting the others (they are all driven into a 0 V node), the currents add independently.
</p>

**For different input resistors:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[V_{out} = -R_f\left(\frac{V_1}{R_1} + \frac{V_2}{R_2} + \frac{V_3}{R_3}\right)\]

</div>

**For equal input resistors \((R_1 = R_2 = R_3 = R)\):**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[V_{out} = -\frac{R_f}{R}(V_1 + V_2 + V_3)\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Applications include audio mixing (combining microphone, instrument, and playback channels), digital-to-analog conversion (binary-weighted resistors), and weighted signal averaging.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 12px;">Worked Example — Summing Amplifier</p>

**Given:** Three inputs — \(V_1 = 1\ \text{V}\), \(V_2 = 2\ \text{V}\), \(V_3 = -0.5\ \text{V}\). All input resistors \(R = 10\ \text{k}\Omega\), feedback \(R_f = 20\ \text{k}\Omega\).

**Solution:**

\[V_{out} = -\frac{R_f}{R}(V_1 + V_2 + V_3) = -\frac{20}{10}(1 + 2 - 0.5) = -2 \times 2.5 = -5\ \text{V}\]
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Difference Amplifier</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">difference amplifier</strong> subtracts one signal from another. With four equal resistors (all equal to \(R\)) or with a standard resistor ratio \(R_f/R_i\):
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[V_{out} = \frac{R_f}{R_i}(V_2 - V_1)\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The output is proportional to the difference of the two inputs. Common-mode signals (equal voltages on both inputs) are rejected. One limitation: the input impedances seen by \(V_1\) and \(V_2\) are not equal, and both are relatively low (\(R_i\) and \(R_i + R_f\) respectively), which can load sensitive sources.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Instrumentation Amplifier</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">instrumentation amplifier</strong> (INA) solves the input impedance problem of the basic difference amplifier. It consists of three op-amps: two input buffer stages (non-inverting) that provide very high input impedance, followed by a precision difference stage.
</p>

**Key characteristics:**
- Very high input impedance on both differential inputs (essentially infinite)
- Excellent CMRR (80–120 dB typical)
- Gain set by a single external resistor \(R_G\):

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[A_V = 1 + \frac{2R}{R_G}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Applications include bridge sensor amplifiers (strain gauges, load cells), medical biosignal amplifiers (ECG, EEG), and precision thermocouple interfaces.
</p>

<h2 id="1310-integrator-differentiator" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.10 Integrator and Differentiator</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Integrator Circuit</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">integrator</strong> replaces the feedback resistor \(R_f\) with a capacitor \(C\). The output is proportional to the time integral of the input:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[V_{out}(t) = -\frac{1}{RC}\int_0^t V_{in}(\tau)\, d\tau + V_{out}(0)\]

</div>

**In the frequency domain (s-domain transfer function):**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[H(j\omega) = -\frac{1}{j\omega RC}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The gain magnitude is \(|H| = 1/(\omega RC)\) — it increases without bound as frequency decreases. The integrator is a first-order low-pass filter with a −20 dB/decade slope, and its phase shift is a constant −90°.
</p>

**Practical note:** A pure integrator saturates due to DC offset and bias current accumulation. A large resistor in parallel with the capacitor (typically 10 × \(R\)) creates a low-frequency pole that limits DC gain and stabilizes the circuit at the cost of integration accuracy at very low frequencies.

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 12px;">Worked Example — Integrator with Step Input</p>

**Given:** \(R = 10\ \text{k}\Omega\), \(C = 100\ \text{nF}\), step input \(V_{in} = +2\ \text{V}\) applied at \(t = 0\), initial condition \(V_{out}(0) = 0\).

**Calculate \(V_{out}\) at \(t = 1\ \text{ms}\):**

\[RC = 10 \times 10^3 \times 100 \times 10^{-9} = 1\ \text{ms}\]

For a constant input:

\[V_{out}(t) = -\frac{V_{in}}{RC} \cdot t = -\frac{2\ \text{V}}{1\ \text{ms}} \times 1\ \text{ms} = -2\ \text{V}\]

The output ramps linearly from 0 V to −2 V in 1 ms. If the input remains constant, the output continues ramping until it saturates at the negative supply rail.
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Differentiator Circuit</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">differentiator</strong> replaces the input resistor \(R_i\) with a capacitor \(C\). The output is proportional to the time derivative of the input:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[V_{out}(t) = -RC\frac{dV_{in}}{dt}\]

</div>

**In the frequency domain:**

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[H(j\omega) = -j\omega RC\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The gain increases linearly with frequency — the differentiator is a first-order high-pass filter with a +20 dB/decade slope. Unfortunately, this means it amplifies high-frequency noise, which in real circuits can make the output completely unusable. Adding a small series resistor \(R_s\) in series with the capacitor limits the gain at high frequencies and stabilizes the circuit.
</p>

| Circuit | Feedback Element | Transfer Function | Shape |
|---|---|---|---|
| Inverting amplifier | Resistor \(R_f\) | \(-R_f/R_i\) | Flat |
| Integrator | Capacitor \(C\) | \(-1/(j\omega RC)\) | −20 dB/decade |
| Differentiator | Capacitor \(C\) at input | \(-j\omega RC\) | +20 dB/decade |

<h2 id="1311-bandwidth-gbw" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.11 Bandwidth and Gain-Bandwidth Product</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Op-Amp Bandwidth</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Real op-amps have finite <strong style="color: #333;">bandwidth</strong>. The open-loop gain \(A_{OL}\) is maximum at DC and rolls off at −20 dB/decade above a dominant pole frequency (often just a few hertz). By the time the gain falls to 1 (0 dB), we reach the <strong>unity-gain frequency</strong> \(f_T\), which is also called the <strong>gain-bandwidth product</strong> (GBW).
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Gain-Bandwidth Product (GBW)</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
For a single-pole op-amp, the product of closed-loop gain and bandwidth is constant:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[\text{GBW} = A_{CL} \times BW = \text{constant}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Higher gain means narrower bandwidth — they trade off against each other. The GBW is a fixed property of the op-amp, typically listed in the datasheet.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 12px;">Example — GBW Trade-off</p>

Op-amp with GBW = 10 MHz:

| Closed-Loop Gain | Available Bandwidth |
|---|---|
| 1 (voltage follower) | 10 MHz |
| 10 | 1 MHz |
| 100 | 100 kHz |
| 1000 | 10 kHz |

**Design rule:** Always verify that \(A_{CL} \times f_{signal} < \text{GBW}\) before finalizing a design.
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Slew Rate</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Slew rate</strong> (SR) is the maximum rate at which the output voltage can change, regardless of the input. It arises from the finite current available to charge internal capacitances.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[SR = \left|\frac{dV_{out}}{dt}\right|_{max} \quad \text{in V/μs}\]

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Slew rate limits performance on large-amplitude, high-frequency signals — even if the GBW is adequate for small signals. The maximum frequency at which a full output swing of peak value \(V_{peak}\) can be faithfully reproduced is:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[f_{max} = \frac{SR}{2\pi V_{peak}}\]

</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 12px;">Example — Slew Rate Limitation</p>

**Given:** LM741 op-amp with SR = 0.5 V/μs. Required: 10 V peak output.

\[f_{max} = \frac{SR}{2\pi V_{peak}} = \frac{0.5 \times 10^6\ \text{V/s}}{2\pi \times 10\ \text{V}} = \frac{500{,}000}{62.83} \approx 7.96\ \text{kHz}\]

Above approximately 8 kHz, the LM741 cannot faithfully reproduce a 10 V peak sinusoid — the output becomes a triangle wave. For audio applications extending to 20 kHz with 10 V output, you need an op-amp with SR > 1.26 V/μs.
</div>

<h2 id="1312-practical-limitations" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">13.12 Practical Limitations</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Input Offset Voltage</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Input offset voltage</strong> (\(V_{OS}\)) is the small differential DC voltage that must be applied between the inputs to make the output exactly zero. It arises from mismatches in the input transistor pair during manufacturing.
</p>

- Typical values: 1–10 mV (general purpose), below 100 µV (precision op-amps)
- Effect at output: \(V_{OS,out} = V_{OS} \times (1 + R_f/R_i)\) — amplified by closed-loop gain
- Mitigation: use precision op-amps (e.g., OPA2134), add an offset null trim circuit, or AC-couple the signal path

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Input Bias Current</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Input bias current</strong> (\(I_B\)) is the small DC current that must flow into each input terminal for the internal transistors to operate. Although golden rule 2 says this is zero for an ideal op-amp, real op-amps require it.
</p>

- BJT input op-amps: 10 nA to 10 µA
- JFET/CMOS input op-amps: below 1 pA (essentially zero)
- Effect: creates a voltage error \(I_B \times R_{source}\) that appears as an input offset
- Mitigation: match source impedances at both inputs; use FET-input op-amps for high-impedance sources

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Common-Mode Rejection Ratio (CMRR)</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">CMRR</strong> quantifies how well an op-amp rejects signals that appear simultaneously (in common) on both inputs, such as 60 Hz power-line interference or ground noise.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px; margin: 1.2rem 0;">

\[\text{CMRR} = 20\log_{10}\!\left(\frac{A_{differential}}{A_{common}}\right)\ \text{dB}\]

</div>

- Typical values: 80–120 dB for general-purpose op-amps
- Higher CMRR means better rejection of common-mode interference
- Critical in sensor applications where the signal of interest is small (millivolts) riding on top of a large common-mode voltage (volts)

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Op-Amp Saturation</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Saturation</strong> occurs when the calculated output voltage exceeds what the power supply can provide. For a ±15 V supply, a conventional op-amp can typically swing to within 1–2 V of each rail, so the actual output limits at approximately ±13 V to ±14 V. When saturated, the circuit is no longer linear and the golden rules do not apply.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Rail-to-rail op-amps</strong> use output stage topologies that allow the output to swing all the way to the supply rails (within millivolts). They are essential in single-supply, low-voltage designs (3.3 V, 5 V) where losing 1–2 V would be a large fraction of the available swing.
</p>

| Limitation | Cause | Effect | Mitigation |
|---|---|---|---|
| Input offset voltage | Transistor mismatch | DC error at output | Precision op-amp, trim circuit |
| Input bias current | Base/gate current | Offset from source resistance | FET-input op-amp, matched \(R\) |
| Finite GBW | Internal compensation capacitor | Gain falls at high \(f\) | Higher-GBW op-amp |
| Slew rate | Limited charge current | Distortion at high \(f\), large swing | High-SR op-amp |
| Finite CMRR | Input transistor mismatch | Common-mode error | High-CMRR op-amp, careful layout |
| Saturation | Supply rail limit | Clipping, loss of linearity | Reduce gain, increase supply |

<h2 id="1313-summary" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Chapter Summary</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Operational amplifiers are the foundation of analog circuit design. Here is a consolidated reference for the key formulas and principles from this chapter:
</p>

| Topic | Key Formula or Principle |
|---|---|
| Ideal op-amp | \(A \to \infty\), \(Z_{in} \to \infty\), \(Z_{out} \to 0\) |
| Op-amp output | \(V_{out} = A(V_+ - V_-)\) |
| Virtual short | \(V_+ = V_-\) (with negative feedback) |
| No input current | \(I_+ = I_- = 0\) |
| Inverting amplifier | \(A_V = -R_f/R_i\), \(Z_{in} = R_i\) |
| Non-inverting amplifier | \(A_V = 1 + R_f/R_i\), \(Z_{in} \approx \infty\) |
| Voltage follower | \(A_V = 1\) |
| Summing amplifier | \(V_{out} = -R_f(V_1/R_1 + V_2/R_2 + V_3/R_3)\) |
| Difference amplifier | \(V_{out} = (R_f/R_i)(V_2 - V_1)\) |
| Integrator | \(V_{out} = -(1/RC)\int V_{in}\,dt\), \(H = -1/(j\omega RC)\) |
| Differentiator | \(V_{out} = -RC\,dV_{in}/dt\), \(H = -j\omega RC\) |
| Gain-bandwidth product | \(\text{GBW} = A_{CL} \times BW\) |
| Slew rate limit | \(f_{max} = SR / (2\pi V_{peak})\) |
| CMRR | \(20\log_{10}(A_{diff}/A_{cm})\ \text{dB}\) |

<div style="background: #E8F5E9; border: 2px solid #A5D6A7; border-radius: 12px; padding: 18px 24px; margin: 2rem 0; box-shadow: 0 2px 8px rgba(76,175,80,0.08);">
<p style="margin:0;color:#2E7D32;font-weight:600;font-size:1.02rem;">
&#127891; Test your understanding:
<a href="../quiz/" style="color:#1565C0;font-weight:700;margin-left:0.5rem;">Proceed to Chapter 13 Quiz &rarr;</a>
</p>
</div>

</div>
