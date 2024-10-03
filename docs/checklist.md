# Site Checklist

Our GitHub repository is designed to be "forked" so that
each college, university, school or even student can
easily create
their own custom version of this course.  You
can quickly change the colors, logos and course
content by simply editing the [mkdocs.yml](https://github.com/dmccreary/circuits/blob/main/mkdocs.yml) file.

Although creating a custom site is easy, we ask that you not resell the
course and respect our [creative commons license](license.md).

1. We recommend using conda to setup your build environment.  This makes sure that the python libraries used to build the site don't conflict with other Python projects.
1. Always remember to activate your conda environment before doing a build
1. Customize the fields in your mkdocs.yml file using the current dir
2. Configure Google Analytics to use the right site ID so you can see how many people are visiting your website
3. Make sure that your .gitignore file includes the ```site``` directory so that the site is not checked into your main branch.  The site is only checked
into the gh-pages branch
3. Test the build by using the ```mkdocs build``` command
4. Make sure the Edit button appears on each page so you can make changes directly on the GitHub website without having to clone the entire repo
5. Make sure that the LaTex formulas render correctly
6. I suggest running ```git config advice.addIgnoredFile false``` to get rid of annoying error messages when you type ```git add *``` to update all your changes