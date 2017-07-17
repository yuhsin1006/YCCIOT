
/* ---------------------------------------------------+
 * FILE NAME - receiveMode.js                         +
 * ---------------------------------------------------+
 * Creator : Yu-Hsin Chung                            +
 * ---------------------------------------------------+
 * Description : Receive the Mode value from mobile   +
 * ---------------------------------------------------*/

let express = require('express');
let router = express.Router();
let ls = require('../utilities/lightset.js');
//Get the initial Mode value from file lightset.js
let Mode = ls.getMode();

//Get the new Mode value from mobile
router.use('/', (req, res) => {
    
    let info = req.body;
    console.log( "Mode : " + info.Mode); 
    let rsp = {
      success : 1
    }

    //if the Mode value changed, reset the Mode value, rewrite the lightset.js
    if(info.Mode != Mode){
      Mode = info.Mode;
      ls.setMode(Mode);
    }

    // send json response
    res.status(201).json(rsp);
});

module.exports = router;
