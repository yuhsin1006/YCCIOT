//var postData = querystring.stringify({
//  'msg' : 'Hello World!'
//});
var http = require('http');

var options = {
  hostname: '120.107.172.236',
  port: 3000,
  path: '/devices',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
   // 'Content-Length': Buffer.byteLength(postData)
  },
  body: {
        serial : 87 ,
        mac : 12,
        belongTo : 'yuhsin'
  }

};

var req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
//req.write(postData);
req.end();