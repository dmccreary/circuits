# About the Generative AI Circuits Course

Let's face it.  Static textbooks are obsolete.  Learning with hands-on
interactive simulations is a lot more fun and effective.
In the past, creating these simulations was a slow and expensive process.  Generative AI has changed this.

Generative AI make it easy to create a new simulation of a circuit. It also makes it easy to customize every example and to ask questions about how to analyze a circuit.

We are entering a new era, where generative AI will be eventually be embedded
in all our circuit design and simulation tools.  For example, today the Mermaid drawing program can take a description of a circuit and generate a diagram.

The key skill we teach is how is to be able to provide precise [prompts](./glossary.md#llm-prompt) to [large-language models](./glossary.md#large-language-model) (LLMs) to quickly customize your learning journey.

## Our New Assumptions

This course will make a new set of assumptions:

### 1. Universal Access

All teachers and students should have access to LLM tools like ChatGPT or Llama so they
can quickly customize a lesson, a simulation or a diagram.  Our goal is to make
it easy for all stakeholders to leverage even small LLMs that run on
local commodity GPUs.

We also provide suggestions on leveraging small models that have been optimized to run on older GPUs with as little as 12GB RAM.  A good example of this is creating embeddings using [Ollama Embeddings](https://ollama.com/blog/embedding-models) that run in under 1 GB of RAM.

The trick to making smaller models work well is to provide ultra-high quality prompts that traverse graphs to include the appropriate contextual knowledge in the prompts.  We call this approach [The GraphRAG Approach]

### 2. Prompt Engineering

With the right prompt templates, these LLM tools can create powerful interactive simulations.  Our assumption is that students that have strong prompt engineering skills will be better positions to work with AI agents to solve complex problems.

### 3. MicroSims

This course leverages the concept of a [MicroSim](https://dmccreary.github.io/microsims/), which
are small standalone simulations that illustrate specific concepts.  Generative AI is
not only a great way to create new MicroSims, but given an example microsim template it
is excellent at customizing MicroSims.  We provide an extensive collection of
templates that can be quickly customized and added to a our library and
we encourage others to publish their MicroSims.

An example of a course that created MicroSims for electrical engineering courses can be found [here](https://kenn0727.github.io/ee-microsims/).
This course was part of the University of Minnesota Senior Seminar in 2024.
We are grateful to [Sharat Batra](https://www.linkedin.com/in/sharatbatra/)
for enabling this senior seminar group.

### 4. Metaphors and Stories

Although many students have a strong math background, some students
have difficulty getting an intuitive sense of a circuit from an equation.
Fear not!  Generative AI is excellent at
finding [metaphors and stores](./glossary.md#metaphors-and-stories)
to quickly allow all students to gain rapid understanding of complex concepts.
Using high-quality metaphors and stories makes circuits accessible to a larger
population of students that are at different stages of their math journey.

Here is a suggested [prompt for generating metaphors and stories](./prompts/metaphors-and-stories.md).  I encourage everyone, both instructors and students to use generative AI to generate non-technical explanations without over dependance on complex mathematical formulas.

This gets to the heart of one the key values of this content: making
knowledge more accessible to a wider audience regardless of
location, race, class or income.

### 5. FAQ Analytics

There are some questions that get answered frequently.  Experienced
instructors know this and have developed great tools to
give students clear answers to important foundational concepts.

However, newer instructors my not have a sense of what key
concepts need to be understood and in what order they should be explained.
They also don't have a deep understanding of why having an intuitive
understanding of key concepts is so essential.  They also
have developed ways of listening to students and asking clarifying
questions to uncover where the lack of foundational concept understanding lies.

Here is where generative AI can help.  Large-language foundation models
are trained not
ust on a single textbook, but they have learned from literally billions of source documents.  They have a sense of the order these concepts should be taught
and the techniques use to teach them.

In this course focus on high-quality material for these frequently-asked questions.  This
is our [Parato Analysis](./glossary.md#pareto-analysis) method.  We can use [Google Analytics](https://developers.google.com/analytics) to gather data on 
which pages are being used the most and we can use feedback forms
to quickly gather feedback when concepts are not clear.

This reflects the value that a great course is not just the work of
dedicated instructors.  The use of data and continuous feedback loops
are essential to continually improving the learning experience.

### 5. Concept Knowledge Graphs

![](./img/kg-for-ohms-law.png)

All circuits courses are based on learning a collection of [Concepts](./glossary.md#knowledge-graph-concept) that have dependencies on other concepts.  Learning
advanced concepts depends on your understanding the prerequisite concepts.
For example, before you learn about Ohm's Law you should have an understanding of
the concepts of voltage, current, resistance and how linear equations work.

These concepts and their dependencies can be stored in a directed graph
database known as a concept knowledge graph were concepts are vertices and
prerequisites for learning a new concept are directed edges between the concepts.  We can traverse this knowledge graph to create precise hallucination-free responses to [frequently asked questions](./glossary.md#frequently-asked-question).

There are many types of knowledge graphs.  The knowledge graph for an
entire college course contains around 10,000 concepts.  However, each
lesson typically only contains a few dozen concepts.

Note that the figure above was created using the [vis.js](https://visjs.github.io/vis-network/docs/network/) JavaScript library and ChatGPT.  You can find sample
prompts to create this knowledge graphs [here](./prompts/knowledge-graph/index.md)

### 6. Similarity

Many concepts are similar.  We can use LLMs and embeddings to find the similarity in questions, answers, concepts, devices, simulations, assessments and diagrams.  Allowing stakeholders to quickly find similar items using a [vector store](./glossary.md#vector-store) is critical to providing a high-quality experience for our stakeholders.

## Building the Foundation for Hyperpersonalized Learning

Our goal is to eventually use [hyperpersonalization](./glossary.md#hyperpersonalization) to generate custom lesson plans and simulations based on the needs of each of our stakeholders.  These tools can be directly
integrated with a [graph-based learning management system](https://dmccreary.github.io/graph-lms/)
to provide low-cost but high-quality eduction for everyone.

## Prerequisites

Because our lesson plans can be customized with generative AI, we have
a much more limited set of required math prerequisites.  Our generative AI
prompts use a variety of metaphors a storytelling to help students gain
an intuitive understanding of how circuits work.

On the other hand, students that already have a strong understanding
of mathematics including calculus can have their lesson plans tuned
to their background.

## Related MicroSites

Building open-source training material with microsites can be fun.  In
the past I have often built a custom microsite for a single one-hour
presentation.  Here are some related microsites:

[Beginning Electronics](https://dmccreary.github.io/beginning-electronics/) - targeting a younger audience with fun but simple hands-on breadboard projects. THis course does not assume any math background.

[Digital Electronics](https://dmccreary.github.io/digital-electronics/) - this site uses the same generative AI approach but it puts a focus on hands-on labs for
younger students and simulations of simple digital systems.  The focus is generating simple labs and simulations using low-cost breadboards and LEDs.

[MicroSims](https://dmccreary.github.io/microsims/) - our original site
that contains generative AI generated simulations.

[Robot Day](https://dmccreary.github.io/robot-day/) - a single day of fun activities for students that want to learn about how robots work.

[MicroPython](https://www.coderdojotc.org/micropython/) - Mostly projects that
use the Raspberry Pi micro-controller to gather sensor data and update displays.