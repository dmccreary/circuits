#!/usr/bin/env python3
"""
upgrade-microsim-html.py
Standardise every docs/sims/*/main.html file:
  - Remove stale "Back to Lesson Plan" anchor links
  - Inject <meta name="viewport"> where absent
  - Replace body CSS with the Circuits 1 design-system baseline
  - Ensure html/body use height: 100% and overflow: hidden for
    clean iframe embedding
  - Preserve all existing JS, canvas, and script tags unchanged
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
SIMS = ROOT / 'docs' / 'sims'

# ── Patterns ──────────────────────────────────────────────────────────────────
# Remove any bare anchor pointing to "./" with Back/lesson text
RE_BACK_LINK = re.compile(
    r'\s*<a\s+href=["\']\./?["\'][^>]*>\s*(?:Back to Lesson Plan|Back to lesson plan)\s*</a>\s*',
    re.IGNORECASE
)

# Viewport meta already present?
RE_VIEWPORT = re.compile(r'<meta[^>]+name=["\']viewport["\']', re.IGNORECASE)

# Existing <style> block inside <head> that only contains body/canvas rules we replace
RE_SIMPLE_STYLE = re.compile(
    r'<style>\s*(?:html\s*,\s*)?body\s*\{[^}]*\}\s*(?:canvas\s*\{[^}]*\}\s*)?(?:main\s*\{[^}]*\}\s*)?</style>',
    re.IGNORECASE | re.DOTALL
)

VIEWPORT_TAG = '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n'

# Baseline body/canvas style for every sim
BASELINE_STYLE = """\
    <style>
        html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
        body { font-family: Arial, Helvetica, sans-serif; background: #e8eaf0; }
        main { display: block; }
        canvas { display: block; }
    </style>
"""

def process(path: Path) -> bool:
    """Return True if the file was changed."""
    text = path.read_text(encoding='utf-8')
    original = text

    # 1. Remove stale Back-to-Lesson-Plan link
    text = RE_BACK_LINK.sub('\n', text)

    # 2. Inject viewport meta if absent
    if not RE_VIEWPORT.search(text):
        # Insert after <meta charset=...>
        text = re.sub(
            r'(<meta\s+charset=["\'][^"\']*["\'][^>]*>)',
            r'\1\n' + VIEWPORT_TAG.rstrip('\n'),
            text,
            count=1,
            flags=re.IGNORECASE
        )

    # 3. Replace a simple single-block body/canvas style with the baseline
    #    Only replace if the entire style block is just body + optional canvas/main rules
    #    (do not touch sims that have complex inline styles with sim-specific rules)
    match = RE_SIMPLE_STYLE.search(text)
    if match:
        text = text[:match.start()] + BASELINE_STYLE.rstrip('\n') + text[match.end():]

    if text != original:
        path.write_text(text, encoding='utf-8')
        return True
    return False

def main():
    changed = []
    skipped = []
    for html in sorted(SIMS.glob('*/main.html')):
        if html.stat().st_size == 0:
            skipped.append(html.parent.name)
            continue
        if process(html):
            changed.append(html.parent.name)

    print(f"Updated {len(changed)} file(s):")
    for name in changed:
        print(f"  ✓ {name}")
    if skipped:
        print(f"\nSkipped (empty): {', '.join(skipped)}")

if __name__ == '__main__':
    main()
