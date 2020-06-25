## NodeMCU Rotor Controller

This project makes it possible to control an analogue rotor by means of a web interface.
In my case it is an old Kenpro KR400RC
Hardware required is a ESP8266 NodeMCU as well as some kind of relay board.
I use the HL-52S for CW and CCW operation
If you have a brake to operate, look for a three relay board or more.
The brake function is included and an active brake, disables the CW and CCW buttons.

The bulb in the menu indicates the heartbeat connection between webbrowser and esp8266. 
Make sure both are on the same network.
If so you can connect your browser with http://webrotor.local/

There is AP called webrotor with a password. Adapt the ketch to your own needs.
In the sketch the following pins are defined

- D4 = CW relay
- D5 = CCW relay
- D6 = Brake relay


Mind that the esp and the relay board are dfined such a way that an output High 
makes the relays switch OFF. This is due to the relay i used.

But it rattles during firmware uplaod and power on. WIP

Erik, PA0ESH
erik @ pa0esh dot com


