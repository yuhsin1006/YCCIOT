/* ---------------------------------------------+
 * FILE NAME - main.js                          +
 * ---------------------------------------------+
 * Creator : Archibald Chiang                   +
 * ---------------------------------------------+
 * Description : index program for http server  +
 *               on raspberry pi.               +
 * ---------------------------------------------*/
'use strict'

// upnp port forwarding
//let upnp = require('./utilities/upnp.js')
// express libaraies
let express = require('express');
let app = express();
// bodyParser
let bodyParser = require('body-parser');
let request = require('request');
let cron = require('cron');

//let upnp = require('./utilities/upnp.js');
//upnp.portMapping(86400);

let upnp = require('./utilities/upnp.js');

let ls = require('./utilities/lightset.js');
// include routers
let lightSwitch = require('./routers/lightSwitch.js');
// Receive light settings from mobile
let Receivelight = require('./routers/receivelight.js');
let ReceiveIO = require('./routers/receiveIO.js');
let ReceiveMode = require('./routers/receiveMode.js');
let SetDefault = require('./routers/SetDefault.js');
let receiveArduino = require('./routers/receiveArduino.js');
// use body-parser to parse body to json format
app.use(bodyParser.json());

ls.readlightSetting();
ls.initialLight();
/* routing */
app.use('/lightSwitch', lightSwitch);
//Receive Brightness 0~100
app.use('/Receivelight', Receivelight);
//Receive lightswitch 0:off 1:on
app.use('/ReceiveIO', ReceiveIO);
//Receive lightmode 1~4
app.use('/ReceiveMode', ReceiveMode);
//Receive Mobile is online
app.use('/SetDefault', SetDefault);




/************ scheduled send request to server ******************/
let options = {

 method: 'POST',
  url: 'http://120.107.172.236:3000/devices',
  headers: {
    'User-Agent': 'request',
    'Content-Type': 'application/json'
  },
   body: {
        serial : '87' ,
        mac : '12',
        //0:no upnp, 1:with upnp
        upnp: '1',
        IpAddress: ''
    //    belongTo : 'yuhsin'
  },
  json: true
};


function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(" Result: " + body.result);
        console.log(" Message:  " + body.message); 
    }
}

//send request every minute to server
let cronJob = cron.job("0 * * * * *", function(){
    // perform operation e.g. GET request http.get() etc.

    request(options, callback);
    console.info('cron job completed');
}); 
//cronJob.start();
/************ scheduled send request to server ******************/


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.sendStatus(500);
})

app.listen(3000, () => {
    console.log('App listening on port 3000.\n');
})

