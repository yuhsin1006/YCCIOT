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
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/',function(request, response){ //我們要處理URL為 "/" 的HTTP GET請求
/*
  response.on('data', function (chunk) {
        console.log(chunk);
        str += chunk;
  });
  response.on('end', function () {
        console.dir(str);
  });*/
  console.log(request.body); 
  
  response.end('你好！'); //作出回應
  
});
server.listen(3000,'127.0.0.1',function(){
    console.log('HTTP伺服器在 http://127.0.0.1:3000/ 上運行');
});

/*
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
*/
/*
http.get('http://nodejs.org/dist/index.json', (res) => {
  const statusCode = res.statusCode;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type.\n` +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.log(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
      let parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.log(e.message);
    }
  });
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});
*/
