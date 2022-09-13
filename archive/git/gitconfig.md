[Back](index.md)

# .gitconfig
Some git applications rely on a legacy setting which limits the number of characters in a file path to 256. In order to increase this to 4096, open your `.gitconfig` file with your preferred text editor.
- `C:\Users\[yourname]\.gitconfig`
- Add the following to the bottom of your opened file:
```bash
[core]
	longpaths = true
```