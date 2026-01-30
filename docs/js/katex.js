// KaTeX auto-render configuration for Material for MkDocs
// Uses standard LaTeX delimiters: \(...\) for inline, \[...\] for display

document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body, {
        delimiters: [
            { left: "\\(", right: "\\)", display: false },  // inline math
            { left: "\\[", right: "\\]", display: true },   // display math
            { left: "$$", right: "$$", display: true },     // legacy display (fallback)
            { left: "$", right: "$", display: false }       // legacy inline (fallback)
        ],
        throwOnError: false,
        // Trust HTML content (needed for some KaTeX features)
        trust: true,
        // Strict mode off for better compatibility
        strict: false
    });
});
