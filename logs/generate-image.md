# Generate Cover Image Script Update Log

**Date:** 2026-01-30
**Files Modified:** `src/image-generation/generate-cover.sh`

## Issue

The `generate-cover.sh` script had a hardcoded title "Introduction to Economics" on line 54, which was incorrect for the Circuits 1 project.

## Solution

Modified the shell script to dynamically extract the site title from `mkdocs.yml`.

## Changes Made

### Before (Line 54)
```bash
python "$PYTHON_SCRIPT" \
    --desc "$COURSE_DESC" \
    --title "Introduction to Economics" \
    --out "$OUTPUT_DIR/cover.png" \
    "$@"
```

### After
```bash
python "$PYTHON_SCRIPT" \
    --desc "$COURSE_DESC" \
    --title "$SITE_TITLE" \
    --out "$OUTPUT_DIR/cover.png" \
    "$@"
```

### New Variables Added
```bash
MKDOCS_YML="$PROJECT_ROOT/mkdocs.yml"
```

### New Logic Added
```bash
# Check for mkdocs.yml and extract site_name
if [ -f "$MKDOCS_YML" ]; then
    echo "✓ mkdocs.yml found: $MKDOCS_YML"
    # Extract site_name from mkdocs.yml (handles both quoted and unquoted values)
    SITE_TITLE=$(grep -E "^site_name:" "$MKDOCS_YML" | sed "s/site_name:[[:space:]]*//" | sed "s/['\"]//g" | xargs)
    if [ -z "$SITE_TITLE" ]; then
        echo "⚠ WARNING: Could not extract site_name from mkdocs.yml, using default"
        SITE_TITLE="Untitled Course"
    else
        echo "✓ Site title: $SITE_TITLE"
    fi
else
    echo "⚠ WARNING: mkdocs.yml not found, using default title"
    SITE_TITLE="Untitled Course"
fi
```

## How It Works

1. Locates `mkdocs.yml` in the project root
2. Uses `grep` to find the line starting with `site_name:`
3. Uses `sed` to remove the key and any surrounding quotes
4. Uses `xargs` to trim whitespace
5. Falls back to "Untitled Course" if extraction fails

## Result

For this project, the script now correctly uses:
```
site_name: Circuits 1
```

Which produces:
```
✓ Site title: Circuits 1
```

## Notes

- The Python script (`generate-cover-openai.py`) already supported the `--title` parameter
- No changes were needed to the Python script
- The shell script now handles both quoted (`site_name: "My Course"`) and unquoted (`site_name: My Course`) formats
