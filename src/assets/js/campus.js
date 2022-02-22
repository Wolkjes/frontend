const client = new Paho.MQTT.Client("ws://10.23.62.184:9001/mqtt", "myClientId" + new Date().getTime());
const myTopic = "+/+"

client.connect({ onSuccess: onConnect })
let counter = 0
function onConnect() {
  console.log("connection successful")
  client.subscribe("+/co2")
  client.subscribe("+/hum")
  client.subscribe("+/temp")   //subscribe to our topic
  setInterval(()=>{
},5000)} 

const publish = (topic, msg) => {  //takes topic and message string
  let message = new Paho.MQTT.Message(msg);
  message.destinationName = topic;
  client.send(message);
}

client.onMessageArrived = onMessageArrived;

function onMessageArrived(message) {
    let jsonMessage = JSON.parse(message.payloadString);
    if  (jsonMessage.variable === "CO2"){
      let id = jsonMessage.sensor_id;
      let co2 = jsonMessage.value;
  
      let div = document.getElementById(id);
      if (div !== null){
        div.textContent = co2;
        let color = document.getElementById(id+"color");
        let title = document.getElementById(id+"naam");
        title.textContent = id;
    
        if(co2 > 900){
          console.log("rood")
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
      let temperatuurP = document.getElementById("co2P");
      if (temperatuurP !== null){
        temperatuurP.textContent = jsonMessage.value + " PPM";
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