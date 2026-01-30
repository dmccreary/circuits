# Voltage Across A Capacitor

The voltage across a capacitor at any given time is determined by the history of the current that has flowed through it. Here's a plain English description of the formula:

## Formula

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


## Interactive Simulation

Below is a p5.js sketch that demonstrates the voltage across a capacitor over time in an RC (resistor-capacitor) circuit. The simulation allows you to adjust the resistance (R) and capacitance (C) values using sliders and observe how they affect the charging and discharging curves of the capacitor.

[Run the Voltage Across a Capacitor Simulation](./voltage-across-a-capacitor.html){ .md-button .md-button--primary }

### Description:

-   **Sliders**: Adjust the values of Resistance (R) and Capacitance (C).
-   **Buttons**: Choose between charging and discharging the capacitor.
-   **Graph**: Displays the voltage across the capacitor over time.
-   **Real-time Voltage**: Shows the instantaneous voltage value.

### **Understanding Voltage Across a Capacitor**

1.  **Basic Concept**: A capacitor stores electrical energy in the form of an electric field created by a separation of charges. The voltage across the capacitor reflects the amount of charge stored relative to its capacity to store charge (capacitance).

2.  **Relationship with Current**:

    -   **Current Flow**: When current flows into the capacitor, it accumulates charge on the plates, increasing the voltage across it.
    -   **Accumulated Charge**: The total charge accumulated over time affects the voltage. This accumulation is essentially the sum of all the small amounts of charge added over time.
3.  **Dependence on Capacitance**:

    -   **Capacitance (CCC)**: This is a measure of the capacitor's ability to store charge per unit voltage. A larger capacitance means the capacitor can store more charge for the same voltage.
    -   **Effect on Voltage**: For a given amount of accumulated charge, a capacitor with a larger capacitance will have a lower voltage across it compared to one with a smaller capacitance.
4.  **Initial Conditions**:

    -   **Starting Voltage**: If the capacitor already has an initial voltage at the starting time (often denoted as t0t\_0t0​), this initial voltage must be considered in determining the voltage at a later time.
    -   **Continuity**: The voltage across a capacitor cannot change instantaneously; it changes gradually as the charge accumulates or dissipates over time.
5.  **Time Dependency**:

    -   **Integration Over Time**: To find the voltage at a specific time, you consider all the current that has flowed into the capacitor from the starting time to that specific time.
    -   **Sum of Contributions**: Each small interval of current flow contributes to the total charge, and thus the voltage, at the time you're interested in.
6.  **Practical Interpretation**:

    -   **Charging**: When you apply a current to a capacitor, the voltage rises as the capacitor charges up.
    -   **Discharging**: If the current is flowing out of the capacitor (negative current), the voltage decreases as the capacitor discharges.
    -   **Circuit Behavior**: In a circuit, this relationship explains how capacitors smooth out voltage changes and can filter signals.


### **Summary**

-   **Voltage Across Capacitor**: Determined by the accumulated charge divided by the capacitance, plus any initial voltage present.
-   **Accumulated Charge**: Found by summing (integrating) the current over time from the starting point to the time of interest.
-   **Capacitance Effect**: Higher capacitance means more charge is needed to achieve the same voltage.
-   **Initial Voltage**: Any voltage present at the starting time must be included in the total voltage calculation.
-   **Time Consideration**: The voltage change is continuous and depends on the entire history of current flow up to that moment.



### **Real-World Example**

Imagine filling a bucket (capacitor) with water (charge) using a hose (current):

-   **Flow Rate**: The rate at which water flows from the hose is like the current.
-   **Bucket Size**: The size of the bucket represents the capacitance.
-   **Water Level**: The level of water in the bucket corresponds to the voltage across the capacitor.
-   **Filling Over Time**: The total amount of water in the bucket at any time depends on how long and how fast water has been flowing into it.
-   **Starting Level**: If the bucket already had some water at the beginning, this initial amount affects the current water level.

* * * *

By understanding these concepts, you can grasp how the voltage across a capacitor evolves over time based on the current flowing into or out of it and the capacitor's properties, all without needing to refer to the mathematical equation itself.