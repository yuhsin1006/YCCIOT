
/* ---------------------------------------------------------+
 * FILE NAME - receivelight.js                              +
 * ---------------------------------------------------------+
 * Creator : Yu-Hsin Chung                                  +
 * ---------------------------------------------------------+
 * Description : Receive the Brightness value from mobile   +
 * ---------------------------------------------------------*/

let express = require('express');
let router = express.Router();
let ls = require('../utilities/lightset.js');
//Get the initial Brightness value from file lightset.js
let Brightness = ls.getBrightness();

//Get the new Brightness value from mobile
router.use('/', (req, res) => {

    let info = req.body;
    console.log( "Brightness : " + info.light); 
    
    let rsp = {
      success : 1
    }
    
    //if the Brightness value changed, reset the Brightness value, rewrite the lightset.js
    if(info.light != Brightness){
      Brightness = info.light;
      ls.setBrightness(Brightness);
    }

    // send json response
    res.status(201).json(rsp);
});


module.exports = router;
