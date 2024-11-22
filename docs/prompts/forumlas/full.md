# Full List of Formulas

#### Ohm's Law

$V = I \cdot R$

where:

-   $V$ is the voltage across the resistor
-   $I$ is the current through the resistor
-   $R$ is the resistance

#### Kirchhoff's Voltage Law (KVL)

$\sum V = 0$

where:

-   $V$ represents the voltages around a closed loop

#### Kirchhoff's Current Law (KCL)

$\sum I = 0$

where:

-   $I$ represents the currents entering and leaving a junction

#### Thevenin's Theorem

$V_{th} = V_{open}$

where:

-   $V_{th}$ is the Thevenin equivalent voltage
-   $V_{open}$ is the open-circuit voltage

#### Norton's Theorem

$I_{N} = \frac{V_{th}}{R_{th}}$

where:

-   $I_{N}$ is the Norton equivalent current
-   $V_{th}$ is the Thevenin equivalent voltage
-   $R_{th}$ is the Thevenin equivalent resistance

#### Impedance of a Resistor

$Z_R = R$

where:

-   $Z_R$ is the impedance of the resistor
-   $R$ is the resistance

#### Impedance of an Inductor

$Z_L = j\omega L$

where:

-   $Z_L$ is the impedance of the inductor
-   $j$ is the imaginary unit
-   $\omega$ is the angular frequency
-   $L$ is the inductance

#### Impedance of a Capacitor

$Z_C = \frac{1}{j\omega C}$

where:

-   $Z_C$ is the impedance of the capacitor
-   $j$ is the imaginary unit
-   $\omega$ is the angular frequency
-   $C$ is the capacitance

#### Total Impedance in Series

$Z_{total} = Z_1 + Z_2 + \dots + Z_n$

where:

-   $Z_{total}$ is the total impedance
-   $Z_1, Z_2, \dots, Z_n$ are the individual impedances in series

#### Total Impedance in Parallel

$\frac{1}{Z_{total}} = \frac{1}{Z_1} + \frac{1}{Z_2} + \dots + \frac{1}{Z_n}$

where:

-   $Z_{total}$ is the total impedance
-   $Z_1, Z_2, \dots, Z_n$ are the individual impedances in parallel

#### Voltage Divider

$V_{out} = V_{in} \cdot \frac{R_2}{R_1 + R_2}$

where:

-   $V_{out}$ is the output voltage
-   $V_{in}$ is the input voltage
-   $R_1$ and $R_2$ are resistances in the voltage divider

#### Current Divider

$I_{out} = I_{in} \cdot \frac{R_{total}}{R_{out}}$

where:

-   $I_{out}$ is the output current
-   $I_{in}$ is the input current
-   $R_{total}$ is the total resistance
-   $R_{out}$ is the resistance through which the current is divided

#### Power in DC Circuits

$P = V \cdot I$

where:

-   $P$ is the power
-   $V$ is the voltage
-   $I$ is the current

#### Power in AC Circuits

$P = V_{rms} \cdot I_{rms} \cdot \cos{\phi}$

where:

-   $P$ is the real power
-   $V_{rms}$ is the root mean square voltage
-   $I_{rms}$ is the root mean square current
-   $\phi$ is the phase angle between voltage and current

#### Reactance of an Inductor

$X_L = \omega L$

where:

-   $X_L$ is the inductive reactance
-   $\omega$ is the angular frequency
-   $L$ is the inductance

#### Reactance of a Capacitor

$X_C = \frac{1}{\omega C}$

where:

-   $X_C$ is the capacitive reactance
-   $\omega$ is the angular frequency
-   $C$ is the capacitance

#### Admittance

$Y = \frac{1}{Z}$

where:

-   $Y$ is the admittance
-   $Z$ is the impedance

#### Resonance Frequency

$f_0 = \frac{1}{2\pi\sqrt{LC}}$

where:

-   $f_0$ is the resonance frequency
-   $L$ is the inductance
-   $C$ is the capacitance

#### Quality Factor (Q Factor)

$Q = \frac{\omega_0 L}{R}$

where:

-   $Q$ is the quality factor
-   $\omega_0$ is the resonance angular frequency
-   $L$ is the inductance
-   $R$ is the resistance

#### Phasor Representation

$V = V_m \angle \theta$

where:

-   $V$ is the phasor voltage
-   $V_m$ is the magnitude
-   $\theta$ is the phase angle

#### Complex Power

$S = V \cdot I^\*$

where:

-   $S$ is the complex power
-   $V$ is the voltage phasor
-   $I^\*$ is the complex conjugate of the current phasor

#### Maximum Power Transfer Theorem

$R_{load} = R_{th}$

where:

-   $R_{load}$ is the load resistance
-   $R_{th}$ is the Thevenin equivalent resistance

#### Superposition Theorem

$V_{total} = \sum V_i$

where:

-   $V_{total}$ is the total voltage
-   $V_i$ are the individual voltages from each independent source

#### Source Transformation

$V_{th} \leftrightarrow I_{N}$

where:

-   $V_{th}$ is the Thevenin voltage
-   $I_{N}$ is the Norton current

#### Frequency Response

$H(j\omega) = \frac{V_{out}}{V_{in}}$

where:

-   $H(j\omega)$ is the frequency response
-   $V_{out}$ is the output voltage
-   $V_{in}$ is the input voltage
-   $\omega$ is the angular frequency

#### Impulse Response

$h(t) = \mathcal{L}^{-1}{H(s)}$

where:

-   $h(t)$ is the impulse response
-   $\mathcal{L}^{-1}$ denotes the inverse Laplace transform
-   $H(s)$ is the system transfer function

#### Transfer Function

$H(s) = \frac{Y(s)}{X(s)}$

where:

-   $H(s)$ is the transfer function
-   $Y(s)$ is the output in the Laplace domain
-   $X(s)$ is the input in the Laplace domain

#### Laplace Transform of a Resistor

$Z_R(s) = R$

where:

-   $Z_R(s)$ is the Laplace impedance of the resistor
-   $R$ is the resistance

#### Laplace Transform of an Inductor

$Z_L(s) = sL$

where:

-   $Z_L(s)$ is the Laplace impedance of the inductor
-   $s$ is the complex frequency variable
-   $L$ is the inductance

#### Laplace Transform of a Capacitor

$Z_C(s) = \frac{1}{sC}$

where:

-   $Z_C(s)$ is the Laplace impedance of the capacitor
-   $s$ is the complex frequency variable
-   $C$ is the capacitance

#### Bode Plot Slope

$Slope = 20n , \text{dB/decade}$

where:

-   $Slope$ is the rate of change of the Bode plot
-   $n$ is the number of poles or zeros

#### Decibel Calculation

$G_{dB} = 20 \log_{10}\left(\frac{V_{out}}{V_{in}}\right)$

where:

-   $G_{dB}$ is the gain in decibels
-   $V_{out}$ is the output voltage
-   $V_{in}$ is the input voltage

#### Voltage Gain

$A_v = \frac{V_{out}}{V_{in}}$

where:

-   $A_v$ is the voltage gain
-   $V_{out}$ is the output voltage
-   $V_{in}$ is the input voltage

