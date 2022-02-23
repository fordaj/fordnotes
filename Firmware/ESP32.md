[Back](index.md)

# Add ESP32 Library to Arduino IDE
Followed along [this website](https://microcontrollerslab.com/install-esp32-arduino-ide/)

1. File > Preferences

2. Click the icon next to the "Additional Boards Manager URLs" field

3. Paste the following URL as a new addition to the window that pops up
https://dl.espressif.com/dl/package_esp32_index.json

4. Close out of all prompts by clicking "Ok"

5. Tools > Board: [selected board here] > Boards Manager...

6. Search `esp32` and install

    *Installed 1.0.6 on Windows 10*

7. Close out of Boards manager

8. Tools > Board: [selected board here] > ESP32 Dev Module

9. Tools > Port: [selected port here] > `Select your COM port that the ESP32 is plugged into`
    - Windows: With device unplugged, open device manager. Dropdown "Ports (COM & LPT)". Plug in the device, and see which COM port shows up.

10. File > Examples > WiFi > WiFiScan

11. Clicking "Verify" should result in the Sketch compiling with no issues

12. Clicking 