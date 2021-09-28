[Back](index.md)

# .DS_Store
Ignore all `.DS_Store` files.
```bash
**/.DS_Store
```
```bash
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
```
