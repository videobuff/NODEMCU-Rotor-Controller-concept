var rainbowEnable = false;
var status = "";

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
    console.log('Server sended: ', e.data);

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
  
         // cinstruct the bearing value from the string received
        res = e.data.substr(0, 9);
        if (res == "Bearing :") {
        document.getElementById("display").innerHTML = "Rotor receiving bearing data";
        res = e.data.substr(9, 3);
        //console.log("This is bearing data: " + res + " degrees");
        
        gauge.value = res; 
        endstop = gauge.value;
        //gauge.animationduration + 50;
        gauge.animationDuration = 1500;
        gauge.draw();

        }
    
    // Read switch seetings on esp8266 and change the html accordingly
    switch(e.data) {
        case "6":
            console.log("Brake is switched to OFF");
            document.getElementById("button_brake").innerHTML = "BRAKE OFF";
               document.getElementById("button_brake").className = "btn btn-success custom1 btn-lg"; 
            
            button_cw.disabled = false;
            button_ccw.disabled = false;

             break;
        case "7":
            var cw_status;
            cw_status = document.getElementById("button_cw").innerHTML;
            if (cw_status == "CW ON"){
            console.log("CW switch is switched to OFF");
            }
            var ccw_status;
            ccw_status = document.getElementById("button_ccw").innerHTML;
            if (ccw_status == "CCW ON"){
            console.log("CCW switch is switched to OFF");
            }
            console.log("Brake is is switched to ON");    
            document.getElementById("button_cw").innerHTML = "CW OFF";
            document.getElementById("button_ccw").innerHTML = "CCW OFF";
            document.getElementById("button_brake").className = "btn btn-danger custom1 btn-lg"; 
            document.getElementById("button_brake").innerHTML = "BRAKE ON";
            button_cw.disabled = true;
            button_ccw.disabled = true;
            break;
 
 
        default:
            break;
    }
};

connection.onclose = function () {
  console.log('WebSocket connection closed');
};

function sendBrake() {
      var sw_brake = "Toggle Brake";
      connection.send(sw_brake); 
      console.log("BRAKE message send : "+sw_brake);
      sw_brake= "getBRAKEState";
      connection.send(sw_brake); 
      console.log("Get the brake state msg  : "+sw_brake);
  
}
function sendSwitch (){
      var sw_ccw = document.getElementById("button_ccw").innerHTML; 
      sw_ccw = "CCW:"+sw_ccw;
      connection.send(sw_ccw); 
      var sw_cw = document.getElementById("button_cw").innerHTML; 
      sw_cw = "CW:"+sw_cw;
      connection.send(sw_cw); 
      console.log("Switch message send !"+sw_cw+" - "+sw_ccw);
}
