
let express = require('express');
let router = express.Router();
let thl = require('../utilities/thl.js');

router.use('/', (req, res) => {
    
    let info = req.body;
    console.log( "Receive Temperature, Humidity, Lightness!!! " + info.start); 
    
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
