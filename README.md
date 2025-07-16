<h1 align="center">PyAutark</h1>

<div align="center">
    An interactive, jupyter-friendly Urban Data visualizer based on Autark
</div>


## Installation

We recommend you to install PyAutark within an environment manager application, such as [conda](https://anaconda.org/anaconda/conda) or [uv](https://github.com/astral-sh/uv). See below for the installation steps:

First, create a conda environment with the following command:

```sh
conda create -n pyautark
```

So far, this package was only tested with python 3.12. You can define the python version by adding `python=3.12` to the command above. Once the environment is created, enter the environment and install PyAutark:

```sh
conda activate pyautark
pip install pyautark
```

## Development

For development purposes, you should install PyAutark in editable mode and allow the hotreloading of the JS bundle as written below.

```sh
pip install -e ".[dev]"
cd js
npm run dev
```

<!-- ```sh
pip install ipyutk
```

or with [uv](https://github.com/astral-sh/uv):

```sh
uv add ipyutk
```

## Development

We recommend using [uv](https://github.com/astral-sh/uv) for development.
It will automatically manage virtual environments and dependencies for you.

```sh
uv run jupyter lab example.ipynb
```

Alternatively, create and manage your own virtual environment:

```sh
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
jupyter lab example.ipynb
```

The widget front-end code bundles it's JavaScript dependencies. After setting up Python,
make sure to install these dependencies locally:

```sh
npm install
```

While developing, you can run the following in a separate terminal to automatically
rebuild JavaScript as you make changes:

```sh
npm run dev
```

Open `example.ipynb` in JupyterLab, VS Code, or your favorite editor
to start developing. Changes made in `js/` will be reflected
in the notebook. -->
