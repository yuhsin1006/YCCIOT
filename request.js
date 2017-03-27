/*******送封包出去 但好像收不到json**********/

/*
var rp = require('request-promise');

var options = {
    method: 'POST',
    uri: 'http://120.107.172.236:3000/devices',
    body: {
        serial : 87 ,
        mac : 12,
        belongTo : 'yuhsin'
    },
    json: true, // Automatically stringifies the body to JSON
    resolveWithFullResponse: true  
};

rp(options)
    .then(function (response) {
        // POST succeeded...
        console.log("POST successed!");
        console.log("Succeeded with status %d", response.statusCode);
      //  var info = JSON.parse(response);
        console.log(response);

    })
    .catch(function (err) {
        // POST failed...
        console.log("POST failed......");
    });
*/
/*******收的到json 拆不開**********/

var http = require('http');
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.json())

var options = {

 method: 'POST',
  url: 'http://120.107.172.236:3000/devices',
  headers: {
    'User-Agent': 'request',
    'Content-Type': 'application/json'
  },
   body: {
        serial : '87' ,
        mac : '12',
        belongTo : 'yuhsin'
  },
  json: true
};
 
 var request = require('request');

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {

    console.log(body);
    console.log(response.body);

 //   var info = JSON.parse(body);
//    console.log(info);
  //  console.log(info.result + " result ");
  //  console.log(info.message + " msgs ");

      console.log(response.statusCode)
      console.log(response.headers['content-type'])
      console.dir(response.toJSON())
  }
}
 
request(options, callback);
