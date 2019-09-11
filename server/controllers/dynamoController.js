const AWS = require("aws-sdk")
AWS.config.update({region:'us-west-1'});
const db = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();
const bcrypt = require('bcryptjs')


const createUser = async (req, res, next) => {
  try {
    const AccessID = res.locals.authKeys.accessId
    const hashedKey = await bcrypt
    .hash(res.locals.authKeys.apiKey, 12)
    .then(hashedApiKey => {
      return hashedApiKey
    })
    .catch(err => {
      throw err;
    })
    // AWS SDK for DynamoDB takes a param object before executing queries - - 
  const newDataObjParam = {
    TableName: "GraphQLData",
    Key: { AccessID : AccessID},
    ExpressionAttributeNames: {
      '#d' : "Data",
      '#f' : 'AccessKey'
    },
    ExpressionAttributeValues: {
      ':v' : {},
      ':z' : hashedKey
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
    const AccessID = res.locals.AccessID;
    try {
      const newCustomTypeParam = {
        TableName: "GraphQLData",
        Key: {AccessID: AccessID},
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
  const AccessID = res.locals.AccessID;
  try {
    // AWS SDK for DynamoDB takes a param object before executing queries - - 
    const newFieldParams = {
      TableName: "GraphQLData",
      Key: { AccessID : AccessID},
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
  const AccessID = res.locals.AccessID;
  if (res.locals.isFirstOccurence){ // if its a first occurence, skip appending
    return next()
  }
  try {
    const existingFieldParams = {
      TableName: "GraphQLData",
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
          AccessID: AccessID
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
  const AccessID = res.locals.AccessID;
  try{
    const lambda = new AWS.Lambda();
    const lambdaParams = {
      FunctionName: "DataProcessing",
      InvocationType: "RequestResponse",
      Payload: JSON.stringify({AccessID: AccessID}),
      LogType: "None",
    }
    const resolverData = await lambda.invoke(lambdaParams).promise()
    console.log(resolverData)
    res.locals.resolverData = resolverData;
    return next()
  } catch(e) {
    console.log(e)
    console.log('unable to read data')
    return next()
  }
}


const checkApiKey = async (req,res,next) => {
  const AccessID = req.body.accessId;
  const accessKey = req.body.apiKey;
  let hashedPassword;
  try {
    const apiKeyParams = {
      TableName :'GraphQLData',
      Key: {
        AccessID: AccessID
      }
    }
    const user = await db.get(apiKeyParams).promise()
    hashedPassword = user.Item.AccessKey;
    console.log(hashedPassword);
  } catch(e) {
    return res.send('Your AccessID and/or AccessKey are/is incorrect')
  }
  try {
    const accessKeyExists = await bcrypt.compare(accessKey, hashedPassword);
    console.log('accessKey is:', accessKey, 'accessKeyExists is:', accessKeyExists)
    if (!accessKeyExists) {
      return res.send('Your AccessID and/or AccessKey are/is incorrect');
    }
    return next();
  } catch(e) {
    console.log('error checking passwords against Dynamo', e);
  }
}

module.exports = {
  createUser,
  createQueryType,
  addFieldType,
  appendFieldType,
  readAndFormat,
  checkApiKey
}