//Install express server
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

// Serve only the static files fr0m the dist directory
app.use(express.static(__dirname + '/dist/AbuseFlagger'));


app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/AbuseFlagger/index.html'));
});

app.post('/data', function(req, res) {
  console.log("Request received" + req.body)
  const options = {
    hostname: '169.51.206.176',
    port: '32451',
    path: '/model/predict',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const predictReq = http.request(options, predictRes => {
    console.log('statusCode: ${res.statusCode}')
    predictRes.on('data', d => {
      data = d
    })
    predictRes.on('end', d => {
      res.send(data)
    })
    predictRes.on('error', d => {
      console.log(d)
    })
  })
  predictReq.write(JSON.stringify(req.body))
  predictReq.end()
})


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

console.log("Server started")