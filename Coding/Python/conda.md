[Back](index.md)
<script src="../../script.js"></script>

# Installing `miniconda`
`miniconda` is a stripped-down version of `Anaconda` that relies only on terminal commands (on Mac, use the `zsh` terminal). It can be installed with a bash file or a `.pkg` file from [their website](https://docs.conda.io/en/latest/miniconda.html).

# Update Miniconda
Run the following terminal command to update `miniconda`:
```bash
conda update -n base -c defaults conda
```

# Conda Environments
The `zsh` command `conda` can be used to activate or create environments that serve to contain specific `python` and package versions. By default, it activates the `base` environment.

## Create an Environment
To create an environment, run the following command:
- New environment name: <input class="name" placeholder="newEnvironment" onkeyup="renderInput('name')">
<pre>
conda create --name <span class="name">newEnvironment</span>
</pre>

## Activate an Environment
To create an environment, run the following command:
<pre>
conda activate <span class="name">newEnvironment</span>
</pre>

## Install Python
```bash
conda install python=3.10.0
```

## Install Python Package
```bash
pip install numpy
```

## Export an Environment
<pre>
conda <span class="name">newEnvironment</span> export > <span class="name">newEnvironment</span>.yml
</pre>

## Import an Environment
<pre>
conda create -f <span class="name">newEnvironment</span>.yml
</pre>