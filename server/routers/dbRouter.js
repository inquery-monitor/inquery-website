const express = require('express');
const router = express.Router()
const dynamo = require('../controllers/dynamoController.js')
const authMiddleware = require('../controllers/auth.js')

// writing resolver data to DynamoDB
router.post('/putItem', authMiddleware.checkJwt, dynamo.createQueryType, dynamo.addFieldType, dynamo.appendFieldType, (req,res,next) => {
  console.log('finished middleware sequence');
  res.status(200).send()
})


// reading data 
router.get('/getItem', authMiddleware.checkJwt, dynamo.readAndFormat, (req,res,next) => {
res.status(200).send()
})



module.exports = router