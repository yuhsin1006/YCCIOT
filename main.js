/* ---------------------------------------------+
 * FILE NAME - main.js                          +
 * ---------------------------------------------+
 * Creator : Yu-Hsin Chung                      +
 * ---------------------------------------------+
 * Description : index program for http server  +
 *               on raspberry pi.               +
 * ---------------------------------------------*/
'use strict'


// express libaraies
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let request = require('request');
let cron = require('cron');

// upnp port forwarding
let upnp = require('./utilities/upnp.js');
// lightsetting
let ls = require('./utilities/lightset.js');
// include routers
let lightSwitch = require('./routers/lightSwitch.js');

// Receive light settings(Brightness, IO, Mode) from mobile
let Receivelight = require('./routers/receivelight.js');
let ReceiveIO = require('./routers/receiveIO.js');
let ReceiveMode = require('./routers/receiveMode.js');

// Send default light setting to mobile 
let SetDefault = require('./routers/SetDefault.js');
// Receive the sensor value from Arduino
let receiveArduino = require('./routers/receiveArduino.js');
// Send Temperature, Humidity, Lightness value to mobile
let sentTHL = require('./routers/sentTHL.js');

// use body-parser to parse body to json format
app.use(bodyParser.json());

//Read lightsettings to set default value to pi 
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

//Receive when mobile is online
app.use('/SetDefault', SetDefault);
//send Temperature, Humidity, Lightness value response to mobile
app.use('/sentTHL', sentTHL);


/************ scheduled send request to server ******************/
// Send it every minute
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
  //      upnp: '1',
  //      IpAddress: ''
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
/*      TimeSet
Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11
Day of Week: 0-6
*/
let cronJob = cron.job("0 * * * * *", function(){
    // perform operation e.g. GET request http.get() etc.

    request(options, callback);
    console.info('cron job completed');
}); 
cronJob.start();
/************ scheduled send request to server ******************/


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.sendStatus(500);
})

app.listen(3000, () => {
    console.log('App listening on port 3000.\n');
})

