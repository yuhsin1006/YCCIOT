
let express = require('express');
let router = express.Router();
let db = require('../utilities/database.js');
d = new db();

router.use('/', (req, res) => {
    
    let info = req.body;
  //  console.log( "The switch is " + info.IO); 
    let rsp = {
      success : 1
    }

    d.setIO(info.IO);
    // send json response
    res.status(201).json(rsp);
});

module.exports = router;
