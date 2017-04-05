
//var http = require('http');
let express = require('express');
//var app = express();
let router = express.Router();
//var server = http.createServer(app);
//var bodyParser = require('body-parser');
//app.use(bodyParser.json())

router.use('/', (req, res) => {

    let info = req.body;
    console.log( "The switch is " + info.IO); 
    console.log( "Brightness : " + info.light); 

    let rsp = {
      success : 1
    }

    // send json response
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(rsp));
});

module.exports = router;
/*
server.listen(3000, () => {
    console.log('Listening on port 3000 ');
});
*/