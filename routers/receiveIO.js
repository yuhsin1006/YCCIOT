
let express = require('express');
let router = express.Router();
let ls = require('../utilities/lightset.js');
let IO = ls.getIO();

router.use('/', (req, res) => {
    
    let info = req.body;
    console.log( "The switch is " + info.IO); 
    let rsp = {
      success : 1
    }

    if(info.IO != IO){
      IO = info.IO;
      ls.setIO(IO);
    }

    // send json response
    res.status(201).json(rsp);
});

module.exports = router;
