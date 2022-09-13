[Back](index.md)

# Setup

> Tested on Ubuntu 20.04.2.0 64-bit.

```
sudo apt update && sudo apt upgrade
```

## Install relevant packages
``` 
sudo apt install git make build-essential libncurses5-dev flex bison gperf pip
```

## Symlink `python` to `python3`
```
sudo ln -s /usr/bin/python3 /usr/bin/python
```





### Grant permission to TTY devices
- Note: Restart required
```
sudo usermod -a -G tty $USER
sudo adduser $USER dialout
```

## Add paths
Add the following lines to the `~/.bashrc` file:
```
export IDF_PATH=~/esp/ESP8266_RTOS_SDK
export PATH=~/esp/xtensa-lx106-elf-gcc8_4_0-esp-2020r3-linux-amd64/xtensa-lx106-elf/bin:$PATH
```

## Clone into repo

- The directory `esp` name is referenced by other files and paths.

```
mkdir ~/esp && cd ~/esp
```

```
git clone https://github.com/espressif/ESP8266_RTOS_SDK.git
```

```
cd ~/esp/ESP8266_RTOS_SDK/examples/get-started/hello_world/
```

## Add xtensa toolchain to directory
- Download from the README.md link [here](https://github.com/espressif/ESP8266_RTOS_SDK)
- Extract to `~/esp`

## Install pip packages

```
/usr/bin/python -m pip install --user -r /home/andrewford/esp/ESP8266_RTOS_SDK/requirements.txt
```

# Compile and Flash
- Configure as needed using the GUI
```
make menuconfig
```
- Compile
```
make all
```
- Flash to board (remember to plug in board if not done already)
```
make flash
```
- View console output from ESP8266 (exit with `CTRL`+`]`)
```
make monitor
```