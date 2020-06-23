var rainbowEnable = false;
var connection = new WebSocket('ws://' + location.hostname + ':81/', ['arduino']);
connection.onopen = function () {
  connection.send('Connect ' + new Date());
};
connection.onerror = function (error) {
  console.log('WebSocket Error ', error);
};
connection.onmessage = function (e) {
  console.log('Server: ', e.data);
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