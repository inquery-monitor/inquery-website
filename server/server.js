const express = require('express');
const app = express();
const path = require('path')
const dbRouter = require('./routers/dbRouter.js');


// Serve static assets.
app.use(express.static(path.join(__dirname,'../client')))

// Serve homepage.
app.get('/',(req, res) => {
 res.sendFile(path.join(__dirname,'../client/index.html'))
})

// Serve analytics.
app.get('/analytics', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/dashboard/index.html'))
})

// Handle data requests.
app.use('/data', dbRouter);

// I'm listening...
app.listen(3000, () => console.log('listening on port 3000'));
