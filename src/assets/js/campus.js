const client = new Paho.MQTT.Client("ws://188.166.43.149:9001/mqtt", "myClientId" + new Date().getTime());

client.connect({ onSuccess: onConnect })
let counter = 0
function onConnect() {
  console.log("connection successful")
  client.subscribe("D0.27/co2")
  client.subscribe("D0.27/hum")
  client.subscribe("D0.27/temp")
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
  var e = document.getElementById("choose-sensor");
  var sensor = e.value;
  var lokaal = document.getElementById("name-sensor").value;
  console.log(lokaal);
  var message = new Paho.MQTT.Message(JSON.stringify({"value": false, "key": "new", "lokaal": lokaal}));
  message.destinationName = "new/" + sensor;
  client.send(message);
}

function onMessageArrived(message) {

  if (message.destinationName.substring(0,3) === "new"){

    console.log(message.payloadString);

    var x = document.getElementById("choose-sensor");
    if  (x !== null){
      var option = document.createElement("option");
      option.text = message.destinationName.substring(4);
      x.add(option);
      console.log(message.destinationName.substring(4));
    }
  }

    let jsonMessage = JSON.parse(message.payloadString);
    let id = jsonMessage.sensor_id;
    let co2 = jsonMessage.value;
    if  (jsonMessage.variable === "CO2"){
  
      let div = document.getElementById(id);
      if (div !== null){
        div.textContent = co2;
        let color = document.getElementById(id+"color");
        let title = document.getElementById(id+"naam");
        title.textContent = id;
    
        if(co2 > 900){
          color.classList.add("bg-red-500");
          color.classList.remove("bg-orange-500");
          color.classList.remove("bg-green-500");
        }else if(co2 > 700){
            color.classList.add('bg-orange-500');
            color.classList.remove("bg-red-500");
            color.classList.remove("bg-green-500");
        }else{
            color.classList.add("bg-green-500");
            color.classList.remove("bg-orange-500");
            color.classList.remove("bg-red-500");
        }
      }
    }

    if  (jsonMessage.variable === "temperature"){
      let temperatuurP = document.getElementById("temperatuur");
      if (temperatuurP !== null){
        temperatuurP.textContent = parseFloat(jsonMessage.value).toFixed(2) + " °C";
      }
    }

    if  (jsonMessage.variable === "CO2"){
      let co2P = document.getElementById("co2P");
      if (co2P !== null){
        co2P.textContent = jsonMessage.value + " PPM";

        if(co2 > 900){
          co2P.classList.add("text-red-500");
          co2P.classList.remove("text-orange-500");
          co2P.classList.remove("text-green-500");
        }else if(co2 > 700){
          co2P.classList.add("text-orange-500");
          co2P.classList.remove("text-red-500");
          co2P.classList.remove("text-green-500");
        }else{
          co2P.classList.add("text-green-500");
          co2P.classList.remove("text-orange-500");
          co2P.classList.remove("text-red-500");
        }
      } 
    }


    if  (jsonMessage.variable === "humidity"){
      let temperatuurP = document.getElementById("humidityP");
      if (temperatuurP !== null){
        temperatuurP.textContent = parseFloat(jsonMessage.value).toFixed(2)  + " %H";
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