// Sample webhook showing what a hasura auth webhook looks like

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// var requestClient = require('req');
var port = process.env.PORT || 3000;

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

/* A simple sample
   Flow:
   1) Extracts token
   2) Fetches userInfo in a mock function
   3) Return hasura variables
*/
function fetchUserInfo (token, cb) {
  // This function takes a token and then makes an async
  // call to the session-cache or database to fetch
  // data that is needed for Hasura's access control rules
  cb();
}
app.get('/', (req, res) => {
  res.send('Webhooks are running');
});

app.get('/simple/webhook', (req, res) => {
  console.log('GET')
  console.log(req.params)
  console.log(req.path)
  console.log(req.route)
  // Extract token from req
  var token = req.get('Authorization');

  // Fetch user_id that is associated with this token
  fetchUserInfo(token, (result) => {

    // Return appropriate res to Hasura
    var hasuraVariables = {
      'X-Hasura-Role': 'user',  // result.role
      'X-Hasura-User-Id': '1'    // result.user_id
    };
    res.json(hasuraVariables);
  });
});

app.post('/simple/webhook', (req, res) => {
  console.log('POST')
  console.log(req.body)
  // Extract token from req
  var token = req.get('Authorization');

  // Fetch user_id that is associated with this token
  fetchUserInfo(token, (result) => {

    // Return appropriate res to Hasura
    var hasuraVariables = {
      'X-Hasura-Role': 'user',  // result.role
      'X-Hasura-User-Id': '1'    // result.user_id
    };
    res.json(hasuraVariables);
  });
});

// Firebase handler
// var firebaseRouter = require('./firebase/firebaseHandler');
// app.use('/firebase', firebaseRouter);

// listen for requests :)
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});