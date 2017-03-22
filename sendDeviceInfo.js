let request = require('request')

request
    .get('http://120.107.172.236:3000/devices')
    .on('response', function(response) {
        console.log(response.statusCode) // print status code
        console.log(response.headers['content-type']) // print content type of response
        console.dir(response.toJSON())
    })