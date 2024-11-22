# Circut Formulas

## Prompt

```linenums="0"
Create a list of the 25 most commonly used
equations in an undergraduate circuits course
taught within a department of electrical engineering.

For each equation, return the following:

1. The name of the equation in markdown level 4.
2. Within the body, return the equation in LaTeX format
3. Surround the equation with dollar signs in front and in back
4. For each variable in the equation, add a "where:" that defines each variable
5. Put blank lines around the word "where:" and list of variables
6. Wrap the variables names in dollar signs

Here are two examples of the format I want.

#### Slope and Intercept
$y = m * x + b$

where:

- $y$ is the vertical axis
- $x$ is the horizontal axis
- $m$ is the slope
- $b$ is the intercept

#### Area of a Circle
$A = 2\pi r^2$

where:

- $A$ is the area of the circle
- $r$ is the radius
```

## ChatGPT o1-preview Response

Note I had to run the following regular expressions fixes.

- Replace "\\" with "\"
- Replace "\_" with "_"

[Link to Full List](./full.md)

#### Ohm's Law

$V = I R$

where:

-   $V$ is the voltage across the resistor
-   $I$ is the current through the resistor
-   $R$ is the resistance

#### Kirchhoff's Voltage Law (KVL)

$\sum_{k=1}^{n} V_k = 0$

where:

-   $V_k$ is the voltage across the $k$th element in the loop
-   $n$ is the number of elements in the loop

#### Kirchhoff's Current Law (KCL)

$\sum_{k=1}^{n} I_k = 0$

where:

-   $I_k$ is the current entering or leaving a node
-   $n$ is the number of branches connected to the node

#### Power Formula

$P = V I$

where:

-   $P$ is the power
-   $V$ is the voltage
-   $I$ is the current

#### Capacitor Current-Voltage Relationship

$I_C = C \dfrac{dV_C}{dt}$

where:

-   $I_C$ is the current through the capacitor
-   $C$ is the capacitance
-   $V_C$ is the voltage across the capacitor
-   $t$ is time

#### Inductor Voltage-Current Relationship

$V_L = L \dfrac{dI_L}{dt}$

where:

-   $V_L$ is the voltage across the inductor
-   $L$ is the inductance
-   $I_L$ is the current through the inductor
-   $t$ is time

#### Impedance of a Resistor

$Z_R = R$

where:

-   $Z_R$ is the impedance of the resistor
-   $R$ is the resistance

#### Impedance of a Capacitor

$Z_C = \dfrac{1}{j \omega C}$

where:

-   $Z_C$ is the impedance of the capacitor
-   $j$ is the imaginary unit ($j = \sqrt{-1}$)
-   $\omega$ is the angular frequency ($\omega = 2\pi f$)
-   $C$ is the capacitance
-   $f$ is the frequency

#### Impedance of an Inductor

$Z_L = j \omega L$

where:

-   $Z_L$ is the impedance of the inductor
-   $j$ is the imaginary unit ($j = \sqrt{-1}$)
-   $\omega$ is the angular frequency ($\omega = 2\pi f$)
-   $L$ is the inductance
-   $f$ is the frequency

#### Total Resistance in Series

$R_{\text{total}} = R_1 + R_2 + \dots + R_n$

where:

-   $R_{\text{total}}$ is the total resistance of resistors in series
-   $R_1, R_2, \dots, R_n$ are individual resistances
-   $n$ is the number of resistors

#### Total Resistance in Parallel

