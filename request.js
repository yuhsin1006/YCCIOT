
var rp = require('request-promise');

var options = {
    method: 'POST',
    uri: 'http://120.107.172.236:3000/devices',
    body: {
        light : 'on',
        msg : '123'
    },
    json: true, // Automatically stringifies the body to JSON
    resolveWithFullResponse: true  
};

rp(options)
    .then(function (response) {
        // POST succeeded...
        console.log("POST successed!");
        console.log("Succeeded with status %d", response.statusCode);
     //   var info = JSON.parse(response);
        console.log(response.result);

    })
    .catch(function (err) {
        // POST failed...
        console.log("POST failed......");
    });
    
/*
var request = require('request');
request('http://120.107.172.236:3000/devices', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
  
});
*/

/*
var request = require('request');
 
var options = {
  url: 'http://120.107.172.236:3000/devices',
  headers: {
    'User-Agent': 'request',
 //  'Content-Type': 'application/json'
  }
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log(info.result + " result ");
    console.log(info.message + " msgs ");
  }
}
 
request(options, callback);
*/