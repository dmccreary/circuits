#!/usr/bin/env python3
"""
Render a Schemdraw circuit script to an image file.

Usage:
    python render_circuit.py input.py output.svg
    python render_circuit.py input.py output.png
    python render_circuit.py input.py output.pdf

The script executes the input Python file which should contain Schemdraw code.
If the input file doesn't explicitly save the drawing, this script will
capture and save it to the specified output path.
"""

import sys
import os
import importlib.util
from pathlib import Path

# Set non-interactive backend before importing matplotlib
os.environ['MPLBACKEND'] = 'Agg'


def render_circuit(input_path: str, output_path: str) -> None:
    """
    Execute a Schemdraw script and save the output to the specified path.

    Args:
        input_path: Path to the Python file containing Schemdraw code
        output_path: Path where the rendered image should be saved
    """
    input_path = Path(input_path)
    output_path = Path(output_path)

    if not input_path.exists():
        print(f"Error: Input file not found: {input_path}")
        sys.exit(1)

    # Determine output format from extension
    output_format = output_path.suffix.lower().lstrip('.')
    if output_format not in ('svg', 'png', 'pdf', 'jpg', 'jpeg'):
        print(f"Warning: Unknown format '{output_format}', defaulting to SVG")
        output_format = 'svg'

    # Read and modify the script to save to our output path
    script_content = input_path.read_text()

    # Check if the script already has a save call
    has_save = '.save(' in script_content

    if has_save:
        # Replace the existing save path with our output path
        import re
        # Match .save('...') or .save("...")
        script_content = re.sub(
            r'\.save\([\'"][^\'"]+[\'"]\)',
            f".save('{output_path}')",
            script_content
        )
    else:
        # Add save call at the end of the drawing context
        # This handles the 'with schemdraw.Drawing() as d:' pattern
        lines = script_content.split('\n')
        modified_lines = []
        indent_level = None

        for i, line in enumerate(lines):
            modified_lines.append(line)

            # Detect the drawing context
            if 'schemdraw.Drawing()' in line and 'with' in line:
                # Find the variable name (usually 'd')
                import re
                match = re.search(r'as\s+(\w+)', line)
                if match:
                    var_name = match.group(1)
                    # Get the indent level
                    indent_level = len(line) - len(line.lstrip()) + 4

        # Add save at the end if we found a drawing context
        if indent_level is not None:
            # Insert save before the last line of the with block
            indent = ' ' * indent_level
            modified_lines.append(f"{indent}{var_name}.save('{output_path}')")

        script_content = '\n'.join(modified_lines)

    # Create a temporary module to execute the script
    spec = importlib.util.spec_from_loader("circuit_script", loader=None)
    module = importlib.util.module_from_spec(spec)

    # Add the script's directory to path so relative imports work
    original_dir = os.getcwd()
    os.chdir(input_path.parent)

    try:
        # Execute the modified script
        exec(script_content, module.__dict__)
        print(f"Circuit rendered successfully: {output_path}")
    except Exception as e:
        print(f"Error rendering circuit: {e}")
        sys.exit(1)
    finally:
        os.chdir(original_dir)


def main():
    if len(sys.argv) < 3:
        print("Usage: python render_circuit.py input.py output.svg")
        print("")
        print("Arguments:")
        print("  input.py   - Python file containing Schemdraw code")
        print("  output.svg - Output image file (svg, png, pdf supported)")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]

    render_circuit(input_path, output_path)


if __name__ == "__main__":
    main()
