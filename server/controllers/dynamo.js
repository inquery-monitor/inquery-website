const AWS = require("aws-sdk")
AWS.config.update({region:'us-west-1'});
const db = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();


const createUser = async (req, res, next) => {
  try {
    // AWS SDK for DynamoDB takes a param object before executing queries - - 
  const newDataObjParam = {
    TableName: "ResolverData",
    Key: { UserID : "tang"},
    ExpressionAttributeNames: {
      '#d' : "Data",
    },
    ExpressionAttributeValues: {
      ':v' : {}
    },
    UpdateExpression: 'set #d = :v',
    ConditionExpression: 'attribute_not_exists(#d)'
  }
  await db.update(newDataObjParam).promise()
  return next()
  } catch(e) { 
    console.log('did not create user');
    return next()
  }
}

const createQueryType =  async (req, res, next) => {
    // AWS SDK for DynamoDB takes a param object before executing queries - - 
    try {
      const newCustomTypeParam = {
        TableName: "ResolverData",
        Key: {UserID:"tang"},
        ExpressionAttributeNames: {
          "#d": "Data",
          "#t" : "Country", // req.body.queryField
        },
        ExpressionAttributeValues: {
          ':v' : {}
        },
        UpdateExpression: "Set #d.#t = :v",
        ConditionExpression: "attribute_not_exists(#d.#t)"
      }
    
        await db.update(newCustomTypeParam).promise()
        return next()
    } catch(e) {
      console.log('did not create query type')
      return next()
    }
}

const addFieldType = async (req, res, next) => {
  try {
    // AWS SDK for DynamoDB takes a param object before executing queries - - 
    const newFieldParams = {
      TableName: "ResolverData",
      Key: { UserID : "tang"},
      ExpressionAttributeNames: {
        "#d": "Data",
        "#t": "Country", // QueryField
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
    await db.update(newFieldParams).promise();
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
  try{
    const existingFieldParams = {
      TableName: "ResolverData",
      ExpressionAttributeNames: {
          "#d": "Data",
          '#t': 'Country',
          '#f': 'total_dosage'
      },
      ExpressionAttributeValues: {
          ":y": [{hi:"PersonXYZ",lol: 'ayy', andrew: "TAAANGG"}] // resolver data object. 
      },
      Key: {
          UserID: 'tang'
      },
      UpdateExpression: "SET #d.#t.#f = list_append(#d.#t.#f,:y)"
    };
    await db.update(existingFieldParams).promise()
    return next()
  } catch(e) {
    console.log('could not append fieldType', e,e.stack);
    return next()
  }
    // Params Object to add a new field key to an existing data Oject -- does not work when the queryName has not yet been added. 
}

module.exports = {
  createUser,
  createQueryType,
  addFieldType,
  appendFieldType
}