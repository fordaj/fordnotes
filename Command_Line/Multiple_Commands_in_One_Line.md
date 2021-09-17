[Back](index.md)

# Multiple Commands in One Line

## Linux and Mac
- Run multiple commands: `;` separator
```bash
command1 ; command2 ; command3
```
- Run multiple commands IF previous succeeds: `&&` separator
```bash
command1 && command2 && command3
```
- Run multiple commands IF previous fails: `||` separator
```bash
command1 || command2 || command3
```