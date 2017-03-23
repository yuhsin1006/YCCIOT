
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

var req = http.request(options, function(response){
  var str = '';

  response.on('data', function (chunk) {
        console.log(chunk);
        str += chunk;
  });

  response.on('end', function () {
        console.dir(str);
  });

});

var request = require('require')

request
    .get('http://120.107.172.236:3000/devices')
    .on('response', function(response) {
      console.log(response.statusCode)
      console.log(response.headers['content-type'])
      console.dir(response.toJSON())
    })
    ;

module.exports.getToken = function(callback){

    request(validLoginRequest, function(err,resp,body){
        var token ;
        var json = JSON.parse(JSON.stringify(body));
        console.log("from request(): token=" + json.accesstoken);
        token = json.accesstoken;

        console.log("getToken() returns:" + token);
        callback(token);
    });
}

req.write('Hello World!');
req.end();

