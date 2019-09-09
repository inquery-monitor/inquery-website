const express = require('express');
const router = express.Router()
const db = require('../controllers/dbController.js')



router.post('/putItem', db.createUser, db.createQueryType, db.addFieldType, db.appendFieldType, (req,res,next) => {
  console.log('finished middleware sequence');
  res.status(200).send()
  // fire off lambda function to write to DB
})


router.get('/getItem', (req,res,next) => {
  // trigger lambda to grab data for user
})



module.exports = router