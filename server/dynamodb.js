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
  // else console.log(data)
})



// params that are coming in will be queryField, fieldName, speed, id.
// queryField = main object key 
// fieldName = keys within queryField, with an array of data. 

// check if queryField exists in data object, if not, create it. 
// check if fieldName exists as a key within data.queryField, if not create it and initialize it to empty array. 
// push the obj containing {speed, id} into the array.
const updateParams = {
  TableName: "UserData",
  Key: { UserID: "testData"},
  UpdateExpression: 'set #a= :x',
  ExpressionAttributeNames: {'#a' : 'Data'},
  ExpressionAttributeValues: {
    ':x': {
      Query:  {
        state: [{  "speed": 0.4944,
        "frequency": 1,
        "time": 1567113437211,
        "id": "1ls2jzx6vmzf"}]
    }
  },
  }
}

let params1 = {
  TableName: "UserData",
  ExpressionAttributeNames: {
      "#Y": "Data",
      '#Z': 'Query',
      '#A' : 'state'
  },
  ExpressionAttributeValues: {
      ":y": [{hi:"PersonXYZ",lol: 'Bitchass'}]
  },
  Key: {
      UserID: 'testData'
  },
  UpdateExpression: "SET #Y.#Z.#A = list_append(#Y.#Z.#A,:y)"
};




db.update(params1, (err,data) => {
  if (err) console.log(err, err.stack);
  else console.log('success')
})




module.exports = db