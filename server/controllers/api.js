const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const uuidV4 = require('uuid/v4');
const uuidV1 = require('uuid/v1');
const goblinSecret = fs.readFileSync(path.resolve(__dirname, '../private.pem'));
const { createUser } = require('./dynamoController.js')

const apiMiddleware = {};

apiMiddleware.generateAuthKeys = (req, res, next) => {
  console.log('api key has been given');
  // Everyone can get however many keys they want... we don't discriminate
  // res.status(200).json({ apiKey: uuidV4() });
  res.locals.authKeys = { apiKey: String(uuidV4()), accessId: String(uuidV1()) };
  return next();
}

apiMiddleware.setApiKey = async (req, res, next) => {
  console.log('Setting api key...');
  // first, check if a user with the given api key exists
  const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../auth-test.json')));

  if (users[res.locals.authKeys.apiKey]) {
    throw new Error('Api key has already been registered.')
    // return next();
  }
  // add logic to create user
  await bcrypt
          .hash(res.locals.authKeys.apiKey, 12)
          .then(hashedApiKey => {
            // saved hashedApiKey to Dynamo
            console.log('hashed api key is', hashedApiKey, 'res locals api key is', res.locals.apiKey);
            users[res.locals.apiKey] = hashedApiKey;
            console.log('users is', users);
            fs.writeFileSync(path.resolve(__dirname, '../auth-test.json'), JSON.stringify(users, null, 2));
          })
          .catch(err => {
            throw err;
          })

  console.log('api key has been set');
  return next();
}

apiMiddleware.checkApiKey = (req, res, next) => {

  
  
  // const apiKeyExists = await bcrypt.compare(req.body.apiKey, );
  // if (!apiKeyExists) {
  //   throw new Error('AccessID is incorrect');
  // }

  return next();
}

module.exports = apiMiddleware;