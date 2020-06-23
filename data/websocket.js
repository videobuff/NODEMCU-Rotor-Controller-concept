var rainbowEnable = false;
var status= "";

var heartbeat_msg = '--heartbeat--', heartbeat_interval = null, missed_heartbeats = 0;
var connection = new WebSocket('ws://' + location.hostname + ':81/', ['arduino']);
connection.onopen = function () {
connection.send('Connect ' + new Date());

  if (heartbeat_interval === null) {
        missed_heartbeats = 0;
        heartbeat_interval = setInterval(function() {
            try {
                missed_heartbeats++;
                if (missed_heartbeats >= 5)
                    throw new Error("Too many missed heartbeats.");
                WebSocket.send(heartbeat_msg);
            } catch(e) {
                clearInterval(heartbeat_interval);
                heartbeat_interval = null;
                console.warn("Closing connection. Reason: " + e.message);
                //WebSocket.close();
            }
        }, 5000);
    }
  
  
  
};
connection.onerror = function (error) {
  console.log('WebSocket Error ', error);
};


connection.onmessage = function (e) {
    console.log('Server: ', e.data);
    if (e.data === heartbeat_msg) {
        // reset the counter for missed heartbeats
        missed_heartbeats = 0;
      // led blink function
      status = document.getElementById('blink').src;
      var parts = status.split('/');
      var answer = parts[parts.length - 1];
      //console.log("led status is :"+answer)
      if (answer === "pic_bulbon.gif") {
        document.getElementById('blink').src = "pic_bulboff.gif";
      //  console.log("led switched to OFF:"+document.getElementById('blink').src )
      } else {
        document.getElementById('blink').src = "pic_bulbon.gif";
      //  console.log("led switched to ON:"+document.getElementById('blink').src )
      }
    }
 
};

connection.onclose = function () {
  console.log('WebSocket connection closed');
};

function sendSwitch (){
var sw_ccw = document.getElementById("button_ccw").innerHTML; 
sw_ccw = "CCW:"+sw_ccw;
connection.send(sw_ccw); 
var sw_cw = document.getElementById("button_cw").innerHTML; 
sw_cw = "CW:"+sw_cw;
connection.send(sw_cw); 
console.log("Switch message send !"+sw_cw+" - "+sw_ccw);
}

function sendRGB () {
  var r = document.getElementById('r').value** 2 / 1023;
  var g = document.getElementById('g').value** 2 / 1023;
  var b = document.getElementById('b').value** 2 / 1023;

  var rgb = r << 20 | g << 10 | b;
  var rgbstr = '#' + rgb.toString(16);
  console.log('RGB: ' + rgbstr);
  connection.send(rgbstr);
}

function rainbowEffect () {
  rainbowEnable = ! rainbowEnable;
  if (rainbowEnable) {
    connection.send("R");
    document.getElementById('rainbow').style.backgroundColor = '#00878F';
    document.getElementById('r').className = 'disabled';
    document.getElementById('g').className = 'disabled';
    document.getElementById('b').className = 'disabled';
    document.getElementById('r').disabled = true;
    document.getElementById('g').disabled = true;
    document.getElementById('b').disabled = true;
  } else {
    connection.send("N");
    document.getElementById('rainbow').style.backgroundColor = '#999';
    document.getElementById('r').className = 'enabled';
    document.getElementById('g').className = 'enabled';
    document.getElementById('b').className = 'enabled';
    document.getElementById('r').disabled = false;
    document.getElementById('g').disabled = false;
    document.getElementById('b').disabled = false;
    sendRGB();
  }
}