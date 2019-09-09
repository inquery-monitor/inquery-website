const express = require('express');
const app = express();
const path = require('path')
const dbRouter = require('./routers/dbRouter.js');






app.use(express.static(path.join(__dirname,'../client')))

app.get('/',(req, res) => {
 res.sendFile(path.join(__dirname,'../client/index.html'))
})


app.use('/db',dbRouter);








app.listen(3000,()=>{
  console.log('listening on port 3000')
})