#### Current Gain

$A_i = \frac{I_{out}}{I_{in}}$

where:

-   $A_i$ is the current gain
-   $I_{out}$ is the output current
-   $I_{in}$ is the input current

#### Power Gain

$A_p = \frac{P_{out}}{P_{in}}$

where:

-   $A_p$ is the power gain
-   $P_{out}$ is the output power
-   $P_{in}$ is the input power

#### Signal-to-Noise Ratio (SNR)

$\text{SNR} = \frac{P_{signal}}{P_{noise}}$

where:

-   $\text{SNR}$ is the signal-to-noise ratio
-   $P_{signal}$ is the power of the signal
-   $P_{noise}$ is the power of the noise

#### Total Harmonic Distortion (THD)

$\text{THD} = \frac{\sqrt{V_2^2 + V_3^2 + \dots + V_n^2}}{V_1}$

where:

-   $\text{THD}$ is the total harmonic distortion
-   $V_1$ is the fundamental voltage
-   $V_2, V_3, \dots, V_n$ are the harmonic voltages

#### Common-Mode Rejection Ratio (CMRR)

$\text{CMRR} = \frac{A_d}{A_c}$

where:

-   $\text{CMRR}$ is the common-mode rejection ratio
-   $A_d$ is the differential gain
-   $A_c$ is the common-mode gain

#### Gain Bandwidth Product

$GBW = A_v \cdot f_{3dB}$

where:

-   $GBW$ is the gain-bandwidth product
-   $A_v$ is the voltage gain
-   $f_{3dB}$ is the -3 dB bandwidth frequency

#### Miller Theorem

$C_{Miller} = C(1 - A_v)$

where:

-   $C_{Miller}$ is the Miller capacitance
-   $C$ is the original capacitance
-   $A_v$ is the voltage gain

#### Slew Rate

$\text{Slew Rate} = \frac{dV}{dt}$

where:

-   $\text{Slew Rate}$ is the rate of change of the output voltage
-   $\frac{dV}{dt}$ is the derivative of voltage with respect to time

#### Differential Amplifier Gain

$A_d = \frac{V_{out}}{V_{in+} - V_{in-}}}$

where:

-   $A_d$ is the differential gain
-   $V_{out}$ is the output voltage
-   $V_{in+}$ and $V_{in-}$ are the input voltages

#### Common-Mode Gain

$A_c = \frac{V_{out}}{\frac{V_{in+} + V_{in-}}{2}}$

where:

-   $A_c$ is the common-mode gain
-   $V_{out}$ is the output voltage
-   $V_{in+}$ and $V_{in-}$ are the input voltages

#### Input Impedance

$Z_{in} = \frac{V_{in}}{I_{in}}$

where:

-   $Z_{in}$ is the input impedance
-   $V_{in}$ is the input voltage
-   $I_{in}$ is the input current

#### Output Impedance

$Z_{out} = \frac{V_{out}}{I_{out}}$

where:

-   $Z_{out}$ is the output impedance
-   $V_{out}$ is the output voltage
-   $I_{out}$ is the output current

#### Feedback Factor

$\beta = \frac{V_{feedback}}{V_{out}}$

where:

-   $\beta$ is the feedback factor
-   $V_{feedback}$ is the feedback voltage
-   $V_{out}$ is the output voltage

#### Closed-Loop Gain with Feedback

$A_{closed} = \frac{A}{1 + A\beta}$

where:

-   $A_{closed}$ is the closed-loop gain
-   $A$ is the open-loop gain
-   $\beta$ is the feedback factor

#### Stability Criterion (Nyquist)

$\text{Stability requires that the Nyquist plot does not encircle the -1 point}$

where:

-   Stability is determined by the Nyquist plot
-   The -1 point is the critical point for encirclement

#### Bode Stability Criterion

$\text{Phase margin} > 0^\circ \text{ and } \text{Gain margin} > 0 \text{ dB}$

where:

-   Phase margin is the additional phase needed for stability
-   Gain margin is the additional gain before instability

#### Frequency Response of a First-Order Low-Pass Filter

$H(j\omega) = \frac{1}{1 + j\omega RC}$

where:

-   $H(j\omega)$ is the transfer function
-   $\omega$ is the angular frequency
-   $R$ is the resistance
-   $C$ is the capacitance

#### Frequency Response of a First-Order High-Pass Filter

$H(j\omega) = \frac{j\omega RC}{1 + j\omega RC}$

where:

-   $H(j\omega)$ is the transfer function
-   $\omega$ is the angular frequency
-   $R$ is the resistance
-   $C$ is the capacitance

#### Voltage Gain of a Common-Emitter Amplifier

$A_v = -g_m R_C$

where:

-   $A_v$ is the voltage gain
-   $g_m$ is the transconductance
-   $R_C$ is the collector resistor

#### Transconductance

$g_m = \frac{I_C}{V_T}$

where:

-   $g_m$ is the transconductance
-   $I_C$ is the collector current
-   $V_T$ is the thermal voltage

#### Power Supply Rejection Ratio (PSRR)

$\text{PSRR} = \frac{\Delta V_{CC}}{\Delta V_{out}}$

where:

-   $\text{PSRR}$ is the power supply rejection ratio
-   $\Delta V_{CC}$ is the change in supply voltage
-   $\Delta V_{out}$ is the change in output voltage

#### Differential Mode Gain

$A_d = \frac{V_{out}}{V_{in+} - V_{in-}}}$

where:

-   $A_d$ is the differential mode gain
-   $V_{out}$ is the output voltage
-   $V_{in+}$ and $V_{in-}$ are the input voltages

#### Common-Mode Rejection Ratio (CMRR)

$\text{CMRR} = \frac{A_d}{A_c}$

where:

-   $\text{CMRR}$ is the common-mode rejection ratio
-   $A_d$ is the differential gain
-   $A_c$ is the common-mode gain

#### Differential Pair Gain

$A = \frac{g_m R_D}{2}$

where:

-   $A$ is the differential pair gain
-   $g_m$ is the transconductance
-   $R_D$ is the drain resistor

#### Bandwidth of an Amplifier

$BW = \frac{GBW}{A_v}$

where:

-   $BW$ is the bandwidth
-   $GBW$ is the gain-bandwidth product
-   $A_v$ is the voltage gain

#### Slew Rate Limitation

$\text{Slew Rate} = \frac{dV_{out}}{dt} \leq \text{Maximum Slew Rate}$

where:

-   $\text{Slew Rate}$ is the rate of change of the output voltage
-   $\frac{dV_{out}}{dt}$ is the derivative of output voltage with respect to time

#### Noise Figure

$NF = \frac{\text{SNR}*{in}}{\text{SNR}*{out}}}$

where:

-   $NF$ is the noise figure
-   $\text{SNR}_{in}$ is the signal-to-noise ratio at the input
-   $\text{SNR}_{out}$ is the signal-to-noise ratio at the output

#### Total Power in a Resonant Circuit

$P_{total} = \frac{V^2}{R}$

where:

-   $P_{total}$ is the total power
-   $V$ is the voltage
-   $R$ is the resistance

