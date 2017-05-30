
let express = require('express');
let router = express.Router();
let ls = require('../utilities/lightset.js');
let Mode = ls.getMode();

router.use('/', (req, res) => {
    
    let info = req.body;
    console.log( "Mode : " + info.Mode); 
    let rsp = {
      success : 1
    }

    if(info.Mode != Mode){
      Mode = info.Mode;
      ls.setMode(Mode);
    }

    // send json response
    res.status(201).json(rsp);
});

module.exports = router;
