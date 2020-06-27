const getDevicesDynamo = require('./services/getDevicesDynamo');
const getDevice = require('./services/getDevice');
const AlexaResponse = require('./services/AlexaResponse');

const log = require('./utilities/log');
const updateShadow = require('./services/updateShadow');

// Lambda Handler
exports.handler = function (request, context) {

  // Dump the request for logging - check the CloudWatch logs
  console.log("index.handler request  -----");
  console.log(JSON.stringify(request));

  if (context !== undefined) {
    console.log("index.handler context  -----");
    console.log(JSON.stringify(context));
  }

  if (request.directive.header.namespace === 'Alexa.Discovery' && request.directive.header.name === 'Discover') {
    log("DEBUG:", "Discover request",  JSON.stringify(request));
    handleDiscovery(request, context);
  } else if (request.directive.header.namespace === 'Alexa.ErrorResponse') {

    //TO DO

  } else{
    if(request.directive.header.namespace === 'Alexa.PowerController'){
      if (request.directive.header.name === 'TurnOn' || request.directive.header.name === 'TurnOff') {
        log("DEBUG:", "TurnOn or TurnOff Request", JSON.stringify(request));
        handlePowerControl(request, context);
      }
    }
  }
};

async function handleDiscovery(request, context) {
  let payload = await getDevicesDynamo();
  console.log('PAYLOAD ', payload);
  let header = request.directive.header;
  header.name = "Discover.Response";
  log("DEBUG" , "Discovery Response: ", JSON.stringify({ header: header, payload: payload }));
  context.succeed({ event: { header: header, payload: payload } });
}

async function handlePowerControl(request, context) {
  const device = await getDevice(request.directive.endpoint.endpointId);
  // get device ID passed in during discovery
  var requestMethod = request.directive.header.name;
  var responseHeader = request.directive.header;
  responseHeader.namespace = "Alexa";
  responseHeader.name = "Response";
  responseHeader.messageId = responseHeader.messageId + "-R";
  // get user token pass in request
  var requestToken = request.directive.endpoint.scope.token;
  var powerResult;

  // if (requestMethod === "TurnOn") {
    console.log('DEVICE DETAILS', device);
    await updateShadow(device, requestMethod);
  let repromptText = null;
  let sessionAttributes = {};
  let shouldEndSession = true;
  let speechOutput = '';
  let token = request.directive.endpoint.scope.token;
    let response = {
      context: contextResult,
      event: {
        header: responseHeader,
        endpoint: {
          scope: {
            type: "BearerToken",
            token: token
          },
          endpointId: config.IOT_THING_NAME
        },
        payload: {}
      }
    };

    console.log("DEBUG", "Alexa.PowerController ", JSON.stringify(response));
    context.succeed(response);
    // Make the call to your device cloud for control

    // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
    // powerResult = "ON";
  // }
  // else if (requestMethod === "TurnOff") {
  //   // Make the call to your device cloud for control and check for success
  //   // powerResult = stubControlFunctionToYourCloud(endpointId, token, request);
  //   powerResult = "OFF";
  // }
}
