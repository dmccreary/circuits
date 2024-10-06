"""
ChatGPT Prompt
I have a list of 100 questions frequently asked in an
undergraduate course on circuits. I want to create a
2-D plot that groups similar questions by creating
embeddings for each question. I also have access to a
GPU that is running ollama and has the llama 3.2 model
available. Can you suggest a Python program that will
take the input file of questions separated by newlines
and outputs a 2D plot grouping similar questions together?

o1-mini response below
"""

import subprocess
import json
import time
import sys
import os
from typing import List
import umap
import matplotlib.pyplot as plt
import seaborn as sns

def read_questions(file_path: str) -> List[str]:
    """
    Reads questions from a file, each separated by a newline.
    """
    if not os.path.isfile(file_path):
        print(f"Error: File '{file_path}' does not exist.")
        sys.exit(1)

    with open(file_path, 'r', encoding='utf-8') as file:
        questions = [line.strip() for line in file if line.strip()]
    return questions

def get_embedding(question: str) -> List[float]:
    """
    Gets the embedding for a single question using Ollama's CLI.
    """
    try:
        # Call the Ollama CLI to get the embedding
        result = subprocess.run(
            ['ollama', 'embeddings', 'mxbai-embed-large', question],
            capture_output=True,
            text=True,
            check=True
        )
        # Parse the JSON output
        output = json.loads(result.stdout)
        embedding = output.get('embedding')
        if embedding is None:
            print(f"Warning: No embedding found for question: {question}")
            return []
        return embedding
    except subprocess.CalledProcessError as e:
        print(f"Error generating embedding for question: {question}")
        print(e.stderr)
        return []
    except json.JSONDecodeError:
        print(f"Error decoding JSON for question: {question}")
        return []

def generate_embeddings(questions: List[str]) -> List[List[float]]:
    """
    Generates embeddings for a list of questions.
    """
    embeddings = []
    for idx, question in enumerate(questions, 1):
        print(f"Processing ({idx}/{len(questions)}): {question}")
        embedding = get_embedding(question)
        if embedding:
            embeddings.append(embedding)
        else:
            # Handle missing embeddings by appending a zero vector
            embedding_size = 768  # Assuming Llama's embedding size
            embeddings.append([0.0] * embedding_size)
        # Optional: Add a small delay to avoid overwhelming the CLI
        time.sleep(0.1)
    return embeddings

def reduce_dimensions(embeddings: List[List[float]]) -> List[List[float]]:
    """
    Reduces high-dimensional embeddings to 2D using UMAP.
    """
    reducer = umap.UMAP(n_neighbors=15, min_dist=0.1, metric='cosine', random_state=42)
    reduced = reducer.fit_transform(embeddings)
    return reduced.tolist()

def plot_embeddings(reduced_embeddings: List[List[float]], questions: List[str], output_file: str = "questions_plot.png"):
    """
    Plots the 2D embeddings with annotations.
    """
    plt.figure(figsize=(12, 8))
    sns.set(style="whitegrid")

    x = [point[0] for point in reduced_embeddings]
    y = [point[1] for point in reduced_embeddings]

    plt.scatter(x, y, s=100, color='skyblue', edgecolor='k')

    for i, question in enumerate(questions):
        plt.text(x[i]+0.5, y[i]+0.5, str(i+1), fontsize=9)

    plt.title("2D Visualization of Circuit Questions Embeddings", fontsize=16)
    plt.xlabel("UMAP Dimension 1")
    plt.ylabel("UMAP Dimension 2")
    plt.tight_layout()
    plt.savefig(output_file, dpi=300)
    plt.show()
    print(f"Plot saved as {output_file}")

def main():
    # Path to the input file containing questions
    input_file = "questions.txt"  # Replace with your file path

    # Step 1: Read questions from the file
    questions = read_questions(input_file)
    if not questions:
        print("No questions found in the input file.")
        sys.exit(1)
    print(f"Total questions loaded: {len(questions)}")

    # Step 2: Generate embeddings for each question
    print("Generating embeddings...")
    embeddings = generate_embeddings(questions)
    print("Embeddings generation completed.")

    # Step 3: Reduce embeddings to 2D
    print("Reducing dimensions...")
    reduced_embeddings = reduce_dimensions(embeddings)
    print("Dimensionality reduction completed.")

    # Step 4: Plot the embeddings
    print("Plotting embeddings...")
    plot_embeddings(reduced_embeddings, questions)

if __name__ == "__main__":
    main()