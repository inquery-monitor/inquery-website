const AWS = require("aws-sdk")
AWS.config.update({region:'us-west-1'});
const db = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();




const userTable = {
  TableName : "ResolverData",
  KeySchema: [       
      { 
        AttributeName: "UserID", 
        KeyType: "HASH", //Partition key
      },
  ],
  AttributeDefinitions: [
      { 
          AttributeName: "UserID", 
          AttributeType: "S" 
      },
  ],
  ProvisionedThroughput: {       // Only specified if using provisioned mode
      ReadCapacityUnits: 1, 
      WriteCapacityUnits: 1
  }
}





// const convertedObj = AWS.DynamoDB.Converter.marshall({
//   hello: "Almost graduated from codesmith",
//   testing: 3
// })

const params = {
  TableName: "UserData",
  Key: {
    UserID: "321da"
  }
}
//  TEST LAMBDA FUNCTION INVOCATIONS-
// const lambda = new AWS.Lambda();

// const lambdaParams = {
//   FunctionName: "DataProcessing",
//   InvocationType: "RequestResponse",
//   Payload: JSON.stringify({UserID: "tang"}),
//   LogType: "None",
// }


// lambda.invoke(lambdaParams,(err,data) => {
//   if (err) console.log (err, err.stack);
//   else console.log(data);
// })

