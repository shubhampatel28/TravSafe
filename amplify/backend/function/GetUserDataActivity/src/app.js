/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())
app.use(awsServerlessExpressMiddleware.eventContext())

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();

function id () {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


app.get('/userdata', function(req, res) {
  var params = {
    TableName: "UserDataTable-travamplif",
    Key: {
      username: req.query.username
    }
  }
  console.log(req.query.username);

  docClient.scan(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({ data })
  })
});

app.post('/userdata', function(req, res) {

  const params = {
    TableName: "UserDataTable-travamplif",
    Item: { 
      username: req.query.username,
      searchid: id(),
      score: req.query.score,
      location: req.query.location
    }
  }

  docClient.put(params, function(err, data) {
    if (err) {
      res.json({err})
    } else {
      res.json({data})
    }
  })

});


app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
