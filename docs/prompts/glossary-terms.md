# Glossary Terms Prompt

We use the [ISO/IEC 11179 metadata registry](https://en.wikipedia.org/wiki/ISO/IEC_11179).  Each term should be:

1. **Precise** 
2. **Concise**
3. **Distinct**
4. **Non-circular**
5. **Unencumbered with business rules**

#### Precise

Precise refers to the quality of being exact, accurate, and clearly defined, without ambiguity. In a definition, precision ensures that the concept is communicated with clarity and specificity, leaving little room for interpretation.

#### Concise

Concise refers to the use of the fewest words necessary to convey meaning effectively. A concise definition avoids unnecessary detail or complexity while still fully explaining the concept.

#### Distinct

Distinct means clearly different and distinguishable from other related concepts. A distinct definition ensures that the term is uniquely identified and is not easily confused with similar terms.

#### Non-circular

Non-circular refers to a definition that does not use the term being defined as part of its own definition. A non-circular definition explains a concept without relying on the term itself, ensuring clarity and understanding.

#### Unencumbered with business rules

Unencumbered with business rules means that the definition is free from specific business-related constraints, assumptions, or operational guidelines. It focuses solely on describing the inherent nature of the concept, independent of how it may be applied in specific business contexts.

## Sample Prompt

```
You are an expert at creating precise and easy to understand
definitions for electrical engineering terms used in
an undergraduate circuits course.

Create a glossary of terms for the most common terms
used in an undergraduate circuits course.  For each
term place the term name in a level four Markdown header.
Place the definition of the term in the body test.

For each term, make sure the definition is precise, concise, distinct,
and non-circular.

After the term, generate a new paragraph that has an example of how that term might
be used in a circuits course.  Start the example with **Example:** but do
not put a newline after the **Example:**.

Return the list of terms in alphabetical order.
```