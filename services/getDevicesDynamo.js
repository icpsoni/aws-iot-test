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

const DYNAMODB_TABLE_NAME = "firewiresDev";
const DynamoDB = new AWS.DynamoDB.DocumentClient();
const key = "2";

let params = {
  TableName: DYNAMODB_TABLE_NAME,
  Select: "ALL_ATTRIBUTES"

  // Key: {
  //   "endpointId": {
  //     S: key // evaluates to a big string, pulling it in from an SNS message. Verified it with console.log(). It stores the expected value.
  //   }
  // }
};
getDevicesDynamo()

function getDevicesDynamo(request, context) {
  return new Promise((resolve, reject) => {
    DynamoDB.scan(params, (err, result) => {
      if (err) {
        console.log('ERRRRRRRORRRR');
        console.log(err, err.stack); // an error occurred
        reject(err);
      }
      else {
        // const data = AWS.DynamoDB.Converter.unmarshall(result.Item);
        const format = {
          "endpoints": result.Items
        }
        console.log("RESULT", JSON.stringify(format) );
        resolve(format);
      }
    });
  });
}
// getDevicesDynamo()

module.exports = getDevicesDynamo;
