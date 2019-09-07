const AWS = require("aws-sdk")
AWS.config.update({region:'us-west-1'});
const dynamodb = new AWS.DynamoDB();

AWS.config.getCredentials((err)=>{
  if (err) console.log(err.stack);
  else {
    console.log('Access key:', AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
})



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

// const newItem = {
//   Item: {
//     "UserID" : {
//       S : "321da"
//     },
//     "Data" : {
//       M : convertedObj
//     }
    
//   },
//   TableName: "UserData"
// }

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



// dynamodb.getItem(newItem, (err,data)=>{
//   if (err) console.log(err,err.stack);
//   else console.log(data)
// })

// dynamodb.putItem(newItem, (err,data)=>{
//   if (err) console.log(err,err.stack);
//   else console.log(data)
// })


// dynamodb.createTable(userTable).promise()
// .then((data)=>{
//   console.log('successfully created table', data)
// })
// .catch((err)=>{
//   console.log(err)
// })

dynamodb.listTables({},(err,data)=>{
  if (err) console.log(err,err.stack);
  else console.log(data)
})

module.exports = dynamodb