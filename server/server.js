const express = require('express');
const app = express();
const path = require('path')
const dbRouter = require('./routers/dbRouter.js');
const apiMiddleware = require('./controllers/api.js');
const authMiddleware = require('./controllers/auth.js');
const cookieParser = require('cookie-parser');
const dynamoController = require('./controllers/dynamoController.js');

app.use(express.json());
app.use(cookieParser());
// app.use(authMiddleware.checkJwt);

app.use(express.static(path.join(__dirname,'../client')));

app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname,'../client/index.html'))
});

app.get('/requestApiKey', apiMiddleware.generateAuthKeys, dynamoController.createUser, (req, res) => {
  res.status(200).json(`Your auth keys are ${res.locals.authKeys}`);
})

app.get('/checkApiKey', apiMiddleware.checkApiKey, authMiddleware.setJwt, (req, res) => {
  res.status(200).json(`here have a cookie ${res.locals.jwt}`);
})

app.get('/checkJwt', authMiddleware.checkJwt, (req, res) => {
  console.log('your current auth status:', req.isAuth);
  if (req.isAuth) {
    return res.status(200).json('you have a valid jwt');
  } else {
    res.status(403).json('your jwt is invalid');
  }
})
// app.get('/requestApiKey', apiMiddleware.giveApiKey);

// app.use('/db', dbRouter);
app.get('/analytics', (req,res) => {
  res.sendFile(path.join(__dirname,'../client/dashboard/index.html'))
})



app.use('/data', dbRouter);








app.listen(3000, () => {
  console.log('listening on port 3000')
});