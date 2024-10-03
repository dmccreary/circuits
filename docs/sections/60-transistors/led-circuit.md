# LED Driver Circuit

## Prompt

```
Create a CircuiTikZ file of NPN 2N2222 transistor driving a LED.
Draw the black ground from (0,0) to (4,0) and label it "GND".
Draw the positive rail in red from (0,0) to (4,0) and label it "+5 volts".
Place V_in on the left at (0,1).
Place the NPN transistor at (2,1) and label it 2N2222.
Place the LED and a current limiting 220 ohm resistor vertical at x=2.85.
Use a base resistor of 10K between the V_in and the base of the transistor.
Use an LED limiting resistor of 220 ohms between the positive rail and the LED.
```

![LED Circuit](./led-circuitdiagram.png)

<!--
\begin{circuitikz}[american]

    % Draw the ground rail from (0,0) to (4,0) and label it "GND"
    \draw (0,0) -- (4,0) node[right]{GND};

    % Draw the positive rail in red from (0,4) to (4,4) and label it "+5 volts"
    \draw[red] (0,4) -- (4,4) node[right]{$+5\,\mathrm{V}$};

    % Place V_in on the left at (0,1)
    \node[left] at (0,1) {$V_{\text{in}}$};

    % Place the NPN transistor at (2,1) and label it "2N2222"
    \draw (2,1) node[npn, anchor=B](Q1){2N2222};

    % Draw the base resistor of 10 kΩ between V_in and the base of the transistor
    \draw (0,1) to[R, l=$10\,\mathrm{k}\Omega$] (Q1.B);

    % Connect the emitter of the transistor to ground
    \draw (Q1.E) -- (2.85,0);

    % Place the LED and a current limiting 220 Ω resistor vertical at x=2.85
    \draw (2.85,1.75) -- (2.85,2) to[led, l=LED] (2.85,2.5) to[R, l=$220\,\Omega$] (2.85,4);

    % Connect the collector of the transistor to the bottom of the LED-resistor chain
    % \draw (Q1.C) -- (2.85,2);

    % Connect the top of the resistor to the positive rail
    \draw (2.85,4) -- (2.85,4) -- (2.85,4);

\end{circuitikz}
-->

## CircuiTikZ

```
\begin{circuitikz}[american]

    % Draw the ground rail from (0,0) to (4,0) and label it "GND"
    \draw (0,0) -- (4,0) node[right]{GND};

    % Draw the positive rail in red from (0,4) to (4,4) and label it "+5 volts"
    \draw[red] (0,4) -- (4,4) node[right]{$+5\,\mathrm{V}$};

    % Place V_in on the left at (0,1)
    \node[left] at (0,1) {$V_{\text{in}}$};

    % Place the NPN transistor at (2,1) and label it "2N2222"
    \draw (2,1) node[npn, anchor=B](Q1){2N2222};

    % Draw the base resistor of 10 kΩ between V_in and the base of the transistor
    \draw (0,1) to[R, l=$10\,\mathrm{k}\Omega$] (Q1.B);

    % Connect the emitter of the transistor to ground
    \draw (Q1.E) -- (2.85,0);

    % Place the LED and a current limiting 220 Ω resistor vertical at x=2.85
    \draw (2.85,1.75) -- (2.85,2) to[led, l=LED] (2.85,2.5) to[R, l=$220\,\Omega$] (2.85,4);

    % Connect the collector of the transistor to the bottom of the LED-resistor chain
    % \draw (Q1.C) -- (2.85,2);

    % Connect the top of the resistor to the positive rail
    \draw (2.85,4) -- (2.85,4) -- (2.85,4);

\end{circuitikz}
```