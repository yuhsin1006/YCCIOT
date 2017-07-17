/* -------------------------------------------------+
 * FILE NAME - SentTHL.js                           +
 * -------------------------------------------------+
 * Creator : Yu-Hsin Chung                          +
 * -------------------------------------------------+
 * Description : Send the environment information   +
 *               to mobile                          +
 * ------------------------------------------------*/

let express = require('express');
let router = express.Router();
let thl = require('../utilities/thl.js');

//when the app want to check the environment information, send the value by json to mobile
router.use('/', (req, res) => {
    
    let info = req.body;
    console.log( "Receive Temperature, Humidity, Lightness!!! " + info.start); 
    
    //Read the environment information value from thl.js
    let t,h,l;
    t = thl.getTemperature();
    h = thl.getHumidity();
    l = thl.getLightness();

    let def = [{
      Temperature: t,
      Humidity : h,
      Lightness : l
    }]

    // send json response
    res.status(201).json(def);
});

module.exports = router;
