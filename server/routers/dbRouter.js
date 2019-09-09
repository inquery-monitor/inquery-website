const express = require('express');
const router = express.Router()
const dynamo = require('../controllers/dynamo.js')



router.post('/putItem', dynamo.createUser, dynamo.createQueryType, dynamo.addFieldType, dynamo.appendFieldType, (req,res,next) => {
  console.log('finished middleware sequence');
  res.status(200).send()
  // fire off lambda function to write to DB
})


router.get('/getItem', (req,res,next) => {
  // trigger lambda to grab data for user
})



module.exports = router