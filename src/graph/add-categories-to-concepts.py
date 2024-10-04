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
    category_id = int(row['CategoryID'])  # Ensure CategoryID is an integer
    category_label = row['CategoryLabel']
    concepts = row['Concepts'].split('|')
    for concept in concepts:
        concept_to_category[concept.strip()] = (category_id, category_label)

# Now we will add the category ID and label to the concept graph dataframe
concept_graph_df['CategoryID'] = concept_graph_df['ConceptName'].map(lambda x: concept_to_category.get(x, (None, None))[0])
concept_graph_df['CategoryLabel'] = concept_graph_df['ConceptName'].map(lambda x: concept_to_category.get(x, (None, None))[1])

# Fill missing CategoryID with 0 or drop rows with NaN CategoryID if desired
concept_graph_df['CategoryID'] = concept_graph_df['CategoryID'].fillna(0).astype(int)  # Default to 0 if missing, or drop rows with NaN

# Save the updated dataframe to a new CSV file
output_path = 'updated_concept_graph.csv'
concept_graph_df.to_csv(output_path, index=False)

print(f"Updated concept graph saved to {output_path}")
