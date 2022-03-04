var url = window.location.pathname;
var id = url.substring(url.lastIndexOf('/') + 1);
var campus = getCookie("activeCampusNaam");

const client = new Paho.MQTT.Client("ws://188.166.43.149:9001/mqtt", "myClientId" + new Date().getTime());

client.connect({ onSuccess: onConnect })
let counter = 0
function onConnect() {
  console.log("connection successful")
  client.subscribe("+/+/+")
  client.subscribe("new/+")   //subscribe to our topic
  setInterval(()=>{
},500)} 

const publish = (topic, msg) => {  //takes topic and message string
  let message = new Paho.MQTT.Message(msg);
  message.destinationName = topic;
  client.send(message);
}

client.onMessageArrived = onMessageArrived;

function add(){
  if (document.getElementById("sensorNaam").classList.contains('ng-valid') && document.getElementById("choose_sensor").classList.contains('ng-valid')){
    console.log("valid");
    var e = document.getElementById("choose_sensor");
    var sensor = e.value;
    var lokaal = document.getElementById("sensorNaam").value;
    var message = new Paho.MQTT.Message(JSON.stringify({"value": false, "key": "new", "lokaal": lokaal, "campus": campus}));
    message.retained = true;
    message.destinationName = "new/" + sensor;
    client.send(message);
    message = new Paho.MQTT.Message(JSON.stringify({"value": false, "key": "new"}));
    message.retained = true;
    message.destinationName = campus + "/" + lokaal + "/new";
    client.send(message);
  }else{
    console.log("invalid")
  }
}

function changeCampus(){
  var name = document.getElementById("name_campus").value;
  var messageFlag = new Paho.MQTT.Message(JSON.stringify({"key": "name", "name": name}));
  messageFlag.destinationName = name + "/changename";
  messageFlag.retained = true;
  client.send(messageFlag);
  var message = new Paho.MQTT.Message(JSON.stringify({"key": "name", "name": name}));
  message.destinationName = campus + "/changename";
  message.retained = true;
  client.send(message);
}

function threshold(){
  if (document.getElementById("maxGreen").classList.contains('ng-valid') && document.getElementById("maxOrange").classList.contains('ng-valid')){
    if (document.getElementById("maxGreen").value <= document.getElementById("maxOrange").value){
      var warning = document.getElementById("maxGreen").value;
      var critical = document.getElementById("maxOrange").value;
      var message = new Paho.MQTT.Message(JSON.stringify({"key": "threshold", "warning": warning, "critical": critical}));
      message.destinationName = campus + "/threshold" ;
      message.retained = true;
      client.send(message);

      window.location.reload();
      const background = document.getElementsByClassName("threshold");
      const waardes = document.getElementsByClassName("threshold_text");

      for (let i = 0; i < waardes.length; i++) {
        if(waardes[i].value > critical){
          background[i].classList.remove("bg-green-500");
          background[i].classList.remove("bg-orange-500");
          background[i].classList.remove("bg-red-500");
          background[i].classList.remove("bg-gray-400");
          background[i].classList.add("bg-red-500");
        }else if(collection[i].value > warning){
          background[i].classList.remove("bg-green-500");
          background[i].classList.remove("bg-orange-500");
          background[i].classList.remove("bg-red-500");
          background[i].classList.remove("bg-gray-400");
          background[i].classList.add("bg-orange-500");
        }else{
          background[i].classList.remove("bg-green-500");
          background[i].classList.remove("bg-orange-500");
          background[i].classList.remove("bg-red-500");
          background[i].classList.remove("bg-gray-400");
          background[i].classList.add("bg-green-500");
        }
      }
    }
  }
}

function onMessageArrived(message) {
  let jsonMessage = JSON.parse(message.payloadString);
  if (message.destinationName.substring(0,3) === "new"){
    var idString = message.destinationName.substring(4);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8080/wolkjes/sensor/", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({
          sensor_id: idString,
          lokaal_id: null,
          new: true,
          id: null
       }));
  }else if(message.destinationName.split("/")[2] === "offline" && jsonMessage.key == "offline"){
    let destination = message.destinationName.split("/")[1]
    let co2P = document.getElementById(destination);
    if (co2P !== null){
      co2P.textContent = "Sensor is offline😢";
      let color = document.getElementById(destination+"color");
      color.classList.remove("bg-green-500");
      color.classList.remove("bg-orange-500");
      color.classList.remove("bg-red-500");
      color.classList.remove("bg-gray-400");
      color.classList.add("bg-gray-400");
    }
  }else{
    let sensor_id = jsonMessage.sensor_id;
    let variable = message.destinationName.split("/")[2]
    if (message.destinationName.split("/")[0] === campus){
      if  (variable === "co2"){
        let co2 = jsonMessage.value;
        let destination = message.destinationName.split("/")[1]
        let co2P = document.getElementById(destination);
        let co2IndiP = document.getElementById("co2P");
        let critical = jsonMessage.critical;
        let warning = jsonMessage.warning;   
        if (co2P !== null){
          co2P.textContent = jsonMessage.value;
          let color = document.getElementById(destination+"color");
          if(co2 > critical){
            color.classList.remove("bg-green-500");
            color.classList.remove("bg-orange-500");
            color.classList.remove("bg-red-500");
            color.classList.remove("bg-gray-400");
            color.classList.add("bg-red-500");
          }else if(co2 > warning){
            color.classList.remove("bg-green-500");
            color.classList.remove("bg-orange-500");
            color.classList.remove("bg-red-500");
            color.classList.remove("bg-gray-400");
            color.classList.add("bg-orange-500");
          }else{
            color.classList.remove("bg-green-500");
            color.classList.remove("bg-orange-500");
            color.classList.remove("bg-red-500");
            color.classList.remove("bg-gray-400");
            color.classList.add("bg-green-500");
          }
        }else if(sensor_id === id ){
          if(co2IndiP !== null){
            co2IndiP.textContent = jsonMessage.value + " PPM";
            if (jsonMessage.value > critical){
              co2IndiP.classList.add("text-red-500");
              co2IndiP.classList.remove("text-orange-500");
              co2IndiP.classList.remove("text-green-500");
            }else if(co2 > warning){
              co2IndiP.classList.remove("text-green-500");
              co2IndiP.classList.remove("text-orange-500");
              co2IndiP.classList.add("text-orange-500");
            }else{
              co2IndiP.classList.remove("text-orange-500");
              co2IndiP.classList.remove("text-red-500");
              co2IndiP.classList.add("text-green-500");
            }
    
          }
        }
      }else if(variable === "hum" && sensor_id === id){
        let humIndiP = document.getElementById("humidityP");
        if (humIndiP !== null){
          humIndiP.textContent = parseFloat(jsonMessage.value).toFixed(2) + " %H";
        }
          
      }else if (variable === "temp" && sensor_id === id){
        let tempIndiP = document.getElementById("temperatuurP");
        tempIndiP.textContent = parseFloat(jsonMessage.value).toFixed(2) + " °C";
      }
    }
  }
}

client.onConnectionLost = onConnectionLost;

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
  client.connect({ onSuccess: onConnect });
}


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function sendVentilatie(){
  let groen = document.getElementById("groen").value;
  let oranje = document.getElementById("oranje").value;
  let rood = document.getElementById("rood").value;
  console.log(campus)

  var message = new Paho.MQTT.Message(JSON.stringify({"goed": groen, "minder": oranje, "slecht": rood}));
  message.destinationName = campus + "/ventilatie/waardes";
  message.retained = true;
  client.send(message);
  window.location.reload();
}