#### Voltage Gain of an Operational Amplifier

$A_v = \frac{V_{out}}{V_{in}}$

where:

-   $A_v$ is the voltage gain
-   $V_{out}$ is the output voltage
-   $V_{in}$ is the input voltage

#### Bootstrap Circuit Gain

$A_v = \frac{1 + R_2/R_1}{1}$

where:

-   $A_v$ is the voltage gain
-   $R_1$ and $R_2$ are resistor values in the bootstrap circuit

#### Feedback Network Gain

$\beta = \frac{R_f}{R_f + R_i}$

where:

-   $\beta$ is the feedback factor
-   $R_f$ is the feedback resistor
-   $R_i$ is the input resistor

#### Differential Amplifier Output

$V_{out} = A_d (V_{in+} - V_{in-}) + A_c \left(\frac{V_{in+} + V_{in-}}{2}\right)$

where:

-   $V_{out}$ is the output voltage
-   $A_d$ is the differential gain
-   $A_c$ is the common-mode gain
-   $V_{in+}$ and $V_{in-}$ are the input voltages

#### Voltage Gain of a Differential Amplifier

$A_v = \frac{V_{out}}{V_{in+} - V_{in-}}}$

where:

-   $A_v$ is the voltage gain
-   $V_{out}$ is the output voltage
-   $V_{in+}$ and $V_{in-}$ are the input voltages

#### Cascaded Amplifier Gain

$A_{total} = A_1 \cdot A_2 \cdot \dots \cdot A_n$

where:

-   $A_{total}$ is the total gain
-   $A_1, A_2, \dots, A_n$ are the individual stage gains

#### Power Delivered to a Load

$P_L = \frac{V_L^2}{R_L}$

where:

-   $P_L$ is the power delivered to the load
-   $V_L$ is the voltage across the load
-   $R_L$ is the load resistance

#### Transfer Function of a RLC Circuit

$H(s) = \frac{V_{out}(s)}{V_{in}(s)} = \frac{1}{LC s^2 + RC s + 1}$

where:

-   $H(s)$ is the transfer function
-   $V_{out}(s)$ is the output voltage in the Laplace domain
-   $V_{in}(s)$ is the input voltage in the Laplace domain
-   $L$ is the inductance
-   $C$ is the capacitance
-   $R$ is the resistance

#### Voltage Gain of a Non-Inverting Amplifier

$A_v = 1 + \frac{R_f}{R_i}$

where:

-   $A_v$ is the voltage gain
-   $R_f$ is the feedback resistor
-   $R_i$ is the input resistor

#### Voltage Gain of an Inverting Amplifier

$A_v = -\frac{R_f}{R_i}$

where:

-   $A_v$ is the voltage gain
-   $R_f$ is the feedback resistor
-   $R_i$ is the input resistor

#### Common-Mode Gain of an Operational Amplifier

$A_c = \frac{V_{out}}{\frac{V_{in+} + V_{in-}}{2}}$

where:

-   $A_c$ is the common-mode gain
-   $V_{out}$ is the output voltage
-   $V_{in+}$ and $V_{in-}$ are the input voltages

#### Differential Mode Gain of an Operational Amplifier

$A_d = \frac{V_{out}}{V_{in+} - V_{in-}}}$

where:

-   $A_d$ is the differential mode gain
-   $V_{out}$ is the output voltage
-   $V_{in+}$ and $V_{in-}$ are the input voltages

#### Phase Margin

$\text{Phase Margin} = 180^\circ + \angle H(j\omega_{gc})$

where:

-   $\text{Phase Margin}$ is the additional phase needed for stability
-   $\angle H(j\omega_{gc})$ is the phase angle at the gain crossover frequency

#### Gain Margin

$\text{Gain Margin} = \frac{1}{|H(j\omega_{pc})|}$

where:

-   $\text{Gain Margin}$ is the additional gain before instability
-   $|H(j\omega_{pc})|$ is the magnitude of the transfer function at the phase crossover frequency

#### Root Locus Equation

$1 + A \beta = 0$

where:

-   $A$ is the open-loop gain
-   $\beta$ is the feedback factor

#### Nyquist Stability Criterion

$\text{Number of encirclements of -1} = \text{Number of right-half-plane poles}$

where:

-   Encirclements are determined by the Nyquist plot
-   Right-half-plane poles affect stability

#### Bode Gain Equation

$20 \log_{10}(A_v) = 20 \log_{10}\left(\frac{V_{out}}{V_{in}}\right)$

where:

-   $A_v$ is the voltage gain
-   $V_{out}$ is the output voltage
-   $V_{in}$ is the input voltage

#### Differential Pair Current Equation

$I = \frac{V_{CC} - V_{BE}}{R_E}$

where:

-   $I$ is the current through the differential pair
-   $V_{CC}$ is the supply voltage
-   $V_{BE}$ is the base-emitter voltage
-   $R_E$ is the emitter resistor

#### Common-Mode Input Voltage Range

$V_{CM} = \frac{V_{in+} + V_{in-}}{2}$

where:

-   $V_{CM}$ is the common-mode input voltage
-   $V_{in+}$ and $V_{in-}$ are the input voltages

#### Differential Input Voltage

$V_{diff} = V_{in+} - V_{in-}$

where:

-   $V_{diff}$ is the differential input voltage
-   $V_{in+}$ and $V_{in-}$ are the input voltages

#### Voltage Swing

$V_{swing} = V_{out(max)} - V_{out(min)}$

where:

-   $V_{swing}$ is the voltage swing
-   $V_{out(max)}$ is the maximum output voltage
-   $V_{out(min)}$ is the minimum output voltage

#### Thermal Noise Voltage

$e_n = \sqrt{4kTR\Delta f}$

where:

-   $e_n$ is the thermal noise voltage
-   $k$ is Boltzmann's constant
-   $T$ is the absolute temperature
-   $R$ is the resistance
-   $\Delta f$ is the bandwidth

#### Shot Noise Current

$i_n = \sqrt{2qI\Delta f}$

where:

-   $i_n$ is the shot noise current
-   $q$ is the elementary charge
-   $I$ is the current
-   $\Delta f$ is the bandwidth

#### Flicker Noise (1/f Noise)

$S_v(f) = \frac{K}{f}$

where:

-   $S_v(f)$ is the flicker noise spectral density
-   $K$ is a constant
-   $f$ is the frequency

#### Thermal Voltage

$V_T = \frac{kT}{q}$

where:

-   $V_T$ is the thermal voltage
-   $k$ is Boltzmann's constant
-   $T$ is the absolute temperature
-   $q$ is the elementary charge

#### Bandwidth of a Differential Amplifier

$BW = \frac{GBW}{A_d}$

where:

-   $BW$ is the bandwidth
-   $GBW$ is the gain-bandwidth product
-   $A_d$ is the differential gain

#### Noise Figure of an Amplifier

$NF = 10 \log_{10}\left(\frac{\text{SNR}*{in}}{\text{SNR}*{out}}\right)$

where:

-   $NF$ is the noise figure
-   $\text{SNR}_{in}$ is the input signal-to-noise ratio
-   $\text{SNR}_{out}$ is the output signal-to-noise ratio

