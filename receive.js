 /*
 var express = require('express'); //把express call來使用  
 var app = express();   

 app.get('/', function(req, res) {  
  res.send('<H1>Hello</H1> Express');  
 });  
 //app.get 意思是 如果收到 '/'   
 var server = app.listen(3000, function() {  
  console.log('Listening on port 3000');  
 });   
*/
 var ip   = "127.0.0.1",
    port = 3000,
    http = require('http');

function onRequest(request, response) {
  console.log("Request received.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}



http.createServer(onRequest).listen(port, ip);
console.log("Server has started.");