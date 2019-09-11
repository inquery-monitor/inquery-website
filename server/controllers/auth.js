const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const uuidV4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const goblinSecret = fs.readFileSync(path.resolve(__dirname, '../private.pem'));

const authMiddleware = {};

// verifies an API key against DB and sends jwt as cookie
authMiddleware.setJwt = (req, res, next) => {
  const { accessId, apiKey } = req.body
  let token = jwt.sign({ AccessID: accessId }, goblinSecret, { expiresIn: '2 days'}, { algorithm: 'HS256' });
  res.cookie('jwt', String(token));
  res.locals.jwt = token;
  console.log('cookie has been set', token);
  return next();
}

authMiddleware.checkJwt = async (req, res, next) => {
  console.log('checking jwt cookie!', req.cookies);
  
  let decodedToken;
  try {
    decodedToken = await jwt.verify(req.cookies.jwt, goblinSecret);
  } catch(e) {
    return res.status(400).send('Unable to verify jwt.');
  }
  // if cookie doesn't exist, not authorized
  if (!decodedToken) {
    return res.status(400).send('Unable to verify jwt.');
  }
  // if cookie exists and matches against server-side secret, you are authorized


  res.locals.AccessID = decodedToken.AccessID;
  console.log(res.locals.AccessID);
  return next();
}


authMiddleware.checkKeyAndData = async (req, res, next) => {
    const { AccessID, speed, resolverName, queryType, id  }= req.body;
    console.log(AccessID, speed,resolverName, queryType, id)
    res.locals.resolverData = {AccessID, speed, resolverName, queryType}
    return next();
  }

module.exports = authMiddleware;
