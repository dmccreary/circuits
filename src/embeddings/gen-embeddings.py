import json
import numpy as np
from sentence_transformers import SentenceTransformer
from typing import List, Dict, Any
import os

def load_circuits_data(file_path: str) -> List[Dict[str, Any]]:
    """Load the circuits data from JSON file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            return data['circuits']
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return []
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in file '{file_path}'.")
        return []

def create_circuit_text(circuit: Dict[str, Any]) -> str:
    """Create a comprehensive text representation of a circuit for embedding."""
    text_parts = []
    
    # Add circuit name
    if 'name' in circuit:
        text_parts.append(f"Circuit: {circuit['name']}")
    
    # Add category
    if 'category' in circuit:
        text_parts.append(f"Category: {circuit['category']}")
    
    # Add description
    if 'description' in circuit:
        text_parts.append(f"Description: {circuit['description']}")
    
    # Add circuit type
    if 'circuit_type' in circuit:
        text_parts.append(f"Circuit Type: {circuit['circuit_type']}")
    
    # Add type of circuit
    if 'type_of_circuit' in circuit:
        text_parts.append(f"Type: {circuit['type_of_circuit']}")
    
    # Add components
    if 'components' in circuit and circuit['components']:
        components_str = ', '.join(circuit['components'])
        text_parts.append(f"Components: {components_str}")
    
    # Add solutions/applications
    if 'solutions' in circuit and circuit['solutions']:
        solutions_str = ', '.join(circuit['solutions'])
        text_parts.append(f"Applications: {solutions_str}")
    
    return '. '.join(text_parts)

def generate_embeddings(circuits: List[Dict[str, Any]], model_name: str = 'all-MiniLM-L6-v2') -> List[Dict[str, Any]]:
    """Generate embeddings for all circuits."""
    print(f"Loading embedding model: {model_name}")
    model = SentenceTransformer(model_name)
    
    circuit_embeddings = []
    
    print("Generating embeddings...")
    for i, circuit in enumerate(circuits):
        circuit_id = circuit.get('circuit_id')
        if circuit_id is None:
            print(f"Warning: Circuit at index {i} has no circuit_id, skipping.")
            continue
        
        # Create text representation
        circuit_text = create_circuit_text(circuit)
        
        # Generate embedding
        embedding = model.encode(circuit_text)
        
        # Convert numpy array to list for JSON serialization
        embedding_list = embedding.tolist()
        
        circuit_embeddings.append({
            'circuit_id': circuit_id,
            'embedding': embedding_list
        })
        
        if (i + 1) % 10 == 0:
            print(f"Processed {i + 1}/{len(circuits)} circuits")
    
    print(f"Generated embeddings for {len(circuit_embeddings)} circuits")
    return circuit_embeddings

def save_embeddings(embeddings: List[Dict[str, Any]], output_file: str):
    """Save embeddings to JSON file."""
    output_data = {
        'metadata': {
            'total_circuits': len(embeddings),
            'embedding_model': 'all-MiniLM-L6-v2',
            'embedding_dimension': len(embeddings[0]['embedding']) if embeddings else 0
        },
        'circuit_embeddings': embeddings
    }
    
    try:
        with open(output_file, 'w', encoding='utf-8') as file:
            json.dump(output_data, file, indent=2)
        print(f"Embeddings saved to '{output_file}'")
    except Exception as e:
        print(f"Error saving embeddings: {e}")

def main():
    """Main function to process circuits and generate embeddings."""
    input_file = '../../data/top-100-circuits.json'
    output_file = 'circuit-embeddings.json'
    
    print("Circuit Embeddings Generator")
    print("=" * 40)
    
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file '{input_file}' not found.")
        print("Please ensure the top-100-circuits.json file is in the current directory.")
        return
    
    # Load circuits data
    print(f"Loading circuits from '{input_file}'...")
    circuits = load_circuits_data(input_file)
    
    if not circuits:
        print("No circuits loaded. Exiting.")
        return
    
    print(f"Loaded {len(circuits)} circuits")
    
    # Generate embeddings
    try:
        embeddings = generate_embeddings(circuits)
        
        if embeddings:
            # Save embeddings
            save_embeddings(embeddings, output_file)
            print("\nEmbedding generation completed successfully!")
            
            # Print some statistics
            if embeddings:
                embedding_dim = len(embeddings[0]['embedding'])
                print(f"\nStatistics:")
                print(f"- Total circuits processed: {len(embeddings)}")
                print(f"- Embedding dimension: {embedding_dim}")
                print(f"- Output file: {output_file}")
        else:
            print("No embeddings generated.")
            
    except Exception as e:
        print(f"Error during embedding generation: {e}")
        print("Make sure you have the required dependencies installed:")
        print("pip install sentence-transformers")

if __name__ == "__main__":
    main()
