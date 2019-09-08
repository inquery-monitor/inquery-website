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


// db.get(params, (err,data)=>{
//   if (err) console.log(err,err.stack);
//   // else console.log(data)
// })



// params that are coming in will be queryField, fieldName, speed, id.
// queryField = main object key 
// fieldName = keys within queryField, with an array of data. 

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

/*
Step 1: Check if UserID exists in DB. 
Step 2: Check if QueryField Exists as a key within User's Data Object | 
if it does not exist, add it onto the existing Data object and initialize it (to an array with 1 element)
Step 3: If it does exist, do nothing and move onto step 4. 
Step 4: Add a new QueryName to data if it does not yet exist. If exists, go to step 5
Step 5: Append to existing object. 

*/


// Params Object to add a new field key to an existing data Oject -- does not work when the queryName has not yet been added. 
const newFieldParams = {
  TableName: "UserData",
  Key: { UserID : "testData"},
  ExpressionAttributeNames: {
    "#d": "Data",
    "#t": "State", // QueryField
    "#f": "total_dosage" // FieldName 
  },
  ExpressionAttributeValues: {
    ':v' : [{  "speed": 0.4944, // speed
    "frequency": 1,
    "time": 1567113437211, // time 
    "id": "1ls2jzx6vmzf"}]
  },
  UpdateExpression : 'Set #d.#t.#f = :v',
  ConditionExpression: "attribute_not_exists(#d.#t.#f)"
}

// Params object to add a new QueryName to data if it does not yet exist. -- (should happen before the above param ^ )
const newCustomTypeParam = {
  TableName: "UserData",
  Key: {UserID:"testData"},
  ExpressionAttributeNames: {
    "#d": "Data",
    "#t" : "State",
  },
  ExpressionAttributeValues: {
    ':v' : {}
  },
  UpdateExpression: "Set #d.#t = :v",
  ConditionExpression: "attribute_not_exists(#d.#t)"
}


const existingFieldParams = {
  TableName: "UserData",
  ExpressionAttributeNames: {
      "#Y": "Data",
      '#Z': 'State',
      '#A': 'total_dosage'
  },
  ExpressionAttributeValues: {
      ":y": [{hi:"PersonXYZ",lol: 'Bitchass', andrew: "TAAANGG"}] // resolver data object. 
  },
  Key: {
      UserID: 'testData'
  },
  UpdateExpression: "SET #Y.#Z.#A = list_append(#Y.#Z.#A,:y)"
};

db.update(existingFieldParams,(err,data) => {
  if (err) console.log(err);
  else console.log(data);
})

