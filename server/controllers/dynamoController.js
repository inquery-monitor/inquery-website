const AWS = require("aws-sdk")
AWS.config.update({region:'us-west-1'});
const db = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();


const createUser = async (req, res, next) => {
  try {
    // AWS SDK for DynamoDB takes a param object before executing queries - - 
  const newDataObjParam = {
    TableName: "UserData",
    Key: { UserID : "Willaim"},
    ExpressionAttributeNames: {
      '#d' : "Data",
      '#f' : 'AccessID'
    },
    ExpressionAttributeValues: {
      ':v' : {},
      ':z' : 'aslkdaj'
    },
    UpdateExpression: 'set #d = :v,#f = :z',
    ConditionExpression: 'attribute_not_exists(#d)'
  }
  await db.update(newDataObjParam).promise()
  console.log('created new user..')
  return next()
  } catch(e) { 
    console.log('did not create user', e);
    return next()
  }
}

const createQueryType =  async (req, res, next) => {
    // AWS SDK for DynamoDB takes a param object before executing queries - - 
    try {
      const newCustomTypeParam = {
        TableName: "UserData",
        Key: {UserID:"Willaim"},
        ExpressionAttributeNames: {
          "#a": "Data",
          "#b" : "Query", // req.body.queryField
        },
        ExpressionAttributeValues: {
          ':v' : {}
        },
        UpdateExpression: "Set #a.#b = :v",
        ConditionExpression: "attribute_not_exists(#a.#b)"
      }
    
        await db.update(newCustomTypeParam).promise()
        return next()
    } catch(e) {
      console.log('did not create query type', e)
      return next()
    }
}

const addFieldType = async (req, res, next) => {
  try {
    // AWS SDK for DynamoDB takes a param object before executing queries - - 
    const newFieldParams = {
      TableName: "UserData",
      Key: { UserID : "Willaim"},
      ExpressionAttributeNames: {
        "#c": "Data",
        "#d": "Query", // QueryField
        "#e": "total_manufactured" // FieldName 
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
   
    console.log(await db.update(newFieldParams).promise());
    console.log('first occurence')
    res.locals.isFirstOccurence = true 
    // for first occurence resolvers, we need to skip the appendFieldType middleware - which references res.locals 
    return next()
  } catch(e) {
    console.log('unable to add fieldType')
    return next()
  }
}

const appendFieldType = async ( req, res, next) => {
  if (res.locals.isFirstOccurence){ // if its a first occurence, skip appending
    return next()
  }
  try {
    const existingFieldParams = {
      TableName: "UserData",
      ExpressionAttributeNames: {
          "#d": "Data",
          '#t': 'Query',
          '#f': 'total_manufactured'
      },
      ExpressionAttributeValues: {
          ":y": [{  "speed": 0.4944, // speed
          "frequency": 1,
          "time": 1567113437211, // time 
          "id": "1ls2jzx6vmzf"}] // resolver data object. 
      },
      Key: {
          UserID: 'Willaim'
      },
      UpdateExpression: "SET #d.#t.#f = list_append(#d.#t.#f,:y)"
    };
    await db.update(existingFieldParams).promise()
    return next()
  } catch(e) {
    console.log('could not append fieldType', e, e.stack);
    return next()
  }
    // Params Object to add a new field key to an existing data Oject -- does not work when the queryName has not yet been added. 
}

const readAndFormat = async (req, res, next) => {

try{
  const lambda = new AWS.Lambda();
  const lambdaParams = {
    FunctionName: "DataProcessing",
    InvocationType: "RequestResponse",
    Payload: JSON.stringify({UserID: "Willaim"}),
    LogType: "None",
  }
  lambda.invoke(lambdaParams,(err,data) => {
    if (err) console.log (err, err.stack);
    else console.log(data);
  })
  
  return next()
} catch(e) {
  console.log(e)
  console.log('unable to read data')
  return next()
}


}

module.exports = {
  createUser,
  createQueryType,
  addFieldType,
  appendFieldType,
  readAndFormat
}