const Config = require('../config/aws-config');

const AWS = require('aws-sdk');
AWS.config.update({
  region:Config.AWS_IOT_BROKER_REGION,
  accessKeyId:Config.AWS_KEY,
  secretAccessKey:Config.AWS_SECRET
});
// AWS.config.region = Config.AWS_IOT_BROKER_REGION;
// AWS.config.accessKeyId = Config.AWS_KEY;
// AWS.config.secretAccessKey  = Config.AWS_SECRET;

function getDevice(endpointId) {
  const DYNAMODB_TABLE_NAME = "firewiresDev";
  const DynamoDB = new AWS.DynamoDB();
  let params = {
    TableName: DYNAMODB_TABLE_NAME,
    Key: {
      "endpointId": {
        S: endpointId // evaluates to a big string, pulling it in from an SNS message. Verified it with console.log(). It stores the expected value.
      }
    }
  };
  return new Promise((resolve, reject) => {
    DynamoDB.getItem(params, (err, result) => {
      if (err) {
        console.log('ERRRRRRRORRRR');
        console.log(err, err.stack); // an error occurred
        reject(err);
      }
      else {
        const data = AWS.DynamoDB.Converter.unmarshall(result.Item);
        console.log("RESULT", data);
        resolve(data);
      }
    });
  });
}
// getDevice('1');

module.exports = getDevice;
