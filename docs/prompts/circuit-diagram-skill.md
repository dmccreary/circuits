Please create a plan for using the /skill-creator skill to create a new skill that will
generate simple RLC circuit drawings on a simple grid layout for a Circuits 1 course.
The input to the skill will be a simple description of a circuit.
The name of the skill will be rlc-circuit-drawing-generator. 
On the left of the drawing will be a power source, which will be a battery, a DC power source
or an AC power source.  The power source will always be vertically oriented.
For a battery or DC power source the positive will be on the top.
On the right will be an arrangement of components: resistors, capacitors or inductors, a current meter or a voltage meter.  The components will be laid out on the grid in series, parallel or a combination
of series-parallel connections.
I want the skill to generate a small declarative file that does relative placement of components
such as a Schemdraw file.
After the Schemadraw file is generated, I want a python script that will generate the an image
of the file in a format such as SVG, PNG or JPG.

Here are some sample circuit descriptions:

### Simple AC Resistive Circuit
- Description of Circuit: Resistor connected to AC voltage source
- AC circuit
- Type of Circuit: Basic AC resistive circuit
- Number of components: 2
- List of components: AC voltage source, resistor
- Solutions: AC fundamentals, RMS values, power calculations in AC circuits

### AC Capacitive Circuit
- Description of Circuit: Capacitor connected to AC voltage source
- AC circuit
- Type of Circuit: Reactive circuit
- Number of components: 2
- List of components: AC voltage source, capacitor
- Solutions: Capacitive reactance, phase relationships, reactive power

### AC Inductive Circuit
- Description of Circuit: Inductor connected to AC voltage source
- AC circuit
- Type of Circuit: Reactive circuit
- Number of components: 2
- List of components: AC voltage source, inductor
- Solutions: Inductive reactance, phase relationships, magnetic energy storage

### RC Series Circuit
- Description of Circuit: Resistor and capacitor connected in series with AC source
- AC circuit
- Type of Circuit: RC network
- Number of components: 3
- List of components: AC voltage source, resistor, capacitor
- Solutions: Impedance calculations, phasor analysis, RC time constants

### RL Series Circuit
- Description of Circuit: Resistor and inductor connected in series with AC source
- AC circuit
- Type of Circuit: RL network
- Number of components: 3
- List of components: AC voltage source, resistor, inductor
- Solutions: Impedance calculations, phasor analysis, RL time constants

### RLC Series Circuit
- Description of Circuit: Resistor, inductor, and capacitor connected in series with AC source
- AC circuit
- Type of Circuit: RLC resonant circuit
- Number of components: 4
- List of components: AC voltage source, resistor, inductor, capacitor
- Solutions: Resonance analysis, quality factor, frequency response

### RLC Parallel Circuit
- Description of Circuit: Resistor, inductor, and capacitor connected in parallel with AC source
- AC circuit
- Type of Circuit: Parallel resonant circuit
- Number of components: 4
- List of components: AC voltage source, resistor, inductor, capacitor
- Solutions: Parallel resonance, admittance calculations, tank circuits


How would use the /skill-creator skill to create this program?

## Response

Plan: Create rlc-circuit-drawing-generator Skill                                                             
                                                                                                              
 ### Overview                                                                                                  
 Create a new Claude skill using /skill-creator that generates RLC circuit diagrams from text descriptions.   
 The skill will output Schemdraw Python code and render it to SVG image files.                                
                                                                                                              
