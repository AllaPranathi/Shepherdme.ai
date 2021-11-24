//Install express server
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

// Serve only the static files fr0m the dist directory
app.use(express.static(__dirname + '/dist/AbuseFlagger'));

app.post('/data', function(req, res) {
    console.log("Received request")
    const options = {
        hostname: 'http://169.51.206.176',
        port: 32451,
        path: '/model/predict',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': req.body.length
        }
    }
    const predictReq = http.request(options, predictRes => {
        console.log('statusCode: ${res.statusCode}')
        predictRes.on('data', function (data) {
            curr = data.body
        })
        predictRes.on('end', function() {
            res.end(curr)
        })
    })
    predictReq.write(req.body)
    predictReq.end()
})

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/AbuseFlagger/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log("Server started")