/* ---------------------------------------------------+
 * FILE NAME - receiveIO.js                           +
 * ---------------------------------------------------+
 * Creator : Yu-Hsin Chung                            +
 * ---------------------------------------------------+
 * Description : Receive the IO value from mobile     +
 * ---------------------------------------------------*/

let express = require('express');
let router = express.Router();
let ls = require('../utilities/lightset.js');
//Get the initial IO value from file lightset.js
let IO = ls.getIO();

//Get the new IO value from mobile
router.use('/', (req, res) => {
    
    let info = req.body;
    console.log( "The switch is " + info.IO); 
    let rsp = {
      success : 1
    }

    //if the IO value changed, reset the IO value, rewrite the lightset.js
    if(info.IO != IO){
      IO = info.IO;
      ls.setIO(IO);
    }

    // send json response
    res.status(201).json(rsp);
});

module.exports = router;
