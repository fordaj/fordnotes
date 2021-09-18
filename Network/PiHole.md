[Back](index.md)


# PiHole

Hide ads and organize your DHCP addresses with PiHole! 

1. Install PiHole

```
curl -sSL https://install.pi-hole.net | bash
```

2. Walk through the configuration. It is recommended to use CloudFlare as the DNS provider, and the static IP should be memorable (the first available on the router, for instance)

3. Set the admin password (doesn’t require that you know the old admin password)

```
pihole -a -p
```

4. In some routers (airport extreme) you must limit the DHCP to 2 entries, and then let PiHole serve the remaining devices within the specified address range. You should now be able to enter the PiHole’s IPv4 and v6 addresses as the DNS servers in your router.