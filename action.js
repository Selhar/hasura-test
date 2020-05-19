// Sample webhook showing what a hasura auth webhook looks like

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000;

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))


app.get('/actionName', (req, res) => {
  console.log('GET')
  res.send('Webhooks are running');
});

app.post('/actionName', (req, res) => {
  console.log('POST')
  res.json({
    accessToken: 'asdsfasdf'
  })
});

app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});