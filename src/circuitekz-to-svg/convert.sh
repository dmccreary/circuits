#!/bin/sh

# Unix shell script to convert a circuit description in CircuiTekZ format
# into SVG so it can be placed in a Markdown page as an image.
# note that you can also go from PDF to .png

# Check if exactly one argument is provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <file.tex>"
  exit 1
fi

# Assign the input file to a variable
input_file="$1"

# Check if the file exists
if [ ! -f "$input_file" ]; then
  echo "Error: File '$input_file' not found!"
  exit 1
fi

# Get the base filename without the extension
filename=$(basename "$input_file" .tex)

# Compile the .tex file to a .dvi file
latex "$input_file"
if [ $? -ne 0 ]; then
  echo "Error: Failed to compile '$input_file' to DVI."
  exit 1
fi

# Convert the .dvi file to .svg
dvisvgm "$filename.dvi" -o "$filename.svg"
if [ $? -ne 0 ]; then
  echo "Error: Failed to convert DVI to SVG."
  exit 1
fi

# Output success message
echo "Conversion successful: $filename.svg"
