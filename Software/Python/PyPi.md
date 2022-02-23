[Back](index.md)

# PyPi

## Required Packages
```bash
pip install wheel 
&& pip install twine
&& rm -rf build
&& rm -rf dist
&& python setup.py sdist bdist_wheel
```

## Build
```
```

## Add an API Token
For username/passwordless updates!
1. Navigate to [https://pypi.org/manage/account/token/](https://pypi.org/manage/account/token/)
2. Follow the prompts to create an API token per-project

## Create a .pypirc File

1. Create, set permissions for, and open the file `~/.pypirc`

```bash
touch ~/.pypirc && chmod 600 ~/.pypirc && sudo nano ~/.pypirc
```

2. Paste the following, changing `private-repository` to your project name, and `__token__` to your API key

```yaml
[distutils]
index-servers =
    private-repository

[private-repository]
repository = <private-repository URL>
username = __token__
password = pypi-__token__
```