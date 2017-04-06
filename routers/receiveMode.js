
let express = require('express');
let router = express.Router();
let db = require('../utilities/database.js');
d = new db();

router.use('/', (req, res) => {
    
    let info = req.body;
   // console.log( "Mode : " + info.Mode); 
    let rsp = {
      success : 1
    }

    d.setMode(info.Mode);
    // send json response
    res.status(201).json(rsp);
});

module.exports = router;
