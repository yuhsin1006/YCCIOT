var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var jsonParser = bodyParser.json();

var options = {
  host: '120.107.172.236',
  path: '/devices',
  port: '3000',
  method: 'POST',
  headers: {
        'Content-Type': 'application/json'
  }

};

app.use(bodyParser.json());

callback = function(response) {

  var str = '';

  response.on('data', function (chunk) {
        console.log(chunk);
        str += chunk;
  });

  response.on('end', function () {
        console.dir(str);
//     var obj = JSON.parse(str);
       // console.dir(obj);
     console.log(str);
  });

}

var req = http.request(options, callback);
req.write("hello world");
req.end();

