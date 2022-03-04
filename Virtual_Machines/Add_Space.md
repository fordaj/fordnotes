[Back](index.md)

# Adding Disk space to a VM
> There are 2 parts to consider when resizing disk space on a VM: the Host OS configuration and the Guest OS allocation.
1. Change the settings in VMWare/VirtualBox/etc. to reflect the desired disk space increase
2. Change the disk allocation inside of the VM to occupy the newly unallocated disk space
    - **Linux**: Use Gparted, which can be installed with:
    ```
    sudo apt install gparted
    ```
    - **MacOS**: Use Disk Utility, which is included with MacOS

# Reducing disk space in a VM
> Reverse everything from the section above.