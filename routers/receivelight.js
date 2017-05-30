

let express = require('express');
let router = express.Router();
let ls = require('../utilities/lightset.js');
let Brightness = ls.getBrightness();

router.use('/', (req, res) => {

    let info = req.body;
    console.log( "Brightness : " + info.light); 
    
    let rsp = {
      success : 1
    }
    
    if(info.light != Brightness){
      Brightness = info.light;
      ls.setBrightness(Brightness);
    }

    // send json response
    res.status(201).json(rsp);
});


module.exports = router;

/*
    let json = {
      Brightness : 80,
      IO : 1,
      Mode : 2
    }

    res.status(201).json(json);

    */
   // let data = JSON.stringify(json);