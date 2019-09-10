const AWS = require("aws-sdk")
AWS.config.update({region:'us-west-1'});
const db = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();




const userTable = {
  TableName : "ResolverData",
  KeySchema: [       
      { 
        AttributeName: "AccessID", 
        KeyType: "HASH", //Partition key
      },
  ],
  AttributeDefinitions: [
      { 
          AttributeName: "AccessID", 
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
  TableName: "Resolver_Data",
  Key: {
    AccessID: "321da"
  }
}
//  TEST LAMBDA FUNCTION INVOCATIONS-
// const lambda = new AWS.Lambda();

// const lambdaParams = {
//   FunctionName: "DataProcessing",
//   InvocationType: "RequestResponse",
//   Payload: JSON.stringify({AccessID: "tang"}),
//   LogType: "None",
// }


// lambda.invoke(lambdaParams,(err,data) => {
//   if (err) console.log (err, err.stack);
//   else console.log(data);
// })



const newFieldParams = {
  TableName: "Resolver_Data",
  Key: { AccessID : "Willaim"},
  ExpressionAttributeNames: {
    "#c": "Data",
    "#d": "Query", // QueryField
    "#e": "total_dosage" // FieldName 
  },
  ExpressionAttributeValues: {
    ':v' : [{  "speed": 0.4944, // speed
    "frequency": 1,
    "time": 156711343701, // time 
    "id": "1ls2jzx6vmzf"}]
  },
  UpdateExpression : 'Set #c.#d.#e = :v',
  ConditionExpression: "attribute_not_exists(#c.#d.#e)",
}

const newDataObjParam = {
  TableName: "Resolver_Data",
  Key: { AccessID : "Willim"},
  ExpressionAttributeNames: {
    '#d' : "Data",
    '#f' : 'AccessKey'
  },
  ExpressionAttributeValues: {
    ':v' : {},
    ':z' : 'aslkdaj'
  },
  UpdateExpression: 'set #d = :v,#f = :z',
  ConditionExpression: 'attribute_not_exists(#d)'
}

db.update(newDataObjParam, (err,data) => {
  if (err) console.log(err);
  else console.log(data)
});
