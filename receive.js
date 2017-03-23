
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/',function(request, response){ //我們要處理URL為 "/" 的HTTP GET請求

 console.log(request.body); 
  /* response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
*/
  response.end('你好！'); //作出回應
  
});
server.listen(3000, () => {
    console.log('Listening on port 3000 ');
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