$\dfrac{1}{R_{\text{total}}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots + \dfrac{1}{R_n}$

where:

-   $R_{\text{total}}$ is the total resistance of resistors in parallel
-   $R_1, R_2, \dots, R_n$ are individual resistances
-   $n$ is the number of resistors

#### Time Constant of an RC Circuit

$\tau = R C$

where:

-   $\tau$ is the time constant
-   $R$ is the resistance
-   $C$ is the capacitance

#### Voltage Across a Charging Capacitor

$V_C(t) = V_s \left(1 - e^{-t/\tau}\right)$

where:

-   $V_C(t)$ is the voltage across the capacitor at time $t$
-   $V_s$ is the source voltage
-   $t$ is time
-   $\tau$ is the time constant ($\tau = R C$)
-   $e$ is Euler's number

#### Voltage Divider Rule

$V_{\text{out}} = V_{\text{in}} \left( \dfrac{R_2}{R_1 + R_2} \right)$

where:

-   $V_{\text{out}}$ is the output voltage across $R_2$
-   $V_{\text{in}}$ is the input voltage
-   $R_1$ and $R_2$ are resistors in series

#### Current Divider Rule

$I_1 = I_{\text{total}} \left( \dfrac{R_2}{R_1 + R_2} \right)$

where:

-   $I_1$ is the current through resistor $R_1$
-   $I_{\text{total}}$ is the total current entering the parallel network
-   $R_1$ is the resistance through which $I_1$ flows
-   $R_2$ is the other parallel resistance

#### RMS Value of a Sinusoidal Voltage

$V_{\text{RMS}} = \dfrac{V_{\text{peak}}}{\sqrt{2}}$

where:

-   $V_{\text{RMS}}$ is the root mean square voltage
-   $V_{\text{peak}}$ is the peak voltage

#### Resonant Frequency of an RLC Circuit

$f_0 = \dfrac{1}{2\pi \sqrt{L C}}$

where:

-   $f_0$ is the resonant frequency
-   $L$ is the inductance
-   $C$ is the capacitance

#### Complex Power

$S = V_{\text{RMS}} I_{\text{RMS}}^\* = P + j Q$

where:

-   $S$ is the complex power
-   $V_{\text{RMS}}$ is the RMS voltage
-   $I_{\text{RMS}}^\*$ is the complex conjugate of the RMS current
-   $P$ is the real power
-   $Q$ is the reactive power
-   $j$ is the imaginary unit ($j = \sqrt{-1}$)

#### Thevenin's Equivalent Voltage

$V_{\text{Th}} = V_{\text{oc}}$

where:

-   $V_{\text{Th}}$ is the Thevenin equivalent voltage
-   $V_{\text{oc}}$ is the open-circuit voltage across the terminals

#### Thevenin's Equivalent Resistance

$R_{\text{Th}} = \dfrac{V_{\text{Th}}}{I_{\text{sc}}}$

where:

-   $R_{\text{Th}}$ is the Thevenin equivalent resistance
-   $V_{\text{Th}}$ is the Thevenin equivalent voltage
-   $I_{\text{sc}}$ is the short-circuit current at the terminals

#### Norton's Equivalent Current

$I_{\text{No}} = I_{\text{sc}}$

where:

-   $I_{\text{No}}$ is the Norton equivalent current
-   $I_{\text{sc}}$ is the short-circuit current at the terminals

#### Laplace Transform of a Function

$F(s) = \int_0^\infty f(t) e^{-s t} dt$

where:

-   $F(s)$ is the Laplace transform of $f(t)$
-   $f(t)$ is a time-domain function
-   $s$ is the complex frequency variable

#### Relationship Between Frequency and Angular Frequency

$\omega = 2 \pi f$

where:

-   $\omega$ is the angular frequency
-   $f$ is the frequency

#### Transfer Function

$H(s) = \dfrac{Y(s)}{X(s)}$

where:

-   $H(s)$ is the transfer function
-   $Y(s)$ is the Laplace transform of the output
-   $X(s)$ is the Laplace transform of the input
-   $s$ is the complex frequency variable

#### Power in Terms of Resistance

$P = I^2 R$

where:

-   $P$ is the power
-   $I$ is the current
-   $R$ is the resistance

#### Maximum Power Transfer Theorem

$P_{\text{max}} = \dfrac{V_{\text{Th}}^2}{4 R_{\text{Th}}}$

where:

-   $P_{\text{max}}$ is the maximum power transferred to the load
-   $V_{\text{Th}}$ is the Thevenin equivalent voltage
-   $R_{\text{Th}}$ is the Thevenin equivalent resistance

#### Fourier Series Representation

$f(t) = a_0 + \sum_{n=1}^\infty \left\[ a_n \cos(n \omega_0 t) + b_n \sin(n \omega_0 t) \right\]$

where:

-   $f(t)$ is a periodic function
-   $a_0$ is the average (DC) component
-   $a_n$ and $b_n$ are Fourier coefficients
-   $\omega_0$ is the fundamental angular frequency