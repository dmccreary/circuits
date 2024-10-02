# Circuit Generation with Mermaid

## Mermaid Prompt



```mermaid
graph LR
    %% Nodes
    A[Battery - Positive Up]
    R[Resistor - 1K Ohm]
    GND[Ground]

    %% Connections
    A -->|"Positive"| R
    R -->|"GND"| GND
    A -->|"GND"| GND

    %% Edge Styles
    linkStyle 0 stroke:red,stroke-width:2px,color:red
    linkStyle 1 stroke:black,stroke-width:2px,color:black
    linkStyle 2 stroke:black,stroke-width:2px,color:black
```

[Sample](https://www.mermaidchart.com/app/projects/d015ecae-577e-4367-a816-6012421faf7b/diagrams/82ce93f2-5bf1-4727-a943-59d01d5b8476/version/v0.1/edit)