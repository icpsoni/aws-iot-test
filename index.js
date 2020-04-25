//Environment Configuration
const AWSConfig = require('./config/aws-config');
let config = {};

config.IOT_BROKER_ENDPOINT      = "a3pu13imk5phz6-ats.iot.eu-west-1.amazonaws.com".toLowerCase();

config.IOT_BROKER_REGION        = "eu-west-1";

config.IOT_THING_NAME           = "alexa_board";

//Loading AWS SDK libraries

var AWS = require('aws-sdk');

AWS.config.region = config.IOT_BROKER_REGION;
AWS.config.accessKeyId = AWSConfig.Key;
AWS.config.secretAccessKey  = AWSConfig.Secret;

//Initializing client for IoT

var iotData = new AWS.IotData({endpoint: config.IOT_BROKER_ENDPOINT});

activatePump();

function activatePump (intent, session, callback) {

  var repromptText = null;

  var sessionAttributes = {};

  var shouldEndSession = true;

  var speechOutput = "";




  //Set the pump to 1 for activation on the device

  var payloadObj={ "state":

      { "desired": {
          "welcome": "aws-iot",
          "switch_1": 0,
          "switch_2": 0,
          "switch_3": 0,
          "switch_4": 0,
          "otajobflag": 0
        }
      }

  };


  //Prepare the parameters of the update call

  var paramsUpdate = {

    "thingName" : config.IOT_THING_NAME,

    "payload" : JSON.stringify(payloadObj)

  };


  //Update Device Shadow

  iotData.updateThingShadow(paramsUpdate, function(err, data) {
    console.log('Inside Fun');
    if (err){
      console.log(err);
      //Handle the error here
    }
    else {
      speechOutput = "The pump has been activated!";
      console.log(data);
      // callback(sessionAttributes,buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

    }

  });


}
