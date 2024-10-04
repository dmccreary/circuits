# First, we need to map the concepts in the concept graph to the categories in the taxonomy
# Split the concepts in each category to create a mapping between the concept name and the category

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

# Display the updated dataframe
import ace_tools as tools; tools.display_dataframe_to_user(name="Updated Concept Graph", dataframe=concept_graph_df)
