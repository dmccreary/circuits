# How We Built This Site

This page describes how we built this website and some of 
the rationale behind why we made various design choices.

## Python

MicroSims are about how we use generative AI to create
animations and simulations.  The language of AI
is Python.  So we wanted to create a site that could
be easily understood by Python developers.

## Mkdocs vs. Docusaurus

There are two main tools used by Python developers
to write documentation: [Mkdocs](http://mkdocs.org)
and [Docusaurus](https://docusaurus.io/).  Mkdocs
is easier to use and more popular than Docusaurus.
Docusaurus is also optimized for single-page applications.
Mkdocs also has an extensive library of themes and plugins.
None of us are experts in JavaScript or React.
Based on our [ChatGPT Analysis of the Tradeoffs](https://chat.openai.com/share/c7fea52c-3ef2-4837-a70a-fc9bdb919d9a)
we chose mkdocs for this site management.

## GitHub and GitHub Pages

[GitHub](http://github.com) is a logical choice to store our 
site source code and documentation.  GitHub also has
a [Custom GitHub Action](https://github.com/marketplace/actions/deploy-mkdocs)
that does auto-deployment if any files on the site change.
We don't currently have this action enabled, but other
teams can use this feature if they don't have the ability
to do a local build with mkdocs.

GitHub also has [Issues](https://github.com/dmccreary/microsims/issues), 
[Projects](https://github.com/users/dmccreary/projects/2) and releases
that we can use to manage our bugs and tasks.

The best practice for low-cost websites that have public-only
content is [GitHub Pages](https://pages.github.com/).  
Mkdocs has a command (```mkdocs gh-deploy```) that does
deployment directly to GitHub Pages.  This was an easy choice to make.

### GitHub Clone

If you would like to clone this repository, here are the commands:

```sh
mkdir projects
cd projects
git clone https://github.com/dmccreary/microsims
```

### After Changes

After you make local changes you must do the following:

```sh
# add the new files to a a local commit transaction
git add FILES
# Execute the a local commit with a message about what and why you are doing the commit
git commit -m "comment"
# Update the central GitHub repository
git push
```

## Material Theme

We had several options when picking a mkdocs theme:

1. Mkdocs default
2. Readthedocs
3. Third-Party Themes [See Ranking](https://github.com/mkdocs/catalog#-theming)

The Material Theme had 16K stars.  No other theme had over a few hundred.
This was also an easy design decision.

One key criterial was the social Open Graph tags so that when our users
post a link to a simulation, the image of the simulation is included
in the link.  Since Material supported this, we used the Material theme.
You can see our [ChatGPT Design Decision Analysis](https://chat.openai.com/share/d152cc79-73eb-4112-8be2-f03459d7b312) if you want
to check our decision process.

## Enable Edit Icon

To enable the Edit icon on all pages, you must add
the edit_uri and the content.action.edit under the theme features area.

```yaml
edit_uri: edit/master/docs/
```

```yaml
    theme:
        features:
            - content.action.edit
```

## Conda vs VENV

There are two choices for virtual environments.  We can
use the native Python venv or use Conda.  venv is simle
but is only designed for pure Python projects.  We imagine
that this site could use JavaScript and other langauges
in the future, so we picked Conda. There is nothing
on this microsite that prevents you from using one or
the other.  See the [ChatGPT Analysis Here](https://chat.openai.com/share/f2a6a7e2-5b8d-4ec0-8755-4a06b4b574f6).

Here is the conda script that we ran to create a new mkdocs environment that also
supports the material social imaging libraries.

```sh
conda deactivate
conda create -n mkdocs python=3
conda activate mkdocs
pip install mkdocs "mkdocs-material[imaging]"
```

## Mkdocs Commands

There are three simple mkdoc commands we use.

### Local Build

```sh
mkdocs build
```

This builds your website in a folder called ```site```.  Use
this to test that the mkdocs.yml site is working and does not
have any errors.

### Run a Local Server

```sh
mkdocs serve
```

This runs a server on ```http://localhost:8000```.
Use this to test the display formatting locally
before you push your code up to the GitHub repo.


```sh
mkdoc gh-deploy
```

This pushes everything up to the GitHub Pages site.
Note that it does not commit your code to GitHub.

## Generating LaTeX Equations

We can use the LaTeX typesetting systems to render equations
directly in our markdown pages.  To do this we need
to first install the Pymdown extension

```sh
$ pip install pymdown-extensions
```

Then we need to enable this feature in our mkdocs.yml file:

```yml
markdown_extensions:
  - pymdownx.arithmatex:
      generic: true

extra_javascript:
  - javascripts/mathjax.js
  - https://unpkg.com/mathjax@3/es5/tex-mml-chtml.js
```

## Removing Extra LaTeX

Markdown Paste duplicates LaTex

replace \\ with \
replace \_ with _
replace \= with =
replace first and last equation with ''

### Original
```
1Rtotal\=15 Ω+110 Ω+115 Ω\=15+110+115\=6+3+230\=1130\\frac{1}{R\_{\\text{total}}} = \\frac{1}{5\\,\\Omega} + \\frac{1}{10\\,\\Omega} + \\frac{1}{15\\,\\Omega} = \\frac{1}{5} + \\frac{1}{10} + \\frac{1}{15} = \\frac{6 + 3 + 2}{30} = \\frac{11}{30}Rtotal​1​\=5Ω1​+10Ω1​+15Ω1​\=51​+101​+151​\=306+3+2​\=3011​\
```

### 3 Formulas
```
1Rtotal\=15 Ω+110 Ω+115 Ω\=15+110+115\=6+3+230\=1130\\

frac{1}{R\_{\\text{total}}} = \\frac{1}{5\\,\\Omega} + \\frac{1}{10\\,\\Omega} + \\frac{1}{15\\,\\Omega} = \\frac{1}{5} + \\frac{1}{10} + \\frac{1}{15} = \\frac{6 + 3 + 2}{30} = \\frac{11}{30}

Rtotal​1​\=5Ω1​+10Ω1​+15Ω1​\=51​+101​+151​\=306+3+2​\=3011​\
```

### Central Version With UNICODE Omega
```
\frac{1}{R_{\text{total}}} = \frac{1}{5\,Ω} + \frac{1}{10\,Ω} + \frac{1}{15\,Ω} = \frac{1}{5} + \frac{1}{10} + \frac{1}{15} = \frac{6 + 3 + 2}{30} = \frac{11}{30}
```

### Final Rendering

$$
\frac{1}{R_{\text{total}}} = \frac{1}{5\,Ω} + \frac{1}{10\,Ω} + \frac{1}{15\,Ω} = \frac{1}{5} + \frac{1}{10} + \frac{1}{15} = \frac{6 + 3 + 2}{30} = \frac{11}{30}
$$

## Mkdocs Material Social Tags

Ideally, we would like to be able to just paste a link to a lesson in any chat dialog or social media site like Slack, LinkedIn, Twitter, Discord, Teams or Facebook.  When we paste the link, a "social card preview" is generated
that might include an image and description of the page.

We are using the [Material Social](https://squidfunk.github.io/mkdocs-material/setup/setting-up-social-cards/) tags.  This
is a work in progress!

Here is what we have learned.

1. There are extensive image processing libraries that can't be installed with just pip.  You will need to run a tool like [brew](https://brew.sh/) on the Mac to get the libraries installed.
2. Even after ```brew``` installs the libraries, you have to get your environment to find the libraries.  The only way I could get that to work was to set up a local UNIX environment variable.

Here is the brew command that I ran:

```sh
brew install cairo freetype libffi libjpeg libpng zlib
```

I then had to add the following to my ~/.zshrc file:

```sh
export DYLD_FALLBACK_LIBRARY_PATH=/opt/homebrew/lib
```

Note that I am running on a Mac with Apple silicon.  This means that the
image libraries that brew downloads must be specific to the Mac Arm
instruction set.

* [Cover images for blog post #4364](https://github.com/squidfunk/mkdocs-material/issues/4364)
* [Discussion on overriding the Social Card Image](https://github.com/squidfunk/mkdocs-material/discussions/5162)

## Rendering Circuit Diagrams

This site uses the basic MathJax Javascript library to convert
LaTeX equations into images for display.  Unfortunately, MathJax
does not support TikZ drawing macros.  So as a result, we can't convert
our nice declarative representation of a circuit to an image
with JavaScript.  This would be ideal since you could
just edit the code and refresh and it would display.

The work around to this limitation in MathJax is to
use a build process that converts the circuit
descriptions directly into images.

In order to convert the CircuiTikZ format generated by
our GenAI programs

```sh
brew install --cask basictex
sudo tlmgr update --self
sudo tlmgr install collection-latexrecommended
```

```
installer: Package name is 
installer: Installing at base path /
installer: The install was successful.
🍺  basictex was successfully installed!
```
Finding the Binary

```
sudo find / -name pdflatex 2>/dev/null
```

```
/usr/local/texlive/2024basic/bin/universal-darwin/pdflatex
```

### Testing Command Line LaTeX to PostScript

```
/usr/local/texlive/2024basic/bin/universal-darwin/pdflatex --version
pdfTeX 3.141592653-2.6-1.40.26 (TeX Live 2024)
kpathsea version 6.4.0
Copyright 2024 Han The Thanh (pdfTeX) et al.
There is NO warranty.  Redistribution of this software is
covered by the terms of both the pdfTeX copyright and
the Lesser GNU General Public License.
For more information about these matters, see the file
named COPYING and the pdfTeX source.
Primary author of pdfTeX: Han The Thanh (pdfTeX) et al.
Compiled with libpng 1.6.43; using libpng 1.6.43
Compiled with zlib 1.3.1; using zlib 1.3.1
Compiled with xpdf version 4.04
```

```sh
 tlmgr install circuitikz
 ```

## Installing CircuiTekZ to SVG

 ```
 brew install ghostscript
 ```

 ```
 sudo find / -name ghostscript 2>/dev/null
 ghostscript

 which gs
/opt/homebrew/bin/gs

brew install texlive