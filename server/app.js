//Node101-log-all-the-things
//Created by Travis Ripley
//March 23rd, 2019 @ 13:45

const express = require('express'); //Express Server
const app = express();

//modules
const fs = require('fs'); //makes file operation api's simple
const path = require('path'); //provides utilities for working with file and directory paths
const morgan = require('morgan'); //Logger
const moment = require('moment'); //date library for parsing, validating, manipulating, and formatting dates


let object = [];

app.use((req, _res, next) => {
  // write your Kenny logging code here

  let Agent = req.headers['user-agent'];
  let Time = moment().format(); 
  let Method = req.method;
  let Resource = req._parsedUrl['path'];
  let Version = `HTTP/${req.httpVersion}`;
  let Status = "200"
  console.log(Agent + "," + Time + "," + Method + "," + Resource + "," + Version + "," + Status);
  
  var userInfo = "/n" + Agent + "," + Time + "," + Method + "," + Resource + "," + Version + "," + Status;

  var userInfo =
  {
    'Agent': req.headers['user-agent'],
    'Time': moment().utc().format(),
    'Method': req.method,
    'Resource': req._parsedUrl['path'],
    'Version': `HTTP/${req.httpVersion}`,
    'Status': "200",
  };

  //push info into the "log.csv" file
  object.push(userInfo);
  fs.appendFile(path.resolve(__dirname, 'log.csv'), userInfo, function (err) {
    if (err) throw err;

  });


  next();

});

//status, if "200" prints "ok" to the console.
app.get('/', (_req, res) => {
  // write your code to respond "ok" here

  res.status(200).send("ok");

});

//log data in a "JSON" object.
app.get('/logs', (_req, res) => {
  // write your code to return a json object containing the log data here

  res.json(object);

});

module.exports = app;
