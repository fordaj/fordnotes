[Back](index.md)

# PyPi

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