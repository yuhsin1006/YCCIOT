
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

var request = require('request-promise-native')
var cron = require('cron');

var cronJob = cron.job("0 * * * * *", function(){
    // perform operation e.g. GET request http.get() etc.

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {

        console.log(" Result: " + body.result);
        console.log(" Message:  " + body.message);
 
        }
    }
 
    request(options, callback);
    console.info('cron job completed');

}); 
cronJob.start();