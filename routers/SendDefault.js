/* ---------------------------------------------+
 * FILE NAME - SendDefault.js                   +
 * ---------------------------------------------+
 * Creator : Yu-Hsin Chung                      +
 * ---------------------------------------------+
 * Description : Send the default value         +
 *               to mobile                      +
 * ---------------------------------------------*/

let express = require('express');
let router = express.Router();
let ls = require('../utilities/lightset.js');

//when the app opened, send the value by json to mobile
router.use('/', (req, res) => {
    
    let info = req.body;
    console.log( "Mobile ON!!! " + info.start); 
    
    //Read the lightsetting's value from file lightControl.txt
    let b, i, m;
    b = ls.getBrightness();
    i = ls.getIO();
    m = ls.getMode();

    let def = [{
      Brightness: b,
      IO : i,
      Mode : m
    }]

    // send json response
    res.status(201).json(def);
});

module.exports = router;
