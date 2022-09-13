[Back](index.md)

# Raspbian

## Setup remote login

1. Write OS to micro SD card using “Raspberry Pi Imager”
2. Copy [ssh](ssh) and [wpa_supplicant.conf](wpa_supplicant.conf) into the root folder on the new drive “boot”
3. Insert micro SD card into pi, plug in and power on
4. After a few minutes, the Pi will connect to WiFi, assuming the two files were properly configured
5. Note the IP address of the Pi from your router
6. SSH into the Pi from the client, and login with password “raspberry”

```
ssh pi@IPADDRESS
```

7. Change the Pi’s password

```
passwd
```

8. Change the Pi’s HOSTNAME in the configuration tool

```
sudo raspi-config
```

9. Exit the menu, and reboot when asked. Run an OS update:

```
sudo apt-get update
sudo apt-get upgrade
```

## Change username from “pi” to “NEWUSER”

1. Change the root password

```
sudo passwd root
```

2. Allow remote logins to “root” user by adding “PermitRootLogin yes” to sshd_config

```
sudo nano /etc/ssh/sshd_config
...
PermitRootLogin yes
```

3. Restart ssh service and logout

```
sudo service ssh restart
logout
```

4. Log into root from client

```
ssh root@hostname
```

5. Kill all processes run by user “pi”, and subsequently change “pi” to “NEWUSER”

```
sudo killall -u pi && usermod -l NEWUSER pi
```

6. Change home directory name from “pi” to “NEWUSER”

```
usermod -m -d /home/NEWUSER NEWUSER
```

7. Change groupname from “pi” to “NEWUSER” and logout

```
groupmod -n NEWUSER pi
logout
```

8. Lock password and disable remote logins to root

```
sudo passwd -l root
sudo nano /etc/ssh/sshd_config
...
#PermitRootLogin prohibit-password
```

9. Restart ssh service

```
sudo service ssh restart
```

## Password, SSH keys, Hostnames

1. Change password

```
passwd
```

2. Change the hostname from “raspberrypi” to HOSTNAME

```
sudo nano /etc/hostname
sudo nano /etc/hosts
```

3. Generate key pair. Save in a file you’ll know the name of (ex. /home/NEWUSER/.ssh/myLaptop), and if you prefer, enter a passphrase

```
ssh-keygen
```

4. Logout, and then copy the host key to the client

```
logout
...
ssh-copy-id NEWUSER@HOSTNAME
```

5. Reboot the pi

```
ssh NEWUSER@HOSTNAME
...
sudo reboot
```