#### Common-Mode Rejection Ratio (CMRR) in dB

$\text{CMRR}*{dB} = 20 \log*{10}\left(\frac{A_d}{A_c}\right)$

where:

-   $\text{CMRR}_{dB}$ is the common-mode rejection ratio in decibels
-   $A_d$ is the differential gain
-   $A_c$ is the common-mode gain

#### Common-Mode Gain in Terms of CMRR

$A_c = \frac{A_d}{\text{CMRR}}$

where:

-   $A_c$ is the common-mode gain
-   $A_d$ is the differential gain
-   $\text{CMRR}$ is the common-mode rejection ratio

#### Signal Gain with Feedback

$A_{feedback} = \frac{A}{1 + A\beta}$

where:

-   $A_{feedback}$ is the gain with feedback
-   $A$ is the open-loop gain
-   $\beta$ is the feedback factor

#### Loop Gain

$T = A \beta$

where:

-   $T$ is the loop gain
-   $A$ is the open-loop gain
-   $\beta$ is the feedback factor

#### Stability Factor (K)

$K = \frac{1 + \beta A}{1 - \beta A}$

where:

-   $K$ is the stability factor
-   $\beta$ is the feedback factor
-   $A$ is the open-loop gain

#### Nyquist Criterion for Stability

$\text{System is stable if the Nyquist plot does not encircle the -1 point}$

where:

-   Stability is determined by the Nyquist plot
-   The -1 point is the critical point

#### Pole-Zero Cancellation

$H(s) = \frac{(s - z_1)(s - z_2)}{(s - p_1)(s - p_2)}$

where:

-   $H(s)$ is the transfer function
-   $z_1, z_2$ are zeros
-   $p_1, p_2$ are poles

#### Bode Plot Phase Equation

$\phi(\omega) = \angle H(j\omega)$

where:

-   $\phi(\omega)$ is the phase angle
-   $H(j\omega)$ is the transfer function

#### Bode Plot Magnitude Equation

$|H(j\omega)| = 20 \log_{10}\left(\frac{V_{out}}{V_{in}}\right)$

where:

-   $|H(j\omega)|$ is the magnitude of the transfer function
-   $V_{out}$ is the output voltage
-   $V_{in}$ is the input voltage

#### Euler's Formula for Phasors

$V = V_m e^{j\theta}$

where:

-   $V$ is the phasor voltage
-   $V_m$ is the magnitude
-   $\theta$ is the phase angle
-   $j$ is the imaginary unit

#### Resonant Frequency of an RLC Circuit

$f_0 = \frac{1}{2\pi\sqrt{LC}}$

where:

-   $f_0$ is the resonant frequency
-   $L$ is the inductance
-   $C$ is the capacitance

#### Damping Factor

$\zeta = \frac{R}{2} \sqrt{\frac{C}{L}}$

where:

-   $\zeta$ is the damping factor
-   $R$ is the resistance
-   $C$ is the capacitance
-   $L$ is the inductance

#### Natural Frequency

$\omega_n = \sqrt{\frac{1}{LC}}$

where:

-   $\omega_n$ is the natural angular frequency
-   $L$ is the inductance
-   $C$ is the capacitance

#### Damped Frequency

$\omega_d = \omega_n \sqrt{1 - \zeta^2}$

where:

-   $\omega_d$ is the damped angular frequency
-   $\omega_n$ is the natural angular frequency
-   $\zeta$ is the damping factor

#### Transfer Function of a Second-Order System

