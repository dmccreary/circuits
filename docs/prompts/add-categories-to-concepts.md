# Add Categories to Concepts

## Prompt

```
Attached are two files.  The first file named "concept-graph.csv"  is a list of concepts in a circuits class.  The second file is called "concept-taxonomy.csv.  It has 10 categories and it also includes a list of the concepts in that category

I would like you to create a Python program that goes through each concept line in the first file and added two columns - the category ID and the category name for that concept.

You will find metadata in the first row of each spreadsheet.
```

## File Header Viewer

```py
import pandas as pd

# Load the two CSV files
# TODO: change this to use a relative path ../../data/FILENAME for better portability
concept_graph_path = '/Users/danmccreary/Documents/ws/circuits/data/concept-graph.csv'
concept_taxonomy_path = '/Users/danmccreary/Documents/ws/circuits/data/concept-taxonomy.csv'

# Read the concept graph and concept taxonomy files
concept_graph_df = pd.read_csv(concept_graph_path)
concept_taxonomy_df = pd.read_csv(concept_taxonomy_path)

# Display the first few rows of each dataframe to understand the structure
print("Concept Graph Nodes and Edges:")
print(concept_graph_df.head())
print("")
print("Concept Taxonomy:")
print(concept_taxonomy_df.head())
```

## Add Categories to Concepts

```py
import pandas as pd

# Load the two CSV files
# TODO - make these relative paths like ../../data/FILENAME
concept_graph_path = '/Users/danmccreary/Documents/ws/circuits/data/concept-graph.csv'
concept_taxonomy_path = '/Users/danmccreary/Documents/ws/circuits/data/concept-taxonomy.csv'

# Read the concept graph and concept taxonomy files
concept_graph_df = pd.read_csv(concept_graph_path)
concept_taxonomy_df = pd.read_csv(concept_taxonomy_path)

# Create a dictionary mapping concept to its category ID and name
concept_to_category = {}

# Iterate over the taxonomy dataframe and map each concept to its category
for _, row in concept_taxonomy_df.iterrows():
    category_id = row['CategoryID']
    category_label = row['CategoryLabel']
    concepts = row['Concepts'].split('|')
    for concept in concepts:
        concept_to_category[concept.strip()] = (category_id, category_label)

# Now we will add the category ID and label to the concept graph dataframe
concept_graph_df['CategoryID'] = concept_graph_df['ConceptName'].map(lambda x: concept_to_category.get(x, (None, None))[0])
concept_graph_df['CategoryLabel'] = concept_graph_df['ConceptName'].map(lambda x: concept_to_category.get(x, (None, None))[1])

# Save the updated dataframe to a new CSV file
output_path = 'updated_concept_graph.csv'
concept_graph_df.to_csv(output_path, index=False)

print(f"Updated concept graph saved to {output_path}")
```

## Result of Merge

```
```