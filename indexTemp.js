//Environment Configuration
const Config = require('./config/aws-config');

//Loading AWS SDK libraries
const AWS = require('aws-sdk');
AWS.config.region = Config.AWS_IOT_BROKER_REGION;
AWS.config.accessKeyId = Config.AWS_KEY;
AWS.config.secretAccessKey  = Config.AWS_SECRET;

//Initializing client for IoT

const iotData = new AWS.IotData({endpoint: Config.AWS_IOT_BROKER_ENDPOINT});

activatePump();

function activatePump (intent, session, callback) {

  var repromptText = null;

  var sessionAttributes = {};

  var shouldEndSession = true;

  var speechOutput = "";




  //Set the pump to 1 for activation on the device

  var payloadObj={ "state":

      {
        "desired": {
          "off_signal": 1,
        },
      }

  };


  //Prepare the parameters of the update call

  var paramsUpdate = {

    "thingName" : "ESP_30AEA44126CC",

    "payload" : JSON.stringify(payloadObj)

  };


  //Update Device Shadow

  iotData.updateThingShadow(paramsUpdate, function(err, data) {
    console.log('Inside Fun');
    if (err){
      console.log(err);
      //Handle the error here
    }
    else if(data){
      speechOutput = "The pump has been activated!";
      console.log(data);
      // callback(sessionAttributes,buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));

    }

  });
}

const DYNAMODB_TABLE_NAME = "firewiresDev";
const DynamoDB = new AWS.DynamoDB();
const key = "2";

let params = {
  TableName: DYNAMODB_TABLE_NAME,
  Key: {
    "endpointId": {
      S: key // evaluates to a big string, pulling it in from an SNS message. Verified it with console.log(). It stores the expected value.
    }
  }
};

searchDevices = () => {
  console.log('CALLLLLLLLLLLLLEDD');
  DynamoDB.getItem(params, (err, result) => {
    if (err) {
      console.log('ERRRRRRRORRRR');
      console.log(err, err.stack); // an error occurred
    }
    else {
      console.log("RESULTTTTTTTTT");
      console.log(result);
    }
  });
};

searchDevices();

const s = require('./utilities/deviceShadows/index');
s.SWITCH_PORT_4.desired = 'teat';
console.log(s.SWITCH_PORT_4.desired);
