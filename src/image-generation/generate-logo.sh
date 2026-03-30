#!/bin/bash
# Generate site logo using OpenAI API
# Uses the course description to generate an appropriate minimalist logo

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

COURSE_DESC="$PROJECT_ROOT/docs/course-description.md"
PYTHON_SCRIPT="$SCRIPT_DIR/generate-logo-openai.py"
OUTPUT_DIR="$PROJECT_ROOT/docs/img"

echo "=== Logo Generator ==="
echo ""

# Check for OpenAI API key
if [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ ERROR: OPENAI_API_KEY environment variable is not set"
    echo "   Set it with: export OPENAI_API_KEY='your-key-here'"
    exit 1
else
    echo "✓ OPENAI_API_KEY is set"
fi

# Check for Python script
if [ -f "$PYTHON_SCRIPT" ]; then
    echo "✓ Python script found: $PYTHON_SCRIPT"
else
    echo "❌ ERROR: Python script not found: $PYTHON_SCRIPT"
    exit 1
fi

# Check for course description
if [ -f "$COURSE_DESC" ]; then
    echo "✓ Course description found: $COURSE_DESC"
else
    echo "❌ ERROR: Course description not found: $COURSE_DESC"
    exit 1
fi

# Check/create output directory
if [ -d "$OUTPUT_DIR" ]; then
    echo "✓ Output directory exists: $OUTPUT_DIR"
else
    echo "→ Creating output directory: $OUTPUT_DIR"
    mkdir -p "$OUTPUT_DIR"
fi

echo ""
echo "Generating logo..."
echo "Primary color: #DA7857 (Anthropic brown)"
echo ""

python "$PYTHON_SCRIPT" \
    --desc "$COURSE_DESC" \
    --title "Introduction to Economics" \
    --out "$OUTPUT_DIR/logo.png" \
    --size 512 \
    "$@"

# Also generate a smaller version for favicon if successful
if [ $? -eq 0 ] && [ -f "$OUTPUT_DIR/logo.png" ]; then
    echo ""
    echo "Generating 64x64 version for header..."
    python "$PYTHON_SCRIPT" \
        --desc "$COURSE_DESC" \
        --title "Introduction to Economics" \
        --out "$OUTPUT_DIR/logo-64.png" \
        --size 64 \
        "$@"
fi
