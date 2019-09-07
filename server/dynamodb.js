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


const convertedObj = AWS.DynamoDB.Converter.marshall({hello: "World"})
const newItem = {
  Key: {
    "UserID" : {
      S : "ad0jk2l1n"
    },
  },
  TableName: "UserData"
}


dynamodb.getItem(newItem, (err,data)=>{
  if (err) console.log(err,err.stack);
  else console.log(data)
})
// dynamodb.putItem(newItem, (err,data)=>{
//   if (err) console.log(err,err.stack);
//   else console.log(data)
// })

dynamodb.getItem

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