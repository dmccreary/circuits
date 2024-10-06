# Steps for Generating a Question Frequency Plot

## Create a Conda Machine Learning ENV and load the libraries

```sh
conda create -n "ml" python=3
conda activate ml
pip install matplotlib seaborn umap-learn
pip install ollama chromadb
```

```sh
ollama pull mxbai-embed-large
```

![](../../docs/img/oolama-model-install.png)
