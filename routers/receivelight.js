

let express = require('express');
let router = express.Router();

let Brightness;

router.use('/', (req, res) => {

    let info = req.body;
    console.log( "Brightness : " + info.light); 
    
    let rsp = {
      success : 1
    }

    Brightness = info.light;
    // send json response
    res.status(201).json(rsp);
});

module.exports = router;
