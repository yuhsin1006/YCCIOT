// Dependencies:
// npm install request request-promise-native

var request = require('request-promise-native')
request.post('http://120.107.172.236:3000/devices/').then(v => {
  console.dir(JSON.parse(v))
}).catch(e => {
  console.error(e)
})