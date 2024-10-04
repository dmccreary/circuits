import pandas as pd

# Load the two CSV files
concept_graph_path = '/Users/danmccreary/Documents/ws/circuits/data/concept-graph.csv'
concept_taxonomy_path = '/Users/danmccreary/Documents/ws/circuits/data/concept-taxonomy.csv'

# Read the concept graph and concept taxonomy files
concept_graph_df = pd.read_csv(concept_graph_path)
concept_taxonomy_df = pd.read_csv(concept_taxonomy_path)

# Display the first few rows of each dataframe to understand the structure
print("Concept Graph Nodes and Edges")
print(concept_graph_df.head())
print("Concept Taxonomy")
print(concept_taxonomy_df.head())
