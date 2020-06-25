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

Erik, PA0ESH
erik @ pa0esh dot com


