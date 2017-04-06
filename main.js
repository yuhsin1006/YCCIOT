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


// include routers
let lightSwitch = require('./routers/lightSwitch.js');
// Receive light settings from mobile
let Receivelight = require('./routers/receivelight.js');
let ReceiveIO = require('./routers/receiveIO.js');
let ReceiveMode = require('./routers/receiveMode.js');

// use body-parser to parse body to json format
app.use(bodyParser.json());

/* routing */
app.use('/lightSwitch', lightSwitch);
//Receive Brightness 0~100
app.use('/Receivelight', Receivelight);
//Receive lightswitch 0:off 1:on
app.use('/ReceiveIO', ReceiveIO);
//Receive lightmode 1~4
app.use('/ReceiveMode', ReceiveMode);

console.log("MAIN: " + Receivelight.Brightness);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.sendStatus(500);
})

app.listen(3000, () => {
    console.log('App listening on port 3000.\n');
})



/*
    $(document).ready(function () {
    $("#SendToPi").click(function () {
        var Bright = $("#bright").val();
        var OnOff = $('#I_O option:checked').val();
        var arr = { IO: OnOff, light: Bright };
        $.ajax   //傳帳號密碼的json給sever
        ({
            url: 'http://127.0.0.1:3000/',
                    type: 'POST',
                    data: JSON.stringify(arr),
                    contentType: 'application/json',
                    dataType: 'json',
                    async: false,
                    success: function (responseData) {      
                    },
                    error: function () {                  //error:沒有連上sever
                        navigator.notification.alert("connect fail");
                        alert("connect fail");
                    }
       });
    })
})
*/