---
title: Chapter 4 Glossary — DC Circuit Analysis Methods
description: Key terms and definitions for Chapter 4
---

<div class="unit1-styled" markdown>

# Chapter 4 Glossary

| Term | Definition |
|------|-----------|
| Source transformation | The conversion between a voltage source in series with a resistance and an equivalent current source in parallel with the same resistance. Voltage-to-current: \(I_N = V_S / R_S\). Current-to-voltage: \(V_{Th} = I_N \cdot R_P\). The two forms are equivalent at the terminals and can be freely interchanged to simplify analysis. |
| Thevenin's theorem | Any linear circuit viewed from two terminals is electrically equivalent to a single voltage source \(V_{Th}\) in series with a single resistance \(R_{Th}\). The Thevenin voltage equals the open-circuit voltage at the terminals; the Thevenin resistance is found by killing all independent sources and computing the resistance looking into the terminals. |
| Thevenin equivalent | The simplified representation of a linear circuit as \(V_{Th}\) in series with \(R_{Th}\), where \(V_{Th} = V_{oc}\) (open-circuit voltage) and \(R_{Th} = V_{oc}/I_{sc}\) (or resistance with sources killed). All quantities beyond the two terminals are condensed into these two elements. |
| Norton's theorem | Any linear circuit viewed from two terminals is equivalent to a current source \(I_N\) in parallel with a resistance \(R_N\). \(I_N = I_{sc}\) is the short-circuit current, and \(R_N = R_{Th}\). Norton and Thevenin equivalents are duals related by source transformation. |
| Norton equivalent | The simplified representation of a linear circuit as \(I_N\) in parallel with \(R_N\), where \(I_N = V_{Th}/R_{Th}\) is the short-circuit current and \(R_N = R_{Th}\). Preferred form when the load is in parallel with the source network. |
| Maximum power transfer | The condition under which a load receives maximum power from a source network: load resistance must equal the Thevenin resistance of the source network (\(R_L = R_{Th}\)). Maximum power is \(P_{max} = V_{Th}^2 / (4 R_{Th})\). At this condition, efficiency is 50% — equal power is dissipated in the source and load. |
| Nodal analysis | A systematic circuit analysis method based on KCL that assigns voltage variables to non-reference nodes and solves the resulting \(n-1\) equations simultaneously. The same as the node voltage method from Chapter 3; it underlies circuit simulation software like SPICE. |
| Mesh analysis | A systematic circuit analysis method based on KVL that assigns circulating current variables to each mesh and solves the resulting \(m\) equations simultaneously. Equivalent to the mesh current method from Chapter 3. |
| Two-port network | A circuit representation with two pairs of terminals (input port and output port) characterized by four parameters: input/output voltages and currents. Used to model amplifiers, filters, and transmission lines without specifying internal topology. |
| Input resistance | The resistance seen looking into the input terminals of a circuit or device, equal to the ratio of input voltage to input current. High input resistance is desirable for voltage amplifiers to avoid loading the source signal. |
| Output resistance | The Thevenin resistance seen looking back into the output terminals of a circuit, with internal sources active. Low output resistance is desirable to drive loads without voltage droop. Equal to the Thevenin resistance of the output port. |
| Loading effect | The change in circuit behavior that occurs when a load is connected to a source or intermediate stage. Loading reduces the output voltage of a voltage divider or amplifier by forming a parallel path with the source impedance. Avoided by designing source impedance much lower than load impedance. |
| Capacitor | A passive component that stores energy in an electric field between two conducting plates separated by a dielectric. Defined by \(C = Q/V\) in farads (F). V-I relationship: \(i = C\, dv/dt\). Blocks DC, passes AC. Energy stored: \(E = \frac{1}{2}CV^2\). |
| Inductor | A passive component that stores energy in a magnetic field created by current flowing through a coil of wire. Defined by inductance \(L\) in henrys (H). V-I relationship: \(v = L\, di/dt\). Passes DC freely (acts as short circuit in steady state). Energy stored: \(E = \frac{1}{2}LI^2\). |
| Conjugate impedance matching | The AC extension of maximum power transfer: maximum power delivered to a load when the load impedance is the complex conjugate of the source impedance, i.e., \(Z_L = Z_{Th}^*\). Ensures resistive parts are equal and reactive parts cancel, maximizing real power transfer. |

</div>
