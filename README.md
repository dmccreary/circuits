# AI Circuits Course

[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://dmccreary.github.io/circuits/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Built with MkDocs](https://img.shields.io/badge/Built%20with-MkDocs-blue)](https://www.mkdocs.org/)
[![Material Theme](https://img.shields.io/badge/Theme-Material-orange)](https://squidfunk.github.io/mkdocs-material/)

Learn electronic circuits with the help of generative AI tools. This interactive course combines traditional circuit theory with modern AI-powered learning tools, including circuit simulations, knowledge graphs, and AI-generated educational content.

🌐 **Website**: [https://dmccreary.github.io/circuits/](https://dmccreary.github.io/circuits/)

## Features

- 📚 **Interactive Learning**: Step-by-step circuit theory with hands-on simulations
- 🤖 **AI-Powered Content**: Prompts and examples for generating circuit diagrams, explanations, and knowledge graphs
- 🔬 **Circuit Simulations**: Interactive JavaScript simulations for components and circuits
- 📊 **Visual Learning**: Current-voltage plots, circuit diagrams, and animated components
- 🧠 **Knowledge Graphs**: AI-generated concept maps and dependency graphs
- 💡 **Practical Examples**: Real-world circuit applications and design patterns

## Project Kanban Board

[Kanban Board](https://github.com/users/dmccreary/projects/9) - use this board to
track what tasks are:

1. backlog
2. read
3. in process
4. in review
5. done

## Quick Start

### Prerequisites

- Python 3.7+
- MkDocs and MkDocs Material theme

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dmccreary/circuits.git
   cd circuits
   ```

2. Install MkDocs and dependencies:
   ```bash
   pip install mkdocs mkdocs-material
   ```

3. Serve the site locally:
   ```bash
   mkdocs serve
   ```

4. Open your browser to `http://localhost:8000`

### Building for Production

```bash
# Build static site
mkdocs build

# Deploy to GitHub Pages
mkdocs gh-deploy
```

## Project Structure

```
circuits/
├── docs/                    # Main documentation content
│   ├── sections/           # Course chapters and lessons
│   ├── prompts/            # AI prompt examples
│   ├── sims/               # Interactive circuit simulations
│   ├── faq/                # Frequently asked questions
│   └── img/                # Images and diagrams
├── src/                    # Source code utilities
│   ├── graph/              # Knowledge graph tools
│   ├── embeddings/         # Circuit embedding generation
│   └── plot-question-similarity/  # Analysis tools
├── data/                   # CSV data files
├── site/                   # Generated static site
└── mkdocs.yml             # Site configuration
```

## Contributing

We welcome contributions to improve the course content, add new simulations, or enhance the AI-powered features!

### Reporting Issues

Please use [GitHub Issues](https://github.com/dmccreary/circuits/issues) to:
- Report bugs or errors in content
- Request new features or simulations
- Suggest improvements to existing material
- Ask questions about circuit concepts

### Pull Request Process

1. **Fork the repository** and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - For content updates: Edit files in the `docs/` directory
   - For simulations: Add HTML/JS files in `docs/sims/`
   - For utilities: Add Python scripts in `src/`

3. **Test your changes**:
   ```bash
   mkdocs serve
   ```
   Visit `http://localhost:8000` to preview your changes

4. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "Add new transistor simulation example"
   ```

5. **Push to your fork** and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub with:
   - Clear description of changes
   - Screenshots if adding visual content
   - Reference to any related issues

### Content Guidelines

- Follow existing markdown formatting and structure
- Test interactive simulations in multiple browsers
- Include proper attribution for any external resources
- Ensure content aligns with the educational goals of the course

## Acknowledgments

This project is built with and grateful for these open source technologies:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Modern documentation theme
- **[MathJax](https://www.mathjax.org/)** - Mathematical notation rendering
- **[Python](https://www.python.org/)** - Programming language for data processing tools
- **[D3.js](https://d3js.org/)** - Data visualization library for interactive graphs
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for the course website

Special thanks to the open source community for providing the tools that make educational resources like this possible.

## License

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit
- **NonCommercial** — You may not use the material for commercial purposes
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license

## Contact

- **Author**: Dan McCreary
- **Website**: [https://dmccreary.github.io/circuits/](https://dmccreary.github.io/circuits/)
- **Issues**: [GitHub Issues](https://github.com/dmccreary/circuits/issues)