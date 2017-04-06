
let express = require('express');
let router = express.Router();

let IO;
router.use('/', (req, res) => {

    let info = req.body;
    console.log( "The switch is " + info.IO); 

    let rsp = {
      success : 1
    }

    IO = info.IO;
    // send json response
    res.status(201).json(rsp);
});

module.exports = router;