### User Preferences                                                                                             
                                                                                                              
 - Location: /Users/dan/Documents/ws/circuits/.claude/skills/ (project-specific)                              
 - Image format: SVG (default)                                                                                
 - Labels: Include component values (R₁=10Ω, C₁=100μF, L₁=1mH)                                                
 - Ground symbols: Yes, include ground reference points                                                       
                                                                                                              
 Skill Structure                                                                                              
                                                                                                              
 rlc-circuit-drawing-generator/                                                                               
 ├── SKILL.md                      # Main skill instructions                                                  
 ├── scripts/                                                                                                 
 │   └── render_circuit.py         # Python script to render Schemdraw to SVG                                 
 ├── references/                                                                                              
 │   ├── schemdraw-guide.md        # Schemdraw syntax reference                                               
 │   └── circuit-patterns.md       # Common circuit topology patterns                                         
 └── assets/                                                                                                  
     └── examples/                 # Example Schemdraw files for reference                                    
         ├── simple-resistive.py                                                                              
         ├── rc-series.py                                                                                     
         ├── rlc-series.py                                                                                    
         └── rlc-parallel.py                                                                                  
                                                                                                              
 Step-by-Step Process                                                                                         
                                                                                                              
 Step 1: Initialize the Skill                                                                                 
                                                                                                              
 Run the init_skill.py script from skill-creator:                                                             
 /Users/dan/Documents/ws/skills/skill-creator/scripts/init_skill.py rlc-circuit-drawing-generator --path      
 /Users/dan/Documents/ws/circuits/.claude/skills                                                              
                                                                                                              
 Step 2: Create the SKILL.md                                                                                  
                                                                                                              
 The SKILL.md will include:                                                                                   
                                                                                                              
 Frontmatter:                                                                                                 
 - name: rlc-circuit-drawing-generator                                                                        
 - description: Generates RLC circuit diagrams from text descriptions using Schemdraw. Use this skill when    
 the user wants to create circuit drawings for educational purposes, particularly for AC/DC circuits with     
 resistors, capacitors, inductors, and power sources.                                                         
                                                                                                              
 Body Content:                                                                                                
 1. Overview of skill purpose                                                                                 
 2. Input format specification (circuit description structure)                                                
 3. Workflow steps:                                                                                           
   - Parse circuit description                                                                                
   - Determine topology (series/parallel/mixed)                                                               
   - Generate Schemdraw Python code                                                                           
   - Render to image using render_circuit.py                                                                  
 4. Layout conventions:                                                                                       
   - Power source on left (vertical, positive on top)                                                         
   - Components on right (series/parallel arrangements)                                                       
 5. References to bundled resources                                                                           
                                                                                                              
 Step 3: Create scripts/render_circuit.py                                                                     
                                                                                                              
 Python script that:                                                                                          
 - Takes a Schemdraw Python file as input                                                                     
 - Executes it to generate the circuit drawing                                                                
 - Exports to specified format (SVG, PNG, or JPG)                                                             
 - Handles output path and filename                                                                           
                                                                                                              
 # Usage: python render_circuit.py input.py output.svg                                                        
                                                                                                              
 Step 4: Create references/schemdraw-guide.md                                                                 
                                                                                                              
 Document covering:                                                                                           
 - Schemdraw component elements:                                                                              
   - elm.SourceV() - DC voltage source                                                                        
   - elm.SourceSin() - AC voltage source                                                                      
   - elm.Battery() - Battery                                                                                  
   - elm.Resistor() - Resistor                                                                                
   - elm.Capacitor() - Capacitor                                                                              
   - elm.Inductor() - Inductor                                                                                
   - elm.Ammeter() - Current meter                                                                            
   - elm.Voltmeter() - Voltage meter                                                                          
 - Direction methods: .right(), .left(), .up(), .down()                                                       
 - Labeling: .label('R₁'), .label('10Ω')                                                                      
 - Anchoring and connection points                                                                            
 - Push/pop for parallel branches                                                                             
                                                                                                              
 Step 5: Create references/circuit-patterns.md                                                                
                                                                                                              
 Template patterns for:                                                                                       
 - Simple 2-component circuits (source + single component)                                                    
 - Series circuits (source + 2-3 components in line)                                                          
 - Parallel circuits (source + parallel branches)                                                             
 - Series-parallel combinations                                                                               
                                                                                                              
 Step 6: Create Example Files in assets/examples/                                                             
                                                                                                              
 Working Schemdraw examples for each circuit type:                                                            
 - simple-resistive.py                                                                                        
 - rc-series.py                                                                                               
 - rl-series.py                                                                                               
 - rlc-series.py                                                                                              
 - rlc-parallel.py                                                                                            
                                                                                                              
 Step 7: Package the Skill                                                                                    
                                                                                                              
 /Users/dan/Documents/ws/skills/skill-creator/scripts/package_skill.py                                        
 /Users/dan/Documents/ws/circuits/.claude/skills/rlc-circuit-drawing-generator                                
                                                                                                              
 Components Supported                                                                                         
 ┌───────────────────┬───────────────────┬────────────────────────┐                                           
 │     Component     │ Schemdraw Element │         Symbol         │                                           
 ├───────────────────┼───────────────────┼────────────────────────┤                                           
 │ DC Voltage Source │ elm.SourceV()     │ Circle with +/-        │                                           
 ├───────────────────┼───────────────────┼────────────────────────┤                                           
 │ AC Voltage Source │ elm.SourceSin()   │ Circle with sine wave  │                                           
 ├───────────────────┼───────────────────┼────────────────────────┤                                           
 │ Battery           │ elm.Battery()     │ Long/short lines       │                                           
 ├───────────────────┼───────────────────┼────────────────────────┤                                           
 │ Resistor          │ elm.Resistor()    │ Zigzag                 │                                           
 ├───────────────────┼───────────────────┼────────────────────────┤                                           
 │ Capacitor         │ elm.Capacitor()   │ Parallel plates        │                                           
 ├───────────────────┼───────────────────┼────────────────────────┤                                           
 │ Inductor          │ elm.Inductor()    │ Coil                   │                                           
 ├───────────────────┼───────────────────┼────────────────────────┤                                           
 │ Ammeter           │ elm.Ammeter()     │ Circle with A          │                                           
 ├───────────────────┼───────────────────┼────────────────────────┤                                           
 │ Voltmeter         │ elm.Voltmeter()   │ Circle with V          │                                           
 ├───────────────────┼───────────────────┼────────────────────────┤                                           
 │ Ground            │ elm.Ground()      │ Standard ground symbol │                                           
 └───────────────────┴───────────────────┴────────────────────────┘                                           
 Layout Convention                                                                                            
                                                                                                              
     ┌────[R₁=10Ω]────[L₁=1mH]────[C₁=100μF]────┐                                                             
     │                                           │                                                            
    (+)                                          │                                                            
   (AC/DC)                                       │                                                            
    (-)                                          │                                                            
     │                                           │                                                            
     └──────────────────⏚───────────────────────┘                                                             
                      (GND)                                                                                   
                                                                                                              
 - Power source: Always vertical on left                                                                      
 - Positive terminal: Top                                                                                     
 - Components: Arranged right of source with value labels                                                     
 - Ground: Reference point on return path                                                                     
 - Return path: Bottom connection                                                                             
                                                                                                              
 Verification                                                                                                 
                                                                                                              
 1. Install Schemdraw: pip install schemdraw                                                                  
 2. Test skill by providing a circuit description                                                             
 3. Verify Schemdraw code generates correctly                                                                 
 4. Run render_circuit.py to produce SVG                                                                      
 5. Confirm image matches expected layout with labels and ground                                              
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
                                                                                                              
 Would you like to proceed?                                                                                   
                                                                                                              
 ❯ 1. Yes, clear context and bypass permissions                                                               
   2. Yes, and bypass permissions                                                                             
   3. Yes, manually approve edits                                                                             
   4. Type here to tell Claude what to change                                                                 
