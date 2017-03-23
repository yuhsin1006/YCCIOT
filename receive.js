
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json())

app.use('/', (req, res) => {

    var info = req.body;
    console.log( "The switch is " + info.IO); 
    console.log( "Brightness : " + info.light); 

    var rsp = {
      success : 1
    }

    // send json response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(rsp));
});

server.listen(3000, () => {
    console.log('Listening on port 3000 ');
});
