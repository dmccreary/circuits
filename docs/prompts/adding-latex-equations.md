# Adding LaTeX Equations

We have enabled the LaTeX markdown extensions using MathJax on
this site.  There are three ways to render equations:

1. **Inline:** simply surround the LaTeX expression with dollar signs
2. **Centered:** surround the LeTex expression with '''\[''' and '''\]'''
3. **Block:** place double dollar signs on a separate line before and after the LaTeX expression

## Rendering Ohm's Law in Markdown

Here is an inline equation rendering of Ohm's Law: $V=IR$.

```linenums="0"
$V=IR$
```

This example is centered:

\[ V = IR \]

```linenums="0"
\[ V = IR \]
```

$$
V=IR
$$

```linenums="0"
$$
V=IR
$$
```

## The Shockley Diode Equation

The Shockley diode equation describes the current–voltage relationship of a diode:

$$
I = I_S \left( e^{\frac{V}{n V_T}} - 1 \right)
$$

where:

- \( I \) is the diode current,
- \( I_S \) is the reverse saturation current,
- \( V \) is the voltage across the diode,
- \( n \) is the ideality factor,
- \( V_T \) is the thermal voltage, \( V_T = \dfrac{k T}{q} \).

```linenums="0"
$$
I = I_S \left( e^{\frac{V}{n V_T}} - 1 \right)
$$

where:

- \( I \) is the diode current,
- \( I_S \) is the reverse saturation current,
- \( V \) is the voltage across the diode,
- \( n \) is the ideality factor,
- \( V_T \) is the thermal voltage, \( V_T = \dfrac{k T}{q} \).
```

## Voltage Across a Capacitor

The voltage across a capacitor at any given time is determined by the history of the current that has flowed through it. We can express this as
the sum of the initial voltage plus a integral of the current over time.

$$
v(t) = v(t_0) + \frac{1}{C} \int_{t_0}^{t} i(t)dt
$$

where:

-   $v(t)$: Voltage across the capacitor at time $t$
-   $v(t_0)$: Initial voltage across the capacitor at time $t_0​$
-   $C$: Capacitance (in farads)
-   $i(t)$: Current flowing through the capacitor at time $t$
-   $t_0​$: Initial time (often taken as t=0)

```linenums="0"
v(t) = v(t_0) + \frac{1}{C} \int_{t_0}^{t} i(t)dt
```

## Other Examples

And here is a display equation that includes
an integral, infinity, an exponent, a square, and square root and the symbol for $\pi$:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

```linenums="0"
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
```

$$
\operatorname{ker} f=\{g\in G:f(g)=e_{H}\}{\mbox{.}}
$$

## Block

```latex
\operatorname{ker} f=\{g\in G:f(g)=e_{H}\}{\mbox{.}}
```
