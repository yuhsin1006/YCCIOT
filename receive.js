
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/',function(request, response){ //我們要處理URL為 "/" 的HTTP GET請求

  response.on('data', function (chunk) {
        console.log(chunk);
        str += chunk;
  });
  response.on('end', function () {
        console.dir(str);
  });
  console.log(request.body); 

  response.end('你好！'); //作出回應
  
});
server.listen(3000, () => {
    console.log('HTTP伺服器在 http://127.0.0.1:3000/ 上運行');
});

/*
 var ip   = "127.0.0.1",
    port = 3000,
    http = require('http');

function onRequest(request, response) {
  console.log("Request received.");

   console.log(request.body); 
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(port, ip);
console.log("Server has started.");
*/