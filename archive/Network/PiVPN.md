[Back](index.md)


# PiVPN

## Pre-Requisites

- Configure a static IP for the Pi
- Setup a [noip.com](http://noip.com) account

## Installation

1. Install PiVPN

```bash
curl -L https://install.pivpn.io | bash
```

2. Wireguard should be straightforward. Recommended setup is a free no-ip.com ddns, and it should piggyback off of PiHole for the DNS.
3. After reboot, add a user

```bash
pivpn -a
```

Show the QR code for mobile

```bash
pivpn -qr
```