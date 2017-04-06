
let express = require('express');
let router = express.Router();

let Mode;
router.use('/', (req, res) => {

    let info = req.body;
    console.log( "Mode : " + info.Mode); 

    let rsp = {
      success : 1
    }

    Mode = info.Mode;
    // send json response
    res.status(201).json(rsp);
});

module.exports = router;
