/*******送封包出去 但好像收不到json**********/
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
        console.log(response);

    })
    .catch(function (err) {
        // POST failed...
        console.log("POST failed......");
    });

/*******收的到json 拆不開**********/
/*
var request = require('request');

var options = {
  url: 'http://120.107.172.236:3000/devices',
  headers: {
    'User-Agent': 'request',
   'Content-Type': 'application/json'
  }
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
  
    var info = JSON.parse(body);
    console.log(info.result + " result ");
    console.log(info.message + " msgs ");
      console.log(response.statusCode)
      console.log(response.headers['content-type'])
      console.dir(response.toJSON())
  }
}
 
request(options, callback);
*/