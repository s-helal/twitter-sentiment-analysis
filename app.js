// load packages
const path = require('path')
const express = require('express');

// create express application
const app = express();

// middleware to serve static files from the client directory
app.use(express.static('client/templates'));
app.use(express.static('client'));

// get google scholar search from routes
var gsearch = require('./server/routes/gsearch')
app.use('/gsearch', gsearch)

// create server and start listening for requests
app.listen(3000, () => {
    console.log("server is running on port 3000");
})