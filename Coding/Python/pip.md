[Back](index.md)

# pip

## Install on Mac

```python
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python3 get-pip.py
```

### pip Not on Path

- If you receive this warning:

```
WARNING: The scripts pip, pip3 and pip3.7 are installed in '/Users/USERNAME/Library/Python/3.7/bin' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
  NOTE: The current PATH contains path(s) starting with `~`, which may not be expanded by all applications.
```

- Open the `.bash_profile` file:

```bash
touch ~/.bash_profile && sudo nano ~/.bash_profile
```

- Add the following line:

```bash
export..PATH="pipPathGoesHere:$PATH"
```

- Force execution of `.bash_profile`

```bash
source ~/.bash_profile
```

- Now, running the following command should reveal your updated `$PATH`

```bash
echo $PATH
```