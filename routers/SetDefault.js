let express = require('express');
let router = express.Router();
let ls = require('../utilities/FileStream.js');

router.use('/', (req, res) => {
    
    let info = req.body;
    console.log( "Mobile ON!!! " + info.start); 
    
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
