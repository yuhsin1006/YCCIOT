var http = require('http');
var express = require('express');
var app = express();
// var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json();

var options = {
  host: 'localhost',
  path: '/devices',
  port: '3000',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  }
};



var req = http.request(options, function(response) {
  var str = '';

  response.on('data', function (chunk) {
        console.log(chunk);
        str += chunk;
  });

  response.on('end', function () {
        console.dir(str);
  });
});
req.write("hello world");
req.end();
