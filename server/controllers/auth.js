const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const uuidV4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const goblinSecret = fs.readFileSync(path.resolve(__dirname, '../private.pem'));

const authMiddleware = {};

// verifies an API key against DB and sends jwt as cookie
authMiddleware.setJwt = (req, res, next) => {
  // if (req.body.apiKey === /* some api key in Dynamo*/) {
  //   let token = jwt.sign({ accessId: uuidV4() }, goblinSecret, { expiresIn: '1h'}, { algorithm: 'HS256' });
  //   res.locals.jwt = token;
  //   return next();
  // }
  let token = jwt.sign({ test: "jwt" }, goblinSecret, { expiresIn: '2 days'}, { algorithm: 'HS256' });
  res.cookie('jwt', String(token));
  res.locals.jwt = token;
  console.log('cookie has been set', token);
  return next();
}

authMiddleware.checkJwt = async (req, res, next) => {
  console.log('checking jwt cookie!', req.cookies);
  // const authHeader = req.get('Authorization');
  // console.log('here the header', authHeader);
  // if (!authHeader) {
  //   req.isAuth = false;
  //   return next();
  // }

  // const token = authHeader.split(' ')[1];
  // if (!token || token === '') {
  //   req.isAuth = false;
  //   return next();
  // }

  // check cookie for jwt
  let decodedToken;
  try {
    decodedToken = await jwt.verify(req.cookies.jwt, goblinSecret);
  } catch(e) {
    req.isAuth = false;
    return next();
  }

  // if cookie doesn't exist, not authorized
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  // if cookie exists and matches against server-side secret, you are authorized
  req.isAuth = true;
  
  //
  req.accessId = decodedToken.accessID;
  return next();
}

module.exports = authMiddleware;
