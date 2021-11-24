//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files fr0m the dist directory
app.use(express.static(__dirname + '/dist/AbuseFlagger'));

app.post('/data', function(req, res) {
    const options = {
        hostname: 'http://169.51.206.176',
        port: 32451,
        path: '/model/predict',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': req.length
        }
    }
    const predictReq = https.request(options, predictRes => {
        console.log('statusCode: ${res.statusCode}')
        predictRes.on('data', d => {
            res.send(d)
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