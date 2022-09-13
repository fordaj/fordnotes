[Back](index.md)
<script src="../script.js"></script>

 # SSH

 ## Definitions

- **Client**: The PC you're typing on.
- **Host**: The PC you're connecting to.
- Every `ssh` key should have a password. If someone steals your `ssh` file, that should not give them access to all other PCs you can `ssh` into.

 ## Generate Key Pair on Client

- The client should hold both keys
- The public key is the only key allowed to be shared with

Key Type: <input class="key_type" placeholder="RSA" onkeyup="renderInput('key_type')">

Number of Bits: <input class="key_bits" placeholder="4096" onkeyup="renderInput('key_bits')">

Comment: <input class="key_comment" placeholder="myEmail@domain.com" onkeyup="renderInput('key_comment')">

Location: <input class="key_location" placeholder="~/.ssh/key_name" onkeyup="renderInput('key_location')">

Password: <input class="password" placeholder="password" onkeyup="renderInput('password')">

<pre>
ssh-keygen -t <span class="key_type">RSA</span> -b <span class="key_bits">4096</span> -C "<span class="key_comment">myEmail@domain.com</span>" -f <span class="key_location">~/.ssh/key_name</span> -N <span class="password">password</span>
</pre>

## Add Key to `ssh-agent`
### Windows 10
1. Open `Git Bash`

2. Start the `git` `ssh-agent`
```
eval $(ssh-agent)
```

3. Add key to ssh credentials
```
ssh-add key_name
```

4. To force `git` on Windows to use the OpenSSH command, configure it with a git command in PowerShell as admin:
```
git config --global core.sshCommand C:/Windows/System32/OpenSSH/ssh.exe
```

 ## Keychain Manager

Add the following to the bottom of your `~/.ssh/config` file:

```yaml
Host *
  AddKeysToAgent yes
  UseKeychain yes
```

 ## Setup Windows 10 for Incoming SSH Connections

1. Open `Windows PowerShell` as an administrator
2. Install `OpenSSH.Server`

```powershell
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

3. Start the `SSHD` service (and verify it is running)

```powershell
Start-Service sshd
```

```powershell
Get-Service sshd
```

4. Set the `SSHD` service to run automatically on startup

```powershell
Set-Service ssh-agent -StartupType Automatic
```

5. Add a key to the `SSHD` service

```bash
ssh-add C:\Users\USERNAME\ssh\id_rsa
```

 ## Copy Public Key from Another PC

1. Run `ssh-copy-id` with the following format:

    Location: <input class="copy_location" placeholder="~/.ssh/key_name" onkeyup="renderInput('copy_location')">

    Destination: <input class="copy_destination" placeholder="user@host" onkeyup="renderInput('copy_destination')">
<pre>
ssh-copy-id -i <span class="copy_location">~/.ssh/key_name</span> <span class="copy_destination">user@host</span>
</pre>