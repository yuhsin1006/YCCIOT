
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var jsonParser = bodyParser.json();

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

var req = http.request(options, function(response) {
  var str = '';

    var aaa = {
        serial : '87',
        mac : '12' ,
        belongTo : 'yuhsin'
    }
    var json = JSON.stringify(aaa);

  response.setHeader('Content-Type', 'application/json');
  response.send(json);

  response.on('data', function (chunk) {
        console.log(chunk);
        str += chunk;
  });

  response.on('end', function () {
        console.dir(str);
  });

});
req.end();

/*

var request = require('request');

request
    .get('http://120.107.172.236:3000/devices')
    .on('response', function(response) {
      console.log(response.statusCode)
      console.log(response.headers['content-type'])
      console.dir(response.toJSON())
    })
    
*/