# Concept Dependency Graph

## Prompt

```
Our next step is to create a fully connected dependency graph.
In this step, for each concept on this list, create a new
list of other concepts on which it depends.  If a concept
depends on a specific concept that is not listed,
then we will need to add it as a new concept.
This will help us determine the teaching order of the concepts.

Return the new list as a CSV file using the following format. The first column is a numeric concept ID you assign,  the second column is the concept name, and the third column is a pipe-delimited list of the concept IDs that the concept depends upon.

Check your results to make sure that all concepts are connected to at least one other concept.
```

## Results

```csv
1,Ohm's Law,2|3|4
2,Voltage,7
3,Current,7
4,Resistance,101
5,Power,2|3
6,Energy,5|102
7,Electric charge,120
8,Conductors,7
9,Insulators,7
10,Capacitance,2|7
11,Inductance,3|104
12,Kirchhoff's Current Law,3
13,Kirchhoff's Voltage Law,2
14,Direct current,3
15,Alternating current,3|32
16,Series circuits,1|4|2|3
17,Parallel circuits,1|4|2|3
18,Combination circuits,16|17
19,Voltage divider,16|1
20,Current divider,17|1
21,Thevenin's theorem,2|3|4|16|17
22,Norton's theorem,2|3|4|16|17
23,Superposition theorem,106|2|3|1
24,Maximum power Transfer,21|1|5
25,Mesh analysis,13|16
26,Nodal analysis,12|17
27,RMS voltage,15|2
28,RMS current,15|3
29,Phasors,15|32|107
30,Impedance,4|31|29
31,Reactance,10|11|32
32,Frequency,15|102
33,Resonance,30|32|31
34,Bandwidth,33|32
35,Quality factor,33|6
36,Time constant,10|4|11
37,Transients in RC circuits,36|10|4
38,Transients in RL circuits,36|11|4
39,Transients in RLC circuits,37|38|10|11
40,Steady-state analysis,37|38|39|102
41,AC power,15|2|3|5
42,Complex power,41|30|29
43,Active power,42
44,Reactive power,42
45,Apparent power,42
46,Power factor,43|45
47,Impedance matching,30|24
48,Bode plots,108|52
49,Nyquist criterion,50|108
50,Stability,53|109
51,Poles and zeros,52|107
52,Transfer function,109
53,Feedback,54|109
54,Operational amplifiers,73|77
55,Differential amplifier,54
56,Inverting amplifier,54
57,Non-inverting amplifier,54
58,Summing amplifier,54
59,Integrator,54|10
60,Differentiator,54|10
61,Comparator,54
62,Voltage follower,54
63,Negative feedback,53|50
64,Positive feedback,53|50
65,Diodes,110
66,Zener diodes,65
67,Rectification,65
68,Half-wave rectifier,67|65
69,Full-wave rectifier,67|65
70,Bridge rectifier,69
71,Clipping circuits,65
72,Clamping circuits,65
73,Transistors,110
74,Bipolar junction transistor,73
75,Field effect transistor,73
76,Switching circuits,73
77,Amplifiers,73|54
78,Small signal analysis,73|77
79,Gain,77
80,Saturation,73
81,Cutoff,73
82,Biasing,73
83,Load line analysis,73|82
84,Common-emitter amplifier,73|77
85,Common-base amplifier,73|77
86,Common-collector amplifier,73|77
87,Darlington pair,73|77
88,Cascaded amplifiers,77
89,Differential pairs,73|55
90,Coupling capacitors,10
91,Decoupling capacitors,10
92,Filters,10|11|32
93,Low-pass filters,92
94,High-pass filters,92
95,Band-pass filters,92
96,Band-stop filters,92
97,Active filters,92|54
98,Passive filters,92
99,Voltage regulators,65|66|73
100,Pulse-width modulation,76
101,Resistivity,115
102,Time,116
103,Capacitors,10|7
104,Magnetic fields,3
105,Conservation of energy,6
106,Linearity,117
107,Complex numbers,118
108,Frequency response,32|92
109,Control systems,53|52
110,Semiconductor physics,111
111,Solid-state physics,119
112,Elementary charge,120
113,Conservation laws,119
114,P-N junctions,110
115,Material properties,119
116,Fundamental concepts,
117,Mathematical principles,118
118,Mathematics,116
119,Physics,116
120,Atomic structure,119
```