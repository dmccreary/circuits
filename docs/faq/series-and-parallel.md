# Seres vs Parallel

In electrical circuits, **series** and **parallel** refer to two fundamental ways of connecting components, each with distinct characteristics affecting current, voltage, and resistance.

**Series Circuits:**

-   **Connection:** Components are connected end-to-end in a single path for the current to flow.
-   **Current:** The same current flows through all components.
-   **Voltage:** The total voltage is divided among the components.
-   **Resistance:** Total resistance is the sum of individual resistances:
$$
Rtotal\=R1+R2+⋯+RnR\_{\\text{total}} = R\_1 + R\_2 + \\dots + R\_nRtotal​\=R1​+R2​+⋯+Rn​
$$

**Parallel Circuits:**

-   **Connection:** Components are connected across the same two points, creating multiple paths for the current.
-   **Voltage:** The same voltage is applied across each component.
-   **Current:** The total current is the sum of the currents through each parallel branch.
-   **Resistance:** Total resistance is less than any individual resistance and is calculated using the reciprocal formula (
    1Rtotal\=1R1+1R2+⋯+1Rn\\frac{1}{R\_{\\text{total}}} = \\frac{1}{R\_1} + \\frac{1}{R\_2} + \\dots + \\frac{1}{R\_n}Rtotal​1​\=R1​1​+R2​1​+⋯+Rn​1​
    ).

* * * *

**Example 1: Series Circuit**

Imagine three resistors with resistances of 5 Ω, 10 Ω, and 15 Ω connected in series to a 12 V battery.

-   **Total Resistance:**
    Rtotal\=5 Ω+10 Ω+15 Ω\=30 ΩR\_{\\text{total}} = 5\\,\\Omega + 10\\,\\Omega + 15\\,\\Omega = 30\\,\\OmegaRtotal​\=5Ω+10Ω+15Ω\=30Ω\\
-   **Current Through Circuit:**
    I\=VRtotal\=12 V30 Ω\=0.4 AI = \\frac{V}{R\_{\\text{total}}} = \\frac{12\\,V}{30\\,\\Omega} = 0.4\\,AI\=Rtotal​V​\=30Ω12V​\=0.4A\\
-   **Voltage Across Each Resistor:**
    -   V1\=I×R1\=0.4 A×5 Ω\=2 VV\_1 = I \\times R\_1 = 0.4\\,A \\times 5\\,\\Omega = 2\\,VV1​\=I×R1​\=0.4A×5Ω\=2V
    -   V2\=0.4 A×10 Ω\=4 VV\_2 = 0.4\\,A \\times 10\\,\\Omega = 4\\,VV2​\=0.4A×10Ω\=4V
    -   V3\=0.4 A×15 Ω\=6 VV\_3 = 0.4\\,A \\times 15\\,\\Omega = 6\\,VV3​\=0.4A×15Ω\=6V

**Example 2: Parallel Circuit**

Now, connect the same resistors (5 Ω, 10 Ω, and 15 Ω) in parallel to a 12 V battery.

-   **Total Resistance:**
    1Rtotal\=15 Ω+110 Ω+115 Ω\=15+110+115\=6+3+230\=1130\\frac{1}{R\_{\\text{total}}} = \\frac{1}{5\\,\\Omega} + \\frac{1}{10\\,\\Omega} + \\frac{1}{15\\,\\Omega} = \\frac{1}{5} + \\frac{1}{10} + \\frac{1}{15} = \\frac{6 + 3 + 2}{30} = \\frac{11}{30}Rtotal​1​\=5Ω1​+10Ω1​+15Ω1​\=51​+101​+151​\=306+3+2​\=3011​\

    So,
    Rtotal\=3011 Ω≈2.73 ΩR\_{\\text{total}} = \\frac{30}{11}\\,\\Omega \\approx 2.73\\,\\OmegaRtotal​\=1130​Ω≈2.73Ω\

-   **Total Current:**
    Itotal\=VRtotal\=12 V2.73 Ω≈4.4 AI\_{\\text{total}} = \\frac{V}{R\_{\\text{total}}} = \\frac{12\\,V}{2.73\\,\\Omega} \\approx 4.4\\,AItotal​\=Rtotal​V​\=2.73Ω12V​≈4.4A\

-   **Current Through Each Resistor:**

    -   I1\=VR1\=12 V5 Ω\=2.4 AI\_1 = \\frac{V}{R\_1} = \\frac{12\\,V}{5\\,\\Omega} = 2.4\\,AI1​\=R1​V​\=5Ω12V​\=2.4A
    -   I2\=12 V10 Ω\=1.2 AI\_2 = \\frac{12\\,V}{10\\,\\Omega} = 1.2\\,AI2​\=10Ω12V​\=1.2A
    -   I3\=12 V15 Ω\=0.8 AI\_3 = \\frac{12\\,V}{15\\,\\Omega} = 0.8\\,AI3​\=15Ω12V​\=0.8A

    The sum of branch currents equals the total current: 2.4 A+1.2 A+0.8 A\=4.4 A2.4\\,A + 1.2\\,A + 0.8\\,A = 4.4\\,A2.4A+1.2A+0.8A\=4.4A.

* * * *

These examples illustrate how series circuits have a single path with shared current and divided voltage, while parallel circuits have multiple paths with shared voltage and divided current.