const AWS = require("aws-sdk")
AWS.config.update({region:'us-west-1'});
const db = new AWS.DynamoDB.DocumentClient();

// AWS.config.getCredentials((err)=>{
//   if (err) console.log(err.stack);
//   else {
//     console.log('Access key:', AWS.config.credentials.accessKeyId);
//     console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
//   }
// })



const userTable = {
  TableName : "UserData",
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
/*  TEST LAMBDA FUNCTION INVOCATIONS-
const lambda = new AWS.Lambda();

const lambdaParams = {
  FunctionName: "GMDataProcessing",
  InvocationType: "RequestResponse",
  Payload: JSON.stringify({UserID: "321da"}),
  LogType: "None",
}


lambda.invoke(lambdaParams,(err,data) => {
  if (err) console.log (err, err.stack);
  else console.log(data);
})
*/


db.get(params, (err,data)=>{
  if (err) console.log(err,err.stack);
  else console.log(data)
})


const updateParams = {
  TableName: "UserData",
  Key: { UserID: "321da"},
  UpdateExpression: 'set #a= :x',
  ExpressionAttributeNames: {'#a' : 'Data'},
  ExpressionAttributeValues: {
    ':x': {hello: 'YESSSSS'},
  }
}
db.update(updateParams, (err,data) => {
  if (err) console.log(err, err.stack);
  else console.log(data + 'success')
})




module.exports = db