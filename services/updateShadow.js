//Environment Configuration
const AWSConfig = require('../config/aws-config');
let config = {};

config.IOT_BROKER_ENDPOINT      = "a3ca3lp4kvh6ns-ats.iot.ap-south-1.amazonaws.com".toLowerCase()
config.IOT_BROKER_REGION        = "ap-south-1";
config.IOT_THING_NAME           = "ESP_30AEA44126CC";

//Loading AWS SDK libraries
const AWS = require('aws-sdk');
AWS.config.update({
  region:AWSConfig.AWS_IOT_BROKER_REGION,
  accessKeyId:AWSConfig.AWS_KEY,
  secretAccessKey:AWSConfig.AWS_SECRET
});

//Initializing client for IoT
const iotData = new AWS.IotData({endpoint: config.IOT_BROKER_ENDPOINT});

// updateShadow(2, 'TurnOff', 'responseHeader');

function updateShadow (device, requestMethod) {
  //Set the pump to 1 for activation on the device
  let payloadObj =
    { "state":
      {
        "desired": {},
      }
    };
  payloadObj.state.desired[device.keyName] =  1;
  console.log('KEY NAME', payloadObj);
  if(requestMethod == 'TurnOff') {
    payloadObj.state.desired[device.keyName] =  0;
  }

  //Prepare the parameters of the update call
  var paramsUpdate = {
    "thingName" : device.thingId,
    "payload" : JSON.stringify(payloadObj)
  };

  //Update Device Shadow
  iotData.updateThingShadow(paramsUpdate, function(err, data) {
    console.log('Inside Fun');
    if (err){
      console.log(err);
    }
    else {
      speechOutput = "The pump has been activated!";
      console.log('CLOUD_DATA', data);
      const powerResult = 'TurnOn';
      var contextResult = {
        "properties": [{
          "namespace": "Alexa.PowerController",
          "name": "powerState",
          "value": powerResult,
          "timeOfSample": "2017-09-03T16:20:50.52Z", //retrieve from result.
          "uncertaintyInMilliseconds": 50
        }]
      };
      console.log(data);
      return data;
    }
  });
}

module.exports = updateShadow;