$H(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$

where:

-   $H(s)$ is the transfer function
-   $\omega_n$ is the natural angular frequency
-   $\zeta$ is the damping factor
-   $s$ is the complex frequency variable

#### Voltage Gain of a Cascode Amplifier

$A_v = -g_m R_C$

where:

-   $A_v$ is the voltage gain
-   $g_m$ is the transconductance
-   $R_C$ is the collector resistor

#### Common-Mode Rejection Ratio (CMRR) in Terms of Differential and Common-Mode Gain

$\text{CMRR} = \frac{A_d}{A_c}$

where:

-   $\text{CMRR}$ is the common-mode rejection ratio
-   $A_d$ is the differential gain
-   $A_c$ is the common-mode gain

#### Total Harmonic Distortion (THD) in Terms of Harmonics

$\text{THD} = \frac{\sqrt{V_2^2 + V_3^2 + \dots + V_n^2}}{V_1}$

where:

-   $\text{THD}$ is the total harmonic distortion
-   $V_1$ is the fundamental voltage
-   $V_2, V_3, \dots, V_n$ are the harmonic voltages

#### Noise Figure in Decibels

$NF_{dB} = 10 \log_{10}(NF)$

where:

-   $NF_{dB}$ is the noise figure in decibels
-   $NF$ is the noise figure

#### Thermal Noise Power

$P_n = kTB$

where:

-   $P_n$ is the thermal noise power
-   $k$ is Boltzmann's constant
-   $T$ is the absolute temperature
-   $B$ is the bandwidth

#### Johnson-Nyquist Noise Voltage

$e_n = \sqrt{4kTRB}$

where:

-   $e_n$ is the Johnson-Nyquist noise voltage
-   $k$ is Boltzmann's constant
-   $T$ is the absolute temperature
-   $R$ is the resistance
-   $B$ is the bandwidth

#### Avalanche Noise Factor

$F = \frac{SNR_{in}}{SNR_{out}}$

where:

-   $F$ is the avalanche noise factor
-   $SNR_{in}$ is the input signal-to-noise ratio
-   $SNR_{out}$ is the output signal-to-noise ratio

#### Shot Noise Spectral Density

$S_i = 2qI$

where:

-   $S_i$ is the shot noise spectral density
-   $q$ is the elementary charge
-   $I$ is the current

#### Flicker Noise Spectral Density

$S_v = \frac{K}{f}$

where:

-   $S_v$ is the flicker noise spectral density
-   $K$ is a constant
-   $f$ is the frequency

#### Equivalent Noise Resistance

$R_n = \frac{e_n^2}{4kTB}$

where:

-   $R_n$ is the equivalent noise resistance
-   $e_n$ is the noise voltage
-   $k$ is Boltzmann's constant
-   $T$ is the absolute temperature
-   $B$ is the bandwidth

#### Signal-to-Noise Ratio (SNR) in Decibels

$\text{SNR}*{dB} = 10 \log*{10}\left(\frac{P_{signal}}{P_{noise}}\right)$

where:

-   $\text{SNR}_{dB}$ is the signal-to-noise ratio in decibels
-   $P_{signal}$ is the signal power
-   $P_{noise}$ is the noise power

#### Noise Figure in Terms of Noise Factors

$NF = F \cdot G$

where:

-   $NF$ is the noise figure
-   $F$ is the noise factor of a component
-   $G$ is the gain of the component

#### Cascade Noise Formula

$NF_{total} = NF_1 + \frac{NF_2 - 1}{G_1} + \frac{NF_3 - 1}{G_1 G_2} + \dots$

where:

-   $NF_{total}$ is the total noise figure
-   $NF_1, NF_2, \dots$ are the noise figures of individual stages
-   $G_1, G_2, \dots$ are the gains of individual stages

#### Noise Figure of a Two-Stage Amplifier

$NF_{total} = NF_1 + \frac{NF_2 - 1}{G_1}$

where:

-   $NF_{total}$ is the total noise figure
-   $NF_1$ is the noise figure of the first stage
-   $NF_2$ is the noise figure of the second stage
-   $G_1$ is the gain of the first stage

#### Friis Formula for Noise

$NF_{total} = NF_1 + \frac{NF_2 - 1}{G_1} + \frac{NF_3 - 1}{G_1 G_2} + \dots$

where:

-   $NF_{total}$ is the total noise figure
-   $NF_1, NF_2, \dots$ are the noise figures of individual stages
-   $G_1, G_2, \dots$ are the gains of individual stages

#### Power Gain with Noise

$G_p = \frac{P_{out}}{P_{in}}$

where:

-   $G_p$ is the power gain
-   $P_{out}$ is the output power
-   $P_{in}$ is the input power

#### Voltage Gain with Noise

$A_v = \frac{V_{out}}{V_{in}}$

where:

-   $A_v$ is the voltage gain
-   $V_{out}$ is the output voltage
-   $V_{in}$ is the input voltage

#### Current Gain with Noise

$A_i = \frac{I_{out}}{I_{in}}$

where:

-   $A_i$ is the current gain
-   $I_{out}$ is the output current
-   $I_{in}$ is the input current

#### Feedback Factor in Terms of Resistors

$\beta = \frac{R_1}{R_1 + R_2}$

where:

-   $\beta$ is the feedback factor
-   $R_1$ and $R_2$ are resistors in the feedback network

#### Phase Shift in an RC Circuit

$\phi = \tan^{-1}\left(-\frac{1}{\omega RC}\right)$

where:

-   $\phi$ is the phase shift
-   $\omega$ is the angular frequency
-   $R$ is the resistance
-   $C$ is the capacitance

#### Phase Shift in an RL Circuit

$\phi = \tan^{-1}(\omega L / R)$

where:

-   $\phi$ is the phase shift
-   $\omega$ is the angular frequency
-   $L$ is the inductance
-   $R$ is the resistance

#### Total Phase Shift in a Series RLC Circuit

$\phi = \tan^{-1}\left(\frac{\omega L - 1/\omega C}{R}\right)$

where:

-   $\phi$ is the total phase shift
-   $\omega$ is the angular frequency
-   $L$ is the inductance
-   $C$ is the capacitance
-   $R$ is the resistance

#### Voltage Gain of a Differential Amplifier with Feedback

$A_v = \frac{A_d}{1 + A_d \beta}$

where:

-   $A_v$ is the voltage gain with feedback
-   $A_d$ is the differential gain
-   $\beta$ is the feedback factor

#### Common-Mode Gain with Feedback

$A_{c,feedback} = \frac{A_c}{1 + A_d \beta}$

where:

-   $A_{c,feedback}$ is the common-mode gain with feedback
-   $A_c$ is the common-mode gain
-   $A_d$ is the differential gain
-   $\beta$ is the feedback factor

#### Loop Gain for Stability

$T = A \beta$

where:

-   $T$ is the loop gain
-   $A$ is the open-loop gain
-   $\beta$ is the feedback factor

#### Gain-Bandwidth Product (GBW)

$GBW = A_v \cdot f_{3dB}$

where:

-   $GBW$ is the gain-bandwidth product
-   $A_v$ is the voltage gain
-   $f_{3dB}$ is the -3 dB bandwidth frequency

#### Slew Rate Limitation in Amplifiers

$\text{Slew Rate} = \frac{dV_{out}}{dt} \leq \text{Max Slew Rate}$

where:

-   $\text{Slew Rate}$ is the rate of change of the output voltage
-   $\frac{dV_{out}}{dt}$ is the derivative of output voltage with respect to time

#### Clipping in Amplifiers

$V_{out} = V_{saturation}$

where:

-   $V_{out}$ is the output voltage
-   $V_{saturation}$ is the saturation voltage of the amplifier

#### Distortion Factor

$\text{Distortion} = \frac{V_{out,distorted} - V_{out,ideal}}{V_{out,ideal}}$

where:

-   $\text{Distortion}$ is the distortion factor
-   $V_{out,distorted}$ is the distorted output voltage
-   $V_{out,ideal}$ is the ideal output voltage

#### Load Line Analysis

$V = V_{CC} - I R$

where:

-   $V$ is the voltage across the load
-   $V_{CC}$ is the supply voltage
-   $I$ is the current through the load
-   $R$ is the resistance

#### Q Factor of a Resonant Circuit

$Q = \frac{\omega_0 L}{R}$

where:

-   $Q$ is the quality factor
-   $\omega_0$ is the resonant angular frequency
-   $L$ is the inductance
-   $R$ is the resistance

#### Bandwidth of a Resonant Circuit

$BW = \frac{\omega_0}{Q}$

where:

-   $BW$ is the bandwidth
-   $\omega_0$ is the resonant angular frequency
-   $Q$ is the quality factor

#### Transimpedance Gain

$Z_t = \frac{V_{out}}{I_{in}}$

where:

-   $Z_t$ is the transimpedance gain
-   $V_{out}$ is the output voltage
-   $I_{in}$ is the input current

#### Transadmittance

$Y_t = \frac{I_{out}}{V_{in}}$

where:

-   $Y_t$ is the transadmittance
-   $I_{out}$ is the output current
-   $V_{in}$ is the input voltage

#### Voltage Transfer Characteristic

$V_{out} = f(V_{in})$

where:

-   $V_{out}$ is the output voltage
-   $V_{in}$ is the input voltage
-   $f$ is the transfer function

#### Current Transfer Characteristic

$I_{out} = f(I_{in})$

where:

-   $I_{out}$ is the output current
-   $I_{in}$ is the input current
-   $f$ is the transfer function

#### Hysteresis in Amplifiers

$V_{out} = \begin{cases} V_{high} & \text{if } V_{in} > V_{th} \ V_{low} & \text{if } V_{in} < V_{tl} \end{cases}$

where:

-   $V_{out}$ is the output voltage
-   $V_{high}$ and $V_{low}$ are the high and low output levels
-   $V_{th}$ and $V_{tl}$ are the upper and lower threshold voltages

#### Schmitt Trigger Transfer Function

$V_{out} = \begin{cases} V_{high} & \text{if } V_{in} > V_{th} \ V_{low} & \text{if } V_{in} < V_{tl} \end{cases}$

where:

-   $V_{out}$ is the output voltage
-   $V_{high}$ and $V_{low}$ are the high and low output levels
-   $V_{th}$ and $V_{tl}$ are the upper and lower threshold voltages

#### Transfer Function of an Op-Amp Inverter

$H(s) = -\frac{R_f}{R_{in}}$

where:

-   $H(s)$ is the transfer function
-   $R_f$ is the feedback resistor
-   $R_{in}$ is the input resistor

#### Transfer Function of an Op-Amp Non-Inverter

$H(s) = 1 + \frac{R_f}{R_{in}}$

where:

-   $H(s)$ is the transfer function
-   $R_f$ is the feedback resistor
-   $R_{in}$ is the input resistor

#### Common-Mode Gain Reduction with Feedback

$A_{c,feedback} = \frac{A_c}{1 + A_d \beta}$

where:

-   $A_{c,feedback}$ is the common-mode gain with feedback
-   $A_c$ is the original common-mode gain
-   $A_d$ is the differential gain
-   $\beta$ is the feedback factor

#### Differential Gain Reduction with Feedback

$A_{d,feedback} = \frac{A_d}{1 + A_d \beta}$

where:

-   $A_{d,feedback}$ is the differential gain with feedback
-   $A_d$ is the original differential gain
-   $\beta$ is the feedback factor

#### Phase Shift in a Feedback Network

$\phi = \angle(1 + A\beta)$

where:

-   $\phi$ is the phase shift
-   $A$ is the open-loop gain
-   $\beta$ is the feedback factor

#### Stability in Feedback Systems

$\text{System is stable if } 1 + A\beta \neq 0 \text{ for all frequencies}$

where:

-   $A$ is the open-loop gain
-   $\beta$ is the feedback factor

#### Loop Gain and Stability

$T = A\beta$

where:

-   $T$ is the loop gain
-   $A$ is the open-loop gain
-   $\beta$ is the feedback factor

#### Feedback Factor in a Voltage Divider

$\beta = \frac{R_2}{R_1 + R_2}$

where:

-   $\beta$ is the feedback factor
-   $R_1$ and $R_2$ are resistors in the voltage divider

#### Feedback Factor in a Current Divider

$\beta = \frac{R_1}{R_1 + R_2}$

where:

-   $\beta$ is the feedback factor
-   $R_1$ and $R_2$ are resistors in the current divider

#### Closed-Loop Bandwidth

$BW_{closed} = \frac{GBW}{A_{closed}}$

where:

-   $BW_{closed}$ is the closed-loop bandwidth
-   $GBW$ is the gain-bandwidth product
-   $A_{closed}$ is the closed-loop gain

#### Unity Gain Bandwidth

$f_{unity} = GBW$

where:

-   $f_{unity}$ is the unity gain bandwidth
-   $GBW$ is the gain-bandwidth product

#### Phase Margin Definition

$\text{Phase Margin} = 180^\circ + \angle H(j\omega_{gc})$

where:

-   $\text{Phase Margin}$ is the phase margin
-   $\angle H(j\omega_{gc})$ is the phase angle at the gain crossover frequency

#### Gain Margin Definition

$\text{Gain Margin} = \frac{1}{|H(j\omega_{pc})|}$

where:

-   $\text{Gain Margin}$ is the gain margin
-   $|H(j\omega_{pc})|$ is the magnitude of the transfer function at the phase crossover frequency

#### Nyquist Plot Encirclements

$\text{Number of encirclements} = P - N$

where:

-   $P$ is the number of poles in the right half-plane
-   $N$ is the number of encirclements of the -1 point

#### Root Locus on Real Axis

$\text{Segments on the real axis are to the left of an odd number of poles and zeros}$

where:

-   Real axis segments are determined by the number of poles and zeros to their right

#### Transfer Function of an Inverting Amplifier

$H(s) = -\frac{R_f}{R_{in}}$

where:

-   $H(s)$ is the transfer function
-   $R_f$ is the feedback resistor
-   $R_{in}$ is the input resistor

#### Transfer Function of a Non-Inverting Amplifier

$H(s) = 1 + \frac{R_f}{R_{in}}$

where:

-   $H(s)$ is the transfer function
-   $R_f$ is the feedback resistor
-   $R_{in}$ is the input resistor

#### Voltage Gain of a Common-Collector Amplifier

$A_v \approx 1$

where:

-   $A_v$ is the voltage gain
-   Common-collector amplifiers have a voltage gain close to 1

#### Voltage Gain of a Common-Base Amplifier

$A_v \approx \frac{R_C}{r_e}$

where:

-   $A_v$ is the voltage gain
-   $R_C$ is the collector resistor
-   $r_e$ is the emitter resistance

#### Power Gain of a Common-Emitter Amplifier

$A_p = A_v \cdot A_i$

where:

-   $A_p$ is the power gain
-   $A_v$ is the voltage gain
-   $A_i$ is the current gain

#### Power Gain of a Common-Collector Amplifier

$A_p \approx \beta$

where:

-   $A_p$ is the power gain
-   $\beta$ is the current gain

#### Miller Effect in Feedback Amplifiers

$C_M = C(1 - A_v)$

where:

-   $C_M$ is the Miller capacitance
-   $C$ is the original capacitance
-   $A_v$ is the voltage gain

#### Voltage Gain with Miller Capacitance

$A_v = \frac{1}{1 + j\omega C_M R}$

where:

-   $A_v$ is the voltage gain
-   $\omega$ is the angular frequency
-   $C_M$ is the Miller capacitance
-   $R$ is the resistance

#### Differential Amplifier Common-Mode Gain Reduction

$A_{c,feedback} = \frac{A_c}{1 + A_d \beta}$

where:

-   $A_{c,feedback}$ is the common-mode gain with feedback
-   $A_c$ is the common-mode gain
-   $A_d$ is the differential gain
-   $\beta$ is the feedback factor

#### Voltage Gain of a Differential Amplifier with Feedback

$A_{v} = \frac{A_d}{1 + A_d \beta}$

where:

-   $A_{v}$ is the voltage gain with feedback
-   $A_d$ is the differential gain
-   $\beta$ is the feedback factor

#### Output Impedance with Feedback

$Z_{out,feedback} = \frac{Z_{out}}{1 + A\beta}$

where:

-   $Z_{out,feedback}$ is the output impedance with feedback
-   $Z_{out}$ is the original output impedance
-   $A$ is the open-loop gain
-   $\beta$ is the feedback factor

#### Input Impedance with Feedback

$Z_{in,feedback} = Z_{in} \cdot (1 + A\beta)$

where:

-   $Z_{in,feedback}$ is the input impedance with feedback
-   $Z_{in}$ is the original input impedance
-   $A$ is the open-loop gain
-   $\beta$ is the feedback factor

#### Total Harmonic Distortion (THD) in dB

$\text{THD}*{dB} = 20 \log*{10}\left(\frac{V_{total,harmonics}}{V_1}\right)$

where:

-   $\text{THD}_{dB}$ is the total harmonic distortion in decibels
-   $V_{total,harmonics}$ is the total voltage of harmonics
-   $V_1$ is the fundamental voltage

#### Signal Integrity in High-Frequency Circuits

$|H(j\omega)| = \frac{V_{out}}{V_{in}}$

where:

-   $|H(j\omega)|$ is the magnitude of the transfer function
-   $V_{out}$ is the output voltage
-   $V_{in}$ is the input voltage

#### Reflection Coefficient

$\Gamma = \frac{Z_L - Z_0}{Z_L + Z_0}$

where:

-   $\Gamma$ is the reflection coefficient
-   $Z_L$ is the load impedance
-   $Z_0$ is the characteristic impedance

#### Standing Wave Ratio (SWR)

$SWR = \frac{1 + |\Gamma|}{1 - |\Gamma|}$

where:

-   $SWR$ is the standing wave ratio
-   $\Gamma$ is the reflection coefficient

#### Impedance Matching Condition

$Z_L = Z_0^\*$

where:

-   $Z_L$ is the load impedance
-   $Z_0^\*$ is the complex conjugate of the characteristic impedance

#### Power Delivered to a Matched Load

$P_L = \frac{|V_{in}|^2}{4 Z_0}$

where:

-   $P_L$ is the power delivered to the load
-   $V_{in}$ is the input voltage
-   $Z_0$ is the characteristic impedance

#### Transmission Line Voltage Equation

$V(z) = V^+ e^{-j\beta z} + V^- e^{j\beta z}$

where:

-   $V(z)$ is the voltage at position $z$
-   $V^+$ is the forward traveling voltage wave
-   $V^-$ is the backward traveling voltage wave
-   $\beta$ is the phase constant
-   $z$ is the position along the transmission line

#### Transmission Line Current Equation

$I(z) = \frac{V^+}{Z_0} e^{-j\beta z} - \frac{V^-}{Z_0} e^{j\beta z}$

where:

-   $I(z)$ is the current at position $z$
-   $V^+$ is the forward traveling voltage wave
-   $V^-$ is the backward traveling voltage wave
-   $Z_0$ is the characteristic impedance
-   $\beta$ is the phase constant
-   $z$ is the position along the transmission line

#### Characteristic Impedance of a Transmission Line

$Z_0 = \sqrt{\frac{R + j\omega L}{G + j\omega C}}$

where:

-   $Z_0$ is the characteristic impedance
-   $R$ is the resistance per unit length
-   $L$ is the inductance per unit length
-   $G$ is the conductance per unit length
-   $C$ is the capacitance per unit length
-   $\omega$ is the angular frequency

#### Propagation Constant

$\gamma = \alpha + j\beta = \sqrt{(R + j\omega L)(G + j\omega C)}$

where:

-   $\gamma$ is the propagation constant
-   $\alpha$ is the attenuation constant
-   $\beta$ is the phase constant
-   $R$, $L$, $G$, $C$ are transmission line parameters
-   $\omega$ is the angular frequency

#### Attenuation Constant

$\alpha = \text{Re}(\gamma)$

where:

-   $\alpha$ is the attenuation constant
-   $\gamma$ is the propagation constant

#### Phase Constant

$\beta = \text{Im}(\gamma)$

where:

-   $\beta$ is the phase constant
-   $\gamma$ is the propagation constant

#### Voltage Reflection Coefficient

$\Gamma_V = \frac{V^-}{V^+}$

where:

-   $\Gamma_V$ is the voltage reflection coefficient
-   $V^+$ is the forward traveling voltage wave
-   $V^-$ is the backward traveling voltage wave

#### Current Reflection Coefficient

$\Gamma_I = \frac{I^-}{I^+}$

where:

-   $\Gamma_I$ is the current reflection coefficient
-   $I^+$ is the forward traveling current wave
-   $I^-$ is the backward traveling current wave

#### Power Reflection Coefficient

$\Gamma_P = |\Gamma_V|^2$

where:

-   $\Gamma_P$ is the power reflection coefficient
-   $\Gamma_V$ is the voltage reflection coefficient

#### Minimum SWR

$\text{SWR}_{min} = 1$

where:

-   $\text{SWR}_{min}$ is the minimum standing wave ratio

#### Maximum SWR

$\text{SWR}_{max} = \infty$

where:

-   $\text{SWR}_{max}$ is the maximum standing wave ratio

#### Voltage Standing Wave Ratio (VSWR)

$\text{VSWR} = \frac{1 + |\Gamma|}{1 - |\Gamma|}$

where:

-   $\text{VSWR}$ is the voltage standing wave ratio
-   $\Gamma$ is the reflection coefficient

#### Power Transfer in Transmission Lines

$P = \frac{|V^+|^2}{2 Z_0} (1 - |\Gamma|^2)$

where:

-   $P$ is the power transferred
-   $V^+$ is the forward traveling voltage wave
-   $Z_0$ is the characteristic impedance
-   $\Gamma$ is the reflection coefficient

#### Propagation Delay

$\tau = \frac{l}{v_p}$

where:

-   $\tau$ is the propagation delay
-   $l$ is the length of the transmission line
-   $v_p$ is the phase velocity

#### Phase Velocity

$v_p = \frac{\omega}{\beta}$

where:

-   $v_p$ is the phase velocity
-   $\omega$ is the angular frequency
-   $\beta$ is the phase constant

#### Group Velocity

$v_g = \frac{d\omega}{d\beta}$

where:

-   $v_g$ is the group velocity
-   $\omega$ is the angular frequency
-   $\beta$ is the phase constant

#### Velocity Factor

$VF = \frac{v_p}{c}$

where:

-   $VF$ is the velocity factor
-   $v_p$ is the phase velocity
-   $c$ is the speed of light

#### Electrical Length of a Transmission Line

$\theta = \beta l$

where:

-   $\theta$ is the electrical length
-   $\beta$ is the phase constant
-   $l$ is the physical length of the transmission line

#### Reflection Loss

$\text{Reflection Loss} = -20 \log_{10}(|\Gamma|)$

where:

-   $\text{Reflection Loss}$ is the loss due to reflections
-   $\Gamma$ is the reflection coefficient

#### Transmission Line Attenuation

$A = e^{-\alpha l}$

where:

-   $A$ is the attenuation
-   $\alpha$ is the attenuation constant
-   $l$ is the length of the transmission line

#### Total Transmission Line Loss

$P_{out} = P_{in} e^{-2\alpha l}$

where:

-   $P_{out}$ is the output power
-   $P_{in}$ is the input power
-   $\alpha$ is the attenuation constant
-   $l$ is the length of the transmission line

#### Reflection Coefficient Magnitude

$|\Gamma| = \sqrt{(\text{Re}(\Gamma))^2 + (\text{Im}(\Gamma))^2}$

where:

-   $|\Gamma|$ is the magnitude of the reflection coefficient
-   $\text{Re}(\Gamma)$ and $\text{Im}(\Gamma)$ are the real and imaginary parts of $\Gamma$

#### Transmission Coefficient

$T = 1 + \Gamma$

where:

-   $T$ is the transmission coefficient
-   $\Gamma$ is the reflection coefficient

#### Impedance Matching for Maximum Power Transfer

$Z_L = Z_0^\*$

where:

-   $Z_L$ is the load impedance
-   $Z_0^\*$ is the complex conjugate of the characteristic impedance

#### Power Delivered to a Matched Load

$P_L = \frac{|V_{in}|^2}{8 R_0}$

where:

-   $P_L$ is the power delivered to the load
-   $V_{in}$ is the input voltage
-   $R_0$ is the characteristic impedance

#### Transmission Line Voltage Standing Wave Ratio (VSWR)

$\text{VSWR} = \frac{V_{max}}{V_{min}}$

where:

-   $\text{VSWR}$ is the voltage standing wave ratio
-   $V_{max}$ is the maximum voltage on the line
-   $V_{min}$ is the minimum voltage on the line

#### Transmission Line Current Standing Wave Ratio (ISWR)

$\text{ISWR} = \frac{I_{max}}{I_{min}}$

where:

-   $\text{ISWR}$ is the current standing wave ratio
-   $I_{max}$ is the maximum current on the line
-   $I_{min}$ is the minimum current on the line

#### Characteristic Impedance of a Coaxial Cable

$Z_0 = \frac{1}{2\pi} \sqrt{\frac{\mu}{\epsilon}} \ln{\frac{b}{a}}$

where:

-   $Z_0$ is the characteristic impedance
-   $\mu$ is the permeability of the dielectric
-   $\epsilon$ is the permittivity of the dielectric
-   $a$ is the radius of the inner conductor
-   $b$ is the inner radius of the outer conductor

#### Return Loss

$\text{Return Loss} = -20 \log_{10}(|\Gamma|)$

where:

-   $\text{Return Loss}$ is the loss due to reflections
-   $\Gamma$ is the reflection coefficient

#### Transmission Line Differential Equations

$\frac{dV}{dz} = -Z_0 I$

$\frac{dI}{dz} = -Y_0 V$

where:

-   $V$ is the voltage
-   $I$ is the current
-   $Z_0$ is the characteristic impedance
-   $Y_0$ is the admittance
-   $z$ is the position along the transmission line

#### Voltage and Current Relations on a Lossless Transmission Line

$V(z) = V^+ e^{-j\beta z} + V^- e^{j\beta z}$

$I(z) = \frac{V^+}{Z_0} e^{-j\beta z} - \frac{V^-}{Z_0} e^{j\beta z}$

where:

-   $V(z)$ is the voltage at position $z$
-   $I(z)$ is the current at position $z$
-   $V^+$ and $V^-$ are the forward and backward traveling voltage waves
-   $Z_0$ is the characteristic impedance
-   $\beta$ is the phase constant
-   $z$ is the position along the transmission line

#### Wave Impedance

$Z_w = \frac{V}{I}$

where:

-   $Z_w$ is the wave impedance
-   $V$ is the voltage
-   $I$ is the current

#### Power on a Transmission Line

$P(z) = V(z) \cdot I(z)$

where:

-   $P(z)$ is the power at position $z$
-   $V(z)$ is the voltage at position $z$
-   $I(z)$ is the current at position $z$

#### Maximum Power Transfer in AC Circuits

$R_L = \sqrt{R_{th}^2 + (X_{th})^2}$

where:

-   $R_L$ is the load resistance
-   $R_{th}$ is the Thevenin resistance
-   $X_{th}$ is the Thevenin reactance

#### Reactive Power in AC Circuits

$Q = V \cdot I \cdot \sin{\phi}$

where:

-   $Q$ is the reactive power
-   $V$ is the voltage
-   $I$ is the current
-   $\phi$ is the phase angle between voltage and current

#### Apparent Power in AC Circuits

$S = V \cdot I$

where:

-   $S$ is the apparent power
-   $V$ is the voltage
-   $I$ is the current

#### Power Triangle Relationship

$S^2 = P^2 + Q^2$

where:

-   $S$ is the apparent power
-   $P$ is the real power
-   $Q$ is the reactive power

#### Power Factor

$\text{Power Factor} = \cos{\phi}$

where:

-   $\text{Power Factor}$ is the power factor
-   $\phi$ is the phase angle between voltage and current

#### Lagging and Leading Power Factor

$\text{Lagging: } \phi > 0^\circ$

$\text{Leading: } \phi < 0^\circ$

where:

-   $\phi$ is the phase angle between voltage and current

#### Complex Power in Phasor Form

$S = V \cdot I^\*$

where:

-   $S$ is the complex power
-   $V$ is the voltage phasor
-   $I^\*$ is the complex conjugate of the current phasor

#### Maximum Power Transfer Condition in AC Circuits

$Z_L = Z_{th}^\*$

where:

-   $Z_L$ is the load impedance
-   $Z_{th}^\*$ is the complex conjugate of the Thevenin impedance

#### Quality Factor in Resonant Circuits

$Q = \frac{\omega_0 L}{R}$

where:

-   $Q$ is the quality factor
-   $\omega_0$ is the resonant angular frequency
-   $L$ is the inductance
-   $R$ is the resistance

#### Bandwidth of a Resonant Circuit

$BW = \frac{\omega_0}{Q}$

where:

-   $BW$ is the bandwidth
-   $\omega_0$ is the resonant angular frequency
-   $Q$ is the quality factor

#### Frequency Response of a Low-Pass Filter

$H(j\omega) = \frac{1}{1 + j\omega RC}$

where:

-   $H(j\omega)$ is the transfer function
-   $\omega$ is the angular frequency
-   $R$ is the resistance
-   $C$ is the capacitance

#### Frequency Response of a High-Pass Filter

$H(j\omega) = \frac{j\omega RC}{1 + j\omega RC}$

where:

-   $H(j\omega)$ is the transfer function
-   $\omega$ is the angular frequency
-   $R$ is the resistance
-   $C$ is the capacitance

#### Gain-Bandwidth Product of an Op-Amp

$GBW = A_v \cdot f_{3dB}$

where:

-   $GBW$ is the gain-bandwidth product
-   $A_v$ is the voltage gain
-   $f_{3dB}$ is the -3 dB bandwidth frequency

#### Transfer Function of a First-Order System

$H(s) = \frac{1}{1 + sRC}$

where:

-   $H(s)$ is the transfer function
-   $s$ is the complex frequency variable
-   $R$ is the resistance
-   $C$ is the capacitance

#### Transfer Function of a Second-Order System

$H(s) = \frac{\omega_n^2}{s^2 + 2\zeta\omega_n s + \omega_n^2}$

where:

-   $H(s)$ is the transfer function
-   $\omega_n$ is the natural angular frequency
-   $\zeta$ is the damping factor
-   $s$ is the complex frequency variable

#### Frequency Response of a Band-Pass Filter

$H(j\omega) = \frac{j\omega RC}{1 + j\omega RC + (j\omega)^2 LC}$

where:

-   $H(j\omega)$ is the transfer function
-   $\omega$ is the angular frequency
-   $R$ is the resistance
-   $C$ is the capacitance
-   $L$ is the inductance

#### Frequency Response of a Band-Stop Filter

$H(j\omega) = \frac{1 + (j\omega)^2 LC}{1 + j\omega RC + (j\omega)^2 LC}$

where:

-   $H(j\omega)$ is the transfer function
-   $\omega$ is the angular frequency
-   $R$ is the resistance
-   $C$ is the capacitance
-   $L$ is the inductance

#### Transfer Function of an Operational Amplifier Integrator

$H(s) = -\frac{1}{sRC}$

where:

-   $H(s)$ is the transfer function
-   $s$ is the complex frequency variable
-   $R$ is the resistance
-   $C$ is the capacitance

#### Transfer Function of an Operational Amplifier Differentiator

$H(s) = -sRC$

where:

-   $H(s)$ is the transfer function
-   $s$ is