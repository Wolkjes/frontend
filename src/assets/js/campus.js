var url = window.location.pathname;
var id = url.substring(url.lastIndexOf('/') + 1);


const client = new Paho.MQTT.Client("ws://188.166.43.149:9001/mqtt", "myClientId" + new Date().getTime());

client.connect({ onSuccess: onConnect })
let counter = 0
function onConnect() {
  console.log("connection successful")
  client.subscribe("+/+")
  client.subscribe("new/+")   //subscribe to our topic
  setInterval(()=>{
},5000)} 

const publish = (topic, msg) => {  //takes topic and message string
  let message = new Paho.MQTT.Message(msg);
  message.destinationName = topic;
  client.send(message);
}

client.onMessageArrived = onMessageArrived;

function add(){
  var e = document.getElementById("choose_sensor");
  var sensor = e.value;
  var lokaal = document.getElementById("sensorNaam").value;
  console.log(sensor);
  var message = new Paho.MQTT.Message(JSON.stringify({"value": false, "key": "new", "lokaal": lokaal}));
  message.destinationName = "new/" + sensor;
  client.send(message);
}

function onMessageArrived(message) {
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
  }else{
    let jsonMessage = JSON.parse(message.payloadString);
    let sensor_id = jsonMessage.sensor_id;
    if  (jsonMessage.variable === "CO2"){
      let co2 = jsonMessage.value;
      let destination = message.destinationName.split("/")[0]
      let co2P = document.getElementById(destination);
      let co2IndiP = document.getElementById("co2P");      
      if (co2P !== null){
        co2P.textContent = jsonMessage.value;
        let color = document.getElementById(destination+"color");
        if(co2 > 800){
          color.classList.add("bg-red-500");
          color.classList.remove("bg-orange-500");
          color.classList.remove("bg-green-500");
          color.classList.remove("bg-gray-400")
        }else if(co2 > 700){
            color.classList.add("bg-orange-500");
            color.classList.remove("bg-red-500");
            color.classList.remove("bg-green-500");
          color.classList.remove("bg-gray-400")
            
        }else{
            color.classList.add("bg-green-500");
            color.classList.remove("bg-orange-500");
            color.classList.remove("bg-red-500");
          color.classList.remove("bg-gray-400")
        }

      }else if(sensor_id === id ){
        if(co2IndiP !== null){
          co2IndiP.textContent = jsonMessage.value + " PPM";
         
          if (jsonMessage.value > 800){
            co2IndiP.classList.add("text-red-500");
            co2IndiP.classList.remove("text-orange-500");
            co2IndiP.classList.remove("text-green-500");
          }else if(co2 > 700){
            co2IndiP.classList.add("text-orange-500");
            co2IndiP.classList.remove("text-red-500");
            co2IndiP.classList.remove("text-green-500");
          }else{
            co2IndiP.classList.add("text-green-500");
            co2IndiP.classList.remove("text-orange-500");
            co2IndiP.classList.remove("text-red-500");
          }
        }
      }
    }else if(jsonMessage.variable === "humidity" && sensor_id === id){
      let humIndiP = document.getElementById("humidityP");
      if (humIndiP !== null){
        humIndiP.textContent = parseFloat(jsonMessage.value).toFixed(2) + " %H";
      }
      
    }else if (jsonMessage.variable === "temperature" && sensor_id === id){
      let tempIndiP = document.getElementById("temperatuurP");
      tempIndiP.textContent = parseFloat(jsonMessage.value).toFixed(2) + " °C";
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