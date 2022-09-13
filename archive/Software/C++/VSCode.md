[Back](index.md)

# VSCode

## Setup

### Windows 10
- Download [MinGW](https://nuwen.net/mingw.html) and install to `C:`
    - Note: while you can download the source code from [mingw-w64.org](http://mingw-w64.org/doku.php), it only contains source code. A third party, like that linked above, needs to package this source code for installation on Windows machines.
- Add the following User Path Environment variables:
```bash
C:\MinGW\bin
```
- Download and install [Visual Studio Code](https://code.visualstudio.com/)
- Install Coderunner extension
    - Note: In order to include header files in subdirectories, navigate to:
    Extensions > Coderunner > Settings > Executor Map > *Edit in settings.json* 
    and change

    ```json
    "cpp": "cd $dir && g++ $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
    ```

    to

    ```json
    "cpp": "cd $dir && g++ *.cpp -o $fileNameWithoutExt && $fileNameWithoutExt.exe",
    ```