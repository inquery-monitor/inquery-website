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
  res.status(200).json(res.locals.authKeys);
})

app.post('/checkApiKey', dynamoController.checkApiKey, authMiddleware.setJwt, (req, res) => {
  res.status(301).send()
})



app.get('/analytics', (req,res) => {
  console.log('analytics hit.')
  res.sendFile(path.join(__dirname,'../client/dashboard/index.html'))
})



app.use('/data', dbRouter);




app.listen(3000, () => {
  console.log('listening on port 3000')
});