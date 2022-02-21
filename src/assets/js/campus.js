const client = new Paho.MQTT.Client("ws://10.23.62.184:9001/mqtt", "myClientId" + new Date().getTime());
const myTopic = "D2.02/co2"

client.connect({ onSuccess: onConnect })
let counter = 0
function onConnect() {
  console.log("connection successful")
  client.subscribe(myTopic)   //subscribe to our topic
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
    let id = jsonMessage.sensor_id;
    let co2 = jsonMessage.value;

    let div = document.getElementById(id);
    div.textContent = co2;
    let color = document.getElementById(id+"color");
    let title = document.getElementById(id+"naam");
    title.textContent = id;

    if(co2 > 900){
      console.log("rood")
      color.classList.add("bg-orange-500");
      color.classList.remove("bg-yellow-500");
      color.classList.remove("bg-green-500");
    }else if(co2 > 700){
        color.classList.add('bg-yellow-500');
        color.classList.remove("bg-orange-500");
        color.classList.remove("bg-green-500");
    }else{
        color.classList.add("bg-green-500");
        color.classList.remove("bg-yellow-500");
        color.classList.remove("bg-orange-500");
    }

}

client.onConnectionLost = onConnectionLost;

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
  client.connect({ onSuccess: onConnect });
}